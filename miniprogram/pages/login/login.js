Page({
  data: {
    agreed: false,
    shake: false,
    showSheet: false,
    phone: '',
    code: '',
    countdown: 0,
    phoneValid: false,
    canSubmit: false,
  },

  _timer: null,

  onUnload() {
    clearInterval(this._timer)
  },

  requireAgree() {
    if (this.data.agreed) return true
    this.setData({ shake: true })
    setTimeout(() => this.setData({ shake: false }), 600)
    wx.showToast({ title: '请先同意用户协议', icon: 'none' })
    return false
  },

  skipLogin() {
    wx.switchTab({ url: '/pages/home/home' })
  },

  wechatLogin() {
    if (!this.requireAgree()) return
    wx.navigateTo({ url: '/pages/onboarding/onboarding' })
  },

  openPhoneSheet() {
    if (!this.requireAgree()) return
    this.setData({ showSheet: true })
  },

  closeSheet() {
    this.setData({ showSheet: false })
  },

  onAgreeChange(e) {
    this.setData({ agreed: e.detail.value.length > 0 })
  },

  openDoc(e) {
    const doc = e.currentTarget.dataset.doc
    const titles = { terms: '用户协议', privacy: '隐私政策' }
    wx.showModal({
      title: titles[doc] || '协议',
      content: doc === 'privacy'
        ? '斯俪严格保护您的隐私，您的体态数据仅用于生成个人训练计划，不会对外共享或出售。'
        : '使用斯俪即表示您同意遵守平台服务条款，包括合理使用规范及相关法律法规。',
      showCancel: false,
      confirmText: '我知道了',
    })
  },

  onPhoneInput(e) {
    const phone = e.detail.value.replace(/\D/g, '').slice(0, 11)
    const phoneValid = /^1\d{10}$/.test(phone)
    this.setData({ phone, phoneValid, canSubmit: phoneValid && this.data.code.length === 4 })
  },

  onCodeInput(e) {
    const code = e.detail.value.replace(/\D/g, '').slice(0, 4)
    this.setData({ code, canSubmit: this.data.phoneValid && code.length === 4 })
  },

  sendCode() {
    if (!this.data.phoneValid || this.data.countdown > 0) return
    this.setData({ countdown: 60 })
    this._timer = setInterval(() => {
      const c = this.data.countdown - 1
      if (c <= 0) { clearInterval(this._timer); this.setData({ countdown: 0 }) }
      else this.setData({ countdown: c })
    }, 1000)
    wx.showToast({ title: '验证码已发送（演示：任意4位）', icon: 'none' })
  },

  doLogin() {
    if (!this.data.canSubmit) return
    wx.navigateTo({ url: '/pages/onboarding/onboarding' })
  },
})
