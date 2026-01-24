// frontend/src/api/problemApi.js

import api from '../services/apiService'; // Import the configured axios instance
import socketService from '../services/socketService.js';

const API_BASE_URL = 'http://localhost:5000/api/problems';
const SOCKET_URL = 'http://localhost:5000';

/**
 * Fetches all coding problems from the backend.
 */
export const fetchAllProblems = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch problems list.");
    }
    return response.json();
  } catch (error) {
    console.error('Backend unavailable:', error.message);
    throw new Error('Failed to fetch problems. Please check if the backend server is running.');
  }
};

/**
 * Fetches the daily problem.
 */
export const fetchDailyProblem = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/daily`);
    if (!response.ok) {
      throw new Error("Failed to fetch daily problem.");
    }
    return response.json();
  } catch (error) {
    console.error('Fetch daily problem failed:', error.message);
    throw error;
  }
};

/**
 * Fetches recommended problems for the user.
 */
export const fetchRecommendedProblems = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/recommended`);
    return response.data;
  } catch (error) {
    console.error('Fetch recommended problems failed:', error.message);
    return []; // Return empty array on failure
  }
};

/**
 * Fetches a single problem by its ID.
 */
export const fetchProblemById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch problem ${id}.`);
    }
    return response.json();
  } catch (error) {
    console.error('Backend unavailable:', error.message);
    throw new Error(`Failed to fetch problem ${id}. Please check if the backend server is running.`);
  }
};

/**
 * Fetches ALL test cases (visible and hidden) for a problem.
 */
export const fetchProblemTestCases = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/test-cases`);
    if (!response.ok) {
      throw new Error(`Failed to fetch test cases for problem ${id}.`);
    }
    const data = await response.json();
    return data.testCases || [];
  } catch (error) {
    console.error('Backend /test-cases unavailable:', error.message);
    throw new Error(`Failed to fetch test cases for problem ${id}. Please check if the backend server is running.`);
  }
};

/**
 * Fetches user progress for a specific problem
 */
export const fetchProblemProgress = async (problemId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${problemId}/progress`);
    return response.data;
  } catch (error) {
    console.error('Progress fetch failed:', error.message);
    throw new Error(`Failed to fetch progress for problem ${problemId}.`);
  }
};

/**
 * Updates user progress when a problem is solved or attempted
 */
const updateUserProgress = async (problemId, accuracy, isSolved) => {
  try {
    const response = await api.post(`${API_BASE_URL}/${problemId}/progress`, {
      accuracy,
      isSolved
    });
    return response.data;
  } catch (error) {
    console.error('Progress update failed:', error.message);
    throw new Error('Failed to update progress. Please try again.');
  }
};

/**
 * Starts timer for a problem
 */
export const startProblemTimer = async (problemId) => {
  try {
    const response = await api.post(`${API_BASE_URL}/${problemId}/start-timer`);
    return response.data;
  } catch (error) {
    console.error('Start timer failed:', error.message);
    throw new Error('Failed to start timer. Please try again.');
  }
};

/**
 * Stops timer for a problem
 */
export const stopProblemTimer = async (problemId) => {
  try {
    const response = await api.post(`${API_BASE_URL}/${problemId}/stop-timer`);
    return response.data;
  } catch (error) {
    console.error('Stop timer failed:', error.message);
    throw new Error('Failed to stop timer. Please try again.');
  }
};

/**
 * Gets current timer status for a problem
 */
export const getProblemTimer = async (problemId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${problemId}/timer`);
    return response.data;
  } catch (error) {
    console.error('Get timer failed:', error.message);
    throw new Error('Failed to get timer status. Please try again.');
  }
};

/**
 * Submits a solution for evaluation.
 * Uses the protected route POST /api/problems/:id/submit.
 */
export const submitSolution = async (problemId, code, language) => {
  try {
    console.log('🚀 Submitting solution for problem:', problemId);
    const response = await api.post(`${API_BASE_URL}/${problemId}/submit`, {
      code,
      language
    });

    console.log('✅ Submit response:', response.data);

    // Ensure all test cases are visible in the response
    if (response.data && response.data.results) {
      response.data.results = response.data.results.map(result => ({
        ...result,
        isVisible: true // Force visibility for all test results
      }));
    }

    // Backend already updates progress, so we don't need to call updateUserProgress here.
    if (response.data.isSolved) {
      console.log('🎯 Problem solved!');
    } else if (response.data.passedCount > 0) {
      console.log('📝 Problem attempted.');
    }

    return response.data;
  } catch (error) {
    console.error('❌ Submit solution error:', error);

    // More detailed error information
    if (error.response) {
      console.error('Response error:', error.response.data);
      throw new Error(`Submission failed: ${error.response.data.msg || error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('Cannot connect to the server. Please check if the backend is running.');
    } else {
      throw new Error(`Submission failed: ${error.message}`);
    }
  }
};

/**
 * Runs code against all test cases.
 * Uses the protected route POST /api/problems/:id/run-tests.
 */
export const runTestCases = async (problemId, code, language) => {
  try {
    console.log('🔧 Running test cases for problem:', problemId);
    const response = await api.post(`${API_BASE_URL}/${problemId}/run-tests`, {
      code,
      language
    });

    console.log('✅ Run tests response:', response.data);

    // Ensure all test cases are visible in the response
    if (response.data && response.data.results) {
      response.data.results = response.data.results.map(result => ({
        ...result,
        isVisible: true // Force visibility for all test results
      }));
    }

    return response.data;
  } catch (error) {
    console.error('❌ Run test cases error:', error);

    // More detailed error information
    if (error.response) {
      console.error('Response error:', error.response.data);
      throw new Error(`Test execution failed: ${error.response.data.msg || error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('Cannot connect to the server. Please check if the backend is running.');
    } else {
      throw new Error(`Test execution failed: ${error.message}`);
    }
  }
};

/**
 * Sets up the WebSocket client for real-time code compilation.
 * Now uses the centralized socketService instead of creating its own connection.
 */
export const setupCompilerSocket = (onOutputCallback) => {
  // Get the socket instance from the service
  const socket = socketService.socket;

  if (!socket) {
    console.error('❌ Socket service not initialized. Please connect first.');
    onOutputCallback('❌ Compiler service not available. Please refresh the page.', true, false);
    return null;
  }

  // Set up event listeners for code execution
  socket.on('execution-result', (result) => {
    onOutputCallback(result.output, !result.success, false, false);
  });

  socket.on('execution-output', (data) => {
    onOutputCallback(data.output, Boolean(data.isError), true);
  });

  socket.on('waiting-for-input', () => {
    onOutputCallback('', false, true, true);
  });

  socket.on('connect_error', (err) => {
    console.error('Socket Connection Error:', err);
    onOutputCallback('Connection to compiler service failed.', true, false);
  });

  socket.on('disconnect', () => {
    onOutputCallback('Compiler service disconnected.', true, false);
  });

  return socket;
};

/**
 * Sends code for execution via the established socket.
 */
export const sendCodeForExecution = (socketInstance, code, language, input = '') => {
  if (socketInstance && socketService.isConnected) {
    socketInstance.emit('execute-code', {
      code,
      language: language.toLowerCase(),
      input
    });
  } else {
    throw new Error('Compiler socket is not connected.');
  }
};

/**
 * Sends input to running program
 */
export const sendInputToProgram = (socketInstance, input) => {
  if (socketInstance && socketService.isConnected) {
    socketInstance.emit('send-input', input);
  }
};

/**
 * Stops code execution
 */
export const stopCodeExecution = (socketInstance) => {
  if (socketInstance && socketService.isConnected) {
    socketInstance.emit('stop-execution');
  }
};