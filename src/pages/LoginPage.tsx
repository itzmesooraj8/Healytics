import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, HeartPulse, ShieldCheck, Zap, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";
import { authAPI, setSession } from "@/lib/api";

const DEMO_PATIENT = { email: "demo@healytics.ai", password: "demo1234" };
const DEMO_DOCTOR  = { email: "doctor@healytics.ai", password: "demo1234" };

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<"patient" | "doctor" | null>(null);
  const { toast } = useToast();

  useEffect(() => { document.title = "Sign In — Healytics"; }, []);

  const doLogin = async (e?: string, p?: string) => {
    const em = e ?? email;
    const pw = p ?? password;
    if (!em || !pw) {
      toast({ title: "Missing fields", description: "Please enter your email and password.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await authAPI.login(em, pw);
      setSession(result.user, result.token);
      toast({ title: result.isNewUser ? "✅ Account created!" : "Welcome back!", description: `Hello, ${result.user.name} 👋` });
      window.location.href = result.user.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      toast({ title: "Login failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (type: "patient" | "doctor") => {
    setDemoLoading(type);
    const creds = type === "patient" ? DEMO_PATIENT : DEMO_DOCTOR;
    setEmail(creds.email);
    setPassword(creds.password);
    try {
      const result = await authAPI.login(creds.email, creds.password);
      setSession(result.user, result.token);
      toast({ title: type === "doctor" ? "🩺 Doctor Demo" : "🎯 Patient Demo", description: `Logged in as ${result.user.name}` });
      window.location.href = type === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";
    } catch {
      const fallback = type === "patient"
        ? { id: "demo-patient-1", name: "Rajesh Kumar",        email: DEMO_PATIENT.email, role: "patient", created_at: new Date().toISOString() }
        : { id: "demo-doctor-1",  name: "Dr. Sarah Mitchell", email: DEMO_DOCTOR.email,  role: "doctor",  created_at: new Date().toISOString() };
      setSession(fallback, `mock-demo-token-${type}`);
      window.location.href = type === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";
    } finally {
      setDemoLoading(null);
    }
  };

  const busy = loading || demoLoading !== null;

  return (
    <div className="min-h-screen flex bg-background">

      {/* ── LEFT PANEL — branding ─────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-gradient-to-br from-[hsl(192,100%,8%)] via-[hsl(220,60%,6%)] to-[hsl(263,60%,7%)] flex-col justify-between p-12">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[hsl(192,100%,42%)] opacity-[0.07] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-[hsl(263,84%,55%)] opacity-[0.08] blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[hsl(192,100%,42%)] flex items-center justify-center shadow-lg">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">Healytics</span>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-5">
            Your health,<br />
            <span className="text-[hsl(192,100%,55%)] drop-shadow-[0_0_24px_hsl(192,100%,42%)]">
              intelligently
            </span><br />
            managed
          </h1>
          <p className="text-white/55 text-base leading-relaxed mb-10">
            AI-powered insights, lab results analysis, and doctor consultations — all in one secure platform.
          </p>
          <div className="space-y-3">
            {[
              { Icon: ShieldCheck, label: "End-to-end encrypted health data" },
              { Icon: Zap,         label: "Instant AI lab report analysis" },
              { Icon: Users,       label: "Connect with verified specialists" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.07] rounded-2xl px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-[hsl(192,100%,42%)]/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[hsl(192,100%,55%)]" />
                </div>
                <span className="text-white/75 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/20 text-xs">© 2026 Healytics · SDG 3: Good Health &amp; Well-being</p>
      </div>

      {/* ── RIGHT PANEL — form ───────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">Healytics</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <Link to="/register" className="px-4 py-1.5 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors">
              Register free
            </Link>
          </div>
        </div>

        {/* form */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[400px] space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Welcome back</h2>
              <p className="text-muted-foreground mt-1 text-sm">Sign in to your Healytics account</p>
            </div>

            {/* Demo quick-login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => demoLogin("patient")}
                disabled={busy}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-primary/25 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-medium transition-all cursor-pointer disabled:opacity-50"
              >
                {demoLoading === "patient" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span className="text-base">🎯</span>}
                Patient Demo
              </button>
              <button
                onClick={() => demoLogin("doctor")}
                disabled={busy}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-violet-500/25 bg-violet-500/5 hover:bg-violet-500/10 text-violet-500 text-sm font-medium transition-all cursor-pointer disabled:opacity-50"
              >
                {demoLoading === "doctor" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span className="text-base">🩺</span>}
                Doctor Demo
              </button>
            </div>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">or sign in with email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && doLogin()}
                  disabled={busy}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      if (!email) { toast({ title: "Enter your email first", variant: "destructive" }); return; }
                      toast({ title: "📧 Reset link sent", description: `If ${email} is registered, check your inbox.` });
                    }}
                    className="text-xs text-primary hover:underline cursor-pointer"
                  >Forgot password?</button>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && doLogin()}
                    disabled={busy}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all pr-11 disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={() => doLogin()}
                disabled={busy}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-primary/20"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Signing in…</> : "Sign In →"}
              </button>

              {/* Hint card */}
              <div className="rounded-xl bg-muted/60 border border-border px-4 py-3 space-y-2">
                <p className="text-xs font-semibold text-foreground">Demo credentials — no backend needed</p>
                <div className="grid grid-cols-2 gap-x-4 text-xs text-muted-foreground">
                  <div>
                    <span className="text-foreground/70 font-medium">Patient</span>
                    <p className="font-mono text-primary mt-0.5">demo@healytics.ai</p>
                    <p className="font-mono text-primary">demo1234</p>
                  </div>
                  <div>
                    <span className="text-foreground/70 font-medium">Doctor</span>
                    <p className="font-mono text-violet-500 mt-0.5">doctor@healytics.ai</p>
                    <p className="font-mono text-violet-500">demo1234</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground border-t border-border/60 pt-2">
                  ✨ Or type <em>any</em> new email + password — you'll be auto-registered instantly.
                </p>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                No account yet?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">Create one free →</Link>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-muted-foreground pb-4 px-4">
          ⚕ Healytics is not a medical diagnosis tool. Always consult a qualified healthcare professional.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
