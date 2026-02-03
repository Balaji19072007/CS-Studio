import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuiz, getQuizQuestionsWithOptions, submitQuizAttempt, getUserQuizAttempts } from '../api/quizApi';
import { updateCourseProgress } from '../api/progressApi';
import { useAuth } from '../hooks/useAuth';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { QuizSkeleton } from '../components/common/SkeletonLoader';

const QuizPage = ({ embedded = false, quizId = null }) => {
    const { courseId, quizId: paramQuizId } = useParams();
    const { user } = useAuth();
    const resolvedQuizId = quizId || paramQuizId;
    const navigate = useNavigate();

    // States: 'IDLE', 'RUNNING', 'COMPLETED'
    const [gameState, setGameState] = useState('IDLE');
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [history, setHistory] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [results, setResults] = useState(null);
    const [showAnswers, setShowAnswers] = useState(false); // Toggle review mode
    const [warnings, setWarnings] = useState(0);
    const [violationMsg, setViolationMsg] = useState(null);

    // Initial Data Fetch
    useEffect(() => {
        if (!resolvedQuizId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const [quizData, questionsData] = await Promise.all([
                    getQuiz(resolvedQuizId),
                    getQuizQuestionsWithOptions(resolvedQuizId)
                ]);

                setQuiz(quizData);
                setQuestions(questionsData);

                // Fetch History
                if (user) {
                    const attempts = await getUserQuizAttempts(user.id, resolvedQuizId);
                    setHistory(attempts);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [resolvedQuizId]);

    // Anti-Cheat & Fullscreen Logic
    useEffect(() => {
        if (gameState !== 'RUNNING') return;

        const handleViolation = (reason) => {
            setWarnings(prev => {
                const newCount = prev + 1;
                if (newCount >= 3) {
                    terminateQuiz(`Quiz terminated! Too many violations. Last: ${reason}`);
                    return 0; // Reset
                }
                return newCount;
            });
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleViolation("Switched tabs/windows");
            }
        };

        const handleBlur = () => {
            handleViolation("Left window focus");
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                handleViolation("Exited fullscreen");
            }
        };

        // Disable copy-paste/context menu
        const preventCopy = (e) => { e.preventDefault(); return false; };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('contextmenu', preventCopy);
        document.addEventListener('copy', preventCopy);
        document.addEventListener('cut', preventCopy);
        document.addEventListener('paste', preventCopy);
        document.addEventListener('selectstart', preventCopy); // Disable text selection

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('contextmenu', preventCopy);
            document.removeEventListener('copy', preventCopy);
            document.removeEventListener('cut', preventCopy);
            document.removeEventListener('paste', preventCopy);
            document.removeEventListener('selectstart', preventCopy);
        };
    }, [gameState]);

    const startQuiz = async () => {
        setViolationMsg(null);
        setAnswers({});
        setResults(null);
        setShowAnswers(false);
        setWarnings(0);

        // Enter Fullscreen
        try {
            await document.documentElement.requestFullscreen();
            setGameState('RUNNING');
        } catch (err) {
            console.error("Fullscreen denied:", err);
            alert("Please allow fullscreen to take the quiz.");
        }
    };

    const terminateQuiz = (reason) => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => { });
        }
        setGameState('IDLE');
        setViolationMsg(reason);
        setAnswers({});
        setWarnings(0);
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = async () => {
        if (!user) return alert('Please sign in');

        // Removed strict validation check for unanswered questions

        try {
            setSubmitting(true);

            // Calculate Results
            let correctCount = 0;
            const answerDetails = questions.map(question => {
                const userAnswer = answers[question.id] !== undefined ? answers[question.id] : null;
                let isCorrect = false;

                if (question.question_type === 'true_false') {
                    isCorrect = userAnswer === question.correct_answer;
                } else {
                    isCorrect = parseInt(userAnswer) === parseInt(question.correct_answer);
                }

                if (isCorrect) correctCount++;
                return { questionId: question.id, selectedAnswer: userAnswer, isCorrect };
            });

            const score = Math.round((correctCount / questions.length) * 100);
            const passed = score >= (quiz.pass_percentage || 60);

            // Submit
            await submitQuizAttempt(user.id, resolvedQuizId, answerDetails, score, passed);
            await updateCourseProgress(user.id, courseId);

            // Refresh history
            const attempts = await getUserQuizAttempts(user.id, resolvedQuizId);
            setHistory(attempts);

            setResults({
                score, pass_percentage: quiz.pass_percentage || 60, passed,
                correct: correctCount, incorrect: questions.length - correctCount,
                total: questions.length, answerDetails
            });

            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => { });
            }
            setGameState('COMPLETED');
        } catch (error) {
            console.error(error);
            alert('Submission failed: ' + (error.message || 'Unknown error'));
        } finally {
            setSubmitting(false);
        }
    };

    // --- RENDERERS ---

    const renderStartScreen = () => (
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-6">{quiz?.title}</h1>

            {violationMsg && (
                <div className="bg-red-500/10 border border-red-500 text-red-200 p-4 rounded-lg mb-8 animate-pulse">
                    ⚠️ {violationMsg}
                </div>
            )}

            <div className="bg-[#1E293B] rounded-xl p-8 border border-gray-700 shadow-xl mb-10 text-left">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                    ⚠️ Strict Quiz Rules
                </h3>
                <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">🔹 Quiz will launch in <strong>Fullscreen Mode</strong>.</li>
                    <li className="flex items-start gap-2">🔹 <strong>Do NOT switch tabs</strong> or separate windows.</li>
                    <li className="flex items-start gap-2">🔹 <strong>Do NOT exit fullscreen</strong> until finished.</li>
                    <li className="flex items-start gap-2">🔹 Copying, pasting, and text selection are <strong>Disabled</strong>.</li>
                    <li className="flex items-start gap-2">❌ Violation of these rules will <strong>terminate the quiz immediately</strong>.</li>
                </ul>
            </div>

            <button
                onClick={startQuiz}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95"
            >
                🚀 Start Quiz
            </button>

            {/* History Section */}
            {history.length > 0 && (
                <div className="mt-12 text-left">
                    <h3 className="text-lg font-bold text-gray-400 mb-4">📜 Past Attempts</h3>
                    <div className="bg-[#1E293B] rounded-xl overflow-hidden border border-gray-700">
                        {history.map((attempt, i) => (
                            <div key={attempt.id} className="flex items-center justify-between p-4 border-b border-gray-700 last:border-0 hover:bg-gray-800/50">
                                <div>
                                    <span className="text-gray-400 text-sm">Attempt {history.length - i}</span>
                                    <div className="text-xs text-gray-500">{new Date(attempt.completed_at).toLocaleString()}</div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${attempt.passed ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {attempt.score}% {attempt.passed ? 'PASS' : 'FAIL'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderActiveQuiz = () => (
        <div className="max-w-4xl mx-auto px-4 py-8 select-none"> {/* Disable selection via CSS class too */}
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#0F172A] z-20 py-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white max-w-[70%] truncate">{quiz.title}</h2>
                <div className="flex flex-col items-end">
                    <div className="text-gray-400 font-mono">
                        {Object.keys(answers).length} / {questions.length} Answered
                    </div>
                    {warnings > 0 && (
                        <div className="text-red-400 text-sm font-bold animate-pulse mt-1">
                            ⚠️ {3 - warnings} Warnings Left
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-8 pb-20">
                {questions.map((q, idx) => (
                    <div key={q.id} className="bg-[#1E293B] rounded-xl p-6 border border-gray-700">
                        <div className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-300 font-bold text-sm">
                                {idx + 1}
                            </span>
                            <div className="flex-1">
                                <p className="text-lg text-white mb-4">{q.question_text}</p>

                                {q.question_type === 'code_output' && q.code_snippet && (
                                    <SyntaxHighlighter language="c" style={vscDarkPlus} className="rounded-lg mb-4 text-sm">
                                        {q.code_snippet}
                                    </SyntaxHighlighter>
                                )}

                                <div className="space-y-2 mt-4">
                                    {q.question_type === 'true_false' ? (
                                        ['true', 'false'].map(val => (
                                            <label key={val} className={`block cursor-pointer p-4 rounded-lg border-2 transition-all ${answers[q.id] === val ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}`}>
                                                <input type="radio" name={q.question_id} value={val} checked={answers[q.id] === val} onChange={() => handleAnswerChange(q.id, val)} className="hidden" />
                                                <span className="capitalize text-gray-300">{val}</span>
                                            </label>
                                        ))
                                    ) : (
                                        q.options.map((opt, i) => (
                                            <label key={opt.id} className={`block cursor-pointer p-4 rounded-lg border-2 transition-all ${answers[q.id] === String(i) ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}`}>
                                                <input type="radio" name={q.question_id} value={i} checked={answers[q.id] === String(i)} onChange={() => handleAnswerChange(q.id, String(i))} className="hidden" />
                                                <span className="text-gray-300">{opt.option_text}</span>
                                            </label>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1E293B] border-t border-gray-700 flex justify-center z-30">
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-50"
                >
                    {submitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
            </div>
        </div>
    );

    const renderResults = () => (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className={`text-center p-8 rounded-2xl border-2 mb-8 ${results.passed ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}>
                <div className="text-6xl mb-4">{results.passed ? '🏆' : '💔'}</div>
                <h2 className="text-3xl font-bold text-white mb-2">{results.passed ? 'Great Job!' : 'Quiz Failed'}</h2>
                <div className="text-5xl font-black text-white my-4">{results.score}%</div>
                <p className="text-gray-400">Pass Mark: {results.pass_percentage}%</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <div className="bg-gray-800/50 p-3 rounded-lg"><div className="text-2xl font-bold text-white">{results.total}</div><div className="text-xs text-gray-400">Total</div></div>
                    <div className="bg-green-500/10 p-3 rounded-lg"><div className="text-2xl font-bold text-green-400">{results.correct}</div><div className="text-xs text-green-300">Correct</div></div>
                    <div className="bg-red-500/10 p-3 rounded-lg"><div className="text-2xl font-bold text-red-400">{results.incorrect}</div><div className="text-xs text-red-300">Incorrect</div></div>
                    <div className="bg-gray-800/50 p-3 rounded-lg"><div className="text-2xl font-bold text-blue-400">0</div><div className="text-xs text-blue-300">Skipped</div></div>
                </div>
            </div>

            <div className="flex gap-4 justify-center mb-10">
                <button onClick={() => setGameState('IDLE')} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">Back to Menu</button>
                <button onClick={() => setShowAnswers(!showAnswers)} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
                    {showAnswers ? 'Hide Answers' : 'View Answers'}
                </button>
            </div>

            {showAnswers && (
                <div className="space-y-6">
                    {questions.map((q, idx) => {
                        const detail = results.answerDetails.find(d => d.questionId === q.id);
                        const isCorr = detail?.isCorrect;

                        return (
                            <div key={q.id} className={`p-6 rounded-xl border ${isCorr ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                                <div className="flex gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCorr ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                        {isCorr ? '✓' : '✗'}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium mb-2">{q.question_text}</p>
                                        <p className="text-sm text-gray-400 mb-1">Your Answer: <span className={isCorr ? 'text-green-400' : 'text-red-400'}>
                                            {q.question_type === 'true_false' ? detail?.selectedAnswer : q.options[detail?.selectedAnswer]?.option_text || 'None'}
                                        </span></p>
                                        {!isCorr && (
                                            <p className="text-sm text-green-400">Correct Answer: <span>
                                                {q.question_type === 'true_false' ? q.correct_answer : q.options.find(o => o.is_correct)?.option_text}
                                            </span></p>
                                        )}
                                        {q.explanation && (
                                            <div className="mt-2 p-3 bg-gray-800 rounded text-xs text-blue-200">
                                                <strong>ℹ️ Explanation:</strong> {q.explanation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );

    if (loading) return <QuizSkeleton />;

    return (
        <div className={`min-h-screen bg-[#0F172A] ${gameState === 'RUNNING' ? 'fixed inset-0 z-50 overflow-y-auto' : ''}`}>
            <style>{`
                .select-none { user-select: none; -webkit-user-select: none; }
            `}</style>

            {/* Nav (Only visible if NOT running) */}
            {gameState !== 'RUNNING' && !embedded && (
                <header className="bg-[#1E293B] border-b border-gray-700/50 px-4 py-3 flex items-center gap-4">
                    <button onClick={() => navigate(`/courses/${courseId}/learn`)} className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white">←</button>
                    <span className="font-bold text-white">Exit Quiz</span>
                </header>
            )}

            {gameState === 'IDLE' && renderStartScreen()}
            {gameState === 'RUNNING' && renderActiveQuiz()}
            {gameState === 'COMPLETED' && renderResults()}
        </div>
    );
};

export default QuizPage;
