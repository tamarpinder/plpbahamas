import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Star, User } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';
import LevelProgressBar from '../../../gamification/LevelProgressBar';
import styles from './HomeHeader.module.css';

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
      className={styles.header}
    >
      <div className={styles.topRow}>
        <div>
          <h1 
            className={styles.greeting}
            style={{ color: PLPColors.primary.navy }}
          >
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Supporter'}!
          </h1>
          <p 
            className={styles.subtitle}
            style={{ color: PLPColors.neutral.gray600 }}
          >
            Ready to make a difference today?
          </p>
        </div>
        
        <div className={styles.actions}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.actionButton}
            style={{
              background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1)
            }}
          >
            <Bell size={20} color={PLPColors.primary.navy} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('profile')}
            className={styles.actionButton}
            style={{
              background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)
            }}
          >
            <User size={20} color={PLPColors.primary.navy} />
          </motion.button>
          
          <div 
            className={styles.pointsDisplay}
            style={{ background: PLPColors.gradients.button }}
          >
            <Star size={16} color={PLPColors.primary.navy} />
            <span 
              className={styles.pointsText}
              style={{ color: PLPColors.primary.navy }}
            >
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