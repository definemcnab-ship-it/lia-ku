function pad(n) { return n < 10 ? '0' + n : '' + n }
function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) }

// 本周一到周日（用于"本周训练"统计）
function weekRange() {
  const today = new Date()
  const dow = today.getDay()
  const mondayOffset = dow === 0 ? -6 : 1 - dow
  const monday = new Date(today)
  monday.setHours(0, 0, 0, 0)
  monday.setDate(today.getDate() + mondayOffset)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return { monday, sunday }
}

// 构建真正的本月日历网格（周一为首列，含前后补白）
function buildMonthGrid(checkIns) {
  const set = new Set(Array.isArray(checkIns) ? checkIns : [])
  const today = new Date()
  const todayStr = ymd(today)
  const year = today.getFullYear()
  const month = today.getMonth()
  const first = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // 首日是周几（转成周一=0）
  const firstDow = (first.getDay() + 6) % 7
  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push({ blank: true, key: 'b' + i })
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = year + '-' + pad(month + 1) + '-' + pad(d)
    cells.push({
      blank: false,
      key: dateStr,
      num: d,
      checked: set.has(dateStr),
      isToday: dateStr === todayStr,
    })
  }
  // 补齐到整行
  while (cells.length % 7 !== 0) cells.push({ blank: true, key: 'e' + cells.length })
  return cells
}

// 近7天评分趋势：用 scoreHistory 填充，无记录的日子用上一已知分数（前向填充）
function buildWeekTrend(scoreHistory, currentScore) {
  const map = {}
  ;(scoreHistory || []).forEach(h => { map[h.date] = h.score })
  const days = []
  const labels = []
  const today = new Date()
  let last = null
  // 先确定起点分数：7天前之前的最近一次记录
  const sorted = (scoreHistory || []).slice().sort((a, b) => a.date < b.date ? -1 : 1)
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = ymd(d)
    if (map[key] != null) last = map[key]
    if (last == null) {
      // 向前找最近一次历史，否则用当前分
      const prior = sorted.filter(h => h.date <= key)
      last = prior.length ? prior[prior.length - 1].score : currentScore
    }
    days.push(last)
    labels.push(i === 0 ? '今天' : (d.getMonth() + 1) + '/' + d.getDate())
  }
  return { days, labels }
}

const CAT_ICON = {
  neck: 'self_improvement', shoulder: 'accessibility_new', pelvis: 'fitness_center',
  back: 'spa', knee: 'directions_walk', foot: 'directions_walk',
  postpartum: 'spa', full: 'fitness_center',
}
const SCENE_LABEL = { home: '居家', office: '办公室', gym: '健身房' }

// 相对日期：今天 / 昨天 / M月D日
function relDate(dateStr) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr); d.setHours(0, 0, 0, 0)
  const diff = Math.round((today - d) / 86400000)
  if (diff === 0) return '今天'
  if (diff === 1) return '昨天'
  return (d.getMonth() + 1) + '月' + d.getDate() + '日'
}

// 最近训练记录（倒序取最多6条）
function buildRecent(sessions) {
  return sessions.slice(-6).reverse().map((s, i) => ({
    key: s.date + '_' + i,
    name: s.courseName || '训练',
    icon: CAT_ICON[s.category] || 'fitness_center',
    when: relDate(s.date),
    scene: SCENE_LABEL[s.scene] || '',
  }))
}

function buildMilestones(checkInDays, score, maxStreak) {
  return [
    { label: '首次打卡', done: checkInDays >= 1, icon: checkInDays >= 1 ? 'check_circle' : 'star' },
    { label: '连续7天', done: maxStreak >= 7, icon: maxStreak >= 7 ? 'check_circle' : 'star' },
    { label: '体态分70+', done: score >= 70, icon: score >= 70 ? 'check_circle' : 'star' },
    { label: '累计30天', done: checkInDays >= 30, icon: checkInDays >= 30 ? 'check_circle' : 'star' },
    { label: '体态分85+', done: score >= 85, icon: score >= 85 ? 'check_circle' : 'star' },
  ]
}

// 最长连续打卡天数
function maxStreak(checkIns) {
  if (!checkIns || !checkIns.length) return 0
  const days = checkIns.slice().sort()
  let best = 1, cur = 1
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1])
    const curr = new Date(days[i])
    const diff = Math.round((curr - prev) / 86400000)
    if (diff === 1) { cur++; best = Math.max(best, cur) }
    else if (diff > 1) { cur = 1 }
  }
  return best
}

Page({
  data: {
    postureScore: 72,
    diffText: '',
    diffUp: true,
    checkInDays: 0,
    weekSessions: 0,
    totalSessions: 0,
    bars: [],
    milestones: [],
    monthLabel: '',
    weekHeads: ['一', '二', '三', '四', '五', '六', '日'],
    monthCells: [],
    recent: [],
    hasData: false,
  },

  onShow() {
    const a = getApp()
    const checkIns = a.globalData.checkIns || []
    const sessions = a.globalData.sessions || []
    const scoreHistory = a.globalData.scoreHistory || []
    const score = a.globalData.postureScore
    const last = a.globalData.lastScore

    const { monday, sunday } = weekRange()
    const weekSessions = sessions.filter(s => {
      return s.date >= ymd(monday) && s.date <= ymd(sunday)
    }).length

    const diff = score - last
    const trend = buildWeekTrend(scoreHistory, score)
    const streak = maxStreak(checkIns)
    const today = new Date()

    // 计算柱状图高度（min..100 映射到 40..220rpx）
    const lo = Math.max(0, Math.min.apply(null, trend.days) - 5)
    const hi = Math.max.apply(null, trend.days.concat([100]))
    const span = Math.max(1, hi - lo)
    const bars = trend.days.map((v, i) => ({
      value: v,
      label: trend.labels[i],
      h: Math.round(40 + (v - lo) / span * 180),
      isToday: i === trend.days.length - 1,
    }))

    this.setData({
      postureScore: score,
      diffText: diff > 0 ? `较上次提升 ${diff} 分` : diff < 0 ? `较上次下降 ${-diff} 分` : '保持稳定，继续坚持',
      diffUp: diff >= 0,
      checkInDays: checkIns.length,
      weekSessions,
      totalSessions: sessions.length,
      bars,
      milestones: buildMilestones(checkIns.length, score, streak),
      monthLabel: (today.getMonth() + 1) + '月',
      monthCells: buildMonthGrid(checkIns),
      recent: buildRecent(sessions),
      hasData: checkIns.length > 0 || sessions.length > 0,
    })
  },

  goTraining() {
    wx.switchTab({ url: '/pages/training/training' })
  },
})
