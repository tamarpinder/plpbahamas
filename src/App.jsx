import React, { useState, useEffect, Suspense } from 'react';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/ErrorBoundary';
import PhoneMockup from './components/PhoneMockup';
import MobileLayout from './components/mobile/MobileLayout';
import ScreenLoader from './components/shared/ScreenLoader';
import SplashScreen from './components/SplashScreen';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ModalPortalProvider } from '@/contexts/ModalPortalContext';
import useAuthStore from '@/stores/useAuthStore';
import { preloadCoreScreens } from '@/utils/preloadComponents';
import './App.css';

// Lazy load all screen components for code splitting
const PLPLoginNew = React.lazy(() => import('./components/mobile/PLPLoginNew'));

// Lazy load screen components for code splitting
const PLPHomeNew = React.lazy(() => import('./components/mobile/screens/home/PLPHomeNew'));
const MobileNews = React.lazy(() => import('./components/mobile/screens/MobileNews'));
const MobileEvents = React.lazy(() => import('./components/mobile/screens/MobileEvents'));
const MobileDonate = React.lazy(() => import('./components/mobile/screens/MobileDonate'));
const MobileProfile = React.lazy(() => import('./components/mobile/screens/MobileProfile'));
const MobileVolunteer = React.lazy(() => import('./components/mobile/screens/MobileVolunteer'));
const MobileLiveStream = React.lazy(() => import('./components/mobile/screens/MobileLiveStream'));

function App() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const [activeScreen, setActiveScreen] = useState('home');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Preload core screens after splash screen completes
    if (!showSplash) {
      preloadCoreScreens();
    }
  }, [showSplash]);

  const handleLoginSuccess = () => {
    setActiveScreen('home');
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (screen) => {
    setActiveScreen(screen);
  };

  const getScreenName = (screen) => {
    const screenNames = {
      'home': 'Home',
      'news': 'News',
      'events': 'Events', 
      'donate': 'Donate',
      'volunteer': 'Volunteer',
      'profile': 'Profile',
      'livestream': 'Live Stream'
    };
    return screenNames[screen] || 'Screen';
  };

  const renderCurrentScreen = () => {
    const getScreenComponent = () => {
      switch (activeScreen) {
        case 'home':
          return <PLPHomeNew onNavigate={handleNavigation} />;
        case 'news':
          return <MobileNews />;
        case 'events':
          return <MobileEvents />;
        case 'donate':
          return <MobileDonate />;
        case 'volunteer':
          return <MobileVolunteer />;
        case 'profile':
          return <MobileProfile />;
        case 'livestream':
          return <MobileLiveStream onNavigate={handleNavigation} />;
        default:
          return <PLPHomeNew onNavigate={handleNavigation} />;
      }
    };

    return (
      <Suspense fallback={<ScreenLoader screenName={getScreenName(activeScreen)} />}>
        {getScreenComponent()}
      </Suspense>
    );
  };

  return (
    <ThemeProvider>
      <ModalPortalProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-100">
            {showSplash ? (
              <PhoneMockup>
                <SplashScreen onComplete={handleSplashComplete} />
              </PhoneMockup>
            ) : (
              <PhoneMockup>
                {!isAuthenticated || isLoading ? (
                  <Suspense fallback={<ScreenLoader screenName="Login" />}>
                    <PLPLoginNew onLoginSuccess={handleLoginSuccess} />
                  </Suspense>
                ) : (
                  <MobileLayout 
                    activeTab={activeScreen} 
                    onTabChange={handleNavigation}
                    showTabBar={true}
                  >
                    {renderCurrentScreen()}
                  </MobileLayout>
                )}
              </PhoneMockup>
            )}
            <Toaster position="top-center" richColors />
          </div>
        </ErrorBoundary>
      </ModalPortalProvider>
    </ThemeProvider>
  );
}

export default App;