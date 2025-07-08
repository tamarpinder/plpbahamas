import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Star, User, Moon, Sun } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';
import { useTheme } from '@/contexts/ThemeContext';
import LevelProgressBar from '../../../gamification/LevelProgressBar';
// Removed CSS module import as we're using inline styles for better control

const HomeHeader = ({ 
  user, 
  userProfile, 
  currentLevel, 
  levelProgress, 
  onNavigate,
  itemVariants 
}) => {
  const { theme, toggleTheme, isDark } = useTheme();
  
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
        borderBottomLeftRadius: '1.5rem',
        borderBottomRightRadius: '1.5rem',
        marginBottom: '1rem',
        paddingTop: 'env(safe-area-inset-top, 0.5rem)', // Respect iOS safe area
        paddingBottom: '1rem',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
    >
      {/* Header Top Row: Logo + Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        paddingTop: '0.5rem' // Additional spacing from status bar
      }}>
        {/* PLP Blue Logo - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            flexShrink: 0
          }}
        >
          <img 
            src="/assets/logo/PLP LOGO - HAND RAYS BLUE.png" 
            alt="PLP"
            style={{
              height: '32px',
              width: 'auto',
              filter: 'drop-shadow(0 2px 4px rgba(0, 51, 102, 0.2))'
            }}
          />
        </motion.div>

        {/* Action Buttons - Right Side */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem'
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.5rem',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Bell size={16} color={PLPColors.primary.navy} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            style={{
              padding: '0.5rem',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              background: PLPColors.getColorWithOpacity(isDark ? PLPColors.primary.gold : PLPColors.primary.blue, 0.1),
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isDark ? <Sun size={16} color={PLPColors.primary.navy} /> : <Moon size={16} color={PLPColors.primary.navy} />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('profile')}
            style={{
              padding: '0.5rem',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <User size={16} color={PLPColors.primary.navy} />
          </motion.button>
          
          <div style={{
            background: PLPColors.gradients.button,
            padding: '0.375rem 0.625rem',
            borderRadius: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            minWidth: 'fit-content'
          }}>
            <Star size={14} color={PLPColors.primary.navy} />
            <span style={{
              fontWeight: 'bold',
              fontSize: '0.8rem',
              color: PLPColors.primary.navy,
              lineHeight: '1'
            }}>
              {userProfile?.totalPoints?.toLocaleString() || '0'}
            </span>
          </div>
        </div>
      </div>

      {/* Greeting Section */}
      <div style={{
        marginBottom: userProfile ? '1rem' : '0'
      }}>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: PLPColors.primary.navy,
          marginBottom: '0.375rem',
          lineHeight: '1.2',
          margin: 0
        }}>
          {getGreeting()}, {user?.name?.split(' ')[0] || 'Supporter'}!
        </h1>
        <p style={{
          fontSize: '0.9rem',
          color: PLPColors.neutral.gray600,
          lineHeight: '1.4',
          margin: 0
        }}>
          Ready to make a difference today?
        </p>
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