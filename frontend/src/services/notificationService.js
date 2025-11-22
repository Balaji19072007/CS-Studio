import { apiService } from './apiService.js';

export const notificationService = {
  getNotifications: async (params = {}) => {
    try {
      const response = await apiService.get('/api/notifications', { params });
      return response.data || { data: [] };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Return empty structure instead of throwing for better UX
      return { data: [] };
    }
  },

  getUnreadCount: async () => {
    try {
      const response = await apiService.get('/api/notifications/unread-count');
      return response.data || { count: 0 };
    } catch (error) {
      console.error('Error fetching unread count:', error);
      return { count: 0 };
    }
  },

  markAsRead: async (notificationId) => {
    try {
      const response = await apiService.patch(`/api/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  markAllAsRead: async () => {
    try {
      const response = await apiService.patch('/api/notifications/mark-all-read');
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  deleteNotification: async (notificationId) => {
    try {
      const response = await apiService.delete(`/api/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  clearAll: async () => {
    try {
      const response = await apiService.delete('/api/notifications/clear-all');
      return response.data;
    } catch (error) {
      console.error('Error clearing all notifications:', error);
      throw error;
    }
  },

  // NEW: Create notification (for testing/admin purposes)
  createNotification: async (notificationData) => {
    try {
      const response = await apiService.post('/api/notifications', notificationData);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }
};

export default notificationService;