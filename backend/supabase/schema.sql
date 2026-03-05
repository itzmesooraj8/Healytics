-- ============================================================
-- Healytics — Supabase PostgreSQL Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. users ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,               -- bcrypt hashed
  role        TEXT NOT NULL DEFAULT 'patient'
                CHECK (role IN ('patient', 'doctor', 'admin')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. lab_reports ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lab_reports (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  profile_name    TEXT NOT NULL,
  report_date     DATE NOT NULL,
  health_score    INTEGER NOT NULL CHECK (health_score BETWEEN 0 AND 100),
  raw_text        TEXT,
  ai_explanation  TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. lab_markers ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lab_markers (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  report_id   UUID REFERENCES lab_reports(id) ON DELETE CASCADE,
  marker_name TEXT NOT NULL,
  value       NUMERIC NOT NULL,
  unit        TEXT NOT NULL,
  min_range   NUMERIC NOT NULL,
  max_range   NUMERIC NOT NULL,
  status      TEXT NOT NULL CHECK (status IN ('HIGH', 'LOW', 'NORMAL')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 4. appointments ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id        UUID REFERENCES users(id) ON DELETE CASCADE,
  doctor_name       TEXT NOT NULL,
  specialty         TEXT NOT NULL,
  appointment_date  TIMESTAMPTZ NOT NULL,
  status            TEXT NOT NULL DEFAULT 'upcoming'
                      CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── Indexes for common queries ───────────────────────────────
CREATE INDEX IF NOT EXISTS idx_lab_reports_user_id   ON lab_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_lab_markers_report_id ON lab_markers(report_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient  ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_users_email           ON users(email);

-- ── Row Level Security (RLS) ─────────────────────────────────
-- Enable RLS on all tables (use service-role key in backend to bypass)
ALTER TABLE users        ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_reports  ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_markers  ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
