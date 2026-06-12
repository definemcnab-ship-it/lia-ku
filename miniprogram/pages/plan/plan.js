const { courses, programs } = require('../training/trainingData')

const courseById = {}
courses.forEach(c => { courseById[c.id] = c })

Page({
  data: {
    name: '',
    desc: '',
    level: '',
    durationLabel: '',
    sessionsLabel: '',
    icon: 'auto_awesome',
    color: '#c08a7d',
    weeks: [],
    totalSessions: 0,
  },

  onLoad(options) {
    const program = programs.find(p => p.id === options.planId) || programs[0]
    let totalSessions = 0

    const weeks = (program.weeks || []).map(w => {
      const days = (w.days || []).map(d => {
        const course = courseById[d.courseId] || {}
        totalSessions++
        return {
          day: d.day,
          label: d.label || `第${d.day}天`,
          focus: d.focus || '',
          courseId: d.courseId,
          courseName: course.name || '',
          duration: course.duration || 0,
          level: course.level || '',
          icon: course.icon || 'self_improvement',
        }
      })
      return {
        week: w.week,
        phase: w.phase || '',
        label: `第 ${w.week} 周`,
        days,
      }
    })

    this.setData({
      name: program.name,
      desc: program.desc,
      level: program.level,
      durationLabel: program.duration >= 7 && program.duration % 7 === 0 && program.duration > 7
        ? `${program.duration / 7}周` : `${program.duration}天`,
      sessionsLabel: `${program.sessionsPerWeek || 4}次/周`,
      icon: program.icon,
      color: program.color,
      weeks,
      totalSessions,
    })
  },

  startDay(e) {
    const id = e.currentTarget.dataset.courseId
    if (id) wx.navigateTo({ url: `/pages/player/player?courseId=${id}` })
  },

  startPlan() {
    const first = this.data.weeks[0] && this.data.weeks[0].days[0]
    if (first) wx.navigateTo({ url: `/pages/player/player?courseId=${first.courseId}` })
  },

  navBack() { wx.navigateBack() },
})
