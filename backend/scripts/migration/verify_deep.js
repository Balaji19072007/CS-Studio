const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');
const fs = require('fs').promises;
const DUMP_FILE = path.join(__dirname, 'firebase_dump.json');
const ID_MAP_FILE = path.join(__dirname, 'id_map.json');

async function verifyDeep() {
    console.log('🕵️ Starting Deep Verification...\n');

    let dump, idMap;
    try {
        const dumpContent = await fs.readFile(DUMP_FILE, 'utf8');
        dump = JSON.parse(dumpContent);

        const mapContent = await fs.readFile(ID_MAP_FILE, 'utf8');
        idMap = JSON.parse(mapContent);
    } catch (e) {
        console.error('❌ Failed to load dump or ID map:', e.message);
        process.exit(1);
    }

    const report = {
        users: { total: 0, missing: 0, mismatched: 0, errors: [] },
        progress: { total: 0, missing: 0, mismatched: 0, errors: [] },
        courses: { total: 0, missing: 0, mismatched: 0, errors: [] },
        content: { phases_checked: 0, topics_checked: 0, errors: [] }
    };

    // --- 1. VERIFY USERS ---
    console.log(`👤 Verifying ${dump.users.length} Users...`);
    // Fetch all current users from Supabase to minimize queries
    const { data: sbUsers, error: sbUserErr } = await supabase.from('users').select('*');
    if (sbUserErr) console.error('Supabase User Fetch Error:', sbUserErr);

    // Create a map for fast lookup
    const sbUserMap = new Map(sbUsers?.map(u => [u.id, u]) || []);

    report.users.total = dump.users.length;
    for (const fbUser of dump.users) {
        if (!fbUser.email) continue; // Skip partial auth records if any

        const sbId = idMap[fbUser._id];
        if (!sbId) {
            report.users.errors.push(`Missing ID Map entry for ${fbUser.email} (${fbUser._id})`);
            report.users.missing++;
            continue;
        }

        const sbUser = sbUserMap.get(sbId);
        if (!sbUser) {
            report.users.errors.push(`User not found in Supabase: ${fbUser.email} (ID: ${sbId})`);
            report.users.missing++;
            continue;
        }

        // Field Check
        const discrepancies = [];
        if (sbUser.email !== fbUser.email) discrepancies.push(`Email mismatch: ${fbUser.email} vs ${sbUser.email}`);
        if (sbUser.role !== fbUser.role) discrepancies.push(`Role mismatch: ${fbUser.role} vs ${sbUser.role}`);

        // Loose comparison for points (might have changed if they used the app since migration)
        if (Math.abs((sbUser.total_points || 0) - (fbUser.totalPoints || 0)) > 50) {
            discrepancies.push(`Points mismatch: ${fbUser.totalPoints} vs ${sbUser.total_points}`);
        }

        if (discrepancies.length > 0) {
            report.users.mismatched++;
            report.users.errors.push(`User ${fbUser.email}: ${discrepancies.join(', ')}`);
        }
    }

    // --- 2. VERIFY PROGRESS ---
    console.log(`📈 Verifying ${dump.progress.length} Progress Records...`);
    // Fetch all progress
    const { data: sbProgress, error: sbProgErr } = await supabase.from('progress').select('user_id, problem_id, status, solved_at');

    // Map: userId_problemId -> record
    const sbProgMap = new Map(sbProgress?.map(p => [`${p.user_id}_${p.problem_id}`, p]) || []);

    report.progress.total = dump.progress.length;
    for (const fbProg of dump.progress) {
        const sbUserId = idMap[fbProg.userId];
        if (!sbUserId) continue; // Skip if user didn't migrate

        const key = `${sbUserId}_${fbProg.problemId}`;
        const sbProg = sbProgMap.get(key);

        if (!sbProg) {
            // Only flag if status was 'solved'. 'todo' might not be migrated or is default.
            if (fbProg.status === 'solved' || fbProg.timeSpent > 0) {
                report.progress.errors.push(`Missing Progress: User ${sbUserId} Problem ${fbProg.problemId}`);
                report.progress.missing++;
            }
            continue;
        }

        if (fbProg.status === 'solved' && sbProg.status !== 'solved') {
            report.progress.errors.push(`Status mismatch: User ${sbUserId} Problem ${fbProg.problemId} (FB: ${fbProg.status} vs SB: ${sbProg.status})`);
            report.progress.mismatched++;
        }
    }


    // --- 3. VERIFY COURSES (Relational) ---
    console.log(`📚 Verifying Courses & Content...`);
    const { data: sbCourses } = await supabase.from('courses').select('id, title').range(0, 10000);
    const { data: sbPhases } = await supabase.from('course_phases').select('id, course_id, title').range(0, 10000);
    const { data: sbTopics } = await supabase.from('course_topics').select('id, phase_id, title').range(0, 10000);

    console.log(`   Fetched ${sbCourses.length} courses, ${sbPhases.length} phases, ${sbTopics.length} topics from Supabase.`);

    report.courses.total = dump.courses.length;

    for (const fbCourse of dump.courses) {
        // ID check (assuming we kept IDs or used title matching? script used _id as id)
        const sbCourse = sbCourses.find(c => c.id === fbCourse._id);
        if (!sbCourse) {
            report.courses.errors.push(`Missing Course: ${fbCourse.title} (${fbCourse._id})`);
            report.courses.missing++;
            continue;
        }

        // Check Phases
        if (fbCourse.phases && fbCourse.phases.length > 0) {
            const coursePhases = sbPhases.filter(p => p.course_id === fbCourse._id);
            if (coursePhases.length !== fbCourse.phases.length) {
                report.content.errors.push(`Phase count mismatch for ${fbCourse.title}: FB ${fbCourse.phases.length} vs SB ${coursePhases.length}`);
            }

            for (const fbPhase of fbCourse.phases) {
                report.content.phases_checked++;
                const sbPhase = coursePhases.find(p => p.id === fbPhase._id); // Assuming ID preserved

                if (!sbPhase) {
                    // Try title match
                    if (!coursePhases.find(p => p.title === fbPhase.title)) {
                        report.content.errors.push(`Missing Phase in ${fbCourse.title}: ${fbPhase.title}`);
                    }
                    continue;
                }

                // Check Topics
                if (fbPhase.topics && fbPhase.topics.length > 0) {
                    const phaseTopics = sbTopics.filter(t => t.phase_id === sbPhase.id);
                    if (phaseTopics.length !== fbPhase.topics.length) {
                        report.content.errors.push(`Topic count mismatch for ${fbCourse.title} > ${fbPhase.title}: FB ${fbPhase.topics.length} vs SB ${phaseTopics.length}`);
                    }
                    report.content.topics_checked += fbPhase.topics.length;
                }
            }
        }
    }


    // --- OUTPUT REPORT ---
    await fs.writeFile('verification_report.json', JSON.stringify(report, null, 2));
    console.log('📄 Report saved to verification_report.json');

    console.log('\n👤 Users:');
    console.log(`   Total: ${report.users.total}`);
    console.log(`   Missing: ${report.users.missing}`);
    console.log(`   Mismatched: ${report.users.mismatched}`);
    if (report.users.errors.length > 0) {
        console.log('   Errors (First 5):');
        report.users.errors.slice(0, 5).forEach(e => console.log(`   - ${e}`));
    }

    console.log('\n📈 Progress:');
    console.log(`   Total Source Records: ${report.progress.total}`);
    console.log(`   Missing (Significant): ${report.progress.missing}`);
    console.log(`   Mismatched: ${report.progress.mismatched}`);
    if (report.progress.errors.length > 0) {
        console.log('   Errors (First 5):');
        report.progress.errors.slice(0, 5).forEach(e => console.log(`   - ${e}`));
    }

    console.log('\n📚 Courses & Content:');
    console.log(`   Courses Checked: ${report.courses.total} (Missing: ${report.courses.missing})`);
    console.log(`   Phases Checked: ${report.content.phases_checked}`);
    console.log(`   Topics Checked: ${report.content.topics_checked}`);
    if (report.content.errors.length > 0) {
        console.log('   Content Errors (First 10):');
        report.content.errors.slice(0, 10).forEach(e => console.log(`   - ${e}`));
    }

    console.log('\n========================================');
    const isSuccess = report.users.missing === 0 && report.progress.missing === 0 && report.courses.missing === 0 && report.content.errors.length === 0;

    if (isSuccess) {
        console.log('✅ VERIFICATION PASSED: Data appears to be fully migrated.');
    } else {
        console.log('⚠️ VERIFICATION FAILED: Discrepancies found.');
    }
}

// Run
verifyDeep().catch(e => console.error(e));
