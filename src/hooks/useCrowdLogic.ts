import { useState, useEffect, useRef } from 'react';
import { getPredictivePressure } from '../logic/densityEngine';

export function useCrowdLogic() {
  const [data, setData] = useState({
    zoneAOcc: 70, 
    zoneBOcc: 35,
    zoneAPressure: 70, // Predictive field
    latency: 12,
    timestamp: new Date()
  });

  // State Management: Fluid dynamics queue (Zone A to Zone B lag)
  const historyRef = useRef<number[]>([70, 70, 70, 70, 70, 70]);
  
  useEffect(() => {
    const int = setInterval(() => {
      setData(prev => {
        const lastA = historyRef.current[historyRef.current.length - 1];
        
        // Implement a fluctuation algorithm with randomized delta (± 3%)
        let delta = (Math.random() * 6) - 3; 
        
        // Occasional spike >85% to demonstrate the CRITICAL Action Plans organically
        if (Math.random() > 0.95) {
          delta += 15;
        }

        let newZoneA = lastA + delta;
        newZoneA = Math.max(30, Math.min(100, newZoneA)); // cap between 30 and 100
        
        historyRef.current.push(newZoneA);
        // Retain 6 cycles (~36 seconds) of lag to simulate fluid physical dynamics from Entrance -> Concourse
        if (historyRef.current.length > 10) {
          historyRef.current.shift();
        }

        // Zone B derives from the lagging queue and ambient dispersion
        const newZoneB = Math.max(20, Math.min(100, (historyRef.current[0] * 0.85) + (Math.random() * 5)));

        // Use densityEngine to forecast pressure
        const forecastedA = getPredictivePressure(newZoneA, historyRef.current);

        return {
          ...prev,
          zoneAOcc: Math.round(newZoneA),
          zoneBOcc: Math.round(newZoneB),
          zoneAPressure: forecastedA,
          latency: 10 + Math.floor(Math.random() * 10),
          timestamp: new Date()
        };
      });
    }, 6000); 
    
    return () => {
      clearInterval(int);
    };
  }, []);

  return data;
}
