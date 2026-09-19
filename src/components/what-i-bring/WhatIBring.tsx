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

/* ─── Data ─────────────────────────────────────────────────────────── */

const ACCENT = '#9CA3AF'
const F = 'var(--font-display)'

interface Tile {
  name: string
  skill: string
  gradient: string
  img: string
  w: number
  ar: string
}

const U = (id: string) => `https://images.unsplash.com/${id}?q=80&w=500&auto=format&fit=crop&fm=webp`

const TILES: Tile[] = [
  { name: 'UI Design', skill: 'Interfaces with intent · Figma to pixel', gradient: 'linear-gradient(135deg,#1c1c22,#0d3b3b)', img: U('photo-1561070791-2526d30994b5'), w: 150, ar: '4/3' },
  { name: 'Motion', skill: 'Meaning in movement · GSAP', gradient: 'linear-gradient(135deg,#231a10,#6b4a12)', img: U('photo-1557672172-298e090bd0f1'), w: 112, ar: '3/4' },
  { name: 'UX Research', skill: 'Ask first · test with users', gradient: 'linear-gradient(135deg,#14231a,#0e7490)', img: U('photo-1522542550221-31fd19575a2d'), w: 118, ar: '4/3' },
  { name: 'Frontend', skill: 'React that ships · clean + fast', gradient: 'linear-gradient(135deg,#0d2b3b,#155e75)', img: U('photo-1555066931-4365d14bab8c'), w: 128, ar: '1/1' },
  { name: 'Design Systems', skill: 'Tokens, kits, consistency', gradient: 'linear-gradient(135deg,#1a1430,#6d28d9)', img: U('photo-1620641788421-7a1c342ea42e'), w: 108, ar: '1/1' },
  { name: 'Interaction', skill: 'Every pixel answers back', gradient: 'linear-gradient(135deg,#1a1430,#4c1d95)', img: U('photo-1558655146-9f40138edfeb'), w: 104, ar: '3/4' },
  { name: 'Backend / APIs', skill: 'Data that behaves', gradient: 'linear-gradient(135deg,#101828,#334155)', img: U('photo-1587620962725-abab7fe55159'), w: 134, ar: '16/10' },
  { name: 'Prototyping', skill: 'Rough today, real tomorrow', gradient: 'linear-gradient(135deg,#14231a,#166534)', img: U('photo-1581291518857-4e27b48ff24e'), w: 142, ar: '16/10' },
  { name: 'SEO & Analytics', skill: 'Found + measured', gradient: 'linear-gradient(135deg,#201a10,#0ea5e9)', img: U('photo-1460925895917-afdab827c52f'), w: 122, ar: '4/3' },
  { name: '3D / WebGL', skill: 'Depth without the weight', gradient: 'linear-gradient(135deg,#2b1020,#9d174d)', img: U('photo-1620121692029-d088224ddc74'), w: 116, ar: '1/1' },
  { name: 'Performance', skill: '60fps or it didn’t happen', gradient: 'linear-gradient(135deg,#201a10,#a16207)', img: U('photo-1551288049-bebda4e38f71'), w: 126, ar: '4/3' },
  { name: 'AI Builds', skill: 'Human taste, machine speed', gradient: 'linear-gradient(135deg,#101828,#1d4ed8)', img: U('photo-1677442136019-21780ecad995'), w: 100, ar: '3/4' },
]

/* ─── Tile visual (Unsplash photo over a gradient fallback) ─────────── */

function TileVisual({ t }: { t: Tile }) {
  return (
    <>
      <img
        src={t.img}
        alt=""
        aria-hidden="true"
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        style={{ filter: 'saturate(0.85) contrast(1.05)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 55%)' }}
      />
    </>
  )
}

/* ─── The wheel ────────────────────────────────────────────────────── */

function Wheel({ darkMode, reduced }: { darkMode: boolean; reduced: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const tileRefs = useRef<(HTMLDivElement | null)[]>([])
  const capNameRef = useRef<HTMLDivElement>(null)
  const capSkillRef = useRef<HTMLDivElement>(null)
  const capWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const ring = ringRef.current
    if (!stage || !ring) return
    const tiles = tileRefs.current.filter((e): e is HTMLDivElement => !!e)
    if (!tiles.length) return

    const N = tiles.length
    const dims = { rx: 310, ry: 0, depth: 0, stretchMax: 200, restTiltX: 16, mobile: false, scale: 1, perspectiveBase: 1000 }
    const measure = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const mobile = w < 768
      const tablet = w >= 768 && w < 1024
      const isLandscapeMobile = mobile && h <= 500 && w > h
      const clampM = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
      dims.mobile = mobile
      if (mobile) {
        if (isLandscapeMobile) {
          // Landscape phones: height is the limiter → fit by min(availableWidth, availableHeight*1.8)
          const usableW = w - 32
          const usableH = h - 24
          const constraint = Math.min(usableW, usableH * 1.8)
          dims.rx = clampM(Math.round(constraint * 0.27), 68, 135)
          dims.scale = clampM((Math.min(usableW, usableH * 2) / 320) * 0.58, 0.56, 0.66)
          dims.stretchMax = 65
          dims.restTiltX = 10
          dims.perspectiveBase = 680
        } else {
          // Portrait phones 320-430: scale proportionally to usable width
          const usableW = w - 32
          dims.rx = clampM(Math.round(usableW * 0.33), 92, 148)
          dims.scale = clampM((usableW / 320) * 0.60, 0.60, 0.70)
          dims.stretchMax = 80
          dims.restTiltX = 11
          dims.perspectiveBase = 750
        }
      } else if (tablet) {
        dims.rx = 215
        dims.scale = 0.82
        dims.stretchMax = 130
        dims.restTiltX = 15
        dims.perspectiveBase = 900
      } else {
        dims.rx = 310
        dims.scale = 1
        dims.stretchMax = 200
        dims.restTiltX = 16
        dims.perspectiveBase = 1000
      }
      dims.ry = dims.rx * 0.45
      dims.depth = dims.rx * 0.55
      if (!st.down) st.tTiltX = dims.restTiltX
    }
    tiles.forEach((el) => gsap.set(el, { xPercent: -50, yPercent: -50 }))

    // One state object drives the whole radial system:
    // auto drift -> wheel angle, pointer -> ring tilt, scroll velocity -> stretch.
    // Every velocity and angle here is clamped: dragging fast, flinging, or
    // resizing can never blow the wheel apart or stall it.
    const st = {
      angle: 0.6,
      time: 0,
      rotVel: 0,
      tiltX: 14,
      tiltY: 0,
      tTiltX: 14,
      tTiltY: 0,
      ringX: 14,
      ringY: 0,
      kickX: 0,
      stretch: 0,
      stretchTarget: 0,
      down: false,
      lastX: 0,
      lastY: 0,
      lastMoveT: 0,
      active: -1,
    }
    measure()
    st.tiltX = dims.restTiltX
    st.tTiltX = dims.restTiltX
    st.ringX = dims.restTiltX
    const SWING_SPEED = 1.6 // rad/sec peak — fast swing (~92°/s)
    const SWING_CYCLE = 8 // seconds per swing-then-pause loop
    const SWING_PART = 0.35 // fraction of each cycle spent swinging, rest is pause
    const MAX_FLING = 4 // rad/sec — hardest possible flick after a fast drag
    const SPIN_GAIN = 0.009 // rad per dragged px
    const SWAY_Y_AMP = 20 // deg — rocks fully side to side, always crossing center
    const SWAY_Y_FREQ = 0.9 // rad/sec — one full rock ≈ 7s
    const SWAY_X_AMP = 6
    const SWAY_X_FREQ = 0.6
    const TILT_LERP = 0.06
    const STRETCH_LERP = 0.08
    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

    const place = () => {
      const radiusX = dims.rx + st.stretch
      const radiusY = dims.ry + st.stretch * 0.45
      const depth = dims.depth + st.stretch * 0.6
      let best = 0
      let bestZ = -Infinity

      for (let i = 0; i < N; i++) {
        const a = st.angle + (i / N) * Math.PI * 2
        const x = Math.cos(a) * radiusX
        const y = Math.sin(a) * radiusY
        const z = Math.cos(a) * depth
        const depth01 = (Math.cos(a) + 1) / 2

        // Billboarded: tiles orbit the circle but stay upright facing the
        // camera. The 3D feel comes from x/y/z + the tilted ring +
        // perspective, not from tiles turning edge-on.
        // Fully opaque — overlapping cards occlude cleanly by z-order.
        // Depth is cued with brightness, never transparency.
        gsap.set(tiles[i], { x, y, z, rotationY: 0, rotation: 0, opacity: 1, scaleX: dims.scale, scaleY: dims.scale })
        tiles[i].style.filter = `brightness(${(0.62 + depth01 * 0.38).toFixed(3)})`
        tiles[i].style.zIndex = String(Math.round(depth01 * 100))
        if (z > bestZ) {
          bestZ = z
          best = i
        }
      }

      gsap.set(stage, { perspective: dims.perspectiveBase - st.stretch * 0.35 })
      gsap.set(ring, {
        rotationX: clamp(st.ringX, dims.mobile ? -8 : -10, dims.mobile ? 28 : 34),
        rotationY: clamp(st.ringY, dims.mobile ? -22 : -32, dims.mobile ? 22 : 32),
      })

      if (best !== st.active) {
        st.active = best
        if (capNameRef.current) capNameRef.current.textContent = TILES[best].name
        if (capSkillRef.current) capSkillRef.current.textContent = TILES[best].skill
        if (capWrapRef.current) {
          gsap.fromTo(
            capWrapRef.current,
            { opacity: 0.3, y: 5 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' }
          )
        }
      }
    }

    if (reduced) {
      tiles.forEach((el, i) => {
        gsap.set(el, {
          x: (i - (N - 1) / 2) * 140,
          y: 0,
          z: -Math.abs(i - (N - 1) / 2) * 30,
          rotationY: 0,
          rotation: 0,
        })
        el.style.opacity = '1'
      })
      gsap.set(ring, { rotationX: 0, rotationY: 0 })
      if (capNameRef.current) capNameRef.current.textContent = 'Twelve crafts'
      if (capSkillRef.current) capSkillRef.current.textContent = 'Hover-free zone — everything visible at once'
      return
    }

    const tick = (_t: number, deltaMS: number) => {
      const dt = Math.min(Math.max(deltaMS / 1000, 0.001), 0.05)
      st.time += dt
      if (!st.down) {
        // Continuous drift + decaying flick velocity. The decay is time-based
        // so a release always glides the same way, then settles back to the
        // auto speed — never a snap, never a stall.
        // Looped swing-pause cycle: a fast swing in one direction, a full
        // stop, then a swing back the other way. Direction flips only
        // while speed is zero, so reversals never snap.
        st.rotVel *= Math.exp(-dt * 1.8)
        if (Math.abs(st.rotVel) < 0.001) st.rotVel = 0
        const cyc = st.time / SWING_CYCLE
        const idx = Math.floor(cyc)
        const ph = cyc - idx
        let env = 0
        if (ph < SWING_PART) {
          env = Math.sin((ph / SWING_PART) * Math.PI)
        }
        const dirSign = idx % 2 === 0 ? 1 : -1
        const autoNow = SWING_SPEED * env * dirSign
        st.angle = (st.angle + (autoNow + st.rotVel) * dt) % (Math.PI * 2)
        st.kickX *= Math.exp(-dt * 3)
      }
      // Heavily damped pointer tilt — physical object, not a mirror.
      st.tiltX += (st.tTiltX + st.kickX - st.tiltX) * TILT_LERP
      st.tiltY += (st.tTiltY - st.tiltY) * TILT_LERP
      // Autonomous sway: the ring rocks side to side on its own —
      // right-side-up, then left-side-up, forever. Pointer input leans
      // on top of this motion instead of replacing it.
      const swayY = dims.mobile ? 13 : SWAY_Y_AMP
      const swayX = dims.mobile ? 4 : SWAY_X_AMP
      st.ringX =
        dims.restTiltX +
        Math.sin(st.time * SWAY_X_FREQ + 1.3) * swayX +
        (st.tiltX - dims.restTiltX)
      st.ringY = Math.sin(st.time * SWAY_Y_FREQ) * swayY + st.tiltY
      // Scroll stretch eases back toward rest after scrolling stops.
      st.stretchTarget *= Math.exp(-dt * 2.5)
      if (st.stretchTarget < 0.5) st.stretchTarget = 0
      st.stretch += (st.stretchTarget - st.stretch) * STRETCH_LERP
      place()
    }
    gsap.ticker.add(tick)

    const onDown = (e: PointerEvent) => {
      st.down = true
      st.lastX = e.clientX
      st.lastY = e.clientY
      st.lastMoveT = performance.now()
      st.rotVel = 0
      try { stage.setPointerCapture(e.pointerId) } catch { /* noop */ }
      stage.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      // Pointer lean is deliberately smaller (±8°) than the sway (±20°),
      // so the cursor can nudge the ring but never pin it to one side —
      // the rock always travels fully both ways.
      const rect = stage.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        const nx = clamp((e.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5)
        const ny = clamp((e.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5)
        const tiltGain = dims.mobile ? 10 : 16
        st.tTiltY = nx * tiltGain
        st.tTiltX = dims.restTiltX - ny * tiltGain
      }
      if (!st.down) return
      // Bidirectional spin from any drag direction: pushing right or down
      // spins the wheel forward, pushing left or up spins it backward —
      // like rolling a physical wheel under your hand. Release velocity is
      // time-based and hard-clamped, so a fast flick glides instead of
      // launching the wheel into a blur.
      const now = performance.now()
      const mdt = Math.max((now - st.lastMoveT) / 1000, 1 / 240)
      const dx = e.clientX - st.lastX
      const dy = e.clientY - st.lastY
      st.lastX = e.clientX
      st.lastY = e.clientY
      st.lastMoveT = now
      const spin = (dx * 0.9 + dy * 0.45) * SPIN_GAIN
      st.angle = (st.angle + spin) % (Math.PI * 2)
      const inst = spin / mdt
      st.rotVel = clamp(st.rotVel * 0.7 + inst * 0.3, -MAX_FLING, MAX_FLING)
      st.kickX = clamp(st.kickX + dy * 0.03, -6, 6)
    }
    const onUp = () => {
      st.down = false
      st.kickX = 0
      stage.style.cursor = 'grab'
    }

    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointermove', onMove, { passive: true })
    stage.addEventListener('pointerup', onUp)
    stage.addEventListener('pointercancel', onUp)
    window.addEventListener('resize', measure)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: '+=150%',
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Scroll *velocity* stretches the wheel; the rest radius returns
          // elastically once scrolling stops.
          const v = clamp(Math.abs(self.getVelocity() || 0) / 3500, 0, 1)
          st.stretchTarget = Math.max(st.stretchTarget, v * dims.stretchMax)
        },
      })
    }, stage)

    return () => {
      gsap.ticker.remove(tick)
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onUp)
      stage.removeEventListener('pointercancel', onUp)
      window.removeEventListener('resize', measure)
      ctx.revert()
    }
  }, [reduced, darkMode])

  return (
    <div
      ref={stageRef}
      className="relative w-full flex flex-col items-center justify-center"
      style={{ height: reduced ? 'auto' : '100vh', minHeight: reduced ? 0 : 620, perspective: '1000px', cursor: reduced ? 'default' : 'grab', touchAction: 'pan-y', padding: reduced ? '80px 0' : 0, overflow: 'visible' }}
    >
      {reduced ? (
        <div className="flex flex-wrap justify-center gap-4 px-6 max-w-[900px]">
          {TILES.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl overflow-hidden relative"
              style={{ width: 200, height: 250, background: t.gradient, border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}
            >
              <TileVisual t={t} />
              <div className="absolute left-0 right-0 bottom-0 p-3.5" style={{ background: 'rgba(0,0,0,0.45)' }}>
                <p className="text-[13px] font-semibold" style={{ fontFamily: F, color: '#fff' }}>{t.name}</p>
                <p className="text-[11px]" style={{ fontFamily: F, color: ACCENT }}>{t.skill}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div data-tablet="wheel" className="flex items-center justify-center w-full" style={{ height: 'min(60vh,600px)', transformStyle: 'preserve-3d' }}>
          <div ref={ringRef} className="relative will-change-transform" style={{ transformStyle: 'preserve-3d', width: 0, height: 0 }}>
            {TILES.map((t, i) => (
              <div
                key={t.name}
                ref={(el) => { tileRefs.current[i] = el }}
                className="absolute overflow-hidden rounded-lg will-change-transform"
                style={{
                  width: t.w,
                  aspectRatio: t.ar,
                  background: t.gradient,
                  border: `1px solid ${darkMode ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.14)'}`,
                }}
              >
                <TileVisual t={t} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Caption */}
      <div ref={capWrapRef} className="text-center px-6 mt-10 relative z-10 h-20" aria-live="polite">
        <div ref={capNameRef} className="font-black tracking-tight leading-none" style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(1.8rem,5vw,3.2rem)', color: darkMode ? '#F5F5F5' : '#0A0A0A' }}>
          {reduced ? 'Twelve crafts' : 'Motion'}
        </div>
        <div ref={capSkillRef} className="mt-2 text-[12px] tracking-[0.25em] uppercase" style={{ fontFamily: F, color: ACCENT }}>
          {reduced ? 'Everything visible at once' : 'Meaning in movement · GSAP'}
        </div>
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
        '[data-wheel-intro]',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-wheel-intro-wrap]', start: 'top 80%', toggleActions: 'play none none none' },
        }
      )
      gsap.fromTo(
        '[data-wheel-outro]',
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-wheel-outro-wrap]', start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative transition-colors duration-300 overflow-hidden"
      style={{ background: darkMode ? '#0A0A0A' : '#FAFAFA' }}
    >
      {/* ─── Intro ─── */}
      <div data-wheel-intro-wrap className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto pt-24 md:pt-32 lg:pt-40 pb-4 md:pb-6 text-center">
        <h2
          data-wheel-intro
          className="text-[clamp(2.4rem,6.5vw,5rem)] font-light tracking-[-0.02em] leading-[1.05]"
          style={{ fontFamily: F, color: textMain }}
        >
          Everything I do,
          <br />
          on one wheel.
        </h2>
        <div data-wheel-intro className="w-full h-px mt-8 max-w-[1400px] mx-auto" style={{ background: rule }} />
      </div>

      {/* ─── The wheel ─── */}
      <Wheel darkMode={darkMode} reduced={reduced} />

      {/* ─── Resolve ─── — MOBILE-ADAPTED: fits 320-430 without overflow, balanced wrap */}
      <div data-wheel-outro-wrap className="px-5 md:px-12 max-w-[1200px] mx-auto pt-10 md:pt-24 pb-10 md:pb-20 text-center overflow-hidden">
        <p
          data-wheel-outro
          className="mx-auto max-w-[13ch] sm:max-w-[14ch] md:max-w-none text-[clamp(1.65rem,7vw,5.5rem)] sm:text-[clamp(1.85rem,7.5vw,5.5rem)] leading-[0.92] tracking-tight text-balance break-words"
          style={{ fontFamily: 'var(--font-anton)', color: textMain }}
        >
          GIVE ME THE PROBLEM.
        </p>
        <p
          data-wheel-outro
          className="mx-auto mt-5 md:mt-8 max-w-[24ch] sm:max-w-[26ch] md:max-w-[48ch] text-[clamp(0.875rem,3.6vw,1.15rem)] leading-[1.65] md:leading-[1.7] text-balance"
          style={{ fontFamily: F, color: textMuted }}
        >
          Design it. Build it. Break it. Learn what&rsquo;s missing. Build it better.
        </p>
      </div>
    </section>
  )
}
