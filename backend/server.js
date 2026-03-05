require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const reportsRoutes = require("./routes/reports");
const doctorsRoutes = require("./routes/doctors");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:8080",
    "http://localhost:8080",
    "http://localhost:3000",
  ],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

// ── Health check ────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    status: "✅ Healytics API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: [
      "POST /api/auth/register",
      "POST /api/auth/login",
      "POST /api/reports/analyze",
      "GET  /api/reports/:userId",
      "GET  /api/reports/:reportId/markers",
      "GET  /api/doctors",
    ],
  });
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/doctors", doctorsRoutes);

// ── 404 handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global error handler ────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Healytics API running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health\n`);
});
