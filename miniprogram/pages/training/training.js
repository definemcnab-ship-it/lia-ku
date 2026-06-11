const app = getApp()
const { courses, programs } = require('./trainingData')

const FILTER_CATEGORIES = ['全部', '颈部', '肩背', '腰腹', '脊背', '膝部', '足弓', '全身']
const CATEGORY_MAP = {
  '颈部': 'neck',
  '肩背': 'shoulder',
  '腰腹': 'pelvis',
  '脊背': 'back',
  '膝部': 'knee',
  '足弓': 'foot',
  '全身': 'full',
}
const LEVEL_CLASS = { '初级': 'beginner', '中级': 'intermediate', '进阶': 'advanced' }

// 列表只需要轻量字段，完整动作数据在播放页按需加载
const courseList = courses.map(c => ({
  id: c.id,
  name: c.name,
  desc: c.desc,
  category: c.category,
  duration: c.duration,
  level: c.level,
  levelClass: LEVEL_CLASS[c.level] || 'beginner',
  icon: c.icon,
  bg: c.bg,
  evidence: c.evidence,
  movesCount: (c.moves || []).length,
}))

const programList = programs.map(p => ({
  id: p.id,
  name: p.name,
  desc: p.desc,
  duration: p.duration,
  sessionsPerWeek: p.sessionsPerWeek || 4,
  level: p.level,
  icon: p.icon,
  color: p.color,
}))

Page({
  data: {
    activeFilter: 0,
    activeTab: 0,
    filters: FILTER_CATEGORIES,
    programs: programList,
    filteredCourses: courseList,
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },
  switchTopTab(e) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.idx) })
  },
  switchFilter(e) {
    const idx = Number(e.currentTarget.dataset.idx)
    const cat = CATEGORY_MAP[FILTER_CATEGORIES[idx]]
    const filtered = cat ? courseList.filter(c => c.category === cat) : courseList
    this.setData({ activeFilter: idx, filteredCourses: filtered })
  },
  startCourse(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/player/player?courseId=${id}` })
  },
  startProgram() {
    wx.showToast({ title: '计划功能即将上线', icon: 'none' })
  },
})
