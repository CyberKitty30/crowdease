import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCrowdLogic } from '../hooks/useCrowdLogic';
import SafetyAgent from '../components/SafetyAgent';
import {
  Map, Clock, Ticket as TicketIcon, CloudLightning,
  ActivitySquare, CheckCircle2, Crown, Cloud
} from 'lucide-react';

export default function Dashboard() {
  const data = useCrowdLogic();
  const navigate = useNavigate();
  const [currentSeat] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.currentSeat) {
            return user.currentSeat;
        }
    }
    return 'Sec 104, R G';
  });

  const isUpgraded = currentSeat !== 'Sec 104, R G';
  
  // Logic for heatmap colors
  const zoneAColor = data.zoneAOcc > 85 ? '#be123c' : data.zoneAOcc >= 70 ? '#b45309' : '#047857';
  const zoneBColor = data.zoneBOcc > 85 ? '#be123c' : data.zoneBOcc >= 70 ? '#b45309' : '#047857';
  const zoneAFill  = data.zoneAOcc > 85 ? 'rgba(225,29,72,0.25)' : data.zoneAOcc >= 70 ? 'rgba(217,119,6,0.25)' : 'rgba(4,120,87,0.25)';
  const zoneBFill  = data.zoneBOcc > 85 ? 'rgba(225,29,72,0.25)' : data.zoneBOcc >= 70 ? 'rgba(217,119,6,0.25)' : 'rgba(4,120,87,0.25)';

  return (
    <div className="flex flex-col gap-3 pb-4 lg:pb-0 lg:h-full">

      {/* ══ ROW 1: Stats / Heatmap / Safety Agent ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:flex-1 lg:min-h-0 lg:overflow-hidden">

        {/* Left stats column */}
        <div className="lg:col-span-3 flex flex-col gap-3 lg:h-full lg:overflow-hidden">
          {/* Fastest Line */}
          <div className="bento-card rounded-3xl p-5 flex flex-col justify-between min-h-[150px] lg:min-h-0 lg:flex-1 lg:overflow-hidden">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-5 h-5 text-periwinkle-dark shrink-0" />
              <span className="text-sm font-bold">Fastest Line</span>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-slate-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                LIVE {data.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter">
                2<span className="text-xl lg:text-2xl text-slate-500">m</span>
              </h3>
              <p className="text-xs font-semibold text-mint-dark mt-1">North Restrooms</p>
            </div>
          </div>

          {/* Predictive pressure */}
          <div className="bento-card rounded-3xl p-5 flex justify-between items-center bg-gradient-to-tr from-periwinkle-dark to-periwinkle text-white border-transparent shadow-[0_0_20px_rgba(99,102,241,0.2)] shrink-0">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-periwinkle-light mb-1 flex justify-between">
                Predictive Pressure
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-300" />
                  </span>
                  FORECAST
                </span>
              </p>
              <h3 className="text-2xl lg:text-3xl font-black">{data.zoneAPressure}%</h3>
            </div>
            <ActivitySquare className="w-10 h-10 text-periwinkle-light opacity-50 animate-pulse shrink-0 ml-3" />
          </div>
        </div>

        {/* Heatmap */}
        <div className="lg:col-span-6 bento-card rounded-3xl p-5 flex flex-col min-h-[400px] lg:min-h-0 lg:h-full lg:overflow-hidden relative">
          <div className="flex justify-between items-center mb-3 shrink-0">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <Map className="w-5 h-5 text-periwinkle-dark shrink-0" /> Live Crowd Heatmap
            </h3>
            <div className="flex gap-2 flex-wrap justify-end">
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 border border-blue-200">
                <Cloud className="w-3 h-3" /> Google Cloud IoT
              </span>
              <span className="text-[10px] font-bold bg-mint/50 text-mint-dark px-2 py-1 rounded-full uppercase tracking-wider animate-pulse border border-mint">
                Live
              </span>
            </div>
          </div>
          <div
            className="flex-1 w-full bg-white/50 rounded-2xl overflow-hidden flex items-center justify-center border border-white p-2 shadow-inner"
            role="img"
            aria-label={`Zone A: ${data.zoneAOcc}%, Zone B: ${data.zoneBOcc}%`}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible" aria-hidden="true">
              <rect x="140" y="100" width="120" height="200" rx="20" fill="rgba(16,185,129,0.05)" stroke="#10b981" strokeWidth="2" strokeDasharray="6,6" />
              <motion.path initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} d="M 40 80 Q 80 80 120 100 L 120 300 Q 80 320 40 320 Z" fill={zoneAFill} stroke={zoneAColor} strokeWidth="3" />
              <text x="70" y="200" fill={zoneAColor} fontSize="22" fontWeight="900" textAnchor="middle" transform="rotate(-90 70,200)">ZONE A</text>
              <motion.path initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} d="M 360 80 Q 320 80 280 100 L 280 300 Q 320 320 360 320 Z" fill={zoneBFill} stroke={zoneBColor} strokeWidth="3" />
              <text x="330" y="200" fill={zoneBColor} fontSize="22" fontWeight="900" textAnchor="middle" transform="rotate(90 330,200)">ZONE B</text>
              <circle cx="80" cy="150" r="10" fill={zoneAColor} className="animate-pulse" />
              <circle cx="320" cy="240" r="14" fill={zoneBColor} className="animate-ping" opacity="0.75" />
            </svg>
          </div>
        </div>

        {/* Right: Safety Agent + Status */}
        <div className="lg:col-span-3 flex flex-col gap-3 lg:h-full lg:overflow-hidden">
          <div className="flex-1 lg:min-h-0 lg:overflow-hidden">
            <SafetyAgent zoneAOcc={data.zoneAOcc} zoneBOcc={data.zoneBOcc} />
          </div>
          <div className="bento-card rounded-3xl p-5 flex items-center justify-between shrink-0">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Gate 4 Status</p>
              <h3 className="text-xl font-black text-slate-800">Clear Flow</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-mint/20 border border-mint flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-mint-dark" />
            </div>
          </div>
        </div>

      </div>{/* end ROW 1 */}

      {/* ══ ROW 2: Passport / Sparkline ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:flex-1 lg:min-h-0 lg:overflow-hidden">

        {/* My Passport */}
        <div className="lg:col-span-4 bento-card rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[200px] lg:min-h-0 lg:h-full bg-white/70">
          <div className="flex items-center gap-2 z-10 relative shrink-0">
            <TicketIcon className="w-6 h-6 text-periwinkle-dark shrink-0" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">My Passport</h3>
            {isUpgraded && (
              <span className="ml-auto bg-mint-dark text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> VIP Claimed
              </span>
            )}
          </div>
          <div className="flex items-end justify-between z-10 relative mt-3">
            <div className="flex-1 min-w-0">
              <h2 className={`text-3xl font-black tracking-tight truncate ${isUpgraded ? 'text-amber-500' : 'text-slate-800'}`}>TKT-9481</h2>
              <div className="mt-2 flex gap-5 flex-wrap">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Seat</p>
                  <p className={`text-sm font-bold ${isUpgraded ? 'text-amber-600' : 'text-slate-700'}`}>{currentSeat}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/upgrades')}
              className={`w-14 h-14 rounded-xl flex items-center justify-center border shadow-inner transition-all ml-4 shrink-0 ${isUpgraded ? 'bg-amber-100 border-amber-300' : 'bg-periwinkle-light border-periwinkle hover:scale-105 cursor-pointer'}`}
            >
              <Crown className={`w-7 h-7 ${isUpgraded ? 'text-amber-500' : 'text-periwinkle-dark'}`} />
            </button>
          </div>
        </div>

        {/* 24hr Sparkline */}
        <div className="lg:col-span-8 bento-card rounded-3xl p-5 flex flex-col min-h-[180px] lg:min-h-0 lg:h-full lg:overflow-hidden bg-white/50 backdrop-blur-3xl">
          <div className="flex items-start justify-between mb-3 shrink-0">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <CloudLightning className="w-5 h-5 text-periwinkle-dark shrink-0" /> 24hr Environmental Sparkline
            </h3>
            <span className="text-2xl font-black text-slate-800 shrink-0 ml-3">72°</span>
          </div>
          <div className="flex-1 flex items-end gap-1 sm:gap-2 border-b border-slate-200 pb-2 relative min-h-[80px]">
            {[20, 30, 45, 60, 55, 65, 80, 75, 40, 30, 20, 15, 30, 50, 70, 90, 85].map((val, i) => (
              <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${val}%` }} transition={{ delay: i * 0.03 }}
                className={`flex-1 rounded-t-lg z-10 shadow-sm ${val > 70 ? 'bg-gradient-to-t from-peach-dark to-peach' : 'bg-gradient-to-t from-periwinkle-dark to-periwinkle'}`}
              />
            ))}
          </div>
        </div>

      </div>{/* end ROW 2 */}

    </div>
  );
}
