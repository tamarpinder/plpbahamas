import React from 'react';
import { motion } from 'framer-motion';

const BadgeDisplay = ({ badge, size = 'medium', showDetails = false, earned = false, className = '' }) => {
  const getSizeClasses = (size) => {
    const sizes = {
      small: 'w-8 h-8 text-sm',
      medium: 'w-12 h-12 text-base',
      large: 'w-16 h-16 text-lg',
      xlarge: 'w-20 h-20 text-xl'
    };
    return sizes[size] || sizes.medium;
  };

  const getRarityColor = (badge) => {
    const rarityColors = {
      common: 'from-gray-400 to-gray-600',
      uncommon: 'from-green-400 to-green-600', 
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-orange-500',
      mythic: 'from-pink-400 to-red-500',
      exclusive: 'from-indigo-400 to-purple-500'
    };
    return rarityColors[badge.rarity] || rarityColors.common;
  };

  const getAnimationType = (animationType) => {
    const animations = {
      sparkle: { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] },
      pulse: { scale: [1, 1.2, 1] },
      spin: { rotate: 360 },
      glow: { boxShadow: ['0 0 0px rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.5)', '0 0 0px rgba(59, 130, 246, 0)'] },
      bounce: { y: [0, -10, 0] },
      shake: { x: [-2, 2, -2, 2, 0] },
      wave: { rotate: [0, 10, -10, 0] },
      hearts: { scale: [1, 1.3, 1] },
      heartbeat: { scale: [1, 1.1, 1, 1.1, 1] },
      lightning: { scale: [1, 1.2, 0.9, 1.1, 1] },
      fire: { scale: [1, 1.1, 1.05, 1.15, 1] },
      diamond: { rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] },
      constellation: { opacity: [1, 0.5, 1], scale: [1, 1.2, 1] },
      clock: { rotate: [0, 360] },
      trophy: { y: [0, -5, 0], rotate: [0, 5, -5, 0] },
      crown: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] },
      flag: { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] },
      rainbow: { 
        background: [
          'linear-gradient(45deg, #ff0000, #ff7700)',
          'linear-gradient(45deg, #ff7700, #ffdd00)', 
          'linear-gradient(45deg, #ffdd00, #00ff00)',
          'linear-gradient(45deg, #00ff00, #0099ff)',
          'linear-gradient(45deg, #0099ff, #6600ff)',
          'linear-gradient(45deg, #6600ff, #ff0099)',
          'linear-gradient(45deg, #ff0099, #ff0000)'
        ]
      }
    };
    return animations[animationType] || animations.sparkle;
  };

  return (
    <div className={`badge-container ${className}`}>
      <motion.div
        className={`badge-wrapper relative ${getSizeClasses(size)} ${earned ? 'opacity-100' : 'opacity-50 grayscale'}`}
        whileHover={{ scale: 1.1 }}
        animate={earned && badge.animation_type ? getAnimationType(badge.animation_type) : false}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      >
        <div 
          className={`badge-background rounded-full bg-gradient-to-br ${getRarityColor(badge)} p-0.5 shadow-lg`}
        >
          <div className="badge-content bg-white rounded-full w-full h-full flex items-center justify-center text-center font-bold">
            {badge.icon || '🏆'}
          </div>
        </div>

        {/* Earned indicator */}
        {earned && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✓
          </motion.div>
        )}

        {/* Rarity glow effect for epic+ badges */}
        {earned && ['epic', 'legendary', 'mythic', 'exclusive'].includes(badge.rarity) && (
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${getRarityColor(badge)} opacity-30 blur-sm -z-10`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>

      {/* Badge details */}
      {showDetails && (
        <motion.div
          className="badge-details mt-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="badge-name text-sm font-semibold text-gray-800">
            {badge.name}
          </div>
          <div className="badge-description text-xs text-gray-600 mt-1">
            {badge.description}
          </div>
          {badge.points_required > 0 && (
            <div className="badge-points text-xs text-blue-600 mt-1">
              {badge.points_required} points required
            </div>
          )}
          {earned && badge.earned_date && (
            <div className="earned-date text-xs text-green-600 mt-1">
              Earned: {new Date(badge.earned_date).toLocaleDateString()}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default BadgeDisplay;