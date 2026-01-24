const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Problem = require('../models/Problem');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const seedProblems = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Read JSON file
        const problemDataPath = path.join(__dirname, '../util/problemData.json');
        const problemData = JSON.parse(fs.readFileSync(problemDataPath, 'utf8'));

        console.log(`Found ${problemData.length} problems to seed.`);

        // Clear existing
        await Problem.deleteMany({});
        console.log('Cleared existing problems.');

        // Insert new
        // Rename 'id' to 'problemId' if necessary, or ensure schema matches.
        // Schema has 'problemId' with alias 'id'.
        // Mongoose might not automatically map 'id' in input to 'problemId' unless configured?
        // Let's explicitly map it to be safe.
        const docs = problemData.map(p => ({
            ...p,
            problemId: p.id, // Ensure problemId is set
            // Remove 'id' if it causes conflicts, though alias usually handles getters.
            // But for creation, it's safer to use the real field name.
        }));

        await Problem.insertMany(docs);
        console.log('Seeded problems successfully.');

        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedProblems();
