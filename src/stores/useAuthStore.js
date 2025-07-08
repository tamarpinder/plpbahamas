import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mockApi } from '@/services/mockApi';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await mockApi.login(email, password);
          if (response.success) {
            set({ 
              user: response.user, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return response;
          } else {
            set({ error: response.error, isLoading: false });
            return response;
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await mockApi.register(userData);
          if (response.success) {
            set({ 
              user: response.user, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return response;
          } else {
            set({ error: response.error, isLoading: false });
            return response;
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await mockApi.logout();
          
          // Clear all localStorage items that might be used by other stores
          const keysToRemove = [
            'currentUser',
            'userProfile', 
            'gamificationStore',
            'appStore',
            'authStore'
          ];
          
          keysToRemove.forEach(key => {
            try {
              localStorage.removeItem(key);
            } catch (e) {
              console.warn(`Failed to remove localStorage key: ${key}`, e);
            }
          });
          
          // Reset auth state
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null 
          });
          
          return { success: true };
        } catch (error) {
          console.error('Logout error:', error);
          set({ 
            error: error.message || 'Logout failed', 
            isLoading: false 
          });
          return { success: false, error: error.message };
        }
      },

      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await mockApi.updateProfile(profileData);
          if (response.success) {
            set({ user: response.user, isLoading: false });
            return response;
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      checkAuth: () => {
        const currentUser = mockApi.getCurrentUser();
        if (currentUser) {
          set({ user: currentUser, isAuthenticated: true });
        }
      },

      loginAsGuest: () => {
        const guestUser = {
          id: 'guest',
          name: 'Guest User',
          email: 'guest@plp.bs',
          isGuest: true,
          memberSince: new Date().toISOString(),
          verified: false,
          volunteerStatus: 'Guest',
          donationTotal: 0,
          eventsAttended: 0,
          badges: ['Guest Access']
        };
        
        set({ 
          user: guestUser, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        // Don't store guest in localStorage - session only
        return { success: true, user: guestUser };
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
);

export default useAuthStore;