import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import HomeBanner from '../components/HomeBanner.jsx'
import { useStore, todayStr } from '../lib/store.js'
import { COMMUNITY_POSTS } from '../lib/content.js'

const STORY_CARDS = [
  { id: 's1', bg: 'bg-gradient-to-br from-[#c8b89a] to-[#a89070]', icon: 'self_improvement', title: '8周挺拔如模特', sub: '圆肩 → 开肩展背', tag: '真实蜕变' },
  { id: 's2', bg: 'bg-gradient-to-br from-[#a5b5a0] to-[#7d9878]', icon: 'accessibility_new', title: '骨盆归位腰细了', sub: '前倾 → 标准中立', tag: '体态故事' },
  { id: 's3', bg: 'bg-gradient-to-br from-[#b0a8c8] to-[#8878a8]', icon: 'star', title: '天鹅颈不再是梦', sub: '头前引 → 颈部纤长', tag: '30天打卡' },
  { id: 's4', bg: 'bg-gradient-to-br from-[#c0a898] to-[#9a7868]', icon: 'favorite', title: '产后腰腹复原', sub: '腹直肌分离修复', tag: '妈妈蜕变' },
  { id: 's5', bg: 'bg-gradient-to-br from-[#98b0c0] to-[#6888a0]', icon: 'trending_up', title: '体态分 +18 分', sub: '坚持60天的成果', tag: '数据见证' },
]

function greeting() {
  const h = new Date().getHours()
  if (h < 6)  return '夜深了，若曦'
  if (h < 11) return '早安，若曦'
  if (h < 14) return '午好，若曦'
  if (h < 18) return '下午好，若曦'
  return '晚上好，若曦'
}

export default function Home() {
  const nav = useNavigate()
  const { postureScore, lastScore, checkIns } = useStore()
  const diff = postureScore - lastScore
  const ringOffset = (251.2 * (1 - postureScore / 100)).toFixed(2)
  const trainedToday = checkIns.includes(todayStr())
  const todayPct = trainedToday ? 100 : 0
  return (
    <div className="font-body text-on-background">
      {/* 顶部栏 */}
      <nav className="flex justify-between items-center px-container-padding-mobile py-stack-md w-full bg-surface sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => nav('/profile')} aria-label="我的主页"
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container cursor-pointer bg-primary-fixed flex items-center justify-center">
            <Icon name="person" size={22} className="text-primary" />
          </button>
          <span className="font-headline text-[24px] text-primary tracking-tight">Slique</span>
        </div>
        <button aria-label="通知" className="hover:opacity-80 active:scale-95 transition">
          <Icon name="notifications" size={28} className="text-primary" />
        </button>
      </nav>

      <HomeBanner />

      <main className="px-container-padding-mobile pb-8 space-y-10">
        {/* 欢迎 + 体态分概览 */}
        <section className="mt-stack-lg space-y-stack-lg">
          <div className="space-y-1.5">
            <p className="font-label text-[11px] text-gold uppercase tracking-[0.2em]">SLIQUE · 优雅体态</p>
            <h1 className="font-headline text-[34px] leading-[42px] text-ink font-medium">{greeting()}</h1>
            <p className="font-body text-[14px] text-on-surface-variant">今天也要保持优雅体态哦 ✨</p>
          </div>
          <div onClick={() => nav('/report')}
            className="bg-surface-container-lowest rounded-[28px] p-6 shadow-soft
              flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform">
            <div className="space-y-2">
              <p className="font-label text-[11px] text-outline uppercase tracking-[0.15em]">当前体态分</p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[44px] leading-none text-ink">{postureScore}</span>
                <span className="font-label text-[13px] text-outline">/ 100</span>
              </div>
              <div className="flex items-center gap-1.5 text-gold">
                <Icon name="trending_up" size={15} />
                <span className="font-label text-[12px]">
                  {diff > 0 ? `较上次提升了 ${diff} 分` : diff < 0 ? `较上次下降了 ${-diff} 分` : '坚持训练即可提升'}
                </span>
              </div>
            </div>
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                <circle className="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="6" />
                <circle className="text-gold animate-ring-draw" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor"
                  strokeDasharray="251.2" strokeWidth="6" strokeLinecap="round"
                  style={{ '--ring-offset': `${ringOffset}px`, strokeDashoffset: ringOffset }} />
              </svg>
              <Icon name="accessibility_new" size={30} className="absolute text-primary" />
            </div>
          </div>
        </section>

        {/* 今日训练计划 */}
        <section className="space-y-stack-md">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-[22px] text-ink font-medium">今日训练计划</h2>
            <button onClick={() => nav('/training')} className="font-label text-[14px] text-primary">查看全部</button>
          </div>
          <div onClick={() => nav('/training')}
            className="relative bg-surface-container-lowest rounded-[28px] overflow-hidden shadow-soft
              group active:scale-[0.98] transition-transform cursor-pointer">
            <div className="h-48 w-full bg-gradient-to-br from-primary-fixed to-primary-container flex items-center justify-center relative">
              <div className="text-center text-primary">
                <div className="relative mx-auto w-20 h-20 mb-2">
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-soft" />
                  <div className="absolute inset-2 rounded-full bg-white/15 flex items-center justify-center">
                    <Icon name="self_improvement" size={40} className="opacity-80" />
                  </div>
                </div>
                <p className="font-label text-[13px] opacity-70">天鹅颈塑形课</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-headline text-[22px]">天鹅颈塑形课</h3>
                <p className="font-label text-[13px] opacity-90">8周挺拔如模特 · 15分钟 · 4个动作</p>
              </div>
            </div>
            <div className="p-stack-md flex items-center justify-between">
              <div className="flex-1 mr-stack-md">
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container transition-all duration-700" style={{ width: `${todayPct}%` }} />
                </div>
                <p className="mt-2 font-label text-[12px] text-on-surface-variant">
                  {trainedToday ? '今日已完成 ✓' : '今日进度 0% · 待开始'}
                </p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); nav('/player') }}
                aria-label={trainedToday ? '再次训练' : '开始训练'}
                className="bg-primary text-white h-12 w-12 rounded-full flex items-center justify-center shadow-md active:scale-90 transition">
                <Icon name={trainedToday ? 'check_circle' : 'play_arrow'} size={24} className="text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* 成果画廊 - 横向滑动卡片 */}
        <section className="-mx-container-padding-mobile">
          <div className="flex gap-3 px-container-padding-mobile overflow-x-auto pb-1 scrollbar-none">
            {STORY_CARDS.map(s => (
              <div key={s.id} className={`flex-none w-44 h-52 rounded-2xl overflow-hidden relative ${s.bg} shrink-0`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                  <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center">
                    <Icon name={s.icon} size={28} className="text-white/80" />
                  </div>
                  <p className="font-headline text-[13px] text-white text-center leading-snug">{s.title}</p>
                  <p className="font-label text-[11px] text-white/70 text-center">{s.sub}</p>
                </div>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <span className="font-label text-[10px] text-white/60 bg-black/20 px-2 py-0.5 rounded-full">{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 核心功能 Bento */}
        <section className="grid grid-cols-2 gap-stack-md">
          <Bento color="bg-mint border-outline-variant" iconBg="bg-white/80" iconColor="text-on-surface-variant"
            icon="camera" title="AI 姿态扫描" titleColor="text-on-surface-variant" desc="快速诊断潜在风险" descColor="text-on-surface-variant/70"
            onClick={() => nav('/scan')} />
          <Bento color="bg-lavender border-outline-variant" iconBg="bg-white/80" iconColor="text-on-surface-variant"
            icon="analytics" title="进步追踪" titleColor="text-on-surface-variant" desc="查看体态变化轨迹" descColor="text-on-surface-variant/70"
            onClick={() => nav('/progress')} />
        </section>
        <section className="grid grid-cols-2 gap-stack-md">
          <Bento color="bg-surface-container-lowest border-surface-variant shadow-[0px_4px_20px_rgba(230,126,102,0.08)]"
            iconBg="bg-primary-fixed" iconColor="text-primary"
            icon="fitness_center" title="动作库" titleColor="text-on-surface" desc="探索专业矫正动作" descColor="text-on-surface-variant"
            onClick={() => nav('/training')} />
          <Bento color="bg-surface-container-lowest border-surface-variant shadow-[0px_4px_20px_rgba(230,126,102,0.08)]"
            iconBg="bg-[#ece8e0]" iconColor="text-[#8f8779]"
            icon="restaurant" title="饮食建议" titleColor="text-on-surface" desc="吃出好体态" descColor="text-on-surface-variant"
            onClick={() => nav('/diet')} />
        </section>

        {/* 斯俪圈子 */}
        <section className="space-y-stack-md">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-[22px] text-ink font-medium">斯俪圈子</h2>
            <button onClick={() => nav('/community')} className="font-label text-[14px] text-primary">进入圈子</button>
          </div>
          <div onClick={() => nav('/community')}
            className="bg-surface-container-lowest rounded-lg p-stack-md shadow-[0px_4px_20px_rgba(230,126,102,0.06)]
              border border-surface-variant active:scale-[0.98] transition cursor-pointer space-y-3">
            {COMMUNITY_POSTS.slice(0, 2).map(p => (
              <div key={p.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${p.avatarBg}`}>
                  <Icon name="person" size={16} className="text-[#8f8779]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label text-[13px] text-on-surface">{p.name}</span>
                    <span className="font-label text-[10px] text-primary bg-primary-fixed px-1.5 rounded-full"># {p.tag}</span>
                  </div>
                  <p className="font-body text-[12px] text-on-surface-variant line-clamp-1 mt-0.5">{p.text}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Icon name="favorite" size={13} className="text-outline" />
                  <span className="font-label text-[11px] text-outline">{p.likes}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center gap-1 pt-1 border-t border-surface-variant">
              <span className="font-label text-[12px] text-primary pt-2">查看更多体态日记 · 答疑</span>
            </div>
          </div>
        </section>

        {/* 每日体态小贴士 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[22px] text-ink font-medium">每日体态小贴士</h2>
          <div className="bg-[#ece8e0]/60 rounded-lg p-stack-md flex items-start gap-4 border border-[#ece8e0]">
            <div className="bg-[#ece8e0] p-2 rounded-md">
              <Icon name="lightbulb" size={22} className="text-[#8f8779]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-label text-[14px] text-on-surface">长期办公时的颈部保护</h4>
              <p className="font-body text-on-surface-variant text-sm">每隔45分钟，请将视线离开屏幕，尝试将下巴微收，感受颈部后侧的拉伸。</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function Bento({ color, iconBg, iconColor, icon, title, titleColor, desc, descColor, onClick }) {
  return (
    <div onClick={onClick}
      className={`rounded-lg p-stack-md flex flex-col justify-between h-40 border active:scale-95 transition-transform cursor-pointer ${color}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
        <Icon name={icon} size={22} className={iconColor} />
      </div>
      <div>
        <h3 className={`font-label text-[14px] ${titleColor}`}>{title}</h3>
        <p className={`font-label text-[12px] ${descColor}`}>{desc}</p>
      </div>
    </div>
  )
}
