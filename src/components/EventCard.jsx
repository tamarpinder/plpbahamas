import React, { useState } from 'react';

const EventCard = ({ event, onRSVP }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRSVPing, setIsRSVPing] = useState(false);

  const formatEventDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const handleRSVP = async (action) => {
    setIsRSVPing(true);
    try {
      await onRSVP(event.id, action);
    } finally {
      setIsRSVPing(false);
    }
  };

  // Check if description is long enough to warrant read more functionality
  const shouldShowReadMore = event.description && event.description.length > 150;
  const displayDescription = isExpanded ? event.description : 
    (shouldShowReadMore ? event.description.substring(0, 150) + '...' : event.description);

  return (
    <div className="event-card">
      <div 
        className="event-type-badge"
        style={{ background: getEventTypeColor(event.event_type) }}
      >
        {event.event_type}
      </div>
      
      <h3 className="event-title">{event.title}</h3>
      
      <div className={`event-description ${isExpanded ? 'expanded' : ''}`}>
        {displayDescription}
      </div>
      
      {shouldShowReadMore && (
        <button 
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}

      <div className="event-details">
        <div className="event-detail-item">
          <span className="event-detail-icon">📅</span>
          <span>{formatEventDateTime(event.date_time)}</span>
        </div>
        
        <div className="event-detail-item">
          <span className="event-detail-icon">📍</span>
          <span>{event.location}</span>
        </div>
        
        {event.address && (
          <div className="event-detail-item">
            <span className="event-detail-icon">🏢</span>
            <span>{event.address}</span>
          </div>
        )}

        {event.cost && (
          <div className="event-detail-item">
            <span className="event-detail-icon">💰</span>
            <span>{event.cost}</span>
          </div>
        )}
      </div>

      {event.is_live_streamed && (
        <div className="event-live-indicator">
          <span>🔴</span>
          <span>Live Streamed</span>
        </div>
      )}

      <div className="event-attendance">
        <div className="attendance-item">
          <span>⭐</span>
          <span>{event.interested_count} interested</span>
        </div>
        <div className="attendance-item">
          <span>✅</span>
          <span>{event.attending_count} attending</span>
        </div>
        {event.max_capacity && (
          <div className="attendance-item">
            <span>👥</span>
            <span>{event.max_capacity} capacity</span>
          </div>
        )}
      </div>

      <div className="event-actions">
        <button 
          className="event-btn event-btn-primary"
          onClick={() => handleRSVP('rsvp')}
          disabled={isRSVPing}
        >
          {isRSVPing ? 'Processing...' : '🎉 RSVP'}
        </button>
        
        <button 
          className="event-btn event-btn-secondary"
          onClick={() => handleRSVP('interested')}
          disabled={isRSVPing}
        >
          ⭐ Interested
        </button>
      </div>

      {/* Optional: Show agenda if available */}
      {event.agenda && event.agenda.length > 0 && isExpanded && (
        <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-color)' }}>
          <h4 style={{ margin: '0 0 var(--space-2) 0', color: 'var(--primary)', fontSize: '1rem' }}>Event Agenda</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {event.agenda.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: 'var(--space-3)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--aquamarine)', fontWeight: '600', minWidth: '60px' }}>{item.time}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{item.item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get event type colors
const getEventTypeColor = (type) => {
  const colors = {
    'Rally': 'linear-gradient(135deg, #0066CC 0%, #003366 100%)',
    'Forum': 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    'Town Hall': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    'Summit': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    'Information Session': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    'Workshop': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)'
  };
  return colors[type] || 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
};

export default EventCard;