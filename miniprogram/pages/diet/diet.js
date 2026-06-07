Page({
  data: {
    todayCalories: 1480,
    targetCalories: 1800,
    meals: [
      { type:'早餐', time:'08:30', items:'燕麦粥、水煮蛋、牛奶', calories:380, icon:'☀️' },
      { type:'午餐', time:'12:15', items:'糙米饭、清蒸鱼、西兰花', calories:620, icon:'🌤' },
      { type:'晚餐', time:'18:40', items:'全麦面包、鸡胸肉沙拉', calories:480, icon:'🌙' },
    ],
    tips: ['多补充胶原蛋白有助骨骼健康','钙质充足可改善肌肉紧张','维生素D促进钙吸收'],
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },
  addMeal() { wx.showToast({ title:'记录餐食功能即将上线', icon:'none' }) },
})
