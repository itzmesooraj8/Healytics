import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import ThemeToggle from "@/components/ThemeToggle";
import { authAPI, setSession } from "@/lib/api";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => { document.title = "Sign In — Healytics"; }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({ title: "Missing fields", description: "Please enter your email and password.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { user, token } = await authAPI.login(email, password);
      setSession(user, token);
      toast({ title: `Welcome back, ${user.name}! 👋`, description: "Redirecting to your dashboard..." });
      setTimeout(() => navigate(user.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"), 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      toast({ title: "Login failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("demo@healytics.ai");
    setPassword("demo1234");
    setLoading(true);
    try {
      const { user, token } = await authAPI.login("demo@healytics.ai", "demo1234");
      setSession(user, token);
      toast({ title: "Demo login successful 🎉", description: "Welcome to Healytics!" });
      setTimeout(() => navigate("/patient-dashboard"), 800);
    } catch {
      // Backend not running — fall back to direct navigation
      toast({ title: "Demo mode", description: "Backend not running — entering demo dashboard." });
      navigate("/patient-dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aurora-bg min-h-screen flex flex-col pt-14">
      {/* Top navigation bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 md:px-8 bg-background/70 backdrop-blur-xl border-b border-border/40">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-primary text-lg">⚕</span>
          <span className="font-heading font-semibold text-foreground text-sm">Healytics</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">Create account →</Link>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="relative z-10 glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-primary text-2xl">⚕</span>
          <h2 className="font-heading text-2xl font-bold text-foreground mt-2">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">Sign in to access your health dashboard</p>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary pr-10"
            />
            <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-muted-foreground cursor-pointer">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <input type="checkbox" className="rounded" /> Remember me
            </label>
            <span className="text-primary cursor-pointer hover:underline">Forgot password?</span>
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing In...</> : "Sign In"}
          </button>
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 rounded-lg border border-primary/40 text-primary text-sm hover:bg-primary/10 transition-colors cursor-pointer"
          >
            🎯 Quick Demo Login
          </button>
          <div className="text-center text-muted-foreground text-xs">or continue with</div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => toast({ title: "🚀 Coming Soon!", description: "OAuth coming in Phase 2" })} className="py-2.5 rounded-lg border border-border text-foreground text-sm hover:bg-muted transition-colors cursor-pointer">Google</button>
            <button onClick={() => toast({ title: "🚀 Coming Soon!", description: "OAuth coming in Phase 2" })} className="py-2.5 rounded-lg border border-border text-foreground text-sm hover:bg-muted transition-colors cursor-pointer">Apple</button>
          </div>
          <p className="text-center text-sm text-muted-foreground">Don't have an account? <Link to="/register" className="text-primary hover:underline">Register →</Link></p>
        </div>
      </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0"><MedicalDisclaimer /></div>
    </div>
  );
};

export default LoginPage;
