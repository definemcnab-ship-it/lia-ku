const { REHAB_PLANS } = require('./rehabilPlanData')

const SCENE_LABELS = { home: '居家', office: '办公室', gym: '健身房' }
const SCENE_ICONS = { home: 'home', office: 'business_center', gym: 'fitness_center' }
const ISSUE_LABELS = {
  neck: '头颈', shoulder: '肩部', pelvis: '骨盆', back: '腰背', knee: '膝关节', foot: '足弓',
}

Page({
  data: {
    issues: [],            // parsed issue keys from URL
    issueLabels: [],       // human readable labels for tags
    scene: 'home',
    activePhaseIdx: 0,
    plans: [],             // REHAB_PLANS entries for detected issues
    primaryPlan: null,     // the first/main plan to show
    supplementPlans: [],   // additional plans (issues[1..])
    showScience: false,
    scenes: ['home', 'office', 'gym'],
    sceneLabels: SCENE_LABELS,
    sceneIcons: SCENE_ICONS,
    currentPhase: null,
    currentSceneData: null,
  },

  onLoad(options) {
    const issueKeys = (options.issues || 'neck').split(',').filter(Boolean)
    const scene = options.scene || 'home'

    const plans = issueKeys.map(key => REHAB_PLANS[key]).filter(Boolean)
    const primary = plans[0] || null
    const issueLabels = issueKeys.map(k => ISSUE_LABELS[k] || k)

    this.setData({
      issues: issueKeys,
      issueLabels,
      scene,
      plans,
      primaryPlan: primary,
      supplementPlans: plans.slice(1),
    })
    if (primary) {
      wx.setNavigationBarTitle({ title: primary.name })
    }
    this._buildView()
  },

  _buildView() {
    const { primaryPlan, scene, activePhaseIdx } = this.data
    if (!primaryPlan) return
    const phase = primaryPlan.phases[activePhaseIdx]
    const sceneData = phase && phase.scenes && phase.scenes[scene]
    this.setData({ currentPhase: phase, currentSceneData: sceneData })
  },

  switchPhase(e) {
    const idx = +e.currentTarget.dataset.idx
    this.setData({ activePhaseIdx: idx }, () => this._buildView())
  },

  switchScene(e) {
    const scene = e.currentTarget.dataset.scene
    this.setData({ scene }, () => this._buildView())
  },

  toggleScience() {
    this.setData({ showScience: !this.data.showScience })
  },

  startToday() {
    const issueCoursemap = { neck: 'c1', shoulder: 'c4', pelvis: 'c7', back: 'c10', knee: 'c11', foot: 'c13' }
    const key = this.data.issues[0]
    const courseId = issueCoursemap[key] || 'c16'
    wx.navigateTo({ url: `/pages/player/player?courseId=${courseId}` })
  },

  navBack() {
    wx.navigateBack({
      fail: () => wx.switchTab({ url: '/pages/scan/scan' }),
    })
  },
})
