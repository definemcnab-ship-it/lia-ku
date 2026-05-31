import { useNavigate, useParams, Navigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { LEGAL } from '../lib/content.js'

// 法律协议页（用户协议 / 隐私政策 / 数据采集协议），通过 :doc 复用。
export default function Legal() {
  const nav = useNavigate()
  const { doc } = useParams()
  const data = LEGAL[doc]

  if (!data) return <Navigate to="/profile" replace />

  return (
    <div className="font-body text-on-background">
      <header className="flex items-center justify-between px-container-padding-mobile py-stack-md sticky top-0 bg-surface z-40">
        <button onClick={() => nav(-1)} aria-label="返回" className="active:scale-90 transition">
          <Icon name="arrow_back" size={24} className="text-on-surface" />
        </button>
        <span className="font-headline text-[18px] text-ink">{data.title}</span>
        <span className="w-6" />
      </header>

      <main className="px-container-padding-mobile pb-12 space-y-stack-md">
        <p className="font-label text-[12px] text-outline">更新日期：{data.updated}</p>
        <p className="font-body text-[14px] text-on-surface-variant leading-relaxed">{data.intro}</p>

        <div className="space-y-stack-md pt-2">
          {data.sections.map(s => (
            <section key={s.h} className="space-y-1.5">
              <h2 className="font-headline text-[16px] text-ink">{s.h}</h2>
              <p className="font-body text-[14px] text-on-surface-variant leading-relaxed">{s.p}</p>
            </section>
          ))}
        </div>

        <p className="font-label text-[12px] text-outline text-center pt-4 leading-relaxed">
          本协议为高保真原型示意文本，不构成正式法律文件。
        </p>
      </main>
    </div>
  )
}
