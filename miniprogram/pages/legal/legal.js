const { DOCS } = require('../../utils/legalData')

Page({
  data: { doc: null },

  onLoad(options) {
    const key = options.doc || 'user'
    const doc = DOCS[key] || DOCS.user
    this.setData({ doc })
    wx.setNavigationBarTitle({ title: doc.title })
  },
})
