import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  base: '/yuleCommunity/',
  plugins: [
    react(),
    federation({
      name: 'opensource',
      filename: 'remoteEntry.js',
      exposes: {
        './OpenSourcePage': './src/pages/OpenSourcePage.tsx',
        './ToolchainPage': './src/pages/ToolchainPage.tsx',
        './routes': './src/routes.tsx',
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
