import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { HEALTH_TREND_DATA } from "@/data/mockData";

const markerFrequency = [
  { name: "Glucose", count: 12 },
  { name: "HbA1c", count: 10 },
  { name: "LDL", count: 8 },
  { name: "Vitamin D", count: 7 },
  { name: "TSH", count: 6 },
  { name: "Creatinine", count: 5 },
];

const statusDist = [
  { name: "Normal", value: 35, color: "hsl(153 100% 37%)" },
  { name: "High", value: 40, color: "hsl(0 84% 55%)" },
  { name: "Low", value: 25, color: "hsl(40 100% 50%)" },
];

const ReportsAnalyticsPage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">Reports & Analytics</h1>
      <p className="text-muted-foreground text-sm">Track your health metrics over time</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Total Tests", value: "47", icon: BarChart3, trend: "+5 this month" },
        { label: "Improving", value: "3", icon: TrendingUp, trend: "Glucose, LDL, HbA1c", color: "accent-green" },
        { label: "Needs Attention", value: "4", icon: TrendingDown, trend: "HDL, Vit D, Iron, Hb", color: "accent-amber" },
        { label: "Tests This Month", value: "2", icon: Activity, trend: "Blood Panel, Thyroid" },
      ].map(card => (
        <div key={card.label} className="glass-card p-5">
          <card.icon className="w-5 h-5 text-primary mb-2" />
          <p className="font-heading text-2xl font-bold text-foreground">{card.value}</p>
          <p className="text-muted-foreground text-xs">{card.label}</p>
          <p className="text-xs mt-1" style={{ color: card.color ? `hsl(var(--${card.color}))` : "hsl(var(--primary))" }}>{card.trend}</p>
        </div>
      ))}
    </div>

    <div className="glass-card p-6">
      <h3 className="font-heading font-bold text-foreground mb-4">Health Trends — 6 Months</h3>
      <div className="h-72">
        <ResponsiveContainer>
          <LineChart data={HEALTH_TREND_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
            <Legend />
            <Line type="monotone" dataKey="glucose" name="Glucose" stroke="hsl(var(--primary))" strokeWidth={2} dot />
            <Line type="monotone" dataKey="cholesterol" name="Cholesterol" stroke="hsl(var(--accent-amber))" strokeWidth={2} dot />
            <Line type="monotone" dataKey="hba1c" name="HbA1c (×10)" stroke="hsl(var(--accent))" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <h3 className="font-heading font-bold text-foreground mb-4">Most Tested Markers</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={markerFrequency} layout="vertical">
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-heading font-bold text-foreground mb-4">Result Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusDist} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4}>
                {statusDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </motion.div>
);

export default ReportsAnalyticsPage;
