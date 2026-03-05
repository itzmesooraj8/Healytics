// ─────────────────────────────────────────────────────────────────────────────
// Healytics — Frontend API Client
// All backend calls go through this module.
// Base URL is /api (proxied to http://localhost:3001 by Vite in dev mode)
// ─────────────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.VITE_API_URL || "/api";

// ── Storage helpers ───────────────────────────────────────────────────────────
export const getToken = (): string | null => localStorage.getItem("healytics_token");
export const getUser = () => {
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
    // Auto-redirect to login on 401 Unauthorized (expired / invalid token)
    if (res.status === 401) {
      clearSession();
      window.location.href = "/login";
    }
    const msg = (body as { error?: string })?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body as T;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock DB — seed default demo accounts once on first load (no backend needed)
// ─────────────────────────────────────────────────────────────────────────────
const SEED_KEY = "healytics_mock_seeded_v1";
if (!localStorage.getItem(SEED_KEY)) {
  const defaults = [
    {
      id: "demo-patient-1",
      name: "Rajesh Kumar",
      email: "demo@healytics.ai",
      password: "demo1234",
      role: "patient",
      created_at: new Date().toISOString(),
    },
    {
      id: "demo-doctor-1",
      name: "Dr. Sarah Mitchell",
      email: "doctor@healytics.ai",
      password: "demo1234",
      role: "doctor",
      created_at: new Date().toISOString(),
    },
  ];
  // Merge with any users already registered so we never overwrite real data
  const existing: unknown[] = JSON.parse(localStorage.getItem("mock_db_users") || "[]");
  const merged = [
    ...defaults.filter((d) => !(existing as { email: string }[]).find((e) => e.email === d.email)),
    ...existing,
  ];
  localStorage.setItem("mock_db_users", JSON.stringify(merged));
  localStorage.setItem(SEED_KEY, "1");
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
  isNewUser?: boolean;
}

export const authAPI = {
  register: async (name: string, email: string, password: string, role: string): Promise<AuthResponse> => {
    // Mock Registration using LocalStorage (Vercel Backendless Mode)
    const usersStr = localStorage.getItem("mock_db_users") || "[]";
    const users: any[] = JSON.parse(usersStr);

    const existing = users.find((u) => u.email === email);
    if (existing) {
      // If same password → silently log them in (idempotent register)
      if (existing.password === password) {
        const { password: _, ...userWithoutPassword } = existing;
        return { user: userWithoutPassword as AuthUser, token: `mock-token-${existing.id}` };
      }
      throw new Error("This email is already registered. Please sign in instead.");
    }

    const newUser = {
      id: `mock-${Date.now()}`,
      name,
      email,
      password,
      role: role || "patient",
      created_at: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("mock_db_users", JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword as AuthUser, token: `mock-token-${newUser.id}`, isNewUser: true };
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Mock Login using LocalStorage (Vercel Backendless Mode)
    const usersStr = localStorage.getItem("mock_db_users") || "[]";
    const users: any[] = JSON.parse(usersStr);

    // Hardcoded demo accounts (always work even if localStorage is cleared)
    if (email === "demo@healytics.ai" && password === "demo1234") {
      return {
        user: { id: "demo-patient-1", name: "Rajesh Kumar", email: "demo@healytics.ai", role: "patient", created_at: new Date().toISOString() },
        token: "mock-demo-token-patient",
      };
    }
    if (email === "doctor@healytics.ai" && password === "demo1234") {
      return {
        user: { id: "demo-doctor-1", name: "Dr. Sarah Mitchell", email: "doctor@healytics.ai", role: "doctor", created_at: new Date().toISOString() },
        token: "mock-demo-token-doctor",
      };
    }

    const existingByEmail = users.find((u) => u.email === email);

    if (existingByEmail) {
      // Email exists — check password
      if (existingByEmail.password !== password) {
        throw new Error("Incorrect password. Please try again.");
      }
      const { password: _, ...userWithoutPassword } = existingByEmail;
      return { user: userWithoutPassword as AuthUser, token: `mock-token-${existingByEmail.id}` };
    }

    // ── Frictionless demo mode: unknown email → auto-register as patient ──────
    const autoName = email.split("@")[0].replace(/[._\-+]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim() || "User";
    const newUser = {
      id: `mock-${Date.now()}`,
      name: autoName,
      email,
      password,
      role: "patient",
      created_at: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("mock_db_users", JSON.stringify(users));
    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword as AuthUser, token: `mock-token-${newUser.id}`, isNewUser: true };
  },

  forgotPassword: async (email: string) => {
    // Mock forgot password
    return { message: "If that email exists, a reset link has been sent." };
  },
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
