// Mock events data for the admin panel
export const mockEvents = [
  {
    id: 1,
    title: "PLP Town Hall: Healthcare Initiative",
    description: "Community discussion on improving healthcare access across Nassau",
    type: "town-hall",
    status: "upcoming",
    date: "2024-01-15",
    time: "7:00 PM",
    location: "Nassau Community Center",
    attendees: 450,
    maxAttendees: 600,
    organizer: "Health Committee"
  },
  {
    id: 2,
    title: "Live Stream: Parliamentary Session",
    description: "Live coverage of today's parliamentary proceedings",
    type: "live-stream",
    status: "live",
    date: "2024-01-08",
    time: "10:00 AM",
    location: "Parliament House",
    attendees: 1250,
    maxAttendees: null,
    organizer: "Media Team"
  },
  {
    id: 3,
    title: "Youth Engagement Rally",
    description: "Empowering young Bahamians to participate in democratic processes",
    type: "rally",
    status: "upcoming",
    date: "2024-01-20",
    time: "2:00 PM",
    location: "Queen Elizabeth Sports Centre",
    attendees: 320,
    maxAttendees: 1000,
    organizer: "Youth Wing"
  },
  {
    id: 4,
    title: "Economic Development Webinar",
    description: "Discussing strategies for sustainable economic growth",
    type: "webinar",
    status: "upcoming",
    date: "2024-01-12",
    time: "6:00 PM",
    location: "Online Platform",
    attendees: 180,
    maxAttendees: 500,
    organizer: "Economic Committee"
  },
  {
    id: 5,
    title: "Community Outreach: Andros",
    description: "Meeting with constituents in Andros to discuss local issues",
    type: "town-hall",
    status: "completed",
    date: "2024-01-05",
    time: "4:00 PM",
    location: "Andros Town Hall",
    attendees: 95,
    maxAttendees: 150,
    organizer: "Constituency Office"
  },
  {
    id: 6,
    title: "Women's Empowerment Forum",
    description: "Celebrating and supporting women's leadership in politics",
    type: "rally",
    status: "upcoming",
    date: "2024-01-25",
    time: "11:00 AM",
    location: "Atlantis Resort Conference Center",
    attendees: 280,
    maxAttendees: 400,
    organizer: "Women's Caucus"
  },
  {
    id: 7,
    title: "Weekly Policy Update",
    description: "Regular update on current policy initiatives and progress",
    type: "live-stream",
    status: "upcoming",
    date: "2024-01-10",
    time: "8:00 PM",
    location: "PLP Headquarters",
    attendees: 520,
    maxAttendees: null,
    organizer: "Communications Team"
  },
  {
    id: 8,
    title: "Environmental Action Summit",
    description: "Addressing climate change and environmental protection",
    type: "webinar",
    status: "completed",
    date: "2024-01-03",
    time: "3:00 PM",
    location: "Online Platform",
    attendees: 340,
    maxAttendees: 500,
    organizer: "Environmental Committee"
  },
  {
    id: 9,
    title: "Education Reform Discussion",
    description: "Community input on proposed education system improvements",
    type: "town-hall",
    status: "cancelled",
    date: "2024-01-18",
    time: "7:30 PM",
    location: "Nassau Public Library",
    attendees: 0,
    maxAttendees: 200,
    organizer: "Education Committee"
  },
  {
    id: 10,
    title: "Digital Innovation Workshop",
    description: "Exploring technology solutions for government services",
    type: "webinar",
    status: "upcoming",
    date: "2024-01-22",
    time: "5:00 PM",
    location: "Online Platform",
    attendees: 145,
    maxAttendees: 300,
    organizer: "Technology Committee"
  },
  {
    id: 11,
    title: "Seniors' Rights Advocacy",
    description: "Discussion on improving services and support for elderly citizens",
    type: "town-hall",
    status: "upcoming",
    date: "2024-01-28",
    time: "2:30 PM",
    location: "Senior Citizens Center",
    attendees: 85,
    maxAttendees: 120,
    organizer: "Senior Affairs Committee"
  },
  {
    id: 12,
    title: "Morning Radio Show Live",
    description: "Live morning radio show discussing current events",
    type: "live-stream",
    status: "live",
    date: "2024-01-08",
    time: "8:00 AM",
    location: "Radio Station Studios",
    attendees: 890,
    maxAttendees: null,
    organizer: "Media Relations"
  }
];

// Event statistics for dashboard
export const eventStats = {
  totalEvents: mockEvents.length,
  liveEvents: mockEvents.filter(e => e.status === 'live').length,
  upcomingEvents: mockEvents.filter(e => e.status === 'upcoming').length,
  completedEvents: mockEvents.filter(e => e.status === 'completed').length,
  cancelledEvents: mockEvents.filter(e => e.status === 'cancelled').length,
  totalAttendees: mockEvents.reduce((sum, event) => sum + event.attendees, 0),
  averageAttendance: Math.round(mockEvents.reduce((sum, event) => sum + event.attendees, 0) / mockEvents.length),
  byType: {
    'town-hall': mockEvents.filter(e => e.type === 'town-hall').length,
    'live-stream': mockEvents.filter(e => e.type === 'live-stream').length,
    'rally': mockEvents.filter(e => e.type === 'rally').length,
    'webinar': mockEvents.filter(e => e.type === 'webinar').length
  },
  byStatus: {
    'upcoming': mockEvents.filter(e => e.status === 'upcoming').length,
    'live': mockEvents.filter(e => e.status === 'live').length,
    'completed': mockEvents.filter(e => e.status === 'completed').length,
    'cancelled': mockEvents.filter(e => e.status === 'cancelled').length
  },
  upcomingThisWeek: mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return event.status === 'upcoming' && eventDate >= today && eventDate <= weekFromNow;
  }).length,
  mostPopularType: 'town-hall',
  highestAttendance: Math.max(...mockEvents.map(e => e.attendees)),
  averageCapacityUtilization: Math.round(
    mockEvents
      .filter(e => e.maxAttendees)
      .reduce((sum, e) => sum + (e.attendees / e.maxAttendees) * 100, 0) / 
    mockEvents.filter(e => e.maxAttendees).length
  )
};

// Recent event activity for dashboard
export const recentEventActivity = [
  {
    id: 1,
    type: 'event_started',
    event: 'Live Stream: Parliamentary Session',
    timestamp: '2 minutes ago',
    details: '1,250 viewers joined'
  },
  {
    id: 2,
    type: 'event_registered',
    event: 'Youth Engagement Rally',
    timestamp: '15 minutes ago',
    details: '25 new registrations'
  },
  {
    id: 3,
    type: 'event_completed',
    event: 'Community Outreach: Andros',
    timestamp: '2 hours ago',
    details: '95 attendees participated'
  },
  {
    id: 4,
    type: 'event_cancelled',
    event: 'Education Reform Discussion',
    timestamp: '1 day ago',
    details: 'Venue conflict, rescheduling in progress'
  },
  {
    id: 5,
    type: 'event_created',
    event: 'Digital Innovation Workshop',
    timestamp: '2 days ago',
    details: 'New webinar scheduled for Jan 22'
  }
];