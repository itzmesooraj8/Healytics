import { motion } from "framer-motion";
import { FileText, Download, Search, Calendar, Filter, Eye } from "lucide-react";

const records = [
  { id: 1, type: "Blood Panel", date: "March 3, 2026", doctor: "Dr. Priya Sharma", status: "Reviewed", files: 2 },
  { id: 2, type: "Thyroid Panel", date: "Feb 15, 2026", doctor: "Dr. Arun K.", status: "Reviewed", files: 1 },
  { id: 3, type: "Lipid Profile", date: "Jan 28, 2026", doctor: "Dr. Priya Sharma", status: "Reviewed", files: 1 },
  { id: 4, type: "HbA1c Test", date: "Jan 5, 2026", doctor: "Dr. Anitha B.", status: "Pending Review", files: 1 },
  { id: 5, type: "CBC Report", date: "Dec 12, 2025", doctor: "Dr. Kavitha R.", status: "Reviewed", files: 3 },
  { id: 6, type: "Kidney Function", date: "Nov 20, 2025", doctor: "Dr. Rajesh N.", status: "Reviewed", files: 2 },
  { id: 7, type: "Vitamin Panel", date: "Oct 15, 2025", doctor: "Dr. Meenakshi S.", status: "Reviewed", files: 1 },
];

const MedicalRecordsPage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Medical Records</h1>
        <p className="text-muted-foreground text-sm">Access and manage your complete medical history</p>
      </div>
      <div className="flex gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search records..." className="pl-9 pr-4 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary w-56" />
        </div>
        <button className="px-3 py-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1.5 text-sm">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="glass-card p-5 text-center">
        <p className="text-primary font-heading text-3xl font-bold">{records.length}</p>
        <p className="text-muted-foreground text-sm">Total Records</p>
      </div>
      <div className="glass-card p-5 text-center">
        <p className="font-heading text-3xl font-bold" style={{ color: "hsl(var(--accent-green))" }}>6</p>
        <p className="text-muted-foreground text-sm">Reviewed</p>
      </div>
      <div className="glass-card p-5 text-center">
        <p className="font-heading text-3xl font-bold" style={{ color: "hsl(var(--accent-amber))" }}>1</p>
        <p className="text-muted-foreground text-sm">Pending</p>
      </div>
    </div>

    <div className="glass-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-xs">
            <th className="text-left p-4">Record</th>
            <th className="text-left p-4 hidden md:table-cell">Date</th>
            <th className="text-left p-4 hidden md:table-cell">Doctor</th>
            <th className="text-left p-4">Status</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">{r.type}</p>
                    <p className="text-muted-foreground text-xs md:hidden">{r.date}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-muted-foreground hidden md:table-cell">{r.date}</td>
              <td className="p-4 text-muted-foreground hidden md:table-cell">{r.doctor}</td>
              <td className="p-4">
                <span className={`text-xs px-2 py-1 rounded-full ${r.status === "Reviewed" ? "bg-[hsl(var(--accent-green))]/15 text-[hsl(var(--accent-green))]" : "bg-[hsl(var(--accent-amber))]/15 text-[hsl(var(--accent-amber))]"}`}>{r.status}</span>
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors cursor-pointer"><Eye className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors cursor-pointer"><Download className="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

export default MedicalRecordsPage;
