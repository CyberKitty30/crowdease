import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LostAndFound from './LostAndFound';

describe('LostAndFound Component', () => {
  it('renders correctly', () => {
    render(<LostAndFound />);
    expect(screen.getByText('Report Found Item')).toBeInTheDocument();
  });

  it('submits new item to global directory', () => {
    vi.useFakeTimers();
    render(<LostAndFound />);
    
    const descInput = screen.getByPlaceholderText('e.g. Silver Mac OS Laptop...');
    const locInput = screen.getByPlaceholderText('e.g. Section 104, Row G');
    
    fireEvent.change(descInput, { target: { value: 'Gold Watch' } });
    fireEvent.change(locInput, { target: { value: 'Lobby' } });
    
    const submitBtn = screen.getByRole('button', { name: /Log Discovery/i });
    fireEvent.click(submitBtn);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('Gold Watch')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
