// Mock Volunteer Data
export const mockVolunteerOpportunities = [
  {
    id: 1,
    title: 'Campaign Office Assistant',
    description: 'Help with daily operations at the Nassau Central campaign office. Tasks include answering phones, data entry, and greeting visitors.',
    location: 'Nassau Central Campaign Office, Bay Street',
    date_time: '2024-12-28T09:00:00Z',
    duration_hours: 4,
    max_volunteers: 8,
    current_volunteers: 5,
    skills_required: ['Communication', 'Data Entry', 'Customer Service'],
    contact_person: 'Sarah Johnson',
    contact_phone: '(242) 555-0123',
    contact_email: 'sarah.johnson@plp.bs',
    status: 'open',
    category: 'Administrative',
    urgency: 'medium',
    points_reward: 400,
    recurring: true,
    volunteer_signups: [
      { volunteer_name: 'Marcus Thompson', status: 'confirmed' },
      { volunteer_name: 'Lisa Davis', status: 'confirmed' },
      { volunteer_name: 'James Wilson', status: 'pending' },
      { volunteer_name: 'Maria Garcia', status: 'confirmed' },
      { volunteer_name: 'David Brown', status: 'confirmed' }
    ]
  },
  {
    id: 2,
    title: 'Community Event Setup',
    description: 'Help set up for the New Year Community Rally. Tasks include stage setup, sound equipment, seating arrangements, and decorations.',
    location: 'Clifford Park, Nassau',
    date_time: '2024-12-31T14:00:00Z',
    duration_hours: 6,
    max_volunteers: 15,
    current_volunteers: 12,
    skills_required: ['Physical Labor', 'Event Planning', 'Teamwork'],
    contact_person: 'Michael Roberts',
    contact_phone: '(242) 555-0456',
    contact_email: 'michael.roberts@plp.bs',
    status: 'open',
    category: 'Events',
    urgency: 'high',
    points_reward: 600,
    recurring: false
  },
  {
    id: 3,
    title: 'Phone Bank Coordinator',
    description: 'Lead volunteer phone banking efforts to contact constituents about upcoming initiatives and events.',
    location: 'Freeport Campaign Office, Grand Bahama',
    date_time: '2025-01-05T10:00:00Z',
    duration_hours: 3,
    max_volunteers: 6,
    current_volunteers: 2,
    skills_required: ['Leadership', 'Communication', 'Phone Skills'],
    contact_person: 'Jennifer Williams',
    contact_phone: '(242) 555-0789',
    contact_email: 'jennifer.williams@plp.bs',
    status: 'open',
    category: 'Outreach',
    urgency: 'medium',
    points_reward: 300,
    recurring: true
  },
  {
    id: 4,
    title: 'Youth Mentorship Program',
    description: 'Mentor young Bahamians in leadership skills and civic engagement. Help with workshops and one-on-one sessions.',
    location: 'University of The Bahamas, Nassau',
    date_time: '2025-01-08T16:00:00Z',
    duration_hours: 2,
    max_volunteers: 4,
    current_volunteers: 4,
    skills_required: ['Mentoring', 'Youth Engagement', 'Public Speaking'],
    contact_person: 'Dr. Patricia Clarke',
    contact_phone: '(242) 555-1011',
    contact_email: 'patricia.clarke@plp.bs',
    status: 'full',
    category: 'Education',
    urgency: 'low',
    points_reward: 200,
    recurring: true
  },
  {
    id: 5,
    title: 'Social Media Content Creation',
    description: 'Create engaging social media content, take photos at events, and help manage PLP social media presence.',
    location: 'Remote/Various Event Locations',
    date_time: '2025-01-10T11:00:00Z',
    duration_hours: 5,
    max_volunteers: 3,
    current_volunteers: 1,
    skills_required: ['Social Media', 'Photography', 'Content Creation', 'Design'],
    contact_person: 'Alex Thompson',
    contact_phone: '(242) 555-1213',
    contact_email: 'alex.thompson@plp.bs',
    status: 'open',
    category: 'Digital',
    urgency: 'medium',
    points_reward: 500,
    recurring: true
  },
  {
    id: 6,
    title: 'Community Canvassing',
    description: 'Go door-to-door in Nassau East to discuss PLP initiatives and register new supporters.',
    location: 'Nassau East Constituency',
    date_time: '2025-01-12T09:00:00Z',
    duration_hours: 4,
    max_volunteers: 10,
    current_volunteers: 7,
    skills_required: ['Communication', 'Walking', 'Persuasion'],
    contact_person: 'Robert Johnson',
    contact_phone: '(242) 555-1415',
    contact_email: 'robert.johnson@plp.bs',
    status: 'open',
    category: 'Outreach',
    urgency: 'high',
    points_reward: 400,
    recurring: true
  }
];

export const mockVolunteers = [
  {
    id: 1,
    user_id: 1,
    user_name: 'Marcus Johnson',
    application_date: '2024-11-15T10:00:00Z',
    status: 'active',
    skills: ['Communication', 'Data Entry', 'Event Planning', 'Leadership'],
    availability: {
      monday: ['morning', 'afternoon'],
      tuesday: ['afternoon', 'evening'],
      wednesday: ['morning'],
      thursday: ['afternoon', 'evening'],
      friday: ['morning', 'afternoon'],
      saturday: ['morning', 'afternoon', 'evening'],
      sunday: ['afternoon']
    },
    interests: ['Community Events', 'Administrative Work', 'Youth Programs'],
    emergency_contact: 'Susan Johnson',
    emergency_phone: '(242) 555-2020',
    background_check: true,
    orientation_completed: true,
    total_hours: 45.5,
    badges_earned: ['Helper', 'Dedicated Volunteer'],
    volunteer_level: 'Champion',
    favorite_categories: ['Events', 'Administrative']
  },
  {
    id: 2,
    user_id: 2,
    user_name: 'Sophia Williams',
    application_date: '2024-10-20T14:30:00Z',
    status: 'active',
    skills: ['Social Media', 'Photography', 'Content Creation', 'Design'],
    availability: {
      monday: ['evening'],
      tuesday: ['evening'],
      wednesday: ['afternoon', 'evening'],
      thursday: ['evening'],
      friday: ['afternoon', 'evening'],
      saturday: ['morning', 'afternoon', 'evening'],
      sunday: ['morning', 'afternoon']
    },
    interests: ['Digital Marketing', 'Content Creation', 'Photography'],
    emergency_contact: 'Mark Williams',
    emergency_phone: '(242) 555-3030',
    background_check: true,
    orientation_completed: true,
    total_hours: 32.0,
    badges_earned: ['Helper', 'Dedicated Volunteer'],
    volunteer_level: 'Advocate',
    favorite_categories: ['Digital', 'Events']
  },
  {
    id: 3,
    user_id: 3,
    user_name: 'David Thompson',
    application_date: '2024-12-01T09:15:00Z',
    status: 'pending',
    skills: ['Public Speaking', 'Leadership', 'Mentoring'],
    availability: {
      monday: ['morning', 'afternoon'],
      wednesday: ['morning', 'afternoon'],
      friday: ['morning', 'afternoon'],
      saturday: ['morning', 'afternoon'],
      sunday: ['afternoon']
    },
    interests: ['Youth Programs', 'Leadership Development', 'Community Outreach'],
    emergency_contact: 'Jennifer Thompson',
    emergency_phone: '(242) 555-4040',
    background_check: false,
    orientation_completed: false,
    total_hours: 0,
    badges_earned: [],
    volunteer_level: 'New',
    favorite_categories: ['Education', 'Outreach']
  }
];

export const volunteerCategories = [
  { name: 'Administrative', icon: '📋', color: '#3B82F6' },
  { name: 'Events', icon: '🎉', color: '#10B981' },
  { name: 'Outreach', icon: '📢', color: '#F59E0B' },
  { name: 'Education', icon: '📚', color: '#8B5CF6' },
  { name: 'Digital', icon: '💻', color: '#EF4444' },
  { name: 'Fundraising', icon: '💰', color: '#06B6D4' }
];

export const volunteerLevels = [
  { name: 'New', minHours: 0, maxHours: 4, color: '#9CA3AF', badge: '🌱' },
  { name: 'Helper', minHours: 5, maxHours: 19, color: '#3B82F6', badge: '🙋' },
  { name: 'Advocate', minHours: 20, maxHours: 49, color: '#10B981', badge: '⭐' },
  { name: 'Champion', minHours: 50, maxHours: 99, color: '#F59E0B', badge: '🏆' },
  { name: 'Legend', minHours: 100, maxHours: Infinity, color: '#8B5CF6', badge: '👑' }
];

export const volunteerMilestones = [
  { hours: 1, title: 'First Step', points: 100, badge: 'Helper' },
  { hours: 5, title: 'Getting Started', points: 250, badge: null },
  { hours: 10, title: 'Building Momentum', points: 500, badge: null },
  { hours: 25, title: 'Dedicated Helper', points: 1000, badge: 'Dedicated Volunteer' },
  { hours: 50, title: 'Community Champion', points: 2500, badge: null },
  { hours: 100, title: 'Volunteer Legend', points: 5000, badge: 'Champion Volunteer' }
];

export const getVolunteerLevel = (hours) => {
  for (let i = volunteerLevels.length - 1; i >= 0; i--) {
    if (hours >= volunteerLevels[i].minHours) {
      return volunteerLevels[i];
    }
  }
  return volunteerLevels[0];
};

export const getVolunteerMilestone = (hours) => {
  for (let i = volunteerMilestones.length - 1; i >= 0; i--) {
    if (hours >= volunteerMilestones[i].hours) {
      return volunteerMilestones[i];
    }
  }
  return null;
};

export const getNextVolunteerMilestone = (hours) => {
  for (let milestone of volunteerMilestones) {
    if (hours < milestone.hours) {
      return milestone;
    }
  }
  return null;
};