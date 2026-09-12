import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

interface AnimatedLogoProps {
  darkMode: boolean
}

export default function AnimatedLogo({ darkMode }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLAnchorElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const handleEnter = useCallback(() => {
    timelineRef.current?.play()
  }, [])

  const handleLeave = useCallback(() => {
    timelineRef.current?.reverse()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const firstWrapper = container.querySelector('.first-wrapper') as HTMLElement
    const lastWrapper = container.querySelector('.last-wrapper') as HTMLElement

    if (!firstWrapper || !lastWrapper) return

    // Measure natural widths while temporarily visible
    gsap.set(firstWrapper, { width: 'auto', overflow: 'visible' })
    gsap.set(lastWrapper, { width: 'auto', overflow: 'visible' })

    const firstWidth = firstWrapper.offsetWidth
    const lastWidth = lastWrapper.offsetWidth

    // Set initial state: zero width, overflow hidden
    gsap.set(firstWrapper, { width: 0, overflow: 'hidden' })
    gsap.set(lastWrapper, { width: 0, overflow: 'hidden' })

    // Build timeline
    const tl = gsap.timeline({ paused: true })

    tl.to(firstWrapper, {
      width: firstWidth,
      duration: 0.45,
      ease: 'back.out(1.4)',
    }, 0)
    .to(lastWrapper, {
      width: lastWidth,
      duration: 0.45,
      ease: 'back.out(1.4)',
    }, 0.08)
    .to(container, {
      y: -1,
      duration: 0.3,
      ease: 'power2.out',
    }, 0)

    timelineRef.current = tl

    container.addEventListener('mouseenter', handleEnter)
    container.addEventListener('mouseleave', handleLeave)

    return () => {
      container.removeEventListener('mouseenter', handleEnter)
      container.removeEventListener('mouseleave', handleLeave)
      tl.kill()
    }
  }, [darkMode, handleEnter, handleLeave])

  const colorClass = darkMode ? 'text-white' : 'text-slate-900'

  return (
    <a
      ref={containerRef}
      href="#"
      className={`logo-container relative z-10 flex items-center select-none cursor-pointer ${colorClass} font-anton`}
      style={{
        fontSize: 'clamp(2rem, 4vw, 4rem)',
        lineHeight: 1,
      }}
      aria-label="Rishav Das - Home"
    >
      <span className="font-bold">R</span>
      <span className="first-wrapper" style={{ whiteSpace: 'nowrap' }}>ishav</span>

      <span className="mx-[0.15em]" aria-hidden="true" />

      <span className="font-bold">D</span>
      <span className="last-wrapper" style={{ whiteSpace: 'nowrap' }}>as</span>
    </a>
  )
}
