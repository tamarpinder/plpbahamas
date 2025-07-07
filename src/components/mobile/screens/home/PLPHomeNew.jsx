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
    await joinLiveStream(event.id);
    awardUserPoints('LIVESTREAM_JOIN');
    // In a real app, this would navigate to the live stream player
    console.log('Joining live stream:', event.title);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        minHeight: '100vh',
        background: PLPColors.gradients.hero,
        position: 'relative'
      }}
    >
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '-5%',
        width: '150px',
        height: '150px',
        background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
        borderRadius: '50%',
        filter: 'blur(40px)',
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
        <LiveNowBanner
          liveEvent={currentLiveEvent}
          onJoinStream={handleJoinStream}
          itemVariants={itemVariants}
        />
        
        {/* Upcoming Live Events */}
        <UpcomingLiveEvents
          upcomingEvents={upcomingLiveEvents}
          onNavigate={onNavigate}
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

        {/* Quick Actions */}
        <QuickActionsGrid
          onNavigate={onNavigate}
          awardUserPoints={awardUserPoints}
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