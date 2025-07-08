import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CreditCard, DollarSign, TrendingUp, Star, Gift, Users } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { PLPColors, PLPShadows } from '@/constants/brandColors';
import { mockApi } from '../../../services/mockApi';
import useGamificationStore from '@/stores/useGamificationStore';
import usePaymentStore from '@/stores/usePaymentStore';
import useAuthStore from '@/stores/useAuthStore';
import ScreenErrorBoundary from '../../shared/ScreenErrorBoundary';
import { toast } from 'sonner';

const MobileDonateContent = () => {
  console.log('MobileDonate: Component rendering');
  
  // Store access
  const { user } = useAuthStore();
  const { 
    paymentMethods, 
    defaultPaymentMethod, 
    isLoading: paymentLoading,
    loadPaymentMethods,
    processDonation 
  } = usePaymentStore();
  
  let awardUserPoints;
  try {
    const gamificationStore = useGamificationStore();
    awardUserPoints = gamificationStore.awardUserPoints;
    console.log('MobileDonate: Gamification store loaded successfully');
  } catch (gamificationError) {
    console.error('MobileDonate: Error loading gamification store:', gamificationError);
    // Fallback function if gamification fails
    awardUserPoints = (action, multiplier) => {
      console.log('MobileDonate: Fallback points function called with:', action, multiplier);
    };
  }
  
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Load payment methods on component mount
  useEffect(() => {
    loadPaymentMethods();
  }, []);

  // Set default payment method when available
  useEffect(() => {
    if (defaultPaymentMethod && !selectedPaymentMethod) {
      setSelectedPaymentMethod(defaultPaymentMethod);
    }
  }, [defaultPaymentMethod, selectedPaymentMethod]);
  
  // Component lifecycle logging
  React.useEffect(() => {
    console.log('MobileDonate: Component mounted');
    return () => {
      console.log('MobileDonate: Component unmounting');
    };
  }, []);

  const presetAmounts = [25, 50, 100, 250];

  const handleDonate = async () => {
    console.log('MobileDonate: handleDonate called with amount:', amount, 'customAmount:', customAmount);
    
    try {
      const donationAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount);
      console.log('MobileDonate: Calculated donation amount:', donationAmount);
      
      if (!donationAmount || donationAmount <= 0) {
        console.log('MobileDonate: Invalid amount, showing error');
        toast.error('Please enter a valid amount');
        return;
      }

      if (!selectedPaymentMethod) {
        toast.error('Please select a payment method');
        return;
      }

      console.log('MobileDonate: Setting processing state');
      setIsProcessing(true);
      
      try {
        console.log('MobileDonate: Calling processDonation');
        const donationData = {
          amount: donationAmount,
          category: 'general',
          paymentMethod: selectedPaymentMethod.type,
          paymentMethodId: selectedPaymentMethod.id,
          recurring: false
        };
        
        const result = await processDonation(donationData);
        console.log('MobileDonate: API result:', result);
        
        if (result.success) {
          console.log('MobileDonate: Donation successful, awarding points');
          
          // Award points for donation with error handling
          try {
            awardUserPoints('FIRST_DONATION'); // Award standard first donation points
            console.log('MobileDonate: First donation points awarded');
          } catch (pointsError) {
            console.error('MobileDonate: Error awarding first donation points:', pointsError);
          }
          
          // Award additional points based on donation amount
          const bonusPoints = Math.min(Math.floor(donationAmount / 5) * 5, 100); // 5 points per $5, max 100
          if (bonusPoints > 0) {
            try {
              awardUserPoints('DONATION_MILESTONE', Math.floor(bonusPoints / 50)); // Use milestone for bonus points
              console.log('MobileDonate: Bonus points awarded:', bonusPoints);
            } catch (bonusError) {
              console.error('MobileDonate: Error awarding bonus points:', bonusError);
            }
          }
          
          const totalPoints = 100 + bonusPoints; // First donation (100) + bonus
          console.log('MobileDonate: Total points calculated:', totalPoints);
          
          toast.success(`Thank you for your $${donationAmount} donation! +${totalPoints} points`, {
            icon: '💝',
            duration: 4000,
            description: 'Your support makes a difference!'
          });
          setAmount('');
          setCustomAmount('');
        }
      } catch (donationError) {
        console.error('MobileDonate: Donation API error:', donationError);
        toast.error('Donation failed. Please try again.');
      } finally {
        console.log('MobileDonate: Resetting processing state');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('MobileDonate: Critical donation error:', error);
      console.error('MobileDonate: Error stack:', error.stack);
      toast.error('Something went wrong. Please refresh and try again.');
      setIsProcessing(false);
    }
  };


  const getPointsForAmount = (amt) => {
    const amount = parseFloat(amt);
    if (!amount) return 0;
    return Math.min(Math.floor(amount / 5) * 5, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  console.log('MobileDonate: About to render component');
  
  try {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          height: '100%',
          background: PLPColors.gradients.hero,
          overflow: 'auto'
        }}
      >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '2rem 1rem',
          borderBottomLeftRadius: '2rem',
          borderBottomRightRadius: '2rem',
          border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.neutral.white, 0.2)}`,
          boxShadow: PLPShadows.glass,
          marginBottom: '1rem',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            width: '4rem',
            height: '4rem',
            background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.15),
            borderRadius: '50%',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `3px solid ${PLPColors.primary.gold}`
          }}
        >
          <Heart size={24} color={PLPColors.primary.navy} />
        </motion.div>
        <motion.h1 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: PLPColors.primary.navy,
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <Gift size={24} color={PLPColors.primary.gold} />
          Support the PLP
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            color: PLPColors.neutral.gray600,
            fontSize: '0.875rem'
          }}
        >
          Your donation helps build a better Bahamas for all
        </motion.p>
      </motion.div>

      <div style={{ padding: '0 1rem 5rem' }}>

        {/* Amount Selection */}
        <motion.div 
          variants={itemVariants}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`,
            boxShadow: PLPShadows.md,
            marginBottom: '1rem'
          }}
        >
          <h3 style={{
            fontWeight: '700',
            color: PLPColors.primary.navy,
            marginBottom: '1rem',
            fontSize: '1.125rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <DollarSign size={20} color={PLPColors.primary.gold} />
            Select Amount
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            {presetAmounts.map((preset, index) => {
              const isSelected = amount === preset.toString();
              const points = getPointsForAmount(preset);
              return (
                <motion.button
                  key={preset}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAmount(preset.toString())}
                  style={{
                    padding: '1rem',
                    borderRadius: '1rem',
                    border: `2px solid ${isSelected ? PLPColors.primary.gold : PLPColors.neutral.gray200}`,
                    background: isSelected 
                      ? PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1) 
                      : PLPColors.neutral.white,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: PLPColors.primary.navy,
                    marginBottom: '0.25rem'
                  }}>${preset}</div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: PLPColors.primary.gold,
                    fontWeight: '600'
                  }}>+{points} points</div>
                </motion.button>
              );
            })}
          </div>
          
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setAmount('custom')}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '1rem',
              border: `2px solid ${amount === 'custom' ? PLPColors.primary.gold : PLPColors.neutral.gray200}`,
              background: amount === 'custom' 
                ? PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1) 
                : PLPColors.neutral.white,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '1rem'
            }}
          >
            <span style={{
              fontWeight: '600',
              color: PLPColors.primary.navy,
              fontSize: '1rem'
            }}>Custom Amount</span>
            {amount === 'custom' && customAmount && (
              <div style={{
                fontSize: '0.75rem',
                color: PLPColors.primary.gold,
                fontWeight: '600',
                marginTop: '0.25rem'
              }}>+{getPointsForAmount(customAmount)} points</div>
            )}
          </motion.button>
          
          <AnimatePresence>
            {amount === 'custom' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ position: 'relative' }}
              >
                <DollarSign 
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: PLPColors.neutral.gray400,
                    zIndex: 1
                  }}
                />
                <Input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  style={{
                    height: '3rem',
                    paddingLeft: '3rem',
                    border: `2px solid ${PLPColors.neutral.gray200}`,
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    background: PLPColors.neutral.white,
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = `2px solid ${PLPColors.primary.gold}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.border = `2px solid ${PLPColors.neutral.gray200}`;
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Payment Method */}
        <motion.div 
          variants={itemVariants}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`,
            boxShadow: PLPShadows.md,
            marginBottom: '1rem'
          }}
        >
          <h3 style={{
            fontWeight: '700',
            color: PLPColors.primary.navy,
            marginBottom: '1rem',
            fontSize: '1.125rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CreditCard size={20} color={PLPColors.primary.gold} />
            Payment Method
          </h3>
          
          {paymentLoading ? (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: `2px solid ${PLPColors.primary.blue}`,
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 0.5rem'
              }} />
              <p style={{ color: PLPColors.neutral.gray600, fontSize: '0.875rem' }}>Loading...</p>
            </div>
          ) : paymentMethods.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '1rem',
              background: PLPColors.getColorWithOpacity(PLPColors.status.warning, 0.1),
              borderRadius: '0.75rem'
            }}>
              <p style={{ color: PLPColors.neutral.gray600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                No payment methods found.
              </p>
              <Button
                onClick={() => toast.info('Go to Profile → Payment Methods to add a payment method')}
                variant="outline"
                style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
              >
                Add Payment Method
              </Button>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.5rem',
              alignItems: 'center'
            }}>
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPaymentMethod(method)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 0.75rem',
                    background: selectedPaymentMethod?.id === method.id
                      ? PLPColors.primary.blue
                      : PLPColors.getColorWithOpacity(PLPColors.neutral.gray100, 0.8),
                    color: selectedPaymentMethod?.id === method.id
                      ? 'white'
                      : PLPColors.primary.navy,
                    border: 'none',
                    borderRadius: '1.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    gap: '0.5rem'
                  }}
                >
                  <CreditCard size={14} />
                  <span>
                    {method.type === 'card' ? `•••${method.lastFour}` : 'PayPal'}
                  </span>
                  {method.isDefault && (
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: selectedPaymentMethod?.id === method.id ? 'white' : PLPColors.status.success,
                      borderRadius: '50%'
                    }} />
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Impact Preview */}
        <motion.div 
          variants={itemVariants}
          style={{
            background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.12),
            borderRadius: '1.5rem',
            padding: '1.5rem',
            border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.25)}`,
            marginBottom: '1rem'
          }}
        >
          <h3 style={{
            fontWeight: '700',
            color: PLPColors.primary.navy,
            marginBottom: '0.75rem',
            fontSize: '1.125rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <TrendingUp size={20} color={PLPColors.primary.gold} />
            Your Impact
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: PLPColors.primary.navy,
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>
            {amount && amount !== 'custom' 
              ? `$${amount} helps fund community programs, youth development, and healthcare initiatives across the Bahamas.`
              : customAmount
              ? `$${customAmount} helps fund community programs, youth development, and healthcare initiatives across the Bahamas.`
              : 'Every donation makes a difference in building stronger communities throughout the Bahamas.'
            }
          </p>
          
          {/* Community Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem'
          }}>
            <div style={{
              background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.18),
              borderRadius: '0.75rem',
              padding: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: PLPColors.primary.navy,
                marginBottom: '0.25rem'
              }}>15,420</div>
              <div style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>Families Helped</div>
            </div>
            
            <div style={{
              background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.18),
              borderRadius: '0.75rem',
              padding: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: PLPColors.primary.navy,
                marginBottom: '0.25rem'
              }}>$145K</div>
              <div style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>Total Raised</div>
            </div>
          </div>
        </motion.div>

        {/* Donate Button */}
        <motion.div 
          variants={itemVariants}
          style={{ marginBottom: '1rem' }}
        >
          <Button
            onClick={handleDonate}
            disabled={(!amount || (amount === 'custom' && !customAmount)) || !selectedPaymentMethod || isProcessing}
            style={{
              width: '100%',
              height: '3.5rem',
              background: PLPColors.gradients.button,
              border: 'none',
              borderRadius: '1rem',
              color: PLPColors.primary.navy,
              fontSize: '1.125rem',
              fontWeight: '700',
              boxShadow: PLPShadows.md,
              cursor: (!amount || (amount === 'custom' && !customAmount)) || !selectedPaymentMethod || isProcessing ? 'not-allowed' : 'pointer',
              opacity: (!amount || (amount === 'custom' && !customAmount)) || !selectedPaymentMethod || isProcessing ? 0.7 : 1,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              if (!isProcessing && (amount || customAmount) && selectedPaymentMethod) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = PLPShadows.lg;
              }
            }}
            onMouseOut={(e) => {
              if (!isProcessing) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = PLPShadows.md;
              }
            }}
          >
            <Heart size={20} />
            {isProcessing ? 'Processing...' : 'Donate Now'}
          </Button>
        </motion.div>

        {/* Security Note */}
        <motion.div 
          variants={itemVariants}
          style={{
            textAlign: 'center',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '1rem',
            backdropFilter: 'blur(10px)'
          }}
        >
          <p style={{
            fontSize: '0.875rem',
            color: PLPColors.neutral.gray600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            🔒 Your donation is secure and will be processed safely
          </p>
        </motion.div>
      </div>
      </motion.div>
    );
  } catch (renderError) {
    console.error('MobileDonate: Render error:', renderError);
    console.error('MobileDonate: Render error stack:', renderError.stack);
    
    // Fallback UI
    return (
      <div style={{
        height: '100%',
        background: PLPColors.gradients.hero,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          <h2 style={{ color: PLPColors.primary.navy, marginBottom: '1rem' }}>Donation Unavailable</h2>
          <p style={{ color: PLPColors.neutral.gray600, marginBottom: '1rem' }}>The donation feature is temporarily unavailable. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: PLPColors.primary.gold,
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

const MobileDonate = () => {
  console.log('MobileDonate: Main component wrapper rendering');
  
  try {
    return (
      <ScreenErrorBoundary screenName="Donate">
        <MobileDonateContent />
      </ScreenErrorBoundary>
    );
  } catch (wrapperError) {
    console.error('MobileDonate: Wrapper error:', wrapperError);
    console.error('MobileDonate: Wrapper error stack:', wrapperError.stack);
    
    // Ultra-safe fallback
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #0066CC 0%, #003d7a 100%)'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          <h2 style={{ color: '#003d7a', marginBottom: '1rem' }}>Service Unavailable</h2>
          <p style={{ color: '#666', marginBottom: '1rem' }}>The donation service is currently unavailable.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#FFD700',
              color: '#003d7a',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }
};

export default MobileDonate;