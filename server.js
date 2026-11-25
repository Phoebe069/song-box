'use strict';
/**
 * 晨读歌单 —— 单文件部署版（由 tools/build-single.js 生成，请勿手改）
 * 全部页面已内联，只需要这一个文件就能跑：node server.js
 */

const __modules = {};
function __define(name, factory) {
  const module = { exports: {} };
  factory(module, module.exports, require);
  __modules[name] = module.exports;
}

// ---------------------------------------------------------------- 内联页面
const __assets = {"/admin.html":{"type":"text/html; charset=utf-8","body":"<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<meta name=\"theme-color\" content=\"#0a0912\">\n<title>后台 · 晨读歌单</title>\n<link rel=\"stylesheet\" href=\"/assets/base.css\">\n<style>\n  .wrap { max-width: 900px; }\n  .top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 6px 0 20px; }\n  .top h1 { font-size: 22px; }\n  .section { padding: 18px; margin-bottom: 16px; }\n  .section h2 { font-size: 15px; letter-spacing: 0.01em; margin-bottom: 14px; color: var(--muted); font-weight: 600; }\n\n  .qr-row { display: flex; gap: 20px; flex-wrap: wrap; align-items: center; }\n  .qr-box { width: 168px; height: 168px; background: #fff; border-radius: 14px; padding: 8px; flex: 0 0 auto; }\n  .qr-box img { width: 100%; height: 100%; display: block; }\n  .qr-info { flex: 1 1 240px; min-width: 0; }\n  .qr-info .url { font-size: 15px; font-weight: 600; word-break: break-all; margin-bottom: 4px; }\n  .qr-info .tip { color: var(--muted); font-size: 13px; margin-bottom: 14px; }\n  .row-actions { display: flex; gap: 8px; flex-wrap: wrap; }\n\n  .grid-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; margin-bottom: 16px; }\n  .stat { padding: 14px; border-radius: 14px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.04); }\n  .stat b { display: block; font-size: 24px; font-variant-numeric: tabular-nums; }\n  .stat span { font-size: 12.5px; color: var(--muted); }\n\n  .switch { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--line); }\n  .switch:last-of-type { border-bottom: 0; }\n  .switch .label { font-weight: 600; }\n  .switch .desc { color: var(--muted); font-size: 12.5px; margin-top: 2px; }\n  .toggle { position: relative; width: 50px; height: 29px; border-radius: 999px; background: rgba(255, 255, 255, 0.14); border: 1px solid var(--line); transition: background 0.2s ease; flex: 0 0 auto; }\n  .toggle::after { content: \"\"; position: absolute; top: 3px; left: 3px; width: 21px; height: 21px; border-radius: 50%; background: #fff; transition: transform 0.2s ease; }\n  .toggle[aria-pressed=\"true\"] { background: linear-gradient(135deg, var(--accent), var(--accent-2)); }\n  .toggle[aria-pressed=\"true\"]::after { transform: translateX(21px); }\n\n  .items { display: flex; flex-direction: column; gap: 8px; }\n  .item { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.035); }\n  .item.hidden-item { opacity: 0.5; }\n  .item .info { flex: 1 1 auto; min-width: 0; }\n  .item .song { font-weight: 650; overflow-wrap: anywhere; }\n  .item .song em { font-style: normal; font-weight: 500; color: var(--muted); font-size: 13px; margin-left: 6px; }\n  .item .meta { font-size: 12px; color: var(--muted); margin-top: 3px; }\n  .item .likes { color: var(--accent); font-weight: 700; font-size: 13px; white-space: nowrap; }\n  .item .ops { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }\n  .badge { display: inline-block; padding: 1px 7px; border-radius: 6px; font-size: 11px; margin-left: 6px; background: rgba(255, 255, 255, 0.1); color: var(--muted); }\n  .badge.played { background: rgba(52, 211, 153, 0.16); color: #6ee7b7; }\n  .badge.hidden { background: rgba(251, 191, 36, 0.16); color: #fcd34d; }\n\n  .empty { text-align: center; color: var(--muted); padding: 26px 0; font-size: 14px; }\n  .login { max-width: 420px; margin: 12vh auto; padding: 26px; }\n  .login h1 { font-size: 20px; margin-bottom: 6px; }\n  .login p { color: var(--muted); font-size: 13px; margin-bottom: 18px; }\n  .login .btn { width: 100%; margin-top: 6px; }\n  .foot-link { text-align: center; font-size: 12px; color: var(--muted); margin-top: 24px; }\n</style>\n</head>\n<body>\n<main class=\"wrap\">\n  <div class=\"top\">\n    <h1>🎛 晨读歌单 · 后台</h1>\n    <button class=\"btn btn-sm btn-ghost\" id=\"logoutBtn\" hidden>退出</button>\n  </div>\n\n  <form class=\"card login\" id=\"loginForm\" hidden>\n    <h1>输入后台密钥</h1>\n    <p>启动服务时终端里会打印密钥，部署在云端时看环境变量 ADMIN_KEY。</p>\n    <label class=\"field\">\n      <span>密钥</span>\n      <input type=\"text\" id=\"keyInput\" placeholder=\"例如：Xk3s9_Qp\" autocomplete=\"off\">\n    </label>\n    <button class=\"btn btn-primary\" type=\"submit\">进入后台</button>\n  </form>\n\n  <div id=\"panel\" hidden>\n    <section class=\"card section\">\n      <h2>扫码入口</h2>\n      <div class=\"qr-row\">\n        <div class=\"qr-box\"><img id=\"qrImg\" alt=\"点歌二维码\"></div>\n        <div class=\"qr-info\">\n          <div class=\"url\" id=\"publicUrl\">—</div>\n          <div class=\"tip\">把它打印出来贴在墙上，或者投到屏幕上：同学们用微信扫一下就匿名点歌。</div>\n          <div class=\"row-actions\">\n            <button class=\"btn btn-sm\" id=\"copyBtn\" type=\"button\">复制链接</button>\n            <a class=\"btn btn-sm\" href=\"/screen\" target=\"_blank\" rel=\"noopener\">打开大屏</a>\n            <a class=\"btn btn-sm\" id=\"posterLink\" href=\"/poster\" target=\"_blank\" rel=\"noopener\">打印海报</a>\n            <a class=\"btn btn-sm\" id=\"qrDownload\" href=\"#\" download=\"songbox-qr.svg\">下载二维码</a>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"card section\">\n      <h2>数据概览</h2>\n      <div class=\"grid-stats\">\n        <div class=\"stat\"><b id=\"sCount\">0</b><span>投稿总数</span></div>\n        <div class=\"stat\"><b id=\"sLikes\">0</b><span>累计点赞</span></div>\n        <div class=\"stat\"><b id=\"sPlayed\">0</b><span>已播放</span></div>\n        <div class=\"stat\"><b id=\"sHidden\">0</b><span>已下架</span></div>\n      </div>\n    </section>\n\n    <section class=\"card section\">\n      <h2>设置</h2>\n      <div class=\"switch\">\n        <div>\n          <div class=\"label\">允许投稿</div>\n          <div class=\"desc\">关闭后学生仍可查看和点赞，但不能再提交新歌</div>\n        </div>\n        <button class=\"toggle\" id=\"openToggle\" type=\"button\" aria-pressed=\"true\" aria-label=\"允许投稿\"></button>\n      </div>\n      <label class=\"field\" style=\"margin-top: 16px\">\n        <span>标题</span>\n        <input type=\"text\" id=\"titleInput\" maxlength=\"40\" placeholder=\"晨读歌单\">\n      </label>\n      <label class=\"field\">\n        <span>副标题</span>\n        <input type=\"text\" id=\"subInput\" maxlength=\"80\" placeholder=\"英语早读前播放 · 匿名点歌 · 点赞多的先放\">\n      </label>\n      <button class=\"btn btn-sm\" id=\"saveSettings\" type=\"button\">保存设置</button>\n    </section>\n\n    <section class=\"card section\">\n      <h2>投稿列表 <span class=\"muted\" style=\"font-weight: 400\">按提交时间倒序</span></h2>\n      <div class=\"items\" id=\"items\"></div>\n      <p class=\"empty\" id=\"itemsEmpty\" hidden>还没有投稿</p>\n      <div class=\"row-actions\" style=\"margin-top: 16px\">\n        <a class=\"btn btn-sm\" href=\"#\" id=\"exportBtn\">导出 CSV</a>\n        <button class=\"btn btn-sm\" id=\"resetBtn\" type=\"button\" style=\"color: #ff9ab5\">清空全部</button>\n      </div>\n    </section>\n  </div>\n\n  <p class=\"foot-link\"><a href=\"/\">← 回到学生端</a></p>\n</main>\n\n<script src=\"/assets/common.js\"></script>\n<script src=\"/assets/admin.js\"></script>\n</body>\n</html>\n"},"/assets/admin.js":{"type":"text/javascript; charset=utf-8","body":"/* 后台：二维码、开关、列表管理 */\n(function () {\n  'use strict';\n\n  const { api, toast, el, timeAgo, storage } = window.SongBox;\n  const KEY_STORE = 'songbox:admin';\n\n  const dom = {\n    loginForm: document.getElementById('loginForm'),\n    keyInput: document.getElementById('keyInput'),\n    panel: document.getElementById('panel'),\n    logout: document.getElementById('logoutBtn'),\n    qrImg: document.getElementById('qrImg'),\n    publicUrl: document.getElementById('publicUrl'),\n    copyBtn: document.getElementById('copyBtn'),\n    posterLink: document.getElementById('posterLink'),\n    qrDownload: document.getElementById('qrDownload'),\n    sCount: document.getElementById('sCount'),\n    sLikes: document.getElementById('sLikes'),\n    sPlayed: document.getElementById('sPlayed'),\n    sHidden: document.getElementById('sHidden'),\n    openToggle: document.getElementById('openToggle'),\n    titleInput: document.getElementById('titleInput'),\n    subInput: document.getElementById('subInput'),\n    saveSettings: document.getElementById('saveSettings'),\n    items: document.getElementById('items'),\n    itemsEmpty: document.getElementById('itemsEmpty'),\n    exportBtn: document.getElementById('exportBtn'),\n    resetBtn: document.getElementById('resetBtn'),\n  };\n\n  let adminKey = storage.get(KEY_STORE, 'session') || '';\n  const fromUrl = new URLSearchParams(location.search).get('key');\n  if (fromUrl) {\n    adminKey = fromUrl;\n    storage.set(KEY_STORE, adminKey, 'session');\n    history.replaceState(null, '', '/admin');\n  }\n\n  let state = { items: [], settings: {}, stats: {}, url: '' };\n\n  function request(path, options) {\n    return api(path, Object.assign({ adminKey }, options || {}));\n  }\n\n  function showLogin() {\n    dom.panel.hidden = true;\n    dom.loginForm.hidden = false;\n    dom.logout.hidden = true;\n    dom.keyInput.focus();\n  }\n\n  function showPanel() {\n    dom.loginForm.hidden = true;\n    dom.panel.hidden = false;\n    dom.logout.hidden = false;\n  }\n\n  function itemRow(item) {\n    const node = el('div', 'item' + (item.hidden ? ' hidden-item' : ''));\n\n    const info = el('div', 'info');\n    const song = el('div', 'song', item.song);\n    if (item.artist) song.append(el('em', '', item.artist));\n    if (item.played) song.append(el('span', 'badge played', '已播'));\n    if (item.hidden) song.append(el('span', 'badge hidden', '已下架'));\n    info.append(song);\n\n    const meta = el('div', 'meta');\n    meta.textContent = `${item.alias} · ${timeAgo(item.createdAt)}`;\n    info.append(meta);\n    node.append(info);\n\n    node.append(el('div', 'likes', `♥ ${item.likes}`));\n\n    const ops = el('div', 'ops');\n\n    const played = el('button', 'btn btn-sm btn-ghost', item.played ? '取消已播' : '标记已播');\n    played.addEventListener('click', () => patch(item.id, { played: !item.played }));\n    ops.append(played);\n\n    const hidden = el('button', 'btn btn-sm btn-ghost', item.hidden ? '恢复' : '下架');\n    hidden.addEventListener('click', () => patch(item.id, { hidden: !item.hidden }));\n    ops.append(hidden);\n\n    const del = el('button', 'btn btn-sm btn-ghost', '删除');\n    del.style.color = '#ff9ab5';\n    del.addEventListener('click', () => remove(item));\n    ops.append(del);\n\n    node.append(ops);\n    return node;\n  }\n\n  function render() {\n    const { items, stats, settings, url } = state;\n\n    dom.publicUrl.textContent = url;\n    dom.qrImg.src = `/api/qr.svg?text=${encodeURIComponent(url)}`;\n    dom.qrDownload.href = `/api/qr.svg?text=${encodeURIComponent(url)}`;\n    dom.posterLink.href = `/poster?title=${encodeURIComponent(settings.title || '晨读歌单')}`;\n\n    dom.sCount.textContent = stats.count || 0;\n    dom.sLikes.textContent = stats.likes || 0;\n    dom.sPlayed.textContent = stats.played || 0;\n    dom.sHidden.textContent = stats.hidden || 0;\n\n    dom.openToggle.setAttribute('aria-pressed', settings.open === false ? 'false' : 'true');\n    if (document.activeElement !== dom.titleInput) dom.titleInput.value = settings.title || '';\n    if (document.activeElement !== dom.subInput) dom.subInput.value = settings.subtitle || '';\n\n    dom.exportBtn.href = `/api/admin/export.csv?key=${encodeURIComponent(adminKey)}`;\n\n    dom.items.textContent = '';\n    items.forEach((item) => dom.items.append(itemRow(item)));\n    dom.itemsEmpty.hidden = items.length > 0;\n  }\n\n  async function load() {\n    try {\n      state = await request('/api/admin/state');\n      showPanel();\n      render();\n    } catch (err) {\n      if (err.status === 401) {\n        storage.remove(KEY_STORE, 'session');\n        adminKey = '';\n        showLogin();\n        if (!fromUrl) toast('密钥不正确或已失效', 'err');\n      } else {\n        toast(err.message, 'err');\n      }\n    }\n  }\n\n  async function patch(id, body) {\n    try {\n      await request(`/api/admin/items/${encodeURIComponent(id)}`, { method: 'PATCH', body });\n      await load();\n    } catch (err) {\n      toast(err.message, 'err');\n    }\n  }\n\n  async function remove(item) {\n    if (!window.confirm(`删除《${item.song}》？删了就找不回来了。`)) return;\n    try {\n      await request(`/api/admin/items/${encodeURIComponent(item.id)}`, { method: 'DELETE' });\n      toast('已删除');\n      await load();\n    } catch (err) {\n      toast(err.message, 'err');\n    }\n  }\n\n  dom.loginForm.addEventListener('submit', (event) => {\n    event.preventDefault();\n    const value = dom.keyInput.value.trim();\n    if (!value) return;\n    adminKey = value;\n    storage.set(KEY_STORE, value, 'session');\n    load();\n  });\n\n  dom.logout.addEventListener('click', () => {\n    storage.remove(KEY_STORE, 'session');\n    location.reload();\n  });\n\n  dom.openToggle.addEventListener('click', async () => {\n    const next = dom.openToggle.getAttribute('aria-pressed') !== 'true';\n    try {\n      await request('/api/admin/settings', { method: 'PATCH', body: { open: next } });\n      dom.openToggle.setAttribute('aria-pressed', next ? 'true' : 'false');\n      state.settings.open = next;\n      toast(next ? '已开放投稿' : '已关闭投稿');\n    } catch (err) {\n      toast(err.message, 'err');\n    }\n  });\n\n  dom.saveSettings.addEventListener('click', async () => {\n    try {\n      const res = await request('/api/admin/settings', {\n        method: 'PATCH',\n        body: { title: dom.titleInput.value.trim(), subtitle: dom.subInput.value.trim() },\n      });\n      state.settings = res.settings;\n      toast('已保存');\n      render();\n    } catch (err) {\n      toast(err.message, 'err');\n    }\n  });\n\n  dom.copyBtn.addEventListener('click', async () => {\n    try {\n      await navigator.clipboard.writeText(state.url);\n      toast('链接已复制');\n    } catch (err) {\n      toast(state.url);\n    }\n  });\n\n  dom.resetBtn.addEventListener('click', async () => {\n    if (!window.confirm('确定清空全部投稿和点赞？此操作不可恢复。')) return;\n    if (window.prompt('输入 RESET 以确认清空') !== 'RESET') {\n      toast('已取消');\n      return;\n    }\n    try {\n      await request('/api/admin/reset', { method: 'POST', body: { confirm: 'RESET' } });\n      toast('已清空');\n      await load();\n    } catch (err) {\n      toast(err.message, 'err');\n    }\n  });\n\n  if (adminKey) load();\n  else showLogin();\n})();\n"},"/assets/base.css":{"type":"text/css; charset=utf-8","body":"/* 点歌台 · 公共样式 */\n:root {\n  --bg: #0a0912;\n  --bg-glow-1: rgba(124, 92, 255, 0.22);\n  --bg-glow-2: rgba(255, 91, 138, 0.16);\n  --card: rgba(255, 255, 255, 0.055);\n  --card-solid: #14121f;\n  --line: rgba(255, 255, 255, 0.09);\n  --text: #f4f1ff;\n  --muted: #a29cbb;\n  --accent: #ff5b8a;\n  --accent-2: #8b5cf6;\n  --ok: #34d399;\n  --warn: #fbbf24;\n  --radius: 18px;\n  --shadow: 0 24px 60px -28px rgba(0, 0, 0, 0.85);\n  --font: system-ui, -apple-system, \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Segoe UI\", sans-serif;\n}\n\n@media (prefers-color-scheme: light) {\n  :root {\n    --bg: #f7f5fc;\n    --bg-glow-1: rgba(139, 92, 246, 0.18);\n    --bg-glow-2: rgba(255, 91, 138, 0.14);\n    --card: #ffffff;\n    --card-solid: #ffffff;\n    --line: rgba(26, 16, 60, 0.09);\n    --text: #191231;\n    --muted: #6d658a;\n    --shadow: 0 20px 44px -26px rgba(45, 24, 100, 0.35);\n  }\n}\n\n* {\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent;\n}\n\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  min-height: 100vh;\n  background:\n    radial-gradient(60rem 40rem at 12% -10%, var(--bg-glow-1), transparent 60%),\n    radial-gradient(50rem 34rem at 95% 0%, var(--bg-glow-2), transparent 55%),\n    var(--bg);\n  background-attachment: fixed;\n  color: var(--text);\n  font-family: var(--font);\n  font-size: 16px;\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-size-adjust: 100%;\n  text-size-adjust: 100%;\n}\n\na {\n  color: var(--accent);\n  text-decoration: none;\n}\n\nh1,\nh2,\nh3,\np {\n  margin: 0;\n}\n\nbutton,\ninput,\ntextarea,\nselect {\n  font: inherit;\n  color: inherit;\n}\n\nbutton {\n  cursor: pointer;\n  border: 0;\n  background: none;\n}\n\n.wrap {\n  width: 100%;\n  max-width: 640px;\n  margin: 0 auto;\n  padding: 22px 18px 64px;\n}\n\n.card {\n  background: var(--card);\n  border: 1px solid var(--line);\n  border-radius: var(--radius);\n  box-shadow: var(--shadow);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n\n/* ---------------- 按钮 ---------------- */\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px 18px;\n  border-radius: 14px;\n  border: 1px solid var(--line);\n  background: rgba(255, 255, 255, 0.06);\n  color: var(--text);\n  font-weight: 600;\n  font-size: 15px;\n  transition: transform 0.12s ease, background 0.18s ease, opacity 0.18s ease;\n  white-space: nowrap;\n}\n\n.btn:active {\n  transform: scale(0.97);\n}\n\n.btn[disabled] {\n  opacity: 0.55;\n  cursor: not-allowed;\n  transform: none;\n}\n\n.btn-primary {\n  border: 0;\n  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);\n  color: #fff;\n  box-shadow: 0 12px 26px -12px rgba(255, 91, 138, 0.8);\n}\n\n.btn-ghost {\n  background: transparent;\n}\n\n.btn-sm {\n  padding: 7px 12px;\n  font-size: 13px;\n  border-radius: 10px;\n}\n\n/* ---------------- 表单 ---------------- */\n.field {\n  display: block;\n  margin-bottom: 14px;\n}\n\n.field > span {\n  display: block;\n  margin-bottom: 7px;\n  font-size: 13px;\n  color: var(--muted);\n  font-weight: 600;\n  letter-spacing: 0.02em;\n}\n\n.field .req {\n  color: var(--accent);\n  margin-left: 2px;\n}\n\ninput[type=\"text\"],\ntextarea {\n  width: 100%;\n  padding: 13px 14px;\n  border-radius: 13px;\n  border: 1px solid var(--line);\n  background: rgba(10, 8, 20, 0.35);\n  color: var(--text);\n  outline: none;\n  transition: border-color 0.18s ease, box-shadow 0.18s ease;\n}\n\n@media (prefers-color-scheme: light) {\n  input[type=\"text\"],\n  textarea {\n    background: rgba(255, 255, 255, 0.9);\n  }\n}\n\ninput[type=\"text\"]:focus,\ntextarea:focus {\n  border-color: rgba(139, 92, 246, 0.7);\n  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.16);\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  color: var(--muted);\n  opacity: 0.7;\n}\n\n/* ---------------- 其它 ---------------- */\n.muted {\n  color: var(--muted);\n}\n\n.chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 11px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.07);\n  border: 1px solid var(--line);\n  font-size: 12.5px;\n  color: var(--muted);\n}\n\n#toast {\n  position: fixed;\n  left: 50%;\n  bottom: 26px;\n  transform: translate(-50%, 20px);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 20px;\n  border-radius: 14px;\n  background: var(--card-solid);\n  border: 1px solid var(--line);\n  box-shadow: 0 20px 50px -18px rgba(0, 0, 0, 0.9);\n  color: var(--text);\n  font-size: 14.5px;\n  font-weight: 600;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.22s ease, transform 0.22s ease;\n  z-index: 90;\n  max-width: min(90vw, 420px);\n}\n\n#toast.show {\n  opacity: 1;\n  transform: translate(-50%, 0);\n}\n\n#toast.err {\n  border-color: rgba(255, 91, 138, 0.5);\n  color: #ffb3c7;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation-duration: 0.001ms !important;\n    transition-duration: 0.001ms !important;\n  }\n}\n"},"/assets/common.js":{"type":"text/javascript; charset=utf-8","body":"/* 点歌台 · 前端公共方法 */\n(function () {\n  'use strict';\n\n  const DEVICE_KEY = 'songbox:device';\n  let memoryDeviceId = null;\n\n  function newDeviceId() {\n    if (typeof crypto !== 'undefined' && crypto.randomUUID) {\n      try {\n        return crypto.randomUUID();\n      } catch (err) {\n        /* 老内核可能没有 randomUUID，落到下面 */\n      }\n    }\n    return 'd-' + Math.random().toString(36).slice(2) + Date.now().toString(36);\n  }\n\n  /** 浏览器自己生成的随机标识，仅用于「同一台手机不重复点赞」，不需要学生做任何操作 */\n  function deviceId() {\n    if (memoryDeviceId) return memoryDeviceId;\n    let id = null;\n    try {\n      id = localStorage.getItem(DEVICE_KEY);\n    } catch (err) {\n      /* 微信隐私模式 / 无痕可能禁用 localStorage */\n    }\n    if (!id) {\n      id = newDeviceId();\n      try {\n        localStorage.setItem(DEVICE_KEY, id);\n      } catch (err) {\n        /* 存不进去也没关系，本次打开期间用内存里的就够 */\n      }\n    }\n    memoryDeviceId = id;\n    return id;\n  }\n\n  async function api(path, options) {\n    const opts = options || {};\n    const headers = Object.assign({ 'X-Device': deviceId() }, opts.headers || {});\n    if (opts.body) headers['Content-Type'] = 'application/json';\n    if (opts.adminKey) headers['X-Admin-Key'] = opts.adminKey;\n\n    const res = await fetch(path, {\n      method: opts.method || 'GET',\n      headers,\n      body: opts.body ? JSON.stringify(opts.body) : undefined,\n      cache: 'no-store',\n    });\n\n    let data = null;\n    try {\n      data = await res.json();\n    } catch (err) {\n      /* 非 JSON 响应 */\n    }\n    if (!res.ok || !data || data.ok === false) {\n      const message = (data && data.error) || `请求失败（${res.status}）`;\n      const error = new Error(message);\n      error.status = res.status;\n      throw error;\n    }\n    return data;\n  }\n\n  /**\n   * 微信隐私模式 / 无痕浏览下，访问 localStorage 可能直接抛异常。\n   * 所有本地存储都走这里，读不到就返回 null，绝不让页面脚本崩掉。\n   */\n  const storage = {\n    area(name) {\n      return name === 'session' ? window.sessionStorage : window.localStorage;\n    },\n    get(key, areaName) {\n      try {\n        return storage.area(areaName).getItem(key);\n      } catch (err) {\n        return null;\n      }\n    },\n    set(key, value, areaName) {\n      try {\n        storage.area(areaName).setItem(key, String(value));\n        return true;\n      } catch (err) {\n        return false;\n      }\n    },\n    remove(key, areaName) {\n      try {\n        storage.area(areaName).removeItem(key);\n      } catch (err) {\n        /* 忽略 */\n      }\n    },\n  };\n\n  function timeAgo(ts) {\n    const diff = Date.now() - Number(ts || 0);\n    if (!Number.isFinite(diff) || diff < 0) return '刚刚';\n    const min = Math.floor(diff / 60000);\n    if (min < 1) return '刚刚';\n    if (min < 60) return `${min} 分钟前`;\n    const hour = Math.floor(min / 60);\n    if (hour < 24) return `${hour} 小时前`;\n    const day = Math.floor(hour / 24);\n    if (day === 1) return '昨天';\n    if (day < 7) return `${day} 天前`;\n    const d = new Date(Number(ts));\n    return `${d.getMonth() + 1} 月 ${d.getDate()} 日`;\n  }\n\n  let toastTimer = null;\n  function toast(message, type) {\n    let node = document.getElementById('toast');\n    if (!node) {\n      node = document.createElement('div');\n      node.id = 'toast';\n      document.body.appendChild(node);\n    }\n    node.textContent = message;\n    node.classList.toggle('err', type === 'err');\n    node.classList.add('show');\n    clearTimeout(toastTimer);\n    toastTimer = setTimeout(() => node.classList.remove('show'), 2600);\n  }\n\n  function el(tag, className, text) {\n    const node = document.createElement(tag);\n    if (className) node.className = className;\n    if (text !== undefined && text !== null) node.textContent = String(text);\n    return node;\n  }\n\n  window.SongBox = { deviceId, api, timeAgo, toast, el, storage };\n})();\n"},"/assets/index.js":{"type":"text/javascript; charset=utf-8","body":"/* 学生端：投稿 + 浏览 + 点赞 */\n(function () {\n  'use strict';\n\n  const { api, timeAgo, toast, el, storage } = window.SongBox;\n\n  const dom = {\n    title: document.getElementById('boardTitle'),\n    sub: document.getElementById('boardSub'),\n    statCount: document.getElementById('statCount'),\n    statLikes: document.getElementById('statLikes'),\n    todayChip: document.getElementById('todayChip'),\n    closedBanner: document.getElementById('closedBanner'),\n    form: document.getElementById('compose'),\n    song: document.getElementById('song'),\n    artist: document.getElementById('artist'),\n    submit: document.getElementById('submitBtn'),\n    tabs: document.getElementById('tabs'),\n    refresh: document.getElementById('refreshBtn'),\n    list: document.getElementById('list'),\n    empty: document.getElementById('empty'),\n    footCount: document.getElementById('footCount'),\n  };\n\n  const state = {\n    sort: storage.get('songbox:sort') === 'new' ? 'new' : 'hot',\n    items: [],\n    settings: { open: true, title: '晨读歌单', subtitle: '' },\n    stats: { count: 0, likes: 0, today: 0 },\n    loaded: false,\n  };\n\n  function sortedItems() {\n    const list = state.items.slice();\n    if (state.sort === 'new') list.sort((a, b) => b.createdAt - a.createdAt);\n    else list.sort((a, b) => b.likes - a.likes || b.createdAt - a.createdAt);\n    return list;\n  }\n\n  function paintLike(button, item, animate) {\n    button.classList.toggle('on', !!item.liked);\n    button.setAttribute('aria-pressed', item.liked ? 'true' : 'false');\n    button.querySelector('.count').textContent = item.likes;\n    if (animate) {\n      button.classList.remove('pop');\n      void button.offsetWidth;\n      button.classList.add('pop');\n    }\n  }\n\n  async function toggleLike(button, item) {\n    if (button.dataset.busy === '1') return;\n    button.dataset.busy = '1';\n    const before = { liked: item.liked, likes: item.likes };\n    item.liked = !item.liked;\n    item.likes += item.liked ? 1 : -1;\n    paintLike(button, item, true);\n    paintStats();\n    try {\n      const res = await api(`/api/songs/${encodeURIComponent(item.id)}/vote`, { method: 'POST' });\n      item.liked = res.liked;\n      item.likes = res.likes;\n      paintLike(button, item, false);\n      paintStats();\n    } catch (err) {\n      item.liked = before.liked;\n      item.likes = before.likes;\n      paintLike(button, item, false);\n      paintStats();\n      toast(err.message, 'err');\n    } finally {\n      button.dataset.busy = '';\n    }\n  }\n\n  async function removeMine(item) {\n    if (!window.confirm(`确定撤回《${item.song}》这条投稿吗？`)) return;\n    try {\n      await api(`/api/songs/${encodeURIComponent(item.id)}`, { method: 'DELETE' });\n      toast('已撤回');\n      await load();\n    } catch (err) {\n      toast(err.message, 'err');\n    }\n  }\n\n  function attachWithdraw(node, item) {\n    if (!item.mine) return;\n    const btn = el('button', 'withdraw');\n    btn.type = 'button';\n    btn.textContent = '撤回';\n    btn.addEventListener('click', (event) => {\n      event.stopPropagation();\n      removeMine(item);\n    });\n    node.append(btn);\n  }\n\n  function buildCard(item, index) {\n    const li = el('li', 'song' + (item.played ? ' played' : ''));\n    li.dataset.id = item.id;\n\n    li.append(el('div', 'rank', index + 1));\n\n    const body = el('div', 'song-body');\n    const title = el('div', 'song-title', item.song);\n    if (item.artist) title.append(el('span', 'song-artist', item.artist));\n    body.append(title);\n\n    const meta = el('div', 'song-meta');\n    meta.append(el('span', '', item.alias));\n    meta.append(document.createTextNode(` · ${timeAgo(item.createdAt)}`));\n    if (item.mine) meta.append(el('span', 'mine', ' · 我的投稿'));\n    attachWithdraw(meta, item);\n\n    body.append(meta);\n    li.append(body);\n\n    const like = el('button', 'like' + (item.liked ? ' on' : ''));\n    like.type = 'button';\n    like.setAttribute('aria-label', '点赞');\n    like.append(el('span', 'heart', '♥'));\n    like.append(el('span', 'count', item.likes));\n    like.addEventListener('click', (event) => {\n      event.stopPropagation();\n      toggleLike(like, item);\n    });\n    li.append(like);\n\n    return li;\n  }\n\n  function render() {\n    const items = sortedItems();\n    dom.list.textContent = '';\n    const frag = document.createDocumentFragment();\n    items.forEach((item, index) => frag.append(buildCard(item, index)));\n    dom.list.append(frag);\n    dom.empty.hidden = items.length > 0;\n    dom.footCount.textContent = `共 ${state.items.length} 首`;\n  }\n\n  function paintStats() {\n    const likes = state.items.reduce((sum, item) => sum + item.likes, 0);\n    dom.statCount.textContent = state.items.length;\n    dom.statLikes.textContent = likes;\n    dom.todayChip.textContent = `今天新增 ${state.stats.today || 0}`;\n  }\n\n  function paintSettings() {\n    const title = state.settings.title || '晨读歌单';\n    dom.title.textContent = `🎵 ${title}`;\n    document.title = `${title} · 英语早读前点歌`;\n    dom.sub.textContent = state.settings.subtitle || '英语早读前播放 · 匿名点歌 · 点赞多的先放';\n    const open = state.settings.open !== false;\n    dom.closedBanner.hidden = open;\n    dom.submit.disabled = !open;\n    dom.submit.textContent = open ? '匿名投一票 🎶' : '投稿已关闭';\n    dom.song.disabled = !open;\n    dom.artist.disabled = !open;\n  }\n\n  async function load(options) {\n    const silent = options && options.silent;\n    try {\n      const data = await api('/api/songs');\n      state.items = data.items;\n      state.settings = data.settings;\n      state.stats = data.stats;\n      paintSettings();\n      render();\n      paintStats();\n      state.loaded = true;\n    } catch (err) {\n      if (!silent) toast(err.message, 'err');\n    }\n  }\n\n  // ---------------- 事件\n\n  dom.tabs.addEventListener('click', (event) => {\n    const button = event.target.closest('button[data-sort]');\n    if (!button) return;\n    state.sort = button.dataset.sort;\n    storage.set('songbox:sort', state.sort);\n    [...dom.tabs.children].forEach((node) => {\n      const on = node === button;\n      node.classList.toggle('on', on);\n      node.setAttribute('aria-selected', on ? 'true' : 'false');\n    });\n    render();\n  });\n\n  dom.refresh.addEventListener('click', () => load());\n\n  dom.form.addEventListener('submit', async (event) => {\n    event.preventDefault();\n    const song = dom.song.value.trim();\n    if (!song) {\n      dom.song.focus();\n      toast('先写个歌名吧');\n      return;\n    }\n    dom.submit.disabled = true;\n    dom.submit.textContent = '提交中…';\n    try {\n      const data = await api('/api/songs', {\n        method: 'POST',\n        body: {\n          song,\n          artist: dom.artist.value.trim(),\n        },\n      });\n      dom.form.reset();\n      dom.song.blur();\n      toast(`投稿成功，你是 ${data.item.alias}`);\n      await load({ silent: true });\n      const card = dom.list.querySelector(`[data-id=\"${data.item.id}\"]`);\n      if (card) {\n        card.classList.add('flash');\n        card.scrollIntoView({ behavior: 'smooth', block: 'center' });\n      }\n    } catch (err) {\n      toast(err.message, 'err');\n    } finally {\n      dom.submit.disabled = false;\n      paintSettings();\n    }\n  });\n\n  // 列表在“最热”下点赞会改变排序，这里只在加载时重排，点赞只更新数字\n  let lastTick = Date.now();\n  document.addEventListener('visibilitychange', () => {\n    if (!document.hidden && Date.now() - lastTick > 12000) {\n      lastTick = Date.now();\n      load({ silent: true });\n    }\n  });\n  // 微信里从后台切回来时，页面可能来自缓存，刷新一次数据\n  window.addEventListener('pageshow', (event) => {\n    if (event.persisted) load({ silent: true });\n  });\n  setInterval(() => {\n    if (document.hidden) return;\n    lastTick = Date.now();\n    load({ silent: true });\n  }, 25000);\n\n  load();\n})();\n"},"/assets/poster.js":{"type":"text/javascript; charset=utf-8","body":"/* 海报页：标题可定制 + 打印 */\n(function () {\n  'use strict';\n\n  const params = new URLSearchParams(location.search);\n  const title = (params.get('title') || '').trim();\n  const titleNode = document.getElementById('posterTitle');\n  if (title) {\n    titleNode.textContent = '';\n    titleNode.append(document.createTextNode(title));\n    const dot = document.createElement('span');\n    dot.className = 'dot';\n    dot.textContent = '.';\n    titleNode.append(dot);\n  }\n\n  document.getElementById('printBtn').addEventListener('click', () => window.print());\n\n  // 底部印上真实地址，方便不能扫码的人手输\n  window.SongBox.api('/api/songs')\n    .then((data) => {\n      document.getElementById('posterUrl').textContent = data.url || '';\n    })\n    .catch(() => {});\n})();\n"},"/assets/screen.js":{"type":"text/javascript; charset=utf-8","body":"/* 大屏端：实时榜单 + 二维码 */\n(function () {\n  'use strict';\n\n  const { api, el } = window.SongBox;\n  const MAX_ROWS = 10;\n\n  const dom = {\n    title: document.getElementById('title'),\n    sub: document.getElementById('sub'),\n    statCount: document.getElementById('statCount'),\n    statLikes: document.getElementById('statLikes'),\n    closed: document.getElementById('closed'),\n    board: document.getElementById('board'),\n    overlay: document.getElementById('overlay'),\n    url: document.getElementById('url'),\n    qrimg: document.getElementById('qrimg'),\n  };\n\n  const seen = new Set();\n  let firstLoad = true;\n  let currentUrl = '';\n\n  function row(item, index, fresh) {\n    const node = el('div', 'row' + (fresh ? ' fresh' : ''));\n    node.append(el('div', 'no', index + 1));\n\n    const main = el('div', 'main');\n    const name = el('div', 'name', item.song);\n    if (item.artist) name.append(el('em', '', item.artist));\n    main.append(name);\n    node.append(main);\n\n    const likes = el('div', 'likes');\n    likes.append(el('span', '', '♥'));\n    likes.append(el('span', '', item.likes));\n    node.append(likes);\n    return node;\n  }\n\n  function render(data) {\n    const pending = data.items.filter((item) => !item.played);\n    const visible = pending.slice(0, MAX_ROWS);\n\n    dom.statCount.textContent = data.stats.count;\n    dom.statLikes.textContent = data.stats.likes;\n    dom.closed.hidden = data.settings.open !== false;\n    dom.title.textContent = `🎵 ${data.settings.title || '今日晨读歌单'}`;\n    dom.sub.textContent = data.settings.subtitle || '英语早读前播放 · 匿名点歌 · 点赞多的先放';\n\n    if (data.url && data.url !== currentUrl) {\n      currentUrl = data.url;\n      dom.url.textContent = data.url.replace(/^https?:\\/\\//, '');\n      dom.qrimg.src = `/api/qr.svg?text=${encodeURIComponent(data.url)}&t=${Date.now()}`;\n    }\n\n    if (!visible.length) {\n      dom.board.textContent = '';\n      const overlay = el('div', 'overlay');\n      overlay.append(el('div', 'big', '还没有人点歌 🎤'));\n      overlay.append(el('div', '', '同学们用微信扫一下就能匿名点歌'));\n      dom.board.append(overlay);\n      return;\n    }\n\n    dom.board.textContent = '';\n    const frag = document.createDocumentFragment();\n    visible.forEach((item, index) => {\n      const fresh = !firstLoad && !seen.has(item.id);\n      seen.add(item.id);\n      frag.append(row(item, index, fresh));\n    });\n    dom.board.append(frag);\n\n    if (pending.length > MAX_ROWS) {\n      const more = el('div', 'msg');\n      more.style.textAlign = 'center';\n      more.style.opacity = '0.7';\n      more.textContent = `还有 ${pending.length - MAX_ROWS} 首在排队`;\n      dom.board.append(more);\n    }\n    firstLoad = false;\n  }\n\n  async function load() {\n    try {\n      render(await api('/api/songs'));\n    } catch (err) {\n      /* 大屏静默重试 */\n    }\n  }\n\n  load();\n  setInterval(() => {\n    if (!document.hidden) load();\n  }, 6000);\n  document.addEventListener('visibilitychange', () => {\n    if (!document.hidden) load();\n  });\n})();\n"},"/index.html":{"type":"text/html; charset=utf-8","body":"<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<meta name=\"theme-color\" content=\"#0a0912\">\n<meta name=\"description\" content=\"英语早读前的点歌单：匿名写下想听的歌，给喜欢的歌点赞，点赞最多的排在前面。\">\n<meta property=\"og:title\" content=\"晨读歌单 · 英语早读前点歌\">\n<meta property=\"og:description\" content=\"匿名投稿，点赞多的先放。\">\n<title>晨读歌单 · 英语早读前点歌</title>\n<link rel=\"stylesheet\" href=\"/assets/base.css\">\n<style>\n  .hero { padding: 8px 2px 18px; }\n  .hero h1 { font-size: 27px; letter-spacing: -0.02em; }\n  .hero .sub { margin-top: 6px; color: var(--muted); font-size: 14px; }\n  .stats { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }\n  .stats b { color: var(--text); font-variant-numeric: tabular-nums; }\n\n  .compose { padding: 20px 18px 18px; margin-bottom: 22px; }\n  .compose .submit { width: 100%; padding: 15px 18px; font-size: 16px; margin-top: 4px; }\n  .compose .hint { margin-top: 12px; font-size: 12.5px; color: var(--muted); text-align: center; }\n  .compose .opt { font-style: normal; opacity: 0.65; font-weight: 400; }\n\n  .toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }\n  .tabs { display: inline-flex; padding: 4px; gap: 2px; border-radius: 13px; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--line); }\n  .tabs button { padding: 7px 16px; border-radius: 10px; font-size: 14px; font-weight: 600; color: var(--muted); transition: all 0.18s ease; }\n  .tabs button.on { background: var(--card-solid); color: var(--text); box-shadow: 0 6px 14px -8px rgba(0, 0, 0, 0.9); }\n\n  .list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }\n\n  .song {\n    display: flex;\n    align-items: center;\n    gap: 13px;\n    padding: 14px 14px 14px 16px;\n    background: var(--card);\n    border: 1px solid var(--line);\n    border-radius: 16px;\n    animation: rise 0.32s ease both;\n  }\n  .song.played { opacity: 0.55; }\n  .song.flash { animation: flash 1.6s ease; }\n\n  .rank {\n    flex: 0 0 26px;\n    font-size: 13px;\n    font-weight: 700;\n    color: var(--muted);\n    text-align: center;\n    font-variant-numeric: tabular-nums;\n  }\n  .song:nth-child(1) .rank { color: #ffcf5c; }\n  .song:nth-child(2) .rank { color: #cfd3e6; }\n  .song:nth-child(3) .rank { color: #e0a878; }\n\n  .song-body { flex: 1 1 auto; min-width: 0; }\n  .song-title { font-size: 16.5px; font-weight: 650; line-height: 1.35; word-break: break-word; overflow-wrap: anywhere; }\n  .song-artist { margin-left: 7px; font-size: 13.5px; font-weight: 500; color: var(--muted); }\n  .song-meta { margin-top: 6px; font-size: 11.5px; color: var(--muted); opacity: 0.85; }\n  .song-meta .mine { color: var(--accent-2); font-weight: 600; }\n  .withdraw { margin-left: 8px; font-size: 11.5px; color: var(--muted); text-decoration: underline; opacity: 0.9; }\n  .withdraw:active { color: var(--accent); }\n\n  .like {\n    flex: 0 0 auto;\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 1px;\n    min-width: 52px;\n    padding: 7px 8px;\n    border-radius: 13px;\n    border: 1px solid var(--line);\n    background: rgba(255, 255, 255, 0.04);\n    transition: transform 0.14s ease, background 0.18s ease, border-color 0.18s ease;\n  }\n  .like:active { transform: scale(0.92); }\n  .like .heart { font-size: 17px; line-height: 1; color: var(--muted); transition: color 0.18s ease; }\n  .like .count { font-size: 12px; font-weight: 700; color: var(--muted); font-variant-numeric: tabular-nums; }\n  .like.on { background: rgba(255, 91, 138, 0.14); border-color: rgba(255, 91, 138, 0.45); }\n  .like.on .heart { color: var(--accent); }\n  .like.on .count { color: var(--accent); }\n  .like.pop .heart { animation: pop 0.34s ease; }\n\n  .empty { margin: 40px 0; text-align: center; color: var(--muted); font-size: 14px; }\n  .closed-banner { margin: 0 0 18px; padding: 12px 14px; border-radius: 14px; background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.3); color: var(--warn); font-size: 13.5px; text-align: center; }\n  .foot { margin-top: 34px; text-align: center; font-size: 12px; color: var(--muted); opacity: 0.75; }\n  .foot a { color: var(--muted); }\n\n  @keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }\n  @keyframes pop { 0% { transform: scale(1); } 45% { transform: scale(1.45); } 100% { transform: scale(1); } }\n  @keyframes flash { 0%, 100% { box-shadow: none; } 25% { box-shadow: 0 0 0 3px rgba(255, 91, 138, 0.45); } }\n</style>\n</head>\n<body>\n<main class=\"wrap\">\n  <header class=\"hero\">\n    <h1 id=\"boardTitle\">🎵 晨读歌单</h1>\n    <p class=\"sub\" id=\"boardSub\">英语早读前播放 · 匿名点歌 · 点赞多的先放</p>\n    <div class=\"stats\">\n      <span class=\"chip\"><b id=\"statCount\">0</b>&nbsp;首歌</span>\n      <span class=\"chip\"><b id=\"statLikes\">0</b>&nbsp;个赞</span>\n      <span class=\"chip\" id=\"todayChip\">今天新增 0</span>\n    </div>\n  </header>\n\n  <p class=\"closed-banner\" id=\"closedBanner\" hidden>投稿已暂时关闭，不过还可以继续点赞 👀</p>\n\n  <form class=\"card compose\" id=\"compose\" autocomplete=\"off\" novalidate>\n    <label class=\"field\">\n      <span>歌名<i class=\"req\">*</i></span>\n      <input type=\"text\" id=\"song\" maxlength=\"40\" placeholder=\"例如：Yesterday Once More\" enterkeyhint=\"done\">\n    </label>\n    <label class=\"field\">\n      <span>歌手<i class=\"opt\">（可选）</i></span>\n      <input type=\"text\" id=\"artist\" maxlength=\"30\" placeholder=\"例如：Carpenters\" enterkeyhint=\"done\">\n    </label>\n    <button type=\"submit\" class=\"btn btn-primary submit\" id=\"submitBtn\">匿名投一票 🎶</button>\n    <p class=\"hint\">不用注册、不用登录，打完字直接投 · 只显示「匿名 #XXX」</p>\n  </form>\n\n  <div class=\"toolbar\">\n    <div class=\"tabs\" id=\"tabs\" role=\"tablist\">\n      <button type=\"button\" role=\"tab\" data-sort=\"hot\" class=\"on\" aria-selected=\"true\">最热</button>\n      <button type=\"button\" role=\"tab\" data-sort=\"new\" aria-selected=\"false\">最新</button>\n    </div>\n    <button type=\"button\" class=\"btn btn-sm btn-ghost\" id=\"refreshBtn\">刷新</button>\n  </div>\n\n  <ul class=\"list\" id=\"list\"></ul>\n  <p class=\"empty\" id=\"empty\" hidden>还没有人点歌，来当第一个吧 🎤</p>\n\n  <p class=\"foot\">只收集歌名，不记录任何身份信息 · <span id=\"footCount\">共 0 首</span></p>\n</main>\n\n<script src=\"/assets/common.js\"></script>\n<script src=\"/assets/index.js\"></script>\n</body>\n</html>\n"},"/poster.html":{"type":"text/html; charset=utf-8","body":"<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>点歌台 · 打印海报</title>\n<link rel=\"stylesheet\" href=\"/assets/base.css\">\n<style>\n  body {\n    background: #1a1726;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 16px;\n    padding: 24px 12px 60px;\n  }\n\n  .toolbar { display: flex; gap: 10px; }\n\n  .page {\n    position: relative;\n    width: 210mm;\n    min-height: 297mm;\n    padding: 22mm 18mm;\n    background: #fff;\n    color: #191231;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n    box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8);\n    overflow: hidden;\n    font-family: var(--font);\n  }\n\n  .page::before {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 90mm;\n    background: radial-gradient(60mm 40mm at 20% 0%, rgba(139, 92, 246, 0.22), transparent 70%),\n                radial-gradient(60mm 40mm at 85% 10%, rgba(255, 91, 138, 0.18), transparent 70%);\n  }\n\n  .kicker { position: relative; font-size: 5.2mm; letter-spacing: 0.42em; color: #8b5cf6; font-weight: 700; margin-top: 4mm; }\n  .title { position: relative; font-size: 26mm; font-weight: 900; letter-spacing: 0.02em; margin-top: 4mm; line-height: 1.05; }\n  .title .dot { color: #ff5b8a; }\n  .tagline { position: relative; margin-top: 6mm; font-size: 6.4mm; color: #4b4266; font-weight: 500; }\n\n  .qr-card {\n    margin-top: 12mm;\n    padding: 9mm;\n    border-radius: 10mm;\n    background: #fff;\n    border: 0.9mm solid #ece7fa;\n    box-shadow: 0 8mm 20mm -10mm rgba(80, 50, 160, 0.35);\n  }\n  .qr-card img { width: 88mm; height: 88mm; display: block; }\n\n  .scan { margin-top: 7mm; font-size: 6mm; font-weight: 700; color: #191231; }\n  .scan small { display: block; margin-top: 2mm; font-size: 3.9mm; font-weight: 400; color: #6d658a; }\n\n  .steps { margin-top: auto; width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; }\n  .step { padding: 5mm 3mm; border-radius: 4mm; background: #f7f5fd; border: 0.4mm solid #ece7fa; }\n  .step b { display: block; font-size: 8mm; color: #8b5cf6; line-height: 1; }\n  .step span { display: block; margin-top: 2.5mm; font-size: 4.2mm; color: #4b4266; font-weight: 600; }\n\n  .foot { margin-top: 9mm; font-size: 3.9mm; color: #8b83a5; line-height: 1.9; }\n  .foot code { font-size: 3.7mm; color: #6d658a; }\n\n  @page { size: A4 portrait; margin: 0; }\n\n  @media print {\n    body { background: #fff; padding: 0; gap: 0; display: block; }\n    .toolbar { display: none; }\n    .page { box-shadow: none; width: 210mm; height: 296mm; min-height: 0; }\n    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }\n  }\n\n  @media (max-width: 880px) {\n    .page { width: 100%; min-height: 0; padding: 28px 22px; }\n    .title { font-size: 64px; }\n    .qr-card img { width: 220px; height: 220px; }\n    .steps { grid-template-columns: 1fr; }\n  }\n</style>\n</head>\n<body>\n<div class=\"toolbar\">\n  <button class=\"btn btn-primary\" id=\"printBtn\" type=\"button\">打印 / 存成 PDF</button>\n  <a class=\"btn\" href=\"/admin\">返回后台</a>\n</div>\n\n<div class=\"page\">\n  <div class=\"kicker\">MORNING READING</div>\n  <h1 class=\"title\" id=\"posterTitle\">晨读歌单<span class=\"dot\">.</span></h1>\n  <p class=\"tagline\">早读前想听哪首？写下来，明早就放 🎧</p>\n\n  <div class=\"qr-card\"><img id=\"qr\" src=\"/api/qr.svg\" alt=\"微信扫码点歌\"></div>\n\n  <p class=\"scan\">微 信 扫 一 扫<small>不用注册 · 不用登录 · 不用关注</small></p>\n\n  <div class=\"steps\">\n    <div class=\"step\"><b>1</b><span>微信扫这个码</span></div>\n    <div class=\"step\"><b>2</b><span>写下歌名和歌手</span></div>\n    <div class=\"step\"><b>3</b><span>给想听的歌点赞</span></div>\n  </div>\n\n  <p class=\"foot\">\n    英语早读前播放 · 点赞多的排在前面 · 不记录任何身份信息<br>\n    <code id=\"posterUrl\"></code>\n  </p>\n</div>\n\n<script src=\"/assets/common.js\"></script>\n<script src=\"/assets/poster.js\"></script>\n</body>\n</html>\n"},"/robots.txt":{"type":"text/plain; charset=utf-8","body":"User-agent: *\nDisallow: /\n"},"/screen.html":{"type":"text/html; charset=utf-8","body":"<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<meta name=\"color-scheme\" content=\"dark\">\n<title>晨读歌单 · 大屏</title>\n<link rel=\"stylesheet\" href=\"/assets/base.css\">\n<style>\n  :root {\n    --bg: #07060d;\n    --card: rgba(255, 255, 255, 0.05);\n    --line: rgba(255, 255, 255, 0.1);\n    --text: #f6f3ff;\n    --muted: #9b94b6;\n  }\n  html, body { height: 100%; overflow: hidden; }\n  body { background: radial-gradient(70rem 50rem at 8% -12%, rgba(124, 92, 255, 0.3), transparent 60%), radial-gradient(60rem 44rem at 96% 4%, rgba(255, 91, 138, 0.22), transparent 58%), #07060d; }\n\n  .stage { display: flex; flex-direction: column; height: 100vh; height: 100dvh; padding: clamp(14px, 2.2vw, 38px); gap: clamp(10px, 1.6vh, 22px); }\n\n  .head { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; }\n  .head h1 { font-size: clamp(26px, 3.4vw, 52px); letter-spacing: -0.03em; line-height: 1.1; }\n  .head .sub { color: var(--muted); font-size: clamp(12px, 1.05vw, 17px); margin-top: 6px; }\n  .head .counts { display: flex; gap: 10px; }\n  .pill { display: inline-flex; align-items: baseline; gap: 6px; padding: clamp(7px, 0.8vh, 11px) clamp(12px, 1.1vw, 18px); border-radius: 999px; border: 1px solid var(--line); background: var(--card); color: var(--muted); font-size: clamp(12px, 1vw, 16px); }\n  .pill b { color: var(--text); font-size: clamp(15px, 1.5vw, 24px); font-variant-numeric: tabular-nums; }\n\n  .cols { flex: 1 1 auto; display: grid; grid-template-columns: minmax(0, 1fr) clamp(220px, 22vw, 340px); gap: clamp(14px, 2vw, 32px); min-height: 0; }\n\n  .board { display: flex; flex-direction: column; gap: clamp(6px, 1vh, 14px); min-height: 0; overflow: hidden; }\n\n  .row {\n    flex: 1 1 0;\n    min-height: 0;\n    display: flex;\n    align-items: center;\n    gap: clamp(10px, 1.2vw, 22px);\n    padding: clamp(6px, 1vh, 14px) clamp(12px, 1.4vw, 22px);\n    border-radius: clamp(12px, 1vw, 18px);\n    border: 1px solid var(--line);\n    background: var(--card);\n    overflow: hidden;\n  }\n  .row.fresh { animation: glow 2.4s ease; }\n\n  .no {\n    flex: 0 0 auto;\n    min-width: clamp(30px, 2.6vw, 52px);\n    font-size: clamp(15px, 1.5vw, 26px);\n    font-weight: 800;\n    color: var(--muted);\n    text-align: center;\n    font-variant-numeric: tabular-nums;\n  }\n  .row:nth-child(1) .no { color: #ffcf5c; }\n  .row:nth-child(2) .no { color: #d5d9ea; }\n  .row:nth-child(3) .no { color: #e6a97b; }\n\n  .row .main { flex: 1 1 auto; min-width: 0; }\n  .row .name { font-size: clamp(16px, 1.9vw, 32px); font-weight: 700; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n  .row .name em { font-style: normal; font-weight: 500; font-size: 0.58em; color: var(--muted); margin-left: 0.6em; }\n  .row .msg { font-size: clamp(11px, 0.95vw, 16px); color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }\n\n  .likes {\n    flex: 0 0 auto;\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: clamp(5px, 0.7vh, 9px) clamp(10px, 1vw, 16px);\n    border-radius: 999px;\n    background: rgba(255, 91, 138, 0.12);\n    border: 1px solid rgba(255, 91, 138, 0.35);\n    color: #ff9ab5;\n    font-weight: 700;\n    font-size: clamp(13px, 1.15vw, 20px);\n    font-variant-numeric: tabular-nums;\n  }\n\n  .qr {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: clamp(10px, 1.4vh, 18px);\n    padding: clamp(14px, 1.6vw, 26px);\n    border-radius: clamp(16px, 1.4vw, 26px);\n    border: 1px solid var(--line);\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.03));\n    text-align: center;\n  }\n  .qr .box { width: 100%; height: clamp(170px, 21vw, 300px); background: #fff; border-radius: 14px; padding: 10px; display: flex; }\n  .qr .box img { width: 100%; height: 100%; display: block; object-fit: contain; }\n  .qr strong { font-size: clamp(16px, 1.5vw, 26px); letter-spacing: 0.02em; }\n  .qr span { color: var(--muted); font-size: clamp(11px, 1vw, 15px); }\n  .qr code { font-size: clamp(10px, 0.9vw, 14px); color: var(--muted); word-break: break-all; opacity: 0.85; }\n\n  .overlay { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 14px; color: var(--muted); }\n  .overlay .big { font-size: clamp(22px, 2.6vw, 40px); color: var(--text); font-weight: 700; }\n\n  .closed { padding: 6px 14px; border-radius: 999px; background: rgba(251, 191, 36, 0.12); border: 1px solid rgba(251, 191, 36, 0.35); color: #fcd34d; font-size: clamp(11px, 0.9vw, 14px); }\n\n  @media (max-width: 820px) {\n    .cols { grid-template-columns: 1fr; grid-template-rows: 1fr auto; }\n    .qr { flex-direction: row; align-items: center; text-align: left; }\n    .qr .box { width: clamp(96px, 22vw, 150px); height: clamp(96px, 22vw, 150px); }\n    .qr code { display: none; }\n  }\n\n  @keyframes glow {\n    0% { box-shadow: 0 0 0 0 rgba(255, 91, 138, 0); border-color: rgba(255, 91, 138, 0.9); }\n    25% { box-shadow: 0 0 40px 0 rgba(255, 91, 138, 0.45); border-color: rgba(255, 91, 138, 0.9); }\n    100% { box-shadow: none; border-color: var(--line); }\n  }\n</style>\n</head>\n<body>\n<div class=\"stage\">\n  <header class=\"head\">\n    <div>\n      <h1 id=\"title\">🎵 今日晨读歌单</h1>\n      <p class=\"sub\" id=\"sub\">英语早读前播放 · 匿名点歌 · 点赞多的先放</p>\n    </div>\n    <div class=\"counts\">\n      <span class=\"pill\"><b id=\"statCount\">0</b> 首</span>\n      <span class=\"pill\"><b id=\"statLikes\">0</b> 赞</span>\n      <span class=\"closed\" id=\"closed\" hidden>投稿已关闭</span>\n    </div>\n  </header>\n\n  <div class=\"cols\">\n    <section class=\"board\" id=\"board\">\n      <div class=\"overlay\" id=\"overlay\">\n        <div class=\"big\">还没有人点歌 🎤</div>\n        <div>同学们用微信扫一下就能匿名点歌</div>\n      </div>\n    </section>\n\n    <aside class=\"qr\">\n      <div class=\"box\"><img id=\"qrimg\" src=\"/api/qr.svg\" alt=\"微信扫码点歌二维码\"></div>\n      <div>\n        <strong>微信扫码点歌</strong>\n        <div class=\"sub\">匿名投稿 · 随手点赞</div>\n      </div>\n      <code id=\"url\"></code>\n    </aside>\n  </div>\n</div>\n<script src=\"/assets/common.js\"></script>\n<script src=\"/assets/screen.js\"></script>\n</body>\n</html>\n"}};

// ---------------------------------------------------------------- lib/qr.js
__define('qr', function (module, exports, require) {
'use strict';
/**
 * 零依赖 QR Code 生成器（字节模式 / UTF-8）
 * 支持版本 1-40、L/M/Q/H 四个纠错等级，自动选择最小版本并按 ISO/IEC 18004 打分挑选掩码。
 *
 * 用法：
 *   const qr = require('./qr');
 *   qr.svg('https://example.com')                  -> SVG 字符串
 *   qr.matrix('https://example.com', 'M')          -> { size, modules, version, mask, ecl }
 */

// ---------------------------------------------------------------- 常量表

const ECL_KEYS = ['L', 'M', 'Q', 'H'];
// 格式信息里的 2 bit 纠错等级编码
const ECL_FORMAT = { L: 1, M: 0, Q: 3, H: 2 };

// 每个版本 / 纠错等级的 RS 分块：[块数, 总码字数, 数据码字数] 可多组
const RS_BLOCKS = [
  [[[1, 26, 19]], [[1, 26, 16]], [[1, 26, 13]], [[1, 26, 9]]],
  [[[1, 44, 34]], [[1, 44, 28]], [[1, 44, 22]], [[1, 44, 16]]],
  [[[1, 70, 55]], [[1, 70, 44]], [[2, 35, 17]], [[2, 35, 13]]],
  [[[1, 100, 80]], [[2, 50, 32]], [[2, 50, 24]], [[4, 25, 9]]],
  [[[1, 134, 108]], [[2, 67, 43]], [[2, 33, 15], [2, 34, 16]], [[2, 33, 11], [2, 34, 12]]],
  [[[2, 86, 68]], [[4, 43, 27]], [[4, 43, 19]], [[4, 43, 15]]],
  [[[2, 98, 78]], [[4, 49, 31]], [[2, 32, 14], [4, 33, 15]], [[4, 39, 13], [1, 40, 14]]],
  [[[2, 121, 97]], [[2, 60, 38], [2, 61, 39]], [[4, 40, 18], [2, 41, 19]], [[4, 40, 14], [2, 41, 15]]],
  [[[2, 146, 116]], [[3, 58, 36], [2, 59, 37]], [[4, 36, 16], [4, 37, 17]], [[4, 36, 12], [4, 37, 13]]],
  [[[2, 86, 68], [2, 87, 69]], [[4, 69, 43], [1, 70, 44]], [[6, 43, 19], [2, 44, 20]], [[6, 43, 15], [2, 44, 16]]],
  [[[4, 101, 81]], [[1, 80, 50], [4, 81, 51]], [[4, 50, 22], [4, 51, 23]], [[3, 36, 12], [8, 37, 13]]],
  [[[2, 116, 92], [2, 117, 93]], [[6, 58, 36], [2, 59, 37]], [[4, 46, 20], [6, 47, 21]], [[7, 42, 14], [4, 43, 15]]],
  [[[4, 133, 107]], [[8, 59, 37], [1, 60, 38]], [[8, 44, 20], [4, 45, 21]], [[12, 33, 11], [4, 34, 12]]],
  [[[3, 145, 115], [1, 146, 116]], [[4, 64, 40], [5, 65, 41]], [[11, 36, 16], [5, 37, 17]], [[11, 36, 12], [5, 37, 13]]],
  [[[5, 109, 87], [1, 110, 88]], [[5, 65, 41], [5, 66, 42]], [[5, 54, 24], [7, 55, 25]], [[11, 36, 12], [7, 37, 13]]],
  [[[5, 122, 98], [1, 123, 99]], [[7, 73, 45], [3, 74, 46]], [[15, 43, 19], [2, 44, 20]], [[3, 45, 15], [13, 46, 16]]],
  [[[1, 135, 107], [5, 136, 108]], [[10, 74, 46], [1, 75, 47]], [[1, 50, 22], [15, 51, 23]], [[2, 42, 14], [17, 43, 15]]],
  [[[5, 150, 120], [1, 151, 121]], [[9, 69, 43], [4, 70, 44]], [[17, 50, 22], [1, 51, 23]], [[2, 42, 14], [19, 43, 15]]],
  [[[3, 141, 113], [4, 142, 114]], [[3, 70, 44], [11, 71, 45]], [[17, 47, 21], [4, 48, 22]], [[9, 39, 13], [16, 40, 14]]],
  [[[3, 135, 107], [5, 136, 108]], [[3, 67, 41], [13, 68, 42]], [[15, 54, 24], [5, 55, 25]], [[15, 43, 15], [10, 44, 16]]],
  [[[4, 144, 116], [4, 145, 117]], [[17, 68, 42]], [[17, 50, 22], [6, 51, 23]], [[19, 46, 16], [6, 47, 17]]],
  [[[2, 139, 111], [7, 140, 112]], [[17, 74, 46]], [[7, 54, 24], [16, 55, 25]], [[34, 37, 13]]],
  [[[4, 151, 121], [5, 152, 122]], [[4, 75, 47], [14, 76, 48]], [[11, 54, 24], [14, 55, 25]], [[16, 45, 15], [14, 46, 16]]],
  [[[6, 147, 117], [4, 148, 118]], [[6, 73, 45], [14, 74, 46]], [[11, 54, 24], [16, 55, 25]], [[30, 46, 16], [2, 47, 17]]],
  [[[8, 132, 106], [4, 133, 107]], [[8, 75, 47], [13, 76, 48]], [[7, 54, 24], [22, 55, 25]], [[22, 45, 15], [13, 46, 16]]],
  [[[10, 142, 114], [2, 143, 115]], [[19, 74, 46], [4, 75, 47]], [[28, 50, 22], [6, 51, 23]], [[33, 46, 16], [4, 47, 17]]],
  [[[8, 152, 122], [4, 153, 123]], [[22, 73, 45], [3, 74, 46]], [[8, 53, 23], [26, 54, 24]], [[12, 45, 15], [28, 46, 16]]],
  [[[3, 147, 117], [10, 148, 118]], [[3, 73, 45], [23, 74, 46]], [[4, 54, 24], [31, 55, 25]], [[11, 45, 15], [31, 46, 16]]],
  [[[7, 146, 116], [7, 147, 117]], [[21, 73, 45], [7, 74, 46]], [[1, 53, 23], [37, 54, 24]], [[19, 45, 15], [26, 46, 16]]],
  [[[5, 145, 115], [10, 146, 116]], [[19, 75, 47], [10, 76, 48]], [[15, 54, 24], [25, 55, 25]], [[23, 45, 15], [25, 46, 16]]],
  [[[13, 145, 115], [3, 146, 116]], [[2, 74, 46], [29, 75, 47]], [[42, 54, 24], [1, 55, 25]], [[23, 45, 15], [28, 46, 16]]],
  [[[17, 145, 115]], [[10, 74, 46], [23, 75, 47]], [[10, 54, 24], [35, 55, 25]], [[19, 45, 15], [35, 46, 16]]],
  [[[17, 145, 115], [1, 146, 116]], [[14, 74, 46], [21, 75, 47]], [[29, 54, 24], [19, 55, 25]], [[11, 45, 15], [46, 46, 16]]],
  [[[13, 145, 115], [6, 146, 116]], [[14, 74, 46], [23, 75, 47]], [[44, 54, 24], [7, 55, 25]], [[59, 46, 16], [1, 47, 17]]],
  [[[12, 151, 121], [7, 152, 122]], [[12, 75, 47], [26, 76, 48]], [[39, 54, 24], [14, 55, 25]], [[22, 45, 15], [41, 46, 16]]],
  [[[6, 151, 121], [14, 152, 122]], [[6, 75, 47], [34, 76, 48]], [[46, 54, 24], [10, 55, 25]], [[2, 45, 15], [64, 46, 16]]],
  [[[17, 152, 122], [4, 153, 123]], [[29, 74, 46], [14, 75, 47]], [[49, 54, 24], [10, 55, 25]], [[24, 45, 15], [46, 46, 16]]],
  [[[4, 152, 122], [18, 153, 123]], [[13, 74, 46], [32, 75, 47]], [[48, 54, 24], [14, 55, 25]], [[42, 45, 15], [32, 46, 16]]],
  [[[20, 147, 117], [4, 148, 118]], [[40, 75, 47], [7, 76, 48]], [[43, 54, 24], [22, 55, 25]], [[10, 45, 15], [67, 46, 16]]],
  [[[19, 148, 118], [6, 149, 119]], [[18, 75, 47], [31, 76, 48]], [[34, 54, 24], [34, 55, 25]], [[20, 45, 15], [61, 46, 16]]],
];

// 校正图形中心坐标（下标 = 版本号，0 号位占位，版本 1 没有校正图形）
const ALIGN_POS = [
  [],
  [],
  [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42],
  [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62],
  [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78],
  [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170],
];

// 8 种掩码：返回 true 表示该模块要取反
const MASKS = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
];

// ---------------------------------------------------------------- GF(256)

const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
(function initGF() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
})();

function gmul(a, b) {
  if (a === 0 || b === 0) return 0;
  return EXP[LOG[a] + LOG[b]];
}

/** 生成多项式，返回高位在前的系数数组，长度 degree + 1，首项为 1 */
function genPoly(degree) {
  let p = [1]; // 低位在前，方便做乘法
  for (let i = 0; i < degree; i++) {
    const a = EXP[i];
    const q = new Array(p.length + 1).fill(0);
    for (let k = 0; k < p.length; k++) {
      q[k] ^= gmul(p[k], a);
      q[k + 1] ^= p[k];
    }
    p = q;
  }
  return p.reverse();
}

/** 计算 RS 纠错码字 */
function rsEcc(data, ecLen) {
  const gen = genPoly(ecLen);
  const buf = data.concat(new Array(ecLen).fill(0));
  for (let i = 0; i < data.length; i++) {
    const factor = buf[i];
    if (!factor) continue;
    for (let j = 1; j < gen.length; j++) buf[i + j] ^= gmul(factor, gen[j]);
  }
  return buf.slice(data.length);
}

// ---------------------------------------------------------------- 位流

class BitBuffer {
  constructor() {
    this.bytes = [];
    this.length = 0;
  }
  bit(v) {
    const i = this.length >> 3;
    if (this.bytes.length <= i) this.bytes.push(0);
    if (v) this.bytes[i] |= 0x80 >>> (this.length & 7);
    this.length++;
  }
  put(value, bits) {
    for (let i = bits - 1; i >= 0; i--) this.bit((value >>> i) & 1);
  }
}

// ---------------------------------------------------------------- 版本 / 分块

function eclIndex(ecl) {
  const i = ECL_KEYS.indexOf(String(ecl).toUpperCase());
  return i < 0 ? 1 : i;
}

/** 展平成块列表 [{data, total}] */
function blocks(version, ecl) {
  const groups = RS_BLOCKS[version - 1][eclIndex(ecl)];
  const list = [];
  for (const [count, total, data] of groups) {
    for (let i = 0; i < count; i++) list.push({ total, data });
  }
  return list;
}

function dataCapacity(version, ecl) {
  return blocks(version, ecl).reduce((s, b) => s + b.data, 0);
}

function countBits(version) {
  return version < 10 ? 8 : 16;
}

function pickVersion(byteLength, ecl) {
  for (let v = 1; v <= 40; v++) {
    const need = 4 + countBits(v) + byteLength * 8;
    if (need <= dataCapacity(v, ecl) * 8) return v;
  }
  throw new Error('内容太长，超出二维码容量');
}

// ---------------------------------------------------------------- 数据编码

function buildCodewords(bytes, version, ecl) {
  const blks = blocks(version, ecl);
  const totalData = dataCapacity(version, ecl);
  const bb = new BitBuffer();

  bb.put(0b0100, 4); // 字节模式
  bb.put(bytes.length, countBits(version));
  for (const b of bytes) bb.put(b, 8);

  if (bb.length + 4 <= totalData * 8) bb.put(0, 4); // 终止符
  while (bb.length % 8 !== 0) bb.bit(0);

  let pad = true;
  while (bb.bytes.length < totalData) {
    bb.bytes.push(pad ? 0xec : 0x11);
    pad = !pad;
  }

  const dataBytes = bb.bytes.slice(0, totalData);
  const dataBlocks = [];
  const ecBlocks = [];
  let offset = 0;
  for (const b of blks) {
    const slice = dataBytes.slice(offset, offset + b.data);
    offset += b.data;
    dataBlocks.push(slice);
    ecBlocks.push(rsEcc(slice, b.total - b.data));
  }

  const out = [];
  const maxData = Math.max(...dataBlocks.map((b) => b.length));
  for (let i = 0; i < maxData; i++) {
    for (const b of dataBlocks) if (i < b.length) out.push(b[i]);
  }
  const maxEc = Math.max(...ecBlocks.map((b) => b.length));
  for (let i = 0; i < maxEc; i++) {
    for (const b of ecBlocks) if (i < b.length) out.push(b[i]);
  }
  return out;
}

// ---------------------------------------------------------------- 功能图形

function bch15(value) {
  let d = value << 10;
  while (bitLength(d) >= 11) d ^= 0x537 << (bitLength(d) - 11);
  return ((value << 10) | d) ^ 0x5412;
}

function bch18(value) {
  let d = value << 12;
  while (bitLength(d) >= 13) d ^= 0x1f25 << (bitLength(d) - 13);
  return (value << 12) | d;
}

function bitLength(v) {
  let n = 0;
  while (v !== 0) {
    n++;
    v >>>= 1;
  }
  return n;
}

function drawFinder(m, fn, r0, c0) {
  const n = m.length;
  for (let dr = -1; dr <= 7; dr++) {
    for (let dc = -1; dc <= 7; dc++) {
      const r = r0 + dr;
      const c = c0 + dc;
      if (r < 0 || c < 0 || r >= n || c >= n) continue;
      const inner = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6;
      const dark =
        inner &&
        (dr === 0 || dr === 6 || dc === 0 || dc === 6 || (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4));
      m[r][c] = dark;
      fn[r][c] = true;
    }
  }
}

function drawAlignment(m, fn, r0, c0) {
  for (let dr = -2; dr <= 2; dr++) {
    for (let dc = -2; dc <= 2; dc++) {
      m[r0 + dr][c0 + dc] = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
      fn[r0 + dr][c0 + dc] = true;
    }
  }
}

/** 格式信息的两份位置，按 i = 0..14（低位在前）排列 */
function formatCells(n) {
  const first = [];
  const second = [];
  for (let i = 0; i < 15; i++) {
    // 第一份：环绕左上定位图形
    if (i < 6) first.push([i, 8]);
    else if (i < 8) first.push([i + 1, 8]);
    else first.push([n - 15 + i, 8]);

    // 第二份：右上 + 左下
    if (i < 8) second.push([8, n - i - 1]);
    else if (i === 8) second.push([8, 7]);
    else second.push([8, 15 - i - 1]);
  }
  return { first, second };
}

function placeFormat(m, ecl, mask) {
  const n = m.length;
  const bits = bch15((ECL_FORMAT[String(ecl).toUpperCase()] << 3) | mask);
  const { first, second } = formatCells(n);
  for (let i = 0; i < 15; i++) {
    const on = ((bits >>> i) & 1) === 1;
    m[first[i][0]][first[i][1]] = on;
    m[second[i][0]][second[i][1]] = on;
  }
}

function placeVersion(m, version) {
  if (version < 7) return;
  const n = m.length;
  const bits = bch18(version);
  for (let i = 0; i < 18; i++) {
    const on = ((bits >>> i) & 1) === 1;
    m[Math.floor(i / 3)][(i % 3) + n - 11] = on;
    m[(i % 3) + n - 11][Math.floor(i / 3)] = on;
  }
}

/** 基础骨架：定位、校正、时序、格式/版本预留区 */
function skeleton(version) {
  const n = version * 4 + 17;
  const m = Array.from({ length: n }, () => new Array(n).fill(false));
  const fn = Array.from({ length: n }, () => new Array(n).fill(false));

  drawFinder(m, fn, 0, 0);
  drawFinder(m, fn, 0, n - 7);
  drawFinder(m, fn, n - 7, 0);

  const pos = ALIGN_POS[version];
  for (const r0 of pos) {
    for (const c0 of pos) {
      if (fn[r0][c0]) continue;
      drawAlignment(m, fn, r0, c0);
    }
  }

  // 时序图形
  for (let i = 8; i < n - 8; i++) {
    if (!fn[6][i]) {
      m[6][i] = i % 2 === 0;
      fn[6][i] = true;
    }
    if (!fn[i][6]) {
      m[i][6] = i % 2 === 0;
      fn[i][6] = true;
    }
  }

  // 预留格式信息与固定暗模块
  const fmt = formatCells(n);
  for (const [r, c] of fmt.first.concat(fmt.second)) fn[r][c] = true;
  m[n - 8][8] = true;
  fn[n - 8][8] = true;

  // 预留版本信息
  if (version >= 7) {
    for (let i = 0; i < 18; i++) {
      fn[Math.floor(i / 3)][(i % 3) + n - 11] = true;
      fn[(i % 3) + n - 11][Math.floor(i / 3)] = true;
    }
  }
  return { m, fn };
}

function placeData(m, fn, codewords, mask) {
  const n = m.length;
  const maskFn = MASKS[mask];
  let inc = -1;
  let row = n - 1;
  let bit = 7;
  let byte = 0;
  const total = codewords.length;

  for (let col = n - 1; col > 0; col -= 2) {
    if (col === 6) col -= 1;
    for (;;) {
      for (let k = 0; k < 2; k++) {
        const c = col - k;
        if (!fn[row][c]) {
          let dark = false;
          if (byte < total) dark = ((codewords[byte] >>> bit) & 1) === 1;
          if (maskFn(row, c)) dark = !dark;
          m[row][c] = dark;
          bit--;
          if (bit === -1) {
            byte++;
            bit = 7;
          }
        }
      }
      row += inc;
      if (row < 0 || row >= n) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
}

// ---------------------------------------------------------------- 掩码评分

const PATTERN_A = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
const PATTERN_B = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];

function penalty(m) {
  const n = m.length;
  let score = 0;

  const runScore = (get) => {
    let s = 0;
    let run = 1;
    for (let i = 1; i < n; i++) {
      if (get(i) === get(i - 1)) {
        run++;
        if (run === 5) s += 3;
        else if (run > 5) s += 1;
      } else run = 1;
    }
    return s;
  };
  for (let r = 0; r < n; r++) score += runScore((i) => m[r][i]);
  for (let c = 0; c < n; c++) score += runScore((i) => m[i][c]);

  for (let r = 0; r < n - 1; r++) {
    for (let c = 0; c < n - 1; c++) {
      const v = m[r][c];
      if (v === m[r][c + 1] && v === m[r + 1][c] && v === m[r + 1][c + 1]) score += 3;
    }
  }

  const scan = (get) => {
    let s = 0;
    for (let i = 0; i <= n - 11; i++) {
      let a = true;
      let b = true;
      for (let k = 0; k < 11; k++) {
        const v = get(i + k) ? 1 : 0;
        if (v !== PATTERN_A[k]) a = false;
        if (v !== PATTERN_B[k]) b = false;
      }
      if (a) s += 40;
      if (b) s += 40;
    }
    return s;
  };
  for (let r = 0; r < n; r++) score += scan((i) => m[r][i]);
  for (let c = 0; c < n; c++) score += scan((i) => m[i][c]);

  let dark = 0;
  for (const row of m) for (const v of row) if (v) dark++;
  score += Math.floor(Math.abs((dark * 100) / (n * n) - 50) / 5) * 10;
  return score;
}

// ---------------------------------------------------------------- 对外接口

function matrix(text, ecl = 'M') {
  const level = String(ecl).toUpperCase();
  const bytes = Array.from(Buffer.from(String(text), 'utf8'));
  const version = pickVersion(bytes.length, level);
  const codewords = buildCodewords(bytes, version, level);

  let best = null;
  let bestScore = Infinity;
  let bestMask = 0;

  for (let mask = 0; mask < 8; mask++) {
    const { m, fn } = skeleton(version);
    placeVersion(m, version);
    placeFormat(m, level, mask);
    placeData(m, fn, codewords, mask);
    const s = penalty(m);
    if (s < bestScore) {
      bestScore = s;
      best = m;
      bestMask = mask;
    }
  }

  return { size: best.length, modules: best, version, mask: bestMask, ecl: level, score: bestScore };
}

function svg(text, opts = {}) {
  const { ecl = 'M', margin = 4, dark = '#0b0a12', light = '#ffffff', width, title } = opts;
  const q = matrix(text, ecl);
  const total = q.size + margin * 2;
  let path = '';
  for (let r = 0; r < q.size; r++) {
    for (let c = 0; c < q.size; c++) {
      if (q.modules[r][c]) path += `M${c + margin} ${r + margin}h1v1h-1z`;
    }
  }
  const sizeAttr = width ? ` width="${width}" height="${width}"` : ` width="${total}" height="${total}"`;
  const label = title ? `<title>${escapeXml(title)}</title>` : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}"${sizeAttr}` +
    ` shape-rendering="crispEdges" role="img" aria-label="${escapeXml(title || '二维码')}">` +
    `${label}<rect width="${total}" height="${total}" fill="${light}"/>` +
    `<path d="${path}" fill="${dark}"/></svg>`
  );
}

function escapeXml(s) {
  return String(s).replace(/[<>&"']/g, (ch) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
  })[ch]);
}

function ascii(text, ecl = 'M') {
  const q = matrix(text, ecl);
  const pad = 2;
  const n = q.size + pad * 2;
  let out = '';
  for (let y = 0; y < n; y += 2) {
    for (let x = 0; x < n; x++) {
      const top = inside(q, x - pad, y - pad);
      const bottom = inside(q, x - pad, y + 1 - pad);
      out += top && bottom ? ' ' : top ? '▄' : bottom ? '▀' : '█';
    }
    out += '\n';
  }
  return out;
}

function inside(q, r, c) {
  return r >= 0 && c >= 0 && r < q.size && c < q.size && q.modules[r][c];
}

module.exports = { matrix, svg, ascii, _internal: { bch15, bch18, genPoly, rsEcc, blocks, dataCapacity, skeleton, placeFormat, placeVersion, placeData, MASKS, ECL_FORMAT, ALIGN_POS } };

});

// ---------------------------------------------------------------- lib/store.js
__define('store', function (module, exports, require) {
'use strict';
/**
 * 存储层：默认写本地 JSON 文件；配置了 Upstash Redis 后改为云端存储。
 * 所有写操作串行执行，避免并发覆盖。
 */

const fs = require('node:fs');
const path = require('node:path');

const STATE_KEY = 'songbox:state';

function blankState() {
  return {
    v: 1,
    createdAt: Date.now(),
    settings: {
      open: true,
      title: '晨读歌单',
      subtitle: '英语早读前播放 · 匿名点歌 · 点赞多的先放',
    },
    seq: 0,
    items: [],
    votes: {},
  };
}

function normalize(raw) {
  const state = blankState();
  if (!raw || typeof raw !== 'object') return state;
  if (raw.settings && typeof raw.settings === 'object') {
    state.settings.open = raw.settings.open !== false;
    if (typeof raw.settings.title === 'string') state.settings.title = raw.settings.title.slice(0, 40);
    if (typeof raw.settings.subtitle === 'string') state.settings.subtitle = raw.settings.subtitle.slice(0, 80);
  }
  state.createdAt = Number(raw.createdAt) || Date.now();
  state.seq = Number(raw.seq) || 0;
  if (Array.isArray(raw.items)) {
    state.items = raw.items
      .filter((i) => i && typeof i.id === 'string' && typeof i.song === 'string')
      .map((i) => ({
        id: i.id,
        song: String(i.song).slice(0, 60),
        artist: String(i.artist || '').slice(0, 40),
        alias: String(i.alias || '匿名').slice(0, 20),
        owner: typeof i.owner === 'string' ? i.owner : '',
        createdAt: Number(i.createdAt) || Date.now(),
        likes: 0,
        hidden: !!i.hidden,
        played: !!i.played,
      }));
  }
  if (raw.votes && typeof raw.votes === 'object') state.votes = raw.votes;
  for (const item of state.items) {
    const votes = state.votes[item.id];
    item.likes = votes && typeof votes === 'object' ? Object.keys(votes).length : 0;
  }
  return state;
}

async function readJSON(file) {
  try {
    const raw = await fs.promises.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    if (err instanceof SyntaxError) {
      console.warn('[store] 状态文件损坏，已忽略：', file);
      return null;
    }
    throw err;
  }
}

class FileDriver {
  constructor(dir) {
    this.kind = 'file';
    this.dir = dir;
    this.file = path.join(dir, 'state.json');
    this.memory = null; // 写入失败后退化成内存，至少页面还能用
  }
  async load() {
    if (this.memory) return this.memory;
    return readJSON(this.file);
  }
  async save(state) {
    if (this.memory) {
      this.memory = state;
      return;
    }
    try {
      await fs.promises.mkdir(this.dir, { recursive: true });
      const tmp = `${this.file}.${process.pid}.tmp`;
      await fs.promises.writeFile(tmp, JSON.stringify(state), 'utf8');
      await fs.promises.rename(tmp, this.file);
    } catch (err) {
      console.warn(`[store] 写不进磁盘（${err.code || err.message}），本次运行改用内存存储`);
      this.degraded = true;
      this.memory = state;
    }
  }
}

class UpstashDriver {
  constructor(url, token) {
    this.kind = 'upstash';
    this.url = url.replace(/\/+$/, '');
    this.token = token;
  }
  async cmd(...args) {
    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    if (!res.ok) throw new Error(`Upstash 返回 ${res.status}`);
    const json = await res.json();
    if (json.error) throw new Error(`Upstash 错误：${json.error}`);
    return json.result;
  }
  async load() {
    const raw = await this.cmd('GET', STATE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  async save(state) {
    await this.cmd('SET', STATE_KEY, JSON.stringify(state));
  }
}

class Store {
  /**
   * @param {object} driver 具备 load()/save() 的对象
   * @param {number} ttlMs  内存缓存时长（单实例部署时会自动失效，不会读到旧数据）
   */
  constructor(driver, ttlMs = 0) {
    this.driver = driver;
    this.ttlMs = ttlMs;
    this.state = null;
    this.loadedAt = 0;
    this.queue = Promise.resolve();
  }

  async get() {
    if (this.state && Date.now() - this.loadedAt < this.ttlMs) return this.state;
    const loaded = await this.driver.load();
    this.state = normalize(loaded);
    this.loadedAt = Date.now();
    return this.state;
  }

  /** 读-改-写，串行执行 */
  get kind() {
    return (this.driver && this.driver.kind) || 'unknown';
  }

  /** 存储自检信息：degraded 为 true 说明持久化失败，正在用内存顶着 */
  info() {
    return {
      kind: this.kind,
      degraded: !!(this.driver && this.driver.degraded),
      error: (this.driver && this.driver.lastError) || null,
    };
  }

  update(mutator) {
    const run = async () => {
      const state = await this.get();
      const result = await mutator(state);
      await this.driver.save(state);
      this.state = state;
      this.loadedAt = Date.now();
      return result;
    };
    const next = this.queue.then(run, run);
    this.queue = next.then(
      () => undefined,
      () => undefined
    );
    return next;
  }
}

/**
 * Netlify Blobs：Netlify 自带的键值存储，不用另外注册账号。
 * 万一运行环境里没有这个模块（或者写失败），就退化成内存存储，
 * 页面照样能用，只是重启后数据会回到起点。
 */
class BlobsDriver {
  constructor() {
    this.kind = 'blobs';
    this.storeName = 'songbox';
    this.cache = null;
    this.store = null;
    this.degraded = false;
    this.lastError = null;
  }

  async handle() {
    if (this.store) return this.store;
    if (this.storePromise) return this.storePromise;

    this.storePromise = (async () => {
      const mod = require('@netlify/blobs');
      const getStore =
        (mod && typeof mod.getStore === 'function' && mod.getStore) ||
        (mod && mod.default && typeof mod.default.getStore === 'function' && mod.default.getStore);
      if (!getStore) {
        throw new Error(`@netlify/blobs 没有导出 getStore（导出了：${Object.keys(mod || {}).join(',') || '空'}）`);
      }
      this.store = getStore({ name: this.storeName });
      return this.store;
    })();

    return this.storePromise;
  }

  fail(err) {
    this.lastError = `${err.name || 'Error'}: ${err.message || err}`;
    console.warn('[store] Netlify Blobs 不可用：', this.lastError);
    this.degraded = true;
  }

  async load() {
    if (this.degraded) return this.cache;
    try {
      const raw = await (await this.handle()).get(STATE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      this.fail(err);
      return this.cache;
    }
  }

  async save(state) {
    this.cache = state;
    if (this.degraded) return;
    try {
      await (await this.handle()).set(STATE_KEY, JSON.stringify(state));
    } catch (err) {
      this.fail(err);
    }
  }
}

/** 装了 @netlify/blobs 就说明运行在 Netlify 函数环境里（本地开发没有这个包） */
function hasNetlifyBlobs() {
  try {
    require.resolve('@netlify/blobs');
    return true;
  } catch (err) {
    /* 继续用下面的信号判断 */
  }
  try {
    require('@netlify/blobs');
    return true;
  } catch (err) {
    return false;
  }
}

/** 判断该用哪种存储 */
function pickDriver() {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (upstashUrl && upstashToken) return 'upstash';

  const explicit = process.env.STORE_DRIVER;
  if (explicit === 'file') return 'file';
  if (explicit === 'blobs') return 'blobs';

  // Netlify 函数环境：有 Blobs 上下文，或者跑在 Lambda 沙箱里（磁盘不可写）
  if (process.env.NETLIFY_BLOBS_CONTEXT) return 'blobs';
  if (process.env.NETLIFY || process.env.LAMBDA_TASK_ROOT || process.env.AWS_LAMBDA_FUNCTION_NAME) return 'blobs';
  if (hasNetlifyBlobs()) return 'blobs';
  return 'file';
}

function createStore() {
  const kind = pickDriver();

  if (kind === 'upstash') {
    console.log('[store] 使用 Upstash Redis 云端存储');
    return new Store(
      new UpstashDriver(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN),
      Number(process.env.STATE_CACHE_MS || 20000)
    );
  }

  if (kind === 'blobs') {
    console.log('[store] 使用 Netlify Blobs 存储');
    return new Store(new BlobsDriver(), 0);
  }

  const dir = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
  console.log(`[store] 使用本地文件存储：${dir}`);
  return new Store(new FileDriver(dir), 0);
}

module.exports = { createStore, blankState, normalize, Store };

});

// ---------------------------------------------------------------- server.js
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
const { createStore } = __modules.store;
const qr = __modules.qr;

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

  // ---------- 自检：用的哪种存储、对外地址
  if (method === 'GET' && pathname === '/api/health') {
    const state = await store.get();
    const info = store.info();
    return sendJSON(res, 200, {
      ok: true,
      store: info.kind,
      degraded: info.degraded,
      error: info.error,
      items: state.items.length,
      url: publicBaseUrl(req),
      time: Date.now(),
    });
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

setStaticAssets(__assets);

if (require.main === module) start();

module.exports = { start, server };

process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('SIGINT', () => server.close(() => process.exit(0)));


// ---------------------------------------------------------------- Netlify / 无服务器适配层
// Netlify 的 Functions 不给 Node 的 http 服务器，而是给 event 对象。
// 这里把它包成 req/res，直接复用同一个 handle 函数，逻辑一行都不用改。
const { Readable } = require('node:stream');

async function netlifyHandler(event) {
  const headers = {};
  for (const [key, value] of Object.entries(event.headers || {})) {
    headers[String(key).toLowerCase()] = value;
  }

  const rawUrl = event.rawUrl || ('https://' + (headers.host || 'localhost') + (event.path || '/'));
  const parsed = new URL(rawUrl);

  let body = Buffer.alloc(0);
  if (event.body) {
    body = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : Buffer.from(event.body, 'utf8');
  }

  const req = Readable.from(body.length ? [body] : []);
  req.method = event.httpMethod || 'GET';
  req.url = parsed.pathname + (parsed.search || '');
  req.headers = headers;
  req.socket = {
    remoteAddress: String(headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown',
    encrypted: true,
  };

  const res = { statusCode: 200, headers: {}, chunks: [] };
  res.setHeader = (key, value) => {
    res.headers[key] = String(value);
  };
  res.writeHead = (code, extra) => {
    res.statusCode = code;
    if (extra) for (const [key, value] of Object.entries(extra)) res.headers[key] = String(value);
    return res;
  };
  res.end = (chunk) => {
    if (chunk) res.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
  };
  res.on = () => res;
  res.removeHeader = () => {};

  await handle(req, res);
  return {
    statusCode: res.statusCode,
    headers: res.headers,
    body: Buffer.concat(res.chunks).toString('utf8'),
  };
}

module.exports.handle = handle;
module.exports.handler = netlifyHandler;
