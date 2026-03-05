const router = require("express").Router();
const { supabase } = require("../lib/supabase");

// ── In-memory store (fallback when Supabase is not configured) ───────────────
const mockReports = new Map(); // userId → report[]

// ── Gemini AI helper ──────────────────────────────────────────────────────────
async function callGeminiAI(profileName, markers) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const markerText = markers
    .map(
      (m) =>
        `${m.name}: ${m.value} ${m.unit} [Ref: ${m.min}–${m.max}] → ${m.status}`
    )
    .join("\n");

  const prompt = `You are a medical AI assistant. A patient named ${profileName} has the following lab results:\n\n${markerText}\n\nPlease provide a concise, plain-English explanation (3–4 sentences) of what these results mean for the patient's health. Avoid jargon. End with: "Always consult your doctor before making any health decisions."`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const json = await res.json();
    return json?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.error("Gemini API error:", err.message);
    return null;
  }
}

// ── Fallback AI explanations ──────────────────────────────────────────────────
const FALLBACK_EXPLANATIONS = {
  diabetic:
    "Rajesh's results show his blood sugar is significantly elevated — his fasting glucose of 186 mg/dL is nearly double the healthy limit. His HbA1c of 8.2% confirms consistently high blood sugar over 3 months. His kidneys show early strain and cholesterol is unfavourable. These results suggest poorly controlled Type 2 Diabetes. Always consult your doctor before making any health decisions.",
  cardiac:
    "Meena's heart health panel shows several concerning signals. LDL 'bad' cholesterol is critically high and hsCRP indicates significant arterial inflammation. The good news is troponin and BNP are normal — no active cardiac event. However, her cardiovascular risk profile requires immediate medical attention. Always consult your doctor before making any health decisions.",
  vitamin:
    "Priya has multiple severe nutritional deficiencies. Vitamin D, B12, iron, and folate are all critically low, confirming iron-deficiency anemia. This cannot be corrected by diet alone and requires medical supplementation. Always consult your doctor before making any health decisions.",
};

// ────────────────────────────────────────────────────────────────────────────
// POST /api/reports/analyze
// Body: { userId, profileName, markers, rawText, healthScore, reportDate }
// ────────────────────────────────────────────────────────────────────────────
router.post("/analyze", async (req, res) => {
  try {
    const {
      userId = "anonymous",
      profileName,
      markers = [],
      rawText = "",
      healthScore = 50,
      reportDate = new Date().toISOString().split("T")[0],
    } = req.body;

    if (!profileName || !markers.length)
      return res.status(400).json({ error: "profileName and markers are required" });

    // Call Gemini AI (with fallback)
    const profileId = profileName.toLowerCase().includes("diab")
      ? "diabetic"
      : profileName.toLowerCase().includes("cardiac")
      ? "cardiac"
      : "vitamin";

    const aiExplanation =
      (await callGeminiAI(profileName, markers)) ||
      FALLBACK_EXPLANATIONS[profileId] ||
      "AI interpretation not available. Please consult your doctor for a full explanation of your results.";

    // ── Supabase path ──────────────────────────────────────────────────────
    if (supabase) {
      const { data: report, error: rErr } = await supabase
        .from("lab_reports")
        .insert({
          user_id: userId === "anonymous" ? null : userId,
          profile_name: profileName,
          report_date: reportDate,
          health_score: healthScore,
          raw_text: rawText,
          ai_explanation: aiExplanation,
        })
        .select()
        .single();

      if (rErr) throw rErr;

      // Insert markers
      const markerRows = markers.map((m) => ({
        report_id: report.id,
        marker_name: m.name,
        value: m.value,
        unit: m.unit,
        min_range: m.min,
        max_range: m.max,
        status: m.status,
      }));

      const { error: mErr } = await supabase
        .from("lab_markers")
        .insert(markerRows);

      if (mErr) console.warn("Marker insert warning:", mErr.message);

      return res.status(201).json({ report, aiExplanation, savedToDatabase: true });
    }

    // ── Mock fallback ──────────────────────────────────────────────────────
    const report = {
      id: `mock-report-${Date.now()}`,
      user_id: userId,
      profile_name: profileName,
      report_date: reportDate,
      health_score: healthScore,
      raw_text: rawText,
      ai_explanation: aiExplanation,
      created_at: new Date().toISOString(),
    };

    const existing = mockReports.get(userId) || [];
    mockReports.set(userId, [report, ...existing]);

    return res.status(201).json({ report, aiExplanation, savedToDatabase: false });
  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({ error: "Analysis failed", message: err.message });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/reports/:userId
// Returns all lab reports for a user
// ────────────────────────────────────────────────────────────────────────────
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (supabase) {
      const { data, error } = await supabase
        .from("lab_reports")
        .select("id, profile_name, report_date, health_score, ai_explanation, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return res.json({ reports: data || [] });
    }

    const reports = mockReports.get(userId) || [];
    return res.json({ reports });
  } catch (err) {
    console.error("Get reports error:", err);
    res.status(500).json({ error: "Failed to fetch reports", message: err.message });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/reports/:reportId/markers
// Returns all markers for a specific report
// ────────────────────────────────────────────────────────────────────────────
router.get("/:reportId/markers", async (req, res) => {
  try {
    const { reportId } = req.params;

    if (supabase) {
      const { data, error } = await supabase
        .from("lab_markers")
        .select("*")
        .eq("report_id", reportId)
        .order("created_at");

      if (error) throw error;
      return res.json({ markers: data || [] });
    }

    // Mock: search across all user reports
    let found = [];
    for (const reports of mockReports.values()) {
      const report = reports.find((r) => r.id === reportId);
      if (report) { found = report.markers || []; break; }
    }
    return res.json({ markers: found });
  } catch (err) {
    console.error("Get markers error:", err);
    res.status(500).json({ error: "Failed to fetch markers", message: err.message });
  }
});

module.exports = router;
