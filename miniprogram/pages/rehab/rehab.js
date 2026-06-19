const { REHAB_PLANS } = require('./rehabilPlanData')

const SCENE_LABELS = { home: '居家', office: '办公室', gym: '健身房' }
const SCENE_ICONS = { home: 'home', office: 'business_center', gym: 'fitness_center' }
const ISSUE_LABELS = {
  neck: '头颈', shoulder: '肩部', pelvis: '骨盆', back: '腰背', knee: '膝关节', foot: '足弓',
}

function buildCombinedSessions(issueKeys, scene, phaseIdx, weekIdx) {
  const primary = REHAB_PLANS[issueKeys[0]]
  if (!primary) return { baseSessions: [], supplementBlocks: [] }
  const phase = primary.phases[phaseIdx]
  const sceneData = phase && phase.scenes && phase.scenes[scene]
  const weekPlan = sceneData && sceneData.weekPlans && sceneData.weekPlans[weekIdx]
  const baseSessions = (weekPlan && weekPlan.sessions) || []

  const supplementBlocks = []
  for (let i = 1; i < issueKeys.length; i++) {
    const plan = REHAB_PLANS[issueKeys[i]]
    if (!plan) continue
    const suppPhase = plan.phases[phaseIdx]
    const suppScene = suppPhase && suppPhase.scenes && suppPhase.scenes[scene]
    const suppWeek = suppScene && suppScene.weekPlans && suppScene.weekPlans[weekIdx]
    const suppSession = suppWeek && suppWeek.sessions && suppWeek.sessions[0]
    if (!suppSession) continue
    const firstBlock = suppSession.blocks && suppSession.blocks[0]
    if (firstBlock) {
      supplementBlocks.push({
        issueLabel: ISSUE_LABELS[issueKeys[i]] || issueKeys[i],
        issueName: plan.name,
        block: firstBlock,
      })
    }
  }
  return { baseSessions, supplementBlocks }
}

Page({
  data: {
    issues: [],
    issueLabels: [],
    scene: 'home',
    activePhaseIdx: 0,
    activeWeekIdx: 0,
    plans: [],
    primaryPlan: null,
    supplementPlans: [],
    showScience: false,
    scenes: ['home', 'office', 'gym'],
    sceneLabels: SCENE_LABELS,
    sceneIcons: SCENE_ICONS,
    currentPhase: null,
    currentWeekPlan: null,
    combinedSessions: [],
    supplementBlocks: [],
  },

  onLoad(options) {
    const issueKeys = (options.issues || 'neck').split(',').filter(Boolean)
    const scene = options.scene || 'home'
    const plans = issueKeys.map(key => REHAB_PLANS[key]).filter(Boolean)
    const primary = plans[0] || null
    const issueLabels = issueKeys.map(k => ISSUE_LABELS[k] || k)
    this.setData({ issues: issueKeys, issueLabels, scene, plans, primaryPlan: primary, supplementPlans: plans.slice(1) })
    if (primary) wx.setNavigationBarTitle({ title: primary.name })
    this._buildView()
  },

  _buildView() {
    const { issues, scene, activePhaseIdx, activeWeekIdx, primaryPlan } = this.data
    if (!primaryPlan) return
    const phase = primaryPlan.phases[activePhaseIdx]
    const sceneData = phase && phase.scenes && phase.scenes[scene]
    const weekPlan = sceneData && sceneData.weekPlans && sceneData.weekPlans[activeWeekIdx]
    const combined = buildCombinedSessions(issues, scene, activePhaseIdx, activeWeekIdx)
    this.setData({
      currentPhase: phase,
      currentWeekPlan: weekPlan,
      combinedSessions: combined.baseSessions || [],
      supplementBlocks: combined.supplementBlocks || [],
    })
  },

  switchPhase(e) {
    const idx = +e.currentTarget.dataset.idx
    this.setData({ activePhaseIdx: idx, activeWeekIdx: 0 }, () => this._buildView())
  },

  switchWeek(e) {
    const idx = +e.currentTarget.dataset.idx
    this.setData({ activeWeekIdx: idx }, () => this._buildView())
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
    wx.navigateTo({ url: `/pages/player/player?courseId=${issueCoursemap[key] || 'c16'}` })
  },

  navBack() {
    wx.navigateBack({ fail: () => wx.switchTab({ url: '/pages/scan/scan' }) })
  },
})
