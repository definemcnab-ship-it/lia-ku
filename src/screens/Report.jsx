import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

const dims = [
  { name: '头颈姿态', score: 78, weight: '25%' },
  { name: '肩背姿态', score: 82, weight: '25%' },
  { name: '骨盆姿态', score: 90, weight: '20%' },
  { name: '脊柱排列', score: 88, weight: '15%' },
  { name: '下肢力线', score: 92, weight: '15%' },
]

function ShareCard({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={onClose}>
      <div className="w-full max-w-[390px] bg-surface rounded-t-3xl pb-10 overflow-hidden"
        onClick={e => e.stopPropagation()}>

        {/* 可分享的卡片主体 */}
        <div className="mx-5 mt-5 rounded-2xl overflow-hidden shadow-xl"
          style={{ background: 'linear-gradient(135deg, #e67e66 0%, #9b4430 60%, #6d2f21 100%)' }}>
          {/* 顶部装饰 */}
          <div className="relative px-6 pt-6 pb-4">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-white/5" />
            <div className="flex items-center gap-2 mb-4">
              <svg fill="none" width="20" height="20" viewBox="0 0 64 64" className="text-white/80">
                <path d="M48 16C48 16 44 12 36 12C28 12 24 20 24 24C24 28 28 32 36 36C44 40 48 44 48 52C48 60 40 64 32 64C24 64 16 60 16 52" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                <path d="M16 48C16 48 20 52 28 52C36 52 40 44 40 40C40 36 36 32 28 28C20 24 16 20 16 12C16 4 24 0 32 0C40 0 48 4 48 12" opacity="0.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
              <span className="font-display text-white font-bold text-[16px] tracking-wide">斯俪 Slique</span>
            </div>
            <p className="font-label text-white/70 text-[11px] uppercase tracking-widest mb-1">体态健康评估报告</p>
            <div className="flex items-end gap-2">
              <span className="font-display text-[64px] font-bold text-white leading-none">85</span>
              <div className="pb-2">
                <span className="font-label text-white/70 text-[14px]">/ 100</span>
                <div className="mt-1 bg-white/20 px-2 py-0.5 rounded-full">
                  <span className="font-label text-white text-[12px]">A 级 · 略有偏差</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5 维雷达简化条形 */}
          <div className="px-6 pb-5 space-y-2">
            <div className="h-px bg-white/15 mb-3" />
            {dims.map(d => (
              <div key={d.name} className="flex items-center gap-3">
                <span className="font-label text-[11px] text-white/70 w-16 flex-none">{d.name}</span>
                <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
                  <div className="h-full bg-white/80 rounded-full" style={{ width: `${d.score}%` }} />
                </div>
                <span className="font-label text-[11px] text-white font-bold w-6 text-right">{d.score}</span>
              </div>
            ))}
            <div className="h-px bg-white/15 mt-3 mb-2" />
            <p className="font-label text-[10px] text-white/50 text-center">AI 体态评估 · 仅供参考 · 不构成医疗诊断</p>
          </div>
        </div>

        {/* 分享到哪里 */}
        <div className="px-5 mt-5 space-y-3">
          <p className="font-label text-[13px] text-outline text-center">保存到相册后分享至</p>
          <div className="flex justify-center gap-8">
            {[
              { label: '小红书', bg: 'bg-[#fe2c55]', icon: '📕' },
              { label: '朋友圈', bg: 'bg-[#07C160]', icon: '💬' },
              { label: '微博', bg: 'bg-[#e6162d]', icon: '🔴' },
              { label: '保存图片', bg: 'bg-surface-container', icon: '⬇️' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <div className={`w-12 h-12 rounded-full ${s.bg} flex items-center justify-center text-[22px]
                  active:scale-90 transition cursor-pointer`}>{s.icon}</div>
                <span className="font-label text-[11px] text-outline">{s.label}</span>
              </div>
            ))}
          </div>
          <button onClick={onClose}
            className="w-full h-12 text-outline font-label text-[14px] active:scale-95 transition mt-2">
            取消
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Report() {
  const nav = useNavigate()
  const [showShare, setShowShare] = useState(false)

  return (
    <>
      <div className="font-body text-on-background">
        <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
          <button onClick={() => nav('/home')} className="active:scale-90 transition">
            <Icon name="arrow_back" size={24} className="text-on-surface" />
          </button>
          <span className="font-headline text-[18px] text-on-surface">斯俪体态健康报告</span>
          <button onClick={() => setShowShare(true)} className="active:scale-90 transition">
            <Icon name="ios_share" size={24} className="text-primary" />
          </button>
        </header>

        <main className="px-container-padding-mobile pb-10 space-y-stack-lg">
          {/* 总分卡片 */}
          <section className="bg-gradient-to-br from-[#e67e66] to-[#9b4430] rounded-lg p-6 text-white text-center shadow-lg">
            <p className="font-label text-[12px] uppercase tracking-wider opacity-90">斯俪体态分</p>
            <div className="flex items-end justify-center gap-1 my-2">
              <span className="font-display text-[64px] leading-none font-bold">85</span>
              <span className="font-label text-[16px] mb-3 opacity-90">/ 100</span>
            </div>
            <span className="inline-block bg-white/20 px-4 py-1 rounded-full font-label text-[14px]">A 级 · 略有偏差</span>
            <p className="font-body text-sm opacity-90 mt-3">整体体态良好，主要问题集中在头颈前倾与圆肩，建议加强上交叉矫正训练。</p>
          </section>

          {/* 5 项角度测量 */}
          <section className="space-y-stack-md">
            <h2 className="font-headline text-[20px] text-on-surface">5 项关键测量</h2>
            <div className="space-y-3">
              {dims.map((d, i) => (
                <div key={d.name} className="bg-surface-container-lowest rounded-lg p-4 shadow-[0px_4px_20px_rgba(230,126,102,0.06)] animate-page-in"
                  style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-label text-[14px] text-on-surface">{d.name}</span>
                    <span className="font-label text-[12px] text-outline">权重 {d.weight} · {d.score}分</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary-container rounded-full animate-bar-grow"
                      style={{ '--bar-w': `${d.score}%`, animationDelay: `${i * 60 + 200}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 行动按钮 */}
          <section className="space-y-3">
            <button onClick={() => nav('/player')}
              className="w-full h-14 bg-primary text-on-primary font-label text-lg rounded-lg active:scale-[0.98] transition">
              开始今日矫正训练
            </button>
            <button onClick={() => setShowShare(true)}
              className="w-full h-14 bg-surface-container-lowest border border-outline-variant/40 text-on-surface-variant
              font-label text-lg rounded-lg active:scale-[0.98] transition flex items-center justify-center gap-2">
              <Icon name="share" size={20} className="text-on-surface-variant" />
              分享我的体态报告
            </button>
          </section>

          <p className="text-center font-label text-[11px] text-outline px-6 leading-relaxed">
            本报告由 AI 体态评估生成，仅供健康参考，不构成医疗诊断。如有不适请咨询专业医师。
          </p>
        </main>
      </div>

      {showShare && <ShareCard onClose={() => setShowShare(false)} />}
    </>
  )
}
