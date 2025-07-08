// Safe store hooks to prevent crashes from undefined store access
import { useCallback } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import useGamificationStore from '@/stores/useGamificationStore';
import useAppStore from '@/stores/useAppStore';

// Safe wrapper for any function call
const safeCall = (fn, fallback = () => {}) => {
  return (...args) => {
    try {
      if (typeof fn === 'function') {
        return fn(...args);
      }
      console.warn('Function not available:', fn);
      return fallback(...args);
    } catch (error) {
      console.error('Safe call error:', error);
      return fallback(...args);
    }
  };
};

// Safe Auth Store Hook
export const useSafeAuthStore = () => {
  const store = useAuthStore();
  
  return {
    user: store?.user || null,
    isAuthenticated: store?.isAuthenticated || false,
    isLoading: store?.isLoading || false,
    login: safeCall(store?.login, () => ({ success: false, error: 'Store not ready' })),
    logout: safeCall(store?.logout, () => ({ success: false, error: 'Store not ready' })),
    loginAsGuest: safeCall(store?.loginAsGuest, () => ({ success: false, error: 'Store not ready' })),
    updateProfile: safeCall(store?.updateProfile, () => ({ success: false, error: 'Store not ready' }))
  };
};

// Safe Gamification Store Hook
export const useSafeGamificationStore = () => {
  const store = useGamificationStore();
  
  const safeAwardPoints = useCallback((action, multiplier) => {
    try {
      if (store?.awardUserPoints && typeof store.awardUserPoints === 'function') {
        return store.awardUserPoints(action, multiplier);
      }
      console.warn('Award points not available');
      return { success: false, pointsEarned: 0 };
    } catch (error) {
      console.error('Error awarding points:', error);
      return { success: false, pointsEarned: 0 };
    }
  }, [store]);

  return {
    userProfile: store?.userProfile || null,
    activeChallenges: store?.activeChallenges || { daily: [], weekly: [] },
    recentAchievements: store?.recentAchievements || [],
    awardUserPoints: safeAwardPoints,
    initializeGamification: safeCall(store?.initializeGamification),
    generateDailyChallenges: safeCall(store?.generateDailyChallenges),
    checkForNewBadges: safeCall(store?.checkForNewBadges),
    getUserLevel: safeCall(store?.getUserLevel, () => ({ level: 1, name: 'Newcomer' })),
    getLevelProgress: safeCall(store?.getLevelProgress, () => ({ progress: 0, pointsNeeded: 100 })),
    getUserBadges: safeCall(store?.getUserBadges, () => []),
    clearUserData: safeCall(store?.clearUserData)
  };
};

// Safe App Store Hook
export const useSafeAppStore = () => {
  const store = useAppStore();
  
  return {
    dashboardStats: store?.dashboardStats || null,
    news: store?.news || [],
    events: store?.events || [],
    newsLoading: store?.newsLoading || false,
    eventsLoading: store?.eventsLoading || false,
    selectedNewsCategory: store?.selectedNewsCategory || 'ALL',
    selectedEventType: store?.selectedEventType || 'ALL',
    activeSection: store?.activeSection || 'home',
    fetchNews: safeCall(store?.fetchNews),
    fetchEvents: safeCall(store?.fetchEvents),
    fetchDashboardStats: safeCall(store?.fetchDashboardStats),
    setSelectedNewsCategory: safeCall(store?.setSelectedNewsCategory),
    setSelectedEventType: safeCall(store?.setSelectedEventType),
    setActiveSection: safeCall(store?.setActiveSection),
    likeNews: safeCall(store?.likeNews),
    addComment: safeCall(store?.addComment),
    rsvpEvent: safeCall(store?.rsvpEvent),
    getLiveEvents: safeCall(store?.getLiveEvents, () => []),
    getUpcomingLiveEvents: safeCall(store?.getUpcomingLiveEvents, () => []),
    joinLiveStream: safeCall(store?.joinLiveStream),
    clearUserData: safeCall(store?.clearUserData)
  };
};

// Export a combined safe store hook for convenience
export const useSafeStores = () => {
  return {
    auth: useSafeAuthStore(),
    gamification: useSafeGamificationStore(),
    app: useSafeAppStore()
  };
};

export default useSafeStores;