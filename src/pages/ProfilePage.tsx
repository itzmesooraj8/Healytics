import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Camera, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar", email: "rajesh.kumar@email.com", phone: "+91 98765 43210",
    dob: "1968-05-14", gender: "Male", blood: "B+", address: "42, Anna Nagar, Chennai, Tamil Nadu 600040",
    emergency: "Meena Kumar (Wife) — +91 98765 43211",
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">My Profile</h1>

      <div className="glass-card p-8 text-center">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center text-3xl font-bold font-heading mx-auto">RK</div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary/90"><Camera className="w-4 h-4" /></button>
        </div>
        <h2 className="font-heading text-xl font-bold text-foreground mt-4">{profile.name}</h2>
        <p className="text-muted-foreground text-sm">Patient ID: SC-2026-0042</p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="font-heading font-bold text-foreground">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "Full Name", key: "name", icon: User },
            { label: "Email", key: "email", icon: Mail },
            { label: "Phone", key: "phone", icon: Phone },
            { label: "Date of Birth", key: "dob", icon: User },
            { label: "Gender", key: "gender", icon: User },
            { label: "Blood Group", key: "blood", icon: User },
          ].map(field => (
            <div key={field.key}>
              <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
              <input
                value={profile[field.key as keyof typeof profile]}
                onChange={e => setProfile({ ...profile, [field.key]: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Address</label>
          <input value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Emergency Contact</label>
          <input value={profile.emergency} onChange={e => setProfile({ ...profile, emergency: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <button onClick={() => toast({ title: "✓ Profile Updated", description: "Your changes have been saved." })} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium flex items-center gap-2 cursor-pointer hover:bg-primary/90 transition-colors">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
