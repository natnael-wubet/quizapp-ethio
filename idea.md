We will design a comprehensive plan for an **Educational Quiz & Puzzle App with TV Competition Integration**, leveraging the provided technology stack. The goal is to create a scalable, interactive platform for learners and TV audiences, with robust admin controls.

---

## 1. Overview

The app serves two primary audiences:

- **Learners/Players** – who engage with educational quizzes, puzzles, and level-based challenges.
- **TV Channel Producers/Admins** – who create, manage, and broadcast live competitions to TV viewers, who may participate via a second-screen (mobile/web) experience.

The app will include:

- Multiple question types (MCQ, fill‑in‑blank, matching, puzzles, code challenges)
- Gamification (XP, levels, badges, leaderboards)
- Real‑time competitions (live TV shows with audience participation)
- Admin panel for content creation, user management, and live event control
- Rich media support (images, audio, video, interactive content)

---

## 2. Technology Stack & Justification

| Technology | Role | Why |
|------------|------|-----|
| **React 19 + Vite 8** | Frontend framework & build tool | Fast development, modern JSX, HMR, optimized builds. |
| **TypeScript** | Language | Type safety, better maintainability. |
| **Tailwind CSS 4 + shadcn/ui** | Styling & base components | Utility-first CSS, highly customizable, accessible primitives. |
| **Mantine v9** | UI component library | Rich set of ready‑made components (modals, forms, notifications, etc.) that speed up admin UI. |
| **Radix UI** | Unstyled accessible primitives | Used by shadcn/ui and for custom components where we need full control. |
| **React Router 7** | Client‑side routing | Nested routes, loaders, and protected routes. |
| **Jotai** | State management | Atomic, minimal boilerplate, perfect for UI state + derived state. |
| **Supabase** | Backend (PostgreSQL, Auth, Realtime, Storage) | All‑in‑one backend, realtime subscriptions, row‑level security, file storage. |
| **Framer Motion / Motion** | Animations | Smooth transitions, micro‑interactions, engaging quiz animations. |
| **React Ace / Ace Editor** | Code challenges | Embedded code editor for programming puzzles. |
| **Lucide React** | Icons | Consistent iconography. |
| **React Resizable Panels** | Layout | Admin panel adjustable panels, resizable columns. |

---

## 3. System Architecture

```
[Browser/Client (React + Vite)]
        |
        | HTTPS / WebSocket (Supabase Realtime)
        v
[Supabase]
  ├── PostgreSQL (Data)
  ├── Auth (JWT)
  ├── Realtime (broadcast)
  └── Storage (media)
        |
        v
[Admin Panel] (same React app, protected routes)
```

**Key architectural decisions:**

- **Single‑page application** with React Router; admin and player sections are part of the same codebase but separated by route guards.
- **Supabase** handles authentication, database, realtime, and storage. Row‑level security (RLS) ensures users only see appropriate data.
- **Jotai** stores global client state: current user, active quiz session, live event status, etc.
- **Realtime** channels for live competitions: questions pushed to participants, answers submitted, scores updated instantly.

---

## 4. Database Schema (Supabase / PostgreSQL)

We’ll design a normalized schema supporting extensibility.

### Core Tables

#### `profiles`
- `id` uuid (references `auth.users`)
- `username` text unique
- `avatar_url` text
- `role` text (`'player'`, `'admin'`, `'tv_producer'`)
- `xp` integer default 0
- `level` integer default 1
- `created_at` timestamptz

#### `categories`
- `id` uuid primary key
- `name` text
- `description` text
- `icon` text (optional)
- `parent_id` uuid nullable (self‑referencing for subcategories)

#### `questions`
- `id` uuid primary key
- `category_id` uuid references `categories`
- `type` text (`'mcq'`, `'true_false'`, `'fill_blank'`, `'matching'`, `'puzzle'`, `'code'`)
- `question_text` text
- `media_url` text nullable (image/audio/video)
- `options` jsonb (for MCQ / true‑false / matching)
- `correct_answer` jsonb (flexible per type)
- `explanation` text
- `difficulty` integer (1–5)
- `points` integer
- `created_by` uuid references `profiles`
- `is_public` boolean default false
- `created_at` timestamptz

#### `quizzes` (a collection of questions)
- `id` uuid
- `title` text
- `description` text
- `category_id` uuid
- `created_by` uuid
- `is_published` boolean
- `time_limit_seconds` integer nullable
- `created_at` timestamptz

#### `quiz_questions` (join table)
- `quiz_id` uuid references `quizzes`
- `question_id` uuid references `questions`
- `order` integer
- `points_override` integer nullable

#### `attempts` (user submissions)
- `id` uuid
- `user_id` uuid references `profiles`
- `quiz_id` uuid references `quizzes`
- `started_at` timestamptz
- `completed_at` timestamptz nullable
- `score` integer
- `max_score` integer
- `time_taken` interval
- `answers` jsonb (stores user’s selected answers for review)

#### `puzzles` (for non‑standard puzzle challenges)
- `id` uuid
- `title` text
- `description` text
- `type` text (`'crossword'`, `'logic'`, `'riddle'`, `'code'`)
- `data` jsonb (puzzle definition)
- `solution` jsonb
- `points` integer
- `created_by` uuid

#### `levels`
- `id` uuid
- `level_number` integer unique
- `required_xp` integer
- `title` text
- `badge_icon` text

#### `user_achievements`
- `id` uuid
- `user_id` uuid
- `achievement_type` text
- `earned_at` timestamptz

#### `live_events` (TV competitions)
- `id` uuid
- `title` text
- `description` text
- `scheduled_at` timestamptz
- `status` text (`'scheduled'`, `'live'`, `'ended'`)
- `created_by` uuid (admin)
- `quiz_id` uuid nullable (linked quiz)
- `max_participants` integer
- `current_question_index` integer default 0
- `current_question_started_at` timestamptz nullable

#### `live_event_participants`
- `event_id` uuid
- `user_id` uuid
- `joined_at` timestamptz
- `score` integer default 0
- `rank` integer nullable

#### `live_event_answers`
- `event_id` uuid
- `user_id` uuid
- `question_id` uuid
- `answer` jsonb
- `is_correct` boolean
- `answered_at` timestamptz
- `points_awarded` integer

**Indexes**: on foreign keys and frequently queried columns (`created_at`, `category_id`, `user_id`, `event_id`).

**RLS policies**:
- Players can view public quizzes/questions, submit attempts.
- Admins can CRUD all content.
- TV producers can manage live events.
- Only admins can view all user data; players see only their own.

---

## 5. Authentication & Authorization

**Supabase Auth** handles email/password, OAuth (Google, etc.), and magic links. After authentication, we fetch the user’s profile (with role) into Jotai.

**Route Guards**:
- `/player/*` – requires `role = 'player'` or admin.
- `/admin/*` – requires `role = 'admin'` or `'tv_producer'`.
- `/tv/*` – a special live event participant interface (can be accessed by any logged‑in user during a live event).

---

## 6. Frontend Structure

### Routes (React Router)

| Path | Description | Access |
|------|-------------|--------|
| `/` | Landing page (public) | Public |
| `/login`, `/signup` | Auth pages | Public |
| `/player/dashboard` | Player home with progress, recommended quizzes | Player |
| `/player/quiz/:quizId` | Take a quiz | Player |
| `/player/puzzle/:puzzleId` | Solve a puzzle | Player |
| `/player/leaderboard` | Global leaderboard | Player |
| `/player/achievements` | User achievements | Player |
| `/admin` | Admin dashboard (stats, content overview) | Admin |
| `/admin/questions` | Manage questions | Admin |
| `/admin/quizzes` | Manage quizzes | Admin |
| `/admin/puzzles` | Manage puzzles | Admin |
| `/admin/categories` | Manage categories | Admin |
| `/admin/users` | View/manage users | Admin |
| `/admin/live-events` | Create & control live events | Admin / TV Producer |
| `/tv/live/:eventId` | Live competition participant interface (mobile‑friendly) | Any logged‑in user |

### State Management with Jotai

- `userAtom` – current user profile.
- `uiAtoms` – modals, toasts, theme.
- `liveEventAtom` – current live event state (question, timer, participant score).
- `quizSessionAtom` – current quiz attempt data (answers, time left, progress).
- `adminAtoms` – selected items, filters, pagination for admin tables.

Derived atoms compute XP progress, leaderboard positions, etc.

### UI Components

- **Mantine** for complex components: forms, data tables, notifications, modals, date pickers.
- **Radix + Tailwind (shadcn/ui)** for custom, lightweight components where Mantine might be too heavy.
- **Framer Motion** for page transitions, quiz animations (flipping cards, progress bars).
- **React Ace** for code challenge editor in puzzles.

**Component Examples**:
- `QuestionRenderer` – dynamically renders based on `question.type` (MCQ, fill‑blank, matching, etc.).
- `QuizPlayer` – shows one question at a time, timer, answer submission.
- `PuzzleBoard` – interactive puzzle (crossword, logic grid).
- `LiveEventPlayer` – real‑time UI with live question, answer buttons, live score updates.
- `AdminTable` – reusable table with sorting, filtering, inline editing.

---

## 7. Admin Panel Features

The admin panel is a central hub for content management and live event control.

### Dashboard
- Overview stats: total users, quizzes taken, active live events, question count.
- Recent activity feed.

### Question Management
- CRUD for all question types.
- Rich text editor for question text and explanations.
- Media upload (via Supabase Storage).
- Preview question as it would appear to players.
- Search/filter by category, difficulty, type.

### Quiz Management
- Create quiz by selecting questions from pool or adding new ones.
- Set time limit, points, category.
- Publish/unpublish.
- View attempt analytics.

### Puzzle Management
- Create puzzles with custom JSON definitions (for crossword, logic, etc.).
- Test solve interface.

### Category Management
- Hierarchical categories with drag‑and‑drop reordering.
- Assign icons.

### User Management
- Search users, view profiles, edit roles, reset XP.
- Ban/unban users.
- Export user data (CSV).

### Live Event Control
- Schedule event, link to quiz.
- Start/stop event, advance to next question manually or on timer.
- Monitor participant count, scores in real time.
- Push messages/announcements to participants.
- End event and publish final leaderboard.

---

## 8. Quiz & Puzzle Engine

### Question Types

1. **MCQ** – options array with correct index(es).
2. **True/False** – boolean.
3. **Fill in the Blank** – text input with accepted answers.
4. **Matching** – pairs to be matched.
5. **Puzzle** – custom interactive puzzle (e.g., sliding puzzle, logic grid) defined in JSON.
6. **Code** – uses React Ace; user submits code, evaluation either via test cases (pre‑defined) or manual admin review.

### Scoring & XP

- Each question has base points.
- Difficulty multiplier: easy (1x), medium (1.5x), hard (2x).
- Time bonus: faster correct answer gives bonus points.
- Streak bonus: consecutive correct answers increase multiplier.
- XP is awarded based on points; level thresholds defined in `levels` table.

### Level Progression

- Users start at level 1.
- XP accumulates; when XP reaches next level’s `required_xp`, user levels up.
- Level up triggers a celebratory animation and badge.
- Higher levels unlock harder content, exclusive puzzles, and special live events.

### Enrichment Methods

To go beyond standard quizzes:

- **Daily Challenges** – a new puzzle/quiz each day with bonus XP.
- **Achievements** – badges for milestones (e.g., “First Quiz”, “Perfect Score”, “10‑day streak”).
- **Leaderboards** – global, by category, weekly.
- **Learning Paths** – curated sequence of quizzes/puzzles for a topic.
- **Interactive Explanations** – after each question, show detailed explanation with links to further reading or mini‑lessons.

---

## 9. TV Channel Competition Integration

The TV channel integration enables live, audience‑participated quiz shows.

### Workflow

1. **Producer (Admin)** schedules a live event and links a quiz (or creates a custom question set).
2. At show time, producer starts the event.
3. TV viewers open the app (or a dedicated TV web page) and join the event with a code or QR code.
4. The TV broadcast shows the question on screen (either through the app itself or a separate broadcast graphics system that consumes the same data).
5. Participants answer in real time on their devices.
6. Supabase Realtime pushes the question, timer, and answer status to all participants.
7. After time expires, correct answer is revealed, scores updated instantly.
8. Leaderboard is shown on TV and on participant devices.
9. Producer can advance to next question, pause, or end the event.

### Technical Implementation

- **Realtime Channels**: 
  - `live_event:{eventId}` – broadcasts question data, timer ticks, answer reveals, score updates.
  - Participants subscribe to this channel and update their local state via Jotai.
- **Database triggers** or **Edge Functions** calculate rankings and update participant scores.
- **TV Display**: A separate view (e.g., `/tv/broadcast/:eventId`) can be shown on the TV production screen. It uses the same realtime data but with a broadcast‑optimized layout (large fonts, minimal UI). Admin/producer controls are on a separate device.
- **Latency**: Supabase Realtime uses WebSockets; typical latency < 100ms, suitable for live quizzes.

### Security

- Only event creator (admin/producer) can start/advance questions.
- Participants are authenticated; only those who joined the event can submit answers.
- RLS ensures users only modify their own answers.

---

## 10. Real‑time Features (Supabase Realtime)

Beyond live events, realtime is used for:

- **Live leaderboards** – top scores update in real time.
- **Notifications** – when an admin publishes new content.
- **Chat** (optional) – participant chat during live events (moderated).

---

## 11. Deployment & Scaling

- **Frontend**: Deploy to Vercel/Netlify (static) or a Node server (if SSR needed). Vite build is optimized.
- **Supabase**: Managed backend; scales automatically. For high‑traffic live events, use Supabase’s dedicated plan and optimize Realtime channels (batching, connection limits).
- **CDN**: For media assets (images, videos), Supabase Storage serves via CDN.
- **Analytics**: Integrate PostHog or similar for user behavior tracking.

---

## 12. Conclusion

This plan outlines a robust, full‑featured educational quiz and puzzle platform with TV competition capabilities, built on a modern React + Supabase stack. The combination of Mantine/Radix for UI, Jotai for state, and Supabase for backend/realtime provides a solid foundation for both player‑facing and admin‑facing applications. The architecture is scalable, secure, and ready for live production.
