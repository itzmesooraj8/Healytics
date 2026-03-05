import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { FlaskConical, Upload, Brain, CheckCircle, Twitter, Linkedin, Github, Instagram, ArrowRight, Zap, Shield, Globe, ChevronRight, Menu, X } from "lucide-react";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import ThemeToggle from "@/components/ThemeToggle";

const HeroScene = lazy(() => import("@/components/3d/HeroScene"));
const FeatureScene = lazy(() => import("@/components/3d/FeatureScene"));

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } } };

const stats = [
  { value: 50000, suffix: "+", label: "Reports Analyzed", icon: "📊" },
  { value: 98.7, suffix: "%", label: "Accuracy Rate", icon: "🎯" },
  { value: 3, suffix: "", label: "Languages Supported", icon: "🌍" },
  { value: 30, suffix: "s", label: "Average Analysis Time", icon: "⚡" },
];

const AnimatedCounter = ({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start * 10) / 10);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{target === 98.7 ? count.toFixed(1) : Math.floor(count)}{suffix}</span>;
};

const testimonials = [
  { text: "I finally understood my blood sugar results without waiting 3 days for my doctor.", author: "Lakshmi, 64", loc: "Chennai", rating: 5 },
  { text: "The Tamil voice feature changed everything for my elderly mother.", author: "Arun, 38", loc: "Coimbatore", rating: 5 },
  { text: "Our clinic now recommends Healytics to every patient after discharge.", author: "Dr. Meenakshi", loc: "General Physician", rating: 5 },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Doctors", to: "/doctors" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => { document.title = "Healytics — AI-Powered Health Intelligence Platform"; }, []);
  const [statsInView, setStatsInView] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Mini Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "h-12 bg-background/90 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-primary/5"
            : "h-14 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
              <span className="text-primary text-sm">⚕</span>
            </div>
            <span className="font-heading font-bold text-foreground text-sm">
              Healytics
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors relative group font-medium"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/login"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:block font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-foreground"
            >
              {mobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border p-4 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenu(false)}
                className="block text-sm text-muted-foreground hover:text-foreground py-1"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* Hero with 3D Scene */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Full 3D background */}
        <Suspense fallback={
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px]" style={{ animation: "auroraFloat2 10s infinite" }} />
          </div>
        }>
          <HeroScene />
        </Suspense>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl space-y-6"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-xs text-primary font-medium"
            >
              <Zap className="w-3 h-3" />
              AI-Powered Medical Intelligence
              <ChevronRight className="w-3 h-3" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.02] tracking-tight"
            >
              The Future of{" "}
              <br />
              <span className="gradient-text">Medical</span>{" "}
              <span className="gradient-text">Intelligence</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed"
            >
              Transform complex lab reports into clear, actionable insights
              in under 30 seconds — in Tamil, Hindi, or English.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/lab-results"
                className="group px-7 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all flex items-center gap-2 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5"
              >
                🔬 Analyze Lab Report
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 rounded-xl border border-border/60 text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all font-medium text-sm backdrop-blur-sm"
              >
                ▶ Watch Demo
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-5 text-xs text-muted-foreground pt-2"
            >
              {["Not a diagnosis", "Free to use", "WHO-based ranges"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-4 h-7 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <motion.section
        onViewportEnter={() => setStatsInView(true)}
        className="py-16 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center group hover:glow-border transition-all"
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-primary font-heading text-3xl font-bold mb-1">
                {s.label === "Average Analysis Time" && "< "}
                <AnimatedCounter target={s.value} suffix={s.suffix} inView={statsInView} />
                {(s.label === "Reports Analyzed" || s.label === "Accuracy Rate") && <sup className="text-[10px] text-muted-foreground ml-0.5">*</sup>}
              </div>
              <div className="text-muted-foreground text-xs">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[11px] text-muted-foreground/60 mt-4">* Projected targets for 2027 based on current trajectory.</p>
      </motion.section>

      {/* Features with 3D background */}
      <section id="features" className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative">
        <Suspense fallback={null}>
          <FeatureScene />
        </Suspense>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">Features</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              Everything You Need to
              <br />
              <span className="gradient-text">Understand Your Health</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { span: "md:col-span-2", emoji: "🔬", title: "AI Lab Interpreter", desc: "Upload any lab report. Get plain-English explanations powered by Google Gemini AI in seconds.", link: "/lab-results", linkText: "Try Now" },
              { span: "", emoji: "🔊", title: "Voice Readout", desc: "Hear results in Tamil, Hindi, or English." },
              { span: "", emoji: "📄", title: "PDF Export", desc: "Download professional reports to share." },
              { span: "md:col-span-2", emoji: "📊", title: "Risk Visualization", desc: "Dynamic health score gauges and trend charts.", chart: true },
              { span: "", emoji: "⌚", title: "Wearable Sync", desc: "Connect Apple Watch, Fitbit, and Google Fit." },
              { span: "", emoji: "🧠", title: "Explainable AI", desc: "See exactly how every result is interpreted." },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`glass-card p-7 group cursor-pointer ${card.span}`}
              >
                <div className="text-3xl mb-3">{card.emoji}</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{card.desc}</p>
                {card.link && (
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all"
                  >
                    {card.linkText} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {card.chart && (
                  <div className="w-32 h-32 mx-auto mt-2">
                    <ResponsiveContainer>
                      <RadialBarChart
                        innerRadius="70%"
                        outerRadius="100%"
                        data={[{ value: 72, fill: "hsl(var(--accent-green))" }]}
                        startAngle={180}
                        endAngle={0}
                      >
                        <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "hsl(var(--muted))" }} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 md:px-12 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">How It Works</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              From Report to Clarity
              <br />
              <span className="gradient-text">in 3 Steps</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-px border-t-2 border-dashed border-primary/20" />
            {[
              { icon: Upload, num: 1, title: "Upload Your Report", desc: "Drag-and-drop your PDF lab report or use our quick-load samples" },
              { icon: Brain, num: 2, title: "AI Analyzes", desc: "Rule-based engine maps WHO ranges. Gemini AI generates plain-English explanation." },
              { icon: CheckCircle, num: 3, title: "Get Clear Insights", desc: "Color-coded results, voice readout in your language, export as PDF" },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold font-heading border border-primary/20">
                  {step.num}
                </div>
                <step.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <h3 className="font-heading text-base font-bold text-foreground mb-1.5">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card glow-border p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/[0.02]" />
          <div className="relative z-10">
            <div className="text-4xl mb-3">🌍</div>
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-3 font-medium">
              UN SDG 3: Good Health and Well-being
            </p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-8">
              Democratizing Medical Literacy
              <br />
              <span className="gradient-text">for 1.4 Billion Indians</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { icon: Zap, title: "No Doctor Required", desc: "Instant AI interpretation 24/7" },
                { icon: Globe, title: "Works Anywhere", desc: "Basic internet connection is enough" },
                { icon: Shield, title: "Free for Patients", desc: "Zero cost, zero barriers" },
              ].map((item) => (
                <div key={item.title} className="glass-card p-5 group hover:glow-border transition-all">
                  <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <h4 className="font-heading font-bold text-foreground mb-1 text-sm">{item.title}</h4>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-xs">Built for rural India. Designed for everyone.</p>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Trusted by Thousands</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-7"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-primary text-xs">★</span>
                ))}
              </div>
              <p className="text-foreground text-sm mb-5 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="text-foreground font-medium text-sm">{t.author}</p>
                <p className="text-muted-foreground text-xs">{t.loc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card glow-border p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/[0.03]" />
          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-5">
              Ready to Understand
              <br />
              <span className="gradient-text">Your Health?</span>
            </h2>
            <p className="text-muted-foreground text-base mb-7 max-w-xl mx-auto">
              Join 50,000+ patients who trust Healytics for clear, actionable lab interpretations.
            </p>
            <Link
              to="/lab-results"
              className="inline-flex items-center gap-2 px-9 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-base shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all"
            >
              Start Free Analysis <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-14 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-sm">⚕</span>
              </div>
              <span className="font-heading font-bold text-foreground text-sm">
                Healytics
              </span>
            </div>
            <p className="text-muted-foreground text-xs mb-3 max-w-xs leading-relaxed">
              Making medical intelligence accessible to all. AI-powered lab interpretation for everyone.
            </p>
            <div className="flex gap-2">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
          {[
            { title: "Product", links: [
              { label: "Lab Interpreter",  action: () => navigate("/lab-results") },
              { label: "Voice Readout",    action: () => navigate("/lab-results") },
              { label: "PDF Export",       action: () => navigate("/lab-results") },
              { label: "Wearable Sync",    action: () => navigate("/lab-results") },
            ]},
            { title: "Company", links: [
              { label: "About",    action: () => navigate("/about") },
              { label: "Careers",  action: () => toast({ title: "We're hiring!", description: "Send your CV to careers@healytics.ai" }) },
              { label: "Press",    action: () => toast({ title: "Press enquiries", description: "Contact press@healytics.ai for media requests." }) },
              { label: "Contact",  action: () => navigate("/contact") },
            ]},
            { title: "Legal", links: [
              { label: "Privacy Policy",   action: () => toast({ title: "Privacy Policy", description: "Healytics does not sell your health data. All data is encrypted and HIPAA-compliant." }) },
              { label: "Terms of Service", action: () => toast({ title: "Terms of Service", description: "By using Healytics you agree to our Terms. For full document email legal@healytics.ai." }) },
              { label: "Disclaimer",       action: () => toast({ title: "Medical Disclaimer", description: "Healytics is NOT a medical device and does NOT provide diagnoses. Always consult a licensed physician.", variant: "destructive" }) },
              { label: "HIPAA",            action: () => toast({ title: "HIPAA Compliance", description: "Healytics follows HIPAA guidelines for health data protection. Contact dpo@healytics.ai for queries." }) },
            ]},
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-bold text-foreground mb-3 text-xs uppercase tracking-wider">
                {col.title}
              </h4>
              <div className="space-y-2">
                {col.links.map((link) => (
                  <p key={link.label} onClick={link.action} className="text-muted-foreground text-xs cursor-pointer hover:text-primary transition-colors">
                    {link.label}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-5 border-t border-border/50">
          <MedicalDisclaimer />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
