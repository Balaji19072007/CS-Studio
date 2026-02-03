import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useAuth } from '../hooks/useAuth';
import * as feather from 'feather-icons';
import { ChallengeSkeleton } from '../components/common/SkeletonLoader';

// Simple Icon component to avoid conflicts
const Icon = ({ name, className = '' }) => {
    // Only render if feather is loaded
    if (!name || !feather.icons[name]) return null;
    return <span className={className} dangerouslySetInnerHTML={{ __html: feather.icons[name].toSvg() }} />;
};

const CourseChallengePage = () => {
    const { challengeId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // State
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('description');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [isSolved, setIsSolved] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Timer State
    const [timeElapsed, setTimeElapsed] = useState(0); // For solution unlock
    const [isSolutionUnlocked, setIsSolutionUnlocked] = useState(false);

    // Constants
    const LOCK_TIME_SECONDS = 300; // 5 minutes

    useEffect(() => {
        fetchChallenge();

        // Start Timer
        const interval = setInterval(() => {
            setTimeElapsed(prev => {
                const newTime = prev + 1;
                if (newTime >= LOCK_TIME_SECONDS) setIsSolutionUnlocked(true);
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [challengeId]);

    const fetchChallenge = async () => {
        try {
            // Adjust API URL if deployed differently
            const res = await fetch(`http://localhost:5000/api/course-challenges/${challengeId}`, {
                headers: user ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {}
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.msg || 'Failed to fetch challenge');

            setChallenge(data);
            setIsSolved(data.solved);

            // Set boilerplate if not set
            if (!code) {
                setCode(data.language === 'C'
                    ? '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    printf("Hello World");\n    return 0;\n}'
                    : '// Write your solution here');
            }

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!code) return;
        setSubmitting(true);
        setOutput('Compiling and Running...');

        try {
            const res = await fetch(`http://localhost:5000/api/course-challenges/${challengeId}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ code, language: 'C' })
            });
            const result = await res.json();

            if (result.success) {
                setOutput(result.output || 'Correct Output!');
                setIsSolved(true);
            } else {
                setOutput(result.message + (result.output ? `\n\nOutput:\n${result.output}` : '') + (result.error ? `\n\nError:\n${result.error}` : ''));
            }
        } catch (err) {
            setOutput('Submission Error: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setCode('#include <stdio.h>\n\nint main() {\n    // Write your code here\n    printf("Hello World");\n    return 0;\n}');
        setOutput('');
        setIsSolved(false); // Reset solved state visually for "Try Again"
    };

    // Format time for lock
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (loading) return <ChallengeSkeleton />;
    if (error) return <div className="min-h-screen bg-[#0F172A] text-red-500 flex items-center justify-center">{error}</div>;

    return (
        <div className="h-screen bg-[#0F172A] flex flex-col overflow-hidden font-sans">
            {/* Header */}
            <header className="bg-[#1E293B] border-b border-gray-700 h-14 flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
                        ← Back
                    </button>
                    <h1 className="text-white font-bold text-sm sm:text-lg truncate max-w-md">
                        {challenge.title}
                    </h1>
                </div>
                {isSolved && (
                    <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20 flex items-center gap-2">
                        <span>✅</span> Solved
                    </div>
                )}
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                {/* Left Panel */}
                <div className="w-full md:w-1/2 flex flex-col border-r border-gray-700 bg-[#0F172A]">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-700 bg-[#1E293B]">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'description' ? 'text-blue-400 border-b-2 border-blue-400 bg-[#0F172A]' : 'text-gray-400 hover:text-white'}`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab('testcases')}
                            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'testcases' ? 'text-blue-400 border-b-2 border-blue-400 bg-[#0F172A]' : 'text-gray-400 hover:text-white'}`}
                        >
                            Test Cases
                        </button>
                        <button
                            onClick={() => setActiveTab('solution')}
                            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'solution' ? 'text-blue-400 border-b-2 border-blue-400 bg-[#0F172A]' : 'text-gray-400 hover:text-white'}`}
                        >
                            Solution {!isSolutionUnlocked && !isSolved && '🔒'}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 text-gray-300">
                        {activeTab === 'description' && (
                            <div className="space-y-6 animate-fade-in">
                                <section>
                                    <h3 className="text-white text-lg font-bold mb-2">Problem Statement</h3>
                                    <p className="leading-relaxed text-gray-400">
                                        {challenge.description}
                                    </p>
                                </section>

                                <div className="grid grid-cols-1 gap-6">
                                    <section className="bg-[#1E293B] p-4 rounded-lg border border-gray-700">
                                        <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">Input Format</h4>
                                        <div className="font-mono text-sm text-gray-400">{challenge.input_format || 'None'}</div>
                                    </section>
                                    <section className="bg-[#1E293B] p-4 rounded-lg border border-gray-700">
                                        <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">Output Format</h4>
                                        <div className="font-mono text-sm text-gray-400">{challenge.output_format}</div>
                                    </section>
                                </div>

                                {challenge.hints && (
                                    <section>
                                        <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
                                            <span>💡</span> Hints
                                        </h3>
                                        <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                            <ul className="list-disc pl-4 space-y-2 text-yellow-200/80">
                                                {challenge.hints.split('\n').slice(0, 2).map((hint, i) => (
                                                    <li key={i}>{hint}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </section>
                                )}
                            </div>
                        )}

                        {activeTab === 'testcases' && (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in">
                                <div className="text-6xl opacity-20">🧪</div>
                                <h3 className="text-xl font-bold text-gray-400">Test Cases Hidden</h3>
                                <p className="text-gray-500 max-w-xs">
                                    Test cases are hidden for this challenge. Focus on the logic!
                                </p>
                            </div>
                        )}

                        {activeTab === 'solution' && (
                            <div className="h-full animate-fade-in relative">
                                {(isSolutionUnlocked || isSolved) ? (
                                    <div className="space-y-4">
                                        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg text-green-300 mb-4">
                                            <h4 className="font-bold flex items-center gap-2">
                                                <span>🔓</span> Unlocked
                                            </h4>
                                            <p className="text-sm opacity-80">Reference solution below.</p>
                                        </div>
                                        <div className="bg-[#1E293B] p-4 rounded-lg border border-gray-700 font-mono text-sm">
                                            <h4 className="text-gray-400 text-xs uppercase mb-2">Reference Output</h4>
                                            <pre className="text-white whitespace-pre-wrap">{challenge.reference_output}</pre>
                                        </div>
                                        {/* If we had full solution code in DB, we'd show it here */}
                                        <p className="text-gray-500 italic text-sm">Note: Analyze your output format to match exactly.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                                        <div className="relative">
                                            <div className="text-6xl">🔒</div>
                                            <div className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                LOCKED
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-white">Solution Locked</h3>
                                            <p className="text-gray-400">
                                                Solution will unlock in:
                                            </p>
                                            <div className="text-3xl font-mono text-blue-400 font-bold">
                                                {formatTime(Math.max(0, LOCK_TIME_SECONDS - timeElapsed))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 max-w-xs">
                                            Try to solve it yourself first! Learning happens when you struggle a bit.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Editor */}
                <div className="w-full md:w-1/2 flex flex-col bg-[#1E293B]">
                    <div className="flex-1 relative">
                        <Editor
                            height="100%"
                            defaultLanguage="c"
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value)}
                            options={{
                                minimize: { enabled: false },
                                fontSize: 14,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 20 }
                            }}
                        />
                    </div>

                    {/* Console / Output */}
                    <div className="h-1/3 bg-[#0F172A] border-t border-gray-700 flex flex-col">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#1E293B] border-b border-gray-700">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Output Console</span>
                            <div className="flex gap-2">
                                {isSolved && (
                                    <button
                                        onClick={handleReset}
                                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors"
                                    >
                                        Try Again
                                    </button>
                                )}
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || isSolved}
                                    className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all
                                        ${isSolved
                                            ? 'bg-green-600 text-white cursor-default'
                                            : submitting
                                                ? 'bg-blue-800 text-blue-300 cursor-wait'
                                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                        }`}
                                >
                                    {submitting ? 'Running...' : isSolved ? 'Solved!' : 'Run & Submit'}
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm text-gray-300 overflow-auto whitespace-pre-wrap">
                            {output || <span className="text-gray-600 italic">// Output will appear here...</span>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseChallengePage;
