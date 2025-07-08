import { create } from 'zustand';
import { mockApi } from '@/services/mockApi';
import useGamificationStore from './useGamificationStore';
import useAppStore from './useAppStore';

const useAuthStore = create((set, get) => ({
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
          
          // Clear all other stores first (before clearing auth)
          useGamificationStore.getState().clearUserData();
          useAppStore.getState().clearUserData();
          
          // Reset auth state - no localStorage needed
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
        
        return { success: true, user: guestUser };
      }
    }));

export default useAuthStore;