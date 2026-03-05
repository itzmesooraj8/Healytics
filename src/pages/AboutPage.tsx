import { motion } from "framer-motion";
import { Users, Target, Award, Heart, Globe, Zap } from "lucide-react";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import PublicNavbar from "@/components/PublicNavbar";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <PublicNavbar />

    <div className="pt-24 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <p className="text-primary text-sm uppercase tracking-wider mb-3">About Us</p>
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">Making Healthcare<br /><span className="gradient-text">Accessible to All</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Healytics was born from a simple belief: everyone deserves to understand their own health data, regardless of language, location, or literacy level.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: Target, title: "Our Mission", desc: "Democratize medical literacy for 1.4 billion Indians by making lab report interpretation accessible, free, and multilingual." },
          { icon: Heart, title: "Our Vision", desc: "A world where no patient leaves a lab confused about their results. Clear health insights for every person, everywhere." },
          { icon: Award, title: "Our Values", desc: "Transparency, accuracy, accessibility. We never replace doctors — we empower patients with understanding." },
        ].map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="glass-card p-8">
            <item.icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-10 text-center mb-16">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: "50,000+", label: "Reports Analyzed" },
            { val: "12", label: "States Reached" },
            { val: "3", label: "Languages" },
            { val: "98.7%", label: "Accuracy Rate" },
          ].map(s => (
            <div key={s.label}>
              <p className="text-primary font-heading text-3xl font-bold">{s.val}</p>
              <p className="text-muted-foreground text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Leadership Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Dr. Aravind Kumar", role: "CEO & Co-founder", avatar: "AK", desc: "Former AIIMS researcher with 15 years in health-tech." },
            { name: "Priya Venkatesh", role: "CTO", avatar: "PV", desc: "Ex-Google AI engineer. Built ML systems serving 100M+ users." },
            { name: "Dr. Meena Iyer", role: "Chief Medical Officer", avatar: "MI", desc: "Board-certified pathologist. Ensures clinical accuracy." },
          ].map((person, i) => (
            <motion.div key={person.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold font-heading mx-auto mb-4">{person.avatar}</div>
              <h4 className="font-heading font-bold text-foreground">{person.name}</h4>
              <p className="text-primary text-xs uppercase tracking-wider mb-2">{person.role}</p>
              <p className="text-muted-foreground text-sm">{person.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-card p-8 text-center" style={{ borderColor: "hsl(var(--primary) / 0.2)" }}>
        <Globe className="w-10 h-10 text-primary mx-auto mb-4" />
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">Aligned with UN SDG 3</h3>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">Good Health and Well-being. Every feature we build is measured against its impact on healthcare accessibility.</p>
      </div>
    </div>
    <MedicalDisclaimer />
  </div>
);

export default AboutPage;
