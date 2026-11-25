'use strict';
/**
 * 点歌台 —— 匿名投稿 + 点赞，零依赖 Node 服务
 *
 * 环境变量：
 *   PORT             监听端口（默认 8787）
 *   ADMIN_KEY        后台密钥（不填自动生成并打印在日志里）
 *   PUBLIC_URL       对外地址，用于生成二维码（默认按请求头自动推断）
 *   DATA_DIR         本地存储目录（默认 ./data）
 *   MAX_PER_HOUR     每个 IP 每小时投稿上限（默认 20）
 *   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN  配置后改用云端存储
 */

const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { createStore } = require('./lib/store');
const qr = require('./lib/qr');

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '0.0.0.0';
const ADMIN_KEY = process.env.ADMIN_KEY || crypto.randomBytes(9).toString('base64url');
const PUBLIC_URL = (process.env.PUBLIC_URL || '').replace(/\/+$/, '');
// 每个 IP 每小时投稿上限。注意：一个班通常共用校园网出口 IP，
// 所以这里给得很宽，真正约束单个学生的是下面按设备计的 MAX_PER_HOUR。
const MAX_PER_HOUR = Number(process.env.MAX_PER_HOUR || 15);
const MAX_PER_IP_HOUR = Number(process.env.MAX_PER_IP_HOUR || 300);
const MAX_ITEMS = 3000;

const PUBLIC_DIR = path.join(__dirname, 'public');
const store = createStore();

// ---------------------------------------------------------------- 小工具

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

function sendJSON(res, status, data, extraHeaders = {}) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  });
  res.end(body);
}

function fail(res, status, message) {
  sendJSON(res, status, { ok: false, error: message });
}

function securityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'"
  );
}

async function readBody(req, limit = 16 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let settled = false;
    const chunks = [];

    const abort = (err) => {
      if (settled) return;
      settled = true;
      reject(err);
      // 不再读取，但把剩余数据丢掉，避免连接卡住
      req.removeAllListeners('data');
      req.resume();
    };

    req.on('data', (chunk) => {
      if (settled) return;
      size += chunk.length;
      if (size > limit) {
        abort(Object.assign(new Error('内容太长了'), { status: 413 }));
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (settled) return;
      settled = true;
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(Object.assign(new Error('请求格式不正确'), { status: 400 }));
      }
    });

    req.on('error', (err) => abort(err));
    req.on('aborted', () => abort(Object.assign(new Error('请求已中断'), { status: 400 })));
  });
}

function cleanText(value, max) {
  if (typeof value !== 'string') return '';
  const stripped = value
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const chars = Array.from(stripped);
  return chars.length > max ? chars.slice(0, max).join('') : stripped;
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || 'unknown';
}

function deviceHash(device) {
  if (!device) return '';
  return crypto.createHash('sha256').update(String(device)).digest('hex').slice(0, 12);
}

function newId() {
  return crypto.randomBytes(5).toString('base64url').replace(/[^a-zA-Z0-9]/g, '').slice(0, 7) || crypto.randomBytes(4).toString('hex');
}

const ALIAS_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function newAlias() {
  let s = '';
  for (let i = 0; i < 3; i++) s += ALIAS_ALPHABET[crypto.randomInt(ALIAS_ALPHABET.length)];
  return `匿名 #${s}`;
}

function lanAddress() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return '';
}

function publicBaseUrl(req) {
  if (PUBLIC_URL) return PUBLIC_URL;
  const proto =
    String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim() ||
    (req.socket.encrypted ? 'https' : 'http');
  let host = String(req.headers['x-forwarded-host'] || req.headers.host || `localhost:${PORT}`)
    .split(',')[0]
    .trim();
  // 在本机用 localhost 打开时，二维码应该指向局域网地址，手机才扫得通
  if ((HOST === '0.0.0.0' || HOST === '::') && /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(host)) {
    const lan = lanAddress();
    if (lan) {
      const port = host.includes(':') ? host.slice(host.lastIndexOf(':')) : '';
      host = `${lan}${port}`;
    }
  }
  return `${proto}://${host}`;
}

// ---------------------------------------------------------------- 限流

const buckets = new Map();

function rateLimit(key, max, windowMs) {
  const now = Date.now();
  const list = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (list.length >= max) {
    buckets.set(key, list);
    return false;
  }
  list.push(now);
  buckets.set(key, list);
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, list] of buckets) {
    const alive = list.filter((t) => now - t < 60 * 60 * 1000);
    if (alive.length) buckets.set(key, alive);
    else buckets.delete(key);
  }
}, 10 * 60 * 1000).unref();

/**
 * 投稿限流：按「设备」和「IP」双重判断。
 * 一个班经常共用一个校园网出口 IP，所以 IP 桶放得很宽，
 * 防止一个同学刷屏靠的是设备桶（每台手机每小时 15 条）。
 * 学生不用注册，设备号是浏览器自己随机生成后悄悄塞进请求头的。
 */
function allowSubmit(req, device) {
  const dh = deviceHash(device);
  const ip = clientIp(req);
  const deviceOk = dh ? rateLimit(`submit:dev:${dh}`, MAX_PER_HOUR, 60 * 60 * 1000) : true;
  const ipOk = rateLimit(`submit:ip:${ip}`, dh ? MAX_PER_IP_HOUR : MAX_PER_HOUR, 60 * 60 * 1000);
  return deviceOk && ipOk;
}

/** 点赞限流：同样是设备 + IP，阈值放宽到不会被全班同时点爆 */
function allowVote(req, device) {
  const dh = deviceHash(device);
  const ip = clientIp(req);
  const deviceOk = dh ? rateLimit(`vote:dev:${dh}`, 150, 60 * 1000) : true;
  const ipOk = rateLimit(`vote:ip:${ip}`, 3000, 60 * 1000);
  return deviceOk && ipOk;
}

// ---------------------------------------------------------------- 视图

function publicView(state, device) {
  const dh = deviceHash(device);
  const items = state.items
    .filter((i) => !i.hidden)
    .map((i) => ({
      id: i.id,
      song: i.song,
      artist: i.artist,
      alias: i.alias,
      createdAt: i.createdAt,
      likes: i.likes,
      played: i.played,
      mine: !!dh && i.owner === dh,
      liked: !!dh && !!(state.votes[i.id] && state.votes[i.id][dh]),
    }))
    .sort((a, b) => b.likes - a.likes || b.createdAt - a.createdAt);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  return {
    ok: true,
    settings: state.settings,
    items,
    stats: {
      count: state.items.length,
      visible: items.length,
      likes: state.items.reduce((s, i) => s + i.likes, 0),
      today: state.items.filter((i) => i.createdAt >= todayStart.getTime()).length,
      played: state.items.filter((i) => i.played).length,
    },
    url: '',
    serverTime: Date.now(),
  };
}

function adminView(state) {
  const items = [...state.items]
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((i) => ({ ...i, votes: state.votes[i.id] ? Object.keys(state.votes[i.id]).length : 0 }));
  return {
    ok: true,
    settings: state.settings,
    items,
    stats: {
      count: state.items.length,
      hidden: state.items.filter((i) => i.hidden).length,
      likes: state.items.reduce((s, i) => s + i.likes, 0),
      played: state.items.filter((i) => i.played).length,
    },
    serverTime: Date.now(),
  };
}

function isAdmin(req, url) {
  const header = req.headers['x-admin-key'];
  const key = (typeof header === 'string' && header) || url.searchParams.get('key') || '';
  if (!key) return false;
  const a = Buffer.from(String(key));
  const b = Buffer.from(ADMIN_KEY);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ---------------------------------------------------------------- 静态文件

// 单文件版本会把所有页面塞进这个 map；普通版本走磁盘
let staticAssets = null;

function setStaticAssets(map) {
  staticAssets = map;
}

function cacheControlFor(ext) {
  return ext === '.css' || ext === '.js' || ext === '.svg' || ext === '.png'
    ? 'public, max-age=3600'
    : 'no-cache';
}

function serveEmbedded(res, pathname) {
  const rel = pathname === '/' ? '/index.html' : pathname;
  const candidates = [rel, `${rel}.html`, `${rel.replace(/\/$/, '')}/index.html`];
  const key = candidates.find((k) => staticAssets[k]);
  if (!key) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><meta charset="utf-8"><p>页面不存在，<a href="/">回首页</a></p>');
    return;
  }
  const asset = staticAssets[key];
  const ext = path.extname(key).toLowerCase();
  res.writeHead(200, {
    'Content-Type': asset.type,
    'Content-Length': Buffer.byteLength(asset.body),
    'Cache-Control': cacheControlFor(ext),
  });
  res.end(asset.body);
}

function serveStatic(req, res, pathname) {
  if (staticAssets) return serveEmbedded(res, pathname);

  const rel = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  if (rel.includes('..')) return fail(res, 400, '路径不合法');

  const base = path.join(PUBLIC_DIR, rel);
  const candidates = path.extname(base)
    ? [base]
    : [`${base}.html`, path.join(base, 'index.html'), base];
  const file = candidates.find((f) => f.startsWith(PUBLIC_DIR) && fs.existsSync(f) && fs.statSync(f).isFile());

  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><meta charset="utf-8"><p>页面不存在，<a href="/">回首页</a></p>');
    return;
  }

  const stat = fs.statSync(file);
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Content-Length': stat.size,
    'Cache-Control': cacheControlFor(ext),
  });
  fs.createReadStream(file).pipe(res);
}

// ---------------------------------------------------------------- 路由

/**
 * 微信扫一扫里 http 链接容易被拦截或提示，云平台上来的是 http 就自动升级到 https。
 * 健康检查走的是内网 http，必须放行，否则平台会判定服务不健康。
 */
function httpsUpgradeUrl(req, url, pathname) {
  if (pathname === '/healthz') return null;
  const proto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim().toLowerCase();
  if (proto !== 'http') return null;
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  if (!host) return null;
  if (/^(localhost|127\.0\.0\.1|\[::1\]|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(host)) return null;
  return `https://${host}${url.pathname}${url.search}`;
}

async function handle(req, res) {
  securityHeaders(res);
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);
  const method = req.method || 'GET';
  const device = req.headers['x-device'] || '';

  const upgrade = httpsUpgradeUrl(req, url, pathname);
  if (upgrade) {
    res.writeHead(301, { Location: upgrade, 'Cache-Control': 'no-store' });
    return res.end();
  }

  // ---------- 静态页面
  if (method === 'GET' && !pathname.startsWith('/api/')) {
    if (pathname === '/healthz') return sendJSON(res, 200, { ok: true });
    return serveStatic(req, res, pathname);
  }

  if (method === 'GET' && pathname === '/healthz') return sendJSON(res, 200, { ok: true });

  // ---------- 二维码
  if (method === 'GET' && pathname === '/api/qr.svg') {
    const text = cleanText(url.searchParams.get('text') || publicBaseUrl(req), 300);
    try {
      const svg = qr.svg(text, { ecl: 'M', width: 512, margin: 3 });
      res.writeHead(200, {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      });
      return res.end(svg);
    } catch (err) {
      return fail(res, 400, err.message || '二维码生成失败');
    }
  }

  // ---------- 公开列表
  if (method === 'GET' && pathname === '/api/songs') {
    const state = await store.get();
    const view = publicView(state, device);
    view.url = publicBaseUrl(req);
    return sendJSON(res, 200, view);
  }

  // ---------- 投稿
  if (method === 'POST' && pathname === '/api/songs') {
    if (!allowSubmit(req, device)) return fail(res, 429, '投稿太频繁了，歇一会儿再来吧');
    const body = await readBody(req);
    const song = cleanText(body.song, 40);
    const artist = cleanText(body.artist, 30);
    if (!song) return fail(res, 400, '歌名不能为空');

    const created = await store.update((state) => {
      if (!state.settings.open) {
        const err = new Error('现在暂时关闭了投稿');
        err.status = 403;
        throw err;
      }
      if (state.items.length >= MAX_ITEMS) {
        const err = new Error('点歌簿已经满了，请联系老师');
        err.status = 507;
        throw err;
      }
      const item = {
        id: newId(),
        song,
        artist,
        alias: newAlias(),
        owner: deviceHash(device),
        createdAt: Date.now(),
        likes: 0,
        hidden: false,
        played: false,
      };
      state.items.push(item);
      state.votes[item.id] = {};
      return item;
    });

    return sendJSON(res, 200, {
      ok: true,
      item: {
        id: created.id,
        song: created.song,
        artist: created.artist,
        alias: created.alias,
        createdAt: created.createdAt,
        likes: 0,
        liked: false,
        mine: true,
        played: false,
      },
    });
  }

  // ---------- 点赞 / 取消
  const voteMatch = pathname.match(/^\/api\/songs\/([A-Za-z0-9_-]{4,24})\/vote$/);
  if (voteMatch && method === 'POST') {
    if (!allowVote(req, device)) return fail(res, 429, '点得太快啦');
    const id = voteMatch[1];
    const dh = deviceHash(device);
    if (!dh) return fail(res, 400, '缺少设备标识');

    const result = await store.update((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) {
        const err = new Error('这首歌已经不在了');
        err.status = 404;
        throw err;
      }
      const votes = (state.votes[id] = state.votes[id] || {});
      const liked = !votes[dh];
      if (liked) votes[dh] = Date.now();
      else delete votes[dh];
      item.likes = Object.keys(votes).length;
      return { likes: item.likes, liked };
    });

    return sendJSON(res, 200, { ok: true, ...result });
  }

  // ---------- 删除自己的投稿
  const itemMatch = pathname.match(/^\/api\/songs\/([A-Za-z0-9_-]{4,24})$/);
  if (itemMatch && method === 'DELETE') {
    const id = itemMatch[1];
    const dh = deviceHash(device);
    const removed = await store.update((state) => {
      const idx = state.items.findIndex((i) => i.id === id);
      if (idx < 0) return false;
      if (!dh || state.items[idx].owner !== dh) {
        const err = new Error('只能撤回自己的投稿');
        err.status = 403;
        throw err;
      }
      state.items.splice(idx, 1);
      delete state.votes[id];
      return true;
    });
    return sendJSON(res, 200, { ok: true, removed });
  }

  // ---------- 后台
  if (pathname.startsWith('/api/admin/')) {
    if (!isAdmin(req, url)) return fail(res, 401, '后台密钥不正确');

    if (method === 'GET' && pathname === '/api/admin/state') {
      const state = await store.get();
      const view = adminView(state);
      view.url = publicBaseUrl(req);
      return sendJSON(res, 200, view);
    }

    if (method === 'PATCH' && pathname.match(/^\/api\/admin\/items\/[A-Za-z0-9_-]{4,24}$/)) {
      const id = pathname.split('/').pop();
      const body = await readBody(req);
      const updated = await store.update((state) => {
        const item = state.items.find((i) => i.id === id);
        if (!item) {
          const err = new Error('找不到这条投稿');
          err.status = 404;
          throw err;
        }
        if (typeof body.hidden === 'boolean') item.hidden = body.hidden;
        if (typeof body.played === 'boolean') item.played = body.played;
        return { id: item.id, hidden: item.hidden, played: item.played };
      });
      return sendJSON(res, 200, { ok: true, item: updated });
    }

    if (method === 'DELETE' && pathname.match(/^\/api\/admin\/items\/[A-Za-z0-9_-]{4,24}$/)) {
      const id = pathname.split('/').pop();
      await store.update((state) => {
        state.items = state.items.filter((i) => i.id !== id);
        delete state.votes[id];
      });
      return sendJSON(res, 200, { ok: true });
    }

    if (method === 'PATCH' && pathname === '/api/admin/settings') {
      const body = await readBody(req);
      const settings = await store.update((state) => {
        if (typeof body.open === 'boolean') state.settings.open = body.open;
        if (typeof body.title === 'string') state.settings.title = cleanText(body.title, 40) || '点歌台';
        if (typeof body.subtitle === 'string') state.settings.subtitle = cleanText(body.subtitle, 80);
        return { ...state.settings };
      });
      return sendJSON(res, 200, { ok: true, settings });
    }

    if (method === 'POST' && pathname === '/api/admin/reset') {
      const body = await readBody(req);
      if (body.confirm !== 'RESET') return fail(res, 400, '需要确认操作');
      await store.update((state) => {
        state.items = [];
        state.votes = {};
      });
      return sendJSON(res, 200, { ok: true });
    }

    if (method === 'GET' && pathname === '/api/admin/export.csv') {
      const state = await store.get();
      const rows = [['歌名', '歌手', '匿名编号', '点赞数', '状态', '提交时间']];
      const sorted = [...state.items].sort((a, b) => b.likes - a.likes || a.createdAt - b.createdAt);
      for (const i of sorted) {
        rows.push([
          i.song,
          i.artist,
          i.alias,
          String(i.likes),
          i.hidden ? '已下架' : i.played ? '已播放' : '待播放',
          new Date(i.createdAt).toLocaleString('zh-CN', { hour12: false }),
        ]);
      }
      const csv = rows
        .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\r\n');
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="song-requests-${new Date().toISOString().slice(0, 10)}.csv"`,
        'Cache-Control': 'no-store',
      });
      return res.end('\ufeff' + csv);
    }
  }

  return fail(res, 404, '接口不存在');
}

const server = http.createServer((req, res) => {
  const started = Date.now();
  handle(req, res).catch((err) => {
    const status = err && err.status ? err.status : 500;
    if (status >= 500) console.error('[error]', err);
    if (!res.headersSent) fail(res, status, err.message || '服务器出错了');
    else res.end();
  });
  res.on('finish', () => {
    if (process.env.LOG_REQUESTS === '1') {
      console.log(`${req.method} ${req.url} ${res.statusCode} ${Date.now() - started}ms`);
    }
  });
});

function start(port = PORT, host = HOST) {
  return new Promise((resolve) => {
    server.listen(port, host, async () => {
      const actualPort = server.address().port;
      const localUrl = `http://localhost:${actualPort}`;
      const state = await store.get();
      console.log('');
      console.log('  🎵  晨读歌单已启动');
      console.log(`      学生端   ${PUBLIC_URL || localUrl}`);
      console.log(`      大屏端   ${PUBLIC_URL || localUrl}/screen`);
      console.log(`      后台     ${PUBLIC_URL || localUrl}/admin?key=${ADMIN_KEY}`);
      console.log(`      后台密钥 ${ADMIN_KEY}`);
      console.log(`      当前投稿 ${state.items.length} 首`);
      console.log('');
      resolve(server);
    });
  });
}

if (require.main === module) start();

module.exports = { start, server };

process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('SIGINT', () => server.close(() => process.exit(0)));
