// Mock campaign and donation data for admin panel
export const mockCampaigns = [
  {
    id: 1,
    name: 'Healthcare for All Initiative',
    description: 'Expanding healthcare access and building new medical facilities across The Bahamas.',
    goal: 500000,
    raised: 342750,
    donors: 1247,
    startDate: '2024-10-01',
    endDate: '2025-06-30',
    status: 'active',
    category: 'Healthcare',
    priority: 'high',
    image: '/images/healthcare-campaign.jpg',
    manager: 'Dr. Sarah Williams',
    milestones: [
      { amount: 100000, description: 'Phase 1: Equipment Purchase', achieved: true, date: '2024-11-15' },
      { amount: 250000, description: 'Phase 2: Facility Construction', achieved: true, date: '2024-12-01' },
      { amount: 400000, description: 'Phase 3: Staff Training', achieved: false, date: null },
      { amount: 500000, description: 'Phase 4: Full Implementation', achieved: false, date: null }
    ],
    recentDonations: [
      { donor: 'Marcus Thompson', amount: 250, date: '2024-12-08', anonymous: false },
      { donor: 'Anonymous', amount: 100, date: '2024-12-08', anonymous: true },
      { donor: 'Sarah Johnson', amount: 75, date: '2024-12-07', anonymous: false },
      { donor: 'David Clarke', amount: 500, date: '2024-12-07', anonymous: false }
    ]
  },
  {
    id: 2,
    name: 'Education Excellence Program',
    description: 'Building better schools and providing technology resources for students.',
    goal: 300000,
    raised: 187250,
    donors: 892,
    startDate: '2024-11-01',
    endDate: '2025-03-31',
    status: 'active',
    category: 'Education',
    priority: 'high',
    image: '/images/education-campaign.jpg',
    manager: 'Jennifer Clarke',
    milestones: [
      { amount: 75000, description: 'Technology Equipment', achieved: true, date: '2024-11-20' },
      { amount: 150000, description: 'Infrastructure Improvements', achieved: true, date: '2024-12-05' },
      { amount: 225000, description: 'Teacher Training Programs', achieved: false, date: null },
      { amount: 300000, description: 'Program Launch', achieved: false, date: null }
    ],
    recentDonations: [
      { donor: 'Robert Davis', amount: 150, date: '2024-12-08', anonymous: false },
      { donor: 'Maria Rodriguez', amount: 200, date: '2024-12-08', anonymous: false },
      { donor: 'Anonymous', amount: 50, date: '2024-12-07', anonymous: true }
    ]
  },
  {
    id: 3,
    name: 'Youth Development Fund',
    description: 'Supporting youth programs and leadership development initiatives.',
    goal: 150000,
    raised: 98750,
    donors: 567,
    startDate: '2024-09-15',
    endDate: '2025-02-28',
    status: 'active',
    category: 'Youth Development',
    priority: 'medium',
    image: '/images/youth-campaign.jpg',
    manager: 'Michael Roberts',
    milestones: [
      { amount: 50000, description: 'Program Design & Planning', achieved: true, date: '2024-10-15' },
      { amount: 100000, description: 'Equipment & Resources', achieved: false, date: null },
      { amount: 150000, description: 'Full Program Launch', achieved: false, date: null }
    ],
    recentDonations: [
      { donor: 'Lisa Thompson', amount: 100, date: '2024-12-08', anonymous: false },
      { donor: 'James Wilson', amount: 300, date: '2024-12-07', anonymous: false }
    ]
  },
  {
    id: 4,
    name: 'Community Infrastructure',
    description: 'Improving roads, utilities, and public facilities in underserved areas.',
    goal: 750000,
    raised: 423100,
    donors: 1856,
    startDate: '2024-08-01',
    endDate: '2025-12-31',
    status: 'active',
    category: 'Infrastructure',
    priority: 'high',
    image: '/images/infrastructure-campaign.jpg',
    manager: 'Patricia Johnson',
    milestones: [
      { amount: 200000, description: 'Phase 1: Road Repairs', achieved: true, date: '2024-10-01' },
      { amount: 400000, description: 'Phase 2: Utility Upgrades', achieved: true, date: '2024-11-30' },
      { amount: 600000, description: 'Phase 3: Public Facilities', achieved: false, date: null },
      { amount: 750000, description: 'Project Completion', achieved: false, date: null }
    ],
    recentDonations: [
      { donor: 'David Thompson', amount: 1000, date: '2024-12-08', anonymous: false },
      { donor: 'Anonymous', amount: 250, date: '2024-12-08', anonymous: true },
      { donor: 'Community Group', amount: 500, date: '2024-12-07', anonymous: false }
    ]
  },
  {
    id: 5,
    name: 'Environmental Protection',
    description: 'Marine conservation and renewable energy initiatives.',
    goal: 200000,
    raised: 67890,
    donors: 345,
    startDate: '2024-12-01',
    endDate: '2025-08-31',
    status: 'active',
    category: 'Environment',
    priority: 'medium',
    image: '/images/environment-campaign.jpg',
    manager: 'Dr. Mark Davis',
    milestones: [
      { amount: 50000, description: 'Research & Planning', achieved: true, date: '2024-12-15' },
      { amount: 100000, description: 'Equipment Procurement', achieved: false, date: null },
      { amount: 150000, description: 'Implementation Phase 1', achieved: false, date: null },
      { amount: 200000, description: 'Full Program Rollout', achieved: false, date: null }
    ],
    recentDonations: [
      { donor: 'Environmental Group', amount: 400, date: '2024-12-08', anonymous: false },
      { donor: 'Anonymous', amount: 125, date: '2024-12-07', anonymous: true }
    ]
  }
];

export const donationStats = {
  totalRaised: 1419740,
  totalDonors: 4907,
  averageDonation: 289,
  thisMonth: {
    raised: 67890,
    donors: 234,
    growth: 18
  },
  byCategory: {
    'Healthcare': 342750,
    'Education': 187250,
    'Infrastructure': 423100,
    'Youth Development': 98750,
    'Environment': 67890,
    'General': 300000
  },
  byAmount: {
    '$1-$50': 1847,
    '$51-$100': 1456,
    '$101-$250': 987,
    '$251-$500': 456,
    '$501-$1000': 134,
    '$1000+': 27
  },
  byFrequency: {
    'One-time': 3456,
    'Monthly': 987,
    'Quarterly': 345,
    'Annually': 119
  },
  topDonors: [
    { name: 'David Thompson', totalDonated: 5250, donationCount: 12 },
    { name: 'Community Foundation', totalDonated: 4800, donationCount: 6 },
    { name: 'Business Alliance', totalDonated: 3950, donationCount: 8 },
    { name: 'Anonymous Donor #1', totalDonated: 3600, donationCount: 18 },
    { name: 'Marcus Johnson', totalDonated: 2750, donationCount: 15 }
  ],
  recentTransactions: [
    { id: 1, donor: 'Sarah Williams', amount: 150, campaign: 'Healthcare for All', date: '2024-12-08T14:30:00Z' },
    { id: 2, donor: 'Anonymous', amount: 75, campaign: 'Education Excellence', date: '2024-12-08T13:15:00Z' },
    { id: 3, donor: 'Robert Davis', amount: 300, campaign: 'Youth Development', date: '2024-12-08T11:45:00Z' },
    { id: 4, donor: 'Jennifer Clarke', amount: 200, campaign: 'Infrastructure', date: '2024-12-08T09:20:00Z' },
    { id: 5, donor: 'David Thompson', amount: 500, campaign: 'Healthcare for All', date: '2024-12-07T16:10:00Z' }
  ]
};

export const generateDonationHistory = (days = 30) => {
  const history = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const donationCount = Math.floor(Math.random() * 50) + 10;
    const totalAmount = Math.floor(Math.random() * 5000) + 1000;
    
    history.push({
      date: date.toISOString().split('T')[0],
      donationCount,
      totalAmount,
      averageAmount: Math.floor(totalAmount / donationCount)
    });
  }
  
  return history.reverse();
};