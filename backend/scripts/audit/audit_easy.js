require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');

async function auditEasy() {
    console.log('--- AUDIT EASY PROBLEMS ---');
    const email = 'balajireddy9976@gmail.com'; // Based on previous logs
    // Get User ID
    const { data: user } = await supabase.from('users').select('id').eq('email', email).single();
    if (!user) { console.log('User not found'); return; }

    // Get all solved progress
    const { data: progress } = await supabase
        .from('progress')
        .select('problem_id')
        .eq('user_id', user.id)
        .eq('status', 'solved');

    const ids = progress.map(p => p.problem_id);
    console.log(`User has ${ids.length} total solved problems (including course probs).`);

    // Check how many are Easy and NOT course problems
    const { data: details, error } = await supabase
        .from('problems')
        .select('id, title, difficulty, is_course_problem')
        .in('id', ids);

    const easySolved = details.filter(p => p.difficulty === 'Easy' && p.is_course_problem === false);
    const mediumSolved = details.filter(p => p.difficulty === 'Medium' && p.is_course_problem === false);
    const hardSolved = details.filter(p => p.difficulty === 'Hard' && p.is_course_problem === false);

    console.log(`Easy Solved (Regular): ${easySolved.length}`);
    console.log(`Medium Solved (Regular): ${mediumSolved.length}`);
    console.log(`Hard Solved (Regular): ${hardSolved.length}`);

    console.log('--- EASY SOLVED LIST ---');
    easySolved.forEach(p => console.log(`${p.id}: ${p.title}`));

    // Check if Problem 1 is in there
    const p1 = easySolved.find(p => p.id === 1);
    console.log('Problem 1 status in "Easy Solved":', p1 ? '✅ Present' : '❌ MISSING');

    if (!p1) {
        // Checking why
        const { data: p1Data } = await supabase.from('problems').select('*').eq('id', 1).single();
        console.log('Problem 1 Data:', p1Data);
    }
}

auditEasy();
