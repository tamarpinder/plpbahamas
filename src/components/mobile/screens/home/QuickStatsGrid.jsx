import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, BarChart3 } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';
import StatCard from './shared/StatCard';

const QuickStatsGrid = ({ dashboardStats, itemVariants }) => {
  if (!dashboardStats) return null;

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
          <BarChart3 size={22} color={PLPColors.primary.gold} />
          Community Stats
        </h2>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
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
      </div>
    </motion.div>
  );
};

export default QuickStatsGrid;