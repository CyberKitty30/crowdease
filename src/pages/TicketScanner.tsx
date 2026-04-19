import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, CheckCircle2, XCircle, ScanFace } from 'lucide-react';

export default function TicketScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [ticketId, setTicketId] = useState('');

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId) return;

    setScanning(true);
    setResult(null);

    setTimeout(() => {
      setScanning(false);
      setResult(ticketId.toUpperCase().includes('V') ? 'success' : 'error');
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-full w-full pb-4 lg:pb-0">
      <div className="lg:col-span-8 flex flex-col bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl h-auto min-h-[400px] lg:h-full border border-slate-800">
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-2 sm:gap-3 bg-black/50 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10">
          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-rose-500 animate-pulse"></div>
          <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest">Live Node Alpha</span>
        </div>
        
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <ScanFace className="w-4 h-4 text-blue-300 animate-pulse" />
          <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest drop-shadow-sm hidden sm:inline-block">Google Cloud Vision</span>
          <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest drop-shadow-sm sm:hidden">Cloud Vision</span>
        </div>
        
        <div className="flex-1 relative flex items-center justify-center p-6 sm:p-8">
          <div className="absolute inset-0 bg-slate-950/80 z-0"></div>
          
          <div className="relative z-10 w-full max-w-[280px] sm:max-w-lg aspect-square border-4 border-slate-700/50 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl border-dashed">
            <div className="absolute inset-0 border-4 border-periwinkle-light opacity-0 transition-opacity duration-300"></div>
            
            <div className="absolute w-[80%] h-[80%] border-2 border-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
               <div className="w-8 sm:w-16 h-8 sm:h-16 border-t-4 border-l-4 border-white absolute top-0 left-0 rounded-tl-lg sm:rounded-tl-xl"></div>
               <div className="w-8 sm:w-16 h-8 sm:h-16 border-t-4 border-r-4 border-white absolute top-0 right-0 rounded-tr-lg sm:rounded-tr-xl"></div>
               <div className="w-8 sm:w-16 h-8 sm:h-16 border-b-4 border-l-4 border-white absolute bottom-0 left-0 rounded-bl-lg sm:rounded-bl-xl"></div>
               <div className="w-8 sm:w-16 h-8 sm:h-16 border-b-4 border-r-4 border-white absolute bottom-0 right-0 rounded-br-lg sm:rounded-br-xl"></div>
            </div>

            <motion.div 
               animate={{ top: ['0%', '100%', '0%'] }} 
               transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
               className="absolute w-full h-1 bg-rose-500/80 shadow-[0_0_20px_rgba(244,63,94,0.8)] z-20"
            ></motion.div>
            
            <ScanLine className="w-16 sm:w-32 h-16 sm:h-32 text-slate-600 opacity-20" />
          </div>
        </div>

        <div className="bg-black/80 backdrop-blur-xl p-6 sm:p-8 shrink-0 flex items-center justify-between border-t border-white/10">
           <div>
              <p className="text-white text-lg sm:text-xl font-bold">Awaiting Barcode</p>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Hold device steady within frame.</p>
           </div>
           <div className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-[10px] sm:text-sm font-bold uppercase tracking-widest ${scanning ? 'bg-periwinkle border-periwinkle text-slate-900 border' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
              {scanning ? 'Validating...' : 'Ready'}
           </div>
        </div>

        <AnimatePresence>
           {result === 'success' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-mint-dark/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
                <CheckCircle2 className="w-20 sm:w-32 h-20 sm:h-32 text-white mb-4 sm:mb-6 drop-shadow-md" />
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">Access Granted</h2>
                <p className="text-mint-light mt-2 sm:mt-4 text-base sm:text-xl font-medium">Clear for Premium Entry</p>
             </motion.div>
           )}
           {result === 'error' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-coral-dark/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
                <XCircle className="w-20 sm:w-32 h-20 sm:h-32 text-white mb-4 sm:mb-6 drop-shadow-md" />
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">Access Denied</h2>
                <p className="text-coral-light mt-2 sm:mt-4 text-base sm:text-xl font-medium">Invalid or Expired ID</p>
             </motion.div>
           )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-4 bento-card p-6 sm:p-8 rounded-3xl flex flex-col h-auto lg:h-full bg-white/80">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">Manual Override</h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-10 border-b border-slate-200 pb-4 sm:pb-6">Enter ticket string explicitly if the optical scanner fails to read cleanly.</p>

        <form onSubmit={handleValidate} className="flex-1 flex flex-col">
          <div className="flex-1">
             <label className="block text-[10px] sm:text-xs font-bold text-slate-500 mb-2 sm:mb-3 uppercase tracking-widest">Input Key (Must contain 'V' to pass simulation)</label>
             <input 
               type="text" 
               value={ticketId}
               onChange={(e) => setTicketId(e.target.value)}
               placeholder="TKT-XXXX-VX"
               className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-xl sm:text-3xl font-mono px-4 sm:px-6 py-4 sm:py-6 rounded-2xl outline-none focus:border-periwinkle-dark transition-all placeholder:text-slate-300 font-bold shadow-inner"
             />
          </div>

          <button 
            type="submit"
            disabled={scanning || !ticketId}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 sm:py-6 rounded-2xl font-bold transition-all disabled:opacity-50 text-base sm:text-lg shadow-xl shrink-0 mt-6"
          >
            {scanning ? 'Processing Network...' : 'Force Validation'}
          </button>
        </form>
      </div>
    </div>
  );
}
