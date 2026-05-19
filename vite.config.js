import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // mirrors the netlify.toml redirect: /api/* → http://51.21.241.218/api/*
      '/api': {
        target: 'http://51.21.241.218',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
