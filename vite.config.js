import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 斯俪 Slique 原型 — Vite 配置
export default defineConfig({
  plugins: [react()],
  // host 0.0.0.0 让远程容器/预览端口可被转发访问
  server: { host: '0.0.0.0', port: 5173 },
  preview: { host: '0.0.0.0', port: 5173 },
})
