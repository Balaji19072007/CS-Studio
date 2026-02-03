require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');

async function checkProgress() {
    console.log('--- CHECKING PROGRESS FOR PROBLEM 1 ---');
    const { data: progress, error } = await supabase
        .from('progress')
        .select('user_id, status, problem_id')
        .eq('problem_id', 1);

    if (error) console.error(error);
    console.log(progress);
}

checkProgress();
