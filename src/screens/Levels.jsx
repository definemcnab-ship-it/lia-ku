import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useStore, recordTrainingDone, todayStr, badgeWall } from '../lib/store.js'
import { SLIQUE_LEVELS, computeLevel } from '../lib/content.js'

// 我的 → 斯俪分阶梯等级：累计打卡解锁等级与专属权益。
export default function Levels() {
  const nav = useNavigate()
  const { checkIns } = useStore()
  const total = checkIns.length
  const { index, current, next, progress, remain } = computeLevel(total)
  const checkedToday = checkIns.includes(todayStr())
  const badges = badgeWall()
  const earnedCount = badges.filter(b => b.earned).length

  // 升级庆祝：打卡后等级 index 提升时弹出
  const prevIndex = useRef(index)
  const [celebrate, setCelebrate] = useState(null)
  useEffect(() => {
    if (index > prevIndex.current) setCelebrate(SLIQUE_LEVELS[index])
    prevIndex.current = index
  }, [index])

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/profile')} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-ink font-light">斯俪等级</span>
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
              <h2 className="font-headline text-[24px] text-ink font-light">{current.name}</h2>
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
              <div className="h-full rounded-full bg-[#8f8779] transition-all duration-500"
                style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
          </div>

          <button onClick={recordTrainingDone} disabled={checkedToday}
            className={`mt-4 w-full h-11 rounded-lg font-label text-[15px] flex items-center justify-center gap-2 transition active:scale-[0.98]
              ${checkedToday ? 'bg-white/40 text-on-surface-variant/60' : 'bg-[#8f8779] text-white'}`}>
            <Icon name={checkedToday ? 'check_circle' : 'add'} size={18} className={checkedToday ? 'text-on-surface-variant/60' : 'text-white'} />
            {checkedToday ? '今日已打卡' : '立即打卡 +1 天'}
          </button>
        </section>

        {/* 成就徽章墙 */}
        <section className="space-y-stack-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-[18px] text-ink font-light">成就徽章</h2>
            <span className="font-label text-[13px] text-on-surface-variant">{earnedCount} / {badges.length}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {badges.map(b => (
              <div key={b.id}
                title={b.desc}
                className={`rounded-lg p-2.5 flex flex-col items-center text-center bg-surface-container-lowest shadow-soft transition ${b.earned ? '' : 'opacity-50'}`}>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[22px] mb-1 ${b.earned ? 'bg-primary-fixed' : 'bg-surface-container'}`}>
                  {b.earned ? b.icon : '🔒'}
                </div>
                <span className="font-label text-[11px] text-on-surface leading-tight">{b.name}</span>
                <span className="font-label text-[9px] text-outline mt-0.5 leading-tight">
                  {b.earned ? '已解锁' : (b.progress || '未解锁')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 等级阶梯 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[18px] text-ink font-light">成长阶梯</h2>
          <div className="space-y-3">
            {SLIQUE_LEVELS.map((lv, i) => {
              const unlocked = total >= lv.need
              const isCurrent = i === index
              return (
                <div key={lv.id}
                  className={`rounded-lg p-4 flex items-start gap-4 transition
                    ${unlocked ? 'bg-surface-container-lowest' : 'bg-surface-container-lowest opacity-55'}
                    ${isCurrent ? 'ring-2 ring-primary' : ''}
                    shadow-soft`}>
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

      {/* 升级庆祝 */}
      {celebrate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-8 animate-fade-in"
          onClick={() => setCelebrate(null)}>
          <div className="bg-surface rounded-2xl p-7 w-full max-w-[320px] text-center animate-page-in" onClick={e => e.stopPropagation()}>
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${celebrate.color}`}>
              <Icon name={celebrate.icon} size={40} className="text-[#8f8779]" />
            </div>
            <p className="font-label text-[12px] text-primary uppercase tracking-widest mb-1">Level Up</p>
            <h3 className="font-headline text-[24px] text-ink mb-1">升级「{celebrate.name}」</h3>
            <p className="font-body text-[13px] text-on-surface-variant mb-4 leading-relaxed">
              恭喜解锁专属权益：{celebrate.perk}
            </p>
            <div className="flex items-center justify-center gap-1.5 bg-primary-fixed rounded-lg py-2.5 mb-5">
              <Icon name="redeem" size={16} className="text-primary" />
              <span className="font-label text-[13px] text-primary">{celebrate.reward}</span>
            </div>
            <button onClick={() => setCelebrate(null)}
              className="w-full h-11 bg-primary text-white font-label rounded-lg active:scale-95 transition">
              继续加油
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
