import { NavLink, useNavigate } from 'react-router-dom'

const tabs = [
  { to: '/home', icon: 'home', label: '首页' },
  { to: '/training', icon: 'fitness_center', label: '训练' },
  { to: '/scan', icon: 'shutter_speed', label: 'AI 扫描', center: true },
  { to: '/progress', icon: 'analytics', label: '数据' },
  { to: '/profile', icon: 'person', label: '我的' },
]

export default function TabBar() {
  const nav = useNavigate()
  return (
    <nav className="flex-none flex justify-around items-center bg-surface px-4 pb-6 pt-3
      shadow-[0px_-4px_20px_rgba(230,126,102,0.08)] rounded-t-lg z-40">
      {tabs.map(t =>
        t.center ? (
          <div key={t.to} className="relative -mt-10 flex flex-col items-center">
            <button
              onClick={() => nav(t.to)}
              className="bg-gradient-to-tr from-[#e67e66] to-[#ffb4a3] text-white w-14 h-14 rounded-full
                flex items-center justify-center shadow-[0px_8px_24px_rgba(230,126,102,0.4)]
                active:scale-90 transition-transform duration-200 border-4 border-surface">
              <span className="material-symbols-outlined text-white text-[32px]">{t.icon}</span>
            </button>
            <span className="font-label text-[12px] mt-1 text-primary font-bold">{t.label}</span>
          </div>
        ) : (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center active:scale-90 duration-200 ` +
              (isActive ? 'text-primary font-bold' : 'text-outline hover:text-primary transition-colors')
            }>
            {({ isActive }) => (
              <>
                <span className={`material-symbols-outlined ${isActive ? 'fill-icon' : ''}`}>{t.icon}</span>
                <span className="font-label text-[12px]">{t.label}</span>
              </>
            )}
          </NavLink>
        )
      )}
    </nav>
  )
}
