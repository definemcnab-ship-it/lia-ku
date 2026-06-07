const app = getApp()
Page({
  data: {
    activeFilter: 0,
    filters: ['全部','颈部','肩背','腰腹','全身'],
    courses: [
      { id:'c1', name:'天鹅颈塑形', desc:'改善头前引·颈部纤长训练', duration:'15分钟', moves:4, level:'初级', icon:'self_improvement', bg:'1' },
      { id:'c2', name:'圆肩矫正课', desc:'开肩展背·改善含胸驼背', duration:'20分钟', moves:6, level:'中级', icon:'accessibility_new', bg:'2' },
      { id:'c3', name:'骨盆归位训练', desc:'骨盆前倾矫正·腰腹激活', duration:'18分钟', moves:5, level:'初级', icon:'fitness_center', bg:'3' },
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
