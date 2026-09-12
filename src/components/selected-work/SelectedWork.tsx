import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

/* ─── Project Data ─────────────────────────────────────────────────── */

interface Project {
  id: string
  name: string
  metric: string
  metricLabel: string
  gradient: string
  accent: string
}

const PROJECTS: Project[] = [
  {
    id: 'aeon',
    name: 'AEON',
    metric: '3×',
    metricLabel: 'ENGAGEMENT',
    gradient: 'linear-gradient(135deg, #0c1445 0%, #1a237e 45%, #283593 100%)',
    accent: '#8b9cf0',
  },
  {
    id: 'cardcompass',
    name: 'CARDCOMPASS',
    metric: '60%',
    metricLabel: 'MORE LEADS',
    gradient: 'linear-gradient(135deg, #0d3b3b 0%, #00695c 45%, #00897b 100%)',
    accent: '#5fd3c3',
  },
  {
    id: 'rivo',
    name: 'RIVO',
    metric: '2.5×',
    metricLabel: 'RETENTION',
    gradient: 'linear-gradient(135deg, #1a2e1a 0%, #2e7d32 45%, #388e3c 100%)',
    accent: '#7fd484',
  },
  {
    id: 'storelyft',
    name: 'STORELYFT',
    metric: '40%',
    metricLabel: 'FASTER',
    gradient: 'linear-gradient(135deg, #3e2723 0%, #bf360c 45%, #e64a19 100%)',
    accent: '#ff9d7a',
  },
  {
    id: 'tanish',
    name: 'TANISH',
    metric: '5×',
    metricLabel: 'CONVERSIONS',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #4a148c 45%, #6a1b9a 100%)',
    accent: '#dba8ec',
  },
]

/* ─── Card Faces (CSS mockups, no imagery) ─────────────────────────── */

const FACE = {
  front: { position: 'absolute', inset: 0, backfaceVisibility: 'hidden' } as const,
  back: { position: 'absolute', inset: 0, transform: 'rotateX(180deg)' } as const,
}

function SmallMockup({ project }: { project: Project }) {
  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden flex flex-col"
      style={{
        background: '#111214',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: `0 24px 70px -18px ${project.accent}35, 0 4px 18px rgba(0,0,0,0.55)`,
      }}
    >
      <div className="flex items-center gap-1 px-2.5 pt-2.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#28c840' }} />
      </div>
      <div
        className="flex-1 m-2 mt-2 rounded-lg p-2.5 flex flex-col justify-end"
        style={{ background: project.gradient }}
      >
        <div className="h-1 rounded-full mb-1" style={{ width: '70%', background: `${project.accent}60` }} />
        <div className="h-1 rounded-full mb-1" style={{ width: '45%', background: `${project.accent}35` }} />
        <div className="h-1 rounded-full" style={{ width: '58%', background: `${project.accent}45` }} />
      </div>
    </div>
  )
}

function SmallBack({ project }: { project: Project }) {
  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden relative"
      style={{
        background: project.gradient,
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: `0 24px 70px -18px ${project.accent}45, 0 4px 18px rgba(0,0,0,0.55)`,
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: '75%',
          aspectRatio: '1/1',
          left: '12%',
          top: '-14%',
          background: `radial-gradient(circle, ${project.accent}60 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '52%',
          aspectRatio: '1/1',
          right: '-10%',
          bottom: '-16%',
          border: `2px solid ${project.accent}55`,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '16%',
          aspectRatio: '1/1',
          left: '14%',
          bottom: '12%',
          background: `${project.accent}70`,
        }}
      />
    </div>
  )
}

function MainIndexCard({ rowRefs }: { rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]> }) {
  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: '#101012',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 40px 120px -30px rgba(0,0,0,0.9), 0 0 1px rgba(255,255,255,0.15)',
      }}
    >
      <div className="flex items-center gap-2 px-5 md:px-8 pt-5 md:pt-7">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
        <span
          className="ml-3 text-[10px] md:text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-display)', color: '#6B7280' }}
        >
          Selected Work
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-center px-5 md:px-8 py-4">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => {
              rowRefs.current[i] = el
            }}
            className="flex items-baseline justify-between gap-4 py-1.5 md:py-2 transition-opacity duration-200"
            style={{ borderBottom: i < PROJECTS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
          >
            <span
              className="text-[clamp(1.05rem,2.8vw,1.9rem)] leading-none tracking-tight whitespace-nowrap"
              style={{ fontFamily: 'var(--font-anton)', color: '#F5F5F5' }}
            >
              {p.name}
            </span>
            <span
              className="text-[10px] md:text-xs tracking-[0.25em] uppercase whitespace-nowrap"
              style={{ fontFamily: 'var(--font-display)', color: p.accent }}
            >
              {p.metric} {p.metricLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MainBack() {
  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden relative flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #0c0c0e 0%, #1c1c22 50%, #0c0c0e 100%)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 40px 120px -30px rgba(0,0,0,0.9), 0 0 1px rgba(255,255,255,0.15)',
        color: '#F5F5F5',
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: '44%',
          aspectRatio: '1/1',
          border: '1px solid rgba(255,255,255,0.14)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '30%',
          aspectRatio: '1/1',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        }}
      />
      <svg viewBox="0 0 64 64" fill="none" className="w-[16%] h-[16%] relative">
        <path d="M38 4L12 36h16L22 60l30-34H36L48 4H38z" fill="currentColor" opacity="0.9" />
      </svg>
    </div>
  )
}

/* ─── 3D Choreography ──────────────────────────────────────────────── */
/* Mirrors the reference curves: space dolly [4,1,4], cluster somersault
   rotateX [0,180,360] on two nested wrappers, cards converge to center
   mid-flight (behind the front main frame) then re-scatter. Main frame
   stays IN FRONT at translateZ(150px), scale [.5,1.5,.5]. */

interface Pose { x: number; y: number; z: number; s: number; o: number }
interface Trip { start: Pose; mid: Pose; end: Pose }

const DESKTOP: Record<string, Trip> = {
  aeon: { start: { x: -330, y: -110, z: -26, s: 1, o: 1 },    mid: { x: -310, y: -150, z: -60, s: 1, o: 1 },   end: { x: -120, y: -100, z: -40, s: 1, o: 1 } },
  cc:   { start: { x: 250, y: -110, z: -20, s: 1, o: 1 },     mid: { x: 310, y: -150, z: -65, s: 1, o: 1 },   end: { x: 134, y: 51, z: -45, s: 1, o: 1 } },
  rivo: { start: { x: -325, y: 35, z: -19, s: 1, o: 1 },      mid: { x: -340, y: 110, z: -70, s: 1, o: 1 },   end: { x: -100, y: 110, z: -50, s: 1, o: 1 } },
  sl:   { start: { x: -241, y: 120, z: 20, s: 1, o: 1 },      mid: { x: 340, y: 120, z: -75, s: 1, o: 1 },    end: { x: 110, y: -60, z: -55, s: 1, o: 1 } },
  tn:   { start: { x: 234, y: 56, z: 45, s: 1, o: 1 },        mid: { x: -140, y: 230, z: -80, s: 1, o: 1 },   end: { x: -66, y: -118, z: -60, s: 1, o: 1 } },
  main: { start: { x: 0, y: 0, z: 150, s: 0.5, o: 1 },        mid: { x: 0, y: 0, z: 150, s: 1.5, o: 1 },      end: { x: 0, y: 0, z: 150, s: 0.5, o: 1 } },
}

const MOBILE: Record<string, Trip> = {
  aeon: { start: { x: -110, y: -260, z: -20, s: 0.8, o: 1 },  mid: { x: -150, y: -120, z: -50, s: 0.8, o: 1 }, end: { x: -90, y: -110, z: -40, s: 0.8, o: 1 } },
  cc:   { start: { x: 110, y: -260, z: -20, s: 0.8, o: 1 },   mid: { x: 150, y: -120, z: -52, s: 0.8, o: 1 },  end: { x: 90, y: -110, z: -40, s: 0.8, o: 1 } },
  rivo: { start: { x: -125, y: 270, z: -10, s: 0.8, o: 1 },   mid: { x: -160, y: 130, z: -54, s: 0.8, o: 1 },  end: { x: -95, y: 120, z: -35, s: 0.8, o: 1 } },
  sl:   { start: { x: 125, y: 270, z: 10, s: 0.8, o: 1 },     mid: { x: 160, y: 130, z: -56, s: 0.8, o: 1 },   end: { x: 95, y: 120, z: -35, s: 0.8, o: 1 } },
  tn:   { start: { x: 0, y: 300, z: 30, s: 0.75, o: 1 },      mid: { x: -100, y: 200, z: -60, s: 0.75, o: 1 },  end: { x: -50, y: 140, z: -50, s: 0.75, o: 1 } },
  main: { start: { x: 0, y: 0, z: 150, s: 0.5, o: 1 },        mid: { x: 0, y: 0, z: 150, s: 1.25, o: 1 },     end: { x: 0, y: 0, z: 150, s: 0.5, o: 1 } },
}

const CARD_IDS = ['aeon', 'cc', 'rivo', 'sl', 'tn', 'main']

/* ─── Main Component ───────────────────────────────────────────────── */

export default function SelectedWork({ darkMode = true }: { darkMode?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const spaceRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<Record<string, HTMLDivElement>>({})
  const reduced = useReducedMotion()

  const setCardRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) cardRefs.current[id] = el
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrap = wrapRef.current
      const space = spaceRef.current
      const outer = outerRef.current
      const inner = innerRef.current
      if (!wrap || !space || !outer || !inner) return

      const highlight = (p: number) => {
        const idx = Math.min(4, Math.floor(p * 5))
        rowRefs.current.forEach((row, i) => {
          if (!row) return
          row.style.opacity = i === idx ? '1' : '0.35'
        })
      }

      const table = window.innerWidth < 768 ? MOBILE : DESKTOP

      if (reduced) {
        gsap.set(space, { scale: 1 })
        gsap.set([outer, inner], { rotationX: 0 })
        CARD_IDS.forEach((id) => {
          const el = cardRefs.current[id]
          if (!el) return
          const m = table[id].mid
          const s = id === 'main' ? 1 : m.s
          gsap.set(el, { x: m.x, y: m.y, z: m.z, scale: s, opacity: m.o })
        })
        highlight(0.4)
        return
      }

      const mm = gsap.matchMedia()
      const build = (trip: Record<string, Trip>, dolly: { from: number; to: number }) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            onUpdate: (self) => highlight(self.progress),
          },
        })
        // Container dolly: reference scale [4,1,4] desktop / [2.5,1,4] mobile
        tl.fromTo(space, { scale: dolly.from }, { scale: 1, ease: 'none', duration: 1 }, 0)
        tl.to(space, { scale: dolly.to, ease: 'none', duration: 1 }, 1)
        // Somersault: single full flip rotateX [0,180,360] on inner wrapper
        gsap.set(outer, { rotationX: 0 })
        tl.fromTo(inner, { rotationX: 0 }, { rotationX: 180, ease: 'none', duration: 1 }, 0)
        tl.to(inner, { rotationX: 360, ease: 'none', duration: 1 }, 1)
        // Cards: scatter -> converge (mid) -> re-scatter (end)
        CARD_IDS.forEach((id) => {
          const el = cardRefs.current[id]
          if (!el) return
          const t = trip[id]
          tl.fromTo(
            el,
            { x: t.start.x, y: t.start.y, z: t.start.z, scale: t.start.s, opacity: t.start.o },
            { x: t.mid.x, y: t.mid.y, z: t.mid.z, scale: t.mid.s, opacity: t.mid.o, ease: 'none', duration: 1 },
            0
          )
          tl.to(
            el,
            { x: t.end.x, y: t.end.y, z: t.end.z, scale: t.end.s, opacity: t.end.o, ease: 'none', duration: 1 },
            1
          )
        })
        return tl
      }

      mm.add('(min-width: 768px)', () => build(DESKTOP, { from: 4, to: 4 }))
      mm.add('(max-width: 767px)', () => build(MOBILE, { from: 2.5, to: 4 }))
      highlight(0)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative transition-colors duration-300"
      style={{ background: darkMode ? '#050505' : '#FAFAFA' }}
    >
      {/* Scroll track — sticky stage pins while track scrolls */}
      <div ref={wrapRef} className="relative" style={{ height: '320vh' }}>
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ perspective: '800px' }}
        >
          {/* 3D space */}
          <div
            ref={spaceRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <div
              ref={outerRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <div
                ref={innerRef}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                {/* Small cards — double-sided for the mid-flip reveal */}
                <div ref={setCardRef('aeon')} className="absolute will-change-transform" style={{ width: 'min(200px,46vw)', aspectRatio: '4/3', transformStyle: 'preserve-3d' }}>
                  <div style={FACE.front}><SmallMockup project={PROJECTS[0]} /></div>
                  <div style={FACE.back}><SmallBack project={PROJECTS[0]} /></div>
                </div>
                <div ref={setCardRef('cc')} className="absolute will-change-transform" style={{ width: 'min(134px,30vw)', aspectRatio: '3/4', transformStyle: 'preserve-3d' }}>
                  <div style={FACE.front}><SmallMockup project={PROJECTS[1]} /></div>
                  <div style={FACE.back}><SmallBack project={PROJECTS[1]} /></div>
                </div>
                <div ref={setCardRef('rivo')} className="absolute will-change-transform" style={{ width: 'min(134px,30vw)', aspectRatio: '3/4', transformStyle: 'preserve-3d' }}>
                  <div style={FACE.front}><SmallMockup project={PROJECTS[2]} /></div>
                  <div style={FACE.back}><SmallBack project={PROJECTS[2]} /></div>
                </div>
                <div ref={setCardRef('sl')} className="absolute will-change-transform" style={{ width: 'min(124px,29vw)', aspectRatio: '3/4', transformStyle: 'preserve-3d' }}>
                  <div style={FACE.front}><SmallMockup project={PROJECTS[3]} /></div>
                  <div style={FACE.back}><SmallBack project={PROJECTS[3]} /></div>
                </div>
                <div ref={setCardRef('tn')} className="absolute will-change-transform" style={{ width: 'min(176px,41vw)', aspectRatio: '3/2', transformStyle: 'preserve-3d' }}>
                  <div style={FACE.front}><SmallMockup project={PROJECTS[4]} /></div>
                  <div style={FACE.back}><SmallBack project={PROJECTS[4]} /></div>
                </div>
                {/* Main frame — stays IN FRONT at translateZ(150px) */}
                <div
                  ref={setCardRef('main')}
                  className="absolute will-change-transform"
                  style={{ width: 'min(560px,64vw)', aspectRatio: '16/10', transformStyle: 'preserve-3d' }}
                >
                  <div style={FACE.front}><MainIndexCard rowRefs={rowRefs} /></div>
                  <div style={FACE.back}><MainBack /></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
