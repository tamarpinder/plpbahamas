import React from 'react';
import { motion } from 'framer-motion';
import { getUserLevel } from '../data/mockBadges.js';

const ImpactDashboard = ({ user }) => {
  if (!user || user.isGuest) return null;

  const levelInfo = getUserLevel(user?.total_points || 0);
  
  const impactStats = [
    {
      value: `$${(user.total_donations || 0).toLocaleString()}`,
      label: 'Donated',
      icon: '💰',
      color: '#059669'
    },
    {
      value: user.volunteer_hours || 0,
      label: 'Vol. Hours',
      icon: '🤝',
      color: '#7C3AED'
    },
    {
      value: user.events_attended || 0,
      label: 'Events',
      icon: '📅',
      color: '#DC2626'
    },
    {
      value: user.consecutive_days || 0,
      label: 'Day Streak',
      icon: '🔥',
      color: '#F59E0B'
    }
  ];

  const progressToNext = levelInfo.level < 6 ? 
    ((user.total_points || 0) % (levelInfo.level === 1 ? 500 : levelInfo.level === 2 ? 1500 : levelInfo.level === 3 ? 3000 : levelInfo.level === 4 ? 5000 : 15000)) / 
    (levelInfo.level === 1 ? 500 : levelInfo.level === 2 ? 1500 : levelInfo.level === 3 ? 3000 : levelInfo.level === 4 ? 5000 : 15000) * 100 : 100;

  return (
    <motion.div 
      className="impact-dashboard"
      style={{
        marginBottom: '1.5rem',
        padding: '1rem',
        background: 'linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 100%)',
        borderRadius: '1rem',
        border: '1px solid #93C5FD'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Level Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '600', 
            margin: '0',
            color: '#1D4ED8'
          }}>
            {levelInfo.name} - Level {user.current_level || 1}
          </h3>
          <p style={{ 
            fontSize: '0.75rem', 
            margin: '0.25rem 0 0 0',
            color: '#6B7280'
          }}>
            {(user.total_points || 0).toLocaleString()} PLP Points
          </p>
        </div>
        <div style={{ fontSize: '2rem' }}>
          {levelInfo.name === 'Legend' ? '👑' : 
           levelInfo.name === 'Guardian' ? '🛡️' :
           levelInfo.name === 'Ambassador' ? '🏆' : 
           levelInfo.name === 'Champion' ? '⭐' : '🌱'}
        </div>
      </div>

      {/* Progress Bar */}
      {levelInfo.level < 6 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            fontSize: '0.75rem', 
            color: '#6B7280', 
            marginBottom: '0.5rem' 
          }}>
            Progress to {levelInfo.level === 1 ? 'Advocate' : 
                        levelInfo.level === 2 ? 'Champion' :
                        levelInfo.level === 3 ? 'Ambassador' :
                        levelInfo.level === 4 ? 'Guardian' : 'Legend'}
          </div>
          <div style={{ 
            width: '100%', 
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            borderRadius: '0.5rem', 
            height: '0.5rem',
            overflow: 'hidden'
          }}>
            <motion.div 
              style={{ 
                backgroundColor: '#3B82F6',
                height: '100%',
                borderRadius: '0.5rem'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* Impact Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '0.75rem' 
      }}>
        {impactStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            style={{
              textAlign: 'center',
              padding: '0.75rem 0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '0.75rem',
              backdropFilter: 'blur(10px)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
              {stat.icon}
            </div>
            <div style={{ 
              fontSize: '1rem', 
              fontWeight: '700',
              color: stat.color,
              marginBottom: '0.125rem'
            }}>
              {stat.value}
            </div>
            <div style={{ 
              fontSize: '0.625rem', 
              color: '#6B7280',
              fontWeight: '500'
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Achievement */}
      {user.badges_unlocked && user.badges_unlocked.length > 0 && (
        <motion.div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div style={{ fontSize: '1.5rem' }}>
            🏆
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1F2937' }}>
              Latest Achievement
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
              {user.badges_unlocked[user.badges_unlocked.length - 1]?.name}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImpactDashboard;