import React from 'react';
import { motion } from 'framer-motion';
import { PLPColors } from '../../../../../constants/brandColors';

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  iconColor = PLPColors.primary.blue,
  borderColor = PLPColors.primary.blue 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '1rem',
        textAlign: 'center',
        border: `1px solid ${PLPColors.getColorWithOpacity(borderColor, 0.2)}`,
        cursor: 'pointer'
      }}
    >
      <div style={{
        width: '2.5rem',
        height: '2.5rem',
        background: PLPColors.getColorWithOpacity(iconColor, 0.1),
        borderRadius: '50%',
        margin: '0 auto 0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={20} color={iconColor} />
      </div>
      <div style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: PLPColors.primary.navy,
        marginBottom: '0.25rem'
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '0.75rem', 
        color: PLPColors.neutral.gray600 
      }}>
        {label}
      </div>
    </motion.div>
  );
};

export default StatCard;