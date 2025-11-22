// routes/progressRoutes.js
const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route POST /api/problems/:problemId/progress
 * @desc Update user progress for a problem
 * @access Private
 */
router.post('/:problemId/progress', authMiddleware, progressController.updateProgress);

/**
 * @route GET /api/progress/user-stats
 * @desc Get current user's progress statistics
 * @access Private
 */
router.get('/user-stats', authMiddleware, progressController.getUserStats);

module.exports = router;