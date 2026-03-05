// ─────────────────────────────────────────────────────────────────────────────
// Healytics — Frontend API Client
// All backend calls go through this module.
// Base URL is /api (proxied to http://localhost:3001 by Vite in dev mode)
// ─────────────────────────────────────────────────────────────────────────────

const BASE = "/api";

// ── Storage helpers ───────────────────────────────────────────────────────────
export const getToken = (): string | null => localStorage.getItem("healytics_token");
export const getUser  = () => {
  try { return JSON.parse(localStorage.getItem("healytics_user") || "null"); }
  catch { return null; }
};
export const setSession = (user: object, token: string) => {
  localStorage.setItem("healytics_user", JSON.stringify(user));
  localStorage.setItem("healytics_token", token);
};
export const clearSession = () => {
  localStorage.removeItem("healytics_user");
  localStorage.removeItem("healytics_token");
};
export const isLoggedIn = () => !!getToken();

// ── Base fetch wrapper ────────────────────────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  let body: unknown;
  try { body = await res.json(); } catch { body = {}; }

  if (!res.ok) {
    const msg = (body as { error?: string })?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body as T;
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export const authAPI = {
  register: (name: string, email: string, password: string, role: string) =>
    apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
    }),

  login: (email: string, password: string) =>
    apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};

// ─────────────────────────────────────────────────────────────────────────────
// Reports
// ─────────────────────────────────────────────────────────────────────────────
export interface LabMarkerPayload {
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: "HIGH" | "LOW" | "NORMAL";
}

export interface AnalyzePayload {
  userId?: string;
  profileName: string;
  markers: LabMarkerPayload[];
  rawText?: string;
  healthScore?: number;
  reportDate?: string;
}

export interface AnalyzeResponse {
  report: {
    id: string;
    profile_name: string;
    report_date: string;
    health_score: number;
    ai_explanation: string;
    created_at: string;
  };
  aiExplanation: string;
  savedToDatabase: boolean;
}

export interface ReportSummary {
  id: string;
  profile_name: string;
  report_date: string;
  health_score: number;
  ai_explanation: string;
  created_at: string;
}

export const reportsAPI = {
  analyze: (payload: AnalyzePayload) =>
    apiFetch<AnalyzeResponse>("/reports/analyze", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getByUser: (userId: string) =>
    apiFetch<{ reports: ReportSummary[] }>(`/reports/${userId}`),

  getMarkers: (reportId: string) =>
    apiFetch<{ markers: LabMarkerPayload[] }>(`/reports/${reportId}/markers`),
};

// ─────────────────────────────────────────────────────────────────────────────
// Doctors
// ─────────────────────────────────────────────────────────────────────────────
export interface DoctorAPI {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  available: boolean;
  experience: string;
  hospital: string;
  avatar: string;
  color: string;
}

export const doctorsAPI = {
  getAll: () => apiFetch<{ doctors: DoctorAPI[]; total: number }>("/doctors"),
  getById: (id: number) => apiFetch<{ doctor: DoctorAPI }>(`/doctors/${id}`),
};
