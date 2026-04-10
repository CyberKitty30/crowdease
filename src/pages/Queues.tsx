import { useState, useEffect } from 'react';
import { Clock, Navigation, CheckCircle2 } from 'lucide-react';

export default function Queues() {
  const [secondsLeft, setSecondsLeft] = useState(482);
  const [loading, setLoading] = useState(false);
  const [upgraded, setUpgraded] = useState(false);

  useEffect(() => {
    const int = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(int);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const queues = [
    { name: 'North Restrooms', time: 2, status: 'safe' },
    { name: 'East Merch Stand', time: 8, status: 'warning' },
    { name: 'Main Concession', time: 18, status: 'danger' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full w-full">
      <div className="bento-card p-8 rounded-3xl flex flex-col relative overflow-hidden bg-white/80 h-full w-full justify-center items-center shadow-lg">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 z-0"></div>
         <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10 w-[calc(100%-4rem)] max-w-full">
            <span className="bg-periwinkle-light text-periwinkle-dark px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-periwinkle">In Progress</span>
            <span className="text-slate-500 text-sm font-semibold truncate ml-4">East Merch Stand</span>
         </div>
         
         <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] max-w-full rounded-full border-[16px] xl:border-[24px] border-slate-100 flex flex-col items-center justify-center relative z-10 bg-white shadow-[0_10px_50px_rgba(0,0,0,0.05)] mt-12 mb-auto shrink-0">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="50%" cy="50%" r="calc(50% - 12px)" fill="none" stroke="#6366f1" strokeWidth="24" strokeDasharray="1000" strokeDashoffset={1000 - (1000 * (secondsLeft / 600))} className="transition-all duration-1000 ease-linear drop-shadow-md" />
            </svg>
            <h2 className="text-6xl sm:text-8xl font-black text-slate-800 font-mono tracking-tighter drop-shadow-sm">{formatTime(secondsLeft)}</h2>
            <p className="text-sm sm:text-base text-slate-400 font-bold uppercase mt-2 tracking-widest">Est. Wait</p>
         </div>

         <p className="text-center text-slate-500 text-base z-10 mt-8 font-medium">
            You are currently <strong className="text-slate-800 font-black">#14</strong> in line. Stay nearby to receive ping.
         </p>
      </div>

      <div className="flex flex-col gap-4 h-full w-full min-h-0">
        <div className="bento-card rounded-3xl p-8 flex-1 flex flex-col min-h-0 justify-center">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-8">
             <Clock className="w-5 h-5 text-periwinkle-dark" /> Global Facility Flow
          </h3>
          <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {queues.map((q, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between text-base font-bold text-slate-700">
                   <span>{q.name}</span>
                   <span className="text-slate-900 bg-slate-50 px-3 py-1 rounded-full shadow-sm border border-slate-100">{q.time} min</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                   <div 
                     className={`h-full rounded-full ${q.status === 'danger' ? 'bg-gradient-to-r from-coral to-coral-dark' : q.status === 'warning' ? 'bg-gradient-to-r from-peach to-peach-dark' : 'bg-gradient-to-r from-mint to-mint-dark'}`} 
                     style={{ width: `${Math.min(100, (q.time / 20) * 100)}%` }}
                   ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bento-card rounded-3xl overflow-hidden relative shrink-0">
           <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-periwinkle to-periwinkle-dark shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
           <div className="p-8 pb-8">
              <h3 className="font-black text-slate-900 text-xl mb-2">Priority Seat Upgrade</h3>
              <p className="text-base text-slate-500 mb-6 font-medium">Instantly fast-track your experience or bump up your seating tier globally.</p>
              
              <button 
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => { setLoading(false); setUpgraded(true); setTimeout(() => setUpgraded(false), 3000); }, 600);
                }}
                disabled={loading || upgraded}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg shadow-lg border border-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                 {loading ? <div className="w-6 h-6 border-4 border-slate-600 border-t-white rounded-full animate-spin"></div> : upgraded ? <><CheckCircle2 className="w-6 h-6 text-mint-dark" /> Priority Assigned</> : <><Navigation className="w-5 h-5" /> Execute Priority Sequence</>}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
