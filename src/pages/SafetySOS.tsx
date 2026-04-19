import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, Siren, UserRoundPlus, Navigation2, FileText } from 'lucide-react';
import DOMPurify from 'dompurify';
import SafetyAdvisor from '../components/SafetyAdvisor';

export default function SafetySOS() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeSOS, setActiveSOS] = useState<string | null>(null);
  const [formData, setFormData] = useState({ type: '', location: '', description: '' });
  const [submittedReport, setSubmittedReport] = useState<{ type: string, location: string, description: string } | null>(null);

  const handleDescriptionChange = (val: string) => {
    // Strict Security: Sanitize input on change or before submission
    // Here we sanitize basically to prevent XSS in the UI itself
    const sanitized = DOMPurify.sanitize(val);
    setFormData({ ...formData, description: sanitized });
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type) return;
    
    setLoading(true);
    // Strict Security: Ensure final sanitization before processing
    const finalReport = {
      type: DOMPurify.sanitize(formData.type),
      location: DOMPurify.sanitize(formData.location),
      description: DOMPurify.sanitize(formData.description)
    };

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setSubmittedReport(finalReport);
      setFormData({ type: '', location: '', description: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  const triggerEmergency = (type: string) => {
    setActiveSOS(type);
    // Mocking an instant report for the AI advisor
    setSubmittedReport({ type, location: 'Current GPS Pin', description: 'Emergency SOS Triggered' });
    setTimeout(() => setActiveSOS(null), 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-full w-full pb-4 lg:pb-0">
      <div className="lg:col-span-8 flex flex-col gap-4 h-auto lg:h-full">
        <div className="bento-card p-6 sm:p-8 rounded-3xl shrink-0 bg-white/80">
           <h2 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">Global Broadcast Triggers (1-Click)</h2>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative">
              <button 
                onClick={() => triggerEmergency('MEDICAL')}
                className="bg-coral-light/30 hover:bg-coral-light/60 border-2 border-coral-dark/20 text-coral-dark p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all h-32 sm:h-48 relative overflow-hidden group shadow-sm hover:shadow-md"
              >
                  {activeSOS === 'MEDICAL' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 3 }} className="absolute inset-0 bg-coral rounded-full z-0 opacity-50"></motion.div>
                  )}
                   <Siren className="w-8 h-8 sm:w-12 sm:h-12 relative z-10 group-hover:scale-110 transition-transform" />
                   <span className="font-black text-lg sm:text-xl tracking-tight relative z-10 uppercase">Medical SOS</span>
              </button>
              
              <button 
                onClick={() => triggerEmergency('SECURITY')}
                className="bg-peach-light/30 hover:bg-peach-light/60 border-2 border-peach-dark/20 text-peach-dark p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all h-32 sm:h-48 relative overflow-hidden group shadow-sm hover:shadow-md"
              >
                 {activeSOS === 'SECURITY' && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 3 }} className="absolute inset-0 bg-peach opacity-50 rounded-full z-0"></motion.div>
                    )}
                   <ShieldAlert className="w-8 h-8 sm:w-12 sm:h-12 relative z-10 group-hover:scale-110 transition-transform" />
                   <span className="font-black text-lg sm:text-xl tracking-tight relative z-10 uppercase">Dispatch Guard</span>
              </button>

              <AnimatePresence>
                 {activeSOS && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border-2 border-coral-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-3 sm:gap-4 shadow-2xl z-20 w-max"
                    >
                       <Siren className="w-5 h-5 sm:w-6 sm:h-6 text-coral-dark animate-pulse shrink-0" />
                       <span className="text-[10px] sm:text-sm font-bold uppercase tracking-widest">Broadcast Locked: Teams En Route</span>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
          {submittedReport && (
            <SafetyAdvisor 
              incidentType={submittedReport.type}
              location={submittedReport.location}
              description={submittedReport.description}
              isTriggered={!!submittedReport}
            />
          )}

          <div className="bento-card p-6 md:p-8 rounded-3xl flex flex-col h-auto min-h-[300px] bg-white/60 relative overflow-hidden">
             <div className="flex justify-between items-center mb-6 z-10">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <UserRoundPlus className="w-4 h-4" /> Personnel Deployment Grid
                </h2>
                <span className="bg-white/80 px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-sm">Routing Net</span>
             </div>
             
             <div className="flex-1 bg-slate-50/50 border-2 border-white rounded-2xl relative overflow-hidden flex items-center justify-center shadow-inner z-10 min-h-[250px]">
                <div className="absolute inset-0 border-[20px] sm:border-[40px] border-periwinkle-light/20 rounded-[60px] sm:rounded-[100px] m-6 sm:m-10"></div>
                
                {[20, 45, 75].map((x, i) => (
                   <motion.div 
                     key={i} 
                     className="absolute w-5 h-5 sm:w-6 sm:h-6 bg-periwinkle-dark rounded-full shadow-[0_0_0_8px_rgba(99,102,241,0.2)] border-2 sm:border-4 border-white"
                     style={{ left: `${x}%`, top: `${30 + (i * 15)}%` }}
                     animate={{ y: [0, -10, 0] }}
                     transition={{ repeat: Infinity, duration: 2.5, delay: i }}
                   />
                ))}
                <div className="absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 text-slate-800">
                   <Navigation2 className="w-12 h-12 sm:w-20 sm:h-20 mb-4 stroke-1" />
                   <span className="text-base sm:text-xl font-black uppercase tracking-[0.2em]">Radar Active</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 bento-card p-6 sm:p-8 rounded-3xl flex flex-col h-auto lg:h-full bg-white/90 relative overflow-hidden">
        <form onSubmit={handleReport} className="flex-1 flex flex-col justify-between h-full relative z-10">
           <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 sm:pb-6">
                 <div className="w-10 h-10 rounded-xl bg-coral-dark flex items-center justify-center shadow-md">
                   <FileText className="w-5 h-5 text-white" />
                 </div>
                 <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Incident Log</h2>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Incident Category</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl outline-none focus:border-red-400 focus:bg-white transition-all text-sm sm:text-base font-bold shadow-inner"
                  required
                >
                  <option value="">Select Priority Level...</option>
                  <option value="medical">Medical Check (Low)</option>
                  <option value="medical-critical">Critical Med-Evac</option>
                  <option value="altercation">Security Intervention</option>
                  <option value="hazard">Environmental Flow Hazard</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Pinpoint Location</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl outline-none focus:border-red-400 focus:bg-white transition-all text-sm sm:text-base font-bold shadow-inner"
                  placeholder="e.g. Ramp B Level 2 Concourse"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col min-h-[120px] sm:min-h-[150px]">
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  className="w-full h-full bg-slate-50 border-2 border-slate-200 text-slate-800 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl outline-none focus:border-red-400 focus:bg-white transition-all text-sm sm:text-base font-medium shadow-inner resize-none block flex-1"
                  placeholder="Provide precise details for AI analysis..."
                />
              </div>
           </div>

           <button 
             type="submit"
             disabled={loading}
             className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 sm:py-5 rounded-2xl font-black transition-all shadow-xl disabled:opacity-70 flex justify-center items-center h-14 sm:h-16 shrink-0 text-base sm:text-lg uppercase mt-6"
           >
             {loading ? <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Commit to Intelligence'}
           </button>
        </form>

        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex items-center justify-center flex-col text-center p-8"
            >
              <div className="w-24 h-24 bg-mint rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)] border-4 border-white">
                 <CheckCircle2 className="w-12 h-12 text-mint-dark" />
              </div>
              <p className="font-black text-slate-900 text-3xl tracking-tight leading-tight mb-2">Report Logged Successfully</p>
              <p className="text-base text-slate-500 font-medium">Security nodes intercepting feed. AI Advisor analyzing.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-8 text-xs font-black uppercase tracking-widest text-periwinkle-dark hover:underline"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

