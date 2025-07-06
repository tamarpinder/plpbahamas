import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser } from '../data/mockUserGamified.js';
import { mockCampaigns } from '../data/mockDonations.js';
import gamificationService from '../services/gamificationService.js';

const QuickDonate = ({ onClose, onSuccess }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState(null);
  
  const user = getCurrentUser();
  const quickAmounts = [25, 50, 100, 250];
  const featuredCampaign = mockCampaigns.find(c => c.urgency === 'high') || mockCampaigns[0];

  const handleQuickDonate = async (amount) => {
    if (!user.paymentMethod) {
      // Redirect to add payment method
      alert('Please add a payment method first!');
      return;
    }

    setSelectedAmount(amount);
    setIsProcessing(true);

    // Simulate quick donation
    setTimeout(() => {
      const result = gamificationService.awardPoints('donation', { amount });
      
      setIsProcessing(false);
      
      if (result && (result.level_up || result.badges_earned.length > 0)) {
        setCelebrationData(result);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }

      onSuccess({
        amount,
        campaign: featuredCampaign.name,
        gamification: result
      });

      setTimeout(() => {
        onClose();
      }, showCelebration ? 3500 : 1000);
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <motion.div 
        className="modal"
        style={{ maxWidth: '90%', maxHeight: '70%' }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="modal-header">
          <h2 className="modal-title">⚡ Quick Donate</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Celebration Banner */}
        <AnimatePresence>
          {showCelebration && celebrationData && (
            <motion.div
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                padding: '1rem',
                margin: '0 -1.5rem 1rem -1.5rem',
                textAlign: 'center'
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎉</div>
              {celebrationData.level_up && (
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  Level Up! You're now a {celebrationData.new_level.name}!
                </div>
              )}
              {celebrationData.badges_earned.length > 0 && (
                <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  Badge Unlocked: {celebrationData.badges_earned[0].name} {celebrationData.badges_earned[0].icon}
                </div>
              )}
              <div style={{ fontSize: '0.875rem' }}>
                +{celebrationData.points_earned} PLP Points!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
          {/* Featured Campaign */}
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            background: 'linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 100%)',
            borderRadius: '0.75rem',
            border: '1px solid #93C5FD'
          }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1D4ED8' }}>
              Featured Campaign
            </div>
            <div style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1F2937' }}>
              {featuredCampaign.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.75rem' }}>
              {featuredCampaign.description.substring(0, 80)}...
            </div>
            
            {/* Progress */}
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '0.75rem', 
                color: '#6B7280',
                marginBottom: '0.25rem' 
              }}>
                <span>${featuredCampaign.current_amount.toLocaleString()} raised</span>
                <span>Goal: ${featuredCampaign.goal_amount.toLocaleString()}</span>
              </div>
              <div style={{ 
                width: '100%', 
                backgroundColor: '#E5E7EB', 
                borderRadius: '0.25rem', 
                height: '0.5rem' 
              }}>
                <div style={{ 
                  width: `${Math.min((featuredCampaign.current_amount / featuredCampaign.goal_amount) * 100, 100)}%`,
                  backgroundColor: '#10B981',
                  height: '100%',
                  borderRadius: '0.25rem'
                }} />
              </div>
            </div>
          </div>

          {/* Payment Method Status */}
          <div style={{
            marginBottom: '1.5rem',
            padding: '0.75rem',
            backgroundColor: user.paymentMethod ? '#F0FDF4' : '#FEF3C7',
            borderRadius: '0.5rem',
            border: `1px solid ${user.paymentMethod ? '#BBF7D0' : '#FDE68A'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>
              {user.paymentMethod ? '✅' : '⚠️'}
            </span>
            <div style={{ fontSize: '0.875rem' }}>
              {user.paymentMethod 
                ? `Payment ready: ${user.paymentMethod}` 
                : 'Add payment method for instant donations'}
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', color: '#1F2937' }}>
              Choose Amount
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '0.75rem' 
            }}>
              {quickAmounts.map((amount) => (
                <motion.button
                  key={amount}
                  onClick={() => handleQuickDonate(amount)}
                  disabled={isProcessing}
                  style={{
                    padding: '1rem',
                    border: '2px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    backgroundColor: 'white',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    opacity: isProcessing ? 0.6 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  whileHover={!isProcessing ? { scale: 1.05, borderColor: '#3B82F6' } : {}}
                  whileTap={!isProcessing ? { scale: 0.95 } : {}}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1F2937' }}>
                    ${amount}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    Earn {amount} points
                  </div>
                  {selectedAmount === amount && isProcessing && (
                    <motion.div
                      style={{ fontSize: '0.75rem', color: '#3B82F6' }}
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Processing...
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                // Open full donation form for custom amounts
                onClose();
                // This would trigger the full donation form
              }}
              style={{
                background: 'none',
                border: '1px solid #D1D5DB',
                borderRadius: '0.5rem',
                padding: '0.75rem 1.5rem',
                color: '#6B7280',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Custom Amount / Add Payment Method
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickDonate;