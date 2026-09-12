import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 20 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleMouseEnter = () => {
    // ready for magnetic effect
  }

  const Component = href ? motion.a : motion.button
  const props = href ? { href } : { onClick }

  return (
    <Component
      ref={ref as never}
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Component>
  )
}
