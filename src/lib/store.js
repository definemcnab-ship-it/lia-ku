import { useSyncExternalStore } from 'react'

// 斯俪 Slique 本地状态层 —— localStorage 持久化，无需后端。
// 刷新后训练打卡、周期设置、引导偏好、饮食记录均会保留。

const KEY = 'slique-state-v1'

const defaults = {
  postureScore: 85,        // 当前体态分
  lastScore: 82,           // 上次体态分（用于对比）
  checkIns: [],            // 完成训练的日期数组 ['2026-05-30', ...]
  cycle: { enabled: true, cycleLen: 28, periodLen: 5 },
  prefs: { scene: [], gear: [] },   // 引导页/设置页选择的场景/器械
  meals: {},               // { '2026-05-30': { '早餐': true } }
  // 推送通知设置
  notify: { enabled: true, start: '08:00', end: '21:00', daily: true, cycle: true, weekly: true },
  // 体态照片管理（占位元数据，原型不存真实图片）
  photos: [
    { id: 'p1', date: '2026-05-30', label: '正面', score: 85 },
    { id: 'p2', date: '2026-05-30', label: '侧面', score: 85 },
  ],
  // 社群圈子：用户点赞状态与自己发布的动态（持久化，刷新不丢）
  community: { likes: {}, posts: [] },
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...defaults }
    // 与默认值浅合并，保证新增字段有兜底
    return { ...defaults, ...JSON.parse(raw) }
  } catch {
    return { ...defaults }
  }
}

let state = load()
const listeners = new Set()

function emit() {
  listeners.forEach(l => l())
}

export function getState() {
  return state
}

// patch 可为对象或 (prev) => 部分对象
export function setState(patch) {
  const next = typeof patch === 'function' ? patch(state) : patch
  state = { ...state, ...next }
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* 隐私模式 / 配额满：静默降级为内存态 */
  }
  emit()
}

function subscribe(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

// 返回整个 state（引用仅在 setState 时变化，对 useSyncExternalStore 安全）
export function useStore() {
  return useSyncExternalStore(subscribe, getState, getState)
}

// —— 工具 ——

export function todayStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// —— 领域动作 ——

// 记录今天完成训练（同日去重）。
// 体态分只由真实扫描复测产生——训练打卡不加分，否则用户会察觉
// 分数是"哄人的"，摧毁对检测的信任；打卡的奖励走连续天数与勋章。
export function recordTrainingDone() {
  const t = todayStr()
  setState(s => {
    if (s.checkIns.includes(t)) return {}
    return { checkIns: [...s.checkIns, t] }
  })
}

// 从今天往前数连续打卡天数
export function computeStreak(checkIns) {
  const set = new Set(checkIns)
  let streak = 0
  const d = new Date()
  // 今天没打卡则从昨天开始算（不打断"昨天为止"的连续）
  if (!set.has(todayStr(d))) d.setDate(d.getDate() - 1)
  while (set.has(todayStr(d))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

// 本月打卡次数
export function countThisMonth(checkIns) {
  const now = new Date()
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-`
  return checkIns.filter(c => c.startsWith(prefix)).length
}

// —— 成就系统（与小程序 utils/achievements.js 对齐）——
// 奖励曲线：前 3 天密集正反馈，之后间距递增形成挑战。
const BADGES = [
  { id: 'first_train', name: '第一步',   icon: '🌱', streakNeed: 0,  desc: '完成首次训练，最难的一步已迈出', test: s => s.sessions >= 1 },
  { id: 'comeback',    name: '回来了',   icon: '💗', streakNeed: 2,  desc: '连续 2 天训练，习惯开始生根', test: s => s.streak >= 2 },
  { id: 'habit3',      name: '三日成势', icon: '🌿', streakNeed: 3,  desc: '连续 3 天，身体已经开始期待', test: s => s.streak >= 3 },
  { id: 'streak5',     name: '五日连胜', icon: '🔥', streakNeed: 5,  desc: '连续 5 天，多数人止步于此，你没有', test: s => s.streak >= 5 },
  { id: 'week7',       name: '整周达成', icon: '🏆', streakNeed: 7,  desc: '完整一周，肩颈已在悄悄回位', test: s => s.streak >= 7 },
  { id: 'fort14',      name: '双周坚持', icon: '🧘', streakNeed: 14, desc: '14 天，镜子里的变化藏不住了', test: s => s.streak >= 14 },
  { id: 'form21',      name: '习惯成形', icon: '📈', streakNeed: 21, desc: '21 天，训练已长成你的一部分', test: s => s.streak >= 21 },
  { id: 'renew28',     name: '28天焕新', icon: '✨', streakNeed: 28, desc: '一个完整周期，去复测看看数据', test: s => s.streak >= 28 },
  { id: 'scan1',       name: '直面真相', icon: '📷', streakNeed: 0,  desc: '完成首次 AI 体态检测', test: s => s.scans >= 1 },
  { id: 'vol10',       name: '十次沉淀', icon: '💪', streakNeed: 0,  desc: '累计完成 10 次训练', test: s => s.sessions >= 10 },
  { id: 'vol30',       name: '三十而立', icon: '👑', streakNeed: 0,  desc: '累计完成 30 次训练，体态由你定义', test: s => s.sessions >= 30 },
]

// 返回成就墙数据：每枚徽章的解锁状态与"还差 N 天"进度
export function badgeWall() {
  const s = getState()
  const stats = {
    streak: computeStreak(s.checkIns),
    sessions: s.checkIns.length,   // 网页原型：一次打卡=一次训练
    scans: (s.photos || []).length,
  }
  return BADGES.map(b => {
    const earned = b.test(stats)
    let progress = ''
    if (!earned && b.streakNeed > 0) {
      const gap = b.streakNeed - stats.streak
      if (gap > 0) progress = `还差 ${gap} 天`
    }
    return { ...b, earned, progress }
  })
}

// 切换某条动态的点赞状态（持久化）
export function toggleCommunityLike(id) {
  setState(s => {
    const likes = { ...s.community.likes }
    likes[id] = !likes[id]
    return { community: { ...s.community, likes } }
  })
}

// 发布一条我的动态（最新在前，持久化）
export function addCommunityPost(post) {
  setState(s => ({ community: { ...s.community, posts: [post, ...s.community.posts] } }))
}

// 清空全部本地数据（用于"我的 → 清除数据"）
export function resetAll() {
  setState(() => ({ ...defaults }))
}
