import { motion } from "framer-motion";
import { BookOpen, Play, FileText, ExternalLink, Search } from "lucide-react";
import { useState } from "react";

const resources = [
  { id: 1, type: "Article", title: "Understanding Your HbA1c Results", desc: "What your HbA1c levels mean and how to improve them through diet and medication.", category: "Diabetes", readTime: "5 min" },
  { id: 2, type: "Video", title: "How to Read a Blood Panel Report", desc: "Step-by-step video guide to understanding each marker in your blood panel.", category: "General", readTime: "8 min" },
  { id: 3, type: "Guide", title: "Cholesterol: Good vs Bad — A Patient's Guide", desc: "Learn the difference between LDL and HDL cholesterol and what your numbers mean.", category: "Cardiac", readTime: "6 min" },
  { id: 4, type: "Article", title: "Iron Deficiency Anemia: Signs & Solutions", desc: "Recognize symptoms, understand lab markers, and explore treatment options.", category: "Nutrition", readTime: "4 min" },
  { id: 5, type: "Video", title: "Vitamin D Deficiency in India", desc: "Why millions of Indians are Vitamin D deficient despite abundant sunshine.", category: "Nutrition", readTime: "10 min" },
  { id: 6, type: "Guide", title: "Preparing for Your Lab Tests", desc: "Fasting requirements, timing, and tips for accurate lab results.", category: "General", readTime: "3 min" },
  { id: 7, type: "Article", title: "Kidney Function Tests Explained", desc: "Creatinine, BUN, GFR — what these kidney markers tell your doctor.", category: "Nephrology", readTime: "7 min" },
  { id: 8, type: "Guide", title: "Heart Health: Risk Factors You Can Control", desc: "Evidence-based strategies to reduce cardiovascular risk through lifestyle changes.", category: "Cardiac", readTime: "5 min" },
];

const categories = ["All", "General", "Diabetes", "Cardiac", "Nutrition", "Nephrology"];

const ResourceCenterPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = resources.filter(r => (filter === "All" || r.category === filter) && r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Resource Center</h1>
        <p className="text-muted-foreground text-sm">Educational articles, videos, and guides curated by medical professionals</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..." className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-6 group cursor-pointer hover:glow-border transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                {r.type === "Video" ? <Play className="w-5 h-5 text-primary" /> : r.type === "Guide" ? <BookOpen className="w-5 h-5 text-primary" /> : <FileText className="w-5 h-5 text-primary" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{r.type}</span>
                  <span className="text-xs text-muted-foreground">{r.readTime}</span>
                </div>
                <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{r.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{r.desc}</p>
                <span className="text-xs text-muted-foreground mt-2 inline-block">{r.category}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResourceCenterPage;
