import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const base = process.env.NODE_ENV === 'production' ? '/HS2025V2/' : '/';

export default defineConfig({
  base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  plugins: [react()]
});
