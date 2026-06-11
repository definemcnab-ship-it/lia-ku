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
      { id: 'a1', label: '新功能', title: '斯俪等级体系上线', sub: '累计打卡 · 月相成长 · 专属奖品', to: '/pages/levels/levels', cta: '立即查看', icon: 'emoji_events', iconColor: '#8f8779' },
      { id: 'a2', label: '限时活动', title: '七日 · 焕新', sub: '连续打卡7天解锁「晨星」等级', to: '/pages/training/training', cta: '开始焕新', icon: 'fitness_center', iconColor: '#5a7a5a' },
      { id: 'a3', label: '饮食日历', title: '记录三餐，吃出好体态', sub: '点击查看本月饮食打卡日历', to: '/pages/diet/diet', cta: '查看日历', icon: 'calendar_month', iconColor: '#8f7a55' },
    ],
    shortcuts: [
      { to: '/pages/scan/scan',         icon: 'camera',         label: '体态档案' },
      { to: '/pages/training/training', icon: 'fitness_center',  label: '训练课' },
      { to: '/pages/diet/diet',         icon: 'restaurant',      label: '饮食' },
      { to: '/pages/progress/progress', icon: 'analytics',       label: '进步' },
      { to: '/pages/levels/levels',     icon: 'emoji_events',    label: '等级' },
    ],
    stories: [
      { id: 's1', icon: 'self_improvement', title: '八周 · 立', sub: '肩背重新舒展', tag: '真实蜕变' },
      { id: 's2', icon: 'accessibility_new', title: '归位，腰线回来了', sub: '身体的秩序', tag: '体态故事' },
      { id: 's3', icon: 'star', title: '颈线，向上生长', sub: '轻盈 · 清透', tag: '30天打卡' },
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
    const tabPages = ['/pages/home/home', '/pages/training/training', '/pages/scan/scan', '/pages/progress/progress', '/pages/profile/profile']
    if (tabPages.includes(url)) wx.switchTab({ url })
    else wx.navigateTo({ url })
  },

  goProfile() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },

  startTraining() {
    wx.navigateTo({ url: '/pages/player/player' })
  },
})
