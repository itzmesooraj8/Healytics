import { useState } from "react";
import { motion } from "framer-motion";
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, Monitor, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TeleconsultationPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");

  const sessions = [
    { id: 1, doctor: "Dr. Arun Krishnamurthy", specialty: "Cardiologist", date: "March 22, 2026", time: "2:00 PM", duration: "30 min", status: "scheduled" },
    { id: 2, doctor: "Dr. Priya Sharma", specialty: "Endocrinologist", date: "March 29, 2026", time: "11:00 AM", duration: "45 min", status: "scheduled" },
  ];

  const history = [
    { id: 3, doctor: "Dr. Kavitha Rajan", specialty: "General Physician", date: "Feb 15, 2026", duration: "28 min", status: "completed", notes: "Follow-up on thyroid levels. Continue medication." },
    { id: 4, doctor: "Dr. Priya Sharma", specialty: "Endocrinologist", date: "Jan 20, 2026", duration: "35 min", status: "completed", notes: "Adjusted Metformin dosage. Recheck in 2 months." },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Teleconsultation</h1>
        <p className="text-muted-foreground text-sm">Connect with doctors via secure video consultations</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card p-5 text-center">
          <Video className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="font-heading text-2xl font-bold text-foreground">{sessions.length}</p>
          <p className="text-muted-foreground text-sm">Upcoming Sessions</p>
        </div>
        <div className="glass-card p-5 text-center">
          <Users className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="font-heading text-2xl font-bold text-foreground">{history.length}</p>
          <p className="text-muted-foreground text-sm">Past Consultations</p>
        </div>
        <div className="glass-card p-5 text-center">
          <Monitor className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="font-heading text-2xl font-bold text-foreground">HD</p>
          <p className="text-muted-foreground text-sm">Video Quality</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(["upcoming", "history"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{tab}</button>
        ))}
      </div>

      {activeTab === "upcoming" ? (
        <div className="space-y-3">
          {sessions.map(s => (
            <div key={s.id} className="glass-card p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-foreground font-medium">{s.doctor}</h3>
                <p className="text-primary text-xs uppercase tracking-wider">{s.specialty}</p>
                <p className="text-muted-foreground text-sm mt-1">{s.date} at {s.time} · {s.duration}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast({ title: "📹 Joining call...", description: "Connecting to video session." })} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm cursor-pointer hover:bg-primary/90 flex items-center gap-2">
                  <Video className="w-4 h-4" /> Join Now
                </button>
                <button className="px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm cursor-pointer hover:text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {history.map(h => (
            <div key={h.id} className="glass-card p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-foreground font-medium">{h.doctor}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--accent-green))]/15 text-[hsl(var(--accent-green))]">Completed</span>
              </div>
              <p className="text-muted-foreground text-xs">{h.specialty} · {h.date} · {h.duration}</p>
              <p className="text-foreground text-sm mt-2 p-3 rounded-lg bg-muted/50">{h.notes}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TeleconsultationPage;
