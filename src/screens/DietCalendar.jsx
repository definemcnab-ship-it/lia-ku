import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useStore, setState, todayStr } from '../lib/store.js'

const MEALS = ['早餐', '午餐', '晚餐']
const WEEK = ['日', '一', '二', '三', '四', '五', '六']

// 饮食日历：月视图回顾每日三餐打卡，点选日期可补记/查看。
export default function DietCalendar() {
  const nav = useNavigate()
  const { meals } = useStore()
  const [cursor, setCursor] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() } })
  const [picked, setPicked] = useState(todayStr())

  const first = new Date(cursor.y, cursor.m, 1)
  const startWeekday = first.getDay()
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate()
  const today = todayStr()

  const cells = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const dateStr = (d) => `${cursor.y}-${String(cursor.m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  const countFor = (ds) => MEALS.filter(m => meals[ds] && meals[ds][m]).length

  const shift = (delta) => setCursor(c => {
    const nm = c.m + delta
    return { y: c.y + Math.floor(nm / 12), m: ((nm % 12) + 12) % 12 }
  })

  const pickedMeals = meals[picked] || {}
  const toggleMeal = (m) => setState(s => {
    const day = { ...(s.meals[picked] || {}) }
    day[m] ? delete day[m] : (day[m] = true)
    return { meals: { ...s.meals, [picked]: day } }
  })

  // 本月统计
  const monthPrefix = `${cursor.y}-${String(cursor.m + 1).padStart(2, '0')}-`
  const loggedDays = Object.keys(meals).filter(k => k.startsWith(monthPrefix) && MEALS.some(m => meals[k][m])).length

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/diet')} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-on-surface">饮食日历</span>
        <span className="w-6" />
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 月切换 + 统计 */}
        <section className="bg-surface-container-lowest rounded-lg p-4 shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => shift(-1)} aria-label="上个月" className="active:scale-90 transition p-1">
              <Icon name="chevron_left" size={22} className="text-on-surface-variant" />
            </button>
            <span className="font-headline text-[17px] text-on-surface">{cursor.y} 年 {cursor.m + 1} 月</span>
            <button onClick={() => shift(1)} aria-label="下个月" className="active:scale-90 transition p-1">
              <Icon name="chevron_right" size={22} className="text-on-surface-variant" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEK.map(w => (
              <div key={w} className="text-center font-label text-[11px] text-outline py-1">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={`e${i}`} />
              const ds = dateStr(d)
              const cnt = countFor(ds)
              const isToday = ds === today
              const isPicked = ds === picked
              return (
                <button key={ds} onClick={() => setPicked(ds)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-0.5 active:scale-95 transition
                    ${isPicked ? 'bg-primary-fixed ring-2 ring-primary' : 'bg-transparent'}`}>
                  <span className={`font-label text-[13px] ${isToday ? 'text-primary font-bold' : 'text-on-surface'}`}>{d}</span>
                  <span className="flex gap-0.5 h-1.5">
                    {MEALS.map(m => (
                      <span key={m}
                        className={`w-1.5 h-1.5 rounded-full ${meals[ds] && meals[ds][m] ? 'bg-primary' : 'bg-outline-variant/40'}`} />
                    ))}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <p className="font-label text-[12px] text-outline text-center -mt-2">
          本月已记录 <span className="text-primary font-bold">{loggedDays}</span> 天 · 每日 3 个圆点对应三餐
        </p>

        {/* 选中日期的三餐 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[18px] text-on-surface">
            {picked === today ? '今日' : picked.slice(5)} 三餐记录
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {MEALS.map(m => {
              const done = !!pickedMeals[m]
              return (
                <button key={m} onClick={() => toggleMeal(m)}
                  className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center gap-1 active:scale-95 transition
                    ${done
                      ? 'border-solid border-primary-container bg-primary-fixed/40'
                      : 'border-dashed border-outline-variant/50 bg-surface-container-lowest'}`}>
                  <Icon name={done ? 'check_circle' : 'add_a_photo'} size={26}
                    className={done ? 'text-primary' : 'text-outline'} />
                  <span className={`font-label text-[12px] ${done ? 'text-primary font-bold' : 'text-outline'}`}>{m}</span>
                </button>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
