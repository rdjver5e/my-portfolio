import { useEffect, useRef } from 'react'

interface BackgroundLayersProps {
  className?: string
  darkMode: boolean
}

export default function BackgroundLayers({ className = '', darkMode }: BackgroundLayersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
      }))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = darkMode
          ? `rgba(139, 92, 246, ${p.opacity})`
          : `rgba(139, 92, 246, ${p.opacity * 0.5})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [darkMode])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Gradient orb - top left */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Gradient orb - bottom right */}
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(96, 165, 250, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  )
}
