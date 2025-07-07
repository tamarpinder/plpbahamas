import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CreditCard, DollarSign, TrendingUp, Star, Gift, Users } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { PLPColors, PLPShadows } from '../../../constants/brandColors';
import { mockApi } from '../../../services/mockApi';
import useGamificationStore from '../../../stores/useGamificationStore';
import { toast } from 'sonner';

const MobileDonate = () => {
  const { awardUserPoints } = useGamificationStore();
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [25, 50, 100, 250];

  const handleDonate = async () => {
    const donationAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount);
    
    if (!donationAmount || donationAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    
    try {
      const result = await mockApi.processDonation({
        amount: donationAmount,
        paymentMethod
      });
      
      if (result.success) {
        // Award points based on donation amount
        const points = Math.min(Math.floor(donationAmount / 5) * 5, 100); // 5 points per $5, max 100
        awardUserPoints('MAKE_DONATION', points);
        
        toast.success(`Thank you for your $${donationAmount} donation! +${points} points`, {
          icon: '💝',
          duration: 4000,
          description: 'Your support makes a difference!'
        });
        setAmount('');
        setCustomAmount('');
      }
    } catch (error) {
      toast.error('Donation failed. Please try again.');
    } finally {
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
          textAlign: 'center'
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
          
          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setPaymentMethod('card')}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '1rem',
              border: `2px solid ${paymentMethod === 'card' ? PLPColors.primary.gold : PLPColors.neutral.gray200}`,
              background: paymentMethod === 'card' 
                ? PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1) 
                : PLPColors.neutral.white,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease'
            }}
          >
            <CreditCard size={20} color={PLPColors.primary.navy} />
            <span style={{
              fontWeight: '600',
              color: PLPColors.primary.navy,
              fontSize: '1rem'
            }}>Credit/Debit Card</span>
          </motion.button>
        </motion.div>

        {/* Impact Preview */}
        <motion.div 
          variants={itemVariants}
          style={{
            background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.05),
            borderRadius: '1.5rem',
            padding: '1.5rem',
            border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.15)}`,
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
              background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
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
              background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
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
            disabled={(!amount || (amount === 'custom' && !customAmount)) || isProcessing}
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
              cursor: (!amount || (amount === 'custom' && !customAmount)) || isProcessing ? 'not-allowed' : 'pointer',
              opacity: (!amount || (amount === 'custom' && !customAmount)) || isProcessing ? 0.7 : 1,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              if (!isProcessing && (amount || customAmount)) {
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
};

export default MobileDonate;