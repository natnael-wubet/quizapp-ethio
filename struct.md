# Educational Quiz App - Structure Mind Map

## **1. Routing**
```
Root (/)
├── Public
│   ├── /login
│   └── /signup
├── Player (/player/*)
│   ├── /player/dashboard
│   ├── /player/quiz/:quizId
│   ├── /player/puzzle/:puzzleId
│   ├── /player/leaderboard
│   └── /player/achievements
├── Admin (/admin/*)
│   ├── /admin (dashboard)
│   ├── /admin/questions
│   ├── /admin/quizzes
│   ├── /admin/puzzles
│   ├── /admin/categories
│   ├── /admin/users
│   └── /admin/live-events
└── TV (/tv/*)
    ├── /tv/live/:eventId (participant view)
    └── /tv/broadcast/:eventId (TV display)
```

## **2. Admin Panel**
```
Admin Dashboard
├── Stats Overview (users, quizzes, live events)
├── Content Management
│   ├── Questions (CRUD, media upload, preview)
│   ├── Quizzes (create, publish, analytics)
│   ├── Puzzles (JSON definitions, test solve)
│   └── Categories (hierarchical, drag-drop)
├── User Management
│   ├── View/edit profiles
│   ├── Role management (player/admin/tv_producer)
│   └── XP/level adjustments
└── Live Event Control
    ├── Schedule/create events
    ├── Start/stop/advance questions
    ├── Real-time monitoring
    └── Leaderboard publishing
```

## **3. File Structures**
```
src/
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── admin/ (admin-specific components)
│   ├── player/ (player-specific components)
│   └── shared/ (reusable components)
├── pages/
│   ├── auth/ (login, signup)
│   ├── player/ (dashboard, quiz, puzzle, etc.)
│   ├── admin/ (dashboard, questions, quizzes, etc.)
│   └── tv/ (live, broadcast)
├── atoms/ (Jotai state management)
├── hooks/ (custom React hooks)
├── lib/ (utilities, Supabase client)
├── types/ (TypeScript definitions)
├── layouts/ (route layouts)
└── styles/ (Tailwind config, global styles)
```

## **4. Themes & Styling**
```
Theme System
├── Tailwind CSS 4 + shadcn/ui
├── Mantine v9 for complex components
├── Dark/Light mode support
├── Gamification colors (XP, levels, badges)
├── Responsive design (mobile-first for TV participation)
└── Animations (Framer Motion)
```

## **5. Important Structures**
```
Core Architecture
├── Database Schema
│   ├── profiles (user data, roles, XP)
│   ├── categories (hierarchical)
│   ├── questions (6 types: MCQ, true/false, etc.)
│   ├── quizzes (question collections)
│   ├── attempts (user submissions)
│   ├── puzzles (custom challenges)
│   ├── levels (XP thresholds)
│   ├── user_achievements
│   ├── live_events (TV competitions)
│   └── live_event_participants/answers
├── State Management (Jotai)
│   ├── userAtom (current user)
│   ├── liveEventAtom (live event state)
│   ├── quizSessionAtom (quiz progress)
│   └── adminAtoms (filters, pagination)
├── Supabase Integration
│   ├── Authentication (JWT, OAuth)
│   ├── Realtime (live events, leaderboards)
│   └── Storage (media files)
└── Security
    ├── Row-Level Security (RLS)
    ├── Route guards (role-based access)
    └── Real-time event permissions
```