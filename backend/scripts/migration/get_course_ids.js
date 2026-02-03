const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');

async function getIds() {
    const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .in('title', ['Python Programming', 'C++ Programming', 'C Programming']); // Added C just to verify 

    if (error) {
        console.error(error);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
}

getIds();
