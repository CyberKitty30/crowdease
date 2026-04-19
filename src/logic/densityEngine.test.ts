import { describe, it, expect } from 'vitest';
import {
  calculateReroute,
  getPredictivePressure,
  translateIntent,
  DENSITY_THRESHOLD,
} from './densityEngine';

describe('densityEngine — calculateReroute', () => {
  it('returns null when no zone exceeds threshold', () => {
    const zones = [
      { id: 'Zone A', occupancy: 50, capacity: 1000 },
      { id: 'Zone B', occupancy: 60, capacity: 1000 },
    ];
    expect(calculateReroute(zones)).toBeNull();
  });

  it('returns Zone A reroute plan when Zone A hits threshold', () => {
    const zones = [
      { id: 'Zone A', occupancy: 85, capacity: 1000 },
      { id: 'Zone B', occupancy: 30, capacity: 1000 },
    ];
    const plan = calculateReroute(zones);
    expect(plan).not.toBeNull();
    expect(plan?.suggestedPath).toBe('Section 4 Ghost Route');
    expect(plan?.originalPath).toBe('Main Concourse A');
    expect(plan?.timeSaving).toBe(8);
    expect(plan?.reason).toContain('Zone A is at 85%');
  });

  it('returns Zone A reroute when at exact threshold', () => {
    const zones = [{ id: 'Zone A', occupancy: DENSITY_THRESHOLD, capacity: 1000 }];
    const plan = calculateReroute(zones);
    expect(plan).not.toBeNull();
    expect(plan?.suggestedPath).toBe('Section 4 Ghost Route');
  });

  it('returns Zone B reroute plan when Zone B hits threshold', () => {
    const zones = [
      { id: 'Zone A', occupancy: 50, capacity: 1000 },
      { id: 'Zone B', occupancy: 90, capacity: 1000 },
    ];
    const plan = calculateReroute(zones);
    expect(plan).not.toBeNull();
    expect(plan?.suggestedPath).toBe('North Gate Perimeter');
    expect(plan?.originalPath).toBe('East Exit Plaza');
    expect(plan?.timeSaving).toBe(5);
    expect(plan?.reason).toContain('Zone B is at 90%');
  });

  it('returns null for an unknown congested zone', () => {
    const zones = [{ id: 'Zone C', occupancy: 95, capacity: 1000 }];
    expect(calculateReroute(zones)).toBeNull();
  });

  it('returns null for an empty zones array', () => {
    expect(calculateReroute([])).toBeNull();
  });
});

describe('densityEngine — getPredictivePressure', () => {
  it('returns currentOccupancy when history has fewer than 2 entries', () => {
    expect(getPredictivePressure(70, [])).toBe(70);
    expect(getPredictivePressure(50, [45])).toBe(50);
  });

  it('forecasts upward trend correctly', () => {
    const history = [60, 65, 70, 75, 80];
    const result = getPredictivePressure(80, history);
    // delta = (80 - 60) / 5 = 4; forecast = 80 + (4 * 3) = 92
    expect(result).toBe(92);
  });

  it('forecasts downward trend correctly', () => {
    const history = [80, 75, 70, 65, 60];
    const result = getPredictivePressure(60, history);
    // delta = (60 - 80) / 5 = -4; forecast = 60 + (-4 * 3) = 48
    expect(result).toBe(48);
  });

  it('clamps output to a maximum of 100', () => {
    const history = [50, 70, 90];
    const result = getPredictivePressure(99, history);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('clamps output to a minimum of 0', () => {
    const history = [90, 50, 10];
    const result = getPredictivePressure(5, history);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('returns rounded integer value', () => {
    const history = [61, 63, 65];
    const result = getPredictivePressure(65, history);
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe('densityEngine — translateIntent', () => {
  const lowData = { zoneAOcc: 30, zoneBOcc: 20 };
  const highData = { zoneAOcc: 90, zoneBOcc: 80 };

  it('suggests North Gate when exit is queried and Zone A is congested', () => {
    const response = translateIntent('fastest way out', highData);
    expect(response).toContain('North Gate');
  });

  it('returns optimal gate info when exit queried and Zone A is clear', () => {
    const response = translateIntent('exit', lowData);
    expect(response).toContain('Gate 2');
  });

  it('handles "exit" keyword correctly', () => {
    const response = translateIntent('where is the exit?', lowData);
    expect(response).toContain('Gate 2');
  });

  it('returns restroom information for restroom query', () => {
    const response = translateIntent('where is the restroom?', lowData);
    expect(response).toContain('restroom');
  });

  it('returns restroom information for toilet query', () => {
    const response = translateIntent('toilet', highData);
    expect(response).toContain('South concourse');
  });

  it('returns food concession info for food query', () => {
    const response = translateIntent('food', lowData);
    expect(response).toContain('Section 104');
  });

  it('returns food concession info for eat query', () => {
    const response = translateIntent('where can I eat?', highData);
    expect(response).toContain('Section 104');
  });

  it('returns a fallback message for unrecognized query', () => {
    const response = translateIntent('lorem ipsum unknown', lowData);
    expect(response).toContain('physical twin');
  });
});
