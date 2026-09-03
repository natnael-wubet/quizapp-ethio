# Project Memories — BrainPlay (Educational Quiz & Puzzle App)

A living document for decisions, ideas, and progress. Keep this in sync with the code.

## The Big Idea
A head-to-head educational quiz arena. Players duel **live 1v1 (matched via a queue)**; those matches are **broadcast on TV** for an audience. Beyond that: puzzles, learning paths, XP/levels/badges, leaderboards, and full admin control for producers.

Two audiences:
- **Players/Learners** — duels, quizzes, puzzles, progression.
- **TV Producers/Admins** — create content, run live shows, control the broadcast.

## Brand & Tech
- App name: **BrainPlay**
- Stack: React 19 + Vite 8 + TypeScript, Tailwind 4 + shadcn/ui, Mantine v9, Radix, React Router 7, Jotai, Supabase (Postgres/Auth/Realtime/Storage), Framer Motion, React Ace, Lucide icons, React Resizable Panels.
- `struct.md` holds the routing / admin / file-structure / theme mind map derived from `idea.md`.

## Live TV Concept (evolved)
The original "audience plays along on second screen" idea shifted to a **spectator model** that reads better on TV:
- A queue matches two real players **fairly** (by level / XP / recent form).
- Both get the same question + same timer; the sharper mind advances.
- Matches stream into a **broadcast view** (`/tv/broadcast/:eventId`) with large type, live scores, and bracket progression — built for the TV production screen.
- Players register via the app; producers run the event + control the bracket.

## Design Direction
- **Vibrant but simple**, no fake/invented metrics — keep copy honest, no made-up user counts.
- **Dark mode** first-class: Mantine color scheme synced to Tailwind `.dark` via `ThemeSync` (see `src/components/ThemeSync.tsx`).
- **Amharic (አማርኛ) compatible**:
  - Font: `@fontsource-variable/noto-sans-ethiopic` added to the sans stack; `.font-ethiopic` and `[lang="am"]` get the Ethiopic glyph stack (`src/index.css`).
  - Strings live in `src/lib/i18n.ts` (typed `{ en, am }` dictionary + `useLang()` Jotai hook + `LangToggle`). Set `document.documentElement.lang`.
- **UI reference libraries** (adapt, don't install everything blindly):
  - **vengenceui** — interaction-centric hover/tooltip/scroll components.
  - **beui** — motion-smoothness primitives (spring, Magnetic/Tilt buttons, marquee, shader bg).
  - **watermelonui** — full-page sections / layouts / dashboards.
  - **grootstudio** — backgrounds (e.g. Animated Bars → adapted in `src/components/AnimatedBars.tsx`).
- Shared vibe tokens: indigo→violet→fuchsia gradients, glassy cards, soft blobs, live-red ping dots.

## Current Progress
- Landing/home page (`src/pages/landing/Home.tsx`) rebuilt: Hero w/ animated-bars arena backdrop + live matchmaking mock (LIVE badge, VS, timer), Features (duels / broadcast / matchmaking / learning paths), dark Live-Arena broadcast section, How It Works, CTA, footer. Bilingual EN/አማርኛ. No fake data.
- `ThemeSync`/`ThemeToggle` + `LangToggle` wired into navbar & footer.
- Fixed pre-existing Mantine v9 theme errors (`globalStyles` removed, component styles → static objects) in `src/theme.ts`; added `@/*` path mapping to `tsconfig.app.json`; added `src/lib/utils.ts` for the `cn` helper.
- Extract reference lookup sources to keep Home.tsx lean: reusable `AnimatedBars`, `ThemeSync/ThemeToggle`.

## NEXT / TODOs
- Player flow: `player/dashboard`, duel queue (matchmaking), `player/quiz/:quizId`, puzzles, leaderboard, achievements.
- Admin panel (`/admin/*`): questions, quizzes, puzzles, categories, users, live events; dashboard stats.
- TV broadcast view `/tv/broadcast/:eventId` + participant `/tv/live/:eventId` (bracket, realtime).
- Supabase: schema from `idea.md`, RLS, auth roles, realtime channels for live duels.
- Wire the lang/dark state globally via Jotai atoms for all pages (not just landing).
- Add code-splitting (chunk > 500 kB warning) once routes expand.
