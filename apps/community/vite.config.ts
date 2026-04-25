import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  base: '/yuleCommunity/',
  plugins: [
    react(),
    federation({
      name: 'community',
      filename: 'community-remoteEntry.js',
      exposes: {
        './CommunityPage': './src/pages/CommunityPage',
        './ForumPage': './src/pages/ForumPage',
        './QAPage': './src/pages/QAPage',
        './EventsPage': './src/pages/EventsPage',
        './routes': './src/routes',
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
