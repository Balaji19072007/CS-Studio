// controllers/progressController.js
const Progress = require('../models/Progress');
const User = require('../models/User');

// @route   POST /api/problems/:problemId/progress
// @desc    Update user progress when solving/attempting a problem
// @access  Private
exports.updateProgress = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { accuracy, isSolved } = req.body;
        const userId = req.user.id;

        // Find or create progress entry
        let progress = await Progress.findOne({
            userId: userId,
            problemId: parseInt(problemId)
        });

        if (!progress) {
            progress = new Progress({
                userId: userId,
                problemId: parseInt(problemId),
                status: 'attempted',
                bestAccuracy: accuracy
            });
        } else {
            // Update best accuracy if current attempt is better
            progress.bestAccuracy = Math.max(progress.bestAccuracy, accuracy);
        }

        // Update status if solved
        if (isSolved) {
            progress.status = 'solved';
            await progress.markAsSolved(accuracy);
        } else {
            progress.status = 'attempted';
            await progress.markAsAttempted(accuracy);
        }

        res.json({
            success: true,
            progress: {
                problemId: progress.problemId,
                status: progress.status,
                bestAccuracy: progress.bestAccuracy,
                lastSubmission: progress.lastSubmission
            }
        });

    } catch (err) {
        console.error('Progress update error:', err.message);
        res.status(500).json({ 
            success: false,
            msg: 'Server Error updating progress',
            error: err.message 
        });
    }
};

// @route   GET /api/progress/user-stats
// @desc    Get current user's progress statistics
// @access  Private
exports.getUserStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const userStats = await User.findById(userId)
            .select('problemsSolved totalPoints currentStreak averageAccuracy');

        const progressStats = await Progress.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const stats = {
            solved: progressStats.find(stat => stat._id === 'solved')?.count || 0,
            attempted: progressStats.find(stat => stat._id === 'attempted')?.count || 0,
            todo: progressStats.find(stat => stat._id === 'todo')?.count || 0
        };

        res.json({
            success: true,
            userStats,
            progressStats: stats
        });

    } catch (err) {
        console.error('User stats error:', err.message);
        res.status(500).json({ 
            success: false,
            msg: 'Server Error fetching user stats',
            error: err.message 
        });
    }
};