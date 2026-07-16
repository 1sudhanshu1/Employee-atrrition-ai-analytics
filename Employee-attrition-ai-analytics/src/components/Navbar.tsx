import React from 'react';
import { Menu, Sun, Moon, User } from 'lucide-react';

interface NavbarProps {
  onMenuOpen: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  pageTitle: string;
}

export default function Navbar({ onMenuOpen, theme, onThemeToggle, pageTitle }: NavbarProps) {
  const userEmail = "sudhanshunikam1@gmail.com";

  return (
    <header 
      id="main-header"
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 transition-colors"
    >
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuOpen}
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          id="mobile-menu-trigger"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        </button>

        {/* Dynamic Page Header */}
        <h2 
          className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white"
          id="navbar-page-title"
        >
          {pageTitle}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={onThemeToggle}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-all duration-200"
          id="theme-toggle-btn"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 transition-transform hover:rotate-12" />
          ) : (
            <Sun className="h-5 w-5 transition-transform hover:rotate-90" />
          )}
        </button>

        {/* Active Session / Profile indicator */}
        <div 
          className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-800"
          id="user-profile-badge"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
            <User className="h-3.5 w-3.5" />
          </div>
          <span 
            className="hidden text-xs font-medium text-slate-600 dark:text-slate-300 sm:inline"
            id="user-email-text"
          >
            {userEmail}
          </span>
        </div>
      </div>
    </header>
  );
}
