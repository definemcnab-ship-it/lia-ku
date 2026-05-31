import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useStore, setState, todayStr } from '../lib/store.js'
import { DIET_PLANS } from '../lib/content.js'

const meals = ['早餐', '午餐', '晚餐']

export default function Diet() {
  const nav = useNavigate()
  const { meals: mealRecord } = useStore()
  const today = todayStr()
  const todayMeals = mealRecord[today] || {}

  const toggleMeal = (m) => {
    setState(s => {
      const day = { ...(s.meals[today] || {}) }
      day[m] ? delete day[m] : (day[m] = true)
      return { meals: { ...s.meals, [today]: day } }
    })
  }

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/home')} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-on-surface">饮食建议</span>
        <span className="w-6" />
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {/* 今日建议卡片 */}
        <section className="bg-gradient-to-br from-[#f3ecdd] to-[#e7dcc2] rounded-lg p-5 shadow-lg">
          <p className="font-label text-[12px] text-[#8f8779] uppercase tracking-wider">今日饮食建议</p>
          <h2 className="font-headline text-[20px] text-[#6e675b] mt-1 mb-2">针对圆肩 · 加强骨骼排列</h2>
          <p className="font-body text-sm text-[#6e675b]/80">
            今天多补充钙与维生素 D：早餐一份牛奶 + 蛋黄，晚餐安排一次深海鱼。
          </p>
        </section>

        {/* 体态问题 → 营养映射 */}
        <section className="space-y-stack-md">
          <h2 className="font-headline text-[18px] text-on-surface">体态 × 营养对照</h2>
          <div className="space-y-3">
            {DIET_PLANS.map(m => (
              <button key={m.id} onClick={() => nav(`/diet/plan/${m.id}`)}
                className="w-full text-left bg-surface-container-lowest rounded-lg p-4 active:scale-[0.98] transition
                  shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label text-[15px] text-on-surface">{m.issue}</span>
                  <span className="font-label text-[11px] text-primary bg-primary-fixed px-2 py-0.5 rounded-full">{m.focus}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-body text-[13px] text-on-surface-variant truncate">
                    <span className="text-on-surface">推荐：</span>{m.foods.slice(0, 3).join('、')}
                  </p>
                  <Icon name="chevron_right" size={18} className="text-outline shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 简单三餐记录 */}
        <section className="space-y-stack-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-[18px] text-on-surface">今日三餐记录</h2>
            <span className="font-label text-[12px] text-outline">拍照 + 一句话 · 不算卡路里</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {meals.map(m => {
              const done = !!todayMeals[m]
              return (
                <button key={m} onClick={() => toggleMeal(m)}
                  className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center gap-1 active:scale-95 transition
                    ${done
                      ? 'border-solid border-primary-container bg-primary-fixed/40'
                      : 'border-dashed border-outline-variant/50 bg-surface-container-lowest'}`}>
                  <Icon name={done ? 'check_circle' : 'add_a_photo'} size={28}
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
