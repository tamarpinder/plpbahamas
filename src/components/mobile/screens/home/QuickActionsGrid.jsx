import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Target, Play } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';
import ActionButton from './shared/ActionButton';
import useAppStore from '@/stores/useAppStore';

const QuickActionsGrid = ({ onNavigate, awardUserPoints, itemVariants }) => {
  const { getLiveEvents, getUpcomingLiveEvents, joinLiveStream } = useAppStore();
  
  const handleQuickAction = (action, route) => {
    awardUserPoints('DAILY_LOGIN'); // Award for engagement
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

  return (
    <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem'
      }}>
        <h2 style={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          color: PLPColors.neutral.white,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Target size={20} color={PLPColors.primary.gold} />
          Quick Actions
        </h2>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: hasLiveContent ? '1fr 1fr 1fr' : '1fr 1fr',
        gap: '0.75rem'
      }}>
        <ActionButton
          icon={Heart}
          label="Donate"
          onClick={() => handleQuickAction('donate', 'donate')}
          backgroundColor={PLPColors.primary.gold}
          textColor={PLPColors.primary.navy}
        />
        
        <ActionButton
          icon={Calendar}
          label="Events"
          onClick={() => handleQuickAction('events', 'events')}
          backgroundColor={PLPColors.primary.blue}
          textColor={PLPColors.neutral.white}
        />
        
        {hasLiveContent && (
          <ActionButton
            icon={Play}
            label={liveEvents.length > 0 ? "Join Live" : "Live Soon"}
            onClick={handleLiveStreamAction}
            backgroundColor={liveEvents.length > 0 ? '#DC2626' : PLPColors.primary.orange}
            textColor={PLPColors.neutral.white}
          />
        )}
      </div>
    </motion.div>
  );
};

export default QuickActionsGrid;