const app = getApp()
const { courses } = require('../training/trainingData')
const { poseSrc, poseMode } = require('./poses')
const { sceneAdapt, sceneLabel } = require('./sceneAdapt')

Page({
  data: {
    courseN: '颈线 · 养成',
    sceneTag: '',
    moves: [],
    currentIdx: 0,
    timeLeft: 30,
    playing: false,
    done: false,
  },

  _timer: null,

  onUnload() { clearInterval(this._timer) },

  onLoad(options) {
    const courseId = options.courseId || 'c1'
    const scene = options.scene || ''
    const course = courses.find(c => c.id === courseId) || courses[0]
    // 先按场景改编动作（办公室缩短/筛选、健身房加器械提示），再补示范插图
    const adapted = sceneAdapt(course.moves || [], scene)
    const moves = adapted.map(m => Object.assign({}, m, {
      pose: poseSrc(m),
      poseMode: poseMode(m),
    }))
    this._course = course
    this._scene = scene
    this.setData({
      courseN: course.name,
      sceneTag: sceneLabel(scene),
      moves: moves,
      timeLeft: moves[0] ? moves[0].duration : 30,
    })
  },

  togglePlay() {
    if (this.data.done) return
    if (this.data.playing) {
      clearInterval(this._timer)
      this.setData({ playing: false })
    } else {
      this.setData({ playing: true })
      this._timer = setInterval(() => {
        let t = this.data.timeLeft - 1
        if (t <= 0) {
          clearInterval(this._timer)
          this.setData({ playing: false })
          this.nextMove()
        } else {
          this.setData({ timeLeft: t })
        }
      }, 1000)
    }
  },

  nextMove() {
    clearInterval(this._timer)
    const next = this.data.currentIdx + 1
    if (next >= this.data.moves.length) {
      this.setData({ done: true, playing: false })
      app.addCheckIn(app.todayStr())
      const c = this._course
      if (c) {
        app.addSession({
          courseId: c.id,
          courseName: c.name,
          category: c.category,
          scene: this._scene || '',
        })
      }
      return
    }
    this.setData({
      currentIdx: next,
      timeLeft: this.data.moves[next].duration,
      playing: false,
    })
  },

  prevMove() {
    clearInterval(this._timer)
    const prev = this.data.currentIdx - 1
    if (prev < 0) return
    this.setData({
      currentIdx: prev,
      timeLeft: this.data.moves[prev].duration,
      playing: false,
    })
  },

  goHome() { wx.switchTab({ url: '/pages/home/home' }) },
  goTraining() { wx.navigateBack() },
  goProgress() { wx.navigateTo({ url: '/pages/progress/progress' }) },
})
