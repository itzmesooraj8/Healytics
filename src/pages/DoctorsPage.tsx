import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MOCK_DOCTORS } from "@/data/mockData";
import { doctorsAPI, type DoctorAPI } from "@/lib/api";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import PublicNavbar from "@/components/PublicNavbar";

const specialties = ["All", "Endocrinologist", "Cardiologist", "General Physician", "Hematologist", "Diabetologist", "Nephrologist", "Nutritionist", "Internal Medicine"];

const DoctorsPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [doctors, setDoctors] = useState<DoctorAPI[]>(MOCK_DOCTORS);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Find Doctors — Healytics";
    doctorsAPI.getAll()
      .then(res => setDoctors(res.doctors))
      .catch(() => setDoctors(MOCK_DOCTORS)); // fallback if backend not running
  }, []);

  const filtered = doctors.filter(d =>
    (filter === "All" || d.specialty === filter) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto pb-12">
        <div className="aurora-bg rounded-2xl p-8 mb-8">
          <h1 className="relative z-10 font-heading text-3xl md:text-5xl font-bold text-foreground text-center">Find Your Specialist</h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors..." className="w-full pl-12 pr-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {specialties.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{s}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(doc => (
            <motion.div key={doc.id} whileHover={{ scale: 1.02 }} className="glass-card p-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold font-heading mb-4 mx-auto" style={{ background: doc.color + "30", color: doc.color }}>{doc.avatar}</div>
              <h3 className="font-heading font-bold text-foreground text-center">{doc.name}</h3>
              <p className="text-primary text-xs text-center uppercase tracking-wider mb-2">{doc.specialty}</p>
              <p className="text-muted-foreground text-xs text-center">{doc.experience} · {doc.hospital}</p>
              <div className="flex items-center justify-center gap-1 my-3">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-foreground text-sm font-medium">{doc.rating}</span>
                <span className="text-muted-foreground text-xs">({doc.reviews})</span>
              </div>
              <p className={`text-xs text-center mb-4 ${doc.available ? "text-[hsl(var(--accent-green))]" : "text-destructive"}`}>
                {doc.available ? "🟢 Available Today" : "🔴 Not Available"}
              </p>
              <div className="space-y-2">
                <button onClick={() => navigate(`/doctor-profile/${doc.id}`)} className="w-full py-2 rounded-lg border border-border text-foreground text-sm hover:bg-muted transition-colors cursor-pointer">View Profile</button>
                <button onClick={() => toast({ title: "🚀 Coming Soon!", description: "Booking launching Phase 2" })} className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors cursor-pointer">Book Appointment</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <MedicalDisclaimer />
    </div>
  );
};

export default DoctorsPage;
