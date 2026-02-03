const { execSync } = require('child_process');

console.log('🚀 Starting Complete Database Seeding Process...\n');
console.log('This will seed:');
console.log('  1. Courses (11)');
console.log('  2. Modules (27)');
console.log('\n========================================\n');

const scripts = [
    { name: 'Courses', file: 'seed_courses.js' },
    { name: 'Modules', file: 'seed_modules.js' }
];

let totalSuccess = 0;
let totalFailed = 0;

for (const script of scripts) {
    console.log(`\n🔄 Running: ${script.name} Seeding...`);
    console.log('----------------------------------------');

    try {
        execSync(`node scripts/${script.file}`, {
            stdio: 'inherit',
            cwd: __dirname + '/..'
        });
        totalSuccess++;
    } catch (error) {
        console.error(`\n❌ Failed to seed ${script.name}`);
        totalFailed++;
    }
}

console.log('\n========================================');
console.log('🎉 SEEDING PROCESS COMPLETE!');
console.log('========================================');
console.log(`✅ Successful: ${totalSuccess}/${scripts.length}`);
console.log(`❌ Failed: ${totalFailed}/${scripts.length}`);
console.log('========================================\n');

if (totalFailed === 0) {
    console.log('✨ All data seeded successfully!');
    console.log('\n📝 Next Steps:');
    console.log('  1. Create phases for each course/module');
    console.log('  2. Create topics for each phase');
    console.log('  3. Add topic content and practice problems');
    console.log('  4. Generate quizzes automatically\n');
} else {
    console.log('⚠️  Some seeding operations failed. Please check the errors above.\n');
    process.exit(1);
}
