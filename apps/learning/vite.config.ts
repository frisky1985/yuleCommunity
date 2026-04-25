import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  base: '/yuleCommunity/',
  plugins: [
    react(),
    federation({
      name: 'learning',
      filename: 'remoteEntry.js',
      exposes: {
        './LearningPage': './src/pages/LearningPage.tsx',
        './DocsPage': './src/pages/DocsPage.tsx',
        './BlogPage': './src/pages/BlogPage.tsx',
        './CodeBlock': './src/components/CodeBlock.tsx',
        './routes': './src/routes.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'react-syntax-highlighter', 'react-helmet-async']
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
