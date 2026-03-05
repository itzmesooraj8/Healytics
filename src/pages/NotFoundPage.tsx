import { Link } from "react-router-dom";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";

const NotFoundPage = () => (
  <div className="aurora-bg min-h-screen flex flex-col items-center justify-center px-4">
    <div className="relative z-10 text-center">
      <h1 className="font-heading text-[120px] md:text-[160px] font-bold text-primary leading-none" style={{ animation: "pulse404 2s infinite" }}>404</h1>
      <p className="font-heading text-xl text-foreground mt-4">This medical record doesn't exist.</p>
      <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">The page you're looking for has been moved, deleted, or never existed.</p>
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <Link to="/" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">🏠 Return to Healytics</Link>
        <Link to="/lab-results" className="px-6 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors">🔬 Analyze a Lab Report</Link>
      </div>
    </div>
    <div className="fixed bottom-0 left-0 right-0"><MedicalDisclaimer /></div>
  </div>
);

export default NotFoundPage;
