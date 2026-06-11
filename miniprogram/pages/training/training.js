const app = getApp()
Page({
  data: {
    activeFilter: 0,
    filters: ['全部','颈部','肩背','腰腹','全身'],
    courses: [
      { id:'c1', name:'颈线 · 养成', desc:'颈线向上 · 轻盈生长', duration:'15分钟', moves:4, level:'初级', icon:'self_improvement', bg:'1' },
      { id:'c2', name:'舒展', desc:'打开肩背 · 重新立住', duration:'20分钟', moves:6, level:'中级', icon:'accessibility_new', bg:'2' },
      { id:'c3', name:'归位', desc:'腰腹清透 · 唤醒核心', duration:'18分钟', moves:5, level:'初级', icon:'fitness_center', bg:'3' },
    ],
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },
  switchFilter(e) { this.setData({ activeFilter: e.currentTarget.dataset.idx }) },
  startCourse(e) { wx.navigateTo({ url: '/pages/player/player' }) },
})
