import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const roles = ['Frontend Developer', 'Motion Designer', 'Creative Frontend Engineer']

export default function Hero({ darkMode }: { darkMode: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const greetingRef = useRef<HTMLParagraphElement>(null)
  const nameLine1Ref = useRef<HTMLHeadingElement>(null)
  const nameLine2Ref = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const ctaGroupRef = useRef<HTMLDivElement>(null)
  const rolesContainerRef = useRef<HTMLDivElement>(null)
  const rolesTrackRef = useRef<HTMLDivElement>(null)

  const [activeRole, setActiveRole] = useState(0)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mq.matches
    const handler = (e: MediaQueryListEvent) => { prefersReducedMotion.current = e.matches }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Rotating roles
  useEffect(() => {
    if (prefersReducedMotion.current) return
    const interval = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // GSAP animations
  useEffect(() => {
    const reducedMotion = prefersReducedMotion.current
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.2,
      })

      if (reducedMotion) {
        gsap.set([greetingRef.current, nameLine1Ref.current, nameLine2Ref.current, taglineRef.current, rolesTrackRef.current, ctaGroupRef.current], { opacity: 1, y: 0, clipPath: 'none' })
      } else {
        // Greeting
        tl.fromTo(greetingRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6 },
          0
        )

        // RISHAV — clip-path reveal from bottom
        tl.fromTo(nameLine1Ref.current,
          { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power4.out' },
          0.15
        )

        // DAS — clip-path reveal from right
        tl.fromTo(nameLine2Ref.current,
          { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut' },
          0.4
        )

        // Tagline — clip-path reveal from left
        tl.fromTo(taglineRef.current,
          { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut' },
          0.8
        )

        // Roles track
        tl.fromTo(rolesTrackRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.95
        )

        // CTA group
        tl.fromTo(ctaGroupRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          1.05
        )

        // ScrollTrigger — parallax on scroll
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '80% top',
          scrub: 1.5,
          onUpdate: (self) => {
            const p = self.progress
            const nameScale = 1 - p * 0.15

            gsap.set(nameLine1Ref.current, { scale: nameScale })
            gsap.set(nameLine2Ref.current, { scale: nameScale })
            gsap.set(greetingRef.current, { opacity: 1 - p * 2 })
            gsap.set(taglineRef.current, { opacity: 1 - p * 1.8 })
            gsap.set(rolesTrackRef.current, { opacity: 1 - p * 2 })
            gsap.set(ctaGroupRef.current, { opacity: 1 - p * 2.2 })
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Hero — introduction"
      className={`relative min-h-[100dvh] min-h-screen flex flex-col justify-center overflow-x-clip overflow-y-visible transition-colors duration-300 ${darkMode ? 'bg-[#0A0A0A]' : 'bg-white'} pb-10 md:pb-16`}
    >
      {/* ========== MOBILE ONLY — EXACT IMAGE LAYOUT (visible equal gutters, centered 320-430) ========== */}
      <div className="flex md:hidden relative z-10 w-full flex-col min-h-[100svh] min-h-[100dvh] px-8 pt-[8.5rem] pb-10 overflow-x-clip">
        <div className="w-full max-w-[320px] mx-auto flex flex-col">
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-display text-[15px] tracking-[0.22em] uppercase" style={{ color: '#9CA3AF' }}>
          HELLO, I&apos;M
        </motion.p>

        {/* Overlapping name — fitted so equal space remains on both sides */}
        <div className="mt-2 relative w-full">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.16,1,0.3,1], delay: 0.16 }} className="relative z-10 font-anton leading-[0.85] tracking-[-0.01em] whitespace-nowrap text-[6.5rem]" style={{ color: '#FFFFFF' }}>
            RISHAV
          </motion.h1>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.16,1,0.3,1], delay: 0.26 }} className="relative z-0 font-anton leading-[0.85] tracking-[-0.01em] whitespace-nowrap text-[6.2rem] mt-[-0.22em] ml-[140px]" style={{ color: 'transparent', WebkitTextStroke: '1.2px rgba(255,255,255,0.38)' }}>
            DAS
          </motion.h1>
        </div>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }} className="mt-6 font-display whitespace-nowrap text-[clamp(15px,4.6vw,19px)] leading-[1.5] tracking-[-0.01em]" style={{ color: '#FFFFFF' }}>
          Crafting interfaces <span className="font-medium" style={{ color: '#FFFFFF' }}>people remember.</span>
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.48 }} className="mt-5 flex items-center" aria-live="polite" aria-atomic="true">
          <span className="font-display text-[17px] font-normal tracking-[0.01em] transition-colors duration-300" style={{ color: '#E8EAED' }}>{roles[activeRole]}</span>
        </motion.div>
        </div>

        {/* Centered CTA stack — exactly like reference */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.56 }} className="mt-10 flex w-full max-w-[320px] mx-auto flex-col items-center gap-3">
          <a href="#projects" aria-label="View projects" className="group relative inline-flex w-[248px] items-center justify-around gap-4 h-[56px] pl-8 pr-3 rounded-full bg-white overflow-hidden">
            <span className="font-display font-medium text-[17px] text-[#0A0A0A] relative z-10">Let&apos;s Connect</span>
            <span className="relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-[-35deg]" style={{ background: '#0B1023' }}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7m10 0v10" /></svg>
            </span>
            <span className="absolute inset-0 bg-[#8B5CF6] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" aria-hidden="true" />
          </a>
          <span className="inline-flex items-center gap-2.5">
            <span className="flex items-center justify-center h-4 w-4 rounded-full border border-[#43fa47]"><span className="h-2 w-2 rounded-full bg-[#43fa47]"></span></span>
            <span className="font-display text-[13px] font-normal tracking-[0.04em]" style={{ color: '#B9BDC2' }}>Available for work</span>
          </span>
        </motion.div>
      </div>

      {/* ========== DESKTOP / TABLET — original hero (hidden on mobile) ========== */}
      <div className="hidden md:block relative z-10 w-full max-w-[1200px] md:max-w-[860px] lg:max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 mt-12 pb-6 overflow-x-clip">
        {/* Greeting */}
        <p
          ref={greetingRef}
          className={`font-display text-[clamp(1.25rem,2.5vw,2.25rem)] font-light tracking-tight mb-2 opacity-0 transition-colors duration-300 ${darkMode ? 'text-[#F5F5F5]' : 'text-slate-900'}`}
        >
          Hello, I'm
        </p>

        {/* Name composition — RISHAV + DAS */}
        <div className="relative overflow-x-clip">
          {/* RISHAV — dominant anchor */}
          <h1
            ref={nameLine1Ref}
            className={`relative z-10 font-anton leading-[0.82] tracking-[-0.01em] text-[clamp(3.5rem,22vw,25rem)] sm:text-[clamp(4rem,25vw,25rem)] whitespace-nowrap opacity-0 transition-colors duration-300 ${darkMode ? 'text-[#F5F5F5]' : 'text-slate-900'}`}
          >
            RISHAV
          </h1>

          {/* DAS — oversized outlined, overlaps lower-right, extends past viewport */}
          <h1
            ref={nameLine2Ref}
            className="font-anton leading-[0.82] tracking-[-0.01em] text-[clamp(3.5rem,20vw,22rem)] sm:text-[clamp(5rem,22vw,22rem)] whitespace-nowrap opacity-0 absolute left-[52%] sm:left-[53%] top-[77%] z-10"
            style={{
              color: 'transparent',
              WebkitTextStroke: darkMode ? '1.5px rgba(255,255,255,0.3)' : '1.5px rgba(0,0,0,0.15)',
            }}
          >
            DAS
          </h1>


        </div>

        {/* Tagline — 32-36px */}
        <div
          ref={taglineRef}
          className="flex items-start gap-4 mt-2 mb-4 opacity-0"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <p className={`font-display text-[clamp(1.5rem,2.2vw,2.25rem)] font-normal leading-[1.4] transition-colors duration-300 ${darkMode ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
            <span className="lg:hidden">Crafting interfaces<br />people </span>
            <span className="hidden lg:inline">Crafting interfaces people<br /></span>
            <span className="text-[#9CA3AF]">remember</span>.
          </p>
        </div>

        {/* Roles — rotating highlight */}
        <div
          ref={rolesContainerRef}
          className="mb-6"
          aria-label="Roles"
        >
          <div ref={rolesTrackRef} className="flex flex-col gap-1" aria-live="polite" aria-atomic="true">
            {roles.map((role, index) => (
              <span
                key={role}
                aria-hidden={activeRole !== index}
                className={`block h-[1.6em] leading-[1.6] font-display text-[clamp(0.875rem,1.25vw,1.125rem)] transition-all duration-500 ${
                  activeRole === index
                    ? darkMode
                      ? 'text-white'
                      : 'text-slate-900'
                    : darkMode
                      ? 'text-[#6B7280]/40'
                      : 'text-slate-400/40'
                }`}
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Action row — CTA + Availability */}
        <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 opacity-0">
          <a
            href="#projects"
            aria-label="View projects"
            data-tablet="btn-lg"
            className={`group relative inline-flex items-center gap-2 sm:gap-3 h-12 sm:h-14 md:h-16 px-6 sm:px-7 md:px-9 rounded-full bg-white font-display font-medium text-[15px] sm:text-[16px] md:text-[20px] overflow-hidden ${
              darkMode ? 'border border-white/20' : 'border border-slate-300'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              <span className="text-slate-900 group-hover:text-white transition-colors duration-300">Let's Connect</span>
              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-900 group-hover:border-white transition-all duration-300 group-hover:rotate-[-45deg]">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-900 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </span>
            <span className="absolute inset-0 bg-[#8B5CF6] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          </a>

          <div data-tablet="avail" className={`flex items-center gap-2 sm:gap-2.5 font-display text-[14px] sm:text-[15px] md:text-[20px] font-medium tracking-[0.04em] transition-colors duration-300 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            <span className="flex items-center justify-center h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border border-[#43fa47]">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#43fa47]" />
            </span>
            Available for work
          </div>
        </div>
      </div>

    </section>
  )
}
