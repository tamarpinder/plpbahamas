import React from 'react';
import { Home, Newspaper, Calendar, Heart, Users } from 'lucide-react';
import { PLPColors } from '../../constants/brandColors';

const MobileTabBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'news', icon: Newspaper, label: 'News' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'donate', icon: Heart, label: 'Donate' },
    { id: 'volunteer', icon: Users, label: 'Volunteer' }
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${PLPColors.getColorWithOpacity(PLPColors.primary.navy, 0.1)}`,
      boxShadow: '0 -4px 20px rgba(0, 51, 102, 0.1)'
    }}>
      <div style={{ display: 'flex' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.75rem 0.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon 
                size={20} 
                color={isActive ? PLPColors.primary.gold : PLPColors.neutral.gray500}
                style={{
                  marginBottom: '0.25rem',
                  transition: 'color 0.2s ease'
                }}
              />
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: isActive ? PLPColors.primary.navy : PLPColors.neutral.gray500,
                transition: 'color 0.2s ease'
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTabBar;