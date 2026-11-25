// Netlify Functions 入口：真正的逻辑都在仓库根目录的 server.js 里
exports.handler = require('../../server.js').handler;
