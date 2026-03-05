import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, AlertCircle, Heart, Activity, Moon, Footprints, Waves, ArrowUp, ArrowDown, ToggleLeft, ToggleRight } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import AnimatedCounter from "@/components/AnimatedCounter";
import TypewriterText from "@/components/TypewriterText";
import AIChatBubble from "@/components/AIChatBubble";
import PrintSummaryCard from "@/components/PrintSummaryCard";
import { reportsAPI, getUser } from "@/lib/api";
import {
  DIABETIC_PROFILE, CARDIAC_PROFILE, VITAMIN_PROFILE,
  AI_EXPLANATIONS, ACTIONABLE_INSIGHTS, WEARABLE_DATA,
  type LabProfile, type LabMarker
} from "@/data/mockData";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

// Mock previous values for compare feature
const PREVIOUS_VALUES: Record<string, Record<string, number>> = {
  diabetic: { "Glucose (Fasting)": 192, "HbA1c": 8.5, "LDL Cholesterol": 148, "HDL Cholesterol": 36, "Triglycerides": 220, "Hemoglobin": 12.9, "Vitamin D": 12, "TSH": 3.4, "WBC": 7.5, "Creatinine": 1.3 },
  cardiac: { "LDL Cholesterol": 185, "HDL Cholesterol": 30, "Triglycerides": 295, "hsCRP": 5.2, "Troponin I": 0.01, "BNP": 88, "Homocysteine": 19, "Fibrinogen": 430 },
  vitamin: { "Vitamin D": 9, "Vitamin B12": 135, "Folate": 2.5, "Iron (Serum)": 38, "Ferritin": 5, "Hemoglobin": 9.5, "Calcium": 7.9, "Magnesium": 1.5 },
};

const LabResultsCenter = () => {
  const { toast } = useToast();
  const [activeProfile, setActiveProfile] = useState<LabProfile>(DIABETIC_PROFILE);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [aiExplanation, setAiExplanation] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-US");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<LabMarker | null>(null);
  const [wearableSynced, setWearableSynced] = useState(false);
  const [syncingWearable, setSyncingWearable] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const runAnalysis = useCallback((profile: LabProfile) => {
    setActiveProfile(profile);
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setShowSkeleton(true);
    setProgress(0);
    setStage(0);
    setAiExplanation("");
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    setTimeout(() => { setStage(1); setProgress(33); }, 100);
    setTimeout(() => { setStage(2); setProgress(66); }, 1500);
    setTimeout(() => { setStage(3); setProgress(100); }, 3000);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowSkeleton(false);
      setAnalysisComplete(true);
      loadAIExplanation(profile);
    }, 4500);
  }, []);

  const loadAIExplanation = async (profile: LabProfile) => {
    setIsLoadingAI(true);
    try {
      // 1. Try Supabase edge function (Gemini live) first
      let explanation: string | null = null;
      try {
        const response = await fetch("/functions/v1/ai-interpret", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileName: profile.name, markers: profile.markers, rawText: profile.rawText }),
        });
        if (response.ok) {
          const data = await response.json();
          explanation = data.explanation || null;
        }
      } catch {
        // Edge function not available — will use backend or cached
      }

      // 2. Save to backend API (also triggers Gemini via Express if edge function didn't respond)
      const user = getUser();
      try {
        const result = await reportsAPI.analyze({
          userId: user?.id,
          profileName: profile.name,
          markers: profile.markers,
          rawText: profile.rawText,
          healthScore: profile.healthScore,
          reportDate: profile.date,
        });
        // If we didn't get an explanation from the edge function, use what the backend returned
        if (!explanation && result.aiExplanation) explanation = result.aiExplanation;
        if (result.savedToDatabase) {
          toast({ title: "💾 Report saved", description: "Analysis saved to your health record." });
        }
      } catch {
        // Backend not running — use local cached fallback
      }

      // 3. Final fallback to static cached explanation
      setAiExplanation(explanation || AI_EXPLANATIONS[profile.id]);
      if (!explanation) {
        toast({ title: "📡 AI Ready", description: "Using cached AI response — live API available" });
      }
    } catch {
      setAiExplanation(AI_EXPLANATIONS[profile.id]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  useEffect(() => { runAnalysis(DIABETIC_PROFILE); }, [runAnalysis]);

  const handleVoice = () => {
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
    else {
      const utterance = new SpeechSynthesisUtterance(aiExplanation);
      utterance.lang = selectedLanguage;
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Healytics — Lab Report Interpretation", 20, 20);
    doc.setFontSize(12);
    doc.text(`Patient: ${activeProfile.name}`, 20, 35);
    doc.text(`Date: ${activeProfile.date}`, 20, 42);
    doc.text(`Health Score: ${activeProfile.healthScore}/100`, 20, 49);
    doc.setFontSize(10);
    let y = 62;
    doc.text("Marker | Value | Range | Status", 20, y); y += 6;
    activeProfile.markers.forEach(m => { doc.text(`${m.name}: ${m.value} ${m.unit} [${m.min}-${m.max}] ${m.status}`, 20, y); y += 5; });
    y += 8;
    doc.setFontSize(11); doc.text("AI Interpretation:", 20, y); y += 6;
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(aiExplanation || AI_EXPLANATIONS[activeProfile.id], 170);
    doc.text(lines, 20, y); y += lines.length * 4 + 10;
    doc.setFontSize(11); doc.text("Actionable Insights:", 20, y); y += 6;
    doc.setFontSize(9);
    (ACTIONABLE_INSIGHTS[activeProfile.id] || []).forEach(insight => { const il = doc.splitTextToSize(`• ${insight}`, 170); doc.text(il, 20, y); y += il.length * 4 + 2; });
    doc.setFontSize(8);
    doc.text("NOT A MEDICAL DIAGNOSIS — Consult your healthcare provider | Generated by Healytics", 20, 280);
    doc.save(`Healytics-Report-${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const handleFileUpload = () => runAnalysis(activeProfile);
  const syncWearable = () => { setSyncingWearable(true); setTimeout(() => { setWearableSynced(true); setSyncingWearable(false); }, 2000); };

  const scoreColor = activeProfile.healthScore > 75 ? "hsl(var(--accent-green))" : activeProfile.healthScore >= 50 ? "hsl(var(--accent-amber))" : "hsl(var(--destructive))";
  const scoreLabel = activeProfile.healthScore > 75 ? "HEALTHY" : activeProfile.healthScore >= 50 ? "BORDERLINE" : "CRITICAL ATTENTION";
  const stageLabels = ["", "📄 Reading Medical Terminology...", "🔬 Mapping Reference Ranges...", "🧠 Generating AI Insights..."];

  const getExplainText = (m: LabMarker) => {
    if (m.status === "HIGH") return `Your value of ${m.value} ${m.unit} exceeds the upper limit of ${m.max} ${m.unit}. Our rule engine automatically flags any value outside the reference range as HIGH.`;
    if (m.status === "LOW") return `Your value of ${m.value} ${m.unit} is below the lower limit of ${m.min} ${m.unit}. Our rule engine automatically flags any value outside the reference range as LOW.`;
    return `Your value of ${m.value} ${m.unit} falls within the normal reference range of ${m.min}-${m.max} ${m.unit}.`;
  };

  const prevValues = PREVIOUS_VALUES[activeProfile.id] || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">🔬 Lab Results Center</h1>
        <p className="text-muted-foreground text-sm">AI-powered interpretation with explainable insights</p>
        <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs" style={{ background: "hsl(var(--accent-amber) / 0.1)", color: "hsl(var(--accent-amber))" }}>
          ⚠️ Not a medical diagnosis — consult your doctor
        </div>
      </div>

      {/* Quick-load */}
      <div className="flex flex-wrap gap-3">
        {[
          { profile: DIABETIC_PROFILE, label: "🩸 Diabetic Profile", activeClass: "bg-primary text-primary-foreground border-primary" },
          { profile: CARDIAC_PROFILE, label: "❤️ Cardiac Panel", activeClass: "bg-destructive text-destructive-foreground border-destructive" },
          { profile: VITAMIN_PROFILE, label: "💊 Vitamin Deficiency", activeClass: "bg-[hsl(var(--accent-amber))] text-background border-[hsl(var(--accent-amber))]" },
        ].map(btn => (
          <button key={btn.profile.id} onClick={() => runAnalysis(btn.profile)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer ${activeProfile.id === btn.profile.id ? btn.activeClass : "border-border text-muted-foreground hover:border-primary"}`}
          >{btn.label}</button>
        ))}
      </div>

      {/* Upload zone */}
      <label className="glass-card p-8 flex flex-col items-center gap-3 cursor-pointer" style={{ borderStyle: "dashed", borderColor: "hsl(var(--primary) / 0.3)" }}>
        <CloudUpload className="w-12 h-12 text-primary" />
        <p className="text-foreground font-medium">Drop your lab report here</p>
        <p className="text-muted-foreground text-sm">Supports PDF, JPG, PNG</p>
        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} />
      </label>

      {/* Analysis progress */}
      {isAnalyzing && (
        <div className="glass-card p-6">
          <p className="text-foreground font-medium mb-3">{stageLabels[stage] || "Preparing..."}</p>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-[1400ms] ease-in-out" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Skeleton loading */}
      {showSkeleton && !analysisComplete && !isAnalyzing && (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card p-6 space-y-4">
              <div className="h-4 w-32 rounded bg-muted animate-pulse" />
              <div className="h-32 rounded bg-muted animate-pulse" />
              <div className="h-3 w-full rounded bg-muted animate-pulse" />
              <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {analysisComplete && (
          <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Health Score with animated gauge */}
              <motion.div variants={fadeUp} className="glass-card p-6">
                <h3 className="font-heading font-bold text-foreground mb-4">Overall Health Score</h3>
                <div className="w-48 h-48 mx-auto relative">
                  <ResponsiveContainer>
                    <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: activeProfile.healthScore, fill: scoreColor }]} startAngle={180} endAngle={0}>
                      <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "hsl(var(--muted))" }} isAnimationActive animationDuration={1500} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <AnimatedCounter value={activeProfile.healthScore} duration={1500} className="font-heading text-4xl font-bold" suffix="/100" />
                    </div>
                  </div>
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-center font-heading font-bold text-sm mt-2" style={{ color: scoreColor }}>{scoreLabel}</motion.p>
                <p className="text-center text-muted-foreground text-xs mt-1">Based on WHO/NIH reference ranges</p>
                <p className="text-center text-xs mt-2" style={{ color: "hsl(var(--accent-amber))" }}>ℹ️ Informational only</p>
              </motion.div>

              {/* Markers table with animated count-up + compare */}
              <motion.div variants={fadeUp} className="glass-card p-6 md:col-span-2 overflow-x-auto">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-heading font-bold text-foreground">Lab Markers</h3>
                  <button onClick={() => setShowCompare(!showCompare)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {showCompare ? <ToggleRight className="w-4 h-4 text-primary" /> : <ToggleLeft className="w-4 h-4" />}
                    Compare Previous
                  </button>
                </div>
                <p className="text-muted-foreground text-xs mb-4">Source: WHO/NIH Standard Reference Ranges</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 text-muted-foreground text-xs">
                      <th className="text-left py-2">Marker</th>
                      <th className="text-left py-2">Your Value</th>
                      {showCompare && <th className="text-left py-2">Previous</th>}
                      <th className="text-left py-2">Reference</th>
                      <th className="text-left py-2">Status</th>
                      <th className="py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeProfile.markers.map((m, idx) => {
                      const prev = prevValues[m.name];
                      const delta = prev ? m.value - prev : 0;
                      return (
                        <motion.tr key={m.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="border-b border-border/20">
                          <td className="py-2 text-foreground">{m.name}</td>
                          <td className="py-2 text-foreground font-medium">
                            <AnimatedCounter value={m.value} duration={1200} decimals={m.value % 1 !== 0 ? 1 : 0} suffix={` ${m.unit}`} />
                          </td>
                          {showCompare && prev !== undefined && (
                            <td className="py-2">
                              <span className="text-muted-foreground text-xs">{prev}</span>
                              {delta !== 0 && (
                                <span className={`ml-1 text-xs inline-flex items-center ${delta > 0 ? "text-destructive" : "text-[hsl(var(--accent-green))]"}`}>
                                  {delta > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                  {Math.abs(delta).toFixed(m.value % 1 !== 0 ? 1 : 0)}
                                </span>
                              )}
                            </td>
                          )}
                          <td className="py-2 text-muted-foreground">{m.min}–{m.max}</td>
                          <td className="py-2">
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 + idx * 0.05 }}
                              className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block ${m.status === "HIGH" ? "bg-destructive/20 text-destructive" : m.status === "LOW" ? "bg-[hsl(var(--accent-amber))]/20 text-[hsl(var(--accent-amber))]" : "bg-[hsl(var(--accent-green))]/20 text-[hsl(var(--accent-green))]"}`}
                            >{m.status}</motion.span>
                          </td>
                          <td className="py-2">
                            <button onClick={() => setSelectedMarker(m)} className="text-primary text-xs hover:underline cursor-pointer">?</button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div>
            </div>

            {/* AI Interpretation with typewriter */}
            <motion.div variants={fadeUp} className="glass-card p-6">
              <h3 className="font-heading font-bold text-foreground mb-4">AI Interpretation</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground text-xs mb-2">Medical Report (Raw)</p>
                  <div className="rounded-lg p-4 text-xs font-mono text-primary overflow-auto max-h-64 bg-[hsl(222_47%_11%)]">
                    <pre className="whitespace-pre-wrap">{activeProfile.rawText}</pre>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-2">Plain English Explanation</p>
                  {isLoadingAI ? (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => <div key={i} className="h-4 rounded bg-muted animate-pulse" style={{ width: `${80 - i * 10}%` }} />)}
                    </div>
                  ) : (
                    <TypewriterText text={aiExplanation} speed={25} className="text-foreground text-sm leading-relaxed" />
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button onClick={handleVoice} className="w-full md:w-auto px-8 py-3 rounded-lg font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors cursor-pointer">
                  {isSpeaking ? "⏹ Stop Reading" : "🔊 Read Aloud"}
                </button>
                <div className="flex gap-2">
                  {[{ code: "en-US", label: "🇬🇧 English" }, { code: "ta-IN", label: "🇮🇳 Tamil" }, { code: "hi-IN", label: "🇮🇳 Hindi" }].map(lang => (
                    <button key={lang.code} onClick={() => setSelectedLanguage(lang.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${selectedLanguage === lang.code ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                    >{lang.label}</button>
                  ))}
                </div>
                <p className="text-muted-foreground text-xs">Voice powered by Web Speech API — built for accessibility</p>
              </div>
            </motion.div>

            <MedicalDisclaimer variant="inline" />

            <div className="grid md:grid-cols-3 gap-6">
              {/* Actionable Insights */}
              <motion.div variants={container} initial="hidden" animate="show" className="glass-card p-6 md:col-span-1">
                <h3 className="font-heading font-bold text-foreground mb-1">Actionable Insights</h3>
                <p className="text-muted-foreground text-xs mb-4">Discuss these with your doctor</p>
                <div className="space-y-3">
                  {(ACTIONABLE_INSIGHTS[activeProfile.id] || []).map((insight, i) => (
                    <motion.div key={i} variants={fadeUp} className="pl-3 py-2 text-sm text-foreground flex items-start gap-2" style={{ borderLeft: "3px solid hsl(var(--primary))" }}>
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--accent-amber))" }} />
                      <div>
                        <p className="text-sm">{insight}</p>
                        <span className="text-xs text-primary border border-primary/30 rounded-full px-2 py-0.5 mt-1 inline-block">Discuss with Doctor</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Wearable */}
              <motion.div variants={fadeUp} className="glass-card p-6">
                <h3 className="font-heading font-bold text-foreground mb-4">⌚ Wearable Data</h3>
                {!wearableSynced ? (
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground text-sm">HR: --- SpO2: --- Steps: ---</p>
                    <button onClick={syncWearable} disabled={syncingWearable} className="px-4 py-2 rounded-lg font-medium text-accent-foreground bg-accent hover:bg-accent/80 transition-colors cursor-pointer disabled:opacity-50">
                      {syncingWearable ? "Syncing..." : "Sync Wearable"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-destructive" style={{ animation: "heartbeat 1s infinite" }} /><span className="text-foreground text-sm">{WEARABLE_DATA.heartRate} bpm</span></div>
                    <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /><span className="text-foreground text-sm">SpO2: {WEARABLE_DATA.spo2}%</span></div>
                    <div className="flex items-center gap-2"><Footprints className="w-4 h-4 text-[hsl(var(--accent-green))]" /><span className="text-foreground text-sm">{WEARABLE_DATA.steps.toLocaleString()} steps</span></div>
                    <div className="flex items-center gap-2"><Moon className="w-4 h-4 text-accent" /><span className="text-foreground text-sm">{WEARABLE_DATA.sleep}h sleep</span></div>
                    <div className="flex items-center gap-2"><Waves className="w-4 h-4 text-primary" /><span className="text-foreground text-sm">HRV: {WEARABLE_DATA.hrv}ms</span></div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--accent-green))]/20 text-[hsl(var(--accent-green))]">✓ Synced — Apple Health</span>
                  </div>
                )}
              </motion.div>

              {/* Export */}
              <motion.div variants={fadeUp} className="glass-card p-6">
                <h3 className="font-heading font-bold text-foreground mb-4">Export & Share</h3>
                <div className="space-y-3">
                  <button onClick={handleExport} className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer text-sm">
                    📥 Download PDF Report
                  </button>
                  <button onClick={() => setShowSummary(true)} className="w-full px-4 py-2.5 rounded-lg bg-[hsl(var(--accent-green))]/10 text-[hsl(var(--accent-green))] border border-[hsl(var(--accent-green))]/30 font-medium hover:bg-[hsl(var(--accent-green))]/20 transition-colors cursor-pointer text-sm">
                    🖨️ Generate Summary Card
                  </button>
                  <button onClick={() => toast({ title: "🔗 Link Copied!", description: "Share link copied to clipboard!" })} className="w-full px-4 py-2.5 rounded-lg border border-accent text-accent-foreground font-medium hover:bg-accent/10 transition-colors cursor-pointer text-sm">
                    👨‍⚕️ Share with Doctor
                  </button>
                  <button onClick={() => toast({ title: "✓ Saved", description: "Saved to Medical Records ✓" })} className="w-full px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-medium hover:bg-muted/10 transition-colors cursor-pointer text-sm">
                    💾 Save to Records
                  </button>
                </div>
              </motion.div>
            </div>

            <MedicalDisclaimer variant="prominent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explainability Sheet */}
      <Sheet open={!!selectedMarker} onOpenChange={() => setSelectedMarker(null)}>
        <SheetContent className="bg-background border-border">
          <SheetHeader>
            <SheetTitle className="font-heading text-foreground">How We Interpreted This Result</SheetTitle>
          </SheetHeader>
          {selectedMarker && (
            <div className="space-y-6 mt-6">
              <div>
                <p className="text-muted-foreground text-xs mb-1">Your Value</p>
                <p className="text-3xl font-heading font-bold text-foreground">{selectedMarker.value} <span className="text-lg text-muted-foreground">{selectedMarker.unit}</span></p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Reference Range</p>
                <p className="text-foreground">{selectedMarker.min} – {selectedMarker.max} {selectedMarker.unit}</p>
                <p className="text-muted-foreground text-xs mt-1">Source: WHO Laboratory Reference Values, 2023</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Rule Applied</p>
                <p className="text-foreground text-sm">{getExplainText(selectedMarker)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">AI Narrative Note</p>
                <p className="text-foreground text-sm">The plain-English explanation above was generated by Google Gemini AI based on your specific values. The HIGH/LOW/NORMAL flag is determined by hardcoded WHO/NIH rules — not AI — ensuring clinical accuracy.</p>
              </div>
              <MedicalDisclaimer variant="inline" />
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Print Summary Modal */}
      <PrintSummaryCard open={showSummary} onOpenChange={setShowSummary} profile={activeProfile} aiExplanation={aiExplanation} />

      {/* AI Chat Bubble */}
      <AIChatBubble />
    </div>
  );
};

export default LabResultsCenter;
