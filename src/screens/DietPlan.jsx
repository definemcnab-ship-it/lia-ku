import { useNavigate, useParams, Navigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { findDietPlan } from '../lib/content.js'

// 饮食建议三级页：体态问题 → 营养方案详情。
const mealIcons = { 早餐: 'wb_sunny', 午餐: 'restaurant', 晚餐: 'bedtime', 加餐: 'favorite' }

export default function DietPlan() {
  const nav = useNavigate()
  const { id } = useParams()
  const plan = findDietPlan(id)

  if (!plan) return <Navigate to="/diet" replace />

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav('/diet')} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-on-surface truncate px-3">{plan.issue}</span>
        <span className="w-6" />
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        <section className="bg-gradient-to-br from-[#f3ecdd] to-[#e7dcc2] rounded-lg p-5 shadow-lg">
          <p className="font-label text-[12px] text-[#8f8779] uppercase tracking-wider">营养重点</p>
          <h2 className="font-headline text-[22px] text-[#6e675b] mt-1 mb-2">{plan.focus}</h2>
          <p className="font-body text-[13px] text-[#6e675b]/80 leading-relaxed">{plan.why}</p>
        </section>

        <section className="space-y-stack-md">
          <h2 className="font-headline text-[18px] text-on-surface">推荐食材</h2>
          <div className="flex flex-wrap gap-2">
            {plan.foods.map(f => (
              <span key={f} className="font-label text-[13px] bg-primary-fixed text-on-surface-variant px-3 py-1.5 rounded-full">{f}</span>
            ))}
          </div>
        </section>

        {plan.avoid.length > 0 && (
          <section className="space-y-stack-md">
            <h2 className="font-headline text-[18px] text-on-surface">建议避免</h2>
            <div className="flex flex-wrap gap-2">
              {plan.avoid.map(f => (
                <span key={f} className="font-label text-[13px] bg-error/10 text-error px-3 py-1.5 rounded-full">{f}</span>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-stack-md">
          <h2 className="font-headline text-[18px] text-on-surface">参考一日餐单</h2>
          <div className="space-y-3">
            {Object.entries(plan.day).map(([meal, food]) => (
              <div key={meal} className="bg-surface-container-lowest rounded-lg p-4 flex items-center gap-4
                shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                  <Icon name={mealIcons[meal] || 'restaurant'} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-label text-[14px] text-on-surface">{meal}</p>
                  <p className="font-body text-[13px] text-on-surface-variant">{food}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="font-label text-[12px] text-outline text-center leading-relaxed px-4">
          餐单为通用参考，不计算卡路里、不替代营养师建议。如有特殊健康状况请遵医嘱。
        </p>
      </main>
    </div>
  )
}
