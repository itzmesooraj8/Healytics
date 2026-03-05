export interface LabMarker {
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: "HIGH" | "LOW" | "NORMAL";
}

export interface LabProfile {
  id: string;
  name: string;
  date: string;
  markers: LabMarker[];
  healthScore: number;
  rawText: string;
}

export const DIABETIC_PROFILE: LabProfile = {
  id: "diabetic",
  name: "Diabetic Profile — Rajesh Kumar, 58M",
  date: "March 3, 2026",
  markers: [
    { name: "Glucose (Fasting)", value: 186, unit: "mg/dL", min: 70, max: 100, status: "HIGH" },
    { name: "HbA1c", value: 8.2, unit: "%", min: 4.0, max: 5.6, status: "HIGH" },
    { name: "LDL Cholesterol", value: 142, unit: "mg/dL", min: 0, max: 100, status: "HIGH" },
    { name: "HDL Cholesterol", value: 38, unit: "mg/dL", min: 40, max: 60, status: "LOW" },
    { name: "Triglycerides", value: 210, unit: "mg/dL", min: 0, max: 150, status: "HIGH" },
    { name: "Hemoglobin", value: 13.1, unit: "g/dL", min: 13.5, max: 17.5, status: "LOW" },
    { name: "Vitamin D", value: 14, unit: "ng/mL", min: 30, max: 100, status: "LOW" },
    { name: "TSH", value: 3.2, unit: "mIU/L", min: 0.4, max: 4.0, status: "NORMAL" },
    { name: "WBC", value: 7.8, unit: "10³/μL", min: 4.5, max: 11.0, status: "NORMAL" },
    { name: "Creatinine", value: 1.4, unit: "mg/dL", min: 0.7, max: 1.2, status: "HIGH" },
  ],
  healthScore: 42,
  rawText: "Patient: Rajesh Kumar | Age: 58 | Sex: M | Date: 03/03/2026\nGlucose (F): 186 mg/dL [Ref: 70-100] H\nHbA1c: 8.2% [Ref: 4.0-5.6] H\nLDL: 142 mg/dL [Ref: <100] H\nHDL: 38 mg/dL [Ref: 40-60] L\nTriglycerides: 210 mg/dL [Ref: <150] H\nHemoglobin: 13.1 g/dL [Ref: 13.5-17.5] L\nVitamin D: 14 ng/mL [Ref: 30-100] L\nTSH: 3.2 mIU/L [Ref: 0.4-4.0] N\nWBC: 7.8 10³/μL [Ref: 4.5-11.0] N\nCreatinine: 1.4 mg/dL [Ref: 0.7-1.2] H",
};

export const CARDIAC_PROFILE: LabProfile = {
  id: "cardiac",
  name: "Cardiac Panel — Meena Krishnan, 52F",
  date: "February 28, 2026",
  markers: [
    { name: "LDL Cholesterol", value: 178, unit: "mg/dL", min: 0, max: 100, status: "HIGH" },
    { name: "HDL Cholesterol", value: 32, unit: "mg/dL", min: 40, max: 60, status: "LOW" },
    { name: "Triglycerides", value: 285, unit: "mg/dL", min: 0, max: 150, status: "HIGH" },
    { name: "hsCRP", value: 4.8, unit: "mg/L", min: 0, max: 1.0, status: "HIGH" },
    { name: "Troponin I", value: 0.02, unit: "ng/mL", min: 0, max: 0.04, status: "NORMAL" },
    { name: "BNP", value: 95, unit: "pg/mL", min: 0, max: 100, status: "NORMAL" },
    { name: "Homocysteine", value: 18, unit: "μmol/L", min: 5, max: 15, status: "HIGH" },
    { name: "Fibrinogen", value: 420, unit: "mg/dL", min: 200, max: 400, status: "HIGH" },
  ],
  healthScore: 38,
  rawText: "Patient: Meena Krishnan | Age: 52 | Sex: F | Date: 28/02/2026\nLDL: 178 mg/dL [Ref: <100] H\nHDL: 32 mg/dL [Ref: 40-60] L\nTriglycerides: 285 mg/dL [Ref: <150] H\nhsCRP: 4.8 mg/L [Ref: <1.0] H\nTroponin I: 0.02 ng/mL [Ref: <0.04] N\nBNP: 95 pg/mL [Ref: <100] N\nHomocysteine: 18 μmol/L [Ref: 5-15] H\nFibrinogen: 420 mg/dL [Ref: 200-400] H",
};

export const VITAMIN_PROFILE: LabProfile = {
  id: "vitamin",
  name: "Vitamin Deficiency Panel — Priya Suresh, 34F",
  date: "March 1, 2026",
  markers: [
    { name: "Vitamin D", value: 11, unit: "ng/mL", min: 30, max: 100, status: "LOW" },
    { name: "Vitamin B12", value: 142, unit: "pg/mL", min: 200, max: 900, status: "LOW" },
    { name: "Folate", value: 2.8, unit: "ng/mL", min: 3.0, max: 17.0, status: "LOW" },
    { name: "Iron (Serum)", value: 42, unit: "μg/dL", min: 60, max: 170, status: "LOW" },
    { name: "Ferritin", value: 6, unit: "ng/mL", min: 12, max: 150, status: "LOW" },
    { name: "Hemoglobin", value: 9.8, unit: "g/dL", min: 12.0, max: 16.0, status: "LOW" },
    { name: "Calcium", value: 8.1, unit: "mg/dL", min: 8.5, max: 10.5, status: "LOW" },
    { name: "Magnesium", value: 1.6, unit: "mg/dL", min: 1.7, max: 2.2, status: "LOW" },
  ],
  healthScore: 31,
  rawText: "Patient: Priya Suresh | Age: 34 | Sex: F | Date: 01/03/2026\nVitamin D: 11 ng/mL [Ref: 30-100] L\nVitamin B12: 142 pg/mL [Ref: 200-900] L\nFolate: 2.8 ng/mL [Ref: 3.0-17.0] L\nIron: 42 μg/dL [Ref: 60-170] L\nFerritin: 6 ng/mL [Ref: 12-150] L\nHemoglobin: 9.8 g/dL [Ref: 12.0-16.0] L\nCalcium: 8.1 mg/dL [Ref: 8.5-10.5] L\nMagnesium: 1.6 mg/dL [Ref: 1.7-2.2] L",
};

export const SKIN_CANCER_PROFILE: LabProfile = {
  id: "skin_cancer",
  name: "Skin Cancer / Melanoma Panel — Arjun Mehta, 45M",
  date: "March 4, 2026",
  markers: [
    { name: "S-100B Protein", value: 0.42, unit: "μg/L", min: 0, max: 0.10, status: "HIGH" },
    { name: "LDH", value: 292, unit: "U/L", min: 140, max: 240, status: "HIGH" },
    { name: "WBC", value: 12.1, unit: "10³/μL", min: 4.5, max: 11.0, status: "HIGH" },
    { name: "Platelets", value: 438, unit: "10³/μL", min: 150, max: 400, status: "HIGH" },
    { name: "Hemoglobin", value: 11.0, unit: "g/dL", min: 13.5, max: 17.5, status: "LOW" },
    { name: "ALT (Liver)", value: 56, unit: "U/L", min: 10, max: 40, status: "HIGH" },
    { name: "Vitamin D", value: 15, unit: "ng/mL", min: 30, max: 100, status: "LOW" },
    { name: "Albumin", value: 3.1, unit: "g/dL", min: 3.5, max: 5.0, status: "LOW" },
    { name: "Ferritin", value: 310, unit: "ng/mL", min: 12, max: 300, status: "HIGH" },
    { name: "ESR", value: 68, unit: "mm/hr", min: 0, max: 15, status: "HIGH" },
  ],
  healthScore: 29,
  rawText: "Patient: Arjun Mehta | Age: 45 | Sex: M | Date: 04/03/2026\nS-100B Protein: 0.42 μg/L [Ref: <0.10] H\nLDH: 292 U/L [Ref: 140-240] H\nWBC: 12.1 10³/μL [Ref: 4.5-11.0] H\nPlatelets: 438 10³/μL [Ref: 150-400] H\nHemoglobin: 11.0 g/dL [Ref: 13.5-17.5] L\nALT: 56 U/L [Ref: 10-40] H\nVitamin D: 15 ng/mL [Ref: 30-100] L\nAlbumin: 3.1 g/dL [Ref: 3.5-5.0] L\nFerritin: 310 ng/mL [Ref: 12-300] H\nESR: 68 mm/hr [Ref: 0-15] H",
};

export const AI_EXPLANATIONS: Record<string, string> = {
  diabetic: "Rajesh's results show his blood sugar is significantly elevated — his fasting glucose of 186 mg/dL is nearly double the healthy limit of 100 mg/dL, and his HbA1c of 8.2% confirms his blood sugar has been consistently high for the past 3 months. His kidneys are showing early strain with a slightly elevated creatinine. His 'good' cholesterol (HDL) is too low while his 'bad' cholesterol (LDL) is too high, increasing his heart risk. His Vitamin D is critically deficient. These results together suggest poorly controlled Type 2 Diabetes with early complications. Please discuss with your doctor urgently.",
  cardiac: "Meena's heart health panel shows several concerning signals. Her LDL 'bad' cholesterol is critically high at 178 mg/dL, nearly double the safe limit. Her hsCRP of 4.8 indicates significant inflammation in her blood vessels — a key risk factor for heart attack. Her homocysteine is elevated, which damages artery walls over time. The good news is that her troponin and BNP are normal, meaning there is no evidence of an active cardiac event. However, her overall cardiovascular risk profile requires immediate medical attention and lifestyle changes.",
  vitamin: "Priya has multiple severe nutritional deficiencies. Her Vitamin D is critically low at 11 ng/mL — she needs at least 30 ng/mL for bone and immune health. Her B12 at 142 pg/mL is deficient, which can cause fatigue, nerve tingling, and memory problems. Her iron and ferritin are both very low, explaining likely symptoms of tiredness and weakness. Her hemoglobin of 9.8 indicates iron-deficiency anemia. All eight markers in this panel are below the healthy range. This requires medical supplementation and dietary changes — this cannot be corrected by diet alone.",
  skin_cancer: "Arjun's panel shows several markers that require urgent specialist review. The S-100B Protein at 0.42 μg/L is more than 4x the normal threshold — this is a validated serum biomarker for melanoma activity and disease progression. Elevated LDH at 292 U/L is an independent prognostic indicator in melanoma, often associated with a higher tumour burden. His raised WBC, ESR, and platelets suggest active systemic inflammation. The low hemoglobin and albumin indicate nutritional compromise common during oncological stress. Elevated liver enzymes (ALT) warrant a hepatic ultrasound to rule out metastatic spread. This panel should be discussed immediately with a dermatologist-oncologist. These are laboratory markers — diagnosis requires biopsy and imaging confirmation.",
};

export const ACTIONABLE_INSIGHTS: Record<string, string[]> = {
  diabetic: [
    "Fasting glucose 186 mg/dL — nearly 2x the healthy limit. Discuss medication adjustment with your endocrinologist.",
    "HbA1c 8.2% indicates 3 months of uncontrolled blood sugar. Target below 7% with your doctor's guidance.",
    "Vitamin D critically low at 14 ng/mL. 15 minutes of morning sunlight daily and discuss D3 supplements with your doctor.",
    "LDL cholesterol elevated. Reduce saturated fats — avoid red meat, fried foods, and full-fat dairy.",
    "Creatinine slightly elevated — stay well hydrated and discuss kidney function monitoring with your doctor.",
  ],
  cardiac: [
    "LDL 178 mg/dL is critically high. Discuss statin therapy with your cardiologist immediately.",
    "hsCRP 4.8 indicates arterial inflammation. Anti-inflammatory diet (omega-3s, leafy greens) may help.",
    "Low HDL of 32 — regular aerobic exercise (30 min/day) is the most effective way to raise good cholesterol.",
    "Elevated homocysteine — ensure adequate B6, B12, and folate intake through diet or supplements.",
  ],
  vitamin: [
    "Vitamin D critically low — discuss high-dose D3 supplementation (usually 60,000 IU weekly for 8 weeks) with your doctor.",
    "B12 deficiency can cause permanent nerve damage if untreated. Injections may be needed if oral supplements are insufficient.",
    "Iron-deficiency anemia confirmed. Increase dietary iron: spinach, lentils, pomegranate. Take with Vitamin C for absorption.",
    "All deficiencies are severe — this panel requires a follow-up appointment, not just dietary changes.",
  ],
  skin_cancer: [
    "S-100B Protein 4x above normal — this is a melanoma progression marker. Consult a dermatologist-oncologist immediately.",
    "Elevated LDH is a staging indicator in melanoma. Do not delay — request a full-body PET-CT scan referral.",
    "Raised ALT — a liver ultrasound is needed to rule out hepatic metastasis.",
    "Low albumin and hemoglobin indicate nutritional stress. High-protein diet and iron-rich foods are important during treatment.",
    "Vitamin D deficiency is common in cancer patients and may worsen prognosis — discuss supplementation with your oncologist.",
  ],
};

export const WEARABLE_DATA = { heartRate: 72, spo2: 98, steps: 6240, sleep: 7.2, hrv: 45 };

export interface Doctor {
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

export const MOCK_DOCTORS: Doctor[] = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "Endocrinologist", rating: 4.9, reviews: 312, available: true, experience: "14 years", hospital: "Apollo Hospital, Chennai", avatar: "PS", color: "#00d4ff" },
  { id: 2, name: "Dr. Arun Krishnamurthy", specialty: "Cardiologist", rating: 4.8, reviews: 428, available: true, experience: "18 years", hospital: "Fortis Malar, Chennai", avatar: "AK", color: "#7c3aed" },
  { id: 3, name: "Dr. Kavitha Rajan", specialty: "General Physician", rating: 4.7, reviews: 891, available: false, experience: "11 years", hospital: "KGCAS Medical Centre", avatar: "KR", color: "#00ff88" },
  { id: 4, name: "Dr. Suresh Venkataraman", specialty: "Hematologist", rating: 4.9, reviews: 203, available: true, experience: "22 years", hospital: "AIIMS Delhi", avatar: "SV", color: "#ffaa00" },
  { id: 5, name: "Dr. Anitha Balasubramanian", specialty: "Diabetologist", rating: 4.8, reviews: 567, available: true, experience: "16 years", hospital: "Manipal Hospital, Bangalore", avatar: "AB", color: "#ff4444" },
  { id: 6, name: "Dr. Rajesh Natarajan", specialty: "Nephrologist", rating: 4.6, reviews: 189, available: false, experience: "9 years", hospital: "KG Hospital, Coimbatore", avatar: "RN", color: "#00d4ff" },
  { id: 7, name: "Dr. Meenakshi Sundaram", specialty: "Nutritionist", rating: 4.9, reviews: 734, available: true, experience: "13 years", hospital: "Healytics Clinic", avatar: "MS", color: "#7c3aed" },
  { id: 8, name: "Dr. Vikram Patel", specialty: "Internal Medicine", rating: 4.7, reviews: 445, available: true, experience: "20 years", hospital: "Narayana Health, Bangalore", avatar: "VP", color: "#00ff88" },
];

export const HEALTH_TREND_DATA = [
  { month: "Oct", glucose: 210, hba1c: 8.8, cholesterol: 195 },
  { month: "Nov", glucose: 198, hba1c: 8.5, cholesterol: 188 },
  { month: "Dec", glucose: 192, hba1c: 8.3, cholesterol: 182 },
  { month: "Jan", glucose: 188, hba1c: 8.2, cholesterol: 178 },
  { month: "Feb", glucose: 186, hba1c: 8.2, cholesterol: 175 },
  { month: "Mar", glucose: 180, hba1c: 8.0, cholesterol: 170 },
];

export const LAB_PROFILES = [DIABETIC_PROFILE, CARDIAC_PROFILE, VITAMIN_PROFILE, SKIN_CANCER_PROFILE];
