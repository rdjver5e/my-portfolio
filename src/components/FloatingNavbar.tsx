import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedHamburger from './AnimatedHamburger'
import AnimatedLogo from './AnimatedLogo'
import ThemeToggle from './ThemeToggle'
import ScrollProgress from './ScrollProgress'
import Container from './layout/Container'

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
}

export default function FloatingNavbar({ darkMode, onToggleDarkMode }: FloatingNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [resumeHovered, setResumeHovered] = useState(false)

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
      <header className="fixed top-0 left-0 right-0 z-50 py-8" role="banner">
        <nav aria-label="Main navigation">
          <Container>
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <AnimatedLogo darkMode={darkMode} />

            {/* Floating Pill - Centered */}
            <div className="absolute left-1/2 -translate-x-1/2 rounded-full">
              <motion.div
                className="relative z-10 flex items-center gap-2 px-3 h-[56px] rounded-full bg-[#1a1a1a] border border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden"
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Hamburger / Close */}
                <AnimatedHamburger isOpen={isOpen} onClick={handleToggle} />

                {/* Menu / Close Text */}
                <span className="relative text-sm md:text-base lg:text-[18px] font-medium min-w-[44px] md:min-w-[52px] lg:min-w-[60px]">
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
                      className="absolute left-1/2 -translate-x-1/2 -top-[15px] w-[90vw] max-w-[280px] bg-[#ececec] rounded-[40px] p-6 pb-10 overflow-hidden origin-top"
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
                                className="text-[1.8rem] font-semibold text-slate-900 hover:text-slate-600 transition-colors"
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
                            <motion.a
                              href="#resume"
                              className="text-[1.8rem] font-semibold text-slate-900 hover:text-slate-600 transition-colors md:hidden"
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: menuItems.length * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                              whileHover={{ x: 8 }}
                              role="menuitem"
                              onClick={() => setIsOpen(false)}
                            >
                              Resume
                            </motion.a>
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

            {/* Resume Button */}
            <a
              href="#resume"
              className="group relative px-6 py-3 rounded-full bg-black text-white text-body font-medium border border-white/20 overflow-hidden z-10 hidden md:flex"
              onMouseEnter={() => setResumeHovered(true)}
              onMouseLeave={() => setResumeHovered(false)}
            >
              <span className="relative z-10 block min-w-[70px] text-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={resumeHovered ? 'hovered' : 'idle'}
                    className="text-white block"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                  >
                    Resume
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
            </a>
          </div>
        </Container>
        </nav>
      </header>
    </>
  )
}
