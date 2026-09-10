import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 开发服务器代理 /api 到本地后端（hegui-backend 默认 :8080）
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
