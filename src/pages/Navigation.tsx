import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, CheckCircle2, Map as MapIcon, Loader2 } from 'lucide-react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem',
};

// Default center (e.g., San Francisco for demo)
const center = {
  lat: 37.7749,
  lng: -122.4194,
};

// Optional: Custom map styles (Dark Mode)
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#1e293b' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1e293b' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca3af' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
  ],
};

export default function Navigation() {
  const [loading, setLoading] = useState(false);
  const [synced, setSynced] = useState(false);
  const [groupCode, setGroupCode] = useState('');

  // Strict Security: Using environment variables for API Key
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '', // Fallback to empty string if missing
  });

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

  // Memoized positions for "You" and "Friends"
  const positions = useMemo(() => {
    if (groupCode.length !== 6) return [];
    return [
      { id: 'me', name: 'You', lat: 37.7749, lng: -122.4194, color: '#10b981' },
      { id: 'f1', name: 'Friend 1 (Emma)', lat: 37.7849, lng: -122.4294, color: '#6366f1' },
      { id: 'f2', name: 'Friend 2 (Liam)', lat: 37.7649, lng: -122.4094, color: '#f59e0b' },
    ];
  }, [groupCode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-full w-full pb-4 lg:pb-0">
      <div className="lg:col-span-4 bento-card p-6 sm:p-8 rounded-3xl flex flex-col items-center relative overflow-hidden h-auto lg:h-full">
         <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-periwinkle to-periwinkle-dark flex items-center justify-center mb-6 sm:mb-8 shadow-lg shrink-0 mt-4 sm:mt-8">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
         </div>
         <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">Group Link</h2>
         <p className="text-slate-500 text-xs sm:text-sm md:text-base text-center mb-8 sm:mb-12 flex-1">Enter your 6-Digit Group Code to dynamically pair your geolocations locally.</p>
         
         <form onSubmit={handleSync} className="w-full flex flex-col gap-4 sm:gap-6 shrink-0 mb-8">
            <input 
              type="text" 
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
              maxLength={6}
              aria-label="6-Digit Group Code"
              className="w-full bg-white/70 border border-slate-200 text-slate-800 text-center text-2xl sm:text-4xl tracking-[0.4em] px-4 py-6 sm:py-8 rounded-2xl outline-none focus:border-periwinkle-dark transition-all placeholder:text-slate-300 font-black shadow-inner"
              placeholder="000000"
            />
            <button 
              type="submit"
              disabled={loading || groupCode.length < 6 || synced}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 sm:py-6 rounded-2xl font-bold transition-colors shadow-lg disabled:opacity-70 flex items-center justify-center text-base sm:text-lg"
            >
               {loading ? <div className="w-5 h-5 border-4 border-slate-600 border-t-white rounded-full animate-spin"></div> : 'Establish Feed'}
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
               <div className="w-20 h-20 rounded-full bg-mint flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                 <CheckCircle2 className="w-10 h-10 text-mint-dark" />
               </div>
               <p className="font-black text-slate-900 text-2xl tracking-tight">Sync Established</p>
               <p className="text-slate-500 text-base mt-2 font-medium">Resolving real-time matrix.</p>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      <div className="lg:col-span-8 bento-card p-4 sm:p-6 rounded-3xl flex flex-col h-auto min-h-[400px] lg:h-full bg-slate-900 relative overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-periwinkle-dark/40 via-slate-900 to-slate-900"></div>
         <div className="flex items-center justify-between mb-4 z-10 shrink-0">
            <h3 className="font-bold text-white flex items-center gap-2 text-base sm:text-lg">
               <MapIcon className="w-4 h-4 sm:w-5 sm:h-5 text-periwinkle" /> Interactive GPS Tracker
            </h3>
            <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border shadow-sm ${isLoaded ? 'text-mint bg-mint-dark/20 border-mint-dark animate-pulse' : 'text-coral-dark bg-coral-light/20 border-coral-dark'}`}>
              {isLoaded ? 'Sat-Link Active' : 'Offline'}
            </span>
         </div>
         
         <div className="flex-1 border border-slate-700 rounded-2xl relative overflow-hidden bg-slate-950 z-10 min-h-[300px]">
           {apiKey ? (
             !isLoaded ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-periwinkle">
                 <Loader2 className="w-10 h-10 animate-spin mb-4" />
                 <p className="text-xs font-bold uppercase tracking-widest">Initialising Grid...</p>
               </div>
             ) : (
               <GoogleMap
                 mapContainerStyle={mapContainerStyle}
                 center={center}
                 zoom={14}
                 options={mapOptions}
               >
                 {groupCode.length === 6 && positions.map((pos) => (
                   <MarkerF
                     key={pos.id}
                     position={{ lat: pos.lat, lng: pos.lng }}
                     label={{
                       text: pos.name,
                       color: 'white',
                       fontSize: '10px',
                       fontWeight: 'bold',
                       className: 'bg-slate-900/80 px-2 py-1 rounded-full border border-white/20'
                     }}
                   />
                 ))}
               </GoogleMap>
             )
           ) : (
             <RadarSimulation groupCode={groupCode} positions={positions} />
           )}

           {groupCode.length !== 6 && isLoaded && apiKey && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-950/40 pointer-events-none">
               <MapIcon className="w-12 h-12 mb-4 opacity-50" />
               <p className="text-xs font-bold uppercase tracking-widest">Enter Group Code to Deploy Markers</p>
             </div>
           )}
         </div>
      </div>
    </div>
  );
}

function RadarSimulation({ groupCode, positions }: { groupCode: string, positions: { id: string; name: string; lat: number; lng: number; color: string }[] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      {/* Animated Radar Scanning Effect */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] bg-gradient-to-r from-periwinkle/10 to-transparent origin-center pointer-events-none"
        style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
      ></motion.div>

      {/* Radar Rings */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 border-2 border-slate-800 rounded-full flex items-center justify-center">
        <div className="w-48 h-48 sm:w-64 sm:h-64 border border-slate-800 rounded-full"></div>
        <div className="w-32 h-32 sm:w-40 sm:h-40 border border-slate-900 rounded-full"></div>
        <div className="absolute w-full h-[1px] bg-slate-800"></div>
        <div className="absolute h-full w-[1px] bg-slate-800"></div>
        
        {/* Connection Status when no code */}
        {groupCode.length !== 6 && (
          <div className="absolute flex flex-col items-center justify-center text-slate-600 z-10 p-8 text-center bg-slate-950/80 backdrop-blur-sm rounded-3xl border border-white/5">
            <Radio className="w-10 h-10 mb-4 text-periwinkle animate-pulse" />
            <p className="font-black text-sm uppercase tracking-widest mb-1">Simulated Grid Mode</p>
            <p className="text-[10px] opacity-60 leading-relaxed italic">Enter Group Code to establish Digital Twin Identity and track assets.</p>
          </div>
        )}

        {/* Dynamic Markers in Simulation Mode */}
        <AnimatePresence>
          {groupCode.length === 6 && positions.map((pos, i) => (
            <motion.div
              key={pos.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: i * 0.1 }}
              className="absolute flex flex-col items-center"
              style={{ 
                left: `${50 + (pos.lat - 37.7749) * 1000}%`, 
                top: `${50 + (pos.lng + 122.4194) * 1000}%` 
              }}
            >
              <div 
                className="w-4 h-4 rounded-full border-2 border-white shadow-lg relative z-20"
                style={{ backgroundColor: pos.color }}
              >
                 <div className="absolute inset-0 bg-white animate-ping opacity-30 rounded-full"></div>
              </div>
              <span className="mt-2 bg-slate-900/90 text-white text-[8px] font-black px-2 py-1 rounded-full border border-white/20 whitespace-nowrap shadow-xl">
                {pos.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Corner UI Elements */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-peach animate-pulse"></div>
         <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Dev-Simulation Protocol Active</span>
      </div>
    </div>
  );
}

import { Radio } from 'lucide-react';


