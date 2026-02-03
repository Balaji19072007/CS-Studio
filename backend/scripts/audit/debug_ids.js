require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');

async function debug() {
    console.log('--- DEBUGGING IDs ---');

    // 1. Check Problems Table (first 5)
    const { data: problems, error: pErr } = await supabase
        .from('problems')
        .select('id, problem_id, title')
        .limit(5);

    if (pErr) console.error(pErr);
    console.log('Problems:', problems);

    // 2. Check Progress Table (first 5)
    // We want to see what 'problem_id' looks like here.
    const { data: progress, error: prErr } = await supabase
        .from('progress')
        .select('id, user_id, problem_id, status')
        .limit(5);

    if (prErr) console.error(prErr);
    console.log('Progress:', progress);

    if (progress && progress.length > 0) {
        const sampleUserId = progress[0].user_id; // Pick a user who has progress
        console.log('Checking specific user:', sampleUserId);

        // Check finding this progress via problems
        const { data: userProgress } = await supabase
            .from('progress')
            .select('problem_id, status')
            .eq('user_id', sampleUserId);

        console.log(`User ${sampleUserId} has ${userProgress.length} progress records.`);
        console.log('Sample User Progress IDs:', userProgress.map(p => p.problem_id));
    }
}

debug();
