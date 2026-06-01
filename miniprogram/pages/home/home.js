const app = getApp()

Page({
  data: {
    statusBarHeight: 20,
    greetingText: '你好',
    postureScore: 72,
    lastScore: 68,
    diffText: '',
    trainedToday: false,
    bannerIdx: 0,
    banners: [
      { id: 'a1', label: '新功能', title: '斯俪等级体系上线', sub: '累计打卡 · 月相成长 · 专属奖品', to: '/pages/levels/levels', cta: '立即查看', bg: 'banner-bg1', emoji: '🏆' },
      { id: 'a2', label: '限时活动', title: '7天体态焕新挑战', sub: '连续打卡7天解锁「晨星」等级', to: '/pages/training/training', cta: '马上挑战', bg: 'banner-bg2', emoji: '💪' },
      { id: 'a3', label: '饮食日历', title: '记录三餐，吃出好体态', sub: '点击查看本月饮食打卡日历', to: '/pages/diet/diet', cta: '查看日历', bg: 'banner-bg3', emoji: '📅' },
    ],
    shortcuts: [
      { to: '/pages/scan/scan',     emoji: '📷', label: 'AI 扫描' },
      { to: '/pages/training/training', emoji: '🏋️', label: '训练课' },
      { to: '/pages/diet/diet',     emoji: '🥗', label: '饮食' },
      { to: '/pages/progress/progress', emoji: '📊', label: '进步' },
      { to: '/pages/levels/levels', emoji: '🏅', label: '等级' },
    ],
    categories: [
      { to: '/pages/scan/scan',     emoji: '📷', title: 'AI 姿态扫描', desc: '快速诊断潜在风险', bg: 'cat-bg1' },
      { to: '/pages/progress/progress', emoji: '📊', title: '进步追踪', desc: '查看体态变化轨迹', bg: 'cat-bg2' },
      { to: '/pages/training/training', emoji: '🏋️', title: '动作库', desc: '探索专业矫正动作', bg: 'cat-bg3' },
      { to: '/pages/diet/diet',     emoji: '🥗', title: '饮食建议', desc: '吃出好体态', bg: 'cat-bg4' },
      { to: '/pages/levels/levels', emoji: '🏆', title: '斯俪等级', desc: '打卡解锁专属权益', bg: 'cat-bg5' },
      { to: '/pages/community/community', emoji: '❤️', title: '斯俪圈子', desc: '同好动态与答疑', bg: 'cat-bg6' },
    ],
  },

  onLoad() {
    const sysInfo = wx.getSystemInfoSync()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight })
  },

  onShow() {
    const app = getApp()
    const score = app.globalData.postureScore
    const last = app.globalData.lastScore
    const diff = score - last
    const todayStr = app.todayStr()
    const trainedToday = app.globalData.checkIns.includes(todayStr)

    const h = new Date().getHours()
    let greetingText = '晚上好，若曦'
    if (h < 6)  greetingText = '夜深了，若曦'
    else if (h < 11) greetingText = '早安，若曦'
    else if (h < 14) greetingText = '午好，若曦'
    else if (h < 18) greetingText = '下午好，若曦'

    this.setData({
      postureScore: score,
      lastScore: last,
      diffText: diff > 0 ? `较上次提升了 ${diff} 分` : diff < 0 ? `较上次下降了 ${-diff} 分` : '坚持训练即可提升',
      trainedToday,
      greetingText,
    })

    // 同步 TabBar 选中态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  onBannerChange(e) {
    this.setData({ bannerIdx: e.detail.current })
  },

  navTo(e) {
    const url = e.currentTarget.dataset.url
    wx.navigateTo({ url })
  },

  goProfile() {
    wx.navigateTo({ url: '/pages/profile/profile' })
  },

  startTraining() {
    wx.navigateTo({ url: '/pages/player/player' })
  },
})
