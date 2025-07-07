import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#f9fafb',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ 
            color: '#003366', 
            fontSize: '1.5rem', 
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            Something went wrong
          </h1>
          <p style={{ 
            color: '#6B7280', 
            marginBottom: '1.5rem',
            maxWidth: '400px'
          }}>
            The app encountered an error. Please refresh the page or try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#FFD700',
              color: '#003366',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
          {import.meta.env.MODE === 'development' && (
            <details style={{ marginTop: '2rem', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#6B7280' }}>
                Error Details (Dev Mode)
              </summary>
              <pre style={{ 
                backgroundColor: '#1F2937', 
                color: '#F9FAFB', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                marginTop: '1rem',
                fontSize: '0.875rem',
                overflow: 'auto'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;