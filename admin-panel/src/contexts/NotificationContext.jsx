import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { showToast } from '../components/NotificationToast';

const NotificationContext = createContext();

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

// Mock notification generator for demo
const generateMockNotification = () => {
  const types = ['user', 'event', 'donation', 'message', 'system'];
  const titles = {
    user: 'New Supporter Registered',
    event: 'Event Update',
    donation: 'New Donation Received',
    message: 'New Message',
    system: 'System Alert'
  };
  const descriptions = {
    user: 'A new supporter just joined from Nassau',
    event: 'Youth Rally attendance has reached capacity',
    donation: '$250 donation received for Healthcare Initiative',
    message: 'You have 3 unread messages',
    system: 'Daily backup completed successfully'
  };
  
  const type = types[Math.floor(Math.random() * types.length)];
  
  return {
    id: Date.now() + Math.random(),
    type,
    title: titles[type],
    description: descriptions[type],
    timestamp: new Date(),
    read: false,
    priority: type === 'system' ? 'low' : type === 'donation' ? 'high' : 'medium'
  };
};

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('notificationSound') !== 'false';
  });

  // Calculate unread count
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Add a new notification
  const addNotification = useCallback((notification) => {
    const newNotification = {
      ...notification,
      id: notification.id || Date.now(),
      timestamp: notification.timestamp || new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for high priority notifications
    if (newNotification.priority === 'high' && !isPaused) {
      showToast(
        'info',
        newNotification.title,
        newNotification.description,
        6000
      );
    }
    
    // Play sound if enabled
    if (soundEnabled && !isPaused) {
      // In a real app, you would play an actual sound here
      console.log('🔔 Notification sound');
    }
    
    return newNotification;
  }, [soundEnabled, isPaused]);

  // Mark notification as read
  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  }, []);

  // Delete a notification
  const deleteNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Toggle sound
  const toggleSound = useCallback(() => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('notificationSound', newValue.toString());
  }, [soundEnabled]);

  // Demo: Generate random notifications
  useEffect(() => {
    if (isPaused) return;
    
    // Generate initial notifications
    const initialNotifications = Array.from({ length: 3 }, () => generateMockNotification());
    setNotifications(initialNotifications);
    
    // Generate new notifications periodically
    const interval = setInterval(() => {
      if (!isPaused && Math.random() > 0.7) {
        addNotification(generateMockNotification());
      }
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [isPaused, addNotification]);

  const value = {
    notifications,
    unreadCount,
    soundEnabled,
    isPaused,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    toggleSound,
    pauseNotifications: () => setIsPaused(true),
    resumeNotifications: () => setIsPaused(false)
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}