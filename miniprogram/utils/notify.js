// 订阅消息 —— 训练提醒 / 复测提醒
// ─────────────────────────────────────────────────────────────
// 使用前提：在微信公众平台「功能 → 订阅消息 → 公共模板库」中选用
// 两个模板（训练打卡提醒类、检测/复查提醒类各一），把模板 ID 填到
// 下面 TEMPLATE_IDS。ID 为空时本模块所有调用自动跳过，不影响功能。
//
// 说明：小程序端只负责"向用户请求订阅授权"；实际下发推送需要服务端
// 凭 access_token 调用 subscribeMessage.send（后端接入时再补）。

const TEMPLATE_IDS = {
  train: '',    // 训练提醒模板 ID
  rescan: '',   // 复测提醒模板 ID
}

function _ids() {
  return [TEMPLATE_IDS.train, TEMPLATE_IDS.rescan].filter(Boolean)
}

// 在用户完成正向行为（训练完成/查看报告）后调用：
// 此时请求授权接受度最高。静默失败，绝不打断主流程。
function askSubscribe() {
  const ids = _ids()
  if (!ids.length) return
  wx.requestSubscribeMessage({
    tmplIds: ids,
    success: () => {},
    fail: () => {},
  })
}

function isConfigured() {
  return _ids().length > 0
}

module.exports = { askSubscribe, isConfigured, TEMPLATE_IDS }
