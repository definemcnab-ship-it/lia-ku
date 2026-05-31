import { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { findCategory } from '../lib/content.js'

// 动作库三级页：分类 → 动作列表 → 动作详情（底部抽屉）。
export default function Library() {
  const nav = useNavigate()
  const { id } = useParams()
  const cat = findCategory(id)
  const [active, setActive] = useState(null)

  if (!cat) return <Navigate to="/training" replace />

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/training')} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-on-surface truncate px-3">{cat.name}</span>
        <span className="w-6" />
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 分类说明 */}
        <section className={`rounded-lg p-5 ${cat.color}`}>
          <p className="font-label text-[12px] opacity-70">{cat.en}</p>
          <h2 className="font-headline text-[20px] font-bold mt-0.5 mb-2">{cat.name}</h2>
          <p className="font-body text-[13px] leading-relaxed opacity-90">{cat.desc}</p>
        </section>

        {/* 动作列表 */}
        <section className="space-y-stack-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-[18px] text-on-surface">推荐动作</h2>
            <span className="font-label text-[12px] text-outline">{cat.exercises.length} 个动作</span>
          </div>
          <div className="space-y-3">
            {cat.exercises.map((ex, i) => (
              <button key={ex.name} onClick={() => setActive(ex)}
                className="w-full bg-surface-container-lowest rounded-lg p-4 flex items-center gap-4 text-left
                  shadow-[0px_4px_20px_rgba(230,126,102,0.06)] active:scale-[0.98] transition">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold shrink-0">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-label text-[15px] text-on-surface truncate">{ex.name}</p>
                  <p className="font-label text-[12px] text-outline">{ex.dur}</p>
                </div>
                <span className={`font-label text-[11px] px-2 py-1 rounded-full shrink-0 ${ex.lc}`}>{ex.level}</span>
                <Icon name="chevron_right" size={20} className="text-outline shrink-0" />
              </button>
            ))}
          </div>
        </section>

        <button onClick={() => nav('/player')}
          className="w-full h-14 bg-primary text-on-primary font-label text-lg rounded-lg active:scale-[0.98] transition
          flex items-center justify-center gap-2">
          <Icon name="play_arrow" size={20} className="text-white" />开始本组训练
        </button>
      </main>

      {/* 动作详情抽屉 */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setActive(null)}>
          <div className="bg-surface rounded-t-3xl w-full max-w-md p-6 pb-8 animate-page-in max-h-[85%] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-outline-variant/40 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-headline text-[20px] text-on-surface">{active.name}</h3>
              <span className={`font-label text-[11px] px-2 py-1 rounded-full ${active.lc}`}>{active.level}</span>
            </div>
            <p className="font-label text-[13px] text-primary mb-5">{active.dur}</p>

            <div className="aspect-video rounded-xl bg-primary-fixed/40 flex items-center justify-center mb-5">
              <Icon name="self_improvement" size={56} className="text-primary/40" />
            </div>

            <h4 className="font-label text-[14px] text-on-surface font-bold mb-2">动作步骤</h4>
            <ol className="space-y-2 mb-5">
              {active.steps.map((s, i) => (
                <li key={i} className="flex gap-3 font-body text-[14px] text-on-surface-variant">
                  <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>

            <div className="grid grid-cols-1 gap-3 mb-6">
              <div className="bg-[#dfe3dd] rounded-lg p-3 flex items-start gap-2">
                <Icon name="self_improvement" size={18} className="text-on-surface-variant shrink-0 mt-0.5" />
                <div>
                  <p className="font-label text-[12px] text-on-surface-variant font-bold">呼吸引导</p>
                  <p className="font-body text-[13px] text-on-surface-variant/80">{active.breath}</p>
                </div>
              </div>
              <div className="bg-[#ebe6d6] rounded-lg p-3 flex items-start gap-2">
                <Icon name="lightbulb" size={18} className="text-[#8f8779] shrink-0 mt-0.5" />
                <div>
                  <p className="font-label text-[12px] text-[#6e675b] font-bold">安全提示</p>
                  <p className="font-body text-[13px] text-[#6e675b]/90">{active.tip}</p>
                </div>
              </div>
            </div>

            <button onClick={() => nav('/player')}
              className="w-full h-12 bg-primary text-on-primary font-label rounded-lg active:scale-[0.98] transition
              flex items-center justify-center gap-2">
              <Icon name="play_arrow" size={18} className="text-white" />开始这个动作
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
