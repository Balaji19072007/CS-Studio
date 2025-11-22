// backend/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // FIXED: Changed userId to user to match the model
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // FIXED: Changed userId to user
    const total = await Notification.countDocuments({ user: req.user.id });

    res.json({
      success: true,
      data: notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while fetching notifications'
    });
  }
});

// @desc    Get unread notifications count
// @route   GET /api/notifications/unread-count
// @access  Private
router.get('/unread-count', auth, async (req, res) => {
  try {
    // FIXED: Changed userId to user
    const count = await Notification.countDocuments({ 
      user: req.user.id, 
      read: false 
    });

    res.json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while fetching unread count'
    });
  }
});

// @desc    Mark notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
router.patch('/:id/read', auth, async (req, res) => {
  try {
    // FIXED: Changed userId to user
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        msg: 'Notification not found'
      });
    }

    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while marking notification as read'
    });
  }
});

// @desc    Mark all notifications as read
// @route   PATCH /api/notifications/mark-all-read
// @access  Private
router.patch('/mark-all-read', auth, async (req, res) => {
  try {
    // FIXED: Changed userId to user
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { read: true }
    );

    res.json({
      success: true,
      msg: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while marking all notifications as read'
    });
  }
});

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // FIXED: Changed userId to user
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        msg: 'Notification not found'
      });
    }

    res.json({
      success: true,
      msg: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while deleting notification'
    });
  }
});

// @desc    Clear all notifications
// @route   DELETE /api/notifications/clear-all
// @access  Private
router.delete('/clear-all', auth, async (req, res) => {
  try {
    // FIXED: Changed userId to user
    await Notification.deleteMany({ user: req.user.id });

    res.json({
      success: true,
      msg: 'All notifications cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing notifications:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while clearing notifications'
    });
  }
});

// @desc    Create a test notification
// @route   POST /api/notifications/test
// @access  Private
router.post('/test', auth, async (req, res) => {
  try {
    const NotificationService = require('../util/notificationService');
    
    const testNotification = await NotificationService.sendNotification(req.user.id, {
      title: 'Test Notification ✅',
      message: 'This is a test notification to verify the system is working properly!',
      type: 'system',
      link: '/',
      important: true
    });

    res.json({
      success: true,
      message: 'Test notification sent successfully',
      data: testNotification
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending test notification',
      error: error.message
    });
  }
});

module.exports = router;