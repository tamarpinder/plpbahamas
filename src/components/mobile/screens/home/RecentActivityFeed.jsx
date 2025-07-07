import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Heart, Calendar, Award, Users, Play } from 'lucide-react';
import { PLPColors, PLPShadows } from '@/constants/brandColors';

const RecentActivityFeed = ({ 
  userProfile, 
  recentAchievements, 
  itemVariants 
}) => {
  if (!userProfile && (!recentAchievements || recentAchievements.length === 0)) {
    return null;
  }

  // Generate recent activities from user profile and achievements
  const getRecentActivities = () => {
    const activities = [];
    
    // Add recent achievements
    if (recentAchievements && recentAchievements.length > 0) {
      recentAchievements.slice(0, 3).forEach(achievement => {
        activities.push({
          id: achievement.id,
          type: 'achievement',
          icon: Award,
          title: achievement.title,
          description: achievement.description || 'Achievement unlocked!',
          timestamp: achievement.timestamp,
          color: PLPColors.primary.gold,
          points: achievement.points || 0
        });
      });
    }

    // Add mock recent activities based on user profile
    if (userProfile) {
      if (userProfile.actions?.FIRST_DONATION > 0) {
        activities.push({
          id: 'recent_donation',
          type: 'donation',
          icon: Heart,
          title: 'Made a Donation',
          description: 'Contributed to the community fund',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          color: '#EF4444',
          points: 100
        });
      }

      if (userProfile.actions?.EVENT_ATTEND > 0) {
        activities.push({
          id: 'recent_event',
          type: 'event',
          icon: Calendar,
          title: 'Attended Event',
          description: 'Community Town Hall Meeting',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          color: PLPColors.primary.blue,
          points: 50
        });
      }

      if (userProfile.actions?.LIVESTREAM_JOIN > 0) {
        activities.push({
          id: 'recent_stream',
          type: 'livestream',
          icon: Play,
          title: 'Joined Live Stream',
          description: 'PLP Leadership Discussion',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          color: '#DC2626',
          points: 75
        });
      }

      // Add login activity
      activities.push({
        id: 'recent_login',
        type: 'login',
        icon: Users,
        title: 'Joined the Community',
        description: 'Welcome to the PLP movement!',
        timestamp: userProfile.lastActive || new Date().toISOString(),
        color: PLPColors.primary.navy,
        points: 25
      });
    }

    // Sort by timestamp and take latest 4
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 4);
  };

  const activities = getRecentActivities();

  if (activities.length === 0) return null;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} weeks ago`;
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
          <Clock size={22} color={PLPColors.primary.gold} />
          Recent Activity
        </h2>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        boxShadow: PLPShadows.lg,
        border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.15)}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-15%',
          width: '120px',
          height: '120px',
          background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.05),
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 1
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative',
          zIndex: 2
        }}>
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: PLPColors.getColorWithOpacity(activity.color, 0.05),
                  borderRadius: '1rem',
                  border: `1px solid ${PLPColors.getColorWithOpacity(activity.color, 0.1)}`,
                  transition: 'all 0.2s ease'
                }}
                whileHover={{
                  backgroundColor: PLPColors.getColorWithOpacity(activity.color, 0.08),
                  scale: 1.01
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: `linear-gradient(135deg, ${PLPColors.getColorWithOpacity(activity.color, 0.1)} 0%, ${PLPColors.getColorWithOpacity(activity.color, 0.2)} 100%)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={16} color={activity.color} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.25rem'
                  }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: PLPColors.primary.navy,
                      margin: 0
                    }}>
                      {activity.title}
                    </h4>
                    
                    {activity.points > 0 && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.25rem 0.5rem',
                        background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
                        borderRadius: '0.5rem',
                        border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`
                      }}>
                        <Star size={12} color={PLPColors.primary.gold} />
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: PLPColors.primary.navy
                        }}>
                          +{activity.points}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <p style={{
                    fontSize: '0.75rem',
                    color: PLPColors.neutral.gray600,
                    margin: '0 0 0.25rem 0',
                    lineHeight: '1.3'
                  }}>
                    {activity.description}
                  </p>
                  
                  <span style={{
                    fontSize: '0.75rem',
                    color: PLPColors.neutral.gray500,
                    fontWeight: '500'
                  }}>
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginTop: '1rem',
            background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.08),
            border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.15)}`,
            borderRadius: '0.75rem',
            color: PLPColors.primary.navy,
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
            zIndex: 2
          }}
        >
          View All Activity
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RecentActivityFeed;