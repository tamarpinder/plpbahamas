import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Star, 
  Gift, 
  Users,
  GraduationCap,
  Stethoscope,
  Building,
  Zap,
  RefreshCw,
  CheckCircle,
  Clock,
  Shield,
  Award,
  ArrowRight,
  Target,
  Calendar
} from 'lucide-react';
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
  // Store access
  const gamificationStore = useGamificationStore();
  const awardUserPoints = gamificationStore?.awardUserPoints || (() => {});
  const { user } = useAuthStore();
  const { 
    paymentMethods, 
    defaultPaymentMethod, 
    isLoading: paymentLoading,
    loadPaymentMethods,
    processDonation 
  } = usePaymentStore();
  
  const [selectedCategory, setSelectedCategory] = useState('education');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [recurringInterval, setRecurringInterval] = useState('monthly');
  const [showQuickDonation, setShowQuickDonation] = useState(false);

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

  const donationCategories = useMemo(() => [
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      color: PLPColors.primary.blue,
      description: 'Improve educational opportunities',
      impact: {
        25: 'Provides school supplies for 1 student',
        50: 'Funds 1 scholarship application',
        100: 'Supports 1 student for a month',
        250: 'Sponsors technology for 1 classroom'
      }
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: Stethoscope,
      color: PLPColors.status.error,
      description: 'Support universal healthcare initiatives',
      impact: {
        25: 'Provides basic medical supplies',
        50: 'Funds 1 health screening',
        100: 'Supports 1 clinic visit',
        250: 'Sponsors preventive care program'
      }
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      icon: Building,
      color: PLPColors.primary.gold,
      description: 'Build better communities',
      impact: {
        25: 'Contributes to road maintenance',
        50: 'Supports community clean-up',
        100: 'Funds infrastructure planning',
        250: 'Sponsors community project'
      }
    },
    {
      id: 'emergency',
      name: 'Emergency Relief',
      icon: Shield,
      color: PLPColors.primary.navy,
      description: 'Disaster response and relief',
      impact: {
        25: 'Provides emergency supplies',
        50: 'Funds temporary shelter',
        100: 'Supports family for 1 week',
        250: 'Sponsors emergency response team'
      }
    }
  ], []);

  const presetAmounts = useMemo(() => [25, 50, 100, 250], []);

  // Memoized styles to prevent re-creation
  const containerStyles = useMemo(() => ({
    height: '100%',
    background: `linear-gradient(135deg, ${PLPColors.primary.blue} 0%, ${PLPColors.primary.gold} 100%)`,
    padding: '1rem',
    overflow: 'auto'
  }), []);

  const cardStyles = useMemo(() => ({
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    padding: '2rem 1.5rem',
    marginBottom: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: PLPShadows.medium
  }), []);

  const handleDonate = async () => {
    try {
      const donationAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount);
      
      if (!donationAmount || donationAmount <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }

      if (!selectedPaymentMethod) {
        toast.error('Please select a payment method');
        return;
      }

      setIsProcessing(true);
      
      const donationData = {
        amount: donationAmount,
        category: selectedCategory,
        paymentMethod: selectedPaymentMethod.type,
        paymentMethodId: selectedPaymentMethod.id,
        recurring: recurring,
        recurringInterval: recurring ? recurringInterval : null
      };
      
      const result = await processDonation(donationData);
      
      if (result.success) {
        // Award points safely
        try {
          if (awardUserPoints) {
            awardUserPoints('FIRST_DONATION');
          }
        } catch (error) {
          console.warn('Points award failed:', error);
        }
        
        const categoryName = donationCategories.find(cat => cat.id === selectedCategory)?.name || 'PLP';
        const recurringText = recurring ? ` (${recurringInterval})` : '';
        
        toast.success(`Thank you for your $${donationAmount} donation to ${categoryName}${recurringText}!`, {
          icon: '💝',
          duration: 4000,
        });
        
        // Reset form
        setAmount('');
        setCustomAmount('');
        setRecurring(false);
      } else {
        throw new Error(result.error || 'Donation failed');
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast.error(`Donation failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Quick donation with saved payment method
  const handleQuickDonate = async (quickAmount) => {
    if (!defaultPaymentMethod) {
      toast.error('Please add a payment method first');
      return;
    }

    try {
      setIsProcessing(true);
      
      const donationData = {
        amount: quickAmount,
        category: selectedCategory,
        paymentMethod: defaultPaymentMethod.type,
        paymentMethodId: defaultPaymentMethod.id,
        recurring: false
      };
      
      const result = await processDonation(donationData);
      
      if (result.success) {
        try {
          if (awardUserPoints) {
            awardUserPoints('FIRST_DONATION');
          }
        } catch (error) {
          console.warn('Points award failed:', error);
        }
        
        const categoryName = donationCategories.find(cat => cat.id === selectedCategory)?.name || 'PLP';
        
        toast.success(`Quick donation of $${quickAmount} to ${categoryName} successful!`, {
          icon: '⚡',
          duration: 4000,
        });
      } else {
        throw new Error(result.error || 'Quick donation failed');
      }
    } catch (error) {
      console.error('Quick donation error:', error);
      toast.error(`Quick donation failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
  };

  const selectedCategoryData = donationCategories.find(cat => cat.id === selectedCategory);
  const donationAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount);
  const currentImpact = selectedCategoryData?.impact[donationAmount] || selectedCategoryData?.impact[100];

  return (
    <motion.div 
      style={containerStyles}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div style={cardStyles}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Heart size={48} color={PLPColors.primary.red} style={{ marginBottom: '0.5rem' }} />
          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 'bold', 
            color: PLPColors.primary.blue,
            margin: 0 
          }}>
            Support the PLP
          </h1>
          <p style={{ 
            color: PLPColors.neutral.gray600, 
            marginTop: '0.5rem',
            margin: 0 
          }}>
            Your contribution helps build a better Bahamas
          </p>
        </div>
      </motion.div>

      {/* Quick Donations (if user has saved payment methods) */}
      {defaultPaymentMethod && (
        <motion.div style={cardStyles}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '1rem' 
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: PLPColors.primary.blue,
              margin: 0
            }}>
              Quick Donate
            </h2>
            <Zap size={20} color={PLPColors.primary.gold} />
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '0.5rem',
            marginBottom: '1rem' 
          }}>
            {presetAmounts.map((quickAmount) => (
              <motion.button
                key={quickAmount}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickDonate(quickAmount)}
                disabled={isProcessing}
                style={{
                  background: `linear-gradient(135deg, ${PLPColors.primary.gold}, ${PLPColors.primary.blue})`,
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 0.5rem',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  opacity: isProcessing ? 0.7 : 1
                }}
              >
                ${quickAmount}
              </motion.button>
            ))}
          </div>
          
          <div style={{ 
            fontSize: '0.75rem', 
            color: PLPColors.neutral.gray600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CreditCard size={12} />
            Using {defaultPaymentMethod.displayName}
          </div>
        </motion.div>
      )}

      {/* Category Selection */}
      <motion.div style={cardStyles}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: PLPColors.primary.blue,
          marginBottom: '1rem' 
        }}>
          Choose Category
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '0.5rem',
          marginBottom: '1rem' 
        }}>
          {donationCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  background: isSelected 
                    ? PLPColors.getColorWithOpacity(category.color, 0.1)
                    : PLPColors.getColorWithOpacity(PLPColors.neutral.gray100, 0.5),
                  border: isSelected 
                    ? `2px solid ${category.color}` 
                    : '1px solid transparent',
                  borderRadius: '0.75rem',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={20} color={category.color} style={{ marginBottom: '0.25rem' }} />
                <div style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: '600',
                  color: PLPColors.primary.navy
                }}>
                  {category.name}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Amount Selection with Impact */}
      <motion.div style={cardStyles}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: PLPColors.primary.blue,
          marginBottom: '1rem' 
        }}>
          Choose Amount
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '0.75rem',
          marginBottom: '1rem' 
        }}>
          {presetAmounts.map((presetAmount) => (
            <Button
              key={presetAmount}
              onClick={() => handleAmountSelect(presetAmount)}
              variant={amount === presetAmount.toString() ? "default" : "outline"}
              style={{
                height: '3rem',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              ${presetAmount}
            </Button>
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: '500',
            color: PLPColors.neutral.gray700,
            marginBottom: '0.5rem' 
          }}>
            Custom Amount
          </label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            style={{ fontSize: '1.1rem' }}
          />
        </div>

      </motion.div>

      {/* Payment Method Selection */}
      <motion.div style={cardStyles}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: PLPColors.primary.blue,
          marginBottom: '1rem' 
        }}>
          Payment Method
        </h2>
        
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
            borderRadius: '0.5rem'
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

      {/* Recurring Donation Options */}
      <motion.div style={cardStyles}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '1rem' 
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            color: PLPColors.primary.blue,
            margin: 0
          }}>
            Recurring Donation
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setRecurring(!recurring)}
            style={{
              background: recurring ? PLPColors.status.success : PLPColors.neutral.gray300,
              border: 'none',
              borderRadius: '1rem',
              width: '3rem',
              height: '1.5rem',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '1.25rem',
              height: '1.25rem',
              background: 'white',
              borderRadius: '50%',
              position: 'absolute',
              top: '0.125rem',
              left: recurring ? '1.625rem' : '0.125rem',
              transition: 'left 0.2s ease'
            }} />
          </motion.button>
        </div>
        
        {recurring && (
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            {['monthly', 'quarterly', 'annually'].map((interval) => (
              <motion.button
                key={interval}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRecurringInterval(interval)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: recurringInterval === interval
                    ? PLPColors.primary.blue
                    : PLPColors.neutral.gray100,
                  color: recurringInterval === interval
                    ? 'white'
                    : PLPColors.primary.navy,
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}
              >
                <Calendar size={16} style={{ marginRight: '0.25rem' }} />
                {interval.charAt(0).toUpperCase() + interval.slice(1)}
              </motion.button>
            ))}
          </div>
        )}
        
        <div style={{ 
          fontSize: '0.75rem', 
          color: PLPColors.neutral.gray600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <RefreshCw size={12} />
          {recurring 
            ? `Your donation will automatically repeat ${recurringInterval}`
            : 'Toggle to set up recurring donations'
          }
        </div>
      </motion.div>

      {/* Donate Button */}
      <motion.div style={cardStyles}>
        <Button
          onClick={handleDonate}
          disabled={isProcessing || (!amount && !customAmount) || !selectedPaymentMethod}
          style={{
            width: '100%',
            height: '3.5rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            background: isProcessing || (!amount && !customAmount) || !selectedPaymentMethod
              ? PLPColors.neutral.gray400 
              : `linear-gradient(135deg, ${PLPColors.primary.blue}, ${PLPColors.primary.gold})`,
            border: 'none',
            color: 'white',
            cursor: isProcessing || (!amount && !customAmount) || !selectedPaymentMethod
              ? 'not-allowed'
              : 'pointer'
          }}
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  marginRight: '0.5rem'
                }}
              />
              Processing...
            </>
          ) : (
            <>
              <Gift size={24} style={{ marginRight: '0.5rem' }} />
              Donate {amount && `$${amount === 'custom' ? customAmount : amount}`}
              {recurring && ` (${recurringInterval})`}
            </>
          )}
        </Button>
      </motion.div>

      {/* Impact Stats */}
      <motion.div style={cardStyles}>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 'bold', 
          color: PLPColors.primary.blue,
          marginBottom: '1rem',
          textAlign: 'center' 
        }}>
          Community Impact
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1rem',
          textAlign: 'center' 
        }}>
          <div>
            <Users size={24} color={PLPColors.primary.blue} style={{ margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: PLPColors.primary.blue }}>
              12,450
            </div>
            <div style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
              Supporters
            </div>
          </div>
          
          <div>
            <TrendingUp size={24} color={PLPColors.primary.gold} style={{ margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: PLPColors.primary.gold }}>
              $89,234
            </div>
            <div style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
              Raised
            </div>
          </div>
          
          <div>
            <Star size={24} color={PLPColors.primary.red} style={{ margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: PLPColors.primary.red }}>
              94%
            </div>
            <div style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
              Goal
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MobileDonate = () => (
  <ScreenErrorBoundary screenName="Donate">
    <MobileDonateContent />
  </ScreenErrorBoundary>
);

export default MobileDonate;