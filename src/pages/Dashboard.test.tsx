import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { MemoryRouter } from 'react-router-dom';

describe('Dashboard Component View', () => {
  it('renders heatmap visual elements without encountering UI crashes', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
    expect(screen.getByText(/Live Crowd Heatmap/i)).toBeTruthy();
    expect(screen.getByText(/Predictive Pressure/i)).toBeTruthy();
  });
});
