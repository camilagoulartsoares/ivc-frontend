import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/startups': {
        target: 'https://make.investidores.vc',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/startups/, '/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups')
      }
    }
  }
});
