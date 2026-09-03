import { useEffect } from "react"
import { useMantineColorScheme } from "@mantine/core"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeSync() {
  const { colorScheme } = useMantineColorScheme()

  useEffect(() => {
    const root = document.documentElement
    if (colorScheme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
  }, [colorScheme])

  return null
}

export function ThemeToggle({ className }: { className?: string }) {
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const isDark = colorScheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setColorScheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "grid size-9 place-items-center rounded-xl border border-slate-300/70 bg-white/60 text-slate-600 shadow-sm backdrop-blur transition hover:scale-105 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-indigo-300",
        className
      )}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
