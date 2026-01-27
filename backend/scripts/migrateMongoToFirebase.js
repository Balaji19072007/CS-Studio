
const mongoose = require('mongoose');
const { db } = require('../config/firebase'); // Your Firebase config
const {
    collection, doc, setDoc, getDocs,
    query, where, writeBatch
} = require('firebase/firestore');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI is missing in .env');
    process.exit(1);
}

const migrate = async () => {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // --- 1. Migrate Users ---
        console.log('👤 Migrating Users...');
        const mongoUsersCollection = mongoose.connection.db.collection('users');
        const mongoUsers = await mongoUsersCollection.find().toArray();
        console.log(`Found ${mongoUsers.length} users in MongoDB.`);

        let usersMigrated = 0;
        const usersBatch = writeBatch(db);
        // Note: Firestore batches limited to 500 ops. For simplicity, we'll do individual writes if list is large, 
        // or chunk it. Let's do individual writes for safety/logs, or small chunks.
        // Actually, let's just use setDoc one by one to avoid batch complexity limits for now, 
        // unless performance is critical.

        const emailToFirebaseIdMap = {};

        for (const user of mongoUsers) {
            // Map MongoDB _id to string for Firestore, or let Firestore generate one?
            // To keep things linked, let's use the MongoDB _id string as the Firestore ID if possible.
            // Be careful if _id is an ObjectId object.
            const userId = user._id.toString();
            emailToFirebaseIdMap[user.email] = userId;

            // Prepare User Object for Firestore
            // Ensure we handle missing fields with defaults
            const userData = {
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                username: user.username || user.email.split('@')[0],
                email: user.email,
                password: user.password, // Keep hashed password (bcrypt)
                photoUrl: user.photoUrl || '',
                bio: user.bio || '',
                totalPoints: user.totalPoints || 0,
                problemsSolved: user.problemsSolved || 0,
                currentStreak: user.currentStreak || 0,
                role: user.role || 'user',
                createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                averageAccuracy: user.averageAccuracy || 0
            };

            const userRef = doc(db, 'users', userId);
            await setDoc(userRef, userData);
            usersMigrated++;
        }
        console.log(`✅ Migrated ${usersMigrated} users.`);


        // --- 2. Migrate Progress / Submissions ---
        console.log('📈 Migrating Progress...');
        // Check for 'progress' or 'submissions' collection in MongoDB
        // Based on previous context, likely 'progress'
        const mongoProgressCollection = mongoose.connection.db.collection('progress');
        const mongoProgress = await mongoProgressCollection.find().toArray();
        console.log(`Found ${mongoProgress.length} progress records.`);

        let progressMigrated = 0;

        for (const p of mongoProgress) {
            // We need to map the MongoDB userId to the Firestore userId.
            // Since we used the mongo _id.toString() as the Firestore ID, we can reuse p.userId if it matches.
            // If p.userId is an ObjectId, toString() it.
            const userId = p.userId.toString();
            const problemId = parseInt(p.problemId); // Ensure number

            if (!userId || isNaN(problemId)) {
                console.warn(`Skipping invalid progress record: ${p._id}`);
                continue;
            }

            const progressData = {
                userId: userId,
                problemId: problemId,
                status: p.status || 'attempted',
                bestAccuracy: p.bestAccuracy || 0,
                lastSubmission: p.lastSubmission ? new Date(p.lastSubmission).toISOString() : new Date().toISOString(),
                solvedAt: p.solvedAt ? new Date(p.solvedAt).toISOString() : null,
                timeSpent: p.timeSpent || 0
            };

            // Create a composite ID or let Firestore generate? 
            // Our Progress.js uses `addDoc` usually, but we want to avoid duplicates.
            // Let's create a deterministic ID: `${userId}_${problemId}` to easily find it later?
            // Or just use addDoc. The Progress model in backend uses separate ID. 
            // But wait, the Progress model checks `findOne({ userId, problemId })`.
            // So ID doesn't matter as much as the fields.

            // However, to prevent duplicates on multiple runs, maybe we check if it exists?
            // For a one-time migration, we'll just write. 
            // Let's use specific ID to be safe: `progress_${userId}_${problemId}`
            const docId = `migrated_${userId}_${problemId}`;
            const progressRef = doc(db, 'progress', docId);
            await setDoc(progressRef, progressData);
            progressMigrated++;
        }
        console.log(`✅ Migrated ${progressMigrated} progress records.`);

        console.log('🎉 Migration Complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Migration Failed:', error);
        process.exit(1);
    }
};

migrate();
