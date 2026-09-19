import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'

// --- CONFIG — edit here ---
const menuItems = [
  { label: 'About', href: '#philosophy' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
const otherLinks = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Cookie Policy', href: '#cookies' },
]
const socialLinks = [
  { label: 'LinkedIn', href: '#linkedin' },
  { label: 'GitHub', href: '#github' },
]

// --- Sub-components inlined from src/components/AnimatedHamburger.tsx:1, ThemeToggle.tsx:1, ScrollProgress.tsx:1 ---
function AnimatedHamburger({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="relative w-6 h-6 flex flex-col items-center justify-center gap-[5px]" aria-expanded={isOpen} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
      <motion.span className="block w-5 h-[1.5px] bg-white origin-center" animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3.25 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} />
      <motion.span className="block w-5 h-[1.5px] bg-white origin-center" animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3.25 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} />
    </button>
  )
}
function ThemeToggle({ darkMode, onToggle }: { darkMode: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="relative w-9 h-9 rounded-full flex items-center justify-center border border-white/20 hover:border-white/40 transition-colors" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
      <motion.div initial={false} animate={{ rotate: darkMode ? 180 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        )}
      </motion.div>
    </button>
  )
}
function ScrollProgress({ progress }: { progress: number }) {
  const springProgress = useSpring(progress, { stiffness: 100, damping: 30 })
  useEffect(() => { springProgress.set(progress) }, [progress, springProgress])
  const displayProgress = useTransform(springProgress, (v) => Math.round(v))
  return (
    <div className="flex items-center justify-center min-w-[70px] h-9 px-3 rounded-full bg-white/15 text-white text-base font-medium">
      <motion.span>{displayProgress}</motion.span><span>%</span>
    </div>
  )
}

// --- Main Pill ---
export default function PillMenu({ darkMode = false, onToggleDarkMode }: { darkMode?: boolean; onToggleDarkMode?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && isOpen && setIsOpen(false)
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [isOpen])
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const handleToggle = useCallback(() => setIsOpen(p => !p), [])
  const handleBackdropClick = useCallback(() => setIsOpen(false), [])

  return (
    <div className="absolute left-1/2 -translate-x-1/2 rounded-full">
      {/* Pill Bar — src/components/FloatingNavbar.tsx:91 */}
      <motion.div data-tablet="pill" className="relative z-10 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-[48px] sm:h-[56px] rounded-full bg-[#1a1a1a] border border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden" layout transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        <AnimatedHamburger isOpen={isOpen} onClick={handleToggle} />
        <span className="relative text-xs sm:text-sm md:text-base lg:text-[18px] font-medium min-w-[36px] sm:min-w-[44px] md:min-w-[52px] lg:min-w-[60px]">
          <AnimatePresence mode="wait">
            <motion.span key={isOpen ? 'close' : 'menu'} className="text-white block" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
              {isOpen ? 'Close' : 'Menu'}
            </motion.span>
          </AnimatePresence>
        </span>
        <ThemeToggle darkMode={darkMode} onToggle={onToggleDarkMode ?? (() => {})} />
        <ScrollProgress progress={scrollProgress} />
      </motion.div>

      {/* Dropdown — src/components/FloatingNavbar.tsx:124 */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10" initial={{ opacity: 0 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} onClick={handleBackdropClick} aria-hidden="true" />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -top-[10px] sm:-top-[15px] w-[65vw] max-w-[280px] bg-[#ececec] rounded-[32px] sm:rounded-[40px] p-5 sm:p-6 pb-8 sm:pb-10 overflow-x-hidden overflow-y-auto overscroll-contain origin-top max-h-[78dvh] sm:max-h-[85dvh]"
              role="menu"
              initial={{ opacity: 0, scale: 0.3, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.3, y: -10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 1.2 }}
            >
              <div className="flex flex-col">
                <div className="mt-16 mb-6">
                  <motion.p className="text-[13px] text-slate-500 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>Menu</motion.p>
                  <div className="flex flex-col gap-0">
                    {menuItems.map((item, i) => (
                      <motion.a key={item.label} href={item.href} className="text-[1.5rem] sm:text-[1.8rem] font-semibold text-slate-900 hover:text-slate-600 transition-colors" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }} whileHover={{ x: 8 }} role="menuitem" onClick={() => setIsOpen(false)}>{item.label}</motion.a>
                    ))}
                  </div>
                </div>
                <motion.div className="border-t border-slate-300 mb-6" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.35, duration: 0.4 }} />
                <div className="mb-6">
                  <motion.p className="text-[13px] text-slate-500 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Other</motion.p>
                  <div className="flex flex-col">
                    {otherLinks.map((item, i) => (
                      <motion.a key={item.label} href={item.href} className="text-[0.875rem] font-semibold text-slate-700 hover:text-slate-900 transition-colors" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.08, type: 'spring', stiffness: 200, damping: 20 }} whileHover={{ x: 4 }} role="menuitem" onClick={() => setIsOpen(false)}>{item.label}</motion.a>
                    ))}
                  </div>
                </div>
                <div className="flex-1" />
                <div>
                  <motion.p className="text-[13px] text-slate-500 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>Social media</motion.p>
                  <div className="flex flex-col">
                    {socialLinks.map((item, i) => (
                      <motion.a key={item.label} href={item.href} className="text-[0.875rem] font-semibold text-slate-700 hover:text-slate-900 transition-colors" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.75 + i * 0.08, type: 'spring', stiffness: 200, damping: 20 }} whileHover={{ x: 4 }} role="menuitem" onClick={() => setIsOpen(false)} target="_blank" rel="noopener noreferrer">{item.label}</motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
