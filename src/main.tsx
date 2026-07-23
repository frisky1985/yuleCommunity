import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext'
import { setupErrorMonitoring } from './lib/errorMonitor'
import App from './App'
import './index.css'

// 初始化错误监控
setupErrorMonitoring();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="system">
        <BrowserRouter basename="/yuleCommunity">
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)

// Service worker is automatically registered by vite-plugin-pwa via registerSW.js
// injected into index.html during build. No manual registration needed.
