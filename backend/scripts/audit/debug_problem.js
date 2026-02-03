require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { supabase } = require('../../config/supabase');

async function debugProblem() {
    console.log('--- DEBUGGING PROBLEM DATA ---');

    const { data: problem, error } = await supabase
        .from('problems')
        .select('*')
        .eq('id', 1)
        .single();

    if (error) {
        console.error('Error fetching problem:', error);
    } else {
        console.log('Problem 1 Data Keys:', Object.keys(problem));
        console.log('Description:', problem.description ? problem.description.substring(0, 50) + '...' : 'NULL/EMPTY');
        console.log('Input Format:', problem.input_format ? 'Present' : 'NULL/EMPTY');
        console.log('Output Format:', problem.output_format ? 'Present' : 'NULL/EMPTY');
        console.log('Solution Code:', problem.solution_code ? 'Present' : 'NULL/EMPTY');
        console.log('Hints:', problem.hints);
        console.log('Test Cases:', problem.test_cases ? 'Present' : 'NULL/EMPTY');
    }
}

debugProblem();
