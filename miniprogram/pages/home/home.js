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
      { id: 'a1', label: 'AI 检测', title: '乌龟颈，还是天鹅颈？', sub: '一张照片，30 秒看清颈肩的真相', to: '/pages/scan/scan', cta: '立即检测', icon: 'camera', iconColor: '#8f8779' },
      { id: 'a2', label: '七日焕新', title: '把伏案 8 小时，练回来', sub: '每天 10 分钟 · 连续 7 天解锁「晨星」', to: '/pages/training/training', cta: '开始焕新', icon: 'fitness_center', iconColor: '#5a7a5a' },
      { id: 'a3', label: '饮食日历', title: '肩颈的僵硬，一半在餐盘里', sub: '记录三餐，吃出轻盈体态', to: '/pages/diet/diet', cta: '查看日历', icon: 'calendar_month', iconColor: '#8f7a55' },
    ],
    shortcuts: [
      { to: '/pages/scan/scan',         icon: 'camera',         label: '体态档案' },
      { to: '/pages/training/training', icon: 'fitness_center',  label: '训练课' },
      { to: '/pages/diet/diet',         icon: 'restaurant',      label: '饮食' },
      { to: '/pages/progress/progress', icon: 'analytics',       label: '进步' },
      { to: '/pages/levels/levels',     icon: 'emoji_events',    label: '等级' },
    ],
    stories: [
      { id: 's1', icon: 'self_improvement', title: '八周，甩掉"乌龟壳"', sub: '肩背重新舒展', tag: '真实蜕变' },
      { id: 's2', icon: 'accessibility_new', title: '假胯宽消了，腰线回来了', sub: '原来不是胖，是骨盆歪', tag: '体态故事' },
      { id: 's3', icon: 'star', title: '合照里，不再是缩着的那个', sub: '颈线向上生长', tag: '30天打卡' },
      { id: 's4', icon: 'favorite', title: '长回自己', sub: '产后 · 焕新养成', tag: '妈妈蜕变' },
    ],
    categories: [
      { to: '/pages/scan/scan',             icon: 'camera',         title: '体态档案', desc: '挺拔度参考' },
      { to: '/pages/progress/progress',     icon: 'analytics',      title: '进步追踪',     desc: '看见身体的秩序' },
      { to: '/pages/training/training',     icon: 'fitness_center', title: '动作库',       desc: '舒展 · 唤醒 · 复位' },
      { to: '/pages/diet/diet',             icon: 'restaurant',     title: '饮食建议',     desc: '吃出轻盈' },
      { to: '/pages/levels/levels',         icon: 'emoji_events',   title: '斯俪等级',     desc: '打卡解锁专属权益' },
      { to: '/pages/community/community',   icon: 'favorite',       title: '斯俪圈子',     desc: '同好动态与答疑' },
    ],
  },

  onLoad() {
    const sysInfo = wx.getSystemInfoSync()
    this.setData({ statusBarHeight: sysInfo.statusBarHeight })
  },

  onShow() {
    const app = getApp()
    // 首次启动引导问卷
    if (app.globalData.needOnboarding) {
      app.globalData.needOnboarding = false
      wx.navigateTo({ url: '/pages/onboarding/onboarding' })
      return
    }
    const score = app.globalData.postureScore
    const last = app.globalData.lastScore
    const diff = score - last
    const todayStr = app.todayStr()
    const trainedToday = app.globalData.checkIns.includes(todayStr)

    const name = wx.getStorageSync('nickname') || ''
    const namePart = name ? `，${name}` : ''
    const h = new Date().getHours()
    let greetingText = `晚上好${namePart}`
    if (h < 6)  greetingText = `夜深了${namePart}`
    else if (h < 11) greetingText = `早安${namePart}`
    else if (h < 14) greetingText = `午好${namePart}`
    else if (h < 18) greetingText = `下午好${namePart}`

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
    const tabPages = ['/pages/home/home', '/pages/training/training', '/pages/scan/scan', '/pages/community/community', '/pages/profile/profile']
    if (tabPages.includes(url)) wx.switchTab({ url })
    else wx.navigateTo({ url })
  },

  goProfile() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },

  startTraining() {
    wx.switchTab({ url: '/pages/training/training' })
  },
})
