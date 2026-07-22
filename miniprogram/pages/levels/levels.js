const achievements = require('../../utils/achievements')
const { LEVEL_TABLE, computeXP, computeLevel } = require('../../utils/levelSystem')

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

  onShareAppMessage() {
    const lv = this.data.currentLevel || ''
    return { title: lv ? `我在斯俪升到「${lv}」啦，来一起养成好体态` : '斯俪 · 体态养成，打卡升级', path: '/pages/home/home' }
  },

  onShareTimeline() {
    const lv = this.data.currentLevel || ''
    return { title: lv ? `斯俪体态等级「${lv}」` : '斯俪 · 体态养成' }
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    const a = getApp()
    const checkIns = a.globalData.checkIns || []
    const sessions = a.globalData.sessions || []
    const scanHistory = wx.getStorageSync('scanHistory') || []

    // 成就墙
    const stats = achievements.buildStats(a.globalData, scanHistory)
    const badges = achievements.badgeList(stats)
    const earnedCount = badges.filter(b => b.earned).length

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
      badges,
      earnedCount,
      badgeTotal: badges.length,
    })
  },

  navBack() { wx.navigateBack() },
})
