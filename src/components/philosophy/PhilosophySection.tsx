import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Segment =
  | { type: 'text'; content: string }
  | { type: 'emoji'; emoji: string }

const segments: Segment[] = [
  { type: 'text', content: 'I craft' },
  { type: 'emoji', emoji: '💻' },
  { type: 'text', content: 'experiences that balance form, function, and feasibility. With a background in Creative Frontend Development, I understand both' },
  { type: 'emoji', emoji: '⌨️' },
  { type: 'text', content: 'code and' },
  { type: 'emoji', emoji: '🎨' },
  { type: 'text', content: 'creativity. I blend' },
  { type: 'emoji', emoji: '🧠' },
  { type: 'text', content: 'curiosity,' },
  { type: 'emoji', emoji: '♟️' },
  { type: 'text', content: 'strategic thinking, and a dash of' },
  { type: 'emoji', emoji: '🫧' },
  { type: 'text', content: 'playfulness to build' },
  { type: 'emoji', emoji: '🚀' },
  { type: 'text', content: 'performant,' },
  { type: 'emoji', emoji: '♿' },
  { type: 'text', content: 'accessible interfaces with' },
  { type: 'emoji', emoji: '🎯' },
  { type: 'text', content: 'precision. My focus is always on' },
  { type: 'emoji', emoji: '🤩' },
  { type: 'text', content: 'delight.' },
]

function buildWords(segs: Segment[]): React.ReactNode[] {
  const words: React.ReactNode[] = []
  segs.forEach((seg, si) => {
    if (seg.type === 'text') {
      const parts = seg.content.split(/(\s+)/)
      parts.forEach((part, pi) => {
        if (part.trim() === '') {
          words.push(<span key={`${si}-${pi}`} className="word-space">{' '}</span>)
        } else {
          words.push(
            <span key={`${si}-${pi}`} className="word-wrap">
              <span className="word-inner">{part}</span>
            </span>
          )
        }
      })
    } else {
      words.push(
        <span key={`emoji-${si}`} className="word-wrap emoji-wrap">
          <span className="word-inner emoji-inner">{seg.emoji}</span>
        </span>
      )
    }
  })
  return words
}

const allWords = buildWords(segments)

export default function PhilosophySection({ darkMode = true }: { darkMode?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const paragraphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordInners = paragraphRef.current?.querySelectorAll('.word-inner')
      if (!wordInners?.length) return

      gsap.set(wordInners, { opacity: 0, y: 20 })

      gsap.to(wordInners, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.035,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative overflow-hidden transition-colors duration-300"
      style={{ height: '100vh', background: darkMode ? '#0A0A0A' : '#FFFFFF' }}
    >
      <div
        className="absolute pointer-events-none transition-colors duration-300"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '1000px',
          background: darkMode
            ? 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 60%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: darkMode ? 0.03 : 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="relative z-10 mx-auto flex flex-col justify-center h-full px-8 md:px-16"
        style={{ maxWidth: '1240px', paddingTop: '6vh', paddingBottom: '6vh' }}
      >
        <div
          ref={paragraphRef}
          className="text-center transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 3.5vw, 3.5rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: darkMode ? '#F5F5F5' : '#0A0A0A',
          }}
        >
          {allWords}
        </div>
      </div>

      <style>{`
        .word-wrap {
          display: inline-block;
          overflow: hidden;
          margin-right: 0.3em;
          vertical-align: bottom;
        }
        .word-inner {
          display: inline-block;
          will-change: transform;
        }
        .emoji-wrap {
          vertical-align: bottom;
        }
        .emoji-inner {
          font-size: 0.9em;
        }
      `}</style>
    </section>
  )
}
