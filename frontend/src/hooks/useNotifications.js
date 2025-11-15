import { useState, useEffect, useCallback } from 'react';
import { notificationService } from '../services/notificationService.js';
import socketService from '../services/socketService.js';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async (page = 1, limit = 20) => {
    if (!localStorage.getItem('token')) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await notificationService.getNotifications({ page, limit });
      setNotifications(response.data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err.response?.data?.msg || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUnreadCount = useCallback(async () => {
    if (!localStorage.getItem('token')) return;
    
    try {
      const response = await notificationService.getUnreadCount();
      setUnreadCount(response.count || 0);
    } catch (err) {
      console.error('Error fetching unread count:', err);
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
    await Promise.all([fetchNotifications(), fetchUnreadCount()]);
  }, [fetchNotifications, fetchUnreadCount]);

  // Handle real-time notifications
  useEffect(() => {
    const handleNewNotification = (newNotification) => {
      console.log('📢 New real-time notification:', newNotification);
      
      // Add new notification to the top of the list
      setNotifications(prev => [newNotification, ...prev]);
      
      // Increment unread count
      setUnreadCount(prev => prev + 1);
      
      // Show browser notification if permitted
      if (Notification.permission === 'granted' && document.hidden) {
        new Notification(newNotification.title, {
          body: newNotification.message,
          icon: '/favicon.ico',
          tag: 'cs-studio'
        });
      }
    };

    socketService.onNotification(handleNewNotification);

    return () => {
      socketService.offNotification(handleNewNotification);
    };
  }, []);

  // Initialize socket connection and fetch notifications
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        socketService.connect(token);
        refreshNotifications();
      } catch (error) {
        console.error('Socket connection failed:', error);
      }
    }

    return () => {
      // Don't disconnect here - let App.jsx handle it
    };
  }, [refreshNotifications]);

  // Request browser notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
  }, []);

  // Poll for updates when tab is visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchUnreadCount();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchUnreadCount();
      }
    }, 60000); // Check every minute

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, [fetchUnreadCount]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
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