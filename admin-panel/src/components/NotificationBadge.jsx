import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

export function NotificationBadge({ onClick, variant = 'dark' }) {
  const { unreadCount } = useNotifications();

  const variantStyles = {
    dark: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    light: "text-white/80 hover:text-white hover:bg-white/10"
  };

  return (
    <button 
      onClick={onClick}
      className={`relative p-2 rounded-md transition-colors ${variantStyles[variant]}`}
      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
    >
      <Bell size={20} />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 flex items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75 animate-ping"></span>
          <span className="relative inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-blue-900 bg-yellow-400 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        </span>
      )}
    </button>
  );
}