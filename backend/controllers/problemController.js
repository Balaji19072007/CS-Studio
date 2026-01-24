// controllers/problemController.js
const Problem = require('../models/Problem');
const User = require('../models/User');
const Progress = require('../models/Progress');
const fs = require('fs').promises;
const path = require('path');
const { runCodeTest } = require('../util/codeRunner');
const TestEvaluationService = require('../util/testEvaluationService');

// @route   GET /api/problems
// @desc    Get all problems with filters (for problems.html list)
// @access  Public
exports.getProblems = async (req, res) => {
    try {
        let problems = await Problem.find();

        // Manual Sort
        problems.sort((a, b) => a.problemId - b.problemId);

        // Manual Select (Project fields)
        const projected = problems.map(p => ({
            id: p.id,
            problemId: p.problemId,
            title: p.title,
            language: p.language,
            difficulty: p.difficulty,
            category: p.category
        }));

        res.json(projected);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching problems');
    }
};

// @route   GET /api/problems/daily
// @desc    Get the daily challenge problem
// @access  Public
exports.getDailyProblem = async (req, res) => {
    try {
        const problems = await Problem.find();
        const count = problems.length;

        if (count === 0) return res.status(404).json({ msg: 'No problems found' });

        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const dailyIndex = dayOfYear % count;

        const problem = problems[dailyIndex];

        // Return minimal fields
        res.json({
            id: problem.id,
            problemId: problem.problemId,
            title: problem.title,
            language: problem.language,
            difficulty: problem.difficulty,
            category: problem.category
        });
    } catch (err) {
        console.error('Error fetching daily problem:', err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/problems/recommended
// @desc    Get recommended problems for the user (unsolved)
// @access  Private
exports.getRecommendedProblems = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find solved problem IDs
        // Note: Progress.find returns array of Progress instances
        const solvedProgress = await Progress.find({ userId, status: 'solved' });
        const solvedIds = solvedProgress.map(p => p.problemId);

        // Find all problems
        const allProblems = await Problem.find();

        // Filter out solved
        const recommended = allProblems
            .filter(p => !solvedIds.includes(p.problemId))
            .slice(0, 3) // limit 3
            .map(p => ({
                id: p.id,
                problemId: p.problemId,
                title: p.title,
                language: p.language,
                difficulty: p.difficulty,
                category: p.category
            }));

        // If user solved everything (or result empty), return random 3
        if (recommended.length === 0) {
            const random = allProblems.slice(0, 3).map(p => ({
                id: p.id,
                problemId: p.problemId,
                title: p.title,
                language: p.language,
                difficulty: p.difficulty,
                category: p.category
            }));
            return res.json(random);
        }

        res.json(recommended);
    } catch (err) {
        console.error('Error fetching recommended problems:', err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/problems/:id
// @desc    Get single problem by ID (for solve-XX.html)
// @access  Public
exports.getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findOne({ problemId: req.params.id });

        if (!problem) {
            return res.status(404).json({ msg: 'Problem not found' });
        }

        res.json(problem);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'Number') {
            return res.status(400).json({ msg: 'Invalid Problem ID format' });
        }
        res.status(500).send('Server Error fetching single problem');
    }
};

// @route   GET /api/problems/:id/test-cases
// @desc    Get all test cases for a specific problem from problemData.json
// @access  Public
exports.getProblemTestCases = async (req, res) => {
    try {
        const problemId = parseInt(req.params.id);

        const problemDataPath = path.join(__dirname, '../util/problemData.json');
        const problemDataContent = await fs.readFile(problemDataPath, 'utf8');
        const problemData = JSON.parse(problemDataContent);

        const problem = problemData.find(p => p.id === problemId);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found in problem data'
            });
        }

        if (!problem.testCases || problem.testCases.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No test cases found for this problem'
            });
        }

        res.json({
            success: true,
            testCases: problem.testCases
        });

    } catch (error) {
        console.error('Error fetching problem test cases:', error);

        if (error.code === 'ENOENT') {
            return res.status(500).json({
                success: false,
                message: 'Problem data file not found'
            });
        }

        if (error instanceof SyntaxError) {
            return res.status(500).json({
                success: false,
                message: 'Invalid problem data file format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while fetching test cases'
        });
    }
};

// @route   POST /api/problems/:id/run-tests
// @desc    Execute user code against visible and hidden test cases
// @access  Private (requires authMiddleware)
exports.runTestCases = async (req, res) => {
    const { code, language } = req.body;
    const problemId = parseInt(req.params.id);
    const userId = req.user.id;

    if (!code || !language) {
        return res.status(400).json({ msg: 'Code and language are required' });
    }

    try {
        console.log('🔧 Running test cases for problem:', problemId, 'Language:', language);

        // 1. Get all test cases for the problem from JSON
        const problemDataPath = path.join(__dirname, '../util/problemData.json');
        console.log('📁 Looking for problem data at:', problemDataPath);

        const problemDataContent = await fs.readFile(problemDataPath, 'utf8');
        const allProblems = JSON.parse(problemDataContent);
        const problemFromJSON = allProblems.find(p => p.id === problemId);

        if (!problemFromJSON) {
            console.error('❌ Problem not found in problemData.json for ID:', problemId);
            return res.status(404).json({ success: false, message: 'Problem not found' });
        }

        if (!problemFromJSON.testCases || problemFromJSON.testCases.length === 0) {
            console.error('❌ No test cases found for problem:', problemId);
            return res.status(404).json({ success: false, message: 'No test cases found for this problem' });
        }

        console.log('✅ Found problem with', problemFromJSON.testCases.length, 'test cases');


        // 2. Prepare test results
        const evaluationService = new TestEvaluationService();
        let passedCount = 0;
        const results = []; // Collect detailed results

        console.log('🧪 Running tests...');

        // 3. Run code against each test case sequentially
        for (const [index, test] of problemFromJSON.testCases.entries()) {
            try {
                console.log(`   Test ${index + 1}: Running...`);
                const result = await runCodeTest(language, code, test.input);

                // Use proper test evaluation service for comparison
                const cleanedOutput = evaluationService.cleanOutput(result.stdout);
                const comparison = evaluationService.compareOutputs(cleanedOutput, test.expected, language);

                // CRITICAL FIX: Determine failure if there is compilation/runtime error (result.stderr)
                // CRITICAL FIX: If the output matches, the test PASSES.
                // We ignore exit codes (e.g., occasional non-zero exits on Windows) if the answer is correct.
                // passed: comparison.passed checks content.
                const hasError = result.exitCode !== 0; // For logging purposes

                // CRITICAL FIX: If we have stderr but the output MATCHES, it might be a warning.
                // However, usually runtime errors (non-zero exit) should be failures unless output is perfect.
                // We prioritize the comparison.passed.

                const isPassed = comparison.passed;

                if (isPassed) {
                    passedCount++;
                    console.log(`   Test ${index + 1}: ✅ PASSED`);
                } else {
                    console.log(`   Test ${index + 1}: ❌ FAILED`, {
                        // hasError,
                        exitCode: result.exitCode,
                        // expected: test.expected,
                        // output: cleanedOutput,
                        matchType: comparison.matchType,
                        // difference: comparison.difference
                    });
                }

                results.push({
                    input: test.input,
                    expected: test.expected,
                    output: cleanedOutput,
                    error: result.stderr,
                    passed: isPassed
                });

            } catch (testError) {
                console.error(`   Test ${index + 1}: 💥 ERROR:`, testError.message);
                results.push({
                    input: test.input,
                    expected: test.expected,
                    output: '',
                    error: testError.message,
                    passed: false
                });
            }
        }

        const totalTests = problemFromJSON.testCases.length;
        const accuracy = totalTests > 0 ? (passedCount / totalTests) * 100 : 0;

        console.log(`📊 Test Results: ${passedCount}/${totalTests} passed (${Math.floor(accuracy)}% accuracy)`);

        // 4. Update user's progress using the Progress model methods
        try {
            const progress = await Progress.getUserProgress(userId, problemId);

            progress.bestAccuracy = Math.max(progress.bestAccuracy, accuracy);
            progress.status = 'attempted';
            progress.lastSubmission = new Date();

            await progress.save();

            // Update user stats for attempted problem
            await Progress.updateUserStats(userId, accuracy, false);
            console.log('✅ Progress updated for user:', userId);
        } catch (progressError) {
            console.error('⚠️ Progress update failed:', progressError.message);
            // Don't fail the entire request if progress update fails
        }

        res.json({
            success: true,
            passed: accuracy === 100,
            accuracy: Math.floor(accuracy),
            results: results // Return detailed results
        });

    } catch (err) {
        console.error('💥 Catastrophic error running test cases:', err.message);
        console.error('Stack trace:', err.stack);
        res.status(500).json({
            success: false,
            msg: 'Server error during test execution',
            error: err.message
        });
    }
};

// @route   POST /api/problems/:id/submit
// @desc    Submit final solution, run against all tests, update progress/stats
// @access  Private (requires authMiddleware)
exports.submitProblem = async (req, res) => {
    const { code, language } = req.body;
    const problemId = parseInt(req.params.id);
    const userId = req.user.id;

    if (!code || !language) {
        return res.status(400).json({ msg: 'Code and language are required' });
    }

    try {
        console.log('🚀 Submitting solution for problem:', problemId, 'Language:', language);

        // 1. Run all tests to determine final accuracy 
        const problemDataPath = path.join(__dirname, '../util/problemData.json');
        const problemDataContent = await fs.readFile(problemDataPath, 'utf8');
        const allProblems = JSON.parse(problemDataContent);
        const problemFromJSON = allProblems.find(p => p.id === problemId);

        if (!problemFromJSON || !problemFromJSON.testCases || problemFromJSON.testCases.length === 0) {
            return res.status(404).json({ success: false, message: 'Problem test cases not found for submission validation' });
        }

        let passedCount = 0;
        const totalTests = problemFromJSON.testCases.length;
        const evaluationService = new TestEvaluationService();

        // This process runs against all hidden and visible test cases
        for (const test of problemFromJSON.testCases) {
            try {
                const result = await runCodeTest(language, code, test.input);
                const cleanedOutput = evaluationService.cleanOutput(result.stdout);
                const comparison = evaluationService.compareOutputs(cleanedOutput, test.expected, language);

                // If comparison passed, count it. Ignore exit codes.
                if (comparison.passed) {
                    passedCount++;
                }
            } catch (testError) {
                console.error(`   Submission Test Error:`, testError.message);
                // Treat as failed test, continue to next
            }
        }

        const accuracy = (passedCount / totalTests) * 100;
        const isSolved = accuracy === 100;

        console.log(`📊 Submission Results: ${passedCount}/${totalTests} passed (${accuracy}% accuracy), Solved: ${isSolved}`);

        // 2. Update Progress using Progress model methods
        let progress;
        try {
            progress = await Progress.getUserProgress(userId, problemId);
            const wasPreviouslySolved = progress.status === 'solved';

            progress.bestAccuracy = Math.max(progress.bestAccuracy, accuracy);
            if (isSolved) {
                progress.status = 'solved';
            } else if (progress.status !== 'solved') {
                progress.status = 'attempted';
            }

            progress.lastSubmission = new Date();
            await progress.save();
            console.log('✅ Progress saved successfully');
        } catch (progErr) {
            console.error('❌ Error saving progress:', progErr);
            throw new Error(`Progress update failed: ${progErr.message}`);
        }

        // 3. Update User Stats using Progress model method
        let userStatsUpdateError = null;
        try {
            if (isSolved) {
                await Progress.updateUserStats(userId, accuracy, true);
                console.log('🎯 Problem SOLVED - User stats updated');
                pointsAwarded = 100;
            } else {
                await Progress.updateUserStats(userId, accuracy, false);
                console.log('📝 Problem ATTEMPTED - User stats updated');
            }
        } catch (statsErr) {
            console.error('❌ Error updating user stats (ignoring to allow submission):', statsErr.message);
            userStatsUpdateError = statsErr.message;
        }

        // 4. Get updated user data for response
        let updatedUser = null;
        try {
            updatedUser = await User.findById(userId);
        } catch (fetchErr) {
            console.error('❌ Error fetching updated user:', fetchErr.message);
        }

        if (updatedUser) {
            console.log('✅ Final User Stats:', {
                username: updatedUser.username,
                problemsSolved: updatedUser.problemsSolved,
                totalPoints: updatedUser.totalPoints,
                averageAccuracy: updatedUser.averageAccuracy
            });
        }

        res.json({
            success: true,
            isSolved: isSolved,
            accuracy: Math.floor(accuracy),
            totalTests,
            passedCount,
            message: isSolved ?
                (progress.status === 'solved' ? 'Problem already solved. Great job!' : 'Solution accepted! Problem solved!')
                : 'Solution failed some test cases. Keep trying!',
            pointsAwarded: pointsAwarded,
            newStatus: progress.status,
            userStats: updatedUser ? {
                problemsSolved: updatedUser.problemsSolved,
                totalPoints: updatedUser.totalPoints,
                averageAccuracy: updatedUser.averageAccuracy,
                currentStreak: updatedUser.currentStreak
            } : null,
            warning: userStatsUpdateError ? 'Submission accepted, but user stats could not be updated due to server configuration.' : null
        });

    } catch (err) {
        console.error('💥 Catastrophic error submitting problem:', err.message);
        console.error('Stack trace:', err.stack);

        // Log detailed error info
        if (err.errors) console.error('Validation Errors:', err.errors);

        res.status(500).json({
            success: false,
            msg: 'Server error during submission',
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

// @route   POST /api/problems/:id/progress
// @desc    Update user progress for a problem (called from frontend)
// @access  Private
exports.updateProgress = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { accuracy, isSolved } = req.body;
        const userId = req.user.id;

        const progress = await Progress.getUserProgress(userId, parseInt(problemId));

        progress.bestAccuracy = Math.max(progress.bestAccuracy, accuracy);
        if (isSolved) {
            progress.status = 'solved';
        } else if (progress.status !== 'solved') {
            progress.status = 'attempted';
        }

        progress.lastSubmission = new Date();
        await progress.save();

        // Update user stats using Progress model
        await Progress.updateUserStats(userId, accuracy, isSolved);

        const updatedUser = await User.findById(userId);

        res.json({
            success: true,
            progress: {
                problemId: progress.problemId,
                status: progress.status,
                bestAccuracy: progress.bestAccuracy,
                lastSubmission: progress.lastSubmission
            },
            userStats: {
                problemsSolved: updatedUser.problemsSolved,
                totalPoints: updatedUser.totalPoints,
                averageAccuracy: updatedUser.averageAccuracy,
                currentStreak: updatedUser.currentStreak
            }
        });

    } catch (err) {
        console.error('Progress update error:', err.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error updating progress',
            error: err.message
        });
    }
};

// @route   GET /api/problems/:id/progress
// @desc    Get user progress for a specific problem
// @access  Private
exports.getProblemProgress = async (req, res) => {
    try {
        const problemId = parseInt(req.params.id);
        const userId = req.user.id;

        const progress = await Progress.getUserProgress(userId, problemId);

        res.json({
            success: true,
            progress: {
                problemId: progress.problemId,
                status: progress.status,
                bestAccuracy: progress.bestAccuracy,
                lastSubmission: progress.lastSubmission,
                timer: {
                    timeRemaining: progress.getTimeRemaining(),
                    isRunning: progress.timer.isRunning,
                    hasExpired: progress.hasTimerExpired()
                }
            }
        });

    } catch (err) {
        console.error('Get progress error:', err.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error getting progress',
            error: err.message
        });
    }
};

// @route   POST /api/problems/:id/start-timer
// @desc    Start 10-minute timer for a problem
// @access  Private
exports.startProblemTimer = async (req, res) => {
    try {
        const problemId = parseInt(req.params.id);
        const userId = req.user.id;

        const progress = await Progress.getUserProgress(userId, problemId);

        await progress.startTimer();

        res.json({
            success: true,
            message: 'Timer started (10 minutes)',
            timer: {
                startTime: progress.timer.startTime,
                duration: progress.timer.duration,
                timeRemaining: progress.getTimeRemaining(),
                isRunning: progress.timer.isRunning
            }
        });

    } catch (err) {
        console.error('Start timer error:', err.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error starting timer',
            error: err.message
        });
    }
};

// @route   POST /api/problems/:id/stop-timer
// @desc    Stop timer for a problem
// @access  Private
exports.stopProblemTimer = async (req, res) => {
    try {
        const problemId = parseInt(req.params.id);
        const userId = req.user.id;

        const progress = await Progress.getUserProgress(userId, problemId);

        await progress.stopTimer();

        res.json({
            success: true,
            message: 'Timer stopped',
            timer: {
                timeRemaining: progress.timer.timeRemaining,
                isRunning: progress.timer.isRunning
            }
        });

    } catch (err) {
        console.error('Stop timer error:', err.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error stopping timer',
            error: err.message
        });
    }
};

// @route   GET /api/problems/:id/timer
// @desc    Get current timer status for a problem
// @access  Private
exports.getProblemTimer = async (req, res) => {
    try {
        const problemId = parseInt(req.params.id);
        const userId = req.user.id;

        const progress = await Progress.getUserProgress(userId, problemId);

        const timeRemaining = progress.getTimeRemaining();
        const hasExpired = progress.hasTimerExpired();

        res.json({
            success: true,
            timer: {
                timeRemaining,
                isRunning: progress.timer.isRunning,
                hasExpired,
                startTime: progress.timer.startTime,
                duration: progress.timer.duration
            }
        });

    } catch (err) {
        console.error('Get timer error:', err.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error getting timer',
            error: err.message
        });
    }
};