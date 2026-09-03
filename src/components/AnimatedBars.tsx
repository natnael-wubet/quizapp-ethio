import { useEffect, useRef } from "react"

type AnimatedBarsProps = {
  className?: string
  numBars?: number
  colorA?: string
  colorB?: string
  duration?: number
}

/**
 * Groot Studio–inspired animated bars: a set of pulsating vertical gradient
 * bars that give the hero a fluid, energetic "live arena" backdrop.
 * Rendered on a <canvas> so it respects dark/light at runtime via CSS vars.
 */
export function AnimatedBars({
  className,
  numBars = 28,
  colorA = "#6366f1",
  colorB = "#d946ef",
  duration = 4,
}: AnimatedBarsProps) {
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

    const rand = (min: number, max: number) => Math.random() * (max - min) + min
    const phases = Array.from({ length: numBars }, () => rand(0, Math.PI * 2))
    const speeds = Array.from({ length: numBars }, () => rand(0.5, 1.5))
    const offsets = Array.from({ length: numBars }, () => rand(0, 40))

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      const time = t / 1000

      for (let i = 0; i < numBars; i++) {
        const x = (i / Math.max(numBars - 1, 1)) * width
        const bw = Math.max(6, width / numBars - 8)
        const pulse =
          0.55 + 0.45 * Math.sin(time * speeds[i] * (2 * Math.PI / duration) + phases[i])
        const bh = Math.max(20, height * (0.35 + 0.55 * pulse))

        const grad = ctx.createLinearGradient(0, height - bh, 0, height)
        grad.addColorStop(0, colorA)
        grad.addColorStop(1, colorB)

        ctx.globalAlpha = 0.28 + 0.35 * pulse
        ctx.fillStyle = grad
        const rx = bw / 2
        ctx.beginPath()
        ctx.moveTo(x - rx + offsets[i], height)
        ctx.quadraticCurveTo(x - rx + offsets[i], height - bh, x + offsets[i], height - bh + 20)
        ctx.quadraticCurveTo(x + rx + offsets[i], height - bh, x + rx + offsets[i], height)
        ctx.closePath()
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [numBars, colorA, colorB, duration])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
