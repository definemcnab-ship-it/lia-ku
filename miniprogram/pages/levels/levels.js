Page({
  data: {
    currentLevel: '晨星',
    currentXP: 340,
    nextXP: 500,
    checkInDays: 12,
    levels: [
      { name:'晨芽', minXP:0, maxXP:100, desc:'刚刚开始', color:'#c8b89a', done:true },
      { name:'晨星', minXP:100, maxXP:500, desc:'持续成长中', color:'#8f8779', current:true },
      { name:'银羽', minXP:500, maxXP:1200, desc:'初见成效', color:'#a0b5b0', done:false },
      { name:'金鹤', minXP:1200, maxXP:2500, desc:'体态蜕变', color:'#c0a870', done:false },
      { name:'斯俪女神', minXP:2500, maxXP:9999, desc:'优雅巅峰', color:'#c08a7d', done:false },
    ],
    rewards: [
      { label:'专属头像框', unlocked:true },
      { label:'定制训练计划', unlocked:true },
      { label:'1v1 教练咨询', unlocked:false },
    ],
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },
})
