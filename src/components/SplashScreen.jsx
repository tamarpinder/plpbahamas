import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLPColors } from '../constants/brandColors';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Give fade-out animation time to complete before calling onComplete
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const taglineVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: PLPColors.gradients.hero,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Background decorative elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: 1
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '15%',
            width: '150px',
            height: '150px',
            background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: 1
          }} />

          {/* Main content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate={["visible", "pulse"]}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img 
                src="/assets/logo/PLP LOGO - HAND RAYS GOLD.png" 
                alt="PLP Logo"
                style={{
                  height: '80px',
                  width: 'auto',
                  filter: 'drop-shadow(0 4px 20px rgba(255, 215, 0, 0.3))'
                }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              variants={taglineVariants}
              initial="hidden"
              animate="visible"
              style={{
                textAlign: 'center'
              }}
            >
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: PLPColors.neutral.white,
                marginBottom: '0.5rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.5px'
              }}>
                Progressive Liberal Party
              </h2>
              <p style={{
                fontSize: '0.9rem',
                color: PLPColors.getColorWithOpacity(PLPColors.neutral.white, 0.9),
                margin: 0,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.3px'
              }}>
                Believe In The Bahamas
              </p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                marginTop: '1rem'
              }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: PLPColors.primary.gold
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Subtle animated rays */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            background: `conic-gradient(from 0deg, transparent, ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1)}, transparent)`,
            borderRadius: '50%',
            animation: 'rotate 20s linear infinite',
            zIndex: 1
          }} />

          {/* CSS Animation for rotating rays */}
          <style jsx>{`
            @keyframes rotate {
              from { transform: translate(-50%, -50%) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;