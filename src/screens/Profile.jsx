import { useNavigate } from 'react-router-dom'

// 我的（方案文档 §6 经期周期、§11 推送、§12 账号与隐私）。
const groups = [
  {
    title: '训练偏好',
    items: [
      { icon: 'event', label: '经期周期适配', extra: '已开启 · 28天' },
      { icon: 'home', label: '训练场景', extra: '居家 / 办公室' },
      { icon: 'notifications', label: '推送通知', extra: '8:00–21:00' },
    ],
  },
  {
    title: '账号与隐私',
    items: [
      { icon: 'photo_library', label: '体态照片管理', extra: '可随时删除' },
      { icon: 'download', label: '导出我的数据', extra: '个保法合规' },
      { icon: 'shield', label: '隐私政策', extra: '' },
      { icon: 'no_accounts', label: '注销账号', extra: '7 天冷静期', danger: true },
    ],
  },
]

export default function Profile() {
  const nav = useNavigate()
  return (
    <div className="font-body text-on-background">
      <header className="px-container-padding-mobile pt-stack-lg pb-stack-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container">
            <img alt="头像" className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO3yRuRpo0wqoa9yzVrf7yRW863HZ8bMHb7N98KKSFLcwJrNga8TqTqYzeSiQjfKkneVaBN_58McJC53Lsy8GCu2DQj2sJ38lqAIXU2r_65NT4RU5ltny0Rer3eW7N04SnbA_ObP19m6v9wdmxK3yIYExZbKmICO22mYTLniXmhjsu10kZXcTzPraa0Hq7PbqTWuu71hpcOXqlWKlifJrTerBbWh__Mz9aAKQA28SB0z1Alzzf4p_-ZJkK-W5cugkMb9T0yCAgUl4" />
          </div>
          <div>
            <h1 className="font-headline text-[22px] text-on-surface">若曦</h1>
            <p className="font-label text-[13px] text-outline">斯俪体态分 85 · A 级</p>
          </div>
        </div>
      </header>

      <main className="px-container-padding-mobile pb-8 space-y-stack-lg">
        {groups.map(g => (
          <section key={g.title} className="space-y-2">
            <h2 className="font-label text-[13px] text-outline uppercase tracking-wider px-1">{g.title}</h2>
            <div className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0px_4px_20px_rgba(230,126,102,0.06)]">
              {g.items.map((it, i) => (
                <button key={it.label}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-surface-container transition
                    ${i > 0 ? 'border-t border-surface-variant' : ''}`}>
                  <span className={`material-symbols-outlined ${it.danger ? 'text-error' : 'text-primary'}`}>{it.icon}</span>
                  <span className={`flex-1 text-left font-label text-[15px] ${it.danger ? 'text-error' : 'text-on-surface'}`}>{it.label}</span>
                  {it.extra && <span className="font-label text-[12px] text-outline">{it.extra}</span>}
                  <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
                </button>
              ))}
            </div>
          </section>
        ))}

        <button onClick={() => nav('/login')}
          className="w-full h-12 bg-surface-container text-on-surface-variant font-label rounded-lg active:scale-[0.98] transition">
          退出登录
        </button>
      </main>
    </div>
  )
}
