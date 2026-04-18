import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Radio, CheckSquare, X, Menu, Accessibility } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityTypes';

interface Notification {
  id: string;
  msg: string;
  type: 'info' | 'alert' | 'success';
  time: string;
}

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { reducedMotion, toggleReducedMotion } = useAccessibility();
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', msg: 'Welcome back to CrowdEase system.', type: 'info', time: 'Just now' }
  ]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [user, setUser] = useState({ name: 'Guest User', role: 'External' });

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }

    const int = setInterval(() => {
      const messages = [
        "Gate 4 is now clear!",
        "Your seat upgrade is available.",
        "Emergency Drill in 5 mins.",
        "Restroom A queue has normalized.",
        "VIP Concourse B density dropping."
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const type = randomMsg.includes('Emergency') ? 'alert' : randomMsg.includes('clear') || randomMsg.includes('upgraded') ? 'success' : 'info';
      
      setNotifications(prev => [{ id: Date.now().toString(), msg: randomMsg, type, time: 'Just now' }, ...prev]);
    }, 15000);
    return () => clearInterval(int);
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      <nav className="w-full h-16 bg-white/40 backdrop-blur-xl border-b border-white/50 flex items-center justify-between px-4 sm:px-6 z-40 shrink-0 relative">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-slate-500 hover:text-periwinkle-dark transition-colors rounded-full hover:bg-white/60 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-periwinkle-dark font-black tracking-tight drop-shadow-sm lg:hidden">CrowdEase</h2>
          <div className="hidden sm:flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-white/80 shadow-sm backdrop-blur-md">
             <Radio className="w-3 h-3 text-mint-dark animate-pulse" />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-2 border-r border-slate-200 pr-3">Live Status</span>
             <span className="text-xs text-slate-700 font-semibold">Global connection secured</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
             onClick={toggleReducedMotion}
             className={`relative p-2.5 transition-colors rounded-full border ${reducedMotion ? 'bg-periwinkle/20 text-periwinkle-dark border-periwinkle/50' : 'text-slate-500 hover:text-periwinkle-dark hover:bg-white/60 border-transparent hover:border-white/50'}`}
             title={reducedMotion ? "Enable Motion" : "Reduce Motion (WCAG)"}
             aria-pressed={reducedMotion}
             aria-label="Toggle Reduced Motion"
          >
             <Accessibility className="w-5 h-5" />
          </button>
          
          <button 
             onClick={() => setShowDrawer(true)}
             className="relative p-2.5 text-slate-500 hover:text-periwinkle-dark transition-colors rounded-full hover:bg-white/60 border border-transparent hover:border-white/50"
          >
             <Bell className="w-5 h-5" />
             {notifications.length > 0 && (
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-coral-dark rounded-full border-2 border-white animate-pulse"></span>
             )}
          </button>
          
          <div className="h-6 w-[1px] bg-slate-300 hidden xs:block"></div>
          
          <div className="flex items-center gap-2 sm:gap-3 pl-2 cursor-pointer group">
             <div className="text-right hidden md:block">
               <p className="text-sm font-bold text-slate-800 group-hover:text-periwinkle-dark transition-colors">{user.name}</p>
               <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{user.role}</p>
             </div>
             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-periwinkle-light flex items-center justify-center overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`} alt="Profile" className="w-full h-full object-cover" />
             </div>
             <button onClick={() => { localStorage.removeItem('isAuthenticated'); localStorage.removeItem('currentUser'); window.location.href = '/login'; }} className="hidden sm:flex ml-2 bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-500 p-2 rounded-full transition-colors" title="Logout">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
             </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showDrawer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-50 cursor-pointer"
            ></motion.div>
            
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full xs:w-80 sm:w-96 bg-white/80 backdrop-blur-2xl border-l border-white/50 shadow-2xl z-50 flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Notifications</h2>
                    <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-widest">{notifications.length} Unread Alerts</p>
                 </div>
                 <button onClick={() => setShowDrawer(false)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors">
                    <X className="w-4 h-4" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                 <AnimatePresence mode="popLayout">
                    {notifications.length === 0 && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-40 text-slate-400">
                          <CheckSquare className="w-8 h-8 mb-2 opacity-50" />
                          <p className="text-sm font-medium">All caught up!</p>
                       </motion.div>
                    )}
                    {notifications.map(n => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        key={n.id}
                        className={`p-4 rounded-2xl border flex gap-3 items-start relative overflow-hidden group ${
                          n.type === 'alert' ? 'bg-coral/20 border-coral-dark/20' : 
                          n.type === 'success' ? 'bg-mint/20 border-mint-dark/20' : 
                          'bg-white border-white shadow-sm'
                        }`}
                      >
                         <div className={`w-2 h-full absolute left-0 top-0 ${n.type === 'alert' ? 'bg-coral-dark' : n.type === 'success' ? 'bg-mint-dark' : 'bg-periwinkle-dark'}`}></div>
                         <div className="flex-1 ml-2 text-sm text-slate-700 font-medium leading-relaxed">{n.msg}</div>
                         <button onClick={() => dismissNotification(n.id)} className="text-slate-400 hover:text-slate-800 bg-white/50 rounded-full p-1 border border-white opacity-0 group-hover:opacity-100 transition-opacity">
                           <CheckSquare className="w-4 h-4" />
                         </button>
                      </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
