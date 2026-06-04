import { useState, useEffect } from 'react'
import TaskManager from './components/TaskManager'
import AuthForm from './components/AuthForm'
import ImageCarousel from './components/ImageCarousel'

const productImages = [
  {
    url: '/sneaker.png',
    title: 'Aether Runner 2049',
    description: 'Futuristic sneaker with smart self-lacing tech and adaptive neon micro-LEDs.'
  },
  {
    url: '/keyboard.png',
    title: 'Nimbus-65 mechanical keyboard',
    description: 'Custom gasket-mounted board with warm retro backlighting and pastel keycaps.'
  },
  {
    url: '/headphones.png',
    title: 'Aurora ANC Headset',
    description: 'Premium active noise-canceling headphones with tactile aluminum controls.'
  }
]

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme'
  }, [darkMode])

  return (
    <div className={`app-wrapper ${darkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div className="brand-text">
            <h1>VibeSuite</h1>
            <p>Unified Workspace Portal</p>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="theme-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="dashboard-col left" aria-label="Task Workspace">
          <TaskManager />
        </section>
        
        <section className="dashboard-col right" aria-label="Product and Auth Workspace">
          <div className="showcase-card">
            <div className="showcase-header">
              <h2>Product Showcase</h2>
              <p>Hover to pause, drag or click to navigate</p>
            </div>
            <ImageCarousel images={productImages} />
          </div>
          
          <AuthForm />
        </section>
      </main>
    </div>
  )
}
