import React, { useState } from 'react';
import { 
  X, 
  GripVertical, 
  Eye, 
  EyeOff, 
  Plus, 
  LayoutGrid,
  Save,
  RotateCcw,
  Settings
} from 'lucide-react';

const availableWidgets = [
  { id: 'stats', name: 'Key Statistics', description: 'Overview of important metrics', defaultSize: 'full' },
  { id: 'recent', name: 'Recent Activity', description: 'Latest supporter actions', defaultSize: 'half' },
  { id: 'upcoming', name: 'Upcoming Events', description: 'Next scheduled events', defaultSize: 'half' },
  { id: 'campaigns', name: 'Active Campaigns', description: 'Current fundraising efforts', defaultSize: 'half' },
  { id: 'map', name: 'Geographic Distribution', description: 'Supporter locations map', defaultSize: 'half' },
  { id: 'engagement', name: 'Engagement Trends', description: 'User interaction analytics', defaultSize: 'full' },
  { id: 'messages', name: 'Recent Messages', description: 'Latest communications', defaultSize: 'third' },
  { id: 'todos', name: 'Task List', description: 'Your pending tasks', defaultSize: 'third' },
  { id: 'notifications', name: 'Live Notifications', description: 'Real-time updates', defaultSize: 'third' }
];

function WidgetCard({ widget, onToggle, onSizeChange, isDragging }) {
  const sizes = ['third', 'half', 'two-thirds', 'full'];
  const sizeLabels = {
    third: '1/3',
    half: '1/2',
    'two-thirds': '2/3',
    full: 'Full'
  };

  return (
    <div className={`admin-card p-4 ${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <button className="cursor-move p-1 text-gray-400 hover:text-gray-600">
            <GripVertical size={16} />
          </button>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{widget.name}</h4>
            <p className="text-sm text-gray-500">{widget.description}</p>
          </div>
        </div>
        <button
          onClick={() => onToggle(widget.id)}
          className={`p-2 rounded-lg transition-colors ${
            widget.enabled 
              ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
              : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
          }`}
        >
          {widget.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
      
      {widget.enabled && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-gray-600">Size:</span>
          <div className="flex gap-1">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => onSizeChange(widget.id, size)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  widget.size === size
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sizeLabels[size]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function DashboardCustomizer({ isOpen, onClose, widgets, onSave }) {
  const [localWidgets, setLocalWidgets] = useState(widgets);
  const [isDirty, setIsDirty] = useState(false);

  const handleToggle = (widgetId) => {
    setLocalWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, enabled: !widget.enabled }
        : widget
    ));
    setIsDirty(true);
  };

  const handleSizeChange = (widgetId, size) => {
    setLocalWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, size }
        : widget
    ));
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave(localWidgets);
    setIsDirty(false);
    onClose();
  };

  const handleReset = () => {
    const defaultWidgets = availableWidgets.map(widget => ({
      ...widget,
      enabled: true,
      size: widget.defaultSize
    }));
    setLocalWidgets(defaultWidgets);
    setIsDirty(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Customizer Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <LayoutGrid className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Customize Dashboard</h2>
                <p className="text-sm text-gray-500">Choose and arrange your widgets</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Widget List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {localWidgets.map((widget) => (
              <WidgetCard
                key={widget.id}
                widget={widget}
                onToggle={handleToggle}
                onSizeChange={handleSizeChange}
              />
            ))}
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Drag widgets to reorder them</li>
              <li>• Toggle visibility with the eye icon</li>
              <li>• Adjust widget sizes for optimal layout</li>
              <li>• Changes are saved to your profile</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <RotateCcw size={16} />
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDirty
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}