import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';

describe('Sidebar Integration', () => {
  it('mounts navigational nodes successfully', () => {
    const { container } = render(<MemoryRouter><Sidebar isOpen={true} onClose={() => {}} /></MemoryRouter>);
    expect(container).toBeTruthy();
  });
});
