import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, Clock, Ticket as TicketIcon, Lightbulb, Zap, CloudLightning, ActivitySquare, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState({
     zone2Occ: 35,
     latency: 12,
  });

  useEffect(() => {
    const int = setInterval(() => {
      setData(prev => ({
         ...prev,
         zone2Occ: Math.floor(Math.random() * 20) + 25,
         latency: 10 + Math.floor(Math.random() * 10)
      }));
    }, 4000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-4 w-full h-auto lg:h-full pb-4 lg:pb-0">
      {/* ----------------- ROW 1 ----------------- */}
      <motion.div layout className="lg:col-span-3 flex flex-col gap-4 h-auto lg:h-full">
         <div className="bento-card rounded-3xl p-6 flex-1 flex flex-col justify-between min-h-[160px] lg:h-full">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
               <Clock className="w-5 h-5 text-periwinkle-dark" />
               <span className="text-sm font-bold">Fastest Line</span>
            </div>
            <div className="flex-1 flex flex-col justify-end">
               <h3 className="text-5xl 2xl:text-6xl font-black text-slate-800 tracking-tighter">2<span className="text-2xl text-slate-500">m</span></h3>
               <p className="text-xs font-semibold text-mint-dark mt-1 flex items-center gap-1">North Restrooms</p>
            </div>
         </div>

         <div className="bento-card rounded-3xl p-6 flex justify-between items-center bg-gradient-to-tr from-periwinkle-dark to-periwinkle text-white border-transparent shadow-[0_0_20px_rgba(99,102,241,0.2)] h-32 shrink-0">
            <div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-periwinkle-light mb-1">System Latency</p>
               <h3 className="text-3xl font-black">{data.latency}ms</h3>
            </div>
            <ActivitySquare className="w-10 h-10 text-periwinkle-light opacity-50 animate-pulse" />
         </div>
      </motion.div>

      <motion.div layout className="lg:col-span-6 bento-card rounded-3xl p-6 flex flex-col h-auto min-h-[400px] lg:h-full relative overflow-hidden">
         <div className="flex justify-between items-center z-10 relative mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <Map className="w-5 h-5 text-periwinkle-dark" /> Live Crowd Heatmap
            </h3>
            <span className="text-[10px] font-bold bg-mint/50 text-mint-dark px-3 py-1 rounded-full uppercase tracking-wider animate-pulse border border-mint backdrop-blur-md">Live Tracking</span>
         </div>
         
         <div className="flex-1 w-full bg-white/50 rounded-2xl relative overflow-hidden flex items-center justify-center border border-white p-4 shadow-inner">
            <svg viewBox="0 0 400 400" className="w-full h-full max-h-full max-w-full overflow-visible drop-shadow-md">
               {/* Center Pitch */}
               <rect x="140" y="100" width="120" height="200" rx="20" fill="rgba(16, 185, 129, 0.05)" stroke="#10b981" strokeWidth="2" strokeDasharray="6,6" />
               <circle cx="200" cy="200" r="30" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="6,6" opacity="0.5" />
               <line x1="140" y1="200" x2="260" y2="200" stroke="#10b981" strokeWidth="2" strokeDasharray="6,6" opacity="0.5" />
               
               {/* Zone A (West) */}
               <motion.path initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
                  d="M 40 80 Q 80 80 120 100 L 120 300 Q 80 320 40 320 Z" 
                  fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth="3" 
               />
               <text x="70" y="200" fill="#6366f1" fontSize="22" fontWeight="900" textAnchor="middle" transform="rotate(-90 70,200)">ZONE A</text>
               <text x="95" y="200" fill="#6366f1" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90 95,200)">WEST STAND</text>

               {/* Zone B (East) */}
               <motion.path initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                  d="M 360 80 Q 320 80 280 100 L 280 300 Q 320 320 360 320 Z" 
                  fill={data.zone2Occ > 40 ? "rgba(251, 146, 60, 0.2)" : "rgba(16, 185, 129, 0.2)"} 
                  stroke={data.zone2Occ > 40 ? "#f97316" : "#10b981"} strokeWidth="3" 
               />
               <text x="330" y="200" fill={data.zone2Occ > 40 ? "#f97316" : "#10b981"} fontSize="22" fontWeight="900" textAnchor="middle" transform="rotate(90 330,200)">ZONE B</text>
               <text x="305" y="200" fill={data.zone2Occ > 40 ? "#f97316" : "#10b981"} fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(90 305,200)">EAST STAND</text>

               {/* North Gate */}
               <motion.path initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  d="M 120 80 Q 200 40 280 80 L 260 90 Q 200 60 140 90 Z" 
                  fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" strokeWidth="3" 
               />
               <text x="200" y="50" fill="#f43f5e" fontSize="16" fontWeight="900" textAnchor="middle">NORTH GATE</text>

               {/* VIP South */}
               <motion.path initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  d="M 120 320 Q 200 360 280 320 L 260 310 Q 200 340 140 310 Z" 
                  fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" strokeWidth="3" 
               />
               <text x="200" y="365" fill="#6366f1" fontSize="16" fontWeight="900" textAnchor="middle">SOUTHERN VIP</text>

               {/* Live Pulses */}
               <circle cx="80" cy="150" r="10" fill="#6366f1" className="animate-pulse" />
               <circle cx="320" cy="240" r="14" fill={data.zone2Occ > 40 ? "#f97316" : "#10b981"} className="animate-ping" opacity="0.75" />
               <circle cx="200" cy="70" r="8" fill="#f43f5e" className="animate-pulse" />
               
            </svg>
         </div>
      </motion.div>

      <motion.div layout className="lg:col-span-3 flex flex-col gap-4 h-auto lg:h-full">
         <div className="bento-card rounded-3xl p-6 flex-1 flex flex-col justify-center bg-gradient-to-br from-mint-light/80 to-white/60 min-h-[160px] lg:h-full border-mint/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-mint-dark" />
               </div>
               <span className="text-sm font-bold text-slate-800">AI Insight</span>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
               Zone 2 is highly peaceful (<strong className="text-mint-dark">{data.zone2Occ}% Cap</strong>). Reroute there for shorter concession lines.
            </p>
         </div>

         <div className="bento-card rounded-3xl p-6 flex items-center justify-between h-32 shrink-0">
            <div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Gate 4 Status</p>
               <h3 className="text-xl font-black text-slate-800">Clear Flow</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-mint/20 border border-mint flex items-center justify-center">
               <CheckCircle2 className="w-6 h-6 text-mint-dark" />
            </div>
         </div>
      </motion.div>


      {/* ----------------- ROW 2 ----------------- */}
      <motion.div layout className="lg:col-span-4 bento-card rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between h-auto min-h-[200px] lg:h-full bg-white/70">
         <div className="flex items-center gap-2 mb-auto z-10 relative">
            <TicketIcon className="w-6 h-6 text-periwinkle-dark" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">My Passport</h3>
         </div>
         <div className="flex items-end justify-between relative z-10 w-full mt-4">
            <div className="flex-1 flex flex-col justify-end">
               <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">TKT-9481</h2>
               <div className="mt-4 flex gap-6">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">City</p>
                    <p className="text-base text-slate-700 font-bold">Los Angeles</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Seat</p>
                    <p className="text-base text-slate-700 font-bold">Sec 104, R G</p>
                  </div>
               </div>
            </div>
            <div className="w-16 h-16 bg-periwinkle-light rounded-xl flex items-center justify-center border border-periwinkle shadow-inner">
               <Zap className="w-8 h-8 text-periwinkle-dark" />
            </div>
         </div>
         <TicketIcon className="absolute -right-5 -bottom-5 w-64 h-64 text-periwinkle-dark/5 rotate-12 pointer-events-none" />
      </motion.div>

      <motion.div layout className="lg:col-span-8 bento-card rounded-3xl p-6 flex flex-col justify-center h-auto min-h-[250px] lg:h-full bg-white/50 backdrop-blur-3xl">
         <div className="flex items-start justify-between h-full flex-col w-full">
            <div className="w-full flex justify-between items-start mb-6">
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <CloudLightning className="w-5 h-5 text-periwinkle-dark" /> 24hr Environmental Sparkline
               </h3>
               <span className="text-3xl font-black text-slate-800">72°</span>
            </div>
            
            <div className="flex-1 w-full flex items-end gap-2 px-2 border-b border-slate-200 pb-2 relative">
               <div className="absolute top-1/2 w-full border-t border-dashed border-slate-300 z-0 opacity-50"></div>
               {[20, 30, 45, 60, 55, 65, 80, 75, 40, 30, 20, 15, 30, 50, 70, 90, 85].map((val, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }} 
                    animate={{ height: `${val}%` }} 
                    transition={{ delay: i * 0.03 }}
                    className={`flex-1 rounded-t-lg z-10 shadow-sm ${val > 70 ? 'bg-gradient-to-t from-peach-dark to-peach' : 'bg-gradient-to-t from-periwinkle-dark to-periwinkle'}`}
                  ></motion.div>
               ))}
            </div>
         </div>
      </motion.div>
      
    </div>
  );
}
