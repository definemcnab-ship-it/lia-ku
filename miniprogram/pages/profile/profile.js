const { computeXP, levelName } = require('../../utils/levelSystem')

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
      { label: '隐私与条款', icon: 'shield' },
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
      level: levelName(xp),
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 })
    }
  },

  navMenu(e) {
    const index = e.currentTarget.dataset.index
    // 最后一项「隐私与条款」：弹出四份合规文档供选择
    if (index === 5) return this.openLegal()
    const routes = [
      '/pages/training/training',
      '/pages/progress/progress',
      '/pages/levels/levels',
      '/pages/diet/diet',
      '/pages/community/community',
    ]
    const url = routes[index]
    if (!url) return
    const tabPages = ['/pages/home/home', '/pages/training/training', '/pages/scan/scan', '/pages/community/community', '/pages/profile/profile']
    if (tabPages.includes(url)) wx.switchTab({ url })
    else wx.navigateTo({ url })
  },

  openLegal() {
    const items = ['健康与免责声明', '隐私政策', '用户服务协议', '数据采集与使用授权']
    const keys = ['health', 'privacy', 'user', 'data']
    wx.showActionSheet({
      itemList: items,
      success: (r) => {
        if (r.tapIndex >= 0) wx.navigateTo({ url: '/pages/legal/legal?doc=' + keys[r.tapIndex] })
      },
    })
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
