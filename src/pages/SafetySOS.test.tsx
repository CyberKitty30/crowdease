import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SafetySOS from './SafetySOS';

describe('SafetySOS Component', () => {
  it('renders correctly', () => {
    render(<SafetySOS />);
    expect(screen.getByText('Incident Log')).toBeInTheDocument();
  });

  it('triggers emergency correctly', () => {
    vi.useFakeTimers();
    render(<SafetySOS />);
    const medButton = screen.getByText('Medical SOS');
    fireEvent.click(medButton);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByText('Broadcast Locked: Teams En Route')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('submits form correctly', () => {
    vi.useFakeTimers();
    render(<SafetySOS />);
    const select = screen.getByRole('combobox');
    const location = screen.getByPlaceholderText('e.g. Ramp B Level 2 Concourse');
    const description = screen.getByPlaceholderText('Provide precise details for AI analysis...');
    
    fireEvent.change(select, { target: { value: 'medical' } });
    fireEvent.change(location, { target: { value: 'Zone A' } });
    fireEvent.change(description, { target: { value: 'Test incident' } });
    
    const submit = screen.getByText('Commit to Intelligence');
    fireEvent.click(submit);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Report Logged Successfully')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
