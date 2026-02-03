require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');

async function fixStats() {
    console.log('--- RECALCULATING USER STATS ---');

    // 1. Get the main user (just picking the first one or specific if known)
    // Assuming single user dev env or picking the one with the issue
    const { data: users, error: uErr } = await supabase.from('users').select('*');
    if (uErr) { console.error(uErr); return; }

    for (const user of users) {
        console.log(`Processing User: ${user.email} (${user.id})`);

        // 2. Fix Problem #1 to 'solved'
        await supabase.from('progress').upsert({
            user_id: user.id,
            problem_id: 1,
            status: 'solved',
            solved_at: new Date(),
            last_submission: new Date()
        });
        console.log('   ✅ Fixed Problem #1 status to Solved');

        // 3. Recalculate Solved Count (Regular Problems Only)
        // Fetch all solved progress
        const { data: solvedProgress, error: pErr } = await supabase
            .from('progress')
            .select('problem_id')
            .eq('user_id', user.id)
            .eq('status', 'solved');

        if (pErr) console.error(pErr);

        if (solvedProgress && solvedProgress.length > 0) {
            const problemIds = solvedProgress.map(p => p.problem_id);

            // Count how many are regular problems
            const { count, error: cErr } = await supabase
                .from('problems')
                .select('*', { count: 'exact', head: true })
                .in('id', problemIds)
                .eq('is_course_problem', false); // Exclude course problems

            console.log(`   Detailed Count: Found ${count} regular solved problems.`);

            // Update User
            await supabase.from('users').update({
                problems_solved: count
            }).eq('id', user.id);

            console.log(`   ✅ Updated users.problems_solved to ${count}`);
        } else {
            await supabase.from('users').update({
                problems_solved: 0
            }).eq('id', user.id);
            console.log(`   ✅ Updated users.problems_solved to 0`);
        }
    }
}

fixStats();
