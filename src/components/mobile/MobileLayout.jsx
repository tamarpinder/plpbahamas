import React from 'react';
import MobileTabBar from './MobileTabBar';

const MobileLayout = ({ children, activeTab, onTabChange, showTabBar = true }) => {
  return (
    <div style={{
      height: '100%',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Content Area */}
      <div style={{
        height: '100%',
        overflowY: 'auto',
        paddingBottom: showTabBar ? '5rem' : '0',
        WebkitOverflowScrolling: 'touch'
      }}>
        {children}
      </div>
      
      {/* Tab Bar */}
      {showTabBar && (
        <MobileTabBar activeTab={activeTab} onTabChange={onTabChange} />
      )}
    </div>
  );
};

export default MobileLayout;