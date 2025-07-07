import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { PLPColors } from '../../../../../constants/brandColors';

const NewsCard = ({ article, onClick }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      'HEALTHCARE': PLPColors.primary.blue,
      'COMMUNITY': PLPColors.primary.gold,
      'EMPLOYMENT': PLPColors.status.success,
      'INFRASTRUCTURE': PLPColors.neutral.gray600,
      'ENVIRONMENT': PLPColors.status.success,
      'EDUCATION': PLPColors.primary.blue
    };
    return categoryColors[category] || PLPColors.primary.blue;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '1rem',
        border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`,
        cursor: 'pointer',
        marginBottom: '0.75rem'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '0.5rem'
      }}>
        <div style={{
          padding: '0.25rem 0.5rem',
          background: getCategoryColor(article.category),
          borderRadius: '0.5rem',
          fontSize: '0.7rem',
          fontWeight: '600',
          color: PLPColors.neutral.white
        }}>
          {article.category}
        </div>
        
        <ArrowRight size={16} color={PLPColors.neutral.gray400} />
      </div>
      
      <h3 style={{
        fontSize: '0.875rem',
        fontWeight: '600',
        color: PLPColors.primary.navy,
        marginBottom: '0.5rem',
        lineHeight: '1.3'
      }}>
        {article.title}
      </h3>
      
      <p style={{
        fontSize: '0.75rem',
        color: PLPColors.neutral.gray600,
        lineHeight: '1.4',
        marginBottom: '0.75rem'
      }}>
        {article.content?.substring(0, 100)}...
      </p>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        color: PLPColors.neutral.gray500
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <Clock size={12} />
          <span>{formatDate(article.date)}</span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>👍 {article.likes}</span>
          <span>💬 {article.comments?.length || 0}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;