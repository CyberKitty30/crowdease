/**
 * CrowdEase Density Engine
 * Core autonomous logic for Physical AI rerouting and predictive pressure forecasting.
 */

export interface ZoneData {
  id: string;
  occupancy: number; // 0-100
  capacity: number;
}

export type ReroutePlan = {
  originalPath: string;
  suggestedPath: string;
  timeSaving: number; // in minutes
  reason: string;
};

export const DENSITY_THRESHOLD = 80;

/**
 * Calculates a reroute plan if a zone is over capacity.
 */
export function calculateReroute(zones: ZoneData[]): ReroutePlan | null {
  const congestedZone = zones.find(z => z.occupancy >= DENSITY_THRESHOLD);
  
  if (!congestedZone) return null;

  if (congestedZone.id === 'Zone A') {
    return {
      originalPath: 'Main Concourse A',
      suggestedPath: 'Section 4 Ghost Route',
      timeSaving: 8,
      reason: `Zone A is at ${congestedZone.occupancy}% capacity. Diverting via Section 4 bypass.`
    };
  }

  if (congestedZone.id === 'Zone B') {
    return {
      originalPath: 'East Exit Plaza',
      suggestedPath: 'North Gate Perimeter',
      timeSaving: 5,
      reason: `Zone B is at ${congestedZone.occupancy}% capacity. Using perimeter flow.`
    };
  }

  return null;
}

/**
 * Forecasts predictive pressure based on current trends.
 * Simple linear extrapolation with noise for the demo.
 */
export function getPredictivePressure(currentOccupancy: number, history: number[]): number {
  if (history.length < 2) return currentOccupancy;
  
  const delta = (history[history.length - 1] - history[0]) / history.length;
  const forecast = currentOccupancy + (delta * 3); // forecast 3 cycles ahead
  
  return Math.max(0, Math.min(100, Math.round(forecast)));
}

export interface CrowdState {
  zoneAOcc: number;
  zoneBOcc: number;
}

/**
 * Translates natural language intent into actionable navigation suggestions.
 */
export function translateIntent(query: string, data: CrowdState): string {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes('exit') || lowercaseQuery.includes('fastest way out')) {
    if (data.zoneAOcc > 75) {
      return "Main Exit A is congested. Suggesting North Gate via the lower concourse—estimated 6 mins saving.";
    }
    return "The nearest exit is Gate 2, currently at 45% capacity. Flow is optimal.";
  }
  
  if (lowercaseQuery.includes('restroom') || lowercaseQuery.includes('toilet')) {
    return "North restrooms have a 2-minute wait. South concourse is currently at 12-minute wait time.";
  }
  
  if (lowercaseQuery.includes('food') || lowercaseQuery.includes('eat')) {
    return "Section 104 concessions are clear. Avoid Section 112 as a surge is predicted in 10 minutes.";
  }

  return "I'm monitoring the physical twin. How can I assist with your navigation today?";
}
 
