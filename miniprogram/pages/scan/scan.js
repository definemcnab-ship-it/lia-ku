const app = getApp()
const postureApi = require('../../utils/postureApi')

const ANGLES = [
  {
    key: 'front',
    label: '正面',
    emoji: '⬜',
    desc: '用于检测头前引、圆肩、骨盆倾斜',
    reqs: [
      '全身完整入镜（头顶到脚踝）',
      '双脚与肩同宽，脚尖朝前',
      '手臂自然垂落于体侧',
      '目视正前方，表情放松',
    ],
    tip: '距相机约1.5-2米，背景简单，光线均匀',
  },
  {
    key: 'side',
    label: '侧面',
    emoji: '⬜',
    desc: '用于检测骨盆前倾、腰椎曲线、膝超伸',
    reqs: [
      '全身完整入镜',
      '侧身站立，耳、肩、髋、踝成一线',
      '手臂自然垂落，不交叉抱胸',
      '自然呼吸，不要刻意挺胸或收腹',
    ],
    tip: '左侧或右侧均可，侧面照是骨盆检测的关键',
  },
  {
    key: 'back',
    label: '背面',
    emoji: '⬜',
    desc: '用于检测脊柱侧弯、肩膀高低、足外翻',
    reqs: [
      '全身完整入镜',
      '双脚与肩同宽，脚尖朝前',
      '手臂自然垂落',
      '头部正直，不偏转',
    ],
    tip: '背对相机，请他人辅助拍摄效果更佳',
  },
]

const FAIL_REASONS = [
  '全身未完全入镜，请后退调整距离',
  '光线不足，请在明亮处重新拍摄',
  '角度偏差过大，请重新摆好姿势',
  '图像模糊，请保持稳定后重拍',
]

const POSTURE_MAP = [
  {
    key: 'neck',
    issue: '颈线前移，头前引趋势',
    detail: '深颈屈肌激活不足，上斜方肌代偿过度',
    courseId: 'c1', courseName: '颈线 · 归位（居家）',
    icon: 'self_improvement',
  },
  {
    key: 'shoulder',
    issue: '双肩轻微含胸内扣',
    detail: '胸小肌紧张，中下斜方肌偏弱',
    courseId: 'c4', courseName: '肩背 · 舒展（居家）',
    icon: 'accessibility_new',
  },
  {
    key: 'pelvis',
    issue: '骨盆轻微前倾',
    detail: '髂腰肌缩短，臀大肌激活不足',
    courseId: 'c7', courseName: '骨盆 · 归位（居家）',
    icon: 'fitness_center',
  },
  {
    key: 'back',
    issue: '腰背代偿性紧张',
    detail: '多裂肌稳定性不足，竖脊肌过度用力',
    courseId: 'c10', courseName: '腰背 · 安放（居家）',
    icon: 'spa',
  },
  {
    key: 'knee',
    issue: '膝关节稳定性有提升空间',
    detail: 'VMO激活不足，臀中肌偏弱',
    courseId: 'c11', courseName: '膝稳 · 养成（居家）',
    icon: 'directions_walk',
  },
  {
    key: 'foot',
    issue: '内侧足弓需要强化',
    detail: '足底内在肌及胫骨后肌偏弱',
    courseId: 'c13', courseName: '足弓 · 生长（居家）',
    icon: 'directions_walk',
  },
]

const SCENE_REMAP = {
  neck:     { office: ['c2', '颈线 · 唤醒（办公室）'], gym: ['c3', '颈背 · 强化（健身房）'] },
  shoulder: { office: ['c5', '肩背 · 减压（办公室）'], gym: ['c6', '肩背 · 重塑（健身房）'] },
  pelvis:   { office: ['c8', '骨盆 · 立（办公室）'],   gym: ['c9', '核心 · 立（健身房）'] },
}

function adaptScene(item, scene) {
  const m = SCENE_REMAP[item.key]
  if (!m || !m[scene]) return item
  return Object.assign({}, item, { courseId: m[scene][0], courseName: m[scene][1] })
}

function simulate(prefs, lastScore) {
  const shuffled = POSTURE_MAP.slice().sort(() => Math.random() - 0.5)
  const count = Math.random() < 0.5 ? 2 : 3
  const scene = (prefs && prefs.scene && prefs.scene[0]) || 'home'
  const issues = shuffled.slice(0, count).map(item => adaptScene(item, scene))
  const score = Math.min(100, lastScore + Math.floor(Math.random() * 5) + 1)
  return { score, issues }
}

// 后端返回的 issues 仅含 {key, issue, detail}，用 POSTURE_MAP 补全图标与课程
function enrichIssues(rawIssues, prefs) {
  const scene = (prefs && prefs.scene && prefs.scene[0]) || 'home'
  return (rawIssues || []).map(raw => {
    const base = POSTURE_MAP.find(p => p.key === raw.key) || {}
    const merged = Object.assign({}, base, {
      issue: raw.issue || base.issue,
      detail: raw.detail || base.detail,
    })
    return adaptScene(merged, scene)
  })
}

// 后端返回的 reviews 为低置信「建议人工复核」提示，不计入评分、不映射课程
function enrichReviews(rawReviews) {
  return (rawReviews || []).map(raw => ({
    issue: raw.issue,
    detail: raw.detail,
    icon: 'info',
  }))
}

Page({
  data: {
    // step: 'guide' | 'prep' | 'angle' | 'checking' | 'fail' | 'analyzing' | 'result'
    step: 'guide',
    prepTab: 0,            // prep 页当前 tab 0=着装 1=示范 2=说明
    angleIdx: 0,          // 当前拍摄角度 0/1/2
    angles: ANGLES,
    passed: [false, false, false], // 各角度是否通过
    failReason: '',
    analyzing: false,
    result: null,
    history: [],
    prefs: null,
  },

  _fileIds: { front: '', side: '', back: '' }, // 后端模式下各角度文件标识

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
    const prefs = wx.getStorageSync('prefs') || null
    const history = wx.getStorageSync('scanHistory') || []
    this.setData({ prefs, history })
  },

  startGuide() {
    this.setData({ step: 'prep', prepTab: 0 })
  },

  setPrepTab(e) {
    this.setData({ prepTab: e.currentTarget.dataset.tab })
  },

  startScan() {
    this.setData({ step: 'angle', angleIdx: 0, passed: [false, false, false] })
  },

  uploadAngle() {
    if (this.data.step === 'checking' || this.data.step === 'analyzing') return
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera', 'album'],
      fail: (err) => {
        const msg = (err && err.errMsg) || ''
        // 用户主动取消：静默返回
        if (msg.indexOf('cancel') > -1) return
        // 权限被拒绝：引导前往设置开启
        if (msg.indexOf('auth') > -1 || msg.indexOf('permission') > -1 || msg.indexOf('deny') > -1) {
          wx.showModal({
            title: '需要相机/相册权限',
            content: '体态检测需要拍摄或选择照片，请在设置中开启权限',
            confirmText: '去设置',
            cancelText: '暂不',
            success: (r) => { if (r.confirm) wx.openSetting() },
          })
        } else {
          wx.showToast({ title: '获取照片失败，请重试', icon: 'none' })
        }
      },
      success: (res) => {
        const filePath = res.tempFiles && res.tempFiles[0] && res.tempFiles[0].tempFilePath
        this.setData({ step: 'checking' })
        if (postureApi.isEnabled()) {
          this._validateReal(filePath)
        } else {
          this._validateSimulated()
        }
      },
    })
  },

  // ── 真实后端校验 ──
  _validateReal(filePath) {
    const angle = ANGLES[this.data.angleIdx]
    postureApi.validateAngle(filePath, angle.key)
      .then((data) => {
        if (!data || !data.pass) {
          this.setData({ step: 'fail', failReason: (data && data.reason) || '照片不符合要求，请重新拍摄' })
          return
        }
        this._fileIds[angle.key] = data.fileId || ''
        this._advance()
      })
      .catch(() => {
        this.setData({ step: 'fail', failReason: '网络异常，照片校验失败，请重试' })
      })
  },

  // ── 模拟校验（无后端时降级）──
  _validateSimulated() {
    setTimeout(() => {
      const pass = Math.random() > 0.2
      if (!pass) {
        const reason = FAIL_REASONS[Math.floor(Math.random() * FAIL_REASONS.length)]
        this.setData({ step: 'fail', failReason: reason })
      } else {
        this._advance()
      }
    }, 1800)
  },

  // 通过当前角度 → 进入下一角度或综合分析
  _advance() {
    const passed = this.data.passed.slice()
    passed[this.data.angleIdx] = true
    const next = this.data.angleIdx + 1
    if (next >= ANGLES.length) {
      this.setData({ passed, step: 'analyzing' })
      if (postureApi.isEnabled()) this._analyzeReal()
      else setTimeout(() => this._finishAnalysis(simulate(this.data.prefs, app.globalData.postureScore)), 2500)
    } else {
      this.setData({ passed, step: 'angle', angleIdx: next })
    }
  },

  // ── 真实后端综合分析 ──
  _analyzeReal() {
    postureApi.analyze(this._fileIds)
      .then((data) => {
        const result = {
          score: data.score,
          issues: enrichIssues(data.issues, this.data.prefs),
          reviews: enrichReviews(data.reviews),
        }
        this._finishAnalysis(result)
      })
      .catch(() => {
        wx.showToast({ title: '分析失败，请重试', icon: 'none' })
        this.setData({ step: 'angle', angleIdx: 0, passed: [false, false, false] })
      })
  },

  retry() {
    this.setData({ step: 'angle' })
  },

  _finishAnalysis(result) {
    app.saveScore(result.score)
    const today = new Date().toISOString().slice(0, 10)
    const history = (wx.getStorageSync('scanHistory') || [])
    history.push({ date: today, score: result.score, issueCount: result.issues.length })
    wx.setStorageSync('scanHistory', history)
    this.setData({ step: 'result', result, history })
  },

  goToCourse(e) {
    const { courseId } = e.currentTarget.dataset
    wx.navigateTo({ url: '/pages/player/player?courseId=' + courseId })
  },

  resetAll() {
    this._fileIds = { front: '', side: '', back: '' }
    this.setData({ step: 'guide', angleIdx: 0, passed: [false, false, false], result: null })
  },
})
