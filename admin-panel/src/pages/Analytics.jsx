import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Target,
  Calendar,
  MapPin,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  Activity,
  DollarSign,
  MessageSquare,
  Clock,
  Globe,
  Smartphone,
  Mail
} from 'lucide-react';

function MetricCard({ title, value, change, changeType, icon: Icon, color }) {
  return (
    <div className="admin-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      {change && (
        <div className="flex items-center mt-2">
          <TrendingUp size={16} className={`mr-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`} />
          <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
}

function SimpleChart({ title, data, color = "blue" }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="admin-card p-6">
      <h3 className="heading-sm mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{item.label}</span>
            <div className="flex items-center gap-3 flex-1 ml-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900 w-12 text-right">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightCard({ title, insight, trend, icon: Icon }) {
  return (
    <div className="admin-card p-6">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
          <p className="text-sm text-gray-600 mb-3">{insight}</p>
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp size={14} className="text-green-600" />
              <span className="text-green-600 font-medium">{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Mock analytics data
  const supporterGrowth = [
    { label: 'Jan', value: 2340 },
    { label: 'Feb', value: 2890 },
    { label: 'Mar', value: 3120 },
    { label: 'Apr', value: 3450 },
    { label: 'May', value: 3780 },
    { label: 'Jun', value: 4120 }
  ];

  const engagementByChannel = [
    { label: 'Email', value: 68.5 },
    { label: 'Social Media', value: 72.3 },
    { label: 'SMS', value: 89.1 },
    { label: 'Mobile App', value: 71.5 },
    { label: 'Events', value: 85.2 }
  ];

  const geographicData = [
    { label: 'Nassau', value: 45680 },
    { label: 'Grand Bahama', value: 23400 },
    { label: 'Abaco', value: 12300 },
    { label: 'Eleuthera', value: 8900 },
    { label: 'Exuma', value: 5600 },
    { label: 'Other Islands', value: 15200 }
  ];

  const demographics = [
    { label: '18-25', value: 18.5 },
    { label: '26-35', value: 32.4 },
    { label: '36-50', value: 28.7 },
    { label: '51-65', value: 15.2 },
    { label: '65+', value: 5.2 }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Deep insights into supporter behavior and engagement patterns.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Supporters"
          value="45,680"
          change="+12.5%"
          changeType="positive"
          icon={Users}
          color="text-blue-600"
        />
        <MetricCard
          title="Monthly Engagement"
          value="72.8%"
          change="+3.2%"
          changeType="positive"
          icon={Activity}
          color="text-green-600"
        />
        <MetricCard
          title="Total Donations"
          value="$125,340"
          change="+18.7%"
          changeType="positive"
          icon={DollarSign}
          color="text-yellow-600"
        />
        <MetricCard
          title="Event Attendance"
          value="2,845"
          change="+8.1%"
          changeType="positive"
          icon={Calendar}
          color="text-purple-600"
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart 
          title="Supporter Growth (Monthly)" 
          data={supporterGrowth}
          color="blue"
        />
        <SimpleChart 
          title="Engagement by Channel (%)" 
          data={engagementByChannel}
          color="green"
        />
        <SimpleChart 
          title="Geographic Distribution" 
          data={geographicData}
          color="purple"
        />
        <SimpleChart 
          title="Age Demographics (%)" 
          data={demographics}
          color="yellow"
        />
      </div>

      {/* Insights section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InsightCard
          title="SMS Performance"
          insight="SMS campaigns show the highest engagement rate at 89.1%, significantly outperforming other channels."
          trend="+14.2% improvement"
          icon={MessageSquare}
        />
        <InsightCard
          title="Youth Engagement"
          insight="Supporters aged 26-35 represent 32.4% of our base and show the highest donation conversion rate."
          trend="+8.7% growth"
          icon={Users}
        />
        <InsightCard
          title="Event Impact"
          insight="Live events generate 3x more social media engagement compared to virtual events."
          trend="+25.8% reach"
          icon={Calendar}
        />
      </div>

      {/* Detailed metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Communication metrics */}
        <div className="admin-card p-6">
          <h3 className="heading-sm mb-4">Communication Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Email Campaigns</p>
                  <p className="text-sm text-gray-500">89 sent this month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">68.5%</p>
                <p className="text-sm text-gray-500">Open rate</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">18 sent this month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">71.5%</p>
                <p className="text-sm text-gray-500">Open rate</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Social Media</p>
                  <p className="text-sm text-gray-500">15 posts this month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">80.8%</p>
                <p className="text-sm text-gray-500">Engagement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top performing content */}
        <div className="admin-card p-6">
          <h3 className="heading-sm mb-4">Top Performing Content</h3>
          <div className="space-y-3">
            {[
              { title: 'Healthcare Initiative Launch', views: 15420, type: 'Article' },
              { title: 'Youth Rally Promotional Video', views: 8750, type: 'Video' },
              { title: 'Economic Development Strategy', views: 6890, type: 'Article' },
              { title: 'Women\'s Forum Announcement', views: 4560, type: 'Article' },
              { title: 'Parliamentary Live Stream', views: 3240, type: 'Video' }
            ].map((content, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{content.title}</p>
                    <p className="text-xs text-gray-500">{content.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{content.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick stats summary */}
      <div className="admin-card p-6">
        <h3 className="heading-sm mb-4">Quick Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">156</p>
            <p className="text-sm text-gray-600">Campaigns Sent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">85.2%</p>
            <p className="text-sm text-gray-600">Event Attendance</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-600">Active Events</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">4,567</p>
            <p className="text-sm text-gray-600">Total Donors</p>
          </div>
        </div>
      </div>
    </div>
  );
}