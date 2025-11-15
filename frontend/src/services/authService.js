// src/services/authService.js
import { apiService } from './apiService.js';

export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await apiService.post('/api/auth/signin', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Login service error:', error);
      throw error;
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await apiService.post('/api/auth/signup', userData);
      return response.data;
    } catch (error) {
      console.error('Register service error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiService.get('/api/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await apiService.put('/api/auth/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiService.put('/api/auth/password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  // Logout (optional - if you have backend logout)
  logout: async () => {
    try {
      const response = await apiService.post('/api/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
};

export default authService;