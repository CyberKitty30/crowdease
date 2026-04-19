import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Analytics from './Analytics';

describe('Analytics Component', () => {
  it('renders Google Cloud BigQuery badge and predictive components', () => {
    render(<Analytics />);
    expect(screen.getByText(/Google Cloud BigQuery/i)).toBeTruthy();
    expect(screen.getByText(/Predictive Index/i)).toBeTruthy();
  });
});
