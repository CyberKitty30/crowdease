import { motion } from 'framer-motion';
import { Crown, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function Upgrades() {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [upgradedSeat, setUpgradedSeat] = useState<string | null>(null);

  const [seats] = useState(() => {
    const grid: { id: string, status: string }[] = [];
    const rows = ['A', 'B', 'C', 'D'];
    for (let r = 0; r < rows.length; r++) {
      for (let c = 1; c <= 10; c++) {
        const id = `VIP ${rows[r]}${c}`;
        const isOccupied = Math.random() > 0.4;
        grid.push({ id, status: isOccupied ? 'occupied' : 'available' });
      }
    }
    return grid;
  });

  const handleSeatClick = (status: string, id: string) => {
    if (status === 'occupied') return;
    setSelectedSeat(selectedSeat === id ? null : id);
  };

  const processUpgrade = () => {
    if (!selectedSeat) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setUpgradedSeat(selectedSeat);
    }, 1500);
  };

  if (upgradedSeat) {
      return (
          <div className="flex flex-col items-center justify-center w-full h-full bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm p-8">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-mint-dark rounded-full flex items-center justify-center shadow-lg shadow-mint-dark/40 mb-6">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight">Upgrade Confirmed!</h2>
                  <p className="text-slate-500 mt-2 font-bold max-w-sm">You have successfully secured Suite <span className="text-mint-dark">{upgradedSeat}</span>. Your passport has been automatically updated.</p>
              </motion.div>
          </div>
      )
  }

  return (
    <div className="flex flex-col gap-4 w-full h-auto lg:h-full">
      <motion.div layout className="w-full h-full bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] shadow-sm flex flex-col max-h-full overflow-hidden">
        
        <div className="p-6 border-b border-slate-200/50 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
               <Crown className="w-6 h-6 text-amber-500" /> Executive Upgrades
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Select an available suite</p>
          </div>
        </div>

        <div className="p-8 flex-1 overflow-y-auto flex flex-col items-center justify-start">
           <div className="w-3/4 max-w-lg h-12 border-2 border-slate-200 border-b-0 rounded-t-full mb-12 flex items-center justify-center bg-gradient-to-t from-white to-transparent">
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Stage / Pitch</span>
           </div>

           <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-4 max-w-full">
             {seats.map((seat) => {
               const isSelected = selectedSeat === seat.id;
               return (
                 <button
                   key={seat.id}
                   onClick={() => handleSeatClick(seat.status, seat.id)}
                   disabled={seat.status === 'occupied'}
                   title={seat.status === 'occupied' ? 'Seat Occupied' : `Select ${seat.id}`}
                   className={`
                     w-8 h-8 lg:w-12 lg:h-12 rounded-lg transition-all duration-300 relative group
                     ${seat.status === 'occupied' ? 'bg-slate-200 cursor-not-allowed opacity-50' : ''}
                     ${seat.status === 'available' && !isSelected ? 'bg-mint-light hover:bg-mint border-2 border-mint-dark/20 hover:border-mint-dark hover:scale-110 cursor-pointer shadow-sm' : ''}
                     ${isSelected ? 'bg-amber-400 border-2 border-amber-600 scale-110 shadow-lg shadow-amber-500/40 z-10' : ''}
                   `}
                 >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                         <CheckCircle2 className="w-5 h-5 text-white" />
                      </span>
                    )}
                 </button>
               )
             })}
           </div>

           <div className="mt-12 flex gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-slate-100">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-200"></div> Occupied</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-mint-light border border-mint-dark/20"></div> Available</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-400"></div> Selected</span>
           </div>
        </div>

        <div className="p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 flex items-center justify-between">
            <div>
               {selectedSeat ? (
                 <>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upgrade Cost</p>
                   <h3 className="text-3xl font-black text-slate-800 tracking-tight flex items-baseline gap-1">
                      +$45<span className="text-sm text-slate-500 font-bold">.00</span>
                   </h3>
                 </>
               ) : (
                 <p className="text-sm font-bold text-slate-400">Please select an available suite on the map...</p>
               )}
            </div>

            <button
               onClick={processUpgrade}
               disabled={!selectedSeat || isProcessing}
               className={`
                 font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all border shadow-sm text-lg
                 ${selectedSeat && !isProcessing ? 'bg-slate-900 text-white hover:bg-black border-black hover:scale-105' : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'}
               `}
            >
               {isProcessing ? (
                 <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Authorizing...</>
               ) : (
                 <><ShieldCheck className="w-6 h-6" /> Confirm Upgrade</>
               )}
            </button>
        </div>
      </motion.div>
    </div>
  );
}
