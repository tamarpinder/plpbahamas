import { mockNews } from '../data/mockNews.js';
import { mockEvents } from '../data/mockEvents.js';
import { mockUserProfiles, mockGuestUser, mockUserStats } from '../data/mockUser.js';

// Simulated network delay
const simulateNetworkDelay = (min = 300, max = 1500) => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Simulated error handling
const simulateError = (errorRate = 0.05) => {
  if (Math.random() < errorRate) {
    throw new Error('Network error - please try again');
  }
};

// Mock API Service
export class MockApiService {
  constructor() {
    this.isOnline = true;
    this.users = [...mockUserProfiles];
    this.currentUser = null;
    this.guestUser = { ...mockGuestUser };
    this.paymentMethods = new Map(); // Store payment methods per user
    this.donationHistory = new Map(); // Store donation history per user
    this.initializeMockData();
  }

  // Initialize mock data for payment methods and donations
  initializeMockData() {
    // Add some sample payment methods for the first user
    const sampleUserId = 1;
    this.paymentMethods.set(sampleUserId, [
      {
        id: 1,
        type: 'card',
        displayName: 'Visa ending in 4242',
        lastFour: '4242',
        expiryMonth: '12',
        expiryYear: '2025',
        cardType: 'visa',
        isDefault: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        type: 'paypal',
        displayName: 'PayPal Account',
        email: 'user@example.com',
        isDefault: false,
        createdAt: new Date().toISOString()
      }
    ]);

    // Add some sample donation history
    this.donationHistory.set(sampleUserId, [
      {
        id: 1,
        amount: 100,
        currency: 'USD',
        category: 'education',
        paymentMethod: 'card',
        paymentMethodId: 1,
        status: 'completed',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        confirmationNumber: 'PLP' + (Date.now() - 24 * 60 * 60 * 1000),
        recurring: false
      },
      {
        id: 2,
        amount: 50,
        currency: 'USD',
        category: 'healthcare',
        paymentMethod: 'paypal',
        paymentMethodId: 2,
        status: 'completed',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        confirmationNumber: 'PLP' + (Date.now() - 7 * 24 * 60 * 60 * 1000),
        recurring: false
      }
    ]);
  }

  // Authentication
  async login(email, password) {
    await simulateNetworkDelay();
    simulateError();

    const user = this.users.find(u => u.email === email);
    if (user && password === 'demo123') {
      this.currentUser = user;
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  }

  async register(userData) {
    await simulateNetworkDelay();
    simulateError();

    const newUser = {
      id: Date.now(),
      ...userData,
      memberSince: new Date().toISOString(),
      verified: false,
      volunteerStatus: 'New',
      donationTotal: 0,
      eventsAttended: 0,
      badges: ['New Member'],
      notifications: {
        email: true,
        push: true,
        sms: false,
        newsletter: true
      },
      privacy: {
        profileVisible: true,
        activityVisible: false,
        contactVisible: true
      }
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    return { success: true, user: newUser };
  }

  async logout() {
    await simulateNetworkDelay(100, 300);
    this.currentUser = null;
    return { success: true };
  }

  // News
  async fetchNews(category = 'ALL', limit = null) {
    await simulateNetworkDelay();
    simulateError();

    let filteredNews = category === 'ALL' 
      ? [...mockNews] 
      : mockNews.filter(item => item.category === category);
    
    // Sort by date (newest first)
    filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (limit) {
      filteredNews = filteredNews.slice(0, limit);
    }

    return filteredNews;
  }

  async fetchNewsById(id) {
    await simulateNetworkDelay();
    simulateError();

    const article = mockNews.find(item => item.id === parseInt(id));
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  }

  async likeNews(newsId) {
    await simulateNetworkDelay(200, 500);
    const newsIndex = mockNews.findIndex(item => item.id === newsId);
    if (newsIndex !== -1) {
      mockNews[newsIndex].likes += 1;
      return { success: true, likes: mockNews[newsIndex].likes };
    }
    throw new Error('News item not found');
  }

  async addComment(newsId, comment) {
    await simulateNetworkDelay(300, 800);
    const newsIndex = mockNews.findIndex(item => item.id === newsId);
    if (newsIndex !== -1) {
      const newComment = {
        id: Date.now(),
        author: this.currentUser?.name || 'Guest',
        text: comment,
        timestamp: new Date().toISOString()
      };
      mockNews[newsIndex].comments.push(newComment);
      return { success: true, comment: newComment };
    }
    throw new Error('News item not found');
  }

  // Events
  async fetchEvents(type = 'ALL', limit = null) {
    await simulateNetworkDelay();
    simulateError();

    let filteredEvents = type === 'ALL' 
      ? [...mockEvents] 
      : mockEvents.filter(event => event.event_type === type);
    
    // Sort by date (soonest first)
    filteredEvents.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
    
    if (limit) {
      filteredEvents = filteredEvents.slice(0, limit);
    }

    return filteredEvents;
  }

  async fetchEventById(id) {
    await simulateNetworkDelay();
    simulateError();

    const event = mockEvents.find(item => item.id === parseInt(id));
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  async rsvpEvent(eventId, action) {
    await simulateNetworkDelay(400, 900);
    const eventIndex = mockEvents.findIndex(event => event.id === eventId);
    if (eventIndex !== -1) {
      if (action === 'rsvp') {
        mockEvents[eventIndex].attending_count += 1;
        mockEvents[eventIndex].interested_count += 1;
      } else if (action === 'interested') {
        mockEvents[eventIndex].interested_count += 1;
      }
      return { 
        success: true, 
        attending: mockEvents[eventIndex].attending_count,
        interested: mockEvents[eventIndex].interested_count
      };
    }
    throw new Error('Event not found');
  }

  // User Management
  async fetchUserStats() {
    await simulateNetworkDelay();
    simulateError();
    return mockUserStats;
  }

  async updateProfile(profileData) {
    await simulateNetworkDelay(500, 1200);
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...profileData };
      return { success: true, user: this.currentUser };
    }
    throw new Error('User not logged in');
  }

  // Donations
  async processDonation(donationData) {
    await simulateNetworkDelay(1000, 2000);
    simulateError(0.02); // Lower error rate for donations

    const donation = {
      id: Date.now(),
      amount: donationData.amount,
      paymentMethod: donationData.paymentMethod,
      paymentMethodId: donationData.paymentMethodId,
      category: donationData.category || 'general',
      recurring: donationData.recurring || false,
      date: new Date().toISOString(),
      status: 'completed',
      confirmationNumber: `PLP${Date.now()}`,
      currency: 'USD'
    };

    if (this.currentUser) {
      this.currentUser.donationTotal += donationData.amount;
      
      // Add to donation history
      const userId = this.currentUser.id;
      const userDonations = this.donationHistory.get(userId) || [];
      userDonations.unshift(donation);
      this.donationHistory.set(userId, userDonations);
    }

    return { success: true, donation };
  }

  // Payment Methods Management
  async getPaymentMethods() {
    await simulateNetworkDelay(300, 800);
    simulateError();

    if (!this.currentUser) {
      throw new Error('User not logged in');
    }

    const userId = this.currentUser.id;
    const userPaymentMethods = this.paymentMethods.get(userId) || [];
    const defaultPaymentMethod = userPaymentMethods.find(pm => pm.isDefault) || null;

    return { 
      success: true, 
      paymentMethods: userPaymentMethods,
      defaultPaymentMethod 
    };
  }

  async addPaymentMethod(paymentMethodData) {
    await simulateNetworkDelay(800, 1500);
    simulateError();

    if (!this.currentUser) {
      throw new Error('User not logged in');
    }

    const userId = this.currentUser.id;
    const userPaymentMethods = this.paymentMethods.get(userId) || [];
    
    const newPaymentMethod = {
      id: Date.now(),
      ...paymentMethodData,
      createdAt: new Date().toISOString(),
      isDefault: userPaymentMethods.length === 0 // First payment method becomes default
    };

    userPaymentMethods.push(newPaymentMethod);
    this.paymentMethods.set(userId, userPaymentMethods);

    return { success: true, paymentMethod: newPaymentMethod };
  }

  async updatePaymentMethod(paymentMethodId, updates) {
    await simulateNetworkDelay(600, 1200);
    simulateError();

    if (!this.currentUser) {
      throw new Error('User not logged in');
    }

    const userId = this.currentUser.id;
    const userPaymentMethods = this.paymentMethods.get(userId) || [];
    const methodIndex = userPaymentMethods.findIndex(pm => pm.id === paymentMethodId);

    if (methodIndex === -1) {
      throw new Error('Payment method not found');
    }

    userPaymentMethods[methodIndex] = {
      ...userPaymentMethods[methodIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.paymentMethods.set(userId, userPaymentMethods);

    return { success: true, paymentMethod: userPaymentMethods[methodIndex] };
  }

  async deletePaymentMethod(paymentMethodId) {
    await simulateNetworkDelay(400, 900);
    simulateError();

    if (!this.currentUser) {
      throw new Error('User not logged in');
    }

    const userId = this.currentUser.id;
    const userPaymentMethods = this.paymentMethods.get(userId) || [];
    const methodIndex = userPaymentMethods.findIndex(pm => pm.id === paymentMethodId);

    if (methodIndex === -1) {
      throw new Error('Payment method not found');
    }

    const deletedMethod = userPaymentMethods[methodIndex];
    userPaymentMethods.splice(methodIndex, 1);

    // If deleted method was default, make the first remaining method default
    if (deletedMethod.isDefault && userPaymentMethods.length > 0) {
      userPaymentMethods[0].isDefault = true;
    }

    this.paymentMethods.set(userId, userPaymentMethods);

    return { success: true, message: 'Payment method deleted successfully' };
  }

  async setDefaultPaymentMethod(paymentMethodId) {
    await simulateNetworkDelay(300, 700);
    simulateError();

    if (!this.currentUser) {
      throw new Error('User not logged in');
    }

    const userId = this.currentUser.id;
    const userPaymentMethods = this.paymentMethods.get(userId) || [];
    
    // Reset all methods to non-default
    userPaymentMethods.forEach(pm => pm.isDefault = false);
    
    // Set new default
    const targetMethod = userPaymentMethods.find(pm => pm.id === paymentMethodId);
    if (!targetMethod) {
      throw new Error('Payment method not found');
    }

    targetMethod.isDefault = true;
    this.paymentMethods.set(userId, userPaymentMethods);

    return { success: true, message: 'Default payment method updated' };
  }

  async getDonationHistory() {
    await simulateNetworkDelay(400, 900);
    simulateError();

    if (!this.currentUser) {
      throw new Error('User not logged in');
    }

    const userId = this.currentUser.id;
    const userDonations = this.donationHistory.get(userId) || [];

    return { 
      success: true, 
      donations: userDonations.sort((a, b) => new Date(b.date) - new Date(a.date))
    };
  }

  // Volunteer Management
  async submitVolunteerApplication(volunteerData) {
    await simulateNetworkDelay(800, 1500);
    simulateError();

    const application = {
      id: Date.now(),
      ...volunteerData,
      status: 'pending',
      submissionDate: new Date().toISOString()
    };

    return { success: true, application };
  }

  async fetchVolunteerOpportunities() {
    await simulateNetworkDelay();
    return [
      {
        id: 1,
        title: 'Canvassing - Nassau Central',
        description: 'Door-to-door community outreach',
        date: '2024-12-28',
        timeCommitment: '4 hours',
        location: 'Nassau Central District',
        volunteersNeeded: 15,
        volunteersSignedUp: 8
      },
      {
        id: 2,
        title: 'Event Setup - Youth Summit',
        description: 'Help set up the Youth Leadership Summit',
        date: '2025-01-05',
        timeCommitment: '6 hours',
        location: 'University of The Bahamas',
        volunteersNeeded: 20,
        volunteersSignedUp: 12
      }
    ];
  }

  // Surveys and Polls
  async fetchSurveys() {
    await simulateNetworkDelay();
    return [
      {
        id: 1,
        title: 'Community Priorities Survey',
        description: 'Help us understand what matters most to you',
        questions: [
          {
            id: 1,
            question: 'What is your top priority for community development?',
            type: 'multiple-choice',
            options: ['Healthcare', 'Education', 'Infrastructure', 'Economy', 'Environment']
          },
          {
            id: 2,
            question: 'How would you rate current government services?',
            type: 'rating',
            scale: 5
          }
        ],
        isActive: true,
        responseCount: 1247
      }
    ];
  }

  async submitSurvey(surveyId, responses) {
    await simulateNetworkDelay(600, 1200);
    return { success: true, message: 'Thank you for your feedback!' };
  }

  // Notifications
  async fetchNotifications() {
    await simulateNetworkDelay();
    return [
      {
        id: 1,
        title: 'New Event: Community Rally',
        message: 'Join us for a community rally in Nassau on December 25th',
        type: 'event',
        date: new Date().toISOString(),
        read: false
      },
      {
        id: 2,
        title: 'Healthcare Initiative Update',
        message: 'New details about the universal healthcare program',
        type: 'news',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ];
  }

  // Dashboard
  async fetchDashboardStats() {
    await simulateNetworkDelay();
    simulateError();

    return {
      activeMembers: mockUserStats.activeMembers,
      upcomingEvents: mockEvents.filter(e => new Date(e.date_time) > new Date()).length,
      recentNews: mockNews.length,
      totalDonations: mockUserStats.totalDonations,
      userStats: this.currentUser ? {
        eventsAttended: this.currentUser.eventsAttended,
        donationTotal: this.currentUser.donationTotal,
        badges: this.currentUser.badges?.length || 0
      } : null
    };
  }

  // Utility methods
  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.getCurrentUser();
  }

  setOfflineMode(isOffline) {
    this.isOnline = !isOffline;
  }
}

// Export singleton instance
export const mockApi = new MockApiService();