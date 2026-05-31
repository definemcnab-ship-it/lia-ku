import { NavLink, useNavigate } from 'react-router-dom'
import { HomeIcon, TrainingIcon, AnalyticsIcon, ProfileIcon, ScanPlusIcon } from './NavIcons.jsx'

const tabs = [
  { to: '/home',     Ic: HomeIcon,      label: '首页' },
  { to: '/training', Ic: TrainingIcon,  label: '训练' },
  { to: '/scan',     Ic: ScanPlusIcon,  label: 'AI 扫描', center: true },
  { to: '/progress', Ic: AnalyticsIcon, label: '数据' },
  { to: '/profile',  Ic: ProfileIcon,   label: '我的' },
]

export default function TabBar() {
  const nav = useNavigate()

  return (
    <nav aria-label="主导航"
      className="flex-none flex justify-around items-center
        bg-white/96 backdrop-blur-xl px-2 pb-5 pt-2
        shadow-[0px_-1px_0px_rgba(0,0,0,0.05),0px_-6px_24px_rgba(0,0,0,0.04)]
        z-40">
      {tabs.map(({ to, Ic, label, center }) =>
        center ? (
          <div key={to} className="relative -mt-5 flex flex-col items-center gap-1">
            <button
              onClick={() => nav(to)} aria-label={label}
              className="w-[52px] h-[52px] rounded-full bg-primary
                flex items-center justify-center
                shadow-[0px_4px_18px_rgba(143,135,121,0.55)]
                active:scale-90 transition-all duration-200">
              <Ic size={26} className="text-white" />
            </button>
            <span className="font-label text-[10px] text-primary font-bold tracking-wide">{label}</span>
          </div>
        ) : (
          <NavLink
            key={to}
            to={to}
            className="flex flex-col items-center gap-[3px] px-3 py-1 active:scale-90 transition-transform duration-150">
            {({ isActive }) => (
              <>
                <div className={isActive ? 'animate-tab-pop' : ''}>
                  <Ic size={24} className={isActive ? 'text-primary' : 'text-[#bbb4ac]'} />
                </div>
                <span className={`font-label text-[10px] tracking-wide transition-colors duration-200
                  ${isActive ? 'text-primary font-bold' : 'text-[#bbb4ac]'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        )
      )}
    </nav>
  )
}
