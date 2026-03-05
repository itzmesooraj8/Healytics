import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import ThemeToggle from "@/components/ThemeToggle";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="aurora-bg min-h-screen flex items-center justify-center px-4">
      <div className="fixed top-4 right-4 z-50"><ThemeToggle /></div>
      <div className="relative z-10 glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-primary text-2xl">⚕</span>
          <h2 className="font-heading text-2xl font-bold text-foreground mt-2">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">Sign in to access your health dashboard</p>
        </div>
        <div className="space-y-4">
          <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          <div className="relative">
            <input type={showPass ? "text" : "password"} placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary pr-10" />
            <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-muted-foreground cursor-pointer">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
          </div>
          <div className="flex justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer"><input type="checkbox" className="rounded" /> Remember me</label>
            <span className="text-primary cursor-pointer hover:underline">Forgot password?</span>
          </div>
          <button onClick={() => navigate("/patient-dashboard")} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer">Sign In</button>
          <div className="text-center text-muted-foreground text-xs">or continue with</div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => toast({ title: "🚀 Coming Soon!", description: "OAuth coming in Phase 2" })} className="py-2.5 rounded-lg border border-border text-foreground text-sm hover:bg-muted transition-colors cursor-pointer">Google</button>
            <button onClick={() => toast({ title: "🚀 Coming Soon!", description: "OAuth coming in Phase 2" })} className="py-2.5 rounded-lg border border-border text-foreground text-sm hover:bg-muted transition-colors cursor-pointer">Apple</button>
          </div>
          <p className="text-center text-sm text-muted-foreground">Don't have an account? <Link to="/register" className="text-primary hover:underline">Register →</Link></p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0"><MedicalDisclaimer /></div>
    </div>
  );
};

export default LoginPage;
