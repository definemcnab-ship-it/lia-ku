Page({
  data: {
    activeTab: 0,
    tabs: ['动态','问答','打卡'],
    composerOpen: false,
    draft: '',
    draftTag: '蜕变打卡',
    tagOptions: ['蜕变打卡','动作分享','真实蜕变','求助问答'],
    posts: [
      { id:'p1', avatar:'🧘', name:'林晓雯', time:'2小时前', content:'「颈线 · 养成」第14天，颈线真的在向上生长！', likes:28, comments:6, tag:'蜕变打卡' },
      { id:'p2', avatar:'💪', name:'陈思佳', time:'5小时前', content:'久坐的姐妹们试试「归位」这节课，腰腹清透了很多', likes:45, comments:12, tag:'动作分享' },
      { id:'p3', avatar:'✨', name:'赵美玲', time:'昨天', content:'「八周 · 立」完成！挺拔度从61到79，谢谢斯俪', likes:103, comments:34, tag:'真实蜕变' },
    ],
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },
  switchTab(e) { this.setData({ activeTab: e.currentTarget.dataset.idx }) },
  likePost(e) { wx.showToast({ title:'已点赞', icon:'none' }) },
  navBack() { wx.navigateBack() },

  noop() {},
  openComposer() { this.setData({ composerOpen: true }) },
  closeComposer() { this.setData({ composerOpen: false }) },
  onDraftInput(e) { this.setData({ draft: e.detail.value }) },
  selectDraftTag(e) { this.setData({ draftTag: e.currentTarget.dataset.tag }) },
  submitPost() {
    const content = (this.data.draft || '').trim()
    if (!content) {
      wx.showToast({ title:'写点什么再发布吧', icon:'none' })
      return
    }
    const post = {
      id: 'p' + Date.now(),
      avatar: '🌿',
      name: '我',
      time: '刚刚',
      content,
      likes: 0,
      comments: 0,
      tag: this.data.draftTag,
    }
    this.setData({
      posts: [post, ...this.data.posts],
      composerOpen: false,
      draft: '',
    })
    wx.showToast({ title:'已发布', icon:'success' })
  },
})
