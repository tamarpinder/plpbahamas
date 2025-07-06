// Gamification Service for PLP Mobile App
import { mockBadges, userLevels, pointsSystem, getUserLevel } from '../data/mockBadges.js';
import { getCurrentUser, saveCurrentUser, updateUserPoints } from '../data/mockUserGamified.js';

class GamificationService {
  constructor() {
    this.pointsSystem = pointsSystem;
    this.badges = mockBadges;
    this.userLevels = userLevels;
  }

  // Award points for user actions
  awardPoints(action, extraData = {}) {
    const user = getCurrentUser();
    if (!user || user.isGuest) return null;

    let points = 0;
    let badges = [];
    let levelUp = false;
    let celebrations = [];

    // Calculate base points
    switch (action) {
      case 'daily_login':
        points = this.pointsSystem.daily_login;
        this.updateLoginStreak(user);
        break;
      case 'news_read':
        points = this.pointsSystem.news_read;
        user.news_read_count = (user.news_read_count || 0) + 1;
        break;
      case 'news_share':
        points = this.pointsSystem.news_share;
        user.posts_shared = (user.posts_shared || 0) + 1;
        break;
      case 'news_comment':
        points = this.pointsSystem.news_comment;
        user.comments_made = (user.comments_made || 0) + 1;
        break;
      case 'event_rsvp':
        points = this.pointsSystem.event_rsvp;
        break;
      case 'event_attendance':
        points = this.pointsSystem.event_attendance;
        user.events_attended = (user.events_attended || 0) + 1;
        break;
      case 'survey_complete':
        points = this.pointsSystem.survey_complete;
        user.surveys_completed = (user.surveys_completed || 0) + 1;
        break;
      case 'volunteer_hour':
        points = this.pointsSystem.volunteer_hour * (extraData.hours || 1);
        user.volunteer_hours = (user.volunteer_hours || 0) + (extraData.hours || 1);
        break;
      case 'donation':
        points = this.pointsSystem.donation_dollar * (extraData.amount || 0);
        user.total_donations = (user.total_donations || 0) + (extraData.amount || 0);
        break;
      case 'friend_referral':
        points = this.pointsSystem.friend_referral;
        user.referral_count = (user.referral_count || 0) + 1;
        break;
      case 'challenge_complete':
        points = this.pointsSystem.challenge_complete;
        break;
      default:
        points = 0;
    }

    // Apply streak bonuses
    if (user.consecutive_days >= 7 && action === 'daily_login') {
      if (user.consecutive_days % 7 === 0) {
        points += this.pointsSystem.streak_bonus_7_days;
        celebrations.push('🔥 7-day streak bonus!');
      }
      if (user.consecutive_days >= 30 && user.consecutive_days % 30 === 0) {
        points += this.pointsSystem.streak_bonus_30_days;
        celebrations.push('🏆 30-day streak master!');
      }
    }

    // Update user points
    const oldLevel = user.current_level;
    user.total_points = (user.total_points || 0) + points;

    // Check for level up
    const newLevelInfo = getUserLevel(user.total_points);
    if (newLevelInfo.level > oldLevel) {
      user.current_level = newLevelInfo.level;
      user.level_name = newLevelInfo.name;
      levelUp = true;
      celebrations.push(`🎉 Level up! You're now a ${newLevelInfo.name}!`);
    }

    // Check for new badges
    badges = this.checkForNewBadges(user, action, extraData);

    // Save updated user
    saveCurrentUser(user);

    return {
      points_earned: points,
      total_points: user.total_points,
      level_up: levelUp,
      new_level: levelUp ? newLevelInfo : null,
      badges_earned: badges,
      celebrations: celebrations,
      user: user
    };
  }

  updateLoginStreak(user) {
    const today = new Date().toDateString();
    const lastLogin = user.last_login_date ? new Date(user.last_login_date).toDateString() : null;
    
    if (lastLogin === today) {
      // Already logged in today
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (lastLogin === yesterdayString) {
      // Consecutive day
      user.consecutive_days = (user.consecutive_days || 0) + 1;
    } else if (lastLogin !== today) {
      // Streak broken or first login
      user.consecutive_days = 1;
    }

    user.last_login_date = new Date().toISOString();
  }

  checkForNewBadges(user, action, extraData) {
    const newBadges = [];
    const userBadgeIds = user.badges_unlocked?.map(b => b.id) || [];

    // Check all badges for eligibility
    for (const badge of this.badges) {
      if (userBadgeIds.includes(badge.id)) continue; // Already earned

      let earned = false;

      // Check badge requirements based on type and action
      switch (badge.badge_type) {
        case 'engagement':
          earned = this.checkEngagementBadge(badge, user, action);
          break;
        case 'donation':
          earned = this.checkDonationBadge(badge, user);
          break;
        case 'volunteer':
          earned = this.checkVolunteerBadge(badge, user);
          break;
        case 'event':
          earned = this.checkEventBadge(badge, user);
          break;
        case 'special':
          earned = this.checkSpecialBadge(badge, user, action);
          break;
      }

      if (earned) {
        const earnedBadge = {
          ...badge,
          earned_date: new Date().toISOString()
        };
        
        user.badges_unlocked = user.badges_unlocked || [];
        user.badges_unlocked.push(earnedBadge);
        newBadges.push(earnedBadge);
      }
    }

    return newBadges;
  }

  checkEngagementBadge(badge, user, action) {
    switch (badge.name) {
      case 'Early Bird':
        return action === 'news_read' && new Date().getHours() < 10;
      case 'Voice of the People':
        return (user.comments_made || 0) >= 50;
      case 'Amplifier':
        return (user.posts_shared || 0) >= 100;
      case 'Dedicated Supporter':
        return (user.consecutive_days || 0) >= 30;
      case 'Influencer':
        return (user.total_points || 0) >= 5000;
      default:
        return false;
    }
  }

  checkDonationBadge(badge, user) {
    const totalDonations = user.total_donations || 0;
    
    switch (badge.name) {
      case 'Blue Heart':
        return totalDonations > 0;
      case 'Wave Maker':
        return totalDonations >= 100;
      case 'Thunder Strike':
        return totalDonations >= 500;
      case 'Flame Bearer':
        return totalDonations >= 1000;
      case 'Diamond Patron':
        return totalDonations >= 5000;
      case 'Constellation':
        return totalDonations >= 10000;
      default:
        return false;
    }
  }

  checkVolunteerBadge(badge, user) {
    const volunteerHours = user.volunteer_hours || 0;
    
    switch (badge.name) {
      case 'Helper':
        return volunteerHours > 0;
      case 'Dedicated Volunteer':
        return volunteerHours >= 25;
      case 'Champion Volunteer':
        return volunteerHours >= 100;
      default:
        return false;
    }
  }

  checkEventBadge(badge, user) {
    const eventsAttended = user.events_attended || 0;
    
    switch (badge.name) {
      case 'Rally Regular':
        return eventsAttended >= 5;
      case 'Town Hall Hero':
        return eventsAttended >= 10;
      case 'Stream Supreme':
        return (user.streams_watched || 0) >= 20;
      case 'Community Builder':
        return (user.referral_count || 0) >= 10;
      default:
        return false;
    }
  }

  checkSpecialBadge(badge, user, action) {
    switch (badge.name) {
      case 'Founder':
        return user.id <= 1000; // First 1000 users
      case 'Bahamas Pride':
        return action === 'independence_day_challenge';
      default:
        return false;
    }
  }

  // Get user's current level info
  getUserLevelInfo(points) {
    return getUserLevel(points);
  }

  // Get progress to next level
  getProgressToNextLevel(points) {
    const currentLevel = getUserLevel(points);
    const nextLevelIndex = this.userLevels.findIndex(l => l.level === currentLevel.level) + 1;
    
    if (nextLevelIndex >= this.userLevels.length) {
      return { isMaxLevel: true, progress: 100 };
    }

    const nextLevel = this.userLevels[nextLevelIndex];
    const progress = ((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100;
    
    return {
      isMaxLevel: false,
      progress: Math.min(progress, 100),
      pointsToNext: nextLevel.minPoints - points,
      nextLevel: nextLevel
    };
  }

  // Get leaderboard position (mock implementation)
  getUserLeaderboardPosition(userId) {
    // This would typically query the backend for real leaderboard data
    return {
      national_rank: Math.floor(Math.random() * 1000) + 1,
      constituency_rank: Math.floor(Math.random() * 100) + 1,
      squad_rank: Math.floor(Math.random() * 10) + 1
    };
  }

  // Calculate celebration animations
  getCelebrationAnimation(result) {
    const animations = [];

    if (result.level_up) {
      animations.push({
        type: 'level_up',
        duration: 3000,
        confetti: true,
        sound: 'level_up'
      });
    }

    if (result.badges_earned.length > 0) {
      result.badges_earned.forEach(badge => {
        animations.push({
          type: 'badge_earned',
          badge: badge,
          duration: 2000,
          animation: badge.animation_type,
          sound: 'badge_earned'
        });
      });
    }

    if (result.points_earned >= 100) {
      animations.push({
        type: 'big_points',
        points: result.points_earned,
        duration: 1500,
        effect: 'fireworks'
      });
    }

    return animations;
  }
}

// Export singleton instance
export const gamificationService = new GamificationService();
export default gamificationService;