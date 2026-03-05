import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const FAQ: Record<string, string> = {
  "hba1c": "HbA1c (glycated hemoglobin) measures your average blood sugar over the past 2-3 months. A normal HbA1c is below 5.7%. Between 5.7-6.4% indicates prediabetes, and 6.5% or above indicates diabetes. It's one of the most important markers for diabetes management.",
  "glucose": "Fasting glucose measures your blood sugar after 8+ hours of not eating. Normal is 70-100 mg/dL. Between 100-125 is prediabetes, and 126+ on two separate tests indicates diabetes. High glucose can damage blood vessels and organs over time.",
  "cholesterol": "Cholesterol is a waxy substance in your blood. LDL ('bad') cholesterol should be below 100 mg/dL — it builds up in artery walls. HDL ('good') cholesterol should be above 40 mg/dL — it helps remove LDL. Total cholesterol should be under 200 mg/dL.",
  "ldl": "LDL (Low-Density Lipoprotein) is often called 'bad' cholesterol because high levels lead to plaque buildup in arteries, increasing heart attack and stroke risk. Optimal LDL is below 100 mg/dL. Above 160 is considered high risk.",
  "hdl": "HDL (High-Density Lipoprotein) is 'good' cholesterol — it carries cholesterol away from arteries back to the liver. Higher HDL is better: above 60 mg/dL is protective, below 40 mg/dL is a risk factor. Exercise is the best way to raise HDL.",
  "vitamin d": "Vitamin D is essential for bone health, immune function, and mood. Levels below 20 ng/mL are deficient, 20-29 is insufficient, and 30-100 is optimal. Deficiency is extremely common in India due to indoor lifestyles despite abundant sunlight.",
  "creatinine": "Creatinine is a waste product from muscle metabolism, filtered by your kidneys. Normal is 0.7-1.2 mg/dL for men. Elevated creatinine may indicate your kidneys aren't filtering blood as well as they should. It's an important marker for kidney health.",
  "tsh": "TSH (Thyroid Stimulating Hormone) controls your thyroid gland. Normal is 0.4-4.0 mIU/L. High TSH suggests an underactive thyroid (hypothyroidism), causing fatigue and weight gain. Low TSH suggests overactive thyroid (hyperthyroidism).",
  "dangerous": "Whether a lab value is 'dangerous' depends on how far it is from the reference range and your overall health context. Any value flagged as HIGH or LOW should be discussed with your doctor. Healytics highlights concerning values but cannot determine clinical urgency — only your doctor can.",
  "normal": "A 'normal' lab result means your value falls within the reference range established by WHO/NIH for healthy adults. However, 'normal' ranges can vary by age, sex, and ethnicity. Your doctor considers your full medical history when interpreting results.",
};

const findAnswer = (q: string): string => {
  const lower = q.toLowerCase();
  for (const [key, val] of Object.entries(FAQ)) {
    if (lower.includes(key)) return val;
  }
  return "Great question! While I can explain common lab markers, for specific medical questions about your results, please consult your healthcare provider. Try asking me about specific markers like 'HbA1c', 'glucose', 'cholesterol', 'vitamin D', 'creatinine', or 'TSH'.";
};

interface Message { role: "user" | "ai"; text: string; }

const AIChatBubble = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi! I'm Healytics Assistant. Ask me about any lab marker — e.g. 'What does HbA1c mean?' or 'Is my cholesterol dangerous?'" }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: q }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: findAnswer(q) }]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-h-[28rem] flex flex-col glass-card overflow-hidden"
            style={{ borderColor: "hsl(var(--primary) / 0.3)" }}
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-primary/5">
              <span className="font-heading font-bold text-sm text-foreground">🧠 AI Assistant</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[200px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask about a lab marker..."
                className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              />
              <button onClick={send} className="p-2 rounded-lg bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90"><Send className="w-3.5 h-3.5" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg cursor-pointer"
        style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.3)" }}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </>
  );
};

export default AIChatBubble;
