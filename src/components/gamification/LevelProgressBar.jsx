import React from 'react';
import { motion } from 'framer-motion';
import { PLPColors } from '../../constants/brandColors';

const LevelProgressBar = ({ 
  currentLevel, 
  progress, 
  pointsNeeded, 
  nextLevel, 
  totalPoints,
  showDetails = true 
}) => {
  const getRarityColor = (levelId) => {
    const colors = {
      1: PLPColors.neutral.gray500,
      2: PLPColors.primary.blue,
      3: PLPColors.primary.navy,
      4: PLPColors.primary.gold,
      5: '#FF6B35'
    };
    return colors[levelId] || PLPColors.primary.navy;
  };

  return (
    <div style={{
      background: PLPColors.neutral.white,
      borderRadius: '1rem',
      padding: '1rem',
      border: `1px solid ${PLPColors.getColorWithOpacity(currentLevel.color || PLPColors.primary.navy, 0.2)}`
    }}>
      {/* Level Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            background: `linear-gradient(135deg, ${getRarityColor(currentLevel.id)}, ${PLPColors.getColorWithOpacity(getRarityColor(currentLevel.id), 0.7)})`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            color: PLPColors.neutral.white,
            fontWeight: 'bold',
            boxShadow: `0 4px 12px ${PLPColors.getColorWithOpacity(getRarityColor(currentLevel.id), 0.3)}`
          }}>
            {currentLevel.icon}
          </div>
          <div>
            <div style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              color: PLPColors.primary.navy
            }}>
              Level {currentLevel.id}: {currentLevel.name}
            </div>
            {showDetails && (
              <div style={{
                fontSize: '0.875rem',
                color: PLPColors.neutral.gray600
              }}>
                {totalPoints.toLocaleString()} total points
              </div>
            )}
          </div>
        </div>
        
        {nextLevel && (
          <div style={{
            fontSize: '0.75rem',
            color: PLPColors.neutral.gray500,
            textAlign: 'right'
          }}>
            <div>{pointsNeeded} points to</div>
            <div style={{ fontWeight: '600', color: PLPColors.primary.navy }}>
              {nextLevel.name}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {nextLevel && (
        <div style={{
          background: PLPColors.neutral.gray200,
          borderRadius: '0.5rem',
          height: '0.5rem',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${getRarityColor(currentLevel.id)}, ${PLPColors.primary.gold})`,
              borderRadius: '0.5rem',
              position: 'relative'
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'linear'
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                transform: 'skewX(-45deg)'
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Progress Text */}
      {showDetails && nextLevel && (
        <div style={{
          marginTop: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: PLPColors.neutral.gray600
        }}>
          <span>{Math.round(progress)}% Complete</span>
          <span>{pointsNeeded} points needed</span>
        </div>
      )}
    </div>
  );
};

export default LevelProgressBar;