import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Star, TrendingUp, Filter, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { PLPColors, PLPShadows } from '@/constants/brandColors';
import useAppStore from '@/stores/useAppStore';
import useGamificationStore from '@/stores/useGamificationStore';
import { toast } from 'sonner';

const MobileEvents = () => {
  const { events, rsvpEvent } = useAppStore();
  const { awardUserPoints } = useGamificationStore();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedEvents, setExpandedEvents] = useState(new Set());
  
  const eventTypes = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'Town Hall', name: 'Town Halls', icon: Users },
    { id: 'Rally', name: 'Rallies', icon: TrendingUp },
    { id: 'Community', name: 'Community', icon: Star }
  ];

  const handleRSVP = async (eventId, eventTitle) => {
    await rsvpEvent(eventId, 'rsvp');
    awardUserPoints('RSVP_EVENT');
    toast.success(`RSVP confirmed! +15 points`, {
      icon: '🎉',
      duration: 3000,
      description: `See you at ${eventTitle}!`
    });
  };

  const toggleEventExpansion = (eventId) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const filteredEvents = selectedFilter === 'all' 
    ? events 
    : events.filter(event => event.event_type === selectedFilter);

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
          padding: '1.5rem 1rem 1rem',
          borderBottomLeftRadius: '1.5rem',
          borderBottomRightRadius: '1.5rem',
          border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.neutral.white, 0.2)}`,
          boxShadow: PLPShadows.glass,
          marginBottom: '1rem'
        }}
      >
        <motion.h1 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: PLPColors.primary.navy,
            marginBottom: '0.5rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <Calendar size={24} color={PLPColors.primary.gold} />
          PLP Events
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            color: PLPColors.neutral.gray600,
            fontSize: '0.875rem',
            textAlign: 'center',
            marginBottom: '1rem'
          }}
        >
          Join us at upcoming community events
        </motion.p>

        {/* Event Type Filter */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}
        >
          {eventTypes.map((type, index) => {
            const Icon = type.icon;
            const isActive = selectedFilter === type.id;
            return (
              <motion.button
                key={type.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedFilter(type.id)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive 
                    ? PLPColors.primary.gold 
                    : 'rgba(255, 255, 255, 0.7)',
                  color: isActive 
                    ? PLPColors.neutral.white 
                    : PLPColors.primary.navy,
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Icon size={16} />
                {type.name}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      <div style={{ padding: '0 1rem 5rem' }}>
        {/* Events List */}
        <motion.div 
          variants={itemVariants}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {filteredEvents.map((event, index) => {
            const isExpanded = expandedEvents.has(event.id);
            return (
            <motion.div 
              key={event.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, height: 'auto' }}
              transition={{ delay: 0.8 + (index * 0.15) }}
              whileHover={{ scale: 1.01 }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                padding: '1.25rem',
                border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`,
                boxShadow: PLPShadows.md,
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}
            >
              {/* Header Section - Always Visible */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontWeight: '700',
                    color: PLPColors.primary.navy,
                    marginBottom: '0.5rem',
                    fontSize: '1.125rem',
                    lineHeight: '1.3'
                  }}>
                    {event.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: PLPColors.neutral.gray600,
                    lineHeight: '1.4',
                    marginBottom: '1rem',
                    display: isExpanded ? 'block' : '-webkit-box',
                    WebkitLineClamp: isExpanded ? 'unset' : 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {event.description}
                  </p>
                </div>
                {event.is_live_streamed && (
                  <motion.span 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + (index * 0.15) }}
                    style={{
                      background: PLPColors.status.error,
                      color: PLPColors.neutral.white,
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      marginLeft: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    • Live
                  </motion.span>
                )}
              </div>
              
              {/* Essential Info Grid - Always Visible */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.15),
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Calendar size={14} color={PLPColors.primary.navy} />
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    color: PLPColors.neutral.gray600,
                    fontWeight: '500'
                  }}>{new Date(event.date_time).toLocaleDateString()}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.15),
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Clock size={14} color={PLPColors.primary.navy} />
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    color: PLPColors.neutral.gray600,
                    fontWeight: '500'
                  }}>{new Date(event.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', gridColumn: '1 / -1' }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: PLPColors.getColorWithOpacity(PLPColors.status.info, 0.15),
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin size={14} color={PLPColors.primary.navy} />
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    color: PLPColors.neutral.gray600,
                    fontWeight: '500',
                    lineHeight: '1.4',
                    wordBreak: 'break-word'
                  }}>{event.location}</span>
                </div>
              </div>
              
              {/* View Details Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleEventExpansion(event.id)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.7)',
                  border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.2)}`,
                  borderRadius: '0.75rem',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: PLPColors.primary.navy,
                  transition: 'all 0.2s ease',
                  marginBottom: '1rem'
                }}
              >
                {isExpanded ? 'Hide Details' : 'View Details'}
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </motion.button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    {/* Additional Event Details */}
                    <div style={{
                      background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.02),
                      borderRadius: '1rem',
                      padding: '1rem',
                      marginBottom: '1rem'
                    }}>
                      {/* Agenda Section */}
                      {event.agenda && event.agenda.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: PLPColors.primary.navy,
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <Clock size={16} color={PLPColors.primary.gold} />
                            Agenda
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {event.agenda.map((item, agendaIndex) => (
                              <div key={agendaIndex} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem',
                                padding: '0.5rem',
                                background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.05),
                                borderRadius: '0.5rem'
                              }}>
                                <span style={{
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  color: PLPColors.primary.gold,
                                  minWidth: '3rem'
                                }}>
                                  {item.time}
                                </span>
                                <span style={{
                                  fontSize: '0.875rem',
                                  color: PLPColors.primary.navy,
                                  lineHeight: '1.4'
                                }}>
                                  {item.item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Speakers Section */}
                      {event.speakers && event.speakers.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: PLPColors.primary.navy,
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <Users size={16} color={PLPColors.primary.gold} />
                            Speakers
                          </h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {event.speakers.map((speaker, speakerIndex) => (
                              <span key={speakerIndex} style={{
                                background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
                                color: PLPColors.primary.navy,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '1rem',
                                fontSize: '0.75rem',
                                fontWeight: '500'
                              }}>
                                {speaker}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contact Info */}
                      {event.contact_email && (
                        <div style={{ marginBottom: '1rem' }}>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: PLPColors.primary.navy,
                            marginBottom: '0.5rem'
                          }}>
                            Contact
                          </h4>
                          <p style={{
                            fontSize: '0.875rem',
                            color: PLPColors.neutral.gray600,
                            lineHeight: '1.4'
                          }}>
                            {event.organizer && `${event.organizer} • `}
                            {event.contact_email}
                            {event.contact_phone && ` • ${event.contact_phone}`}
                          </p>
                        </div>
                      )}

                      {/* Additional Stats */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.75rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '2rem',
                            height: '2rem',
                            background: PLPColors.getColorWithOpacity(PLPColors.status.success, 0.15),
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Users size={14} color={PLPColors.primary.navy} />
                          </div>
                          <span style={{
                            fontSize: '0.875rem',
                            color: PLPColors.neutral.gray600,
                            fontWeight: '500'
                          }}>{event.attending_count} attending</span>
                        </div>
                        
                        {event.max_capacity && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                              width: '2rem',
                              height: '2rem',
                              background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.15),
                              borderRadius: '0.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Star size={14} color={PLPColors.primary.navy} />
                            </div>
                            <span style={{
                              fontSize: '0.875rem',
                              color: PLPColors.neutral.gray600,
                              fontWeight: '500'
                            }}>Max {event.max_capacity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
                  borderRadius: '0.75rem'
                }}>
                  <Star size={14} color={PLPColors.primary.gold} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: PLPColors.primary.navy
                  }}>+15 points</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRSVP(event.id, event.title)}
                  style={{
                    flex: 1,
                    background: PLPColors.gradients.button,
                    border: 'none',
                    borderRadius: '1rem',
                    color: PLPColors.primary.navy,
                    fontSize: '1rem',
                    fontWeight: '700',
                    padding: '0.875rem 1.5rem',
                    cursor: 'pointer',
                    boxShadow: PLPShadows.md,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  RSVP Now
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileEvents;