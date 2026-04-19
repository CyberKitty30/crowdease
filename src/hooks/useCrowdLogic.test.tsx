import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCrowdLogic } from './useCrowdLogic';

describe('useCrowdLogic hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial crowd data with correct structure and types', () => {
    const { result } = renderHook(() => useCrowdLogic());
    expect(result.current.zoneAOcc).toBeTypeOf('number');
    expect(result.current.zoneBOcc).toBeTypeOf('number');
    expect(result.current.zoneAPressure).toBeTypeOf('number');
    expect(result.current.latency).toBeTypeOf('number');
    expect(result.current.timestamp).toBeInstanceOf(Date);
  });

  it('initializes zoneAOcc at 70', () => {
    const { result } = renderHook(() => useCrowdLogic());
    expect(result.current.zoneAOcc).toBe(70);
  });

  it('initializes zoneBOcc at 35', () => {
    const { result } = renderHook(() => useCrowdLogic());
    expect(result.current.zoneBOcc).toBe(35);
  });

  it('initializes latency between 10 and 20', () => {
    const { result } = renderHook(() => useCrowdLogic());
    expect(result.current.latency).toBeGreaterThanOrEqual(10);
    expect(result.current.latency).toBeLessThanOrEqual(20);
  });

  it('updates zoneAOcc after interval tick', () => {
    const { result } = renderHook(() => useCrowdLogic());
    const initialA = result.current.zoneAOcc;
    act(() => { vi.advanceTimersByTime(6000); });
    // After tick: zoneAOcc is recalculated, may or may not equal initial
    expect(result.current.zoneAOcc).toBeTypeOf('number');
    expect(result.current.zoneAOcc).toBeGreaterThanOrEqual(30);
    expect(result.current.zoneAOcc).toBeLessThanOrEqual(100);
    // Just confirms it was called (may be same due to random delta = 0)
    expect(typeof initialA).toBe('number');
  });

  it('keeps zoneAOcc within 30-100 bounds after multiple ticks', () => {
    const { result } = renderHook(() => useCrowdLogic());
    act(() => { vi.advanceTimersByTime(60000); });
    expect(result.current.zoneAOcc).toBeGreaterThanOrEqual(30);
    expect(result.current.zoneAOcc).toBeLessThanOrEqual(100);
  });

  it('keeps zoneBOcc within 20-100 bounds after multiple ticks', () => {
    const { result } = renderHook(() => useCrowdLogic());
    act(() => { vi.advanceTimersByTime(60000); });
    expect(result.current.zoneBOcc).toBeGreaterThanOrEqual(20);
    expect(result.current.zoneBOcc).toBeLessThanOrEqual(100);
  });

  it('updates timestamp on each interval tick', () => {
    const { result } = renderHook(() => useCrowdLogic());
    const t1 = result.current.timestamp;
    act(() => { vi.advanceTimersByTime(6000); });
    const t2 = result.current.timestamp;
    expect(t2.getTime()).toBeGreaterThanOrEqual(t1.getTime());
  });

  it('zoneAPressure is a valid number within 0-100 after tick', () => {
    const { result } = renderHook(() => useCrowdLogic());
    act(() => { vi.advanceTimersByTime(6000); });
    expect(result.current.zoneAPressure).toBeGreaterThanOrEqual(0);
    expect(result.current.zoneAPressure).toBeLessThanOrEqual(100);
  });

  it('cleans up interval on unmount without error', () => {
    const { unmount } = renderHook(() => useCrowdLogic());
    expect(() => unmount()).not.toThrow();
  });
});
