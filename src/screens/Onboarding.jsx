import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { setState } from '../lib/store.js'

const scenes = ['居家', '办公室', '健身房']
const gears = ['瑜伽垫', '弹力带', '哑铃', '无器械']

export default function Onboarding() {
  const nav = useNavigate()
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState({ scene: new Set(), gear: new Set() })

  const toggle = (key, val) => {
    setPicked(p => {
      const s = new Set(p[key])
      s.has(val) ? s.delete(val) : s.add(val)
      return { ...p, [key]: s }
    })
  }

  const finish = (to) => {
    // 持久化引导期选择的场景/器械偏好
    setState({ prefs: { scene: [...picked.scene], gear: [...picked.gear] } })
    nav(to)
  }

  const next = () => (step < slides.length - 1 ? setStep(step + 1) : finish('/scan'))

  const slides = [
    <div key="s1" className="flex flex-col items-center text-center px-8">
      <div className="w-40 h-40 rounded-full bg-primary-fixed/60 flex items-center justify-center mb-8">
        <Icon name="self_improvement" size={72} className="text-primary" />
      </div>
      <h2 className="font-display text-[32px] font-bold text-primary mb-3">科学矫正，优雅体态</h2>
      <p className="font-body text-on-surface-variant leading-relaxed">专注女性体态的 AI 矫正方案，让改变肉眼可见。</p>
    </div>,
    <div key="s2" className="flex flex-col items-center text-center px-8">
      <div className="w-40 h-40 rounded-full bg-[#ece8e0]/80 flex items-center justify-center mb-8">
        <Icon name="auto_awesome" size={72} className="text-[#8f8779]" />
      </div>
      <h2 className="font-display text-[28px] font-bold text-on-surface mb-3">3 分钟看见专属计划</h2>
      <p className="font-body text-on-surface-variant leading-relaxed">AI 体态评估 → 专属矫正计划 → 肉眼可见的改变。</p>
    </div>,
    <div key="s3" className="px-8 w-full">
      <h2 className="font-headline text-[24px] text-ink mb-2">完善基础信息</h2>
      <p className="font-body text-on-surface-variant text-sm mb-6">用于体态分对照标准，可稍后在设置中补充。</p>
      <p className="font-label text-[14px] text-on-surface mb-2">训练场景（可多选）</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {scenes.map(s => (
          <button key={s} onClick={() => toggle('scene', s)}
            className={`px-4 py-2 rounded-full font-label text-[14px] border transition
              ${picked.scene.has(s) ? 'bg-primary text-white border-primary' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40'}`}>
            {s}
          </button>
        ))}
      </div>
      <p className="font-label text-[14px] text-on-surface mb-2">可用器械（可多选）</p>
      <div className="flex flex-wrap gap-2">
        {gears.map(g => (
          <button key={g} onClick={() => toggle('gear', g)}
            className={`px-4 py-2 rounded-full font-label text-[14px] border transition
              ${picked.gear.has(g) ? 'bg-primary text-white border-primary' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40'}`}>
            {g}
          </button>
        ))}
      </div>
    </div>,
    <div key="s4" className="flex flex-col items-center text-center px-8">
      <div className="w-40 h-40 rounded-2xl bg-primary-fixed/50 flex items-center justify-center mb-6">
        <Icon name="photo_camera" size={64} className="text-primary" />
      </div>
      <h2 className="font-headline text-[24px] text-ink mb-3">免费体态评估</h2>
      <p className="font-body text-on-surface-variant leading-relaxed mb-4">
        拍摄正面 / 侧面 / 背面 3 张照片，AI 即可生成你的「斯俪体态健康报告」。
      </p>
      <div className="flex items-center gap-2 bg-surface-container rounded-lg px-4 py-3 text-left">
        <Icon name="lock" size={20} className="text-primary" />
        <span className="font-label text-[12px] text-on-surface-variant">照片加密存储，仅用于体态分析，可随时删除。</span>
      </div>
    </div>,
  ]

  const isLast = step === slides.length - 1

  return (
    <div className="h-full flex flex-col font-body bg-surface">
      <header className="flex items-center justify-between px-6 pt-6">
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-primary' : 'w-1.5 bg-surface-container'}`} />
          ))}
        </div>
        <button onClick={() => nav('/home')} className="font-label text-[13px] text-outline">跳过</button>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center overflow-y-auto py-6">
        <div key={step} className="w-full flex flex-col items-center animate-slide-left">
          {slides[step]}
        </div>
      </main>

      <footer className="px-6 pb-10 space-y-3">
        <button onClick={next}
          className="w-full h-14 bg-primary text-on-primary font-label text-lg rounded-lg active:scale-[0.98] transition">
          {isLast ? '立即免费评估' : '继续'}
        </button>
        {isLast && (
          <button onClick={() => nav('/home')}
            className="w-full h-12 text-outline font-label active:scale-95 transition">稍后再说</button>
        )}
      </footer>
    </div>
  )
}
