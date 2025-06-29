import React from 'react';

const ScreenContainer = ({ children, className = '', style = {} }) => {
  return (
    <div className={`screen-container ${className}`} style={style}>
      <div className="screen-content">
        {children}
      </div>
    </div>
  );
};

export default ScreenContainer;