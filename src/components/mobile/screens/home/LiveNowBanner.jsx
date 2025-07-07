import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Eye } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';

const LiveNowBanner = ({ liveEvent, onJoinStream, itemVariants }) => {
  if (!liveEvent) return null;

  return (
    <motion.div 
      variants={itemVariants}
      style={{
        marginBottom: '1rem',
        background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #F87171 100%)',
        borderRadius: '1rem',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Live pulse animation background */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '8px',
        height: '8px',
        background: '#FFFFFF',
        borderRadius: '50%',
        animation: 'pulse 2s infinite'
      }} />
      
      {/* Live indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem'
      }}>
        <div style={{
          background: '#FFFFFF',
          color: '#DC2626',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.5rem',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <Play size={12} fill="currentColor" />
          LIVE
        </div>
        <div style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <Eye size={14} />
          {liveEvent.viewerCount || 0} watching
        </div>
      </div>

      {/* Event details */}
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{
          color: '#FFFFFF',
          fontSize: '1.125rem',
          fontWeight: 'bold',
          marginBottom: '0.25rem',
          lineHeight: '1.3'
        }}>
          {liveEvent.title}
        </h3>
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '0.875rem',
          lineHeight: '1.4'
        }}>
          {liveEvent.description.length > 100 
            ? `${liveEvent.description.substring(0, 100)}...` 
            : liveEvent.description
          }
        </p>
      </div>

      {/* Join button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onJoinStream(liveEvent)}
        style={{
          width: '100%',
          background: '#FFFFFF',
          color: '#DC2626',
          border: 'none',
          borderRadius: '0.75rem',
          padding: '0.75rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          cursor: 'pointer'
        }}
      >
        <Play size={18} fill="currentColor" />
        Join Live Stream
      </motion.button>

      {/* CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default LiveNowBanner;