// Enhanced Mock user data with full gamification features
export const mockUsers = [
  {
    id: 1,
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    memberSince: '2024-01-15',
    verified: true,
    votingDistrict: 'Nassau Central',
    age: 34,
    phone: '+1-242-555-0123',
    paymentMethod: 'Credit Card ****1234', // Added for quick donate
    
    // Gamification fields
    total_points: 8750,
    current_level: 4,
    level_name: 'Ambassador',
    consecutive_days: 45,
    last_login_date: '2024-12-20',
    total_donations: 500.00,
    volunteer_hours: 25.5,
    referral_count: 3,
    
    // Badges earned
    badges_unlocked: [
      { id: 1, name: "Early Bird", earned_date: "2024-01-16" },
      { id: 6, name: "Rally Regular", earned_date: "2024-03-10" },
      { id: 10, name: "Blue Heart", earned_date: "2024-01-20" },
      { id: 11, name: "Wave Maker", earned_date: "2024-05-15" },
      { id: 12, name: "Thunder Strike", earned_date: "2024-11-01" },
      { id: 16, name: "Helper", earned_date: "2024-02-01" },
      { id: 17, name: "Dedicated Volunteer", earned_date: "2024-09-15" },
      { id: 4, name: "Dedicated Supporter", earned_date: "2024-10-30" }
    ],
    
    // Social features
    squad_id: 1,
    squad_name: "Nassau Warriors",
    profile_picture_url: "/avatars/marcus.jpg",
    bio: "Proud Bahamian working for a better future. Let's build something great together! 🇧🇸",
    
    // Activity stats
    news_read_count: 156,
    events_attended: 8,
    comments_made: 67,
    posts_shared: 34,
    surveys_completed: 12,
    
    // Achievements showcase (top 3)
    featured_achievements: ["Thunder Strike", "Dedicated Volunteer", "Dedicated Supporter"],
    
    // Current challenges
    active_challenges: ["daily_1", "weekly_2", "special_3"],
    
    // Preferences
    notification_preferences: {
      push_enabled: true,
      email_enabled: true,
      news_updates: true,
      event_reminders: true,
      challenge_notifications: true,
      badge_notifications: true
    }
  },
  {
    id: 2,
    name: 'Sophia Williams',
    email: 'sophia@example.com',
    memberSince: '2024-02-20',
    verified: true,
    votingDistrict: 'Freeport',
    age: 28,
    phone: '+1-242-555-0456',
    paymentMethod: null, // No payment method added yet
    
    // Gamification fields
    total_points: 3420,
    current_level: 3,
    level_name: 'Champion',
    consecutive_days: 23,
    last_login_date: '2024-12-20',
    total_donations: 150.00,
    volunteer_hours: 12.0,
    referral_count: 1,
    
    // Badges earned
    badges_unlocked: [
      { id: 1, name: "Early Bird", earned_date: "2024-02-21" },
      { id: 10, name: "Blue Heart", earned_date: "2024-02-25" },
      { id: 11, name: "Wave Maker", earned_date: "2024-08-10" },
      { id: 16, name: "Helper", earned_date: "2024-03-15" },
      { id: 2, name: "Voice of the People", earned_date: "2024-11-20" }
    ],
    
    // Social features
    squad_id: 2,
    squad_name: "Freeport Champions",
    profile_picture_url: "/avatars/sophia.jpg",
    bio: "Digital creator passionate about community engagement and positive change! 📱✨",
    
    // Activity stats
    news_read_count: 89,
    events_attended: 4,
    comments_made: 112,
    posts_shared: 67,
    surveys_completed: 8,
    
    // Achievements showcase
    featured_achievements: ["Voice of the People", "Wave Maker", "Helper"],
    
    // Current challenges
    active_challenges: ["daily_2", "weekly_1"],
    
    // Preferences
    notification_preferences: {
      push_enabled: true,
      email_enabled: false,
      news_updates: true,
      event_reminders: true,
      challenge_notifications: false,
      badge_notifications: true
    }
  },
  {
    id: 3,
    name: 'David Thompson',
    email: 'david@example.com',
    memberSince: '2024-12-01',
    verified: false,
    votingDistrict: 'Nassau East',
    age: 41,
    phone: '+1-242-555-0789',
    
    // Gamification fields (new user)
    total_points: 245,
    current_level: 1,
    level_name: 'Supporter',
    consecutive_days: 5,
    last_login_date: '2024-12-20',
    total_donations: 0.00,
    volunteer_hours: 0.0,
    referral_count: 0,
    
    // Badges earned (new user)
    badges_unlocked: [
      { id: 1, name: "Early Bird", earned_date: "2024-12-02" }
    ],
    
    // Social features
    squad_id: null,
    squad_name: null,
    profile_picture_url: "/avatars/default.jpg",
    bio: "New to PLP but excited to get involved and make a difference!",
    
    // Activity stats
    news_read_count: 12,
    events_attended: 0,
    comments_made: 8,
    posts_shared: 3,
    surveys_completed: 1,
    
    // Achievements showcase
    featured_achievements: ["Early Bird"],
    
    // Current challenges
    active_challenges: ["daily_1", "daily_3"],
    
    // Preferences
    notification_preferences: {
      push_enabled: true,
      email_enabled: true,
      news_updates: true,
      event_reminders: true,
      challenge_notifications: true,
      badge_notifications: true
    }
  }
];

// Mock squads
export const mockSquads = [
  {
    id: 1,
    name: "Nassau Warriors",
    description: "Fighting for progress in Nassau Central! 💪",
    created_by: 1,
    created_date: "2024-03-15",
    max_members: 10,
    total_points: 45890,
    is_active: true,
    member_count: 8,
    squad_badge: "🏆",
    leader_name: "Marcus Johnson"
  },
  {
    id: 2,
    name: "Freeport Champions",
    description: "United for a better Grand Bahama! 🌊",
    created_by: 2,
    created_date: "2024-04-20",
    max_members: 10,
    total_points: 38750,
    is_active: true,
    member_count: 7,
    squad_badge: "⚡",
    leader_name: "Sophia Williams"
  }
];

export const getCurrentUser = () => {
  // Return user from localStorage or default to first user
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return mockUsers[0];
};

export const saveCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id);
};

export const updateUserPoints = (userId, points) => {
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    user.total_points += points;
    // Update level based on new points
    if (user.total_points >= 25000) {
      user.current_level = 6;
      user.level_name = 'Legend';
    } else if (user.total_points >= 10000) {
      user.current_level = 5;
      user.level_name = 'Guardian';
    } else if (user.total_points >= 5000) {
      user.current_level = 4;
      user.level_name = 'Ambassador';
    } else if (user.total_points >= 2000) {
      user.current_level = 3;
      user.level_name = 'Champion';
    } else if (user.total_points >= 500) {
      user.current_level = 2;
      user.level_name = 'Advocate';
    }
    saveCurrentUser(user);
  }
  return user;
};