const express = require('express');
const router = express.Router();
const { getMyPlan, upgradePlan, checkAccess } = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/my-plan', authMiddleware, getMyPlan);
router.post('/upgrade', authMiddleware, upgradePlan);
router.get('/check-access/:feature', authMiddleware, checkAccess);

module.exports = router;
