Page({
  data: { scanning: false, result: null },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },
  startScan() {
    wx.chooseMedia({ count:1, mediaType:['image'], sourceType:['camera','album'],
      success: (res) => {
        this.setData({ scanning: true })
        setTimeout(() => {
          this.setData({ scanning: false, result: { score:72, issues:['颈线可以更向上','右肩可以更舒展'], suggestions:['颈线 · 养成','舒展 · 肩背'] } })
        }, 2000)
      }
    })
  },
  reset() { this.setData({ result: null }) },
})
