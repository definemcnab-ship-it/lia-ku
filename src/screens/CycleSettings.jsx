import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

// 四个周期阶段及对应训练策略（方案文档 §6）
const PHASES = [
  {
    id: 'menstrual',
    name: '月经期',
    days: '第 1–5 天',
    color: 'bg-[#fce4ec]',
    textColor: 'text-[#c62828]',
    dotColor: 'bg-[#ef9a9a]',
    intensity: '轻度',
    intensityColor: 'text-green-600 bg-green-50',
    icon: '🌙',
    desc: '以舒缓拉伸为主，避免高强度腹部训练。重点缓解经期不适引起的腰背酸痛。',
    exercises: ['猫牛式脊柱活动', '仰卧抱膝放松', '深呼吸横隔膜训练'],
    avoid: ['高强度腹肌训练', '倒立动作', '大重量负荷'],
  },
  {
    id: 'follicular',
    name: '卵泡期',
    days: '第 6–13 天',
    color: 'bg-[#e8f5e9]',
    textColor: 'text-[#2e7d32]',
    dotColor: 'bg-[#a5d6a7]',
    intensity: '中等',
    intensityColor: 'text-teal-600 bg-teal-50',
    icon: '🌱',
    desc: '雌激素上升，体力最充沛。这是攻克难度动作的最佳窗口，可适当增加训练量。',
    exercises: ['弹力带划船', '俯卧 Y-T-W', '靠墙深蹲'],
    avoid: [],
  },
  {
    id: 'ovulatory',
    name: '排卵期',
    days: '第 14–16 天',
    color: 'bg-[#fff8e1]',
    textColor: 'text-[#f57f17]',
    dotColor: 'bg-[#ffe082]',
    intensity: '中高',
    intensityColor: 'text-orange-600 bg-orange-50',
    icon: '✨',
    desc: '体能顶峰，力量和协调性最佳。适合挑战型动作，但注意关节韧带较松弛，控制幅度。',
    exercises: ['天鹅颈抗阻训练', '单腿平衡站立', '肩胛稳定进阶'],
    avoid: ['过度拉伸关节极限'],
  },
  {
    id: 'luteal',
    name: '黄体期',
    days: '第 17–28 天',
    color: 'bg-[#f3e5f5]',
    textColor: 'text-[#6a1b9a]',
    dotColor: 'bg-[#ce93d8]',
    intensity: '中低',
    intensityColor: 'text-purple-600 bg-purple-50',
    icon: '🌸',
    desc: '孕激素升高，基础代谢加快但易疲劳。保持规律训练，注重放松与恢复。',
    exercises: ['墙角胸大肌拉伸', '下巴后缩基础版', '泡沫轴放松'],
    avoid: ['高强度 HIIT', '临睡前激烈训练'],
  },
]

// 当前阶段（卵泡期第 9 天）
const CURRENT_PHASE_IDX = 1

function CycleDial({ cycleLen, periodLen, currentDay }) {
  const cx = 100, cy = 100, r = 80
  const toRad = (deg) => (deg - 90) * (Math.PI / 180)
  const arc = (startDeg, endDeg, radius) => {
    const s = { x: cx + radius * Math.cos(toRad(startDeg)), y: cy + radius * Math.sin(toRad(startDeg)) }
    const e = { x: cx + radius * Math.cos(toRad(endDeg)), y: cy + radius * Math.sin(toRad(endDeg)) }
    const large = endDeg - startDeg > 180 ? 1 : 0
    return `M${s.x},${s.y} A${radius},${radius} 0 ${large} 1 ${e.x},${e.y}`
  }

  // 四个阶段角度分配（按天数比例，总 cycleLen 天）
  const phaseDays = [periodLen, 8, 3, cycleLen - periodLen - 8 - 3]
  const phaseColors = ['#ef9a9a', '#a5d6a7', '#ffe082', '#ce93d8']
  const phaseStroke = ['#c62828', '#2e7d32', '#f57f17', '#6a1b9a']
  let acc = 0
  const segments = phaseDays.map((d, i) => {
    const startDeg = (acc / cycleLen) * 360
    const endDeg = ((acc + d) / cycleLen) * 360
    acc += d
    return { startDeg, endDeg, color: phaseColors[i], stroke: phaseStroke[i] }
  })

  // 当前位置指针
  const curDeg = (currentDay / cycleLen) * 360
  const curX = cx + r * Math.cos(toRad(curDeg))
  const curY = cy + r * Math.sin(toRad(curDeg))

  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48">
      {/* 背景圆 */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0eded" strokeWidth="18" />
      {/* 阶段弧段 */}
      {segments.map((s, i) => (
        <path key={i} d={arc(s.startDeg + 1, s.endDeg - 1, r)} fill="none"
          stroke={s.color} strokeWidth="16" strokeLinecap="round" />
      ))}
      {/* 当前位置 */}
      <circle cx={curX} cy={curY} r="7" fill="white" stroke="#9b4430" strokeWidth="3" />
      {/* 中心文字 */}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="11" fill="#55423e">第 {currentDay} 天</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9b4430">
        {PHASES[CURRENT_PHASE_IDX].name}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="10" fill="#88726d">
        {PHASES[CURRENT_PHASE_IDX].days}
      </text>
    </svg>
  )
}

export default function CycleSettings() {
  const nav = useNavigate()
  const [enabled, setEnabled] = useState(true)
  const [cycleLen, setCycleLen] = useState(28)
  const [periodLen, setPeriodLen] = useState(5)
  const [expanded, setExpanded] = useState(CURRENT_PHASE_IDX)
  const currentDay = 9 // 模拟当前为周期第 9 天

  return (
    <div className="font-body text-on-background min-h-full">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40 border-b border-surface-variant">
        <button onClick={() => nav('/profile')} className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-on-surface">经期周期适配</span>
        <button className="font-label text-[14px] text-primary active:opacity-70 transition">保存</button>
      </header>

      <main className="px-container-padding-mobile pb-10 space-y-stack-lg">

        {/* 开关 */}
        <section className="flex items-center justify-between bg-surface-container-lowest rounded-xl px-4 py-4 mt-stack-md
          shadow-[0px_4px_16px_rgba(230,126,102,0.06)]">
          <div>
            <p className="font-label text-[15px] text-on-surface">启用周期适配训练</p>
            <p className="font-label text-[12px] text-outline mt-0.5">根据生理周期自动调整训练强度</p>
          </div>
          <button onClick={() => setEnabled(e => !e)}
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${enabled ? 'bg-primary' : 'bg-outline-variant'}`}>
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${enabled ? 'left-6' : 'left-1'}`} />
          </button>
        </section>

        {enabled && (
          <>
            {/* 周期表盘 + 当前阶段 */}
            <section className="bg-surface-container-lowest rounded-xl p-5 shadow-[0px_4px_16px_rgba(230,126,102,0.06)]">
              <h2 className="font-headline text-[17px] text-on-surface mb-4">当前所处阶段</h2>
              <div className="flex items-center gap-5">
                <CycleDial cycleLen={cycleLen} periodLen={periodLen} currentDay={currentDay} />
                <div className="flex-1 space-y-3">
                  {PHASES.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full flex-none ${p.dotColor} ${i === CURRENT_PHASE_IDX ? 'ring-2 ring-offset-1 ring-primary' : ''}`} />
                      <div>
                        <p className={`font-label text-[13px] ${i === CURRENT_PHASE_IDX ? 'text-on-surface font-bold' : 'text-outline'}`}>{p.name}</p>
                        <p className="font-label text-[10px] text-outline">{p.days}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 周期参数设置 */}
            <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_16px_rgba(230,126,102,0.06)]">
              <div className="px-4 py-3 border-b border-surface-variant">
                <h2 className="font-label text-[13px] text-outline uppercase tracking-wider">周期参数</h2>
              </div>
              <div className="px-4 py-3 flex items-center justify-between border-b border-surface-variant">
                <p className="font-label text-[15px] text-on-surface">周期长度</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setCycleLen(l => Math.max(21, l - 1))}
                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center active:scale-90 transition font-bold text-on-surface-variant">−</button>
                  <span className="font-label text-[16px] text-primary font-bold w-12 text-center">{cycleLen} 天</span>
                  <button onClick={() => setCycleLen(l => Math.min(45, l + 1))}
                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center active:scale-90 transition font-bold text-on-surface-variant">＋</button>
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="font-label text-[15px] text-on-surface">经期天数</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setPeriodLen(l => Math.max(2, l - 1))}
                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center active:scale-90 transition font-bold text-on-surface-variant">−</button>
                  <span className="font-label text-[16px] text-primary font-bold w-12 text-center">{periodLen} 天</span>
                  <button onClick={() => setPeriodLen(l => Math.min(10, l + 1))}
                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center active:scale-90 transition font-bold text-on-surface-variant">＋</button>
                </div>
              </div>
            </section>

            {/* 四阶段训练策略展开面板 */}
            <section className="space-y-2">
              <h2 className="font-label text-[13px] text-outline uppercase tracking-wider px-1">各阶段训练策略</h2>
              {PHASES.map((p, i) => (
                <div key={p.id} className={`rounded-xl overflow-hidden border transition-all
                  ${i === CURRENT_PHASE_IDX ? 'border-primary/30' : 'border-surface-variant'}`}>
                  {/* 标题行 */}
                  <button
                    onClick={() => setExpanded(expanded === i ? -1 : i)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 ${p.color} active:opacity-80 transition`}>
                    <span className="text-[20px]">{p.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className={`font-label text-[15px] font-bold ${p.textColor}`}>{p.name}</p>
                        {i === CURRENT_PHASE_IDX && (
                          <span className="font-label text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">当前</span>
                        )}
                      </div>
                      <p className="font-label text-[11px] text-outline">{p.days}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-label text-[11px] px-2 py-0.5 rounded-full ${p.intensityColor}`}>{p.intensity}</span>
                      <Icon name={expanded === i ? 'expand_more' : 'chevron_right'} size={18} className="text-outline" />
                    </div>
                  </button>

                  {/* 展开内容 */}
                  {expanded === i && (
                    <div className="px-4 py-4 bg-surface-container-lowest space-y-3 border-t border-surface-variant">
                      <p className="font-body text-[13px] text-on-surface-variant leading-relaxed">{p.desc}</p>
                      <div>
                        <p className="font-label text-[12px] text-on-surface mb-1.5">本阶段推荐动作</p>
                        <div className="space-y-1">
                          {p.exercises.map(e => (
                            <div key={e} className="flex items-center gap-2">
                              <Icon name="check_circle" size={14} className="text-primary-container flex-none" />
                              <span className="font-label text-[13px] text-on-surface">{e}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {p.avoid.length > 0 && (
                        <div>
                          <p className="font-label text-[12px] text-error mb-1.5">本阶段避免</p>
                          <div className="space-y-1">
                            {p.avoid.map(a => (
                              <div key={a} className="flex items-center gap-2">
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-error/50 flex-none" />
                                <span className="font-label text-[13px] text-on-surface-variant">{a}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* 隐私说明 */}
            <div className="flex items-start gap-3 bg-surface-container rounded-xl px-4 py-3">
              <Icon name="lock" size={16} className="text-outline mt-0.5 flex-none" />
              <p className="font-label text-[12px] text-outline leading-relaxed">
                周期数据仅存储在您的设备本地，不上传至服务器，不用于任何商业目的。您可在账号管理中随时清除。
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
