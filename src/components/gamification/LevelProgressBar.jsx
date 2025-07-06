import React from 'react';
import { motion } from 'framer-motion';
import gamificationService from '../../services/gamificationService';

const LevelProgressBar = ({ currentPoints, showDetails = true, className = "" }) => {
  const levelInfo = gamificationService.getUserLevelInfo(currentPoints);
  const progressInfo = gamificationService.getProgressToNextLevel(currentPoints);

  const getLevelGradient = (levelName) => {
    const gradients = {
      'Supporter': 'from-blue-400 to-blue-600',
      'Advocate': 'from-blue-400 to-indigo-600', 
      'Champion': 'from-yellow-400 to-orange-500',
      'Ambassador': 'from-yellow-400 to-yellow-600',
      'Guardian': 'from-gray-400 to-gray-600',
      'Legend': 'from-purple-400 via-pink-400 to-red-400'
    };
    return gradients[levelName] || gradients.Supporter;
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
    <div className={`level-progress-container ${className}`}>
      {/* Current Level Display */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getLevelIcon(levelInfo.name)}</span>
          <div>
            <div className="font-bold text-gray-800">{levelInfo.name}</div>
            <div className="text-sm text-gray-600">Level {levelInfo.level}</div>
          </div>
        </div>
        
        {!progressInfo.isMaxLevel && (
          <div className="text-right">
            <div className="text-sm font-medium text-gray-800">
              {progressInfo.pointsToNext} to next level
            </div>
            <div className="text-xs text-gray-600">
              {getLevelIcon(progressInfo.nextLevel.name)} {progressInfo.nextLevel.name}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {!progressInfo.isMaxLevel ? (
        <div className="progress-bar-container">
          <div className="bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getLevelGradient(levelInfo.name)} rounded-full relative`}
              initial={{ width: 0 }}
              animate={{ width: `${progressInfo.progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.div>
          </div>
          
          {showDetails && (
            <div className="flex justify-between text-xs text-gray-600">
              <span>{levelInfo.minPoints} pts</span>
              <span>{Math.round(progressInfo.progress)}%</span>
              <span>{progressInfo.nextLevel.minPoints} pts</span>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          className="max-level-indicator p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-300/30"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Maximum Level Reached!
            </div>
            <div className="text-sm text-gray-600 mt-1">
              You are a true PLP Legend! 🌟
            </div>
          </div>
        </motion.div>
      )}

      {/* Points Display */}
      {showDetails && (
        <motion.div
          className="points-summary text-center mt-3 p-2 bg-blue-50 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-lg font-bold text-blue-600">
            {currentPoints?.toLocaleString() || 0} Total Points
          </div>
          <div className="text-xs text-gray-600">
            Keep engaging to earn more!
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LevelProgressBar;