import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 斯俪 Slique 原型 — Vite 配置
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
})
