import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base:'./' 让构建产物使用相对路径，可直接双击 dist/index.html 离线使用
export default defineConfig({
  base: './',
  plugins: [react()],
})
