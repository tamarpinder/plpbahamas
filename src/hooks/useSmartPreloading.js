import { useCallback } from 'react';
import { 
  preloadNewsScreen, 
  preloadEventsScreen, 
  preloadDonateScreen, 
  preloadProfileScreen, 
  preloadVolunteerScreen 
} from '../utils/preloadComponents';

export const useSmartPreloading = () => {
  const preloadScreen = useCallback((screenName) => {
    const preloadMap = {
      'news': preloadNewsScreen,
      'events': preloadEventsScreen,
      'donate': preloadDonateScreen,
      'profile': preloadProfileScreen,
      'volunteer': preloadVolunteerScreen
    };

    const preloadFn = preloadMap[screenName];
    if (preloadFn) {
      preloadFn();
    }
  }, []);

  return { preloadScreen };
};