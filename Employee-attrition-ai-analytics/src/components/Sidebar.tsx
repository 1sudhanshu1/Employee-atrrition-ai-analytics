import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Sparkles, 
  Cpu, 
  Info, 
  X,
  Users
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'HR Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Attrition Predictor', path: '/prediction', icon: Sparkles },
    { name: 'Explainable AI', path: '/explain', icon: Cpu },
    { name: 'About App', path: '/about', icon: Info },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          id="sidebar-overlay"
        />
      )}

      {/* Main Sidebar */}
      <aside 
        id="main-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-slate-100 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-400" id="brand-logo" />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Pulse<span className="text-indigo-400">HR</span>
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="rounded p-1 hover:bg-slate-800 lg:hidden"
            id="close-sidebar-btn"
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 px-4 py-6" id="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-900/30'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`
                }
                id={`nav-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-6 border-t border-slate-800">
          <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
            <p className="font-semibold text-slate-300">Netlify Mode Enabled</p>
            <p className="mt-1">Serverless prediction logic simulated on dev server.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
