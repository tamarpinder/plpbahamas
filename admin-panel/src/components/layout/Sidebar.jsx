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
  TrendingUp,
  MapPin,
  Megaphone,
  CheckSquare,
  Workflow
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
    name: 'Tasks', 
    href: '/tasks', 
    icon: CheckSquare,
    description: 'Task management & assignment'
  },
  { 
    name: 'Workflows', 
    href: '/workflows', 
    icon: Workflow,
    description: 'Process automation & templates'
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
      <div className={`fixed top-20 bottom-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent onClose={onClose} currentPath={location.pathname} />
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:top-20 lg:bottom-0 lg:left-0 lg:z-40 lg:block lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
        <SidebarContent currentPath={location.pathname} />
      </div>
    </>
  );
}

function SidebarContent({ onClose, currentPath }) {
  return (
    <div className="flex h-full flex-col">
      {/* Mobile close button */}
      {onClose && (
        <div className="flex justify-end p-4 lg:hidden">
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex-1 px-4 pt-6 pb-6 space-y-2 overflow-y-auto">
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
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-900'
              }`}
            >
              <Icon 
                size={20} 
                className={`${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'
                }`} 
              />
              <div className="flex-1">
                <div className={`font-medium ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-blue-900'}`}>
                  {item.name}
                </div>
                <div className={`text-xs mt-0.5 flex items-center justify-between ${
                  isActive ? 'text-blue-100' : 'text-gray-500 group-hover:text-blue-700'
                }`}>
                  <span>{item.description}</span>
                  <kbd className={`hidden lg:inline-block px-1.5 py-0.5 text-xs rounded border ${
                    isActive 
                      ? 'bg-white/20 text-blue-100 border-white/30' 
                      : 'bg-gray-200 text-gray-600 border-gray-300 group-hover:bg-blue-200 group-hover:text-blue-800'
                  }`}>
                    ⌘{navigation.indexOf(item) + 1}
                  </kbd>
                </div>
              </div>
              {isActive && (
                <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-sm"></div>
              )}
            </NavLink>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-200/50 shadow-sm">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-md">
            <TrendingUp size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-blue-900">Live Stats</div>
            <div className="text-xs text-blue-700">1,247 active users</div>
          </div>
        </div>
      </div>
    </div>
  );
}