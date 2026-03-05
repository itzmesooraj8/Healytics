import { motion } from "framer-motion";
import { Users, FileText, Activity, Shield, BarChart3, Settings, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const usageData = [
  { day: "Mon", reports: 145 }, { day: "Tue", reports: 198 },
  { day: "Wed", reports: 176 }, { day: "Thu", reports: 220 },
  { day: "Fri", reports: 189 }, { day: "Sat", reports: 98 },
  { day: "Sun", reports: 67 },
];

const recentUsers = [
  { name: "Rajesh Kumar", email: "rajesh@email.com", role: "Patient", joined: "2 days ago" },
  { name: "Dr. Priya Sharma", email: "priya@hospital.com", role: "Doctor", joined: "5 days ago" },
  { name: "Meena Krishnan", email: "meena@email.com", role: "Patient", joined: "1 week ago" },
  { name: "Dr. Arun K.", email: "arun@hospital.com", role: "Doctor", joined: "1 week ago" },
  { name: "Priya Suresh", email: "priya.s@email.com", role: "Patient", joined: "2 weeks ago" },
];

const AdminDashboard = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="text-muted-foreground text-sm">Platform overview and management</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Users, label: "Total Users", value: "12,847", change: "+342 this week" },
        { icon: FileText, label: "Reports Generated", value: "50,231", change: "+1,204 this week" },
        { icon: Activity, label: "Active Sessions", value: "847", change: "Real-time" },
        { icon: AlertTriangle, label: "System Alerts", value: "2", change: "1 critical" },
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
      <h3 className="font-heading font-bold text-foreground mb-4">Reports Generated — This Week</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <LineChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
            <Line type="monotone" dataKey="reports" stroke="hsl(var(--primary))" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="glass-card p-6">
      <h3 className="font-heading font-bold text-foreground mb-4">Recent Users</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-xs">
            <th className="text-left py-2">User</th>
            <th className="text-left py-2 hidden md:table-cell">Email</th>
            <th className="text-left py-2">Role</th>
            <th className="text-left py-2">Joined</th>
          </tr>
        </thead>
        <tbody>
          {recentUsers.map(u => (
            <tr key={u.email} className="border-b border-border/50">
              <td className="py-3 text-foreground font-medium">{u.name}</td>
              <td className="py-3 text-muted-foreground hidden md:table-cell">{u.email}</td>
              <td className="py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${u.role === "Doctor" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>{u.role}</span></td>
              <td className="py-3 text-muted-foreground text-xs">{u.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

export default AdminDashboard;
