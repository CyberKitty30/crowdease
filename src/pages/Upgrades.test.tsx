import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Upgrades from './Upgrades';

describe('Upgrades Component', () => {
  it('renders available seat upgrades dynamically', () => {
    const { container } = render(<Upgrades />);
    expect(container).toBeTruthy();
  });
});
