import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { LIBRARY } from '../lib/content.js'

// 训练 / 动作库（方案文档 §2.1 训练核心、§4 体态问题分类）。

const todayPlan = [
  { name: '天鹅颈塑形', dur: '3 组 × 15 次', level: '基础', lc: 'bg-surface-container text-outline' },
  { name: '展翼开肩·背部唤醒', dur: '3 组 × 12 次', level: '进阶', lc: 'bg-primary-fixed text-on-surface-variant' },
  { name: '胸廓绽放·芭蕾开胸', dur: '2 组 × 30 秒', level: '基础', lc: 'bg-surface-container text-outline' },
  { name: '背部雕塑·振翅式', dur: '3 组 × 10 次', level: '挑战', lc: 'bg-primary text-on-primary' },
]

export default function Training() {
  const nav = useNavigate()
  return (
    <div className="font-body text-on-background">
      <header className="px-container-padding-mobile pt-stack-md pb-2 sticky top-0 bg-surface z-40">
        <h1 className="font-headline text-[28px] text-ink font-light">矫正训练</h1>
        <p className="font-body text-on-surface-variant text-sm">天鹅颈塑形课 · 8周挺拔如模特 · 15分钟</p>
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 今日课表 */}
        <section className="space-y-stack-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-[20px] text-ink font-light">今日课表</h2>
            <span className="font-label text-[12px] text-outline">70% 基础 · 20% 进阶 · 10% 挑战</span>
          </div>
          <div className="space-y-3">
            {todayPlan.map((m, i) => (
              <div key={m.name} className="bg-surface-container-lowest rounded-lg p-4 flex items-center gap-4
                shadow-soft">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">{i + 1}</div>
                <div className="flex-1">
                  <p className="font-label text-[15px] text-on-surface">{m.name}</p>
                  <p className="font-label text-[12px] text-outline">{m.dur}</p>
                </div>
                <span className={`font-label text-[11px] px-2 py-1 rounded-full ${m.lc}`}>{m.level}</span>
              </div>
            ))}
          </div>
          <button onClick={() => nav('/player')}
            className="w-full h-14 bg-primary text-on-primary font-label text-lg rounded-lg active:scale-[0.98] transition
            flex items-center justify-center gap-2">
            <Icon name="play_arrow" size={20} className="text-white" />开始训练
          </button>
        </section>

        {/* 动作库分类 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[20px] text-ink font-light">动作库 · 七大体态分类</h2>
          <div className="grid grid-cols-2 gap-3">
            {LIBRARY.map(c => (
              <button key={c.id} onClick={() => nav(`/library/${c.id}`)}
                className={`rounded-lg p-4 h-28 flex flex-col justify-between text-left active:scale-95 transition ${c.color}`}>
                <div>
                  <p className="font-label text-[14px] font-bold leading-tight">{c.name}</p>
                  <p className="font-label text-[11px] opacity-70">{c.en}</p>
                </div>
                <p className="font-label text-[11px] opacity-80">{c.exercises.length} 个动作</p>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
