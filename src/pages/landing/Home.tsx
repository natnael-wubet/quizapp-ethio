import { motion, useScroll, useTransform } from "framer-motion"
import {
  Brain,
  Trophy,
  Tv,
  Puzzle,
  Star,
  Zap,
  Users,
  ArrowRight,
  Sparkles,
  Flame,
  Medal,
  Timer,
  GraduationCap,
  LayoutGrid,
  Code2,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Play,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/70 px-4 py-3 shadow-lg shadow-indigo-500/5 backdrop-blur-xl dark:bg-slate-900/70">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30">
              <Brain className="size-5" />
            </span>
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-lg font-bold text-transparent">
              BrainPlay
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-indigo-600">
              Features
            </a>
            <a href="#categories" className="transition hover:text-indigo-600">
              Categories
            </a>
            <a href="#play" className="transition hover:text-indigo-600">
              How it works
            </a>
            <a href="#live" className="transition hover:text-indigo-600">
              TV Shows
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-300"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-xl hover:shadow-indigo-500/40"
            >
              Get started
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            className="grid size-9 place-items-center rounded-lg text-slate-600 md:hidden dark:text-slate-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:hidden dark:bg-slate-900/95"
          >
            {[
              ["Features", "#features"],
              ["Categories", "#categories"],
              ["How it works", "#play"],
              ["TV Shows", "#live"],
            ].map(([label, href]) => (
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
                Sign in
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, -80])
  const y2 = useTransform(scrollY, [0, 500], [0, 120])

  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-[34rem] rounded-full bg-gradient-to-br from-indigo-500/40 via-violet-500/30 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -top-20 -right-40 size-[36rem] rounded-full bg-gradient-to-bl from-fuchsia-500/30 via-purple-500/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-64 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-400/20 to-cyan-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/60 px-4 py-1.5 text-xs font-semibold text-indigo-600 backdrop-blur dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
            >
              <Sparkles className="size-4 text-amber-400" />
              Play · Learn · Compete on Live TV
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="block text-slate-900 dark:text-white">
                Learn
                <span className="mx-2 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Play
                </span>
                Master
              </span>
              <span className="mt-2 block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                Every Day.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0 dark:text-slate-300"
            >
              BrainPlay turns learning into an adventure. Tackle quizzes, solve mind-bending puzzles, climb the leaderboard, and go head-to-head with viewers in live TV competitions.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-center lg:justify-start"
            >
              <Link
                to="/signup"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-500/40 sm:w-auto"
              >
                <Play className="size-5" />
                Start Playing Free
              </Link>
              <a
                href="#live"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/60 px-7 py-3.5 text-base font-semibold text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white sm:w-auto dark:border-slate-700 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                <Tv className="size-5 text-violet-500" />
                Watch Live Shows
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start"
            >
              {[
                ["50K+", "Active learners"],
                ["10K+", "Questions"],
                ["1.2M", "Answers given"],
              ].map(([num, label]) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {num}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto hidden w-full max-w-md lg:block"
          >
            <motion.div style={{ y: y1 }} className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/70 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl dark:bg-white/5">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Flame className="size-4 text-amber-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Daily Challenge
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
                    +50 XP
                  </span>
                </div>
                <div className="space-y-3 p-5">
                  {[
                    {
                      icon: <Star className="size-4 text-amber-500" />,
                      q: "What is the capital of Australia?",
                      tag: "Geography",
                      tagColor: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300",
                    },
                    {
                      icon: <Code2 className="size-4 text-indigo-500" />,
                      q: "Fix the bug: `return x ++`",
                      tag: "Coding",
                      tagColor: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300",
                    },
                    {
                      icon: <Medal className="size-4 text-emerald-500" />,
                      q: "Which planet has the most moons?",
                      tag: "Science",
                      tagColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                      className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span
                            className={cn(
                              "inline-block rounded-full px-2 py-0.5 text-[10px] font-bold",
                              item.tagColor
                            )}
                          >
                            {item.tag}
                          </span>
                          <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                            {item.q}
                          </p>
                        </div>
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-50 dark:bg-slate-700/60">
                          {item.icon}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -left-8 top-10 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/80 px-4 py-3 shadow-xl backdrop-blur dark:bg-slate-800/80"
              >
                <Trophy className="size-6 text-amber-500" />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    #1 Rank
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Weekly Leaderboard
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute -right-6 -bottom-6 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/80 px-4 py-3 shadow-xl backdrop-blur dark:bg-slate-800/80"
              >
                <Zap className="size-6 text-violet-500" />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Level 12
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Keep going!
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div style={{ y: y2 }} className="absolute -right-16 -top-8">
              <div className="grid size-24 place-items-center rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-5xl shadow-2xl shadow-violet-500/40">
                🧩
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      icon: <Brain className="size-6" />,
      color: "from-indigo-500 to-violet-500",
      shadow: "shadow-indigo-500/30",
      title: "Smart Quizzes",
      desc: "Six question types from MCQ to live coding challenges, all tailored to your level.",
    },
    {
      icon: <Puzzle className="size-6" />,
      color: "from-fuchsia-500 to-pink-500",
      shadow: "shadow-fuchsia-500/30",
      title: "Mind Puzzles",
      desc: "Crosswords, logic grids, riddles, and more. Fire up your neurons every single day.",
    },
    {
      icon: <Tv className="size-6" />,
      color: "from-violet-500 to-purple-500",
      shadow: "shadow-violet-500/30",
      title: "Live TV Shows",
      desc: "Compete in real-time against thousands of viewers from your phone while watching TV.",
    },
    {
      icon: <Trophy className="size-6" />,
      color: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/30",
      title: "Gamified Learning",
      desc: "XP, levels, badges, and streaks keep you motivated with every correct answer.",
    },
    {
      icon: <Users className="size-6" />,
      color: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/30",
      title: "Leaderboards",
      desc: "Climb global, category, and weekly rankings. Beat friends and the best minds.",
    },
    {
      icon: <GraduationCap className="size-6" />,
      color: "from-cyan-500 to-blue-500",
      shadow: "shadow-cyan-500/30",
      title: "Learning Paths",
      desc: "Follow curated tracks that build real understanding, one engaging challenge at a time.",
    },
  ]

  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold text-violet-600 dark:bg-violet-500/10 dark:text-violet-300"
          >
            <Zap className="size-4" /> Everything you need
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              More than a quiz app.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-slate-600 dark:text-slate-300"
          >
            A complete learning and entertainment experience built for curious minds
            of every age.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-7 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-500/10 dark:border-white/10 dark:bg-white/5"
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
                  f.color,
                  f.shadow
                )}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { icon: <Timer className="size-5" />, value: "<100ms", label: "Realtime latency" },
    { icon: <Globe className="size-5" />, value: "6", label: "Question types" },
    { icon: <ShieldCheck className="size-5" />, value: "RLS", label: "Secure by design" },
    { icon: <Users className="size-5" />, value: "∞", label: "Live participants" },
  ]

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-8 shadow-2xl shadow-violet-500/30 sm:p-12"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-white/10 blur-2xl" />

        <div className="relative grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="mx-auto mb-3 grid size-11 place-items-center rounded-full bg-white/15 text-white">
                {s.icon}
              </div>
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="mt-1 text-sm font-medium text-white/80">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Categories() {
  const categories = [
    { emoji: "🌍", name: "Geography", color: "from-cyan-400/40 to-blue-500/40", q: "1,240 questions" },
    { emoji: "🧪", name: "Science", color: "from-emerald-400/40 to-teal-500/40", q: "980 questions" },
    { emoji: "💻", name: "Coding", color: "from-indigo-400/40 to-violet-500/40", q: "760 questions" },
    { emoji: "📜", name: "History", color: "from-amber-400/40 to-orange-500/40", q: "1,050 questions" },
    { emoji: "🎨", name: "Arts", color: "from-pink-400/40 to-rose-500/40", q: "520 questions" },
    { emoji: "🧠", name: "Logic", color: "from-violet-400/40 to-purple-500/40", q: "430 puzzles" },
  ]

  return (
    <section id="categories" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
              <LayoutGrid className="size-4" /> Explore topics
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find your favourite subject
            </h2>
          </div>
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-300"
          >
            Browse all
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {categories.map((c) => (
            <motion.div
              key={c.name}
              variants={fadeUp}
              className={cn(
                "group cursor-pointer rounded-3xl border border-slate-200/70 p-6 text-center backdrop-blur transition hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10",
                "bg-gradient-to-br",
                c.color
              )}
            >
              <span className="mb-3 block text-4xl transition group-hover:scale-110">
                {c.emoji}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white">{c.name}</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{c.q}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <Users className="size-5" />,
      title: "Create your profile",
      desc: "Sign up in seconds and pick your favourite topics and difficulty level.",
    },
    {
      num: "02",
      icon: <Zap className="size-5" />,
      title: "Play & earn XP",
      desc: "Answer quizzes and puzzles correctly to earn XP, streaks, and badges.",
    },
    {
      num: "03",
      icon: <Tv className="size-5" />,
      title: "Compete live",
      desc: "Join live TV shows from your phone and beat thousands of viewers in real time.",
    },
  ]

  return (
    <section id="play" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-fuchsia-100 px-4 py-1.5 text-xs font-semibold text-fuchsia-600 dark:bg-fuchsia-500/10 dark:text-fuchsia-300">
            <Play className="size-4" /> How it works
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            From curiosity to champion
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Three simple steps to start your learning journey.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-3xl border border-slate-200/70 bg-white/70 p-8 backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <span className="absolute right-6 top-5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-4xl font-extrabold text-transparent">
                {s.num}
              </span>
              <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LiveTV() {
  return (
    <section id="live" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900" />
      <div className="pointer-events-none absolute -top-32 right-0 size-[30rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-[30rem] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-fuchsia-200">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
              Live TV Competitions
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Be part of the show,
              <span className="mt-2 block bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                right from your seat.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              When the show airs, open BrainPlay and join with a code or QR. Answer
              questions in real time, watch your ranking climb, and compete against
              thousands of viewers — all synced to the broadcast in under 100ms.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Scan a QR or enter a code to join instantly",
                "Live questions, timers, and score updates",
                "See your rank as it changes in real time",
                "Win exclusive badges and prizes",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-fuchsia-500/30 transition hover:-translate-y-0.5"
            >
              <Tv className="size-5" />
              Join the next show
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <span className="text-5xl">📺</span>
                  <p className="px-6 text-sm font-medium text-white/80">
                    Question 5 of 10 · Math Battle
                  </p>
                  <div className="h-2 w-3/4 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "50%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400"
                    />
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-fuchsia-300">
                    <Timer className="size-4" /> 00:12
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 px-2 pb-2">
                {["A", "B", "C"].map((opt, i) => (
                  <div
                    key={opt}
                    className={cn(
                      "rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold",
                      i === 1 ? "bg-emerald-500/20 text-emerald-300" : "text-white/70"
                    )}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-6 -top-6 flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 shadow-2xl backdrop-blur"
            >
              <Trophy className="size-5 text-amber-500" />
              <div>
                <div className="text-xs font-bold text-slate-900">23,491</div>
                <div className="text-[10px] text-slate-500">viewers playing</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-10 text-center shadow-2xl shadow-slate-500/10 backdrop-blur sm:p-16 dark:border-white/10 dark:bg-white/5"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 size-64 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative">
            <span className="mb-4 inline-block text-5xl">🚀</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                Ready to level up?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Join thousands of learners turning everyday moments into brain-powered
              victories. It's free to start.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:shadow-2xl sm:w-auto"
              >
                Create free account
                <ArrowRight className="size-5 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#features"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Explore features
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/60 dark:border-white/10 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white">
                <Brain className="size-5" />
              </span>
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-lg font-bold text-transparent">
                BrainPlay
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Learn, play, and compete. The educational quiz platform that makes
              every day a little smarter.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Categories", "Puzzles", "Leaderboards"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Press", "Blog"],
            },
            {
              title: "Support",
              links: ["Help Center", "Terms", "Privacy", "Contact"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300"
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
            © {new Date().getFullYear()} BrainPlay. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" /> All systems
              operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white font-sans text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:text-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Categories />
        <HowItWorks />
        <LiveTV />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
