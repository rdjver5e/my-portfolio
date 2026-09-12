import { useState, useEffect } from 'react'
import FloatingNavbar from './components/FloatingNavbar'
import Container from './components/layout/Container'
import { Hero } from './components/hero'
import { PhilosophySection } from './components/philosophy'
import { SelectedWork } from './components/selected-work'
import { WhatIBring } from './components/what-i-bring'

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

      {/* What I Bring Section */}
      <WhatIBring darkMode={darkMode} />

      {/* Contact Section */}
      <section id="contact" className={`py-24 lg:py-32 ${darkMode ? 'bg-[#0D0D0D]' : 'bg-slate-50'}`}>
        <Container>
          <div className="max-w-[1200px] mx-auto">
            <p className={`font-display text-[14px] uppercase tracking-[0.2em] mb-12 ${darkMode ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
              Contact
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-16 lg:gap-24">
              <div>
                <h2 className={`font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] mb-6 ${darkMode ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                  Let's build something memorable together.
                </h2>
                <p className={`font-display text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.7] mb-10 ${darkMode ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <a
                  href="mailto:hello@rdjverse.com"
                  className={`inline-flex items-center gap-3 font-display text-[18px] font-medium transition-colors duration-300 ${darkMode ? 'text-[#F5F5F5] hover:text-[#9CA3AF]' : 'text-slate-900 hover:text-slate-500'}`}
                >
                  hello@rdjverse.com
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
              <div className="flex flex-col gap-8">
                {[
                  { label: 'GitHub', href: 'https://github.com/rdjverse' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/rdjverse' },
                  { label: 'Twitter', href: 'https://twitter.com/rdjverse' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between py-5 border-b transition-colors duration-300 ${
                      darkMode ? 'border-white/10 hover:border-white/25' : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <span className={`font-display text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.01em] transition-colors duration-300 ${darkMode ? 'text-[#F5F5F5] group-hover:text-[#9CA3AF]' : 'text-slate-900 group-hover:text-slate-500'}`}>
                      {link.label}
                    </span>
                    <svg className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${darkMode ? 'text-[#6B7280]' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

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
