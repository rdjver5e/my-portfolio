import { useState, useEffect } from 'react'
import FloatingNavbar from './components/FloatingNavbar'
import Container from './components/layout/Container'
import { Hero } from './components/hero'
import { PhilosophySection } from './components/philosophy'
import { SelectedWork } from './components/selected-work'
import { WhatIBring } from './components/what-i-bring'
import Experience from './components/experience/Experience'
import Contact from './components/contact/Contact'
import ResumePage from './resume/ResumePage'

function App() {
  // Always start at top on refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  // Minimal hash route: #resume renders the resume page
  const [isResume, setIsResume] = useState(
    () => typeof window !== 'undefined' && window.location.hash === '#resume'
  )
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash
      setIsResume(hash === '#resume')
      if (hash === '#resume' || hash === '') {
        window.scrollTo(0, 0)
      } else {
        // Let the home view render first, then scroll to the section
        setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
        }, 60)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (isResume) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-[#0A0A0A] text-white' : 'bg-white text-slate-900'}`}>
        <ResumePage />
      </div>
    )
  }



  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0A0A0A] text-white' : 'bg-white text-slate-900'}`}>
      <a
        href="#philosophy"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-violet-600 focus:text-white focus:outline-none"
      >
        Skip to content
      </a>
      <FloatingNavbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <Hero darkMode={darkMode} />

      {/* Philosophy Section — Section 02 */}
      <PhilosophySection darkMode={darkMode} />

      {/* Selected Work Section */}
      <SelectedWork darkMode={darkMode} />

      {/* Capabilities Section */}
      <WhatIBring darkMode={darkMode} />

      {/* Experience Section */}
      <Experience darkMode={darkMode} />

      <Contact darkMode={darkMode} />

      {/* Footer */}
      <footer className={`py-8 border-t ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`font-display text-[13px] ${darkMode ? 'text-[#6B7280]' : 'text-slate-400'}`}>
              &copy; 2026 rdjverse. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://github.com/rdjverse" target="_blank" rel="noopener noreferrer" className={`font-display text-[13px] hover:text-[#9CA3AF] transition-colors ${darkMode ? 'text-[#6B7280]' : 'text-slate-400'}`}>
                GitHub
              </a>
              <a href="https://linkedin.com/in/rdjverse" target="_blank" rel="noopener noreferrer" className={`font-display text-[13px] hover:text-[#9CA3AF] transition-colors ${darkMode ? 'text-[#6B7280]' : 'text-slate-400'}`}>
                LinkedIn
              </a>
              <a href="https://twitter.com/rdjverse" target="_blank" rel="noopener noreferrer" className={`font-display text-[13px] hover:text-[#9CA3AF] transition-colors ${darkMode ? 'text-[#6B7280]' : 'text-slate-400'}`}>
                Twitter
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}

export default App
