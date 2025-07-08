import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { PLPColors } from '../../constants/colors';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { KeyboardShortcutsHelp } from '../KeyboardShortcutsHelp';
import { QuickCreateMenu } from '../QuickCreateMenu';
import { NotificationToastContainer } from '../NotificationToast';

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600/75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Header - Full width */}
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      {/* Content wrapper with sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main content */}
        <div className="flex-1 lg:pl-64 main-content">
          {/* Page content */}
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Global components */}
      <KeyboardShortcutsHelp />
      <QuickCreateMenu />
      <NotificationToastContainer />
    </div>
  );
}