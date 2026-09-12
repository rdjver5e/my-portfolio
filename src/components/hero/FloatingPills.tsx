import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

interface Technology {
  name: string
  icon: string
  color: string
}

const technologies: Technology[] = [
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'TypeScript', icon: '📘', color: '#3178C6' },
  { name: 'Node.js', icon: '🟢', color: '#339933' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'AWS', icon: '☁️', color: '#FF9900' },
  { name: 'Docker', icon: '🐳', color: '#2496ED' },
  { name: 'PostgreSQL', icon: '🐘', color: '#4169E1' },
  { name: 'GraphQL', icon: '◼️', color: '#E10098' },
  { name: 'Next.js', icon: '▲', color: '#FFFFFF' },
  { name: 'Tailwind', icon: '🎨', color: '#06B6D4' },
]

interface FloatingPillsProps {
  className?: string
}

export default function FloatingPills({ className = '' }: FloatingPillsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const pills = containerRef.current.querySelectorAll('.tech-pill')

    pills.forEach((pill, index) => {
      gsap.to(pill, {
        y: `random(-15, 15)`,
        x: `random(-8, 8)`,
        rotation: `random(-5, 5)`,
        duration: 3 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2 + index * 0.08 + index * 0.2,
      })
    })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 1.2,
      },
    },
  }

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      className={`flex flex-wrap justify-center gap-3 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Technologies"
    >
      {technologies.map((tech) => (
        <motion.div
          key={tech.name}
          className="tech-pill flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm cursor-default select-none"
          style={{
            backgroundColor: `${tech.color}10`,
            borderColor: `${tech.color}30`,
            boxShadow: `0 0 20px ${tech.color}10`,
          }}
          variants={pillVariants}
          whileHover={{
            scale: 1.08,
            boxShadow: `0 0 30px ${tech.color}30`,
            borderColor: `${tech.color}50`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm" role="img" aria-hidden="true">{tech.icon}</span>
          <span className="text-small font-medium" style={{ color: tech.color }}>
            {tech.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
