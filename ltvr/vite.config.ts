import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      }
    },
    assetsDir: 'assets',
    publicDir: 'public',
  },
  publicDir: 'public',
})
