// XP 计算：打卡1天=1XP，完成训练=5XP，体态扫描=10XP
function computeXP(checkIns, sessions, scanHistory) {
  const xp = (checkIns.length * 1) + (sessions.length * 5) + (scanHistory.length * 10)
  return xp
}

const LEVEL_TABLE = [
  { name: '晨芽',    minXP: 0,    maxXP: 100,  desc: '刚刚开始，踏出第一步', color: '#c8b89a' },
  { name: '晨星',    minXP: 100,  maxXP: 500,  desc: '持续成长中', color: '#8f8779' },
  { name: '银羽',    minXP: 500,  maxXP: 1200, desc: '初见成效，体态蜕变', color: '#a0b5b0' },
  { name: '金鹤',    minXP: 1200, maxXP: 2500, desc: '挺拔优雅，稳步前行', color: '#c0a870' },
  { name: '斯俪女神', minXP: 2500, maxXP: 9999, desc: '优雅巅峰，身体秩序归位', color: '#c08a7d' },
]

function computeLevel(xp) {
  let cur = LEVEL_TABLE[0]
  for (const lv of LEVEL_TABLE) {
    if (xp >= lv.minXP) cur = lv
  }
  return cur
}

Page({
  data: {
    currentXP: 0,
    currentLevel: '晨芽',
    currentLevelColor: '#c8b89a',
    progressPct: 0,
    nextXP: 100,
    xpToNext: 100,
    checkInDays: 0,
    totalSessions: 0,
    levels: [],
    rewards: [
      { label: '专属头像框', xpRequired: 0, unlocked: false },
      { label: '定制训练计划', xpRequired: 100, unlocked: false },
      { label: '1v1 教练咨询', xpRequired: 500, unlocked: false },
    ],
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    const a = getApp()
    const checkIns = a.globalData.checkIns || []
    const sessions = a.globalData.sessions || []
    const scanHistory = wx.getStorageSync('scanHistory') || []

    const xp = computeXP(checkIns, sessions, scanHistory)
    const lv = computeLevel(xp)
    const inLvXP = xp - lv.minXP
    const lvSpan = lv.maxXP - lv.minXP
    const progressPct = lv.maxXP === 9999 ? 100 : Math.min(100, Math.round(inLvXP / lvSpan * 100))

    const levels = LEVEL_TABLE.map(l => ({
      ...l,
      done: xp >= l.maxXP,
      current: l.name === lv.name,
      xpLabel: l.maxXP === 9999 ? `${l.minXP}+ XP` : `${l.minXP}–${l.maxXP} XP`,
    }))

    const rewards = [
      { label: '专属头像框', xpRequired: 0, unlocked: xp >= 0 },
      { label: '定制训练计划', xpRequired: 100, unlocked: xp >= 100 },
      { label: '1v1 教练咨询', xpRequired: 500, unlocked: xp >= 500 },
    ]

    this.setData({
      currentXP: xp,
      currentLevel: lv.name,
      currentLevelColor: lv.color,
      progressPct,
      nextXP: lv.maxXP === 9999 ? lv.minXP : lv.maxXP,
      xpToNext: lv.maxXP === 9999 ? 0 : Math.max(0, lv.maxXP - xp),
      checkInDays: checkIns.length,
      totalSessions: sessions.length,
      levels,
      rewards,
    })
  },

  navBack() { wx.navigateBack() },
})
