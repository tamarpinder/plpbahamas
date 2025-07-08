import React from 'react';
import { 
  Bell, 
  User, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  AlertCircle,
  ArrowRight,
  Settings
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

function NotificationItem({ notification }) {
  const getIcon = () => {
    switch (notification.type) {
      case 'user': return User;
      case 'event': return Calendar;
      case 'donation': return DollarSign;
      case 'message': return MessageSquare;
      case 'system': return AlertCircle;
      default: return Bell;
    }
  };

  const getColor = () => {
    switch (notification.type) {
      case 'user': return 'text-blue-600 bg-blue-100';
      case 'event': return 'text-purple-600 bg-purple-100';
      case 'donation': return 'text-green-600 bg-green-100';
      case 'message': return 'text-orange-600 bg-orange-100';
      case 'system': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const Icon = getIcon();
  const colorClasses = getColor();

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg group transition-colors">
      <div className={`p-2 rounded-lg ${colorClasses}`}>
        <Icon size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
        <p className="text-xs text-gray-500 truncate">{notification.description}</p>
        <p className="text-xs text-gray-400 mt-1">{formatTime(notification.timestamp)}</p>
      </div>
      <ArrowRight size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export function LiveNotificationsWidget() {
  const { notifications, unreadCount, soundEnabled, toggleSound } = useNotifications();
  
  // Show only the 5 most recent notifications
  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="admin-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h3 className="heading-sm">Live Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
            title={soundEnabled ? 'Mute notifications' : 'Unmute notifications'}
          >
            {soundEnabled ? (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            ) : (
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            )}
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors">
            <Settings size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {recentNotifications.length > 0 ? (
          recentNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Bell size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No recent notifications</p>
            <p className="text-xs mt-1">You're all caught up!</p>
          </div>
        )}
      </div>

      {notifications.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all notifications ({notifications.length})
          </button>
        </div>
      )}
    </div>
  );
}