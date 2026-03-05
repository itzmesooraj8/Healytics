const router = require("express").Router();

// ────────────────────────────────────────────────────────────────────────────
// GET /api/doctors
// Returns list of available doctors
// ────────────────────────────────────────────────────────────────────────────
const DOCTORS = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "Endocrinologist", rating: 4.9, reviews: 312, available: true, experience: "14 years", hospital: "Apollo Hospital, Chennai", avatar: "PS", color: "#00d4ff" },
  { id: 2, name: "Dr. Arun Krishnamurthy", specialty: "Cardiologist", rating: 4.8, reviews: 428, available: true, experience: "18 years", hospital: "Fortis Malar, Chennai", avatar: "AK", color: "#7c3aed" },
  { id: 3, name: "Dr. Kavitha Rajan", specialty: "General Physician", rating: 4.7, reviews: 891, available: false, experience: "11 years", hospital: "KGCAS Medical Centre", avatar: "KR", color: "#00ff88" },
  { id: 4, name: "Dr. Suresh Venkataraman", specialty: "Hematologist", rating: 4.9, reviews: 203, available: true, experience: "22 years", hospital: "AIIMS Delhi", avatar: "SV", color: "#ffaa00" },
  { id: 5, name: "Dr. Anitha Balasubramanian", specialty: "Diabetologist", rating: 4.8, reviews: 567, available: true, experience: "16 years", hospital: "Manipal Hospital, Bangalore", avatar: "AB", color: "#ff4444" },
  { id: 6, name: "Dr. Rajesh Natarajan", specialty: "Nephrologist", rating: 4.6, reviews: 189, available: false, experience: "9 years", hospital: "KG Hospital, Coimbatore", avatar: "RN", color: "#00d4ff" },
  { id: 7, name: "Dr. Meenakshi Sundaram", specialty: "Nutritionist", rating: 4.9, reviews: 734, available: true, experience: "13 years", hospital: "Healytics Clinic", avatar: "MS", color: "#7c3aed" },
  { id: 8, name: "Dr. Vikram Patel", specialty: "Internal Medicine", rating: 4.7, reviews: 445, available: true, experience: "20 years", hospital: "Narayana Health, Bangalore", avatar: "VP", color: "#00ff88" },
];

router.get("/", (_req, res) => {
  res.json({ doctors: DOCTORS, total: DOCTORS.length });
});

router.get("/:id", (req, res) => {
  const doctor = DOCTORS.find((d) => d.id === parseInt(req.params.id));
  if (!doctor) return res.status(404).json({ error: "Doctor not found" });
  res.json({ doctor });
});

module.exports = router;
