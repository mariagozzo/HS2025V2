import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist/build',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/Users/wilfredy/Desktop/HS2025/hubdeseguros-v1-main/HS2025V2/src',
      '@radix-ui': '/Users/wilfredy/Desktop/HS2025/hubdeseguros-v1-main/HS2025V2/node_modules/@radix-ui'
    }
  },
  root: '.'
});
