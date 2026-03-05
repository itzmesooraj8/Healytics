import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Calendar, FlaskConical, Heart, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HEALTH_TREND_DATA } from "@/data/mockData";
import AnimatedCounter from "@/components/AnimatedCounter";
import { getUser, reportsAPI, type ReportSummary } from "@/lib/api";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const reports = [
  { name: "Blood Panel", date: "March 3, 2026", badge: "3 Abnormal", color: "destructive" },
  { name: "Thyroid Panel", date: "Feb 15, 2026", badge: "Normal", color: "accent-green" },
  { name: "Lipid Profile", date: "Jan 28, 2026", badge: "1 Abnormal", color: "accent-amber" },
  { name: "HbA1c Test", date: "Jan 5, 2026", badge: "Attention", color: "accent-amber" },
  { name: "CBC", date: "Dec 12, 2025", badge: "Normal", color: "accent-green" },
];

const medications = [
  { name: "Metformin 500mg", freq: "Twice daily" },
  { name: "Atorvastatin 20mg", freq: "Once nightly" },
  { name: "Vitamin D3 60,000 IU", freq: "Weekly" },
];

const timelineEvents = [
  { date: "March 3", color: "hsl(var(--destructive))", title: "HbA1c elevated above 8.0%", desc: "Blood sugar remains poorly controlled — medication adjustment recommended" },
  { date: "Feb 28", color: "hsl(var(--accent-amber))", title: "Vitamin D critically low", desc: "Level at 14 ng/mL, supplementation started" },
  { date: "Feb 15", color: "hsl(var(--accent-green))", title: "Thyroid panel returned normal", desc: "TSH within healthy range at 3.2 mIU/L" },
  { date: "Jan 28", color: "hsl(var(--accent-amber))", title: "LDL flagged as High Risk", desc: "Cholesterol at 142 mg/dL, dietary changes recommended" },
  { date: "Dec 12", color: "hsl(var(--accent-green))", title: "CBC within normal limits", desc: "All blood cell counts in healthy range" },
];

const PatientDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [apiReports, setApiReports] = useState<ReportSummary[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);

  const currentUser = getUser();
  const firstName = currentUser?.name?.split(" ")[0] || "Rajesh";

  useEffect(() => {
    const init = async () => {
      // Load UI
      await new Promise(r => setTimeout(r, 1200));
      setLoading(false);

      // Try to fetch reports from API
      if (currentUser?.id) {
        setReportsLoading(true);
        try {
          const { reports } = await reportsAPI.getByUser(currentUser.id);
          if (reports.length) setApiReports(reports);
        } catch {
          // Backend not running — use static mock data
        } finally {
          setReportsLoading(false);
        }
      }
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-8 w-64 bg-muted animate-pulse rounded" /><div className="h-4 w-32 bg-muted animate-pulse rounded mt-2" /></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="glass-card p-5 space-y-3"><div className="h-5 w-5 bg-muted animate-pulse rounded" /><div className="h-3 w-20 bg-muted animate-pulse rounded" /><div className="h-4 w-28 bg-muted animate-pulse rounded" /><div className="h-3 w-24 bg-muted animate-pulse rounded" /></div>)}
        </div>
        <div className="glass-card p-6"><div className="h-5 w-48 bg-muted animate-pulse rounded mb-4" /><div className="h-72 bg-muted animate-pulse rounded" /></div>
      </div>
    );
  }

  return (
    <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={fadeUp}>
        <h1 className="font-heading text-2xl font-bold text-foreground">Good morning, {firstName} 👋</h1>
        <p className="text-muted-foreground text-sm">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div variants={fadeUp} className="glass-card p-5">
          <Calendar className="w-5 h-5 text-primary mb-2" />
          <p className="text-xs text-muted-foreground">Next Appointment</p>
          <p className="text-foreground font-medium text-sm mt-1">Dr. Priya Sharma</p>
          <p className="text-muted-foreground text-xs">March 15, 2026 · 10:30 AM</p>
          <p className="text-primary text-xs">Endocrinologist</p>
        </motion.div>
        <motion.div variants={fadeUp} className="glass-card p-5">
          <FlaskConical className="w-5 h-5 mb-2 text-[hsl(var(--accent-green))]" />
          <p className="text-xs text-muted-foreground">Latest Lab Result</p>
          <p className="text-foreground font-medium text-sm mt-1">Blood Panel</p>
          <p className="text-muted-foreground text-xs">March 3, 2026</p>
          <p className="text-xs text-[hsl(var(--accent-amber))]">3 markers need attention</p>
        </motion.div>
        <motion.div variants={fadeUp} className="glass-card p-5">
          <Heart className="w-5 h-5 text-destructive mb-2" />
          <p className="text-xs text-muted-foreground">Health Score</p>
          <div className="w-20 h-20 mx-auto mt-1 relative">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: 42, fill: "hsl(var(--destructive))" }]} startAngle={180} endAngle={0}>
                <RadialBar dataKey="value" background={{ fill: "hsl(var(--muted))" }} isAnimationActive animationDuration={1500} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatedCounter value={42} duration={1500} className="font-heading text-lg font-bold text-destructive" />
            </div>
          </div>
          <p className="text-center text-xs mt-1 text-[hsl(var(--accent-amber))]">ℹ️ Informational only</p>
        </motion.div>
        <motion.div variants={fadeUp} className="glass-card p-5">
          <Pill className="w-5 h-5 text-accent mb-2" />
          <p className="text-xs text-muted-foreground">Active Prescriptions</p>
          <p className="text-foreground font-medium text-sm mt-1">3 medications</p>
          <p className="text-primary text-xs cursor-pointer hover:underline">View all →</p>
        </motion.div>
      </div>

      {/* Health Trends */}
      <motion.div variants={fadeUp} className="glass-card p-6">
        <h3 className="font-heading font-bold text-foreground mb-4">Health Trends — Last 6 Months</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={HEALTH_TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Legend />
              <Line type="monotone" dataKey="glucose" name="Glucose" stroke="hsl(var(--primary))" strokeWidth={2} dot />
              <Line type="monotone" dataKey="cholesterol" name="Cholesterol" stroke="hsl(var(--accent-amber))" strokeWidth={2} dot />
              <Line type="monotone" dataKey="hba1c" name="HbA1c (×10)" stroke="hsl(var(--accent))" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Risk Timeline */}
      <motion.div variants={fadeUp} className="glass-card p-6">
        <h3 className="font-heading font-bold text-foreground mb-4">Health Event Timeline</h3>
        <div className="relative pl-6">
          <div className="absolute left-2.5 top-0 bottom-0 w-px bg-border" />
          {timelineEvents.map((evt, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative mb-6 last:mb-0">
              <div className="absolute -left-3.5 top-1 w-3 h-3 rounded-full border-2 border-background" style={{ backgroundColor: evt.color }} />
              <div className="ml-4">
                <p className="text-xs text-muted-foreground">{evt.date}, 2026</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{evt.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{evt.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div variants={fadeUp} className="glass-card p-6">
          <h3 className="font-heading font-bold text-foreground mb-3">Recent Lab Reports</h3>
          <div className="space-y-3">
            {reportsLoading ? (
              [1,2,3].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1"><div className="h-3 w-32 bg-muted animate-pulse rounded" /><div className="h-2 w-20 bg-muted animate-pulse rounded" /></div>
                  <div className="h-5 w-16 bg-muted animate-pulse rounded-full" />
                </div>
              ))
            ) : apiReports.length > 0 ? (
              apiReports.slice(0, 5).map(r => (
                <div key={r.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground text-sm">{r.profile_name}</p>
                    <p className="text-muted-foreground text-xs">{r.report_date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.health_score >= 75 ? "bg-[hsl(var(--accent-green))]/20 text-[hsl(var(--accent-green))]" : r.health_score >= 50 ? "bg-[hsl(var(--accent-amber))]/20 text-[hsl(var(--accent-amber))]" : "bg-destructive/20 text-destructive"}`}>
                      Score: {r.health_score}
                    </span>
                    <Link to="/lab-results" className="text-primary text-xs hover:underline">View</Link>
                  </div>
                </div>
              ))
            ) : (
              reports.map(r => (
                <div key={r.name} className="flex items-center justify-between">
                  <div><p className="text-foreground text-sm">{r.name}</p><p className="text-muted-foreground text-xs">{r.date}</p></div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.color === "destructive" ? "bg-destructive/20 text-destructive" : r.color === "accent-green" ? "bg-[hsl(var(--accent-green))]/20 text-[hsl(var(--accent-green))]" : "bg-[hsl(var(--accent-amber))]/20 text-[hsl(var(--accent-amber))]"}`}>{r.badge}</span>
                    <Link to="/lab-results" className="text-primary text-xs hover:underline">View</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-card p-6">
          <h3 className="font-heading font-bold text-foreground mb-3">Medications</h3>
          <div className="space-y-3">
            {medications.map(m => (
              <div key={m.name} className="flex items-center justify-between">
                <div><p className="text-foreground text-sm">{m.name}</p><p className="text-muted-foreground text-xs">{m.freq}</p></div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--accent-green))]/20 text-[hsl(var(--accent-green))]">Active</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="glass-card p-6">
          <h3 className="font-heading font-bold text-foreground mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => navigate("/lab-results")} className="glass-card p-3 text-center text-sm text-foreground hover:text-primary cursor-pointer">🔬 Analyze Report</button>
            <button onClick={() => toast({ title: "🚀 Coming Soon!", description: "Module launching Phase 2 — Q3 2026 🚀" })} className="glass-card p-3 text-center text-sm text-foreground hover:text-primary cursor-pointer">📅 Book Appointment</button>
            <button onClick={() => navigate("/doctors")} className="glass-card p-3 text-center text-sm text-foreground hover:text-primary cursor-pointer">👨‍⚕️ Find Doctor</button>
            <button onClick={() => toast({ title: "🚀 Coming Soon!", description: "Module launching Phase 2 — Q3 2026 🚀" })} className="glass-card p-3 text-center text-sm text-foreground hover:text-primary cursor-pointer">📄 My Records</button>
          </div>
        </motion.div>
      </div>

      {/* FAB */}
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="fixed bottom-6 right-6 z-50">
        <Link to="/lab-results" className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
          <FlaskConical className="w-6 h-6" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default PatientDashboard;
