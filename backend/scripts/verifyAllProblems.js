// Script to verify all problems in the database
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// Define Problem schema (simplified)
const problemSchema = new mongoose.Schema({}, { strict: false });
const Problem = mongoose.model('Problem', problemSchema);

async function verifyAllProblems() {
    console.log('\n🔍 Starting problem verification...\n');

    try {
        const problems = await Problem.find({});
        console.log(`📊 Total problems found: ${problems.length}\n`);

        const issues = [];
        const stats = {
            total: problems.length,
            missingTitle: 0,
            missingDescription: 0,
            missingDifficulty: 0,
            missingCategory: 0,
            missingTestCases: 0,
            emptyTestCases: 0,
            missingStarterCode: 0,
            invalidDifficulty: 0,
            byDifficulty: { Easy: 0, Medium: 0, Hard: 0 },
            byCategory: {}
        };

        problems.forEach((problem, index) => {
            const problemIssues = [];

            // Check required fields
            if (!problem.title) {
                stats.missingTitle++;
                problemIssues.push('Missing title');
            }

            if (!problem.description) {
                stats.missingDescription++;
                problemIssues.push('Missing description');
            }

            if (!problem.difficulty) {
                stats.missingDifficulty++;
                problemIssues.push('Missing difficulty');
            } else if (!['Easy', 'Medium', 'Hard'].includes(problem.difficulty)) {
                stats.invalidDifficulty++;
                problemIssues.push(`Invalid difficulty: ${problem.difficulty}`);
            } else {
                stats.byDifficulty[problem.difficulty]++;
            }

            if (!problem.category) {
                stats.missingCategory++;
                problemIssues.push('Missing category');
            } else {
                stats.byCategory[problem.category] = (stats.byCategory[problem.category] || 0) + 1;
            }

            if (!problem.testCases) {
                stats.missingTestCases++;
                problemIssues.push('Missing testCases array');
            } else if (problem.testCases.length === 0) {
                stats.emptyTestCases++;
                problemIssues.push('Empty testCases array');
            }

            if (!problem.starterCode) {
                stats.missingStarterCode++;
                problemIssues.push('Missing starterCode');
            }

            if (problemIssues.length > 0) {
                issues.push({
                    index: index + 1,
                    id: problem._id,
                    title: problem.title || 'NO TITLE',
                    issues: problemIssues
                });
            }
        });

        // Print statistics
        console.log('📈 STATISTICS:');
        console.log('═'.repeat(60));
        console.log(`Total Problems: ${stats.total}`);
        console.log(`\n📊 By Difficulty:`);
        console.log(`  Easy:   ${stats.byDifficulty.Easy}`);
        console.log(`  Medium: ${stats.byDifficulty.Medium}`);
        console.log(`  Hard:   ${stats.byDifficulty.Hard}`);

        console.log(`\n📂 By Category:`);
        Object.entries(stats.byCategory)
            .sort((a, b) => b[1] - a[1])
            .forEach(([category, count]) => {
                console.log(`  ${category}: ${count}`);
            });

        console.log(`\n⚠️  Issues Found:`);
        console.log(`  Missing Title: ${stats.missingTitle}`);
        console.log(`  Missing Description: ${stats.missingDescription}`);
        console.log(`  Missing Difficulty: ${stats.missingDifficulty}`);
        console.log(`  Invalid Difficulty: ${stats.invalidDifficulty}`);
        console.log(`  Missing Category: ${stats.missingCategory}`);
        console.log(`  Missing Test Cases: ${stats.missingTestCases}`);
        console.log(`  Empty Test Cases: ${stats.emptyTestCases}`);
        console.log(`  Missing Starter Code: ${stats.missingStarterCode}`);

        // Print detailed issues
        if (issues.length > 0) {
            console.log(`\n\n❌ PROBLEMS WITH ISSUES (${issues.length}):`);
            console.log('═'.repeat(60));
            issues.slice(0, 20).forEach(issue => {
                console.log(`\n#${issue.index}: ${issue.title}`);
                console.log(`  ID: ${issue.id}`);
                issue.issues.forEach(i => console.log(`  - ${i}`));
            });

            if (issues.length > 20) {
                console.log(`\n... and ${issues.length - 20} more problems with issues`);
            }
        } else {
            console.log('\n\n✅ ALL PROBLEMS ARE VALID!');
        }

        console.log('\n' + '═'.repeat(60));
        console.log('✅ Verification complete!\n');

    } catch (error) {
        console.error('❌ Error during verification:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
    }
}

// Run verification
verifyAllProblems();
