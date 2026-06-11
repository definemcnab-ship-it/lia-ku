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

Page({
  data: {
    activeFilter: 0,
    activeTab: 0,
    filters: FILTER_CATEGORIES,
    courses: courses,
    programs: programs,
    filteredCourses: courses,
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },
  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.idx })
  },
  switchFilter(e) {
    const idx = e.currentTarget.dataset.idx
    const filterName = FILTER_CATEGORIES[idx]
    const cat = CATEGORY_MAP[filterName]
    const filtered = cat ? courses.filter(c => c.category === cat) : courses
    this.setData({ activeFilter: idx, filteredCourses: filtered })
  },
  startCourse(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/player/player?courseId=${id}` })
  },
  startProgram(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '计划功能即将上线', icon: 'none' })
  },
})
