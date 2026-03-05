import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import ThemeToggle from "@/components/ThemeToggle";

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "✉️ Message Sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <Link to="/" className="flex items-center gap-2"><span className="text-primary text-xl">⚕</span><span className="font-heading font-bold text-foreground">Healytics</span></Link>
        <div className="flex items-center gap-3"><ThemeToggle /><Link to="/login" className="text-sm text-muted-foreground">Sign In</Link></div>
      </nav>

      <div className="pt-24 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-primary text-sm uppercase tracking-wider mb-3">Contact</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Have questions, feedback, or partnership inquiries? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Mail, title: "Email", info: "support@healytics.ai", sub: "Response within 24h" },
            { icon: Phone, title: "Phone", info: "+91 44 2345 6789", sub: "Mon-Fri 9AM-6PM IST" },
            { icon: MapPin, title: "Office", info: "Chennai, Tamil Nadu", sub: "India" },
          ].map(item => (
            <div key={item.title} className="glass-card p-6 text-center">
              <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-foreground text-sm">{item.info}</p>
              <p className="text-muted-foreground text-xs">{item.sub}</p>
            </div>
          ))}
        </div>

        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="glass-card p-8 max-w-2xl mx-auto space-y-4">
          <h3 className="font-heading text-xl font-bold text-foreground mb-4">Send us a Message</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" required className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email Address" required className="px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Subject" required className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Your Message" rows={5} required className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
          <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <Send className="w-4 h-4" /> Send Message
          </button>
        </motion.form>
      </div>
      <MedicalDisclaimer />
    </div>
  );
};

export default ContactPage;
