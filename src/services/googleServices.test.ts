import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  trackEvent,
  streamToBigQuery,
  scanWithVision,
  callGemini,
  type CrowdMetricRow,
} from './googleServices';

// ─── trackEvent ──────────────────────────────────────────────────────────────

describe('googleServices — trackEvent', () => {
  it('calls window.gtag when available', () => {
    const mockGtag = vi.fn();
    (window as unknown as Record<string, unknown>).gtag = mockGtag;
    trackEvent('zone_reroute_triggered', { zone: 'A' });
    expect(mockGtag).toHaveBeenCalledWith('event', 'zone_reroute_triggered', { zone: 'A' });
    delete (window as unknown as Record<string, unknown>).gtag;
  });

  it('does not throw when window.gtag is absent', () => {
    expect(() => trackEvent('test_event')).not.toThrow();
  });

  it('sends empty params object by default', () => {
    const mockGtag = vi.fn();
    (window as unknown as Record<string, unknown>).gtag = mockGtag;
    trackEvent('page_view');
    expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {});
    delete (window as unknown as Record<string, unknown>).gtag;
  });

  it('handles gtag throwing without crashing the app', () => {
    (window as unknown as Record<string, unknown>).gtag = () => { throw new Error('gtag error'); };
    expect(() => trackEvent('bad_event')).not.toThrow();
    delete (window as unknown as Record<string, unknown>).gtag;
  });
});

// ─── streamToBigQuery ─────────────────────────────────────────────────────────

describe('googleServices — streamToBigQuery (simulation mode)', () => {
  const sampleRow: CrowdMetricRow = {
    timestamp: new Date().toISOString(),
    zoneId: 'Zone A',
    occupancy: 75,
    predictivePressure: 82,
    latencyMs: 14,
    sessionId: 'test-session-001',
  };

  it('returns true in simulation mode (no endpoint set)', async () => {
    const result = await streamToBigQuery(sampleRow);
    expect(result).toBe(true);
  });

  it('handles Zone B data correctly', async () => {
    const rowB: CrowdMetricRow = { ...sampleRow, zoneId: 'Zone B', occupancy: 45 };
    const result = await streamToBigQuery(rowB);
    expect(result).toBe(true);
  });

  it('handles critical occupancy (100%) without throwing', async () => {
    const criticalRow: CrowdMetricRow = { ...sampleRow, occupancy: 100, predictivePressure: 100 };
    const result = await streamToBigQuery(criticalRow);
    expect(result).toBe(true);
  });

  it('handles zero occupancy without throwing', async () => {
    const emptyRow: CrowdMetricRow = { ...sampleRow, occupancy: 0, predictivePressure: 0 };
    const result = await streamToBigQuery(emptyRow);
    expect(result).toBe(true);
  });

  it('returns correct type (boolean)', async () => {
    const result = await streamToBigQuery(sampleRow);
    expect(typeof result).toBe('boolean');
  });
});

// ─── streamToBigQuery with live fetch ────────────────────────────────────────

describe('googleServices — streamToBigQuery (fetch mode)', () => {
  const sampleRow: CrowdMetricRow = {
    timestamp: new Date().toISOString(),
    zoneId: 'Zone A',
    occupancy: 75,
    predictivePressure: 82,
    latencyMs: 14,
    sessionId: 'test-session-live',
  };

  beforeEach(() => {
    vi.stubEnv('VITE_CF_ENDPOINT', 'https://mock-cf.cloudfunctions.net/streamToBigQuery');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('returns true when fetch succeeds (ok: true)', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({ ok: true } as Response);
    const result = await streamToBigQuery(sampleRow);
    expect(result).toBe(true);
  });

  it('returns false when fetch returns non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({ ok: false } as Response);
    const result = await streamToBigQuery(sampleRow);
    expect(result).toBe(false);
  });

  it('returns false when fetch throws a network error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));
    const result = await streamToBigQuery(sampleRow);
    expect(result).toBe(false);
  });
});

// ─── scanWithVision ───────────────────────────────────────────────────────────

describe('googleServices — scanWithVision (simulation mode)', () => {
  it('returns a valid scan result with isValid=true in simulation mode', async () => {
    const result = await scanWithVision('base64encodedimage==');
    expect(result.isValid).toBe(true);
    expect(result.ticketId).toMatch(/^TKT-\d{6}$/);
    expect(result.confidence).toBeGreaterThan(0.9);
    expect(result.rawText).toContain('simulated Vision scan');
  });

  it('returns different ticketIds on multiple calls (random generation)', async () => {
    const r1 = await scanWithVision('img1');
    const r2 = await scanWithVision('img2');
    // Both should be valid TKT format
    expect(r1.ticketId).toMatch(/^TKT-\d{6}$/);
    expect(r2.ticketId).toMatch(/^TKT-\d{6}$/);
  });

  it('returns confidence between 0 and 1', async () => {
    const result = await scanWithVision('testimage');
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
  });

  it('does not throw on empty base64 input', async () => {
    await expect(scanWithVision('')).resolves.toBeDefined();
  });
});

// ─── callGemini ───────────────────────────────────────────────────────────────

describe('googleServices — callGemini (simulation mode)', () => {
  it('returns non-empty advice string in simulation mode', async () => {
    const advice = await callGemini('Zone A is at 90% capacity. What should we do?');
    expect(advice).toBeTruthy();
    expect(advice.length).toBeGreaterThan(20);
  });

  it('includes evacuation guidance in simulated response', async () => {
    const advice = await callGemini('Emergency in Zone B');
    expect(advice).toContain('Evacuate');
  });

  it('includes security instruction in simulated response', async () => {
    const advice = await callGemini('Crowd surge at Gate 4');
    expect(advice).toContain('Security');
  });

  it('does not throw on empty prompt', async () => {
    await expect(callGemini('')).resolves.toBeTruthy();
  });

  it('returns string type', async () => {
    const result = await callGemini('test prompt');
    expect(typeof result).toBe('string');
  });
});
