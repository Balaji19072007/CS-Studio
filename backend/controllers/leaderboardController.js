// controllers/leaderboardController.js
const User = require('../models/User'); 
const Progress = require('../models/Progress');

// @route   GET /api/leaderboard
// @desc    Get top users sorted by problems solved and points
// @access  Public
exports.getGlobalLeaderboard = async (req, res) => {
    try {
        const { timeframe = 'all-time', category = 'all' } = req.query;

        // Build base query for users who have solved at least one problem
        let userQuery = { problemsSolved: { $gt: 0 } };

        // If timeframe filtering is needed in the future, we can add it here
        let progressMatch = {};
        if (timeframe !== 'all-time') {
            const now = new Date();
            let startDate;
            
            switch (timeframe) {
                case 'monthly':
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case 'weekly':
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - 7);
                    break;
                case 'daily':
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - 1);
                    break;
                default:
                    startDate = new Date(0);
            }
            
            progressMatch.lastSubmission = { $gte: startDate };
        }

        // 1. Fetch Users sorted by problems solved (descending), then by total points (descending)
        const topUsers = await User.find(userQuery)
            .select('firstName lastName username totalPoints problemsSolved currentStreak averageAccuracy photoUrl updatedAt')
            .sort({ 
                problemsSolved: -1, 
                totalPoints: -1,
                averageAccuracy: -1,
                currentStreak: -1 
            })
            .limit(100); // Increased limit to show more users

        // 2. Format data for the front-end with proper ranking
        const leaderboardData = topUsers.map((user, index) => ({
            rank: index + 1,
            _id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            username: user.username,
            solved: user.problemsSolved,
            accuracy: Math.round(user.averageAccuracy) || 0,
            streak: user.currentStreak,
            points: user.totalPoints,
            photoUrl: user.photoUrl,
            updatedAt: user.updatedAt
        }));

        res.json(leaderboardData);

    } catch (err) {
        console.error('Leaderboard error:', err.message);
        res.status(500).json({ 
            success: false,
            msg: 'Server Error fetching leaderboard',
            error: err.message 
        });
    }
};

// @route   GET /api/leaderboard/user-rank
// @desc    Get current user's rank and stats
// @access  Private
exports.getUserRank = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get all users sorted by problems solved and points
        const allUsers = await User.find({ problemsSolved: { $gt: 0 } })
            .select('firstName lastName username problemsSolved totalPoints currentStreak averageAccuracy photoUrl')
            .sort({ 
                problemsSolved: -1, 
                totalPoints: -1,
                averageAccuracy: -1 
            });

        // Find current user's position
        const userIndex = allUsers.findIndex(user => user._id.toString() === userId);
        const userRank = userIndex !== -1 ? userIndex + 1 : allUsers.length + 1;

        // Get current user's full data
        const currentUser = await User.findById(userId)
            .select('firstName lastName username problemsSolved totalPoints currentStreak averageAccuracy photoUrl');

        if (!currentUser) {
            return res.status(404).json({ 
                success: false, 
                msg: 'User not found' 
            });
        }

        res.json({
            success: true,
            rank: userRank,
            totalUsers: allUsers.length,
            user: {
                _id: currentUser._id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                username: currentUser.username,
                problemsSolved: currentUser.problemsSolved,
                totalPoints: currentUser.totalPoints,
                currentStreak: currentUser.currentStreak,
                averageAccuracy: currentUser.averageAccuracy,
                photoUrl: currentUser.photoUrl
            }
        });

    } catch (err) {
        console.error('User rank error:', err.message);
        res.status(500).json({ 
            success: false,
            msg: 'Server Error fetching user rank',
            error: err.message 
        });
    }
};

// @route   GET /api/leaderboard/total-users
// @desc    Get total number of users with solved problems
// @access  Public
exports.getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ problemsSolved: { $gt: 0 } });
        res.json({ 
            success: true,
            totalUsers 
        });
    } catch (err) {
        console.error('Total users error:', err.message);
        res.status(500).json({ 
            success: false,
            msg: 'Server Error fetching total users',
            error: err.message 
        });
    }
};