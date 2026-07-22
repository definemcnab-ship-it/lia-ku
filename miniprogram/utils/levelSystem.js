// 等级 / 经验（XP）系统 —— 单一数据源
// ─────────────────────────────────────────────────────────────
// XP 与等级此前在 profile 与 levels 页各写了一份，改一处忘另一处会
// 导致不同页面显示的等级不一致。统一到本模块，所有页面共用。
//
// XP 规则：打卡 1 天 = 1XP，完成训练 = 5XP，体态扫描 = 10XP

const LEVEL_TABLE = [
  { name: '晨芽',    minXP: 0,    maxXP: 100,  desc: '刚刚开始，踏出第一步', color: '#c8b89a' },
  { name: '晨星',    minXP: 100,  maxXP: 500,  desc: '持续成长中', color: '#8f8779' },
  { name: '银羽',    minXP: 500,  maxXP: 1200, desc: '初见成效，体态蜕变', color: '#a0b5b0' },
  { name: '金鹤',    minXP: 1200, maxXP: 2500, desc: '挺拔优雅，稳步前行', color: '#c0a870' },
  { name: '斯俪女神', minXP: 2500, maxXP: 9999, desc: '优雅巅峰，身体秩序归位', color: '#c08a7d' },
]

function computeXP(checkIns, sessions, scanHistory) {
  return ((checkIns || []).length * 1) +
         ((sessions || []).length * 5) +
         ((scanHistory || []).length * 10)
}

// 返回当前等级的完整对象
function computeLevel(xp) {
  let cur = LEVEL_TABLE[0]
  for (const lv of LEVEL_TABLE) {
    if (xp >= lv.minXP) cur = lv
  }
  return cur
}

function levelName(xp) {
  return computeLevel(xp).name
}

module.exports = { LEVEL_TABLE, computeXP, computeLevel, levelName }
