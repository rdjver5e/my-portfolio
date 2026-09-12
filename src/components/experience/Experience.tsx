import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Flip)

interface WorkspaceObject {
  id: string
  label: string
  philosophy: string
  tools: string[]
  position: { x: number; y: number }
  rotation: number
  scale: number
  color: string
}

const objects: WorkspaceObject[] = [
  {
    id: 'frontend',
    label: 'Creative\nFrontend',
    philosophy: 'I bridge design intent with production-ready code.',
    tools: ['React', 'TypeScript', 'JavaScript', 'Webflow', 'Tailwind', 'Next.js'],
    position: { x: 15, y: 25 },
    rotation: -3,
    scale: 1,
    color: '#9CA3AF',
  },
  {
    id: 'motion',
    label: 'Motion',
    philosophy: 'Motion should guide attention, never steal it.',
    tools: ['GSAP', 'ScrollTrigger', 'Custom easing', 'Micro-interactions', 'Lottie'],
    position: { x: 70, y: 20 },
    rotation: 2,
    scale: 1.2,
    color: '#43fa47',
  },
  {
    id: 'performance',
    label: 'Performance',
    philosophy: 'Fast experiences build trust.',
    tools: ['Lighthouse', 'Code Splitting', 'Image Optimization', 'Lazy Loading', 'Core Web Vitals'],
    position: { x: 45, y: 65 },
    rotation: -1,
    scale: 0.9,
    color: '#f59e0b',
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    philosophy: 'Good interfaces include everyone.',
    tools: ['Semantic HTML', 'ARIA', 'Keyboard Navigation', 'Color Contrast', 'Responsive Design'],
    position: { x: 80, y: 60 },
    rotation: 4,
    scale: 0.85,
    color: '#ec4899',
  },
  {
    id: 'systems',
    label: 'Design\nSystems',
    philosophy: 'Consistency creates confidence.',
    tools: ['Figma', 'Auto Layout', 'Design Tokens', 'Reusable Components', 'Design Systems'],
    position: { x: 25, y: 70 },
    rotation: -2,
    scale: 0.95,
    color: '#06b6d4',
  },
]

function FloatingObject({
  obj,
  isExpanded,
  onHoverStart,
  onHoverEnd,
}: {
  obj: WorkspaceObject
  isExpanded: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  const objectRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    onHoverStart()
  }, [onHoverStart])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    onHoverEnd()
  }, [onHoverEnd])

  useEffect(() => {
    if (!objectRef.current) return

    const state = Flip.getState(objectRef.current)

    if (isExpanded) {
      gsap.to(objectRef.current, {
        scale: 1.8,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    } else if (isHovered) {
      gsap.to(objectRef.current, {
        scale: obj.scale * 1.1,
        rotation: obj.rotation * 0.5,
        duration: 0.5,
        ease: 'power3.out',
      })
    } else {
      gsap.to(objectRef.current, {
        scale: obj.scale,
        rotation: obj.rotation,
        duration: 0.6,
        ease: 'power3.out',
      })
    }

    Flip.from(state, {
      duration: 0.8,
      ease: 'power3.out',
      absolute: true,
      onEnter: () => {},
      onLeave: () => {},
    })
  }, [isExpanded, isHovered, obj])

  return (
    <div
      ref={objectRef}
      className="absolute cursor-pointer select-none"
      style={{
        left: `${obj.position.x}%`,
        top: `${obj.position.y}%`,
        transform: `rotate(${obj.rotation}deg) scale(${obj.scale})`,
        willChange: 'transform',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="transition-all duration-500"
        style={{
          fontSize: isExpanded ? 'clamp(3rem, 8vw, 6rem)' : 'clamp(1.5rem, 3vw, 2.5rem)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: isExpanded ? obj.color : '#F5F5F5',
          whiteSpace: 'pre-line',
          textShadow: isExpanded ? `0 0 60px ${obj.color}40` : 'none',
        }}
      >
        {obj.label}
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const outroRef = useRef<HTMLDivElement>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      if (introRef.current) {
        const introElements = introRef.current.querySelectorAll('.intro-reveal')

        gsap.fromTo(
          introElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 70%',
              end: 'top 50%',
              scrub: 1,
              onEnter: () => setIsInView(true),
              onLeaveBack: () => setIsInView(false),
            },
          }
        )

        gsap.to(introRef.current, {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 40%',
            end: 'top 10%',
            scrub: 1,
          },
        })
      }

      // Outro animation
      if (outroRef.current) {
        gsap.fromTo(
          outroRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: outroRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Floating animation for objects
      objects.forEach((obj, i) => {
        gsap.to(`#object-${obj.id}`, {
          y: `+=${10 + i * 5}`,
          duration: 3 + i * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleObjectHover = useCallback((id: string) => {
    setExpandedId(id)
  }, [])

  const handleObjectLeave = useCallback(() => {
    setExpandedId(null)
  }, [])

  const expandedObj = objects.find((o) => o.id === expandedId)

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative"
      style={{ background: '#050505' }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Intro */}
      <div
        ref={introRef}
        className="h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <p
          className="intro-reveal text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.02em] leading-[1.1] mb-4"
          style={{ fontFamily: 'var(--font-display)', color: '#F5F5F5' }}
        >
          How can I help?
        </p>
        <p
          className="intro-reveal text-[clamp(0.9rem,1.2vw,1.1rem)] tracking-[0.1em]"
          style={{ fontFamily: 'var(--font-display)', color: '#6B7280' }}
        >
          Explore what I bring to every project.
        </p>
      </div>

      {/* Workspace Canvas */}
      <div
        ref={canvasRef}
        className="relative h-screen overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        {/* Background glow based on expanded object */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000"
          style={{
            background: expandedObj
              ? `radial-gradient(circle at 50% 50%, ${expandedObj.color}15, transparent 60%)`
              : 'none',
          }}
        />

        {/* Floating objects */}
        {isInView && objects.map((obj) => (
          <FloatingObject
            key={obj.id}
            obj={obj}
            isExpanded={expandedId === obj.id}
            onHoverStart={() => handleObjectHover(obj.id)}
            onHoverEnd={handleObjectLeave}
          />
        ))}

        {/* Expanded content overlay */}
        {expandedObj && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 10 }}
          >
            <div
              className="text-center max-w-lg px-6"
              style={{
                opacity: expandedId ? 1 : 0,
                transform: `translateY(${expandedId ? 0 : 20}px)`,
                transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* Philosophy */}
              <p
                className="text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.6] mb-8 italic"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: '#9CA3AF',
                }}
              >
                "{expandedObj.philosophy}"
              </p>

              {/* Tools */}
              <div>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: 'var(--font-display)', color: '#6B7280' }}
                >
                  Built with
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {expandedObj.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-3 py-1"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: '#9CA3AF',
                        border: `1px solid ${expandedObj.color}30`,
                        borderRadius: '2px',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Outro */}
      <div
        ref={outroRef}
        className="h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <p
          className="text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-[-0.02em] leading-[1.3] max-w-2xl"
          style={{ fontFamily: 'var(--font-display)', color: '#F5F5F5' }}
        >
          Every product is different.
          <br />
          <span style={{ color: '#9CA3AF' }}>Great craftsmanship isn't.</span>
        </p>
      </div>
    </section>
  )
}
