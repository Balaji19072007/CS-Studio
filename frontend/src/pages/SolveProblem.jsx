// src/pages/SolveProblem.jsx
// Updated: Fixed test execution performance and output capture
// ADDED: Leaderboard update on problem solve

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
const TIME_TO_REVEAL_MINUTES = 10;
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

// Clean and normalize output for comparison
const normalizeOutput = (output) => {
  if (!output) return '';
  return output
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\n+/g, '\n')  // Remove extra newlines
    .trim()                 // Remove leading/trailing whitespace
    .toLowerCase();         // Case insensitive comparison
};

// ---------- Component ----------
const SolveProblem = () => {
  const { isLoggedIn, user } = useAuth(); // ADDED: user from useAuth
  const navigate = useNavigate(); 
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();

  const rawId = searchParams.get('problemId');
  const problemId = rawId ? parseInt(rawId, 10) : NaN;

  // core state
  const [problem, setProblem] = useState(null);
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
  const inputBufferRef = useRef('');

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

        if (canceled) return;
        setProblem(fetched);

        const saved = ProblemManager.getUserCode(problemId);
        const initialCode = saved || fetched.templateCode || getDefaultTemplate(fetched.language || 'C');
        setCode(initialCode);

        const prog = ProblemManager.getProblemProgress(problemId) || {};
        if (prog.solved) ProblemManager.markAsSolved?.(problemId);

        // Hint logic remains the same
        if (Array.isArray(fetched.hints) && fetched.hints.length > 0) {
          setHints(fetched.hints.slice(0, 3));
        } else if (fetched.solution?.explanation) {
          const raw = String(fetched.solution.explanation).replace(/\n+/g, ' ');
          const sentences = raw.split(/[.?!]\s+/).map(s => s.trim()).filter(Boolean);
          if (sentences.length >= 2) setHints(sentences.slice(0, 3));
          else if (sentences.length === 1) {
            const parts = sentences[0].split(',').map(x => x.trim()).filter(Boolean);
            setHints(parts.slice(0, 3));
          } else setHints([]);
        } else {
          setHints([]);
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
    feather.replace();
  }, [isDark, activeTab, isRunning, timeState, notification]);

  // persist code
  useEffect(() => {
    if (code && !isLoading && Number.isFinite(problemId)) {
      ProblemManager.saveUserCode?.(problemId, code);
    }
  }, [code, isLoading, problemId]);

  // Add caret blink CSS to page (once)
  useEffect(() => {
    if (document.getElementById('solve-console-blink-style')) return;
    const style = document.createElement('style');
    style.id = 'solve-console-blink-style';
    style.innerHTML = `
      @keyframes cs-blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
      }
      .console-caret {
        display:inline-block;
        width:8px;
        height:1.05em;
        margin-left:2px;
        vertical-align:middle;
        animation: cs-blink 1s steps(1,start) infinite;
      }
    `;
    document.head.appendChild(style);
    return () => { /* don't remove style to avoid FOUC when switching routes */ };
  }, []);

  // ---------- Output handling ----------
  const handleOutputReceived = useCallback((newOutput, isError, isRunningState, isWaitingInput = false) => {
    
    // 1. Update running/input status
    setIsRunning(Boolean(isRunningState));
    setIsWaitingForInput(isWaitingInput);

    // If terminal is waiting for input, the parent component needs to handle key presses.
    if (isWaitingInput) {
        setOutput(prev => prev.replace(/█?$/, '█')); // Ensure cursor is present at the very end
        // Focus console when waiting for input
        setTimeout(() => consoleRef.current?.focus?.(), 0);
        return; 
    }
    
    setOutput(prev => {
      if (typeof newOutput !== 'string') return prev;

      // Clean cursor if present before adding new output
      prev = prev.replace(/█$/, '');

      // Special case: If execution stops, replace the output with the final error/success
      if (!isRunningState && newOutput.includes('Execution')) {
          return newOutput;
      }

      // Process backspaces robustness across prev + new chunk
      const processed = processBackspaces(prev, newOutput);
      return processed;
    });

    setOutputError(Boolean(isError));

  }, []);

  // ---------- Console Input Handling ----------
  const handleConsoleKeyPress = (e) => {
    if (!isWaitingForInput) return;
    
    // The key press logic is now handled in the CodeEditorForSolvePage component.
    // The handler here is primarily to ensure focus and prevent default browser behavior
    if (e.key === 'Enter') {
        e.preventDefault();
        // The editor child component handles sending the input via socket.
    }
  };

  // ---------- Run/Stop execution ----------
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

    // Just run the code using the editor's run functionality
    // The output will be handled by handleOutputReceived via the socket
    setIsRunning(true);
    setOutput('Executing code...\n');
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
      showFloatingNotification('Failed to execute code', 'error');
    }
  };

  const handleStopCode = () => {
    if (editorRef.current?.stopCode) {
      editorRef.current.stopCode();
      setIsRunning(false);
      handleOutputReceived('\nExecution stopped by user.\n', true, false);
      showFloatingNotification('Execution stopped', 'info');
    } else {
      showFloatingNotification('Failed to stop execution', 'error');
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
      showFloatingNotification('You must be signed in to submit problems.', 'error');
      navigate('/signin');
      return;
    }

    setIsRunning(true);
    setOutput('Checking solution...');
    setOutputError(false);

    try {
      // Get the expected output from problem data
      const testCases = await fetchProblemTestCases(problemId);
      if (!testCases || testCases.length === 0) {
        setOutput('No test cases available for this problem.');
        setOutputError(true);
        showFloatingNotification('No test cases available', 'error');
        return;
      }

      // Use the first test case for verification
      const firstTestCase = testCases[0];
      const expectedOutput = firstTestCase.expected || firstTestCase.output;

      // Verify code using CodeVerificationService
      const verificationResult = await testAPI.verifyCode({
        code: currentCode,
        language: language.toLowerCase(),
        input: firstTestCase.input || '',
        expectedOutput: expectedOutput || ''
      });

      if (verificationResult.data && verificationResult.data.correct) {
        // Code is correct, submit the solution
        setOutput('Solution verified! Submitting...');
        const result = await submitSolution(problemId, currentCode, language);

        const isSolved = Boolean(result.isSolved);

        if (isSolved) {
          showFloatingNotification('Solution Accepted! Problem Solved!', 'success');
          ProblemManager.markAsSolved(problemId);

          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }

          // Navigate back to problems list and scroll to the solved card
          const scrollToId = `problem-${problemId}`;
          setTimeout(() => {
            navigate('/problems', { state: { scrollToId: scrollToId } });
          }, 1000);
        } else {
          setOutput(`Submission failed: ${result.message || 'Unknown error'}`);
          setOutputError(true);
          showFloatingNotification('Submission failed', 'error');
        }
      } else {
        // Code is incorrect
        const actualOutput = verificationResult.data?.actualOutput || 'No output';
        setOutput(`Solution incorrect.\nExpected: "${expectedOutput}"\nGot: "${actualOutput}"`);
        setOutputError(true);
        showFloatingNotification('Solution is incorrect', 'error');

        // Mark as attempted for progress tracking
        try {
          // Since we can't import updateUserProgress, we'll use runTestCases with 0 tests
          // to trigger the attempted status update
          await runTestCases(problemId, currentCode, language);
        } catch (progressError) {
          console.error('Failed to update progress:', progressError);
        }
      }

    } catch (err) {
      console.error('Submission failed', err);
      const errMsg = err.response?.data?.msg || err.response?.data?.message || err.message || 'Verification failed.';
      setOutput(`Submission Error: ${errMsg}`);
      setOutputError(true);
      showFloatingNotification('Failed to submit solution: ' + errMsg, 'error');
    } finally {
      setIsRunning(false);
    }
  }, [code, isLoggedIn, navigate, problemId, language, showFloatingNotification, user, problem]);

  // Copy, reset, load solution
  const copyCodeToClipboard = () => {
    const currentCode = editorRef.current?.getCode() || code;
    navigator.clipboard.writeText(currentCode).then(() => showFloatingNotification('Code copied to clipboard!', 'success')).catch(() => showFloatingNotification('Failed to copy code', 'error'));
  };

  const resetCode = () => {
    const template = problem?.templateCode || getDefaultTemplate(language);
    setCode(template);
    setOutput('Code reset to original template.');
    setOutputError(false);

    ProblemManager.saveUserCode?.(problemId, template);
    showFloatingNotification('Code has been reset to template.', 'info');
  };

  const loadSolution = () => {
    const prog = ProblemManager.getProblemProgress(problemId) || {};
    const isSolutionAvailable = prog.solved || prog.timeRemaining <= 0;
    
    if (isSolutionAvailable && problem?.solution?.code) {
      setCode(problem.solution?.code || code);
      // Mark solution as viewed
      ProblemManager.markSolutionViewed?.(problemId);
      showFloatingNotification('Solution loaded to editor', 'success');
      setActiveTab('solution');
    } else {
      showFloatingNotification('Solution not available yet.', 'error');
    }
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
    let colorClass = 'bg-blue-500 text-white';
    let icon = 'info';
    switch (notification.type) {
      case 'success': colorClass = 'bg-green-600 text-white'; icon = 'check-circle'; break;
      case 'error': colorClass = 'bg-red-600 text-white'; icon = 'x-octagon'; break;
      case 'warning': colorClass = 'bg-yellow-600 text-black'; icon = 'alert-triangle'; break;
      default: colorClass = 'bg-blue-600 text-white'; icon = 'info'; break;
    }
    return (
      <div className={`${baseClass} ${colorClass} animate-fade-in-down`}>
        <div className="flex items-center">
          <i data-feather={icon} className="w-5 h-5 mr-3"></i>
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
        <div className={`flex items-center text-sm font-mono font-bold text-green-500 border border-green-500/50 rounded-full px-3 py-1 bg-green-500/10`}>
          <i data-feather="check-circle" className="w-4 h-4 mr-2"></i> Solved!
        </div>
      );
    }
    if (isSolutionAvailable) {
      return (
        <div className={`flex items-center text-sm font-mono font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'} border border-blue-500/50 rounded-full px-3 py-1 bg-blue-500/10`}>
          <i data-feather="unlock" className="w-4 h-4 mr-2"></i> Solution Ready
        </div>
      );
    }
    return (
      <div className={`flex items-center text-sm font-mono font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-700'} border border-yellow-500/50 rounded-full px-3 py-1 bg-yellow-500/10`}>
        <i data-feather="clock" className="w-4 h-4 mr-2"></i> {timeState}
      </div>
    );
  };
  
  // Render
  if (isLoading) return <Loader message="Loading problem details..." size="lg" />;
  if (error || !problem) return <div className={`min-h-screen ${containerBg} p-12 text-center text-red-400`}>{error || 'Problem data is unavailable.'}</div>;

  // Ensure question number shows: fallback to query param id if backend didn't include `id`
  const displayId = (problem && (problem.id ?? problemId)) ?? problemId;
  
  // Check if solution is available
  const prog = ProblemManager.getProblemProgress(problemId) || {};
  const isSolutionAvailable = prog.solved || prog.timeRemaining <= 0;

  const sanitizedProblemStatement = problem.problemStatement || '<p>No statement provided.</p>';
  const sanitizedSolutionExplanation = problem.solution?.explanation || '<p>Solution explanation not available.</p>';

  // Whether editor is currently waiting for input
  const editorWaitingForInput = isWaitingForInput;

  return (
    <div className={`min-h-screen ${containerBg} transition-colors duration-500 solve-page-container pt-[84px] lg:pt-0`}>
      <NotificationPopup />

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button 
             onClick={() => navigate('/problems', { state: { scrollToId: `problem-${displayId}` } })} 
             className="flex items-center text-gray-600 dark:text-gray-300">
            <i data-feather="arrow-left" className="w-5 h-5 mr-2"></i>
            <span className="font-medium">Back to Problems</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-600/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{language}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${problem.difficulty === 'Easy' ? (isDark ? 'bg-green-600/30 text-green-300' : 'bg-green-100 text-green-700') : problem.difficulty === 'Medium' ? (isDark ? 'bg-yellow-600/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700') : (isDark ? 'bg-red-600/30 text-red-300' : 'bg-red-100 text-red-700')}`}>{problem.difficulty}</span>
          </div>
        </div>

        <div className="px-4 pb-3 flex justify-between items-center">
          <h1 className={`text-lg font-bold ${textPrimary}`}>
            <span className="text-green-500 font-mono">#{displayId}</span> {problem.title}
          </h1>
          <StatusBadge />
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-0 lg:px-8 pt-0 lg:pt-8">
        <div className="hidden lg:flex justify-between items-center mb-6 text-left">
          <button 
             onClick={() => navigate('/problems', { state: { scrollToId: `problem-${displayId}` } })} 
             className={`inline-flex items-center px-4 py-2 border ${borderClass} rounded-lg text-sm font-medium ${isDark ? 'text-gray-200 bg-gray-700' : 'text-gray-700 bg-white'} ${linkHover} transition-colors duration-300`}>
            <i data-feather="arrow-left" className="w-4 h-4 mr-2"></i> Back to Problems
          </button>
          {ProblemManager.getProblemProgress(problemId)?.solved && nextProblemId && (
            <button onClick={() => navigate(`/solve?problemId=${nextProblemId}`)} className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors duration-300">
              Next Problem #{nextProblemId} <i data-feather="arrow-right" className="w-4 h-4 ml-2"></i>
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 problem-editor-layout">

          {/* LEFT: description */}
          <div className="lg:w-1/2 flex flex-col problem-description-column">
            <div className={`${cardBg} rounded-none lg:rounded-xl shadow-none lg:shadow-2xl p-4 lg:p-6 h-full transition-colors duration-500 border-b lg:border-b-0 ${borderClass}`}>
              <div className="hidden lg:flex justify-between items-start mb-4">
                <h1 className={`text-2xl font-extrabold ${textPrimary}`}>
                  <span className="text-green-500 mr-2 font-mono">#{displayId}</span> {problem.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-600/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{language}</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${problem.difficulty === 'Easy' ? (isDark ? 'bg-green-600/30 text-green-300' : 'bg-green-100 text-green-700') : problem.difficulty === 'Medium' ? (isDark ? 'bg-yellow-600/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700') : (isDark ? 'bg-red-600/30 text-red-300' : 'bg-red-100 text-red-700')}`}>{problem.difficulty}</span>
                </div>
              </div>

              {/* Mobile tab toggles */}
              <div className="lg:hidden mb-4">
                <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button onClick={() => setActiveTab('description')} className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'description' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300'}`}>Description</button>
                  <button onClick={() => setActiveTab('solution')} disabled={!isSolutionAvailable} className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'solution' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300'} ${!isSolutionAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}>Solution</button>
                </div>
              </div>

              {/* Desktop tabs */}
              <div className={`hidden lg:block border-b ${borderClass} mb-6`}>
                <nav className="-mb-px flex space-x-6">
                  <button onClick={() => setActiveTab('description')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-base transition-colors duration-200 ${activeTab === 'description' ? 'border-green-500 text-green-500' : `${textSecondary} border-transparent ${linkHover} hover:border-gray-500`}`}><i data-feather="file-text" className="w-5 h-5 inline-block mr-2"></i>Description</button>
                  <button onClick={() => setActiveTab('solution')} disabled={!isSolutionAvailable} className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-base transition-colors duration-200 ${activeTab === 'solution' ? 'border-green-500 text-green-500' : `${textSecondary} border-transparent ${linkHover} hover:border-gray-500`} ${!isSolutionAvailable ? 'cursor-not-allowed opacity-50' : ''}`}><i data-feather="unlock" className="w-5 h-5 inline-block mr-2"></i>Solution {!isSolutionAvailable && ' (Locked)'}</button>
                  <div className="ml-auto flex items-center"><StatusBadge /></div>
                </nav>
              </div>

              {/* Content area */}
              <div className={`mt-2 lg:mt-4 pb-4 space-y-4 lg:space-y-6 overflow-y-auto max-h-[50vh] lg:max-h-[70vh] pr-2 custom-scrollbar problem-content-mobile`}>
                {activeTab === 'description' && (
                  <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-4 lg:space-y-6 text-left`}>
                    <div className="problem-statement space-y-3 lg:space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 lg:p-4 rounded-lg border-l-4 border-blue-500">
                        <h3 className="text-base lg:text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">Problem Statement</h3>
                        <div className="text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: sanitizedProblemStatement.split('Input Format')[0] || sanitizedProblemStatement }} />
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 lg:p-4 rounded-lg border-l-4 border-green-500">
                        <h3 className="text-base lg:text-lg font-bold text-green-700 dark:text-green-300 mb-2">Input Format</h3>
                        <div className="text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: problem.inputFormat || 'Input format not specified' }} />
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 lg:p-4 rounded-lg border-l-4 border-purple-500">
                        <h3 className="text-base lg:text-lg font-bold text-purple-700 dark:text-purple-300 mb-2">Output Format</h3>
                        <div className="text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: problem.outputFormat || 'Output format not specified' }} />
                      </div>
                    </div>


                    <div className={`pt-3 lg:pt-4 border-t ${borderClass}`}>
                      <h4 className={`text-base lg:text-lg font-semibold ${textPrimary} mb-2`}>Hints</h4>
                      <ul className="list-disc pl-4 lg:pl-5 space-y-1 lg:space-y-2 text-xs lg:text-sm">
                        { (Array.isArray(problem.hints) && problem.hints.length > 0) ? problem.hints.map((h, i) => <li key={i} className={isDark ? 'text-yellow-500/80' : 'text-yellow-700'} dangerouslySetInnerHTML={{ __html: h }} />)
                          : (hints && hints.length > 0 ? hints.map((h, i) => <li key={i} className={textSecondary}>{h}</li>) : <li className={textSecondary}>No hints provided.</li>)
                        }
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'solution' && isSolutionAvailable && (
                  <div className="space-y-4 lg:space-y-6 text-left">
                    <div className={`solution-explanation ${isDark ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-50 text-gray-700'} p-3 lg:p-4 rounded-lg border-l-4 border-blue-500`}>
                      <h4 className="font-bold text-base lg:text-lg mb-2">Solution Explanation</h4>
                      <div className="text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: sanitizedSolutionExplanation }} />
                    </div>

                    <div className={`read-code-box ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${borderClass} rounded-lg p-3 lg:p-4`}>
                      <div className="read-code-header flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-3 mb-3 lg:mb-4 pb-2">
                        <div className={`read-code-title font-semibold ${textPrimary} text-base lg:text-lg`}>Solution Code</div>
                        <button onClick={loadSolution} className="inline-flex items-center px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors w-full lg:w-auto justify-center"><i data-feather="code" className="w-4 h-4 mr-2"></i> Load to Editor</button>
                      </div>
                      <pre className={`p-3 lg:p-4 rounded font-mono text-xs lg:text-sm overflow-x-auto ${isDark ? 'bg-black text-gray-300' : 'bg-gray-800 text-gray-100'} text-left`}>{problem.solution?.code || 'No solution code available.'}</pre>
                    </div>
                  </div>
                )}

                {activeTab === 'solution' && !isSolutionAvailable && (
                  <div className={`solution-locked ${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-6 rounded-lg border-l-4 border-red-500 text-center`}>
                    <i data-feather="lock" className={`w-10 h-10 mx-auto mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}></i>
                    <h4 className={`font-bold text-lg mb-2 ${textPrimary}`}>Solution is Locked</h4>
                    <p className={`${textSecondary}`}>Solve the problem or wait until the timer expires to unlock the official solution.</p>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* RIGHT: Editor & Console */}
          <div className="lg:w-1/2 flex flex-col code-editor-column">
            <div className={`${cardBg} rounded-none lg:rounded-xl shadow-none lg:shadow-2xl overflow-hidden mb-0 lg:mb-4 flex-1 flex flex-col transition-colors duration-500 border-b lg:border-b-0 ${borderClass}`}>
              <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 lg:gap-3 px-4 py-3 border-b ${borderClass}`}>
                <div className="flex items-center justify-between w-full lg:w-auto">
                  <h2 className={`text-base lg:text-lg font-semibold ${textPrimary} flex items-center`}>
                    <i data-feather="code" className="w-4 h-4 lg:w-5 lg:h-5 mr-2 hidden lg:block"></i>
                    Code Editor ( {language})
                  </h2>
                  <div className="lg:hidden flex items-center space-x-2">
                    <button onClick={copyCodeToClipboard} className={`inline-flex items-center justify-center w-8 h-8 rounded text-sm font-medium border ${borderClass} ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-white hover:bg-gray-100'} transition-colors`} title="Copy Code"><i data-feather="copy" className="w-4 h-4"></i></button>
                    <button onClick={resetCode} className={`inline-flex items-center justify-center w-8 h-8 rounded text-sm font-medium border ${borderClass} ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-white hover:bg-gray-100'} transition-colors`} title="Reset Code"><i data-feather="refresh-cw" className="w-4 h-4"></i></button>
                  </div>
                </div>
                <div className="hidden lg:flex items-center space-x-2 editor-actions">
                  <button onClick={copyCodeToClipboard} className={`inline-flex items-center px-3 py-2 rounded text-sm font-medium border ${borderClass} ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-white hover:bg-gray-100'} transition-colors`}><i data-feather="copy" className="w-4 h-4 mr-2"></i>Copy</button>
                  <button onClick={resetCode} className={`inline-flex items-center px-3 py-2 rounded text-sm font-medium border ${borderClass} ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-white hover:bg-gray-100'} transition-colors`}><i data-feather="refresh-cw" className="w-4 h-4 mr-2"></i>Reset</button>
                </div>
              </div>

              <div className="code-editor flex-1 min-h-[40vh] lg:min-h-96 w-full code-editor-mobile">
                <CodeEditorForSolvePage
                  ref={editorRef}
                  initialCode={code}
                  language={language}
                  theme={isDark ? 'vs-dark' : 'vs-light'}
                  onOutputReceived={handleOutputReceived}
                  onCodeChange={setCode}
                />
              </div>

              {/* ACTION BUTTONS (Run, Submit) - FIXED: Smaller button width */}
              <div className={`px-4 py-3 border-t ${borderClass} ${isDark ? 'bg-gray-900' : 'bg-gray-100'} flex flex-row gap-2 lg:gap-3 justify-between transition-colors duration-500 action-buttons-mobile`}>
                
                {/* Run/Stop Button (left side) - FIXED: Smaller width */}
                <button onClick={isRunning ? handleStopCode : handleRunCode} className={`inline-flex items-center px-3 py-2.5 text-sm rounded shadow-md transition-colors justify-center w-32 ${isRunning ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}><i data-feather={isRunning ? 'stop-circle' : 'play'} className="w-4 h-4 mr-1"></i>{isRunning ? 'Stop' : 'Run'}</button>
                
                {/* Submit Button (right side) - FIXED: Smaller width */}
                <button onClick={handleSubmitCode} className="inline-flex items-center px-3 py-2.5 text-sm rounded shadow-md bg-green-600 text-white hover:bg-green-700 transition-colors justify-center w-32"><i data-feather="send" className="w-4 h-4 mr-1"></i>Submit</button>
              </div>
            </div>

            {/* Console */}
            <div className={`${cardBg} rounded-none lg:rounded-xl shadow-none lg:shadow-2xl overflow-hidden transition-colors duration-500`}>
              <div className="p-3 lg:p-4 min-h-32 lg:min-h-40">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <h4 className={`text-xs lg:text-sm font-semibold mb-2 ${textPrimary}`}>Console
                    {editorWaitingForInput && <span className="ml-2 font-normal text-green-500 text-xs">(Input Waiting...)</span>}
                    {isRunning && !editorWaitingForInput && <span className="ml-2 font-normal text-yellow-500 text-xs">(Running...)</span>}
                  </h4>
                  <div
                    ref={consoleRef}
                    tabIndex={0}
                    onKeyDown={handleConsoleKeyPress}
                    className={`terminal-output font-mono text-xs whitespace-pre-wrap h-24 lg:h-32 overflow-y-auto p-2 rounded-lg cursor-text text-left terminal-output-mobile ${isDark ? 'bg-black text-gray-300' : 'bg-gray-800 text-gray-100'} border ${editorWaitingForInput ? 'border-green-500 ring-2 ring-green-500/50' : borderClass} ${outputError ? 'text-red-400' : 'text-gray-300'}`}
                  >
                    <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {output.replace(/█$/, '')}
                      {editorWaitingForInput && (
                        <span className="console-caret" style={{
                          background: isDark ? 'white' : 'black',
                          marginLeft: '2px'
                        }} aria-hidden="true" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SolveProblem;