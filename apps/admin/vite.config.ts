import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  base: '/yuleCommunity/',
  plugins: [
    react(),
    federation({
      name: 'admin',
      filename: 'admin-remoteEntry.js',
      exposes: {
        './routes': './src/routes',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3004,
  },
});
