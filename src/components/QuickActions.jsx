import React from 'react';
import { motion } from 'framer-motion';

const QuickActions = ({ onDonate, onVolunteer, onEvents, user }) => {
  const quickActionButtons = [
    {
      id: 'donate',
      icon: '💰',
      title: 'Quick Donate',
      subtitle: user?.paymentMethod ? 'Instant donation' : 'Add payment method',
      color: 'from-green-500 to-emerald-600',
      action: onDonate
    },
    {
      id: 'volunteer',
      icon: '🤝',
      title: 'Volunteer',
      subtitle: 'Find opportunities',
      color: 'from-blue-500 to-blue-600',
      action: onVolunteer
    },
    {
      id: 'events',
      icon: '📅',
      title: 'Events',
      subtitle: 'RSVP to events',
      color: 'from-purple-500 to-purple-600',
      action: onEvents
    }
  ];

  return (
    <div className="quick-actions-section" style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ 
        fontSize: '1.1rem', 
        fontWeight: '600', 
        marginBottom: '1rem',
        color: '#1F2937'
      }}>
        Quick Actions
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '0.75rem' 
      }}>
        {quickActionButtons.map((button, index) => (
          <motion.button
            key={button.id}
            className="quick-action-btn"
            onClick={button.action}
            style={{
              background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              backgroundImage: `linear-gradient(135deg, ${button.color.split(' ')[1]}, ${button.color.split(' ')[3]})`,
              border: 'none',
              borderRadius: '1rem',
              padding: '1rem 0.5rem',
              color: 'white',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div style={{ fontSize: '1.5rem' }}>{button.icon}</div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                {button.title}
              </div>
              <div style={{ fontSize: '0.6rem', opacity: 0.9 }}>
                {button.subtitle}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;