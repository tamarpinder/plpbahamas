import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, MessageCircle, Share2, ArrowLeft, TrendingUp, Star, Clock } from 'lucide-react';
import { Input } from '../../ui/input';
import { PLPColors, PLPShadows } from '../../../constants/brandColors';
import useAppStore from '../../../stores/useAppStore';
import useGamificationStore from '../../../stores/useGamificationStore';
import { toast } from 'sonner';

const MobileNews = () => {
  const { news, selectedNewsCategory, setSelectedNewsCategory, likeNews } = useAppStore();
  const { awardUserPoints } = useGamificationStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['ALL', 'Policy', 'Community', 'Campaign', 'Healthcare'];

  const filteredNews = news.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = async (articleId) => {
    await likeNews(articleId);
    awardUserPoints('LIKE_NEWS');
    toast.success('Article liked! +5 points', {
      icon: '❤️',
      duration: 2000
    });
  };

  const handleShare = (article) => {
    awardUserPoints('SHARE_CONTENT');
    toast.success('Article shared! +10 points', {
      icon: '📤',
      duration: 2000
    });
  };

  const handleReadArticle = (article) => {
    setSelectedArticle(article);
    awardUserPoints('READ_article');
    toast.success('Reading article! +3 points', {
      icon: '📖',
      duration: 1500
    });
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

  if (selectedArticle) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          height: '100%',
          background: PLPColors.gradients.hero
        }}
      >
        {/* Article Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            position: 'sticky',
            top: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.neutral.white, 0.2)}`,
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            zIndex: 10
          }}
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedArticle(null)}
            style={{
              padding: '0.5rem',
              background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.1),
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} color={PLPColors.primary.navy} />
          </motion.button>
          <h1 style={{
            fontWeight: '700',
            fontSize: '1.125rem',
            color: PLPColors.primary.navy
          }}>Article Details</h1>
        </motion.div>

        {/* Article Content */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTopLeftRadius: '2rem',
            borderTopRightRadius: '2rem',
            border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.neutral.white, 0.2)}`,
            boxShadow: PLPShadows.glass,
            padding: '1.5rem',
            margin: '1rem 1rem 0',
            marginBottom: '2rem'
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.15),
                color: PLPColors.primary.navy,
                borderRadius: '1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}
            >
              {selectedArticle.category}
            </motion.span>
            <motion.h1 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: PLPColors.primary.navy,
                marginBottom: '0.75rem',
                lineHeight: '1.3'
              }}
            >
              {selectedArticle.title}
            </motion.h1>
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                color: PLPColors.neutral.gray600,
                marginBottom: '1.5rem',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontWeight: '500' }}>By {selectedArticle.author}</span>
              <span style={{ color: PLPColors.neutral.gray400 }}>•</span>
              <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
              <Clock size={14} color={PLPColors.neutral.gray400} style={{ marginLeft: '0.5rem' }} />
              <span>{selectedArticle.readTime}</span>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p style={{
              color: PLPColors.primary.navy,
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              fontSize: '1rem'
            }}>
              {selectedArticle.summary}
            </p>
            
            {selectedArticle.keyPoints && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.05),
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.15)}`
                }}
              >
                <h3 style={{
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: PLPColors.primary.navy,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Star size={18} color={PLPColors.primary.gold} />
                  Key Points:
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedArticle.keyPoints.map((point, i) => (
                    <motion.li 
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + (i * 0.1) }}
                      style={{
                        fontSize: '0.875rem',
                        color: PLPColors.neutral.gray700,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem'
                      }}
                    >
                      <span style={{
                        width: '6px',
                        height: '6px',
                        background: PLPColors.primary.gold,
                        borderRadius: '50%',
                        marginTop: '0.5rem',
                        flexShrink: 0
                      }}></span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.5rem',
              borderTop: `2px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`,
              marginTop: '1.5rem',
              gap: '0.75rem'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLike(selectedArticle.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                background: PLPColors.getColorWithOpacity(PLPColors.status.error, 0.1),
                border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.status.error, 0.2)}`,
                cursor: 'pointer'
              }}
            >
              <Heart size={18} color={PLPColors.status.error} />
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: PLPColors.primary.navy
              }}>{selectedArticle.likes}</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1),
                border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.2)}`,
                cursor: 'pointer'
              }}
            >
              <MessageCircle size={18} color={PLPColors.primary.blue} />
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: PLPColors.primary.navy
              }}>{selectedArticle.comments.length}</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare(selectedArticle)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.15),
                border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.3)}`,
                cursor: 'pointer'
              }}
            >
              <Share2 size={18} color={PLPColors.primary.navy} />
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: PLPColors.primary.navy
              }}>Share</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

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
          <TrendingUp size={24} color={PLPColors.primary.gold} />
          News & Updates
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
          Stay informed with the latest PLP updates
        </motion.p>
        
        {/* Search */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ position: 'relative', marginBottom: '1rem' }}
        >
          <Search 
            size={20}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: PLPColors.neutral.gray400,
              zIndex: 1
            }} 
          />
          <Input
            type="text"
            placeholder="Search news articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              height: '3rem',
              paddingLeft: '3rem',
              border: `2px solid ${PLPColors.neutral.gray200}`,
              borderRadius: '1rem',
              fontSize: '1rem',
              background: PLPColors.neutral.white,
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.border = `2px solid ${PLPColors.primary.gold}`;
            }}
            onBlur={(e) => {
              e.target.style.border = `2px solid ${PLPColors.neutral.gray200}`;
            }}
          />
        </motion.div>
        
        {/* Categories */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}
        >
          {categories.map((category, index) => {
            const isActive = selectedNewsCategory === category;
            return (
              <motion.button
                key={category}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedNewsCategory(category)}
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
                  backdropFilter: 'blur(10px)'
                }}
              >
                {category}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      <div style={{ padding: '0 1rem 5rem' }}>
        {/* News List */}
        <motion.div 
          variants={itemVariants}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {filteredNews.map((article, index) => (
            <motion.div 
              key={article.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + (index * 0.1) }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleReadArticle(article)}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                padding: '1rem',
                border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`,
                boxShadow: PLPShadows.md,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.15),
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1.25rem' }}>📰</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: PLPColors.primary.navy,
                      fontWeight: '600',
                      background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2),
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.5rem'
                    }}>
                      {article.category}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: PLPColors.neutral.gray500
                    }}>
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 style={{
                    fontWeight: '700',
                    color: PLPColors.primary.navy,
                    marginBottom: '0.5rem',
                    fontSize: '1rem',
                    lineHeight: '1.3',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {article.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: PLPColors.neutral.gray600,
                    lineHeight: '1.4',
                    marginBottom: '0.75rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {article.summary}
                  </p>
                  
                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Heart size={14} color={PLPColors.neutral.gray400} />
                      <span style={{
                        fontSize: '0.75rem',
                        color: PLPColors.neutral.gray600,
                        fontWeight: '500'
                      }}>{article.likes}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MessageCircle size={14} color={PLPColors.neutral.gray400} />
                      <span style={{
                        fontSize: '0.75rem',
                        color: PLPColors.neutral.gray600,
                        fontWeight: '500'
                      }}>{article.comments.length}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={14} color={PLPColors.neutral.gray400} />
                      <span style={{
                        fontSize: '0.75rem',
                        color: PLPColors.neutral.gray500
                      }}>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileNews;