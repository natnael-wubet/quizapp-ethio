import { useMantineColorScheme } from "@mantine/core"
import { useReducedMotion } from "@mantine/hooks"
import { NeuroNoise, Warp } from "@paper-design/shaders-react"
import type { CSSProperties } from "react"

type ShaderBackgroundProps = {
  className?: string
  /** Animation speed multiplier (0 freezes). */
  speed?: number
  style?: CSSProperties
  /** Which beUI shader to render — "neuro" (default) or "warp". */
  variant?: "neuro" | "warp"
}

/**
 * beUI/@paper-design WebGL shader background — warm rose→amber→coral palette
 * that feels like the glow of focused learning (not a casino vibe). Dark-mode
 * aware and honors reduced motion by pausing.
 */
export function ShaderBackground({ className, speed = 0.3, style, variant = "neuro" }: ShaderBackgroundProps) {
  const reduceMotion = useReducedMotion()
  const colorScheme = useMantineColorScheme().colorScheme
  const dark = colorScheme === "dark"

  if (variant === "warp") {
    return (
      <Warp
        speed={reduceMotion ? 0 : speed}
        colors={dark ? ["#1b0f12", "#43141a", "#8a3b1f", "#f2955c"] : ["#fff7f5", "#ffd6c9", "#ff9c6e", "#f2542d"]}
        scale={2.2}
        rotation={150}
        proportion={0.42}
        softness={1}
        shape="stripes"
        shapeScale={0.55}
        distortion={0.35}
        swirl={0.7}
        swirlIterations={8}
        fit="cover"
        className={className}
        style={style}
      />
    )
  }

  return (
    <NeuroNoise
      speed={reduceMotion ? 0 : speed}
      colorFront={dark ? "#fda4af" : "#fb7185"}
      colorMid={dark ? "#fb923c" : "#f97316"}
      colorBack={dark ? "#1c1016" : "#fff1f2"}
      brightness={0.5}
      contrast={1.1}
      fit="cover"
      scale={1.15}
      className={className}
      style={style}
    />
  )
}
