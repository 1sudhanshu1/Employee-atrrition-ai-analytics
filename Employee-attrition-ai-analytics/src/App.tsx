import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Page Imports
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import Prediction from './pages/Prediction';
import Explain from './pages/Explain';
import About from './pages/About';

function AppContent() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('pulsehr-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    // default to light theme for a clean, high-contrast dashboard
    return 'light';
  });

  // Sync theme changes with DOM document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pulsehr-theme', theme);
  }, [theme]);

  // Scroll to top on route change
  useEffect(() => {
    const mainContent = document.getElementById('main-scrollable-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [location.pathname]);

  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Get current active title based on path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'PulseHR Dashboard';
      case '/analytics':
        return 'Workforce Structural Analytics';
      case '/prediction':
        return 'Attrition Flight Predictor';
      case '/explain':
        return 'Model Interpretability & Transparency';
      case '/about':
        return 'System Specifications';
      default:
        return 'PulseHR Pulse';
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Sidebar vertical panel */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main content body panel */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Horizontal Header Navbar */}
        <Navbar 
          onMenuOpen={() => setSidebarOpen(true)}
          theme={theme}
          onThemeToggle={handleThemeToggle}
          pageTitle={getPageTitle()}
        />

        {/* Scrollable Main content page viewport */}
        <main 
          id="main-scrollable-content"
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-950/20"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/explain" element={<Explain />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
