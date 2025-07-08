import React from 'react';
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
  ArrowDownRight
} from 'lucide-react';
import { PLPColors } from '../constants/colors';

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
  {
    id: 1,
    type: 'user',
    message: 'Sarah Johnson joined as a new supporter',
    time: '2 minutes ago',
    icon: UserPlus,
    color: 'green'
  },
  {
    id: 2,
    type: 'donation',
    message: 'Marcus Williams donated $150 to Healthcare Initiative',
    time: '12 minutes ago',
    icon: DollarSign,
    color: 'yellow'
  },
  {
    id: 3,
    type: 'event',
    message: '47 people registered for Nassau Town Hall',
    time: '1 hour ago',
    icon: Calendar,
    color: 'blue'
  },
  {
    id: 4,
    type: 'engagement',
    message: 'Community Clean-up post received 234 likes',
    time: '2 hours ago',
    icon: Heart,
    color: 'red'
  }
];

const topNews = [
  {
    id: 1,
    title: 'Healthcare Initiative Reaches 75% of Goal',
    views: 2847,
    comments: 45,
    time: '3 hours ago'
  },
  {
    id: 2,
    title: 'Youth Leadership Program Launches Next Month',
    views: 1923,
    comments: 28,
    time: '6 hours ago'
  },
  {
    id: 3,
    title: 'Community Development Update: Nassau East',
    views: 1456,
    comments: 19,
    time: '1 day ago'
  }
];

function StatCard({ stat }) {
  const Icon = stat.icon;
  const isIncrease = stat.changeType === 'increase';
  
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="admin-card admin-card-hover p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{stat.name}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {isIncrease ? (
          <ArrowUpRight size={16} className="text-green-600" />
        ) : (
          <ArrowDownRight size={16} className="text-red-600" />
        )}
        <span className={`text-sm font-medium ml-1 ${
          isIncrease ? 'text-green-600' : 'text-red-600'
        }`}>
          {stat.change}
        </span>
        <span className="text-sm text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  );
}

function ActivityItem({ activity }) {
  const Icon = activity.icon;
  
  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`p-2 rounded-lg ${colorClasses[activity.color]} flex-shrink-0`}>
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{activity.message}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="heading-xl">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your supporter community.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="admin-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-md">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all
              </button>
            </div>
            <div className="space-y-1">
              {recentActivity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Top Content */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-md">Top Content</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {topNews.map((article) => (
              <div key={article.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <h3 className="text-sm font-medium text-gray-900 mb-2 leading-5">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {article.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      {article.comments}
                    </span>
                  </div>
                  <span>{article.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
    </div>
  );
}