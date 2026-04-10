import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';

export default function LostAndFound() {
  const [items, setItems] = useState([
    { id: '1', name: 'iPhone 13 Pro', loc: 'Restroom B', time: '10 mins ago', type: 'electronics' },
    { id: '2', name: 'Black Leather Wallet', loc: 'Gate 4', time: '45 mins ago', type: 'personal' },
    { id: '3', name: 'Car Keys (Toyota)', loc: 'VIP Lounge', time: '2 hours ago', type: 'keys' },
  ]);
  const [form, setForm] = useState({ name: '', loc: '', type: 'personal' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.loc) return;
    setLoading(true);
    setTimeout(() => {
      setItems([{ id: Date.now().toString(), name: form.name, loc: form.loc, time: 'Just now', type: form.type }, ...items]);
      setForm({ name: '', loc: '', type: 'personal' });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full w-full">
      <div className="lg:col-span-5 bento-card p-8 rounded-3xl flex flex-col h-full bg-white/80">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Report Found Item</h2>
        <p className="text-sm text-slate-500 mb-8 border-b border-slate-200 pb-6 shrink-0">Register displaced objects instantly to the global tracking network.</p>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Item Description</label>
              <input 
                type="text" 
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full bg-white border-2 border-slate-200 text-slate-800 px-5 py-4 rounded-2xl outline-none focus:border-periwinkle-dark transition-all text-base font-semibold shadow-inner"
                placeholder="e.g. Silver Mac OS Laptop..."
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Location Discovered</label>
              <input 
                type="text" 
                value={form.loc}
                onChange={(e) => setForm({...form, loc: e.target.value})}
                className="w-full bg-white border-2 border-slate-200 text-slate-800 px-5 py-4 rounded-2xl outline-none focus:border-periwinkle-dark transition-all text-base font-semibold shadow-inner"
                placeholder="e.g. Section 104, Row G"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Category</label>
              <select 
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value})}
                className="w-full bg-white border-2 border-slate-200 text-slate-800 px-5 py-4 rounded-2xl outline-none focus:border-periwinkle-dark transition-all text-base font-semibold shadow-inner"
              >
                <option value="electronics">Electronics</option>
                <option value="personal">Personal Effects</option>
                <option value="keys">Keys & Access</option>
                <option value="other">Miscellaneous</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-5 rounded-2xl font-bold transition-all shadow-xl disabled:opacity-70 mt-8 shrink-0 flex items-center justify-center text-lg gap-2"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Log Discovery'}
          </button>
        </form>
      </div>

      <div className="lg:col-span-7 bento-card p-8 rounded-3xl flex flex-col h-full bg-white/60">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/50 shrink-0">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
             <Search className="w-6 h-6 text-periwinkle-dark" /> Global Directory
          </h2>
          <span className="bg-periwinkle-light text-periwinkle-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">Live Feed</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {items.map((item) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={item.id} 
              className="bg-white/80 p-6 rounded-2xl border border-white flex justify-between items-center shadow-sm hover:shadow-md transition-shadow group"
            >
               <div>
                  <h3 className="font-black text-slate-800 text-lg mb-1">{item.name}</h3>
                  <div className="flex items-center gap-4">
                     <p className="text-sm font-bold text-slate-500 uppercase flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-coral-dark"></span> {item.loc}</p>
                  </div>
               </div>
               <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1.5 rounded-md inline-block mb-1">{item.time}</span>
                  <button className="block text-sm font-bold text-periwinkle-dark hover:text-periwinkle underline decoration-2 decoration-periwinkle-light underline-offset-4 mt-2">Claim ID</button>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
