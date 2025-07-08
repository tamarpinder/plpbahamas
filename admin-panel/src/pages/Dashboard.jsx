import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  UserPlus, 
  Eye,
  Heart,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  MapPin,
  Activity,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { PLPColors } from '../constants/colors';
import { DashboardCustomizer } from '../components/DashboardCustomizer';
import { LiveNotificationsWidget } from '../components/LiveNotificationsWidget';

// Mock data for the dashboard
const stats = [
  {
    name: 'Total Supporters',
    value: '12,847',
    change: '+12%',
    changeType: 'increase',
    icon: Users,
    color: 'blue'
  },
  {
    name: 'Active Events',
    value: '23',
    change: '+3',
    changeType: 'increase',
    icon: Calendar,
    color: 'green'
  },
  {
    name: 'Total Donations',
    value: '$89,247',
    change: '+18%',
    changeType: 'increase',
    icon: DollarSign,
    color: 'yellow'
  },
  {
    name: 'Engagement Rate',
    value: '74%',
    change: '-2%',
    changeType: 'decrease',
    icon: TrendingUp,
    color: 'purple'
  }
];

const recentActivity = [
  { id: 1, title: 'Sarah Johnson registered as new supporter', time: '2 minutes ago', icon: UserPlus, color: 'blue' },
  { id: 2, title: 'Youth Rally event ticket sales reached 85%', time: '15 minutes ago', icon: Calendar, color: 'green' },
  { id: 3, title: 'New donation of $500 from Marcus Williams', time: '1 hour ago', icon: DollarSign, color: 'yellow' },
  { id: 4, title: 'Healthcare Initiative article published', time: '2 hours ago', icon: MessageCircle, color: 'purple' },
  { id: 5, title: 'Town Hall meeting attendance confirmed: 145', time: '3 hours ago', icon: Users, color: 'blue' },
];

const upcomingEvents = [
  { title: 'Healthcare Town Hall', date: 'Jan 15', location: 'Nassau', type: 'Town Hall', attendees: '145 registered' },
  { title: 'Youth Leadership Rally', date: 'Jan 20', location: 'Grand Bahama', type: 'Rally', attendees: '320 registered' },
  { title: 'Economic Forum', date: 'Jan 25', location: 'Eleuthera', type: 'Forum', attendees: '87 registered' },
];

// Dashboard widgets
function StatsWidget({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const colorClasses = {
          blue: 'bg-blue-100 text-blue-600',
          green: 'bg-green-100 text-green-600',
          yellow: 'bg-yellow-100 text-yellow-600',
          purple: 'bg-purple-100 text-purple-600'
        };
        
        return (
          <div key={stat.name} className="admin-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                <Icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.changeType === 'increase' ? (
                <ArrowUpRight size={16} className="text-green-600" />
              ) : (
                <ArrowDownRight size={16} className="text-red-600" />
              )}
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RecentActivityWidget() {
  return (
    <div className="admin-card p-6">
      <h3 className="heading-sm mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recentActivity.map((activity, index) => {
          const Icon = activity.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            purple: 'bg-purple-100 text-purple-600'
          };
          
          return (
            <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${colorClasses[activity.color]}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UpcomingEventsWidget() {
  return (
    <div className="admin-card p-6">
      <h3 className="heading-sm mb-4">Upcoming Events</h3>
      <div className="space-y-3">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-900">{event.title}</h4>
              <span className="text-xs text-blue-600 font-medium">{event.type}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>{event.attendees}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeographicMapWidget() {
  return (
    <div className="admin-card p-6">
      <h3 className="heading-sm mb-4">Geographic Distribution</h3>
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
        <MapPin className="text-gray-400" size={48} />
      </div>
    </div>
  );
}

function EngagementTrendsWidget() {
  return (
    <div className="admin-card p-6">
      <h3 className="heading-sm mb-4">Engagement Trends</h3>
      <div className="h-64">
        {/* Placeholder for engagement chart */}
        <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center">
          <Activity className="text-gray-400" size={48} />
        </div>
      </div>
    </div>
  );
}

function TaskListWidget() {
  const tasks = [
    { id: 1, title: 'Review new supporter applications', priority: 'high', dueDate: 'Today' },
    { id: 2, title: 'Prepare monthly newsletter', priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, title: 'Update event calendar', priority: 'low', dueDate: 'This week' }
  ];

  return (
    <div className="admin-card p-6">
      <h3 className="heading-sm mb-4">Task List</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{task.title}</p>
              <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Dashboard() {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [widgets, setWidgets] = useState([
    { id: 'stats', name: 'Key Statistics', enabled: true, size: 'full', component: StatsWidget },
    { id: 'recent', name: 'Recent Activity', enabled: true, size: 'half', component: RecentActivityWidget },
    { id: 'upcoming', name: 'Upcoming Events', enabled: true, size: 'half', component: UpcomingEventsWidget },
    { id: 'notifications', name: 'Live Notifications', enabled: false, size: 'third', component: LiveNotificationsWidget },
    { id: 'map', name: 'Geographic Distribution', enabled: false, size: 'half', component: GeographicMapWidget },
    { id: 'engagement', name: 'Engagement Trends', enabled: false, size: 'full', component: EngagementTrendsWidget },
    { id: 'todos', name: 'Task List', enabled: false, size: 'third', component: TaskListWidget }
  ]);

  const handleSaveWidgets = (updatedWidgets) => {
    setWidgets(updatedWidgets.map(w => {
      const existing = widgets.find(widget => widget.id === w.id);
      return { ...w, component: existing.component };
    }));
  };

  const getSizeClass = (size) => {
    switch (size) {
      case 'third': return 'lg:col-span-1';
      case 'half': return 'lg:col-span-2';
      case 'two-thirds': return 'lg:col-span-2';
      case 'full': return 'lg:col-span-4';
      default: return 'lg:col-span-2';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's what's happening with your supporter community.
            </p>
          </div>
          <button
            onClick={() => setShowCustomizer(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Settings size={18} />
            Customize Dashboard
          </button>
        </div>
      </div>

      {/* Dynamic widget grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {widgets.filter(w => w.enabled).map((widget) => {
          const Component = widget.component;
          return (
            <div key={widget.id} className={getSizeClass(widget.size)}>
              <Component stats={stats} />
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="admin-card p-6">
        <h2 className="heading-md mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group">
            <UserPlus size={20} className="text-gray-400 group-hover:text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Add Supporter</div>
              <div className="text-sm text-gray-500">Manually add new user</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group">
            <Calendar size={20} className="text-gray-400 group-hover:text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Create Event</div>
              <div className="text-sm text-gray-500">Schedule new event</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group">
            <MessageCircle size={20} className="text-gray-400 group-hover:text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Send Message</div>
              <div className="text-sm text-gray-500">Broadcast to supporters</div>
            </div>
          </button>
        </div>
      </div>

      {/* Dashboard Customizer */}
      <DashboardCustomizer
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
        widgets={widgets}
        onSave={handleSaveWidgets}
      />
    </div>
  );
}