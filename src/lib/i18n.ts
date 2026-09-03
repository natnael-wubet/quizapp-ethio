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
  navArena: { en: "Live Arena", am: "የቀጥታ መድረክ" },
  navHow: { en: "How it works", am: "እንዴት ይሰራል" },
  signIn: { en: "Sign in", am: "ግባ" },
  getStarted: { en: "Get started", am: "ጀምር" },
  heroBadge: {
    en: "Live 1v1 quiz battles, streaming on TV",
    am: "የቀጥታ 1v1 የጥያቄ ጨዋታ፣ በቴሌቪዥን ስርጭት",
  },
  heroTitle1: { en: "Learn fast.", am: "በፍጥነት ተማር።" },
  heroTitle2: { en: "Battle live.", am: "በቀጥታ ተወዳደር።" },
  heroTitle3: { en: "Win on air.", am: "በአየር ላይ አሸንፍ።" },
  heroSubtitle: {
    en: "Face real opponents in head-to-head quiz duels. Every match is broadcast live for a watching arena — and every win earns you XP, badges, and a shot at the TV championship.",
    am: "ትክክለኛ ተጫዋቾችን በአንድ-ለ-አንድ የጥያቄ ውድድር ገጥማቸው። እያንዳንዱ ጨዋታ በቀጥታ ይሰራጫል፣ እያንዳንዱ ድልም XP፣ ሜዳሊያ እና የቴሌቪዥን ሻምፒዮና እድል ያስገኝልሃል።",
  },
  startPlaying: { en: "Start playing", am: "መጫወት ጀምር" },
  watchLive: { en: "Watch a live match", am: "የቀጥታ ጨዋታ ተመልከት" },
  featuresEyebrow: { en: "Built for competition", am: "ለውድድር የተሰራ" },
  featuresTitle: { en: "One platform, endless rivalries", am: "አንድ መድረክ፣ ማለቂያ የሌለው ውድድር" },
  featuresSub: {
    en: "Everything you need to sharpen your mind and climb from casual player to televised champion.",
    am: "አእምሮህን ለማሳለጥ እና ከተራ ተጫዋች ወደ ቴሌቪዥን ሻምፒዮን ለመውጣት የሚያስፈልግህ ሁሉ።",
  },
  liveDuel: { en: "Live 1v1 duels", am: "የቀጥታ 1v1 ውድድር" },
  liveDuelDesc: {
    en: "Get matched with a real player the moment you hit play. Same question, same timer — only the sharper mind moves on.",
    am: "መጫወት እንደጀመርክ በቀጥታ ከእውነተኛ ተጫዋች ጋር ትጣመዳለህ። ተመሳሳይ ጥያቄ፣ ተመሳሳይ ሰዓት — የሚያለፈው አስተዋይ አእምሮ ብቻ ነው።",
  },
  tvBroadcast: { en: "TV-ready broadcast", am: "ለቴሌቪዥን ዝግጁ ስርጭት" },
  tvBroadcastDesc: {
    en: "Producers wire matches straight to an arena-grade broadcast view — big type, live scores, and crowd energy for everyone watching at home.",
    am: "አዘጋጆች ጨዋታዎችን በቀጥታ ወደ ስርጭት መመልከቻ ያስተላልፋሉ — ትልቅ ፊደል፣ የቀጥታ ውጤት እና ለቤት ተመልካቾች ሁሉ የማህበረሰብ ደስታ።",
  },
  matchmaking: { en: "Fair matchmaking", am: "ፍትሃዊ ተመሳሳይ ጥንዶች" },
  matchmakingDesc: {
    en: "Ranked by level, XP, and recent form, so every duel is a genuine test — never a one-sided stomp.",
    am: "በደረጃ፣ በXP እና በቅርብ አፈጻጸም የሚጣመሩ ስለሆነ እያንዳንዱ ውድድር እውነተኛ ፈተና ነው — በአንድ ጎን የተደመሰሰ አይደለም።",
  },
  learningPaths: { en: "Guided learning paths", am: "የመማሪያ መስመሮች" },
  learningPathsDesc: {
    en: "Follow curated tracks that turn today's lessons into tomorrow's confidence — then put it to the test in the arena.",
    am: "የዛሬን ትምህርት ወደ ነገ በራስ መተማመን የሚቀይሩ ትምህርቶችን ተከተል — ከዚያም በመድረኩ ላይ ፈትነው።",
  },
  arenaEyebrow: { en: "The Live Arena", am: "የቀጥታ መድረክ" },
  arenaTitle: { en: "Watch the best battle it out", am: "ምርጦች ሲወዳደሩ ተመልከት" },
  arenaSub: {
    en: "An arena-grade stage for head-to-head duels. Two players, one question, thousands watching. The winner takes the bracket.",
    am: "ለአንድ-ለ-አንድ ውድድር የሚሆን መድረክ። ሁለት ተጫዋቾች፣ አንድ ጥያቄ፣ በሺዎች የሚቆጠሩ ተመልካቾች። አሸናፊው ቀጣዩን ዙር ይይዛል።",
  },
  joinArena: { en: "Join the arena", am: "ወደ መድረኩ ግባ" },
  joinArenaSub: {
    en: "Create a free account, answer a qualifier, and see if you make it onto tonight's bracket.",
    am: "ነጻ መለያ ፍጠር፣ የማጣሪያ ጥያቄ ይመልስ፣ ዛሬ ማታ በመድረኩ ላይ መገኘት እንደምትችል ተመልከት።",
  },
  howEyebrow: { en: "How it works", am: "እንዴት ይሰራል" },
  howTitle: { en: "From practice to primetime", am: "ከልምምድ ወደ የመጀመሪያ ጊዜ ስርጭት" },
  step1Title: { en: "Create your profile", am: "መገለጫህን ፍጠር" },
  step1Desc: {
    en: "Sign up free and pick your topics. Your level rises with every correct answer.",
    am: "በነጻ ይመዝገብና ርዕሶችህን ምረጥ። ደረጃህ በእያንዳንዱ ትክክለኛ መልስ ይጨምራል።",
  },
  step2Title: { en: "Enter the queue", am: "ወደ ወረፋው ግባ" },
  step2Desc: {
    en: "Hit play and get matched with a real opponent in seconds. Same level, same stakes.",
    am: "መጫወትን ተጭነህ በሰከንዶች ውስጥ ከእውነተኛ ተጫዋች ጋር ትጣመዳለህ። ተመሳሳይ ደረጃ፣ ተመሳሳይ ውርርድ።",
  },
  step3Title: { en: "Battle & climb", am: "ተወዳደርና ከፍ በል" },
  step3Desc: {
    en: "Win duels to advance in the bracket, climb the leaderboard, and qualify for live TV finals.",
    am: "ለማለፍ ውድድሮችን አሸንፍ፣ በደረጃ ሰንጠረዡ ላይ ከፍ በል፣ እና ለቀጥታ ቴሌቪዥን ፍጻሜ ብቁ ሁን።",
  },
  ctaTitle: { en: "Your first duel is one tap away", am: "የመጀመሪያ ውድድርህ አንድ ጠቅታ ብቻ ነው" },
  ctaSub: {
    en: "Free to start. Real opponents waiting. Are you ready to broadcast your name?",
    am: "ለመጀመር ነጻ። እውነተኛ ተጫዋቾች እየጠበቁህ ነው። ስምህን ለማሰራጨት ዝግጁ ነህ?",
  },
  footerTagline: {
    en: "The head-to-head quiz arena that turns learning into a spectator sport.",
    am: "ትምህርትን ወደ ተመልካች ስፖርት የሚቀይር የአንድ-ለ-አንድ የጥያቄ መድረክ።",
  },
  productCol: { en: "Product", am: "ምርት" },
  companyCol: { en: "Company", am: "ኩባንያ" },
  supportCol: { en: "Support", am: "ድጋፍ" },
  copyright: { en: "All rights reserved.", am: "መብቱ በህግ የተጠበቀ ነው።" },
  switchLangTo: { en: "አማርኛ", am: "English" },
  arenaPlayersPlaying: { en: "players in queue", am: "ተጫዋቾች በወረፋ ላይ" },
}
