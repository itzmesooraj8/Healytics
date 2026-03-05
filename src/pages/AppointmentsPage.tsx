import { motion } from "framer-motion";
import { Calendar, Clock, Video, MapPin, Plus, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const appointments = [
  { id: 1, doctor: "Dr. Priya Sharma", specialty: "Endocrinologist", date: "March 15, 2026", time: "10:30 AM", type: "In-Person", status: "upcoming", location: "Apollo Hospital, Chennai" },
  { id: 2, doctor: "Dr. Arun Krishnamurthy", specialty: "Cardiologist", date: "March 22, 2026", time: "2:00 PM", type: "Video Call", status: "upcoming", location: "Online" },
  { id: 3, doctor: "Dr. Meenakshi Sundaram", specialty: "Nutritionist", date: "April 1, 2026", time: "11:00 AM", type: "In-Person", status: "upcoming", location: "Healytics Clinic" },
  { id: 4, doctor: "Dr. Priya Sharma", specialty: "Endocrinologist", date: "Feb 15, 2026", time: "10:30 AM", type: "In-Person", status: "completed", location: "Apollo Hospital" },
  { id: 5, doctor: "Dr. Kavitha Rajan", specialty: "General Physician", date: "Jan 28, 2026", time: "3:00 PM", type: "Video Call", status: "completed", location: "Online" },
];

const AppointmentsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const upcoming = appointments.filter(a => a.status === "upcoming");
  const past = appointments.filter(a => a.status === "completed");

  useEffect(() => { document.title = "Appointments — Healytics"; }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground text-sm">Manage your healthcare appointments</p>
        </div>
        <button onClick={() => toast({ title: "📅 Book Appointment", description: "Select a doctor from the Doctors page to book." })} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 cursor-pointer hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> New Appointment
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5 text-center">
          <p className="text-primary font-heading text-3xl font-bold">{upcoming.length}</p>
          <p className="text-muted-foreground text-sm">Upcoming</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="font-heading text-3xl font-bold" style={{ color: "hsl(var(--accent-green))" }}>{past.length}</p>
          <p className="text-muted-foreground text-sm">Completed</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="font-heading text-3xl font-bold text-muted-foreground">0</p>
          <p className="text-muted-foreground text-sm">Cancelled</p>
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-foreground mb-4">Upcoming Appointments</h3>
        <div className="space-y-3">
          {upcoming.map(a => (
            <div key={a.id} className="glass-card p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h4 className="text-foreground font-medium">{a.doctor}</h4>
                <p className="text-primary text-xs uppercase tracking-wider">{a.specialty}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{a.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{a.time}</span>
                <span className="flex items-center gap-1">{a.type === "Video Call" ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}{a.type}</span>
              </div>
              <div className="flex gap-2">
                {a.type === "Video Call" && <button onClick={() => navigate("/video-call")} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs cursor-pointer hover:bg-primary/90">Join</button>}
                <button onClick={() => toast({ title: "Appointment rescheduled", description: "Your appointment has been updated." })} className="px-3 py-1.5 rounded-lg border border-border text-muted-foreground text-xs cursor-pointer hover:text-foreground">Reschedule</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-foreground mb-4">Past Appointments</h3>
        <div className="space-y-3">
          {past.map(a => (
            <div key={a.id} className="glass-card p-5 flex flex-col md:flex-row md:items-center gap-4 opacity-70">
              <div className="flex-1">
                <h4 className="text-foreground font-medium">{a.doctor}</h4>
                <p className="text-muted-foreground text-xs">{a.specialty}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{a.date}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--accent-green))]/15 text-[hsl(var(--accent-green))]">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentsPage;
