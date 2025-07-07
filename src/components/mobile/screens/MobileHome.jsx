import React, { useEffect } from 'react';
import { Heart, Users, Calendar, TrendingUp, ArrowRight, Bell } from 'lucide-react';
import useAppStore from '@/stores/useAppStore';
import useAuthStore from '@/stores/useAuthStore';

const MobileHome = ({ onNavigate }) => {
  const { dashboardStats, news, events, initializeApp } = useAppStore();
  const { user } = useAuthStore();

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFC600] to-[#FFAA00] px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}
            </h1>
            <p className="text-gray-800">{user?.name || 'Welcome'}</p>
          </div>
          <button className="p-2 bg-white/20 rounded-full">
            <Bell className="h-6 w-6 text-gray-900" />
          </button>
        </div>
        
        {/* Quick Stats */}
        {dashboardStats && (
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {dashboardStats.activeMembers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-800">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  ${dashboardStats.totalDonations.toLocaleString()}
                </div>
                <div className="text-sm text-gray-800">Raised</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-6">
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onNavigate('donate')}
              className="bg-red-50 p-4 rounded-2xl flex flex-col items-center space-y-2 active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <span className="font-medium text-gray-900">Donate</span>
            </button>
            
            <button 
              onClick={() => onNavigate('events')}
              className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center space-y-2 active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Events</span>
            </button>
          </div>
        </div>

        {/* Latest News */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Latest Updates</h2>
            <button 
              onClick={() => onNavigate('news')}
              className="text-[#FFC600] font-medium text-sm"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {news.slice(0, 2).map((article) => (
              <div key={article.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#FFC600]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-[#FFC600]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <button 
              onClick={() => onNavigate('events')}
              className="text-[#FFC600] font-medium text-sm"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {events.slice(0, 2).map((event) => (
              <div key={event.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(event.date_time).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.attending_count} attending
                      </span>
                    </div>
                  </div>
                  <button className="ml-3 px-3 py-1 bg-[#FFC600] text-gray-900 rounded-full text-sm font-medium">
                    RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;