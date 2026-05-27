'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  vx0: number // velocidade base X
  vy0: number // velocidade base Y
  r: number
}

const REDUCED_MOTION =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

const ATTRACT_RADIUS = 160
const ATTRACT_STRENGTH = 0.11
const MAX_SPEED = 3

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const NODE_COUNT = isMobile ? 32 : 58
    const MAX_DIST = isMobile ? 140 : 185
    const isDark = resolvedTheme !== 'light'

    const nc = isDark ? '6,182,212' : '79,70,229'
    const lc = isDark ? '6,182,212' : '99,102,241'
    const nodeOpacity = isDark ? 0.9 : 0.7
    const glowOpacity = isDark ? 0.4 : 0.22
    const lineMaxOpacity = isDark ? 0.38 : 0.16

    let raf: number
    let particles: Particle[] = []

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = Array.from({ length: NODE_COUNT }, () => {
        const vx = (Math.random() - 0.5) * 0.32
        const vy = (Math.random() - 0.5) * 0.32
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx,
          vy,
          vx0: vx,
          vy0: vy,
          r: Math.random() * 2.4 + 1.4,
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mousePosRef.current

      // Linhas de conexão
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d > MAX_DIST) continue
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${lc},${(1 - d / MAX_DIST) * lineMaxOpacity})`
          ctx.lineWidth = 1.2
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }

      // Nós + física de atração
      for (const p of particles) {
        // Mola suave de retorno à velocidade base
        p.vx += (p.vx0 - p.vx) * 0.04
        p.vy += (p.vy0 - p.vy) * 0.04

        // Força de atração pelo mouse
        let attractFactor = 0
        if (mouse) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.hypot(dx, dy)
          if (dist < ATTRACT_RADIUS && dist > 1) {
            attractFactor = 1 - dist / ATTRACT_RADIUS
            const force = attractFactor * ATTRACT_STRENGTH
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        // Limitar velocidade máxima
        const speed = Math.hypot(p.vx, p.vy)
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED
          p.vy = (p.vy / speed) * MAX_SPEED
        }

        // Visual: interpolação suave com base no attractFactor
        const glowRadius = p.r * (7 + attractFactor * 7)
        const glowAlpha = glowOpacity * (1 + attractFactor * 2)
        const nodeRad = p.r * (1 + attractFactor * 0.8)
        const nodeFill = nodeOpacity + attractFactor * (1 - nodeOpacity)

        // Halo de brilho
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius)
        glow.addColorStop(0, `rgba(${nc},${Math.min(glowAlpha, 0.9)})`)
        glow.addColorStop(1, `rgba(${nc},0)`)
        ctx.beginPath()
        ctx.fillStyle = glow
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Núcleo
        ctx.beginPath()
        ctx.fillStyle = `rgba(${nc},${nodeFill})`
        ctx.arc(p.x, p.y, nodeRad, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20
      }

      raf = requestAnimationFrame(draw)
    }

    init()

    // Rastrear mouse via window (canvas mantém pointer-events: none)
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseLeave = () => {
      mousePosRef.current = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(init, 200)
    }
    window.addEventListener('resize', onResize)

    if (!REDUCED_MOTION) draw()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [mounted, resolvedTheme])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
