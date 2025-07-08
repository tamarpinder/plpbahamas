import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Mail, 
  MessageSquare, 
  UserPlus, 
  UserMinus, 
  Download, 
  Upload,
  Trash2,
  Edit,
  Tag,
  MapPin,
  Calendar,
  AlertTriangle,
  Users,
  Send,
  Archive,
  Star,
  CheckCircle2
} from 'lucide-react';

export function BulkActions({ 
  selectedItems, 
  onClearSelection, 
  onBulkAction,
  actionType = 'users' // users, events, campaigns, content
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);

  const handleAction = (action) => {
    if (action.requiresConfirmation) {
      setCurrentAction(action);
      setShowConfirmation(true);
    } else {
      onBulkAction(action, selectedItems);
    }
  };

  const confirmAction = () => {
    onBulkAction(currentAction, selectedItems);
    setShowConfirmation(false);
    setCurrentAction(null);
  };

  const getActionsForType = (type) => {
    const baseActions = [
      {
        id: 'export',
        label: 'Export Selected',
        icon: Download,
        color: 'bg-blue-600 hover:bg-blue-700',
        requiresConfirmation: false
      },
      {
        id: 'delete',
        label: 'Delete Selected',
        icon: Trash2,
        color: 'bg-red-600 hover:bg-red-700',
        requiresConfirmation: true,
        destructive: true
      }
    ];

    switch (type) {
      case 'users':
        return [
          {
            id: 'email',
            label: 'Send Email',
            icon: Mail,
            color: 'bg-green-600 hover:bg-green-700',
            requiresConfirmation: false
          },
          {
            id: 'sms',
            label: 'Send SMS',
            icon: MessageSquare,
            color: 'bg-purple-600 hover:bg-purple-700',
            requiresConfirmation: false
          },
          {
            id: 'tag',
            label: 'Add Tags',
            icon: Tag,
            color: 'bg-yellow-600 hover:bg-yellow-700',
            requiresConfirmation: false
          },
          {
            id: 'activate',
            label: 'Activate Users',
            icon: UserPlus,
            color: 'bg-green-600 hover:bg-green-700',
            requiresConfirmation: true
          },
          {
            id: 'deactivate',
            label: 'Deactivate Users',
            icon: UserMinus,
            color: 'bg-orange-600 hover:bg-orange-700',
            requiresConfirmation: true
          },
          ...baseActions
        ];
      
      case 'events':
        return [
          {
            id: 'duplicate',
            label: 'Duplicate Events',
            icon: Upload,
            color: 'bg-blue-600 hover:bg-blue-700',
            requiresConfirmation: false
          },
          {
            id: 'publish',
            label: 'Publish Events',
            icon: CheckCircle2,
            color: 'bg-green-600 hover:bg-green-700',
            requiresConfirmation: true
          },
          {
            id: 'archive',
            label: 'Archive Events',
            icon: Archive,
            color: 'bg-gray-600 hover:bg-gray-700',
            requiresConfirmation: true
          },
          {
            id: 'notify',
            label: 'Notify Attendees',
            icon: Send,
            color: 'bg-purple-600 hover:bg-purple-700',
            requiresConfirmation: false
          },
          ...baseActions
        ];
      
      case 'campaigns':
        return [
          {
            id: 'activate',
            label: 'Activate Campaigns',
            icon: CheckCircle2,
            color: 'bg-green-600 hover:bg-green-700',
            requiresConfirmation: true
          },
          {
            id: 'pause',
            label: 'Pause Campaigns',
            icon: X,
            color: 'bg-orange-600 hover:bg-orange-700',
            requiresConfirmation: true
          },
          {
            id: 'duplicate',
            label: 'Duplicate Campaigns',
            icon: Upload,
            color: 'bg-blue-600 hover:bg-blue-700',
            requiresConfirmation: false
          },
          ...baseActions
        ];
      
      case 'content':
        return [
          {
            id: 'publish',
            label: 'Publish Content',
            icon: CheckCircle2,
            color: 'bg-green-600 hover:bg-green-700',
            requiresConfirmation: true
          },
          {
            id: 'unpublish',
            label: 'Unpublish Content',
            icon: X,
            color: 'bg-orange-600 hover:bg-orange-700',
            requiresConfirmation: true
          },
          {
            id: 'feature',
            label: 'Feature Content',
            icon: Star,
            color: 'bg-yellow-600 hover:bg-yellow-700',
            requiresConfirmation: false
          },
          {
            id: 'share',
            label: 'Share to Social',
            icon: Send,
            color: 'bg-purple-600 hover:bg-purple-700',
            requiresConfirmation: false
          },
          ...baseActions
        ];
      
      default:
        return baseActions;
    }
  };

  const actions = getActionsForType(actionType);

  if (selectedItems.length === 0) return null;

  return (
    <>
      {/* Bulk Actions Bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            {/* Selection Info */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                {selectedItems.length} selected
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {actions.slice(0, 4).map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action)}
                    className={`flex items-center gap-2 px-3 py-2 text-white rounded-lg text-sm font-medium transition-colors ${action.color}`}
                  >
                    <Icon size={16} />
                    {action.label}
                  </button>
                );
              })}
              
              {actions.length > 4 && (
                <div className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <span className="text-sm">More</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {actions.slice(4).map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleAction(action)}
                          className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                            action.destructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                          }`}
                        >
                          <Icon size={16} />
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Clear Selection */}
            <button
              onClick={onClearSelection}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && currentAction && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-full ${
                    currentAction.destructive 
                      ? 'bg-red-100'
                      : 'bg-yellow-100'
                  }`}>
                    <AlertTriangle 
                      className={`w-5 h-5 ${
                        currentAction.destructive 
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`} 
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Confirm Action
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to {currentAction.label.toLowerCase()} {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}?
                  {currentAction.destructive && (
                    <span className="block mt-2 text-red-600 font-medium">
                      This action cannot be undone.
                    </span>
                  )}
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                    className={`flex-1 px-4 py-2 text-white rounded-lg ${
                      currentAction.destructive 
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {currentAction.label}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}