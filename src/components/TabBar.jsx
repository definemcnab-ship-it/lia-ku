import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'

const tabs = [
  { to: '/home',     icon: 'home',         label: '首页' },
  { to: '/training', icon: 'fitness_center', label: '训练' },
  { to: '/scan',     icon: 'camera',        label: 'AI 扫描', center: true },
  { to: '/progress', icon: 'analytics',     label: '数据' },
  { to: '/profile',  icon: 'person',        label: '我的' },
]

export default function TabBar() {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="flex-none flex justify-around items-center bg-surface px-2 pb-6 pt-3
      shadow-[0px_-4px_20px_rgba(230,126,102,0.08)] rounded-t-lg z-40">
      {tabs.map(t =>
        t.center ? (
          <div key={t.to} className="relative -mt-10 flex flex-col items-center">
            <button
              onClick={() => nav(t.to)}
              className="bg-gradient-to-tr from-[#e67e66] to-[#ffb4a3] text-white w-14 h-14 rounded-full
                flex items-center justify-center shadow-[0px_8px_24px_rgba(230,126,102,0.4)]
                active:scale-90 transition-transform duration-200 border-4 border-surface">
              <Icon name={t.icon} size={26} className="text-white" />
            </button>
            <span className="font-label text-[11px] mt-1 text-primary font-bold">{t.label}</span>
          </div>
        ) : (
          <NavLink
            key={t.to}
            to={t.to}
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 active:scale-90 duration-150 rounded-xl">
            {({ isActive }) => (
              <>
                <div className={`relative flex items-center justify-center w-10 h-6 rounded-full transition-all duration-300
                  ${isActive ? 'bg-primary-fixed' : ''}`}>
                  <Icon name={t.icon} size={22}
                    className={`transition-colors duration-200 ${isActive ? 'text-primary' : 'text-outline'}`} />
                </div>
                <span className={`font-label text-[11px] transition-colors duration-200 ${isActive ? 'text-primary font-bold' : 'text-outline'}`}>
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
