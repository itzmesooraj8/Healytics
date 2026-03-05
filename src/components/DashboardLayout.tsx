import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FlaskConical, FileText, Calendar, Video, Phone,
  Stethoscope, BarChart3, BookOpen, DollarSign, Shield, Settings,
  User, ChevronLeft, ChevronRight, Search, Bell, ChevronDown, Star, Menu, LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import MedicalDisclaimer from "./MedicalDisclaimer";
import ThemeToggle from "./ThemeToggle";
import NotificationDrawer from "./NotificationDrawer";
import { getUser, clearSession } from "@/lib/api";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/patient-dashboard" },
  { title: "Lab Results", icon: FlaskConical, path: "/lab-results", badge: "star" },
  { title: "Medical Records", icon: FileText, path: "/medical-records" },
  { title: "Appointments", icon: Calendar, path: "/appointments" },
  { title: "Teleconsultation", icon: Video, path: "/teleconsultation" },
  { title: "Video Call", icon: Phone, path: "/video-call" },
  { title: "Doctors", icon: Stethoscope, path: "/doctors" },
  { title: "Reports", icon: BarChart3, path: "/reports-analytics" },
  { title: "Resources", icon: BookOpen, path: "/resources" },
  { title: "Financial Hub", icon: DollarSign, path: "/financial-hub" },
  { title: "Admin", icon: Shield, path: "/admin" },
  { title: "Settings", icon: Settings, path: "/settings" },
  { title: "Profile", icon: User, path: "/profile" },
];

const pageTitles: Record<string, string> = {
  "/patient-dashboard": "Dashboard",
  "/lab-results": "🔬 Lab Results Center",
  "/medical-records": "Medical Records",
  "/appointments": "Appointments",
  "/teleconsultation": "Teleconsultation",
  "/video-call": "Video Call",
  "/doctors": "Doctors",
  "/reports-analytics": "Reports & Analytics",
  "/resources": "Resources",
  "/financial-hub": "Financial Hub",
  "/admin": "Admin Dashboard",
  "/settings": "Settings",
  "/profile": "Profile",
  "/doctor-dashboard": "Doctor Dashboard",
};

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const effectiveCollapsed = isMobile ? !mobileOpen : collapsed;
  const pageTitle = pageTitles[location.pathname] || "Healytics";
  const currentUser = getUser();
  const displayName = currentUser?.name || "Rajesh Kumar";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  const handleLogout = () => {
    clearSession();
    toast({ title: "Logged out", description: "See you next time! 👋" });
    navigate("/login");
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    navigate(item.path);
    if (isMobile) setMobileOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {isMobile && mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
      )}

      <motion.aside
        animate={{ width: effectiveCollapsed ? 64 : 240 }}
        transition={{ duration: 0.2 }}
        className={`${isMobile ? 'fixed z-50' : 'relative'} h-screen flex flex-col border-r border-border bg-sidebar`}
      >
        <div className="h-16 flex items-center px-4 gap-2 border-b border-border">
          <span className="text-primary text-xl">⚕</span>
          {!effectiveCollapsed && <span className="font-heading font-bold text-primary text-lg">Healytics</span>}
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <button key={item.path} onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${active ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!effectiveCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge === "star" && <Star className="w-3.5 h-3.5 text-primary fill-primary" />}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">{initials}</div>
            {!effectiveCollapsed && (
              <div className="flex flex-1 items-center justify-between min-w-0">
                <span className="text-sm text-sidebar-foreground truncate">{displayName}</span>
                <button onClick={handleLogout} title="Logout" className="text-muted-foreground hover:text-destructive transition-colors ml-1">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {!isMobile && (
          <button onClick={() => setCollapsed(!collapsed)} className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        )}
      </motion.aside>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {isMobile && (
              <button onClick={() => setMobileOpen(true)} className="text-muted-foreground hover:text-primary">
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="font-heading font-semibold text-lg text-foreground">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Search className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            <button onClick={() => setNotifOpen(true)} className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--accent-amber))" }} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">{initials}</div>
              <span className="text-sm text-foreground hidden md:block">{displayName}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
              <button onClick={handleLogout} title="Logout" className="text-muted-foreground hover:text-destructive transition-colors hidden md:block">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <MedicalDisclaimer />
      </div>

      <NotificationDrawer open={notifOpen} onOpenChange={setNotifOpen} />
    </div>
  );
};

export default DashboardLayout;
