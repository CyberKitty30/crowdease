import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TicketScanner from './TicketScanner';

describe('TicketScanner Component', () => {
  it('renders correctly', () => {
    render(<TicketScanner />);
    expect(screen.getByText('Awaiting Barcode')).toBeInTheDocument();
  });

  it('validates ticket successfully', () => {
    vi.useFakeTimers();
    render(<TicketScanner />);
    const input = screen.getByPlaceholderText('TKT-XXXX-VX');
    fireEvent.change(input, { target: { value: 'TKT-1234-V1' } });
    
    const submit = screen.getByText('Force Validation');
    fireEvent.click(submit);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Access Granted')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('declines invalid ticket', () => {
    vi.useFakeTimers();
    render(<TicketScanner />);
    const input = screen.getByPlaceholderText('TKT-XXXX-VX');
    fireEvent.change(input, { target: { value: 'TKT-1234-A1' } });
    
    const submit = screen.getByText('Force Validation');
    fireEvent.click(submit);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
