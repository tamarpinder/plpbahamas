import React, { useState, useEffect, useRef } from 'react';
import { SafeMotionDiv, SafeMotionButton } from '@/components/SafeMotion';
import { 
  ArrowLeft, 
  Share, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Heart, 
  MessageCircle, 
  Send,
  Star,
  Users,
  Clock,
  Crown,
  Award,
  ThumbsUp
} from 'lucide-react';
import { PLPColors, PLPShadows } from '@/constants/brandColors';
import ScreenErrorBoundary from '../../shared/ScreenErrorBoundary';
import { useSafeGamificationStore } from '@/hooks/useSafeStore';

const MobileLiveStreamContent = ({ onNavigate }) => {
  // Use safe store hook
  const { awardUserPoints } = useSafeGamificationStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [watchTime, setWatchTime] = useState(0);
  const [viewerCount, setViewerCount] = useState(1247);
  const [hasJoined, setHasJoined] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Initialize component safely
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasJoined(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: 'Sarah Mitchell',
      level: 'Champion',
      levelIcon: '👑',
      message: 'Great points on healthcare access, Mr. Prime Minister!',
      timestamp: '12:34',
      isHighlighted: false
    },
    {
      id: 2,
      user: 'Michael Thompson',
      level: 'Activist',
      levelIcon: '⭐',
      message: 'What about reducing insurance costs for families?',
      timestamp: '12:35',
      isHighlighted: true
    },
    {
      id: 3,
      user: 'Jennifer Williams',
      level: 'Supporter',
      levelIcon: '🤝',
      message: 'Thank you for addressing this critical issue! 🇧🇸',
      timestamp: '12:36',
      isHighlighted: false
    },
    {
      id: 4,
      user: 'David Clarke',
      level: 'Champion',
      levelIcon: '👑',
      message: 'How will this impact our outer islands communities?',
      timestamp: '12:37',
      isHighlighted: true
    },
    {
      id: 5,
      user: 'Lisa Roberts',
      level: 'Activist',
      levelIcon: '⭐',
      message: 'Excellent leadership on healthcare reform! 👏',
      timestamp: '12:38',
      isHighlighted: false
    }
  ]);

  const chatContainerRef = useRef(null);

  // Simulate live updates safely
  useEffect(() => {
    if (!hasJoined || isLoading) return;

    // Award points for joining stream
    if (hasJoined && awardUserPoints) {
      awardUserPoints('LIVESTREAM_JOIN');
    }

    const interval = setInterval(() => {
      setWatchTime(prev => prev + 1);
      setViewerCount(prev => prev + Math.floor(Math.random() * 3) - 1);
      
      // Award points every 5 minutes
      if (watchTime > 0 && watchTime % 300 === 0 && awardUserPoints) {
        awardUserPoints('DAILY_LOGIN');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [watchTime, hasJoined, isLoading, awardUserPoints]);

  // Mock stream info
  const streamInfo = {
    title: 'PLP Town Hall: Healthcare Reform',
    speaker: 'Hon. Philip Davis, Prime Minister',
    duration: '23:45',
    tags: ['#Healthcare', '#Reform', '#PLP2024']
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const reactions = [
    { emoji: '👏', label: 'Applause', count: 342 },
    { emoji: '❤️', label: 'Love', count: 156 },
    { emoji: '🔥', label: 'Fire', count: 89 },
    { emoji: '💯', label: 'Perfect', count: 67 },
    { emoji: '🇧🇸', label: 'Bahamas', count: 234 }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: 'You',
        level: 'Supporter',
        levelIcon: '🤝',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isHighlighted: false
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage('');
      
      if (awardUserPoints) {
        awardUserPoints('DAILY_LOGIN');
      }
      
      // Scroll to bottom
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleReaction = (reaction) => {
    if (awardUserPoints) {
      awardUserPoints('DAILY_LOGIN');
    }
    console.log(`Reacted with ${reaction.emoji}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div style={{
        height: '100%',
        background: PLPColors.gradients.hero,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
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
          <p>Joining live stream...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: '100%',
      background: PLPColors.primary.navy,
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.7)',
        position: 'relative',
        zIndex: 10
      }}>
        <SafeMotionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate && onNavigate('home')}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ArrowLeft size={20} color={PLPColors.neutral.white} />
        </SafeMotionButton>
        
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            color: PLPColors.neutral.white,
            fontSize: '1rem',
            fontWeight: '600',
            margin: 0
          }}>
            PLP Live Stream
          </h2>
        </div>
        
        <SafeMotionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Share size={20} color={PLPColors.neutral.white} />
        </SafeMotionButton>
      </div>

      {/* Video Player Area */}
      <div style={{
        position: 'relative',
        height: '40%',
        background: 'linear-gradient(135deg, #001122 0%, #003366 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Mock Video Content */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, #003366 25%, #0066CC 25%, #0066CC 50%, #003366 50%, #003366 75%, #0066CC 75%)',
          backgroundSize: '40px 40px',
          opacity: 0.1
        }} />
        
        {/* PLP Logo */}
        <div style={{
          background: PLPColors.primary.gold,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: PLPShadows.xl
        }}>
          <span style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: PLPColors.primary.navy
          }}>
            PLP
          </span>
        </div>

        {/* Live Indicator */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: PLPColors.primary.blue,
          color: PLPColors.neutral.white,
          padding: '0.375rem 0.75rem',
          borderRadius: '1rem',
          fontSize: '0.875rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: PLPColors.neutral.white,
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
          LIVE
        </div>

        {/* Viewer Count */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(0, 0, 0, 0.7)',
          color: PLPColors.neutral.white,
          padding: '0.375rem 0.75rem',
          borderRadius: '1rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem'
        }}>
          <Users size={14} />
          {viewerCount.toLocaleString()}
        </div>

        {/* Video Controls */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <SafeMotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isPlaying ? 
                <Pause size={20} color={PLPColors.neutral.white} /> : 
                <Play size={20} color={PLPColors.neutral.white} />
              }
            </SafeMotionButton>
            
            <SafeMotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMuted(!isMuted)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMuted ? 
                <VolumeX size={20} color={PLPColors.neutral.white} /> : 
                <Volume2 size={20} color={PLPColors.neutral.white} />
              }
            </SafeMotionButton>
            
            <span style={{
              color: PLPColors.neutral.white,
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {formatTime(watchTime)}
            </span>
          </div>
          
          <SafeMotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Maximize size={20} color={PLPColors.neutral.white} />
          </SafeMotionButton>
        </div>
      </div>

      {/* Stream Information */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '1rem',
        borderTopLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '700',
          color: PLPColors.primary.navy,
          marginBottom: '0.25rem',
          margin: 0
        }}>
          {streamInfo.title}
        </h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '0.5rem',
          flexWrap: 'wrap'
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: PLPColors.neutral.gray600,
            fontWeight: '500'
          }}>
            {streamInfo.speaker}
          </span>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: PLPColors.neutral.gray500,
            fontSize: '0.75rem'
          }}>
            <Clock size={12} />
            Live for {streamInfo.duration}
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '0.75rem',
          flexWrap: 'wrap'
        }}>
          {streamInfo.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
                color: PLPColors.primary.blue,
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.5rem',
                fontWeight: '500'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div style={{
        flex: 1,
        background: PLPColors.neutral.white,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(60% - 120px)'
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '1rem',
          borderBottom: `1px solid ${PLPColors.neutral.gray200}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <MessageCircle size={20} color={PLPColors.primary.navy} />
            <span style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: PLPColors.primary.navy
            }}>
              Live Chat
            </span>
            <span style={{
              background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
              color: PLPColors.primary.navy,
              fontSize: '0.75rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              fontWeight: '600'
            }}>
              {viewerCount.toLocaleString()} participants
            </span>
          </div>
        </div>

        {/* Reactions Bar */}
        <div style={{
          padding: '0.75rem 1rem',
          borderBottom: `1px solid ${PLPColors.neutral.gray200}`,
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto'
        }}>
          {reactions.map((reaction, index) => (
            <SafeMotionButton
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleReaction(reaction)}
              style={{
                background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
                border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`,
                borderRadius: '1.5rem',
                padding: '0.5rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: PLPColors.primary.navy,
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ fontSize: '1rem' }}>{reaction.emoji}</span>
              {reaction.count}
            </SafeMotionButton>
          ))}
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem'
          }}
        >
          {chatMessages.map((message) => (
            <SafeMotionDiv
              key={message.id}
              style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                borderRadius: '1rem',
                background: message.isHighlighted 
                  ? PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1)
                  : PLPColors.neutral.gray50,
                border: message.isHighlighted 
                  ? `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.3)}`
                  : `1px solid ${PLPColors.neutral.gray200}`
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '0.875rem' }}>{message.levelIcon}</span>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: PLPColors.primary.navy
                  }}>
                    {message.user}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: PLPColors.neutral.gray500,
                    background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
                    padding: '0.125rem 0.375rem',
                    borderRadius: '0.375rem'
                  }}>
                    {message.level}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  {message.isHighlighted && (
                    <Star size={12} color={PLPColors.primary.gold} />
                  )}
                  <span style={{
                    fontSize: '0.75rem',
                    color: PLPColors.neutral.gray500
                  }}>
                    {message.timestamp}
                  </span>
                </div>
              </div>
              
              <p style={{
                fontSize: '0.875rem',
                color: PLPColors.primary.navy,
                lineHeight: '1.4',
                margin: 0
              }}>
                {message.message}
              </p>
            </SafeMotionDiv>
          ))}
        </div>

        {/* Message Input */}
        <div style={{
          padding: '1rem',
          borderTop: `1px solid ${PLPColors.neutral.gray200}`,
          background: PLPColors.neutral.white
        }}>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="Ask a question or share your thoughts..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: `1px solid ${inputFocused ? PLPColors.primary.gold : PLPColors.neutral.gray300}`,
                borderRadius: '1.5rem',
                fontSize: '0.875rem',
                outline: 'none',
                background: PLPColors.neutral.white,
                transition: 'border-color 0.2s ease'
              }}
            />
            
            <SafeMotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!chatMessage.trim()}
              style={{
                background: chatMessage.trim() 
                  ? PLPColors.gradients.button 
                  : PLPColors.neutral.gray300,
                border: 'none',
                borderRadius: '50%',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={18} color={
                chatMessage.trim() 
                  ? PLPColors.primary.navy 
                  : PLPColors.neutral.gray500
              } />
            </SafeMotionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileLiveStream = ({ onNavigate }) => (
  <ScreenErrorBoundary screenName="Live Stream">
    <MobileLiveStreamContent onNavigate={onNavigate} />
  </ScreenErrorBoundary>
);

export default MobileLiveStream;