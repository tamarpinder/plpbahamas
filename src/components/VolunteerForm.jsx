import { useState } from 'react';
import { mockApi } from '../services/mockApi.js';

const VolunteerForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    district: '',
    interests: [],
    availability: '',
    experience: '',
    skills: '',
    transportation: false,
    backgroundCheck: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const volunteerInterests = [
    'Canvassing',
    'Phone Banking', 
    'Event Setup',
    'Social Media',
    'Data Entry',
    'Community Outreach',
    'Fundraising',
    'Youth Programs',
    'Senior Services',
    'Environmental Projects'
  ];

  const availabilityOptions = [
    'Weekday Mornings',
    'Weekday Afternoons', 
    'Weekday Evenings',
    'Weekend Mornings',
    'Weekend Afternoons',
    'Weekend Evenings',
    'Flexible/As Needed'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      setMessage('Please fill in all required fields');
      return;
    }

    if (formData.interests.length === 0) {
      setMessage('Please select at least one area of interest');
      return;
    }

    setLoading(true);
    try {
      const result = await mockApi.submitVolunteerApplication(formData);
      
      if (result.success) {
        setMessage('Thank you for volunteering! We will contact you soon with opportunities.');
        onSuccess(result.application);
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      setMessage('Application failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="volunteer-overlay">
      <div className="volunteer-form">
        <div className="form-header">
          <h2 className="form-title">Volunteer with PLP</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {message && (
          <div className={`message ${message.includes('failed') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              className="form-input"
              placeholder="(242) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-input"
                placeholder="18"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                min="16"
                max="100"
              />
            </div>
            <div className="form-group">
              <label className="form-label">District</label>
              <select
                className="form-select"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
              >
                <option value="">Select District</option>
                <option value="Nassau Central">Nassau Central</option>
                <option value="Nassau East">Nassau East</option>
                <option value="Nassau West">Nassau West</option>
                <option value="Freeport">Freeport</option>
                <option value="Eleuthera">Eleuthera</option>
                <option value="Abaco">Abaco</option>
                <option value="Exuma">Exuma</option>
                <option value="Andros">Andros</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Areas of Interest * (Select all that apply)</label>
            <div className="interests-grid">
              {volunteerInterests.map(interest => (
                <label key={interest} className="interest-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Availability</label>
            <select
              className="form-select"
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
            >
              <option value="">Select Availability</option>
              {availabilityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Previous Volunteer Experience</label>
            <textarea
              className="form-textarea"
              placeholder="Describe any relevant volunteer or community service experience..."
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Special Skills or Talents</label>
            <textarea
              className="form-textarea"
              placeholder="Any special skills that might be helpful (languages, technical skills, etc.)..."
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              rows="2"
            />
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.transportation}
                  onChange={(e) => handleInputChange('transportation', e.target.checked)}
                />
                <span>I have reliable transportation</span>
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.backgroundCheck}
                  onChange={(e) => handleInputChange('backgroundCheck', e.target.checked)}
                />
                <span>I consent to a background check if required</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>

        <div className="volunteer-info">
          <p><small>Thank you for your interest in volunteering with the PLP!</small></p>
          <p><small>We will review your application and contact you with volunteer opportunities that match your interests and availability.</small></p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;