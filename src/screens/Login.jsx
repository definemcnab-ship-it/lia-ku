import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 1:1 还原设计稿 _1（启动 / 登录页）。
// 修复：原稿 <head> 内 Material Symbols <link> 重复声明（已在 index.html 去重）；
//       原稿所有 {{DATA:SCREEN:SCREEN_XX}} 占位符导致跳转失效，已替换为真实路由。
export default function Login() {
  const nav = useNavigate()
  const [agreed, setAgreed] = useState(false)

  const go = (to) => {
    if (!agreed) { alert('请先阅读并勾选同意《用户协议》与《隐私政策》'); return }
    nav(to)
  }

  return (
    <div className="min-h-full flex flex-col font-body text-on-surface relative">
      {/* 氛围背景图 */}
      <div className="fixed inset-0 -z-20">
        <img
          alt="优雅女性在明亮简约的家庭工作室练习体态矫正"
          className="w-full h-full object-cover blur-[4px]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPHsqpCR_Mae4bBlHhEcu4SOrVPnrpIsn8Nr4QeUwU2CaFqGx5DFNxkYrKc7c9zhuLXvIb7ZzhyrppUS3RSHfZMkhnLBAYFKnPUB5WuJhpdGJmT0EbAAzdCW2MK6MSTAY9xAAaVEvWQmW1o9Tqx_3zs1AdCYKejVuX5k4WjOKoI5bJOAW2glCx0Um107KxVUdIrtq0sBSjEASDFhe9QlwmiX__nhc699p5xIAb-6eR6jpfjQrVBNyaOY4mS6eTZMfnIUYm-xnxsMs" />
        <div className="absolute inset-0 bg-surface/40" />
      </div>

      {/* 顶部关闭 */}
      <header className="w-full flex justify-between items-center px-container-padding-mobile h-20">
        <button onClick={() => nav('/home')}
          className="hover:opacity-80 active:scale-95 transition flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface text-[28px] font-bold">close</span>
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center px-container-padding-mobile pt-stack-lg pb-10 max-w-md mx-auto w-full">
        {/* 品牌区 */}
        <div className="flex flex-col items-center text-center mt-8 mb-16 relative w-full">
          <div className="absolute -z-10 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl top-0" />
          <div className="mb-6 relative group">
            <div className="absolute inset-0 bg-primary-container/20 blur-xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700" />
            <div className="relative w-24 h-24 flex items-center justify-center bg-surface-container-lowest rounded-xl shadow-lg">
              <svg className="text-primary-container" fill="none" height="64" viewBox="0 0 64 64" width="64">
                <path d="M48 16C48 16 44 12 36 12C28 12 24 20 24 24C24 28 28 32 36 36C44 40 48 44 48 52C48 60 40 64 32 64C24 64 16 60 16 52" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
                <path d="M16 48C16 48 20 52 28 52C36 52 40 44 40 40C40 36 36 32 28 28C20 24 16 20 16 12C16 4 24 0 32 0C40 0 48 4 48 12" opacity="0.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
              </svg>
            </div>
          </div>
          <h1 className="font-display text-[36px] leading-[44px] font-bold tracking-tight text-primary mb-2">斯俪 Slique</h1>
          <p className="font-body text-[18px] text-on-surface-variant tracking-widest opacity-80">科学训练，优雅体态</p>
        </div>

        {/* 登录操作区 */}
        <div className="w-full space-y-gutter flex flex-col items-center">
          <button onClick={() => go('/home')}
            className="w-full h-14 bg-primary-container text-on-primary font-label text-lg rounded-lg
              shadow-xl shadow-primary-container/20 hover:opacity-90 active:scale-[0.98] transition-all
              flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">smartphone</span>手机号一键登录
          </button>

          <button onClick={() => go('/home')}
            className="w-full h-14 bg-surface-container-lowest border border-outline-variant/30
              text-on-surface-variant font-label text-lg rounded-lg hover:bg-surface-container-low
              active:scale-[0.98] transition-all flex items-center justify-center gap-3">
            <svg className="text-[#07C160]" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
              <path d="M8.5 13.5C9.33 13.5 10 12.83 10 12C10 11.17 9.33 10.5 8.5 10.5C7.67 10.5 7 11.17 7 12C7 12.83 7.67 13.5 8.5 13.5Z" />
              <path d="M15.5 13.5C16.33 13.5 17 12.83 17 12C17 11.17 16.33 10.5 15.5 10.5C14.67 10.5 14 11.17 14 12C14 12.83 14.67 13.5 15.5 13.5Z" />
              <path d="M12 4C7.03 4 3 7.58 3 12C3 14.39 4.14 16.52 5.92 18L5.5 21L8.5 19.5C9.59 19.82 10.77 20 12 20C16.97 20 21 16.42 21 12C21 7.58 16.97 4 12 4ZM12 18.5C11.03 18.5 10.1 18.36 9.24 18.1L7.24 19.1L7.52 17.1C5.64 15.89 4.5 14.07 4.5 12C4.5 8.41 7.86 5.5 12 5.5C16.14 5.5 19.5 8.41 19.5 12C19.5 15.59 16.14 18.5 12 18.5Z" />
            </svg>
            微信登录
          </button>

          <button onClick={() => nav('/home')}
            className="mt-4 px-6 py-2 text-outline font-label hover:text-primary transition-colors active:scale-95">
            暂不登录，先试用
          </button>
        </div>

        <div className="flex-grow min-h-[40px]" />

        {/* 隐私协议 */}
        <footer className="w-full pb-container-padding-mobile">
          <div className="flex items-start gap-3 px-2">
            <input id="privacy" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded-full border-outline-variant text-primary-container
                focus:ring-primary-container transition-all cursor-pointer" />
            <label htmlFor="privacy" className="font-label text-[12px] text-on-surface-variant leading-relaxed cursor-pointer select-none">
              登录即代表您同意 <span className="text-primary">《用户协议》</span> 与 <span className="text-primary">《隐私政策》</span>
            </label>
          </div>
        </footer>
      </main>
    </div>
  )
}
