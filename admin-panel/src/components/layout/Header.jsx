import React, { useState } from 'react';
import { Menu, Bell, Search, User, Settings, LogOut, Command, Keyboard, Moon, Sun } from 'lucide-react';
import { PLPColors } from '../../constants/colors';
import { GlobalSearch, useGlobalSearch } from '../GlobalSearch';
import { useTheme } from '../../contexts/ThemeContext';
import { NotificationBadge } from '../NotificationBadge';
import { NotificationPanel } from '../NotificationPanel';

export function Header({ onMenuClick }) {
  const { isSearchOpen, openSearch, closeSearch } = useGlobalSearch();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg border-b border-blue-700">
        <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left side - Logo and branding */}
          <div className="flex items-center gap-6">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md"
            >
              <Menu size={20} />
            </button>
            
            {/* PLP Logo and branding */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {/* Main PLP Logo */}
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg border border-blue-300/30">
                  <img 
                    src="/assets/images/logos/Main Logo - PLP Blue.png" 
                    alt="Progressive Liberal Party Logo" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                
                {/* Text branding */}
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-white drop-shadow-sm">
                    Progressive Liberal Party
                  </h1>
                  <p className="text-sm text-blue-100 font-medium -mt-1">
                    Admin Control Panel
                  </p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="hidden lg:block w-px h-12 bg-blue-600/50"></div>
              
              {/* Search */}
              <div className="hidden lg:block">
                <button
                  onClick={openSearch}
                  className="flex items-center gap-2 pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/15 transition-all text-left relative min-w-[320px]"
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200" size={18} />
                  <span className="text-blue-100 text-sm">Search supporters, events, campaigns...</span>
                  <div className="ml-auto flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white/20 border border-white/30 rounded text-xs text-blue-100">
                      ⌘K
                    </kbd>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Mobile search */}
            <button 
              onClick={openSearch}
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md"
            >
              <Search size={20} />
            </button>
            
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Keyboard shortcuts */}
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('showShortcutsHelp'))}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              title="Keyboard shortcuts (Press ?)"
            >
              <Keyboard size={20} />
            </button>
            
            {/* Notifications */}
            <NotificationBadge 
              onClick={() => setShowNotifications(true)} 
              variant="light" 
            />
            
            {/* User menu */}
            <div className="relative">
              <button className="flex items-center gap-3 p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <User size={18} className="text-blue-600" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold text-white">Admin User</div>
                  <div className="text-xs text-blue-200">admin@plp.bs</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={closeSearch} />
      
      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  );
}