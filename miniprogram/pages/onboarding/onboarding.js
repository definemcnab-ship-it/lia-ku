// 高危条件：触发任一则显示拦截，建议就医后再使用
const HIGH_RISK = [
  'fracture',      // 骨折未愈合
  'surgery3m',     // 术后3个月内
  'cardio',        // 未控制的心脏病/高血压
  'neuro',         // 活动性神经系统疾病
  'cancer',        // 活动期肿瘤
]

const TOTAL_STEPS = 7 // 0..6（高危页插入在3之后）

Page({
  data: {
    step: 0,
    blocked: false, // 高危拦截标志

    // S1 体态检测方式
    postureMethod: '', // 'scan' | 'photo' | 'skip'

    // S2 运动历史
    exerciseFreq: '',   // 'none' | 'light' | 'moderate' | 'active'
    exerciseTypes: {},  // 多选

    // S3 健康筛查
    healthFlags: {},    // 多选，含高危项

    // S4（高危）
    isHighRisk: false,

    // S5 场景/器械偏好
    scenes: ['居家', '办公室', '健身房'],
    gears: ['瑜伽垫', '弹力带', '哑铃', '无器械'],
    sceneSelected: {},
    gearSelected: {},

    // 进度
    totalSteps: TOTAL_STEPS,
  },

  // ── S2 运动频率 ──
  selectFreq(e) {
    this.setData({ exerciseFreq: e.currentTarget.dataset.val })
  },
  toggleExerciseType(e) {
    const val = e.currentTarget.dataset.val
    this.setData({ [`exerciseTypes.${val}`]: !this.data.exerciseTypes[val] })
  },

  // ── S3 健康筛查 ──
  toggleHealth(e) {
    const val = e.currentTarget.dataset.val
    this.setData({ [`healthFlags.${val}`]: !this.data.healthFlags[val] })
  },

  // ── S1 体态检测方式 ──
  selectPostureMethod(e) {
    this.setData({ postureMethod: e.currentTarget.dataset.val })
  },

  // ── S5 偏好 ──
  toggleScene(e) {
    const val = e.currentTarget.dataset.val
    this.setData({ [`sceneSelected.${val}`]: !this.data.sceneSelected[val] })
  },
  toggleGear(e) {
    const val = e.currentTarget.dataset.val
    this.setData({ [`gearSelected.${val}`]: !this.data.gearSelected[val] })
  },

  // ── 步骤推进 ──
  nextStep() {
    const { step } = this.data
    // S3 后检测高危
    if (step === 3) {
      const flags = this.data.healthFlags
      const high = HIGH_RISK.some(k => flags[k])
      if (high) {
        this.setData({ step: 4, isHighRisk: true })
        return
      }
      // 跳过拦截页直接去 S5
      this.setData({ step: 5 })
      return
    }
    // S4 高危页 → S5（用户确认继续）
    if (step === 4) {
      this.setData({ step: 5 })
      return
    }
    if (step < 6) {
      this.setData({ step: step + 1 })
    } else {
      this._finish()
    }
  },

  prevStep() {
    const { step, isHighRisk } = this.data
    if (step === 5 && isHighRisk) { this.setData({ step: 4 }); return }
    if (step === 5) { this.setData({ step: 3 }); return }
    if (step > 0) this.setData({ step: step - 1 })
  },

  skipToHome() {
    this._finish()
  },

  goHome() {
    this._finish()
  },

  goScan() {
    this._finish()
    setTimeout(() => wx.navigateTo({ url: '/pages/scan/scan' }), 300)
  },

  _finish() {
    const {
      postureMethod, exerciseFreq, exerciseTypes,
      healthFlags, sceneSelected, gearSelected, isHighRisk,
    } = this.data
    const prefs = {
      postureMethod,
      exerciseFreq,
      exerciseTypes: Object.keys(exerciseTypes).filter(k => exerciseTypes[k]),
      healthFlags: Object.keys(healthFlags).filter(k => healthFlags[k]),
      scene: Object.keys(sceneSelected).filter(k => sceneSelected[k]),
      gear: Object.keys(gearSelected).filter(k => gearSelected[k]),
      isHighRisk,
      done: true,
    }
    wx.setStorageSync('onboardingDone', true)
    wx.setStorageSync('prefs', prefs)
    wx.switchTab({ url: '/pages/home/home' })
  },
})
