Component({
  data: { selected: 0 },
  methods: {
    switchTab(e) {
      const { path, index } = e.currentTarget.dataset
      this.setData({ selected: index })
      wx.switchTab({ url: path })
    },
  },
})
