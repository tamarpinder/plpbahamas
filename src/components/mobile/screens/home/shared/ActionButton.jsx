import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';
import styles from './ActionButton.module.css';

const ActionButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  backgroundColor = PLPColors.primary.blue,
  textColor = PLPColors.neutral.white
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={styles.button}
      style={{ background: backgroundColor }}
    >
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={styles.iconContainer}>
            <Icon size={20} color={textColor} />
          </div>
          <span 
            className={styles.label}
            style={{ color: textColor }}
          >
            {label}
          </span>
        </div>
        
        <ArrowRight size={20} color={textColor} />
      </div>
      
      <div className={styles.backgroundEffect} />
    </motion.button>
  );
};

export default ActionButton;