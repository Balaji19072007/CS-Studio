import { useState, useEffect, useCallback } from 'react';
import { notificationService } from '../services/notificationService.js';
import socketService from '../services/socketService.js';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socketInitialized, setSocketInitialized] = useState(false);

  const fetchNotifications = useCallback(async (page = 1, limit = 20) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await notificationService.getNotifications({ page, limit });
      // Robustly handle response structure
      let notifs = [];
      if (response && Array.isArray(response.data)) {
        notifs = response.data;
      } else if (Array.isArray(response)) {
        notifs = response;
      } else if (response && response.data && Array.isArray(response.data.data)) {
        // Handle { data: { data: [] } } case if apiService wraps differently
        notifs = response.data.data;
      }

      setNotifications(notifs);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err.response?.data?.msg || 'Failed to fetch notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUnreadCount = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUnreadCount(0);
      return;
    }

    try {
      const response = await notificationService.getUnreadCount();
      setUnreadCount(response.count || 0);
    } catch (err) {
      console.error('Error fetching unread count:', err);
      setUnreadCount(0);
    }
  }, []);

  // FIXED: Better real-time notification handler
  const handleNewNotification = useCallback((newNotification) => {
    console.log('📢 REAL-TIME: New notification received via socket:', newNotification);

    // Immediately update both notifications list and unread count
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Show browser notification
    if (Notification.permission === 'granted' && document.hidden) {
      new Notification(newNotification.title, {
        body: newNotification.message,
        icon: '/favicon.ico',
        tag: 'cs-studio'
      });
    }
  }, []);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);

      setNotifications(prev =>
        prev.map(notification =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );

      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
      throw err;
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead();

      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );

      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      throw err;
    }
  }, []);

  const clearAllNotifications = useCallback(async () => {
    try {
      await notificationService.clearAll();

      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error('Error clearing notifications:', err);
      throw err;
    }
  }, []);

  const deleteNotification = useCallback(async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);

      setNotifications(prev =>
        prev.filter(notification => notification._id !== notificationId)
      );

      // Update unread count
      const deletedNotification = notifications.find(n => n._id === notificationId);
      if (deletedNotification && !deletedNotification.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
      throw err;
    }
  }, [notifications]);

  const refreshNotifications = useCallback(async () => {
    console.log('🔄 Manually refreshing notifications...');
    await Promise.all([fetchNotifications(), fetchUnreadCount()]);
  }, [fetchNotifications, fetchUnreadCount]);

  // FIXED: Better socket initialization
  useEffect(() => {
    const initializeSocket = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');

      if (token && userData && !socketInitialized) {
        try {
          console.log('🔌 Initializing socket connection...');

          // Set up notification listener FIRST
          socketService.onNotification(handleNewNotification);

          // Then connect socket
          socketService.connect(token);

          setSocketInitialized(true);
          console.log('✅ Socket service initialized');

        } catch (error) {
          console.error('❌ Socket initialization failed:', error);
        }
      }
    };

    initializeSocket();

    return () => {
      // Cleanup
      if (socketInitialized) {
        console.log('🧹 Cleaning up socket listeners');
        socketService.offNotification(handleNewNotification);
      }
    };
  }, [socketInitialized, handleNewNotification]);

  // Initial data fetch
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      refreshNotifications();
    }
  }, [refreshNotifications]);

  // Request browser notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    socketInitialized,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    deleteNotification,
    refreshNotifications,
  };
};

export default useNotifications;