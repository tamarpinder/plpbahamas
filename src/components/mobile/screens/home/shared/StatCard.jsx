import React from 'react';
import { motion } from 'framer-motion';
import { PLPColors } from '@/constants/brandColors';
import styles from './StatCard.module.css';

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
      className={styles.card}
      style={{
        border: `1px solid ${PLPColors.getColorWithOpacity(borderColor, 0.2)}`
      }}
    >
      <div 
        className={styles.iconContainer}
        style={{
          background: PLPColors.getColorWithOpacity(iconColor, 0.1)
        }}
      >
        <Icon size={20} color={iconColor} />
      </div>
      <div 
        className={styles.value}
        style={{ color: PLPColors.primary.navy }}
      >
        {value}
      </div>
      <div 
        className={styles.label}
        style={{ color: PLPColors.neutral.gray600 }}
      >
        {label}
      </div>
    </motion.div>
  );
};

export default StatCard;