import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useStore, resetAll } from '../lib/store.js'
import { computeLevel } from '../lib/content.js'

export default function Profile() {
  const nav = useNavigate()
  const state = useStore()
  const { postureScore, cycle, checkIns, prefs, notify, photos } = state
  const [confirmReset, setConfirmReset] = useState(false)

  const grade = postureScore >= 90 ? 'S' : postureScore >= 80 ? 'A' : postureScore >= 70 ? 'B' : 'C'
  const lv = computeLevel(checkIns.length)

  const sceneText = (prefs.scene && prefs.scene.length) ? prefs.scene.join(' / ') : '未设置'
  const notifyText = notify.enabled ? `${notify.start}–${notify.end}` : '已关闭'

  // 导出本地数据为 JSON（个保法：用户可携带自己的数据）
  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `slique-data-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const groups = [
    {
      title: '训练偏好',
      items: [
        {
          icon: 'schedule', label: '经期周期适配',
          extra: cycle.enabled ? `已开启 · ${cycle.cycleLen}天` : '未开启',
          to: '/cycle',
        },
        { icon: 'home', label: '训练场景', extra: sceneText, to: '/scene' },
        { icon: 'notifications', label: '推送通知', extra: notifyText, to: '/notifications' },
      ],
    },
    {
      title: '账号与隐私',
      items: [
        { icon: 'photo_library', label: '体态照片管理', extra: `${photos.length} 张`, to: '/photos' },
        { icon: 'ios_share', label: '导出我的数据', extra: '个保法合规', onClick: exportData },
        { icon: 'lock', label: '隐私政策', extra: '', to: '/legal/privacy' },
        { icon: 'description', label: '用户协议', extra: '', to: '/legal/user' },
        {
          icon: 'close', label: '清除本地数据',
          extra: `${checkIns.length} 条训练记录`, danger: true,
          onClick: () => setConfirmReset(true),
        },
      ],
    },
  ]

  return (
    <div className="font-body text-on-background">
      <header className="px-container-padding-mobile pt-stack-lg pb-stack-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-primary-container bg-primary-fixed flex items-center justify-center">
            <Icon name="person" size={32} className="text-primary" />
          </div>
          <div>
            <h1 className="font-headline text-[22px] text-on-surface">若曦</h1>
            <p className="font-label text-[13px] text-outline">斯俪体态分 {postureScore} · {grade} 级</p>
          </div>
        </div>
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 斯俪等级入口 */}
        <button onClick={() => nav('/levels')}
          className={`w-full text-left rounded-lg p-4 active:scale-[0.98] transition flex items-center gap-3 ${lv.current.color}`}>
          <div className="w-11 h-11 rounded-full bg-white/60 flex items-center justify-center shrink-0">
            <Icon name={lv.current.icon} size={22} className="text-[#8f8779]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-headline text-[16px] text-on-surface">{lv.current.name}</span>
              <span className="font-label text-[11px] text-on-surface-variant">Lv.{lv.index + 1}</span>
            </div>
            <p className="font-label text-[12px] text-on-surface-variant mt-0.5">
              {lv.next ? `再打卡 ${lv.remain} 天解锁「${lv.next.name}」` : '已达最高等级 · 星河'}
            </p>
          </div>
          <Icon name="chevron_right" size={20} className="text-on-surface-variant" />
        </button>

        {groups.map(g => (
          <section key={g.title} className="space-y-2">
            <h2 className="font-label text-[13px] text-outline uppercase tracking-wider px-1">{g.title}</h2>
            <div className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
              {g.items.map((it, i) => (
                <button key={it.label}
                  onClick={() => it.onClick ? it.onClick() : it.to && nav(it.to)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-surface-container transition
                    ${i > 0 ? 'border-t border-surface-variant' : ''}`}>
                  <Icon name={it.icon} size={22} className={it.danger ? 'text-error' : 'text-primary'} />
                  <span className={`flex-1 text-left font-label text-[15px] ${it.danger ? 'text-error' : 'text-on-surface'}`}>{it.label}</span>
                  {it.extra && <span className="font-label text-[12px] text-outline">{it.extra}</span>}
                  <Icon name="chevron_right" size={20} className="text-outline" />
                </button>
              ))}
            </div>
          </section>
        ))}

        <button onClick={() => nav('/login')}
          className="w-full h-12 bg-surface-container text-on-surface-variant font-label rounded-lg active:scale-[0.98] transition">
          退出登录
        </button>
      </main>

      {/* 清除数据确认弹层 */}
      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-8" onClick={() => setConfirmReset(false)}>
          <div className="bg-surface rounded-2xl p-6 w-full max-w-[320px] text-center animate-page-in" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-3">
              <Icon name="close" size={24} className="text-error" />
            </div>
            <h3 className="font-headline text-[18px] text-on-surface mb-1">清除本地数据？</h3>
            <p className="font-label text-[13px] text-outline mb-5 leading-relaxed">
              将删除训练打卡、周期设置等全部本地记录，此操作不可恢复。
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmReset(false)}
                className="flex-1 h-11 bg-surface-container text-on-surface-variant font-label rounded-lg active:scale-95 transition">
                取消
              </button>
              <button onClick={() => { resetAll(); setConfirmReset(false) }}
                className="flex-1 h-11 bg-error text-white font-label rounded-lg active:scale-95 transition">
                确认清除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
