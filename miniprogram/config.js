// 斯俪 Slique — 全局配置
//
// 体态 AI 分析后端接口配置
// ─────────────────────────────────────────────────────────────
// 接入真实后端时：
//   1. 把 enabled 改为 true
//   2. 填入 baseUrl（你的服务器或云函数 HTTPS 域名，需在
//      微信公众平台「开发-服务器域名」里配置 request 与 uploadFile 合法域名）
//   3. 如需鉴权，在 apiKey 填入密钥（会作为 Authorization 头发送）
//
// 后端需提供两个接口（约定见 utils/postureApi.js）：
//   POST {baseUrl}/posture/validate  —— 单角度照片校验
//   POST {baseUrl}/posture/analyze   —— 三角度综合分析
//
// enabled=false 时，前端自动降级为本地模拟（demo 占位），保证可运行。

const POSTURE_API = {
  enabled: false,
  baseUrl: '', // 例如 'https://api.your-domain.com'
  apiKey: '',
  timeout: 15000,
}

module.exports = { POSTURE_API }
