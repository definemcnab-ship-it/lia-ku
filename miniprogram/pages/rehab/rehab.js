const { REHAB_PLANS } = require('./rehabilPlanData')

const SCENE_LABELS = { home: '居家', office: '办公室', gym: '健身房' }
const SCENE_ICONS = { home: 'home', office: 'business_center', gym: 'fitness_center' }
const ISSUE_LABELS = {
  neck: '头颈', shoulder: '肩部', pelvis: '骨盆', back: '腰背', knee: '膝关节', foot: '足弓',
}
const WEEK_LABELS = ['第1周', '第2周', '第3周', '第4周']

Page({
  data: {
    issues: [],            // parsed issue keys from URL
    issueLabels: [],       // human readable labels for tags
    scene: 'home',
    activePhaseIdx: 0,
    activeWeekIdx: 0,      // 0..3 → W1..W4 within active phase
    plans: [],             // REHAB_PLANS entries for detected issues
    primaryPlan: null,     // the first/main plan to show
    supplementPlans: [],   // additional plans (issues[1..])
    showScience: false,
    scenes: ['home', 'office', 'gym'],
    sceneLabels: SCENE_LABELS,
    sceneIcons: SCENE_ICONS,
    weekLabels: WEEK_LABELS,
    currentPhase: null,
    currentSceneData: null,
    currentWeekPlan: null,        // active weekPlan of primary plan
    combinedSessions: [],         // primary plan sessions for current week
    supplementBlocks: [],         // [{ name, icon, weekTheme, sessions }] from other issues
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

  // pull a weekPlan out of a plan for given phase/scene/week index
  _getWeekPlan(plan, phaseIdx, scene, weekIdx) {
    if (!plan || !plan.phases) return null
    const phase = plan.phases[phaseIdx]
    const sceneData = phase && phase.scenes && phase.scenes[scene]
    if (!sceneData || !sceneData.weekPlans) return null
    return sceneData.weekPlans[weekIdx] || sceneData.weekPlans[0] || null
  },

  buildCombinedSessions() {
    const { plans, activePhaseIdx, scene, activeWeekIdx } = this.data
    const primary = plans[0]

    const primaryWeek = this._getWeekPlan(primary, activePhaseIdx, scene, activeWeekIdx)
    const combinedSessions = (primaryWeek && primaryWeek.sessions) || []

    // supplement blocks: one card per additional issue, showing that issue's
    // sessions for the same phase / scene / week
    const supplementBlocks = plans.slice(1).map(plan => {
      const wk = this._getWeekPlan(plan, activePhaseIdx, scene, activeWeekIdx)
      return {
        name: plan.name,
        icon: plan.icon,
        weekTheme: wk ? wk.theme : '',
        sessions: (wk && wk.sessions) || [],
      }
    }).filter(b => b.sessions.length > 0)

    return { primaryWeek, combinedSessions, supplementBlocks }
  },

  _buildView() {
    const { primaryPlan, scene, activePhaseIdx } = this.data
    if (!primaryPlan) return
    const phase = primaryPlan.phases[activePhaseIdx]
    const sceneData = phase && phase.scenes && phase.scenes[scene]
    const { primaryWeek, combinedSessions, supplementBlocks } = this.buildCombinedSessions()

    this.setData({
      currentPhase: phase,
      currentSceneData: sceneData,
      currentWeekPlan: primaryWeek,
      combinedSessions,
      supplementBlocks,
    })
  },

  switchPhase(e) {
    const idx = +e.currentTarget.dataset.idx
    this.setData({ activePhaseIdx: idx, activeWeekIdx: 0 }, () => this._buildView())
  },

  switchScene(e) {
    const scene = e.currentTarget.dataset.scene
    this.setData({ scene }, () => this._buildView())
  },

  switchWeek(e) {
    const idx = +e.currentTarget.dataset.idx
    this.setData({ activeWeekIdx: idx }, () => this._buildView())
  },

  toggleScience() {
    this.setData({ showScience: !this.data.showScience })
  },

  startToday() {
    const issueCoursemap = { neck: 'c1', shoulder: 'c4', pelvis: 'c7', back: 'c10', knee: 'c11', foot: 'c13' }
    const key = this.data.issues[0]
    const courseId = issueCoursemap[key] || 'c16'
    // 带上当前选中的场景，让播放器做居家/办公室/健身房动作适配
    wx.navigateTo({ url: `/pages/player/player?courseId=${courseId}&scene=${this.data.scene}` })
  },

  navBack() {
    wx.navigateBack({
      fail: () => wx.switchTab({ url: '/pages/scan/scan' }),
    })
  },
})
