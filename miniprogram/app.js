App({
  globalData: {
    postureScore: 72,
    lastScore: 68,
    checkIns: [],
    scoreHistory: [], // [{ date: 'YYYY-MM-DD', score }]
    sessions: [],     // [{ date, courseId, courseName, category, scene }]
  },

  onLaunch() {
    // 首次启动跳问卷（TabBar 页无法用 navigateTo，用 onShow 里的路由守卫）
    const done = wx.getStorageSync('onboardingDone')
    if (!done) {
      // 记录需要跳转，home/onShow 里处理（onLaunch 时页面还未挂载，无法直接跳）
      this.globalData.needOnboarding = true
    }
    // 标题字体直接用系统衬线回退（app.wxss 已配置）。
    // 不再从 fonts.gstatic.com 远程加载思源宋体：谷歌域名国内不可达，
    // 每次启动都白白报错，真机用户从来加载不到。

    const score = wx.getStorageSync('postureScore')
    const lastScore = wx.getStorageSync('lastScore')
    const checkIns = wx.getStorageSync('checkIns')
    const scoreHistory = wx.getStorageSync('scoreHistory')
    const sessions = wx.getStorageSync('sessions')
    if (score) this.globalData.postureScore = score
    if (lastScore) this.globalData.lastScore = lastScore
    if (checkIns) this.globalData.checkIns = checkIns
    if (scoreHistory) this.globalData.scoreHistory = scoreHistory
    if (sessions) this.globalData.sessions = sessions
  },

  saveScore(score) {
    this.globalData.lastScore = this.globalData.postureScore
    this.globalData.postureScore = score
    wx.setStorageSync('lastScore', this.globalData.lastScore)
    wx.setStorageSync('postureScore', score)
    // 记录评分历史（同一天覆盖为最新一次）
    const today = this.todayStr()
    const hist = this.globalData.scoreHistory.filter(h => h.date !== today)
    hist.push({ date: today, score })
    this.globalData.scoreHistory = hist
    wx.setStorageSync('scoreHistory', hist)
  },

  addCheckIn(dateStr) {
    if (!this.globalData.checkIns.includes(dateStr)) {
      this.globalData.checkIns.push(dateStr)
      wx.setStorageSync('checkIns', this.globalData.checkIns)
    }
  },

  addSession(session) {
    const rec = Object.assign({ date: this.todayStr() }, session)
    this.globalData.sessions.push(rec)
    // 只保留最近 500 条，避免长期使用后本地存储无限膨胀
    if (this.globalData.sessions.length > 500) {
      this.globalData.sessions = this.globalData.sessions.slice(-500)
    }
    wx.setStorageSync('sessions', this.globalData.sessions)
  },

  todayStr() {
    // 本地时区日期（不能用 toISOString——那是 UTC，北京时间早上 8 点前会记成昨天）
    const d = new Date()
    const p = n => (n < 10 ? '0' + n : '' + n)
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate())
  },
})
