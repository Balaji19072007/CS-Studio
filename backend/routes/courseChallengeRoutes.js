const express = require('express');
const router = express.Router();
const courseChallengeController = require('../controllers/courseChallengeController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route to view (or handle optional auth inside controller if needed, but here we likely want public read, protected write)
// Actually controller checks req.user for status, so we use optional auth middleware if available, or just handle it. 
// Existing authMiddleware usually enforces auth.
// We'll follow problemRoutes pattern: use authMiddleware for submit, and maybe optional for get.
// But implementation plan said "Get challenge details".
// Let's use a wrapper or check how `authMiddleware` works. 
// `problemRoutes.js` has manual token check for GET. I'll do the same for consistency if needed, 
// OR simpler: make GET public (status will be false if not logged in? No, we need status).
// I'll replicate the optional auth pattern from problemRoutes for the GET.

const jwt = require('jsonwebtoken');

const optionalAuth = async (req, res, next) => {
    const token = req.header('x-auth-token') ||
        req.header('Authorization')?.replace('Bearer ', '') ||
        req.query.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
        } catch (err) {
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
};

router.get('/:challengeId', optionalAuth, courseChallengeController.getChallenge);
router.get('/topic/:topicId', optionalAuth, courseChallengeController.getChallengeByTopic);

router.post('/:challengeId/submit', authMiddleware, courseChallengeController.submitChallenge);

module.exports = router;
