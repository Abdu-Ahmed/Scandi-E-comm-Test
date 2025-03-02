// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:8000', // your backend server
        changeOrigin: true,
        secure: false,
        // Optionally, rewrite the URL if needed (here it's not really needed because the path matches)
        rewrite: (path) => path,
      },
    },
  },
});
