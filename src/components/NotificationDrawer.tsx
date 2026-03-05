import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FlaskConical, Calendar, AlertTriangle, CheckCircle, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const notifications = [
  { icon: FlaskConical, color: "text-primary", title: "Lab results ready", desc: "Your March 3 blood panel results are ready to view", time: "2 hours ago", link: "/lab-results" },
  { icon: Calendar, color: "text-accent", title: "Appointment reminder", desc: "Dr. Priya Sharma tomorrow at 10:30 AM", time: "5 hours ago", link: "/appointments" },
  { icon: AlertTriangle, color: "text-[hsl(var(--accent-amber))]", title: "Vitamin D attention needed", desc: "Your Vitamin D levels require immediate attention — view insights", time: "1 day ago", link: "/lab-results" },
  { icon: CheckCircle, color: "text-[hsl(var(--accent-green))]", title: "Medication refill processed", desc: "Metformin 500mg refill has been approved by your pharmacy", time: "2 days ago", link: "/patient-dashboard" },
  { icon: Bell, color: "text-muted-foreground", title: "Welcome to Healytics", desc: "Start by uploading your first lab report for AI-powered insights", time: "1 week ago", link: "/lab-results" },
];

interface Props { open: boolean; onOpenChange: (open: boolean) => void; }

const NotificationDrawer = ({ open, onOpenChange }: Props) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent className="bg-background border-border w-80 p-0">
      <SheetHeader className="p-4 border-b border-border">
        <SheetTitle className="font-heading text-foreground flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" /> Notifications
        </SheetTitle>
      </SheetHeader>
      <div className="overflow-y-auto p-2 space-y-1">
        {notifications.map((n, i) => (
          <Link
            key={i}
            to={n.link}
            onClick={() => onOpenChange(false)}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
          >
            <n.icon className={`w-5 h-5 shrink-0 mt-0.5 ${n.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.desc}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </SheetContent>
  </Sheet>
);

export default NotificationDrawer;
