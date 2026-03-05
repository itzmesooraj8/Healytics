# Healytics — AI-Powered Health Intelligence Platform

> Rural healthcare meets Gemini AI. Instant plain-language lab report explanations in English, Tamil, and Hindi — with real-time Supabase persistence, bcrypt auth, and PDF export.

[![Backend](https://img.shields.io/badge/API-localhost%3A3001-blue)](#) [![DB](https://img.shields.io/badge/Database-Supabase-3ECF8E)](#) [![AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange)](#)

---

## Quick Start (judge / reviewer)

```sh
# 1 — Clone
git clone https://github.com/itzmesooraj8/Healytics.git
cd Healytics

# 2 — Install dependencies
npm install
cd backend && npm install && cd ..

# 3 — Add credentials
copy backend\.env.example backend\.env
# Edit backend/.env with SUPABASE_URL, SUPABASE_SERVICE_KEY, GEMINI_API_KEY

# 4 — Verify database
node backend/setup-db.js

# 5 — Start both servers
.\start.ps1
# OR manually:
#   Terminal 1: node backend/server.js   ? http://localhost:3001
#   Terminal 2: npm run dev              ? http://localhost:8080
```

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Shadcn UI + Framer Motion |
| Charts | Recharts (RadialBar health score gauge) |
| PDF Export | jsPDF |
| 3D | Three.js via React Three Fiber |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| Auth | JWT (7-day) + bcrypt (10 rounds) |
| AI | Google Gemini 2.5 Flash |

---

## Project Structure

```
Healytics/
+-- src/
¦   +-- components/        # Reusable UI + 3D + PublicNavbar
¦   +-- pages/             # 20+ route-level page components
¦   +-- lib/api.ts         # Centralized frontend API client
¦   +-- data/mockData.ts   # Fallback mock data
+-- backend/
¦   +-- server.js          # Express entry point (port 3001)
¦   +-- routes/
¦   ¦   +-- auth.js        # register + login
¦   ¦   +-- reports.js     # analyze (Gemini) + getByUser
¦   ¦   +-- doctors.js     # GET /doctors
¦   +-- lib/supabase.js    # Supabase client (mock fallback if no .env)
¦   +-- supabase/
¦   ¦   +-- schema.sql     # 4-table PostgreSQL schema
¦   ¦   +-- functions/     # Deno edge function (Gemini proxy)
¦   +-- setup-db.js        # DB verification + round-trip test
¦   +-- .env.example       # Environment variable template
+-- start.ps1              # One-click launcher (Windows)
+-- package.json           # Frontend dependencies
+-- README.md
```

---

## Environment Setup

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGci...your-service-role-key
JWT_SECRET=healytics-hackathon-secret-2026
GEMINI_API_KEY=AIzaSy...your-key
PORT=3001
FRONTEND_URL=http://localhost:8080
```

- Free Gemini key: https://aistudio.google.com/app/apikey
- Supabase keys: Project ? Settings ? API

---

## Database Schema

Run `backend/supabase/schema.sql` in Supabase SQL Editor, then verify:

```sh
node backend/setup-db.js
# Expected: ?? DATABASE FULLY OPERATIONAL — ALL 5 REAL-TIME FEATURES READY
```

Tables: **users**, **lab_reports**, **lab_markers**, **appointments**

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register ? bcrypt ? Supabase ? JWT |
| POST | `/api/auth/login` | Login ? bcrypt compare ? JWT |
| POST | `/api/reports/analyze` | Gemini AI analysis + save to DB |
| GET | `/api/reports/:userId` | All reports for a user |
| GET | `/api/reports/:reportId/markers` | Biomarkers for a report |
| GET | `/api/doctors` | Doctor directory |
| GET | `/api/doctors/:id` | Doctor profile |

---

## Key Features

| # | Feature | How it works |
|---|---|---|
| 1 | **AI Lab Interpretation** | Lab values ? Gemini 2.5 Flash ? plain-English health explanation |
| 2 | **Multilingual Voice Readout** | Web Speech API in English (en-US), Tamil (ta-IN), Hindi (hi-IN) |
| 3 | **Explainability Modal** | Every HIGH/LOW flag shows the exact WHO/NIH rule — no black box |
| 4 | **PDF Report Export** | jsPDF generates formatted A4 with markers, AI narrative, disclaimer |
| 5 | **Health Score Gauge** | Recharts RadialBar animates 0?score with colour-coded risk label |
| 6 | **Real-time DB Persistence** | Auth + reports + markers saved to Supabase PostgreSQL live |
| 7 | **Role-based Dashboards** | Separate Patient and Doctor dashboard views |
| 8 | **Teleconsultation** | Video call page with session controls |
| 9 | **Dark / Light Mode** | Theme toggle persisted to localStorage |

---

## Demo Credentials

| Email | Password | Role |
|---|---|---|
| `demo@healytics.ai` | `demo1234` | Patient (offline fallback) |

---

## Security

- `backend/.env` is gitignored — credentials never committed
- Service-role key used only server-side, never exposed to browser
- Passwords hashed with bcrypt (10 rounds)
- JWT signed with HS256, 7-day expiry
- Supabase RLS enabled on all tables

---

## SDG Alignment — SDG 3: Good Health and Well-being

In Tamil Nadu, 85% of specialist positions are vacant. When a rural patient receives a blood test on a Friday evening, Healytics gives them a clear explanation in Tamil, in 30 seconds, for free — before they can reach a doctor.

---

## License

MIT — Built for KARE Hackathon 2026
