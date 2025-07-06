import { useState } from 'react'
import { getCurrentUser } from '../data/mockUserGamified.js'
import { mockCampaigns, getDonationMilestone, getNextDonationMilestone } from '../data/mockDonations.js'
import gamificationService from '../services/gamificationService.js'

function DonationFormMobile({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    amount: '',
    campaignId: 1,
    paymentMethod: 'credit_card',
    isRecurring: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0])
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationData, setCelebrationData] = useState(null)
  
  const currentUser = getCurrentUser()
  const predefinedAmounts = [25, 50, 100, 250, 500]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleCampaignChange = (campaignId) => {
    const campaign = mockCampaigns.find(c => c.id === campaignId)
    setSelectedCampaign(campaign)
    setFormData(prev => ({ ...prev, campaignId }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      // Award points for donation
      const donationResult = gamificationService.awardPoints('donation', { 
        amount: parseFloat(formData.amount) 
      })

      setIsSubmitting(false)
      
      // Show celebration message
      if (donationResult && (donationResult.level_up || donationResult.badges_earned.length > 0)) {
        setCelebrationData(donationResult)
        setShowCelebration(true)
        
        // Auto-hide celebration after 3 seconds
        setTimeout(() => {
          setShowCelebration(false)
        }, 3000)
      }

      onSuccess({
        ...formData,
        gamification: donationResult
      })
      
      setTimeout(() => {
        onClose()
      }, showCelebration ? 3500 : 500)
    }, 2000)
  }

  // Get milestone info
  const nextMilestone = getNextDonationMilestone(currentUser?.total_donations || 0)
  const previewMilestone = formData.amount ? 
    getDonationMilestone((currentUser?.total_donations || 0) + parseFloat(formData.amount)) : null

  const getCampaignProgress = (campaign) => {
    return Math.min((campaign.current_amount / campaign.goal_amount) * 100, 100)
  }

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: '90%', maxHeight: '85%', overflowY: 'auto' }}>
        <div className="modal-header">
          <h2 className="modal-title">💰 Donate to PLP</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Celebration Banner */}
        {showCelebration && celebrationData && (
          <div className="celebration-banner" style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: 'white',
            padding: '1rem',
            margin: '0 -1.5rem 1rem -1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎉</div>
            {celebrationData.level_up && (
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                Level Up! You're now a {celebrationData.new_level.name}!
              </div>
            )}
            {celebrationData.badges_earned.length > 0 && (
              <div style={{ fontSize: '0.875rem' }}>
                Badge Unlocked: {celebrationData.badges_earned[0].name} {celebrationData.badges_earned[0].icon}
              </div>
            )}
            <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              +{celebrationData.points_earned} PLP Points!
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="donation-form">
          {/* User Progress (if logged in) */}
          {currentUser && !currentUser.isGuest && (
            <div className="user-progress" style={{
              background: 'linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 100%)',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              border: '1px solid #93C5FD'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>Your Impact</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    ${(currentUser.total_donations || 0).toLocaleString()} donated
                  </div>
                </div>
                <div style={{ fontSize: '1.5rem' }}>
                  {currentUser.level_name === 'Legend' ? '👑' : 
                   currentUser.level_name === 'Guardian' ? '🛡️' :
                   currentUser.level_name === 'Ambassador' ? '🏆' : '⭐'}
                </div>
              </div>
              
              {nextMilestone && (
                <div>
                  <div style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    Next milestone: {nextMilestone.celebration}
                  </div>
                  <div style={{ 
                    width: '100%', 
                    backgroundColor: '#E5E7EB', 
                    borderRadius: '0.25rem', 
                    height: '0.25rem' 
                  }}>
                    <div style={{ 
                      width: `${Math.min(((currentUser.total_donations || 0) / nextMilestone.amount) * 100, 100)}%`,
                      backgroundColor: '#3B82F6',
                      height: '100%',
                      borderRadius: '0.25rem'
                    }} />
                  </div>
                </div>
              )}

              {formData.amount && previewMilestone && (
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: '#FEF3C7',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem'
                }}>
                  ✨ This donation unlocks: {previewMilestone.celebration}
                </div>
              )}
            </div>
          )}

          {/* Campaign Selection */}
          <div className="form-group">
            <label className="form-label">Campaign</label>
            <select
              name="campaignId"
              className="form-select"
              value={formData.campaignId}
              onChange={(e) => handleCampaignChange(parseInt(e.target.value))}
            >
              {mockCampaigns.slice(0, 3).map(campaign => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>
            
            {/* Campaign Progress */}
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                Progress: ${selectedCampaign.current_amount.toLocaleString()} / ${selectedCampaign.goal_amount.toLocaleString()}
              </div>
              <div style={{ 
                width: '100%', 
                backgroundColor: '#E5E7EB', 
                borderRadius: '0.25rem', 
                height: '0.5rem' 
              }}>
                <div style={{ 
                  width: `${getCampaignProgress(selectedCampaign)}%`,
                  backgroundColor: '#10B981',
                  height: '100%',
                  borderRadius: '0.25rem'
                }} />
              </div>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="form-group">
            <label className="form-label">Amount ($)</label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '0.5rem', 
              marginBottom: '0.5rem' 
            }}>
              {predefinedAmounts.map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={`btn ${formData.amount == amount ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                  style={{ fontSize: '0.875rem', padding: '0.5rem' }}
                >
                  ${amount}
                </button>
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

          {/* Points Preview */}
          {formData.amount && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#DBEAFE',
              borderRadius: '0.5rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.25rem' }}>🎯</span>
              <span style={{ fontSize: '0.875rem' }}>
                Earn <strong>{parseFloat(formData.amount)} PLP Points</strong>
              </span>
            </div>
          )}

          {/* Payment Method */}
          <div className="form-group">
            <label className="form-label">Payment</label>
            <select
              name="paymentMethod"
              className="form-select"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="credit_card">💳 Credit Card</option>
              <option value="paypal">💰 PayPal</option>
              <option value="bank_transfer">🏦 Bank Transfer</option>
            </select>
          </div>

          {/* Recurring Option */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleInputChange}
              />
              <span style={{ fontSize: '0.875rem' }}>Monthly recurring donation 🔄</span>
            </label>
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ 
                background: isSubmitting ? '#9CA3AF' : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
              }}
            >
              {isSubmitting ? '🔄 Processing...' : `💝 Donate $${formData.amount || '0'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DonationFormMobile