import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart } from 'lucide-react';
import { PLPColors } from '../../../../constants/brandColors';
import StatCard from './shared/StatCard';

const QuickStatsGrid = ({ dashboardStats, itemVariants }) => {
  if (!dashboardStats) return null;

  return (
    <motion.div 
      variants={itemVariants}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}
    >
      <StatCard
        icon={Users}
        value={dashboardStats.activeMembers.toLocaleString()}
        label="Active Members"
        iconColor={PLPColors.primary.blue}
        borderColor={PLPColors.primary.blue}
      />
      
      <StatCard
        icon={Heart}
        value={`$${dashboardStats.totalDonations.toLocaleString()}`}
        label="Total Raised"
        iconColor={PLPColors.primary.gold}
        borderColor={PLPColors.primary.gold}
      />
    </motion.div>
  );
};

export default QuickStatsGrid;