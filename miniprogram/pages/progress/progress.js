const app = getApp()

function buildCalendarDays(checkIns) {
  const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const today = new Date()
  // Find Monday of current week
  const dow = today.getDay() // 0=Sun,1=Mon,...
  const mondayOffset = dow === 0 ? -6 : 1 - dow
  const monday = new Date(today)
  monday.setDate(today.getDate() + mondayOffset)

  return labels.map((label, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const dateStr = d.toISOString().slice(0, 10)
    return {
      label,
      num: d.getDate(),
      date: dateStr,
      checked: Array.isArray(checkIns) && checkIns.includes(dateStr),
    }
  })
}

Page({
  data: {
    postureScore: 72,
    checkInDays: 12,
    weekData: [58, 63, 67, 68, 70, 71, 72],
    weekLabels: ['周一', '周二', '周三', '周四', '周五', '周六', '今天'],
    milestones: [
      { label: '首次打卡', done: true, icon: 'check_circle' },
      { label: '连续7天', done: true, icon: 'check_circle' },
      { label: '体态分70+', done: true, icon: 'check_circle' },
      { label: '连续30天', done: false, icon: 'star' },
      { label: '体态分85+', done: false, icon: 'star' },
    ],
    checkIns: [],
    calendarDays: [],
  },
  onShow() {
    const a = getApp()
    const checkIns = a.globalData.checkIns || []
    this.setData({
      postureScore: a.globalData.postureScore,
      checkIns,
      calendarDays: buildCalendarDays(checkIns),
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },
})
