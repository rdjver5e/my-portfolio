import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface ScrollProgressProps {
  progress: number
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  const springProgress = useSpring(progress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    springProgress.set(progress)
  }, [progress, springProgress])

  const displayProgress = useTransform(springProgress, (value) => Math.round(value))

  return (
    <div className="flex items-center justify-center min-w-[70px] h-9 px-3 rounded-full bg-white/15 text-white text-base font-medium">
      <motion.span>{displayProgress}</motion.span>
      <span>%</span>
    </div>
  )
}
