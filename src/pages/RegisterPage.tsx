import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
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
  const navigate = useNavigate();
  const { toast } = useToast();

  const strength = password.length < 6 ? "weak" : password.length < 10 ? "medium" : "strong";
  const strengthColor = strength === "weak" ? "hsl(var(--destructive))" : strength === "medium" ? "hsl(var(--accent-amber))" : "hsl(var(--accent-green))";

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
      const { user, token } = await authAPI.register(name, email, password, role);
      setSession(user, token);
      toast({ title: `Account created! Welcome, ${user.name} 🎉`, description: "Redirecting to your dashboard..." });
      setTimeout(() => navigate(role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"), 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      toast({ title: "Registration failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aurora-bg min-h-screen flex items-center justify-center px-4">
      <div className="fixed top-4 right-4 z-50"><ThemeToggle /></div>
      <div className="relative z-10 glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-primary text-2xl">⚕</span>
          <h2 className="font-heading text-2xl font-bold text-foreground mt-2">Create Your Account</h2>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary pr-10"
              />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-muted-foreground cursor-pointer">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: strength === "weak" ? "33%" : strength === "medium" ? "66%" : "100%", background: strengthColor }} />
                </div>
                <span className="text-xs capitalize" style={{ color: strengthColor }}>{strength}</span>
              </div>
            )}
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="flex gap-3">
            {["patient", "doctor"].map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer capitalize ${role === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</> : "Create Account"}
          </button>
          <p className="text-muted-foreground text-xs text-center">By registering you agree to our Terms of Service</p>
          <p className="text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In →</Link></p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0"><MedicalDisclaimer /></div>
    </div>
  );
};

export default RegisterPage;
