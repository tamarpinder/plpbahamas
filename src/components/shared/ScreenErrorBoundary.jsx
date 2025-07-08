import React from 'react';
import { PLPColors } from '@/constants/brandColors';

class ScreenErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`Screen Error in ${this.props.screenName}:`, error, errorInfo);
    console.error('Error stack:', error.stack);
    console.error('Component stack:', errorInfo.componentStack);
    
    // Log error details for debugging
    console.log('Error details:', {
      screenName: this.props.screenName,
      errorMessage: error.message,
      errorName: error.name,
      timestamp: new Date().toISOString()
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100%',
          background: PLPColors.gradients.hero,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            maxWidth: '300px',
            width: '100%'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>⚠️</div>
            
            <h2 style={{
              color: PLPColors.primary.navy,
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              Screen Error
            </h2>
            
            <p style={{
              color: PLPColors.neutral.gray600,
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              lineHeight: '1.4'
            }}>
              This screen encountered an error. Try refreshing or navigating back.
            </p>
            
            <button 
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                background: PLPColors.gradients.button,
                border: 'none',
                borderRadius: '0.75rem',
                padding: '0.75rem 1.5rem',
                color: PLPColors.primary.navy,
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Try Again
            </button>
            
            {import.meta.env.MODE === 'development' && this.state.error && (
              <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                <summary style={{ 
                  cursor: 'pointer', 
                  fontSize: '0.75rem',
                  color: PLPColors.neutral.gray500 
                }}>
                  Error Details
                </summary>
                <pre style={{ 
                  fontSize: '0.625rem',
                  color: PLPColors.status.error,
                  marginTop: '0.5rem',
                  overflow: 'auto',
                  maxHeight: '100px'
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ScreenErrorBoundary;