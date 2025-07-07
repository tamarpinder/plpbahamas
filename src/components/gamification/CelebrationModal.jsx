import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import BadgeDisplay from './BadgeDisplay';

const CelebrationModal = ({ 
  isOpen, 
  onClose, 
  celebrationData, 
  className = '' 
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen && celebrationData) {
      setShowConfetti(true);
      
      // Auto-advance through celebration steps
      const timer = setTimeout(() => {
        if (currentStep < getCelebrationSteps().length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          // Auto-close after showing all celebrations
          setTimeout(() => {
            handleClose();
          }, 2000);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, celebrationData, currentStep]);

  const handleClose = () => {
    setShowConfetti(false);
    setCurrentStep(0);
    onClose();
  };

  const getCelebrationSteps = () => {
    if (!celebrationData) return [];
    
    const steps = [];
    
    // Points earned
    if (celebrationData.points_earned > 0) {
      steps.push({
        type: 'points',
        title: 'Points Earned!',
        content: `+${celebrationData.points_earned} PLP Points`,
        icon: '🎯',
        color: 'from-blue-500 to-blue-600'
      });
    }

    // Level up
    if (celebrationData.level_up) {
      steps.push({
        type: 'level_up',
        title: 'Level Up!',
        content: `You're now a ${celebrationData.new_level.name}!`,
        icon: celebrationData.new_level.level <= 2 ? '⭐' : 
              celebrationData.new_level.level <= 4 ? '🏆' : '👑',
        color: 'from-yellow-400 to-orange-500'
      });
    }

    // New badges
    if (celebrationData.badges_earned && celebrationData.badges_earned.length > 0) {
      celebrationData.badges_earned.forEach(badge => {
        steps.push({
          type: 'badge',
          title: 'Badge Unlocked!',
          content: badge.name,
          description: badge.description,
          badge: badge,
          icon: badge.icon,
          color: 'from-purple-500 to-pink-500'
        });
      });
    }

    // Custom celebrations
    if (celebrationData.celebrations && celebrationData.celebrations.length > 0) {
      celebrationData.celebrations.forEach(celebration => {
        steps.push({
          type: 'custom',
          title: 'Achievement!',
          content: celebration,
          icon: '🎉',
          color: 'from-green-500 to-emerald-500'
        });
      });
    }

    return steps;
  };

  const currentCelebration = getCelebrationSteps()[currentStep];

  if (!isOpen || !celebrationData || !currentCelebration) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        {/* Confetti */}
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
          />
        )}

        {/* Celebration Content */}
        <motion.div
          className={`relative bg-white rounded-2xl p-6 max-w-sm w-full mx-4 text-center shadow-2xl ${className}`}
          initial={{ scale: 0.5, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.5, y: 50, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className={`celebration-header p-4 rounded-xl bg-gradient-to-r ${currentCelebration.color} text-white mb-4`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <motion.div
              className="celebration-icon text-4xl mb-2"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              {currentCelebration.icon}
            </motion.div>
            <h2 className="text-xl font-bold">{currentCelebration.title}</h2>
          </motion.div>

          {/* Content */}
          <motion.div
            className="celebration-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {currentCelebration.type === 'badge' ? (
              <div className="badge-celebration">
                <BadgeDisplay 
                  badge={currentCelebration.badge} 
                  size="xlarge" 
                  earned={true}
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {currentCelebration.content}
                </h3>
                {currentCelebration.description && (
                  <p className="text-sm text-gray-600">
                    {currentCelebration.description}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentCelebration.content}
                </h3>
                {currentCelebration.description && (
                  <p className="text-sm text-gray-600">
                    {currentCelebration.description}
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* Progress Indicator */}
          {getCelebrationSteps().length > 1 && (
            <motion.div
              className="progress-dots flex justify-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {getCelebrationSteps().map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </motion.div>
          )}

          {/* Close Button */}
          <motion.button
            className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
            onClick={handleClose}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue
          </motion.button>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-2 -right-2 text-2xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ✨
          </motion.div>

          <motion.div
            className="absolute -bottom-2 -left-2 text-2xl"
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5
            }}
          >
            🎊
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CelebrationModal;