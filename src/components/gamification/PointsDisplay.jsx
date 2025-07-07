import React from 'react';
import { motion } from 'framer-motion';

const PointsDisplay = ({ points, level, levelName, showAnimation = false, className = '' }) => {
  const getLevelColor = (levelName) => {
    const colors = {
      'Supporter': '#3B82F6',
      'Advocate': '#3B82F6',
      'Champion': '#FFD700',
      'Ambassador': '#FFD700',
      'Guardian': '#C0C0C0',
      'Legend': 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FECA57)'
    };
    return colors[levelName] || '#3B82F6';
  };

  const getLevelIcon = (levelName) => {
    const icons = {
      'Supporter': '🌱',
      'Advocate': '⭐',
      'Champion': '🏆',
      'Ambassador': '👑',
      'Guardian': '🛡️',
      'Legend': '🌟'
    };
    return icons[levelName] || '🌱';
  };

  return (
    <motion.div 
      className={`points-display ${className}`}
      initial={showAnimation ? { scale: 0.8, opacity: 0 } : false}
      animate={showAnimation ? { scale: 1, opacity: 1 } : false}
      transition={{ type: 'spring', duration: 0.5 }}
    >
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-200/20 backdrop-blur-sm">
        <motion.div 
          className="level-icon text-2xl"
          animate={showAnimation ? { rotate: [0, 360] } : false}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {getLevelIcon(levelName)}
        </motion.div>
        
        <div className="flex-1">
          <motion.div 
            className="points-number text-xl font-bold"
            style={{ 
              background: levelName === 'Legend' ? getLevelColor(levelName) : 'transparent',
              backgroundClip: levelName === 'Legend' ? 'text' : 'initial',
              WebkitBackgroundClip: levelName === 'Legend' ? 'text' : 'initial',
              WebkitTextFillColor: levelName === 'Legend' ? 'transparent' : getLevelColor(levelName),
              color: levelName === 'Legend' ? 'transparent' : getLevelColor(levelName)
            }}
            initial={showAnimation ? { y: 20 } : false}
            animate={showAnimation ? { y: 0 } : false}
            transition={{ delay: 0.2 }}
          >
            {points?.toLocaleString() || 0} PLP
          </motion.div>
          
          <motion.div 
            className="level-name text-sm font-medium text-gray-600"
            initial={showAnimation ? { y: 20, opacity: 0 } : false}
            animate={showAnimation ? { y: 0, opacity: 1 } : false}
            transition={{ delay: 0.3 }}
          >
            {levelName} (Level {level})
          </motion.div>
        </div>

        {showAnimation && (
          <motion.div
            className="celebration-sparks"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 0] }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            ✨
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PointsDisplay;