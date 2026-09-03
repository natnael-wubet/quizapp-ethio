import { motion, useMotionValue, useSpring } from "framer-motion"
import {
  Brain,
  Tv,
  Users,
  ArrowRight,
  Zap,
  Trophy,
  Play,
  Menu,
  X,
  Search,
  User,
  Globe,
  Timer,
  Sparkles,
  BookOpen,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { t, useLang, LOCALES, type Lang } from "@/lib/i18n"
import { ThemeSync, ThemeToggle } from "@/components/ThemeSync"
import { AnimatedBars } from "@/components/AnimatedBars"
import { ShaderBackground } from "@/components/ShaderBackground"
import { TextReveal } from "@/components/ui/text-reveal"

function LangToggle({ className }: { className?: string }) {
  const [lang, setLang] = useLang()
  const next: Lang = lang === "en" ? "am" : "en"
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      lang={next}
      className={cn(
        "grid size-9 place-items-center rounded-xl border border-slate-300/70 bg-white/60 text-xs font-bold text-slate-600 shadow-sm backdrop-blur transition hover:scale-105 hover:text-rose-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-rose-300",
        className
      )}
      aria-label={LOCALES[next].name}
    >
      <Globe className="absolute size-4 opacity-0" aria-hidden="true" />
      <span lang={next}>{LOCALES[next].flag}</span>
    </button>
  )
}

function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setLeaving(true)
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setLeaving(false)
      }, 320)
      return () => clearTimeout(t)
    }, 2400)
    return () => clearInterval(id)
  }, [words.length])

  return (
    <span className="relative block h-[1.25em] overflow-hidden">
      <span
        className="block whitespace-nowrap bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent"
        style={{
          transition:
            "opacity 0.32s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.22,1,0.36,1)",
          opacity: leaving ? 0 : 1,
          transform: leaving ? "translateY(-18px)" : "translateY(0)",
        }}
      >
        {words[index]}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block whitespace-nowrap bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent"
        style={{
          transition:
            "opacity 0.32s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.22,1,0.36,1)",
          opacity: leaving ? 1 : 0,
          transform: leaving ? "translateY(0)" : "translateY(18px)",
        }}
      >
        {words[(index + 1) % words.length]}
      </span>
    </span>
  )
}

function Navbar() {
  const [lang] = useLang()
  const [open, setOpen] = useState(false)

  const links: [string, string][] = [
    [t("navFeatures", lang), "#features"],
    [t("navArena", lang), "#arena"],
    [t("navHow", lang), "#how"],
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-2.5 shadow-lg shadow-rose-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 text-white shadow-lg shadow-rose-500/30">
              <Brain className="size-5" />
            </span>
            <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-lg font-extrabold text-transparent">
              {t("brand", lang)}
            </span>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="transition hover:text-rose-600 dark:hover:text-rose-300"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <LangToggle />
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 transition hover:text-rose-600 dark:text-slate-300"
            >
              {t("signIn", lang)}
            </Link>
            <Link
              to="/login"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {t("getStarted", lang)}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <LangToggle />
            <button
              className="grid size-9 place-items-center rounded-xl text-slate-600 dark:text-slate-300"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col gap-2 rounded-2xl border border-slate-200/70 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-slate-900/95"
          >
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-slate-200 pt-3 dark:border-slate-800">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                {t("signIn", lang)}
              </Link>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                {t("getStarted", lang)}
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

function Hero() {
  const [lang] = useLang()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 14)
    rotateX.set(-py * 14)
    mx.set(px)
    my.set(py)
  }

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      {/* animated gaming backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/60 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute left-1/2 top-0 h-full w-[120%] -translate-x-1/2 opacity-70 dark:opacity-60">
          <ShaderBackground className="h-full w-full" />
        </div>
        {/* subtle scanlines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgba(244,63,94,0.03)_2px_4px)]" />
        {/* soft radial glow for legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(255,255,255,0.85)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.9)_100%)]" />

        {/* HUD corner brackets */}
        <span className="absolute left-4 top-20 h-10 w-10 border-l-2 border-t-2 border-rose-400/30 border-rose-400/40" />
        <span className="absolute right-4 top-20 h-10 w-10 border-r-2 border-t-2 border-amber-400/30 border-amber-400/40" />
        <span className="absolute bottom-6 left-4 h-10 w-10 border-b-2 border-l-2 border-rose-400/30 border-rose-400/40" />
        <span className="absolute bottom-6 right-4 h-10 w-10 border-b-2 border-r-2 border-amber-400/30 border-amber-400/40" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-rose-600 backdrop-blur dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
              <span lang={lang}>{t("heroBadge", lang)}</span>
            </span>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl" lang={lang}>
              <TextReveal
                as="span"
                split="char"
                stagger={0.045}
                blur={16}
                yOffset="38%"
                spring={{ stiffness: 170, damping: 20, mass: 1.1 }}
                className="text-slate-900 dark:text-white"
              >
                {t("heroTitle1", lang)}
              </TextReveal>
              {/* rotating hero word */}
              <RotatingWord
                words={[
                  t("heroTitle2", lang),
                  lang === "am" ? "ተማር" : "Learn",
                  lang === "am" ? "ተጫወት" : "Play",
                  lang === "am" ? "ያድግ" : "Grow",
                ]}
              />
              <TextReveal
                as="span"
                split="char"
                stagger={0.045}
                delay={0.3}
                blur={16}
                yOffset="38%"
                spring={{ stiffness: 170, damping: 20, mass: 1.1 }}
                className="text-slate-900 dark:text-white"
              >
                {t("heroTitle3", lang)}
              </TextReveal>
            </h1>

            <TextReveal
              as="p"
              split="word"
              stagger={0.05}
              delay={0.6}
              blur={4}
              yOffset="15%"
              spring={{ stiffness: 180, damping: 26, mass: 0.9 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0 dark:text-slate-300"
              lang={lang}
            >
              {t("heroSubtitle", lang)}
            </TextReveal>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                to="/login"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-rose-500/30 transition hover:-translate-y-0.5 hover:shadow-2xl sm:w-auto"
              >
                <Play className="size-5" />
                <span lang={lang}>{t("startPlaying", lang)}</span>
              </Link>
              <a
                href="#arena"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-7 py-3.5 text-base font-semibold text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white sm:w-auto dark:border-slate-700 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                <Tv className="size-5 text-amber-500" />
                <span lang={lang}>{t("watchLive", lang)}</span>
              </a>
            </div>
          </motion.div>

          {/* Arena visual: live 1v1 matchmaking card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto hidden w-full max-w-md lg:block"
            style={{ perspective: 1200 }}
            onMouseMove={onMove}
            onMouseLeave={() => {
              rotateX.set(0)
              rotateY.set(0)
            }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="overflow-hidden rounded-3xl border border-white/20 bg-white/70 shadow-2xl shadow-rose-500/10 backdrop-blur-xl dark:bg-slate-900/60"
            >
              {/* HUD corner brackets on the duel frame */}
              <span className="pointer-events-none absolute left-2 top-2 size-5 border-l-2 border-t-2 border-rose-400/50" />
              <span className="pointer-events-none absolute right-2 top-2 size-5 border-r-2 border-t-2 border-amber-400/50" />
              <span className="pointer-events-none absolute bottom-2 left-2 size-5 border-b-2 border-l-2 border-rose-400/50" />
              <span className="pointer-events-none absolute bottom-2 right-2 size-5 border-b-2 border-r-2 border-amber-400/50" />

              {/* arena header */}
              <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-3 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200" lang={lang}>
                    <Tv className="mr-1 inline size-3.5" />
                    {t("navArena", lang)}
                  </span>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
                  <Timer className="size-3" /> 20s
                </span>
              </div>

              {/* matchmaking search */}
              <div className="space-y-4 p-5">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
                  <Search className="size-4 animate-pulse text-rose-500" />
                  <span className="text-sm text-slate-500 dark:text-slate-400" lang={lang}>
                    {t("matchmakingDesc", lang).split(".")[0]}…
                  </span>
                </div>

                {/* two players card */}
                <div className="relative flex items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-800/60">
                  <div className="flex flex-col items-center gap-2">
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/30">
                      <User className="size-6" />
                    </span>
                    <div className="w-14">
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-amber-400 to-rose-500" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Lv. 12
                    </span>
                  </div>

                  <div className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center">
                    <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-3 py-1 text-[10px] font-extrabold text-white shadow-lg">
                      <Sparkles className="size-3" />
                      {lang === "am" ? "አብረን" : "Together"}
                    </span>
                    <span className="mt-2 text-[10px] font-semibold text-rose-500" lang={lang}>
                      {t("arenaPlayersPlaying", lang)}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/30">
                      <User className="size-6" />
                    </span>
                    <div className="w-14">
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        <div className="h-full w-[55%] rounded-full bg-gradient-to-r from-amber-400 to-rose-500" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Lv. 12
                    </span>
                  </div>
                </div>

                {/* daily lesson hint */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Sparkles className="size-4 text-amber-500" />
                    <span lang={lang}>{t("howTitle", lang)}</span>
                  </div>
                  <span className="text-xs text-slate-400" lang={lang}>
                    {lang === "am" ? "የዛሬ ትምህርት" : "Today's lesson"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* floating trophies */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-6 -top-6 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/90 px-4 py-2.5 shadow-xl dark:bg-slate-800"
            >
              <Trophy className="size-5 text-amber-500" />
              <div className="text-xs font-bold text-slate-900 dark:text-white" lang={lang}>
                {t("heroTitle2", lang)}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const [lang] = useLang()
  const features = [
    {
      icon: <Brain className="size-6" />,
      color: "from-rose-500 to-orange-500",
      title: t("liveDuel", lang),
      desc: t("liveDuelDesc", lang),
    },
    {
      icon: <Tv className="size-6" />,
      color: "from-amber-500 to-rose-500",
      title: t("tvBroadcast", lang),
      desc: t("tvBroadcastDesc", lang),
    },
    {
      icon: <Users className="size-6" />,
      color: "from-orange-500 to-red-500",
      title: t("matchmaking", lang),
      desc: t("matchmakingDesc", lang),
    },
    {
      icon: <BookOpen className="size-6" />,
      color: "from-rose-500 to-amber-500",
      title: t("learningPaths", lang),
      desc: t("learningPathsDesc", lang),
    },
  ]

  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
            <Zap className="size-4" />
            <span lang={lang}>{t("featuresEyebrow", lang)}</span>
          </span>
          <TextReveal
            as="h2"
            split="char"
            stagger={0.03}
            blur={9}
            yOffset="28%"
            spring={{ stiffness: 160, damping: 22, mass: 1 }}
            whileInView
            className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl"
            lang={lang}
          >
            {t("featuresTitle", lang)}
          </TextReveal>
          <TextReveal
            as="p"
            split="word"
            stagger={0.04}
            delay={0.3}
            blur={4}
            yOffset="14%"
            spring={{ stiffness: 180, damping: 26, mass: 0.9 }}
            whileInView
            className="mt-4 text-lg text-slate-600 dark:text-slate-300"
            lang={lang}
          >
            {t("featuresSub", lang)}
          </TextReveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-500/10 dark:border-white/10 dark:bg-white/5"
            >
              <div
                className={cn(
                  "absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition group-hover:opacity-25",
                  f.color
                )}
              />
              <div
                className={cn(
                  "mb-5 grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                  f.color
                )}
              >
                {f.icon}
              </div>
              <TextReveal
                as="h3"
                split="word"
                stagger={0.03}
                blur={3}
                yOffset="20%"
                spring={{ stiffness: 190, damping: 26, mass: 0.8 }}
                whileInView
                className="text-lg font-bold text-slate-900 dark:text-white"
                lang={lang}
              >
                {f.title}
              </TextReveal>
              <TextReveal
                as="p"
                split="word"
                stagger={0.02}
                delay={0.15}
                blur={2}
                yOffset="12%"
                spring={{ stiffness: 200, damping: 28, mass: 0.8 }}
                whileInView
                className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                lang={lang}
              >
                {f.desc}
              </TextReveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Arena() {
  const [lang] = useLang()
  return (
    <section id="arena" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-950 via-slate-950 to-amber-950" />
      <div className="pointer-events-none absolute -top-32 right-0 size-[30rem] rounded-full bg-rose-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-[30rem] rounded-full bg-amber-500/20 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-rose-200">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
              <span lang={lang}>{t("arenaEyebrow", lang)}</span>
            </span>
            <TextReveal
              as="h2"
              split="char"
              stagger={0.035}
              blur={10}
              yOffset="30%"
              spring={{ stiffness: 160, damping: 22, mass: 1 }}
              whileInView
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
              lang={lang}
            >
              {t("arenaTitle", lang)}
            </TextReveal>
            <TextReveal
              as="p"
              split="word"
              stagger={0.05}
              delay={0.35}
              blur={4}
              yOffset="15%"
              spring={{ stiffness: 180, damping: 26, mass: 0.9 }}
              whileInView
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
              lang={lang}
            >
              {t("arenaSub", lang)}
            </TextReveal>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-rose-500/30 transition hover:-translate-y-0.5"
              >
                <Sparkles className="size-5" />
                <span lang={lang}>{t("joinArena", lang)}</span>
              </Link>
            </div>
            <p className="mt-4 max-w-md text-sm text-white/60" lang={lang}>
              {t("joinArenaSub", lang)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
              {/* broadcast mock */}
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900">
                <AnimatedBars
                  className="absolute inset-0 h-full w-full opacity-50"
                  colorA="rgba(251,113,133,0.7)"
                  colorB="rgba(251,191,36,0.6)"
                  colorC="rgba(251,146,60,0.4)"
                />
                <div className="relative flex h-full flex-col items-center justify-center gap-3 text-center">
                  <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                    </span>
                    LIVE
                  </span>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg">
                        <User className="size-7" />
                      </span>
                      <span className="text-xs font-bold text-white">Learner 1</span>
                    </div>
                    <span className="text-2xl font-extrabold text-white">&amp;</span>
                    <div className="flex flex-col items-center gap-2">
                      <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 text-white shadow-lg">
                        <User className="size-7" />
                      </span>
                      <span className="text-xs font-bold text-white">Learner 2</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-2/3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "65%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-400"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-300">
                    <Timer className="size-4" /> 00:08
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-4 -top-5 flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-2.5 shadow-2xl"
            >
              <Users className="size-5 text-amber-500" />
              <div className="text-xs font-bold text-slate-900" lang={lang}>
                {t("arenaPlayersPlaying", lang)}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const [lang] = useLang()
  const steps = [
    { icon: <User className="size-5" />, title: t("step1Title", lang), desc: t("step1Desc", lang) },
    { icon: <Search className="size-5" />, title: t("step2Title", lang), desc: t("step2Desc", lang) },
    { icon: <Sparkles className="size-5" />, title: t("step3Title", lang), desc: t("step3Desc", lang) },
  ]

  return (
    <section id="how" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
            <Play className="size-4" />
            <span lang={lang}>{t("howEyebrow", lang)}</span>
          </span>
          <TextReveal
            as="h2"
            split="char"
            stagger={0.03}
            blur={9}
            yOffset="28%"
            spring={{ stiffness: 160, damping: 22, mass: 1 }}
            whileInView
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            lang={lang}
          >
            {t("howTitle", lang)}
          </TextReveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-3xl border border-slate-200/70 bg-white/70 p-8 backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <span className="absolute right-6 top-5 bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-4xl font-extrabold text-transparent">
                0{i + 1}
              </span>
              <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/30">
                {s.icon}
              </div>
              <TextReveal
                as="h3"
                split="word"
                stagger={0.03}
                blur={3}
                yOffset="20%"
                spring={{ stiffness: 190, damping: 26, mass: 0.8 }}
                whileInView
                className="text-lg font-bold text-slate-900 dark:text-white"
                lang={lang}
              >
                {s.title}
              </TextReveal>
              <TextReveal
                as="p"
                split="word"
                stagger={0.02}
                delay={0.15}
                blur={2}
                yOffset="12%"
                spring={{ stiffness: 200, damping: 28, mass: 0.8 }}
                whileInView
                className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                lang={lang}
              >
                {s.desc}
              </TextReveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  const [lang] = useLang()
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-10 text-center shadow-2xl shadow-slate-500/10 backdrop-blur sm:p-16 dark:border-white/10 dark:bg-white/5"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-rose-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 size-64 rounded-full bg-amber-500/20 blur-3xl" />

          <div className="relative">
            <span className="mb-6 inline-block text-6xl">🧠</span>
            <TextReveal
              as="h2"
              split="char"
              stagger={0.03}
              blur={9}
              yOffset="28%"
              spring={{ stiffness: 160, damping: 22, mass: 1 }}
              whileInView
              className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl"
              lang={lang}
            >
              {t("ctaTitle", lang)}
            </TextReveal>
            <TextReveal
              as="p"
              split="word"
              stagger={0.04}
              delay={0.3}
              blur={4}
              yOffset="14%"
              spring={{ stiffness: 180, damping: 26, mass: 0.9 }}
              whileInView
              className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300"
              lang={lang}
            >
              {t("ctaSub", lang)}
            </TextReveal>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/login"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-rose-500/30 transition hover:-translate-y-0.5 hover:shadow-2xl sm:w-auto"
              >
                <span lang={lang}>{t("getStarted", lang)}</span>
                <ArrowRight className="size-5 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  const [lang] = useLang()
  return (
    <footer className="border-t border-slate-200 bg-white/60 dark:border-white/10 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 text-white">
                <Brain className="size-5" />
              </span>
              <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-lg font-bold text-transparent">
                {t("brand", lang)}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400" lang={lang}>
              {t("footerTagline", lang)}
            </p>
          </div>

          {[
            [t("productCol", lang), ["Brain games", "Learn together", "Live shows", "Quizzes"]],
            [t("companyCol", lang), ["About", "Careers", "Press", "Blog"]],
            [t("supportCol", lang), ["Help", "Terms", "Privacy", "Contact"]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white" lang={lang}>
                {title}
              </h3>
              <ul className="mt-4 space-y-3">
                {(links as string[]).map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row dark:border-white/10">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} {t("brand", lang)}. {t("copyright", lang)}
          </p>
          <LangToggle />
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-slate-900 dark:text-white">
      <ThemeSync />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Arena />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
