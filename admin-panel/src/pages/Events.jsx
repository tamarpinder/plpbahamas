import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Video,
  Mic,
  Globe,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { mockEvents } from '../data/mockEvents';

function EventCard({ event }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'live-stream': return <Video className="w-4 h-4" />;
      case 'rally': return <Mic className="w-4 h-4" />;
      case 'town-hall': return <Users className="w-4 h-4" />;
      case 'webinar': return <Globe className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'live': return <CheckCircle2 className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="admin-card admin-card-hover p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-blue-600">
              {getTypeIcon(event.type)}
              <span className="text-sm font-medium capitalize">{event.type.replace('-', ' ')}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
              <div className="flex items-center gap-1">
                {getStatusIcon(event.status)}
                {event.status}
              </div>
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{event.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
            <Edit size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={16} />
          <span>{event.attendees} attendees</span>
          {event.maxAttendees && <span className="text-gray-400">/ {event.maxAttendees} max</span>}
        </div>
      </div>

      {event.status === 'live' && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-800">Live Now</span>
            </div>
            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
              Join Stream
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniCalendar({ selectedDate, onDateChange }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const today = new Date();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };
  
  return (
    <div className="admin-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => navigateMonth(1)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isToday = date.toDateString() === today.toDateString();
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          const hasEvent = mockEvents.some(event => 
            new Date(event.date).toDateString() === date.toDateString()
          );
          
          return (
            <button
              key={index}
              onClick={() => onDateChange(date)}
              className={`
                p-1 text-sm rounded hover:bg-blue-50 transition-colors
                ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                ${isToday ? 'bg-blue-100 text-blue-900 font-semibold' : ''}
                ${isSelected ? 'bg-blue-600 text-white' : ''}
                ${hasEvent ? 'font-bold' : ''}
              `}
            >
              {date.getDate()}
              {hasEvent && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mx-auto mt-1"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    const matchesDate = !selectedDate || 
                       new Date(event.date).toDateString() === selectedDate.toDateString();
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const eventTypes = [...new Set(mockEvents.map(event => event.type))];
  const upcomingEvents = mockEvents.filter(event => event.status === 'upcoming').slice(0, 3);
  const liveEvents = mockEvents.filter(event => event.status === 'live');

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="heading-xl">Event Management</h1>
        <p className="text-gray-600 mt-2">
          Plan, manage, and analyze your community events and live streams.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{mockEvents.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Live Events</p>
              <p className="text-2xl font-bold text-gray-900">{liveEvents.length}</p>
            </div>
            <Video className="w-8 h-8 text-green-600" />
          </div>
          {liveEvents.length > 0 && (
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm text-green-600 font-medium">Broadcasting now</span>
            </div>
          )}
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockEvents.reduce((sum, event) => sum + event.attendees, 0).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
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
                placeholder="Search events..."
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
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            New Event
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Events list */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="admin-card p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or create a new event.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mini calendar */}
          <MiniCalendar 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate}
          />

          {/* Upcoming events */}
          <div className="admin-card p-6">
            <h3 className="heading-sm mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const getTypeIcon = (type) => {
                  switch (type) {
                    case 'live-stream': return <Video className="w-4 h-4 text-blue-600" />;
                    case 'rally': return <Mic className="w-4 h-4 text-blue-600" />;
                    case 'town-hall': return <Users className="w-4 h-4 text-blue-600" />;
                    case 'webinar': return <Globe className="w-4 h-4 text-blue-600" />;
                    default: return <Calendar className="w-4 h-4 text-blue-600" />;
                  }
                };

                return (
                  <div key={event.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live events */}
          {liveEvents.length > 0 && (
            <div className="admin-card p-6">
              <h3 className="heading-sm mb-4">Live Now</h3>
              <div className="space-y-3">
                {liveEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-sm text-green-800">{event.title}</span>
                    </div>
                    <p className="text-xs text-green-600 mb-2">{event.attendees} viewers</p>
                    <button className="w-full px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                      Join Stream
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}