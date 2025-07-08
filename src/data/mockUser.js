export const mockUserProfiles = [
  {
    id: 0,
    name: 'Demo User',
    email: 'demo@plp.bs',
    phone: '(242) 555-0123',
    age: 30,
    votingDistrict: 'Nassau Central',
    parish: 'New Providence',
    memberSince: '2024-01-15',
    profilePicture: '/assets/images/profiles/demo.jpg',
    verified: true,
    volunteerStatus: 'Active',
    donationTotal: 200.00,
    eventsAttended: 8,
    badges: ['Demo User', 'Community Supporter', 'Early Adopter'],
    interests: ['Healthcare', 'Education', 'Community Development'],
    socialMedia: {
      facebook: 'demo.user.plp',
      instagram: '@demoplp',
      twitter: '@DemoUserPLP'
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsletter: true
    },
    privacy: {
      profileVisible: true,
      activityVisible: true,
      contactVisible: true
    }
  },
  {
    id: 1,
    name: 'Marcus Johnson',
    email: 'marcus.johnson@email.com',
    phone: '(242) 432-1234',
    age: 34,
    votingDistrict: 'Nassau Central',
    parish: 'New Providence',
    memberSince: '2022-03-15',
    profilePicture: '/assets/images/profiles/marcus.jpg',
    verified: true,
    volunteerStatus: 'Active',
    donationTotal: 450.00,
    eventsAttended: 12,
    badges: ['Community Champion', 'Event Organizer', 'Volunteer Leader'],
    interests: ['Healthcare', 'Education', 'Community Development'],
    socialMedia: {
      facebook: 'marcus.johnson.bs',
      instagram: '@marcusj_bs',
      twitter: '@MarcusJohnsonBS'
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsletter: true
    },
    privacy: {
      profileVisible: true,
      activityVisible: false,
      contactVisible: true
    }
  },
  {
    id: 2,
    name: 'Sophia Williams',
    email: 'sophia.williams@email.com',
    phone: '(242) 456-7890',
    age: 28,
    votingDistrict: 'Nassau East',
    parish: 'New Providence',
    memberSince: '2023-01-22',
    profilePicture: '/assets/images/profiles/sophia.jpg',
    verified: true,
    volunteerStatus: 'Occasional',
    donationTotal: 125.00,
    eventsAttended: 5,
    badges: ['New Member', 'Healthcare Advocate'],
    interests: ['Healthcare', 'Women\'s Rights', 'Environment'],
    socialMedia: {
      facebook: 'sophia.williams.242',
      instagram: '@sophiaw_healthcare'
    },
    notifications: {
      email: true,
      push: true,
      sms: true,
      newsletter: true
    },
    privacy: {
      profileVisible: true,
      activityVisible: true,
      contactVisible: false
    }
  }
];

export const mockGuestUser = {
  id: 'guest',
  name: 'Demo User',
  email: 'demo@plp.bs',
  isGuest: true,
  donationTotal: 175.00, // Show some demo donation history
  permissions: {
    viewNews: true,
    viewEvents: true,
    likeContent: true,
    comment: true,
    rsvp: false,
    donate: true, // Enable donations for demo purposes
    volunteer: false,
    privateMessages: false
  },
  sessionData: {
    startTime: new Date().toISOString(),
    viewedArticles: [],
    likedArticles: [],
    comments: [],
    interests: []
  }
};

export const mockUserStats = {
  totalMembers: 15420,
  activeMembers: 8940,
  newMembersThisMonth: 342,
  totalDonations: 145000,
  totalVolunteers: 2150,
  eventsThisMonth: 18,
  averageEventAttendance: 125
};