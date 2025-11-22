// backend/util/notificationService.js
const Notification = require('../models/Notification');

class NotificationService {
  /**
   * Send notification to a single user with real-time emission
   */
  static async sendNotification(userId, notificationData) {
    try {
      const notification = new Notification({
        user: userId,
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type || 'system',
        link: notificationData.link || '',
        important: notificationData.important || false,
        data: notificationData.data || {}
      });

      await notification.save();

      // EMIT REAL-TIME NOTIFICATION - FIXED
      await this.emitRealTimeNotification(userId, notification);

      console.log(`📢 Notification sent to user ${userId}: ${notificationData.title}`);
      return notification;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  /**
   * Emit real-time notification via Socket.IO - FIXED VERSION
   */
  static async emitRealTimeNotification(userId, notification) {
    try {
      // Get the io instance from server.js
      const { io } = require('../server');
      
      if (io) {
        console.log(`📡 EMITTING real-time notification to user_${userId}:`, notification.title);
        
        // Convert Mongoose document to plain object
        const notificationObj = notification.toObject ? notification.toObject() : notification;
        
        // Emit to the specific user's room
        io.to(`user_${userId}`).emit('new-notification', notificationObj);
        console.log(`✅ Real-time notification emitted to user_${userId}`);
        
        return true;
      } else {
        console.error('❌ Socket.IO instance not available');
        return false;
      }
    } catch (error) {
      console.error('❌ Error emitting real-time notification:', error);
      return false;
    }
  }

  /**
   * Send notification to multiple users
   */
  static async sendBulkNotifications(userIds, notificationData) {
    try {
      const notifications = userIds.map(userId => ({
        user: userId,
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type || 'system',
        link: notificationData.link || '',
        important: notificationData.important || false,
        data: notificationData.data || {}
      }));

      const result = await Notification.insertMany(notifications);
      
      // Emit real-time notifications for each user
      for (let i = 0; i < result.length; i++) {
        await this.emitRealTimeNotification(userIds[i], result[i]);
      }
      
      console.log(`📢 Bulk notifications sent to ${userIds.length} users: ${notificationData.title}`);
      return result;
    } catch (error) {
      console.error('Error sending bulk notifications:', error);
      throw error;
    }
  }

  // ==================== SPECIFIC NOTIFICATION TYPES ====================

  /**
   * Course completion notification
   */
  static async sendCourseCompletion(userId, courseName, courseId) {
    return this.sendNotification(userId, {
      title: 'Course Completed! 🎉',
      message: `Congratulations! You've successfully completed "${courseName}"`,
      type: 'course',
      link: `/courses/${courseId}`,
      important: true,
      data: { courseName, courseId }
    });
  }

  /**
   * Progress milestone notification
   */
  static async sendProgressMilestone(userId, milestone, points) {
    return this.sendNotification(userId, {
      title: 'Progress Milestone! ⭐',
      message: `Amazing! You've reached ${milestone} and earned ${points} points!`,
      type: 'progress',
      link: '/my-progress',
      data: { milestone, points }
    });
  }

  /**
   * New challenge available notification
   */
  static async sendNewChallenge(userId, challengeName, challengeId) {
    return this.sendNotification(userId, {
      title: 'New Challenge Available! 🚀',
      message: `A new challenge "${challengeName}" is waiting for you!`,
      type: 'challenge',
      link: `/problems/${challengeId}`,
      data: { challengeName, challengeId }
    });
  }

  /**
   * Achievement unlocked notification
   */
  static async sendAchievementUnlocked(userId, achievementName, description) {
    return this.sendNotification(userId, {
      title: 'Achievement Unlocked! 🏆',
      message: `You unlocked "${achievementName}": ${description}`,
      type: 'achievement',
      link: '/my-progress',
      important: true,
      data: { achievementName, description }
    });
  }

  /**
   * Problem solved notification
   */
  static async sendProblemSolved(userId, problemName, difficulty, points) {
    return this.sendNotification(userId, {
      title: 'Problem Solved! ✅',
      message: `Great job! You solved "${problemName}" (${difficulty}) and earned ${points} points`,
      type: 'progress',
      link: '/problems',
      data: { problemName, difficulty, points }
    });
  }

  /**
   * Streak milestone notification
   */
  static async sendStreakMilestone(userId, streakDays) {
    return this.sendNotification(userId, {
      title: 'Streak Milestone! 🔥',
      message: `You're on fire! ${streakDays}-day coding streak! Keep it up!`,
      type: 'progress',
      link: '/my-progress',
      data: { streakDays }
    });
  }

  /**
   * System announcement
   */
  static async sendSystemAnnouncement(userId, title, message, link = '') {
    return this.sendNotification(userId, {
      title: `System: ${title}`,
      message: message,
      type: 'system',
      link: link,
      important: true
    });
  }

  /**
   * Community interaction notification
   */
  static async sendCommunityNotification(userId, interactionType, userName, postId) {
    const messages = {
      'like': 'liked your post',
      'comment': 'commented on your post',
      'follow': 'started following you',
      'mention': 'mentioned you in a post'
    };

    return this.sendNotification(userId, {
      title: 'Community Update 👥',
      message: `${userName} ${messages[interactionType] || 'interacted with your content'}`,
      type: 'community',
      link: `/community/post/${postId}`,
      data: { interactionType, userName, postId }
    });
  }
}

module.exports = NotificationService;