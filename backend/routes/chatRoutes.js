// backend/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST /api/chat/cs-mentor
router.post('/cs-mentor', chatController.chat);

module.exports = router;
