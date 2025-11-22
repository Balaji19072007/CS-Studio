const express = require('express');
const router = express.Router();
const TestRunner = require('../util/testRunner');
const Problem = require('../models/Problem');

const testRunner = new TestRunner();

/**
 * Run tests for a problem
 */
router.post('/run-tests', async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    if (!problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: problemId, code, language'
      });
    }

    console.log(`🧪 Test request for problem ${problemId}, language: ${language}`);

    const results = await testRunner.runTests(problemId, code, language);

    res.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('❌ Test route error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Run sample tests only
 */
router.post('/run-sample-tests', async (req, res) => {
  try {
    const { problemId, code, language, maxSamples = 2 } = req.body;

    if (!problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: problemId, code, language'
      });
    }

    const results = await testRunner.runSampleTests(problemId, code, language, maxSamples);

    res.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('❌ Sample test route error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Validate code syntax (basic check)
 */
router.post('/validate-syntax', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language'
      });
    }

    // Basic syntax validation - you can enhance this per language
    const validation = validateSyntax(code, language);

    res.json({
      success: true,
      data: validation
    });

  } catch (error) {
    console.error('❌ Syntax validation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get problem test cases (without solutions)
 */
router.get('/problem/:problemId/test-cases', async (req, res) => {
  try {
    const { problemId } = req.params;

    const problem = await Problem.findOne({ problemId: parseInt(problemId) });
    if (!problem) {
      return res.status(404).json({
        success: false,
        error: `Problem with ID ${problemId} not found`
      });
    }

    // Return only test case structure without solutions
    const testCases = problem.examples.map(example => ({
      input: example.input,
      output: example.output || example.expectedOutput,
      explanation: example.explanation
    }));

    res.json({
      success: true,
      data: {
        problemId: problem.problemId,
        title: problem.title,
        difficulty: problem.difficulty,
        testCases: testCases
      }
    });

  } catch (error) {
    console.error('❌ Get test cases error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Helper function for basic syntax validation
function validateSyntax(code, language) {
  const issues = [];

  // Basic common validations
  if (!code.trim()) {
    issues.push('Code is empty');
  }

  // Language-specific validations
  switch (language.toLowerCase()) {
    case 'python':
      if (!code.includes('\n') && code.length > 100) {
        issues.push('Python code should have proper line breaks');
      }
      break;
    
    case 'c':
    case 'cpp':
      if (!code.includes('{') || !code.includes('}')) {
        issues.push('C/C++ code should have proper braces');
      }
      if (!code.includes('int main') && !code.includes('void main')) {
        issues.push('C/C++ code should have a main function');
      }
      break;
    
    case 'java':
      if (!code.includes('class') || !code.includes('{') || !code.includes('}')) {
        issues.push('Java code should have a class with proper braces');
      }
      if (!code.includes('public static void main')) {
        issues.push('Java code should have a main method');
      }
      break;
  }

  return {
    isValid: issues.length === 0,
    issues: issues,
    warning: issues.length > 0 ? 'Code may have syntax issues' : 'Syntax appears valid'
  };
}

module.exports = router;