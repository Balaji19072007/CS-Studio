const Notification = require('../models/Notification');
const socketService = require('./socketService');

class NotificationSender {
  // Send notification to specific user
  static async sendToUser(userId, notificationData) {
    try {
      const notification = new Notification({
        user: userId,
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type || 'system',
        link: notificationData.link,
        important: notificationData.important || false
      });

      await notification.save();
      
      // Emit real-time notification via socket
      socketService.emitToUser(userId, 'new_notification', notification);
      
      return notification;
    } catch (error) {
      console.error('Error sending notification to user:', error);
      throw error;
    }
  }

  // Send notification to multiple users
  static async sendToUsers(userIds, notificationData) {
    try {
      const notifications = [];
      
      for (const userId of userIds) {
        const notification = new Notification({
          user: userId,
          title: notificationData.title,
          message: notificationData.message,
          type: notificationData.type || 'system',
          link: notificationData.link,
          important: notificationData.important || false
        });
        
        await notification.save();
        notifications.push(notification);
        
        // Emit real-time notification via socket
        socketService.emitToUser(userId, 'new_notification', notification);
      }
      
      return notifications;
    } catch (error) {
      console.error('Error sending notifications to users:', error);
      throw error;
    }
  }

  // Send broadcast notification to all users
  static async broadcast(notificationData) {
    try {
      // This would typically query your user database
      // For now, we'll handle this in the controller
      return await this.sendToUsers([], notificationData); // You'll modify this
    } catch (error) {
      console.error('Error broadcasting notification:', error);
      throw error;
    }
  }

  // Course-related notifications
  static async sendCourseUpdate(courseId, updateData) {
    // Get all users enrolled in the course
    // const enrolledUsers = await getEnrolledUsers(courseId);
    // return this.sendToUsers(enrolledUsers, {
    //   title: `Course Updated: ${updateData.courseName}`,
    //   message: updateData.message,
    //   type: 'course',
    //   link: `/courses/${courseId}`
    // });
  }

  // Achievement notifications
  static async sendAchievement(userId, achievementData) {
    return this.sendToUser(userId, {
      title: 'Achievement Unlocked!',
      message: `You've earned the "${achievementData.name}" achievement!`,
      type: 'achievement',
      link: '/profile/achievements',
      important: true
    });
  }
}

module.exports = NotificationSender;