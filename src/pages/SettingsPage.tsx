import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";

const SETTINGS_KEY = "healytics_settings";

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved
        ? JSON.parse(saved)
        : { notifications: true, voice: true, datasharing: false, email: true };
    } catch {
      return { notifications: true, voice: true, datasharing: false, email: true };
    }
  });

  const toggles = [
    { id: "notifications", label: "Notifications", desc: "Receive alerts about your health reports" },
    { id: "darkmode", label: "Dark Mode", desc: theme === "dark" ? "OLED-optimized dark display" : "Light theme active", isDark: true },
    { id: "voice", label: "Voice Readout", desc: "Enable text-to-speech for AI interpretations" },
    { id: "datasharing", label: "Data Sharing", desc: "Share anonymized data for medical research" },
    { id: "email", label: "Email Alerts", desc: "Get email notifications for lab results" },
  ];

  const toastMessages: Record<string, { title: string; description: string }> = {
    notifications: { title: "🔔 Notifications", description: settings.notifications ? "Notifications disabled." : "Notifications enabled — you'll receive health alerts." },
    darkmode:      { title: "🌙 Theme", description: "Theme switched successfully." },
    voice:         { title: "🔊 Voice Readout", description: settings.voice ? "Voice readout disabled." : "Voice readout enabled — AI will speak your results." },
    datasharing:   { title: "🔒 Data Sharing", description: settings.datasharing ? "Data sharing disabled." : "Anonymised data sharing enabled — thank you for contributing to research." },
    email:         { title: "✉️ Email Alerts", description: settings.email ? "Email alerts disabled." : "Email alerts enabled — you'll hear about new lab results." },
  };

  const handleToggle = (id: string) => {
    if (id === "darkmode") {
      toggleTheme();
    } else {
      setSettings((prev: Record<string, boolean>) => {
        const next = { ...prev, [id]: !prev[id] };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
        return next;
      });
    }
    const msg = toastMessages[id];
    toast({ title: msg?.title ?? "Setting saved", description: msg?.description ?? "Preference updated." });
  };

  // Persist on first load to initialise localStorage if empty
  useEffect(() => {
    if (!localStorage.getItem(SETTINGS_KEY)) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOn = (id: string) => id === "darkmode" ? theme === "dark" : settings[id as keyof typeof settings];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
      <div className="glass-card p-6 space-y-6">
        {toggles.map(t => (
          <div key={t.id} className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium text-sm">{t.label}</p>
              <p className="text-muted-foreground text-xs">{t.desc}</p>
            </div>
            <button
              onClick={() => handleToggle(t.id)}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${isOn(t.id) ? "bg-primary" : "bg-muted"}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${isOn(t.id) ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="font-heading font-bold text-foreground">Account</h3>
        <div className="space-y-3">
          <button onClick={() => toast({ title: "🔑 Change Password", description: "A password reset link has been sent to your registered email." })} className="w-full text-left px-4 py-3 rounded-lg bg-muted/50 text-foreground text-sm hover:bg-muted transition-colors cursor-pointer">Change Password</button>
          <button onClick={() => toast({ title: "📦 Export Started", description: "Your health data export will be ready in a few minutes. Check your email." })} className="w-full text-left px-4 py-3 rounded-lg bg-muted/50 text-foreground text-sm hover:bg-muted transition-colors cursor-pointer">Export My Data</button>
          <button onClick={() => toast({ title: "⚠️ Delete Account", description: "Account deletion requires confirmation via email. A link has been sent.", variant: "destructive" })} className="w-full text-left px-4 py-3 rounded-lg bg-destructive/10 text-destructive text-sm hover:bg-destructive/20 transition-colors cursor-pointer">Delete Account</button>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
