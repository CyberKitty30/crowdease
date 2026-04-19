import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Fingerprint } from 'lucide-react';
import DOMPurify from 'dompurify';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && (!formData.name || formData.name.trim() === '')) return;
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return;
    if (!formData.password || formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setTimeout(() => {
        // Store structured user data for the Digital Twin Identity
        const user = {
            name: DOMPurify.sanitize(isSignUp ? formData.name : formData.email.split('@')[0]),
            email: DOMPurify.sanitize(formData.email),
            role: 'Administrator',
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/dashboard');
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
        const user = {
            name: 'Google User',
            email: 'google.auth@crowdease.ai',
            role: 'Guest',
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#f8faff] items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic background accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-periwinkle/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-mint/10 rounded-full blur-[150px] pointer-events-none"></div>

      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/60 backdrop-blur-3xl p-8 sm:p-10 rounded-[3rem] shadow-2xl shadow-periwinkle/5 border border-white z-10"
      >
        <div className="text-center mb-8">
          <motion.div 
            layout
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-periwinkle-dark to-periwinkle flex items-center justify-center mx-auto mb-6 shadow-xl shadow-periwinkle/20 border border-white/50"
          >
             <span className="text-white font-black text-2xl tracking-tighter">CE</span>
          </motion.div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-2">
            Professional Stadium Management Interface
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold flex justify-center items-center gap-3 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
               <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
               <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
            <span className="bg-white px-4">Or use email</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <AnimatePresence mode="wait">
            {isSignUp && (
              <motion.div 
                key="signup-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1.5 overflow-hidden"
              >
                <label htmlFor="signupName" className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-periwinkle-dark transition-colors" />
                  <input 
                    id="signupName"
                    required
                    type="text" 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/50 border border-slate-100 focus:border-periwinkle-dark focus:ring-4 focus:ring-periwinkle/5 outline-none rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium transition-all"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            <label htmlFor="loginEmail" className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-periwinkle-dark transition-colors" />
              <input 
                id="loginEmail"
                required
                type="email" 
                placeholder="name@crowdease.ai"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/50 border border-slate-100 focus:border-periwinkle-dark focus:ring-4 focus:ring-periwinkle/5 outline-none rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="loginPass" className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-periwinkle-dark transition-colors" />
              <input 
                id="loginPass"
                required
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white/50 border border-slate-100 focus:border-periwinkle-dark focus:ring-4 focus:ring-periwinkle/5 outline-none rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm mt-4"
          >
            {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {!isSignUp && (
            <div className="mt-6 flex flex-col items-center">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-3">Or authenticate securely via</p>
              <button 
                type="button"
                className="w-full bg-white border border-slate-200 group relative flex items-center justify-center px-4 py-3.5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:bg-slate-50 hover:border-blue-200"
              >
                <Fingerprint className="w-5 h-5 text-blue-500 mr-2 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-black text-slate-700 tracking-tight">Google Firebase Identity</span>
              </button>
            </div>
          )}
        </form>

        <div className="mt-8 text-center">
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-bold text-slate-400 hover:text-periwinkle-dark transition-colors uppercase tracking-widest"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an internal account? Sign Up'}
            </button>
        </div>
      </motion.div>
    </div>
  );
}
