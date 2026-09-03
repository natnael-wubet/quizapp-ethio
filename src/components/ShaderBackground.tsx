import { useMantineColorScheme } from "@mantine/core"
import { useReducedMotion } from "@mantine/hooks"
import { NeuroNoise } from "@paper-design/shaders-react"
import type { CSSProperties } from "react"

type ShaderBackgroundProps = {
  className?: string
  /** Animation speed multiplier (0 freezes). */
  speed?: number
  style?: CSSProperties
}

/**
 * beUI/@paper-design WebGL shader background — "Neuro" variant, tuned to a
 * warm rose→amber→coral palette that feels like the glow of focused learning
 * (not a casino vibe). Dark-mode aware and honors reduced motion by pausing.
 */
export function ShaderBackground({ className, speed = 0.3, style }: ShaderBackgroundProps) {
  const reduceMotion = useReducedMotion()
  const colorScheme = useMantineColorScheme().colorScheme
  const dark = colorScheme === "dark"

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
