// 成就体系 —— 奖励曲线设计：
// 前 3 天连拿 3 枚（第一步/回来了/三日成势），零门槛先给正反馈；
// 之后间距逐级拉开（5→7→14→21→28），从"轻易够到"过渡到"有挑战"。
// 成就只增不减，已解锁列表持久化在本地 storage。

function pad(n) { return n < 10 ? '0' + n : '' + n }
function dstr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) }

// 从今天（未打卡则从昨天）往前数连续打卡天数
function streakOf(checkIns) {
  const set = new Set(checkIns || [])
  let n = 0
  const d = new Date()
  if (!set.has(dstr(d))) d.setDate(d.getDate() - 1)
  while (set.has(dstr(d))) { n++; d.setDate(d.getDate() - 1) }
  return n
}

// 本周（周一起）训练次数
function weekSessionCount(sessions) {
  const today = new Date()
  const dow = today.getDay()
  const monday = new Date(today)
  monday.setHours(0, 0, 0, 0)
  monday.setDate(today.getDate() + (dow === 0 ? -6 : 1 - dow))
  const mstr = dstr(monday)
  return (sessions || []).filter(s => s.date >= mstr).length
}

// 成就定义：test 收到 stats = { streak, totalSessions, totalCheckIns, totalScans }
const BADGES = [
  // ── 前3天：密集正反馈 ──
  { id: 'first_train', name: '第一步',    icon: 'star',             streakNeed: 0,  desc: '完成首次训练，最难的一步已经迈出', test: s => s.totalSessions >= 1 },
  { id: 'comeback',    name: '回来了',    icon: 'favorite',         streakNeed: 2,  desc: '连续 2 天训练，习惯开始生根', test: s => s.streak >= 2 },
  { id: 'habit3',      name: '三日成势',  icon: 'spa',              streakNeed: 3,  desc: '连续 3 天，身体已经开始期待', test: s => s.streak >= 3 },
  // ── 间距拉开：挑战递增 ──
  { id: 'streak5',     name: '五日连胜',  icon: 'fitness_center',   streakNeed: 5,  desc: '连续 5 天，多数人止步于此，你没有', test: s => s.streak >= 5 },
  { id: 'week7',       name: '整周达成',  icon: 'emoji_events',     streakNeed: 7,  desc: '完整一周，肩颈已经在悄悄回位', test: s => s.streak >= 7 },
  { id: 'fort14',      name: '双周坚持',  icon: 'self_improvement', streakNeed: 14, desc: '14 天，镜子里的变化开始藏不住', test: s => s.streak >= 14 },
  { id: 'form21',      name: '习惯成形',  icon: 'analytics',        streakNeed: 21, desc: '21 天，训练已长成你的一部分', test: s => s.streak >= 21 },
  { id: 'renew28',     name: '28天焕新',  icon: 'emoji_events',     streakNeed: 28, desc: '一个完整周期，去复测看看数据吧', test: s => s.streak >= 28 },
  // ── 累计与检测类 ──
  { id: 'scan1',       name: '直面真相',  icon: 'camera',           streakNeed: 0,  desc: '完成首次 AI 体态检测', test: s => s.totalScans >= 1 },
  { id: 'vol10',       name: '十次沉淀',  icon: 'fitness_center',   streakNeed: 0,  desc: '累计完成 10 次训练', test: s => s.totalSessions >= 10 },
  { id: 'vol30',       name: '三十而立',  icon: 'emoji_events',     streakNeed: 0,  desc: '累计完成 30 次训练，体态由你定义', test: s => s.totalSessions >= 30 },
]

const STORE_KEY = 'earnedBadges'

function buildStats(globalData, scanHistory) {
  const checkIns = (globalData && globalData.checkIns) || []
  const sessions = (globalData && globalData.sessions) || []
  return {
    streak: streakOf(checkIns),
    totalCheckIns: checkIns.length,
    totalSessions: sessions.length,
    totalScans: (scanHistory || []).length,
  }
}

// 返回本次新解锁的成就（并持久化）；无新解锁返回空数组
function checkNewlyEarned(stats) {
  const stored = wx.getStorageSync(STORE_KEY) || []
  const storedSet = {}
  stored.forEach(id => { storedSet[id] = true })
  const fresh = []
  BADGES.forEach(b => {
    if (!storedSet[b.id] && b.test(stats)) fresh.push(b)
  })
  if (fresh.length) {
    wx.setStorageSync(STORE_KEY, stored.concat(fresh.map(b => b.id)))
  }
  return fresh
}

// "够得着的下一步"提示：离当前连续天数最近的未解锁连续类成就
function nextHint(stats) {
  const stored = wx.getStorageSync(STORE_KEY) || []
  const next = BADGES.find(b => b.streakNeed > 0 && stored.indexOf(b.id) < 0 && b.streakNeed > stats.streak)
  if (!next) return ''
  const days = next.streakNeed - stats.streak
  return `再坚持 ${days} 天，解锁「${next.name}」`
}

function allBadges() { return BADGES }
function earnedIds() { return wx.getStorageSync(STORE_KEY) || [] }

module.exports = { buildStats, checkNewlyEarned, nextHint, weekSessionCount, allBadges, earnedIds }
