import React from 'react';
import { motion } from 'framer-motion';
import { PLPColors } from '../../constants/brandColors';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...',
  showMessage = true 
}) => {
  const sizeClasses = {
    small: { width: '1.5rem', height: '1.5rem' },
    medium: { width: '2.5rem', height: '2.5rem' },
    large: { width: '4rem', height: '4rem' }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: '200px'
    }}>
      <motion.div
        style={{
          ...sizeClasses[size],
          border: `3px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`,
          borderTop: `3px solid ${PLPColors.primary.gold}`,
          borderRadius: '50%'
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {showMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            marginTop: '1rem',
            color: PLPColors.primary.navy,
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;