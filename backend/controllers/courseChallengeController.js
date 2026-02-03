const { supabase } = require('../config/supabase');
const { runCodeTest } = require('../util/codeRunner');

// @route   GET /api/course-challenges/:challengeId
exports.getChallenge = async (req, res) => {
    try {
        const challengeId = parseInt(req.params.challengeId);
        const userId = req.user ? req.user.id : null;

        if (isNaN(challengeId)) {
            return res.status(400).json({ msg: 'Invalid Challenge ID' });
        }

        // 1. Fetch Challenge Details
        const { data: challenge, error } = await supabase
            .from('course_challenges')
            .select('*')
            .eq('id', challengeId)
            .single();

        if (error || !challenge) {
            return res.status(404).json({ msg: 'Challenge not found' });
        }

        // 2. Check User Status if logged in
        let isSolved = false;
        let solvedAt = null;

        if (userId) {
            const { data: status } = await supabase
                .from('course_challenge_status')
                .select('status, solved_at')
                .eq('user_id', userId)
                .eq('course_challenge_id', challengeId)
                .single();

            if (status && status.status === 'solved') {
                isSolved = true;
                solvedAt = status.solved_at;
            }
        }

        // 3. Return sanitized data
        // We DO send reference_output/solution info because logic is client-side locking
        // But per security best practice, we MIGHT want to hide it until unlocked.
        // However, requirements say "Solution tab must be locked for 5 minutes... Display reference solution".
        // To keep it simple as requested ("Keep everything simple"), we send it.
        // Frontend will handle the timer visibility.
        res.json({
            ...challenge,
            solved: isSolved,
            solved_at: solvedAt
        });

    } catch (err) {
        console.error('getChallenge error:', err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route   GET /api/course-challenges/topic/:topicId
exports.getChallengeByTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const userId = req.user ? req.user.id : null;

        const { data: challenge, error } = await supabase
            .from('course_challenges')
            .select('*')
            .eq('topic_id', topicId)
            .single();

        if (error || !challenge) {
            // Return null (200 OK) instead of 404 to avoid console errors when checking for optional content
            return res.json(null);
        }

        // Check Status
        let isSolved = false;
        let solvedAt = null;

        if (userId) {
            const { data: status } = await supabase
                .from('course_challenge_status')
                .select('status, solved_at')
                .eq('user_id', userId)
                .eq('course_challenge_id', challenge.id)
                .single();

            if (status && status.status === 'solved') {
                isSolved = true;
                solvedAt = status.solved_at;
            }
        }

        res.json({
            ...challenge,
            solved: isSolved,
            solved_at: solvedAt
        });

    } catch (err) {
        console.error('getChallengeByTopic error:', err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// @route   POST /api/course-challenges/:challengeId/submit
exports.submitChallenge = async (req, res) => {
    // Validation Rules:
    // 1. No test cases (use reference_output)
    // 2. No strict input validation
    // 3. Only check: Code compiles, Output matches reference_output

    try {
        const challengeId = parseInt(req.params.challengeId);
        const { code, language } = req.body;
        const userId = req.user.id;

        if (!code) {
            return res.status(400).json({ msg: 'No code provided' });
        }

        // Fetch challenge for reference output
        const { data: challenge, error } = await supabase
            .from('course_challenges')
            .select('reference_output, language')
            .eq('id', challengeId)
            .single();

        if (error || !challenge) {
            return res.status(404).json({ msg: 'Challenge not found' });
        }

        // Validate Language (Default C)
        const targetLang = language || challenge.language || 'C';

        // EXECUTION
        // Use existing codeRunner util
        // We pass empty input if input_format is None/Empty
        let output;
        try {
            const result = await runCodeTest(targetLang, code, ''); // Empty input

            if (result.stderr && !result.stdout) {
                // Compilation error or runtime error
                return res.json({
                    success: false,
                    message: 'Compilation Failed',
                    error: result.stderr
                });
            }
            output = result.stdout;
        } catch (execErr) {
            return res.json({
                success: false,
                message: 'Execution Error',
                error: execErr.message
            });
        }

        // VALIDATION
        // Basic trim comparison
        const expected = (challenge.reference_output || '').trim();
        const actual = (output || '').trim();

        let isCorrect = false;

        if (expected === actual) {
            isCorrect = true;
        } else {
            // Basic normalization (handle potential newline diffs)
            if (expected.replace(/\r\n/g, '\n') === actual.replace(/\r\n/g, '\n')) {
                isCorrect = true;
            }
        }

        if (isCorrect) {
            // Update Status
            await supabase.from('course_challenge_status').upsert({
                user_id: userId,
                course_challenge_id: challengeId,
                status: 'solved',
                solved_at: new Date()
            }, { onConflict: 'user_id, course_challenge_id' }); // Conflict on unique constraint

            return res.json({
                success: true,
                message: 'Solved! ✅',
                output: actual
            });

        } else {
            return res.json({
                success: false,
                message: 'Incorrect Output',
                output: actual,
                expected: expected // Optional: might not want to show expected if trying to be tricky, but for practice it's fine
            });
        }

    } catch (err) {
        console.error('submitChallenge error:', err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
