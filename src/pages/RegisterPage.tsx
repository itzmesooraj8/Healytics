import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, HeartPulse, CheckCircle2, User, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";
import { authAPI, setSession } from "@/lib/api";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => { document.title = "Create Account — Healytics"; }, []);

  const pw = password;
  const strength = pw.length === 0 ? null : pw.length < 6 ? "weak" : pw.length < 10 ? "medium" : "strong";
  const strengthMeta = {
    weak:   { color: "hsl(var(--destructive))", width: "33%",  label: "Weak" },
    medium: { color: "hsl(var(--accent-amber))", width: "66%", label: "Medium" },
    strong: { color: "hsl(var(--accent-green))", width: "100%",label: "Strong" },
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Password mismatch", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Weak password", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await authAPI.register(name, email, password, role);
      setSession(result.user, result.token);
      toast({ title: "🎉 Account created!", description: `Welcome to Healytics, ${result.user.name}!` });
      window.location.href = role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      toast({ title: "Registration failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-60";

  return (
    <div className="min-h-screen flex bg-background">

      {/* ── LEFT PANEL — info ──────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-gradient-to-br from-[hsl(263,60%,9%)] via-[hsl(220,60%,6%)] to-[hsl(192,100%,6%)] flex-col justify-between p-12">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.07] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[hsl(192,100%,42%)] opacity-[0.07] blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">Healytics</span>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-5">
            Join thousands<br />
            <span className="text-violet-400 drop-shadow-[0_0_24px_rgba(139,92,246,0.6)]">
              taking control
            </span><br />
            of their health
          </h1>
          <p className="text-white/55 text-base leading-relaxed mb-10">
            Create your free account in seconds — no credit card needed, no backend required.
          </p>
          <div className="space-y-3">
            {[
              "Free forever — no credit card",
              "All data stored locally in your browser",
              "AI lab analysis available immediately",
              "Switch between patient & doctor modes",
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="text-white/70 text-sm">{item}</span>
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
            <Link to="/login" className="px-4 py-1.5 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:text-foreground hover:border-foreground/30 transition-colors">
              Sign in
            </Link>
          </div>
        </div>

        {/* form */}
        <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
          <div className="w-full max-w-[400px] space-y-5">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Create your account</h2>
              <p className="text-muted-foreground mt-1 text-sm">Free, instant, no backend needed</p>
            </div>

            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">I am a…</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("patient")}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                    role === "patient"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <User className="w-4 h-4" /> Patient
                </button>
                <button
                  type="button"
                  onClick={() => setRole("doctor")}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                    role === "doctor"
                      ? "border-violet-500 bg-violet-500/10 text-violet-500"
                      : "border-border bg-muted/50 text-muted-foreground hover:border-violet-500/40 hover:text-foreground"
                  }`}
                >
                  <Stethoscope className="w-4 h-4" /> Doctor
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full name</label>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleRegister()}
                  disabled={loading}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleRegister()}
                  disabled={loading}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleRegister()}
                    disabled={loading}
                    className={`${inputCls} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {strength && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: strengthMeta[strength].width, background: strengthMeta[strength].color }}
                      />
                    </div>
                    <span className="text-xs" style={{ color: strengthMeta[strength].color }}>{strengthMeta[strength].label}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Confirm password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleRegister()}
                  disabled={loading}
                  className={`${inputCls} ${confirmPassword && confirmPassword !== password ? "border-destructive ring-1 ring-destructive/40" : ""}`}
                />
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-xs text-destructive mt-1">Passwords don't match</p>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-primary/20"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Creating account…</> : "Create Account →"}
              </button>

              <p className="text-[11px] text-muted-foreground text-center">
                By registering you agree to our Terms of Service.
                Your data is stored locally in your browser.
              </p>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">Sign in →</Link>
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

export default RegisterPage;
