import { motion } from "framer-motion"
import {
  Brain,
  Zap,
  Flame,
  Trophy,
  Medal,
  Play,
  Tv,
  Users,
  Puzzle,
  Target,
  Sparkles,
  Clock,
  BookOpen,
  Gamepad2,
  User,
  Globe,
  Search,
  LogOut,
} from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { t, useLang, LOCALES, type Lang } from "@/lib/i18n"
import { ThemeToggle } from "@/components/ThemeSync"
import { ShaderBackground } from "@/components/ShaderBackground"

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

function BrandMark() {
  const [lang] = useLang()
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 text-white shadow-lg shadow-rose-500/30">
        <Brain className="size-5" />
      </span>
      <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-lg font-extrabold text-transparent">
        {t("brand", lang)}
      </span>
    </Link>
  )
}

type Decor = React.ElementType

function DecorDots({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => {
        const x = (i * 37) % 200
        const y = (i * 53) % 200
        return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.5} fill="white" fillOpacity="0.18" />
      })}
    </svg>
  )
}

function DecorWaves({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 60 C 50 20, 150 100, 200 60" stroke="white" strokeOpacity="0.25" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M0 100 C 50 60, 150 140, 200 100" stroke="white" strokeOpacity="0.18" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M0 140 C 50 100, 150 180, 200 140" stroke="white" strokeOpacity="0.1" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function DecorGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="white" strokeOpacity="0.12" strokeWidth="1.5">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="200" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="200" y2={i * 20} />
        ))}
      </g>
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={(i * 61) % 180} y={(i * 73) % 180} width="18" height="18" rx="5" fill="white" fillOpacity="0.14" />
      ))}
    </svg>
  )
}

function DecorBubbles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="150" cy="50" r="30" fill="white" fillOpacity="0.12" />
      <circle cx="40" cy="40" r="14" fill="white" fillOpacity="0.16" />
      <circle cx="190" cy="150" r="22" fill="white" fillOpacity="0.1" />
      <circle cx="30" cy="160" r="26" fill="white" fillOpacity="0.12" />
      <circle cx="100" cy="20" r="8" fill="white" fillOpacity="0.2" />
      <circle cx="60" cy="100" r="10" fill="white" fillOpacity="0.14" />
    </svg>
  )
}

function DecorStars({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[
        [30, 30, 6], [170, 40, 4], [60, 120, 5], [150, 130, 7], [90, 170, 4], [180, 170, 5], [20, 100, 4], [110, 60, 3],
      ].map(([cx, cy, r], i) => (
        <path
          key={i}
          d={`M ${cx} ${cy - (r as number)} L ${cx + (r as number) * 0.4} ${cy - (r as number) * 0.4} L ${cx + (r as number)} ${cy} L ${cx + (r as number) * 0.4} ${cy + (r as number) * 0.4} L ${cx} ${cy + (r as number)} L ${cx - (r as number) * 0.4} ${cy + (r as number) * 0.4} L ${cx - (r as number)} ${cy} L ${cx - (r as number) * 0.4} ${cy - (r as number) * 0.4} Z`}
          fill="white"
          fillOpacity="0.2"
        />
      ))}
    </svg>
  )
}

function DecorSymbols({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="white" strokeOpacity="0.2" strokeWidth="3" fill="none" strokeLinecap="round">
        <circle cx="50" cy="50" r="12" />
        <circle cx="50" cy="50" r="3" fill="white" />
        <rect x="130" y="30" width="16" height="16" rx="3" />
        <path d="M170 90 l8 8 -8 8 -8 -8 z" />
        <path d="M40 130 l8 8 -8 8 -8 -8 z" />
        <circle cx="150" cy="160" r="6" />
        <path d="M20 80 l6 6 -6 6 -6 -6 z" />
        <path d="M180 190 l8 8 -8 8 -8 -8 z" />
      </g>
    </svg>
  )
}

type ShowcaseItem = {
  title: string
  titleAm: string
  subj: string
  tag: string
  base: string
  glow: string
  icon: React.ElementType
  desc: string
  descAm: string
  decor?: Decor
}

const GAMES: ShowcaseItem[] = [
  {
    title: "Number Ninja", titleAm: "ቁጥር ኒንጃ", subj: "Maths", tag: "1.2k players",
    base: "bg-rose-900", glow: "from-rose-500/60", icon: Zap, decor: DecorGrid,
    desc: "Slice through fractions and speed-maths rounds before the clock runs out.",
    descAm: "ሰዓቱ ከማለቁ በፊት ክፍልፋዮችንና ፈጣን ስሌቶችን ይመልሱ።",
  },
  {
    title: "Word Wizard", titleAm: "ቃል አዋቂ", subj: "English", tag: "980 players",
    base: "bg-indigo-900", glow: "from-indigo-500/60", icon: BookOpen, decor: DecorStars,
    desc: "Spell, match synonyms and build your vocabulary one playful round at a time.",
    descAm: "ተመሳሳይ ቃላትን ይግጥሙና በጨዋታ ቃላትዎን ያሳድጉ።",
  },
  {
    title: "Amharic Quest", titleAm: "የአማርኛ ጉዞ", subj: "Amharic", tag: "1.5k players",
    base: "bg-amber-800", glow: "from-amber-500/60", icon: Puzzle, decor: DecorSymbols,
    desc: "Proverbs, letters and reading challenges that celebrate Amharic.",
    descAm: "አማርኛን የሚያከብሩ ምሳሌዎች፣ ፊደላት እና የንባብ ፈተናዎች።",
  },
  {
    title: "Brain Bender", titleAm: "የአእምሮ እንቆቅልሽ", subj: "Logic", tag: "760 players",
    base: "bg-fuchsia-900", glow: "from-fuchsia-500/60", icon: Brain, decor: DecorBubbles,
    desc: "Patterns, riddles and puzzles that stretch your thinking.",
    descAm: "አስተሳሰብዎን የሚያስፋፉ ቅጦች፣ እንቆቅልሾች እና ፕዝሎች።",
  },
  {
    title: "Science Sprint", titleAm: "የሳይንስ ውድድር", subj: "Science", tag: "640 players",
    base: "bg-emerald-900", glow: "from-emerald-500/60", icon: Sparkles, decor: DecorStars,
    desc: "Race through quick questions about nature, body and the world.",
    descAm: "ስለ ተፈጥሮ፣ ሰውነት እና ዓለም ፈጣን ጥያቄዎችን ይመልሱ።",
  },
  {
    title: "Geo Explorer", titleAm: "የጂኦ አሳሽ", subj: "Geography", tag: "520 players",
    base: "bg-sky-900", glow: "from-sky-500/60", icon: Target, decor: DecorDots,
    desc: "Explore regions, capitals and landmarks across Ethiopia and beyond.",
    descAm: "በኢትዮጵያ እና ከዚያም በላይ ክልሎችን፣ ከተሞችን እና መሬቶችን ያስሱ።",
  },
]

const LIVE: ShowcaseItem[] = [
  { title: "1v1 Quick Duel", titleAm: "ፈጣን ውድድር", subj: "Live", tag: "Now", base: "bg-rose-950", glow: "from-rose-500/60", icon: Users, decor: DecorSymbols, desc: "Go head-to-head with a player answering at the same time.", descAm: "ከአንድ ተጫዋች ጋር ፊት ለፊት ተገናኝ" },
  { title: "TV Quiz Night", titleAm: "የጥያቄ ምሽት", subj: "Live TV", tag: "19:00", base: "bg-violet-950", glow: "from-violet-500/60", icon: Tv, decor: DecorStars, desc: "Answer along with the studio show and win on-air rewards.", descAm: "ከቴሌቪዥን ትርኢቱ ጋር አብረው መልስ" },
  { title: "Team Trivia", titleAm: "የቡድን ጥያቄ", subj: "Team", tag: "20:30", base: "bg-orange-950", glow: "from-orange-500/60", icon: Users, decor: DecorBubbles, desc: "Form a squad with friends and tackle group questions.", descAm: "ከጓደኞች ጋር ቡድን ይፍጠሩ" },
  { title: "Rapid Fire", titleAm: "ፈጣን መልስ", subj: "Solo", tag: "21:00", base: "bg-red-950", glow: "from-red-500/60", icon: Zap, decor: DecorWaves, desc: "A solo speed round — how many can you get right in 60s?", descAm: "በፍጥነት መልስ ይስጡ" },
]

function Showcase({ items }: { items: ShowcaseItem[] }) {
  const [lang] = useLang()
  const cards = [...items, ...items]
  return (
    <div className="marquee-paused relative overflow-hidden py-2">
      <div className="flex w-max gap-5 animate-marquee">
        {cards.map((g, i) => (
          <button
            key={`${g.title}-${i}`}
            className={cn(
              "group relative h-72 w-[80vw] shrink-0 overflow-hidden rounded-3xl border border-white/20 text-left text-white shadow-2xl sm:w-[440px]",
              g.base
            )}
          >
            {/* soft radial glow */}
            <div className={cn("pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gradient-to-br blur-3xl", g.glow)} />
            <div className="pointer-events-none absolute -bottom-24 -left-12 size-56 rounded-full bg-black/30 blur-3xl" />
            {g.decor && <g.decor className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />}

            {/* subtle depth veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl border border-white/25 bg-white/15 shadow-lg backdrop-blur-md">
                  <g.icon className="size-6" />
                </span>
                <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">
                  {g.tag}
                </span>
              </div>

              <div className="relative">
                <span className="text-xs font-bold uppercase tracking-wide text-white/60">{g.subj}</span>
                <h3 className="mt-0.5 text-2xl font-extrabold sm:text-3xl" lang={lang}>
                  {lang === "am" ? g.titleAm : g.title}
                </h3>

                <div className="mt-3 grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-sm text-sm text-white/80" lang={lang}>
                      {lang === "am" ? g.descAm : g.desc}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-rose-600 shadow-lg">
                      <Play className="size-4 fill-current" />
                      {t("dashPlayNow", lang)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [lang] = useLang()

  return (
    <div className="relative min-h-screen font-sans text-slate-900 dark:text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-white dark:bg-slate-950">
        <ShaderBackground variant="neuro" className="h-full w-full" />
      </div>

      {/* navbar */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-3 rounded-2xl border border-white/40 bg-white/70 px-4 py-2.5 shadow-lg shadow-rose-500/10 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70">
            <BrandMark />

            <div className="hidden items-center gap-1 lg:flex">
              {[
                [t("dashNavGames", lang), true],
                [t("dashNavArena", lang), false],
                [t("dashNavLearn", lang), false],
                [t("dashNavProfile", lang), false],
              ].map(([label, active]) => (
                <button
                  key={label as string}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25"
                      : "text-slate-600 hover:bg-white/60 hover:text-rose-600 dark:text-slate-300 dark:hover:bg-white/5"
                  )}
                >
                  {label as string}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-xl border border-white/40 bg-white/50 px-3 py-1.5 md:flex dark:border-white/10 dark:bg-white/5">
                <Search className="size-4 text-slate-400" />
                <input
                  placeholder={t("dashSearch", lang)}
                  className="w-28 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
              <ThemeToggle />
              <LangToggle />
              <button
                className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/30"
                aria-label="Profile"
              >
                <User className="size-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        {/* greeting + chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-rose-500">
              <span lang={lang}>{t("dashGreeting", lang)}</span> 👋
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {lang === "am" ? "ወደ ጨዋታ መድረክ" : "Level up your"} <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                {lang === "am" ? "ብሬንፕሌይ ደህና መጡ" : "brain 🎮"}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Zap, label: t("dashXp", lang), value: "12,480", grad: "from-amber-500 to-orange-500" },
              { icon: Flame, label: t("dashStreak", lang), value: "14", grad: "from-rose-500 to-red-500" },
              { icon: Medal, label: t("dashLevel", lang), value: "12", grad: "from-orange-500 to-rose-500" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2.5 rounded-2xl border border-white/40 bg-white/70 px-4 py-2.5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70"
              >
                <span className={cn("grid size-9 place-items-center rounded-xl bg-gradient-to-br text-white shadow", s.grad)}>
                  <s.icon className="size-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-base font-extrabold">{s.value}</p>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* featured arena spotlight */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-10 overflow-hidden rounded-3xl border border-white/40 p-8 shadow-2xl shadow-rose-500/20 sm:p-10"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500" />
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-white/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md text-white">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">
                <Tv className="size-3.5" /> {t("dashFeatured", lang)}
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {lang === "am" ? "የቀጥታ ጥያቄ ትርኢት" : "Live Quiz Night"}
              </h2>
              <p className="mt-2 text-white/80">
                {lang === "am" ? "በሁሉም ሰው ፊት ለፊት ተጫወትና ያሸንፍ።" : "Answer on air and win big. Joining in 5 min."}
              </p>
              <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-rose-600 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
                <Play className="size-4 fill-current" />
                {t("dashJoinLive", lang)}
              </button>
            </div>
            <div className="flex items-center gap-6 text-white">
              {[
                { icon: Users, label: "2,401", sub: lang === "am" ? "ተጫዋቾች" : "players" },
                { icon: Trophy, label: "500", sub: lang === "am" ? "ሽልማት" : "XP prize" },
                { icon: Clock, label: "5:00", sub: lang === "am" ? "ጊዜ" : "in" },
              ].map((s) => (
                <div key={s.sub} className="flex flex-col items-center gap-1 text-center">
                  <s.icon className="size-5 opacity-80" />
                  <span className="text-xl font-extrabold">{s.label}</span>
                  <span className="text-xs text-white/70">{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* games showcase */}
        <section className="mb-10">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">{t("dashGamesTitle", lang)}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t("dashGamesSub", lang)}</p>
            </div>
          </div>
          <Showcase items={GAMES} />
        </section>

        {/* live / duels showcase */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
              <Gamepad2 className="size-6 text-rose-500" />
              {t("dashVSCarousel", lang)}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("dashLiveTitle", lang)}</p>
          </div>
          <Showcase items={LIVE} />
        </section>

        {/* continue quest + sign out */}
        <section className="rounded-3xl border border-white/40 bg-white/70 p-6 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 text-white shadow-lg shadow-rose-500/30">
                <Target className="size-7" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-500">{t("dashProgress", lang)}</p>
                <h3 className="mt-0.5 text-lg font-bold" lang={lang}>
                  {lang === "am" ? "ክፍልፋዮች፣ ደረጃ 4" : "Fractions, Lesson 4"}
                </h3>
                <div className="mt-2 h-2 max-w-sm overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/25 transition hover:-translate-y-0.5">
                {t("dashResume", lang)} <Play className="size-4" />
              </button>
              <button className="flex items-center gap-1.5 rounded-xl border border-white/40 bg-white/40 px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:border-rose-300 hover:text-rose-500 dark:bg-white/5 dark:text-slate-400">
                <LogOut className="size-4" />
                {t("dashSignOut", lang)}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
