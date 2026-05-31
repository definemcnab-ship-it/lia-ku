import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Skeleton from '../components/Skeleton.jsx'

function ReportSkeleton() {
  return (
    <div className="px-container-padding-mobile pb-10 space-y-stack-lg" aria-busy="true" aria-label="报告加载中">
      <Skeleton className="h-44 w-full" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-32" rounded="rounded-md" />
        {[0, 1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full" />)}
      </div>
      <Skeleton className="h-14 w-full" />
    </div>
  )
}

const dims = [
  { name: '头颈姿态', score: 78, weight: '25%' },
  { name: '肩背姿态', score: 82, weight: '25%' },
  { name: '骨盆姿态', score: 90, weight: '20%' },
  { name: '脊柱排列', score: 88, weight: '15%' },
  { name: '下肢力线', score: 92, weight: '15%' },
]

// AI 识别出的具体痛点，含严重程度与优先级
const PAIN_POINTS = [
  {
    id: 'pp1', title: '头部前伸 (FHP)', severity: 'high', deg: '4.2 cm',
    icon: 'flash_on', color: 'bg-[#ece0d8]', badge: 'bg-error/15 text-error',
    badgeText: '需重点改善',
    desc: 'AI 检测到头部重心超出肩关节前方约 4.2 cm，长期可增加颈椎负荷约 3 倍，易引发颈源性头痛。',
    actions: ['下巴后缩练习 · 每日 3 组', '上斜方肌拉伸 · 每日 2 次', '减少低头看手机时间'],
  },
  {
    id: 'pp2', title: '双侧圆肩', severity: 'high', deg: '左 +18° / 右 +14°',
    icon: 'flash_on', color: 'bg-[#ece0d8]', badge: 'bg-error/15 text-error',
    badgeText: '需重点改善',
    desc: '肩峰内旋显著，左侧较右侧更明显。长期圆肩会压迫肩袖，增加肩袖撞击综合征风险。',
    actions: ['弹力带划船 · 每日 3 组', '胸大肌墙角拉伸 · 每日 2 次', '俯卧 Y-T-W 激活中下斜方'],
  },
  {
    id: 'pp3', title: '骨盆轻度前倾', severity: 'medium', deg: '12°（正常 ≤8°）',
    icon: 'lightbulb', color: 'bg-[#ebe6d6]', badge: 'bg-[#ebe6d6] text-[#8f7a55]',
    badgeText: '轻度偏差',
    desc: '骨盆前倾角度轻微偏高，下背可能存在补偿性紧张，久坐时腰部容易酸胀。',
    actions: ['臀桥强化臀大肌 · 3 组 × 15 次', '髂腰肌弓步拉伸 · 每日换边各 30 秒', '鸟狗式核心激活'],
  },
  {
    id: 'pp4', title: '高低肩（左高于右）', severity: 'medium', deg: '差值 11 mm',
    icon: 'lightbulb', color: 'bg-[#ebe6d6]', badge: 'bg-[#ebe6d6] text-[#8f7a55]',
    badgeText: '轻度偏差',
    desc: '肩峰高度左侧高于右侧约 11 mm，可能与惯用手负重习惯或脊柱轻度侧弯有关。',
    actions: ['右侧下斜方肌激活练习', '避免单侧背包', '睡眠时可尝试右侧垫薄枕调整'],
  },
  {
    id: 'pp5', title: '膝关节排列良好', severity: 'low', deg: 'Q 角正常范围',
    icon: 'check_circle', color: 'bg-[#dfe3dd]', badge: 'bg-[#dfe3dd] text-[#5a7a5a]',
    badgeText: '表现良好',
    desc: 'Q 角在正常女性参考范围内，下肢力线无明显 X/O 型异常，继续保持。',
    actions: ['蚌式开合维持臀中肌力量', '足弓短足训练，维护地基稳定'],
  },
]

function ShareCard({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={onClose}>
      <div className="w-full max-w-[390px] bg-surface rounded-t-3xl pb-10 overflow-hidden"
        onClick={e => e.stopPropagation()}>

        {/* 可分享的卡片主体 */}
        <div className="mx-5 mt-5 rounded-2xl overflow-hidden shadow-xl"
          style={{ background: 'linear-gradient(135deg, #a89f90 0%, #8f8779 60%, #6d2f21 100%)' }}>
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

function PainPointCard({ p, delay }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${p.color} rounded-lg overflow-hidden animate-page-in`}
      style={{ animationDelay: `${delay}ms` }}>
      <button className="w-full p-4 flex items-start gap-3 text-left active:opacity-80 transition"
        onClick={() => setOpen(o => !o)}>
        <Icon name={p.icon} size={20} className="text-on-surface-variant shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label text-[14px] text-on-surface">{p.title}</span>
            <span className={`font-label text-[10px] px-2 py-0.5 rounded-full ${p.badge}`}>{p.badgeText}</span>
          </div>
          <p className="font-label text-[12px] text-on-surface-variant mt-0.5">{p.deg}</p>
        </div>
        <Icon name={open ? 'expand_more' : 'chevron_right'} size={18}
          className={`text-outline shrink-0 transition-transform ${open ? 'rotate-0' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 animate-page-in">
          <p className="font-body text-[13px] text-on-surface-variant leading-relaxed">{p.desc}</p>
          <div className="space-y-1.5">
            <p className="font-label text-[12px] text-on-surface font-bold">改善建议</p>
            {p.actions.map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-white/60 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span className="font-body text-[13px] text-on-surface-variant">{a}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Report() {
  const nav = useNavigate()
  const [showShare, setShowShare] = useState(false)
  const [loading, setLoading] = useState(true)

  // 模拟从服务端拉取报告（真实产品会是网络请求）
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 850)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <div className="font-body text-on-background">
        <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
          <button onClick={() => nav('/home')} aria-label="返回首页" className="active:scale-90 transition">
            <Icon name="arrow_back" size={24} className="text-on-surface" />
          </button>
          <span className="font-headline text-[18px] text-on-surface">斯俪体态健康报告</span>
          <button onClick={() => setShowShare(true)} aria-label="分享报告"
            disabled={loading}
            className="active:scale-90 transition disabled:opacity-40">
            <Icon name="ios_share" size={24} className="text-primary" />
          </button>
        </header>

        {loading ? <ReportSkeleton /> : (

        <main className="px-container-padding-mobile pb-10 space-y-stack-lg">
          {/* 总分卡片 */}
          <section className="bg-gradient-to-br from-[#a89f90] to-[#8f8779] rounded-lg p-6 text-white text-center shadow-lg">
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

          {/* AI 痛点详解 */}
          <section className="space-y-stack-md">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-[20px] text-on-surface">AI 识别痛点</h2>
              <span className="font-label text-[12px] text-outline">{PAIN_POINTS.length} 项分析</span>
            </div>
            <div className="space-y-3">
              {PAIN_POINTS.map((p, i) => (
                <PainPointCard key={p.id} p={p} delay={i * 60} />
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
        )}
      </div>

      {showShare && <ShareCard onClose={() => setShowShare(false)} />}
    </>
  )
}
