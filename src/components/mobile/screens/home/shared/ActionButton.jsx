import React from 'react';
import { SafeMotionButton } from '@/components/SafeMotion';
import { ArrowRight, Star } from 'lucide-react';
import { PLPColors, PLPShadows } from '@/constants/brandColors';

const ActionButton = ({ 
  icon: Icon, 
  label, 
  subtitle,
  onClick, 
  backgroundColor = PLPColors.primary.blue,
  textColor = PLPColors.neutral.white,
  pointsReward,
  status,
  isLive = false,
  className = ''
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'live': return PLPColors.primary.blue;
      case 'soon': return PLPColors.primary.orange || PLPColors.primary.gold;
      case 'new': return PLPColors.status.success;
      default: return null;
    }
  };

  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      try {
        onClick();
      } catch (error) {
        console.error('ActionButton click error:', error);
      }
    }
  };

  return (
    <SafeMotionButton
      whileHover={{ 
        scale: 1.02,
        y: -2,
        boxShadow: PLPShadows.lg
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={className}
      style={{
        background: backgroundColor,
        border: 'none',
        borderRadius: '1.25rem',
        padding: '1.25rem',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: PLPShadows.md,
        minHeight: '120px'
      }}
    >
      {/* Status Badge */}
      {status && (
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          background: getStatusColor(),
          color: PLPColors.neutral.white,
          fontSize: '0.75rem',
          fontWeight: '600',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.5rem',
          textTransform: 'uppercase',
          zIndex: 3
        }}>
          {status === 'live' && isLive && (
            <span style={{ 
              display: 'inline-block',
              width: '6px',
              height: '6px',
              background: PLPColors.neutral.white,
              borderRadius: '50%',
              marginRight: '0.25rem',
              animation: 'pulse 2s infinite'
            }} />
          )}
          {status}
        </div>
      )}

      {/* Background Effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(20px)',
        zIndex: 1
      }} />

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Top Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '0.5rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {Icon && <Icon size={24} color={textColor} />}
          </div>
          
          <ArrowRight size={20} color={textColor} style={{ opacity: 0.7 }} />
        </div>

        {/* Label Section */}
        <div style={{ width: '100%', textAlign: 'left' }}>
          <div style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: textColor,
            marginBottom: subtitle ? '0.25rem' : '0.5rem',
            lineHeight: '1.2'
          }}>
            {label}
          </div>
          
          {subtitle && (
            <div style={{
              fontSize: '0.875rem',
              color: textColor,
              opacity: 0.8,
              marginBottom: '0.5rem',
              lineHeight: '1.3'
            }}>
              {subtitle}
            </div>
          )}

          {/* Points Reward */}
          {pointsReward && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginTop: 'auto'
            }}>
              <Star size={14} color={textColor} style={{ opacity: 0.8 }} />
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: textColor,
                opacity: 0.9
              }}>
                +{pointsReward} points
              </span>
            </div>
          )}
        </div>
      </div>
    </SafeMotionButton>
  );
};

export default ActionButton;