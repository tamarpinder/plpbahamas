import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Target, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  X,
  Crown,
  TrendingUp,
  MapPin,
  Megaphone
} from 'lucide-react';
import { PLPColors } from '../../constants/colors';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    description: 'Overview & key metrics'
  },
  { 
    name: 'Supporters', 
    href: '/users', 
    icon: Users,
    description: 'User management & profiles'
  },
  { 
    name: 'Events', 
    href: '/events', 
    icon: Calendar,
    description: 'Event planning & analytics'
  },
  { 
    name: 'Campaigns', 
    href: '/campaigns', 
    icon: Target,
    description: 'Fundraising & donations'
  },
  { 
    name: 'Content', 
    href: '/content', 
    icon: FileText,
    description: 'News & media management'
  },
  { 
    name: 'Communications', 
    href: '/communications', 
    icon: MessageSquare,
    description: 'Messaging & outreach'
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3,
    description: 'Reports & insights'
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings,
    description: 'System configuration'
  }
];

export function Sidebar({ open, onClose }) {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent onClose={onClose} currentPath={location.pathname} />
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
        <SidebarContent currentPath={location.pathname} />
      </div>
    </>
  );
}

function SidebarContent({ onClose, currentPath }) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* PLP Logo */}
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Crown size={18} className="text-yellow-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">PLP Admin</h1>
            <p className="text-xs text-gray-500">Control Panel</p>
          </div>
        </div>
        
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href || (item.href === '/dashboard' && currentPath === '/');
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`group flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon 
                size={20} 
                className={`${
                  isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} 
              />
              <div className="flex-1">
                <div className={`font-medium ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                  {item.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 flex items-center justify-between">
                  <span>{item.description}</span>
                  <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-gray-200 text-gray-600 text-xs rounded border">
                    ⌘{navigation.indexOf(item) + 1}
                  </kbd>
                </div>
              </div>
              {isActive && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </NavLink>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
            <TrendingUp size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Live Stats</div>
            <div className="text-xs text-gray-500">1,247 active users</div>
          </div>
        </div>
      </div>
    </div>
  );
}