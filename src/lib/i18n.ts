import { atom, useAtom } from "jotai"

export type Lang = "en" | "am"

export const LOCALES: Record<Lang, { name: string; flag: string; dir: "ltr" | "rtl" }> = {
  en: { name: "English", flag: "EN", dir: "ltr" },
  am: { name: "አማርኛ", flag: "አማ", dir: "ltr" },
}

function detectLang(): Lang {
  if (typeof window === "undefined") return "en"
  const stored = window.localStorage.getItem("bp.lang")
  if (stored === "am" || stored === "en") return stored
  return navigator.language.toLowerCase().startsWith("am") ? "am" : "en"
}

export const langAtom = atom<Lang>(detectLang())

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useAtom(langAtom)
  const set = (l: Lang) => {
    if (typeof window !== "undefined") window.localStorage.setItem("bp.lang", l)
    document.documentElement.lang = l
    setLang(l)
  }
  return [lang, set]
}

type Dict = {
  [K in string]: { en: string; am: string }
}

export const t = (key: keyof typeof strings, lang: Lang) => strings[key][lang]

// Central copy. Keep it real and useful — no invented metrics.
const strings: Dict = {
  brand: {
    en: "BrainPlay",
    am: "ብሬንፕሌይ",
  },
  navFeatures: { en: "Features", am: "ባህሪያት" },
  navArena: { en: "Live Shows", am: "የቀጥታ ትርኢቶች" },
  navHow: { en: "How it works", am: "እንዴት ይሰራል" },
  signIn: { en: "Sign in", am: "ግባ" },
  getStarted: { en: "Get started", am: "ጀምር" },
  heroBadge: {
    en: "Train your brain with fun quizzes, puzzles & live shows",
    am: "በአስደሳች ጥያቄዎች፣ እንቆቅልሾች እና የቀጥታ ትርኢቶች አእምሮህን አሰልጥን",
  },
  heroTitle1: { en: "Learn fast.", am: "በፍጥነት ተማር።" },
  heroTitle2: { en: "Have fun.", am: "ተዝናና።" },
  heroTitle3: { en: "Grow brighter.", am: "ብሩህ ሁን።" },
  heroSubtitle: {
    en: "A friendly place to train your brain. Play quizzes and brain puzzles, learn new things every day, and grow your knowledge at your own pace — with warm guides and friends, not pressure.",
    am: "አእምሮህን የምታሰለጥንበት ወዳጃዊ ቦታ። ጥያቄዎችንና የአእምሮ እንቆቅልሾችን ተጫወት፣ በየቀኑ አዳዲስ ነገሮችን ተማር፣ እና በራስህ ፍጥነት እውቀትህን አሳድግ — በግፊት ሳይሆን በሙቀትና በጓደኝነት።",
  },
  startPlaying: { en: "Start learning", am: "መማር ጀምር" },
  watchLive: { en: "Watch a live show", am: "የቀጥታ ትርኢት ተመልከት" },
  featuresEyebrow: { en: "Made for curious minds", am: "ለማወቅ ለሚፈልጉ አእምሮዎች የተሰራ" },
  featuresTitle: { en: "Learning that feels like play", am: "እንደ ጨዋታ የሚሰማ ትምህርት" },
  featuresSub: {
    en: "Grow your knowledge one friendly challenge at a time — with gentle guidance, real progress, and rewards that motivate, never pressure.",
    am: "በትህትና መመሪያ፣ በእውነተኛ እድገት እና በሚያነሳሹ እና የማይጫኑ ሽልማቶች — አንድ በአንድ እውቀትህን አዳብር።",
  },
  liveDuel: { en: "Live brain workouts", am: "የቀጥታ የአእምሮ ልምምድ" },
  liveDuelDesc: {
    en: "Match with a friend and tackle the same questions side by side. Same fun, same pace — a shared way to learn, not a fight.",
    am: "ከጓደኛ ጋር ተጣመርና ተመሳሳይ ጥያቄዎችን አብራችሁ ይመልሱ። ተመሳሳይ ደስታ፣ ተመሳሳይ ፍጥነት — ውድድር ሳይሆን የመማር የጋራ መንገድ።",
  },
  tvBroadcast: { en: "Learn along with the show", am: "ከትርኢቱ ጋር ተማር" },
  tvBroadcastDesc: {
    en: "Educational shows stream friendly challenges to everyone watching — answer along at home and grow your knowledge together.",
    am: "ትምህርታዊ ትርኢቶች ለሁሉም ተመልካቾች ወዳጃዊ ጥያቄዎችን ያሰራጫሉ — በቤት ሆነህ መልስና እውቀትህን አብረው አዳብር።",
  },
  matchmaking: { en: "Friendly study partners", am: "ወዳጃዊ የትምህርት አጋሮች" },
  matchmakingDesc: {
    en: "Matched by what you're learning and your level, so every session is just the right challenge — encouraging, never overwhelming.",
    am: "በምትማረው ነገር እና በደረጃህ መሰረት ስለሚጣመሩ እያንዳንዱ ክፍለ ጊዜ ትክክለኛ ፈተና ነው — የሚያበረታታ፣ የማይጫን።",
  },
  learningPaths: { en: "Guided learning paths", am: "የመማሪያ መስመሮች" },
  learningPathsDesc: {
    en: "Follow curated tracks that turn today's small wins into real understanding — building confidence step by step.",
    am: "የዛሬን ትናንሽ ስኬቶች ወደ እውነተኛ ግንዛቤ የሚቀይሩ ትምህርቶችን ተከተል — በራስ መተማመንን ደረጃ በደረጃ መገንባት።",
  },
  arenaEyebrow: { en: "Live learning shows", am: "የቀጥታ የትምህርት ትርኢቶች" },
  arenaTitle: { en: "Grow together, on air", am: "በአየር ላይ አብረው ያድጉ" },
  arenaSub: {
    en: "Cheer on learners as they solve questions live. One question at a time, everyone watching learns something new — and maybe you'll be next.",
    am: "ተማሪዎች ጥያቄዎችን በቀጥታ ሲመልሱ አበረታታቸው። በአንድ ጊዜ አንድ ጥያቄ፣ ሁሉም ተመልካች አዲስ ነገር ይማራል — እና ምናልባትም ቀጣዩ አንተ ትሆናለህ።",
  },
  joinArena: { en: "Start a learning show", am: "የትምህርት ትርኢት ጀምር" },
  joinArenaSub: {
    en: "Create a free account, pick something you're curious about, and begin your learning journey today.",
    am: "ነጻ መለያ ፍጠር፣ ስለማወቅ የምትፈልገውን ምረጥ፣ እና ዛሬውኑ የትምህርት ጉዞህን ጀምር።",
  },
  howEyebrow: { en: "How it works", am: "እንዴት ይሰራል" },
  howTitle: { en: "A simple path to growing your mind", am: "አእምሮህን ለማደግ ቀላል መንገድ" },
  step1Title: { en: "Pick what you love", am: "የምትወደውን ምረጥ" },
  step1Desc: {
    en: "Sign up free and choose your favorite topics. Learn at your own pace with gentle, fun lessons.",
    am: "በነጻ ይመዝገብና የምትወዳቸውን ርዕሶች ምረጥ። በራስህ ፍጥነት በቀላልና አስደሳች ትምህርቶች ተማር።",
  },
  step2Title: { en: "Play & learn", am: "ተጫወትና ተማር" },
  step2Desc: {
    en: "Answer quizzes and puzzles, earn encouraging rewards, and watch your understanding grow day by day.",
    am: "ጥያቄዎችንና እንቆቅልሾችን መልስ፣ የሚያበረታቱ ሽልማቶችን አግኝ፣ እና ግንዛቤህ ቀን በቀን ሲያድግ ተመልከት።",
  },
  step3Title: { en: "Share your progress", am: "እድገትህን አጋራ" },
  step3Desc: {
    en: "Celebrate milestones, join live learning shows, and inspire others on their own journey.",
    am: "ስኬቶችህን አክብር፣ የቀጥታ የትምህርት ትርኢቶችን ተቀላቀል፣ እና በጉዟቸው ላይ ሌሎችን አበረታታ።",
  },
  ctaTitle: { en: "Your next lesson is one tap away", am: "የሚቀጥለው ትምህርትህ አንድ ጠቅታ ብቻ ነው" },
  ctaSub: {
    en: "Free to start. Curious minds welcome. Come learn something new today.",
    am: "ለመጀመር ነጻ። የማወቅ ጉጉት ያላቸው ሁሉ እንኳን ደህና መጡ። ዛሬ አዲስ ነገር ለመማር ና።",
  },
  footerTagline: {
    en: "A warm, friendly space to grow your knowledge through play.",
    am: "በጨዋታ አማካኝነት እውቀትህን የምታዳብርበት ሞቅ ያለና ወዳጃዊ ቦታ።",
  },
  productCol: { en: "Product", am: "ምርት" },
  companyCol: { en: "Company", am: "ኩባንያ" },
  supportCol: { en: "Support", am: "ድጋፍ" },
  copyright: { en: "All rights reserved.", am: "መብቱ በህግ የተጠበቀ ነው።" },
  switchLangTo: { en: "አማርኛ", am: "English" },
  arenaPlayersPlaying: { en: "learning together", am: "አብረው ይማራሉ" },
}
