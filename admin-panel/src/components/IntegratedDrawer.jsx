import React, { useEffect } from 'react';
import { X, ChevronLeft } from 'lucide-react';

export function IntegratedDrawer({ 
  isOpen, 
  onClose, 
  title, 
  icon: Icon,
  children, 
  width = 'w-96', 
  showHeader = true,
  showBackButton = false,
  onBack = null 
}) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop - only visible on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div className={`
        integrated-drawer fixed top-0 right-0 h-full ${width} 
        bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col border-l border-gray-200
        max-w-full
      `}>
        {showHeader && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              {showBackButton && onBack && (
                <button
                  onClick={onBack}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {Icon && (
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}

// Specialized drawer for forms
export function FormDrawer({ isOpen, onClose, title, icon, children, width = 'w-96', showBackButton = false, onBack = null }) {
  return (
    <IntegratedDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={icon}
      width={width}
      showBackButton={showBackButton}
      onBack={onBack}
    >
      <div className="p-6">
        {children}
      </div>
    </IntegratedDrawer>
  );
}

// Hook to manage drawer state and content transitions
export function useDrawerTransition() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  // Add transition class to main content
  React.useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      if (isDrawerOpen) {
        mainContent.classList.add('drawer-open');
      } else {
        mainContent.classList.remove('drawer-open');
      }
    }
  }, [isDrawerOpen]);

  return {
    isDrawerOpen,
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
    toggleDrawer: () => setIsDrawerOpen(!isDrawerOpen)
  };
}