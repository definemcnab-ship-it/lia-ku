import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useStore, setState } from '../lib/store.js'

// 推送通知设置（持久化到 notify）。
export default function Notifications() {
  const nav = useNavigate()
  const { notify } = useStore()

  const patch = (k, v) => setState(s => ({ notify: { ...s.notify, [k]: v } }))

  const toggles = [
    { k: 'daily', label: '每日训练提醒', desc: '到点提醒今天的矫正计划' },
    { k: 'cycle', label: '经期阶段提醒', desc: '周期切换时调整训练强度' },
    { k: 'weekly', label: '每周进步播报', desc: '周日推送本周体态变化' },
  ]

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/profile')} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-ink">推送通知</span>
        <span className="w-6" />
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 总开关 */}
        <section className="bg-surface-container-lowest rounded-lg p-4 flex items-center gap-3 shadow-soft">
          <Icon name="notifications" size={22} className="text-primary" />
          <div className="flex-1">
            <p className="font-label text-[15px] text-on-surface">允许推送通知</p>
            <p className="font-label text-[12px] text-outline">关闭后将不再收到任何提醒</p>
          </div>
          <Switch on={notify.enabled} onClick={() => patch('enabled', !notify.enabled)} label="允许推送通知" />
        </section>

        <section className={`space-y-2 transition-opacity ${notify.enabled ? '' : 'opacity-40 pointer-events-none'}`}>
          <h2 className="font-label text-[13px] text-outline uppercase tracking-wider px-1">提醒类型</h2>
          <div className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-soft">
            {toggles.map((t, i) => (
              <div key={t.k} className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-surface-variant' : ''}`}>
                <div className="flex-1">
                  <p className="font-label text-[15px] text-on-surface">{t.label}</p>
                  <p className="font-label text-[12px] text-outline">{t.desc}</p>
                </div>
                <Switch on={notify[t.k]} onClick={() => patch(t.k, !notify[t.k])} label={t.label} />
              </div>
            ))}
          </div>
        </section>

        {/* 免打扰时段 */}
        <section className={`space-y-2 transition-opacity ${notify.enabled ? '' : 'opacity-40 pointer-events-none'}`}>
          <h2 className="font-label text-[13px] text-outline uppercase tracking-wider px-1">推送时段</h2>
          <div className="bg-surface-container-lowest rounded-lg p-4 flex items-center justify-between shadow-soft">
            <span className="font-label text-[15px] text-on-surface">仅在此时段推送</span>
            <div className="flex items-center gap-2">
              <input type="time" value={notify.start} onChange={e => patch('start', e.target.value)}
                className="font-label text-[14px] bg-surface-container rounded-lg px-2 py-1 text-on-surface" aria-label="开始时间" />
              <span className="text-outline">–</span>
              <input type="time" value={notify.end} onChange={e => patch('end', e.target.value)}
                className="font-label text-[14px] bg-surface-container rounded-lg px-2 py-1 text-on-surface" aria-label="结束时间" />
            </div>
          </div>
        </section>

        <p className="font-label text-[12px] text-outline text-center">设置已自动保存</p>
      </main>
    </div>
  )
}

function Switch({ on, onClick, label }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={onClick}
      className={`w-12 h-7 rounded-full p-0.5 transition-colors shrink-0 ${on ? 'bg-primary' : 'bg-outline-variant/50'}`}>
      <span className={`block w-6 h-6 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  )
}
