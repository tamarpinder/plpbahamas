import React from 'react';
import { motion } from 'framer-motion';
import { PLPColors } from '@/constants/brandColors';

const ScreenLoader = ({ 
  screenName = '',
  showScreenName = true 
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '400px',
      background: PLPColors.gradients.hero,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '120px',
        height: '120px',
        background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />

      {/* Loading content */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '1.5rem',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Spinner */}
        <motion.div
          style={{
            width: '3rem',
            height: '3rem',
            border: `3px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`,
            borderTop: `3px solid ${PLPColors.primary.gold}`,
            borderRadius: '50%',
            margin: '0 auto 1rem'
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 style={{
            color: PLPColors.primary.navy,
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Loading{showScreenName && screenName ? ` ${screenName}` : ''}...
          </h3>
          
          <p style={{
            color: PLPColors.neutral.gray600,
            fontSize: '0.875rem'
          }}>
            Just a moment while we prepare your content
          </p>
        </motion.div>

        {/* Progress dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1.5rem'
        }}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              style={{
                width: '0.5rem',
                height: '0.5rem',
                background: PLPColors.primary.gold,
                borderRadius: '50%'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScreenLoader;