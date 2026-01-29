# REAPER v2

**REAPER** - Dual-purpose repository containing both the Python CLI for Reddit market research and the Next.js API Latency Tracker.

---

## 🐍 Python CLI - Reddit Market Research

Python CLI for Reddit market research. Harvests pain point threads and generates insights.

### Installation

```bash
pip install -e .
```

### Configuration

Set environment variables for Reddit API:

```bash
export REDDIT_CLIENT_ID=your_client_id
export REDDIT_CLIENT_SECRET=your_client_secret
export REDDIT_USER_AGENT=REAPER/0.1.0
```

### Usage

#### Harvest threads

```bash
reaper harvest --sub entrepreneurship --limit 100
```

#### Generate report

```bash
reaper report
```

### Search Keywords

- "is there a tool"
- "tired of manually"
- "pricing is insane"
- "alternative to"

---

## 🚀 Next.js - API Latency Tracker

A modern Next.js 15 application for tracking and monitoring API latencies in real-time.

### Tech Stack

- **Framework:** Next.js 15 (App Router, ESM)
- **Auth/Database:** Supabase with `@supabase/ssr`
- **Styling:** Tailwind CSS v4
- **Script Runner:** `tsx` (ESM-native TypeScript)
- **UI Components:** Shadcn/UI (ready to add)
- **Visualization:** Recharts

### Getting Started

#### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

#### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
- Get your Supabase URL and keys from: https://supabase.com/dashboard/project/_/settings/api

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── lib/
│   └── supabase/        # Supabase clients
│       ├── client.ts    # Browser client
│       ├── server.ts    # Server client (with async cookies)
│       └── middleware.ts # Auth session management
├── middleware.ts        # Next.js middleware (auth token refresh)
├── reaper/              # Python CLI modules
├── next.config.ts       # Next.js configuration
└── tsconfig.json        # TypeScript configuration
```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run script` - Run TypeScript scripts with tsx

### Supabase Setup

The project uses `@supabase/ssr` for proper cookie-based authentication in Next.js 15:

- **Browser Client** (`lib/supabase/client.ts`): For client components
- **Server Client** (`lib/supabase/server.ts`): For server components (uses `await cookies()`)
- **Middleware** (`middleware.ts`): Automatically refreshes auth tokens using the `updateSession` pattern

---

## 📝 Documentation

For detailed usage of the Python CLI, see [USAGE.md](USAGE.md).

## Phase 1 Complete ✅

Next.js Infrastructure is ready:
- ✅ Next.js 15 with App Router and ESM
- ✅ Supabase SSR authentication handshake
- ✅ All required dependencies installed
- ✅ Proper cookie-based auth pattern
- ✅ Build and dev server working

## Next Steps

- Phase 2: Database schema and API routes
- Phase 3: UI components and dashboards
- Phase 4: API latency tracking implementation
