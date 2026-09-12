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

/* ─── Shared bits ──────────────────────────────────────────────────── */

const ACCENT = '#9CA3AF'
const F = 'var(--font-display)'

function Kicker({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="text-[10px] tracking-[0.28em] uppercase" style={{ fontFamily: F, color }}>
      {children}
    </span>
  )
}

function useRefArray<T>() {
  const refs = useRef<(T | null)[]>([])
  const set = (i: number) => (el: T | null) => {
    refs.current[i] = el
  }
  return [refs, set] as const
}

function Words({ words, setRef, color }: {
  words: string[]
  setRef: (i: number) => (el: HTMLDivElement | null) => void
  color: string
}) {
  return (
    <div className="relative h-6 text-center" aria-hidden="true">
      {words.map((w, i) => (
        <div
          key={`${w}-${i}`}
          ref={setRef(i)}
          className="absolute inset-0 text-[11px] tracking-[0.32em] uppercase whitespace-nowrap"
          style={{ fontFamily: F, color, opacity: 0 }}
        >
          {w}
        </div>
      ))}
    </div>
  )
}

function fadePhases(tl: gsap.core.Timeline, els: (HTMLDivElement | null)[], dur: number) {
  const list = els.filter((e): e is HTMLDivElement => !!e)
  const seg = dur / list.length
  list.forEach((el, i) => {
    const at = i * seg
    tl.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: seg * 0.4, ease: 'power1.out' }, at)
    if (i < list.length - 1) {
      tl.to(el, { opacity: 0, y: -14, duration: seg * 0.3, ease: 'power1.in' }, at + seg * 0.65)
    }
  })
}

function StageGrid({ darkMode }: { darkMode: boolean }) {
  const line = darkMode ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.045)'
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
      }}
    />
  )
}

function GhostNum({ n, darkMode }: { n: string; darkMode: boolean }) {
  return (
    <div
      className="absolute right-[2vw] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block"
      aria-hidden="true"
      style={{
        fontFamily: 'var(--font-anton)',
        fontSize: 'clamp(12rem,26vw,24rem)',
        lineHeight: 1,
        color: darkMode ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.045)',
      }}
    >
      {n}
    </div>
  )
}

function DemoHead({ index, name, line, textMain, textMuted }: {
  index: string
  name: string
  line: string
  textMain: string
  textMuted: string
}) {
  return (
    <div className="text-center mb-8 md:mb-10 px-6">
      <div className="mb-3">
        <Kicker color={textMuted}>[{index}]&nbsp;&nbsp;{name}</Kicker>
      </div>
      <p
        className="text-[clamp(1.05rem,2.2vw,1.5rem)] font-light tracking-[-0.01em] leading-[1.4] max-w-[46ch] mx-auto"
        style={{ fontFamily: F, color: textMain }}
      >
        {line}
      </p>
    </div>
  )
}

/* ─── 01 DESIGN → BUILD ────────────────────────────────────────────── */
/* Visual demo: wireframe physically becomes a working interface. */

const BUILD_WORDS = ['IDEA', 'LAYOUT', 'INTERACTION', 'WORKING INTERFACE']

const BUILD_ROWS = [
  { w: '82%', r: -2.5, x: -18 },
  { w: '64%', r: 1.8, x: 22 },
  { w: '74%', r: -1.2, x: -10 },
  { w: '56%', r: 2.2, x: 16 },
]

function BuildDemo({ darkMode, reduced }: { darkMode: boolean; reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [rowRefs, setRowRef] = useRefArray<HTMLDivElement>()
  const [capRefs, setCapRef] = useRefArray<HTMLDivElement>()
  const wireRef = useRef<HTMLDivElement>(null)
  const polishRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const textMain = darkMode ? '#F5F5F5' : '#0A0A0A'
  const textMuted = darkMode ? '#6B7280' : '#9CA3AF'
  const line = darkMode ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.14)'

  const rows = BUILD_ROWS

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rowEls = rowRefs.current.filter((e): e is HTMLDivElement => !!e)
      if (!rowEls.length || !rootRef.current) return
      if (reduced) {
        gsap.set(rowEls, { x: 0, rotation: 0 })
        gsap.set(wireRef.current, { opacity: 0 })
        gsap.set(polishRef.current, { opacity: 1, y: 0 })
        gsap.set(glowRef.current, { opacity: 1 })
        gsap.set(capRefs.current[capRefs.current.length - 1], { opacity: 1, y: 0 })
        return
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: '+=180%', pin: true, scrub: 1 },
      })
      tl.fromTo(rowEls,
        { x: (i) => BUILD_ROWS[i].x, rotation: (i) => BUILD_ROWS[i].r },
        { x: 0, rotation: 0, duration: 1, ease: 'power1.inOut' }, 0)
      tl.fromTo(polishRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, ease: 'power1.inOut' }, 1.6)
      tl.to(wireRef.current, { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 2.2)
      tl.fromTo(glowRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power1.out' }, 3)
    }, rootRef)
    return () => ctx.revert()
  }, [reduced, darkMode, line, rowRefs, capRefs])

  return (
    <div ref={rootRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <StageGrid darkMode={darkMode} />
      <GhostNum n="01" darkMode={darkMode} />
      <div className="relative w-[min(520px,84vw)] h-[300px] md:h-[320px] rounded-2xl border border-dashed p-5 md:p-6" style={{ borderColor: line }}>
        <div className="flex items-center gap-1.5 mb-4">
          <span className="w-2 h-2 rounded-full" style={{ background: darkMode ? '#3a3a3f' : '#C9C9D1' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: darkMode ? '#3a3a3f' : '#C9C9D1' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: darkMode ? '#3a3a3f' : '#C9C9D1' }} />
        </div>
        <div
          ref={glowRef}
          className="absolute -inset-10 rounded-[32px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${ACCENT}14 0%, transparent 65%)`, opacity: 0 }}
        />
        {/* Wireframe */}
        <div ref={wireRef} className="absolute inset-x-0 bottom-0 top-14 flex flex-col items-center justify-center gap-3 md:gap-4 px-5 md:px-6">
          {rows.map((r, i) => (
            <div
              key={i}
              ref={setRowRef(i)}
              className="h-12 md:h-14 rounded-lg border border-dashed"
              style={{ width: r.w, borderColor: line, backgroundColor: 'transparent', willChange: 'transform' }}
            />
          ))}
        </div>
        {/* Polished interface */}
        <div ref={polishRef} className="absolute inset-x-0 bottom-0 top-14 flex items-center justify-center px-5 md:px-6" style={{ opacity: 0 }}>
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0d3b3b 0%, #00695c 55%, #00897b 100%)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 30px 80px -20px rgba(0,105,92,0.45)',
            }}
          >
            <div className="flex items-center gap-1.5 px-4 pt-3">
              <span className="w-2 h-2 rounded-full" style={{ background: '#ff5f57' }} />
              <span className="w-2 h-2 rounded-full" style={{ background: '#febc2e' }} />
              <span className="w-2 h-2 rounded-full" style={{ background: '#28c840' }} />
            </div>
            <div className="p-4 md:p-5">
              <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.94)' }}>
                <div className="h-2.5 rounded-full mb-2" style={{ width: '55%', background: '#0d3b3b' }} />
                <div className="h-2 rounded-full mb-3" style={{ width: '80%', background: '#9CA3AF' }} />
                <div className="flex gap-2">
                  <div className="h-7 rounded-full" style={{ width: '34%', background: '#00695c' }} />
                  <div className="h-7 rounded-full" style={{ width: '26%', border: '1px solid #00695c' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── 02 MAKE IT MOVE ──────────────────────────────────────────────── */
/* Interactive: cursor distorts type; a toggle releases full motion. */

function MoveDemo({ darkMode, reduced }: { darkMode: boolean; reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const cursor = useRef({ x: 0, t: 0 })
  const rafRef = useRef(0)
  const [motion, setMotion] = useState(false)
  const motionTl = useRef<gsap.core.Tween | null>(null)

  const textMain = darkMode ? '#F5F5F5' : '#0A0A0A'
  const textMuted = darkMode ? '#6B7280' : '#9CA3AF'
  const word = 'HELLO THERE'

  useEffect(() => {
    const panel = panelRef.current
    if (!panel || reduced) return
    const onMove = (e: PointerEvent) => {
      const rect = panel.getBoundingClientRect()
      cursor.current = { x: e.clientX - rect.left, t: performance.now() }
      gsap.set(orbRef.current, { x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    panel.addEventListener('pointermove', onMove, { passive: true })
    const tick = () => {
      const rect = panel.getBoundingClientRect()
      const spans = letterRefs.current.filter((e): e is HTMLSpanElement => !!e)
      spans.forEach((s, i) => {
        const cx = rect.width * 0.5 + (i - (spans.length - 1) / 2) * (rect.width / spans.length) * 0.72
        const dx = cx - cursor.current.x
        const lift = -26 * Math.exp(-(dx * dx) / (2 * 90 * 90))
        const cur = Number(s.dataset.y || 0)
        const next = cur + (lift - cur) * 0.2
        s.dataset.y = String(next)
        gsap.set(s, { y: next })
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      panel.removeEventListener('pointermove', onMove)
    }
  }, [reduced])

  useEffect(() => {
    const spans = letterRefs.current.filter((e): e is HTMLSpanElement => !!e)
    if (motion && !reduced) {
      motionTl.current = gsap.to(spans, { y: -22, duration: 0.5, stagger: { each: 0.06, yoyo: true, repeat: -1 }, ease: 'sine.inOut' })
    } else {
      motionTl.current?.kill()
      motionTl.current = null
      gsap.to(spans, { y: 0, duration: 0.5, ease: 'power3.out' })
    }
    return () => {
      motionTl.current?.kill()
    }
  }, [motion, reduced])

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden flex flex-col items-center justify-center py-24 md:py-32 px-6">
      <DemoHead index="02" name="MAKE IT MOVE" line="Don't read about motion. Touch it." textMain={textMain} textMuted={textMuted} />
      <div
        ref={panelRef}
        className="relative w-[min(760px,90vw)] h-[46vh] min-h-[320px] rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-crosshair"
        style={{
          background: darkMode ? '#0B0B0D' : '#EFEFF3',
          border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          touchAction: 'pan-y',
        }}
      >
        <div
          ref={orbRef}
          className="absolute w-40 h-40 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ACCENT}30 0%, transparent 70%)`, left: -80, top: -80 }}
        />
        <div className="whitespace-nowrap select-none" aria-label="Hello there">
          {word.split('').map((ch, i) => (
            <span
              key={i}
              ref={(el) => {
                letterRefs.current[i] = el
              }}
              className="inline-block will-change-transform"
              style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(2.4rem,8vw,5.5rem)', color: textMain }}
            >
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>
        <button
          onClick={() => setMotion((m) => !m)}
          className="mt-8 px-6 py-2.5 rounded-full text-[11px] tracking-[0.25em] uppercase transition-all"
          style={{
            fontFamily: F,
            color: motion ? '#0A0A0A' : ACCENT,
            background: motion ? ACCENT : 'transparent',
            border: `1px solid ${ACCENT}66`,
            cursor: 'pointer',
          }}
        >
          [ Explore motion ]
        </button>
      </div>
      <p className="mt-6 text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: F, color: textMuted }}>
        Move your cursor · then scroll
      </p>
    </div>
  )
}

/* ─── 03 FIGURE IT OUT ─────────────────────────────────────────────── */
/* Interactive: eight shouting chips simplify to one clear action. */

const FIGURE_WORDS = ['8 THINGS', '5 THINGS', '3 THINGS', '1 CLEAR ACTION']
const CHIPS = ['OFFER', 'ALERT', 'TIPS', 'AD', 'POLL', 'CHAT', 'NEWS', 'START →']

function FigureDemo({ darkMode, reduced }: { darkMode: boolean; reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [chipRefs, setChipRef] = useRefArray<HTMLDivElement>()
  const [capRefs, setCapRef] = useRefArray<HTMLDivElement>()
  const dead = useRef<Set<number>>(new Set())

  const textMain = darkMode ? '#F5F5F5' : '#0A0A0A'
  const textMuted = darkMode ? '#6B7280' : '#9CA3AF'
  const chipBase = darkMode ? '#1b1b1e' : '#E4E4EA'

  const dismiss = (i: number) => {
    if (i === CHIPS.length - 1 || dead.current.has(i)) return
    dead.current.add(i)
    const el = chipRefs.current[i]
    if (el) gsap.to(el, { scale: 0, opacity: 0, duration: 0.35, ease: 'back.in(1.6)' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chips = chipRefs.current.filter((e): e is HTMLDivElement => !!e)
      if (!chips.length || !rootRef.current) return
      const last = chips[chips.length - 1]
      if (reduced) {
        chips.forEach((el, i) => {
          if (i === chips.length - 1) {
            gsap.set(el, { opacity: 1, scale: 1.3, backgroundColor: ACCENT, color: '#0A0A0A' })
          } else {
            gsap.set(el, { opacity: 0, scale: 0 })
          }
        })
        gsap.set(capRefs.current[capRefs.current.length - 1], { opacity: 1, y: 0 })
        return
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: '+=200%', pin: true, scrub: 1 },
      })
      fadePhases(tl, capRefs.current, 4)
      // 8 → 5 → 3 → 1
      const cut = (idx: number[], at: number) => {
        idx.forEach((i) => {
          if (chips[i]) tl.to(chips[i], { opacity: 0, scale: 0, duration: 0.5, ease: 'power1.in' }, at)
        })
      }
      cut([1, 4, 6], 1)
      cut([0, 5], 2)
      cut([2, 3], 3)
      tl.to(last, { scale: 1.35, backgroundColor: ACCENT, color: '#0A0A0A', duration: 0.6, ease: 'power1.inOut' }, 3.2)
    }, rootRef)
    return () => ctx.revert()
  }, [reduced, darkMode, chipRefs, capRefs])

  return (
    <div ref={rootRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6">
      <StageGrid darkMode={darkMode} />
      <GhostNum n="03" darkMode={darkMode} />
      <DemoHead index="03" name="FIGURE IT OUT" line="Too much shouting. Tap to dismiss — scroll to resolve." textMain={textMain} textMuted={textMuted} />
      <div className="w-[min(560px,88vw)] rounded-2xl p-4 md:p-5" style={{ background: darkMode ? '#0D0D0F' : '#FFFFFF', border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, boxShadow: '0 24px 60px -24px rgba(0,0,0,0.4)' }}>
        <div className="flex items-center gap-1.5 mb-4">
          <span className="w-2 h-2 rounded-full" style={{ background: darkMode ? '#3a3a3f' : '#C9C9D1' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: darkMode ? '#3a3a3f' : '#C9C9D1' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: darkMode ? '#3a3a3f' : '#C9C9D1' }} />
          <div className="ml-3 h-5 rounded-full flex-1 max-w-[220px]" style={{ background: darkMode ? '#1a1a1e' : '#EFEFF3' }} />
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 min-h-[132px] content-center">
          {CHIPS.map((c, i) => (
            <div
              key={c}
              ref={setChipRef(i)}
              onClick={() => dismiss(i)}
              className="px-5 py-2.5 rounded-full text-[11px] tracking-[0.22em] uppercase select-none"
              style={{
                fontFamily: F,
                color: textMuted,
                background: chipBase,
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
                cursor: i === CHIPS.length - 1 ? 'default' : 'pointer',
                willChange: 'transform, opacity',
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 md:mt-10">
        <Words words={FIGURE_WORDS} setRef={setCapRef} color={textMuted} />
      </div>
      <p className="mt-4 text-[13px] md:text-sm max-w-[44ch] text-center leading-[1.7]" style={{ fontFamily: F, color: textMuted }}>
        I don&rsquo;t always know the answer at the start. I know how to find it.
      </p>
    </div>
  )
}

/* ─── 04 ADAPT ─────────────────────────────────────────────────────── */
/* Visual demo: one object changes form across contexts. */

const ADAPT_WORDS = ['WEB', 'MOBILE', 'PROTOTYPE', 'INTERACTION']

function AdaptDemo({ darkMode, reduced }: { darkMode: boolean; reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [capRefs, setCapRef] = useRefArray<HTMLDivElement>()
  const frameRef = useRef<HTMLDivElement>(null)
  const webRef = useRef<HTMLDivElement>(null)
  const mobRef = useRef<HTMLDivElement>(null)
  const protoRef = useRef<HTMLDivElement>(null)
  const playRef = useRef<HTMLDivElement>(null)

  const textMain = darkMode ? '#F5F5F5' : '#0A0A0A'
  const textMuted = darkMode ? '#6B7280' : '#9CA3AF'
  const frameBg = darkMode ? '#101013' : '#ECECF0'
  const frameLine = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const barBase = darkMode ? '#2a2a30' : '#D5D5DC'

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!rootRef.current || !frameRef.current) return
      const faces = [webRef.current, mobRef.current, protoRef.current, playRef.current]
      if (reduced) {
        gsap.set(frameRef.current, { width: 'min(480px,84vw)', height: 300 })
        faces.forEach((f, i) => gsap.set(f, { opacity: i === 3 ? 1 : 0 }))
        gsap.set(capRefs.current[capRefs.current.length - 1], { opacity: 1, y: 0 })
        return
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: '+=180%', pin: true, scrub: 1 },
      })
      fadePhases(tl, capRefs.current, 4)
      const show = (i: number, at: number) => {
        faces.forEach((f, j) => {
          tl.to(f, { opacity: j === i ? 1 : 0, duration: 0.4, ease: 'power1.inOut' }, at)
        })
      }
      show(0, 0)
      tl.to(frameRef.current, { width: 'min(480px,84vw)', height: 300, duration: 0.5 }, 0)
      show(1, 1)
      tl.to(frameRef.current, { width: 'min(210px,52vw)', height: 420, duration: 1, ease: 'power1.inOut' }, 1)
      show(2, 2)
      tl.to(frameRef.current, { width: 'min(330px,72vw)', height: 340, duration: 1, ease: 'power1.inOut' }, 2)
      show(3, 3)
      tl.to(frameRef.current, { width: 'min(480px,84vw)', height: 300, duration: 1, ease: 'power1.inOut' }, 3)
      tl.fromTo(playRef.current, { scale: 0.85 }, { scale: 1.08, duration: 0.5, ease: 'power1.inOut' }, 3.2)
    }, rootRef)
    return () => ctx.revert()
  }, [reduced, darkMode, capRefs])

  const face = 'absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-6'

  return (
    <div ref={rootRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <StageGrid darkMode={darkMode} />
      <GhostNum n="04" darkMode={darkMode} />
      <DemoHead index="04" name="ADAPT" line="Give me the unfamiliar thing. I'll figure it out." textMain={textMain} textMuted={textMuted} />
      <div
        ref={frameRef}
        className="relative rounded-2xl overflow-hidden"
        style={{ width: 'min(480px,84vw)', height: 300, background: frameBg, border: `1px solid ${frameLine}`, willChange: 'width,height' }}
      >
        {/* WEB */}
        <div ref={webRef} className={face} style={{ opacity: 1 }}>
          {[86, 64, 74].map((w, i) => (
            <div key={i} className="h-3 rounded-full" style={{ width: `${w}%`, background: barBase }} />
          ))}
        </div>
        {/* MOBILE */}
        <div ref={mobRef} className={face} style={{ opacity: 0 }}>
          {[70, 70, 44].map((w, i) => (
            <div key={i} className={i === 2 ? 'h-9 rounded-full mt-2' : 'h-3 rounded-full'} style={{ width: `${w}%`, background: i === 2 ? ACCENT : barBase }} />
          ))}
        </div>
        {/* PROTOTYPE */}
        <div ref={protoRef} className={face} style={{ opacity: 0 }}>
          <div className="w-[76%] rounded-lg border border-dashed p-4 flex flex-col gap-2" style={{ borderColor: ACCENT }}>
            {[80, 55].map((w, i) => (
              <div key={i} className="h-2.5 rounded-full" style={{ width: `${w}%`, background: `${ACCENT}66` }} />
            ))}
          </div>
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: F, color: ACCENT }}>Draft</span>
        </div>
        {/* INTERACTION */}
        <div ref={playRef} className={face} style={{ opacity: 0 }}>
          <div className="rounded-full flex items-center justify-center" style={{ width: 72, height: 72, background: ACCENT }}>
            <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '14px solid #0A0A0A', marginLeft: 4 }} />
          </div>
        </div>
      </div>
      <div className="mt-8 md:mt-10">
        <Words words={ADAPT_WORDS} setRef={setCapRef} color={textMuted} />
      </div>
    </div>
  )
}

/* ─── 05 RANGE ─────────────────────────────────────────────────────── */
/* Visual demo: one system rolls through disciplines, then names tools. */

const RANGE_WORDS = ['UI', 'MOTION', 'INTERACTION', '3D · WEBGL', 'PROTOTYPE']

function RangeDemo({ darkMode, reduced }: { darkMode: boolean; reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [bgRefs, setBgRef] = useRefArray<HTMLDivElement>()
  const [dotRefs, setDotRef] = useRefArray<HTMLDivElement>()
  const rollRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)

  const textMain = darkMode ? '#F5F5F5' : '#0A0A0A'
  const textMuted = darkMode ? '#6B7280' : '#9CA3AF'

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bgs = bgRefs.current.filter((e): e is HTMLDivElement => !!e)
      const dots = dotRefs.current.filter((e): e is HTMLDivElement => !!e)
      if (!rootRef.current || !rollRef.current) return
      if (reduced) {
        gsap.set(rollRef.current, { yPercent: -80 })
        bgs.forEach((b, i) => gsap.set(b, { opacity: i === 4 ? 1 : 0 }))
        gsap.set(toolsRef.current, { opacity: 1, y: 0 })
        return
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: '+=240%', pin: true, scrub: 1 },
      })
      RANGE_WORDS.forEach((_, i) => {
        if (i === 0) {
          bgs.forEach((b, j) => tl.set(b, { opacity: j === 0 ? 1 : 0 }, 0))
          dots.forEach((d, j) => tl.set(d, { opacity: j === 0 ? 1 : 0.25 }, 0))
          return
        }
        const at = i
        tl.to(rollRef.current, { yPercent: -i * 20, duration: 0.8, ease: 'power1.inOut' }, at)
        bgs.forEach((b, j) => tl.to(b, { opacity: j === i ? 1 : 0, duration: 0.5, ease: 'power1.inOut' }, at))
        dots.forEach((d, j) => tl.to(d, { opacity: j <= i ? 1 : 0.25, duration: 0.4 }, at))
      })
      tl.fromTo(toolsRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power1.out' }, 5)
    }, rootRef)
    return () => ctx.revert()
  }, [reduced, darkMode, bgRefs, dotRefs])

  const backdrops: React.CSSProperties[] = [
    { background: darkMode ? '#101013' : '#ECECF0' },
    { background: `radial-gradient(ellipse at center, ${ACCENT}30 0%, transparent 70%)` },
    { background: 'transparent', transform: 'rotate(-4deg) scale(1.04)', border: `1px solid ${ACCENT}44`, borderRadius: 20 },
    {
      background: darkMode ? '#0B0B0D' : '#F1F1F4',
      backgroundImage: `linear-gradient(${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 1px, transparent 1px)`,
      backgroundSize: '28px 28px',
    },
    { background: 'transparent', border: `1px dashed ${ACCENT}88`, borderRadius: 20 },
  ]

  return (
    <div ref={rootRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6">
      <StageGrid darkMode={darkMode} />
      <GhostNum n="05" darkMode={darkMode} />
      <div className="mb-3 relative">
        <Kicker color={textMuted}>[05]&nbsp;&nbsp;RANGE</Kicker>
      </div>
      <p className="text-[11px] tracking-[0.3em] uppercase mb-6 text-center" style={{ fontFamily: F, color: textMuted }}>
        From quiet interfaces — to weird experiments
      </p>
      <div className="relative w-[min(620px,88vw)] h-[240px] md:h-[280px] flex items-center justify-center">
        {backdrops.map((s, i) => (
          <div key={i} ref={setBgRef(i)} className="absolute inset-0 rounded-2xl" style={{ ...s, opacity: 0 }} />
        ))}
        <div className="h-[1.1em] overflow-hidden relative" style={{ fontSize: 'clamp(2.6rem,9vw,6rem)' }}>
          <div ref={rollRef} className="flex flex-col will-change-transform">
            {RANGE_WORDS.map((w) => (
              <div key={w} className="h-[1.1em] leading-[1.1] font-black tracking-tight text-center whitespace-nowrap" style={{ fontFamily: 'var(--font-anton)', color: textMain }}>
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2.5 mt-6" aria-hidden="true">
        {RANGE_WORDS.map((w, i) => (
          <div key={w} ref={setDotRef(i)} className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT, opacity: 0.25 }} />
        ))}
      </div>
      <div ref={toolsRef} className="mt-10 text-center max-w-[640px]" style={{ opacity: 0 }}>
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: F, color: textMuted }}>
          Tools I work with
        </p>
        <p className="text-[13px] md:text-sm leading-[2]" style={{ fontFamily: F, color: textMain }}>
          HTML / CSS / JavaScript / React / Next.js / GSAP / Figma / Webflow / Framer / WordPress / AI-assisted development
        </p>
      </div>
    </div>
  )
}

/* ─── Section ──────────────────────────────────────────────────────── */

export default function WhatIBring({ darkMode = true }: { darkMode?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const textMain = darkMode ? '#F5F5F5' : '#0A0A0A'
  const textMuted = darkMode ? '#6B7280' : '#9CA3AF'
  const rule = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-lab-intro]',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-lab-intro-wrap]', start: 'top 80%', toggleActions: 'play none none none' },
        }
      )
      gsap.fromTo(
        '[data-lab-outro]',
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-lab-outro-wrap]', start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative overflow-hidden transition-colors duration-300"
      style={{ background: darkMode ? '#050505' : '#FAFAFA' }}
    >
      {/* ─── Intro ─── */}
      <div data-lab-intro-wrap className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto pt-24 md:pt-32 lg:pt-40 pb-6 md:pb-10">
        <div data-lab-intro className="mb-5">
          <Kicker color={textMuted}>04&nbsp;&nbsp;/&nbsp;&nbsp;Capabilities</Kicker>
        </div>
        <h2
          data-lab-intro
          className="text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02] tracking-tight"
          style={{ fontFamily: 'var(--font-anton)', color: textMain }}
        >
          I BUILD THINGS
          <br />I HAVEN&rsquo;T BUILT BEFORE.
        </h2>
        <p data-lab-intro className="mt-6 text-[13px] md:text-sm tracking-[0.14em] uppercase" style={{ fontFamily: F, color: textMuted }}>
          Scroll through five proofs. Two you can touch.
        </p>
        <div data-lab-intro className="w-full h-px mt-8" style={{ background: rule }} />
      </div>

      {/* ─── The Playground ─── */}
      <BuildDemo darkMode={darkMode} reduced={reduced} />
      <MoveDemo darkMode={darkMode} reduced={reduced} />
      <FigureDemo darkMode={darkMode} reduced={reduced} />
      <AdaptDemo darkMode={darkMode} reduced={reduced} />
      <RangeDemo darkMode={darkMode} reduced={reduced} />

      {/* ─── Resolve ─── */}
      <div data-lab-outro-wrap className="px-6 md:px-12 max-w-[1200px] mx-auto pt-20 md:pt-28 pb-16 md:pb-20 text-center">
        <p
          data-lab-outro
          className="text-[clamp(2.2rem,7vw,5.5rem)] leading-[1.02] tracking-tight"
          style={{ fontFamily: 'var(--font-anton)', color: textMain }}
        >
          I DON&rsquo;T NEED
          <br />A PERFECT BRIEF.
        </p>
        <p
          data-lab-outro
          className="text-[clamp(2.2rem,7vw,5.5rem)] leading-[1.02] tracking-tight mt-2"
          style={{ fontFamily: 'var(--font-anton)', color: ACCENT }}
        >
          GIVE ME THE PROBLEM.
        </p>
        <p
          data-lab-outro
          className="text-[clamp(2.2rem,7vw,5.5rem)] leading-[1.02] tracking-tight mt-2"
          style={{ fontFamily: 'var(--font-anton)', color: textMain }}
        >
          I&rsquo;LL FIGURE OUT THE REST.
        </p>
        <p
          data-lab-outro
          className="mt-8 md:mt-10 text-[clamp(0.95rem,1.6vw,1.15rem)] leading-[1.7]"
          style={{ fontFamily: 'var(--font-display)', color: textMuted }}
        >
          Design it. Build it. Break it. Learn what&rsquo;s missing. Build it better.
        </p>
      </div>

      {/* ─── Micro stack line ─── */}
      <div className="px-6 pb-20 md:pb-28 text-center">
        <p
          className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-display)', color: darkMode ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.35)' }}
        >
          Design&nbsp;&nbsp;·&nbsp;&nbsp;Frontend&nbsp;&nbsp;·&nbsp;&nbsp;Motion&nbsp;&nbsp;·&nbsp;&nbsp;Prototyping&nbsp;&nbsp;·&nbsp;&nbsp;AI-assisted building
        </p>
      </div>
    </section>
  )
}
