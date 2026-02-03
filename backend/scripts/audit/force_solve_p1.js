require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');

async function forceSolve() {
    console.log('--- FORCE SOLVING PROBLEM 1 ---');

    // 1. Get all progress for prob 1
    const { data: progresses } = await supabase.from('progress').select('user_id').eq('problem_id', 1);

    // For each user with progress on prob 1 (or all users?)
    // Let's just update all users who have 'attempted' or 'todo' to 'solved' for prob 1
    // Actually, upsert for ALL users to be safe.

    const { data: users } = await supabase.from('users').select('id, email');

    for (const user of users) {
        console.log(`Updating user ${user.email} (${user.id})`);

        const { error } = await supabase.from('progress').upsert({
            user_id: user.id,
            problem_id: 1,
            status: 'solved',
            solved_at: new Date(),
            last_submission: new Date()
        }, { onConflict: 'user_id, problem_id' }); // Important: merge/replace

        if (error) console.error('Error:', error);
        else console.log('   ✅ Set to Solved');
    }

    // VERIFY
    console.log('--- VERIFICATION ---');
    const { data: check } = await supabase.from('progress').select('user_id, status').eq('problem_id', 1);
    console.log(check);
}

forceSolve();
