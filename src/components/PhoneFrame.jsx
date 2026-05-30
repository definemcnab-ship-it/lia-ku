import { useLocation } from 'react-router-dom'
import TabBar from './TabBar.jsx'

// 居中的手机外壳；桌面端显示设备边框，移动端全屏。
export default function PhoneFrame({ children, chrome = true }) {
  const loc = useLocation()
  const hideTab = loc.pathname === '/scan' // AI 扫描为沉浸式全屏，隐藏底部导航

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 sm:p-6
      bg-[radial-gradient(1200px_600px_at_20%_-10%,#fde7df_0%,transparent_60%),radial-gradient(1000px_500px_at_110%_10%,#fff4d6_0%,transparent_55%),#efe7e4]">
      <div className="relative bg-surface w-full h-[100dvh] sm:w-[390px] sm:h-[844px]
        sm:max-h-[calc(100vh-48px)] sm:rounded-[44px] overflow-hidden flex flex-col
        sm:shadow-[0_30px_80px_rgba(97,25,9,0.22),0_0_0_12px_#1b1c1c,0_0_0_13px_#2c2c2c]">
        {/* 刘海 */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-7
          bg-[#1b1c1c] rounded-b-[18px] z-50" />
        <div className="flex-1 overflow-y-auto custom-scroll">
          {children}
        </div>
        {chrome && !hideTab && <TabBar />}
      </div>
    </div>
  )
}
