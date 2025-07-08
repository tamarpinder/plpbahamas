// Safe motion components that work with React 19
// Uses CSS transitions instead of framer-motion for critical interactions
import React, { forwardRef } from 'react';

// Safe motion div with CSS transitions
export const SafeMotionDiv = forwardRef(({ 
  children, 
  style = {},
  className = '',
  initial,
  animate,
  whileHover,
  whileTap,
  transition,
  ...props 
}, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  // Build CSS transition string
  const transitionStyle = transition 
    ? `all ${transition.duration || 0.3}s ${transition.ease || 'ease'}`
    : 'all 0.3s ease';

  // Compute current styles based on state
  const computedStyle = {
    ...style,
    transition: transitionStyle,
    ...(isHovered && whileHover ? {
      transform: whileHover.scale ? `scale(${whileHover.scale})` : style.transform,
      ...(whileHover.y !== undefined ? { transform: `${style.transform || ''} translateY(${whileHover.y}px)` } : {}),
      ...(whileHover.boxShadow ? { boxShadow: whileHover.boxShadow } : {})
    } : {}),
    ...(isActive && whileTap ? {
      transform: whileTap.scale ? `scale(${whileTap.scale})` : style.transform
    } : {})
  };

  return (
    <div
      ref={ref}
      style={computedStyle}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      {...props}
    >
      {children}
    </div>
  );
});

SafeMotionDiv.displayName = 'SafeMotionDiv';

// Safe motion button with CSS transitions
export const SafeMotionButton = forwardRef(({ 
  children, 
  onClick,
  disabled = false,
  style = {},
  className = '',
  whileHover,
  whileTap,
  transition,
  ...props 
}, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const handleClick = (e) => {
    if (!disabled && onClick) {
      try {
        onClick(e);
      } catch (error) {
        console.error('Button click error:', error);
      }
    }
  };

  // Build CSS transition string
  const transitionStyle = transition 
    ? `all ${transition.duration || 0.2}s ${transition.ease || 'ease'}`
    : 'all 0.2s ease';

  // Compute current styles based on state
  const computedStyle = {
    ...style,
    transition: transitionStyle,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...(isHovered && !disabled && whileHover ? {
      transform: whileHover.scale ? `scale(${whileHover.scale})` : 'scale(1)',
      ...(whileHover.y !== undefined ? { transform: `translateY(${whileHover.y}px)` } : {}),
      ...(whileHover.boxShadow ? { boxShadow: whileHover.boxShadow } : {})
    } : {}),
    ...(isActive && !disabled && whileTap ? {
      transform: whileTap.scale ? `scale(${whileTap.scale})` : 'scale(0.98)'
    } : {})
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      style={computedStyle}
      className={className}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      {...props}
    >
      {children}
    </button>
  );
});

SafeMotionButton.displayName = 'SafeMotionButton';

// Animation presence wrapper (simplified)
export const SafeAnimatePresence = ({ children, mode = 'wait' }) => {
  // For now, just render children directly
  // In production, you'd implement proper enter/exit animations
  return <>{children}</>;
};

// Export motion object for compatibility
export const safeMotion = {
  div: SafeMotionDiv,
  button: SafeMotionButton
};

export default safeMotion;