// Mock user data for admin panel
export const mockUsers = [
  {
    id: 1,
    name: 'Marcus Johnson',
    email: 'marcus.johnson@email.com',
    phone: '(242) 432-1234',
    age: 34,
    gender: 'Male',
    votingDistrict: 'Nassau Central',
    parish: 'New Providence',
    joinDate: '2022-03-15',
    lastActive: '2024-12-08T14:30:00Z',
    status: 'active',
    verified: true,
    volunteerStatus: 'Active',
    donationTotal: 450.00,
    eventsAttended: 12,
    engagementScore: 89,
    badges: ['Community Champion', 'Event Organizer', 'Volunteer Leader'],
    interests: ['Healthcare', 'Education', 'Community Development'],
    socialMedia: {
      facebook: 'marcus.johnson.plp',
      instagram: '@marcusplp',
      twitter: '@MarcusJohnsonPLP'
    },
    demographics: {
      profession: 'Teacher',
      income: 'Middle',
      education: 'University Graduate'
    },
    engagement: {
      newsViews: 45,
      eventAttendance: 12,
      donationFrequency: 'Monthly',
      socialShares: 23,
      commentsPosted: 8
    }
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    phone: '(242) 445-6789',
    age: 28,
    gender: 'Female',
    votingDistrict: 'Nassau West',
    parish: 'New Providence',
    joinDate: '2023-01-22',
    lastActive: '2024-12-08T09:15:00Z',
    status: 'active',
    verified: true,
    volunteerStatus: 'New',
    donationTotal: 125.00,
    eventsAttended: 5,
    engagementScore: 67,
    badges: ['New Member', 'First Donation'],
    interests: ['Youth Development', 'Environment', 'Women\'s Rights'],
    socialMedia: {
      facebook: 'sarah.williams.bs',
      instagram: '@sarahwbs',
      twitter: null
    },
    demographics: {
      profession: 'Nurse',
      income: 'Middle',
      education: 'College Graduate'
    },
    engagement: {
      newsViews: 32,
      eventAttendance: 5,
      donationFrequency: 'Quarterly',
      socialShares: 15,
      commentsPosted: 12
    }
  },
  {
    id: 3,
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    phone: '(242) 456-7890',
    age: 45,
    gender: 'Male',
    votingDistrict: 'Nassau East',
    parish: 'New Providence',
    joinDate: '2021-11-08',
    lastActive: '2024-12-07T16:45:00Z',
    status: 'active',
    verified: true,
    volunteerStatus: 'Leader',
    donationTotal: 1250.00,
    eventsAttended: 28,
    engagementScore: 95,
    badges: ['Long-term Supporter', 'Major Donor', 'Community Leader', 'Event Host'],
    interests: ['Economic Development', 'Infrastructure', 'Healthcare'],
    socialMedia: {
      facebook: 'david.thompson.plp',
      instagram: null,
      twitter: '@DavidThompsonBS'
    },
    demographics: {
      profession: 'Business Owner',
      income: 'High',
      education: 'University Graduate'
    },
    engagement: {
      newsViews: 78,
      eventAttendance: 28,
      donationFrequency: 'Monthly',
      socialShares: 45,
      commentsPosted: 23
    }
  },
  {
    id: 4,
    name: 'Jennifer Clarke',
    email: 'jennifer.clarke@email.com',
    phone: '(242) 467-8901',
    age: 31,
    gender: 'Female',
    votingDistrict: 'Nassau South',
    parish: 'New Providence',
    joinDate: '2023-06-12',
    lastActive: '2024-12-08T11:20:00Z',
    status: 'active',
    verified: false,
    volunteerStatus: 'Active',
    donationTotal: 75.00,
    eventsAttended: 3,
    engagementScore: 58,
    badges: ['Social Media Advocate'],
    interests: ['Education', 'Youth Development', 'Technology'],
    socialMedia: {
      facebook: 'jennifer.clarke.bs',
      instagram: '@jenclarkeplp',
      twitter: '@JenClarkeBS'
    },
    demographics: {
      profession: 'Marketing Specialist',
      income: 'Middle',
      education: 'University Graduate'
    },
    engagement: {
      newsViews: 28,
      eventAttendance: 3,
      donationFrequency: 'Once',
      socialShares: 67,
      commentsPosted: 34
    }
  },
  {
    id: 5,
    name: 'Robert Davis',
    email: 'robert.davis@email.com',
    phone: '(242) 478-9012',
    age: 52,
    gender: 'Male',
    votingDistrict: 'Nassau Central',
    parish: 'New Providence',
    joinDate: '2020-08-30',
    lastActive: '2024-12-06T08:30:00Z',
    status: 'inactive',
    verified: true,
    volunteerStatus: 'Inactive',
    donationTotal: 300.00,
    eventsAttended: 15,
    engagementScore: 42,
    badges: ['Veteran Supporter', 'Event Volunteer'],
    interests: ['Veterans Affairs', 'Security', 'Infrastructure'],
    socialMedia: {
      facebook: null,
      instagram: null,
      twitter: null
    },
    demographics: {
      profession: 'Retired Police Officer',
      income: 'Middle',
      education: 'High School Graduate'
    },
    engagement: {
      newsViews: 15,
      eventAttendance: 15,
      donationFrequency: 'Annually',
      socialShares: 5,
      commentsPosted: 2
    }
  }
];

// Generate additional users for larger dataset
export const generateMockUsers = (count = 100) => {
  const firstNames = [
    'Michael', 'Sarah', 'David', 'Jennifer', 'Robert', 'Lisa', 'William', 'Maria',
    'James', 'Patricia', 'John', 'Linda', 'Richard', 'Barbara', 'Joseph', 'Elizabeth',
    'Thomas', 'Jessica', 'Christopher', 'Ashley', 'Daniel', 'Kimberly', 'Paul', 'Amy',
    'Mark', 'Donna', 'Donald', 'Margaret', 'Steven', 'Ruth', 'Kenneth', 'Carol'
  ];
  
  const lastNames = [
    'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
    'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'
  ];
  
  const districts = [
    'Nassau Central', 'Nassau East', 'Nassau West', 'Nassau South', 'Nassau North',
    'Freeport East', 'Freeport West', 'Eleuthera', 'Abaco', 'Grand Bahama'
  ];
  
  const professions = [
    'Teacher', 'Nurse', 'Business Owner', 'Engineer', 'Doctor', 'Lawyer',
    'Police Officer', 'Fire Fighter', 'Government Worker', 'Accountant',
    'Marketing Specialist', 'Sales Representative', 'Construction Worker',
    'Retail Manager', 'Bank Teller', 'Social Worker'
  ];
  
  const interests = [
    'Healthcare', 'Education', 'Economic Development', 'Environment',
    'Infrastructure', 'Youth Development', 'Women\'s Rights', 'Veterans Affairs',
    'Technology', 'Tourism', 'Agriculture', 'Small Business', 'Community Development'
  ];
  
  const users = [...mockUsers];
  
  for (let i = mockUsers.length; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const age = Math.floor(Math.random() * 50) + 18;
    const joinDate = new Date(2020 + Math.random() * 4, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const lastActive = new Date(2024, 11, Math.floor(Math.random() * 8) + 1);
    
    users.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phone: `(242) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      age,
      gender: Math.random() > 0.5 ? 'Female' : 'Male',
      votingDistrict: districts[Math.floor(Math.random() * districts.length)],
      parish: Math.random() > 0.8 ? 'Grand Bahama' : 'New Providence',
      joinDate: joinDate.toISOString().split('T')[0],
      lastActive: lastActive.toISOString(),
      status: Math.random() > 0.15 ? 'active' : 'inactive',
      verified: Math.random() > 0.2,
      volunteerStatus: ['New', 'Active', 'Leader', 'Inactive'][Math.floor(Math.random() * 4)],
      donationTotal: Math.floor(Math.random() * 2000),
      eventsAttended: Math.floor(Math.random() * 30),
      engagementScore: Math.floor(Math.random() * 100),
      badges: interests.slice(0, Math.floor(Math.random() * 3) + 1),
      interests: interests.slice(0, Math.floor(Math.random() * 4) + 2),
      socialMedia: {
        facebook: Math.random() > 0.3 ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}.plp` : null,
        instagram: Math.random() > 0.5 ? `@${firstName.toLowerCase()}plp` : null,
        twitter: Math.random() > 0.7 ? `@${firstName}${lastName}BS` : null
      },
      demographics: {
        profession: professions[Math.floor(Math.random() * professions.length)],
        income: ['Low', 'Middle', 'High'][Math.floor(Math.random() * 3)],
        education: ['High School Graduate', 'College Graduate', 'University Graduate'][Math.floor(Math.random() * 3)]
      },
      engagement: {
        newsViews: Math.floor(Math.random() * 100),
        eventAttendance: Math.floor(Math.random() * 30),
        donationFrequency: ['Never', 'Once', 'Quarterly', 'Monthly', 'Annually'][Math.floor(Math.random() * 5)],
        socialShares: Math.floor(Math.random() * 80),
        commentsPosted: Math.floor(Math.random() * 50)
      }
    });
  }
  
  return users;
};

export const userStats = {
  total: 12847,
  active: 10234,
  newThisMonth: 487,
  verified: 9876,
  byDistrict: {
    'Nassau Central': 2847,
    'Nassau East': 2234,
    'Nassau West': 1876,
    'Nassau South': 1654,
    'Nassau North': 1423,
    'Freeport East': 987,
    'Freeport West': 834,
    'Eleuthera': 567,
    'Abaco': 345,
    'Grand Bahama': 80
  },
  byAge: {
    '18-25': 1847,
    '26-35': 3456,
    '36-45': 3234,
    '46-55': 2876,
    '56-65': 1234,
    '65+': 200
  },
  byEngagement: {
    'High (80-100)': 2847,
    'Medium (50-79)': 6234,
    'Low (20-49)': 3456,
    'Inactive (0-19)': 310
  }
};