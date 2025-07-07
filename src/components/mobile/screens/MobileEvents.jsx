import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import useAppStore from '../../../stores/useAppStore';

const MobileEvents = () => {
  const { events, rsvpEvent } = useAppStore();

  const handleRSVP = async (eventId) => {
    await rsvpEvent(eventId, 'rsvp');
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-600 text-sm">Join us at upcoming events</p>
      </div>

      {/* Events List */}
      <div className="p-4 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {event.description}
                </p>
              </div>
              {event.is_live_streamed && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full ml-2">
                  Live
                </span>
              )}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(event.date_time).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>{new Date(event.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>{event.attending_count} attending</span>
              </div>
            </div>
            
            <button
              onClick={() => handleRSVP(event.id)}
              className="w-full bg-[#FFC600] text-gray-900 font-semibold py-3 rounded-xl active:scale-95 transition-transform"
            >
              RSVP Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileEvents;