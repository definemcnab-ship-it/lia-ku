import { useNavigate } from 'react-router-dom'

// 训练 / 动作库（方案文档 §2.1 训练核心、§4 体态问题分类）。
const categories = [
  { name: '上交叉综合征', en: 'Upper Crossed', count: '15-18', color: 'bg-mint text-teal-800' },
  { name: '下交叉综合征', en: 'Lower Crossed', count: '12-15', color: 'bg-lavender text-purple-800' },
  { name: '产后腹直肌分离', en: 'Diastasis Recti', count: '12-15', color: 'bg-primary-fixed text-primary' },
  { name: '脊柱侧弯', en: 'Scoliosis', count: '10-12', color: 'bg-secondary-fixed/40 text-on-secondary-container' },
  { name: '高低肩 / 翼状肩胛', en: 'Shoulder Imbalance', count: '8-10', color: 'bg-mint text-teal-800' },
  { name: '膝超伸 / X·O 型腿', en: 'Leg Alignment', count: '10-12', color: 'bg-lavender text-purple-800' },
]

const todayPlan = [
  { name: '下巴后缩', dur: '3 组 × 15 次', level: '基础', lc: 'bg-green-100 text-green-700' },
  { name: '弹力带划船', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-orange-100 text-orange-700' },
  { name: '墙角胸大肌拉伸', dur: '2 组 × 30 秒', level: '基础', lc: 'bg-green-100 text-green-700' },
  { name: '俯卧 Y-T-W', dur: '3 组 × 10 次', level: '挑战', lc: 'bg-red-100 text-red-700' },
]

export default function Training() {
  const nav = useNavigate()
  return (
    <div className="font-body text-on-background">
      <header className="px-container-padding-mobile pt-stack-md pb-2 sticky top-0 bg-surface z-40">
        <h1 className="font-headline text-[28px] text-on-surface">矫正训练</h1>
        <p className="font-body text-on-surface-variant text-sm">天鹅颈舒缓拉伸 · 15分钟 · 12个动作</p>
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 今日课表 */}
        <section className="space-y-stack-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-[20px] text-on-surface">今日课表</h2>
            <span className="font-label text-[12px] text-outline">70% 基础 · 20% 进阶 · 10% 挑战</span>
          </div>
          <div className="space-y-3">
            {todayPlan.map((m, i) => (
              <div key={m.name} className="bg-surface-container-lowest rounded-lg p-4 flex items-center gap-4
                shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">{i + 1}</div>
                <div className="flex-1">
                  <p className="font-label text-[15px] text-on-surface">{m.name}</p>
                  <p className="font-label text-[12px] text-outline">{m.dur}</p>
                </div>
                <span className={`font-label text-[11px] px-2 py-1 rounded-full ${m.lc}`}>{m.level}</span>
              </div>
            ))}
          </div>
          <button className="w-full h-14 bg-primary text-on-primary font-label text-lg rounded-lg active:scale-[0.98] transition
            flex items-center justify-center gap-2">
            <span className="material-symbols-outlined fill-icon">play_arrow</span>开始训练
          </button>
        </section>

        {/* 动作库分类 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[20px] text-on-surface">动作库 · 七大体态分类</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(c => (
              <div key={c.name} className={`rounded-lg p-4 h-28 flex flex-col justify-between active:scale-95 transition cursor-pointer ${c.color}`}>
                <div>
                  <p className="font-label text-[14px] font-bold leading-tight">{c.name}</p>
                  <p className="font-label text-[11px] opacity-70">{c.en}</p>
                </div>
                <p className="font-label text-[11px] opacity-80">{c.count} 个动作</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
