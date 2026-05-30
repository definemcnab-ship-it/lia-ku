import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

const steps = ['正面', '右侧面', '背面']

export default function AIScan() {
  const nav = useNavigate()
  const [shot, setShot] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)

  const capture = () => {
    if (shot + 1 >= steps.length) {
      setAnalyzing(true)
      let p = 0
      const interval = setInterval(() => {
        p += 2
        setProgress(p)
        if (p >= 100) {
          clearInterval(interval)
          nav('/report')
        }
      }, 600)
    } else {
      setShot(shot + 1)
    }
  }

  if (analyzing) {
    return (
      <div className="relative h-full w-full bg-[#1b1c1c] text-white overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b1c1c] via-[#2a1f1e] to-[#1b1c1c]" />
        <div className="relative z-10 flex flex-col items-center gap-8 px-10 text-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90 animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#ffffff15" strokeWidth="6" />
              <circle cx="64" cy="64" r="56" fill="none" stroke="url(#scanGrad)" strokeWidth="6"
                strokeLinecap="round" strokeDasharray="351.86" strokeDashoffset={351.86 * (1 - progress / 100)} />
              <defs>
                <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e67e66" />
                  <stop offset="100%" stopColor="#ffb4a3" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="accessibility_new" size={40} className="text-primary-container" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[24px]">AI 正在分析您的体态</h2>
            <p className="font-body text-[14px] text-white/70">检测关键骨骼点 · 计算偏移量 · 生成报告…</p>
          </div>

          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-[#e67e66] to-[#ffb4a3] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }} />
          </div>
          <p className="font-label text-[14px] text-primary-container">{progress}%</p>

          <div className="flex flex-col gap-2 text-left w-full">
            {['✓ 检测到 17 个骨骼关键点', '✓ 正面姿态分析完成', progress > 40 ? '✓ 侧面曲线分析完成' : '⋯ 分析侧面曲线…', progress > 70 ? '✓ 背部对称性评估完成' : '⋯ 评估背部对称性…'].map((item, i) => (
              <p key={i} className={`font-label text-[13px] ${item.startsWith('✓') ? 'text-white/90' : 'text-white/40'}`}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full bg-[#1b1c1c] text-white overflow-hidden">
      {/* 模拟相机画面背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] to-[#1b1c1c]" />

      {/* 顶部状态条 */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-6">
        <button onClick={() => nav('/home')}
          className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
          <Icon name="close" size={20} className="text-white" />
        </button>
        <div className="flex items-center gap-2 bg-primary/90 px-3 py-1.5 rounded-full">
          <Icon name="graphic_eq" size={16} className="text-white" />
          <span className="font-label text-[12px]">正在播放语音</span>
        </div>
        <button className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
          <Icon name="help" size={20} className="text-white" />
        </button>
      </div>

      {/* 指引文案 */}
      <div className="relative z-10 text-center mt-6 px-8">
        <h2 className="font-headline text-[22px]">请将身体对准虚线框</h2>
        <p className="font-label text-[13px] opacity-80 mt-1">
          保持自然站姿 · 拍摄第 {shot + 1}/3 张（{steps[shot]}）
        </p>
      </div>

      {/* 人形虚线对位框 */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <svg width="180" height="420" viewBox="0 0 180 420">
          <ellipse cx="90" cy="55" rx="34" ry="42" fill="none" stroke="#ffffffcc" strokeWidth="2" strokeDasharray="6 8" />
          <path d="M90 97 L90 250 M90 130 L40 200 M90 130 L140 200 M90 250 L55 400 M90 250 L125 400"
            fill="none" stroke="#ffffffcc" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round" />
          <circle cx="90" cy="250" r="5" fill="#e67e66" />
        </svg>
      </div>

      {/* 底部进度点 */}
      <div className="absolute bottom-32 left-0 right-0 z-10 flex justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className={`w-2.5 h-2.5 rounded-full ${i < shot ? 'bg-primary' : i === shot ? 'bg-primary-container' : 'bg-white/40'}`} />
        ))}
      </div>

      {/* 底部控制栏 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-10 pb-10 flex items-center justify-between">
        <button className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center">
          <Icon name="flash_on" size={22} className="text-white" />
        </button>
        <button onClick={capture}
          className="w-20 h-20 rounded-full border-4 border-white/80 flex items-center justify-center active:scale-90 transition">
          <span className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#e67e66] to-[#ffb4a3] flex items-center justify-center">
            <Icon name="camera" size={28} className="text-white" />
          </span>
        </button>
        <button className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center">
          <Icon name="photo_library" size={22} className="text-white" />
        </button>
      </div>
    </div>
  )
}
