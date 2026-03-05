import { motion } from "framer-motion";
import { DollarSign, CreditCard, FileText, TrendingUp, Download } from "lucide-react";

const transactions = [
  { id: 1, desc: "Lab Report Analysis — Blood Panel", date: "March 3, 2026", amount: "Free", status: "Completed" },
  { id: 2, desc: "Teleconsultation — Dr. Priya Sharma", date: "Feb 15, 2026", amount: "₹499", status: "Paid" },
  { id: 3, desc: "Lab Report Analysis — Thyroid Panel", date: "Feb 15, 2026", amount: "Free", status: "Completed" },
  { id: 4, desc: "Teleconsultation — Dr. Kavitha Rajan", date: "Jan 28, 2026", amount: "₹399", status: "Paid" },
  { id: 5, desc: "PDF Report Export (Premium)", date: "Jan 15, 2026", amount: "₹49", status: "Paid" },
  { id: 6, desc: "Lab Report Analysis — HbA1c", date: "Jan 5, 2026", amount: "Free", status: "Completed" },
];

const FinancialHubPage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">Financial Hub</h1>
      <p className="text-muted-foreground text-sm">Billing, payments, and insurance management</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: DollarSign, label: "Total Spent", value: "₹947", sub: "This quarter" },
        { icon: CreditCard, label: "Pending", value: "₹0", sub: "No dues" },
        { icon: FileText, label: "Invoices", value: "6", sub: "3 free, 3 paid" },
        { icon: TrendingUp, label: "Savings", value: "₹2,400", sub: "vs. in-person visits" },
      ].map(card => (
        <div key={card.label} className="glass-card p-5">
          <card.icon className="w-5 h-5 text-primary mb-2" />
          <p className="font-heading text-2xl font-bold text-foreground">{card.value}</p>
          <p className="text-muted-foreground text-xs">{card.label}</p>
          <p className="text-primary text-xs mt-1">{card.sub}</p>
        </div>
      ))}
    </div>

    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-foreground">Transaction History</h3>
        <button className="text-primary text-sm cursor-pointer hover:underline flex items-center gap-1"><Download className="w-4 h-4" /> Export</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-xs">
            <th className="text-left py-2">Description</th>
            <th className="text-left py-2 hidden md:table-cell">Date</th>
            <th className="text-left py-2">Amount</th>
            <th className="text-left py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className="border-b border-border/50">
              <td className="py-3 text-foreground">{t.desc}</td>
              <td className="py-3 text-muted-foreground hidden md:table-cell">{t.date}</td>
              <td className="py-3"><span className={t.amount === "Free" ? "text-[hsl(var(--accent-green))]" : "text-foreground"}>{t.amount}</span></td>
              <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--accent-green))]/15 text-[hsl(var(--accent-green))]">{t.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="glass-card p-6">
      <h3 className="font-heading font-bold text-foreground mb-4">Insurance Information</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Provider</p>
          <p className="text-foreground">Star Health Insurance</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Policy Number</p>
          <p className="text-foreground">SH-2025-4829-7712</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Coverage</p>
          <p className="text-foreground">₹5,00,000 / year</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Valid Until</p>
          <p className="text-foreground">December 31, 2026</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default FinancialHubPage;
