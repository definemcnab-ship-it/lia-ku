import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useStore, setState } from '../lib/store.js'

// 训练场景设置（多选，持久化到 prefs.scene / prefs.gear）。
const SCENES = [
  { id: '居家', icon: 'home', desc: '客厅 / 卧室，徒手为主' },
  { id: '办公室', icon: 'work', desc: '工位碎片时间，轻量动作' },
  { id: '户外', icon: 'park', desc: '公园 / 散步，舒展拉伸' },
  { id: '差旅', icon: 'luggage', desc: '酒店房间，无需器械' },
]
const GEARS = [
  { id: '徒手', icon: 'accessibility_new' },
  { id: '弹力带', icon: 'repeat' },
  { id: '瑜伽垫', icon: 'spa' },
  { id: '泡沫轴', icon: 'fitness_center' },
]

export default function Scene() {
  const nav = useNavigate()
  const { prefs } = useStore()

  const toggle = (key, id) => {
    setState(s => {
      const list = s.prefs[key] || []
      const next = list.includes(id) ? list.filter(x => x !== id) : [...list, id]
      return { prefs: { ...s.prefs, [key]: next } }
    })
  }

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/profile')} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-ink">训练场景</span>
        <span className="w-6" />
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        <p className="font-body text-[14px] text-on-surface-variant leading-relaxed">
          告诉我们你常在哪训练、有哪些器械，斯俪会据此调整动作选择与计划安排。可多选。
        </p>

        <section className="space-y-stack-md">
          <h2 className="font-label text-[13px] text-outline uppercase tracking-wider">常用场景</h2>
          <div className="grid grid-cols-2 gap-3">
            {SCENES.map(s => {
              const on = (prefs.scene || []).includes(s.id)
              return (
                <button key={s.id} onClick={() => toggle('scene', s.id)} aria-pressed={on}
                  className={`rounded-lg p-4 text-left border-2 active:scale-95 transition
                    ${on ? 'border-primary bg-primary-fixed/40' : 'border-outline-variant/30 bg-surface-container-lowest'}`}>
                  <Icon name={s.icon} size={26} className={on ? 'text-primary' : 'text-outline'} />
                  <p className={`font-label text-[15px] mt-2 ${on ? 'text-primary font-bold' : 'text-on-surface'}`}>{s.id}</p>
                  <p className="font-label text-[11px] text-outline mt-0.5">{s.desc}</p>
                </button>
              )
            })}
          </div>
        </section>

        <section className="space-y-stack-md">
          <h2 className="font-label text-[13px] text-outline uppercase tracking-wider">可用器械</h2>
          <div className="grid grid-cols-4 gap-3">
            {GEARS.map(g => {
              const on = (prefs.gear || []).includes(g.id)
              return (
                <button key={g.id} onClick={() => toggle('gear', g.id)} aria-pressed={on}
                  className={`rounded-lg py-3 flex flex-col items-center gap-1.5 border-2 active:scale-95 transition
                    ${on ? 'border-primary bg-primary-fixed/40' : 'border-outline-variant/30 bg-surface-container-lowest'}`}>
                  <Icon name={g.icon} size={22} className={on ? 'text-primary' : 'text-outline'} />
                  <span className={`font-label text-[11px] ${on ? 'text-primary font-bold' : 'text-outline'}`}>{g.id}</span>
                </button>
              )
            })}
          </div>
        </section>

        <p className="font-label text-[12px] text-outline text-center">选择已自动保存</p>
      </main>
    </div>
  )
}
