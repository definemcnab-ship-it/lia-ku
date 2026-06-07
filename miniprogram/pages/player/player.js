const app = getApp()
Page({
  data: {
    courseN: '天鹅颈塑形课',
    moves: [
      { name:'颈部前屈拉伸', duration:30, desc:'缓慢低头，下巴触向胸口，保持呼吸', icon:'self_improvement' },
      { name:'颈部侧屈拉伸', duration:30, desc:'耳朵向肩膀靠近，对侧手轻按头顶辅助拉伸', icon:'accessibility_new' },
      { name:'颈部旋转放松', duration:20, desc:'缓慢转头看左肩，停顿后转向右肩', icon:'self_improvement' },
      { name:'颈背肌激活', duration:40, desc:'双手交叉置于后脑，头向后顶手掌，保持6秒放松', icon:'fitness_center' },
    ],
    currentIdx: 0,
    timeLeft: 30,
    playing: false,
    done: false,
  },

  _timer: null,

  onUnload() { clearInterval(this._timer) },

  onLoad() {
    const m = this.data.moves[0]
    this.setData({ timeLeft: m.duration })
  },

  togglePlay() {
    if (this.data.done) return
    if (this.data.playing) {
      clearInterval(this._timer)
      this.setData({ playing: false })
    } else {
      this.setData({ playing: true })
      this._timer = setInterval(() => {
        let t = this.data.timeLeft - 1
        if (t <= 0) {
          clearInterval(this._timer)
          this.setData({ playing: false })
          this.nextMove()
        } else {
          this.setData({ timeLeft: t })
        }
      }, 1000)
    }
  },

  nextMove() {
    clearInterval(this._timer)
    const next = this.data.currentIdx + 1
    if (next >= this.data.moves.length) {
      this.setData({ done: true, playing: false })
      app.addCheckIn(app.todayStr())
      return
    }
    this.setData({
      currentIdx: next,
      timeLeft: this.data.moves[next].duration,
      playing: false,
    })
  },

  prevMove() {
    clearInterval(this._timer)
    const prev = this.data.currentIdx - 1
    if (prev < 0) return
    this.setData({
      currentIdx: prev,
      timeLeft: this.data.moves[prev].duration,
      playing: false,
    })
  },

  goHome() { wx.switchTab({ url: '/pages/home/home' }) },
  goTraining() { wx.navigateBack() },
})
