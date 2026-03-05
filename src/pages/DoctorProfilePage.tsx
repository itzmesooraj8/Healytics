import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, CalendarCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MOCK_DOCTORS } from "@/data/mockData";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const doctor = MOCK_DOCTORS.find(d => d.id === Number(id));

  if (!doctor) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-2xl">🔍</p>
        <p className="text-foreground font-medium">Doctor not found</p>
        <button onClick={() => navigate("/doctors")} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm cursor-pointer">
          ← Back to Doctors
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Hero */}
      <div className="glass-card p-8 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold font-heading mx-auto mb-4" style={{ background: doctor.color + "30", color: doctor.color }}>{doctor.avatar}</div>
        <h1 className="font-heading text-2xl font-bold text-foreground">{doctor.name}</h1>
        <p className="text-primary text-sm uppercase tracking-wider">{doctor.specialty}</p>
        <p className="text-muted-foreground text-sm mt-1">{doctor.hospital}</p>
        <div className="flex items-center justify-center gap-1 mt-3">
          <Star className="w-5 h-5 fill-primary text-primary" />
          <span className="text-foreground font-medium">{doctor.rating}</span>
          <span className="text-muted-foreground text-sm">({doctor.reviews} reviews)</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card p-6">
          <h3 className="font-heading font-bold text-foreground mb-2">About</h3>
          <p className="text-muted-foreground text-sm">Dr. {doctor.name.split(" ").slice(1).join(" ")} is a highly experienced {doctor.specialty.toLowerCase()} with {doctor.experience} of clinical practice.</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-heading font-bold text-foreground mb-2">Specializations</h3>
          <p className="text-muted-foreground text-sm">{doctor.specialty}, Preventive Medicine, Patient Education</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-heading font-bold text-foreground mb-2">Availability</h3>
          <p className="text-muted-foreground text-sm">Mon–Fri: 9:00 AM – 5:00 PM<br />Sat: 10:00 AM – 1:00 PM</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            toast({
              title: "📅 Appointment Requested!",
              description: `${doctor.name} will confirm your appointment within 24 hours.`,
            });
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4" /> Book Appointment
        </button>
        <Link to="/doctors" className="px-6 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">← Back to Doctors</Link>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
