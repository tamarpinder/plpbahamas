import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';
import StatCard from './shared/StatCard';
import styles from './QuickStatsGrid.module.css';

const QuickStatsGrid = ({ dashboardStats, itemVariants }) => {
  if (!dashboardStats) return null;

  return (
    <motion.div 
      variants={itemVariants}
      className={styles.grid}
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