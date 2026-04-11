import { NavLink } from 'react-router-dom';
import { Home, Activity, Ticket, Search, ShieldAlert, LogOut, Clock3, Navigation as NavIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Analytics', path: '/analytics', icon: Activity },
    { name: 'Smart Queues', path: '/queues', icon: Clock3 },
    { name: 'Group Sync', path: '/navigation', icon: NavIcon },
    { name: 'Ticket Scanner', path: '/tickets', icon: Ticket },
    { name: 'Lost & Found', path: '/lost-found', icon: Search },
    { name: 'Safety SOS', path: '/safety', icon: ShieldAlert },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  const sidebarContent = (
    <aside className="w-[280px] bg-white lg:bg-white/40 backdrop-blur-xl border-r border-white/50 h-full flex flex-col pt-6 z-20 shrink-0">
      <div className="px-6 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-periwinkle to-periwinkle-dark flex items-center justify-center text-white font-black tracking-widest text-sm shadow-md">CE</div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">CrowdEase</h1>
        </div>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-800 lg:hidden">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => { if (window.innerWidth < 1024) onClose(); }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-semibold border ${
                isActive
                  ? 'bg-white border-white/80 text-periwinkle-dark shadow-[0_4px_15px_rgba(99,102,241,0.08)] scale-[1.02]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/50'
              }`
            }
          >
            <link.icon className="w-4 h-4" />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/50 mt-6 mb-4">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 border border-transparent rounded-2xl text-slate-500 hover:text-slate-800 hover:bg-white/50 transition-colors text-sm font-semibold">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:flex h-full">
        {sidebarContent}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[50] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-[60] lg:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
