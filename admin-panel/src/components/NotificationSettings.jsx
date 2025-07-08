import React from 'react';
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Bell, 
  BellOff,
  Pause,
  Play,
  TestTube,
  X
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { showToast } from './NotificationToast';

export function NotificationSettings({ isOpen, onClose }) {
  const {
    soundEnabled,
    isPaused,
    toggleSound,
    pauseNotifications,
    resumeNotifications,
    addNotification
  } = useNotifications();

  const testNotification = () => {
    addNotification({
      type: 'system',
      title: 'Test Notification',
      description: 'This is a test notification to check your settings.',
      priority: 'high'
    });
    showToast('success', 'Test Sent', 'Test notification has been sent!');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Settings Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Sound Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Sound</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">Notification Sounds</p>
                    <p className="text-xs text-gray-500">Play sound for new notifications</p>
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    soundEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Pause Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Status</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isPaused ? (
                    <BellOff className="w-5 h-5 text-red-600" />
                  ) : (
                    <Bell className="w-5 h-5 text-green-600" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {isPaused ? 'Notifications Paused' : 'Notifications Active'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isPaused ? 'New notifications are paused' : 'Receiving new notifications'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={isPaused ? resumeNotifications : pauseNotifications}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    isPaused
                      ? 'text-green-600 bg-green-50 hover:bg-green-100'
                      : 'text-red-600 bg-red-50 hover:bg-red-100'
                  }`}
                >
                  {isPaused ? (
                    <>
                      <Play size={14} />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause size={14} />
                      Pause
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Test Notification */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Test</h3>
              <button
                onClick={testNotification}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <TestTube size={16} />
                Send Test Notification
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <p className="text-xs text-gray-500 text-center">
              Notification preferences are saved automatically
            </p>
          </div>
        </div>
      </div>
    </>
  );
}