// 进步追踪（方案文档 §2.1 进步追踪）：体态分趋势 + 角度曲线 + 打卡日历。
const trend = [
  { week: '第1周', score: 72 },
  { week: '第2周', score: 76 },
  { week: '第4周', score: 80 },
  { week: '第6周', score: 83 },
  { week: '第8周', score: 85 },
]
const maxScore = 100

export default function Progress() {
  // 折线坐标点
  const w = 300, h = 140, pad = 10
  const pts = trend.map((t, i) => {
    const x = pad + (i * (w - pad * 2)) / (trend.length - 1)
    const y = h - pad - ((t.score - 60) / (maxScore - 60)) * (h - pad * 2)
    return [x, y]
  })
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ')

  return (
    <div className="font-body text-on-background">
      <header className="px-container-padding-mobile pt-stack-md pb-2 sticky top-0 bg-surface z-40">
        <h1 className="font-headline text-[28px] text-on-surface">进步追踪</h1>
        <p className="font-body text-on-surface-variant text-sm">8 周以来你的体态分提升了 13 分 🎉</p>
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 趋势曲线 */}
        <section className="bg-surface-container-lowest rounded-lg p-5 shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
          <h2 className="font-headline text-[18px] text-on-surface mb-4">斯俪体态分趋势</h2>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            <path d={`${path} L${pts[pts.length-1][0]},${h-pad} L${pts[0][0]},${h-pad} Z`} fill="#e67e6622" />
            <path d={path} fill="none" stroke="#9b4430" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#9b4430" />)}
          </svg>
          <div className="flex justify-between mt-2">
            {trend.map(t => <span key={t.week} className="font-label text-[11px] text-outline">{t.week}</span>)}
          </div>
        </section>

        {/* 前后对比 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[18px] text-on-surface">前后照片对比</h2>
          <div className="grid grid-cols-2 gap-3">
            {['第 1 周', '第 8 周'].map((label) => (
              <div key={label} className="rounded-lg overflow-hidden relative">
                <img className="w-full h-44 object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHyI6whnTs_z1rs6V8iZd8gUmfEqQxIkKNwBvmvPRywg-Kt2-FAxQn7MH_y--q4UF7wcBxy7aXozKTMXsakKByqpsaTn88vostK0QLRg9LAAKe4xh5htOmBneMWTv4nIrtMNJSo_9Jx_vwHbh92PtHH_fgkCjiCv8tiwCSh2ysPE-_aEgs1KyOeiOaEke9tPIz8Z1nJ5dft6YFf_B3uNSLXt9c0TyBfYOM_W8d-SzumUZ2Ua5-R0VNaznf_8_mSuQsZyF-NCSzj1I" />
                <span className="absolute bottom-2 left-2 bg-black/50 text-white font-label text-[11px] px-2 py-0.5 rounded-full">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 打卡日历 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[18px] text-on-surface">体态成长日历 · 连续 12 天</h2>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={`aspect-square rounded-md ${i < 12 ? 'bg-primary-container' : 'bg-surface-container'}`} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
