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
          this.setData({ scanning: false, result: { score:72, issues:['轻度头前引','右肩略高'], suggestions:['天鹅颈训练','肩部平衡练习'] } })
        }, 2000)
      }
    })
  },
  reset() { this.setData({ result: null }) },
})
