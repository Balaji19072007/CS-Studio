const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const express = require('express');
// Forced restart trigger
// Forced restart trigger
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const axios = require('axios');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const jwt = require('jsonwebtoken');

// --- Firestore Init ---
const { db } = require('./config/firebase');

const app = express();
const server = http.createServer(app);



// --- Database Connection ---
// Database is fully handled by Firestore (Firebase Admin SDK/Client SDK)


// --- Model Imports ---
const User = require('./models/User');
// Note: Problem, Notification models need to be migrated or mocked if used
// For now, we focus on Auth which uses User

// --- Controller & Route Imports ---
const authRoutes = require('./routes/authRoutes');
const googleAuthRoutes = require('./routes/googleAuthRoutes');
const problemRoutes = require('./routes/problemRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const chatRoutes = require('./routes/chatRoutes');
// const predictionRoutes = require('./routes/predictionRoutes');
// const statsRoutes = require('./routes/statsRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
// const testRoutes = require('./routes/testRoutes');
const communityRoutes = require('./routes/communityRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

// Body Parser
app.use(bodyParser.json());

// Debug logging
app.use((req, res, next) => {
  console.log(`📍 ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Increased for testing
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth', authLimiter);

// --- CLOUDINARY ---
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  app.set('cloudinary', cloudinary);
}

const upload = multer({ storage: multer.memoryStorage() });
app.set('upload', upload);

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/google-auth', googleAuthRoutes);

// Mock other routes to prevent 404s/crashes during migration
app.use('/api/problems', problemRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/chat', chatRoutes);
// Real Stats Route
// --- Firestore Imports for Stats ---
// --- Firestore Imports for Stats ---
const { collection, getCountFromServer } = require('firebase/firestore');

// Real Stats Route
app.get('/api/stats/user-stats', async (req, res) => {
  try {
    const usersColl = collection(db, 'users');
    const snapshot = await getCountFromServer(usersColl);
    const totalUsers = snapshot.data().count;

    res.json({
      totalUsers: totalUsers || 0,
      satisfactionRate: 98
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      totalUsers: 0,
      satisfactionRate: 95,
      error: error.message
    });
  }
});

app.use('/api/stats', (req, res) => res.json({
  totalUsers: 0,
  activeUsers: 0,
  problemsSolved: 0,
  submissionRate: 0,
  globalAccuracy: 0,
  streak: 0
}));
app.use('/api/notifications', (req, res) => res.json([]));
app.use('/api/community', communityRoutes);

// Health Check removed (duplicate)

// --- Socket.IO Mock ---
// --- Socket.IO Setup ---
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// Initialize Socket Handler
require('./socket/socketHandler')(io);

// Start Server
// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    version: 'debug-v1',
    cwd: process.cwd()
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Database: Firestore (Managed by Firebase Admin SDK/Client SDK)`);
});