// 动作示范线条插图（SVG data URI）
// 按动作名称/描述关键词自动匹配姿势原型，视频补齐前的占位示范
const S = 'stroke="rgba(255,255,255,0.92)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"'
const H = 'fill="rgba(255,255,255,0.92)" stroke="none"'

// 每个姿势是 200x140 viewBox 内的线条小人
const POSES = {
  // 站立收下颌（侧面，箭头向后）
  chin_tuck: `
    <circle cx="100" cy="30" r="11" ${S}/>
    <path d="M100 42 L100 100 M100 100 L86 134 M100 100 L114 134 M100 58 L88 92" ${S}/>
    <path d="M138 30 L116 30 M124 22 L116 30 L124 38" ${S}/>`,
  // 颈侧拉伸（头侧倾，手臂跨头）
  neck_side: `
    <circle cx="96" cy="34" r="11" transform="rotate(-14 96 34)" ${S}/>
    <path d="M100 46 L100 102 M100 102 L86 134 M100 102 L114 134" ${S}/>
    <path d="M100 60 C128 56 130 28 104 24" ${S}/>
    <path d="M100 60 L84 96" ${S}/>`,
  // 仰卧放松/呼吸（屈膝平躺）
  supine_rest: `
    <circle cx="36" cy="102" r="11" ${S}/>
    <path d="M48 102 L118 102 M118 102 L136 72 M136 72 L154 102" ${S}/>
    <path d="M70 102 L92 88" ${S}/>
    <path d="M20 113 L180 113" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 俯卧 YTW（俯视，双臂 Y 形）
  prone_ytw: `
    <circle cx="100" cy="28" r="11" ${S}/>
    <path d="M100 40 L100 108 M100 108 L88 134 M100 108 L112 134" ${S}/>
    <path d="M100 52 L70 24 M100 52 L130 24" ${S}/>`,
  // 墙天使 / 靠墙站立
  wall_angel: `
    <path d="M148 16 L148 130" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>
    <circle cx="100" cy="28" r="11" ${S}/>
    <path d="M100 40 L100 98 M100 98 L88 132 M100 98 L112 132" ${S}/>
    <path d="M100 50 L76 62 L72 34 M100 50 L124 62 L128 34" ${S}/>`,
  // 门框拉伸（侧面前倾，手扶框）
  doorway: `
    <path d="M146 14 L146 132" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>
    <circle cx="92" cy="34" r="11" ${S}/>
    <path d="M96 46 L106 96 M106 96 L92 132 M106 96 L122 130" ${S}/>
    <path d="M98 56 L146 42" ${S}/>`,
  // 弹力带（站立，双臂前拉）
  band_pull: `
    <circle cx="78" cy="30" r="11" ${S}/>
    <path d="M78 42 L78 100 M78 100 L64 134 M78 100 L92 134" ${S}/>
    <path d="M78 56 L120 48" ${S}/>
    <path d="M120 48 L170 40" stroke="rgba(255,255,255,0.45)" stroke-width="3" stroke-dasharray="6 7" fill="none"/>
    <circle cx="172" cy="40" r="5" ${H}/>`,
  // 侧卧（蚌式/外旋）
  side_lying: `
    <circle cx="38" cy="92" r="11" ${S}/>
    <path d="M50 94 L112 96 M112 96 L134 78 M134 78 L152 98" ${S}/>
    <path d="M112 96 L138 52" ${S}/>
    <path d="M20 113 L180 113" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 臀桥（仰卧抬髋）
  bridge: `
    <circle cx="36" cy="104" r="11" ${S}/>
    <path d="M48 104 L106 70 M106 70 L126 104 M62 104 L78 92" ${S}/>
    <path d="M20 113 L180 113" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 死虫（仰卧手脚抬起）
  dead_bug: `
    <circle cx="36" cy="104" r="11" ${S}/>
    <path d="M48 104 L118 104" ${S}/>
    <path d="M64 104 L64 54 M118 104 L118 70 M118 70 L148 70" ${S}/>
    <path d="M20 113 L180 113" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 鸟狗（四足对侧伸展）
  bird_dog: `
    <circle cx="68" cy="64" r="10" ${S}/>
    <path d="M78 70 L130 76 M84 72 L84 110 M130 76 L142 110" ${S}/>
    <path d="M78 70 L34 56 M130 76 L176 60" ${S}/>
    <path d="M20 113 L180 113" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 四足/猫牛/胸椎旋转
  quadruped: `
    <circle cx="62" cy="66" r="10" ${S}/>
    <path d="M72 70 Q104 50 134 74 M76 72 L76 110 M134 74 L146 110" ${S}/>
    <path d="M20 113 L180 113" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 平板支撑
  plank: `
    <circle cx="44" cy="74" r="10" ${S}/>
    <path d="M54 78 L142 94 M58 80 L56 110 M142 94 L150 110" ${S}/>
    <path d="M20 113 L180 113" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 深蹲
  squat: `
    <circle cx="88" cy="36" r="11" ${S}/>
    <path d="M92 48 L80 84 M80 84 L114 88 M114 88 L108 122 M108 122 L122 122" ${S}/>
    <path d="M90 58 L128 54" ${S}/>
    <path d="M40 128 L160 128" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 弓步 / 半跪
  lunge: `
    <circle cx="94" cy="28" r="11" ${S}/>
    <path d="M94 40 L94 82" ${S}/>
    <path d="M94 82 L124 88 M124 88 L124 122 M94 82 L70 108 M70 108 L44 110" ${S}/>
    <path d="M30 122 L170 122" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 单腿平衡 / 提踵 / 台阶
  balance: `
    <circle cx="100" cy="28" r="11" ${S}/>
    <path d="M100 40 L100 96 M100 96 L100 132" ${S}/>
    <path d="M100 96 L122 86 M122 86 L120 112" ${S}/>
    <path d="M100 52 L72 64 M100 52 L128 64" ${S}/>
    <path d="M70 134 L130 134" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 足部练习（足弓侧面）
  foot: `
    <path d="M50 96 L74 70 Q92 56 110 64 L142 78 Q156 84 152 96 L142 102 L60 102 Z" ${S}/>
    <path d="M78 102 Q96 86 124 96" stroke="rgba(255,255,255,0.55)" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M96 56 L96 40 M90 46 L96 40 L102 46" ${S}/>
    <path d="M30 113 L170 113" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // 泡沫轴 / 筋膜球
  foam_roll: `
    <circle cx="36" cy="86" r="11" ${S}/>
    <path d="M48 88 L112 92 M112 92 L132 70 M132 70 L152 96" ${S}/>
    <circle cx="92" cy="104" r="11" ${S}/>
    <path d="M20 116 L180 116" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>`,
}

// 关键词 → 姿势，自上而下第一个命中生效
const RULES = [
  ['泡沫轴|按摩球|筋膜', 'foam_roll'],
  ['臀桥', 'bridge'],
  ['死虫', 'dead_bug'],
  ['鸟狗', 'bird_dog'],
  ['平板', 'plank'],
  ['深蹲|硬拉|划船', 'squat'],
  ['弓步|半跪|沙发|跪', 'lunge'],
  ['蚌式|侧卧', 'side_lying'],
  ['墙天使|靠墙', 'wall_angel'],
  ['门框', 'doorway'],
  ['面拉|弹力带|TKE', 'band_pull'],
  ['YTW|YT|俯卧', 'prone_ytw'],
  ['猫牛|四足|胸椎|开胸', 'quadruped'],
  ['短足|毛巾|足底|足弓|提踵|脚跟滑动', 'foot'],
  ['单腿|平衡|台阶|踏步', 'balance'],
  ['颈侧|侧颈|4字|梨状', 'neck_side'],
  ['内收|颈线', 'chin_tuck'],
  ['呼吸|枕下|90|仰卧|骨盆|盆底|腹横肌|滑动', 'supine_rest'],
  ['拉伸|舒展', 'neck_side'],
]

function poseKey(move) {
  const text = (move.name || '') + ' ' + (move.desc || '')
  for (let i = 0; i < RULES.length; i++) {
    if (new RegExp(RULES[i][0]).test(text)) return RULES[i][1]
  }
  return 'chin_tuck'
}

function poseSrc(move) {
  const inner = POSES[poseKey(move)]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140">${inner}</svg>`
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

module.exports = { poseSrc }
