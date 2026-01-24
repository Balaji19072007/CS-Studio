const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Store active processes: socket.id -> { process, tempFiles }
const activeExecutions = new Map();

const TEMP_DIR = path.join(__dirname, '../temp/socket_exec');
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('🔌 Socket connected:', socket.id);

        socket.on('join-notifications', (userId) => {
            socket.join(`user-${userId}`);
            console.log(`User ${userId} joined notification room`);
        });

        socket.on('execute-code', async ({ code, language, input }) => {
            if (!code) {
                socket.emit('execution-output', { output: 'No code provided.\n', isError: true });
                return;
            }

            // Kill any existing execution for this socket
            if (activeExecutions.has(socket.id)) {
                cleanupExecution(socket.id);
            }

            const sessionId = `exec_${socket.id}_${Date.now()}`;
            let sourceFile, executable;
            let tempFiles = [];

            try {
                const { cmd, args, srcFile, exe, files } = prepareExecution(language, code, sessionId);
                sourceFile = srcFile;
                executable = exe;
                tempFiles = files;

                // Compilation Step (for C/C++/Java)
                if (['c', 'cpp', 'java'].includes(language.toLowerCase())) {
                    // Silent compilation
                    try {
                        await compileCode(language, srcFile, exe);
                    } catch (compileErr) {
                        socket.emit('execution-output', { output: `Compilation Error:\n${compileErr.message}\n`, isError: true });
                        socket.emit('execution-result', { success: false, output: '' });
                        cleanupFiles(tempFiles);
                        return;
                    }
                }

                socket.emit('waiting-for-input');

                const child = spawn(cmd, args, { cwd: TEMP_DIR });

                // Store process for input/stop handling
                activeExecutions.set(socket.id, { process: child, tempFiles });

                // Handle Input (if initial input provided)
                if (input) {
                    child.stdin.write(input);
                    child.stdin.end(); // If interactive, usually we don't end immediately, but for now this matches simple runner
                }

                child.stdout.on('data', (data) => {
                    socket.emit('execution-output', { output: data.toString(), isError: false });
                });

                child.stderr.on('data', (data) => {
                    socket.emit('execution-output', { output: data.toString(), isError: true });
                });

                child.on('close', (code) => {
                    socket.emit('execution-output', { output: `\nProcess exited with code ${code}\n`, isError: code !== 0 });
                    socket.emit('execution-result', { success: code === 0, output: '' });
                    cleanupExecution(socket.id);
                });

                child.on('error', (err) => {
                    socket.emit('execution-output', { output: `Execution Start Error: ${err.message}\n`, isError: true });
                    cleanupExecution(socket.id);
                });

            } catch (err) {
                socket.emit('execution-output', { output: `Error: ${err.message}\n`, isError: true });
                cleanupFiles(tempFiles);
            }
        });

        socket.on('send-input', (inputData) => {
            const exec = activeExecutions.get(socket.id);
            if (exec && exec.process && !exec.process.killed) {
                try {
                    exec.process.stdin.write(inputData + '\n');
                } catch (e) {
                    console.error("Failed to write input:", e);
                }
            }
        });

        socket.on('stop-execution', () => {
            cleanupExecution(socket.id);
            socket.emit('execution-output', { output: '\nExecution stopped by user.\n', isError: true });
        });

        socket.on('disconnect', () => {
            cleanupExecution(socket.id);
            console.log('🔌 Socket disconnected:', socket.id);
        });
    });
};

function prepareExecution(language, code, sessionId) {
    // Remove markdown code fences if present
    let cleanedCode = code.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '');

    let cmd, args, srcFile, exe;
    let files = [];

    switch (language.toLowerCase()) {
        case 'python':
            srcFile = path.join(TEMP_DIR, `${sessionId}.py`);
            fs.writeFileSync(srcFile, cleanedCode);
            cmd = 'python'; // or 'python3'
            args = ['-u', srcFile]; // -u for unbuffered output
            files.push(srcFile);
            break;

        case 'javascript':
            srcFile = path.join(TEMP_DIR, `${sessionId}.js`);
            fs.writeFileSync(srcFile, cleanedCode);
            cmd = 'node';
            args = [srcFile];
            files.push(srcFile);
            break;

        case 'c':
            srcFile = path.join(TEMP_DIR, `${sessionId}.c`);
            exe = path.join(TEMP_DIR, `${sessionId}.exe`);

            // Ensure stdio.h is present for setvbuf
            if (!cleanedCode.includes('<stdio.h>')) {
                cleanedCode = '#include <stdio.h>\n' + cleanedCode;
            }

            // Inject setvbuf to disable output buffering for interactive terminal feel
            // Supports int main() and void main()
            if (!cleanedCode.includes('setvbuf')) {
                cleanedCode = cleanedCode.replace(/((?:int|void)\s+main\s*\([^)]*\)\s*\{)/, '$1 setvbuf(stdout, NULL, _IONBF, 0);');
            }

            fs.writeFileSync(srcFile, cleanedCode);
            cmd = exe;
            args = [];
            files.push(srcFile, exe);
            break;

        case 'cpp':
        case 'c++':
            srcFile = path.join(TEMP_DIR, `${sessionId}.cpp`);
            exe = path.join(TEMP_DIR, `${sessionId}.exe`);

            // Ensure stdio.h or iostream is present
            if (!cleanedCode.includes('<stdio.h>') && !cleanedCode.includes('<iostream>')) {
                cleanedCode = '#include <iostream>\n' + cleanedCode;
            }

            // Inject setvbuf to disable output buffering
            if (!cleanedCode.includes('setvbuf')) {
                cleanedCode = cleanedCode.replace(/((?:int|void)\s+main\s*\([^)]*\)\s*\{)/, '$1 setvbuf(stdout, NULL, _IONBF, 0);');
            }

            fs.writeFileSync(srcFile, cleanedCode);
            cmd = exe;
            args = [];
            files.push(srcFile, exe);
            break;

        case 'java':
            // Java is tricky because class name must match file name. 
            // We assume public class Main or we parse it. For simplicity, force Main.
            // But multiple concurrent users can't overwrite Main.java. 
            // Solution: Create a unique directory for Java execution.
            const javaDir = path.join(TEMP_DIR, sessionId);
            fs.mkdirSync(javaDir);
            srcFile = path.join(javaDir, 'Main.java');
            fs.writeFileSync(srcFile, cleanedCode); // User must use "public class Main"

            // We run inside the unique directory
            cmd = 'java';
            // Classpath is . 
            args = ['Main'];

            // Special return for Java to indicate explicit files/dirs to cleanup
            return {
                cmd,
                args,
                srcFile,
                exe: null,
                files: [javaDir] // Cleanup the whole directory
            };

        default:
            throw new Error(`Unsupported language: ${language}`);
    }

    return { cmd, args, srcFile, exe, files };
}

function compileCode(language, srcFile, exe) {
    return new Promise((resolve, reject) => {
        let compileCmd, compileArgs;

        if (language === 'c') {
            compileCmd = 'gcc';
            compileArgs = [srcFile, '-o', exe];
        } else if (language === 'cpp' || language === 'c++') {
            compileCmd = 'g++';
            compileArgs = [srcFile, '-o', exe];
        } else if (language === 'java') {
            compileCmd = 'javac';
            compileArgs = [srcFile];
        }

        // For Java, CWD should be the file's directory
        const cwd = language === 'java' ? path.dirname(srcFile) : TEMP_DIR;

        const proc = spawn(compileCmd, compileArgs, { cwd });
        let stderr = '';

        proc.stderr.on('data', (d) => stderr += d.toString());

        proc.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(stderr || 'Compilation failed'));
        });

        proc.on('error', (err) => reject(new Error(`Compiler not found: ${err.message}`)));
    });
}

function cleanupExecution(socketId) {
    const exec = activeExecutions.get(socketId);
    if (exec) {
        if (exec.process && !exec.process.killed) {
            exec.process.kill();
        }
        cleanupFiles(exec.tempFiles);
        activeExecutions.delete(socketId);
    }
}

function cleanupFiles(files) {
    if (!files) return;
    files.forEach(file => {
        try {
            if (fs.existsSync(file)) {
                const stat = fs.statSync(file);
                if (stat.isDirectory()) {
                    fs.rmSync(file, { recursive: true, force: true });
                } else {
                    fs.unlinkSync(file);
                }
            }
        } catch (e) {
            console.error(`Failed to cleanup ${file}:`, e.message);
        }
    });
}
