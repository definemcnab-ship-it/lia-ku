App({
  globalData: {
    postureScore: 72,
    lastScore: 68,
    checkIns: [],
  },

  onLaunch() {
    // 首次启动跳问卷（TabBar 页无法用 navigateTo，用 onShow 里的路由守卫）
    const done = wx.getStorageSync('onboardingDone')
    if (!done) {
      // 记录需要跳转，home/onShow 里处理（onLaunch 时页面还未挂载，无法直接跳）
      this.globalData.needOnboarding = true
    }
    // 加载思源宋体，用于 font-headline（与网页版一致）
    wx.loadFontFace({
      family: 'NotoSerifSC',
      source: 'url("https://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mpm6.woff2")',
      global: true,
      success: () => {},
      fail: () => {},
    })

    const score = wx.getStorageSync('postureScore')
    const lastScore = wx.getStorageSync('lastScore')
    const checkIns = wx.getStorageSync('checkIns')
    if (score) this.globalData.postureScore = score
    if (lastScore) this.globalData.lastScore = lastScore
    if (checkIns) this.globalData.checkIns = checkIns
  },

  saveScore(score) {
    this.globalData.lastScore = this.globalData.postureScore
    this.globalData.postureScore = score
    wx.setStorageSync('lastScore', this.globalData.lastScore)
    wx.setStorageSync('postureScore', score)
  },

  addCheckIn(dateStr) {
    if (!this.globalData.checkIns.includes(dateStr)) {
      this.globalData.checkIns.push(dateStr)
      wx.setStorageSync('checkIns', this.globalData.checkIns)
    }
  },

  todayStr() {
    return new Date().toISOString().slice(0, 10)
  },
})
