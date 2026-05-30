import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

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
  return (
    <div className="font-body text-on-background">
      {/* 顶部栏 */}
      <nav className="flex justify-between items-center px-container-padding-mobile py-stack-md w-full bg-surface sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div onClick={() => nav('/profile')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container cursor-pointer bg-primary-fixed flex items-center justify-center">
            <Icon name="person" size={22} className="text-primary" />
          </div>
          <span className="font-headline text-[24px] text-primary tracking-tight">Slique</span>
        </div>
        <button className="hover:opacity-80 active:scale-95 transition">
          <Icon name="notifications" size={28} className="text-primary" />
        </button>
      </nav>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 欢迎 + 体态分概览 */}
        <section className="mt-stack-md">
          <div className="mb-stack-md">
            <h1 className="font-headline text-[36px] leading-[44px] text-on-surface">{greeting()}</h1>
            <p className="font-body text-on-surface-variant">今天也要保持优雅体态哦 ✨</p>
          </div>
          <div onClick={() => nav('/report')}
            className="bg-surface-container-lowest rounded-lg p-stack-md shadow-[0px_4px_20px_rgba(230,126,102,0.08)]
              border border-primary-fixed flex items-center justify-between cursor-pointer">
            <div className="space-y-1">
              <p className="font-label text-[12px] text-outline uppercase tracking-wider">当前体态分</p>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-[36px] leading-[44px] font-bold text-primary">85</span>
                <span className="font-label text-[14px] text-on-surface-variant">/ 100</span>
              </div>
              <div className="flex items-center gap-1 text-secondary">
                <Icon name="trending_up" size={16} />
                <span className="font-label text-[12px]">比上周提升了 3 分</span>
              </div>
            </div>
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                <circle className="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" />
                <circle className="text-primary-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor"
                  strokeDasharray="251.2" strokeWidth="8" strokeLinecap="round"
                  style={{ '--ring-offset': '37.68px', strokeDashoffset: '37.68' }}
                  className="animate-ring-draw" />
              </svg>
              <Icon name="accessibility_new" size={32} className="absolute text-primary" />
            </div>
          </div>
        </section>

        {/* 今日训练计划 */}
        <section className="space-y-stack-md">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-[24px] text-on-surface">今日训练计划</h2>
            <button onClick={() => nav('/training')} className="font-label text-[14px] text-primary">查看全部</button>
          </div>
          <div onClick={() => nav('/training')}
            className="relative bg-surface-container-lowest rounded-lg overflow-hidden shadow-lg border border-surface-variant
              group active:scale-[0.98] transition-transform cursor-pointer">
            <div className="h-48 w-full bg-gradient-to-br from-primary-fixed to-primary-container flex items-center justify-center relative">
              <div className="text-center text-primary">
                <Icon name="fitness_center" size={56} className="mx-auto mb-2 opacity-60" />
                <p className="font-label text-[13px] opacity-70">天鹅颈舒缓拉伸</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-headline text-[22px]">天鹅颈舒缓拉伸</h3>
                <p className="font-label text-[13px] opacity-90">改善圆肩 · 15分钟 · 12个动作</p>
              </div>
            </div>
            <div className="p-stack-md flex items-center justify-between">
              <div className="flex-1 mr-stack-md">
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container w-[45%]" />
                </div>
                <p className="mt-2 font-label text-[12px] text-on-surface-variant">今日进度 45%</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); nav('/player') }}
                className="bg-primary text-white h-12 w-12 rounded-full flex items-center justify-center shadow-md active:scale-90 transition">
                <Icon name="play_arrow" size={24} className="text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* 核心功能 Bento */}
        <section className="grid grid-cols-2 gap-stack-md">
          <Bento color="bg-mint border-teal-100" iconBg="bg-white/80" iconColor="text-teal-600"
            icon="camera" title="AI 姿态扫描" titleColor="text-teal-900" desc="快速诊断潜在风险" descColor="text-teal-700/70"
            onClick={() => nav('/scan')} />
          <Bento color="bg-lavender border-purple-100" iconBg="bg-white/80" iconColor="text-purple-600"
            icon="analytics" title="进步追踪" titleColor="text-purple-900" desc="查看体态变化轨迹" descColor="text-purple-700/70"
            onClick={() => nav('/progress')} />
        </section>
        <section className="grid grid-cols-2 gap-stack-md">
          <Bento color="bg-surface-container-lowest border-surface-variant shadow-[0px_4px_20px_rgba(230,126,102,0.08)]"
            iconBg="bg-primary-fixed" iconColor="text-primary"
            icon="fitness_center" title="动作库" titleColor="text-on-surface" desc="探索专业矫正动作" descColor="text-on-surface-variant"
            onClick={() => nav('/training')} />
          <Bento color="bg-surface-container-lowest border-surface-variant shadow-[0px_4px_20px_rgba(230,126,102,0.08)]"
            iconBg="bg-[#FFF8E1]" iconColor="text-[#F57F17]"
            icon="restaurant" title="饮食建议" titleColor="text-on-surface" desc="吃出好体态" descColor="text-on-surface-variant"
            onClick={() => nav('/diet')} />
        </section>

        {/* 每日体态小贴士 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[24px] text-on-surface">每日体态小贴士</h2>
          <div className="bg-[#FFF8E1]/60 rounded-lg p-stack-md flex items-start gap-4 border border-[#FFF8E1]">
            <div className="bg-[#FFF8E1] p-2 rounded-md">
              <Icon name="lightbulb" size={22} className="text-[#F9A825]" />
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
