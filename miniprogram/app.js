App({
  globalData: {
    postureScore: 72,
    lastScore: 68,
    checkIns: [],
  },

  onLaunch() {
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
