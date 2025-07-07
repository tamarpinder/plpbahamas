import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Calendar, TrendingUp, ArrowRight, Bell, Star, Trophy, Zap, Target, User } from 'lucide-react';
import useAppStore from '../../../stores/useAppStore';
import useAuthStore from '../../../stores/useAuthStore';
import useGamificationStore from '../../../stores/useGamificationStore';
import LevelProgressBar from '../../gamification/LevelProgressBar';
import { PLPColors } from '../../../constants/brandColors';

const PLPHomeNew = ({ onNavigate }) => {
  const { dashboardStats, news, events, initializeApp } = useAppStore();
  const { user } = useAuthStore();
  const { 
    userProfile, 
    initializeGamification, 
    getUserLevel, 
    getLevelProgress,
    activeChallenges,
    awardUserPoints,
    updateLoginStreak 
  } = useGamificationStore();

  useEffect(() => {
    initializeApp();
    if (user) {
      initializeGamification(user.id);
      updateLoginStreak();
    }
  }, [user]);

  const currentLevel = getUserLevel();
  const levelProgress = getLevelProgress();

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

  const handleQuickAction = (action, route) => {
    awardUserPoints('DAILY_LOGIN'); // Award for engagement
    onNavigate(route);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        height: '100%',
        background: PLPColors.gradients.hero,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '-5%',
        width: '150px',
        height: '150px',
        background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />

      {/* Header Section */}
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

      {/* Main Content */}
      <div style={{ padding: '0 1rem 1rem', height: '100%', overflow: 'auto' }}>
        {/* Quick Stats Cards */}
        {dashboardStats && (
          <motion.div 
            variants={itemVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '1rem',
              textAlign: 'center',
              border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.2)}`
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
                borderRadius: '50%',
                margin: '0 auto 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={20} color={PLPColors.primary.blue} />
              </div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: PLPColors.primary.navy,
                marginBottom: '0.25rem'
              }}>
                {dashboardStats.activeMembers.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
                Active Members
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '1rem',
              textAlign: 'center',
              border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
                borderRadius: '50%',
                margin: '0 auto 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Heart size={20} color={PLPColors.primary.gold} />
              </div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: PLPColors.primary.navy,
                marginBottom: '0.25rem'
              }}>
                ${dashboardStats.totalDonations.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
                Total Raised
              </div>
            </div>
          </motion.div>
        )}

        {/* Daily Challenges */}
        {activeChallenges.daily.length > 0 && (
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
                <Zap size={20} color={PLPColors.primary.gold} />
                Daily Challenges
              </h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {activeChallenges.daily.slice(0, 2).map((challenge, index) => (
                <div
                  key={challenge.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                    border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1rem' }}>{challenge.icon}</span>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: PLPColors.primary.navy
                      }}>
                        {challenge.name}
                      </span>
                    </div>
                    
                    <div style={{
                      padding: '0.25rem 0.5rem',
                      background: challenge.completed ? PLPColors.status.success : PLPColors.primary.gold,
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: PLPColors.neutral.white
                    }}>
                      {challenge.completed ? '✓' : `+${challenge.points}`}
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '0.75rem',
                    color: PLPColors.neutral.gray600,
                    marginBottom: '0.5rem'
                  }}>
                    {challenge.description}
                  </div>
                  
                  {/* Progress bar */}
                  <div style={{
                    background: PLPColors.neutral.gray200,
                    borderRadius: '0.25rem',
                    height: '0.25rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${Math.min((challenge.progress / (challenge.requirements.count || 1)) * 100, 100)}%`,
                      height: '100%',
                      background: challenge.completed ? PLPColors.status.success : PLPColors.primary.gold,
                      borderRadius: '0.25rem',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
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
            <Target size={20} color={PLPColors.primary.gold} />
            Quick Actions
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem'
          }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickAction('NAVIGATION', 'donate')}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                borderRadius: '1rem',
                padding: '1rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <div style={{
                width: '3rem',
                height: '3rem',
                background: PLPColors.getColorWithOpacity('#EF4444', 0.1),
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Heart size={24} color="#EF4444" />
              </div>
              <span style={{
                fontWeight: '600',
                color: PLPColors.primary.navy,
                fontSize: '0.875rem'
              }}>
                Donate
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickAction('NAVIGATION', 'events')}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                borderRadius: '1rem',
                padding: '1rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <div style={{
                width: '3rem',
                height: '3rem',
                background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calendar size={24} color={PLPColors.primary.blue} />
              </div>
              <span style={{
                fontWeight: '600',
                color: PLPColors.primary.navy,
                fontSize: '0.875rem'
              }}>
                Events
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Latest News Preview */}
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
              color: PLPColors.neutral.white
            }}>
              Latest Updates
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('news')}
              style={{
                background: 'none',
                border: 'none',
                color: PLPColors.primary.gold,
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              View All <ArrowRight size={16} />
            </motion.button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {news.slice(0, 2).map((article) => (
              <motion.div
                key={article.id}
                whileHover={{ scale: 1.01 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1rem',
                  padding: '1rem',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  awardUserPoints('NEWS_READ');
                  onNavigate('news');
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <TrendingUp size={20} color={PLPColors.primary.gold} />
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: PLPColors.primary.navy,
                      marginBottom: '0.25rem',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {article.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '0.75rem',
                      color: PLPColors.neutral.gray600,
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {article.summary}
                    </p>
                    
                    <div style={{
                      marginTop: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{
                        fontSize: '0.6875rem',
                        color: PLPColors.neutral.gray500
                      }}>
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                      <ArrowRight size={14} color={PLPColors.neutral.gray400} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PLPHomeNew;