import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { PLPColors } from '../../../../constants/brandColors';

const ChallengeCard = ({ challenge }) => {
  return (
    <div
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
  );
};

const DailyChallenges = ({ activeChallenges, itemVariants }) => {
  if (!activeChallenges.daily || activeChallenges.daily.length === 0) {
    return null;
  }

  return (
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
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </motion.div>
  );
};

export default DailyChallenges;