# 🩺 Healytics — AI-Powered Health Intelligence Platform

> **Hackathon Project · KARE 2026**  
> Transforming raw lab results into actionable health insights using Gemini AI, Supabase PostgreSQL, real-time clinical analytics, and multilingual voice readout.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-healytics--rho.vercel.app-00d4ff?style=flat-square&logo=vercel)](https://healytics-rho.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-itzmesooraj8%2FHealytics-black?style=flat-square&logo=github)](https://github.com/itzmesooraj8/Healytics)
[![DB](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?style=flat-square)](https://supabase.com)
[![AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange?style=flat-square)](https://aistudio.google.com)

---

## 🎬 Demo Video

> 📹 **[Watch the 3-minute demo on Loom](https://loom.com/share/healytics-demo)** — end-to-end walkthrough: register → upload lab panel → AI explanation → Tamil voice readout → PDF export

**🚀 Live Site: [healytics-rho.vercel.app](https://healytics-rho.vercel.app)**

**Test credentials (pre-loaded demo accounts — no registration needed):**

| Role | Email | Password |
|---|---|---|
| Patient | `demo@healytics.ai` | `demo1234` |
| Doctor  | `doctor@healytics.ai` | `demo1234` |

> ✨ Or register any new account at `/register` — works without a backend.

---

## 🌟 What Is Healytics?

Healytics is a full-stack medical intelligence platform that:

- **Interprets lab reports** using Google Gemini 2.5 Flash AI in plain, patient-friendly language
- **Persists all data** in live Supabase PostgreSQL (users, reports, biomarkers)
- **Flags abnormal values** using WHO/NIH clinical reference ranges with explainability
- **Speaks results aloud** in Tamil, Hindi, Telugu, or English via Web Speech API
- **Exports PDF reports** patients can share with their doctors
- **Supports multi-role users** — patients and doctors with role-based dashboards

**SDG Alignment: SDG 3 — Good Health and Well-being**  
In Tamil Nadu, 85% of specialist positions are vacant. A rural patient with a blood test at 9 PM on a Friday gets a clear explanation in Tamil in 30 seconds for free, before they can reach a doctor.

---

## 🏗️ Architecture

```
┌─────────────────────────┐        Vite Proxy          ┌─────────────────────────┐
│   React 18 Frontend     │  ──── /api/* ────────────► │   Express.js Backend    │
│   TypeScript + Vite     │                             │   Node.js (port 3001)   │
│   (port 8080)           │ ◄──── JSON responses ─────  │                         │
└─────────────────────────┘                             └──────────┬──────────────┘
                                                                   │
                                                  ┌────────────────┴──────────────┐
                                                  │                               │
                                         ┌────────▼──────┐            ┌──────────▼───────┐
                                         │   Supabase    │            │  Google Gemini   │
                                         │ PostgreSQL DB │            │  2.5 Flash API   │
                                         │  (4 tables)   │            │  (Live AI calls) │
                                         └───────────────┘            └──────────────────┘
```

---

## ✅ Real vs Mock — What Is Live Right Now

| Feature | Status | Proof |
|---|---|---|
| User Registration | ✅ **REAL** | Writes to Supabase `users` table with bcrypt hash |
| User Login / JWT | ✅ **REAL** | Returns signed JWT, reads from Supabase |
| Gemini AI Explanation | ✅ **REAL** | Live call to `gemini-2.5-flash` API |
| Lab Report Save | ✅ **REAL** | Saves to `lab_reports` + `lab_markers` tables |
| Patient Report History | ✅ **REAL** | Reads `lab_reports` by userId from Supabase |
| Doctors Directory | Mock | 8 sample specialists (real scheduling in Phase 2) |
| Appointments | Mock | Placeholder — Phase 2 Q3 2026 |
| Wearable Sync | Mock | Simulated vitals JSON feed |
| Health Trends Chart | Mock | 6-month hardcoded trend data |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool + dev proxy |
| Tailwind CSS | 3.x | Utility-first styling |
| Shadcn/ui | latest | Accessible component library |
| Framer Motion | 11.x | Animations |
| Recharts | 2.x | Health data charts |
| jsPDF | 2.x | PDF report export |
| Three.js / R3F | latest | 3D landing page scenes |
| Web Speech API | Native | Multilingual voice readout |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4.x | REST API server |
| Supabase JS | 2.x | PostgreSQL client |
| bcryptjs | 2.x | Password hashing (10 rounds) |
| jsonwebtoken | 9.x | JWT auth (HS256, 7-day) |
| Google Gemini | 2.5 Flash | AI lab interpretation |

---

## 🗄️ Database Schema

```sql
-- Run backend/supabase/schema.sql in Supabase SQL Editor

CREATE TABLE users (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role         TEXT DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE lab_reports (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id        UUID REFERENCES users(id) ON DELETE CASCADE,
  profile_name   TEXT NOT NULL,
  report_date    DATE,
  health_score   INT CHECK (health_score BETWEEN 0 AND 100),
  ai_explanation TEXT,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE lab_markers (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id   UUID REFERENCES lab_reports(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  value       NUMERIC,
  unit        TEXT,
  min_value   NUMERIC,
  max_value   NUMERIC,
  status      TEXT CHECK (status IN ('HIGH', 'LOW', 'NORMAL')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE appointments (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
  doctor_name  TEXT,
  specialty    TEXT,
  datetime     TIMESTAMPTZ,
  status       TEXT DEFAULT 'scheduled',
  created_at   TIMESTAMPTZ DEFAULT now()
);
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Free [Supabase](https://supabase.com) account
- Free [Gemini API key](https://aistudio.google.com) (no credit card required)

### 1. Clone
```bash
git clone https://github.com/itzmesooraj8/Healytics.git
cd Healytics
```

### 2. Deploy database schema
1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste contents of `backend/supabase/schema.sql` → click **Run**
3. All 4 tables are created instantly

### 3. Configure environment
```bash
cd backend
copy .env.example .env   # Windows
# cp .env.example .env   # Mac/Linux
```

Edit `backend/.env`:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=any-random-string-32-chars-or-more
GEMINI_API_KEY=AIzaSy...your-key-here
PORT=3001
FRONTEND_URL=http://localhost:8080
```

Where to get the keys:
- **SUPABASE_URL + SUPABASE_SERVICE_KEY**: Supabase dashboard → Settings → API
- **GEMINI_API_KEY**: [aistudio.google.com](https://aistudio.google.com) → Get API Key (free, instant)

### 4. Verify database
```bash
node backend/setup-db.js
# Expected output: 🎉 DATABASE FULLY OPERATIONAL
```

### 5. Start backend
```bash
cd backend
npm install
node server.js
# ✅ Healytics API running at http://localhost:3001
```

### 6. Start frontend (new terminal)
```bash
cd Healytics   # repo root
npm install
npm run dev
# ✅ Frontend at http://localhost:8080
```

### One-click launcher (Windows PowerShell)
```powershell
.\start.ps1
```

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | None | Server health check |
| POST | `/api/auth/register` | None | Register → bcrypt → Supabase → JWT |
| POST | `/api/auth/login` | None | Login → verify → JWT |
| POST | `/api/reports/analyze` | JWT | Gemini AI analysis + save to DB |
| GET | `/api/reports/:userId` | JWT | All reports for a user |
| GET | `/api/reports/:reportId/markers` | JWT | Biomarkers for a specific report |
| GET | `/api/doctors` | None | Full doctor directory |
| GET | `/api/doctors/:id` | None | Single doctor profile |

### Example — Analyze Lab Report
```bash
curl -X POST http://localhost:3001/api/reports/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "your-user-uuid",
    "profileName": "Diabetic Profile",
    "markers": [
      { "name": "HbA1c",           "value": 7.8, "unit": "%",    "normalRange": "4.0-5.6" },
      { "name": "Fasting Glucose", "value": 142, "unit": "mg/dL","normalRange": "70-99"   }
    ]
  }'
```

Response:
```json
{
  "savedToDatabase": true,
  "aiExplanation": "Your HbA1c of 7.8% and fasting glucose of 142 mg/dL are both above normal ranges, indicating poorly controlled blood sugar. Always consult your doctor before making any health decisions.",
  "report": {
    "id": "uuid-here",
    "profile_name": "Diabetic Profile",
    "health_score": null,
    "created_at": "2026-03-05T15:30:00Z"
  }
}
```

---

## 🎯 Demo Credentials

| Email | Password | Role | Dashboard |
|---|---|---|---|
| `demo@healytics.ai` | `demo1234` | Patient | `/patient-dashboard` |
| `doctor@healytics.ai` | `demo1234` | Doctor | `/doctor-dashboard` |

> ✨ Or register any new email + password at `/register` — auto-creates an account instantly, no backend needed.

---

## 📱 All Pages (20+)

| Route | Page | Auth |
|---|---|---|
| `/` | Landing Page with 3D scenes | Public |
| `/about` | About Healytics | Public |
| `/doctors` | Find a Specialist | Public |
| `/services` | Services Overview | Public |
| `/contact` | Contact Us | Public |
| `/login` | Sign In | Public |
| `/register` | Create Account | Public |
| `/patient-dashboard` | Patient Home Dashboard | 🔒 |
| `/lab-results` | **Lab Results + Gemini AI** ⭐ | 🔒 |
| `/medical-records` | Document Vault | 🔒 |
| `/appointments` | Appointments Scheduler | 🔒 |
| `/teleconsultation` | Video Consult | 🔒 |
| `/video-call` | Active Video Call | 🔒 |
| `/reports-analytics` | Reports & Charts | 🔒 |
| `/financial-hub` | Insurance & Bills | 🔒 |
| `/resources` | Health Education Library | 🔒 |
| `/settings` | Preferences + Theme | 🔒 |
| `/profile` | My Profile | 🔒 |
| `/doctor-dashboard` | Doctor View | 🔒 |
| `/admin` | Admin Panel | 🔒 |

---

## 🧪 Checkpoint Verification (for Mentors)

### Proof 1 — Backend is live
```bash
curl http://localhost:3001/api/health
```
Expected: `{"status":"✅ Healytics API is running","version":"1.0.0"}`

### Proof 2 — Registration writes to Supabase
1. Open `/register` → create account  
2. Open Supabase → Table Editor → `users`  
3. ✅ New row with bcrypt-hashed password appears

### Proof 3 — Login returns real JWT
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@healytics.ai","password":"demo1234"}'
```
Expected: `{"user":{...},"token":"eyJ..."}`

### Proof 4 — Gemini AI + DB persistence
1. Log in → navigate to `/lab-results`  
2. Click "Diabetic Profile"  
3. Wait ~3 seconds → AI explanation appears  
4. Open Supabase → `lab_reports` → ✅ new row with `ai_explanation` from Gemini

### Proof 5 — Report history from DB
```bash
curl http://localhost:3001/api/reports/YOUR_USER_ID
```
Expected: `{"reports":[{"id":"...","profile_name":"Diabetic Profile",...}]}`

---

## 📁 Repository Structure

```
Healytics/
├── src/                            # React frontend source
│   ├── pages/                      # 20+ page components
│   │   ├── LandingPage.tsx         # Public home
│   │   ├── LoginPage.tsx           # Auth
│   │   ├── RegisterPage.tsx        # Auth
│   │   ├── PatientDashboard.tsx    # Patient home
│   │   ├── LabResultsCenter.tsx    # ⭐ Core feature
│   │   └── ...17 more pages
│   ├── components/
│   │   ├── ui/                     # Shadcn components (30+)
│   │   ├── 3d/                     # Three.js scenes
│   │   ├── DashboardLayout.tsx     # Sidebar nav layout
│   │   ├── AIChatBubble.tsx        # Floating FAQ chatbot
│   │   ├── PublicNavbar.tsx        # Public page navigation
│   │   └── ...
│   ├── lib/
│   │   └── api.ts                  # All backend API calls
│   └── data/
│       └── mockData.ts             # Sample lab profiles + fallbacks
│
├── backend/                        # Node.js Express server
│   ├── server.js                   # App entry point (port 3001)
│   ├── routes/
│   │   ├── auth.js                 # POST /register, /login
│   │   ├── reports.js              # POST /analyze + Gemini AI
│   │   └── doctors.js             # GET /doctors
│   ├── lib/
│   │   └── supabase.js             # Supabase client
│   ├── supabase/
│   │   ├── schema.sql              # 4-table PostgreSQL schema
│   │   └── functions/             # Deno Edge Function (optional)
│   ├── setup-db.js                 # DB round-trip verification
│   ├── .env.example                # Environment variable template
│   └── package.json
│
├── vite.config.ts                  # /api proxy → localhost:3001
├── start.ps1                       # Windows one-click launcher
├── tailwind.config.ts
└── README.md
```

---

## 🔐 Security Notes

- `backend/.env` is in `.gitignore` — no credentials in git history
- `SUPABASE_SERVICE_KEY` is used only server-side, never sent to browser
- Passwords hashed with bcrypt (10 rounds)
- JWT signed with HS256, 7-day expiry
- All API inputs validated and sanitized before DB writes

---

## 🗺️ Roadmap

| Phase | Timeline | Features |
|---|---|---|
| Phase 1 ✅ | March 2026 | Auth, Gemini AI, Supabase, PDF, voice readout |
| Phase 2 | Q3 2026 | Real doctor scheduling, teleconsultation, EHR integration |
| Phase 3 | Q1 2027 | Mobile app (React Native), wearable API, predictive alerts |

---

## 📄 License

MIT — Built for KARE Hackathon 2026 · Team Healytics

---

## ⚠️ Medical Disclaimer

Healytics is a hackathon demonstration project. It does not provide medical advice, diagnosis, or treatment. All AI-generated interpretations are for educational purposes only. Always consult a qualified healthcare provider for any medical decisions.
