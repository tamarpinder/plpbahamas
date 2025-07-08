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
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <Menu size={20} />
            </button>
            
            {/* Search */}
            <div className="hidden sm:block">
              <button
                onClick={openSearch}
                className="flex items-center gap-2 pl-10 pr-4 py-2 w-96 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <span className="text-gray-500">Search supporters, events, campaigns...</span>
                <div className="ml-auto flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-500">
                    ⌘K
                  </kbd>
                </div>
              </button>
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Mobile search */}
            <button 
              onClick={openSearch}
              className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <Search size={20} />
            </button>
            
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Keyboard shortcuts */}
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('showShortcutsHelp'))}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              title="Keyboard shortcuts (Press ?)"
            >
              <Keyboard size={20} />
            </button>
            
            {/* Notifications */}
            <NotificationBadge onClick={() => setShowNotifications(true)} />
            
            {/* User menu */}
            <div className="relative">
              <button className="flex items-center gap-3 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500">admin@plp.bs</div>
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