import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'

// 首页顶部轮播广告：3 张品牌 / 运营卡，3 秒自动轮播，可手动滑动。
const SLIDES = [
  {
    id: 'a1',
    label: '新功能',
    title: '斯俪等级体系上线',
    sub: '累计打卡 · 月相成长 · 专属奖品',
    to: '/levels',
    cta: '立即查看',
    bg: 'from-[#e9e2d4] to-[#d8cfbf]',
    icon: 'emoji_events',
    iconColor: 'text-[#8f8779]',
  },
  {
    id: 'a2',
    label: '限时活动',
    title: '7 天体态焕新挑战',
    sub: '连续打卡 7 天解锁「晨星」等级',
    to: '/training',
    cta: '马上挑战',
    bg: 'from-[#dfe3dd] to-[#c8d0c8]',
    icon: 'fitness_center',
    iconColor: 'text-[#5a7a5a]',
  },
  {
    id: 'a3',
    label: '饮食日历',
    title: '记录三餐，吃出好体态',
    sub: '点击查看本月饮食打卡日历',
    to: '/diet/calendar',
    cta: '查看日历',
    bg: 'from-[#ebe6d6] to-[#d8d0b8]',
    icon: 'calendar_month',
    iconColor: 'text-[#8f7a55]',
  },
]

export default function HomeBanner() {
  const nav = useNavigate()
  const [idx, setIdx] = useState(0)
  const timer = useRef(null)
  const startX = useRef(null)

  const resetTimer = () => {
    clearInterval(timer.current)
    timer.current = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 3000)
  }

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timer.current)
  }, [])

  const go = (n) => { setIdx((n + SLIDES.length) % SLIDES.length); resetTimer() }

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (startX.current === null) return
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1))
    startX.current = null
  }

  const s = SLIDES[idx]
  return (
    <div className="px-container-padding-mobile pt-1 pb-0.5">
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => nav(s.to)}
        className={`relative bg-gradient-to-r ${s.bg} rounded-lg px-5 py-4 cursor-pointer active:scale-[0.98] transition overflow-hidden`}>

        {/* 背景装饰圆 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/20 pointer-events-none" />
        <div className="absolute right-12 top-0 w-14 h-14 rounded-full bg-white/10 pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <span className="inline-block font-label text-[10px] text-on-surface-variant/70 bg-white/40 px-2 py-0.5 rounded-full mb-1.5">
              {s.label}
            </span>
            <h3 className="font-headline text-[16px] text-on-surface truncate">{s.title}</h3>
            <p className="font-body text-[12px] text-on-surface-variant/80 mt-0.5 truncate">{s.sub}</p>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
              <Icon name={s.icon} size={22} className={s.iconColor} />
            </div>
            <span className="font-label text-[11px] text-primary whitespace-nowrap">{s.cta} →</span>
          </div>
        </div>

        {/* 点状指示器 */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); go(i) }}
              className={`rounded-full transition-all ${i === idx ? 'w-4 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-outline-variant/60'}`}
              aria-label={`切换至第 ${i + 1} 张`} />
          ))}
        </div>
      </div>
    </div>
  )
}
