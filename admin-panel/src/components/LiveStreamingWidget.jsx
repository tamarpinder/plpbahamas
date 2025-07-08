import React from 'react';
import { Video, Eye, Play, Calendar, Users, Clock } from 'lucide-react';

// Mock live streaming data for dashboard
const liveStreamData = {
  currentStreams: [
    {
      id: 1,
      title: "Weekly Parliamentary Update",
      status: "live",
      viewers: 2847,
      duration: "00:42:15",
      platform: "YouTube"
    }
  ],
  upcomingStreams: [
    {
      id: 2,
      title: "Community Town Hall - Nassau",
      scheduledFor: new Date(Date.now() + 3600000),
      platform: "Facebook"
    },
    {
      id: 3,
      title: "Policy Discussion: Healthcare",
      scheduledFor: new Date(Date.now() + 7200000),
      platform: "YouTube"
    }
  ],
  stats: {
    totalViewsToday: 15234,
    activeViewers: 2847,
    scheduledToday: 3
  }
};

export function LiveStreamingWidget() {
  const { currentStreams, upcomingStreams, stats } = liveStreamData;

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (duration) => {
    return duration;
  };

  return (
    <div className="admin-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="heading-sm text-gray-900">Live Streaming</h3>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Manage All
        </button>
      </div>

      {/* Current Live Streams */}
      {currentStreams.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Live Now
          </h4>
          <div className="space-y-3">
            {currentStreams.map((stream) => (
              <div key={stream.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-sm text-red-900">{stream.title}</h5>
                  <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                    LIVE
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-red-700">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      <span>{stream.viewers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{formatDuration(stream.duration)}</span>
                    </div>
                  </div>
                  <span className="text-red-600">{stream.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{stats.totalViewsToday.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Views Today</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">{stats.activeViewers.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Active Viewers</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{stats.scheduledToday}</div>
          <div className="text-xs text-gray-600">Scheduled Today</div>
        </div>
      </div>

      {/* Upcoming Streams */}
      {upcomingStreams.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Upcoming Streams</h4>
          <div className="space-y-2">
            {upcomingStreams.slice(0, 2).map((stream) => (
              <div key={stream.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">{stream.title}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Calendar size={10} />
                    <span>{formatTime(stream.scheduledFor)}</span>
                    <span>•</span>
                    <span>{stream.platform}</span>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-blue-600">
                  <Play size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
            <Video size={14} />
            Go Live
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
            <Calendar size={14} />
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}