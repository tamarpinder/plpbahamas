import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Play } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';

const UpcomingLiveEvents = ({ upcomingEvents, onNavigate, itemVariants }) => {
  if (!upcomingEvents || upcomingEvents.length === 0) return null;

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    if (isToday) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isTomorrow) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  const getTimeUntilEvent = (dateTime) => {
    const now = new Date();
    const eventTime = new Date(dateTime);
    const diffMs = eventTime - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `in ${diffHours}h ${diffMinutes}m`;
    } else if (diffMinutes > 0) {
      return `in ${diffMinutes}m`;
    } else {
      return 'starting soon';
    }
  };

  return (
    <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem'
      }}>
        <h2 style={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          color: PLPColors.neutral.white,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Play size={20} color={PLPColors.primary.gold} />
          Upcoming Live Events
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('events')}
          style={{
            background: 'none',
            border: 'none',
            color: PLPColors.primary.gold,
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          View All
        </motion.button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {upcomingEvents.slice(0, 2).map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('events')}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '0.75rem',
              padding: '1rem',
              border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`,
              cursor: 'pointer'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: PLPColors.neutral.white,
                  marginBottom: '0.25rem',
                  lineHeight: '1.3'
                }}>
                  {event.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.3'
                }}>
                  {event.description.length > 80 
                    ? `${event.description.substring(0, 80)}...` 
                    : event.description
                  }
                </p>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #DC2626, #EF4444)',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                marginLeft: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Play size={10} fill="currentColor" />
                LIVE
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={14} />
                {formatDateTime(event.date_time)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Users size={14} />
                {event.interested_count || 0} interested
              </div>
            </div>

            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              color: PLPColors.primary.gold,
              fontWeight: '500'
            }}>
              {getTimeUntilEvent(event.date_time)}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UpcomingLiveEvents;