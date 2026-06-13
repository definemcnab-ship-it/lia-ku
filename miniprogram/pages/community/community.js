const MODULES = ['feed', 'qa', 'checkin'] // 动态 / 问答 / 打卡
const TAG_MODULE = {
  '动作分享': 'feed',
  '真实蜕变': 'feed',
  '求助问答': 'qa',
  '蜕变打卡': 'checkin',
}

const ALL_POSTS = [
  { id:'p1', module:'checkin', avatar:'🧘', name:'林晓雯', time:'2小时前', content:'「颈线 · 养成」第14天，颈线真的在向上生长！', likes:28, liked:false, comments:6, tag:'蜕变打卡', showComments:false, commentList:[
    { id:'c1', name:'陈思佳', content:'太励志了，我也要坚持！' },
    { id:'c2', name:'赵美玲', content:'第14天就有效果，厉害～' },
  ] },
  { id:'p2', module:'feed', avatar:'💪', name:'陈思佳', time:'5小时前', content:'久坐的姐妹们试试「归位」这节课，腰腹清透了很多', likes:45, liked:false, comments:12, tag:'动作分享', showComments:false, commentList:[
    { id:'c1', name:'林晓雯', content:'马住，明天就练' },
  ] },
  { id:'p3', module:'feed', avatar:'✨', name:'赵美玲', time:'昨天', content:'「八周 · 立」完成！挺拔度从61到79，谢谢斯俪', likes:103, liked:false, comments:34, tag:'真实蜕变', showComments:false, commentList:[
    { id:'c1', name:'王雅静', content:'数据说话，太香了' },
    { id:'c2', name:'李梦琪', content:'姐妹用了多久呀' },
  ] },
  { id:'p4', module:'qa', avatar:'🤔', name:'王雅静', time:'3小时前', content:'圆肩含胸，靠墙天使每天做几组比较合适？有姐妹有经验吗', likes:9, liked:false, comments:5, tag:'求助问答', showComments:false, commentList:[
    { id:'c1', name:'陈思佳', content:'我每天3组×10，两周肩明显开了' },
    { id:'c2', name:'林晓雯', content:'循序渐进，别耸肩就行' },
  ] },
  { id:'p5', module:'qa', avatar:'🙋', name:'李梦琪', time:'昨天', content:'骨盆前倾的话，臀桥和死虫哪个优先练？', likes:14, liked:false, comments:7, tag:'求助问答', showComments:false, commentList:[
    { id:'c1', name:'赵美玲', content:'先死虫稳住核心，再加臀桥' },
  ] },
  { id:'p6', module:'checkin', avatar:'🌸', name:'周筱', time:'昨天', content:'「七日 · 焕新」打卡第7天完成！习惯养成啦', likes:56, liked:false, comments:8, tag:'蜕变打卡', showComments:false, commentList:[
    { id:'c1', name:'王雅静', content:'恭喜毕业～' },
  ] },
]

Page({
  data: {
    activeTab: 0,
    tabs: ['动态','问答','打卡'],
    composerOpen: false,
    draft: '',
    draftTag: '蜕变打卡',
    tagOptions: ['蜕变打卡','动作分享','真实蜕变','求助问答'],
    commentDraft: '',
    posts: ALL_POSTS,
    viewPosts: ALL_POSTS.filter(p => p.module === 'feed'),
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },

  _applyFilter(posts, activeTab) {
    const mod = MODULES[activeTab]
    return posts.filter(p => p.module === mod)
  },

  _refresh(posts, activeTab) {
    const p = posts || this.data.posts
    const t = activeTab == null ? this.data.activeTab : activeTab
    this.setData({ posts: p, activeTab: t, viewPosts: this._applyFilter(p, t) })
  },

  switchTab(e) {
    this._refresh(null, Number(e.currentTarget.dataset.idx))
  },

  navBack() { wx.navigateBack() },

  _postIndex(id) { return this.data.posts.findIndex(p => p.id === id) },

  likePost(e) {
    const i = this._postIndex(e.currentTarget.dataset.id)
    if (i < 0) return
    const posts = this.data.posts.slice()
    const p = Object.assign({}, posts[i])
    p.liked = !p.liked
    p.likes += p.liked ? 1 : -1
    posts[i] = p
    this._refresh(posts)
  },

  toggleComments(e) {
    const i = this._postIndex(e.currentTarget.dataset.id)
    if (i < 0) return
    const posts = this.data.posts.slice()
    posts[i] = Object.assign({}, posts[i], { showComments: !posts[i].showComments })
    this._refresh(posts)
  },

  onCommentInput(e) { this.setData({ commentDraft: e.detail.value }) },

  submitComment(e) {
    const i = this._postIndex(e.currentTarget.dataset.id)
    if (i < 0) return
    const text = (this.data.commentDraft || '').trim()
    if (!text) { wx.showToast({ title:'说点什么吧', icon:'none' }); return }
    const posts = this.data.posts.slice()
    const p = Object.assign({}, posts[i])
    p.commentList = (p.commentList || []).concat({ id:'c'+Date.now(), name:'我', content:text })
    p.comments += 1
    posts[i] = p
    this.setData({ commentDraft: '' })
    this._refresh(posts)
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
    const tag = this.data.draftTag
    const mod = TAG_MODULE[tag] || 'feed'
    const post = {
      id: 'p' + Date.now(),
      module: mod,
      avatar: '🌿',
      name: '我',
      time: '刚刚',
      content,
      likes: 0,
      liked: false,
      comments: 0,
      tag,
      showComments: false,
      commentList: [],
    }
    const posts = [post].concat(this.data.posts)
    // 发布后自动切到对应分类，确保能看到自己的内容
    this.setData({ composerOpen: false, draft: '' })
    this._refresh(posts, MODULES.indexOf(mod))
    wx.showToast({ title:'已发布', icon:'success' })
  },
})
