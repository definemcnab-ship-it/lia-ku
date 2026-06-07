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
    this.setData({ postureScore: a.globalData.postureScore, checkInDays: a.globalData.checkIns.length })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 })
    }
  },
  navMenu(e) { /* placeholder */ },
})
