import AnimatedLogo from './AnimatedLogo'
import Container from './layout/Container'
import PillMenu from './PillMenu'
import cvPdf from '../assets/resume/RishavDas_CV.pdf'

interface FloatingNavbarProps {
  darkMode: boolean
  onToggleDarkMode: () => void
  isResumePage?: boolean
}

export default function FloatingNavbar({ darkMode, onToggleDarkMode, isResumePage = false }: FloatingNavbarProps) {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-6 md:py-8" role="banner">
        <nav aria-label="Main navigation">
          <Container>
            <div className="relative flex items-center justify-between gap-4 sm:gap-6">
              {/* Logo */}
              <AnimatedLogo darkMode={darkMode} />

              {/* Pill Menu — plug-and-play, centered */}
              <PillMenu darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

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
