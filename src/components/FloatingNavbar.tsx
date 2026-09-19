import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedHamburger from './AnimatedHamburger'
import AnimatedLogo from './AnimatedLogo'
import ThemeToggle from './ThemeToggle'
import ScrollProgress from './ScrollProgress'
import Container from './layout/Container'
import cvPdf from '../assets/resume/RishavDas_CV.pdf'

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

interface FloatingNavbarProps {
  darkMode: boolean
  onToggleDarkMode: () => void
  isResumePage?: boolean
}

export default function FloatingNavbar({ darkMode, onToggleDarkMode, isResumePage = false }: FloatingNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleBackdropClick = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-6 md:py-8" role="banner">
        <nav aria-label="Main navigation">
          <Container>
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <AnimatedLogo darkMode={darkMode} />

            {/* Floating Pill - Centered */}
            <div className="absolute left-1/2 -translate-x-1/2 rounded-full">
              <motion.div
                data-tablet="pill"
                className="relative z-10 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-[48px] sm:h-[56px] rounded-full bg-[#1a1a1a] border border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden"
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Hamburger / Close */}
                <AnimatedHamburger isOpen={isOpen} onClick={handleToggle} />

                {/* Menu / Close Text */}
                <span className="relative text-xs sm:text-sm md:text-base lg:text-[18px] font-medium min-w-[36px] sm:min-w-[44px] md:min-w-[52px] lg:min-w-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isOpen ? 'close' : 'menu'}
                      className="text-white block"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      {isOpen ? 'Close' : 'Menu'}
                    </motion.span>
                  </AnimatePresence>
                </span>

                {/* Theme Toggle */}
                <ThemeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />

                {/* Scroll Progress */}
                <ScrollProgress progress={scrollProgress} />
              </motion.div>

              {/* Expanded Menu Panel */}
              <AnimatePresence>
              {isOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                    aria-hidden="true"
                  />

                  {/* Menu Panel */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 -top-[10px] sm:-top-[15px] w-[65vw] max-w-[280px] bg-[#ececec] rounded-[32px] sm:rounded-[40px] p-5 sm:p-6 pb-8 sm:pb-10 overflow-x-hidden overflow-y-auto overscroll-contain origin-top max-h-[78dvh] sm:max-h-[85dvh]"
                      role="menu"
                      initial={{ opacity: 0, scale: 0.3, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.3, y: -10 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                        mass: 1.2,
                      }}
                    >
                      <div className="flex flex-col">
                        {/* Section 1: Menu */}
                        <div className="mt-16 mb-6">
                          <motion.p
                            className="text-caption text-slate-500 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            Menu
                          </motion.p>
                          <div className="flex flex-col gap-0">
                            {menuItems.map((item, index) => (
                              <motion.a
                                key={item.label}
                                href={item.href}
                                className="text-[1.5rem] sm:text-[1.8rem] font-semibold text-slate-900 hover:text-slate-600 transition-colors"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                                whileHover={{ x: 8 }}
                                role="menuitem"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.label}
                              </motion.a>
                            ))}
                            {isResumePage ? (
                              <motion.a
                                href={cvPdf}
                                download="RishavDas_CV.pdf"
                                onClick={() => setIsOpen(false)}
                                className="text-[1.5rem] sm:text-[1.8rem] font-semibold text-slate-900 hover:text-slate-600 transition-colors md:hidden text-left"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: menuItems.length * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                                whileHover={{ x: 8 }}
                                role="menuitem"
                              >
                                Download
                              </motion.a>
                            ) : (
                              <motion.a
                                href="#resume"
                                className="text-[1.5rem] sm:text-[1.8rem] font-semibold text-slate-900 hover:text-slate-600 transition-colors md:hidden"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: menuItems.length * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                                whileHover={{ x: 8 }}
                                role="menuitem"
                                onClick={() => setIsOpen(false)}
                              >
                                Resume
                              </motion.a>
                            )}
                          </div>
                        </div>

                        {/* Divider */}
                        <motion.div
                          className="border-t border-slate-300 mb-6"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ delay: 0.35, duration: 0.4 }}
                        />

                        {/* Section 2: Other */}
                        <div className="mb-6">
                          <motion.p
                            className="text-caption text-slate-500 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            Other
                          </motion.p>
                          <div className="flex flex-col">
                            {otherLinks.map((item, index) => (
                              <motion.a
                                key={item.label}
                                href={item.href}
                                className="text-[0.875rem] font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.45 + index * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                                whileHover={{ x: 4 }}
                                role="menuitem"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.label}
                              </motion.a>
                            ))}
                          </div>
                        </div>

                        {/* Spacer to push social to bottom */}
                        <div className="flex-1" />

                        {/* Section 3: Social Media */}
                        <div>
                          <motion.p
                            className="text-caption text-slate-500 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            Social media
                          </motion.p>
                          <div className="flex flex-col">
                            {socialLinks.map((item, index) => (
                              <motion.a
                                key={item.label}
                                href={item.href}
                                className="text-[0.875rem] font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.75 + index * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                                whileHover={{ x: 4 }}
                                role="menuitem"
                                onClick={() => setIsOpen(false)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.label}
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Resume / Download Button */}
            {isResumePage ? (
              <a
                href={cvPdf}
                download="RishavDas_CV.pdf"
                aria-label="Download resume"
                data-tablet="btn-sm"
                className={`group relative hidden md:inline-flex items-center h-12 px-6 rounded-full font-display font-medium overflow-hidden border transition-colors duration-300 hover:border-white ${
                  darkMode ? 'border-white/20' : 'border-slate-300'
                }`}
              >
                <span className={`relative z-10 transition-colors duration-300 group-hover:text-white ${darkMode ? 'text-white' : 'text-slate-900'}`}>Download</span>
                <span className="absolute inset-0 bg-[#8B5CF6] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
              </a>
            ) : (
              <a
                href="#resume"
                aria-label="View resume"
                data-tablet="btn-sm"
                className={`group relative hidden md:inline-flex items-center h-12 px-6 rounded-full font-display font-medium overflow-hidden border transition-colors duration-300 hover:border-white ${
                  darkMode ? 'border-white/20' : 'border-slate-300'
                }`}
              >
                <span className={`relative z-10 transition-colors duration-300 group-hover:text-white ${darkMode ? 'text-white' : 'text-slate-900'}`}>Resume</span>
                <span className="absolute inset-0 bg-[#8B5CF6] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
              </a>
            )}
          </div>
        </Container>
        </nav>
      </header>
    </>
  )
}
