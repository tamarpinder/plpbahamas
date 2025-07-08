import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { PLPColors, PLPShadows } from '@/constants/brandColors';

class EnhancedErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error Boundary Caught:', error, errorInfo);
    
    // Update state with error details
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Report to error tracking service (if available)
    if (window.errorReporter) {
      window.errorReporter.log({
        error: error.toString(),
        componentStack: errorInfo.componentStack,
        screenName: this.props.screenName || 'Unknown',
        timestamp: new Date().toISOString()
      });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleGoHome = () => {
    // Reset error state
    this.handleReset();
    
    // Navigate to home if navigation function provided
    if (this.props.onNavigate) {
      this.props.onNavigate('home');
    } else {
      // Fallback to page reload
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      return (
        <div style={{
          height: '100%',
          background: PLPColors.neutral.gray50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: PLPColors.neutral.white,
            borderRadius: '1.5rem',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%',
            boxShadow: PLPShadows.lg,
            textAlign: 'center'
          }}>
            {/* Error Icon */}
            <div style={{
              width: '4rem',
              height: '4rem',
              background: PLPColors.getColorWithOpacity(PLPColors.status.error, 0.1),
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <AlertCircle size={32} color={PLPColors.status.error} />
            </div>

            {/* Error Title */}
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: PLPColors.primary.navy,
              marginBottom: '0.5rem'
            }}>
              Oops! Something went wrong
            </h2>

            {/* Error Description */}
            <p style={{
              fontSize: '1rem',
              color: PLPColors.neutral.gray600,
              marginBottom: '1.5rem',
              lineHeight: '1.5'
            }}>
              {this.props.screenName 
                ? `We encountered an error while loading the ${this.props.screenName} screen.`
                : 'We encountered an unexpected error.'}
              Don't worry, your data is safe.
            </p>

            {/* Error Details (Development Only) */}
            {isDevelopment && this.state.error && (
              <div style={{
                background: PLPColors.neutral.gray100,
                borderRadius: '0.75rem',
                padding: '1rem',
                marginBottom: '1.5rem',
                textAlign: 'left',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                <strong>Error:</strong> {this.state.error.toString()}
                {this.state.errorInfo && (
                  <details style={{ marginTop: '0.5rem' }}>
                    <summary style={{ cursor: 'pointer', color: PLPColors.primary.blue }}>
                      Component Stack
                    </summary>
                    <pre style={{ 
                      marginTop: '0.5rem', 
                      fontSize: '0.75rem',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexDirection: 'column'
            }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: PLPColors.primary.blue,
                  color: PLPColors.neutral.white,
                  border: 'none',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = PLPShadows.md;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <RefreshCw size={18} />
                Try Again
              </button>

              <button
                onClick={this.handleGoHome}
                style={{
                  background: 'transparent',
                  color: PLPColors.primary.blue,
                  border: `2px solid ${PLPColors.primary.blue}`,
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = PLPColors.primary.blue;
                  e.target.style.color = PLPColors.neutral.white;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = PLPColors.primary.blue;
                }}
              >
                <Home size={18} />
                Go to Home
              </button>
            </div>

            {/* Error Count Warning */}
            {this.state.errorCount > 2 && (
              <p style={{
                fontSize: '0.875rem',
                color: PLPColors.status.warning,
                marginTop: '1rem'
              }}>
                This screen has crashed {this.state.errorCount} times. 
                Consider refreshing the app.
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default EnhancedErrorBoundary;