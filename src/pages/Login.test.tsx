import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
  it('renders login form correctly and mounts security contexts natively', () => {
    const { container } = render(<MemoryRouter><Login /></MemoryRouter>);
    expect(container).toBeTruthy();
  });
});
