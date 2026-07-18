// 斯俪 Slique — 全局配置
//
// 体态 AI 分析后端接口配置
// ─────────────────────────────────────────────────────────────
// ⚠️ 安全约定：API 密钥不写在本文件（本仓库是公开的，写进来等于泄露）。
//
// 接入步骤：
//   1. 复制 config.secret.example.js 为 config.secret.js（该文件已被
//      .gitignore 忽略，永远不会提交到 Git）
//   2. 在 config.secret.js 里填入服务器部署时生成的密钥
//   3. baseUrl 需在微信公众平台「开发-服务器域名」里配置为
//      request 与 uploadFile 合法域名
//
// 后端需提供两个接口（约定见 utils/postureApi.js）：
//   POST {baseUrl}/posture/validate  —— 单角度照片校验
//   POST {baseUrl}/posture/analyze   —— 三角度综合分析
//
// enabled=false 或未配置密钥时，前端自动降级为本地模拟，保证可运行。

let secret = { apiKey: '' }
try {
  // 本地密钥文件（不入库）；不存在时静默降级
  secret = require('./config.secret.js')
} catch (e) { /* 未配置密钥：走本地模拟 */ }

const POSTURE_API = {
  enabled: true,
  // ⚠️ 端口说明（重要）：
  //   域名 slique.cn 尚未 ICP 备案，国内云厂商会拦截未备案域名的
  //   443/80 外部访问，故开发阶段暂走 8443 绕行（需开发者工具勾选
  //   「不校验合法域名」）。
  //   微信正式发布强制要求：域名已备案 + 标准 443（不允许带端口）。
  //   ICP 备案通过后：把下面地址改为 'https://api.slique.cn'，并在
  //   微信公众平台「开发设置-服务器域名」配置 request 与 uploadFile
  //   合法域名。服务器端 Caddy 已同时监听 443 与 8443，无需改动。
  baseUrl: 'https://api.slique.cn:8443',
  apiKey: (secret && secret.apiKey) || '',
  timeout: 40000,
}

module.exports = { POSTURE_API }
