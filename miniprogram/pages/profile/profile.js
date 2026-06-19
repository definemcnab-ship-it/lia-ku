const LEVEL_TABLE = [
  { name: '晨芽', minXP: 0 },
  { name: '晨星', minXP: 100 },
  { name: '银羽', minXP: 500 },
  { name: '金鹤', minXP: 1200 },
  { name: '斯俪女神', minXP: 2500 },
]

function computeXP(checkIns, sessions, scanHistory) {
  return (checkIns.length * 1) + (sessions.length * 5) + ((scanHistory || []).length * 10)
}

function levelFromXP(xp) {
  let cur = LEVEL_TABLE[0]
  for (const lv of LEVEL_TABLE) {
    if (xp >= lv.minXP) cur = lv
  }
  return cur.name
}

Page({
  data: {
    nickname: '斯俪用户',
    level: '晨芽',
    currentXP: 0,
    postureScore: 72,
    checkInDays: 0,
    menus: [
      { label: '我的训练记录', icon: 'fitness_center' },
      { label: '体态报告', icon: 'analytics' },
      { label: '等级与奖励', icon: 'emoji_events' },
      { label: '饮食日历', icon: 'calendar_month' },
      { label: '斯俪圈子', icon: 'chat_bubble' },
    ],
  },

  onShow() {
    const a = getApp()
    const nickname = wx.getStorageSync('nickname') || '斯俪用户'
    const checkIns = a.globalData.checkIns || []
    const sessions = a.globalData.sessions || []
    const scanHistory = wx.getStorageSync('scanHistory') || []
    const xp = computeXP(checkIns, sessions, scanHistory)

    this.setData({
      nickname,
      postureScore: a.globalData.postureScore,
      checkInDays: checkIns.length,
      currentXP: xp,
      level: levelFromXP(xp),
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 })
    }
  },

  navMenu(e) {
    const routes = [
      '/pages/training/training',
      '/pages/progress/progress',
      '/pages/levels/levels',
      '/pages/diet/diet',
      '/pages/community/community',
    ]
    const url = routes[e.currentTarget.dataset.index]
    if (!url) return
    const tabPages = ['/pages/home/home', '/pages/training/training', '/pages/scan/scan', '/pages/community/community', '/pages/profile/profile']
    if (tabPages.includes(url)) wx.switchTab({ url })
    else wx.navigateTo({ url })
  },

  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确认退出当前账号？',
      success(res) {
        if (res.confirm) wx.reLaunch({ url: '/pages/login/login' })
      },
    })
  },
})
