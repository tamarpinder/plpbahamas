import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Calendar, Heart, Star, Target } from 'lucide-react';
import { PLPColors, PLPShadows } from '@/constants/brandColors';

const PersonalImpactCard = ({ 
  userProfile, 
  dashboardStats, 
  currentLevel,
  itemVariants 
}) => {
  if (!userProfile) return null;

  const impactStats = [
    {
      icon: Star,
      label: 'Total Points',
      value: userProfile.totalPoints?.toLocaleString() || '0',
      color: PLPColors.primary.gold,
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)'
    },
    {
      icon: Heart,
      label: 'Donations',
      value: userProfile.actions?.FIRST_DONATION || 0,
      color: '#EF4444',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
    },
    {
      icon: Calendar,
      label: 'Events',
      value: userProfile.actions?.EVENT_ATTEND || 0,
      color: PLPColors.primary.blue,
      gradient: 'linear-gradient(135deg, #0066CC 0%, #003366 100%)'
    },
    {
      icon: Award,
      label: 'Badges',
      value: userProfile.badges?.length || 0,
      color: PLPColors.primary.navy,
      gradient: 'linear-gradient(135deg, #003366 0%, #001122 100%)'
    }
  ];

  const totalImpactScore = impactStats.reduce((sum, stat) => sum + (parseInt(stat.value) || 0), 0);

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
          <TrendingUp size={22} color={PLPColors.primary.gold} />
          Your Impact
        </h2>
        
        <div style={{
          background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.15),
          borderRadius: '1rem',
          padding: '0.5rem 1rem',
          border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.3)}`
        }}>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: '700',
            color: PLPColors.neutral.white
          }}>
            Level {currentLevel?.id}: {currentLevel?.name}
          </span>
        </div>
      </div>

      {/* Main Impact Card */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        boxShadow: PLPShadows.lg,
        border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '150px',
          height: '150px',
          background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.08),
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 1
        }} />

        {/* Header Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 2
        }}>
          <div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              color: PLPColors.primary.navy,
              marginBottom: '0.25rem'
            }}>
              Community Impact Score
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: PLPColors.neutral.gray600
            }}>
              Your contribution to the movement
            </p>
          </div>
          
          <div style={{
            textAlign: 'right'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: PLPColors.primary.navy,
              lineHeight: '1'
            }}>
              {totalImpactScore}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: PLPColors.primary.gold,
              fontWeight: '600'
            }}>
              Total Actions
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          position: 'relative',
          zIndex: 2
        }}>
          {impactStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: PLPColors.getColorWithOpacity(stat.color, 0.08),
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: `1px solid ${PLPColors.getColorWithOpacity(stat.color, 0.15)}`,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Icon Background */}
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  background: stat.gradient,
                  borderRadius: '50%',
                  margin: '0 auto 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 15px ${PLPColors.getColorWithOpacity(stat.color, 0.3)}`
                }}>
                  <Icon size={20} color={PLPColors.neutral.white} />
                </div>
                
                {/* Value */}
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: PLPColors.primary.navy,
                  marginBottom: '0.25rem',
                  lineHeight: '1'
                }}>
                  {stat.value}
                </div>
                
                {/* Label */}
                <div style={{
                  fontSize: '0.875rem',
                  color: PLPColors.neutral.gray600,
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Insight */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.05),
          borderRadius: '1rem',
          border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`,
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <Target size={16} color={PLPColors.primary.blue} />
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: PLPColors.primary.navy
            }}>
              Next Milestone
            </span>
          </div>
          <p style={{
            fontSize: '0.875rem',
            color: PLPColors.neutral.gray600,
            lineHeight: '1.4',
            margin: 0
          }}>
            {userProfile.totalPoints < 500 
              ? `Earn ${500 - userProfile.totalPoints} more points to reach Activist level!`
              : userProfile.totalPoints < 1000
              ? `You're doing great! ${1000 - userProfile.totalPoints} points to Champion level.`
              : 'Congratulations! You\'re a true PLP Champion making real impact.'
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalImpactCard;