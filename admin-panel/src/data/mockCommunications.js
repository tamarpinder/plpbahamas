// Mock communications data for the admin panel
export const mockCommunications = [
  {
    id: 1,
    subject: "Healthcare Initiative Launch Announcement",
    preview: "We're excited to announce the launch of our comprehensive healthcare reform program aimed at improving access to medical services for all Bahamian families.",
    channel: "email",
    status: "sent",
    audience: "All Supporters",
    recipients: 15420,
    author: "Communications Team",
    sentDate: "2024-01-08",
    tags: ["healthcare", "announcement", "reform"],
    metrics: {
      delivered: 15350,
      opened: 9834,
      clicked: 1245,
      openRate: 64.1,
      clickRate: 8.1
    }
  },
  {
    id: 2,
    subject: "Youth Rally This Saturday - Join Us!",
    preview: "Don't miss the Youth Engagement Rally at Queen Elizabeth Sports Centre this Saturday at 2:00 PM. Come and be part of the change!",
    channel: "sms",
    status: "sent",
    audience: "Youth Supporters",
    recipients: 3250,
    author: "Youth Division",
    sentDate: "2024-01-07",
    tags: ["youth", "rally", "event"],
    metrics: {
      delivered: 3245,
      opened: 2890,
      clicked: 456,
      openRate: 89.1,
      clickRate: 14.0
    }
  },
  {
    id: 3,
    subject: "Breaking: Parliamentary Session Live Stream",
    preview: "Join us now for live coverage of today's parliamentary proceedings. Important healthcare legislation being discussed.",
    channel: "push",
    status: "sent",
    audience: "App Users",
    recipients: 8750,
    author: "Media Team",
    sentDate: "2024-01-08",
    tags: ["parliament", "live", "urgent"],
    metrics: {
      delivered: 8720,
      opened: 6234,
      clicked: 1876,
      openRate: 71.5,
      clickRate: 21.5
    }
  },
  {
    id: 4,
    subject: "Weekly Policy Update Newsletter",
    preview: "This week's update covers economic development initiatives, education reforms, and upcoming community events across The Bahamas.",
    channel: "email",
    status: "scheduled",
    audience: "Newsletter Subscribers",
    recipients: 12500,
    author: "Policy Team",
    scheduledDate: "2024-01-10",
    tags: ["newsletter", "policy", "weekly"]
  },
  {
    id: 5,
    subject: "Town Hall Meeting Reminder",
    preview: "Reminder: Nassau Central Town Hall Meeting tomorrow at 7:00 PM. Your voice matters in shaping our healthcare future.",
    channel: "email",
    status: "draft",
    audience: "Nassau Residents",
    recipients: 5600,
    author: "Local Committee",
    tags: ["town-hall", "reminder", "healthcare"]
  },
  {
    id: 6,
    subject: "Community Clean-up Drive Success",
    preview: "Thank you to all 67 volunteers who participated in yesterday's Cable Beach clean-up drive. Together we collected over 500 pounds of debris!",
    channel: "social",
    status: "sent",
    audience: "Community Volunteers",
    recipients: 2340,
    author: "Environmental Committee",
    sentDate: "2024-01-06",
    tags: ["community", "environment", "success"],
    metrics: {
      delivered: 2340,
      opened: 1890,
      clicked: 234,
      openRate: 80.8,
      clickRate: 10.0
    }
  },
  {
    id: 7,
    subject: "Prime Minister's Radio Address",
    preview: "Join us for the Prime Minister's weekly radio address discussing recent policy developments and upcoming initiatives for The Bahamas.",
    channel: "radio",
    status: "scheduled",
    audience: "General Public",
    recipients: 45000,
    author: "Communications Office",
    scheduledDate: "2024-01-10",
    tags: ["radio", "prime-minister", "address"]
  },
  {
    id: 8,
    subject: "Women's Empowerment Forum Invitation",
    preview: "You're invited to the Women's Empowerment Forum at Atlantis Resort on January 25th. Registration now open for this inspiring event.",
    channel: "email",
    status: "sent",
    audience: "Women Supporters",
    recipients: 6780,
    author: "Women's Caucus",
    sentDate: "2024-01-05",
    tags: ["women", "empowerment", "forum"],
    metrics: {
      delivered: 6750,
      opened: 4560,
      clicked: 892,
      openRate: 67.6,
      clickRate: 13.2
    }
  },
  {
    id: 9,
    subject: "Hurricane Preparedness Alert",
    preview: "Important: Hurricane season preparation guidelines and emergency contact information for all Family Islands residents.",
    channel: "sms",
    status: "draft",
    audience: "Family Islands",
    recipients: 8900,
    author: "Emergency Management",
    tags: ["emergency", "hurricane", "safety"]
  },
  {
    id: 10,
    subject: "Economic Development Summit Highlights",
    preview: "Key takeaways from yesterday's Economic Development Summit including new job creation initiatives and tourism recovery strategies.",
    channel: "email",
    status: "sending",
    audience: "Business Leaders",
    recipients: 1200,
    author: "Economic Committee",
    tags: ["economy", "business", "summit"]
  },
  {
    id: 11,
    subject: "Voter Registration Drive",
    preview: "Help us reach our goal of registering 10,000 new voters this quarter. Find registration locations and volunteer opportunities.",
    channel: "social",
    status: "scheduled",
    audience: "Unregistered Citizens",
    recipients: 25000,
    author: "Voter Outreach",
    scheduledDate: "2024-01-12",
    tags: ["voting", "registration", "civic"]
  },
  {
    id: 12,
    subject: "Education Reform Town Hall Results",
    preview: "Thank you to all parents and educators who attended last week's education reform discussion. Here's what we heard and our next steps.",
    channel: "email",
    status: "sent",
    audience: "Parents & Educators",
    recipients: 4500,
    author: "Education Committee",
    sentDate: "2024-01-04",
    tags: ["education", "reform", "feedback"],
    metrics: {
      delivered: 4480,
      opened: 3200,
      clicked: 567,
      openRate: 71.4,
      clickRate: 12.6
    }
  }
];

// Communication statistics for dashboard
export const communicationStats = {
  totalSent: 156,
  totalRecipients: 245680,
  averageOpenRate: 72.8,
  averageClickRate: 13.4,
  activeCampaigns: 8,
  scheduled: 15,
  
  byChannel: {
    email: mockCommunications.filter(c => c.channel === 'email').length,
    sms: mockCommunications.filter(c => c.channel === 'sms').length,
    push: mockCommunications.filter(c => c.channel === 'push').length,
    social: mockCommunications.filter(c => c.channel === 'social').length,
    radio: mockCommunications.filter(c => c.channel === 'radio').length
  },
  
  byStatus: {
    sent: mockCommunications.filter(c => c.status === 'sent').length,
    scheduled: mockCommunications.filter(c => c.status === 'scheduled').length,
    draft: mockCommunications.filter(c => c.status === 'draft').length,
    sending: mockCommunications.filter(c => c.status === 'sending').length
  },
  
  channelPerformance: [
    { channel: 'email', openRate: 68.5, clickRate: 11.2, sent: 89 },
    { channel: 'sms', openRate: 89.1, clickRate: 14.0, sent: 23 },
    { channel: 'push', openRate: 71.5, clickRate: 21.5, sent: 18 },
    { channel: 'social', openRate: 80.8, clickRate: 10.0, sent: 15 },
    { channel: 'radio', openRate: 95.2, clickRate: 8.5, sent: 11 }
  ],
  
  audienceSegments: [
    { audience: 'All Supporters', size: 45680, engagement: 72.3 },
    { audience: 'Youth Supporters', size: 12340, engagement: 84.2 },
    { audience: 'Women Supporters', size: 18950, engagement: 76.8 },
    { audience: 'Business Leaders', size: 3400, engagement: 68.9 },
    { audience: 'Community Volunteers', size: 8750, engagement: 81.5 }
  ],
  
  recentActivity: [
    {
      id: 1,
      type: 'sent',
      message: 'Healthcare Initiative Launch',
      details: 'Email sent to 15,420 supporters',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'opened',
      message: 'Youth Rally SMS',
      details: '2,890 recipients opened message',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      type: 'scheduled',
      message: 'Weekly Policy Update',
      details: 'Scheduled for Jan 10 at 9:00 AM',
      timestamp: '6 hours ago'
    },
    {
      id: 4,
      type: 'clicked',
      message: 'Parliamentary Live Stream',
      details: '1,876 users clicked notification',
      timestamp: '8 hours ago'
    },
    {
      id: 5,
      type: 'sent',
      message: 'Women\'s Forum Invitation',
      details: 'Email campaign completed successfully',
      timestamp: '1 day ago'
    }
  ],
  
  monthlyTrends: {
    sent: [
      { month: 'Aug', count: 42 },
      { month: 'Sep', count: 38 },
      { month: 'Oct', count: 45 },
      { month: 'Nov', count: 52 },
      { month: 'Dec', count: 48 },
      { month: 'Jan', count: 35 }
    ],
    engagement: [
      { month: 'Aug', rate: 68.2 },
      { month: 'Sep', rate: 71.5 },
      { month: 'Oct', rate: 69.8 },
      { month: 'Nov', rate: 74.2 },
      { month: 'Dec', rate: 70.6 },
      { month: 'Jan', rate: 72.8 }
    ]
  },
  
  topPerformingCampaigns: mockCommunications
    .filter(c => c.metrics)
    .sort((a, b) => b.metrics.openRate - a.metrics.openRate)
    .slice(0, 5)
    .map(c => ({
      id: c.id,
      subject: c.subject,
      channel: c.channel,
      openRate: c.metrics.openRate,
      recipients: c.recipients
    })),
  
  deviceBreakdown: {
    mobile: 68.4,
    desktop: 24.7,
    tablet: 6.9
  },
  
  geographicReach: [
    { location: 'Nassau', recipients: 89540, engagement: 74.2 },
    { location: 'Grand Bahama', recipients: 34200, engagement: 71.8 },
    { location: 'Abaco', recipients: 18600, engagement: 68.9 },
    { location: 'Eleuthera', recipients: 15300, engagement: 76.5 },
    { location: 'Exuma', recipients: 8900, engagement: 72.1 },
    { location: 'Other Islands', recipients: 25140, engagement: 69.7 }
  ]
};

// Template library for quick campaign creation
export const communicationTemplates = [
  {
    id: 1,
    name: 'Event Announcement',
    description: 'Standard template for announcing upcoming events',
    channel: 'email',
    category: 'Events',
    usage: 23
  },
  {
    id: 2,
    name: 'Policy Update',
    description: 'Template for sharing policy developments and changes',
    channel: 'email',
    category: 'Policy',
    usage: 18
  },
  {
    id: 3,
    name: 'Urgent Alert',
    description: 'Template for time-sensitive notifications',
    channel: 'sms',
    category: 'Alerts',
    usage: 12
  },
  {
    id: 4,
    name: 'Community Thank You',
    description: 'Template for thanking community participants',
    channel: 'social',
    category: 'Appreciation',
    usage: 15
  },
  {
    id: 5,
    name: 'Radio Announcement',
    description: 'Standard format for radio broadcast announcements',
    channel: 'radio',
    category: 'Broadcasting',
    usage: 8
  }
];