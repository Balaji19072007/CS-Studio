const { db } = require('../../config/firebase'); // Uses existing firebase config
const { collection, getDocs, doc, getDoc } = require('firebase/firestore');
const fs = require('fs').promises;
const path = require('path');

const EXPORT_FILE = path.join(__dirname, 'firebase_dump.json');

async function exportCollection(collectionName) {
    console.log(`\n📦 Exporting ${collectionName}...`);
    try {
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
        console.log(`   Found ${snapshot.size} documents.`);
        return snapshot.docs.map(d => ({ _id: d.id, ...d.data() }));
    } catch (error) {
        console.error(`   ❌ Error exporting ${collectionName}:`, error.message);
        return [];
    }
}

async function exportCoursesDetailed() {
    console.log('\n📦 Exporting Courses (Recursive)...');
    try {
        const colRef = collection(db, 'courses');
        const snapshot = await getDocs(colRef);
        console.log(`   Found ${snapshot.size} courses.`);

        const courses = [];

        for (const courseDoc of snapshot.docs) {
            const courseData = { _id: courseDoc.id, ...courseDoc.data() };

            // Get Phases
            const phasesRef = collection(db, `courses/${courseDoc.id}/phases`);
            const phasesSnap = await getDocs(phasesRef);
            courseData.phases = [];

            for (const phaseDoc of phasesSnap.docs) {
                const phaseData = { _id: phaseDoc.id, ...phaseDoc.data() };

                // Get Topics
                const topicsRef = collection(db, `courses/${courseDoc.id}/phases/${phaseDoc.id}/topics`);
                const topicsSnap = await getDocs(topicsRef);
                phaseData.topics = topicsSnap.docs.map(t => ({ _id: t.id, ...t.data() }));

                courseData.phases.push(phaseData);
            }
            console.log(`   - Course: ${courseDoc.id} (${courseData.phases.length} modules)`);
            courses.push(courseData);
        }
        return courses;
    } catch (error) {
        console.error('   ❌ Error exporting courses detailed:', error.message);
        return [];
    }
}

async function runExport() {
    console.log('🚀 Starting Data Export...');
    const startTime = Date.now();

    const data = {
        users: await exportCollection('users'),
        progress: await exportCollection('progress'),
        subscriptions: await exportCollection('subscriptions'),
        courses: await exportCoursesDetailed(),
        exportedAt: new Date().toISOString()
    };

    await fs.writeFile(EXPORT_FILE, JSON.stringify(data, null, 2));

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✅ Export Complete in ${duration}s!`);
    console.log(`   File saved to: ${EXPORT_FILE}`);
    process.exit(0);
}

runExport().catch(err => {
    console.error('Fatal Error:', err);
    process.exit(1);
});
