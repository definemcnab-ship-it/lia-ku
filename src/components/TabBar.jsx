import { NavLink, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'

const tabs = [
  { to: '/home',     icon: 'home',          label: '首页' },
  { to: '/training', icon: 'fitness_center', label: '训练' },
  { to: '/scan',     icon: 'camera',         label: 'AI 扫描', center: true },
  { to: '/progress', icon: 'analytics',      label: '数据' },
  { to: '/profile',  icon: 'person',         label: '我的' },
]

export default function TabBar() {
  const nav = useNavigate()

  return (
    <nav aria-label="主导航"
      className="flex-none flex justify-around items-end
        bg-surface/80 backdrop-blur-xl px-3 pb-6 pt-2
        border-t border-surface-variant/30
        shadow-[0px_-1px_0px_rgba(143,135,121,0.08),0px_-8px_32px_rgba(230,126,102,0.06)]
        z-40">
      {tabs.map(t =>
        t.center ? (
          <div key={t.to} className="relative -mt-8 flex flex-col items-center gap-1">
            <button
              onClick={() => nav(t.to)} aria-label={t.label}
              className="w-[56px] h-[56px] rounded-[18px] bg-gradient-to-br from-[#b8afa0] to-[#8f8779]
                flex items-center justify-center
                shadow-[0px_4px_20px_rgba(143,135,121,0.45),0px_1px_0px_rgba(255,255,255,0.15)_inset]
                active:scale-90 active:shadow-[0px_2px_10px_rgba(143,135,121,0.3)]
                transition-all duration-200
                border border-white/20">
              <Icon name={t.icon} size={24} className="text-white" />
            </button>
            <span className="font-label text-[10px] text-primary font-bold tracking-wide">{t.label}</span>
          </div>
        ) : (
          <NavLink
            key={t.to}
            to={t.to}
            className="flex flex-col items-center justify-end gap-1 px-2 active:scale-90 duration-150">
            {({ isActive }) => (
              <>
                <div className={`relative flex items-center justify-center w-12 h-[30px] rounded-xl
                  transition-all duration-300
                  ${isActive ? 'bg-primary/12' : 'bg-transparent'}`}>
                  {isActive && (
                    <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-4 h-[3px] rounded-full bg-primary" />
                  )}
                  <Icon name={t.icon} size={20}
                    className={`transition-all duration-200 ${isActive ? 'text-primary scale-110' : 'text-on-surface-variant/50'}`} />
                </div>
                <span className={`font-label text-[10px] tracking-wide transition-all duration-200
                  ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant/50'}`}>
                  {t.label}
                </span>
              </>
            )}
          </NavLink>
        )
      )}
    </nav>
  )
}
