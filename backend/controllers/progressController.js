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
            // NEW: Set solvedAt ONLY on the first solve
            if (!progress.solvedAt) {
                progress.solvedAt = new Date().toISOString();
            }
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
// @desc    Get full problem history for user with problem details (REGULAR PROBLEMS ONLY)
// @access  Private
exports.getHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all progress for this user
        let history = await Progress.find({ userId });

        // Filter out course problems (ID >= 1001)
        history = history.filter(h => h.problemId < 1001);

        // Sort in memory (descending date)
        history.sort((a, b) => new Date(b.lastSubmission) - new Date(a.lastSubmission));

        // Fetch all problems to map details (Using JSON source)
        const { loadAllProblems } = require('../util/problemUtils');
        const allProblems = await loadAllProblems();

        const problemMap = {};
        allProblems.forEach(p => {
            problemMap[p.id] = p; // JSON uses 'id'
        });

        const enrichedHistory = history.map(h => {
            // Auto-correct status: If accuracy is 100%, consider it solved
            // This fixes legacy/bugged records showing "Attempted" with 100% score
            const isActuallySolved = h.bestAccuracy === 100;
            const finalStatus = isActuallySolved ? 'solved' : h.status;

            return {
                problemId: h.problemId,
                title: problemMap[h.problemId]?.title || 'Unknown Problem',
                difficulty: problemMap[h.problemId]?.difficulty || 'Medium',
                status: finalStatus,
                bestAccuracy: h.bestAccuracy,
                timeTaken: h.timeSpent !== undefined ? h.timeSpent : 0,
                lastSubmission: h.lastSubmission,
                solvedAt: isActuallySolved ? (h.solvedAt || h.lastSubmission) : h.solvedAt
            };
        });

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
// @desc    Get current user's progress statistics (Summary + Difficulty Breakdown) - REGULAR PROBLEMS ONLY
// @access  Private
exports.getUserStats = async (req, res) => {
    try {
        console.log('⚡ getUserStats called for:', req.user.id);
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) console.warn('⚠️ User not found in DB for stats:', userId);

        if (user) {
            // Validate Streak
            try {
                await Progress.checkStreak(userId, user);
            } catch (error) {
                console.error('Stats streak check failed:', error);
            }
        }

        const userStats = user ? {
            problemsSolved: user.problemsSolved,
            totalPoints: user.totalPoints,
            currentStreak: user.currentStreak,
            averageAccuracy: user.averageAccuracy
        } : {};

        // Basic Counts from Progress - EXCLUDE COURSE PROBLEMS (ID >= 1001)
        const allUserProgress = await Progress.find({ userId });
        const userProgress = allUserProgress.filter(p => p.problemId < 1001);
        console.log(`Found ${userProgress.length} regular problem progress records for stats (excluded ${allUserProgress.length - userProgress.length} course problems).`);

        const stats = {
            solved: userProgress.filter(p => p.status === 'solved').length,
            attempted: userProgress.filter(p => p.status === 'attempted').length,
            todo: 0
        };

        // Difficulty Breakdown (Solved Problems Only)
        // 1. Get solved problem IDs
        const solvedIds = userProgress
            .filter(p => p.status === 'solved')
            .map(p => p.problemId);

        // 2. Fetch all problems to count difficulties (Using JSON source instead of DB)
        const { loadAllProblems } = require('../util/problemUtils');
        const allProblems = await loadAllProblems();

        // Filter to only regular problems
        const regularProblems = allProblems.filter(p => p.problemType === 'regular' || p.id < 1001);

        // Difficulty stats for solved
        const difficultyBreakdown = {
            Easy: 0, Medium: 0, Hard: 0
        };

        solvedIds.forEach(pid => {
            const prob = regularProblems.find(p => p.id === pid); // JSON uses 'id'
            if (prob && difficultyBreakdown[prob.difficulty] !== undefined) {
                difficultyBreakdown[prob.difficulty]++;
            }
        });

        // Total Problems Count by Difficulty (REGULAR ONLY)
        const totalBreakdown = {
            Easy: 0, Medium: 0, Hard: 0, Total: regularProblems.length
        };

        regularProblems.forEach(p => {
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