import React from 'react';

const PhoneMockup = ({ children }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '1rem' 
    }}>
      {/* iPhone Frame */}
      <div style={{ position: 'relative' }}>
        {/* Phone Container */}
        <div style={{
          position: 'relative',
          width: '375px',
          height: '812px',
          backgroundColor: '#000',
          borderRadius: '3rem',
          padding: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          {/* Screen */}
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            borderRadius: '2.5rem',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Status Bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '44px',
              backgroundColor: '#fff',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              <div>9:41</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <div style={{ width: '16px', height: '8px', backgroundColor: '#000', borderRadius: '2px' }}></div>
                  <div style={{ width: '16px', height: '8px', backgroundColor: '#000', borderRadius: '2px' }}></div>
                  <div style={{ width: '16px', height: '8px', backgroundColor: '#000', borderRadius: '2px' }}></div>
                </div>
                <div style={{ 
                  width: '24px', 
                  height: '12px', 
                  border: '1px solid #000', 
                  borderRadius: '2px',
                  position: 'relative'
                }}>
                  <div style={{ 
                    width: '16px', 
                    height: '8px', 
                    backgroundColor: '#22c55e', 
                    borderRadius: '1px',
                    position: 'absolute',
                    top: '1px',
                    left: '2px'
                  }}></div>
                </div>
              </div>
            </div>
            
            {/* App Content */}
            <div style={{ paddingTop: '44px', height: '100%', overflow: 'hidden', position: 'relative' }}>
              {children}
            </div>

            {/* Modal Root Container */}
            <div 
              id="phone-modal-root" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 1000
              }}
            />
            
            {/* Home Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '128px',
              height: '4px',
              backgroundColor: '#000',
              borderRadius: '2px',
              opacity: 0.6
            }}></div>
          </div>
        </div>
        
        {/* iPhone Notch */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '128px',
          height: '24px',
          backgroundColor: '#000',
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem'
        }}></div>
      </div>
    </div>
  );
};

export default PhoneMockup;