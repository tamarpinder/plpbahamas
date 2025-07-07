import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Target, Play, Users, TrendingUp } from 'lucide-react';
import { PLPColors, PLPShadows } from '@/constants/brandColors';
import ActionButton from './shared/ActionButton';
import useAppStore from '@/stores/useAppStore';

const QuickActionsGrid = ({ onNavigate, awardUserPoints, itemVariants }) => {
  const { getLiveEvents, getUpcomingLiveEvents, joinLiveStream, dashboardStats } = useAppStore();
  
  const handleQuickAction = (action, route, points = 'DAILY_LOGIN') => {
    awardUserPoints(points); // Award for engagement
    onNavigate(route);
  };
  
  const handleLiveStreamAction = async () => {
    const liveEvents = getLiveEvents();
    const upcomingEvents = getUpcomingLiveEvents();
    
    if (liveEvents.length > 0) {
      // Join active live stream
      await joinLiveStream(liveEvents[0].id);
      awardUserPoints('LIVESTREAM_JOIN');
      console.log('Joining live stream:', liveEvents[0].title);
    } else if (upcomingEvents.length > 0) {
      // Navigate to upcoming live events
      onNavigate('events');
    } else {
      // Navigate to general events
      onNavigate('events');
    }
  };
  
  const liveEvents = getLiveEvents();
  const upcomingEvents = getUpcomingLiveEvents();
  const hasLiveContent = liveEvents.length > 0 || upcomingEvents.length > 0;

  // Get contextual information for each action
  const getEventsInfo = () => {
    const totalEvents = dashboardStats?.totalEvents || 0;
    const upcomingCount = upcomingEvents.length;
    return upcomingCount > 0 
      ? `${upcomingCount} upcoming events`
      : `${totalEvents} events available`;
  };

  const getLiveStreamInfo = () => {
    if (liveEvents.length > 0) {
      return `${liveEvents[0].participants || 0} watching`;
    }
    if (upcomingEvents.length > 0) {
      const nextEvent = upcomingEvents[0];
      const timeUntil = new Date(nextEvent.date_time) - new Date();
      const hoursUntil = Math.ceil(timeUntil / (1000 * 60 * 60));
      return `Starting in ${hoursUntil}h`;
    }
    return 'No upcoming streams';
  };

  return (
    <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: PLPColors.neutral.white,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Target size={22} color={PLPColors.primary.gold} />
          Quick Actions
        </h2>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: hasLiveContent ? '1fr 1fr' : '1fr 1fr',
        gap: '1rem',
        marginBottom: hasLiveContent ? '1rem' : '0'
      }}>
        <ActionButton
          icon={Heart}
          label="Support PLP"
          subtitle="Make a donation"
          onClick={() => handleQuickAction('donate', 'donate', 'FIRST_DONATION')}
          backgroundColor={PLPColors.primary.gold}
          textColor={PLPColors.primary.navy}
          pointsReward={100}
          status={dashboardStats?.totalDonations < 5 ? 'new' : null}
        />
        
        <ActionButton
          icon={Calendar}
          label="Events"
          subtitle={getEventsInfo()}
          onClick={() => handleQuickAction('events', 'events', 'EVENT_ATTEND')}
          backgroundColor={PLPColors.primary.blue}
          textColor={PLPColors.neutral.white}
          pointsReward={50}
        />
      </div>

      {/* Live Streaming Section - Full Width */}
      {hasLiveContent && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1rem'
        }}>
          <ActionButton
            icon={Play}
            label={liveEvents.length > 0 ? "Join Live Stream" : "Upcoming Live Event"}
            subtitle={getLiveStreamInfo()}
            onClick={handleLiveStreamAction}
            backgroundColor={liveEvents.length > 0 ? '#DC2626' : PLPColors.primary.orange}
            textColor={PLPColors.neutral.white}
            pointsReward={liveEvents.length > 0 ? 75 : 25}
            status={liveEvents.length > 0 ? 'live' : 'soon'}
            isLive={liveEvents.length > 0}
          />
        </div>
      )}

      {/* Secondary Actions Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        <ActionButton
          icon={Users}
          label="Community"
          subtitle="Connect with members"
          onClick={() => handleQuickAction('community', 'profile')}
          backgroundColor={PLPColors.getColorWithOpacity(PLPColors.primary.navy, 0.9)}
          textColor={PLPColors.neutral.white}
          pointsReward={25}
        />
        
        <ActionButton
          icon={TrendingUp}
          label="Impact"
          subtitle="View your progress"
          onClick={() => handleQuickAction('impact', 'profile')}
          backgroundColor={PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.9)}
          textColor={PLPColors.neutral.white}
          pointsReward={10}
        />
      </div>
    </motion.div>
  );
};

export default QuickActionsGrid;