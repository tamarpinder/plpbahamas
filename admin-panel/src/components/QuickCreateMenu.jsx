import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  X, 
  User, 
  Calendar, 
  Target, 
  FileText, 
  Mail, 
  Zap,
  Users,
  MessageSquare,
  Video,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function QuickCreateItem({ icon: Icon, title, description, onClick, color = "blue" }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors group"
    >
      <div className={`p-3 bg-${color}-100 rounded-lg group-hover:bg-${color}-200 transition-colors`}>
        <Icon className={`w-5 h-5 text-${color}-600`} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
}

export function QuickCreateMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleShowQuickCreate = () => {
      setIsOpen(true);
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('showQuickCreateMenu', handleShowQuickCreate);
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('showQuickCreateMenu', handleShowQuickCreate);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const quickCreateItems = [
    {
      icon: User,
      title: 'Add Supporter',
      description: 'Register a new supporter to the database',
      action: () => {
        // Navigate to add supporter page or open modal
        navigate('/users');
        setIsOpen(false);
      },
      color: 'blue'
    },
    {
      icon: Calendar,
      title: 'Create Event',
      description: 'Schedule a new community event or rally',
      action: () => {
        navigate('/events');
        setIsOpen(false);
      },
      color: 'purple'
    },
    {
      icon: Target,
      title: 'Launch Campaign',
      description: 'Start a new fundraising or awareness campaign',
      action: () => {
        navigate('/campaigns');
        setIsOpen(false);
      },
      color: 'yellow'
    },
    {
      icon: FileText,
      title: 'Publish Content',
      description: 'Create and publish news, articles, or media',
      action: () => {
        navigate('/content');
        setIsOpen(false);
      },
      color: 'green'
    },
    {
      icon: Mail,
      title: 'Send Email',
      description: 'Compose and send email to supporters',
      action: () => {
        navigate('/communications');
        setIsOpen(false);
      },
      color: 'orange'
    },
    {
      icon: MessageSquare,
      title: 'Send SMS',
      description: 'Send text message to supporter groups',
      action: () => {
        navigate('/communications');
        setIsOpen(false);
      },
      color: 'purple'
    },
    {
      icon: Video,
      title: 'Start Live Stream',
      description: 'Begin live streaming an event or announcement',
      action: () => {
        alert('Live stream feature coming soon!');
        setIsOpen(false);
      },
      color: 'red'
    },
    {
      icon: Users,
      title: 'Create Group',
      description: 'Organize supporters into targeted groups',
      action: () => {
        navigate('/users');
        setIsOpen(false);
      },
      color: 'indigo'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Menu */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Quick Create</h2>
                <p className="text-sm text-gray-500">Choose what you'd like to create</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickCreateItems.map((item, index) => (
                <QuickCreateItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  onClick={item.action}
                  color={item.color}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                Use <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">⌘+Shift+N</kbd> to open this menu
              </span>
              <span>
                Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Esc</kbd> to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}