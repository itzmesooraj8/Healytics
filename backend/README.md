# Healytics — Backend API

Node.js + Express backend with Supabase integration.

## Quick Start

```bash
cd backend
npm install
cp .env.example .env   # Fill in your credentials
npm run dev            # Starts on http://localhost:3001
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/reports/analyze` | Analyze lab report (saves to DB + calls Gemini AI) |
| GET | `/api/reports/:userId` | Get all reports for a user |
| GET | `/api/reports/:reportId/markers` | Get markers for a specific report |
| GET | `/api/doctors` | Get list of doctors |

## Postman — Demo Request

**POST /api/reports/analyze**
```json
{
  "userId": "demo-user",
  "profileName": "Diabetic Profile — Rajesh Kumar, 58M",
  "healthScore": 42,
  "reportDate": "2026-03-03",
  "markers": [
    { "name": "Glucose (Fasting)", "value": 186, "unit": "mg/dL", "min": 70, "max": 100, "status": "HIGH" },
    { "name": "HbA1c", "value": 8.2, "unit": "%", "min": 4.0, "max": 5.6, "status": "HIGH" },
    { "name": "LDL Cholesterol", "value": 142, "unit": "mg/dL", "min": 0, "max": 100, "status": "HIGH" },
    { "name": "HDL Cholesterol", "value": 38, "unit": "mg/dL", "min": 40, "max": 60, "status": "LOW" },
    { "name": "HbA1c", "value": 8.2, "unit": "%", "min": 4.0, "max": 5.6, "status": "HIGH" }
  ],
  "rawText": "Fasting glucose 186 mg/dL — elevated. HbA1c 8.2% — uncontrolled."
}
```

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run `backend/supabase/schema.sql` in the Supabase SQL Editor
3. Copy your project URL and service-role key to `.env`
4. Deploy the edge function:
   ```bash
   npx supabase functions deploy ai-interpret --project-ref YOUR_PROJECT_REF
   npx supabase secrets set GEMINI_API_KEY=your-key --project-ref YOUR_PROJECT_REF
   ```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Service-role key (bypasses RLS) |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `GEMINI_API_KEY` | Google AI Studio API key |
| `PORT` | Server port (default: 3001) |

> **Note:** Without `.env` credentials, the API runs in **mock mode** — all data is stored in memory and Gemini responses use cached fallbacks. This is sufficient for demos and checkpoint presentations.
