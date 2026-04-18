import { AlertTriangle, AlertCircle, ShieldCheck, Navigation, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SafetyAgentProps {
  zoneAOcc: number;
  zoneBOcc: number;
}

export default function SafetyAgent({ zoneAOcc, zoneBOcc }: SafetyAgentProps) {
  const maxOcc = Math.max(zoneAOcc, zoneBOcc);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  
  let status = 'NORMAL';
  if (maxOcc > 85) status = 'CRITICAL';
  else if (maxOcc >= 70) status = 'WARNING';

  let config: {
    color: string;
    bg: string;
    icon: React.ReactNode;
    title: string;
    message: string;
    gradient: string;
    action: React.ReactNode;
  } = {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50/20 border-white/20',
    icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
    title: 'AGENT: SYSTEM OPTIMAL',
    message: 'Global flow indices are balanced. No rerouting action plans are currently necessary.',
    gradient: 'from-emerald-300/10 to-white/30',
    action: null
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
      setTimeout(() => setSynced(false), 3000);
    }, 1500);
  };

  if (status === 'CRITICAL') {
    const criticalZone = zoneAOcc > 85 ? 'Zone A' : 'Zone B';
    config = {
      color: 'text-rose-700',
      bg: 'bg-rose-50/20 border-white/20',
      icon: <AlertTriangle className="w-8 h-8 text-rose-600 animate-pulse" />,
      title: 'AGENT: CRITICAL SURGE',
      message: `Detected surge in ${criticalZone} (${maxOcc}%). I have calculated a 'Ghost Route' through Section 4 to save 8 mins.`,
      gradient: 'from-rose-400/20 to-white/40',
      action: (
        <button 
          onClick={handleSync}
          disabled={syncing || synced}
          className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm ${synced ? 'bg-mint-dark text-white border-mint-dark shadow-mint/50' : 'bg-rose-600 text-white hover:bg-rose-700 border-rose-600 shadow-rose-600/30'} disabled:opacity-50`}
          aria-label="Sync Ghost Route Action Plan"
        >
          {syncing ? (
             <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Syncing...</>
          ) : synced ? (
             <><ShieldCheck className="w-4 h-4" /> Route Synced!</>
          ) : (
             <><Navigation className="w-4 h-4" /> Sync Ghost Route</>
          )}
        </button>
      )
    };
  } else if (status === 'WARNING') {
    const warningZone = zoneAOcc >= 70 ? 'Zone A' : 'Zone B';
    config = {
      color: 'text-amber-700',
      bg: 'bg-amber-50/20 border-white/20',
      icon: <AlertCircle className="w-8 h-8 text-amber-600" />,
      title: 'AGENT: WARNING',
      message: `Moderate congestion developing in ${warningZone} (${maxOcc}%). I can autonomously divert 15% of inbound traffic via dynamic digital signage.`,
      gradient: 'from-amber-300/20 to-white/40',
      action: (
        <button 
          onClick={handleSync}
          disabled={syncing || synced}
          className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm ${synced ? 'bg-mint-dark text-white border-mint-dark shadow-mint/50' : 'bg-amber-500 text-white hover:bg-amber-600 border-amber-500 shadow-amber-500/30'} disabled:opacity-50`}
          aria-label="Authorize Signage Update Action Plan"
        >
           {syncing ? (
             <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Connecting...</>
          ) : synced ? (
             <><ShieldCheck className="w-4 h-4" /> Signage Updated!</>
          ) : (
             <><Radio className="w-4 h-4" /> Authorize Deflection</>
          )}
        </button>
      )
    };
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl p-6 flex flex-col justify-between h-full bg-gradient-to-br ${config.gradient} border ${config.bg} backdrop-blur-md shadow-lg relative overflow-hidden`}
      aria-live="polite"
      role="status"
    >
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/40 backdrop-blur-xl shadow-sm border border-white/50">
          {config.icon}
        </div>
        <div>
          <h3 className={`font-black tracking-tight text-lg drop-shadow-sm ${config.color}`}>{config.title}</h3>
          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest bg-white/30 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm border border-white/50">Agentic AI Core</span>
        </div>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col justify-center items-start">
        <p className="text-sm font-bold text-slate-800 leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
          {config.message}
        </p>
        {config.action}
      </div>
      
      {/* Decorative glass elements */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/30 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl z-0 pointer-events-none"></div>
    </motion.div>
  );
}
