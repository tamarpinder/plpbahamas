import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, MapPin, Users, Video, Clock, ArrowRight } from 'lucide-react';
import useAppStore from '../stores/useAppStore';
import useAuthStore from '../stores/useAuthStore';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const EventsPage = () => {
  const { events, eventsLoading, selectedEventType, setSelectedEventType, rsvpEvent } = useAppStore();
  const { isAuthenticated } = useAuthStore();
  const [rsvpStatus, setRsvpStatus] = useState({});

  const eventTypes = ['ALL', 'town_hall', 'rally', 'volunteer', 'fundraiser'];

  const handleRSVP = async (eventId, action) => {
    if (!isAuthenticated) {
      toast.error('Please login to RSVP for events');
      return;
    }

    try {
      await rsvpEvent(eventId, action);
      setRsvpStatus(prev => ({ ...prev, [eventId]: action }));
      toast.success(`Successfully ${action === 'rsvp' ? 'registered' : 'marked as interested'}`);
    } catch (error) {
      toast.error('Failed to update RSVP status');
    }
  };

  const getEventTypeLabel = (type) => {
    const labels = {
      'town_hall': 'Town Hall',
      'rally': 'Rally',
      'volunteer': 'Volunteer',
      'fundraiser': 'Fundraiser'
    };
    return labels[type] || type;
  };

  const getEventTypeColor = (type) => {
    const colors = {
      'town_hall': 'bg-blue-100 text-blue-800',
      'rally': 'bg-yellow-100 text-yellow-800',
      'volunteer': 'bg-green-100 text-green-800',
      'fundraiser': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFC600] to-[#FFAA00] rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
        <p className="text-gray-800">Join us at events across the Bahamas</p>
      </div>

      {/* Event Type Tabs */}
      <Tabs value={selectedEventType} onValueChange={setSelectedEventType}>
        <TabsList className="grid grid-cols-5 gap-2 h-auto">
          {eventTypes.map((type) => (
            <TabsTrigger key={type} value={type} className="data-[state=active]:bg-[#FFC600]">
              {type === 'ALL' ? 'All Events' : getEventTypeLabel(type)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedEventType} className="mt-6">
          {eventsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC600] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No events scheduled</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${getEventTypeColor(event.event_type)}`}>
                          {getEventTypeLabel(event.event_type)}
                        </span>
                        {event.is_live_streamed && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            Live Stream
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.date_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(event.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{event.attending_count} attending • {event.interested_count} interested</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {rsvpStatus[event.id] === 'rsvp' ? (
                          <Button className="w-full" disabled>
                            ✓ You're Attending
                          </Button>
                        ) : (
                          <Button 
                            className="w-full" 
                            onClick={() => handleRSVP(event.id, 'rsvp')}
                          >
                            Attend Event
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                        {rsvpStatus[event.id] !== 'rsvp' && (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleRSVP(event.id, 'interested')}
                            disabled={rsvpStatus[event.id] === 'interested'}
                          >
                            {rsvpStatus[event.id] === 'interested' ? '✓ Interested' : 'I\'m Interested'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      {!isAuthenticated && (
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-semibold mb-2">Want to attend our events?</h3>
            <p className="text-gray-600 mb-4">Login to RSVP and get event reminders</p>
            <Button>Login to RSVP</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventsPage;