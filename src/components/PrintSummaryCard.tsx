import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { LabProfile } from "@/data/mockData";
import { AI_EXPLANATIONS, ACTIONABLE_INSIGHTS } from "@/data/mockData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: LabProfile;
  aiExplanation: string;
}

const PrintSummaryCard = ({ open, onOpenChange, profile, aiExplanation }: Props) => {
  const handlePrint = () => window.print();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-border p-0">
        {/* Print-only styles */}
        <style>{`
          @media print {
            body * { visibility: hidden !important; }
            .print-summary, .print-summary * { visibility: visible !important; }
            .print-summary { position: absolute; left: 0; top: 0; width: 100%; padding: 24px; background: white !important; color: black !important; }
            .print-summary .no-print { display: none !important; }
            .print-summary .marker-high { color: #dc2626 !important; background: #fef2f2 !important; }
            .print-summary .marker-low { color: #d97706 !important; background: #fffbeb !important; }
            .print-summary .marker-normal { color: #16a34a !important; background: #f0fdf4 !important; }
          }
        `}</style>

        <div className="print-summary p-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">⚕ Healytics</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Lab Report Interpretation</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{profile.date}</p>
              <p className="text-xs text-muted-foreground">Report ID: SC-{Date.now().toString(36).toUpperCase()}</p>
            </div>
          </div>

          {/* Patient */}
          <div className="mb-6">
            <h2 className="font-heading font-bold text-lg text-foreground mb-1">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">Health Score: <span className="font-bold" style={{ color: profile.healthScore > 75 ? "#16a34a" : profile.healthScore >= 50 ? "#d97706" : "#dc2626" }}>{profile.healthScore}/100</span></p>
          </div>

          {/* Markers Grid */}
          <div className="mb-6">
            <h3 className="font-heading font-bold text-sm text-foreground mb-3">Lab Results Summary</h3>
            <div className="grid grid-cols-2 gap-2">
              {profile.markers.map(m => (
                <div key={m.name} className="flex items-center justify-between p-2 rounded-lg border border-border">
                  <div>
                    <p className="text-xs font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.min}–{m.max} {m.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{m.value} {m.unit}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${m.status === "HIGH" ? "marker-high bg-destructive/10 text-destructive" : m.status === "LOW" ? "marker-low bg-[hsl(var(--accent-amber))]/10 text-[hsl(var(--accent-amber))]" : "marker-normal bg-[hsl(var(--accent-green))]/10 text-[hsl(var(--accent-green))]"}`}>
                      {m.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Explanation */}
          <div className="mb-6">
            <h3 className="font-heading font-bold text-sm text-foreground mb-2">AI Interpretation</h3>
            <p className="text-sm text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
              {aiExplanation || AI_EXPLANATIONS[profile.id]}
            </p>
          </div>

          {/* Top 3 Insights */}
          <div className="mb-6">
            <h3 className="font-heading font-bold text-sm text-foreground mb-2">Key Recommendations</h3>
            <div className="space-y-2">
              {(ACTIONABLE_INSIGHTS[profile.id] || []).slice(0, 3).map((insight, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-foreground" style={{ borderLeft: "3px solid hsl(var(--primary))", paddingLeft: 12 }}>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-border pt-4 mt-8">
            <p className="text-xs text-center font-medium" style={{ color: "hsl(var(--accent-amber))" }}>
              ⚠️ NOT A MEDICAL DIAGNOSIS — This report is for informational purposes only. Always consult a qualified healthcare professional before making medical decisions.
            </p>
            <p className="text-xs text-center text-muted-foreground mt-1">
              Generated by Healytics | © 2026 | Aligned with UN SDG 3: Good Health and Well-being
            </p>
          </div>

          {/* Print Button */}
          <div className="no-print mt-6 flex gap-3 justify-center">
            <button onClick={handlePrint} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer text-sm">
              🖨️ Print Summary
            </button>
            <button onClick={() => onOpenChange(false)} className="px-6 py-2.5 rounded-lg border border-border text-muted-foreground font-medium hover:bg-muted/10 transition-colors cursor-pointer text-sm">
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrintSummaryCard;
