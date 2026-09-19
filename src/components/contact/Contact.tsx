import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const F = 'var(--font-display)'
const ANTON = 'var(--font-anton)'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return reduced
}

export default function Contact({ darkMode = true }: { darkMode?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.set(wrapRef.current, { y: 40, opacity: 0 })
      gsap.set([headlineRef.current, subRef.current, ctaRef.current, socialsRef.current], { opacity: 0, y: 16 })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
      })
      tl.to(wrapRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35')
        .to(socialsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  // Apple Dock magnification — 1.55x + 14px lift, smooth in/out
  useEffect(() => {
    const dock = dockRef.current
    if (!dock) return
    // wait for icons to mount
    const getIcons = () => iconRefs.current.filter(Boolean) as HTMLAnchorElement[]
    if (getIcons().length === 0) {
      const id = setTimeout(() => {
        // retry once after mount
        if (getIcons().length === 0) return
      }, 100)
      return () => clearTimeout(id)
    }
    const onMove = (e: MouseEvent) => {
      const dockRect = dock.getBoundingClientRect()
      const mouseX = e.clientX - dockRect.left
      getIcons().forEach((el) => {
        // stable center without scale feedback
        const centerX = el.offsetLeft + el.offsetWidth / 2
        const dist = Math.abs(mouseX - centerX)
        const maxDist = 160
        const t = Math.max(0, 1 - dist / maxDist)
        // smooth curve like macOS — ease out
        const curved = t * t * (3 - 2 * t)
        const scale = 1 + curved * 0.55
        const y = -curved * 14
        gsap.to(el, { scale, y, duration: 0.32, ease: 'power3.out', transformOrigin: 'center bottom' })
      })
    }
    const onLeave = () => {
      getIcons().forEach((el) => gsap.to(el, { scale: 1, y: 0, duration: 0.45, ease: 'power3.out' }))
    }
    dock.addEventListener('mousemove', onMove)
    dock.addEventListener('mouseleave', onLeave)
    // also handle touch for mobile
    dock.addEventListener('touchmove', (ev) => {
      const touch = (ev as TouchEvent).touches[0]
      if (!touch) return
      onMove({ clientX: touch.clientX } as any)
    })
    return () => {
      dock.removeEventListener('mousemove', onMove)
      dock.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const bg = darkMode ? '#0A0A0A' : '#F5F5F5'
  const ink = darkMode ? '#F5F5F5' : '#131313'
  const muted = darkMode ? 'rgba(245,245,245,0.5)' : 'rgba(19,19,19,0.45)'
  const hairline = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(19,19,19,0.08)'

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden transition-colors duration-300" style={{ background: bg }}>
      <div ref={wrapRef} className="relative mx-auto max-w-[880px] px-6 md:px-8 pt-20 md:pt-28 pb-14 md:pb-20 text-center">
        {/* label */}
        <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: F, color: muted }}>
          That&apos;s a wrap? Maybe not.
        </p>

        {/* headline — minimalist, no star, pure type */}
        <h2
          ref={headlineRef}
          className="mx-auto mt-6 max-w-[720px] text-[clamp(2.6rem,7vw,4.8rem)] font-[500] leading-[0.95] tracking-[-0.03em] opacity-0"
          style={{ fontFamily: ANTON, color: ink }}
        >
          Let&apos;s build
          <br />
          <span className="font-light italic" style={{ fontFamily: 'Georgia, serif', fontWeight: 300, letterSpacing: '-0.03em' }}>
            something
          </span>{' '}
          memorable
        </h2>

        {/* sub — with emojis */}
        <p
          ref={subRef}
          className="mx-auto mt-6 max-w-[560px] text-[15px] leading-[1.7] opacity-0 md:text-[17px]"
          style={{ fontFamily: F, color: muted, whiteSpace: 'pre-wrap' }}
        >
          Open to&nbsp;&nbsp;<span className="text-[1.25em] align-middle" style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.45)) drop-shadow(0 0 14px rgba(139,92,246,0.25))' }}>💻</span> frontend & React, <span className="text-[1.25em] align-middle" style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.45)) drop-shadow(0 0 14px rgba(139,92,246,0.25))' }}>🎨</span> UI/UX & Framer, <span className="text-[1.25em] align-middle" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.45)) drop-shadow(0 0 16px rgba(139,92,246,0.3))' }}>✨</span> motion & GSAP or just a&nbsp;&nbsp;<span className="text-[1.25em] align-middle" style={{ filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.4)) drop-shadow(0 0 14px rgba(139,92,246,0.2))' }}>☕</span> chat over coffee.
        </p>

        {/* CTA — same as Let's Connect (Hero) */}
        <div className="mt-9 flex flex-col items-center gap-5">
          <a
            ref={ctaRef}
            href="mailto:hello@rdjverse.com"
            aria-label="Contact via email"
            data-tablet="btn-lg"
            className={`group relative inline-flex items-center gap-3 h-16 px-9 rounded-full bg-white font-display font-medium text-[20px] overflow-hidden opacity-0 ${darkMode ? 'border border-white/20' : 'border border-slate-300'}`}
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-slate-900 group-hover:text-white transition-colors duration-300">Let&apos;s Talk</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-900 group-hover:border-white transition-all duration-300 group-hover:rotate-[-45deg]">
                <svg className="w-3.5 h-3.5 text-slate-900 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </span>
            <span className="absolute inset-0 bg-[#8B5CF6] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          </a>
          <p className="text-[12px] tracking-[0.08em]" style={{ fontFamily: F, color: darkMode ? 'rgba(245,245,245,0.72)' : 'rgba(19,19,19,0.62)' }}>
            or connect through
          </p>
        </div>

        {/* socials — Apple Dock magnification, Twitter removed */}
        <div ref={(el) => { (socialsRef as any).current = el; (dockRef as any).current = el }} className="mx-auto mt-8 flex items-end justify-center gap-3 opacity-0 md:gap-4" style={{ paddingBottom: 12 }}>
          {[
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/rdjverse',
              icon: (
                <svg viewBox="0 0 24 24" className="h-[28px] w-[28px]" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.941v5.665H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565z" />
                </svg>
              ),
            },
            {
              label: 'Email',
              href: 'mailto:hello@rdjverse.com',
              icon: (
                <svg viewBox="0 0 24 24" className="h-[28px] w-[28px]" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="M3 7.2l9 6.3 9-6.3" />
                </svg>
              ),
            },
            {
              label: 'GitHub',
              href: 'https://github.com/rdjverse',
              icon: (
                <svg viewBox="0 0 24 24" className="h-[28px] w-[28px]" fill="currentColor" aria-hidden>
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              ),
            },
          ].map((s, i) => (
            <a
              key={s.label}
              ref={(el) => { iconRefs.current[i] = el }}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={s.label}
              className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px] will-change-transform md:h-[60px] md:w-[60px] md:rounded-[17px]"
              style={{
                background: ink,
                color: bg,
                border: `1px solid ${ink}`,
              }}
            >
              <span className="flex h-[28px] w-[28px] items-center justify-center pointer-events-none">{s.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
