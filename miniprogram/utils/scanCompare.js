// 复测对比：把本次检测与上一次历史记录逐项比对，产出真实数值变化。
// 这是产品最强的正反馈层——"肩高差 1.8cm → 1.2cm"是训练有效的铁证。
//
// 历史记录自本版本起在每条 entry 中保存 issues（key/issue/measure），
// 旧记录没有 issues 字段时只比总分。

// 指标方向：这些前缀的数值"越大越好"，其余默认"越小越好"
const UP_IS_BETTER = /^(CVA|躯干-腿)/

function parseNum(measure) {
  const m = /([\d.]+)/.exec(measure || '')
  return m ? parseFloat(m[1]) : null
}

// prev: { date, score, issues? }  result: { score, issues }
// 返回 null（无上次记录）或 { prevDate, scoreDiff, items }
// items: { label, from, to, better }（数值变化）
//      | { label, resolved: true }（上次有、这次未检出）
//      | { label, isNew: true }（这次新检出）
function buildCompare(prev, result) {
  if (!prev) return null
  const items = []
  const prevIssues = prev.issues || []
  const curIssues = (result && result.issues) || []
  const prevByIssue = {}
  prevIssues.forEach(p => { prevByIssue[p.issue] = p })

  curIssues.forEach(c => {
    const p = prevByIssue[c.issue]
    if (p && p.measure && c.measure) {
      const a = parseNum(p.measure)
      const b = parseNum(c.measure)
      if (a != null && b != null && a !== b) {
        const better = UP_IS_BETTER.test(c.measure) ? b > a : b < a
        items.push({ label: c.issue, from: p.measure, to: c.measure, better })
      }
    } else if (!p) {
      items.push({ label: c.issue, isNew: true })
    }
  })
  prevIssues.forEach(p => {
    if (!curIssues.some(c => c.issue === p.issue)) {
      items.push({ label: p.issue, resolved: true })
    }
  })

  return {
    prevDate: prev.date,
    scoreDiff: result.score - prev.score,
    items,
  }
}

module.exports = { buildCompare }
