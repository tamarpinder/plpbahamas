import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockCampaigns, getDonationMilestone, getNextDonationMilestone } from '../data/mockDonations.js';
import { getCurrentUser } from '../data/mockUserGamified.js';
import gamificationService from '../services/gamificationService.js';
import CelebrationModal from './gamification/CelebrationModal.jsx';

function DonationFormGamified({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    amount: '',
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: 'credit_card',
    isRecurring: false,
    frequency: 'monthly',
    isAnonymous: false,
    message: '',
    campaignId: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0]);
  
  const currentUser = getCurrentUser();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCampaignChange = (campaignId) => {
    const campaign = mockCampaigns.find(c => c.id === campaignId);
    setSelectedCampaign(campaign);
    setFormData(prev => ({ ...prev, campaignId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Award points for donation
      const donationResult = gamificationService.awardPoints('donation', { 
        amount: parseFloat(formData.amount) 
      });

      setIsSubmitting(false);
      
      // Show celebration if significant achievement
      if (donationResult && (donationResult.level_up || donationResult.badges_earned.length > 0)) {
        setCelebrationData(donationResult);
        setShowCelebration(true);
      }

      onSuccess(formData);
      
      // Don't close immediately if showing celebration
      if (!showCelebration) {
        onClose();
      }
    }, 2000);
  };

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  // Get current milestone info
  const currentMilestone = getDonationMilestone(currentUser?.total_donations || 0);
  const nextMilestone = getNextDonationMilestone(currentUser?.total_donations || 0);

  // Preview what milestone the donation would unlock
  const previewMilestone = formData.amount ? 
    getDonationMilestone((currentUser?.total_donations || 0) + parseFloat(formData.amount)) : null;

  const getCampaignProgress = (campaign) => {
    return Math.min((campaign.current_amount / campaign.goal_amount) * 100, 100);
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    setCelebrationData(null);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal donation-modal" style={{ maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="modal-header">
            <h2>💰 Make a Donation</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="donation-form">
            {/* Campaign Selection */}
            <div className="form-group">
              <label className="form-label">Select Campaign</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {mockCampaigns.slice(0, 3).map(campaign => (
                  <motion.div
                    key={campaign.id}
                    className={`campaign-card ${selectedCampaign?.id === campaign.id ? 'selected' : ''}`}
                    onClick={() => handleCampaignChange(campaign.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '1rem',
                      border: `2px solid ${selectedCampaign?.id === campaign.id ? '#3B82F6' : '#E5E7EB'}`,
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      backgroundColor: selectedCampaign?.id === campaign.id ? '#EBF8FF' : '#F9FAFB'
                    }}
                  >
                    <div style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {campaign.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                      {campaign.description.substring(0, 60)}...
                    </div>
                    <div>
                      <div style={{ 
                        width: '100%', 
                        backgroundColor: '#E5E7EB', 
                        borderRadius: '0.25rem', 
                        height: '0.5rem', 
                        marginBottom: '0.25rem' 
                      }}>
                        <div 
                          style={{ 
                            width: `${getCampaignProgress(campaign)}%`,
                            backgroundColor: '#10B981',
                            height: '100%',
                            borderRadius: '0.25rem'
                          }}
                        />
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#374151' }}>
                        ${campaign.current_amount.toLocaleString()} / ${campaign.goal_amount.toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current Milestone Status */}
            {currentUser && !currentUser.isGuest && (
              <motion.div
                style={{
                  padding: '1rem',
                  backgroundColor: '#F0F9FF',
                  borderRadius: '0.5rem',
                  border: '1px solid #0284C7',
                  marginBottom: '1rem'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏆</span>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>Your Donation Journey</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                      Total Donated: ${(currentUser.total_donations || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {nextMilestone && (
                  <div>
                    <div style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                      Next: {nextMilestone.celebration} at ${nextMilestone.amount}
                    </div>
                    <div style={{ 
                      width: '100%', 
                      backgroundColor: '#E5E7EB', 
                      borderRadius: '0.25rem', 
                      height: '0.25rem' 
                    }}>
                      <div 
                        style={{ 
                          width: `${Math.min(((currentUser.total_donations || 0) / nextMilestone.amount) * 100, 100)}%`,
                          backgroundColor: '#0284C7',
                          height: '100%',
                          borderRadius: '0.25rem'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Preview milestone unlock */}
                {formData.amount && previewMilestone && 
                 previewMilestone.amount > (currentMilestone?.amount || 0) && (
                  <motion.div
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      backgroundColor: '#FEF3C7',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <span>✨</span>
                    This donation will unlock: {previewMilestone.celebration}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Amount Selection */}
            <div className="form-group">
              <label className="form-label">Donation Amount ($)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {predefinedAmounts.map(amount => (
                  <motion.button
                    key={amount}
                    type="button"
                    className={`btn ${formData.amount == amount ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontSize: '0.875rem', padding: '0.5rem' }}
                  >
                    ${amount}
                  </motion.button>
                ))}
              </div>
              <input
                type="number"
                name="amount"
                className="form-input"
                placeholder="Custom amount"
                value={formData.amount}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            {/* Gamification Preview */}
            {formData.amount && (
              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  backgroundColor: '#DBEAFE',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div style={{ fontSize: '1.25rem' }}>🎯</div>
                <div style={{ fontSize: '0.875rem' }}>
                  This donation will earn you <strong>{parseFloat(formData.amount)} PLP Points</strong>
                </div>
              </motion.div>
            )}

            {/* Personal Information */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-input"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Payment Method */}
            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <select
                name="paymentMethod"
                className="form-select"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="credit_card">💳 Credit Card</option>
                <option value="debit_card">💳 Debit Card</option>
                <option value="paypal">💰 PayPal</option>
                <option value="bank_transfer">🏦 Bank Transfer</option>
              </select>
            </div>

            {/* Recurring Donation */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleInputChange}
                />
                Make this a recurring donation 🔄
              </label>
            </div>

            <AnimatePresence>
              {formData.isRecurring && (
                <motion.div
                  className="form-group"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <label className="form-label">Frequency</label>
                  <select
                    name="frequency"
                    className="form-select"
                    value={formData.frequency}
                    onChange={handleInputChange}
                  >
                    <option value="monthly">📅 Monthly</option>
                    <option value="quarterly">📅 Quarterly</option>
                    <option value="yearly">📅 Yearly</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Anonymous Option */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleInputChange}
                />
                Make this donation anonymous 🕶️
              </label>
            </div>

            {/* Message */}
            <div className="form-group">
              <label className="form-label">Message (optional)</label>
              <textarea
                name="message"
                className="form-textarea"
                rows="3"
                placeholder="Share why you're supporting the PLP..."
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? '🔄 Processing...' : `💝 Donate $${formData.amount || '0'}`}
              </motion.button>
            </div>
          </form>
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={handleCelebrationClose}
        celebrationData={celebrationData}
      />
    </>
  );
}

export default DonationFormGamified;