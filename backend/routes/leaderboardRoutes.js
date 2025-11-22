// backend/routes/leaderboardRoutes.js

const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route GET /api/leaderboard
 * @desc Fetches and ranks users based on problems solved and points
 * @access Public
 */
router.get('/', leaderboardController.getGlobalLeaderboard);

/**
 * @route GET /api/leaderboard/user-rank
 * @desc Get current user's rank and stats
 * @access Private
 */
router.get('/user-rank', authMiddleware, leaderboardController.getUserRank);

/**
 * @route GET /api/leaderboard/total-users
 * @desc Get total number of users with solved problems
 * @access Public
 */
router.get('/total-users', leaderboardController.getTotalUsers);

module.exports = router;