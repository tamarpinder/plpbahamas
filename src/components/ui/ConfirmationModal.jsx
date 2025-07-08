import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, LogOut, X } from 'lucide-react';
import { PLPColors, PLPShadows } from '../../constants/brandColors';
import { usePhonePortal } from '../../contexts/ModalPortalContext';

const ConfirmationModal = ({
  isOpen = false,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default", // "default" | "danger" | "warning"
  icon = null,
  isLoading = false
}) => {
  
  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          iconColor: PLPColors.status.error,
          confirmBg: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
          confirmHover: '#DC2626',
          borderColor: PLPColors.getColorWithOpacity(PLPColors.status.error, 0.2)
        };
      case 'warning':
        return {
          iconColor: PLPColors.status.warning,
          confirmBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          confirmHover: '#D97706',
          borderColor: PLPColors.getColorWithOpacity(PLPColors.status.warning, 0.2)
        };
      default:
        return {
          iconColor: PLPColors.primary.blue,
          confirmBg: PLPColors.gradients.button,
          confirmHover: PLPColors.primary.gold,
          borderColor: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.2)
        };
    }
  };

  const variantStyles = getVariantStyles();
  const defaultIcon = variant === 'danger' ? LogOut : AlertTriangle;
  const IconComponent = icon || defaultIcon;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
            pointerEvents: 'auto'
          }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '1.5rem',
              padding: '2rem',
              maxWidth: '24rem',
              width: '100%',
              border: `1px solid ${variantStyles.borderColor}`,
              boxShadow: PLPShadows.glass,
              position: 'relative'
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                color: PLPColors.neutral.gray500
              }}
              onMouseOver={(e) => {
                e.target.style.background = PLPColors.getColorWithOpacity(PLPColors.neutral.gray300, 0.3);
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'none';
              }}
            >
              <X size={18} />
            </motion.button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", damping: 15 }}
              style={{
                width: '3.5rem',
                height: '3.5rem',
                background: PLPColors.getColorWithOpacity(variantStyles.iconColor, 0.1),
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                border: `2px solid ${PLPColors.getColorWithOpacity(variantStyles.iconColor, 0.2)}`
              }}
            >
              <IconComponent size={24} color={variantStyles.iconColor} />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              id="modal-title"
              style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: PLPColors.primary.navy,
                textAlign: 'center',
                marginBottom: '0.75rem'
              }}
            >
              {title}
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              id="modal-description"
              style={{
                fontSize: '0.875rem',
                color: PLPColors.neutral.gray600,
                textAlign: 'center',
                lineHeight: '1.5',
                marginBottom: '2rem'
              }}
            >
              {message}
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center'
              }}
            >
              {/* Cancel Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.neutral.gray400, 0.3)}`,
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: PLPColors.neutral.gray700,
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.background = PLPColors.getColorWithOpacity(PLPColors.neutral.gray100, 0.8);
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                }}
              >
                {cancelText}
              </motion.button>

              {/* Confirm Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  background: isLoading ? PLPColors.neutral.gray400 : variantStyles.confirmBg,
                  color: PLPColors.neutral.white,
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.background = variantStyles.confirmHover;
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.target.style.background = variantStyles.confirmBg;
                  }
                }}
              >
                {isLoading && (
                  <div style={{
                    width: '1rem',
                    height: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                )}
                {isLoading ? 'Processing...' : confirmText}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return usePhonePortal(modal);
};

export default ConfirmationModal;