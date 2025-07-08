import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Target, Users, TrendingUp } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';
import ActionButton from './shared/ActionButton';
import useAppStore from '@/stores/useAppStore';

const QuickActionsGrid = ({ onNavigate, awardUserPoints, itemVariants }) => {
  const { dashboardStats, getUpcomingLiveEvents } = useAppStore();
  
  const handleQuickAction = (action, route, points = 'DAILY_LOGIN') => {
    awardUserPoints(points); // Award for engagement
    onNavigate(route);
  };

  // Get contextual information for events
  const getEventsInfo = () => {
    const upcomingEvents = getUpcomingLiveEvents();
    const totalEvents = dashboardStats?.totalEvents || 0;
    const upcomingCount = upcomingEvents.length;
    return upcomingCount > 0 
      ? `${upcomingCount} upcoming events`
      : `${totalEvents} events available`;
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