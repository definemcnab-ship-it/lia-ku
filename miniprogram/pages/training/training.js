const app = getApp()
const { courses, programs } = require('./trainingData')

const FILTER_CATEGORIES = ['全部', '颈部', '肩背', '腰腹', '脊背', '下肢', '产后', '全身']
const CATEGORY_MAP = {
  '颈部': ['neck'],
  '肩背': ['shoulder'],
  '腰腹': ['pelvis'],
  '脊背': ['back'],
  '下肢': ['knee', 'foot'],
  '产后': ['postpartum'],
  '全身': ['full'],
}
const LEVEL_CLASS = { '初级': 'beginner', '中级': 'intermediate', '进阶': 'advanced' }
const SCENES = ['全部', '居家', '办公室', '健身房']
const SCENE_KEY = { '居家': 'home', '办公室': 'office', '健身房': 'gym' }

const courseList = courses.map(c => ({
  id: c.id,
  name: c.name,
  desc: c.desc,
  category: c.category,
  scenes: c.scenes || ['home'],
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
  scenes: p.scenes || ['home'],
  duration: p.duration,
  sessionsPerWeek: p.sessionsPerWeek || 4,
  level: p.level,
  icon: p.icon,
  color: p.color,
}))

function applyFilters(scene, category) {
  let list = courseList
  if (scene !== '全部') {
    const key = SCENE_KEY[scene]
    list = list.filter(c => c.scenes.indexOf(key) !== -1)
  }
  if (category !== '全部') {
    const cats = CATEGORY_MAP[category]
    if (cats) list = list.filter(c => cats.indexOf(c.category) !== -1)
  }
  return list
}

function filterPrograms(scene) {
  if (scene === '全部') return programList
  const key = SCENE_KEY[scene]
  return programList.filter(p => p.scenes.indexOf(key) !== -1)
}

// 根据扫描问题 key 推荐首选课程
const ISSUE_TO_COURSE = {
  neck: 'c1', shoulder: 'c4', pelvis: 'c7', back: 'c10',
  knee: 'c11', foot: 'c13',
}

function getRecommend(scene) {
  // 从最近扫描结果取第一个问题
  let courseId = 'c16'
  try {
    const history = wx.getStorageSync('scanHistory') || []
    if (history.length) {
      const latest = history[history.length - 1]
      const issues = latest.issues || []
      if (issues.length) {
        const key = issues[0].key || issues[0]
        const mapped = ISSUE_TO_COURSE[key]
        if (mapped) courseId = mapped
      }
    }
  } catch (e) {}
  // 按场景偏移
  const sceneKey = SCENE_KEY[scene] || 'home'
  const sceneOffset = { home: 0, office: 1, gym: 2 }
  const idNum = parseInt(courseId.replace('c', ''))
  const sceneId = `c${idNum + (sceneOffset[sceneKey] || 0)}`
  const found = courseList.find(c => c.id === sceneId) || courseList.find(c => c.id === courseId) || courseList[0]
  return found
}

Page({
  data: {
    activeFilter: 0,
    activeScene: 0,
    activeTab: 0,
    filters: FILTER_CATEGORIES,
    scenes: SCENES,
    programs: programList,
    filteredCourses: courseList,
    recommend: courseList.find(c => c.id === 'c16') || courseList[0],
  },
  _applyScene(sceneIdx) {
    const scene = SCENES[sceneIdx]
    const category = FILTER_CATEGORIES[this.data.activeFilter]
    this.setData({
      activeScene: sceneIdx,
      filteredCourses: applyFilters(scene, category),
      programs: filterPrograms(scene),
      recommend: getRecommend(scene),
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    const scene = SCENES[this.data.activeScene]
    this.setData({ recommend: getRecommend(scene) })
  },
  switchTopTab(e) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.idx) })
  },
  switchScene(e) {
    this._applyScene(Number(e.currentTarget.dataset.idx))
  },
  switchFilter(e) {
    const idx = Number(e.currentTarget.dataset.idx)
    const category = FILTER_CATEGORIES[idx]
    const scene = SCENES[this.data.activeScene]
    this.setData({
      activeFilter: idx,
      filteredCourses: applyFilters(scene, category),
    })
  },
  startCourse(e) {
    const id = e.currentTarget.dataset.id
    const scene = SCENE_KEY[SCENES[this.data.activeScene]]
    const q = scene ? `&scene=${scene}` : ''
    wx.navigateTo({ url: `/pages/player/player?courseId=${id}${q}` })
  },
  startProgram(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/plan/plan?planId=${id}` })
  },
})
