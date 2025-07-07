// Preload utility for lazy-loaded components
export const preloadComponent = (importFn) => {
  // Only preload in browser environment
  if (typeof window !== 'undefined') {
    // Use requestIdleCallback if available, otherwise use setTimeout
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => importFn());
    } else {
      setTimeout(() => importFn(), 100);
    }
  }
};

// Preload specific components
export const preloadHomeScreen = () => {
  preloadComponent(() => import('../components/mobile/screens/home/PLPHomeNew'));
};

export const preloadNewsScreen = () => {
  preloadComponent(() => import('../components/mobile/screens/MobileNews'));
};

export const preloadEventsScreen = () => {
  preloadComponent(() => import('../components/mobile/screens/MobileEvents'));
};

export const preloadDonateScreen = () => {
  preloadComponent(() => import('../components/mobile/screens/MobileDonate'));
};

export const preloadProfileScreen = () => {
  preloadComponent(() => import('../components/mobile/screens/MobileProfile'));
};

export const preloadVolunteerScreen = () => {
  preloadComponent(() => import('../components/mobile/screens/MobileVolunteer'));
};

// Preload core screens that users are likely to navigate to
export const preloadCoreScreens = () => {
  preloadHomeScreen();
  preloadNewsScreen();
  preloadEventsScreen();
};