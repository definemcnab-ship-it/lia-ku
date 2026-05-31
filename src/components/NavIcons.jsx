// 底部导航专用线条图标 — stroke 风格，随 className 继承颜色
export function HomeIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V10.5z"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function TrainingIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6.5 6.5L17.5 17.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M3.5 5.5L5 4L8 7L7 8L3.5 5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20.5 18.5L19 20L16 17L17 16L20.5 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 7L4 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M20 19L22 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M7 3L5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M17 21L19 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}

export function AnalyticsIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="12" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.7"/>
      <rect x="10" y="7" width="4" height="13" rx="1" stroke="currentColor" strokeWidth="1.7"/>
      <rect x="17" y="4" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="1.7"/>
    </svg>
  )
}

export function ProfileIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M4 20c0-2.761 3.582-5 8-5s8 2.239 8 5"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}

export function ScanPlusIcon({ size = 26, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}
