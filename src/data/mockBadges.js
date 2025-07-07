// Mock Badge Data for PLP App Gamification
export const mockBadges = [
  // Engagement Badges
  {
    id: 1,
    name: 'Early Bird',
    description: 'First 100 users to read morning news',
    icon: '🌅',
    badge_type: 'engagement',
    points_required: 0,
    is_active: true,
    animation_type: 'sparkle',
    rarity: 'common'
  },
  {
    id: 2,
    name: 'Voice of the People',
    description: 'Made 50+ comments on news articles',
    icon: '📢',
    badge_type: 'engagement',
    points_required: 1000,
    is_active: true,
    animation_type: 'pulse',
    rarity: 'uncommon'
  },
  {
    id: 3,
    name: 'Amplifier',
    description: 'Shared 100+ posts',
    icon: '🔄',
    badge_type: 'engagement',
    points_required: 1500,
    is_active: true,
    animation_type: 'spin',
    rarity: 'uncommon'
  },
  {
    id: 4,
    name: 'Dedicated Supporter',
    description: '30-day login streak',
    icon: '🎯',
    badge_type: 'engagement',
    points_required: 600,
    is_active: true,
    animation_type: 'glow',
    rarity: 'rare'
  },
  {
    id: 5,
    name: 'Influencer',
    description: 'Posts liked 1000+ times',
    icon: '🌟',
    badge_type: 'engagement',
    points_required: 5000,
    is_active: true,
    animation_type: 'rainbow',
    rarity: 'epic'
  },

  // Event Badges
  {
    id: 6,
    name: 'Rally Regular',
    description: 'Attended 5+ rallies',
    icon: '🎪',
    badge_type: 'event',
    points_required: 250,
    is_active: true,
    animation_type: 'bounce',
    rarity: 'common'
  },
  {
    id: 7,
    name: 'Town Hall Hero',
    description: 'Attended 10+ town halls',
    icon: '🏛️',
    badge_type: 'event',
    points_required: 500,
    is_active: true,
    animation_type: 'shake',
    rarity: 'uncommon'
  },
  {
    id: 8,
    name: 'Stream Supreme',
    description: 'Watched 20+ live streams',
    icon: '📺',
    badge_type: 'event',
    points_required: 1000,
    is_active: true,
    animation_type: 'wave',
    rarity: 'rare'
  },
  {
    id: 9,
    name: 'Community Builder',
    description: 'Brought 10+ friends to events',
    icon: '🤝',
    badge_type: 'event',
    points_required: 2000,
    is_active: true,
    animation_type: 'hearts',
    rarity: 'epic'
  },

  // Donation Badges (Animated & Special Effects)
  {
    id: 10,
    name: 'Blue Heart',
    description: 'Made your first donation',
    icon: '💙',
    badge_type: 'donation',
    points_required: 0,
    is_active: true,
    animation_type: 'heartbeat',
    rarity: 'common'
  },
  {
    id: 11,
    name: 'Wave Maker',
    description: 'Donated $100+ total',
    icon: '🌊',
    badge_type: 'donation',
    points_required: 100,
    is_active: true,
    animation_type: 'wave',
    rarity: 'uncommon'
  },
  {
    id: 12,
    name: 'Thunder Strike',
    description: 'Donated $500+ total',
    icon: '⚡',
    badge_type: 'donation',
    points_required: 500,
    is_active: true,
    animation_type: 'lightning',
    rarity: 'rare'
  },
  {
    id: 13,
    name: 'Flame Bearer',
    description: 'Donated $1,000+ total',
    icon: '🔥',
    badge_type: 'donation',
    points_required: 1000,
    is_active: true,
    animation_type: 'fire',
    rarity: 'epic'
  },
  {
    id: 14,
    name: 'Diamond Patron',
    description: 'Donated $5,000+ total',
    icon: '💎',
    badge_type: 'donation',
    points_required: 5000,
    is_active: true,
    animation_type: 'diamond',
    rarity: 'legendary'
  },
  {
    id: 15,
    name: 'Constellation',
    description: 'Donated $10,000+ total',
    icon: '🌟',
    badge_type: 'donation',
    points_required: 10000,
    is_active: true,
    animation_type: 'constellation',
    rarity: 'mythic'
  },

  // Volunteer Badges
  {
    id: 16,
    name: 'Helper',
    description: 'Completed first volunteer shift',
    icon: '🙋',
    badge_type: 'volunteer',
    points_required: 0,
    is_active: true,
    animation_type: 'sparkle',
    rarity: 'common'
  },
  {
    id: 17,
    name: 'Dedicated Volunteer',
    description: 'Completed 25+ volunteer hours',
    icon: '⏰',
    badge_type: 'volunteer',
    points_required: 2500,
    is_active: true,
    animation_type: 'clock',
    rarity: 'rare'
  },
  {
    id: 18,
    name: 'Champion Volunteer',
    description: 'Completed 100+ volunteer hours',
    icon: '🏆',
    badge_type: 'volunteer',
    points_required: 10000,
    is_active: true,
    animation_type: 'trophy',
    rarity: 'legendary'
  },

  // Special Badges
  {
    id: 19,
    name: 'Founder',
    description: 'Early supporter - first 1000 users',
    icon: '👑',
    badge_type: 'special',
    points_required: 0,
    is_active: true,
    animation_type: 'crown',
    rarity: 'exclusive'
  },
  {
    id: 20,
    name: 'Bahamas Pride',
    description: 'Completed Independence Day challenge',
    icon: '🇧🇸',
    badge_type: 'special',
    points_required: 0,
    is_active: true,
    animation_type: 'flag',
    rarity: 'exclusive'
  }
];

// User Level System
export const userLevels = [
  { level: 1, name: 'Supporter', minPoints: 0, maxPoints: 499, color: '#3B82F6', animation: 'none' },
  { level: 2, name: 'Advocate', minPoints: 500, maxPoints: 1999, color: '#3B82F6', animation: 'sparkle' },
  { level: 3, name: 'Champion', minPoints: 2000, maxPoints: 4999, color: '#FFD700', animation: 'glow' },
  { level: 4, name: 'Ambassador', minPoints: 5000, maxPoints: 9999, color: '#FFD700', animation: 'crown' },
  { level: 5, name: 'Guardian', minPoints: 10000, maxPoints: 24999, color: '#C0C0C0', animation: 'wings' },
  { level: 6, name: 'Legend', minPoints: 25000, maxPoints: Infinity, color: 'rainbow', animation: 'rainbow' }
];

// Points System
export const pointsSystem = {
  daily_login: 5,
  news_read: 10,
  news_share: 15,
  news_comment: 20,
  event_rsvp: 25,
  event_attendance: 50,
  survey_complete: 30,
  volunteer_hour: 100,
  donation_dollar: 1,
  friend_referral: 200,
  first_post: 50,
  streak_bonus_7_days: 35,
  streak_bonus_30_days: 150,
  challenge_complete: 100
};

export const getBadgesByType = (type) => {
  return mockBadges.filter(badge => badge.badge_type === type);
};

export const getUserLevel = (points) => {
  for (let i = userLevels.length - 1; i >= 0; i--) {
    if (points >= userLevels[i].minPoints) {
      return userLevels[i];
    }
  }
  return userLevels[0];
};