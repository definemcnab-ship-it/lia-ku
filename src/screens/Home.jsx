import { useNavigate } from 'react-router-dom'

// 1:1 还原设计稿 slique_1（首页）。
// 修复：原稿所有 {{DATA:SCREEN:SCREEN_XX}} 占位符跳转失效，已替换为真实路由。
export default function Home() {
  const nav = useNavigate()
  // 体态分 85 的环形进度：周长 2πr (r=40) ≈ 251.2，dashoffset = 251.2 * (1 - 0.85) ≈ 37.68
  return (
    <div className="font-body text-on-background">
      {/* 顶部栏 */}
      <nav className="flex justify-between items-center px-container-padding-mobile py-stack-md w-full bg-surface sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div onClick={() => nav('/profile')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container cursor-pointer">
            <img alt="用户头像" className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO3yRuRpo0wqoa9yzVrf7yRW863HZ8bMHb7N98KKSFLcwJrNga8TqTqYzeSiQjfKkneVaBN_58McJC53Lsy8GCu2DQj2sJ38lqAIXU2r_65NT4RU5ltny0Rer3eW7N04SnbA_ObP19m6v9wdmxK3yIYExZbKmICO22mYTLniXmhjsu10kZXcTzPraa0Hq7PbqTWuu71hpcOXqlWKlifJrTerBbWh__Mz9aAKQA28SB0z1Alzzf4p_-ZJkK-W5cugkMb9T0yCAgUl4" />
          </div>
          <span className="font-headline text-[24px] text-primary tracking-tight">Slique</span>
        </div>
        <button className="hover:opacity-80 active:scale-95 transition">
          <span className="material-symbols-outlined text-primary text-[28px]">notifications</span>
        </button>
      </nav>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 欢迎 + 体态分概览 */}
        <section className="mt-stack-md">
          <div className="mb-stack-md">
            <h1 className="font-headline text-[36px] leading-[44px] text-on-surface">早安，若曦</h1>
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
                <span className="material-symbols-outlined fill-icon text-[16px]">trending_up</span>
                <span className="font-label text-[12px]">比上周提升了 3 分</span>
              </div>
            </div>
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                <circle className="text-surface-container-high" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" />
                <circle className="text-primary-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor"
                  strokeDasharray="251.2" strokeDashoffset="37.68" strokeWidth="8" strokeLinecap="round" />
              </svg>
              <span className="absolute material-symbols-outlined fill-icon text-primary text-[32px]">accessibility_new</span>
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
            <div className="h-48 w-full overflow-hidden relative">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHyI6whnTs_z1rs6V8iZd8gUmfEqQxIkKNwBvmvPRywg-Kt2-FAxQn7MH_y--q4UF7wcBxy7aXozKTMXsakKByqpsaTn88vostK0QLRg9LAAKe4xh5htOmBneMWTv4nIrtMNJSo_9Jx_vwHbh92PtHH_fgkCjiCv8tiwCSh2ysPE-_aEgs1KyOeiOaEke9tPIz8Z1nJ5dft6YFf_B3uNSLXt9c0TyBfYOM_W8d-SzumUZ2Ua5-R0VNaznf_8_mSuQsZyF-NCSzj1I" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-headline text-[24px]">天鹅颈舒缓拉伸</h3>
                <p className="font-label text-[14px] opacity-90">改善圆肩 · 15分钟 · 12个动作</p>
              </div>
            </div>
            <div className="p-stack-md flex items-center justify-between">
              <div className="flex-1 mr-stack-md">
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container w-[45%]" />
                </div>
                <p className="mt-2 font-label text-[12px] text-on-surface-variant">今日进度 45%</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); nav('/training') }}
                className="bg-primary text-white h-12 w-12 rounded-full flex items-center justify-center shadow-md active:scale-90 transition">
                <span className="material-symbols-outlined fill-icon">play_arrow</span>
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
            icon="fitness_center" title="动作库" titleColor="text-on-surface" desc="探索专业矫正动作" descColor="text-on-surface-variant opacity-70"
            onClick={() => nav('/training')} />
          <Bento color="bg-surface-container-lowest border-surface-variant shadow-[0px_4px_20px_rgba(230,126,102,0.08)]"
            iconBg="bg-secondary-container" iconColor="text-secondary"
            icon="restaurant" title="饮食建议" titleColor="text-on-surface" desc="吃出好体态" descColor="text-on-surface-variant opacity-70"
            onClick={() => nav('/report')} />
        </section>

        {/* 每日体态小贴士 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[24px] text-on-surface">每日体态小贴士</h2>
          <div className="bg-secondary-fixed/20 rounded-lg p-stack-md flex items-start gap-4 border border-secondary-fixed/40">
            <div className="bg-secondary-container p-2 rounded-md">
              <span className="material-symbols-outlined text-on-secondary-container">lightbulb</span>
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
        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
      </div>
      <div>
        <h3 className={`font-label text-[14px] ${titleColor}`}>{title}</h3>
        <p className={`font-label text-[12px] ${descColor}`}>{desc}</p>
      </div>
    </div>
  )
}
