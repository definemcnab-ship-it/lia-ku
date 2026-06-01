Page({
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const tabMap = { training:1, scan:2, progress:3, profile:4 }
      const idx = tabMap['player']
      if (idx !== undefined) this.getTabBar().setData({ selected: idx })
    }
  },
  navBack() { wx.navigateBack() },
})
