import { useState } from 'react';
import { mockApi } from '../services/mockApi.js';

const DonationForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingName: '',
    billingEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || formData.amount < 5) {
      setMessage('Minimum donation amount is $5');
      return;
    }

    setLoading(true);
    try {
      const result = await mockApi.processDonation({
        amount: parseFloat(formData.amount),
        paymentMethod: formData.paymentMethod
      });

      if (result.success) {
        onSuccess(result.donation);
        setMessage(`Thank you for your $${formData.amount} donation! Confirmation: ${result.donation.confirmationNumber}`);
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      setMessage('Donation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="donation-overlay">
      <div className="donation-form">
        <div className="form-header">
          <h2 className="form-title">Make a Donation</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {message && (
          <div className={`message ${message.includes('failed') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Donation Amount</label>
            <div className="preset-amounts">
              {presetAmounts.map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={`preset-btn ${formData.amount == amount ? 'active' : ''}`}
                  onClick={() => handleInputChange('amount', amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              className="form-input"
              placeholder="Custom amount"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              min="5"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Payment Method</label>
            <select
              className="form-select"
              value={formData.paymentMethod}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
            >
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </div>

          {(formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'debit-card') && (
            <>
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  maxLength="19"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    maxLength="5"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    maxLength="4"
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="John Doe"
              value={formData.billingName}
              onChange={(e) => handleInputChange('billingName', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="john@example.com"
              value={formData.billingEmail}
              onChange={(e) => handleInputChange('billingEmail', e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Processing...' : `Donate $${formData.amount || '0'}`}
            </button>
          </div>
        </form>

        <div className="donation-info">
          <p><small>Your donation helps fund community programs and initiatives.</small></p>
          <p><small>Donations are processed securely and you will receive a confirmation email.</small></p>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;