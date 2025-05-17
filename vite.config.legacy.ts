import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true,
    legacy: {
      targets: ['defaults', 'not IE 11']
    }
  },
  plugins: [react()]
});
