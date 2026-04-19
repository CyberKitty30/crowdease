import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Navbar from './Navbar';
import { AccessibilityProvider } from '../contexts/AccessibilityContext';

describe('Navbar Component', () => {
  it('renders dynamic global interface properly', () => {
    const { container } = render(
      <AccessibilityProvider>
        <Navbar />
      </AccessibilityProvider>
    );
    expect(container).toBeTruthy();
  });
});
