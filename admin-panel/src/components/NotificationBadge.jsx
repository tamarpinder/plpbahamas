import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

export function NotificationBadge({ onClick }) {
  const { unreadCount } = useNotifications();

  return (
    <button 
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
    >
      <Bell size={20} />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 flex items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
          <span className="relative inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        </span>
      )}
    </button>
  );
}