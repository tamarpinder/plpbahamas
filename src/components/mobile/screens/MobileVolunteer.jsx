import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ChevronRight, 
  Heart,
  Award,
  Target,
  TrendingUp
} from 'lucide-react';
import { PLPColors } from '../../../constants/brandColors';
import useGamificationStore from '../../../stores/useGamificationStore';
import { toast } from 'sonner';

const MobileVolunteer = () => {
  const { awardUserPoints, userProfile } = useGamificationStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: Users },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'community', name: 'Community', icon: Heart },
    { id: 'campaign', name: 'Campaign', icon: Target }
  ];

  const volunteerOpportunities = [
    {
      id: 1,
      title: 'Campaign Door-to-Door Canvassing',
      category: 'campaign',
      location: 'Nassau East',
      date: 'Nov 15, 2024',
      time: '9:00 AM - 5:00 PM',
      volunteers: 12,
      maxVolunteers: 20,
      description: 'Join our team for door-to-door canvassing to connect with voters in Nassau East.',
      requirements: ['Good communication skills', 'Comfortable walking'],
      points: 40,
      difficulty: 'Medium',
      organizer: 'Campaign Team'
    },
    {
      id: 2,
      title: 'Community Clean-Up Drive',
      category: 'community',
      location: 'Cable Beach',
      date: 'Nov 18, 2024',
      time: '7:00 AM - 12:00 PM',
      volunteers: 8,
      maxVolunteers: 15,
      description: 'Help beautify our community by participating in a beach and neighborhood clean-up.',
      requirements: ['Comfortable with outdoor work', 'Bring water bottle'],
      points: 25,
      difficulty: 'Easy',
      organizer: 'Environmental Committee'
    },
    {
      id: 3,
      title: 'Youth Mentorship Program',
      category: 'community',
      location: 'Various Schools',
      date: 'Ongoing',
      time: 'Flexible',
      volunteers: 5,
      maxVolunteers: 10,
      description: 'Mentor young Bahamians in leadership, civic engagement, and career development.',
      requirements: ['Background check required', 'Commitment for 3 months'],
      points: 50,
      difficulty: 'High',
      organizer: 'Youth Development'
    },
    {
      id: 4,
      title: 'Town Hall Setup & Support',
      category: 'events',
      location: 'British Colonial Hilton',
      date: 'Nov 22, 2024',
      time: '4:00 PM - 10:00 PM',
      volunteers: 15,
      maxVolunteers: 25,
      description: 'Assist with setup, registration, and support for our monthly town hall meeting.',
      requirements: ['Punctual', 'Customer service oriented'],
      points: 30,
      difficulty: 'Easy',
      organizer: 'Events Team'
    },
    {
      id: 5,
      title: 'Digital Campaign Content Creation',
      category: 'campaign',
      location: 'Remote/Home',
      date: 'Ongoing',
      time: 'Flexible',
      volunteers: 3,
      maxVolunteers: 8,
      description: 'Create social media content, graphics, and help manage our digital presence.',
      requirements: ['Social media experience', 'Basic design skills preferred'],
      points: 35,
      difficulty: 'Medium',
      organizer: 'Digital Team'
    }
  ];

  const myVolunteerStats = {
    hoursCompleted: userProfile?.actions?.VOLUNTEER_HOURS || 0,
    eventsAttended: userProfile?.actions?.VOLUNTEER_COMPLETE || 0,
    pointsEarned: userProfile?.totalPoints || 0,
    currentLevel: 'Active Volunteer'
  };

  const filteredOpportunities = selectedCategory === 'all' 
    ? volunteerOpportunities 
    : volunteerOpportunities.filter(opp => opp.category === selectedCategory);

  const handleSignUp = (opportunity) => {
    awardUserPoints('VOLUNTEER_SIGNUP');
    toast.success(`Signed up for ${opportunity.title}!`, {
      icon: '🤝',
      duration: 3000,
      description: `+${opportunity.points} points when completed`
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return PLPColors.status.success;
      case 'Medium': return PLPColors.primary.gold;
      case 'High': return PLPColors.status.error;
      default: return PLPColors.neutral.gray500;
    }
  };

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
          marginBottom: '1rem'
        }}
      >
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: PLPColors.primary.navy,
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          Volunteer Hub
        </h1>
        <p style={{
          color: PLPColors.neutral.gray600,
          fontSize: '0.875rem',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          Make a difference in your community
        </p>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem'
        }}>
          <div style={{
            background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
            borderRadius: '0.75rem',
            padding: '0.75rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: PLPColors.primary.navy,
              marginBottom: '0.25rem'
            }}>
              {myVolunteerStats.hoursCompleted}
            </div>
            <div style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
              Hours Completed
            </div>
          </div>
          
          <div style={{
            background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
            borderRadius: '0.75rem',
            padding: '0.75rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: PLPColors.primary.navy,
              marginBottom: '0.25rem'
            }}>
              {myVolunteerStats.eventsAttended}
            </div>
            <div style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
              Events Completed
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ padding: '0 1rem 5rem' }}>
        {/* Category Filter */}
        <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}>
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    background: isActive 
                      ? PLPColors.primary.gold 
                      : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    borderRadius: '1rem',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    minWidth: 'fit-content',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon 
                    size={16} 
                    color={isActive ? PLPColors.neutral.white : PLPColors.primary.navy} 
                  />
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: isActive ? PLPColors.neutral.white : PLPColors.primary.navy
                  }}>
                    {category.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Volunteer Opportunities */}
        <motion.div variants={itemVariants}>
          <h2 style={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: PLPColors.neutral.white,
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <TrendingUp size={20} color={PLPColors.primary.gold} />
            Available Opportunities
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredOpportunities.map((opportunity) => (
              <motion.div
                key={opportunity.id}
                whileHover={{ scale: 1.01 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.2)}`
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: PLPColors.primary.navy,
                      marginBottom: '0.25rem',
                      lineHeight: '1.3'
                    }}>
                      {opportunity.title}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: PLPColors.neutral.gray600,
                      lineHeight: '1.4',
                      marginBottom: '0.5rem'
                    }}>
                      {opportunity.description}
                    </p>
                  </div>
                  
                  <div style={{
                    padding: '0.25rem 0.5rem',
                    background: getDifficultyColor(opportunity.difficulty),
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: PLPColors.neutral.white,
                    marginLeft: '0.5rem'
                  }}>
                    {opportunity.difficulty}
                  </div>
                </div>

                {/* Details */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={14} color={PLPColors.neutral.gray500} />
                    <span style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
                      {opportunity.location}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} color={PLPColors.neutral.gray500} />
                    <span style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
                      {opportunity.date}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} color={PLPColors.neutral.gray500} />
                    <span style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
                      {opportunity.time}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Users size={14} color={PLPColors.neutral.gray500} />
                    <span style={{ fontSize: '0.75rem', color: PLPColors.neutral.gray600 }}>
                      {opportunity.volunteers}/{opportunity.maxVolunteers} signed up
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{
                  background: PLPColors.neutral.gray200,
                  borderRadius: '0.25rem',
                  height: '0.25rem',
                  overflow: 'hidden',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    width: `${(opportunity.volunteers / opportunity.maxVolunteers) * 100}%`,
                    height: '100%',
                    background: PLPColors.primary.gold,
                    borderRadius: '0.25rem',
                    transition: 'width 0.3s ease'
                  }} />
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      padding: '0.25rem 0.5rem',
                      background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Star size={12} color={PLPColors.primary.gold} />
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: PLPColors.primary.navy
                      }}>
                        +{opportunity.points} points
                      </span>
                    </div>
                    
                    <span style={{
                      fontSize: '0.75rem',
                      color: PLPColors.neutral.gray500
                    }}>
                      by {opportunity.organizer}
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSignUp(opportunity)}
                    style={{
                      background: PLPColors.primary.gold,
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: PLPColors.neutral.white
                    }}>
                      Sign Up
                    </span>
                    <ChevronRight size={14} color={PLPColors.neutral.white} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileVolunteer;