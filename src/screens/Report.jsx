import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

const dims = [
  { name: '头颈姿态', score: 78, weight: '25%' },
  { name: '肩背姿态', score: 82, weight: '25%' },
  { name: '骨盆姿态', score: 90, weight: '20%' },
  { name: '脊柱排列', score: 88, weight: '15%' },
  { name: '下肢力线', score: 92, weight: '15%' },
]

export default function Report() {
  const nav = useNavigate()
  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/home')} className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-on-surface">斯俪体态健康报告</span>
        <button className="active:scale-90 transition">
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
            {dims.map(d => (
              <div key={d.name} className="bg-surface-container-lowest rounded-lg p-4 shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label text-[14px] text-on-surface">{d.name}</span>
                  <span className="font-label text-[12px] text-outline">权重 {d.weight} · {d.score}分</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: `${d.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 行动按钮 */}
        <section className="space-y-3">
          <button onClick={() => nav('/training')}
            className="w-full h-14 bg-primary text-on-primary font-label text-lg rounded-lg active:scale-[0.98] transition">
            获取专属矫正计划
          </button>
          <button className="w-full h-14 bg-surface-container-lowest border border-outline-variant/40 text-on-surface-variant
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
  )
}
