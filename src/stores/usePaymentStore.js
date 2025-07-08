import { create } from 'zustand';
import { mockApi } from '@/services/mockApi';

const usePaymentStore = create((set, get) => ({
  paymentMethods: [],
  defaultPaymentMethod: null,
  donationHistory: [],
  isLoading: false,
  error: null,

  // Load user's payment methods
  loadPaymentMethods: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApi.getPaymentMethods();
      if (response.success) {
        set({ 
          paymentMethods: response.paymentMethods,
          defaultPaymentMethod: response.defaultPaymentMethod || null,
          isLoading: false 
        });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Add new payment method
  addPaymentMethod: async (paymentMethodData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApi.addPaymentMethod(paymentMethodData);
      if (response.success) {
        const currentMethods = get().paymentMethods;
        const newMethods = [...currentMethods, response.paymentMethod];
        
        // If this is the first payment method, make it default
        const defaultPaymentMethod = currentMethods.length === 0 
          ? response.paymentMethod 
          : get().defaultPaymentMethod;
        
        set({ 
          paymentMethods: newMethods,
          defaultPaymentMethod,
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

  // Update existing payment method
  updatePaymentMethod: async (paymentMethodId, updates) => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApi.updatePaymentMethod(paymentMethodId, updates);
      if (response.success) {
        const currentMethods = get().paymentMethods;
        const updatedMethods = currentMethods.map(method => 
          method.id === paymentMethodId 
            ? { ...method, ...response.paymentMethod }
            : method
        );
        
        set({ 
          paymentMethods: updatedMethods,
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

  // Delete payment method
  deletePaymentMethod: async (paymentMethodId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApi.deletePaymentMethod(paymentMethodId);
      if (response.success) {
        const currentMethods = get().paymentMethods;
        const filteredMethods = currentMethods.filter(method => method.id !== paymentMethodId);
        
        // If deleted method was default, set new default
        const currentDefault = get().defaultPaymentMethod;
        let newDefault = currentDefault;
        
        if (currentDefault && currentDefault.id === paymentMethodId) {
          newDefault = filteredMethods.length > 0 ? filteredMethods[0] : null;
        }
        
        set({ 
          paymentMethods: filteredMethods,
          defaultPaymentMethod: newDefault,
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

  // Set default payment method
  setDefaultPaymentMethod: async (paymentMethodId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApi.setDefaultPaymentMethod(paymentMethodId);
      if (response.success) {
        const currentMethods = get().paymentMethods;
        const defaultMethod = currentMethods.find(method => method.id === paymentMethodId);
        
        set({ 
          defaultPaymentMethod: defaultMethod,
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

  // Load donation history
  loadDonationHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApi.getDonationHistory();
      if (response.success) {
        set({ 
          donationHistory: response.donations,
          isLoading: false 
        });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Process donation with enhanced features
  processDonation: async (donationData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApi.processDonation(donationData);
      if (response.success) {
        // Update donation history
        const currentHistory = get().donationHistory;
        const newHistory = [response.donation, ...currentHistory];
        
        set({ 
          donationHistory: newHistory,
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

  // Get payment method by ID
  getPaymentMethodById: (id) => {
    const methods = get().paymentMethods;
    return methods.find(method => method.id === id);
  },

  // Get payment methods by type
  getPaymentMethodsByType: (type) => {
    const methods = get().paymentMethods;
    return methods.filter(method => method.type === type);
  },

  // Check if user has any payment methods
  hasPaymentMethods: () => {
    return get().paymentMethods.length > 0;
  },

  // Get formatted payment method display
  getPaymentMethodDisplay: (paymentMethod) => {
    if (!paymentMethod) return '';
    
    switch (paymentMethod.type) {
      case 'card':
        return `•••• •••• •••• ${paymentMethod.lastFour}`;
      case 'paypal':
        return paymentMethod.email;
      case 'bank':
        return `${paymentMethod.bankName} •••${paymentMethod.lastFour}`;
      default:
        return paymentMethod.displayName || 'Unknown';
    }
  },

  // Clear all payment data (for logout)
  clearPaymentData: () => {
    set({
      paymentMethods: [],
      defaultPaymentMethod: null,
      donationHistory: [],
      isLoading: false,
      error: null
    });
  },

  // Clear errors
  clearError: () => {
    set({ error: null });
  }
}));

export default usePaymentStore;