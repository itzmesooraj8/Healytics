import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FlaskConical, Mic, FileDown, Activity, Brain, Stethoscope, Shield, Globe, Smartphone } from "lucide-react";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import PublicNavbar from "@/components/PublicNavbar";

const services = [
  { icon: FlaskConical, title: "AI Lab Interpretation", desc: "Upload any lab report and get plain-English explanations powered by Google Gemini AI. Supports blood panels, thyroid, lipid profiles, and more.", color: "primary" },
  { icon: Mic, title: "Multilingual Voice Readout", desc: "Hear your lab interpretations in English, Tamil, or Hindi. Designed for elderly patients and those with visual impairments.", color: "accent" },
  { icon: FileDown, title: "Professional PDF Reports", desc: "Generate downloadable PDF summaries with color-coded markers, AI explanations, and actionable insights to share with your doctor.", color: "accent-green" },
  { icon: Activity, title: "Health Trend Analytics", desc: "Track glucose, cholesterol, HbA1c, and other markers over time with interactive charts and progress tracking.", color: "accent-amber" },
  { icon: Brain, title: "Explainable AI Engine", desc: "Every interpretation comes with transparency — see the WHO/NIH rules applied, the reference ranges used, and how AI generated explanations.", color: "primary" },
  { icon: Stethoscope, title: "Doctor Marketplace", desc: "Find and connect with verified specialists — endocrinologists, cardiologists, hematologists — based on your lab results.", color: "accent" },
  { icon: Shield, title: "Data Privacy & Security", desc: "HIPAA-compliant data handling. Your lab reports are encrypted and never stored permanently without consent.", color: "accent-green" },
  { icon: Smartphone, title: "Wearable Integration", desc: "Sync data from Apple Watch, Fitbit, and Google Fit to get a complete picture of your health alongside lab results.", color: "accent-amber" },
  { icon: Globe, title: "Rural Health Access", desc: "Designed to work on basic internet connections. Aligned with UN SDG 3 to bring healthcare intelligence to underserved communities.", color: "primary" },
];

const ServicesPage = () => {
  useEffect(() => { document.title = "Services — Healytics"; }, []);
  return (
  <div className="min-h-screen bg-background">
    <PublicNavbar />

    <div className="pt-24 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <p className="text-primary text-sm uppercase tracking-wider mb-3">Services</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">What We Offer</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Comprehensive AI-powered healthcare tools designed for patients, doctors, and clinics.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="glass-card p-8 group">
            <s.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card glow-border p-10 text-center mt-16">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6">Try our AI lab interpreter for free — no sign-up required.</p>
        <Link to="/lab-results" className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all inline-block">Analyze a Lab Report →</Link>
      </motion.div>
    </div>
    <MedicalDisclaimer />
  </div>
  );
};

export default ServicesPage;
