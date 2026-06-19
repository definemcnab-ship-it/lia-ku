const app = getApp()
Page({
  data: {
    nickname: '若曦',
    level: '晨星',
    postureScore: 72,
    checkInDays: 12,
    menus: [
      { label: '我的训练记录', icon: 'fitness_center' },
      { label: '体态报告', icon: 'analytics' },
      { label: '等级与奖励', icon: 'emoji_events' },
      { label: '饮食日历', icon: 'calendar_month' },
      { label: '消息通知', icon: 'notifications' },
    ],
  },
  onShow() {
    const a = getApp()
    const nickname = wx.getStorageSync('nickname') || '斯俪用户'
    this.setData({
      nickname,
      postureScore: a.globalData.postureScore,
      checkInDays: a.globalData.checkIns.length,
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
      null,
    ]
    const url = routes[e.currentTarget.dataset.index]
    if (url) wx.navigateTo({ url })
    else wx.showToast({ title: '功能即将上线', icon: 'none' })
  },
  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确认退出当前账号？',
      success(res) {
        if (res.confirm) wx.reLaunch({ url: '/pages/login/login' })
      }
    })
  },
})
