import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  LogOut, 
  Settings, 
  Heart, 
  Calendar, 
  Award, 
  Bell, 
  Star,
  Trophy,
  Crown,
  Edit3,
  Shield,
  ChevronRight,
  Camera,
  MapPin,
  Phone,
  Mail,
  Zap,
  CreditCard,
  History,
  Plus,
  MoreVertical,
  Check,
  Trash2,
  Edit,
  AlertCircle
} from 'lucide-react';
import useAuthStore from '../../../stores/useAuthStore';
import useGamificationStore from '../../../stores/useGamificationStore';
import useAppStore from '../../../stores/useAppStore';
import usePaymentStore from '../../../stores/usePaymentStore';
import LevelProgressBar from '../../gamification/LevelProgressBar';
import ScreenErrorBoundary from '../../shared/ScreenErrorBoundary';
import PersonalImpactCard from './home/PersonalImpactCard';
import RecentActivityFeed from './home/RecentActivityFeed';
import { PLPColors } from '../../../constants/brandColors';
import { toast } from 'sonner';
import ConfirmationModal from '../../ui/ConfirmationModal';
import { 
  TEST_CARDS, 
  formatCardNumber, 
  formatExpiryDate, 
  detectCardType, 
  getCardTypeInfo,
  generateFutureExpiryDate,
  generateCVV,
  generateTestName,
  createPaymentMethodFromCard,
  isValidCardNumber
} from '../../../utils/testCardData';

// Payment Methods Management View
const PaymentMethodsView = ({ onBack, user }) => {
  const { 
    paymentMethods, 
    defaultPaymentMethod, 
    isLoading, 
    error,
    loadPaymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod
  } = usePaymentStore();

  const [showAddMethod, setShowAddMethod] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    loadPaymentMethods();
  }, []);

  const handleDeletePaymentMethod = async (paymentMethodId) => {
    const result = await deletePaymentMethod(paymentMethodId);
    if (result.success) {
      toast.success('Payment method deleted successfully');
      setShowDeleteConfirm(null);
    } else {
      toast.error('Failed to delete payment method');
    }
  };

  const handleSetDefault = async (paymentMethodId) => {
    const result = await setDefaultPaymentMethod(paymentMethodId);
    if (result.success) {
      toast.success('Default payment method updated');
    } else {
      toast.error('Failed to update default payment method');
    }
  };

  // Form handlers
  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const useTestCard = (cardKey) => {
    const testCard = TEST_CARDS[cardKey];
    setFormData({
      number: formatCardNumber(testCard.number),
      expiry: generateFutureExpiryDate(),
      cvv: generateCVV(cardKey),
      name: generateTestName()
    });
  };

  const resetForm = () => {
    setFormData({
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    });
    setShowAddMethod(false);
  };

  const handleSubmitPaymentMethod = async () => {
    if (!formData.number || !formData.expiry || !formData.cvv || !formData.name) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isValidCardNumber(formData.number)) {
      toast.error('Please enter a valid card number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const paymentMethodData = createPaymentMethodFromCard(formData);
      const result = await addPaymentMethod(paymentMethodData);
      
      if (result.success) {
        toast.success('Payment method added successfully!');
        resetForm();
      } else {
        toast.error(result.error || 'Failed to add payment method');
      }
    } catch (error) {
      toast.error('Error adding payment method');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPaymentMethodIcon = (type) => {
    switch (type) {
      case 'card':
        return <CreditCard size={20} />;
      case 'paypal':
        return <span style={{ fontSize: '1.2rem' }}>💰</span>;
      case 'bank':
        return <span style={{ fontSize: '1.2rem' }}>🏦</span>;
      default:
        return <CreditCard size={20} />;
    }
  };

  const formatPaymentMethod = (method) => {
    switch (method.type) {
      case 'card':
        return `•••• •••• •••• ${method.lastFour}`;
      case 'paypal':
        return method.email;
      case 'bank':
        return `${method.bankName} •••${method.lastFour}`;
      default:
        return method.displayName || 'Unknown';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        height: '100%',
        background: PLPColors.gradients.hero,
        overflow: 'auto'
      }}
    >
      <div style={{ padding: '1rem' }}>
        {/* Header */}
        <motion.div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: PLPColors.primary.navy,
              fontWeight: '600'
            }}
          >
            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
            Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddMethod(true)}
            style={{
              background: PLPColors.primary.blue,
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'white',
              fontWeight: '600'
            }}
          >
            <Plus size={16} />
            Add Method
          </motion.button>
        </motion.div>

        {/* Title */}
        <motion.div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '1rem'
          }}
        >
          <h1 style={{ 
            color: PLPColors.primary.navy, 
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CreditCard size={24} />
            Payment Methods
          </h1>
          <p style={{ color: PLPColors.neutral.gray600, margin: 0 }}>
            Manage your payment methods for quick donations
          </p>
        </motion.div>

        {/* Payment Methods List */}
        {isLoading ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: `3px solid ${PLPColors.primary.blue}`,
              borderTop: '3px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <p style={{ color: PLPColors.neutral.gray600 }}>Loading payment methods...</p>
          </div>
        ) : paymentMethods.length === 0 ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <CreditCard size={48} color={PLPColors.neutral.gray400} style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: PLPColors.primary.navy, marginBottom: '0.5rem' }}>No Payment Methods</h3>
            <p style={{ color: PLPColors.neutral.gray600, marginBottom: '1rem' }}>
              Add a payment method to enable quick donations
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddMethod(true)}
              style={{
                background: PLPColors.primary.blue,
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                color: 'white',
                fontWeight: '600'
              }}
            >
              Add Your First Payment Method
            </motion.button>
          </div>
        ) : (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1rem',
            padding: '1rem'
          }}>
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  background: method.isDefault 
                    ? PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)
                    : PLPColors.getColorWithOpacity(PLPColors.neutral.gray100, 0.5),
                  border: method.isDefault 
                    ? `2px solid ${PLPColors.primary.blue}` 
                    : '1px solid transparent',
                  borderRadius: '0.75rem',
                  position: 'relative'
                }}
              >
                <div style={{ marginRight: '1rem' }}>
                  {getPaymentMethodIcon(method.type)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    color: PLPColors.primary.navy,
                    marginBottom: '0.25rem'
                  }}>
                    {method.displayName}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: PLPColors.neutral.gray600 
                  }}>
                    {formatPaymentMethod(method)}
                  </div>
                </div>

                {method.isDefault && (
                  <div style={{
                    background: PLPColors.status.success,
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginRight: '0.5rem'
                  }}>
                    Default
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDeleteConfirm(method.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    color: PLPColors.neutral.gray500
                  }}
                >
                  <MoreVertical size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Payment Method Form */}
        {showAddMethod && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '1rem',
              padding: '2rem',
              marginTop: '1rem'
            }}
          >
            {/* Form Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <CreditCard size={48} color={PLPColors.primary.blue} style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: PLPColors.primary.navy, marginBottom: '0.5rem' }}>Add Payment Method</h3>
              <p style={{ color: PLPColors.neutral.gray600 }}>
                Add a test credit card for donation testing
              </p>
            </div>

            {/* Quick Test Cards */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ 
                color: PLPColors.primary.navy, 
                marginBottom: '1rem', 
                fontSize: '0.875rem',
                fontWeight: '600' 
              }}>
                Quick Test Cards
              </h4>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '0.5rem' 
              }}>
                {Object.entries(TEST_CARDS).map(([key, card]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => useTestCard(key)}
                    style={{
                      background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
                      border: `1px solid ${PLPColors.primary.blue}`,
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600',
                      color: PLPColors.primary.navy 
                    }}>
                      {card.brand}
                    </div>
                    <div style={{ 
                      fontSize: '0.625rem', 
                      color: PLPColors.neutral.gray600 
                    }}>
                      •••• {card.number.slice(-4)}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ marginBottom: '2rem' }}>
              {/* Card Number */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: PLPColors.primary.navy 
                }}>
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  maxLength={19}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${PLPColors.neutral.gray300}`,
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    background: 'white'
                  }}
                />
                {formData.number && (
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: PLPColors.primary.blue,
                    marginTop: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {getCardTypeInfo(detectCardType(formData.number)).icon}
                    {getCardTypeInfo(detectCardType(formData.number)).name}
                  </div>
                )}
              </div>

              {/* Expiry and CVV */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1rem',
                marginBottom: '1rem' 
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: PLPColors.primary.navy 
                  }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={(e) => handleInputChange('expiry', e.target.value)}
                    maxLength={5}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${PLPColors.neutral.gray300}`,
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: PLPColors.primary.navy 
                  }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    maxLength={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${PLPColors.neutral.gray300}`,
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  />
                </div>
              </div>

              {/* Name on Card */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: PLPColors.primary.navy 
                }}>
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${PLPColors.neutral.gray300}`,
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    background: 'white'
                  }}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetForm}
                disabled={isSubmitting}
                style={{
                  flex: 1,
                  background: PLPColors.neutral.gray200,
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  color: PLPColors.primary.navy,
                  fontWeight: '600',
                  opacity: isSubmitting ? 0.5 : 1
                }}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitPaymentMethod}
                disabled={isSubmitting || !formData.number || !formData.expiry || !formData.cvv || !formData.name}
                style={{
                  flex: 2,
                  background: isSubmitting || !formData.number || !formData.expiry || !formData.cvv || !formData.name
                    ? PLPColors.neutral.gray400
                    : PLPColors.primary.blue,
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  cursor: isSubmitting || !formData.number || !formData.expiry || !formData.cvv || !formData.name 
                    ? 'not-allowed' 
                    : 'pointer',
                  color: 'white',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add Payment Method
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                margin: '1rem',
                maxWidth: '300px',
                textAlign: 'center'
              }}
            >
              <AlertCircle size={48} color={PLPColors.status.error} style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: PLPColors.primary.navy, marginBottom: '0.5rem' }}>Delete Payment Method</h3>
              <p style={{ color: PLPColors.neutral.gray600, marginBottom: '1.5rem' }}>
                Are you sure you want to delete this payment method?
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(null)}
                  style={{
                    flex: 1,
                    background: PLPColors.neutral.gray200,
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    color: PLPColors.primary.navy,
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeletePaymentMethod(showDeleteConfirm)}
                  style={{
                    flex: 1,
                    background: PLPColors.status.error,
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    color: 'white',
                    fontWeight: '600'
                  }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const DonationHistoryView = ({ onBack, user }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    style={{
      height: '100%',
      background: PLPColors.gradients.hero,
      overflow: 'auto'
    }}
  >
    <div style={{ padding: '1rem' }}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          marginBottom: '1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: PLPColors.primary.navy,
          fontWeight: '600'
        }}
      >
        <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
        Back to Profile
      </motion.button>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '1rem',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <History size={48} color={PLPColors.primary.blue} style={{ marginBottom: '1rem' }} />
        <h1 style={{ color: PLPColors.primary.navy, marginBottom: '1rem' }}>Donation History</h1>
        <p style={{ color: PLPColors.neutral.gray600 }}>
          Donation history will be implemented soon.
        </p>
      </div>
    </div>
  </motion.div>
);

const MobileProfileContent = () => {
  const { user, logout, isLoading } = useAuthStore();
  const { dashboardStats } = useAppStore();
  const { 
    userProfile, 
    getUserLevel, 
    getLevelProgress, 
    getUserBadges,
    recentAchievements 
  } = useGamificationStore();
  
  const [editMode, setEditMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeView, setActiveView] = useState('profile'); // 'profile', 'payment-methods', 'donation-history'
  
  // Early return if user is null (during logout process)
  if (!user || isLoading || isLoggingOut) {
    return (
      <motion.div
        style={{
          height: '100%',
          background: PLPColors.gradients.hero,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ textAlign: 'center', color: PLPColors.neutral.white }}>
          <div style={{ 
            width: '3rem', 
            height: '3rem', 
            border: `3px solid ${PLPColors.neutral.white}`,
            borderTop: `3px solid transparent`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p>Loading profile...</p>
        </div>
      </motion.div>
    );
  }
  
  // Safe data access with fallbacks
  const currentLevel = getUserLevel() || { id: 1, name: 'Supporter', icon: '🤝', color: '#6B7280' };
  const levelProgress = getLevelProgress() || { progress: 0, pointsNeeded: 0, nextLevel: null };
  const userBadges = getUserBadges() || [];
  const safeUserProfile = userProfile || { totalPoints: 0, actions: {} };
  const safeRecentAchievements = recentAchievements || [];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (result && result.success) {
        toast.success('Successfully logged out', {
          icon: '👋',
          duration: 2000
        });
        setShowLogoutModal(false);
        // Don't reset loading state here - let the redirect handle it
      } else {
        throw new Error(result?.error || 'Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(`Logout failed: ${error.message}`, {
        icon: '❌',
        duration: 3000
      });
      setIsLoggingOut(false); // Only reset on error
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleBackToProfile = () => {
    setActiveView('profile');
  };

  const profileStats = [
    { 
      icon: Star, 
      label: 'Total Points', 
      value: safeUserProfile.totalPoints?.toLocaleString() || '0',
      color: PLPColors.primary.gold,
      background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1)
    },
    { 
      icon: Calendar, 
      label: 'Events Attended', 
      value: safeUserProfile.actions?.EVENT_ATTEND || 0,
      color: PLPColors.primary.blue,
      background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)
    },
    { 
      icon: Heart, 
      label: 'Donations Made', 
      value: safeUserProfile.actions?.FIRST_DONATION || 0,
      color: PLPColors.primary.blue,
      background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)
    },
    { 
      icon: Award, 
      label: 'Badges Earned', 
      value: userBadges.length || 0,
      color: PLPColors.primary.navy,
      background: PLPColors.getColorWithOpacity(PLPColors.primary.navy, 0.1)
    }
  ];

  const menuItems = [
    { icon: Edit3, label: 'Edit Profile', action: () => setEditMode(!editMode) },
    { icon: CreditCard, label: 'Payment Methods', action: () => setActiveView('payment-methods') },
    { icon: History, label: 'Donation History', action: () => setActiveView('donation-history') },
    { icon: Bell, label: 'Notifications', action: () => {}, badge: '3' },
    { icon: Settings, label: 'Account Settings', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', action: () => {} },
    { icon: LogOut, label: 'Sign Out', action: handleLogoutClick, danger: true }
  ];

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

  // Render different views based on activeView
  const renderView = () => {
    switch (activeView) {
      case 'payment-methods':
        return (
          <PaymentMethodsView 
            onBack={handleBackToProfile} 
            user={user}
          />
        );
      case 'donation-history':
        return (
          <DonationHistoryView 
            onBack={handleBackToProfile} 
            user={user}
          />
        );
      default:
        return renderProfileView();
    }
  };

  const renderProfileView = () => (
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
      {/* Profile Header */}
      <motion.div 
        variants={itemVariants}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '2rem 1rem 1.5rem',
          borderBottomLeftRadius: '2rem',
          borderBottomRightRadius: '2rem',
          marginBottom: '1rem',
          position: 'relative'
        }}
      >
        
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '120px',
          height: '120px',
          background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
          borderRadius: '50%',
          filter: 'blur(40px)',
        }} />
        
        <div style={{ textAlign: 'center', position: 'relative' }}>
          {/* Profile Picture */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              background: PLPColors.gradients.button,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: `0 8px 25px ${PLPColors.getColorWithOpacity(PLPColors.primary.navy, 0.2)}`
            }}>
              <User size={32} color={PLPColors.primary.navy} />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '1.5rem',
                height: '1.5rem',
                background: PLPColors.primary.gold,
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              <Camera size={12} color={PLPColors.neutral.white} />
            </motion.button>
          </div>
          
          {/* User Info */}
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: PLPColors.primary.navy,
            marginBottom: '0.25rem'
          }}>
            {user?.name || 'PLP Supporter'}
          </h1>
          
          <p style={{
            color: PLPColors.neutral.gray600,
            fontSize: '0.875rem',
            marginBottom: '0.5rem'
          }}>
            {user?.email || 'supporter@plp.bs'}
          </p>
          
          {/* Level Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: PLPColors.getColorWithOpacity(currentLevel?.color || PLPColors.primary.navy, 0.1),
            borderRadius: '1rem',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1rem' }}>{currentLevel?.icon}</span>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: PLPColors.primary.navy
            }}>
              Level {currentLevel?.id}: {currentLevel?.name}
            </span>
          </div>
          
          {/* Quick Info */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            fontSize: '0.75rem',
            color: PLPColors.neutral.gray500
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={12} />
              <span>Nassau, Bahamas</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={12} />
              <span>Joined {user?.memberSince ? new Date(user.memberSince).getFullYear() : '2024'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ padding: '0 1rem 5rem' }}>
        {/* Level Progress */}
        <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
          <LevelProgressBar
            currentLevel={currentLevel}
            progress={levelProgress.progress}
            pointsNeeded={levelProgress.pointsNeeded}
            nextLevel={levelProgress.nextLevel}
            totalPoints={safeUserProfile.totalPoints}
            showDetails={true}
          />
        </motion.div>

        {/* Personal Impact Card */}
        {userProfile && (
          <PersonalImpactCard
            userProfile={userProfile}
            dashboardStats={dashboardStats}
            currentLevel={currentLevel}
            itemVariants={itemVariants}
          />
        )}

        {/* Recent Activity Feed */}
        <RecentActivityFeed
          userProfile={userProfile}
          recentAchievements={recentAchievements}
          itemVariants={itemVariants}
        />


        {/* Recent Achievements */}
        {userBadges.length > 0 && (
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: PLPColors.neutral.white,
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Award size={20} color={PLPColors.primary.gold} />
              Achievements ({userBadges.length})
            </h2>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '1rem'
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {userBadges.slice(0, 6).map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`
                    }}
                  >
                    <span style={{ fontSize: '0.875rem' }}>{badge.icon}</span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: PLPColors.primary.navy
                    }}>
                      {badge.name}
                    </span>
                  </motion.div>
                ))}
                
                {userBadges.length > 6 && (
                  <div style={{
                    padding: '0.5rem 0.75rem',
                    background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
                    borderRadius: '0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: PLPColors.primary.navy
                  }}>
                    +{userBadges.length - 6} more
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Activity */}
        {safeRecentAchievements.length > 0 && (
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: PLPColors.neutral.white,
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Zap size={20} color={PLPColors.primary.gold} />
              Recent Activity
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {safeRecentAchievements.slice(0, 3).map((achievement, index) => (
                <div
                  key={achievement.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem'
                  }}>
                    {achievement.icon}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: PLPColors.primary.navy,
                      marginBottom: '0.125rem'
                    }}>
                      {achievement.title}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: PLPColors.neutral.gray600
                    }}>
                      {new Date(achievement.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Menu Items */}
        <motion.div variants={itemVariants}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            overflow: 'hidden'
          }}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={index}
                  whileHover={{ backgroundColor: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.05) }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    borderBottom: index !== menuItems.length - 1 
                      ? `1px solid ${PLPColors.getColorWithOpacity(PLPColors.neutral.gray200, 0.5)}` 
                      : 'none',
                    color: item.danger ? PLPColors.status.error : PLPColors.primary.navy
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={20} />
                    <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{item.label}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.badge && (
                      <div style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        background: PLPColors.status.error,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: PLPColors.neutral.white
                      }}>
                        {item.badge}
                      </div>
                    )}
                    {!item.danger && <ChevronRight size={16} color={PLPColors.neutral.gray400} />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out? You'll need to log in again to access your account."
        confirmText="Sign Out"
        cancelText="Cancel"
        variant="danger"
        icon={LogOut}
        isLoading={isLoggingOut}
      />
    </motion.div>
  );

  return renderView();
};

const MobileProfile = () => (
  <ScreenErrorBoundary screenName="Profile">
    <MobileProfileContent />
  </ScreenErrorBoundary>
);

export default MobileProfile;