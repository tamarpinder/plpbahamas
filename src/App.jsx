import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import PhoneMockup from './components/PhoneMockup';
import MobileLayout from './components/mobile/MobileLayout';
import PLPLoginNew from './components/mobile/PLPLoginNew';
import PLPHomeNew from './components/mobile/screens/PLPHomeNew';
import MobileNews from './components/mobile/screens/MobileNews';
import MobileEvents from './components/mobile/screens/MobileEvents';
import MobileDonate from './components/mobile/screens/MobileDonate';
import MobileProfile from './components/mobile/screens/MobileProfile';
import MobileVolunteer from './components/mobile/screens/MobileVolunteer';
import useAuthStore from './stores/useAuthStore';
import './App.css';

function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [activeScreen, setActiveScreen] = useState('home');

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLoginSuccess = () => {
    setActiveScreen('home');
  };

  const handleNavigation = (screen) => {
    setActiveScreen(screen);
  };

  const renderCurrentScreen = () => {
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
      default:
        return <PLPHomeNew onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PhoneMockup>
        {!isAuthenticated ? (
          <PLPLoginNew onLoginSuccess={handleLoginSuccess} />
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
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;