import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  server: {
    host: 'localhost',
    port: 3000
  },
  plugins: [react()],
  build: {
    outDir: './dist',
    assetsDir: 'assets',
    manifest: true,
    rollupOptions: {
      input: {
        main: './src/main-test.tsx'
      }
    }
  },
  resolve: {
    alias: {
      '@': './src'
    }
  }
})
