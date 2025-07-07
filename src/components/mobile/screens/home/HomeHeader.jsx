import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Star, User } from 'lucide-react';
import { PLPColors } from '../../../../constants/brandColors';
import LevelProgressBar from '../../../gamification/LevelProgressBar';

const HomeHeader = ({ 
  user, 
  userProfile, 
  currentLevel, 
  levelProgress, 
  onNavigate,
  itemVariants 
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.div 
      variants={itemVariants}
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '1rem',
        borderBottomLeftRadius: '1.5rem',
        borderBottomRightRadius: '1.5rem',
        marginBottom: '1rem'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: PLPColors.primary.navy,
            marginBottom: '0.25rem'
          }}>
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Supporter'}!
          </h1>
          <p style={{
            color: PLPColors.neutral.gray600,
            fontSize: '0.875rem'
          }}>
            Ready to make a difference today?
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.75rem',
              background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <Bell size={20} color={PLPColors.primary.navy} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('profile')}
            style={{
              padding: '0.75rem',
              background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <User size={20} color={PLPColors.primary.navy} />
          </motion.button>
          
          <div style={{
            padding: '0.5rem 0.75rem',
            background: PLPColors.gradients.button,
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <Star size={16} color={PLPColors.primary.navy} />
            <span style={{
              fontWeight: 'bold',
              color: PLPColors.primary.navy,
              fontSize: '0.875rem'
            }}>
              {userProfile?.totalPoints || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      {userProfile && (
        <LevelProgressBar
          currentLevel={currentLevel}
          progress={levelProgress.progress}
          pointsNeeded={levelProgress.pointsNeeded}
          nextLevel={levelProgress.nextLevel}
          totalPoints={userProfile.totalPoints}
          showDetails={false}
        />
      )}
    </motion.div>
  );
};

export default HomeHeader;