import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Phone, 
  Megaphone,
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Copy,
  Trash2,
  Calendar,
  User,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  Target,
  Zap,
  Globe,
  Smartphone,
  Radio
} from 'lucide-react';
import { mockCommunications, communicationStats } from '../data/mockCommunications';
import { CreateCampaignModal } from '../components/modals/CreateCampaignModal';

function CommunicationCard({ communication }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      case 'push': return <Smartphone className="w-4 h-4" />;
      case 'social': return <Globe className="w-4 h-4" />;
      case 'radio': return <Radio className="w-4 h-4" />;
      default: return <Send className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent': return <CheckCircle2 className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'sending': return <Zap className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="admin-card admin-card-hover p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-blue-600">
              {getChannelIcon(communication.channel)}
              <span className="text-sm font-medium capitalize">{communication.channel}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(communication.status)}`}>
              <div className="flex items-center gap-1">
                {getStatusIcon(communication.status)}
                {communication.status}
              </div>
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{communication.subject}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{communication.preview}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
            <Copy size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
            <Edit size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Target size={14} />
            <span>{communication.audience}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{communication.recipients?.toLocaleString() || 0} recipients</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{communication.scheduledDate || communication.sentDate}</span>
          </div>
        </div>

        {communication.status === 'sent' && communication.metrics && (
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{communication.metrics.opened} opened</span>
            </div>
            <div className="flex items-center gap-1">
              <Target size={14} />
              <span>{communication.metrics.clicked} clicked</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp size={14} />
              <span>{communication.metrics.openRate}% open rate</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {communication.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
          {communication.tags?.length > 2 && (
            <span className="text-xs text-gray-500">+{communication.tags.length - 2} more</span>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          by {communication.author}
        </div>
      </div>
    </div>
  );
}

function QuickActionsCard() {
  return (
    <div className="admin-card p-6">
      <h3 className="heading-sm mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Email Campaign</p>
            <p className="text-sm text-gray-500">Send targeted email to supporters</p>
          </div>
        </button>
        
        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">SMS Broadcast</p>
            <p className="text-sm text-gray-500">Send text message alerts</p>
          </div>
        </button>
        
        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Push Notification</p>
            <p className="text-sm text-gray-500">Mobile app notifications</p>
          </div>
        </button>
        
        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Announcement</p>
            <p className="text-sm text-gray-500">Public announcement</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function RecentActivityItem({ activity }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'sent': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'opened': return <Eye className="w-4 h-4 text-purple-600" />;
      case 'clicked': return <Target className="w-4 h-4 text-orange-600" />;
      default: return <Send className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-shrink-0">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
        <p className="text-xs text-gray-500">{activity.details}</p>
      </div>
      <div className="text-xs text-gray-400">
        {activity.timestamp}
      </div>
    </div>
  );
}

export function Communications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [audienceFilter, setAudienceFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredCommunications = mockCommunications.filter(comm => {
    const matchesSearch = comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comm.status === statusFilter;
    const matchesChannel = channelFilter === 'all' || comm.channel === channelFilter;
    const matchesAudience = audienceFilter === 'all' || comm.audience === audienceFilter;
    
    return matchesSearch && matchesStatus && matchesChannel && matchesAudience;
  });

  const channels = [...new Set(mockCommunications.map(comm => comm.channel))];
  const audiences = [...new Set(mockCommunications.map(comm => comm.audience))];
  const recentActivity = communicationStats.recentActivity.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="heading-xl">Communications Hub</h1>
        <p className="text-gray-600 mt-2">
          Create, send, and track targeted communications across multiple channels.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900">{communicationStats.totalSent}</p>
            </div>
            <Send className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp size={16} className="text-green-600 mr-1" />
            <span className="text-sm text-green-600 font-medium">+18%</span>
            <span className="text-sm text-gray-500 ml-2">this month</span>
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">{communicationStats.averageOpenRate}%</p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">Industry avg: </span>
            <span className="text-sm font-medium ml-1">24.2%</span>
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Click Rate</p>
              <p className="text-2xl font-bold text-gray-900">{communicationStats.averageClickRate}%</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp size={16} className="text-green-600 mr-1" />
            <span className="text-sm text-green-600 font-medium">+2.1%</span>
            <span className="text-sm text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{communicationStats.activeCampaigns}</p>
            </div>
            <Megaphone className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">Scheduled: </span>
            <span className="text-sm font-medium ml-1">{communicationStats.scheduled}</span>
          </div>
        </div>
      </div>

      {/* Filters and actions */}
      <div className="admin-card p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search communications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
              <option value="sending">Sending</option>
            </select>
            
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Channels</option>
              {channels.map(channel => (
                <option key={channel} value={channel}>
                  {channel.charAt(0).toUpperCase() + channel.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Audiences</option>
              {audiences.map(audience => (
                <option key={audience} value={audience}>{audience}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            New Campaign
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Communications grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCommunications.map((communication) => (
              <CommunicationCard key={communication.id} communication={communication} />
            ))}
          </div>
          
          {filteredCommunications.length === 0 && (
            <div className="admin-card p-12 text-center">
              <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No communications found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or create a new campaign.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick actions */}
          <QuickActionsCard />

          {/* Recent activity */}
          <div className="admin-card p-6">
            <h3 className="heading-sm mb-4">Recent Activity</h3>
            <div className="space-y-1">
              {recentActivity.map((activity) => (
                <RecentActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Performance summary */}
          <div className="admin-card p-6">
            <h3 className="heading-sm mb-4">Channel Performance</h3>
            <div className="space-y-3">
              {communicationStats.channelPerformance.map((channel) => {
                const getChannelIcon = (channelType) => {
                  switch (channelType) {
                    case 'email': return <Mail className="w-4 h-4 text-blue-600" />;
                    case 'sms': return <MessageSquare className="w-4 h-4 text-green-600" />;
                    case 'push': return <Smartphone className="w-4 h-4 text-purple-600" />;
                    case 'social': return <Globe className="w-4 h-4 text-blue-500" />;
                    case 'radio': return <Radio className="w-4 h-4 text-orange-600" />;
                    default: return <Send className="w-4 h-4 text-gray-600" />;
                  }
                };

                return (
                  <div key={channel.channel} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getChannelIcon(channel.channel)}
                      <span className="text-sm font-medium text-gray-900 capitalize">{channel.channel}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{channel.openRate}%</p>
                      <p className="text-xs text-gray-500">open rate</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={(campaignData) => {
          console.log('New campaign created:', campaignData);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
}