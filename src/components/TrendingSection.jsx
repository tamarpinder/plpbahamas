import React from 'react';
import { motion } from 'framer-motion';

const TrendingSection = ({ news, campaigns, events, onNewsClick, onCampaignClick, onEventClick }) => {
  // Get trending items (most recent and important)
  const trendingNews = news.slice(0, 1);
  const urgentCampaign = campaigns.find(c => c.urgency === 'high') || campaigns[0];
  const upcomingEvent = events.find(e => new Date(e.date_time) > new Date()) || events[0];

  const trendingItems = [
    ...(trendingNews.length > 0 ? [{
      type: 'news',
      id: trendingNews[0].id,
      title: trendingNews[0].title,
      subtitle: trendingNews[0].category,
      icon: '📰',
      color: 'from-blue-500 to-blue-600',
      action: () => onNewsClick(trendingNews[0])
    }] : []),
    ...(urgentCampaign ? [{
      type: 'campaign',
      id: urgentCampaign.id,
      title: urgentCampaign.name,
      subtitle: `$${urgentCampaign.current_amount.toLocaleString()} raised`,
      icon: '🎯',
      color: 'from-green-500 to-green-600',
      progress: (urgentCampaign.current_amount / urgentCampaign.goal_amount) * 100,
      action: () => onCampaignClick(urgentCampaign)
    }] : []),
    ...(upcomingEvent ? [{
      type: 'event',
      id: upcomingEvent.id,
      title: upcomingEvent.title,
      subtitle: new Date(upcomingEvent.date_time).toLocaleDateString(),
      icon: '📅',
      color: 'from-purple-500 to-purple-600',
      action: () => onEventClick(upcomingEvent)
    }] : [])
  ].slice(0, 2); // Show max 2 trending items

  if (trendingItems.length === 0) return null;

  return (
    <div className="trending-section" style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ 
        fontSize: '1.1rem', 
        fontWeight: '600', 
        marginBottom: '1rem',
        color: '#1F2937'
      }}>
        Trending Now 🔥
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {trendingItems.map((item, index) => (
          <motion.div
            key={`${item.type}-${item.id}`}
            className="trending-card"
            onClick={item.action}
            style={{
              background: `linear-gradient(135deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[3]})`,
              borderRadius: '1rem',
              padding: '1rem',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Progress bar for campaigns */}
            {item.progress && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                width: '100%'
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '600',
                  marginBottom: '0.25rem',
                  lineHeight: '1.2'
                }}>
                  {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  opacity: 0.9,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {item.subtitle}
                  {item.type === 'campaign' && (
                    <span style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '0.75rem',
                      fontSize: '0.625rem'
                    }}>
                      {Math.round(item.progress)}% funded
                    </span>
                  )}
                </div>
              </div>
              <div style={{ 
                fontSize: '0.75rem',
                opacity: 0.8
              }}>
                →
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;