import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PLPColors } from '../../../../../constants/brandColors';

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
      style={{
        background: backgroundColor,
        border: 'none',
        borderRadius: '1rem',
        padding: '1rem',
        cursor: 'pointer',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={20} color={textColor} />
          </div>
          <span style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: textColor
          }}>
            {label}
          </span>
        </div>
        
        <ArrowRight size={20} color={textColor} />
      </div>
      
      {/* Subtle background effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(20px)'
      }} />
    </motion.button>
  );
};

export default ActionButton;