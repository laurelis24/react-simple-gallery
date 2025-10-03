import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/react-simple-gallery/',
  root: 'githubPage',
  build: {
    outDir: '../docs',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
