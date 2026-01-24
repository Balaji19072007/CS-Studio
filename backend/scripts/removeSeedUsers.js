const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust path if needed
require('dotenv').config({ path: '../.env' }); // Load env variables

const seedUsers = [
    {
        firstName: 'Alice',
        lastName: 'Wonder',
        email: 'alice@example.com',
        username: 'alicew',
        password: 'password123', // In a real app, hash this! This is just for dummy display data
        totalPoints: 1250,
        problemsSolved: 45,
        averageAccuracy: 92.5,
        currentStreak: 5,
        role: 'student'
    },
    {
        firstName: 'Bob',
        lastName: 'Builder',
        email: 'bob@example.com',
        username: 'bobbuilds',
        password: 'password123',
        totalPoints: 980,
        problemsSolved: 30,
        averageAccuracy: 88.0,
        currentStreak: 3,
        role: 'student'
    },
    {
        firstName: 'Charlie',
        lastName: 'Code',
        email: 'charlie@example.com',
        username: 'charliec',
        password: 'password123',
        totalPoints: 1500,
        problemsSolved: 60,
        averageAccuracy: 95.5,
        currentStreak: 12,
        role: 'student'
    },
    {
        firstName: 'Diana',
        lastName: 'Dev',
        email: 'diana@example.com',
        username: 'dianadev',
        password: 'password123',
        totalPoints: 800,
        problemsSolved: 25,
        averageAccuracy: 85.0,
        currentStreak: 2,
        role: 'student'
    },
    {
        firstName: 'Ethan',
        lastName: 'Eng',
        email: 'ethan@example.com',
        username: 'ethan_eng',
        password: 'password123',
        totalPoints: 2100,
        problemsSolved: 85,
        averageAccuracy: 98.0,
        currentStreak: 20,
        role: 'student'
    }
];

const removeSeedUsers = async () => {
    try {
        console.log('Connecting to MongoDB...');
        // Ensure you have MONGO_URI in your .env or hardcode for testing if needed (but prefer env)
        const path = require('path');
        require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); // Try resolving relative to script file

        let MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            console.log('⚠️ MONGO_URI not found in env, trying default or ../.env');
            require('dotenv').config({ path: path.join(__dirname, '../.env') });
            MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cs-studio';
        }

        console.log('Using Mongo URI:', MONGO_URI.replace(/\/\/.*@/, '//****@')); // Mask credentials if any

        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        console.log('Removing dummy users...');
        const emailsToRemove = [
            'alice@example.com', 'bob@example.com', 'charlie@example.com',
            'diana@example.com', 'ethan@example.com'
        ];

        const result = await User.deleteMany({ email: { $in: emailsToRemove } });
        console.log(`✅ Successfully removed ${result.deletedCount} dummy users from the leaderboard.`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error removing users:', error);
        process.exit(1);
    }
};

removeSeedUsers();
