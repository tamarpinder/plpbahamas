import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { PLPColors } from '@/constants/brandColors';
import styles from './NewsCard.module.css';

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
      'EMPLOYMENT': PLPColors.primary.blue,
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
      className={styles.card}
      style={{
        border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`
      }}
    >
      <div className={styles.header}>
        <div 
          className={styles.category}
          style={{
            background: getCategoryColor(article.category),
            color: PLPColors.neutral.white
          }}
        >
          {article.category}
        </div>
        
        <ArrowRight size={16} color={PLPColors.neutral.gray400} />
      </div>
      
      <h3 
        className={styles.title}
        style={{ color: PLPColors.primary.navy }}
      >
        {article.title}
      </h3>
      
      <p 
        className={styles.content}
        style={{ color: PLPColors.neutral.gray600 }}
      >
        {article.content?.substring(0, 100)}...
      </p>
      
      <div 
        className={styles.footer}
        style={{ color: PLPColors.neutral.gray500 }}
      >
        <div className={styles.dateSection}>
          <Clock size={12} />
          <span>{formatDate(article.date)}</span>
        </div>
        
        <div className={styles.statsSection}>
          <span>👍 {article.likes}</span>
          <span>💬 {article.comments?.length || 0}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;