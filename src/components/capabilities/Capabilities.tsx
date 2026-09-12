import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Capability {
  id: number
  title: string[]
  description: string
  tools: string[]
}

const capabilities: Capability[] = [
  {
    id: 1,
    title: ['Creative', 'Frontend', 'Development'],
    description: 'Building premium digital experiences where design and engineering work together seamlessly.',
    tools: ['React', 'TypeScript', 'JavaScript', 'GSAP', 'Tailwind CSS', 'Webflow'],
  },
  {
    id: 2,
    title: ['Motion &', 'Interaction', 'Design'],
    description: 'Creating purposeful animations that guide attention, improve usability and make interfaces feel alive without becoming distracting.',
    tools: ['GSAP', 'Framer Motion', 'Lottie', 'CSS Animations', 'ScrollTrigger'],
  },
  {
    id: 3,
    title: ['Performance', 'Engineering'],
    description: 'Optimizing every interaction for speed, responsiveness and long-term maintainability.',
    tools: ['Lighthouse', 'Webpack', 'Vite', 'Code Splitting', 'Lazy Loading'],
  },
  {
    id: 4,
    title: ['Responsive', 'UI Systems'],
    description: 'Designing layouts that feel consistent across every screen while respecting accessibility and usability.',
    tools: ['CSS Grid', 'Flexbox', 'Tailwind CSS', 'Media Queries', 'Container Queries'],
  },
  {
    id: 5,
    title: ['Design-to-Code', 'Execution'],
    description: 'Translating high-fidelity designs into production-ready interfaces with exceptional attention to detail.',
    tools: ['Figma', 'Sketch', 'HTML', 'CSS', 'Pixel-Perfect Implementation'],
  },
  {
    id: 6,
    title: ['Accessibility'],
    description: 'Building interfaces that are usable, inclusive and enjoyable for every user.',
    tools: ['WCAG 2.1', 'ARIA Labels', 'Keyboard Navigation', 'Screen Readers', 'Color Contrast'],
  },
]

function CapabilityStage({ capability }: { capability: Capability }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!stageRef.current || !titleRef.current || !descriptionRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        titleRef.current.querySelectorAll('.title-word'),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }
      )

      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      )

      gsap.to(stageRef.current, {
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'bottom 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0.3,
        y: -50,
        ease: 'none',
      })
    }, stageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={stageRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Title */}
        <div
          ref={titleRef}
          className="mb-8 md:mb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {capability.title.map((line, i) => (
            <div
              key={i}
              className="title-word overflow-hidden"
              style={{ lineHeight: 1 }}
            >
              <span
                className="block transition-all duration-500"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 8rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: '#F5F5F5',
                  borderBottom: isHovered ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                  paddingBottom: '0.1em',
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div
          ref={descriptionRef}
          className="max-w-xl"
        >
          <p
            className="text-[clamp(1rem, 1.5vw, 1.25rem)] leading-[1.6] mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              color: '#9CA3AF',
            }}
          >
            {capability.description}
          </p>

          {/* Tools - revealed on hover */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: isHovered ? '100px' : '0',
              opacity: isHovered ? 1 : 0,
            }}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase pt-4"
              style={{
                fontFamily: 'var(--font-display)',
                color: '#6B7280',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span style={{ color: '#9CA3AF' }}>Built with</span>
              {' · '}
              {capability.tools.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const outroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      if (introRef.current) {
        const introElements = introRef.current.querySelectorAll('.intro-reveal')

        gsap.fromTo(
          introElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 75%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        )

        gsap.to(introRef.current, {
          opacity: 0,
          y: -40,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
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

      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.04), transparent 60%)',
        }}
      />

      {/* Section intro */}
      <div
        ref={introRef}
        className="h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <p
          className="intro-reveal text-[clamp(2rem,4vw,3.5rem)] font-light tracking-[-0.02em] leading-[1.2] max-w-3xl"
          style={{ fontFamily: 'var(--font-display)', color: '#F5F5F5' }}
        >
          What I bring
          <br />
          <span style={{ color: '#9CA3AF' }}>beyond code.</span>
        </p>
      </div>

      {/* Capabilities */}
      {capabilities.map((capability) => (
        <CapabilityStage key={capability.id} capability={capability} />
      ))}

      {/* Outro */}
      <div
        ref={outroRef}
        className="h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <p
          className="text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-[-0.02em] leading-[1.3] max-w-2xl"
          style={{ fontFamily: 'var(--font-display)', color: '#F5F5F5' }}
        >
          Technology changes.
          <br />
          <span style={{ color: '#9CA3AF' }}>Craftsmanship doesn't.</span>
        </p>
      </div>
    </section>
  )
}
