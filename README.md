# Healytics — AI-Powered Health Intelligence Platform

> Full-stack health insights hub with real-time lab analysis, AI-driven explanations (Gemini 1.5 Flash), telehealth, and a patient/doctor dual-dashboard.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite (port 8080) |
| Styling | Tailwind CSS + Shadcn UI + Framer Motion |
| Charts | Recharts |
| PDF Export | jsPDF |
| Backend | Node.js + Express (port 3001) |
| Database | Supabase (PostgreSQL) |
| Auth | JWT + bcrypt |
| AI | Google Gemini 1.5 Flash |
| 3D / Visuals | Three.js via React Three Fiber |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun
- Supabase project (free tier works)
- Google AI Studio API key (for Gemini)

### 1. Clone & Install

```sh
git clone https://github.com/itzmesooraj8/Healytics.git
cd Healytics

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment

Copy the example env file and fill in your keys:

```sh
copy backend\.env.example backend\.env
```

Edit `backend/.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
JWT_SECRET=your-random-jwt-secret
GEMINI_API_KEY=your-gemini-api-key
PORT=3001
FRONTEND_URL=http://localhost:8080
```

### 3. Set Up Database

Run the schema in your Supabase SQL Editor (`backend/supabase/schema.sql`), then verify:

```sh
cd backend
node setup-db.js
```

Expected output: `🎉 DATABASE FULLY OPERATIONAL — ALL 5 REAL-TIME FEATURES READY`

### 4. Run Both Servers

> **Note:** All commands below can be run from `health-insights-hub-main/` **or** from the parent `healthinsightshub/` folder — both work.

**Option A — One-click (Windows PowerShell):**

```powershell
# From the healthinsightshub/ parent folder:
.\start.ps1

# Or from health-insights-hub-main/:
.\start.ps1
```

**Option B — npm (from either folder):**

```sh
# From healthinsightshub/ parent folder:
npm run dev       # frontend only
npm run backend   # backend only
npm run start     # both together

# From health-insights-hub-main/:
npm run dev
```

**Option C — Manual (two terminals):**

```sh
# Terminal 1 — Backend
node health-insights-hub-main/backend/server.js

# Terminal 2 — Frontend
npm run dev --prefix health-insights-hub-main
```

Open [http://localhost:8080](http://localhost:8080)

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| POST | `/api/reports/analyze` | Analyze lab results with Gemini AI |
| GET | `/api/reports/:userId` | Get all reports for a user |
| GET | `/api/reports/:reportId/markers` | Get markers for a report |
| GET | `/api/doctors` | List all doctors |
| GET | `/api/doctors/:id` | Get doctor by ID |

## Database Schema

4 tables in Supabase PostgreSQL:

- **`users`** — name, email (unique), hashed password, role (patient/doctor/admin)
- **`lab_reports`** — analysis type, risk level, AI explanation, linked to user
- **`lab_markers`** — individual biomarker values per report
- **`appointments`** — patient/doctor/date/status

## Key Features

1. **AI Lab Analysis** — Upload lab values → Gemini AI returns personalized health explanation
2. **Real-time Dashboard** — Patient dashboard shows actual DB reports with live risk scores
3. **Secure Auth** — JWT-based login/register with bcrypt password hashing
4. **Doctor Directory** — Browse doctor profiles fetched from backend
5. **PDF Export** — Download lab report summaries as PDF
6. **Telehealth** — Video consultation page
7. **Dark / Light Mode** — Theme toggle persisted to localStorage

## Demo Account

After running the backend, you can log in with:

| Email | Password | Role |
|---|---|---|
| `demo@healytics.ai` | `demo1234` | Patient |

## Project Structure

```
health-insights-hub-main/
├── src/
│   ├── components/       # Reusable UI + 3D components
│   ├── pages/            # Route-level page components
│   ├── lib/api.ts        # Centralized frontend API client
│   └── data/mockData.ts  # Fallback mock data
├── backend/
│   ├── server.js         # Express entry point
│   ├── routes/           # auth, reports, doctors
│   ├── lib/supabase.js   # Supabase client
│   ├── supabase/
│   │   ├── schema.sql    # Database schema
│   │   └── functions/    # Edge function (Gemini proxy)
│   ├── setup-db.js       # DB verification script
│   └── .env.example      # Environment template
├── start.ps1             # One-click launcher (Windows)
└── README.md
```

## Security Notes

- `backend/.env` is gitignored — never committed
- Service role key only used server-side, never exposed to frontend
- All API routes validate JWT before accessing user data
- Passwords hashed with bcrypt (10 rounds)
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
