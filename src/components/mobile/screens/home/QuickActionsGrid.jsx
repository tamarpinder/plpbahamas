import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Target } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';
import ActionButton from './shared/ActionButton';

const QuickActionsGrid = ({ onNavigate, awardUserPoints, itemVariants }) => {
  const handleQuickAction = (action, route) => {
    awardUserPoints('DAILY_LOGIN'); // Award for engagement
    onNavigate(route);
  };

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
        gridTemplateColumns: '1fr 1fr',
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
      </div>
    </motion.div>
  );
};

export default QuickActionsGrid;