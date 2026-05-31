import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useStore } from '../lib/store.js'
import { SLIQUE_LEVELS, computeLevel } from '../lib/content.js'

// 我的 → 斯俪分阶梯等级：累计打卡解锁等级与专属权益。
export default function Levels() {
  const nav = useNavigate()
  const { checkIns } = useStore()
  const total = checkIns.length
  const { index, current, next, progress, remain } = computeLevel(total)

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/profile')} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-on-surface">斯俪等级</span>
        <span className="w-6" />
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 当前等级卡 */}
        <section className={`rounded-lg p-5 ${current.color}`}>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center shrink-0">
              <Icon name={current.icon} size={28} className="text-[#8f8779]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-label text-[12px] text-on-surface-variant/70 uppercase tracking-wider">{current.en}</p>
              <h2 className="font-headline text-[24px] text-on-surface">{current.name}</h2>
            </div>
            <span className="font-label text-[13px] text-on-surface-variant">Lv.{index + 1}</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-label text-[12px] text-on-surface-variant">累计打卡 {total} 天</span>
              <span className="font-label text-[12px] text-on-surface-variant">
                {next ? `还差 ${remain} 天升「${next.name}」` : '已达最高等级'}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/50 overflow-hidden">
              <div className="h-full rounded-full bg-[#8f8779] transition-all"
                style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
          </div>
        </section>

        {/* 等级阶梯 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[18px] text-on-surface">成长阶梯</h2>
          <div className="space-y-3">
            {SLIQUE_LEVELS.map((lv, i) => {
              const unlocked = total >= lv.need
              const isCurrent = i === index
              return (
                <div key={lv.id}
                  className={`rounded-lg p-4 flex items-start gap-4 transition
                    ${unlocked ? 'bg-surface-container-lowest' : 'bg-surface-container-lowest opacity-55'}
                    ${isCurrent ? 'ring-2 ring-primary' : ''}
                    shadow-[0px_4px_20px_rgba(230,126,102,0.06)]`}>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${lv.color}`}>
                    <Icon name={unlocked ? lv.icon : 'lock'} size={20}
                      className={unlocked ? 'text-[#8f8779]' : 'text-outline'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label text-[15px] text-on-surface">{lv.name}</span>
                      <span className="font-label text-[11px] text-outline">{lv.need} 天</span>
                      {isCurrent && <span className="font-label text-[10px] text-primary bg-primary-fixed px-1.5 py-0.5 rounded-full">当前</span>}
                    </div>
                    <p className="font-body text-[13px] text-on-surface-variant mt-0.5">{lv.perk}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Icon name="redeem" size={14} className={unlocked ? 'text-primary' : 'text-outline'} />
                      <span className={`font-label text-[12px] ${unlocked ? 'text-primary' : 'text-outline'}`}>{lv.reward}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <p className="font-label text-[12px] text-outline text-center leading-relaxed px-4">
          每完成一次训练打卡累计 1 天，连续坚持即可解锁更高等级与专属权益。
        </p>
      </main>
    </div>
  )
}
