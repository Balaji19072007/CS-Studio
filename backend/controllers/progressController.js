const Progress = require('../models/Progress');
const User = require('../models/User');
const Problem = require('../models/Problem');

// @route   POST /api/problems/:problemId/progress
// @desc    Update user progress when solving/attempting a problem
// @access  Private
exports.updateProgress = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { accuracy, isSolved } = req.body;
        const userId = req.user.id;

        // Find or create progress entry
        // Note: Progress.findOne returns instance or null
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
        } else {
            if (progress.status !== 'solved') {
                progress.status = 'attempted';
            }
        }

        // Update timer/lastSubmission
        progress.lastSubmission = new Date().toISOString();

        await progress.save();

        // Trigger User Stats Update
        await Progress.updateUserStats(userId, accuracy, isSolved);

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

// @route   GET /api/progress/history
// @desc    Get full problem history for user with problem details
// @access  Private
exports.getHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all progress for this user
        let history = await Progress.find({ userId });

        // Sort in memory (descending date)
        history.sort((a, b) => new Date(b.lastSubmission) - new Date(a.lastSubmission));

        // Fetch all problems to map details (Optimization: fetch minimal fields if possible, but find() returns all for now)
        const allProblems = await Problem.find();

        const problemMap = {};
        allProblems.forEach(p => {
            problemMap[p.problemId] = p;
        });

        const enrichedHistory = history.map(h => ({
            problemId: h.problemId,
            title: problemMap[h.problemId]?.title || 'Unknown Problem',
            difficulty: problemMap[h.problemId]?.difficulty || 'Medium',
            status: h.status,
            bestAccuracy: h.bestAccuracy,
            timeTaken: h.timer?.duration || 0,
            lastSubmission: h.lastSubmission
        }));

        res.json({
            success: true,
            history: enrichedHistory
        });

    } catch (err) {
        console.error('Get history error:', err.message);
        res.status(500).json({ success: false, msg: 'Server Error fetching history' });
    }
};

// @route   GET /api/progress/user-stats
// @desc    Get current user's progress statistics (Summary + Difficulty Breakdown)
// @access  Private
exports.getUserStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        const userStats = user ? {
            problemsSolved: user.problemsSolved,
            totalPoints: user.totalPoints,
            currentStreak: user.currentStreak,
            averageAccuracy: user.averageAccuracy
        } : {};

        // Basic Counts from Progress
        const userProgress = await Progress.find({ userId });

        const stats = {
            solved: userProgress.filter(p => p.status === 'solved').length,
            attempted: userProgress.filter(p => p.status === 'attempted').length,
            todo: 0 // 'todo' usually not saved in Progress unless explicitly started. Or logic is total - (solved+attempted). 
            // But frontend might expect specific counts.
        };

        // Difficulty Breakdown (Solved Problems Only)
        // 1. Get solved problem IDs
        const solvedIds = userProgress
            .filter(p => p.status === 'solved')
            .map(p => p.problemId);

        // 2. Fetch all problems to count difficulties
        const allProblems = await Problem.find();

        // Difficulty stats for solved
        const difficultyBreakdown = {
            Easy: 0, Medium: 0, Hard: 0
        };

        solvedIds.forEach(pid => {
            const prob = allProblems.find(p => p.problemId === pid);
            if (prob && difficultyBreakdown[prob.difficulty] !== undefined) {
                difficultyBreakdown[prob.difficulty]++;
            }
        });

        // Total Problems Count by Difficulty
        const totalBreakdown = {
            Easy: 0, Medium: 0, Hard: 0, Total: allProblems.length
        };

        allProblems.forEach(p => {
            if (totalBreakdown[p.difficulty] !== undefined) {
                totalBreakdown[p.difficulty]++;
            }
        });

        // Calculate "todo" as Total - (Solved + Attempted)
        // Or if 'todo' means "not started", it's Total - userProgress.length (unique problemIds)
        // Assuming userProgress only contains touched problems.
        const uniqueTouched = new Set(userProgress.map(p => p.problemId)).size;
        stats.todo = totalBreakdown.Total - uniqueTouched;

        res.json({
            success: true,
            userStats,
            progressStats: stats,
            difficultyBreakdown,
            totalBreakdown
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