import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  CheckCheck, 
  Trash2, 
  Volume2, 
  VolumeX,
  User,
  Calendar,
  DollarSign,
  MessageSquare,
  AlertCircle,
  Settings,
  Filter,
  Clock
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { NotificationSettings } from './NotificationSettings';

function NotificationItem({ notification, onMarkAsRead, onDelete }) {
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

  const getPriorityDot = () => {
    switch (notification.priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const Icon = getIcon();
  const colorClasses = getColor();

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${colorClasses}`}>
          <Icon size={16} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                <div className={`w-2 h-2 rounded-full ${getPriorityDot()}`}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
              <p className="text-xs text-gray-500 mt-2">{formatTime(notification.timestamp)}</p>
            </div>
            
            <div className="flex items-center gap-1">
              {!notification.read && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Mark as read"
                >
                  <Check size={16} />
                </button>
              )}
              <button
                onClick={() => onDelete(notification.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotificationPanel({ isOpen, onClose }) {
  const {
    notifications,
    unreadCount,
    soundEnabled,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    toggleSound
  } = useNotifications();
  
  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500">
                  {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  unreadCount > 0
                    ? 'text-blue-600 hover:bg-blue-50'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <CheckCheck size={16} />
                Mark all read
              </button>
              <button
                onClick={clearAll}
                disabled={notifications.length === 0}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  notifications.length > 0
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <Trash2 size={16} />
                Clear all
              </button>
            </div>
            
            <button
              onClick={toggleSound}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              title={soundEnabled ? 'Mute notifications' : 'Unmute notifications'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="px-6 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto">
            {['all', 'unread', 'user', 'event', 'donation', 'message', 'system'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  filter === type
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Bell size={48} className="mb-4" />
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs text-gray-400 mt-1">
                {filter === 'all' ? "You're all caught up!" : `No ${filter} notifications`}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
          >
            <Settings size={16} />
            Notification Settings
          </button>
        </div>
      </div>
      
      {/* Notification Settings Modal */}
      <NotificationSettings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
}