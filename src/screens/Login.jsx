import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { LEGAL } from '../lib/content.js'

export default function Login() {
  const nav = useNavigate()
  const [agreed, setAgreed] = useState(false)
  const [sheet, setSheet] = useState(false)      // 手机号登录抽屉
  const [doc, setDoc] = useState(null)           // 当前查看的协议 key
  const [shake, setShake] = useState(false)      // 未勾选协议时的提示抖动

  // 手机号 / 验证码
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const timer = useRef(null)

  useEffect(() => () => clearInterval(timer.current), [])

  const requireAgree = () => {
    if (agreed) return true
    setShake(true)
    setTimeout(() => setShake(false), 600)
    return false
  }

  const openPhone = () => { if (requireAgree()) setSheet(true) }

  const wechatLogin = () => { if (requireAgree()) nav('/onboarding') }

  const sendCode = () => {
    if (!/^1\d{10}$/.test(phone)) return
    setCountdown(60)
    timer.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer.current); return 0 }
        return c - 1
      })
    }, 1000)
  }

  const phoneValid = /^1\d{10}$/.test(phone)
  const canSubmit = phoneValid && code.length === 4

  return (
    <div className="min-h-full flex flex-col font-body text-on-surface relative">
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#fce8e4] via-[#efe7e4] to-[#e8ddd9]" />
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-container/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFF8E1]/40 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <header className="w-full flex justify-between items-center px-container-padding-mobile h-20">
        <button onClick={() => nav('/home')} aria-label="跳过登录"
          className="hover:opacity-80 active:scale-95 transition flex items-center justify-center">
          <Icon name="close" size={28} className="text-on-surface" />
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center px-container-padding-mobile pt-stack-lg pb-10 max-w-md mx-auto w-full">
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

        <div className="w-full space-y-gutter flex flex-col items-center">
          <button onClick={openPhone}
            className="w-full h-14 bg-primary text-on-primary font-label text-lg rounded-lg
              shadow-xl shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all
              flex items-center justify-center gap-3">
            <Icon name="smartphone" size={22} className="text-white" />
            手机号登录
          </button>

          <button onClick={wechatLogin}
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

        {/* 协议勾选 */}
        <footer className="w-full pb-container-padding-mobile">
          <div className={`flex items-start gap-3 px-2 rounded-lg transition ${shake ? 'animate-shake bg-error/5' : ''}`}>
            <input id="privacy" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary transition-all cursor-pointer" />
            <label htmlFor="privacy" className="font-label text-[12px] text-on-surface-variant leading-relaxed select-none">
              我已阅读并同意
              <button type="button" onClick={() => setDoc('user')} className="text-primary">《用户协议》</button>
              <button type="button" onClick={() => setDoc('privacy')} className="text-primary">《隐私政策》</button>
              与
              <button type="button" onClick={() => setDoc('data')} className="text-primary">《数据采集协议》</button>
            </label>
          </div>
        </footer>
      </main>

      {/* 手机号登录抽屉 */}
      {sheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setSheet(false)}>
          <div className="bg-surface rounded-t-3xl w-full max-w-md p-6 pb-8 animate-page-in" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-outline-variant/40 rounded-full mx-auto mb-5" />
            <h3 className="font-headline text-[20px] text-on-surface mb-1">手机号登录</h3>
            <p className="font-label text-[13px] text-outline mb-5">未注册的手机号验证后将自动创建账号</p>

            <div className="flex items-center gap-2 bg-surface-container rounded-lg px-4 h-14 mb-3">
              <span className="font-label text-[15px] text-on-surface-variant">+86</span>
              <input type="tel" inputMode="numeric" maxLength={11} value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="请输入手机号" aria-label="手机号"
                className="flex-1 bg-transparent outline-none font-label text-[16px] text-on-surface placeholder:text-outline" />
            </div>

            <div className="flex items-center gap-2 bg-surface-container rounded-lg px-4 h-14 mb-5">
              <input type="tel" inputMode="numeric" maxLength={4} value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="4 位验证码" aria-label="验证码"
                className="flex-1 bg-transparent outline-none font-label text-[16px] text-on-surface placeholder:text-outline" />
              <button onClick={sendCode} disabled={!phoneValid || countdown > 0}
                className="font-label text-[13px] text-primary disabled:text-outline disabled:cursor-not-allowed">
                {countdown > 0 ? `${countdown}s 后重发` : '获取验证码'}
              </button>
            </div>

            {countdown > 0 && (
              <p className="font-label text-[12px] text-outline text-center mb-4 -mt-2">演示验证码：任意 4 位数字即可</p>
            )}

            <button onClick={() => nav('/onboarding')} disabled={!canSubmit}
              className="w-full h-14 bg-primary text-on-primary font-label text-lg rounded-lg
                active:scale-[0.98] transition disabled:opacity-40 disabled:active:scale-100">
              登录 / 注册
            </button>
          </div>
        </div>
      )}

      {/* 协议查看抽屉 */}
      {doc && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setDoc(null)}>
          <div className="bg-surface rounded-t-3xl w-full max-w-md p-6 pb-8 animate-page-in max-h-[80%] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-outline-variant/40 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-headline text-[20px] text-on-surface">{LEGAL[doc].title}</h3>
              <button onClick={() => setDoc(null)} aria-label="关闭"><Icon name="close" size={22} className="text-outline" /></button>
            </div>
            <p className="font-label text-[12px] text-outline mb-4">更新日期：{LEGAL[doc].updated}</p>
            <p className="font-body text-[14px] text-on-surface-variant leading-relaxed mb-4">{LEGAL[doc].intro}</p>
            <div className="space-y-4">
              {LEGAL[doc].sections.map(s => (
                <section key={s.h} className="space-y-1.5">
                  <h4 className="font-headline text-[15px] text-on-surface">{s.h}</h4>
                  <p className="font-body text-[13px] text-on-surface-variant leading-relaxed">{s.p}</p>
                </section>
              ))}
            </div>
            <button onClick={() => { setAgreed(true); setDoc(null) }}
              className="w-full h-12 mt-6 bg-primary text-on-primary font-label rounded-lg active:scale-[0.98] transition">
              我已阅读并同意
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
