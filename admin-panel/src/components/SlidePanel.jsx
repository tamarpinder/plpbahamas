import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function SlidePanel({ 
  isOpen, 
  onClose, 
  title, 
  icon: Icon,
  children, 
  width = 'w-96', 
  position = 'right',
  showHeader = true 
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
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses = {
    right: 'right-0 translate-x-full',
    left: 'left-0 -translate-x-full'
  };

  const openClasses = {
    right: 'translate-x-0',
    left: 'translate-x-0'
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`
        fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full ${width} 
        bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? openClasses[position] : positionClasses[position]}
        flex flex-col
      `}>
        {showHeader && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
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

// Specialized panels for common use cases
export function NotificationSlidePanel({ isOpen, onClose, children }) {
  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="Notifications"
      icon={null}
      width="w-80"
      position="right"
    >
      {children}
    </SlidePanel>
  );
}

export function FormSlidePanel({ isOpen, onClose, title, icon, children, width = 'w-96' }) {
  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={icon}
      width={width}
      position="right"
    >
      <div className="p-6">
        {children}
      </div>
    </SlidePanel>
  );
}