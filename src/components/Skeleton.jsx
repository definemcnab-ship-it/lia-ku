// 骨架屏占位块。用于数据加载期，避免布局跳动。
export default function Skeleton({ className = '', rounded = 'rounded-lg' }) {
  return <div className={`skeleton ${rounded} ${className}`} aria-hidden="true" />
}
