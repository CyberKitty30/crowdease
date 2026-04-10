import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertCircle, ArrowUpRight, BarChart3, ArrowDownRight } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      {/* 4 Mini Cards Top */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <motion.div layout className="bento-card rounded-3xl p-6 flex flex-col justify-between h-32 lg:h-40">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
             <Users className="w-4 h-4" /> Total Attendance
          </p>
          <div className="flex justify-between items-end">
            <h3 className="text-4xl font-black text-slate-800 tracking-tighter">42.8k</h3>
            <span className="text-xs font-bold text-mint-dark flex items-center bg-mint/30 px-2 py-1 rounded-full shadow-sm"><ArrowUpRight className="w-3 h-3 mr-1" /> 5%</span>
          </div>
        </motion.div>

        <motion.div layout className="bento-card rounded-3xl p-6 flex flex-col justify-between h-32 lg:h-40">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
             <TrendingUp className="w-4 h-4" /> Peak Flow
          </p>
          <div className="flex justify-between items-end">
            <h3 className="text-4xl font-black text-slate-800 tracking-tighter">8.4k<span className="text-base text-slate-400">/hr</span></h3>
            <span className="text-xs font-bold text-peach-dark flex items-center bg-peach/30 px-2 py-1 rounded-full shadow-sm"><ArrowUpRight className="w-3 h-3 mr-1" /> 12%</span>
          </div>
        </motion.div>

        <motion.div layout className="bento-card rounded-3xl p-6 flex flex-col justify-between h-32 lg:h-40">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
             <AlertCircle className="w-4 h-4" /> Entry Speed
          </p>
          <div className="flex justify-between items-end">
            <h3 className="text-4xl font-black text-slate-800 tracking-tighter">1.2<span className="text-base text-slate-400">s</span></h3>
            <span className="text-xs font-bold text-mint-dark flex items-center bg-mint/30 px-2 py-1 rounded-full shadow-sm"><ArrowDownRight className="w-3 h-3 mr-1" /> 2%</span>
          </div>
        </motion.div>

        <motion.div layout className="bento-card rounded-3xl p-6 flex flex-col justify-between h-32 lg:h-40 bg-slate-800 text-white border-slate-700 shadow-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
             <Users className="w-4 h-4" /> Staff Active
          </p>
          <div className="flex justify-between items-end">
            <h3 className="text-4xl font-black text-white tracking-tighter">342</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 bg-slate-700 rounded-full">Optimal</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        <motion.div layout className="lg:col-span-8 bento-card rounded-3xl p-6 flex flex-col h-full relative overflow-hidden bg-white/70">
          <div className="flex items-center justify-between mb-8 relative z-10 shrink-0">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
               <BarChart3 className="w-6 h-6 text-periwinkle-dark" /> Flow Progression Map
            </h3>
            <span className="text-xs font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">Last 6 Hours</span>
          </div>
          
          <div className="flex-1 flex items-end gap-4 pb-2 relative border-b border-slate-200 z-10 min-h-0 w-full">
             <div className="absolute top-1/4 w-full border-t border-dashed border-slate-300 z-0"></div>
             
             {[30, 45, 60, 85, 75, 40, 50, 70, 90, 80, 50, 30].map((val, i) => (
               <div key={i} className="flex-1 flex flex-col justify-end group z-10 h-full w-full">
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${val}%` }}
                   transition={{ duration: 0.5, delay: i * 0.05 }}
                   className={`w-full rounded-t-2xl transition-all duration-300 ${val > 80 ? 'bg-gradient-to-t from-peach-dark to-peach shadow-md' : 'bg-gradient-to-t from-periwinkle-dark to-periwinkle shadow-md'}`}
                 ></motion.div>
               </div>
             ))}
          </div>
        </motion.div>

        <motion.div layout className="lg:col-span-4 bento-card rounded-3xl p-8 flex flex-col justify-center items-center relative overflow-hidden bg-white/80 h-full">
           <div className="absolute -right-20 -top-20 w-80 h-80 bg-periwinkle blur-3xl opacity-40 rounded-full pointer-events-none"></div>
           
           <h3 className="text-slate-800 font-bold mb-4 z-10 text-xl text-center">Predictive Index Tracker</h3>
           <p className="text-slate-500 text-sm text-center max-w-sm mb-12 z-10 flex-1">Advanced machine learning identifies high-traffic anomalies precisely before they happen globally.</p>
           
           <div className="w-64 h-64 rounded-full border-[12px] border-slate-100 flex flex-col items-center justify-center relative shadow-inner z-10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] mx-auto shrink-0">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="116" cy="116" r="104" fill="none" stroke="#6366f1" strokeWidth="24" strokeDasharray="653" strokeDashoffset={653 - (653 * 0.72)} strokeLinecap="round" className="drop-shadow-md" />
              </svg>
              <h2 className="text-6xl font-black text-slate-800 tracking-tighter mt-2">72%</h2>
              <p className="text-xs font-bold text-slate-400 uppercase mt-2 tracking-widest">Efficiency</p>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
