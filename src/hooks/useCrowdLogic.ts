import { useState, useEffect, useRef } from 'react';
import { getPredictivePressure } from '../logic/densityEngine';
import { trackEvent, streamToBigQuery } from '../services/googleServices';

/**
 * useCrowdLogic — Core Physical AI simulation hook.
 *
 * Manages real-time crowd occupancy simulation with fluid-dynamics lag,
 * predictive pressure forecasting, and Google Cloud data telemetry.
 *
 * Google Services wired into this workflow:
 *  - Firebase Analytics (trackEvent)  → logs zone-surge events
 *  - BigQuery streaming (streamToBigQuery) → ingests per-tick metrics
 */
export function useCrowdLogic() {
  const [data, setData] = useState({
    zoneAOcc: 70,
    zoneBOcc: 35,
    zoneAPressure: 70,
    latency: 12,
    timestamp: new Date()
  });

  // Fluid dynamics queue: Zone A → Zone B with 6-cycle lag
  const historyRef = useRef<number[]>([70, 70, 70, 70, 70, 70]);
  // Session identifier for BigQuery row partitioning (initialised once via useState)
  const [sessionId] = useState(() => `session-${Date.now()}`);

  useEffect(() => {
    // Track session start in Firebase Analytics
    trackEvent('crowd_monitor_session_start', { sessionId });

    const int = setInterval(() => {
      setData(prev => {
        const lastA = historyRef.current[historyRef.current.length - 1];

        // Fluctuation algorithm: randomised ±3% delta per tick
        let delta = (Math.random() * 6) - 3;

        // Occasional spike >85% to demonstrate CRITICAL Action Plans
        if (Math.random() > 0.95) {
          delta += 15;
        }

        let newZoneA = lastA + delta;
        newZoneA = Math.max(30, Math.min(100, newZoneA));

        historyRef.current.push(newZoneA);
        if (historyRef.current.length > 10) historyRef.current.shift();

        const newZoneB = Math.max(20, Math.min(100,
          (historyRef.current[0] * 0.85) + (Math.random() * 5)
        ));

        const forecastedA = getPredictivePressure(newZoneA, historyRef.current);
        const newLatency  = 10 + Math.floor(Math.random() * 10);

        // ── Google Services: Firebase Analytics surge alert ──────────────
        if (newZoneA > 85) {
          trackEvent('zone_surge_critical', {
            zone: 'A',
            occupancy: Math.round(newZoneA),
            pressure: forecastedA,
          });
        }

        // ── Google Services: BigQuery telemetry stream (async, non-blocking)
        streamToBigQuery({
          timestamp:          new Date().toISOString(),
          zoneId:             'Zone A',
          occupancy:          Math.round(newZoneA),
          predictivePressure: forecastedA,
          latencyMs:          newLatency,
          sessionId:          sessionId,
        }).catch(() => { /* non-blocking: swallow individual stream errors */ });

        return {
          ...prev,
          zoneAOcc:      Math.round(newZoneA),
          zoneBOcc:      Math.round(newZoneB),
          zoneAPressure: forecastedA,
          latency:       newLatency,
          timestamp:     new Date(),
        };
      });
    }, 6000);

    return () => {
      clearInterval(int);
      trackEvent('crowd_monitor_session_end', { sessionId });
    };
  }, [sessionId]);

  return data;
}
