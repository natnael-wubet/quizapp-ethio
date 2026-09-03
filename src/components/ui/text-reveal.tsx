import {
  type Transition,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion"
import { isValidElement, useMemo, useRef, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

type SplitMode = "word" | "char"

export interface TextRevealProps {
  /** If omitted, the string is harvested from `children`. */
  text?: string | string[]
  as?: ElementType
  className?: string
  split?: SplitMode
  stagger?: number
  delay?: number
  blur?: number
  yOffset?: string | number
  spring?: { stiffness?: number; damping?: number; mass?: number }
  once?: boolean
  whileInView?: boolean
  children?: ReactNode
  lang?: string
}

const DEFAULT_SPRING = { stiffness: 140, damping: 26, mass: 1.2 }

type WordGroup = { text: string; trailing: string }

function toWordGroups(line: string): WordGroup[] {
  const chunks = line.match(/\S+\s*|\s+/g) ?? []
  return chunks.map((chunk) => {
    const text = chunk.replace(/\s+$/, "")
    return { text, trailing: chunk.slice(text.length) }
  })
}

/** Extract a plain string out of a ReactNode (handles nested wrapper elements). */
function toPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(toPlainText).join("")
  if (isValidElement(node)) return toPlainText((node.props as { children?: ReactNode }).children)
  return ""
}

/** beUI-style TextReveal adapted for framer-motion. */
export function TextReveal({
  text,
  as: Comp = "span",
  className,
  split = "word",
  stagger = 0.09,
  delay = 0,
  blur = 12,
  yOffset = "40%",
  spring,
  once = true,
  whileInView = false,
  children,
  lang,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element | null>, {
    once,
    amount: 0.4,
  })
  const reduce = useReducedMotion()
  const shouldAnimate = whileInView ? inView : true

  const lines = useMemo(() => {
    if (text !== undefined) return Array.isArray(text) ? text : [text]
    return [toPlainText(children)]
  }, [text, children])

  const s = { ...DEFAULT_SPRING, ...spring }

  let unitIndex = 0
  const lineCounts = new Map<string, number>()

  return (
    <Comp ref={ref as React.Ref<HTMLElement>} className={cn("block", className)} lang={lang}>
      {lines.map((line) => {
        const lineKey = `${line}-${(lineCounts.get(line) ?? 0)}`
        lineCounts.set(line, (lineCounts.get(line) ?? 0) + 1)
        const unitCounts = new Map<string, number>()

        const renderUnit = (unit: string) => {
          const d = delay + unitIndex * stagger
          // oxlint-disable-next-line react/immutability
          unitIndex += 1
          const unitCount = unitCounts.get(unit) ?? 0
          unitCounts.set(unit, unitCount + 1)
          const unitKey = `${unit}-${unitCount}`
          const initial = reduce
            ? { opacity: 0 }
            : { y: yOffset, opacity: 0, filter: `blur(${blur}px)` }
          const animate = shouldAnimate
            ? reduce
              ? { opacity: 1 }
              : { y: 0, opacity: 1, filter: "blur(0px)" }
            : initial
          const transition: Transition = reduce
            ? { opacity: { duration: 0.25, ease: EASE_OUT, delay: d * 0.3 } }
            : {
                y: { type: "spring" as const, ...s, delay: d },
                opacity: { duration: 0.7, ease: EASE_OUT, delay: d },
                filter: { duration: 0.9, ease: EASE_OUT, delay: d },
              }
          return (
            <motion.span
              key={unitKey}
              initial={initial}
              animate={animate}
              transition={transition}
              className="inline-block whitespace-pre will-change-transform"
            >
              {unit}
            </motion.span>
          )
        }

        const groups = toWordGroups(line)
        const groupCounts = new Map<string, number>()

        return (
          <span key={lineKey} className="block">
            {groups.map((group) => {
              const whole = group.text + group.trailing
              if (split !== "char") return renderUnit(whole)

              const groupCount = groupCounts.get(whole) ?? 0
              groupCounts.set(whole, groupCount + 1)
              return (
                <span
                  key={`${whole}-${groupCount}`}
                  className="inline-block whitespace-pre"
                >
                  {Array.from(whole).map((char) => renderUnit(char))}
                </span>
              )
            })}
          </span>
        )
      })}
    </Comp>
  )
}
