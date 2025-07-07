// Mock Challenges and Daily Missions Data
export const dailyMissions = [
  {
    id: 'daily_1',
    title: 'Morning News Reader',
    description: 'Read 3 news articles before noon',
    type: 'daily',
    requirements: {
      action: 'news_read',
      count: 3,
      timeLimit: '12:00'
    },
    reward_points: 50,
    reward_badge: null,
    difficulty: 'easy',
    icon: '📰',
    progress: {
      current: 1,
      target: 3
    },
    status: 'in_progress',
    expires_at: '2024-12-21T23:59:59Z'
  },
  {
    id: 'daily_2', 
    title: 'Social Sharer',
    description: 'Share 2 posts on social media',
    type: 'daily',
    requirements: {
      action: 'share',
      count: 2
    },
    reward_points: 40,
    reward_badge: null,
    difficulty: 'easy',
    icon: '📤',
    progress: {
      current: 0,
      target: 2
    },
    status: 'available',
    expires_at: '2024-12-21T23:59:59Z'
  },
  {
    id: 'daily_3',
    title: 'Community Connector', 
    description: 'Comment on 5 different posts',
    type: 'daily',
    requirements: {
      action: 'comment',
      count: 5
    },
    reward_points: 75,
    reward_badge: null,
    difficulty: 'medium',
    icon: '💬',
    progress: {
      current: 2,
      target: 5
    },
    status: 'in_progress',
    expires_at: '2024-12-21T23:59:59Z'
  }
];

export const weeklyMissions = [
  {
    id: 'weekly_1',
    title: 'Event Enthusiast',
    description: 'RSVP to 3 different events this week',
    type: 'weekly',
    requirements: {
      action: 'event_rsvp',
      count: 3
    },
    reward_points: 200,
    reward_badge: null,
    difficulty: 'medium',
    icon: '📅',
    progress: {
      current: 1,
      target: 3
    },
    status: 'in_progress',
    expires_at: '2024-12-28T23:59:59Z'
  },
  {
    id: 'weekly_2',
    title: 'Streak Master',
    description: 'Login for 7 consecutive days',
    type: 'weekly', 
    requirements: {
      action: 'consecutive_login',
      count: 7
    },
    reward_points: 350,
    reward_badge: 'Dedicated Supporter',
    difficulty: 'hard',
    icon: '🔥',
    progress: {
      current: 4,
      target: 7
    },
    status: 'in_progress',
    expires_at: '2024-12-28T23:59:59Z'
  },
  {
    id: 'weekly_3',
    title: 'Volunteer Hero',
    description: 'Complete 5 hours of volunteer work',
    type: 'weekly',
    requirements: {
      action: 'volunteer_hours',
      count: 5
    },
    reward_points: 500,
    reward_badge: 'Helper',
    difficulty: 'hard',
    icon: '🤝',
    progress: {
      current: 0,
      target: 5
    },
    status: 'available',
    expires_at: '2024-12-28T23:59:59Z'
  }
];

export const specialChallenges = [
  {
    id: 'special_1',
    title: 'New Year Resolution',
    description: 'Complete all daily missions for the first week of January',
    type: 'special',
    requirements: {
      action: 'complete_daily_missions',
      count: 7,
      timeframe: '2025-01-01 to 2025-01-07'
    },
    reward_points: 1000,
    reward_badge: 'Resolution Keeper',
    difficulty: 'legendary',
    icon: '🎊',
    progress: {
      current: 0,
      target: 7
    },
    status: 'upcoming',
    start_date: '2025-01-01T00:00:00Z',
    end_date: '2025-01-07T23:59:59Z'
  },
  {
    id: 'special_2',
    title: 'Holiday Spirit',
    description: 'Make a donation during the holiday season',
    type: 'special',
    requirements: {
      action: 'donation',
      amount: 25,
      timeframe: 'December 2024'
    },
    reward_points: 500,
    reward_badge: 'Holiday Giver',
    difficulty: 'medium',
    icon: '🎄',
    progress: {
      current: 0,
      target: 1
    },
    status: 'available',
    start_date: '2024-12-01T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z'
  },
  {
    id: 'special_3',
    title: 'Election Countdown',
    description: 'Stay active for 100 days leading up to election',
    type: 'special',
    requirements: {
      action: 'consecutive_activity',
      count: 100
    },
    reward_points: 5000,
    reward_badge: 'Election Champion',
    difficulty: 'legendary',
    icon: '🗳️',
    progress: {
      current: 15,
      target: 100
    },
    status: 'in_progress',
    start_date: '2024-11-01T00:00:00Z',
    end_date: '2026-05-01T23:59:59Z'
  },
  {
    id: 'special_4',
    title: 'Squad Builder',
    description: 'Create a squad and recruit 10 members',
    type: 'special',
    requirements: {
      action: 'squad_creation_and_recruitment',
      count: 10
    },
    reward_points: 2000,
    reward_badge: 'Squad Leader',
    difficulty: 'hard',
    icon: '👥',
    progress: {
      current: 0,
      target: 10
    },
    status: 'available',
    start_date: '2024-12-01T00:00:00Z',
    end_date: '2025-06-30T23:59:59Z'
  }
];

export const constituencyChallenges = [
  {
    id: 'constituency_1',
    title: 'Nassau Central Pride',
    description: 'Nassau Central reaches 1000 total donations',
    type: 'constituency',
    constituency: 'Nassau Central',
    requirements: {
      action: 'constituency_donations',
      count: 1000
    },
    reward_points: 500,
    reward_badge: 'Nassau Central Champion',
    difficulty: 'epic',
    icon: '🏛️',
    progress: {
      current: 756,
      target: 1000
    },
    status: 'in_progress',
    end_date: '2025-03-31T23:59:59Z'
  },
  {
    id: 'constituency_2',
    title: 'Freeport Unity',
    description: 'Every Freeport user logs in on the same day',
    type: 'constituency',
    constituency: 'Freeport',
    requirements: {
      action: 'unity_login',
      percentage: 100
    },
    reward_points: 750,
    reward_badge: 'Freeport United',
    difficulty: 'legendary',
    icon: '🤝',
    progress: {
      current: 78,
      target: 100
    },
    status: 'in_progress',
    end_date: '2025-01-31T23:59:59Z'
  }
];

export const monthlyThemes = [
  {
    month: 'January 2025',
    theme: 'New Beginnings',
    description: 'Start the year strong with new habits and goals',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    challenges: ['New Year Resolution', 'Fresh Start'],
    bonus_multiplier: 1.5
  },
  {
    month: 'February 2025', 
    theme: 'Love Your Community',
    description: 'Show love for your community through volunteering',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    challenges: ['Valentine Volunteer', 'Community Love'],
    bonus_multiplier: 1.3
  },
  {
    month: 'March 2025',
    theme: 'Spring Into Action',
    description: 'Get active with events and community engagement',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    challenges: ['Spring Awakening', 'Action Hero'],
    bonus_multiplier: 1.4
  }
];

export const challengeDifficulties = {
  easy: { color: '#10B981', multiplier: 1.0 },
  medium: { color: '#F59E0B', multiplier: 1.25 },
  hard: { color: '#EF4444', multiplier: 1.5 },
  epic: { color: '#8B5CF6', multiplier: 2.0 },
  legendary: { color: '#EC4899', multiplier: 3.0 }
};

export const getAllChallenges = () => {
  return {
    daily: dailyMissions,
    weekly: weeklyMissions,
    special: specialChallenges,
    constituency: constituencyChallenges
  };
};

export const getActiveChallenges = () => {
  const now = new Date();
  const active = [];
  
  // Add active daily missions
  active.push(...dailyMissions.filter(m => m.status !== 'completed'));
  
  // Add active weekly missions  
  active.push(...weeklyMissions.filter(m => m.status !== 'completed'));
  
  // Add available special challenges
  active.push(...specialChallenges.filter(c => 
    c.status === 'available' || c.status === 'in_progress'
  ));
  
  return active;
};

export const getChallengeProgress = (challengeId) => {
  const allChallenges = [
    ...dailyMissions,
    ...weeklyMissions, 
    ...specialChallenges,
    ...constituencyChallenges
  ];
  
  const challenge = allChallenges.find(c => c.id === challengeId);
  return challenge ? challenge.progress : null;
};

export const updateChallengeProgress = (challengeId, newProgress) => {
  // This would typically update the challenge progress
  // For prototype, we'll simulate the update
  console.log(`Updating challenge ${challengeId} progress:`, newProgress);
};