const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class CodeExecutionService {
  constructor() {
    this.tempDir = path.join(__dirname, 'temp');
    this.setupTempDir();
  }

  setupTempDir() {
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  /**
   * Execute code with given input
   */
  async executeCode(code, language, input = '') {
    const sessionId = uuidv4();
    const startTime = Date.now();

    try {
      console.log(`⚡ Executing ${language} code (${sessionId})`);
      
      switch (language.toLowerCase()) {
        case 'python':
          return await this.executePython(code, input, sessionId);
        
        case 'c':
          return await this.executeC(code, input, sessionId);
        
        case 'cpp':
        case 'c++':
          return await this.executeCpp(code, input, sessionId);
        
        case 'java':
          return await this.executeJava(code, input, sessionId);
        
        case 'javascript':
        case 'js':
          return await this.executeJavaScript(code, input, sessionId);
        
        default:
          throw new Error(`Unsupported language: ${language}`);
      }
    } catch (error) {
      console.error(`❌ Execution error for ${sessionId}:`, error);
      return {
        success: false,
        output: '',
        error: error.message,
        executionTime: Date.now() - startTime
      };
    }
  }

  /**
   * Python execution
   */
  async executePython(code, input, sessionId) {
    return new Promise((resolve) => {
      const tempFile = path.join(this.tempDir, `${sessionId}.py`);
      fs.writeFileSync(tempFile, code);

      const pythonProcess = spawn('python', [tempFile], {
        timeout: 10000 // 10 seconds timeout
      });

      this.handleProcessExecution(pythonProcess, input, sessionId, [tempFile], resolve);
    });
  }

  /**
   * C execution
   */
  async executeC(code, input, sessionId) {
    return new Promise((resolve) => {
      const sourceFile = path.join(this.tempDir, `${sessionId}.c`);
      const executable = path.join(this.tempDir, `${sessionId}${process.platform === 'win32' ? '.exe' : ''}`);
      
      fs.writeFileSync(sourceFile, code);

      // Compile C code
      const compileProcess = spawn('gcc', [sourceFile, '-o', executable], {
        timeout: 15000
      });

      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compileProcess.on('close', (exitCode) => {
        if (exitCode !== 0) {
          this.cleanupFiles([sourceFile]);
          return resolve({
            success: false,
            output: '',
            error: `C Compilation failed:\n${compileError}`,
            executionTime: 0
          });
        }

        // Execute compiled program
        const cProcess = spawn(executable, [], { timeout: 10000 });
        this.handleProcessExecution(cProcess, input, sessionId, [sourceFile, executable], resolve);
      });

      compileProcess.on('error', (err) => {
        this.cleanupFiles([sourceFile]);
        resolve({
          success: false,
          output: '',
          error: `C Compiler error: ${err.message}`,
          executionTime: 0
        });
      });
    });
  }

  /**
   * C++ execution
   */
  async executeCpp(code, input, sessionId) {
    return new Promise((resolve) => {
      const sourceFile = path.join(this.tempDir, `${sessionId}.cpp`);
      const executable = path.join(this.tempDir, `${sessionId}${process.platform === 'win32' ? '.exe' : ''}`);
      
      fs.writeFileSync(sourceFile, code);

      // Compile C++ code
      const compileProcess = spawn('g++', [sourceFile, '-o', executable], {
        timeout: 15000
      });

      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compileProcess.on('close', (exitCode) => {
        if (exitCode !== 0) {
          this.cleanupFiles([sourceFile]);
          return resolve({
            success: false,
            output: '',
            error: `C++ Compilation failed:\n${compileError}`,
            executionTime: 0
          });
        }

        // Execute compiled program
        const cppProcess = spawn(executable, [], { timeout: 10000 });
        this.handleProcessExecution(cppProcess, input, sessionId, [sourceFile, executable], resolve);
      });

      compileProcess.on('error', (err) => {
        this.cleanupFiles([sourceFile]);
        resolve({
          success: false,
          output: '',
          error: `C++ Compiler error: ${err.message}`,
          executionTime: 0
        });
      });
    });
  }

  /**
   * Java execution
   */
  async executeJava(code, input, sessionId) {
    return new Promise((resolve) => {
      const sourceFile = path.join(this.tempDir, 'Main.java');
      fs.writeFileSync(sourceFile, code);

      // Compile Java code
      const compileProcess = spawn('javac', [sourceFile], {
        timeout: 15000,
        cwd: this.tempDir
      });

      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compileProcess.on('close', (exitCode) => {
        if (exitCode !== 0) {
          this.cleanupFiles([sourceFile]);
          return resolve({
            success: false,
            output: '',
            error: `Java Compilation failed:\n${compileError}`,
            executionTime: 0
          });
        }

        const classFile = path.join(this.tempDir, 'Main.class');
        if (!fs.existsSync(classFile)) {
          this.cleanupFiles([sourceFile]);
          return resolve({
            success: false,
            output: '',
            error: 'Java Compilation failed: Class file was not created',
            executionTime: 0
          });
        }

        // Execute Java program
        const javaProcess = spawn('java', ['-cp', this.tempDir, 'Main'], {
          timeout: 10000,
          cwd: this.tempDir
        });

        this.handleProcessExecution(javaProcess, input, sessionId, [sourceFile, classFile], resolve);
      });

      compileProcess.on('error', (err) => {
        this.cleanupFiles([sourceFile]);
        resolve({
          success: false,
          output: '',
          error: `Java Compiler error: ${err.message}`,
          executionTime: 0
        });
      });
    });
  }

  /**
   * JavaScript execution
   */
  async executeJavaScript(code, input, sessionId) {
    return new Promise((resolve) => {
      const tempFile = path.join(this.tempDir, `${sessionId}.js`);
      fs.writeFileSync(tempFile, code);

      const nodeProcess = spawn('node', [tempFile], {
        timeout: 10000
      });

      this.handleProcessExecution(nodeProcess, input, sessionId, [tempFile], resolve);
    });
  }

  /**
   * Common process execution handler
   */
  handleProcessExecution(process, input, sessionId, tempFiles, resolve) {
    const startTime = Date.now();
    let output = '';
    let errorOutput = '';

    // Write input to STDIN if provided
    if (input) {
      process.stdin.write(input + '\n');
      process.stdin.end();
    }

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    process.on('close', (exitCode) => {
      const executionTime = Date.now() - startTime;
      this.cleanupFiles(tempFiles);

      if (exitCode !== 0 || errorOutput) {
        resolve({
          success: false,
          output: output,
          error: errorOutput || `Process exited with code ${exitCode}`,
          executionTime: executionTime
        });
      } else {
        resolve({
          success: true,
          output: this.cleanOutput(output),
          error: '',
          executionTime: executionTime
        });
      }
    });

    process.on('error', (err) => {
      const executionTime = Date.now() - startTime;
      this.cleanupFiles(tempFiles);
      resolve({
        success: false,
        output: '',
        error: `Execution error: ${err.message}`,
        executionTime: executionTime
      });
    });

    // Handle timeout
    setTimeout(() => {
      if (process.exitCode === null) {
        process.kill();
        this.cleanupFiles(tempFiles);
        resolve({
          success: false,
          output: '',
          error: 'Execution timeout (10 seconds exceeded)',
          executionTime: Date.now() - startTime
        });
      }
    }, 10000);
  }

  /**
   * Clean and normalize output
   */
  cleanOutput(output) {
    return output
      .replace(/\r\n/g, '\n') // Normalize line endings
      .replace(/\s+$/g, '')   // Remove trailing whitespace
      .trim();                // Remove surrounding whitespace
  }

  /**
   * Clean up temporary files
   */
  cleanupFiles(files) {
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
}

module.exports = CodeExecutionService;