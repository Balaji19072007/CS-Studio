const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');

async function verify() {
    const targets = ['cpp-programming', 'python-programming'];

    console.log('📊 Verification Counts:');
    for (const id of targets) {
        const { count: phases, error: pErr } = await supabase
            .from('course_phases')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', id);

        const { count: topics, error: tErr } = await supabase
            .from('course_topics')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', id);

        if (pErr || tErr) console.error(`Error checking ${id}:`, pErr, tErr);
        else console.log(`   ${id}: ${phases} Phases, ${topics} Topics`);
    }
}

verify();
