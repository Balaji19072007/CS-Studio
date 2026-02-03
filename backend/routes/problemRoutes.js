// problemRoutes.js
const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');
const authMiddleware = require('../middleware/authMiddleware'); // NEW: Import auth middleware

const jwt = require('jsonwebtoken'); // NEW: Import jwt for manual verification

// @route   GET /api/problems
// Use optional auth to populate req.user if token exists
router.get('/', async (req, res, next) => {
    // Optional Auth Logic using Supabase
    const token = req.header('x-auth-token') ||
        req.header('Authorization')?.replace('Bearer ', '') ||
        req.query.token;

    if (token) {
        try {
            const { supabase } = require('../config/supabase');
            const { data: { user }, error } = await supabase.auth.getUser(token);

            if (user && !error) {
                req.user = {
                    id: user.id,
                    email: user.email,
                    role: user.role
                };
            } else {
                // Token invalid - proceed as guest
                console.log('Optional auth failed (Supabase error, proceeding as guest):', error?.message);
                req.user = null;
            }
        } catch (err) {
            console.log('Optional auth failed (proceeding as guest):', err.message);
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
}, problemController.getProblems);

// @route   GET /api/problems/daily
router.get('/daily', async (req, res, next) => {
    // Optional Auth Logic
    const token = req.header('x-auth-token') ||
        req.header('Authorization')?.replace('Bearer ', '') ||
        req.query.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.user) {
                req.user = decoded.user;
            }
        } catch (err) {
            // Token invalid/expired - proceed as guest
            console.log('Optional auth failed (proceeding as guest):', err.message);
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
}, problemController.getDailyProblem);

// @route   GET /api/problems/recommended
router.get('/recommended', authMiddleware, problemController.getRecommendedProblems);

// @route   GET /api/problems/:id
router.get('/:id', problemController.getProblemById);

// @route   GET /api/problems/:id/test-cases
router.get('/:id/test-cases', problemController.getProblemTestCases);

// @route   GET /api/problems/:id/progress
// Get user progress for a problem
router.get('/:id/progress', authMiddleware, problemController.getProblemProgress);

// --- NEW PROTECTED ROUTES (Requires authentication) ---

// @route   POST /api/problems/:id/run-tests
// Runs the user code against all test cases and returns results (Run All button)
router.post('/:id/run-tests', authMiddleware, problemController.runTestCases);

// @route   POST /api/problems/:id/submit
// Final submission: validates, updates progress status to 'solved', and updates user stats (Submit button)
router.post('/:id/submit', authMiddleware, problemController.submitProblem);

// @route   POST /api/problems/:id/progress
// Update user progress for a problem
router.post('/:id/progress', authMiddleware, problemController.updateProgress);

// Timer routes
router.post('/:id/start-timer', authMiddleware, problemController.startProblemTimer);
router.post('/:id/stop-timer', authMiddleware, problemController.stopProblemTimer);
router.get('/:id/timer', authMiddleware, problemController.getProblemTimer);

module.exports = router;