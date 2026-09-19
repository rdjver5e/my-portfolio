import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const F = 'var(--font-display)'
const ACCENT = '#9CA3AF'

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

const U = (id: string) => `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop&fm=webp`

interface Stop {
  n: string
  year: string
  title: string
  role: string
  text: string
  tags: string[]
  img: string
  accent: string
}

const STOPS: Stop[] = [
  {
    n: '01',
    year: 'Jul – Aug 2024',
    title: 'Developer',
    role: 'GrapplTech — Internship',
    text: '',
    tags: [] as string[],
    img: U('photo-1522071820081-009f0129c71c'),
    accent: '#8b5cf6',
  },
  {
    n: '02',
    year: 'Sep – Dec 2025',
    title: 'Frontend Developer',
    role: 'Remedio Technologies',
    text: '',
    tags: [] as string[],
    img: U('photo-1553877522-43269d4ea984'),
    accent: '#f59e0b',
  },
  {
    n: '03',
    year: 'Feb 2026 – Present',
    title: 'Visual Web Developer',
    role: 'CoinedOne',
    text: '',
    tags: [] as string[],
    img: U('photo-1558655146-9f40138edfeb'),
    accent: '#ec4899',
  },
]

export default function Experience({ darkMode = true }: { darkMode?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const bg = darkMode ? '#0A0A0A' : '#FAFAFA'
  const ink = darkMode ? '#F5F5F5' : '#0A0A0A'
  const muted = darkMode ? '#9CA3AF' : '#6B7280'
  const faint = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'

  useEffect(() => {
    if (reduced) return
    const stage = stageRef.current
    const track = trackRef.current
    if (!stage || !track) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]')
      const nums = gsap.utils.toArray<HTMLElement>('[data-num]')

      gsap.set(track, { x: 0 })
      gsap.set(panels, { opacity: 0.35, scale: 0.97 })
      gsap.set(nums, { opacity: 0.06 })

      const total = track.scrollWidth - stage.clientWidth
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: `+=${STOPS.length * 90}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(track, { x: -total, duration: STOPS.length, ease: 'none' }, 0)

      panels.forEach((p, i) => {
        const at = (i / STOPS.length) * STOPS.length * 0.85
        tl.to(p, { opacity: 1, scale: 1, duration: 0.7 }, at)
        tl.to(nums[i], { opacity: 0.11, duration: 0.5 }, at)
        if (i > 0) {
          tl.to(panels[i - 1], { opacity: 0, x: -40, duration: 0.5 }, at + 0.55)
        }
      })
    }, stage)

    return () => ctx.revert()
  }, [reduced])

  if (reduced) {
    return (
      <section id="experience" className="relative px-6 py-24" style={{ background: bg }}>
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6">
          {STOPS.map((s) => (
            <div key={s.n} className="rounded-[28px] overflow-hidden p-7" style={{ background: darkMode ? '#111113' : '#fff', border: `1px solid ${faint}` }}>
              <p className="text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: F, color: ACCENT }}>{s.year}</p>
              <p className="mt-2 text-xl font-semibold" style={{ fontFamily: F, color: ink }}>{s.title}</p>
              <p className="mt-1 text-sm" style={{ fontFamily: F, color: muted }}>{s.role}</p>
              {s.text ? <p className="mt-3 text-sm" style={{ color: muted }}>{s.text}</p> : null}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(139,92,246,0.07), transparent 60%)' }} />
      </div>

      <div ref={stageRef} className="relative h-screen min-h-[680px] overflow-hidden" style={{ background: bg }}>
        <div className="absolute left-0 right-0 top-0 z-20" style={{ background: bg }}>
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 py-8">
            <div>
              <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-light leading-none tracking-[-0.02em]" style={{ fontFamily: F, color: ink }}>
                The road, <span className="font-semibold">so far.</span>
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: F, color: muted }}>
              <span>Scroll to travel →</span>
              <span className="h-px w-12" style={{ background: faint }} />
            </div>
          </div>
        </div>

        <div ref={trackRef} className="absolute top-[22%] md:top-[18%] bottom-[6%] flex gap-6 md:gap-8 px-6 md:px-10 will-change-transform" style={{ background: bg }}>
          {STOPS.map((s) => (
            <div
              key={s.n}
              data-panel
              className="relative h-full shrink-0 w-[84vw] md:w-[560px] lg:w-[620px] overflow-hidden rounded-[32px] p-7 md:p-8 flex flex-col justify-center"
              style={{ background: darkMode ? '#0F0F12' : '#fff', border: `1px solid ${faint}` }}
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(600px 400px at 75% 15%, ${s.accent}18, transparent 70%)` }} />
              <div className="relative">
                <span className="inline-flex rounded-full px-3 py-1 text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: F, color: muted, background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border: `1px solid ${faint}` }}>{s.year}</span>
                <h3 className="mt-6 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-[0.95] tracking-[-0.02em]" style={{ fontFamily: F, color: ink }}>{s.title}</h3>
                <p className="mt-2 text-[13px] tracking-wide" style={{ fontFamily: F, color: muted }}>{s.role}</p>
              </div>
            </div>
          ))}

          <div className="relative h-full shrink-0 w-[84vw] md:w-[460px] overflow-hidden rounded-[32px] flex flex-col justify-center p-8 md:p-10" style={{ background: darkMode ? '#111113' : '#fff', border: `1px solid ${faint}` }}>
            <p className="text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: F, color: muted }}>Next</p>
            <p className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[0.9] tracking-[-0.02em]" style={{ fontFamily: F, color: ink }}>Your project<br />is the next<br />panel.</p>
            <p className="mt-4 text-[14px] leading-[1.6]" style={{ fontFamily: F, color: muted }}>If this wall felt intentional, imagine what we build together.</p>
            <a href="#contact" data-tablet="btn-sm" className="mt-7 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase" style={{ background: ink, color: bg }}>Start a project →</a>
          </div>
        </div>


      </div>
    </section>
  )
}
