import { create } from 'zustand';
import { mockApi } from '../services/mockApi';

const useAppStore = create((set, get) => ({
  // Dashboard Stats
  dashboardStats: null,
  
  // News
  news: [],
  selectedNewsCategory: 'ALL',
  newsLoading: false,
  
  // Events
  events: [],
  selectedEventType: 'ALL',
  eventsLoading: false,
  
  // UI State
  sidebarOpen: false,
  activeSection: 'home',
  
  // Actions
  fetchDashboardStats: async () => {
    try {
      const stats = await mockApi.fetchDashboardStats();
      set({ dashboardStats: stats });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  },
  
  fetchNews: async (category = null) => {
    set({ newsLoading: true });
    try {
      const newsCategory = category || get().selectedNewsCategory;
      const newsData = await mockApi.fetchNews(newsCategory);
      set({ news: newsData, newsLoading: false });
    } catch (error) {
      console.error('Error fetching news:', error);
      set({ newsLoading: false });
    }
  },
  
  fetchEvents: async (type = null) => {
    set({ eventsLoading: true });
    try {
      const eventType = type || get().selectedEventType;
      const eventsData = await mockApi.fetchEvents(eventType);
      set({ events: eventsData, eventsLoading: false });
    } catch (error) {
      console.error('Error fetching events:', error);
      set({ eventsLoading: false });
    }
  },
  
  setSelectedNewsCategory: (category) => {
    set({ selectedNewsCategory: category });
    get().fetchNews(category);
  },
  
  setSelectedEventType: (type) => {
    set({ selectedEventType: type });
    get().fetchEvents(type);
  },
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
  
  // News interactions
  likeNews: async (newsId) => {
    try {
      const response = await mockApi.likeNews(newsId);
      if (response.success) {
        // Update local news state
        set((state) => ({
          news: state.news.map(item => 
            item.id === newsId ? { ...item, likes: response.likes } : item
          )
        }));
      }
    } catch (error) {
      console.error('Error liking news:', error);
    }
  },
  
  addComment: async (newsId, comment) => {
    try {
      const response = await mockApi.addComment(newsId, comment);
      if (response.success) {
        // Update local news state
        set((state) => ({
          news: state.news.map(item => 
            item.id === newsId 
              ? { ...item, comments: [...item.comments, response.comment] } 
              : item
          )
        }));
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  },
  
  // Event interactions
  rsvpEvent: async (eventId, action) => {
    try {
      const response = await mockApi.rsvpEvent(eventId, action);
      if (response.success) {
        // Update local events state
        set((state) => ({
          events: state.events.map(event => 
            event.id === eventId 
              ? { 
                  ...event, 
                  attending_count: response.attending,
                  interested_count: response.interested 
                } 
              : event
          )
        }));
      }
    } catch (error) {
      console.error('Error with RSVP:', error);
    }
  },
  
  // Initialize app data
  initializeApp: async () => {
    await Promise.all([
      get().fetchDashboardStats(),
      get().fetchNews(),
      get().fetchEvents()
    ]);
  }
}));

export default useAppStore;