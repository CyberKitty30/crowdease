import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ActivitySquare } from 'lucide-react';

export default function Zones() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const simulateLoad = (id: string) => {
    setLoadingId(id);
    setTimeout(() => setLoadingId(null), 500);
  };

  const zones = Array.from({length: 6}).map((_, i) => {
    const density = Math.floor(Math.random() * 100);
    const status = density > 85 ? 'CRITICAL' : density > 50 ? 'ELEVATED' : 'OPTIMAL';
    return {
      id: `SEC-0${i+1}`,
      status, 
      density,
      capacity: 5000 + Math.floor(Math.random() * 5000),
    };
  });

  return (
    <div className="flex flex-col min-h-full pb-10 gap-6">
      <header className="flex justify-between items-end border-b border-[#00f0ff]/30 pb-4">
        <div>
          <h1 className="text-3xl font-black uppercase text-[#00f0ff] tracking-widest neon-text">Density Heatmap</h1>
          <p className="text-slate-400 font-mono text-sm mt-1">SECTOR ISOLATION & TEMPERATURE MATRIX</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone, i) => (
          <motion.div 
            key={zone.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel p-6 rounded-lg border-t-2 relative overflow-hidden group ${zone.status === 'CRITICAL' ? 'border-[#ff003c]' : zone.status === 'ELEVATED' ? 'border-orange-500' : 'border-[#00ff66]'}`}
          >
             <div className="flex justify-between items-start mb-6 relative z-10">
                <h3 className="text-white font-mono text-xl font-bold tracking-widest flex items-center gap-2">
                   <ActivitySquare className={`w-5 h-5 ${zone.status === 'CRITICAL' ? 'text-[#ff003c]' : zone.status === 'ELEVATED' ? 'text-orange-500' : 'text-[#00ff66]'}`} />
                   {zone.id}
                </h3>
                <span className={`px-2 py-1 text-[10px] font-mono rounded font-bold border ${zone.status === 'CRITICAL' ? 'bg-[#ff003c]/20 text-[#ff003c] border-[#ff003c]/50 animate-pulse' : zone.status === 'ELEVATED' ? 'bg-orange-500/20 text-orange-500 border-orange-500/50' : 'bg-[#00ff66]/10 text-[#00ff66] border-[#00ff66]/50'}`}>
                  {zone.status}
                </span>
             </div>

             {/* Heatmap Visualization (Grid of Dots) */}
             <div className="w-full bg-slate-900/60 rounded-xl p-4 mb-4 border border-slate-700 relative overflow-hidden">
                <div className="grid grid-cols-10 gap-1.5 z-10 relative">
                   {Array.from({length: 40}).map((_, dotIdx) => {
                     // Probability of dot being active based on density
                     const isActive = (Math.random() * 100) < zone.density;
                     
                     let colorClass = 'bg-slate-700 opacity-20';
                     let animClass = '';
                     
                     if (isActive) {
                        if (zone.status === 'CRITICAL') {
                           colorClass = 'bg-[#ff003c] shadow-[0_0_5px_#ff003c]';
                           animClass = 'animate-ping';
                        } else if (zone.status === 'ELEVATED') {
                           colorClass = 'bg-orange-500 shadow-[0_0_5px_currentColor]';
                           animClass = 'animate-pulse';
                        } else {
                           colorClass = 'bg-[#00ff66] shadow-[0_0_5px_#00ff66]';
                        }
                     }

                     return (
                        <div key={dotIdx} className="relative">
                           <div className={`w-2 h-2 rounded-full ${colorClass} ${Math.random() > 0.5 ? animClass : ''}`} style={{ animationDuration: `${0.5 + Math.random()}s` }}></div>
                        </div>
                     )
                   })}
                </div>
                {/* Glow Overlay */}
                <div className={`absolute inset-0 opacity-10 filter blur-xl ${zone.status === 'CRITICAL' ? 'bg-[#ff003c]' : zone.status === 'ELEVATED' ? 'bg-orange-500' : 'bg-[#00ff66]'}`}></div>
             </div>

             <div className="flex justify-between items-center">
                 <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Avg Density</span>
                    <span className="text-xl font-black font-mono text-white">{zone.density}%</span>
                 </div>
                 <div className="flex flex-col text-right">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Net Capacity</span>
                    <span className="text-sm font-bold text-slate-300">{zone.capacity.toLocaleString()}</span>
                 </div>
             </div>

             <button 
                onClick={() => simulateLoad(zone.id)}
                className="w-full mt-6 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 py-2.5 rounded text-xs font-mono uppercase tracking-widest flex justify-center items-center gap-2 transition-all h-10"
             >
                {loadingId === zone.id ? (
                    <div className="w-4 h-4 border-2 border-t-[#00f0ff] border-r-transparent border-b-[#00f0ff] border-l-transparent rounded-full animate-spin"></div>
                ) : (
                    <>
                      <ZoomIn className="w-3 h-3 text-[#00f0ff]" />
                      Isolate Stream
                    </>
                )}
             </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
