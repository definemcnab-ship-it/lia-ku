import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { LEGAL } from '../lib/content.js'

export default function Login() {
  const nav = useNavigate()
  const [agreed, setAgreed] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [doc, setDoc] = useState(null)
  const [shake, setShake] = useState(false)
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
    <div className="min-h-full flex flex-col font-body relative overflow-hidden">

      {/* 上半：全屏品牌视觉区 */}
      <div className="relative flex-none h-[55%] bg-gradient-to-br from-[#d8cfbf] via-[#c8bfaf] to-[#a89f90] flex flex-col justify-end pb-10 px-8">
        {/* 右上角跳过 */}
        <button onClick={() => nav('/home')}
          className="absolute top-12 right-6 font-label text-[13px] text-white/70 bg-white/20 px-3 py-1 rounded-full">
          跳过
        </button>

        {/* 装饰圆 */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute top-10 -left-16 w-52 h-52 rounded-full bg-white/8" />

        {/* 中央图标 */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-soft-lg">
            <Icon name="self_improvement" size={44} className="text-white" />
          </div>
        </div>

        {/* 左下品牌文字 */}
        <div>
          <p className="font-label text-[11px] text-white/60 uppercase tracking-[0.2em] mb-1">SLIQUE · 优雅体态</p>
          <h1 className="font-headline text-[38px] leading-[44px] text-white font-light">欢迎来到</h1>
          <h2 className="font-headline text-[44px] leading-[50px] text-white font-normal">斯俪</h2>
          <p className="font-body text-[15px] text-white/75 mt-2">科学矫正 · 8 周挺拔如模特</p>
        </div>
      </div>

      {/* 下半：白色卡片 */}
      <div className="flex-1 bg-surface rounded-t-[32px] -mt-6 px-8 pt-8 pb-6 flex flex-col shadow-soft-lg">
        <h3 className="font-headline text-[26px] text-ink font-light mb-1">开始使用</h3>
        <p className="font-body text-[13px] text-on-surface-variant mb-7">登录后解锁全部体态训练功能</p>

        <div className="space-y-3 flex-1">
          <button onClick={openPhone}
            className="w-full h-14 bg-primary text-on-primary font-label text-[16px] rounded-xl
              active:scale-[0.98] transition flex items-center justify-center gap-3 shadow-soft">
            <Icon name="smartphone" size={22} className="text-white" />
            手机号登录 / 注册
          </button>

          <button onClick={wechatLogin}
            className="w-full h-14 bg-surface-container text-on-surface font-label text-[16px] rounded-xl
              active:scale-[0.98] transition flex items-center justify-center gap-3">
            <svg fill="currentColor" height="22" viewBox="0 0 24 24" width="22" className="text-[#07C160]">
              <path d="M8.5 13.5C9.33 13.5 10 12.83 10 12C10 11.17 9.33 10.5 8.5 10.5C7.67 10.5 7 11.17 7 12C7 12.83 7.67 13.5 8.5 13.5Z" />
              <path d="M15.5 13.5C16.33 13.5 17 12.83 17 12C17 11.17 16.33 10.5 15.5 10.5C14.67 10.5 14 11.17 14 12C14 12.83 14.67 13.5 15.5 13.5Z" />
              <path d="M12 4C7.03 4 3 7.58 3 12C3 14.39 4.14 16.52 5.92 18L5.5 21L8.5 19.5C9.59 19.82 10.77 20 12 20C16.97 20 21 16.42 21 12C21 7.58 16.97 4 12 4Z" />
            </svg>
            微信一键登录
          </button>
        </div>

        {/* 协议 */}
        <div className={`flex items-start gap-2.5 mt-6 px-1 rounded-lg transition ${shake ? 'bg-error/5' : ''}`}>
          <input id="privacy" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" />
          <label htmlFor="privacy" className="font-label text-[11px] text-on-surface-variant leading-relaxed select-none">
            我已阅读并同意
            <button type="button" onClick={() => setDoc('user')} className="text-primary">《用户协议》</button>
            <button type="button" onClick={() => setDoc('privacy')} className="text-primary">《隐私政策》</button>
            与
            <button type="button" onClick={() => setDoc('data')} className="text-primary">《数据采集协议》</button>
          </label>
        </div>
      </div>

      {/* 手机号登录抽屉 */}
      {sheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setSheet(false)}>
          <div className="bg-surface rounded-t-3xl w-full max-w-md p-6 pb-8 animate-page-in" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-outline-variant/40 rounded-full mx-auto mb-5" />
            <h3 className="font-headline text-[20px] text-ink mb-1">手机号登录</h3>
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
              <h3 className="font-headline text-[20px] text-ink">{LEGAL[doc].title}</h3>
              <button onClick={() => setDoc(null)} aria-label="关闭"><Icon name="close" size={22} className="text-outline" /></button>
            </div>
            <p className="font-label text-[12px] text-outline mb-4">更新日期：{LEGAL[doc].updated}</p>
            <p className="font-body text-[14px] text-on-surface-variant leading-relaxed mb-4">{LEGAL[doc].intro}</p>
            <div className="space-y-4">
              {LEGAL[doc].sections.map(s => (
                <section key={s.h} className="space-y-1.5">
                  <h4 className="font-headline text-[15px] text-ink">{s.h}</h4>
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
