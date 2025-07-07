import React from 'react';
import { motion } from 'framer-motion';
import { PLPColors, PLPShadows } from '@/constants/brandColors';

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  iconColor = PLPColors.primary.blue,
  borderColor = PLPColors.primary.blue 
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -2,
        boxShadow: PLPShadows.lg
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '1.25rem',
        padding: '1.5rem',
        textAlign: 'center',
        border: `1px solid ${PLPColors.getColorWithOpacity(borderColor, 0.2)}`,
        boxShadow: PLPShadows.md,
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '80px',
        height: '80px',
        background: PLPColors.getColorWithOpacity(iconColor, 0.06),
        borderRadius: '50%',
        filter: 'blur(30px)',
        zIndex: 1
      }} />
      
      {/* Icon Container */}
      <div style={{
        width: '3.5rem',
        height: '3.5rem',
        background: `linear-gradient(135deg, ${PLPColors.getColorWithOpacity(iconColor, 0.1)} 0%, ${PLPColors.getColorWithOpacity(iconColor, 0.2)} 100%)`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1rem',
        border: `2px solid ${PLPColors.getColorWithOpacity(iconColor, 0.2)}`,
        position: 'relative',
        zIndex: 2
      }}>
        <Icon size={24} color={iconColor} />
      </div>
      
      {/* Value */}
      <div style={{
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: PLPColors.primary.navy,
        marginBottom: '0.5rem',
        lineHeight: '1',
        position: 'relative',
        zIndex: 2
      }}>
        {value}
      </div>
      
      {/* Label */}
      <div style={{
        fontSize: '0.875rem',
        color: PLPColors.neutral.gray600,
        fontWeight: '500',
        position: 'relative',
        zIndex: 2
      }}>
        {label}
      </div>
    </motion.div>
  );
};

export default StatCard;