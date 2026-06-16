const app = getApp()

const NUTRIENT_CARDS = [
  {
    key: 'protein',
    icon: '🥩',
    name: '优质蛋白质',
    benefit: '修复肌肉·稳定脊柱',
    color: '#e8d5c4',
    daily: '1.2–1.6 g/kg 体重',
    foods: ['鸡胸肉', '三文鱼', '鸡蛋', '豆腐', '希腊酸奶', '牛肉'],
    why: '肌肉是维持正确体态的核心。蛋白质提供氨基酸用于肌纤维修复，尤其是运动后 30 分钟内摄入效果最佳。',
  },
  {
    key: 'calcium',
    icon: '🥛',
    name: '钙 + 维生素D',
    benefit: '强化骨骼·防止骨密度流失',
    color: '#d4e3d0',
    daily: '钙 1000mg · VD 800IU',
    foods: ['纯牛奶', '无糖酸奶', '豆腐', '芝麻', '深绿叶菜', '沙丁鱼'],
    why: '骨骼是体态的框架。钙质不足导致椎骨脆弱，维D促进肠道钙吸收，两者缺一不可。',
  },
  {
    key: 'magnesium',
    icon: '🥦',
    name: '镁',
    benefit: '放松肌肉·缓解紧张',
    color: '#d0dce8',
    daily: '女性 320mg/天',
    foods: ['菠菜', '南瓜子', '黑巧克力', '杏仁', '牛油果', '糙米'],
    why: '镁参与肌肉收缩与放松调节。慢性镁缺乏与颈肩肌肉痉挛、头前引直接相关。',
  },
  {
    key: 'collagen',
    icon: '🐟',
    name: '胶原蛋白前体',
    benefit: '修复韧带·改善关节',
    color: '#e8dcd0',
    daily: '维C 75mg + 甘氨酸',
    foods: ['猪蹄（少量）', '骨汤', '猕猴桃', '草莓', '彩椒', '西兰花'],
    why: '韧带和椎间盘富含胶原。维C是胶原合成的必需辅因子，建议餐时补充。',
  },
  {
    key: 'omega3',
    icon: '🐠',
    name: 'Omega-3',
    benefit: '抗炎·减轻关节疼痛',
    color: '#dce4e8',
    daily: 'EPA+DHA ≥500mg/天',
    foods: ['三文鱼', '沙丁鱼', '核桃', '亚麻籽', '奇亚籽', '鲭鱼'],
    why: '慢性低度炎症加重体态疼痛。Omega-3 抑制炎症因子，改善颈腰部的慢性不适感。',
  },
]

const MEAL_TEMPLATES = {
  front: {
    label: '早餐',
    icon: '☀️',
    suggestions: ['燕麦粥 + 水煮蛋', '全麦面包 + 花生酱', '希腊酸奶 + 蓝莓', '豆浆 + 杂粮馒头'],
  },
  lunch: {
    label: '午餐',
    icon: '🌤',
    suggestions: ['糙米饭 + 清蒸鱼 + 西兰花', '鸡胸肉沙拉 + 全麦面包', '荞麦面 + 牛肉 + 时蔬'],
  },
  dinner: {
    label: '晚餐',
    icon: '🌙',
    suggestions: ['清淡蔬菜汤 + 豆腐', '三文鱼 + 蒸红薯 + 菠菜', '蒸蛋 + 凉拌黄瓜 + 小米粥'],
  },
  snack: {
    label: '加餐',
    icon: '🫐',
    suggestions: ['一把坚果 + 水果', '希腊酸奶', '豆腐干', '煮鸡蛋'],
  },
}

const POSTURE_DIET_TIPS = [
  { icon: '⏰', tip: '训练后30分钟内补充蛋白质+碳水，加速肌肉修复' },
  { icon: '💧', tip: '每天饮水2000ml以上，椎间盘80%是水分' },
  { icon: '🚫', tip: '减少精制糖和反式脂肪，它们加重全身慢性炎症' },
  { icon: '🌙', tip: '睡前2小时停止进食，保证睡眠期间肌肉修复质量' },
  { icon: '🥗', tip: '每餐至少一种深色蔬菜，提供抗氧化剂保护关节软骨' },
]

Page({
  data: {
    activeTab: 0,
    todayCalories: 0,
    targetCalories: 1800,
    meals: [],
    nutrientCards: NUTRIENT_CARDS,
    expandedNutrient: null,
    dietTips: POSTURE_DIET_TIPS,
    showAddModal: false,
    addMealType: 'front',
    addMealInput: '',
    addMealCalInput: '',
    mealTemplates: MEAL_TEMPLATES,
    selectedSuggestion: '',
  },

  onLoad() {
    this._loadMeals()
    this._calcTarget()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    this._loadMeals()
  },

  _calcTarget() {
    const prefs = wx.getStorageSync('onboardingPrefs') || {}
    // Simple BMR estimate: default 1800, adjust by goal
    let target = 1800
    if (prefs.goal === 'lose') target = 1500
    else if (prefs.goal === 'gain') target = 2100
    this.setData({ targetCalories: target })
  },

  _loadMeals() {
    const stored = wx.getStorageSync('dietMeals') || []
    const today = new Date().toDateString()
    const meals = stored.filter(m => new Date(m.timestamp).toDateString() === today)
    const total = meals.reduce((s, m) => s + (m.calories || 0), 0)
    this.setData({ meals, todayCalories: total })
  },

  switchTab(e) {
    this.setData({ activeTab: +e.currentTarget.dataset.tab })
  },

  toggleNutrient(e) {
    const key = e.currentTarget.dataset.key
    const cur = this.data.expandedNutrient
    this.setData({ expandedNutrient: cur === key ? null : key })
  },

  openAddMeal(e) {
    const type = e.currentTarget.dataset.type || 'front'
    this.setData({ showAddModal: true, addMealType: type, addMealInput: '', addMealCalInput: '', selectedSuggestion: '' })
  },

  closeAddMeal() {
    this.setData({ showAddModal: false })
  },

  onMealInput(e) {
    this.setData({ addMealInput: e.detail.value })
  },

  onCalInput(e) {
    this.setData({ addMealCalInput: e.detail.value })
  },

  pickSuggestion(e) {
    const text = e.currentTarget.dataset.text
    this.setData({ addMealInput: text, selectedSuggestion: text })
  },

  confirmAddMeal() {
    const { addMealType, addMealInput, addMealCalInput } = this.data
    if (!addMealInput.trim()) {
      wx.showToast({ title: '请输入食物名称', icon: 'none' })
      return
    }
    const cal = parseInt(addMealCalInput) || 0
    const typeMap = { front: '早餐', lunch: '午餐', dinner: '晚餐', snack: '加餐' }
    const iconMap = { front: '☀️', lunch: '🌤', dinner: '🌙', snack: '🫐' }
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const newMeal = {
      id: Date.now(),
      timestamp: now.toISOString(),
      mealType: addMealType,
      type: typeMap[addMealType],
      icon: iconMap[addMealType],
      time: timeStr,
      items: addMealInput.trim(),
      calories: cal,
    }
    const stored = wx.getStorageSync('dietMeals') || []
    stored.push(newMeal)
    wx.setStorageSync('dietMeals', stored)
    this.setData({ showAddModal: false })
    this._loadMeals()
    wx.showToast({ title: '已记录', icon: 'success' })
  },

  deleteMeal(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '删除记录',
      content: '确认删除这条餐食记录？',
      confirmText: '删除',
      confirmColor: '#e05c5c',
      success: res => {
        if (!res.confirm) return
        const stored = wx.getStorageSync('dietMeals') || []
        const updated = stored.filter(m => m.id !== id)
        wx.setStorageSync('dietMeals', updated)
        this._loadMeals()
      },
    })
  },

  navBack() {
    wx.navigateBack()
  },

  get pct() {
    return Math.min(100, Math.round(this.data.todayCalories / this.data.targetCalories * 100))
  },
})
