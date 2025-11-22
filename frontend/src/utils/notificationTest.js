import { notificationService } from '../services/notificationService';

export const notificationTest = {
  // Test function to create a sample notification
  sendTestNotification: async () => {
    try {
      const testNotification = {
        title: 'Test Notification',
        message: 'This is a test notification to verify the system is working.',
        type: 'system',
        important: false
      };

      const result = await notificationService.createNotification(testNotification);
      console.log('Test notification sent:', result);
      return result;
    } catch (error) {
      console.error('Failed to send test notification:', error);
    }
  },

  // Send course update notification
  sendCourseUpdate: async (courseName, message) => {
    try {
      const notification = {
        title: `Course Update: ${courseName}`,
        message: message,
        type: 'course',
        important: true
      };

      const result = await notificationService.createNotification(notification);
      return result;
    } catch (error) {
      console.error('Failed to send course update:', error);
    }
  }
};