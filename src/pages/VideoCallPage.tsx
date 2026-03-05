import { useState } from "react";
import { motion } from "framer-motion";
import { Video, VideoOff, Mic, MicOff, Phone, Monitor, MessageSquare, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VideoCallPage = () => {
  const { toast } = useToast();
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Video Call</h1>
        <p className="text-muted-foreground text-sm">Join your scheduled video consultation</p>
      </div>

      {!inCall ? (
        <div className="glass-card p-12 text-center max-w-lg mx-auto">
          <Video className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="font-heading text-xl font-bold text-foreground mb-2">Ready to Join?</h2>
          <p className="text-muted-foreground mb-2">Upcoming: <span className="text-foreground">Dr. Arun Krishnamurthy</span></p>
          <p className="text-muted-foreground text-sm mb-6">March 22, 2026 at 2:00 PM</p>
          <div className="flex justify-center gap-4 mb-6">
            <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${micOn ? "bg-muted text-foreground" : "bg-destructive text-foreground"}`}>
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button onClick={() => setCamOn(!camOn)} className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${camOn ? "bg-muted text-foreground" : "bg-destructive text-foreground"}`}>
              {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
          </div>
          <button onClick={() => { setInCall(true); toast({ title: "📹 Connected!", description: "You've joined the video call." }); }} className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold cursor-pointer hover:bg-primary/90 transition-colors">
            Join Call
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="glass-card aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-muted/50" />
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center text-3xl font-bold font-heading mx-auto mb-4">AK</div>
              <p className="text-foreground font-heading font-bold">Dr. Arun Krishnamurthy</p>
              <p className="text-muted-foreground text-sm">Cardiologist · Connected</p>
              <p className="text-primary text-xs mt-2 animate-pulse">● Live</p>
            </div>
            {/* Self view */}
            <div className="absolute bottom-4 right-4 w-32 h-24 rounded-lg glass-card flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mx-auto">RK</div>
                <p className="text-xs text-muted-foreground mt-1">You</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${micOn ? "bg-muted text-foreground" : "bg-destructive text-foreground"}`}>
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button onClick={() => setCamOn(!camOn)} className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${camOn ? "bg-muted text-foreground" : "bg-destructive text-foreground"}`}>
              {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
            <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center cursor-pointer text-foreground hover:bg-muted/80"><Monitor className="w-5 h-5" /></button>
            <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center cursor-pointer text-foreground hover:bg-muted/80"><MessageSquare className="w-5 h-5" /></button>
            <button onClick={() => { setInCall(false); toast({ title: "Call Ended", description: "Your consultation has ended." }); }} className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center cursor-pointer text-foreground hover:bg-destructive/90">
              <Phone className="w-5 h-5 rotate-[135deg]" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VideoCallPage;
