// PLP Gamification System - Comprehensive Data Structure
// Political engagement gamification designed to increase user participation

export const ENGAGEMENT_ACTIONS = {
  // Authentication & Onboarding
  DAILY_LOGIN: { points: 5, name: 'Daily Login', category: 'engagement' },
  PROFILE_COMPLETE: { points: 50, name: 'Complete Profile', category: 'onboarding' },
  FIRST_LOGIN: { points: 25, name: 'Welcome Bonus', category: 'onboarding' },
  
  // News Engagement
  NEWS_READ: { points: 3, name: 'Read Article', category: 'news' },
  NEWS_LIKE: { points: 2, name: 'Like Article', category: 'news' },
  NEWS_COMMENT: { points: 5, name: 'Comment on Article', category: 'news' },
  NEWS_SHARE: { points: 4, name: 'Share Article', category: 'news' },
  
  // Event Participation
  EVENT_RSVP: { points: 10, name: 'RSVP to Event', category: 'events' },
  EVENT_ATTEND: { points: 25, name: 'Attend Event', category: 'events' },
  EVENT_FEEDBACK: { points: 8, name: 'Event Feedback', category: 'events' },
  LIVESTREAM_JOIN: { points: 15, name: 'Join Live Stream', category: 'events' },
  
  // Donations & Support
  FIRST_DONATION: { points: 100, name: 'First Donation', category: 'donations' },
  MONTHLY_DONOR: { points: 75, name: 'Monthly Supporter', category: 'donations' },
  DONATION_MILESTONE: { points: 50, name: 'Donation Milestone', category: 'donations' },
  
  // Volunteering
  VOLUNTEER_SIGNUP: { points: 20, name: 'Volunteer Sign-up', category: 'volunteer' },
  VOLUNTEER_HOURS: { points: 5, name: 'Volunteer Hour', category: 'volunteer' }, // per hour
  VOLUNTEER_COMPLETE: { points: 30, name: 'Complete Volunteer Task', category: 'volunteer' },
  
  // Community Engagement
  SURVEY_COMPLETE: { points: 15, name: 'Complete Survey', category: 'community' },
  REFERRAL_SIGNUP: { points: 40, name: 'Successful Referral', category: 'community' },
  POLL_PARTICIPATE: { points: 8, name: 'Participate in Poll', category: 'community' },
  
  // Special Actions
  TOWN_HALL_ATTEND: { points: 35, name: 'Town Hall Attendance', category: 'special' },
  RALLY_ATTEND: { points: 30, name: 'Rally Attendance', category: 'special' },
  CONSTITUENCY_MEET: { points: 45, name: 'Constituency Meeting', category: 'special' },
};

export const USER_LEVELS = [
  {
    id: 1,
    name: 'Supporter',
    minPoints: 0,
    maxPoints: 99,
    color: '#6B7280',
    icon: '🤝',
    benefits: ['Access to news feed', 'Event notifications'],
    description: 'New to the movement'
  },
  {
    id: 2,
    name: 'Activist',
    minPoints: 100,
    maxPoints: 299,
    color: '#3B82F6',
    icon: '📢',
    benefits: ['Priority event notifications', 'Exclusive content access'],
    description: 'Engaged community member'
  },
  {
    id: 3,
    name: 'Champion',
    minPoints: 300,
    maxPoints: 699,
    color: '#0066CC',
    icon: '🏆',
    benefits: ['VIP event access', 'Direct feedback channels', 'Special recognition'],
    description: 'Dedicated advocate'
  },
  {
    id: 4,
    name: 'Leader',
    minPoints: 700,
    maxPoints: 1499,
    color: '#FFD700',
    icon: '⭐',
    benefits: ['Leadership opportunities', 'Policy consultation', 'Exclusive meetings'],
    description: 'Community leader'
  },
  {
    id: 5,
    name: 'Legend',
    minPoints: 1500,
    maxPoints: null,
    color: '#FF6B35',
    icon: '👑',
    benefits: ['All benefits', 'Special advisory role', 'Recognition events'],
    description: 'Movement pioneer'
  }
];

export const ACHIEVEMENT_BADGES = [
  // Engagement Badges
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first login',
    icon: '👋',
    color: '#22C55E',
    rarity: 'common',
    requirements: { action: 'FIRST_LOGIN', count: 1 }
  },
  {
    id: 'daily_warrior',
    name: 'Daily Warrior',
    description: 'Login for 7 consecutive days',
    icon: '🔥',
    color: '#F59E0B',
    rarity: 'uncommon',
    requirements: { streak: 'daily_login', count: 7 }
  },
  {
    id: 'news_junkie',
    name: 'News Junkie',
    description: 'Read 50 news articles',
    icon: '📰',
    color: '#3B82F6',
    rarity: 'rare',
    requirements: { action: 'NEWS_READ', count: 50 }
  },
  
  // Community Badges
  {
    id: 'conversation_starter',
    name: 'Conversation Starter',
    description: 'Make 25 comments',
    icon: '💬',
    color: '#8B5CF6',
    rarity: 'uncommon',
    requirements: { action: 'NEWS_COMMENT', count: 25 }
  },
  {
    id: 'event_enthusiast',
    name: 'Event Enthusiast',
    description: 'Attend 10 events',
    icon: '🎭',
    color: '#EC4899',
    rarity: 'rare',
    requirements: { action: 'EVENT_ATTEND', count: 10 }
  },
  {
    id: 'generous_supporter',
    name: 'Generous Supporter',
    description: 'Make your first donation',
    icon: '❤️',
    color: '#EF4444',
    rarity: 'special',
    requirements: { action: 'FIRST_DONATION', count: 1 }
  },
  
  // Leadership Badges
  {
    id: 'community_builder',
    name: 'Community Builder',
    description: 'Refer 5 new members',
    icon: '🏗️',
    color: '#10B981',
    rarity: 'epic',
    requirements: { action: 'REFERRAL_SIGNUP', count: 5 }
  },
  {
    id: 'volunteer_hero',
    name: 'Volunteer Hero',
    description: 'Complete 50 volunteer hours',
    icon: '🦸',
    color: '#6366F1',
    rarity: 'legendary',
    requirements: { action: 'VOLUNTEER_HOURS', count: 50 }
  },
  {
    id: 'town_hall_champion',
    name: 'Town Hall Champion',
    description: 'Attend 5 town hall meetings',
    icon: '🏛️',
    color: '#FFD700',
    rarity: 'epic',
    requirements: { action: 'TOWN_HALL_ATTEND', count: 5 }
  },
  
  // Live Streaming Badges
  {
    id: 'stream_viewer',
    name: 'Stream Viewer',
    description: 'Join your first live stream',
    icon: '📺',
    color: '#DC2626',
    rarity: 'common',
    requirements: { action: 'LIVESTREAM_JOIN', count: 1 }
  },
  {
    id: 'stream_enthusiast',
    name: 'Stream Enthusiast',
    description: 'Join 10 live streams',
    icon: '🎬',
    color: '#DC2626',
    rarity: 'rare',
    requirements: { action: 'LIVESTREAM_JOIN', count: 10 }
  },
  {
    id: 'live_loyalist',
    name: 'Live Loyalist',
    description: 'Join 25 live streams',
    icon: '🔴',
    color: '#B91C1C',
    rarity: 'epic',
    requirements: { action: 'LIVESTREAM_JOIN', count: 25 }
  },
  {
    id: 'stream_legend',
    name: 'Stream Legend',
    description: 'Join 50 live streams',
    icon: '👑',
    color: '#7C2D12',
    rarity: 'legendary',
    requirements: { action: 'LIVESTREAM_JOIN', count: 50 }
  }
];

export const DAILY_CHALLENGES = [
  {
    id: 'daily_reader',
    name: 'Daily Reader',
    description: 'Read 3 news articles today',
    points: 20,
    icon: '📖',
    requirements: { action: 'NEWS_READ', count: 3, timeframe: 'daily' }
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Like and comment on 2 articles',
    points: 15,
    icon: '🦋',
    requirements: { 
      actions: [
        { action: 'NEWS_LIKE', count: 2 },
        { action: 'NEWS_COMMENT', count: 2 }
      ],
      timeframe: 'daily'
    }
  },
  {
    id: 'event_explorer',
    name: 'Event Explorer',
    description: 'RSVP to an upcoming event',
    points: 25,
    icon: '🗓️',
    requirements: { action: 'EVENT_RSVP', count: 1, timeframe: 'daily' }
  },
  {
    id: 'live_viewer',
    name: 'Live Viewer',
    description: 'Join a live stream today',
    points: 20,
    icon: '🔴',
    requirements: { action: 'LIVESTREAM_JOIN', count: 1, timeframe: 'daily' }
  }
];

export const WEEKLY_CHALLENGES = [
  {
    id: 'weekly_engagement',
    name: 'Weekly Engagement',
    description: 'Complete 5 different types of activities',
    points: 100,
    icon: '⚡',
    requirements: { 
      uniqueActions: 5,
      timeframe: 'weekly'
    }
  },
  {
    id: 'community_voice',
    name: 'Community Voice',
    description: 'Complete a survey and share 3 articles',
    points: 75,
    icon: '🗣️',
    requirements: {
      actions: [
        { action: 'SURVEY_COMPLETE', count: 1 },
        { action: 'NEWS_SHARE', count: 3 }
      ],
      timeframe: 'weekly'
    }
  }
];

export const LEADERBOARD_TYPES = [
  {
    id: 'national',
    name: 'National Leaderboard',
    description: 'Top supporters across The Bahamas',
    scope: 'national',
    resetPeriod: 'monthly'
  },
  {
    id: 'constituency',
    name: 'Constituency Champions',
    description: 'Top supporters in your area',
    scope: 'constituency',
    resetPeriod: 'monthly'
  },
  {
    id: 'weekly_climbers',
    name: 'Weekly Climbers',
    description: 'Most points earned this week',
    scope: 'national',
    resetPeriod: 'weekly'
  },
  {
    id: 'volunteer_heroes',
    name: 'Volunteer Heroes',
    description: 'Top volunteers by hours contributed',
    scope: 'national',
    resetPeriod: 'quarterly'
  }
];

// Utility functions for gamification
export const calculateLevel = (totalPoints) => {
  return USER_LEVELS.find(level => 
    totalPoints >= level.minPoints && 
    (level.maxPoints === null || totalPoints <= level.maxPoints)
  ) || USER_LEVELS[0];
};

export const getProgressToNextLevel = (totalPoints) => {
  const currentLevel = calculateLevel(totalPoints);
  const nextLevel = USER_LEVELS.find(level => level.id === currentLevel.id + 1);
  
  if (!nextLevel) {
    return { progress: 100, pointsNeeded: 0, nextLevel: null };
  }
  
  const pointsInCurrentLevel = totalPoints - currentLevel.minPoints;
  const pointsNeededForLevel = nextLevel.minPoints - currentLevel.minPoints;
  const progress = (pointsInCurrentLevel / pointsNeededForLevel) * 100;
  const pointsNeeded = nextLevel.minPoints - totalPoints;
  
  return { progress, pointsNeeded, nextLevel };
};

export const checkBadgeEligibility = (userStats, badge) => {
  const { requirements } = badge;
  
  if (requirements.action && requirements.count) {
    const actionCount = userStats.actions?.[requirements.action] || 0;
    return actionCount >= requirements.count;
  }
  
  if (requirements.streak) {
    const streakCount = userStats.streaks?.[requirements.streak] || 0;
    return streakCount >= requirements.count;
  }
  
  if (requirements.actions) {
    return requirements.actions.every(req => {
      const actionCount = userStats.actions?.[req.action] || 0;
      return actionCount >= req.count;
    });
  }
  
  return false;
};

export const awardPoints = (action, multiplier = 1) => {
  const actionData = ENGAGEMENT_ACTIONS[action];
  if (!actionData) return 0;
  
  return actionData.points * multiplier;
};

// Sample user gamification data structure
export const createUserGamificationProfile = (userId) => ({
  userId,
  totalPoints: 0,
  currentLevel: 1,
  badges: [],
  streaks: {
    daily_login: 0,
    weekly_engagement: 0
  },
  actions: {
    // Track count of each action
    DAILY_LOGIN: 0,
    NEWS_READ: 0,
    NEWS_LIKE: 0,
    // ... other actions
  },
  challenges: {
    daily: [],
    weekly: [],
    completed: []
  },
  leaderboards: {
    national: { rank: null, points: 0 },
    constituency: { rank: null, points: 0 }
  },
  milestones: [],
  lastActive: new Date().toISOString(),
  joinDate: new Date().toISOString()
});

export default {
  ENGAGEMENT_ACTIONS,
  USER_LEVELS,
  ACHIEVEMENT_BADGES,
  DAILY_CHALLENGES,
  WEEKLY_CHALLENGES,
  LEADERBOARD_TYPES,
  calculateLevel,
  getProgressToNextLevel,
  checkBadgeEligibility,
  awardPoints,
  createUserGamificationProfile
};