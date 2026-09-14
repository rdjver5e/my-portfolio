import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const F = 'var(--font-display)'

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

function useKochiTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date()) + ' IST'
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 60000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Contact({ darkMode = true }: { darkMode?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])
  const emailWrapRef = useRef<HTMLDivElement>(null)
  const magRef = useRef<HTMLAnchorElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const kochiTime = useKochiTime()
  const [copied, setCopied] = useState(false)

  const bg = darkMode ? '#050505' : '#FAFAFA'
  const ink = darkMode ? '#F5F5F5' : '#0A0A0A'
  const muted = darkMode ? '#9CA3AF' : '#6B7280'
  const faint = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@rdjverse.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = 'mailto:hello@rdjverse.com'
    }
  }

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const lines = linesRef.current.filter(Boolean) as HTMLDivElement[]
      gsap.set(lines, { y: 110, clipPath: 'inset(0 0 100% 0)' })
      gsap.set([emailWrapRef.current, metaRef.current, linksRef.current], { opacity: 0, y: 24 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      })
      tl.to(lines, { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.1, stagger: 0.12, ease: 'power4.out' })
      tl.to(emailWrapRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6')
      tl.to(metaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.45')
      tl.to(linksRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')

      gsap.to('[data-contact-parallax]', {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    if (reduced || !magRef.current) return
    const btn = magRef.current
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.35
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.35
      gsap.to(btn, { x: dx, y: dy, duration: 0.6, ease: 'power3.out' })
    }
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' })
    const parent = btn.parentElement
    parent?.addEventListener('mousemove', onMove)
    parent?.addEventListener('mouseleave', onLeave)
    return () => {
      parent?.removeEventListener('mousemove', onMove)
      parent?.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  const headline = [
    { text: "LET'S", outline: false },
    { text: 'MAKE', outline: true },
    { text: 'SOMETHING', outline: false },
    { text: 'MEMORABLE.', outline: false },
  ]

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden" style={{ background: bg }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />
        <div className="absolute -top-32 -right-32 h-[640px] w-[640px] rounded-full blur-[120px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-32 h-[560px] w-[560px] rounded-full blur-[110px] opacity-[0.06]" style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }} />
        <p className="absolute left-1/2 top-[52%] hidden -translate-x-1/2 -translate-y-1/2 select-none text-[min(34vw,560px)] font-black leading-none tracking-[-0.05em] md:block opacity-[0.018]" style={{ fontFamily: 'var(--font-anton)', color: ink }}>CONTACT</p>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12 pt-20 md:pt-28 pb-10">
        <div ref={headRef} className="flex items-center justify-between">
          <p className="text-[11px] tracking-[0.32em] uppercase" style={{ fontFamily: F, color: muted }}>06 — Contact</p>
          <span className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: F, color: muted, border: `1px solid ${faint}` }}>
            <span className="h-2 w-2 rounded-full bg-[#43fa47] shadow-[0_0_12px_rgba(67,250,71,0.6)]" /> Available for new work
          </span>
        </div>

        <div className="mt-8 md:mt-10">
          {headline.map((l, i) => (
            <div key={l.text} ref={(el) => { linesRef.current[i] = el }} className="overflow-hidden">
              <p
                data-contact-parallax
                className="font-black leading-[0.82] tracking-[-0.04em] text-[clamp(3.2rem,12vw,11.5rem)]"
                style={{
                  fontFamily: 'var(--font-anton)',
                  color: l.outline ? 'transparent' : ink,
                  WebkitTextStroke: l.outline ? `1.5px ${ink}` : undefined,
                  WebkitTextStrokeWidth: l.outline ? '1.5px' : undefined,
                }}
              >
                {l.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 items-start">
          <div ref={emailWrapRef} className="relative rounded-[28px] p-7 md:p-8 overflow-hidden" style={{ background: darkMode ? '#0F0F12' : '#fff', border: `1px solid ${faint}` }}>
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[50px] opacity-20" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />
            <p className="text-[11px] tracking-[0.28em] uppercase" style={{ fontFamily: F, color: muted }}>Write me</p>
            <button
              onClick={copyEmail}
              className="mt-3 flex w-full items-center justify-between gap-4 text-left group"
            >
              <span className="text-[clamp(1.25rem,2.6vw,2rem)] font-semibold tracking-[-0.02em] break-all" style={{ fontFamily: F, color: ink }}>
                hello@rdjverse.com
              </span>
              <span className="shrink-0 inline-flex h-10 items-center rounded-full px-4 text-xs font-semibold tracking-[0.14em] uppercase transition-colors" style={{ background: copied ? '#43fa47' : ink, color: copied ? '#0A0A0A' : bg }}>
                {copied ? 'Copied ✓' : 'Copy'}
              </span>
            </button>
            <div className="mt-3 flex items-center gap-2 text-xs" style={{ fontFamily: F, color: muted }}>
              <span>Click to copy</span>
              <span style={{ color: faint }}>·</span>
              <a href="mailto:hello@rdjverse.com" className="underline decoration-white/20 underline-offset-4 hover:decoration-white/40">or open mail →</a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                ref={magRef}
                href="mailto:hello@rdjverse.com"
                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[13px] font-semibold tracking-[0.16em] uppercase text-black will-change-transform"
              >
                Start a project
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">→</span>
              </a>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs" style={{ fontFamily: F, color: muted, border: `1px solid ${faint}` }}>
                <span className="h-2 w-2 rounded-full bg-[#43fa47] animate-pulse" /> Response &lt; 24h
              </span>
            </div>
          </div>

          <div ref={linksRef} className="flex flex-col">
            {[
              { label: 'GitHub', href: 'https://github.com/rdjverse', note: '@rdjverse' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/rdjverse', note: 'Let’s connect' },
              { label: 'Twitter / X', href: 'https://twitter.com/rdjverse', note: '@rdjverse' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 border-b py-6 md:py-7"
                style={{ borderColor: faint }}
              >
                <div>
                  <p className="text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold leading-none tracking-[-0.02em] transition-colors" style={{ fontFamily: F, color: ink }}>{l.label}</p>
                  <p className="mt-1 text-xs tracking-wide" style={{ fontFamily: F, color: muted }}>{l.note}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ borderColor: faint, color: muted }}>↗</span>
              </a>
            ))}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full px-3 py-1.5 text-xs" style={{ fontFamily: F, color: muted, background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border: `1px solid ${faint}` }}>Kochi · Remote</span>
              <span className="rounded-full px-3 py-1.5 text-xs" style={{ fontFamily: F, color: muted, background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border: `1px solid ${faint}` }}>{kochiTime}</span>
            </div>
          </div>
        </div>

        <div ref={metaRef} className="mt-12 md:mt-16 flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between" style={{ borderColor: faint }}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs" style={{ fontFamily: F, color: muted }}>
            <span>© 2026 rdjverse</span>
            <span className="hidden md:inline" style={{ color: faint }}>·</span>
            <span>Crafted with intent — no templates</span>
            <span className="hidden md:inline" style={{ color: faint }}>·</span>
            <span>Kochi, India — working worldwide</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="#experience" className="hover:opacity-70" style={{ color: muted }}>Experience</a>
            <a href="#capabilities" className="hover:opacity-70" style={{ color: muted }}>Capabilities</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5" style={{ border: `1px solid ${faint}`, color: muted }}>Back to top ↑</a>
          </div>
        </div>
      </div>
    </section>
  )
}
