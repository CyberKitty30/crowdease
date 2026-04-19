import React, { useState, Suspense, lazy } from 'react';
import type { ReactNode } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Login = lazy(() => import('./pages/Login'));
const TicketScanner = lazy(() => import('./pages/TicketScanner'));
const LostAndFound = lazy(() => import('./pages/LostAndFound'));
const SafetySOS = lazy(() => import('./pages/SafetySOS'));
const Navigation = lazy(() => import('./pages/Navigation'));
const Queues = lazy(() => import('./pages/Queues'));
const Upgrades = lazy(() => import('./pages/Upgrades'));

import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { useAccessibility } from './contexts/AccessibilityTypes';
import { MotionConfig } from 'framer-motion';

// Reliability: Global Error Boundary
class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tighter">System Alert</h1>
            <p className="text-slate-500 mb-8 font-medium">The Digital Twin encountered a synchronized deviation. Safety recovery procedures are active.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition-transform hover:scale-105 active:scale-95"
            >
              Restart Matrix Interface
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = localStorage.getItem('isAuthenticated');
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col text-slate-800 overflow-hidden h-screen w-screen font-sans relative">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto lg:overflow-hidden p-3 sm:p-4 relative flex flex-col w-full">
          <div className="w-full flex flex-col flex-1 lg:h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

const LoadingFallback = () => (
  <div className="flex w-full h-full items-center justify-center bg-slate-50 relative z-50">
    <div className="w-10 h-10 border-4 border-slate-200 border-t-periwinkle-dark rounded-full animate-spin shadow-lg"></div>
  </div>
);

function AppRoot() {
  const { reducedMotion } = useAccessibility();
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
        <HashRouter>
          <AppLayout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Login />} />
                
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/upgrades" element={<ProtectedRoute><Upgrades /></ProtectedRoute>} />
                <Route path="/queues" element={<ProtectedRoute><Queues /></ProtectedRoute>} />
                <Route path="/navigation" element={<ProtectedRoute><Navigation /></ProtectedRoute>} />
                <Route path="/tickets" element={<ProtectedRoute><TicketScanner /></ProtectedRoute>} />
                <Route path="/lost-found" element={<ProtectedRoute><LostAndFound /></ProtectedRoute>} />
                <Route path="/safety" element={<ProtectedRoute><SafetySOS /></ProtectedRoute>} />
              </Routes>
            </Suspense>
          </AppLayout>
        </HashRouter>
      </MotionConfig>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <AccessibilityProvider>
      <AppRoot />
    </AccessibilityProvider>
  );
}

export default App;
