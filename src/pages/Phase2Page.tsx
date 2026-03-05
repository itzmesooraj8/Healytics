import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Info, Mail, Briefcase, FileText, Calendar, User, BookOpen, BarChart, Shield, Video, Phone, DollarSign, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";

const iconMap: Record<string, any> = {
  info: Info, mail: Mail, briefcase: Briefcase, "file-text": FileText,
  calendar: Calendar, user: User, "book-open": BookOpen, "bar-chart": BarChart,
  shield: Shield, video: Video, phone: Phone, "dollar-sign": DollarSign, stethoscope: Stethoscope,
};

interface Props {
  title: string;
  description: string;
  icon: string;
  layout?: boolean;
}

const Phase2Page = ({ title, description, icon, layout }: Props) => {
  const { toast } = useToast();
  const Icon = iconMap[icon] || Info;

  const content = (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center text-center py-20 px-4">
      <Icon className="w-20 h-20 text-primary mb-6" />
      <h1 className="font-heading text-3xl font-bold text-foreground mb-3">{title}</h1>
      <div className="inline-block px-4 py-1.5 rounded-full glass-card text-xs text-primary mb-4">🚀 Launching Phase 2 — Q3 2026</div>
      <p className="text-muted-foreground max-w-md mb-8">{description}</p>
      <button onClick={() => toast({ title: "🔔 You're on the list!", description: "You'll be notified when this launches!" })} className="px-6 py-3 rounded-lg glass-card text-primary font-medium hover:bg-primary/10 transition-colors cursor-pointer border border-primary/30">
        Notify Me
      </button>
      <Link to={layout ? "/patient-dashboard" : "/"} className="mt-4 text-muted-foreground text-sm hover:text-primary transition-colors">
        ← Back
      </Link>
    </motion.div>
  );

  if (layout) return content;

  return (
    <div className="aurora-bg min-h-screen">
      <div className="relative z-10">{content}</div>
      <div className="fixed bottom-0 left-0 right-0"><MedicalDisclaimer /></div>
    </div>
  );
};

export default Phase2Page;
