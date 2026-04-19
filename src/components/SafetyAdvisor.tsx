import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import DOMPurify from 'dompurify';

interface SafetyAdvisorProps {
  incidentType: string;
  location: string;
  description: string;
  isTriggered: boolean;
}

export default function SafetyAdvisor({ incidentType, location, description, isTriggered }: SafetyAdvisorProps) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Strict Security: Using environment variables for API Key
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    if (isTriggered && apiKey) {
      generateAdvice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTriggered, apiKey, incidentType, location, description]);

  const generateAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      // SDK initialized locally below where used

      // Strict Security: Sanitize all inputs before prompting
      const cleanType = DOMPurify.sanitize(incidentType);
      const cleanLocation = DOMPurify.sanitize(location);
      const cleanDesc = DOMPurify.sanitize(description);

      const prompt = `
        You are an AI Safety Assistant for CrowdEase, a digital twin crowd management platform.
        An incident has been reported:
        - Type: ${cleanType}
        - Location: ${cleanLocation}
        - Description: ${cleanDesc || 'No detailed description provided.'}

        Provide 3 concise, actionable safety tips for nearby civilians and 1 instruction for security personnel.
        Keep the tone professional, urgent, and calm. Use bullet points.
        Maximum 100 words.
      `;

      if (!apiKey) {
        // High-Fidelity Simulation Mode Logic
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate latency
        const simulatedAdvice = `
• **Immediate Caution**: Evacuate a 20m radius around ${cleanLocation} to allow response teams clear access.
• **Pathfinding**: Use Concourse North-Exit (Zone 4) for egress; avoid the Central Hub to prevent bottlenecking.
• **Communication**: Stay tuned to the CrowdEase app for real-time status updates and follow green-glowing path markers.
• **Security Instruction**: Deploy Priority-1 medical/security units to ${cleanLocation} via Service Ramp B. Initiate local density dampening.
        `;
        setAdvice(simulatedAdvice.trim());
      } else {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        setAdvice(response.text());
      }
    } catch (err) {

      console.error("Gemini Error:", err);
      setError("Unable to reach AI Safety Nodes. Follow standard protocol.");
    } finally {
      setLoading(false);
    }
  };

  if (!isTriggered && !advice) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 bento-card p-6 bg-periwinkle-light/10 border-2 border-periwinkle-dark/30 rounded-3xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-12 h-12 text-periwinkle-dark" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-periwinkle-dark flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-black text-slate-900 text-lg leading-tight">Gemini Safety Advisor</h3>
          <p className="text-[10px] font-bold text-periwinkle-dark uppercase tracking-widest">AI-Calculated Response</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center py-8 text-periwinkle-dark">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-sm font-bold uppercase tracking-widest animate-pulse">Analyzing Incident Matrix...</p>
          </div>
        ) : error ? (
          <div className="flex items-start gap-3 p-4 bg-coral-light/20 rounded-2xl border border-coral-dark/20 text-coral-dark">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        ) : advice ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-sm prose-slate max-w-none"
          >
            <div className="whitespace-pre-wrap text-slate-700 font-medium leading-relaxed bg-white/50 p-4 rounded-2xl border border-white/50 shadow-inner">
              {advice}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-mint-dark uppercase tracking-widest bg-mint/10 w-max px-3 py-1.5 rounded-full border border-mint-dark/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Security Broadcast Ready
            </div>
          </motion.div>
        ) : (
          <div className="py-4 text-center text-slate-400">
             <p className="text-xs font-bold uppercase tracking-widest italic">Awaiting incident data for analysis...</p>
          </div>
        )}
      </div>

      {!apiKey && (
        <div className="mt-4 p-3 bg-peach-light/20 rounded-xl border border-peach-dark/20 flex items-center gap-2 text-[10px] font-bold text-peach-dark uppercase">
          <AlertCircle className="w-4 h-4" /> Gemini API Key missing in .env
        </div>
      )}
    </motion.div>
  );
}
