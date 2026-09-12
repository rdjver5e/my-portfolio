import { motion } from 'framer-motion'

interface AnimatedHamburgerProps {
  isOpen: boolean
  onClick: () => void
}

export default function AnimatedHamburger({ isOpen, onClick }: AnimatedHamburgerProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-6 h-6 flex flex-col items-center justify-center gap-[5px]"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <motion.span
        className="block w-5 h-[1.5px] bg-white origin-center"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 3.25 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.span
        className="block w-5 h-[1.5px] bg-white origin-center"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -3.25 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </button>
  )
}
