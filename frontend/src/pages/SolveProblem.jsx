// src/pages/SolveProblem.jsx
// Updated: Redesigned with Test Cases tab, Solution locking, and robust Submission logic.
// Now supports detailed test results from backend "runTestCases".

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as feather from 'feather-icons';
import { fetchProblemById, submitSolution, runTestCases, fetchProblemTestCases } from '../api/problemApi.js';
import { testAPI } from '../config/api.js';
import Loader from '../components/common/Loader.jsx';
import CodeEditorForSolvePage from '../components/problems/CodeEditorForSolvePage.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { ProblemManager } from '../utils/problemManager.js';

// ---------- Constants ----------
const TIME_TO_REVEAL_MINUTES = 60;
const TIME_TO_REVEAL_MS = TIME_TO_REVEAL_MINUTES * 60 * 1000;
const GRACE_PERIOD_MS = 5 * 60 * 1000; // 5 minutes

// ---------- Utilities ----------
const useTheme = () => {
  const getThemeStatus = () =>
    document.documentElement.classList.contains('dark') ||
    document.body.classList.contains('dark-theme');

  const [isDark, setIsDark] = useState(getThemeStatus());

  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(getThemeStatus()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return { isDark };
};

const useFloatingNotification = () => {
  const [notification, setNotification] = useState(null);
  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4200);
  }, []);
  return [notification, showNotification];
};

const formatMs = (ms) => {
  if (!ms || ms <= 0) return '00:00';
  const s = Math.ceil(ms / 1000);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
};

// React-safe Icon component to avoid DOM conflicts
const Icon = ({ name, className = '' }) => {
  if (!name || !feather.icons[name]) return null;
  const svg = feather.icons[name].toSvg({ class: className });
  return <span dangerouslySetInnerHTML={{ __html: svg }} style={{ display: 'contents' }} />;
};

const getDefaultTemplate = (language) => {
  const templates = {
    'C': `#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    \n    return 0;\n}`,
    'C++': `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}`,
    'Java': `public class Main {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}`,
    'Python': `# Write your solution here\n\n`,
    'JavaScript': `// Write your solution here\nconst solution = (input) => {\n  //...\n  return "Output";\n};\n\n// console.log(solution(input));`
  };
  return templates[language] || '// Write your solution here';
};

// Safe Renderer for Inputs
const SafeContent = ({ content }) => {
  if (content === null || content === undefined) return <span className="text-gray-500 italic">Empty</span>;
  if (typeof content === 'object') return <pre>{JSON.stringify(content, null, 2)}</pre>;

  // Unescape literal "\n" to actual newlines for display
  const displayContent = String(content).replace(/\\n/g, '\n');
  return <div className="whitespace-pre-wrap font-mono">{displayContent}</div>;
};

// process backspaces robustly for prev + incoming chunks
function processBackspaces(prev, incoming) {
  const buffer = prev + incoming;
  const out = [];
  for (let i = 0; i < buffer.length; i++) {
    const ch = buffer[i];
    if (ch === '\b') {
      if (out.length > 0) out.pop();
    } else {
      out.push(ch);
    }
  }
  return out.join('');
}

// ---------- Component ----------
const SolveProblem = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();

  const rawId = searchParams.get('problemId');
  const problemId = rawId ? parseInt(rawId, 10) : NaN;

  // core state
  const [problem, setProblem] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [testResults, setTestResults] = useState(null); // { passed: boolean, results: [], accuracy: number }
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('description');

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('Run your code to see the output here.');
  const [isRunning, setIsRunning] = useState(false);
  const [outputError, setOutputError] = useState(false);

  const [hints, setHints] = useState([]);

  const [notification, showFloatingNotification] = useFloatingNotification();
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);

  // timer display
  const [timeState, setTimeState] = useState(formatMs(TIME_TO_REVEAL_MINUTES * 60 * 1000));

  // refs
  const editorRef = useRef(null);
  const consoleRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const language = (problem && problem.language) || 'C';
  const nextProblemId = Number.isFinite(problemId) && problemId < (ProblemManager.TOTAL_PROBLEMS || 1000) ? problemId + 1 : null;

  // ---------- Timer logic (per-problem) ----------
  const initializeOrResumeTimer = useCallback(() => {
    if (!Number.isFinite(problemId)) return;
    const prog = ProblemManager.getProblemProgress(problemId) || {};

    if (prog.solved) {
      setTimeState('00:00');
      return;
    }
    if (!prog.startTime) {
      ProblemManager.startTimer(problemId);
    } else {
      if (prog.pausedAt && typeof prog.timeRemaining === 'number') {
        ProblemManager.resumeTimer?.(problemId);
      }
      if (prog.graceStart) {
        const elapsed = Date.now() - prog.graceStart;
        if (elapsed > GRACE_PERIOD_MS) {
          ProblemManager.resetTimer?.(problemId);
          ProblemManager.startTimer(problemId);
          ProblemManager.clearGraceStart?.(problemId);
        } else {
          ProblemManager.resumeTimer?.(problemId);
        }
      }
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    timerIntervalRef.current = setInterval(() => {
      const p = ProblemManager.getProblemProgress(problemId) || {};
      if (p.solved) {
        setTimeState('00:00');
        clearInterval(timerIntervalRef.current);
        return;
      }
      const remaining = typeof p.timeRemaining === 'number' ? p.timeRemaining : TIME_TO_REVEAL_MINUTES * 60 * 1000;
      setTimeState(formatMs(remaining));

      // Check if solution should be revealed when time runs out
      if (remaining <= 0) {
        setTimeState('00:00');
        ProblemManager.stopTimer?.(problemId);
        clearInterval(timerIntervalRef.current);
      }
    }, 1000);
  }, [problemId, showFloatingNotification]);

  // ---------- Load problem and testcases ----------
  useEffect(() => {
    let canceled = false;
    if (!Number.isFinite(problemId)) {
      setError('Invalid problem identifier.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const load = async () => {
      try {
        if (!ProblemManager.getProblemProgress(problemId).initialized) {
          ProblemManager.initializeProblemData(problemId);
        }

        // Fetch problem details
        const fetched = await fetchProblemById(problemId);

        // Fetch test cases
        let fetchedTc = [];
        try {
          fetchedTc = await fetchProblemTestCases(problemId);
        } catch (e) {
          console.warn("Could not fetch test cases", e);
        }

        // SYNC: Fetch User Progress from Backend
        if (isLoggedIn) {
          try {
            // We need to import fetchProblemProgress at the top, or use the imported one if available
            // Assuming fetchProblemProgress is imported or available in api
            const { fetchProblemProgress } = await import('../api/problemApi.js');
            const progressData = await fetchProblemProgress(problemId);

            if (progressData && progressData.progress) {
              const { status } = progressData.progress;
              const localProg = ProblemManager.getProblemProgress(problemId);

              // If backend says solved but local says no, update local
              if (status === 'solved' && !localProg.solved) {
                ProblemManager.markAsSolved(problemId);
              }
            }
          } catch (progErr) {
            console.warn("Could not sync progress from backend", progErr);
          }
        }

        if (canceled) return;
        setProblem(fetched);
        setTestCases(fetchedTc || []);

        const saved = ProblemManager.getUserCode(problemId);
        const initialCode = saved || fetched.templateCode || getDefaultTemplate(fetched.language || 'C');
        setCode(initialCode);

        const prog = ProblemManager.getProblemProgress(problemId) || {};
        // Double check status after potential sync
        if (prog.solved) ProblemManager.markAsSolved?.(problemId);

        // Hint logic
        if (Array.isArray(fetched.hints) && fetched.hints.length > 0) {
          setHints(fetched.hints);
        } else if (fetched.solution?.explanation) {
          // Fallback to extract from solution explanation if empty
        }

        initializeOrResumeTimer();
      } catch (err) {
        console.error('Failed to load problem:', err);
        setError(`Could not load problem #${problemId}. Please try again.`);
      } finally {
        if (!canceled) setIsLoading(false);
      }
    };

    load();

    return () => {
      canceled = true;
      const progress = ProblemManager.getProblemProgress(problemId) || {};
      if (!progress.solved && progress.timeRemaining > 0 && !progress.solved) {
        ProblemManager.setGraceStart?.(problemId, Date.now());
      }
      ProblemManager.pauseTimer?.(problemId);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [problemId, initializeOrResumeTimer]);

  // register console ref with editor
  useEffect(() => {
    if (consoleRef.current && editorRef.current?.setTerminalRef) editorRef.current.setTerminalRef(consoleRef.current);
  }, [consoleRef.current, editorRef.current, problem]);

  useEffect(() => {
    if (consoleRef.current && editorRef.current?.setTerminalRef) editorRef.current.setTerminalRef(consoleRef.current);
  }, [consoleRef.current, editorRef.current, problem]);

  // feather.replace() REMOVED to prevent React DOM conflicts

  // persist code
  useEffect(() => {
    if (code && !isLoading && Number.isFinite(problemId)) {
      ProblemManager.saveUserCode?.(problemId, code);
    }
  }, [code, isLoading, problemId]);

  // ---------- Output handling ----------
  const handleOutputReceived = useCallback((newOutput, isError, isRunningState, isWaitingInput = false) => {
    setIsRunning(Boolean(isRunningState));
    setIsWaitingForInput(isWaitingInput);

    if (isWaitingInput) {
      setTimeout(() => consoleRef.current?.focus?.(), 0);
      return;
    }

    setOutput(prev => {
      if (typeof newOutput !== 'string') return prev;
      if (!isRunningState && newOutput.includes('Execution')) {
        return newOutput;
      }
      const processed = processBackspaces(prev, newOutput);
      return processed;
    });

    setOutputError(Boolean(isError));
  }, []);

  // ---------- Console Input Handling ----------
  const handleConsoleKeyPress = (e) => {
    if (!isWaitingForInput) return;
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // ---------- Execute / Stop ----------
  const handleRunCode = async () => {
    const currentCode = editorRef.current?.getCode() || code;
    if (!currentCode.trim()) {
      handleOutputReceived('Execution Failed: Please write some code first.\n', true, false);
      return;
    }
    if (!isLoggedIn) {
      showFloatingNotification('You must be signed in to run code.', 'error');
      navigate('/signin');
      return;
    }

    setIsRunning(true);
    setOutput('Running...\n');
    setOutputError(false);

    try {
      if (editorRef.current?.runCode) {
        editorRef.current.runCode(currentCode);
      } else {
        handleOutputReceived('Code execution not available.\n', true, false);
        setIsRunning(false);
      }
    } catch (err) {
      console.error('Code execution failed', err);
      handleOutputReceived(`Execution Error: ${err.message}\n`, true, false);
      setIsRunning(false);
    }
  };

  const handleStopCode = () => {
    if (editorRef.current?.stopCode) {
      editorRef.current.stopCode();
      setIsRunning(false);
      handleOutputReceived('\nExecution stopped by user.\n', true, false);
      showFloatingNotification('Execution stopped', 'info');
    }
  };

  // ---------- Run Test Cases ----------
  const handleRunTestCases = async () => {
    const currentCode = editorRef.current?.getCode() || code;
    if (!currentCode.trim()) {
      showFloatingNotification('Please enter code to test.', 'error');
      return;
    }
    if (!isLoggedIn) {
      showFloatingNotification('Sign in to run tests.', 'error');
      return;
    }

    setIsRunning(true);
    setTestResults(null);
    setOutput("Running Test Cases...\n");
    setActiveTab('testcases'); // Switch to test tab to show results

    try {
      const result = await runTestCases(problemId, currentCode, language);

      // Backend now returns: { success: true, results: [{input, expected, output, passed, error}], passed: bool, accuracy: number }
      const detailedResults = result.results || [];

      // Map detailed results if available, otherwise just use summary
      if (detailedResults.length > 0) {
        setTestResults({
          passed: result.passed,
          accuracy: result.accuracy,
          passedCount: detailedResults.filter(r => r.passed).length,
          totalCount: detailedResults.length,
          details: detailedResults
        });
      } else {
        // Fallback for backward compatibility if backend didn't update (though we know it did)
        setTestResults({
          passed: result.passed,
          accuracy: result.accuracy,
          passedCount: result.passed ? testCases.length : Math.floor((result.accuracy / 100) * testCases.length),
          totalCount: testCases.length,
          details: []
        });
      }

      setOutput(`Test Execution Complete: ${result.accuracy}% Passed.\nCheck "Test Cases" tab for detailed results.`);

      if (result.passed) {
        showFloatingNotification('All Test Cases Passed! You can now Submit.', 'success');
      } else {
        showFloatingNotification(`Matched ${result.accuracy}% of test cases.`, 'warning');
      }

    } catch (err) {
      console.error("Test execution error", err);
      // Ensure we don't crash or show error page
      const errMsg = err.message || 'Unknown error occurred';
      if (errMsg.includes("Network Error")) {
        showFloatingNotification('Could not connect to server. Is backend running?', 'error');
      } else {
        showFloatingNotification(`Test execution failed: ${errMsg}`, 'error');
      }
      setOutput(`Test Error: ${errMsg}\nCheck console for details.`);
    } finally {
      setIsRunning(false);
    }
  };


  // ---------- Submit ----------
  const handleSubmitCode = useCallback(async () => {
    const currentCode = editorRef.current?.getCode() || code;
    if (!currentCode.trim()) {
      showFloatingNotification('Please enter code before submitting.', 'error');
      return;
    }
    if (!isLoggedIn) {
      navigate('/signin');
      return;
    }

    setIsRunning(true);
    setOutput('Validating solution against all test cases...');
    setOutputError(false);

    try {
      const result = await submitSolution(problemId, currentCode, language);

      const isSolved = Boolean(result.isSolved);

      if (isSolved) {
        if (result.warning) {
          showFloatingNotification(result.warning, 'warning');
        } else {
          showFloatingNotification('Solution Accepted! Problem Solved!', 'success');
        }
        setOutput('Solution Verified: Accepted!\nAll test cases passed.');
        ProblemManager.markAsSolved(problemId);

        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }

        const scrollToId = `problem-${problemId}`;
        setTimeout(() => {
          navigate('/problems', { state: { scrollToId: scrollToId } });
        }, 1500);
      } else {
        let statusMsg = `Submission failed: ${result.accuracy}% Accuracy.`;
        statusMsg += '\nPlease ensure your solution handles all edge cases.';

        // Populate test results if submit returns them (it typically doesn't, but logic could be similar)
        // Ideally submit just validates. We can show error.

        setOutput(statusMsg);
        setOutputError(true);
        showFloatingNotification('Solution failed verification.', 'error');
      }

    } catch (err) {
      const errMsg = err.response?.data?.msg || err.message || 'Verification failed.';
      setOutput(`Submission Error: ${errMsg}`);
      setOutputError(true);
      showFloatingNotification(errMsg, 'error');
    } finally {
      setIsRunning(false);
    }
  }, [code, isLoggedIn, navigate, problemId, language, showFloatingNotification]);

  // Copy, reset, load solution
  const copyCodeToClipboard = () => {
    const currentCode = editorRef.current?.getCode() || code;
    navigator.clipboard.writeText(currentCode).then(() => showFloatingNotification('Code copied!', 'success'));
  };

  const importSolution = () => {
    if (problem?.solution?.code) {
      setCode(problem.solution.code);
      showFloatingNotification('Solution code imported to editor.', 'success');
    }
  };

  const resetCode = () => {
    const template = problem?.templateCode || getDefaultTemplate(language);
    setCode(template);
    setOutput('Code reset to original template.');
    ProblemManager.saveUserCode?.(problemId, template);
    showFloatingNotification('Code reset.', 'info');
  };

  // UI helpers
  const containerBg = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const borderClass = isDark ? 'border-gray-700' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const linkHover = isDark ? 'hover:bg-gray-700 hover:text-white' : 'hover:bg-gray-100';

  const NotificationPopup = () => {
    if (!notification) return null;
    const baseClass = 'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl text-sm font-medium transition-transform transform duration-300';
    let colorClass, icon;
    switch (notification.type) {
      case 'success': colorClass = 'bg-green-600 text-white'; icon = 'check-circle'; break;
      case 'error': colorClass = 'bg-red-600 text-white'; icon = 'x-octagon'; break;
      case 'warning': colorClass = 'bg-yellow-600 text-black'; icon = 'alert-triangle'; break;
      default: colorClass = 'bg-blue-600 text-white'; icon = 'info'; break;
    }
    return (
      <div className={`${baseClass} ${colorClass} animate-fade-in-down`}>
        <div className="flex items-center">
          <Icon name={icon} className="w-5 h-5 mr-3" />
          <span>{notification.message}</span>
        </div>
      </div>
    );
  };

  const StatusBadge = () => {
    const prog = ProblemManager.getProblemProgress(problemId) || {};
    const isSolutionAvailable = prog.solved || prog.timeRemaining <= 0;

    if (prog.solved) {
      return (
        <div className="flex items-center text-sm font-mono font-bold text-green-500 border border-green-500/50 rounded-full px-3 py-1 bg-green-500/10">
          <Icon name="check-circle" className="w-4 h-4 mr-2" /> Solved!
        </div>
      );
    }
    if (isSolutionAvailable) {
      return (
        <div className={`flex items-center text-sm font-mono font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} border border-blue-500/50 rounded-full px-3 py-1 bg-blue-500/10`}>
          <Icon name="unlock" className="w-4 h-4 mr-2" /> Solution
        </div>
      );
    }
    return (
      <div className={`flex items-center text-sm font-mono font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-700'} border border-yellow-500/50 rounded-full px-3 py-1 bg-yellow-500/10`}>
        <Icon name="clock" className="w-4 h-4 mr-2" /> {timeState}
      </div>
    );
  };

  // Check if solution is available
  const prog = ProblemManager.getProblemProgress(problemId) || {};
  const isSolutionAvailable = prog.solved || prog.timeRemaining <= 0;

  const sanitizedProblemStatement = problem?.problemStatement || '<p>No statement provided.</p>';
  const sanitizedSolutionExplanation = problem?.solution?.explanation || '<p>Solution explanation not available.</p>';

  if (isLoading) return <Loader message="Loading problem details..." size="lg" />;
  if (error || !problem) return <div className={`min-h-screen ${containerBg} p-12 text-center text-red-400`}>{error || 'Problem data is unavailable.'}</div>;

  const displayId = (problem && (problem.problemId ?? problem.id)) ?? problemId;

  return (
    <div className={`h-screen ${containerBg} transition-colors duration-500 flex flex-col overflow-hidden`}>
      <NotificationPopup />

      {/* Mobile header (Simplified) */}
      <div className="lg:hidden flex-none bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm mt-16">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate('/problems')} className={`text-gray-500`}><Icon name="arrow-left" /></button>
          <span className={`font-bold ${textPrimary}`}>#{displayId} {problem.title}</span>
          <StatusBadge />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden max-w-screen-2xl mx-auto w-full px-0 lg:px-8 py-4 lg:py-6">
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center mb-6 text-left">
          <button onClick={() => navigate('/problems', { state: { scrollToId: `problem-${displayId}` } })} className={`inline-flex items-center px-4 py-2 border ${borderClass} rounded-lg text-sm font-medium ${isDark ? 'text-gray-200 bg-gray-700' : 'text-gray-700 bg-white'} ${linkHover} transition-colors`}>
            <Icon name="arrow-left" className="w-4 h-4 mr-2" /> Back to Problems
          </button>
          {ProblemManager.getProblemProgress(problemId)?.solved && nextProblemId && (
            <button onClick={() => navigate(`/solve?problemId=${nextProblemId}`)} className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors">
              Next Problem #{nextProblemId} <Icon name="arrow-right" className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-0 lg:gap-6 overflow-hidden">
          {/* LEFT COLUMN: Tabs (Description, Test Cases, Solution) */}
          <div className="lg:w-1/2 flex flex-col h-full overflow-hidden">
            <div className={`${cardBg} rounded-none lg:rounded-xl shadow-none lg:shadow-2xl h-full transition-colors border-b lg:border-b-0 ${borderClass} overflow-hidden flex flex-col`}>

              {/* Tabs Header */}
              <div className={`flex border-b ${borderClass} bg-gray-50 dark:bg-gray-800`}>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'description' ? 'border-green-500 text-green-500 bg-white dark:bg-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >Description</button>
                <button
                  onClick={() => setActiveTab('testcases')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'testcases' ? 'border-green-500 text-green-500 bg-white dark:bg-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >Test Cases</button>
                <button
                  onClick={() => setActiveTab('solution')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'solution' ? 'border-green-500 text-green-500 bg-white dark:bg-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >Solution{isSolutionAvailable ? '' : ' 🔒'}</button>
              </div>

              {/* Tab Content */}
              <div className="p-4 lg:p-6 overflow-y-auto flex-1 custom-scrollbar">

                {/* 1. DESCRIPTION TAB */}
                {activeTab === 'description' && (
                  <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-6 text-left`}>
                    <div className="space-y-4">
                      <h2 className={`text-2xl font-bold ${textPrimary}`}>{problem.title}</h2>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800`}>{language}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{problem.difficulty}</span>
                      </div>
                      <div className="prose dark:prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{ __html: sanitizedProblemStatement.split('Input Format')[0] }} />
                    </div>

                    {/* Input/Output Formats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border-l-4 border-blue-500`}>
                        <h3 className="font-bold text-sm mb-1 text-blue-600 dark:text-blue-400">Input Format</h3>
                        <div className="text-sm" dangerouslySetInnerHTML={{ __html: problem.inputFormat }} />
                      </div>
                      <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border-l-4 border-purple-500`}>
                        <h3 className="font-bold text-sm mb-1 text-purple-600 dark:text-purple-400">Output Format</h3>
                        <div className="text-sm" dangerouslySetInnerHTML={{ __html: problem.outputFormat }} />
                      </div>
                    </div>

                    {/* Hints Section */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className={`font-semibold ${textPrimary} mb-2 flex items-center`}><Icon name="lightbulb" className="w-4 h-4 mr-2 text-yellow-500" /> Hints</h3>
                      <ul className="space-y-2 list-disc pl-5 text-sm">
                        {hints.length > 0 ? hints.map((h, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: h }}></li>
                        )) : <li className="text-gray-500">No hints available.</li>}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 2. TEST CASES TAB */}
                {activeTab === 'testcases' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-1 flex items-center">
                        <Icon name="info" className="w-4 h-4 mr-2" /> How Test Cases Work
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        We run your code against multiple sets of inputs.
                        <strong> Hidden test cases</strong> check for edge cases.
                        If your output doesn't match the expected output exactly (including spaces/newlines), the test fails.
                        Click "Run Test Cases" to verify your logic before submitting.
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <h3 className={`font-bold text-lg ${textPrimary}`}>Test Cases</h3>
                      <button
                        onClick={handleRunTestCases}
                        disabled={isRunning}
                        className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center min-w-[140px] ${isRunning ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isRunning ? (
                          <>
                            <Loader size="sm" color="white" className="mr-2" showText={false} />
                            <span>Running...</span>
                          </>
                        ) : (
                          <>
                            <Icon name="play" className="w-4 h-4 mr-2" />
                            <span>Run Test Cases</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Summary Result Banner */}
                    {testResults && (
                      <div className={`p-3 rounded-lg border ${testResults.passed ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        <div className="font-bold text-sm">{testResults.passed ? 'All Test Cases Passed' : 'Some Test Cases Failed'}</div>
                        <div className="text-xs mt-1">Passed {testResults.passedCount} of {testResults.totalCount} ({testResults.accuracy}%)</div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* If we have detailed results, show them. Otherwise fallback to just testCases list */}
                      {(testResults?.details && testResults.details.length > 0 ? testResults.details : testCases).map((item, idx) => {
                        // Determine if this item is a result or just a test case
                        const isResult = typeof item.passed === 'boolean'; // check if 'passed' property exists and is boolean
                        const statusColor = isResult
                          ? (item.passed ? 'text-green-500' : 'text-red-500')
                          : 'text-gray-400';

                        return (
                          <div key={idx} className={`p-4 rounded-lg border ${borderClass} ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                            <div className="flex justify-between mb-2">
                              <div className="text-xs font-bold uppercase text-gray-500">Test Case {idx + 1}</div>
                              <div className={`text-xs font-bold ${statusColor}`}>
                                {isResult ? (item.passed ? 'PASSED' : 'FAILED') : 'Not Run'}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-mono">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Input</div>
                                <div className={`p-2 rounded ${isDark ? 'bg-black/50 text-gray-200' : 'bg-white text-gray-900'} border ${borderClass}`}><SafeContent content={item.input} /></div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Expected Output</div>
                                <div className={`p-2 rounded ${isDark ? 'bg-black/50 text-gray-200' : 'bg-white text-gray-900'} border ${borderClass}`}><SafeContent content={item.expected || item.output} /></div>
                              </div>
                            </div>

                            {/* Show actual output if failed */}
                            {isResult && !item.passed && (
                              <div className="mt-2 text-sm font-mono">
                                <div className="text-xs text-red-400 mb-1">Your Output</div>
                                <div className={`p-2 rounded ${isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} border text-red-700 dark:text-red-300`}>
                                  <SafeContent content={item.output} />
                                  {item.error && (
                                    <div className="mt-2 pt-2 border-t border-red-300 dark:border-red-700 text-xs text-red-500 font-semibold">
                                      Stderr:
                                      <SafeContent content={item.error} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {testCases.length === 0 && <div className="text-gray-500 text-center py-8">No test cases available to display.</div>}
                    </div>
                  </div>
                )}

                {/* 3. SOLUTION TAB */}
                {activeTab === 'solution' && (
                  <div className="h-full flex flex-col">
                    {!isSolutionAvailable ? (
                      <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                          <Icon name="lock" className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>Solution Locked</h3>
                        <p className={`max-w-md ${textSecondary} mb-4`}>
                          The solution is locked to encourage you to try solving it first.
                          It will unlock automatically after the timer expires.
                        </p>
                        <div className="font-mono text-2xl font-bold text-yellow-500">
                          {timeState}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Solution Code & Import */}
                        <div className={`border ${borderClass} rounded-lg overflow-hidden`}>
                          <div className={`flex justify-between items-center p-3 border-b ${borderClass} ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                            <span className={`font-semibold text-sm ${textPrimary}`}>Solution Code</span>
                            <button
                              onClick={importSolution}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded flex items-center transition-colors"
                            >
                              <Icon name="download" className="w-3 h-3 mr-1" /> Import to Editor
                            </button>
                          </div>
                          <pre className={`p-4 text-sm font-mono text-left overflow-x-auto ${isDark ? 'bg-black text-gray-300' : 'bg-gray-800 text-white'}`}>
                            {problem.solution?.code}
                          </pre>
                        </div>

                        {/* Explanation */}
                        <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDark ? 'bg-blue-900/10' : 'bg-blue-50'}`}>
                          <h3 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">Explanation</h3>
                          <div className={`text-sm leading-relaxed ${textPrimary}`} dangerouslySetInnerHTML={{ __html: sanitizedSolutionExplanation }} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Code Editor */}
          <div className="lg:w-1/2 flex flex-col h-full overflow-hidden mt-6 lg:mt-0">
            <div className={`${cardBg} rounded-none lg:rounded-xl shadow-none lg:shadow-2xl overflow-hidden flex flex-col flex-1 transition-colors border-b lg:border-b-0 ${borderClass}`}>

              {/* Editor Toolbar */}
              <div className={`flex justify-between items-center p-3 border-b ${borderClass}`}>
                <h2 className={`font-semibold ${textPrimary} flex items-center`}>
                  <Icon name="code" className="w-4 h-4 mr-2" /> Editor ({language})
                </h2>
                <div className="flex space-x-2">
                  <button onClick={resetCode} className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition`}>
                    <Icon name="refresh-cw" className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={copyCodeToClipboard} className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition`}>
                    <Icon name="copy" className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Editor */}
              <div className="flex-1 min-h-0 relative">
                <CodeEditorForSolvePage
                  ref={editorRef}
                  initialCode={code}
                  language={language}
                  theme={isDark ? 'vs-dark' : 'vs-light'}
                  onOutputReceived={handleOutputReceived}
                  onCodeChange={setCode}
                />
              </div>

              {/* Actions */}
              <div className={`p-4 border-t ${borderClass} ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex justify-between gap-4`}>
                <button
                  onClick={isRunning ? handleStopCode : handleRunCode}
                  className={`flex-1 py-3 rounded-lg font-bold text-white transition shadow-lg ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                >
                  {isRunning ? 'Stop' : 'Run Custom Code'}
                </button>
                <button
                  onClick={handleSubmitCode}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg transition flex justify-center items-center"
                >
                  <i data-feather="send" className="w-4 h-4 mr-2"></i> Submit Solution
                </button>
              </div>
            </div>

            {/* Output Console */}
            <div className={`mt-4 ${cardBg} rounded-lg shadow-lg border ${borderClass} overflow-hidden`}>
              <div className="p-3 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${textSecondary}`}>Console Output</h4>
              </div>
              <div
                className={`p-4 font-mono text-sm text-left h-40 overflow-y-auto whitespace-pre-wrap outline-none cursor-text ${isDark ? 'text-gray-300' : 'text-gray-800'} ${outputError ? 'text-red-400' : ''} ${isWaitingForInput ? 'ring-2 ring-yellow-500/50' : ''}`}
                ref={consoleRef}
                tabIndex={0}
                onClick={() => consoleRef.current?.focus()}
                style={{
                  caretColor: 'transparent' // Hide native caret to use custom blinking one
                }}
              >
                {output}
                {isWaitingForInput && (
                  <span className="inline-block w-2 h-5 align-middle bg-yellow-500 animate-pulse ml-1"></span>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SolveProblem;