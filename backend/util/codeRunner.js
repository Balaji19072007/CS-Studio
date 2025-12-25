const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Executes code non-interactively for a single test case.
 * This is a simplified wrapper for controllers to use for test runs.
 * @param {string} language - Code language.
 * @param {string} code - Code content.
 * @param {string} input - The standard input for the test case.
 * @returns {Promise<{stdout: string, stderr: string, exitCode: number}>}
 */
async function runCodeTest(language, code, input) {
  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const sessionId = `test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  let sourceFile, executable, runCommand, runArgs, tempFiles = [];

  try {
    const cleanedCode = code.replace(/^-\s+/gm, '');

    switch (language.toLowerCase()) {
      case 'python':
        sourceFile = path.join(tempDir, `${sessionId}.py`);
        fs.writeFileSync(sourceFile, cleanedCode);
        runCommand = 'python';
        runArgs = [sourceFile];
        tempFiles.push(sourceFile);
        break;

      case 'c':
      case 'cpp': {
        const ext = language.toLowerCase() === 'c' ? '.c' : '.cpp';
        const compiler = language.toLowerCase() === 'c' ? 'gcc' : 'g++';
        sourceFile = path.join(tempDir, `${sessionId}${ext}`);
        executable = path.join(tempDir, `${sessionId}${process.platform === 'win32' ? '.exe' : ''}`);

        fs.writeFileSync(sourceFile, cleanedCode);

        // Compilation
        const compileProcess = spawn(compiler, [sourceFile, '-o', executable], { timeout: 15000, cwd: tempDir });
        let compileError = '';

        compileProcess.stderr.on('data', (data) => {
          compileError += data.toString();
        });

        await new Promise((resolve, reject) => {
          compileProcess.on('error', (err) => reject(new Error(`${compiler} not found. ${err.message}`)));
          compileProcess.on('close', (code) => {
            if (code !== 0) {
              reject(new Error(compileError || `Compilation failed with exit code ${code}`));
            } else {
              resolve();
            }
          });
        });

        runCommand = executable;
        runArgs = [];
        tempFiles.push(sourceFile, executable);
        break;
      }

      case 'java': {
        sourceFile = path.join(tempDir, 'Main.java');
        const className = 'Main';
        const classFile = path.join(tempDir, 'Main.class');

        fs.writeFileSync(sourceFile, cleanedCode);

        // Compilation
        const compileProcess = spawn('javac', [sourceFile], { timeout: 10000, cwd: tempDir });
        let compileError = '';

        compileProcess.stderr.on('data', (data) => {
          compileError += data.toString();
        });

        await new Promise((resolve, reject) => {
            compileProcess.on('error', (err) => reject(new Error(`javac not found. ${err.message}`)));
            compileProcess.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(compileError || `Compilation failed with exit code ${code}`));
                } else if (!fs.existsSync(classFile)) {
                    reject(new Error('Compilation failed: Class file was not created'));
                } else {
                    resolve();
                }
            });
        });

        runCommand = 'java';
        runArgs = ['-cp', tempDir, className];
        tempFiles.push(sourceFile, classFile);
        break;
      }

      case 'javascript':
        sourceFile = path.join(tempDir, `${sessionId}.js`);
        fs.writeFileSync(sourceFile, cleanedCode);
        runCommand = 'node';
        runArgs = [sourceFile];
        tempFiles.push(sourceFile);
        break;

      default:
        throw new Error(`Unsupported language: ${language}`);
    }

    // Execution
    const childProcess = spawn(runCommand, runArgs, {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 30000,
      cwd: tempDir
    });

    let stdout = '';
    let stderr = '';
    let timedOut = false;

    // Send input if provided
    if (input) {
      childProcess.stdin.write(input);
      childProcess.stdin.end();
    }

    childProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    childProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    const result = await new Promise((resolve) => {
      childProcess.on('close', (code) => {
        resolve({ stdout, stderr, exitCode: code });
      });
      childProcess.on('error', (err) => {
          stderr += `Execution error: ${err.message}`;
          resolve({ stdout: '', stderr, exitCode: 1 });
      });
      childProcess.on('timeout', () => {
        timedOut = true;
        childProcess.kill();
        stderr += 'Execution timed out.';
        resolve({ stdout: '', stderr, exitCode: 1 });
      });
    });

    if (timedOut) {
        result.stderr = 'Execution timed out. Try to optimize your solution.';
        result.exitCode = 1;
    }

    // CRITICAL: Throw an error if compilation or execution failed to be caught by problemController
    if (result.exitCode !== 0 && result.stderr) {
        throw new Error(result.stderr);
    }

    return result;

  } catch (error) {
    console.error(`Error during single test run for ${language}:`, error.message);
    // Return a structured error object for the controller to handle
    return { stdout: '', stderr: error.message, exitCode: 1 };
  } finally {
    // Cleanup temporary files
    cleanupFiles(tempFiles);
  }
}

// Helper function to clean up multiple files
function cleanupFiles(files) {
  files.forEach(file => {
    if (file && fs.existsSync(file)) {
      try {
        fs.unlinkSync(file);
      } catch (e) {
        console.error('Error cleaning file:', file, e.message);
      }
    }
  });
}

module.exports = { runCodeTest };