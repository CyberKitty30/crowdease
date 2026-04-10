import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, CheckCircle2, Map as MapIcon } from 'lucide-react';

export default function Navigation() {
  const [loading, setLoading] = useState(false);
  const [synced, setSynced] = useState(false);
  const [groupCode, setGroupCode] = useState('');

  const handleSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupCode.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSynced(true);
      setTimeout(() => setSynced(false), 3000);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full w-full">
      <div className="lg:col-span-4 bento-card p-8 rounded-3xl flex flex-col items-center relative overflow-hidden h-full">
         <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-periwinkle to-periwinkle-dark flex items-center justify-center mb-8 shadow-lg shrink-0 mt-8">
            <Users className="w-10 h-10 text-white" />
         </div>
         <h2 className="text-2xl font-black text-slate-800 mb-2">Group Link</h2>
         <p className="text-slate-500 text-sm md:text-base text-center mb-12 flex-1">Enter your 6-Digit Group Code to dynamically pair your geolocations locally.</p>
         
         <form onSubmit={handleSync} className="w-full flex flex-col gap-6 shrink-0 mb-8">
            <input 
              type="text" 
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="w-full bg-white/70 border border-slate-200 text-slate-800 text-center text-4xl tracking-[0.4em] px-4 py-8 rounded-2xl outline-none focus:border-periwinkle-dark transition-all placeholder:text-slate-300 font-black shadow-inner"
              placeholder="000000"
            />
            <button 
              type="submit"
              disabled={loading || groupCode.length < 6 || synced}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-6 rounded-2xl font-bold transition-colors shadow-lg disabled:opacity-70 flex items-center justify-center text-lg"
            >
               {loading ? <div className="w-6 h-6 border-4 border-slate-600 border-t-white rounded-full animate-spin"></div> : 'Establish Feed'}
            </button>
         </form>

         <AnimatePresence>
           {synced && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="absolute inset-0 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center z-10 p-8 text-center"
             >
               <div className="w-24 h-24 rounded-full bg-mint flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                 <CheckCircle2 className="w-12 h-12 text-mint-dark" />
               </div>
               <p className="font-black text-slate-900 text-3xl tracking-tight">Sync Established</p>
               <p className="text-slate-500 text-lg mt-3 font-medium">Resolving real-time matrix.</p>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      <div className="lg:col-span-8 bento-card p-6 rounded-3xl flex flex-col h-full bg-slate-900 relative overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-periwinkle-dark/40 via-slate-900 to-slate-900"></div>
         <div className="flex items-center justify-between mb-4 z-10 shrink-0">
            <h3 className="font-bold text-white flex items-center gap-2 text-lg">
               <MapIcon className="w-5 h-5 text-periwinkle" /> Interactive GPS Tracker
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-mint bg-mint-dark/20 px-3 py-1.5 rounded-full border border-mint-dark animate-pulse shadow-sm">Sat-Link Active</span>
         </div>
         
         <div className="flex-1 border border-slate-700 rounded-2xl relative flex items-center justify-center overflow-hidden bg-slate-950 z-10">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            
            <div className="w-80 h-[500px] max-h-full border-4 border-slate-800 rounded-[120px] absolute mix-blend-screen opacity-50 flex items-center justify-center shadow-inner">
               <div className="w-64 h-[400px] border-2 border-slate-800 rounded-[100px]"></div>
               <div className="w-full h-[2px] bg-slate-800 absolute top-1/2 -translate-y-1/2"></div>
            </div>

            {groupCode.length === 6 ? (
               <>
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-1/4 left-1/3 flex flex-col items-center group cursor-pointer">
                   <div className="w-6 h-6 bg-periwinkle rounded-full shadow-[0_0_30px_rgba(165,180,252,0.8)] relative z-20 border-4 border-white"></div>
                   <div className="absolute w-16 h-16 bg-periwinkle/30 rounded-full animate-ping top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"></div>
                   <span className="mt-3 bg-white px-3 py-1.5 rounded-full text-[10px] font-black text-slate-900 shadow-xl border-2 border-periwinkle">Friend 1 (Emma)</span>
                 </motion.div>

                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="absolute bottom-1/3 right-1/4 flex flex-col items-center group cursor-pointer z-20">
                   <div className="w-6 h-6 bg-peach rounded-full shadow-[0_0_30px_rgba(253,186,116,0.8)] relative z-20 border-4 border-white"></div>
                   <div className="absolute w-16 h-16 bg-peach/30 rounded-full animate-ping top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"></div>
                   <span className="mt-3 bg-white px-3 py-1.5 rounded-full text-[10px] font-black text-slate-900 shadow-xl border-2 border-peach">Friend 2 (Liam)</span>
                 </motion.div>

                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0 }} className="absolute bottom-[10%] left-1/2 flex flex-col items-center group cursor-pointer z-30">
                   <div className="w-8 h-8 bg-mint border-4 border-white rounded-full shadow-[0_0_40px_rgba(110,231,183,0.8)] relative z-20"></div>
                   <div className="absolute w-20 h-20 bg-mint/30 rounded-full animate-ping top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"></div>
                   <span className="mt-3 bg-white text-slate-900 border-2 border-mint px-4 py-2 rounded-full text-xs font-black shadow-xl">You</span>
                 </motion.div>
                 
                 <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0">
                    <path d="M 200,200 L 400,350 L 300,500" stroke="#fff" strokeWidth="3" strokeDasharray="10,10" fill="none" />
                 </svg>
               </>
            ) : (
               <div className="absolute flex flex-col items-center justify-center text-slate-600 opacity-60">
                 <MapIcon className="w-16 h-16 mb-4" />
                 <p className="text-sm font-bold uppercase tracking-widest">Awaiting Valid Input Feed</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
