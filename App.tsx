import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Company from './pages/Company';
import BottomNav from './components/BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-slate-900 pb-20 max-w-md mx-auto shadow-2xl overflow-hidden border-x border-gray-200">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

// Layout without bottom nav for full page details if needed, 
// but for now keeping nav is fine, or we can hide it.
// Let's keep bottom nav for consistency unless it's a deep dive.
// For WorkDetail, usually we might want to hide BottomNav or keep it.
// Given the "mobile-first" nature, usually level 2 pages hide bottom nav or keep it depending on depth.
// Let's keep it simple: WorkDetail shares the same Layout for now.

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/inbox" element={<Layout><Inbox /></Layout>} />
      <Route path="/work" element={<Layout><Work /></Layout>} />
      <Route path="/work/:id" element={<Layout><WorkDetail /></Layout>} />
      <Route path="/company" element={<Layout><Company /></Layout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;