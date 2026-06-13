Page({
  data: {
    activeTab: 0,
    tabs: ['动态','问答','打卡'],
    composerOpen: false,
    draft: '',
    draftTag: '蜕变打卡',
    tagOptions: ['蜕变打卡','动作分享','真实蜕变','求助问答'],
    commentDraft: '',
    activeCommentId: '',
    posts: [
      { id:'p1', avatar:'🧘', name:'林晓雯', time:'2小时前', content:'「颈线 · 养成」第14天，颈线真的在向上生长！', likes:28, liked:false, comments:6, tag:'蜕变打卡', showComments:false, commentList:[
        { id:'c1', name:'陈思佳', content:'太励志了，我也要坚持！' },
        { id:'c2', name:'赵美玲', content:'第14天就有效果，厉害～' },
      ] },
      { id:'p2', avatar:'💪', name:'陈思佳', time:'5小时前', content:'久坐的姐妹们试试「归位」这节课，腰腹清透了很多', likes:45, liked:false, comments:12, tag:'动作分享', showComments:false, commentList:[
        { id:'c1', name:'林晓雯', content:'马住，明天就练' },
      ] },
      { id:'p3', avatar:'✨', name:'赵美玲', time:'昨天', content:'「八周 · 立」完成！挺拔度从61到79，谢谢斯俪', likes:103, liked:false, comments:34, tag:'真实蜕变', showComments:false, commentList:[
        { id:'c1', name:'王雅静', content:'数据说话，太香了' },
        { id:'c2', name:'李梦琪', content:'姐妹用了多久呀' },
      ] },
    ],
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },
  switchTab(e) { this.setData({ activeTab: e.currentTarget.dataset.idx }) },
  navBack() { wx.navigateBack() },

  _postIndex(id) { return this.data.posts.findIndex(p => p.id === id) },

  likePost(e) {
    const i = this._postIndex(e.currentTarget.dataset.id)
    if (i < 0) return
    const p = this.data.posts[i]
    const liked = !p.liked
    this.setData({
      [`posts[${i}].liked`]: liked,
      [`posts[${i}].likes`]: p.likes + (liked ? 1 : -1),
    })
  },

  toggleComments(e) {
    const i = this._postIndex(e.currentTarget.dataset.id)
    if (i < 0) return
    this.setData({ [`posts[${i}].showComments`]: !this.data.posts[i].showComments })
  },

  onCommentInput(e) { this.setData({ commentDraft: e.detail.value }) },

  submitComment(e) {
    const id = e.currentTarget.dataset.id
    const i = this._postIndex(id)
    if (i < 0) return
    const text = (this.data.commentDraft || '').trim()
    if (!text) { wx.showToast({ title:'说点什么吧', icon:'none' }); return }
    const p = this.data.posts[i]
    const list = (p.commentList || []).concat({ id:'c'+Date.now(), name:'我', content:text })
    this.setData({
      [`posts[${i}].commentList`]: list,
      [`posts[${i}].comments`]: p.comments + 1,
      commentDraft: '',
    })
    wx.showToast({ title:'已评论', icon:'success' })
  },

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
      liked: false,
      comments: 0,
      tag: this.data.draftTag,
      showComments: false,
      commentList: [],
    }
    this.setData({
      posts: [post, ...this.data.posts],
      composerOpen: false,
      draft: '',
    })
    wx.showToast({ title:'已发布', icon:'success' })
  },
})
