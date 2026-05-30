import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useStore, computeStreak, countThisMonth, todayStr } from '../lib/store.js'

const trend = [
  { label: '第1周', score: 72 },
  { label: '第2周', score: 76 },
  { label: '第4周', score: 80 },
  { label: '第6周', score: 83 },
  { label: '第8周', score: 85 },
]

const dims = [
  { name: '头颈姿态', before: 62, now: 78 },
  { name: '肩背姿态', before: 70, now: 82 },
  { name: '骨盆姿态', before: 75, now: 90 },
  { name: '脊柱排列', before: 80, now: 88 },
  { name: '下肢力线', before: 85, now: 92 },
]

const WEEK_LABELS = ['日','一','二','三','四','五','六']

// 构建当月日历：返回 { cells, monthLabel }
// cells 为 42 格（6 周），每格 { day, dateStr, trained, isToday, blank }
function buildMonthCalendar(checkIns) {
  const set = new Set(checkIns)
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()       // 当月 1 号是周几
  const daysInMonth = new Date(year, month + 1, 0).getDate()   // 当月天数
  const today = todayStr(now)

  const cells = []
  for (let i = 0; i < firstWeekday; i++) cells.push({ blank: true, key: `b${i}` })
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push({ day: d, dateStr, trained: set.has(dateStr), isToday: dateStr === today, key: dateStr })
  }
  return { cells, monthLabel: `${year} 年 ${month + 1} 月` }
}

function ScoreChart() {
  const W = 300, H = 120, PL = 28, PR = 10, PT = 20, PB = 24
  const iW = W - PL - PR, iH = H - PT - PB
  const minS = 65, maxS = 100

  const pts = trend.map((t, i) => ({
    x: PL + (i / (trend.length - 1)) * iW,
    y: PT + (1 - (t.score - minS) / (maxS - minS)) * iH,
    score: t.score,
    label: t.label,
  }))

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${H - PB} L${pts[0].x},${H - PB} Z`

  // Y-axis gridlines at 70, 80, 90
  const gridScores = [70, 80, 90]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e67e66" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#e67e66" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* grid lines */}
      {gridScores.map(s => {
        const gy = PT + (1 - (s - minS) / (maxS - minS)) * iH
        return (
          <g key={s}>
            <line x1={PL} y1={gy} x2={W - PR} y2={gy} stroke="#dbc1bb" strokeWidth="0.8" strokeDasharray="3 4" />
            <text x={PL - 4} y={gy + 4} textAnchor="end" fontSize="9" fill="#88726d">{s}</text>
          </g>
        )
      })}

      {/* area + line */}
      <path d={areaPath} fill="url(#areaGrad)" />
      <path d={linePath} fill="none" stroke="#9b4430" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* data points + labels */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="white" stroke="#9b4430" strokeWidth="2" />
          <text x={p.x} y={p.y - 9} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9b4430">{p.score}</text>
          <text x={p.x} y={H - 4} textAnchor="middle" fontSize="9" fill="#88726d">{p.label}</text>
        </g>
      ))}
    </svg>
  )
}

export default function Progress() {
  const nav = useNavigate()
  const [activeTab, setActiveTab] = useState('chart')

  const { checkIns, postureScore } = useStore()
  const streak = computeStreak(checkIns)
  const trainedDays = countThisMonth(checkIns)
  const hasData = checkIns.length > 0
  const { cells, monthLabel } = buildMonthCalendar(checkIns)

  return (
    <div className="font-body text-on-background">
      <header className="px-container-padding-mobile pt-stack-md pb-2 sticky top-0 bg-surface z-40 border-b border-surface-variant">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline text-[28px] text-on-surface">进步追踪</h1>
            <p className="font-body text-on-surface-variant text-sm">8 周体态分 +13 🎉</p>
          </div>
          <button onClick={() => nav('/report')}
            className="flex items-center gap-1.5 bg-primary-fixed px-3 py-1.5 rounded-full active:scale-95 transition">
            <Icon name="ios_share" size={16} className="text-primary" />
            <span className="font-label text-[13px] text-primary">分享</span>
          </button>
        </div>
      </header>

      <main className="px-container-padding-mobile pb-10 space-y-stack-lg">

        {/* 摘要统计 */}
        <section className="grid grid-cols-3 gap-3 mt-stack-md">
          {[
            { val: String(postureScore), unit: '分', desc: '当前体态分', color: 'text-primary' },
            { val: String(streak), unit: '天', desc: '当前连续打卡', color: 'text-teal-600' },
            { val: String(trainedDays), unit: '次', desc: '本月训练', color: 'text-purple-600' },
          ].map(s => (
            <div key={s.desc} className="bg-surface-container-lowest rounded-lg p-3 text-center shadow-[0px_4px_16px_rgba(230,126,102,0.06)]">
              <div className="flex items-end justify-center gap-0.5">
                <span className={`font-display text-[28px] font-bold leading-none ${s.color}`}>{s.val}</span>
                <span className={`font-label text-[13px] pb-0.5 ${s.color}`}>{s.unit}</span>
              </div>
              <p className="font-label text-[11px] text-outline mt-1 leading-tight">{s.desc}</p>
            </div>
          ))}
        </section>

        {/* 标签切换 */}
        <section className="space-y-4">
          <div className="flex gap-2">
            {[['chart', '分数曲线'], ['dims', '5维对比'], ['cal', '打卡日历']].map(([k, label]) => (
              <button key={k} onClick={() => setActiveTab(k)}
                className={`px-3 py-1.5 rounded-full font-label text-[13px] transition
                  ${activeTab === k ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'chart' && (
            <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="font-headline text-[17px] text-on-surface">斯俪体态分趋势</h2>
                <span className="font-label text-[12px] text-primary">+13 分</span>
              </div>
              <ScoreChart />
              <p className="font-label text-[11px] text-outline mt-3 text-center">持续训练每 2 周可见明显提升</p>
            </div>
          )}

          {activeTab === 'dims' && (
            <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0px_4px_20px_rgba(230,126,102,0.06)] space-y-4">
              <div className="flex justify-between items-baseline">
                <h2 className="font-headline text-[17px] text-on-surface">5 维体态对比</h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1"><div className="w-3 h-2 rounded-full bg-surface-container" /><span className="font-label text-[11px] text-outline">第1周</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-2 rounded-full bg-primary-container" /><span className="font-label text-[11px] text-primary">当前</span></div>
                </div>
              </div>
              {dims.map((d, i) => (
                <div key={d.name} className="space-y-1 animate-page-in" style={{ animationDelay: `${i * 70}ms` }}>
                  <div className="flex justify-between">
                    <span className="font-label text-[13px] text-on-surface">{d.name}</span>
                    <span className="font-label text-[12px] text-primary">+{d.now - d.before} 分</span>
                  </div>
                  <div className="relative h-4 bg-surface-container rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-outline-variant/40 rounded-full animate-bar-grow"
                      style={{ '--bar-w': `${d.before}%`, animationDelay: `${i * 70 + 100}ms` }} />
                    <div className="absolute inset-y-0 left-0 bg-primary-container rounded-full animate-bar-grow"
                      style={{ '--bar-w': `${d.now}%`, animationDelay: `${i * 70 + 200}ms` }} />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-label text-[10px] text-outline">{d.before} 分</span>
                    <span className="font-label text-[10px] text-primary font-bold">{d.now} 分</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'cal' && (
            <div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="font-headline text-[17px] text-on-surface">{monthLabel}</h2>
                {streak > 0
                  ? <span className="font-label text-[12px] text-teal-600">连续 {streak} 天 🔥</span>
                  : <span className="font-label text-[12px] text-outline">本月训练 {trainedDays} 次</span>}
              </div>
              {/* 星期标头 */}
              <div className="grid grid-cols-7 gap-1.5 mb-1.5">
                {WEEK_LABELS.map(l => (
                  <div key={l} className="text-center font-label text-[10px] text-outline">{l}</div>
                ))}
              </div>
              {/* 日期格 */}
              <div className="grid grid-cols-7 gap-1.5">
                {cells.map(c =>
                  c.blank ? (
                    <div key={c.key} className="aspect-square" />
                  ) : (
                    <div key={c.key}
                      className={`aspect-square rounded-md flex items-center justify-center text-[11px] font-label transition
                        ${c.trained
                          ? 'bg-primary-container text-primary font-bold'
                          : c.isToday
                          ? 'bg-surface-container text-primary ring-1 ring-primary/40'
                          : 'bg-surface-container text-outline'}`}>
                      {c.day}
                    </div>
                  )
                )}
              </div>
              <div className="flex items-center gap-4 mt-3 justify-center">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary-container" /><span className="font-label text-[11px] text-outline">已训练</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-surface-container ring-1 ring-primary/40" /><span className="font-label text-[11px] text-outline">今天</span></div>
              </div>
              {!hasData && (
                <div className="mt-4 text-center bg-surface-container rounded-lg py-4 px-3">
                  <p className="font-label text-[13px] text-on-surface-variant">还没有训练记录</p>
                  <p className="font-label text-[11px] text-outline mt-1">完成一次训练，这里会自动点亮今天 ✨</p>
                  <button onClick={() => nav('/player')}
                    className="mt-3 bg-primary text-white font-label text-[13px] px-5 py-2 rounded-full active:scale-95 transition">
                    开始今日训练
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 前后对比占位 */}
        <section className="space-y-3">
          <h2 className="font-headline text-[18px] text-on-surface">前后照片对比</h2>
          <div className="grid grid-cols-2 gap-3">
            {[{ label: '第 1 周', score: 72, color: 'from-surface-container to-outline-variant/30' },
              { label: '第 8 周', score: 85, color: 'from-primary-fixed to-primary-container/60' }].map(item => (
              <div key={item.label} className={`rounded-xl h-44 bg-gradient-to-br ${item.color} flex flex-col items-center justify-center relative overflow-hidden border border-outline-variant/20`}>
                {/* 人体轮廓 SVG */}
                <svg width="60" height="110" viewBox="0 0 60 110" className="opacity-30">
                  <ellipse cx="30" cy="14" rx="11" ry="13" fill="currentColor" />
                  <line x1="30" y1="27" x2="30" y2="72" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  <line x1="30" y1="40" x2="10" y2="62" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <line x1="30" y1="40" x2="50" y2="62" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <line x1="30" y1="72" x2="18" y2="106" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <line x1="30" y1="72" x2="42" y2="106" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 bg-black/30 px-3 py-2 flex justify-between items-center">
                  <span className="font-label text-[12px] text-white">{item.label}</span>
                  <span className="font-label text-[13px] text-white font-bold">{item.score} 分</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => nav('/scan')}
            className="w-full h-12 border border-dashed border-outline-variant/60 rounded-xl text-outline font-label text-[13px]
              flex items-center justify-center gap-2 active:scale-[0.98] transition">
            <Icon name="photo_camera" size={18} className="text-outline" />
            拍摄新一轮体态照，更新对比
          </button>
        </section>

      </main>
    </div>
  )
}
