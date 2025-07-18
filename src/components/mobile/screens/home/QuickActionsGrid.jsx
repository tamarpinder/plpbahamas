import React from 'react';
import { SafeMotionDiv } from '@/components/SafeMotion';
import { Heart, Calendar, Target, Users, TrendingUp } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';
import ActionButton from './shared/ActionButton';
import { useSafeAppStore } from '@/hooks/useSafeStore';

const QuickActionsGrid = ({ onNavigate, awardUserPoints, itemVariants }) => {
  const { dashboardStats, getUpcomingLiveEvents } = useSafeAppStore();
  
  const handleQuickAction = (action, route, points = 'DAILY_LOGIN') => {
    // Safe award points
    if (awardUserPoints && typeof awardUserPoints === 'function') {
      try {
        awardUserPoints(points);
      } catch (error) {
        console.error('Error awarding points:', error);
      }
    }
    
    // Safe navigation
    if (onNavigate && typeof onNavigate === 'function') {
      try {
        onNavigate(route);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  };

  // Get contextual information for events safely
  const getEventsInfo = () => {
    try {
      const upcomingEvents = getUpcomingLiveEvents ? getUpcomingLiveEvents() : [];
      const totalEvents = dashboardStats?.totalEvents || 0;
      const upcomingCount = Array.isArray(upcomingEvents) ? upcomingEvents.length : 0;
      return upcomingCount > 0 
        ? `${upcomingCount} upcoming events`
        : `${totalEvents} events available`;
    } catch (error) {
      console.error('Error getting events info:', error);
      return 'View events';
    }
  };

  return (
    <SafeMotionDiv variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
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
      
      {/* Main Actions Grid - 2x2 Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1rem'
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

      {/* Secondary Actions Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <ActionButton
          icon={Users}
          label="Volunteer"
          subtitle="Join our team"
          onClick={() => handleQuickAction('volunteer', 'volunteer', 'DAILY_LOGIN')}
          backgroundColor={PLPColors.primary.navy}
          textColor={PLPColors.neutral.white}
          pointsReward={75}
        />
        
        <ActionButton
          icon={TrendingUp}
          label="Live Stream"
          subtitle="Watch now"
          onClick={() => handleQuickAction('livestream', 'livestream', 'LIVESTREAM_JOIN')}
          backgroundColor={PLPColors.primary.blue}
          textColor={PLPColors.neutral.white}
          status="live"
          isLive={true}
          pointsReward={25}
        />
      </div>
    </SafeMotionDiv>
  );
};

export default QuickActionsGrid;