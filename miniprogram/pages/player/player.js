const app = getApp()
const { courses } = require('../training/trainingData')
const { poseSrc, poseMode, isDemoAsset } = require('./poses')
const { sceneAdapt, sceneLabel } = require('./sceneAdapt')
const achievements = require('../../utils/achievements')
const notify = require('../../utils/notify')

// 组间休息时长（秒）
const REST_SECS = 30

// 动作阶段 → 中文标签 + 该阶段对应的目标肌群类别
const PHASE_LABELS = {
  release: '松解', stretch: '拉伸',
  activate: '激活', strengthen: '强化',
  integrate: '整合',
}
// 松解/拉伸类动作的目标是"放松"的肌群，激活/强化类是"唤醒"的肌群
function musclesForPhase(tm, phase) {
  if (!tm) return []
  if (phase === 'release' || phase === 'stretch') return tm.release || []
  if (phase === 'activate' || phase === 'strengthen') return tm.activate || []
  return (tm.activate || []).slice(0, 3)   // integrate：显示主要激活肌群
}

Page({
  data: {
    courseN: '',
    sceneTag: '',
    moves: [],
    currentIdx: 0,
    timeLeft: 30,
    playing: false,
    done: false,
    // 组间休息
    resting: false,
    restLeft: REST_SECS,
    currentSet: 1,   // 当前组（1-based）
    totalSets: 1,    // 本动作总组数
    // 总进度
    totalMinutes: 0,
    elapsedSeconds: 0,
    // 完成页正反馈
    weekCount: 0,        // 本周第 N 次训练
    newBadges: [],       // 本次新解锁成就
    nextBadgeHint: '',   // 够得着的下一步
  },

  _timer: null,
  _course: null,
  _scene: '',

  onUnload() { clearInterval(this._timer) },

  onLoad(options) {
    const courseId = options.courseId || 'c1'
    const scene = options.scene || ''
    const course = courses.find(c => c.id === courseId) || courses[0]
    const adapted = sceneAdapt(course.moves || [], scene)
    const moves = adapted.map(m => Object.assign({}, m, {
      pose: poseSrc(m),
      poseMode: poseMode(m),
      demo: isDemoAsset(m),   // 评估素材需显示 © 署名
      phaseLabel: PHASE_LABELS[m.phase] || '',
      muscles: musclesForPhase(course.targetMuscles, m.phase),
    }))
    this._course = course
    this._scene = scene
    // 估算总时长（动作时长 + 组间休息）
    const totalSeconds = moves.reduce((sum, m) => {
      const sets = m.sets || 1
      return sum + m.duration * sets + REST_SECS * (sets - 1)
    }, 0)
    const m0 = moves[0]
    this.setData({
      courseN: course.name,
      sceneTag: sceneLabel(scene),
      moves,
      currentIdx: 0,
      currentSet: 1,
      totalSets: m0 ? (m0.sets || 1) : 1,
      timeLeft: m0 ? m0.duration : 30,
      totalMinutes: Math.ceil(totalSeconds / 60),
      elapsedSeconds: 0,
    })
  },

  togglePlay() {
    if (this.data.done || this.data.resting) return
    if (this.data.playing) {
      clearInterval(this._timer)
      this.setData({ playing: false })
    } else {
      this.setData({ playing: true })
      this._timer = setInterval(() => {
        const t = this.data.timeLeft - 1
        const elapsed = this.data.elapsedSeconds + 1
        if (t <= 0) {
          clearInterval(this._timer)
          this.setData({ playing: false, elapsedSeconds: elapsed })
          this._onMoveTimerEnd()
        } else {
          this.setData({ timeLeft: t, elapsedSeconds: elapsed })
        }
      }, 1000)
    }
  },

  // 当前动作计时结束
  _onMoveTimerEnd() {
    const { currentSet, totalSets, currentIdx, moves } = this.data
    if (currentSet < totalSets) {
      // 还有下一组 → 进入组间休息
      this._startRest()
    } else {
      // 所有组完成 → 下一个动作
      this._goNextMove(currentIdx + 1)
    }
  },

  // 开始组间休息
  _startRest() {
    this.setData({ resting: true, restLeft: REST_SECS })
    this._timer = setInterval(() => {
      const r = this.data.restLeft - 1
      const elapsed = this.data.elapsedSeconds + 1
      if (r <= 0) {
        clearInterval(this._timer)
        const nextSet = this.data.currentSet + 1
        const move = this.data.moves[this.data.currentIdx]
        this.setData({
          resting: false,
          currentSet: nextSet,
          timeLeft: move.duration,
          elapsedSeconds: elapsed,
        })
      } else {
        this.setData({ restLeft: r, elapsedSeconds: elapsed })
      }
    }, 1000)
  },

  // 跳到指定动作索引
  _goNextMove(next) {
    if (next >= this.data.moves.length) {
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
      // 打卡入账后再算成就与本周次数，保证"本次"计入
      const stats = achievements.buildStats(app.globalData, wx.getStorageSync('scanHistory') || [])
      this.setData({
        done: true,
        playing: false,
        weekCount: achievements.weekSessionCount(app.globalData.sessions || []),
        newBadges: achievements.checkNewlyEarned(stats),
        nextBadgeHint: achievements.nextHint(stats),
      })
      // 训练完成的高光时刻请求订阅授权（模板未配置时自动跳过）
      notify.askSubscribe()
      return
    }
    const move = this.data.moves[next]
    this.setData({
      currentIdx: next,
      currentSet: 1,
      totalSets: move.sets || 1,
      timeLeft: move.duration,
      playing: false,
      resting: false,
    })
  },

  nextMove() {
    clearInterval(this._timer)
    this._goNextMove(this.data.currentIdx + 1)
  },

  prevMove() {
    clearInterval(this._timer)
    const prev = this.data.currentIdx - 1
    if (prev < 0) return
    const move = this.data.moves[prev]
    this.setData({
      currentIdx: prev,
      currentSet: 1,
      totalSets: move.sets || 1,
      timeLeft: move.duration,
      playing: false,
      resting: false,
    })
  },

  skipRest() {
    clearInterval(this._timer)
    const nextSet = this.data.currentSet + 1
    const move = this.data.moves[this.data.currentIdx]
    this.setData({
      resting: false,
      currentSet: nextSet,
      timeLeft: move.duration,
    })
  },

  goHome() { wx.switchTab({ url: '/pages/home/home' }) },
  goTraining() { wx.navigateBack() },
  goProgress() { wx.navigateTo({ url: '/pages/progress/progress' }) },
})
