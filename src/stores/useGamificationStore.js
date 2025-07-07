import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  ENGAGEMENT_ACTIONS, 
  USER_LEVELS, 
  ACHIEVEMENT_BADGES,
  DAILY_CHALLENGES,
  WEEKLY_CHALLENGES,
  calculateLevel,
  getProgressToNextLevel,
  checkBadgeEligibility,
  awardPoints,
  createUserGamificationProfile
} from '../data/gamificationSystem';
import { toast } from 'sonner';

const useGamificationStore = create(
  persist(
    (set, get) => ({
      // User gamification profile
      userProfile: null,
      
      // Current challenges
      activeChallenges: {
        daily: [],
        weekly: []
      },
      
      // Recent achievements
      recentAchievements: [],
      
      // Leaderboards
      leaderboards: {
        national: [],
        constituency: [],
        weekly: []
      },
      
      // Actions
      initializeGamification: (userId) => {
        const existingProfile = get().userProfile;
        if (!existingProfile || existingProfile.userId !== userId) {
          const newProfile = createUserGamificationProfile(userId);
          // Award welcome bonus
          newProfile.totalPoints = awardPoints('FIRST_LOGIN');
          newProfile.actions.FIRST_LOGIN = 1;
          
          set({ userProfile: newProfile });
          get().generateDailyChallenges();
          get().generateWeeklyChallenges();
        }
      },
      
      // Award points for user actions
      awardUserPoints: (action, multiplier = 1, metadata = {}) => {
        const profile = get().userProfile;
        if (!profile) return;
        
        const pointsEarned = awardPoints(action, multiplier);
        const oldLevel = calculateLevel(profile.totalPoints);
        
        // Update profile
        const updatedProfile = {
          ...profile,
          totalPoints: profile.totalPoints + pointsEarned,
          actions: {
            ...profile.actions,
            [action]: (profile.actions[action] || 0) + 1
          },
          lastActive: new Date().toISOString()
        };
        
        const newLevel = calculateLevel(updatedProfile.totalPoints);
        
        // Check for level up
        if (newLevel.id > oldLevel.id) {
          get().handleLevelUp(oldLevel, newLevel);
        }
        
        // Check for new badges
        get().checkForNewBadges(updatedProfile);
        
        // Update challenge progress
        get().updateChallengeProgress(action);
        
        set({ userProfile: updatedProfile });
        
        // Show points notification
        if (pointsEarned > 0) {
          toast.success(`+${pointsEarned} points earned!`, {
            icon: '⭐',
            duration: 2000
          });
        }
        
        return pointsEarned;
      },
      
      // Handle level up
      handleLevelUp: (oldLevel, newLevel) => {
        toast.success(`Level Up! You're now a ${newLevel.name}!`, {
          icon: newLevel.icon,
          duration: 4000,
          description: newLevel.description
        });
        
        // Add to recent achievements
        const achievement = {
          id: `level_${newLevel.id}`,
          type: 'level_up',
          title: `Level ${newLevel.id}: ${newLevel.name}`,
          description: newLevel.description,
          icon: newLevel.icon,
          timestamp: new Date().toISOString(),
          points: 0
        };
        
        set(state => ({
          recentAchievements: [achievement, ...state.recentAchievements.slice(0, 9)]
        }));
      },
      
      // Check for new badges
      checkForNewBadges: (profile) => {
        const currentBadges = profile.badges || [];
        
        ACHIEVEMENT_BADGES.forEach(badge => {
          const alreadyHas = currentBadges.some(b => b.id === badge.id);
          if (!alreadyHas && checkBadgeEligibility(profile, badge)) {
            get().awardBadge(badge);
          }
        });
      },
      
      // Award a badge
      awardBadge: (badge) => {
        const profile = get().userProfile;
        if (!profile) return;
        
        const updatedProfile = {
          ...profile,
          badges: [...(profile.badges || []), {
            ...badge,
            earnedDate: new Date().toISOString()
          }]
        };
        
        set({ userProfile: updatedProfile });
        
        // Show badge notification
        toast.success(`New Badge Earned: ${badge.name}!`, {
          icon: badge.icon,
          duration: 4000,
          description: badge.description
        });
        
        // Add to recent achievements
        const achievement = {
          id: badge.id,
          type: 'badge',
          title: badge.name,
          description: badge.description,
          icon: badge.icon,
          timestamp: new Date().toISOString(),
          rarity: badge.rarity
        };
        
        set(state => ({
          recentAchievements: [achievement, ...state.recentAchievements.slice(0, 9)]
        }));
      },
      
      // Generate daily challenges
      generateDailyChallenges: () => {
        // Reset daily challenges
        const today = new Date().toDateString();
        const profile = get().userProfile;
        if (!profile) return;
        
        // Check if we need new daily challenges
        const lastGenerated = profile.challenges?.dailyGenerated;
        if (lastGenerated === today) return;
        
        // Select 2-3 random daily challenges
        const shuffled = [...DAILY_CHALLENGES].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3).map(challenge => ({
          ...challenge,
          progress: 0,
          completed: false,
          date: today
        }));
        
        set(state => ({
          activeChallenges: {
            ...state.activeChallenges,
            daily: selected
          },
          userProfile: {
            ...state.userProfile,
            challenges: {
              ...state.userProfile.challenges,
              dailyGenerated: today
            }
          }
        }));
      },
      
      // Generate weekly challenges
      generateWeeklyChallenges: () => {
        // Similar to daily but for week
        const profile = get().userProfile;
        if (!profile) return;
        
        const thisWeek = getWeekString(new Date());
        const lastGenerated = profile.challenges?.weeklyGenerated;
        if (lastGenerated === thisWeek) return;
        
        const selected = [...WEEKLY_CHALLENGES].map(challenge => ({
          ...challenge,
          progress: 0,
          completed: false,
          week: thisWeek
        }));
        
        set(state => ({
          activeChallenges: {
            ...state.activeChallenges,
            weekly: selected
          },
          userProfile: {
            ...state.userProfile,
            challenges: {
              ...state.userProfile.challenges,
              weeklyGenerated: thisWeek
            }
          }
        }));
      },
      
      // Update challenge progress
      updateChallengeProgress: (action) => {
        const challenges = get().activeChallenges;
        let challengesUpdated = false;
        
        // Update daily challenges
        const updatedDaily = challenges.daily.map(challenge => {
          if (challenge.completed) return challenge;
          
          let newProgress = challenge.progress;
          
          if (challenge.requirements.action === action) {
            newProgress++;
          }
          
          const isCompleted = newProgress >= challenge.requirements.count;
          
          if (isCompleted && !challenge.completed) {
            challengesUpdated = true;
            get().completeDailyChallenge(challenge);
          }
          
          return { ...challenge, progress: newProgress, completed: isCompleted };
        });
        
        // Update weekly challenges (similar logic)
        const updatedWeekly = challenges.weekly.map(challenge => {
          if (challenge.completed) return challenge;
          
          let shouldProgress = false;
          
          if (challenge.requirements.action === action) {
            shouldProgress = true;
          } else if (challenge.requirements.actions) {
            shouldProgress = challenge.requirements.actions.some(req => req.action === action);
          }
          
          let newProgress = challenge.progress;
          if (shouldProgress) {
            newProgress++;
          }
          
          const targetCount = challenge.requirements.count || 
            challenge.requirements.actions?.reduce((sum, req) => sum + req.count, 0) || 1;
          
          const isCompleted = newProgress >= targetCount;
          
          if (isCompleted && !challenge.completed) {
            challengesUpdated = true;
            get().completeWeeklyChallenge(challenge);
          }
          
          return { ...challenge, progress: newProgress, completed: isCompleted };
        });
        
        if (challengesUpdated) {
          set({
            activeChallenges: {
              daily: updatedDaily,
              weekly: updatedWeekly
            }
          });
        }
      },
      
      // Complete daily challenge
      completeDailyChallenge: (challenge) => {
        const profile = get().userProfile;
        if (!profile) return;
        
        const updatedProfile = {
          ...profile,
          totalPoints: profile.totalPoints + challenge.points
        };
        
        set({ userProfile: updatedProfile });
        
        toast.success(`Challenge Complete: ${challenge.name}!`, {
          icon: challenge.icon,
          duration: 3000,
          description: `+${challenge.points} points earned!`
        });
      },
      
      // Complete weekly challenge
      completeWeeklyChallenge: (challenge) => {
        // Similar to daily challenge completion
        get().completeDailyChallenge(challenge); // Reuse logic
      },
      
      // Update daily login streak
      updateLoginStreak: () => {
        const profile = get().userProfile;
        if (!profile) return;
        
        const today = new Date().toDateString();
        const lastLogin = profile.streaks?.lastLoginDate;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        let newStreak = 1;
        
        if (lastLogin) {
          const lastLoginDate = new Date(lastLogin).toDateString();
          if (lastLoginDate === today) {
            return; // Already logged in today
          } else if (lastLoginDate === yesterday.toDateString()) {
            newStreak = (profile.streaks?.daily_login || 0) + 1;
          }
        }
        
        const updatedProfile = {
          ...profile,
          streaks: {
            ...profile.streaks,
            daily_login: newStreak,
            lastLoginDate: today
          }
        };
        
        set({ userProfile: updatedProfile });
        
        // Award daily login points
        get().awardUserPoints('DAILY_LOGIN');
        
        // Check for streak achievements
        if (newStreak === 7) {
          get().awardBadge(ACHIEVEMENT_BADGES.find(b => b.id === 'daily_warrior'));
        }
      },
      
      // Get user level info
      getUserLevel: () => {
        const profile = get().userProfile;
        if (!profile) return USER_LEVELS[0];
        
        return calculateLevel(profile.totalPoints);
      },
      
      // Get progress to next level
      getLevelProgress: () => {
        const profile = get().userProfile;
        if (!profile) return { progress: 0, pointsNeeded: 100, nextLevel: USER_LEVELS[1] };
        
        return getProgressToNextLevel(profile.totalPoints);
      },
      
      // Get user badges
      getUserBadges: () => {
        const profile = get().userProfile;
        return profile?.badges || [];
      },
      
      // Clear recent achievements
      clearRecentAchievements: () => {
        set({ recentAchievements: [] });
      }
    }),
    {
      name: 'gamification-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userProfile: state.userProfile,
        activeChallenges: state.activeChallenges,
        recentAchievements: state.recentAchievements
      })
    }
  )
);

// Helper function to get week string
const getWeekString = (date) => {
  const year = date.getFullYear();
  const week = getWeekNumber(date);
  return `${year}-W${week}`;
};

const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

export default useGamificationStore;