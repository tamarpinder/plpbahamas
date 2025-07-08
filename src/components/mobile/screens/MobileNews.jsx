import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, MessageCircle, Share2, ArrowLeft, TrendingUp, Star, Clock, Send, ThumbsUp, Crown, Award } from 'lucide-react';
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
  const [newComment, setNewComment] = useState('');
  const [articleLikes, setArticleLikes] = useState({});
  const [commentLikes, setCommentLikes] = useState({});

  const categories = ['ALL', 'Policy', 'Community', 'Campaign', 'Healthcare'];

  const filteredNews = news.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = async (articleId) => {
    await likeNews(articleId);
    setArticleLikes(prev => ({
      ...prev,
      [articleId]: (prev[articleId] || 0) + 1
    }));
    awardUserPoints('LIKE_NEWS');
    toast.success('Article liked! +5 points', {
      icon: '❤️',
      duration: 2000
    });
  };

  const handleCommentLike = (commentId) => {
    setCommentLikes(prev => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 1
    }));
    awardUserPoints('LIKE_NEWS');
    toast.success('Comment liked! +2 points', {
      icon: '👍',
      duration: 1500
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would update the backend
      // For demo purposes, we'll show success feedback
      awardUserPoints('SHARE_CONTENT');
      toast.success('Comment added! +10 points', {
        icon: '💬',
        duration: 2000,
        description: 'Thank you for engaging with the community!'
      });
      setNewComment('');
    }
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
            padding: '1.25rem',
            margin: '0.75rem 0.75rem 0',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
                gap: '1rem'
              }}
            >
              <motion.h1 
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: PLPColors.primary.navy,
                  lineHeight: '1.3',
                  flex: 1
                }}
              >
                {selectedArticle.title}
              </motion.h1>
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  padding: '0.5rem 1rem',
                  background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.15),
                  color: PLPColors.primary.navy,
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  flexShrink: 0,
                  height: 'fit-content'
                }}
              >
                {selectedArticle.category}
              </motion.span>
            </motion.div>
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
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontWeight: '500' }}>By {selectedArticle.author}</span>
              <span style={{ color: PLPColors.neutral.gray400 }}>•</span>
              <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
              <span style={{ color: PLPColors.neutral.gray400 }}>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={14} color={PLPColors.neutral.gray400} />
                <span>{selectedArticle.readTime}</span>
              </div>
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
              paddingTop: '1rem',
              borderTop: `2px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.2)}`,
              marginTop: '1rem',
              gap: '0.5rem'
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
                padding: '0.625rem 0.875rem',
                borderRadius: '1rem',
                background: PLPColors.getColorWithOpacity(PLPColors.status.error, 0.1),
                border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.status.error, 0.2)}`,
                cursor: 'pointer'
              }}
            >
              <motion.div
                animate={articleLikes[selectedArticle.id] ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart 
                  size={18} 
                  color={PLPColors.status.error}
                  fill={articleLikes[selectedArticle.id] ? PLPColors.status.error : 'none'}
                />
              </motion.div>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: PLPColors.primary.navy
              }}>{selectedArticle.likes + (articleLikes[selectedArticle.id] || 0)}</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 0.875rem',
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
                padding: '0.625rem 0.875rem',
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

          {/* Comments Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`
            }}
          >
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              color: PLPColors.primary.navy,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <MessageCircle size={20} color={PLPColors.primary.blue} />
              Comments ({selectedArticle.comments.length})
            </h3>

            {/* Add Comment Form */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              style={{
                background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.02),
                borderRadius: '0.75rem',
                padding: '0.875rem',
                marginBottom: '1rem',
                border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.15),
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1rem' }}>🤝</span>
                </div>
                <div style={{ flex: 1 }}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts on this article..."
                    style={{
                      width: '100%',
                      minHeight: '4rem',
                      padding: '0.75rem',
                      border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.2)}`,
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      background: PLPColors.neutral.white,
                      resize: 'vertical',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.border = `1px solid ${PLPColors.primary.gold}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.border = `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.2)}`;
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.75rem'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: PLPColors.neutral.gray500
                    }}>
                      🤝 Commenting as Supporter • +10 points
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      style={{
                        background: newComment.trim() 
                          ? PLPColors.gradients.button 
                          : PLPColors.neutral.gray300,
                        border: 'none',
                        borderRadius: '0.75rem',
                        padding: '0.5rem 1rem',
                        cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: PLPColors.primary.navy,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Send size={14} />
                      Post Comment
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedArticle.comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + (index * 0.1) }}
                  style={{
                    background: PLPColors.neutral.white,
                    borderRadius: '0.75rem',
                    padding: '0.875rem',
                    border: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.1)}`,
                    boxShadow: PLPShadows.sm
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem'
                  }}>
                    <div style={{
                      width: comment.level === 'Champion' ? '3rem' : '2.5rem',
                      height: comment.level === 'Champion' ? '3rem' : '2.5rem',
                      background: PLPColors.getColorWithOpacity(PLPColors.primary.gold, 0.15),
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: `3px solid ${
                        comment.level === 'Champion' 
                          ? PLPColors.primary.gold
                          : comment.level === 'Activist'
                          ? PLPColors.primary.blue
                          : PLPColors.status.success
                      }`,
                      boxShadow: comment.level === 'Champion' 
                        ? '0 0 12px rgba(255, 215, 0, 0.4), 0 0 24px rgba(255, 215, 0, 0.2)'
                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}>
                      <span style={{ 
                        fontSize: comment.level === 'Champion' ? '1.125rem' : '1rem'
                      }}>{comment.levelIcon}</span>
                      {comment.level === 'Champion' && (
                        <div style={{
                          position: 'absolute',
                          top: '-2px',
                          right: '-2px',
                          width: '1rem',
                          height: '1rem',
                          background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `2px solid ${PLPColors.neutral.white}`,
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}>
                          <Crown size={8} color={PLPColors.primary.navy} />
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      {/* Name - Full Width */}
                      <div style={{
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: comment.level === 'Champion' 
                            ? PLPColors.primary.gold
                            : comment.level === 'Activist'
                            ? PLPColors.primary.blue
                            : PLPColors.status.success,
                          textShadow: comment.level === 'Champion' ? '0 0 8px rgba(255, 215, 0, 0.3)' : 'none'
                        }}>
                          {comment.author}
                        </span>
                      </div>

                      {/* Level Badge */}
                      <div style={{
                        marginBottom: '0.75rem'
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          background: comment.level === 'Champion' 
                            ? 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)'
                            : comment.level === 'Activist'
                            ? 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)'
                            : 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                          color: comment.level === 'Champion' ? PLPColors.primary.navy : PLPColors.neutral.white,
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          boxShadow: comment.level === 'Champion' 
                            ? '0 2px 8px rgba(255, 215, 0, 0.3)'
                            : '0 2px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                          {comment.level === 'Champion' && <Crown size={12} />}
                          {comment.level === 'Activist' && <Star size={12} />}
                          {comment.level === 'Supporter' && '💚'}
                          {comment.level}
                        </span>
                      </div>

                      {/* Comment Text */}
                      <p style={{
                        fontSize: '0.875rem',
                        color: PLPColors.primary.navy,
                        lineHeight: '1.5',
                        marginBottom: '0.875rem'
                      }}>
                        {comment.text}
                      </p>

                      {/* Separator */}
                      <div style={{
                        height: '1px',
                        background: PLPColors.getColorWithOpacity(PLPColors.neutral.gray300, 0.5),
                        marginBottom: '0.625rem'
                      }} />

                      {/* Actions Footer */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          color: PLPColors.neutral.gray500
                        }}>
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCommentLike(comment.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            background: PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.08),
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.375rem 0.625rem',
                            borderRadius: '0.75rem',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background = PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.15);
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = PLPColors.getColorWithOpacity(PLPColors.primary.blue, 0.08);
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <motion.div
                            animate={commentLikes[comment.id] ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            <ThumbsUp 
                              size={14} 
                              color={commentLikes[comment.id] ? PLPColors.primary.blue : PLPColors.neutral.gray400}
                              fill={commentLikes[comment.id] ? PLPColors.primary.blue : 'none'}
                            />
                          </motion.div>
                          <span style={{
                            fontSize: '0.75rem',
                            color: PLPColors.neutral.gray600,
                            fontWeight: '600'
                          }}>
                            {comment.likes + (commentLikes[comment.id] || 0)}
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Bottom Spacing for Comments */}
        <div style={{ height: '2rem' }} />
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
                  padding: '0.625rem 0.875rem',
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
                    justifyContent: 'space-between'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Heart size={14} color={PLPColors.status.error} />
                        <span style={{
                          fontSize: '0.75rem',
                          color: PLPColors.neutral.gray600,
                          fontWeight: '500'
                        }}>{article.likes + (articleLikes[article.id] || 0)}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MessageCircle size={14} color={PLPColors.primary.blue} />
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
                    
                    {/* Quick Actions - Share Only */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(article);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Share2 size={16} color={PLPColors.primary.gold} />
                    </motion.button>
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