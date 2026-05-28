'use client'

import { useRef, useEffect, useCallback, useSyncExternalStore } from 'react'

// ─── MedusaWave: Organic radial wave animation ───
// Radial lines emanating from center, undulating like jellyfish tentacles
// Inspired by the user's reference image: concentric circles with radiating curved lines

interface Line {
  angle: number
  speed: number
  amplitude: number
  frequency: number
  phase: number
  length: number
  thickness: number
  opacity: number
}

export function MedusaWave({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const linesRef = useRef<Line[]>([])
  const timeRef = useRef(0)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  const initLines = useCallback((count: number) => {
    const lines: Line[] = []
    for (let i = 0; i < count; i++) {
      lines.push({
        angle: (i / count) * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        amplitude: 0.15 + Math.random() * 0.25,
        frequency: 2 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
        length: 0.35 + Math.random() * 0.55,
        thickness: 0.4 + Math.random() * 0.8,
        opacity: 0.15 + Math.random() * 0.35,
      })
    }
    linesRef.current = lines
  }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const LINE_COUNT = 80
    initLines(LINE_COUNT)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const cx = w / 2
      const cy = h / 2
      const maxRadius = Math.max(w, h) * 0.65
      const time = timeRef.current

      // Clear
      ctx.clearRect(0, 0, w, h)

      // Draw concentric circles (center glow)
      const circleCount = 4
      for (let i = 0; i < circleCount; i++) {
        const r = 12 + i * 14
        const pulse = 1 + Math.sin(time * 0.8 + i * 0.5) * 0.08
        const opacity = 0.06 - i * 0.012
        ctx.beginPath()
        ctx.arc(cx, cy, r * pulse, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(79, 143, 255, ${Math.max(0, opacity)})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Draw center glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40)
      gradient.addColorStop(0, 'rgba(79, 143, 255, 0.12)')
      gradient.addColorStop(0.5, 'rgba(79, 143, 255, 0.04)')
      gradient.addColorStop(1, 'rgba(79, 143, 255, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 40, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw radiating tentacle lines
      const lines = linesRef.current
      for (const line of lines) {
        const segments = 60
        const startR = 25
        const endR = startR + maxRadius * line.length

        ctx.beginPath()
        ctx.moveTo(
          cx + Math.cos(line.angle) * startR,
          cy + Math.sin(line.angle) * startR
        )

        for (let s = 1; s <= segments; s++) {
          const t = s / segments
          const r = startR + (endR - startR) * t

          // Organic wave motion - increases toward the tip
          const waveStrength = t * t // quadratic falloff - more movement at tips
          const wave = Math.sin(t * line.frequency + time * line.speed + line.phase) 
                      * line.amplitude * waveStrength * maxRadius * 0.15

          // Perpendicular offset for the wave
          const perpAngle = line.angle + Math.PI / 2
          const x = cx + Math.cos(line.angle) * r + Math.cos(perpAngle) * wave
          const y = cy + Math.sin(line.angle) * r + Math.sin(perpAngle) * wave

          ctx.lineTo(x, y)
        }

        // Opacity fades toward tip
        const fadeOpacity = line.opacity * (0.6 + 0.4 * Math.sin(time * 0.5 + line.phase))
        ctx.strokeStyle = `rgba(79, 143, 255, ${fadeOpacity})`
        ctx.lineWidth = line.thickness
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      // Draw subtle outer ring of dots
      const dotCount = 24
      for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2 + time * 0.05
        const r = maxRadius * 0.85 + Math.sin(time * 0.3 + i) * 10
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        const dotOpacity = 0.1 + 0.05 * Math.sin(time + i * 0.5)

        ctx.beginPath()
        ctx.arc(x, y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(79, 143, 255, ${dotOpacity})`
        ctx.fill()
      }

      timeRef.current += 0.012
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [mounted, initLines])

  if (!mounted) {
    return <div className={className} />
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
