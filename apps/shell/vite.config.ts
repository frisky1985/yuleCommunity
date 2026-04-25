import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  base: '/yuleCommunity/',
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        opensource: 'https://frisky1985.github.io/yuleCommunity/assets/opensource-remoteEntry.js',
        community: 'https://frisky1985.github.io/yuleCommunity/assets/community-remoteEntry.js',
        learning: 'https://frisky1985.github.io/yuleCommunity/assets/learning-remoteEntry.js',
        admin: 'https://frisky1985.github.io/yuleCommunity/assets/admin-remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
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
