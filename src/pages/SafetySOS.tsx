import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, Siren, UserRoundPlus, Navigation2 } from 'lucide-react';

export default function SafetySOS() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeSOS, setActiveSOS] = useState<string | null>(null);
  const [formData, setFormData] = useState({ type: '', location: '', description: '' });

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ type: '', location: '', description: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 600);
  };

  const triggerEmergency = (type: string) => {
    setActiveSOS(type);
    setTimeout(() => setActiveSOS(null), 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full w-full">
      <div className="lg:col-span-8 flex flex-col gap-4 h-full">
        <div className="bento-card p-8 rounded-3xl shrink-0 bg-white/80">
           <h2 className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-widest">Global Broadcast Triggers (1-Click)</h2>
           
           <div className="grid grid-cols-2 gap-6 relative">
              <button 
                onClick={() => triggerEmergency('MEDICAL')}
                className="bg-coral-light/30 hover:bg-coral-light/60 border-2 border-coral-dark/20 text-coral-dark p-8 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all h-48 relative overflow-hidden group shadow-sm hover:shadow-md"
              >
                  {activeSOS === 'MEDICAL' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 3 }} className="absolute inset-0 bg-coral rounded-full z-0 opacity-50"></motion.div>
                  )}
                  <Siren className="w-12 h-12 relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="font-black text-xl tracking-tight relative z-10 uppercase">Medical SOS</span>
              </button>
              
              <button 
                onClick={() => triggerEmergency('SECURITY')}
                className="bg-peach-light/30 hover:bg-peach-light/60 border-2 border-peach-dark/20 text-peach-dark p-8 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all h-48 relative overflow-hidden group shadow-sm hover:shadow-md"
              >
                 {activeSOS === 'SECURITY' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 3 }} className="absolute inset-0 bg-peach opacity-50 rounded-full z-0"></motion.div>
                  )}
                  <ShieldAlert className="w-12 h-12 relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="font-black text-xl tracking-tight relative z-10 uppercase">Dispatch Guard</span>
              </button>

              <AnimatePresence>
                 {activeSOS && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border-2 border-coral-dark text-white px-8 py-4 rounded-full flex items-center gap-4 shadow-2xl z-20 w-max"
                    >
                       <Siren className="w-6 h-6 text-coral-dark animate-pulse shrink-0" />
                       <span className="text-sm font-bold uppercase tracking-widest">Broadcast Locked: Teams En Route</span>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>

        <div className="bento-card p-6 md:p-8 rounded-3xl flex flex-col flex-1 bg-white/60 relative overflow-hidden min-h-[300px]">
           <div className="flex justify-between items-center mb-6 z-10">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <UserRoundPlus className="w-4 h-4" /> Personnel Deployment Grid
              </h2>
              <span className="bg-white/80 px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-sm">Routing Net</span>
           </div>
           
           <div className="flex-1 bg-slate-50/50 border-2 border-white rounded-2xl relative overflow-hidden flex items-center justify-center shadow-inner z-10">
              <div className="absolute inset-0 border-[40px] border-periwinkle-light/20 rounded-[100px] m-10"></div>
              
              {[20, 45, 75].map((x, i) => (
                 <motion.div 
                   key={i} 
                   className="absolute w-6 h-6 bg-periwinkle-dark rounded-full shadow-[0_0_0_8px_rgba(99,102,241,0.2)] border-4 border-white"
                   style={{ left: `${x}%`, top: `${30 + (i * 15)}%` }}
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 2.5, delay: i }}
                 />
              ))}
              <div className="absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 text-slate-800">
                 <Navigation2 className="w-20 h-20 mb-4 stroke-1" />
                 <span className="text-xl font-black uppercase tracking-[0.2em]">Radar Active</span>
              </div>
           </div>
        </div>
      </div>

      <div className="lg:col-span-4 bento-card p-8 rounded-3xl flex flex-col h-full bg-white/90 relative overflow-hidden">
        <form onSubmit={handleReport} className="flex-1 flex flex-col justify-between h-full relative z-10">
           <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900 border-b border-slate-200 pb-6">Detailed Incident Report</h2>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Incident Category</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 px-5 py-4 rounded-2xl outline-none focus:border-red-400 focus:bg-white transition-all text-base font-bold shadow-inner"
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
                  className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 px-5 py-4 rounded-2xl outline-none focus:border-red-400 focus:bg-white transition-all text-base font-bold shadow-inner"
                  placeholder="e.g. Ramp B Level 2 Concourse"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col min-h-[150px]">
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full h-full bg-slate-50 border-2 border-slate-200 text-slate-800 px-5 py-4 rounded-2xl outline-none focus:border-red-400 focus:bg-white transition-all text-base font-medium shadow-inner resize-none block flex-1"
                  placeholder="Provide precise details to assist responding forces..."
                />
              </div>
           </div>

           <button 
             type="submit"
             disabled={loading}
             className="w-full bg-coral-dark hover:bg-coral-dark/90 text-white px-6 py-5 rounded-2xl font-black transition-all shadow-xl shadow-coral-dark/20 disabled:opacity-70 flex justify-center items-center h-16 shrink-0 text-lg uppercase mt-6"
           >
             {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Dispatch Intelligence'}
           </button>
        </form>

        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex items-center justify-center flex-col text-center"
            >
              <div className="w-24 h-24 bg-mint rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)] border-4 border-white">
                 <CheckCircle2 className="w-12 h-12 text-mint-dark" />
              </div>
              <p className="font-black text-slate-900 text-3xl tracking-tight">Report Logged</p>
              <p className="text-base text-slate-500 mt-2 font-medium">Security nodes intercepting feed.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
