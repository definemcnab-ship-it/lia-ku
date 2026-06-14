const app = getApp()

// 体态问题 → 对应课程映射（居家为默认）
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
    issue: '腰背存在代偿性紧张',
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

// 根据场景偏好调整建议课程
function adaptScene(item, scene) {
  const sceneMap = {
    neck:     { office: 'c2', gym: 'c3', officeName: '颈线 · 唤醒（办公室）', gymName: '颈背 · 强化（健身房）' },
    shoulder: { office: 'c5', gym: 'c6', officeName: '肩背 · 减压（办公室）', gymName: '肩背 · 重塑（健身房）' },
    pelvis:   { office: 'c8', gym: 'c9', officeName: '骨盆 · 立（办公室）',   gymName: '核心 · 立（健身房）' },
  }
  const m = sceneMap[item.key]
  if (!m) return item
  if (scene === 'office' && m.office) return Object.assign({}, item, { courseId: m.office, courseName: m.officeName })
  if (scene === 'gym' && m.gym) return Object.assign({}, item, { courseId: m.gym, courseName: m.gymName })
  return item
}

// 模拟AI分析：随机选2-3个问题 + 评分略高于上次
function simulate(prefs, lastScore) {
  const shuffled = POSTURE_MAP.slice().sort(() => Math.random() - 0.5)
  const count = Math.random() < 0.5 ? 2 : 3
  const selected = shuffled.slice(0, count)
  const scene = (prefs && prefs.scene && prefs.scene[0]) || 'home'
  const adapted = selected.map(item => adaptScene(item, scene))
  const score = Math.min(100, lastScore + Math.floor(Math.random() * 5))
  return { score, issues: adapted }
}

function scoreLabel(score) {
  if (score >= 90) return '姿态非常好'
  if (score >= 80) return '整体姿态良好'
  if (score >= 70) return '有改善空间'
  return '建议系统训练'
}

function relDate(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0)
  const d = new Date(dateStr); d.setHours(0,0,0,0)
  const diff = Math.round((today - d) / 86400000)
  if (diff === 0) return '今天'
  if (diff === 1) return '昨天'
  return (d.getMonth()+1) + '月' + d.getDate() + '日'
}

Page({
  data: {
    scanning: false,
    result: null,
    history: [],
    prefs: null,
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
    const prefs = wx.getStorageSync('prefs') || null
    const history = wx.getStorageSync('scanHistory') || []
    this.setData({ prefs, history })
  },

  startScan() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera', 'album'],
      success: () => {
        this.setData({ scanning: true, result: null })
        setTimeout(() => {
          const { prefs } = this.data
          const lastScore = app.globalData.postureScore
          const result = simulate(prefs, lastScore)

          // 更新评分并记录历史
          app.saveScore(result.score)

          // 保存扫描档案
          const today = new Date().toISOString().slice(0, 10)
          const rec = {
            date: today,
            score: result.score,
            issueCount: result.issues.length,
          }
          const history = (wx.getStorageSync('scanHistory') || [])
          history.push(rec)
          wx.setStorageSync('scanHistory', history)

          this.setData({ scanning: false, result, history })
        }, 2200)
      },
    })
  },

  goToCourse(e) {
    const { courseId } = e.currentTarget.dataset
    wx.navigateTo({ url: '/pages/player/player?courseId=' + courseId })
  },

  reset() {
    this.setData({ result: null })
  },
})
