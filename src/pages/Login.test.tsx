import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component — full interaction coverage', () => {
  const renderLogin = () => render(<MemoryRouter><Login /></MemoryRouter>);

  it('renders the login form with email and password fields', () => {
    renderLogin();
    expect(screen.getByLabelText(/email address/i)).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
  });

  it('handles login execution', () => {
    vi.useFakeTimers();
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const passInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passInput, { target: { value: 'password123' } });
    
    const submitBtn = screen.getByText('Sign In');
    fireEvent.click(submitBtn);

    act(() => { vi.advanceTimersByTime(1500); });
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
    vi.useRealTimers();
  });

  it('handles google login execution', () => {
    vi.useFakeTimers();
    renderLogin();
    
    const googleBtn = screen.getByRole('button', { name: /sign in with google/i });
    fireEvent.click(googleBtn);
    
    act(() => { vi.advanceTimersByTime(1500); });
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
    vi.useRealTimers();
  });

  it('validates password length', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const passInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passInput, { target: { value: 'short' } });
    
    const submitBtn = screen.getByText('Sign In');
    fireEvent.click(submitBtn);

    expect(alertMock).toHaveBeenCalledWith('Password must be at least 8 characters');
    alertMock.mockRestore();
  });

  it('handles sign up execution', () => {
    vi.useFakeTimers();
    renderLogin();
    
    const toggle = screen.getByRole('button', { name: /need an internal account/i });
    fireEvent.click(toggle);

    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const passInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passInput, { target: { value: 'password123' } });
    
    const submitBtn = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitBtn);

    act(() => { vi.advanceTimersByTime(1500); });
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    expect(user.name).toBe('John Doe');
    vi.useRealTimers();
  });

  it('toggles to Sign Up mode and back', () => {
    renderLogin();
    let toggle = screen.getByRole('button', { name: /need an internal account/i });
    fireEvent.click(toggle);
    
    toggle = screen.getByRole('button', { name: /already have an account/i });
    fireEvent.click(toggle);
    
    expect(screen.getAllByRole('button', { name: /sign in/i })).toBeTruthy();
  });
});
