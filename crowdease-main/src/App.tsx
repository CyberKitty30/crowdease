import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import TicketScanner from './pages/TicketScanner';
import LostAndFound from './pages/LostAndFound';
import SafetySOS from './pages/SafetySOS';
import Navigation from './pages/Navigation';
import Queues from './pages/Queues';
import Upgrades from './pages/Upgrades';

import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { useAccessibility } from './contexts/AccessibilityTypes';
import { MotionConfig } from 'framer-motion';

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

function AppRoot() {
  const { reducedMotion } = useAccessibility();
  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      <HashRouter>
        <AppLayout>
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
        </AppLayout>
      </HashRouter>
    </MotionConfig>
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
