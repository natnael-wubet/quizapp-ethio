import { useEffect, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Brain,
  ArrowLeft,
  ArrowRight,
  Phone,
  Lock,
  Mail,
  GraduationCap,
  Sparkles,
  Leaf,
  BookOpen,
  Trophy,
  FlaskConical,
  CalendarDays,
  Check,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ShaderBackground } from "@/components/ShaderBackground"
import { ThemeToggle } from "@/components/ThemeSync"
import { cn } from "@/lib/utils"

type Method = "email" | "phone"
type Role = "student" | "teacher" | "hobby" | "other"
type Purpose = "learn" | "challenge" | "test"

type Onboarding = {
  role: Role
  birthDate: string
  purpose: Purpose
  grade?: string
  extra?: string
}

const GRADES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

const ONBOARDING_KEY = "brainplay_pending_onboarding"

const ROLES: { value: Role; icon: typeof BookOpen; label: string; grad: string }[] = [
  { value: "student", icon: GraduationCap, label: "Student", grad: "from-rose-500 to-orange-500" },
  { value: "teacher", icon: BookOpen, label: "Teacher", grad: "from-amber-500 to-rose-500" },
  { value: "hobby", icon: Sparkles, label: "Curious", grad: "from-orange-500 to-amber-500" },
  { value: "other", icon: Leaf, label: "Other", grad: "from-rose-500 to-amber-500" },
]

const PURPOSES: { value: Purpose; icon: typeof BookOpen; label: string; grad: string }[] = [
  { value: "learn", icon: BookOpen, label: "To learn", grad: "from-orange-500 to-amber-500" },
  { value: "challenge", icon: Trophy, label: "To challenge", grad: "from-rose-500 to-orange-500" },
  { value: "test", icon: FlaskConical, label: "To test", grad: "from-amber-500 to-rose-500" },
]

const inputCls =
  "w-full rounded-xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none backdrop-blur-md transition placeholder:text-slate-400 focus:border-rose-400 focus:bg-white/85 focus:ring-4 focus:ring-rose-500/15 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/10"

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signup")
  const [step, setStep] = useState(0) // 0 = auth, 1 = post-auth "Your info"
  const [method, setMethod] = useState<Method>("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [onboard, setOnboard] = useState<Onboarding>({
    role: "student",
    birthDate: "",
    purpose: "learn",
    grade: "7",
    extra: "",
  })
  const [info, setInfo] = useState(0)

  // If a session already exists and onboarding was left pending (e.g. after a
  // Google OAuth redirect returned here), skip straight to filling info — but
  // only if the user isn't already onboarded.
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session?.user && sessionStorage.getItem(ONBOARDING_KEY)) {
        sessionStorage.removeItem(ONBOARDING_KEY)
        if (await userNeedsOnboarding()) {
          setInfo(0)
          setStep(1)
        } else {
          go("/dashboard")
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isStudent = onboard.role === "student"
  // The "Your info" phase is a set of separated slides (one question each).
  const profileSlides = isStudent
    ? ["I am a…", "Grade", "Why are you here?", "Your birthday"]
    : ["I am a…", "Why are you here?", "Your birthday"]
  const infoTotal = profileSlides.length
  const infoLast = info === infoTotal - 1

  const isInfoSlide = (kind: "role" | "grade" | "purpose" | "birth") => {
    const slide = profileSlides[info]
    return (
      (kind === "role" && slide === "I am a…") ||
      (kind === "grade" && slide === "Grade") ||
      (kind === "purpose" && slide === "Why are you here?") ||
      (kind === "birth" && slide === "Your birthday")
    )
  }

  const title = step === 0
    ? otpSent ? "Enter your code" : mode === "signup" ? "Create your account" : "Sign in"
    : profileSlides[info]

  function startInfoPhase() {
    setError(null)
    setInfo(0)
  }
  function nextInfo() {
    setError(null)
    setInfo((i) => Math.min(infoTotal - 1, i + 1))
  }
  function prevInfo() {
    setInfo((i) => Math.max(0, i - 1))
  }

  function continueInfo() {
    setError(null)
    if (isInfoSlide("birth") && !onboard.birthDate)
      return setError("Pick your birthday.")
    if (infoLast) {
      completeOnboarding()
      return
    }
    nextInfo()
  }

  function goBack() {
    reset()
    if (step === 1) {
      if (info > 0) prevInfo()
      else setStep(0)
      return
    }
    if (otpSent) {
      setOtpSent(false)
      return
    }
    setStep(Math.max(0, step - 1))
  }

  const set = (patch: Partial<Onboarding>) => setOnboard((o) => ({ ...o, ...patch }))
  const reset = () => {
    setError(null)
    setOtp("")
  }

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  const validPhone = () => /^\+?[1-9]\d{6,14}$/.test(phone)
  const go = (path: string) => window.location.assign(path)

  async function currentUser() {
    // Use getSession (reads the cached local session, no network call) so we
    // don't fire an /auth/v1/user request that 401s when there is no session.
    const { data } = await supabase.auth.getSession()
    return data.session?.user ?? null
  }

  async function saveProfile(
    user: { id: string; email?: string | null; phone?: string | null },
    o: Onboarding,
  ) {
    const age = o.birthDate
      ? new Date().getFullYear() - Number(o.birthDate.slice(0, 4))
      : null
    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email ?? null,
      phone: user.phone ?? null,
      role: o.role,
      age,
      birth_year: o.birthDate ? Number(o.birthDate.slice(0, 4)) : null,
      purpose: o.purpose,
      grade: o.role === "student" ? o.grade : null,
      extra_info: o.extra || null,
      onboarded: true,
      updated_at: new Date().toISOString(),
    })
  }

  // Whether the current user still needs to fill onboarding (no saved profile yet).
  async function userNeedsOnboarding() {
    const user = await currentUser()
    if (!user) return false
    const { data } = await supabase
      .from("profiles")
      .select("id, onboarded")
      .eq("id", user.id)
      .maybeSingle()
    return !data?.onboarded
  }

  // Finish the "Your info" slides: persist the profile, then go to the app.
  async function completeOnboarding() {
    setError(null)
    setLoading(true)
    try {
      const user = await currentUser()
      if (!user) throw new Error("Not signed in.")
      await saveProfile(user, onboard)
      go("/dashboard")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save your info.")
      setLoading(false)
    }
  }

  async function submitAuth() {
    setError(null)

    // Phone: if a code was already sent, verify it.
    if (method === "phone" && otpSent) {
      if (!otp) return setError("Enter the code you received.")
      setLoading(true)
      try {
        const { error } = await supabase.auth.verifyOtp({ type: "sms", phone, token: otp })
        if (error) throw error
        if (await userNeedsOnboarding()) {
          startInfoPhase()
          setStep(1)
        } else {
          go("/dashboard")
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Invalid code.")
        setLoading(false)
      }
      return
    }

    if (method === "phone") {
      if (!validPhone()) return setError("Enter a valid phone number.")
      setLoading(true)
      try {
        const { error } = await supabase.auth.signInWithOtp({ phone })
        if (error) throw error
        setOtpSent(true)
        setError(null)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not send code.")
      } finally {
        setLoading(false)
      }
      return
    }

    // Email + password
    if (!validateEmail(email)) return setError("Enter a valid email address.")
    if (!password) return setError("Enter your password.")

    if (mode === "signin") {
      setLoading(true)
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        go("/dashboard")
      } catch (e) {
        setError(e instanceof Error ? e.message : "Sign in failed.")
        setLoading(false)
      }
      return
    }

    // Sign up with email: authenticate first, collect info afterwards.
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      if (await userNeedsOnboarding()) {
        startInfoPhase()
        setStep(1)
      } else {
        go("/dashboard")
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create account.")
      setLoading(false)
    }
  }

  async function startGoogle() {
    setError(null)
    setLoading(true)
    sessionStorage.setItem(ONBOARDING_KEY, "1")
    const redirectTo = `${window.location.origin}/login`
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      })
      if (error) throw error
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Google sign-in failed."
      console.error("Google OAuth error:", msg, { redirectTo })
      setError(
        /unauthor/i.test(msg) || /redirect/i.test(msg)
          ? "Google sign-in is not fully configured. Add this callback URL in Supabase → Auth → URL Configuration → Redirect URLs, and enable the Google provider:"
            + ` ${redirectTo}`
          : msg,
      )
      setLoading(false)
    }
  }

  const actionLabel = step === 1
    ? "Finish"
    : otpSent
      ? "Verify"
      : mode === "signin" && method === "email"
        ? "Sign in"
        : method === "phone"
          ? "Send code"
          : "Create account"

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none fixed inset-0 z-0 bg-slate-50 dark:bg-slate-950">
        <ShaderBackground variant="warp" className="h-full w-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          key={step + mode}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 shadow-[0_8px_40px_-6px_rgba(244,63,94,0.25)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/15 dark:bg-slate-900/70"
        >
          <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-white/40 via-white/10 to-white/20 dark:from-white/10 dark:via-transparent dark:to-white/5" />
          <div className="pointer-events-none absolute -top-1/2 left-1/2 h-full w-2/3 -translate-x-1/2 rotate-12 bg-gradient-to-b from-white/60 to-transparent blur-2xl dark:from-white/10" />
          <div className="relative z-10">

          <div className="border-b border-white/40 p-6 sm:p-7 dark:border-white/10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <BrandMark />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <ModeTabs
                  mode={mode}
                  onChange={(m) => {
                    reset()
                    setMode(m)
                    setInfo(0)
                    setStep(0)
                  }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {mode === "signup" && step === 0
                ? "Create your account"
                : title}
            </h2>
            {step === 0 && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {mode === "signup" ? "Takes about a minute." : "Good to see you again"}
              </p>
            )}
          </div>

          <div className="p-6 sm:p-7">
            {step === 1 && (
              <div className="mb-5 space-y-2">
                <div className="flex justify-end text-xs font-semibold text-slate-400 dark:text-slate-500">
                  Step {info + 1} of {infoTotal}
                </div>
                <div className="flex gap-1.5">
                  {profileSlides.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition",
                        i <= info
                          ? "bg-gradient-to-r from-rose-500 to-amber-500"
                          : "bg-slate-200 dark:bg-white/10"
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 0 && !otpSent && (
                <motion.div
                  key="cred"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <StepCredentials
                    mode={mode}
                    method={method}
                    setMethod={setMethod}
                    email={email}
                    setEmail={setEmail}
                    phone={phone}
                    setPhone={setPhone}
                    password={password}
                    setPassword={setPassword}
                  />
                </motion.div>
              )}

              {step === 0 && otpSent && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <StepOtp
                    phone={phone}
                    otp={otp}
                    setOtp={setOtp}
                    onBack={() => setOtpSent(false)}
                  />
                </motion.div>
              )}

              {step === 1 && isInfoSlide("role") && (
                <Slide key="role">
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map((r) => (
                      <Tile
                        key={r.value}
                        active={onboard.role === r.value}
                        onClick={() => set({ role: r.value })}
                        icon={r.icon}
                        label={r.label}
                        grad={r.grad}
                      />
                    ))}
                  </div>
                </Slide>
              )}

              {step === 1 && isInfoSlide("grade") && (
                <Slide key="grade">
                  <div className="grid grid-cols-6 gap-2">
                    {GRADES.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => set({ grade: g })}
                        className={cn(
                          "grid size-11 place-items-center rounded-xl border text-sm font-bold transition",
                          onboard.grade === g
                            ? "border-transparent bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg"
                            : "border-white/40 bg-white/40 text-slate-600 hover:border-rose-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </Slide>
              )}

              {step === 1 && isInfoSlide("purpose") && (
                <Slide key="purpose">
                  <div className="space-y-2">
                    {PURPOSES.map((p) => (
                      <Tile
                        key={p.value}
                        active={onboard.purpose === p.value}
                        onClick={() => set({ purpose: p.value })}
                        icon={p.icon}
                        label={p.label}
                        grad={p.grad}
                        big
                      />
                    ))}
                  </div>
                </Slide>
              )}

              {step === 1 && isInfoSlide("birth") && (
                <Slide key="birth">
                  <BirthPicker
                    value={onboard.birthDate}
                    onChange={(v) => set({ birthDate: v })}
                  />
                </Slide>
              )}
            </AnimatePresence>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
              >
                {error}
              </motion.p>
            )}

            {/* Action */}
            <div className="mt-5 space-y-4">
              {step !== 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex w-full items-center justify-center gap-1 text-sm text-slate-500 transition hover:text-rose-600 dark:text-slate-400"
                >
                  <ArrowLeft className="size-4" /> Back
                </button>
              )}
              <button
                type="button"
                onClick={step === 1 ? continueInfo : submitAuth}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-6 py-3.5 text-base font-bold text-white shadow-xl shadow-rose-500/30 transition hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
              >
                {loading ? "One moment…" : step === 1 && !infoLast ? "Continue" : actionLabel}
                <ArrowRight className="size-5" />
              </button>

              {step === 0 && !otpSent && (
                <>
                  <Separator label="or sign in with" />
                  <GoogleButton onClick={startGoogle} loading={loading} />
                </>
              )}
            </div>
          </div>
          </div>
        </motion.div>

        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
          By continuing you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  )
}

/* ---------------- sub-components ---------------- */

function BrandMark() {
  return (
    <Link to="/" className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/30">
      <Brain className="size-6" />
    </Link>
  )
}

function ModeTabs({ mode, onChange }: { mode: "signin" | "signup"; onChange: (m: "signin" | "signup") => void }) {
  return (
    <div className="flex shrink-0 rounded-xl bg-slate-100 p-1 dark:bg-white/5">
      {(["signin", "signup"] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          className={cn(
            "rounded-lg px-4 py-1.5 text-sm font-bold transition",
            mode === m
              ? "bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/30"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          )}
        >
          {m === "signin" ? "Sign in" : "Sign up"}
        </button>
      ))}
    </div>
  )
}

function Separator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="h-px flex-1 bg-white/50 dark:bg-white/15" />
      <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <span className="h-px flex-1 bg-white/50 dark:bg-white/15" />
    </div>
  )
}

function Tile({
  active,
  onClick,
  icon: Icon,
  label,
  grad,
  big,
}: {
  active: boolean
  onClick: () => void
  icon: typeof BookOpen
  label: string
  grad: string
  big?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-2xl border text-left transition",
        big ? "p-5" : "p-4",
        active
          ? "border-transparent bg-gradient-to-br from-rose-500/15 to-amber-500/15 ring-2 ring-rose-500/30 dark:from-rose-500/15 dark:to-amber-500/15"
          : "border-white/40 bg-white/40 hover:border-rose-300 dark:border-white/10 dark:bg-white/5"
      )}
    >
      <span
        className={cn(
          "grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
          grad
        )}
      >
        <Icon className={big ? "size-7" : "size-6"} />
      </span>
      <span className="text-base font-bold text-slate-900 dark:text-white">{label}</span>
      <span
        className={cn(
          "ml-auto grid size-6 shrink-0 place-items-center rounded-full text-white transition",
          active ? "bg-rose-500" : "bg-slate-200 dark:bg-white/10"
        )}
      >
        {active ? <Check className="size-4" /> : null}
      </span>
    </button>
  )
}

function GoogleButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
    >
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-xs font-black text-white">
        G
      </span>
      Continue with Google
    </button>
  )
}

function StepCredentials({
  mode, method, setMethod, email, setEmail, phone, setPhone, password, setPassword,
}: {
  mode: "signin" | "signup"
  method: Method
  setMethod: (m: Method) => void
  email: string
  setEmail: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  password: string
  setPassword: (v: string) => void
}) {
  const tabCls = (active: boolean) =>
    cn(
      "flex items-center justify-center gap-2 rounded-xl border px-3 py-3 font-semibold transition",
      active
        ? "border-rose-400 bg-gradient-to-br from-rose-50 to-amber-50 text-rose-600 dark:from-rose-500/10 dark:to-amber-500/10 dark:border-rose-500/40 dark:text-rose-300"
        : "border-slate-200/80 text-slate-600 dark:border-white/10 dark:text-slate-300"
    )
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setMethod("email")} className={tabCls(method === "email")}>
          <Mail className="size-4" /> Email
        </button>
        <button type="button" onClick={() => setMethod("phone")} className={tabCls(method === "phone")}>
          <Phone className="size-4" /> Phone
        </button>
      </div>

      <input
        type={method === "email" ? "email" : "tel"}
        value={method === "email" ? email : phone}
        onChange={(e) => (method === "email" ? setEmail(e.target.value) : setPhone(e.target.value))}
        placeholder={method === "email" ? "you@example.com" : "+1 555 000 0000"}
        className={inputCls}
      />

      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={mode === "signup" ? "Create a password (6+ chars)" : "Your password"}
          className={cn(inputCls, "pl-10")}
        />
      </div>
    </div>
  )
}

function Slide({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function BirthPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const max = new Date().toISOString().slice(0, 10)
  return (
    <div>
      <label
        htmlFor="birthday"
        className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 transition hover:border-rose-300 focus-within:border-rose-400 focus-within:ring-4 focus-within:ring-rose-500/10 dark:border-white/10 dark:bg-white/5"
      >
        <span className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
          <CalendarDays className="size-5" />
          {value ? prettyDate(value) : "Pick your birthday"}
        </span>
        <input
          id="birthday"
          type="date"
          value={value}
          max={max}
          min="2008-01-01"
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-sm font-semibold text-slate-900 outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
        />
      </label>
      <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
        We use this to keep quizzes age-appropriate, nothing personal.
      </p>
    </div>
  )
}

function prettyDate(iso: string) {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return iso
  }
}

function StepOtp({
  phone, otp, setOtp, onBack,
}: {
  phone: string
  otp: string
  setOtp: (v: string) => void
  onBack: () => void
}) {
  return (
    <div className="space-y-4 text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Code sent to{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          {phone}
        </span>
      </p>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        inputMode="numeric"
        autoFocus
        placeholder="•  •  •  •  •  •"
        className={cn(inputCls, "text-center text-2xl font-bold tracking-[0.4em]")}
      />
      <button type="button" onClick={() => onBack()} className="text-sm text-slate-500 hover:text-rose-600 dark:text-slate-400">
        Wrong number? Go back
      </button>
    </div>
  )
}
