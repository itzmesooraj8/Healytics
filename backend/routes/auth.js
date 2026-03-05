const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { supabase } = require("../lib/supabase");

const JWT_SECRET = process.env.JWT_SECRET || "healytics-dev-secret";

// ── Mock user store (fallback when Supabase is not configured) ───────────────
const mockUsers = new Map();

const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

// ────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register
// Body: { name, email, password, role }
// ────────────────────────────────────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role = "patient" } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "name, email and password are required" });

    if (password.length < 6)
      return res.status(400).json({ error: "Password must be at least 6 characters" });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: "Invalid email format" });

    const hashed = await bcrypt.hash(password, 10);

    // ── Supabase path ──────────────────────────────────────────────────────
    if (supabase) {
      const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (existing)
        return res.status(409).json({ error: "Email already registered" });

      const { data, error } = await supabase
        .from("users")
        .insert({ name, email, password: hashed, role })
        .select("id, name, email, role, created_at")
        .single();

      if (error) throw error;

      return res.status(201).json({ user: data, token: signToken(data) });
    }

    // ── Mock fallback ──────────────────────────────────────────────────────
    if (mockUsers.has(email))
      return res.status(409).json({ error: "Email already registered" });

    const user = {
      id: `mock-${Date.now()}`,
      name,
      email,
      role,
      created_at: new Date().toISOString(),
    };
    mockUsers.set(email, { ...user, password: hashed });

    return res.status(201).json({ user, token: signToken(user) });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed", message: err.message });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }
// ────────────────────────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "email and password are required" });

    // ── Supabase path ──────────────────────────────────────────────────────
    if (supabase) {
      const { data, error } = await supabase
        .from("users")
        .select("id, name, email, role, password, created_at")
        .eq("email", email)
        .single();

      if (error || !data)
        return res.status(401).json({ error: "Invalid email or password" });

      const valid = await bcrypt.compare(password, data.password);
      if (!valid)
        return res.status(401).json({ error: "Invalid email or password" });

      const { password: _pw, ...user } = data;
      return res.json({ user, token: signToken(user) });
    }

    // ── Mock fallback ──────────────────────────────────────────────────────
    const stored = mockUsers.get(email);
    // Allow demo login even without registration in mock mode
    if (!stored) {
      if (email === "demo@healytics.ai" && password === "demo1234") {
        const user = { id: "demo-user", name: "Rajesh Kumar", email, role: "patient", created_at: new Date().toISOString() };
        return res.json({ user, token: signToken(user) });
      }
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, stored.password);
    if (!valid) return res.status(401).json({ error: "Invalid email or password" });

    const { password: _pw, ...user } = stored;
    return res.json({ user, token: signToken(user) });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed", message: err.message });
  }
});

module.exports = router;
