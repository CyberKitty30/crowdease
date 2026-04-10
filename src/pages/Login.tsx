import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-[#f8faff] items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-lg shadow-periwinkle/30 border border-white"
      >
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-periwinkle-dark flex items-center justify-center mx-auto mb-4 shadow-[0_8px_20px_rgba(99,102,241,0.3)]">
             <span className="text-white font-bold text-2xl tracking-tighter">CE</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">CrowdEase</h1>
          <p className="text-sm text-slate-500">The premier stadium intelligence platform.</p>
        </div>

        <button 
           onClick={handleGoogleLogin}
           disabled={loading}
           className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold flex justify-center items-center gap-3 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed text-sm"
        >
           {loading ? (
               <div className="w-5 h-5 border-2 border-slate-200 border-t-periwinkle-dark rounded-full animate-spin"></div>
           ) : (
             <>
               <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
               </svg>
               Continue with Google
             </>
           )}
        </button>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-400 font-medium">Internal SSO Authentication Enforced.</p>
        </div>
      </motion.div>
    </div>
  );
}
