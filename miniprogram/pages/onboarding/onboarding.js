Page({
  data: {
    step: 0,
    scenes: ['居家', '办公室', '健身房'],
    gears: ['瑜伽垫', '弹力带', '哑铃', '无器械'],
    sceneSelected: {},
    gearSelected: {},
  },

  toggleScene(e) {
    const val = e.currentTarget.dataset.val
    const key = `sceneSelected.${val}`
    this.setData({ [key]: !this.data.sceneSelected[val] })
  },

  toggleGear(e) {
    const val = e.currentTarget.dataset.val
    const key = `gearSelected.${val}`
    this.setData({ [key]: !this.data.gearSelected[val] })
  },

  nextStep() {
    const { step } = this.data
    if (step < 3) {
      this.setData({ step: step + 1 })
    } else {
      this.savePrefs()
      wx.switchTab({ url: '/pages/home/home' })
    }
  },

  skipToHome() {
    this.savePrefs()
    wx.switchTab({ url: '/pages/home/home' })
  },

  savePrefs() {
    const scene = Object.keys(this.data.sceneSelected).filter(k => this.data.sceneSelected[k])
    const gear = Object.keys(this.data.gearSelected).filter(k => this.data.gearSelected[k])
    wx.setStorageSync('prefs', { scene, gear })
  },
})
