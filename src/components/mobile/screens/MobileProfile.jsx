import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  LogOut, 
  Settings, 
  Heart, 
  Calendar, 
  Award, 
  Bell, 
  Star,
  Trophy,
  Crown,
  Edit3,
  Shield,
  ChevronRight,
  Camera,
  MapPin,
  Phone,
  Mail,
  Zap
} from 'lucide-react';
import useAuthStore from '../../../stores/useAuthStore';
import useGamificationStore from '../../../stores/useGamificationStore';
import useAppStore from '../../../stores/useAppStore';
import LevelProgressBar from '../../gamification/LevelProgressBar';
import ScreenErrorBoundary from '../../shared/ScreenErrorBoundary';
import PersonalImpactCard from './home/PersonalImpactCard';
import RecentActivityFeed from './home/RecentActivityFeed';
import { PLPColors } from '../../../constants/brandColors';
import { toast } from 'sonner';
import ConfirmationModal from '../../ui/ConfirmationModal';

const MobileProfileContent = () => {
  const { user, logout, isLoading } = useAuthStore();
  const { dashboardStats } = useAppStore();
  const { 
    userProfile, 
    getUserLevel, 
    getLevelProgress, 
    getUserBadges,
    recentAchievements 
  } = useGamificationStore();
  
  const [editMode, setEditMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Early return if user is null (during logout process)
  if (!user || isLoading) {
    return (
      <motion.div
        style={{
          height: '100%',
          background: PLPColors.gradients.hero,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ textAlign: 'center', color: PLPColors.neutral.white }}>
          <div style={{ 
            width: '3rem', 
            height: '3rem', 
            border: `3px solid ${PLPColors.neutral.white}`,
            borderTop: `3px solid transparent`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p>Loading profile...</p>
        </div>
      </motion.div>
    );
  }
  
  // Safe data access with fallbacks
  const currentLevel = getUserLevel() || { id: 1, name: 'Supporter', icon: '🤝', color: '#6B7280' };
  const levelProgress = getLevelProgress() || { progress: 0, pointsNeeded: 0, nextLevel: null };
  const userBadges = getUserBadges() || [];
  const safeUserProfile = userProfile || { totalPoints: 0, actions: {} };
  const safeRecentAchievements = recentAchievements || [];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (result && result.success) {
        toast.success('Successfully logged out', {
          icon: '👋',
          duration: 2000
        });
        setShowLogoutModal(false);
      } else {
        throw new Error(result?.error || 'Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(`Logout failed: ${error.message}`, {
        icon: '❌',
        duration: 3000
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const profileStats = [
    { 
      icon: Star, 
      label: 'Total Points', 
      value: safeUserProfile.totalPoints?.toLocaleString() || '0',
      color: PLPColors.primary.gold,
      background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1)
    },
    { 
      icon: Calendar, 
      label: 'Events Attended', 
      value: safeUserProfile.actions?.EVENT_ATTEND || 0,
      color: PLPColors.primary.blue,
      background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)
    },
    { 
      icon: Heart, 
      label: 'Donations Made', 
      value: safeUserProfile.actions?.FIRST_DONATION || 0,
      color: '#EF4444',
      background: PLPColors.getColorWithOpacity('#EF4444', 0.1)
    },
    { 
      icon: Award, 
      label: 'Badges Earned', 
      value: userBadges.length || 0,
      color: PLPColors.primary.navy,
      background: PLPColors.getColorWithOpacity(PLPColors.primary.navy, 0.1)
    }
  ];

  const menuItems = [
    { icon: Edit3, label: 'Edit Profile', action: () => setEditMode(!editMode) },
    { icon: Bell, label: 'Notifications', action: () => {}, badge: '3' },
    { icon: Settings, label: 'Account Settings', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', action: () => {} },
    { icon: LogOut, label: 'Sign Out', action: handleLogoutClick, danger: true }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        height: '100%',
        background: PLPColors.gradients.hero,
        overflow: 'auto'
      }}
    >
      {/* Profile Header */}
      <motion.div 
        variants={itemVariants}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '2rem 1rem 1.5rem',
          borderBottomLeftRadius: '2rem',
          borderBottomRightRadius: '2rem',
          marginBottom: '1rem',
          position: 'relative'
        }}
      >
        {/* PLP Gold Logo - Premium Profile Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10
          }}
        >
          <img 
            src="/assets/logo/PLP LOGO - HAND RAYS GOLD.png" 
            alt="PLP Premium"
            style={{
              height: '28px',
              width: 'auto',
              filter: 'drop-shadow(0 2px 8px rgba(255, 215, 0, 0.3))'
            }}
            onError={(e) => {
              console.warn('Gold logo failed to load in profile');
              e.target.style.display = 'none';
            }}
          />
        </motion.div>
        
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '120px',
          height: '120px',
          background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
          borderRadius: '50%',
          filter: 'blur(40px)',
        }} />
        
        <div style={{ textAlign: 'center', position: 'relative' }}>
          {/* Profile Picture */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              background: PLPColors.gradients.button,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: `0 8px 25px ${PLPColors.getColorWithOpacity(PLPColors.primary.navy, 0.2)}`
            }}>
              <User size={32} color={PLPColors.primary.navy} />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '1.5rem',
                height: '1.5rem',
                background: PLPColors.primary.gold,
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              <Camera size={12} color={PLPColors.neutral.white} />
            </motion.button>
          </div>
          
          {/* User Info */}
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: PLPColors.primary.navy,
            marginBottom: '0.25rem'
          }}>
            {user?.name || 'PLP Supporter'}
          </h1>
          
          <p style={{
            color: PLPColors.neutral.gray600,
            fontSize: '0.875rem',
            marginBottom: '0.5rem'
          }}>
            {user?.email || 'supporter@plp.bs'}
          </p>
          
          {/* Level Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: PLPColors.getColorWithOpacity(currentLevel?.color || PLPColors.primary.navy, 0.1),
            borderRadius: '1rem',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1rem' }}>{currentLevel?.icon}</span>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: PLPColors.primary.navy
            }}>
              Level {currentLevel?.id}: {currentLevel?.name}
            </span>
          </div>
          
          {/* Quick Info */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            fontSize: '0.75rem',
            color: PLPColors.neutral.gray500
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={12} />
              <span>Nassau, Bahamas</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={12} />
              <span>Joined {user?.memberSince ? new Date(user.memberSince).getFullYear() : '2024'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ padding: '0 1rem 5rem' }}>
        {/* Level Progress */}
        <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
          <LevelProgressBar
            currentLevel={currentLevel}
            progress={levelProgress.progress}
            pointsNeeded={levelProgress.pointsNeeded}
            nextLevel={levelProgress.nextLevel}
            totalPoints={safeUserProfile.totalPoints}
            showDetails={true}
          />
        </motion.div>

        {/* Personal Impact Card */}
        {userProfile && (
          <PersonalImpactCard
            userProfile={userProfile}
            dashboardStats={dashboardStats}
            currentLevel={currentLevel}
            itemVariants={itemVariants}
          />
        )}

        {/* Recent Activity Feed */}
        <RecentActivityFeed
          userProfile={userProfile}
          recentAchievements={recentAchievements}
          itemVariants={itemVariants}
        />

        {/* Profile Stats */}
        <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
          <h2 style={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: PLPColors.neutral.white,
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Trophy size={20} color={PLPColors.primary.gold} />
            Your Impact
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem'
          }}>
            {profileStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    textAlign: 'center',
                    border: `1px solid ${PLPColors.getColorWithOpacity(stat.color, 0.2)}`
                  }}
                >
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    background: stat.background,
                    borderRadius: '50%',
                    margin: '0 auto 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} color={stat.color} />
                  </div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: PLPColors.primary.navy,
                    marginBottom: '0.25rem'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Achievements */}
        {userBadges.length > 0 && (
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: PLPColors.neutral.white,
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Award size={20} color={PLPColors.primary.gold} />
              Achievements ({userBadges.length})
            </h2>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '1rem'
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {userBadges.slice(0, 6).map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`
                    }}
                  >
                    <span style={{ fontSize: '0.875rem' }}>{badge.icon}</span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: PLPColors.primary.navy
                    }}>
                      {badge.name}
                    </span>
                  </motion.div>
                ))}
                
                {userBadges.length > 6 && (
                  <div style={{
                    padding: '0.5rem 0.75rem',
                    background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
                    borderRadius: '0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: PLPColors.primary.navy
                  }}>
                    +{userBadges.length - 6} more
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Activity */}
        {safeRecentAchievements.length > 0 && (
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: PLPColors.neutral.white,
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Zap size={20} color={PLPColors.primary.gold} />
              Recent Activity
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {safeRecentAchievements.slice(0, 3).map((achievement, index) => (
                <div
                  key={achievement.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem'
                  }}>
                    {achievement.icon}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: PLPColors.primary.navy,
                      marginBottom: '0.125rem'
                    }}>
                      {achievement.title}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: PLPColors.neutral.gray600
                    }}>
                      {new Date(achievement.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Menu Items */}
        <motion.div variants={itemVariants}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            overflow: 'hidden'
          }}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={index}
                  whileHover={{ backgroundColor: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.05) }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    borderBottom: index !== menuItems.length - 1 
                      ? `1px solid ${PLPColors.getColorWithOpacity(PLPColors.neutral.gray200, 0.5)}` 
                      : 'none',
                    color: item.danger ? PLPColors.status.error : PLPColors.primary.navy
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={20} />
                    <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{item.label}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.badge && (
                      <div style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        background: PLPColors.status.error,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: PLPColors.neutral.white
                      }}>
                        {item.badge}
                      </div>
                    )}
                    {!item.danger && <ChevronRight size={16} color={PLPColors.neutral.gray400} />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out? You'll need to log in again to access your account."
        confirmText="Sign Out"
        cancelText="Cancel"
        variant="danger"
        icon={LogOut}
        isLoading={isLoggingOut}
      />
    </motion.div>
  );
};

const MobileProfile = () => (
  <ScreenErrorBoundary screenName="Profile">
    <MobileProfileContent />
  </ScreenErrorBoundary>
);

export default MobileProfile;