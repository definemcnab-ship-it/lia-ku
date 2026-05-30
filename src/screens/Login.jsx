import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

export default function Login() {
  const nav = useNavigate()
  const [agreed, setAgreed] = useState(false)

  const go = (to) => {
    if (!agreed) { alert('请先阅读并勾选同意《用户协议》与《隐私政策》'); return }
    nav(to)
  }

  return (
    <div className="min-h-full flex flex-col font-body text-on-surface relative">
      {/* 氛围背景渐变 */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#fce8e4] via-[#efe7e4] to-[#e8ddd9]" />
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-container/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFF8E1]/40 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      {/* 顶部关闭 */}
      <header className="w-full flex justify-between items-center px-container-padding-mobile h-20">
        <button onClick={() => nav('/home')}
          className="hover:opacity-80 active:scale-95 transition flex items-center justify-center">
          <Icon name="close" size={28} className="text-on-surface" />
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center px-container-padding-mobile pt-stack-lg pb-10 max-w-md mx-auto w-full">
        {/* 品牌区 */}
        <div className="flex flex-col items-center text-center mt-8 mb-16 relative w-full">
          <div className="mb-6 relative group">
            <div className="absolute inset-0 bg-primary-container/30 blur-xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700" />
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
          <button onClick={() => go('/onboarding')}
            className="w-full h-14 bg-primary text-on-primary font-label text-lg rounded-lg
              shadow-xl shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all
              flex items-center justify-center gap-3">
            <Icon name="smartphone" size={22} className="text-white" />
            手机号一键登录
          </button>

          <button onClick={() => go('/onboarding')}
            className="w-full h-14 bg-surface-container-lowest border border-outline-variant/30
              text-on-surface-variant font-label text-lg rounded-lg hover:bg-surface-container
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
              className="mt-0.5 w-5 h-5 rounded border-outline-variant text-primary
                focus:ring-primary transition-all cursor-pointer" />
            <label htmlFor="privacy" className="font-label text-[12px] text-on-surface-variant leading-relaxed cursor-pointer select-none">
              登录即代表您同意 <span className="text-primary">《用户协议》</span> 与 <span className="text-primary">《隐私政策》</span>
            </label>
          </div>
        </footer>
      </main>
    </div>
  )
}
