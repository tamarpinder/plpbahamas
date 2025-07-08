import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useAppStore from '@/stores/useAppStore';
import useAuthStore from '@/stores/useAuthStore';
import useGamificationStore from '@/stores/useGamificationStore';
import { PLPColors } from '@/constants/brandColors';

// Import section components
import HomeHeader from './HomeHeader';
import LiveNowBanner from './LiveNowBanner';
import UpcomingLiveEvents from './UpcomingLiveEvents';
import QuickStatsGrid from './QuickStatsGrid';
import DailyChallenges from './DailyChallenges';
import QuickActionsGrid from './QuickActionsGrid';
import LatestNews from './LatestNews';

const PLPHomeNew = ({ onNavigate }) => {
  const { dashboardStats, news, events, initializeApp, getLiveEvents, getUpcomingLiveEvents, joinLiveStream } = useAppStore();
  const { user } = useAuthStore();
  const { 
    userProfile, 
    initializeGamification, 
    getUserLevel, 
    getLevelProgress,
    activeChallenges,
    awardUserPoints,
    updateLoginStreak
  } = useGamificationStore();

  useEffect(() => {
    initializeApp();
    if (user) {
      initializeGamification(user.id);
      updateLoginStreak();
    }
  }, [user]);

  const currentLevel = getUserLevel();
  const levelProgress = getLevelProgress();
  const liveEvents = getLiveEvents();
  const upcomingLiveEvents = getUpcomingLiveEvents();
  const currentLiveEvent = liveEvents.length > 0 ? liveEvents[0] : null;
  
  const handleJoinStream = async (event) => {
    // Defensive checks
    if (!event || !event.id) {
      console.error('Invalid event data for live stream join');
      return;
    }

    try {
      // Join live stream
      const result = await joinLiveStream(event.id);
      
      if (result && result.success) {
        // Navigate to live stream page (removed points award to prevent crashes)
        onNavigate('livestream');
      } else {
        console.error('Failed to join live stream:', result?.error);
      }
    } catch (error) {
      console.error('Error joining live stream:', error);
      // Could add toast notification here for user feedback
    }
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        height: '100%',
        background: PLPColors.gradients.hero,
        overflow: 'auto'
      }}
    >
      {/* Enhanced Background Elements */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '-5%',
        width: '180px',
        height: '180px',
        background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.08),
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '-10%',
        width: '120px',
        height: '120px',
        background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.06),
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0
      }} />

      {/* Header Section */}
      <HomeHeader
        user={user}
        userProfile={userProfile}
        currentLevel={currentLevel}
        levelProgress={levelProgress}
        onNavigate={onNavigate}
        itemVariants={itemVariants}
      />

      {/* Main Content */}
      <div style={{ padding: '0 1rem 2rem' }}>
        {/* Live Now Banner */}
        {currentLiveEvent && (
          <LiveNowBanner
            liveEvent={currentLiveEvent}
            onJoinStream={handleJoinStream}
            itemVariants={itemVariants}
          />
        )}
        
        {/* Upcoming Live Events */}
        {upcomingLiveEvents.length > 0 && (
          <UpcomingLiveEvents
            upcomingEvents={upcomingLiveEvents}
            onNavigate={onNavigate}
            itemVariants={itemVariants}
          />
        )}
        
        {/* Quick Actions - Priority placement */}
        <QuickActionsGrid
          onNavigate={onNavigate}
          awardUserPoints={awardUserPoints}
          itemVariants={itemVariants}
        />
        
        {/* Quick Stats */}
        <QuickStatsGrid
          dashboardStats={dashboardStats}
          itemVariants={itemVariants}
        />

        {/* Daily Challenges */}
        <DailyChallenges
          activeChallenges={activeChallenges}
          itemVariants={itemVariants}
        />

        {/* Latest News */}
        <LatestNews
          news={news}
          onNavigate={onNavigate}
          awardUserPoints={awardUserPoints}
          itemVariants={itemVariants}
        />
      </div>
    </motion.div>
  );
};

export default PLPHomeNew;