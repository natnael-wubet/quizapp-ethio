import { useEffect, useRef } from "react"

type AnimatedBgProps = {
  className?: string
  colorA?: string
  colorB?: string
  colorC?: string
}

/**
 * Slow, silky aurora drift + a faint perspective grid floor + sparse floating
 * dust — a subtle gaming atmosphere without being loud. Canvas-rendered.
 */
export function AnimatedBars({
  className,
  colorA = "rgba(99,102,241,0.5)",
  colorB = "rgba(217,70,239,0.4)",
  colorC = "rgba(34,211,238,0.3)",
}: AnimatedBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0

    const resize = () => {
      const { parentElement } = canvas
      if (!parentElement) return
      width = parentElement.clientWidth
      height = parentElement.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const frac = (i: number, n: number) => i / Math.max(n - 1, 1)

    const aurora = [
      { cy: 0.4, amp: 0.16, f1: 0.012, f2: 0.006, sp: 0.05, ph: 0, r: 0.55, c: colorA },
      { cy: 0.55, amp: 0.2, f1: 0.008, f2: 0.004, sp: 0.035, ph: 2.1, r: 0.6, c: colorB },
      { cy: 0.7, amp: 0.13, f1: 0.016, f2: 0.008, sp: 0.07, ph: 4.2, r: 0.42, c: colorC },
    ]

    const gridLines = 9
    const gridHoriz = 7
    const gridSpacing = width / (gridLines - 1)

    // precompute dust particles
    const dust = Array.from({ length: 26 }, (_, i) => ({
      x: frac(i, 26),
      y: 0.2 + ((i * 37) % 60) / 100,
      size: 0.6 + ((i * 13) % 20) / 16,
      ph: (i * 1.7) % (Math.PI * 2),
      sp: 0.3 + ((i * 5) % 30) / 60,
    }))

    const draw = (t: number) => {
      const time = t / 1000
      ctx.clearRect(0, 0, width, height)

      // --- aurora blobs ---
      for (const b of aurora) {
        const cy = height * b.cy
        const amp = height * b.amp
        const phase = time * b.sp + b.ph

        const grad = ctx.createRadialGradient(width / 2, cy, 0, width / 2, cy, height * b.r)
        grad.addColorStop(0, b.c)
        grad.addColorStop(1, "rgba(0,0,0,0)")

        ctx.beginPath()
        ctx.moveTo(0, height)
        for (let x = 0; x <= width; x += width / 110) {
          const lift =
            Math.sin(x * b.f1 + phase) * amp +
            Math.sin(x * b.f2 * 2.4 + phase * 0.7 + b.ph) * amp * 0.55
          ctx.lineTo(x, cy + lift)
        }
        ctx.lineTo(width, height)
        ctx.closePath()
        ctx.globalAlpha = 0.55
        ctx.fillStyle = grad
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // --- faint perspective grid (retro-arena vibe) ---
      const horizonY = height * 0.82
      ctx.lineWidth = 1
      ctx.strokeStyle = "currentColor"
      // verticals converging to a vanishing point
      for (let i = 0; i < gridLines; i++) {
        const gx = i * gridSpacing
        ctx.globalAlpha = 0.05
        ctx.beginPath()
        ctx.moveTo(width / 2, horizonY)
        ctx.lineTo(gx, height)
        ctx.stroke()
      }
      // horizontal scanlines widening toward viewer
      for (let j = 0; j < gridHoriz; j++) {
        const f = j / (gridHoriz - 1)
        ctx.globalAlpha = 0.05
        ctx.beginPath()
        ctx.moveTo(0, horizonY + (height - horizonY) * f * f)
        ctx.lineTo(width, horizonY + (height - horizonY) * f * f)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // --- floating dust ---
      for (const d of dust) {
        const dx = d.x * width
        const dy = d.y * height + Math.sin(time * d.sp + d.ph) * 14
        ctx.globalAlpha = 0.22
        ctx.fillStyle = "currentColor"
        ctx.beginPath()
        ctx.arc(dx, dy, d.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [colorA, colorB, colorC])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
