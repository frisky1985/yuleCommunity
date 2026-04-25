import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  base: '/yuleCommunity/',
  plugins: [
    react(),
    federation({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './AdminDashboard': './src/pages/AdminDashboard',
        './AdminUsers': './src/pages/AdminUsers',
        './AdminContent': './src/pages/AdminContent',
        './AdminSettings': './src/pages/AdminSettings',
        './AdminLoginPage': './src/pages/AdminLoginPage',
        './AdminLayout': './src/components/AdminLayout',
        './routes': './src/routes',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'recharts']
    })
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
    cssCodeSplit: false
  }
})
