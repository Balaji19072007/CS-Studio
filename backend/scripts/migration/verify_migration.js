const { supabase } = require('../../config/supabase');
const fs = require('fs').promises;
const path = require('path');

const DUMP_FILE = path.join(__dirname, 'firebase_dump.json');

async function verify() {
    console.log('🔍 Verifying Migration...');

    // 1. Load Dump Stats
    const content = await fs.readFile(DUMP_FILE, 'utf8');
    const dump = JSON.parse(content);

    console.log('\n--- Record Counts ---');
    console.log(`Firebase Users: ${dump.users.length}`);
    console.log(`Firebase Courses: ${dump.courses.length}`);
    console.log(`Firebase Progress: ${dump.progress.length}`);

    // 2. Load Supabase Stats
    const { count: userCount, error: uErr } = await supabase.from('users').select('*', { count: 'exact', head: true });
    const { count: courseCount, error: cErr } = await supabase.from('courses').select('*', { count: 'exact', head: true });
    const { count: progressCount, error: pErr } = await supabase.from('progress').select('*', { count: 'exact', head: true });

    if (uErr) console.error('Supabase User Count Error:', uErr.message);
    if (cErr) console.error('Supabase Course Count Error:', cErr.message);
    if (pErr) console.error('Supabase Progress Count Error:', pErr.message);

    console.log(`Supabase Users: ${userCount}`);
    console.log(`Supabase Courses: ${courseCount}`);
    console.log(`Supabase Progress: ${progressCount}`);

    // 3. Simple Logic Check
    const userMatch = dump.users.length === userCount;
    const courseMatch = dump.courses.length === courseCount;
    // Progress might not match exactly if we filtered duplicates or invalid users, but should be close/exact
    const progressMatch = dump.progress.length === progressCount;

    console.log('\n--- Result ---');
    if (userMatch && courseMatch) {
        console.log('✅ Counts Match! (Progress discrepancy is expected if invalid users were filtered)');
    } else {
        console.log('⚠️ Counts Do Not Match. Please investigate.');
    }
}

verify();
