import { useSyncExternalStore } from 'react'

// 斯俪 Slique 本地状态层 —— localStorage 持久化，无需后端。
// 刷新后训练打卡、周期设置、引导偏好、饮食记录均会保留。

const KEY = 'slique-state-v1'

const defaults = {
  postureScore: 85,        // 当前体态分
  lastScore: 82,           // 上次体态分（用于对比）
  checkIns: [],            // 完成训练的日期数组 ['2026-05-30', ...]
  cycle: { enabled: true, cycleLen: 28, periodLen: 5 },
  prefs: { scene: [], gear: [] },   // 引导页选择的场景/器械
  meals: {},               // { '2026-05-30': { '早餐': true } }
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

// 记录今天完成训练（同日去重）
export function recordTrainingDone() {
  const t = todayStr()
  setState(s => (s.checkIns.includes(t) ? {} : { checkIns: [...s.checkIns, t] }))
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

// 清空全部本地数据（用于"我的 → 清除数据"）
export function resetAll() {
  setState(() => ({ ...defaults }))
}
