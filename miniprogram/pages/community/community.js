Page({
  data: {
    activeTab: 0,
    tabs: ['动态','问答','打卡'],
    posts: [
      { id:'p1', avatar:'🧘', name:'林晓雯', time:'2小时前', content:'坚持天鹅颈训练第14天，感觉颈部真的变长了！', likes:28, comments:6, tag:'蜕变打卡' },
      { id:'p2', avatar:'💪', name:'陈思佳', time:'5小时前', content:'骨盆前倾的姐妹们试试这个动作，真的很有效', likes:45, comments:12, tag:'动作分享' },
      { id:'p3', avatar:'✨', name:'赵美玲', time:'昨天', content:'8周计划完成！体态分从61提升到79，感谢斯俪', likes:103, comments:34, tag:'真实蜕变' },
    ],
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },
  switchTab(e) { this.setData({ activeTab: e.currentTarget.dataset.idx }) },
  likePost(e) { wx.showToast({ title:'已点赞', icon:'none' }) },
})
