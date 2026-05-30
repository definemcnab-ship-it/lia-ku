import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 还原设计稿 ai_1（AI 体态扫描 / AR 取景对位）。沉浸式深色全屏，隐藏底部导航。
// 方案文档：上传正面/右侧面/背面 3 张照片 → AI 关键点检测 → 生成体态报告。
const steps = ['正面', '右侧面', '背面']

export default function AIScan() {
  const nav = useNavigate()
  const [shot, setShot] = useState(0) // 已拍张数

  const capture = () => {
    if (shot + 1 >= steps.length) {
      // 模拟 30 秒 AI 分析后跳转报告
      nav('/report')
    } else {
      setShot(shot + 1)
    }
  }

  return (
    <div className="relative h-full w-full bg-[#1b1c1c] text-white overflow-hidden">
      {/* 取景背景（模拟相机画面） */}
      <img alt="取景画面" className="absolute inset-0 w-full h-full object-cover opacity-70"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHyI6whnTs_z1rs6V8iZd8gUmfEqQxIkKNwBvmvPRywg-Kt2-FAxQn7MH_y--q4UF7wcBxy7aXozKTMXsakKByqpsaTn88vostK0QLRg9LAAKe4xh5htOmBneMWTv4nIrtMNJSo_9Jx_vwHbh92PtHH_fgkCjiCv8tiwCSh2ysPE-_aEgs1KyOeiOaEke9tPIz8Z1nJ5dft6YFf_B3uNSLXt9c0TyBfYOM_W8d-SzumUZ2Ua5-R0VNaznf_8_mSuQsZyF-NCSzj1I" />
      <div className="absolute inset-0 bg-black/30" />

      {/* 顶部状态条 */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-6">
        <button onClick={() => nav('/home')}
          className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
          <span className="material-symbols-outlined text-white">close</span>
        </button>
        <div className="flex items-center gap-2 bg-primary/90 px-3 py-1.5 rounded-full">
          <span className="material-symbols-outlined fill-icon text-[16px]">graphic_eq</span>
          <span className="font-label text-[12px]">正在播放语音</span>
        </div>
        <button className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
          <span className="material-symbols-outlined text-white">help</span>
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
          <div key={s} className={`w-2.5 h-2.5 rounded-full ${i <= shot ? 'bg-primary-container' : 'bg-white/40'}`} />
        ))}
      </div>

      {/* 底部控制栏 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-10 pb-10 flex items-center justify-between">
        <button className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center">
          <span className="material-symbols-outlined text-white">flash_on</span>
        </button>
        <button onClick={capture}
          className="w-20 h-20 rounded-full border-4 border-white/80 flex items-center justify-center active:scale-90 transition">
          <span className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#e67e66] to-[#ffb4a3] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[30px]">shutter_speed</span>
          </span>
        </button>
        <button className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center">
          <span className="material-symbols-outlined text-white">photo_library</span>
        </button>
      </div>
    </div>
  )
}
