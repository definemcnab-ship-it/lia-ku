const app = getApp()
Page({
  data: {
    postureScore: 72,
    checkInDays: 12,
    weekData: [58, 63, 67, 68, 70, 71, 72],
    weekLabels: ['周一', '周二', '周三', '周四', '周五', '周六', '今天'],
    milestones: [
      { label: '首次打卡', done: true, icon: 'check_circle' },
      { label: '连续7天', done: true, icon: 'check_circle' },
      { label: '体态分70+', done: true, icon: 'check_circle' },
      { label: '连续30天', done: false, icon: 'star' },
      { label: '体态分85+', done: false, icon: 'star' },
    ],
    checkIns: [],
  },
  onShow() {
    const a = getApp()
    this.setData({ postureScore: a.globalData.postureScore, checkIns: a.globalData.checkIns })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },
})
