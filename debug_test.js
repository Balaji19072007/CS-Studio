const TestEvaluationService = require('./backend/util/testEvaluationService');
const problemData = require('./backend/util/problemData.json');

const service = new TestEvaluationService();

const problem = problemData.find(p => p.id === 1);
const testCase = problem.testCases[0];

const expected = testCase.expected; // "Sum: 22\\nProduct: 105\\n"
const actual = "Sum: 22\nProduct: 105\n"; // Simulated correct output from C program

console.log("--- DEBUG START ---");
console.log("Raw Expected:", JSON.stringify(expected));
console.log("Raw Actual:  ", JSON.stringify(actual));

const cleanedActual = service.cleanOutput(actual);
const cleanedExpected = service.cleanOutput(expected);

console.log("Cleaned Expected:", JSON.stringify(cleanedExpected));
console.log("Cleaned Actual:  ", JSON.stringify(cleanedActual));

const comparison = service.compareOutputs(cleanedActual, expected, 'C'); // Note: Controller passes raw expected to cleanOutput inside? No, controller calls cleanOutput on stdout, then passes expected to compareOutputs.

// Check controller logic:
// const cleanedOutput = evaluationService.cleanOutput(result.stdout);
// const comparison = evaluationService.compareOutputs(cleanedOutput, test.expected, language);

console.log("Comparison Result:", JSON.stringify(comparison, null, 2));

console.log("--- DIRECT CALL ---");
const comp2 = service.compareOutputs(cleanedActual, cleanedExpected, 'C');
console.log("Comparison Result (Cleaned vs Cleaned):", JSON.stringify(comp2, null, 2));
