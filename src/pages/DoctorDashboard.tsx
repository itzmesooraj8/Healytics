import { motion } from "framer-motion";
import { Users, FileText, Calendar, TrendingUp, Clock, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const patientData = [
  { day: "Mon", patients: 12 }, { day: "Tue", patients: 18 },
  { day: "Wed", patients: 15 }, { day: "Thu", patients: 22 },
  { day: "Fri", patients: 20 }, { day: "Sat", patients: 8 },
];

const recentPatients = [
  { name: "Rajesh Kumar", age: 58, lastVisit: "March 3, 2026", condition: "Type 2 Diabetes", status: "Follow-up needed" },
  { name: "Meena Krishnan", age: 52, lastVisit: "Feb 28, 2026", condition: "Cardiovascular Risk", status: "Stable" },
  { name: "Priya Suresh", age: 34, lastVisit: "March 1, 2026", condition: "Nutritional Deficiency", status: "Improving" },
  { name: "Arun Venkat", age: 45, lastVisit: "Feb 20, 2026", condition: "Thyroid Disorder", status: "Stable" },
];

const DoctorDashboard = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">Good morning, Dr. Sharma 👋</h1>
      <p className="text-muted-foreground text-sm">March 4, 2026 · Apollo Hospital, Chennai</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Users, label: "Total Patients", value: "312", change: "+8 this week" },
        { icon: Calendar, label: "Today's Appointments", value: "6", change: "Next: 10:30 AM" },
        { icon: FileText, label: "Pending Reports", value: "4", change: "2 urgent" },
        { icon: Star, label: "Rating", value: "4.9", change: "312 reviews" },
      ].map(card => (
        <div key={card.label} className="glass-card p-5">
          <card.icon className="w-5 h-5 text-primary mb-2" />
          <p className="font-heading text-2xl font-bold text-foreground">{card.value}</p>
          <p className="text-muted-foreground text-xs">{card.label}</p>
          <p className="text-primary text-xs mt-1">{card.change}</p>
        </div>
      ))}
    </div>

    <div className="glass-card p-6">
      <h3 className="font-heading font-bold text-foreground mb-4">Patient Visits — This Week</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <LineChart data={patientData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
            <Line type="monotone" dataKey="patients" stroke="hsl(var(--primary))" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="glass-card p-6">
      <h3 className="font-heading font-bold text-foreground mb-4">Recent Patients</h3>
      <div className="space-y-4">
        {recentPatients.map(p => (
          <div key={p.name} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-muted/30">
            <div>
              <p className="text-foreground font-medium">{p.name}, {p.age}</p>
              <p className="text-muted-foreground text-xs">{p.condition} · Last visit: {p.lastVisit}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full mt-2 md:mt-0 w-fit ${p.status === "Follow-up needed" ? "bg-[hsl(var(--accent-amber))]/15 text-[hsl(var(--accent-amber))]" : p.status === "Improving" ? "bg-primary/15 text-primary" : "bg-[hsl(var(--accent-green))]/15 text-[hsl(var(--accent-green))]"}`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="glass-card p-6">
      <h3 className="font-heading font-bold text-foreground mb-4">Today's Schedule</h3>
      <div className="space-y-3">
        {[
          { time: "10:30 AM", patient: "Rajesh Kumar", type: "Follow-up", duration: "30 min" },
          { time: "11:15 AM", patient: "New Patient", type: "Initial Consult", duration: "45 min" },
          { time: "12:00 PM", patient: "Meena Krishnan", type: "Lab Review", duration: "20 min" },
          { time: "2:00 PM", patient: "Priya Suresh", type: "Video Call", duration: "30 min" },
          { time: "3:00 PM", patient: "Arun Venkat", type: "Follow-up", duration: "30 min" },
          { time: "4:00 PM", patient: "Walk-in", type: "Open Slot", duration: "30 min" },
        ].map(slot => (
          <div key={slot.time} className="flex items-center gap-4 py-2">
            <div className="flex items-center gap-2 w-24">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground text-sm font-medium">{slot.time}</span>
            </div>
            <div className="flex-1">
              <span className="text-foreground text-sm">{slot.patient}</span>
              <span className="text-muted-foreground text-xs ml-2">· {slot.type} · {slot.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default DoctorDashboard;
