import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  Square, 
  Settings, 
  Users, 
  MessageSquare, 
  BarChart3,
  Globe,
  Youtube,
  Facebook,
  Twitch,
  Radio,
  Eye,
  Clock,
  Mic,
  MicOff,
  VideoOff,
  Share2,
  Download,
  Calendar,
  Plus
} from 'lucide-react';
import { PLPColors } from '../constants/colors';

// Mock live streaming data
const liveStreams = [
  {
    id: 1,
    title: "Weekly Parliamentary Update",
    status: "live",
    platform: "youtube",
    viewers: 2847,
    duration: "00:42:15",
    thumbnail: "/api/placeholder/300/200",
    streamKey: "live_abc123",
    startTime: new Date(Date.now() - 2535000),
    chatMessages: 156,
    isRecording: true
  },
  {
    id: 2,
    title: "Community Town Hall - Nassau",
    status: "scheduled",
    platform: "facebook",
    scheduledFor: new Date(Date.now() + 3600000),
    expectedViewers: 500,
    thumbnail: "/api/placeholder/300/200"
  },
  {
    id: 3,
    title: "PLP Radio Show Live",
    status: "ended",
    platform: "custom",
    viewers: 1234,
    duration: "01:15:30",
    endTime: new Date(Date.now() - 86400000),
    recordingUrl: "/recordings/plp-radio-show-001.mp4"
  }
];

const platforms = [
  { id: 'youtube', name: 'YouTube Live', icon: Youtube, color: 'text-red-600' },
  { id: 'facebook', name: 'Facebook Live', icon: Facebook, color: 'text-blue-600' },
  { id: 'twitch', name: 'Twitch', icon: Twitch, color: 'text-purple-600' },
  { id: 'custom', name: 'Custom RTMP', icon: Radio, color: 'text-gray-600' }
];

function StreamCard({ stream }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const platform = platforms.find(p => p.id === stream.platform);
  const PlatformIcon = platform?.icon || Video;

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'bg-red-500 text-white';
      case 'scheduled': return 'bg-blue-500 text-white';
      case 'ended': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatDuration = (duration) => {
    if (stream.status === 'live' && stream.startTime) {
      const elapsed = Math.floor((Date.now() - stream.startTime.getTime()) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return duration || '00:00:00';
  };

  return (
    <div className="admin-card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${platform?.color || 'text-gray-600'} bg-gray-100`}>
            <PlatformIcon size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{stream.title}</h3>
            <p className="text-sm text-gray-500">{platform?.name}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(stream.status)}`}>
          {stream.status.toUpperCase()}
        </span>
      </div>

      {stream.status === 'live' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-red-500" />
            <span className="text-sm font-medium">{stream.viewers?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-500" />
            <span className="text-sm font-medium">{formatDuration()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-green-500" />
            <span className="text-sm font-medium">{stream.chatMessages}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${stream.isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-sm font-medium">{stream.isRecording ? 'Recording' : 'Not Recording'}</span>
          </div>
        </div>
      )}

      {stream.status === 'scheduled' && (
        <div className="mb-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Calendar size={16} />
            <span className="text-sm font-medium">
              Scheduled for {stream.scheduledFor?.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {isExpanded ? 'Show Less' : 'Manage Stream'}
        </button>
        
        <div className="flex items-center gap-2">
          {stream.status === 'live' && (
            <>
              <button className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50">
                <Square size={16} />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                <Settings size={16} />
              </button>
            </>
          )}
          {stream.status === 'scheduled' && (
            <button className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-green-50">
              <Play size={16} />
            </button>
          )}
          {stream.status === 'ended' && stream.recordingUrl && (
            <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50">
              <Download size={16} />
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Stream Controls</h4>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm">
                  <Mic size={14} />
                  Mute Audio
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm">
                  <Video size={14} />
                  Stop Video
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Share Stream</h4>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                  <Share2 size={14} />
                  Copy Link
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm">
                  <MessageSquare size={14} />
                  Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuickActions({ onCreateStream }) {
  return (
    <div className="admin-card p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={onCreateStream}
          className="flex items-center gap-3 p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
        >
          <Plus size={20} className="text-blue-600" />
          <div className="text-left">
            <div className="font-medium text-gray-900">Schedule Stream</div>
            <div className="text-sm text-gray-500">Plan upcoming live broadcast</div>
          </div>
        </button>
        
        <button className="flex items-center gap-3 p-4 border-2 border-dashed border-red-300 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all group">
          <Play size={20} className="text-red-600" />
          <div className="text-left">
            <div className="font-medium text-gray-900">Go Live Now</div>
            <div className="text-sm text-gray-500">Start immediate broadcast</div>
          </div>
        </button>
      </div>
    </div>
  );
}

function StreamingAnalytics() {
  return (
    <div className="admin-card p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Streaming Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-2xl font-bold text-blue-600">15.2K</div>
          <div className="text-sm text-gray-600">Total Views This Month</div>
          <div className="text-xs text-green-600 mt-1">↗ +23% from last month</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">2.8K</div>
          <div className="text-sm text-gray-600">Average Concurrent Viewers</div>
          <div className="text-xs text-green-600 mt-1">↗ +12% from last month</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">45:32</div>
          <div className="text-sm text-gray-600">Average Watch Time</div>
          <div className="text-xs text-red-600 mt-1">↘ -5% from last month</div>
        </div>
      </div>
    </div>
  );
}

export function LiveStreamingSection() {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: 'active', label: 'Active & Scheduled', count: liveStreams.filter(s => s.status !== 'ended').length },
    { id: 'ended', label: 'Past Streams', count: liveStreams.filter(s => s.status === 'ended').length },
    { id: 'analytics', label: 'Analytics', count: null }
  ];

  const filteredStreams = activeTab === 'active' 
    ? liveStreams.filter(stream => stream.status !== 'ended')
    : liveStreams.filter(stream => stream.status === 'ended');

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Live Streaming</h2>
            <p className="text-sm text-gray-600">Manage live broadcasts and streaming events</p>
          </div>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          Create Stream
        </button>
      </div>

      {/* Quick Actions */}
      <QuickActions onCreateStream={() => setShowCreateModal(true)} />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-900">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'analytics' ? (
        <StreamingAnalytics />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
          {filteredStreams.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No streams found</h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'active' 
                  ? 'Create your first live stream to get started'
                  : 'No past streams available'
                }
              </p>
              {activeTab === 'active' && (
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Create Stream
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}