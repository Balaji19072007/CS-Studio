const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');
const { v4: uuidv4 } = require('uuid');

const DUMP_FILE = path.join(__dirname, 'firebase_dump.json');
const ID_MAP_FILE = path.join(__dirname, 'id_map.json'); // Maps Firebase UID -> Supabase UUID

// Load Problem Data (JSON)
const problemDataPath = path.join(__dirname, '../../util/problemData.json');
const courseProblemDataPath = path.join(__dirname, '../../util/courseProblemData.json');

async function importProblems() {
    console.log('\n📦 Importing Problems...');
    try {
        const [p1, p2] = await Promise.all([
            fs.readFile(problemDataPath, 'utf8').then(JSON.parse).catch(() => []),
            fs.readFile(courseProblemDataPath, 'utf8').then(JSON.parse).catch(() => [])
        ]);
        const allProblems = [...p1, ...p2];
        console.log(`   Found ${allProblems.length} problems to import.`);

        // Batch Insert Problems
        const BATCH_SIZE = 50;
        let inserted = 0;

        for (let i = 0; i < allProblems.length; i += BATCH_SIZE) {
            const chunk = allProblems.slice(i, i + BATCH_SIZE).map(p => ({
                id: p.id,
                problem_id: p.id,
                title: p.title,
                language: p.language || 'javascript',
                difficulty: p.difficulty,
                category: p.category,
                description: p.problemStatement || '',
                input_format: p.inputFormat || '',
                output_format: p.outputFormat || '',
                examples: p.examples || [],
                test_cases: p.testCases || [],
                solution_template: p.solution ? JSON.stringify(p.solution) : null,
                hints: p.hints || [],
                is_course_problem: p.id >= 1001
            }));

            const { error } = await supabase.from('problems').upsert(chunk);

            if (error) {
                console.error(`   ❌ Chunk Error (Offset ${i}):`, error.message);
            } else {
                inserted += chunk.length;
                process.stdout.write(`\r   ⏳ Imported ${inserted}/${allProblems.length} problems...`);
            }
        }
        console.log(`\n   ✅ Inserted/Updated ${inserted} problems.`);

    } catch (err) {
        console.error('   ❌ Error importing problems:', err.message);
    }
}

async function importCourses(courses) {
    console.log('\n📦 Importing Courses...');
    for (const course of courses) {
        // 1. Insert Course
        const { error: cErr } = await supabase.from('courses').upsert({
            id: course._id,
            title: course.title,
            description: course.description,
            icon: course.icon,
            category: course.category,
            difficulty: course.difficulty,
            duration: course.duration,
            is_premium: course.isPremium || false,
            cover_image: course.coverImage
        });
        if (cErr) console.error(`   ❌ Course ${course.title} error:`, cErr.message);
        else console.log(`   ✅ Course: ${course.title}`);

        if (course.phases && course.phases.length > 0) {
            console.log(`      Found ${course.phases.length} phases for ${course.title}`);
            let phaseOrder = 1;
            for (const phase of course.phases) {
                // 2. Insert Phase
                const { error: pErr } = await supabase.from('course_phases').upsert({
                    id: phase._id,
                    course_id: course._id,
                    title: phase.title,
                    "order": phaseOrder++
                });
                if (pErr) {
                    console.error(`      ❌ Phase ${phase._id} error:`, pErr.message);
                } else {
                    console.log(`      ✅ Phase: ${phase.title}`);
                }

                if (phase.topics && phase.topics.length > 0) {
                    console.log(`         Found ${phase.topics.length} topics in phase ${phase.title}`);
                    let topicOrder = 1;
                    for (const topic of phase.topics) {
                        // 3. Insert Topic
                        const { error: tErr } = await supabase.from('course_topics').upsert({
                            id: topic._id,
                            course_id: course._id,
                            phase_id: phase._id,
                            title: topic.title,
                            type: topic.type,
                            content: topic.content,
                            video_url: topic.videoUrl,
                            questions: topic.questions,
                            diagram: topic.diagram,
                            seo_title: topic.seoTitle,
                            seo_description: topic.seoDescription,
                            seo_keywords: topic.seoKeywords,
                            "order": topicOrder++
                        });
                        if (tErr) console.error(`         ❌ Topic ${topic.title} error:`, tErr.message);
                    }
                } else {
                    console.warn(`         ⚠️ No topics found for phase ${phase.title}`);
                }
            }
        } else {
            console.warn(`      ⚠️ No phases found for course ${course.title}`);
        }
    }
}

async function migrateUsers(users) {
    console.log('\n👤 Migrating Users & Auth...');
    const idMap = {}; // old_uid -> new_uuid

    for (const user of users) {
        if (!user.email) {
            console.warn(`   ⚠️ Skipping user without email: ${user._id}`);
            continue;
        }

        let supabaseUserId;

        // Try to find by email first
        const { data: { users: existingUsers } } = await supabase.auth.admin.listUsers();
        let existing = existingUsers.find(u => u.email === user.email);

        if (existing) {
            supabaseUserId = existing.id;
        } else {
            // Create new user
            const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
                email: user.email,
                email_confirm: true,
                password: user.password || 'TemporaryPass123!', // Provide temp password if hash isn't usable directly
                user_metadata: { firebase_uid: user._id }
            });

            if (createError) {
                console.error(`   ❌ Failed to create auth user ${user.email}:`, createError.message);
                // If user already exists, try to get their ID
                if (createError.message.includes('already registered') || createError.message.includes('constraint')) {
                    const { data: { users: allUsers } } = await supabase.auth.admin.listUsers();
                    const found = allUsers.find(u => u.email === user.email);
                    if (found) {
                        supabaseUserId = found.id;
                        console.log(`   ✅ Recovered ID for existing user: ${user.email}`);
                    }
                }

                if (!supabaseUserId) continue;
            } else {
                supabaseUserId = newUser.user.id;
            }
        }

        idMap[user._id] = supabaseUserId;

        // 2. Insert into public.users table
        const { error: profileError } = await supabase.from('users').upsert({
            id: supabaseUserId,
            email: user.email,
            username: user.username,
            first_name: user.firstName,
            last_name: user.lastName,
            photo_url: user.photoUrl,
            bio: user.bio,
            role: user.role,
            total_points: user.totalPoints,
            problems_solved: user.problemsSolved,
            current_streak: user.currentStreak,
            average_accuracy: user.averageAccuracy,
            // last_streak_update: user.lastStreakUpdate ? new Date(user.lastStreakUpdate) : null // Timestamps need care
        });

        if (profileError) {
            console.error(`   ❌ Failed to update profile for ${user.email}:`, profileError.message);
        }
    }

    // Save ID Map (append or overwrite) - overwrite is fine for now
    await fs.writeFile(ID_MAP_FILE, JSON.stringify(idMap, null, 2));
    console.log(`   ✅ Migrated ${Object.keys(idMap).length} users. Map saved.`);
    return idMap;
}

async function importProgress(progressList, idMap) {
    console.log('\n📈 Importing Progress...');
    let inserted = 0;

    const validProgress = [];

    for (const p of progressList) {
        const newUserId = idMap[p.userId];
        if (!newUserId) continue;

        // Parse dates
        const lastSub = p.lastSubmission ? new Date(p.lastSubmission) : null;
        const solvedAt = p.solvedAt ? new Date(p.solvedAt) : null;

        validProgress.push({
            user_id: newUserId,
            problem_id: parseInt(p.problemId),
            status: p.status,
            best_accuracy: p.bestAccuracy,
            time_spent: p.timeSpent || 0,
            last_submission: lastSub,
            solved_at: solvedAt
        });
    }

    // Batch insert in chunks of 100 to avoid limits
    const CHUNK_SIZE = 100;
    for (let i = 0; i < validProgress.length; i += CHUNK_SIZE) {
        const chunk = validProgress.slice(i, i + CHUNK_SIZE);
        const { error } = await supabase.from('progress').upsert(chunk, { onConflict: 'user_id, problem_id' });
        if (error) {
            console.error(`   ❌ Chunk Insert Error (Offset ${i}):`, error.message);
        } else {
            inserted += chunk.length;
        }
    }

    console.log(`   ✅ Imported ${inserted} progress records.`);
}

async function runImport() {
    console.log('🚀 Starting Supabase Import...');

    let dumpRequest;
    try {
        const content = await fs.readFile(DUMP_FILE, 'utf8');
        dumpRequest = JSON.parse(content);
    } catch (e) {
        console.error('❌ Could not read dump file. Run export first.');
        process.exit(1);
    }

    const { users, courses, progress, subscriptions } = dumpRequest;

    await importProblems();
    await importCourses(courses);
    const idMap = await migrateUsers(users);
    await importProgress(progress, idMap);

    // Subscriptions
    console.log('\n💳 Importing Subscriptions...');
    const validSubs = [];
    for (const sub of subscriptions) {
        const newUserId = idMap[sub._id];
        if (newUserId) {
            validSubs.push({
                user_id: newUserId,
                plan: sub.plan,
                active: sub.active,
                started_at: sub.startedAt ? new Date(sub.startedAt.seconds * 1000) : new Date(),
                expires_at: sub.expiresAt ? new Date(sub.expiresAt.seconds * 1000) : null
            });
        }
    }
    if (validSubs.length > 0) {
        const { error } = await supabase.from('subscriptions').upsert(validSubs);
        if (error) console.error('   ❌ Subscriptions error:', error.message);
        else console.log(`   ✅ Imported ${validSubs.length} subscriptions.`);
    }

    console.log('\n🎉 Migration Complete!');
}

runImport().catch(err => {
    console.error('Fatal Error:', err);
    process.exit(1);
});
