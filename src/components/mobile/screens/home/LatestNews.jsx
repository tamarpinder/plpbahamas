import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { PLPColors } from '../../../../constants/brandColors';
import NewsCard from './shared/NewsCard';

const LatestNews = ({ news, onNavigate, awardUserPoints, itemVariants }) => {
  const handleNewsClick = (article) => {
    awardUserPoints('NEWS_READ');
    onNavigate('news');
  };

  const handleViewAllNews = () => {
    awardUserPoints('DAILY_LOGIN');
    onNavigate('news');
  };

  if (!news || news.length === 0) {
    return null;
  }

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
          <TrendingUp size={20} color={PLPColors.primary.gold} />
          Latest News
        </h2>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewAllNews}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer'
          }}
        >
          <span style={{
            fontSize: '0.875rem',
            color: PLPColors.neutral.white,
            fontWeight: '500'
          }}>
            View All
          </span>
          <ArrowRight size={14} color={PLPColors.neutral.white} />
        </motion.button>
      </div>
      
      <div>
        {news.slice(0, 3).map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onClick={() => handleNewsClick(article)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LatestNews;