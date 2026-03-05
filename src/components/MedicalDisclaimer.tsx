const MedicalDisclaimer = ({ variant = "footer" }: { variant?: "footer" | "prominent" | "inline" }) => {
  if (variant === "prominent") {
    return (
      <div className="glass-card p-6 border-[hsl(var(--accent-amber))/0.3] bg-[hsl(var(--accent-amber))/0.05]">
        <p className="text-[hsl(var(--accent-amber))] text-sm font-medium">
          ⚠️ Important Medical Disclaimer: The interpretations provided by Healytics are for informational and educational purposes only. They do not constitute medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified healthcare provider with any questions regarding your medical condition. Never disregard professional medical advice based on information provided by this application.
        </p>
      </div>
    );
  }
  if (variant === "inline") {
    return (
      <p className="text-[hsl(var(--accent-amber))] text-xs">
        ⚠️ This is for informational purposes only. Not a medical diagnosis.
      </p>
    );
  }
  return (
    <footer className="border-t border-border/50 py-4 px-6 text-center">
      <p className="text-[hsl(var(--accent-amber))] text-xs">
        ⚠️ Healytics is not a medical diagnosis tool. Always consult a qualified healthcare professional.
      </p>
      <p className="text-muted-foreground text-xs mt-1">
        © 2026 Healytics | Aligned with UN SDG 3: Good Health and Well-being
      </p>
    </footer>
  );
};

export default MedicalDisclaimer;
