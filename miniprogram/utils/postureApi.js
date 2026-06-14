// 体态 AI 分析服务层
// ─────────────────────────────────────────────────────────────
// 封装与后端的通信，并在未配置后端时降级为本地模拟。
//
// 后端接口约定（enabled=true 时）：
//
// 1) 单角度校验  POST {baseUrl}/posture/validate
//    multipart/form-data: file=<图片>, angle=front|side|back
//    返回 JSON: {
//      pass: boolean,            // 是否为合格的该角度单人全身照
//      reason?: string,          // pass=false 时的具体原因
//      fileId?: string           // 服务端保存的文件标识，供 analyze 引用
//    }
//
// 2) 综合分析  POST {baseUrl}/posture/analyze  (application/json)
//    body: { fileIds: { front, side, back } }
//    返回 JSON: {
//      score: number,            // 0-100 挺拔度
//      issues: [                 // 体态问题列表
//        { key, issue, detail }  // key 用于映射课程（见 scan.js POSTURE_MAP）
//      ]
//    }

const { POSTURE_API } = require('../config')

function authHeader() {
  return POSTURE_API.apiKey ? { Authorization: 'Bearer ' + POSTURE_API.apiKey } : {}
}

// ── 单角度校验 ──
function validateAngle(filePath, angle) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: POSTURE_API.baseUrl + '/posture/validate',
      filePath,
      name: 'file',
      formData: { angle },
      header: authHeader(),
      timeout: POSTURE_API.timeout,
      success: (res) => {
        try {
          const data = JSON.parse(res.data)
          resolve(data)
        } catch (e) {
          reject(new Error('校验返回解析失败'))
        }
      },
      fail: (err) => reject(err),
    })
  })
}

// ── 综合分析 ──
function analyze(fileIds) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: POSTURE_API.baseUrl + '/posture/analyze',
      method: 'POST',
      data: { fileIds },
      header: Object.assign({ 'content-type': 'application/json' }, authHeader()),
      timeout: POSTURE_API.timeout,
      success: (res) => {
        if (res.statusCode === 200 && res.data) resolve(res.data)
        else reject(new Error('分析失败'))
      },
      fail: (err) => reject(err),
    })
  })
}

function isEnabled() {
  return !!(POSTURE_API.enabled && POSTURE_API.baseUrl)
}

module.exports = { validateAngle, analyze, isEnabled }
