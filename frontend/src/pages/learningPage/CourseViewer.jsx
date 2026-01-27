import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, Navigate, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { COURSE_CONTENT } from '../../data/courseContent';
import {
    FaChevronRight, FaChevronLeft, FaHome, FaList, FaPlay, FaFileAlt,
    FaCheckCircle, FaCircle, FaBars, FaTimes, FaCopy, FaLightbulb, FaArrowLeft
} from 'react-icons/fa';
import { MdMenuBook, MdQuiz, MdOndemandVideo } from 'react-icons/md';

const CourseViewer = () => {
    const { courseId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { isDark } = useTheme();
    const { isLoggedIn } = useAuth();

    // Find course data
    const courseData = COURSE_CONTENT[courseId];

    // State
    const [activeModule, setActiveModule] = useState(null);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [activeTab, setActiveTab] = useState('content'); // 'video' or 'content'
    const [completedTopics, setCompletedTopics] = useState(() => {
        const saved = localStorage.getItem(`course_progress_${courseId}`);
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [copySuccess, setCopySuccess] = useState(null);
    const [showCertificate, setShowCertificate] = useState(false); // New State

    // Initialize with Topic from URL or First Topic
    useEffect(() => {
        if (!courseData) return;

        const topicIdFromUrl = searchParams.get('topic');
        const allTopics = courseData.modules.flatMap(m => m.topics);

        if (topicIdFromUrl && !currentTopic) {
            // 1. Try to find topic from URL
            const foundTopic = allTopics.find(t => t.id === topicIdFromUrl);
            if (foundTopic) {
                setCurrentTopic(foundTopic);
                // Expand the parent module
                const parentModule = courseData.modules.find(m => m.topics.some(t => t.id === topicIdFromUrl));
                if (parentModule) setActiveModule(parentModule.id);
                return;
            }
        }

        // 2. Default to first topic if no URL param or topic not found
        if (!currentTopic && courseData.modules.length > 0) {
            const firstModule = courseData.modules[0];
            if (!activeModule) setActiveModule(firstModule.id);

            if (firstModule.topics.length > 0) {
                setCurrentTopic(firstModule.topics[0]);
            }
        }
    }, [courseData, activeModule, currentTopic, searchParams]);

    // Sync Current Topic to URL
    useEffect(() => {
        if (currentTopic && !showCertificate) {
            // Only sync topic ID if not showing certificate
            setSearchParams({ topic: currentTopic.id }, { replace: true });
        }
    }, [currentTopic, setSearchParams, showCertificate]);

    // Update active tab when topic changes
    useEffect(() => {
        if (currentTopic) {
            // Default to video if available, else content (Notes)
            setActiveTab(currentTopic.videoUrl ? 'video' : 'content');
            setShowCertificate(false); // Hide certificate when topic selected
        }
    }, [currentTopic]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Handle Copy Code
    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(null), 2000);
    };

    if (!courseData) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
                    <p className="mb-6">The course you are looking for does not exist or is under development.</p>
                    <Link to="/courses" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                        Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    const handleTopicClick = (topic) => {
        setCurrentTopic(topic);
        setShowCertificate(false); // Reset certificate view
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
    };

    const handleCertificateClick = () => {
        setShowCertificate(true);
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
    };

    const handleModuleToggle = (moduleId) => {
        setActiveModule(activeModule === moduleId ? null : moduleId);
    };

    const markAsCompleted = (topicId) => {
        if (completedTopics.has(topicId)) return;

        const newCompleted = new Set(completedTopics);
        newCompleted.add(topicId);
        setCompletedTopics(newCompleted);
        localStorage.setItem(`course_progress_${courseId}`, JSON.stringify([...newCompleted]));
    };

    const isTopicCompleted = (topicId) => completedTopics.has(topicId);

    // Navigation Helpers
    const flattenTopics = courseData.modules.flatMap(m => m.topics);
    const currentTopicIndex = flattenTopics.findIndex(t => t.id === currentTopic?.id);
    const nextTopic = currentTopicIndex < flattenTopics.length - 1 ? flattenTopics[currentTopicIndex + 1] : null;
    const prevTopic = currentTopicIndex > 0 ? flattenTopics[currentTopicIndex - 1] : null;

    // Custom Markdown Components
    const MarkdownComponents = {
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700" style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }} {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100" style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }} {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-100" style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }} {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-[16px] text-gray-800 dark:text-gray-300" style={{ fontFamily: 'Verdana, sans-serif', lineHeight: '1.6' }} {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-[16px] text-gray-800 dark:text-gray-300" style={{ fontFamily: 'Verdana, sans-serif' }} {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-[16px] text-gray-800 dark:text-gray-300" style={{ fontFamily: 'Verdana, sans-serif' }} {...props} />,
        li: ({ node, ...props }) => <li className="ml-4" {...props} />,
        blockquote: ({ node, ...props }) => (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-6">
                <div className="flex items-start">
                    <FaLightbulb className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                    <div className="text-gray-800 dark:text-gray-200 italic" style={{ fontFamily: 'Verdana, sans-serif' }} {...props} />
                </div>
            </div>
        ),
        code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && match) {
                return (
                    <div className="my-6 shadow-sm bg-white dark:bg-[#1e1e1e]">
                        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center justify-between border border-gray-200 dark:border-gray-700">
                            <span className="font-bold text-lg text-gray-700 dark:text-gray-300">Example</span>
                        </div>
                        <div className="bg-[#E7E9EB] dark:bg-[#15202b] p-4 overflow-x-auto border-x border-b border-gray-200 dark:border-gray-700">
                            <code className={`${className} font-mono text-[15px] text-black dark:text-gray-300`} {...props}>
                                {children}
                            </code>
                        </div>
                        <div className="bg-[#E7E9EB] dark:bg-[#15202b] px-4 pb-4 border-x border-b border-gray-200 dark:border-gray-700">
                            <Link
                                to={`/code?source=${encodeURIComponent(codeString)}&lang=${match[1]}&returnTo=${encodeURIComponent(`/learn/${courseId}?topic=${currentTopic.id}`)}`}
                                className="inline-block px-5 py-2.5 bg-[#04AA6D] text-white text-[15px] font-normal rounded-[4px] hover:bg-[#059862] transition-colors"
                                style={{ fontFamily: 'Verdana, sans-serif' }}
                            >
                                Try it Yourself &raquo;
                            </Link>
                        </div>
                    </div>
                );
            }
            return (
                <code className="bg-gray-100 dark:bg-gray-800 text-[#c7254e] dark:text-[#ff9999] px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                    {children}
                </code>
            );
        },
        table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
            </div>
        ),
        th: ({ node, ...props }) => <th className="bg-white dark:bg-gray-800 px-6 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700" style={{ fontFamily: 'Verdana, sans-serif' }} {...props} />,
        td: ({ node, ...props }) => <td className="bg-white dark:bg-gray-900 px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700" style={{ fontFamily: 'Verdana, sans-serif' }} {...props} />,
    };

    // ==========================================
    // 🧠 ADVANCED QUIZ LOGIC
    // ==========================================
    const [quizState, setQuizState] = useState({
        isActive: false,            // Is the quiz currently running?
        isTerminated: false,        // Was it terminated due to cheating?
        completed: false,           // Is it naturally finished?
        currentQuestion: 0,
        score: 0,
        answers: [],                // Stores { questionId, selectedOption, correctOption, timeTaken }
        startTime: null,            // When the WHOLE quiz started
        questionStartTime: null,    // When the CURRENT question started
        totalTime: 0,               // Total time taken in seconds
        violationCount: 0,          // Tab switches
        showReview: false           // Review mode toggle
    });

    // 🛡️ Security: Fullscreen & Tab Switching
    useEffect(() => {
        if (!quizState.isActive || quizState.completed || quizState.isTerminated) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setQuizState(prev => {
                    const newCount = prev.violationCount + 1;
                    if (newCount >= 3) { // Terminate on 3rd strike
                        document.exitFullscreen().catch(() => { });
                        return { ...prev, isTerminated: true, isActive: false };
                    }
                    alert(`⚠️ WARNING: Tab switching is prohibited! \nViolation ${newCount}/3.\nNext violation may terminate the quiz.`);
                    return { ...prev, violationCount: newCount };
                });
            }
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && quizState.isActive) {
                // Optional: warn or pause if they exit fullscreen manually
            }
        };

        // Disable Context Menu (Right Click)
        const handleContextMenu = (e) => e.preventDefault();

        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [quizState.isActive, quizState.completed, quizState.isTerminated]);


    // 🚀 Start Quiz
    const startQuiz = () => {
        // Request Fullscreen
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => console.log("Fullscreen blocked", err));
        }

        setQuizState({
            isActive: true,
            isTerminated: false,
            completed: false,
            currentQuestion: 0,
            score: 0,
            answers: [],
            startTime: Date.now(),
            questionStartTime: Date.now(),
            totalTime: 0,
            violationCount: 0,
            showReview: false
        });
    };

    // 🖱️ Handle Option Click (Selection Only)
    const handleQuizOptionClick = (optionIndex, correctIndex) => {
        const now = Date.now();
        // Time taken is cumulative or just from start? Simple approach: time from question load
        const timeSpent = (now - quizState.questionStartTime) / 1000;

        const newAnswer = {
            questionIndex: quizState.currentQuestion,
            selectedOption: optionIndex,
            correctOption: correctIndex,
            timeTaken: timeSpent,
            isCorrect: optionIndex === correctIndex
        };

        setQuizState(prev => {
            // Remove existing answer for this question if any, then add new one
            const filteredAnswers = prev.answers.filter(a => a.questionIndex !== prev.currentQuestion);

            // Calculate temp score (just for existing state, final score calc on submit)
            // Actually, let's just update the answers array. Score can be derived later or updated on fly.
            // But strict "score" state used for progress might act weird if we go back.
            // Let's recalculate score from all answers every time to be safe?
            const updatedAnswers = [...filteredAnswers, newAnswer];
            const newScore = updatedAnswers.filter(a => a.isCorrect).length;

            return {
                ...prev,
                score: newScore,
                answers: updatedAnswers
            };
        });
    };

    // ⏩ Next Question
    const handleNextQuestion = () => {
        const isLast = quizState.currentQuestion === currentTopic.questions.length - 1;

        if (isLast) {
            // Finish Quiz
            document.exitFullscreen().catch(() => { });
            markAsCompleted(currentTopic.id);
            const totalDuration = (Date.now() - quizState.startTime) / 1000;

            setQuizState(prev => ({
                ...prev,
                isActive: false,
                completed: true,
                totalTime: totalDuration
            }));
        } else {
            // Go Next
            setQuizState(prev => ({
                ...prev,
                currentQuestion: prev.currentQuestion + 1,
                questionStartTime: Date.now() // Reset timer for next question
            }));
        }
    };

    // ⏪ Prev Question
    const handlePrevQuestion = () => {
        if (quizState.currentQuestion > 0) {
            setQuizState(prev => ({
                ...prev,
                currentQuestion: prev.currentQuestion - 1,
                questionStartTime: Date.now() // Reset timer? Or keep running? Simple: Reset.
            }));
        }
    };

    // 🔄 Reset
    const resetQuiz = () => {
        setQuizState({
            isActive: false, isTerminated: false, completed: false,
            currentQuestion: 0, score: 0, answers: [],
            startTime: null, questionStartTime: null, totalTime: 0,
            violationCount: 0, showReview: false
        });
    };

    // Reset when topic changes
    useEffect(() => {
        if (currentTopic?.type === 'quiz') {
            resetQuiz();
        }
    }, [currentTopic]);

    // 📊 Circle Graph Component (SVG)
    const CircleGraph = ({ percentage }) => {
        const radius = 35;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="64"
                        cy="64"
                    />
                    <circle
                        className={`${percentage >= 70 ? 'text-green-500' : percentage >= 40 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="64"
                        cy="64"
                    />
                </svg>
                <span className="absolute text-xl font-bold text-gray-800 dark:text-white">{Math.round(percentage)}%</span>
            </div>
        );
    };

    return (
        <div className={`h-screen flex flex-col overflow-hidden ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Top Navigation Bar - W3Schools style */}
            <div className={`h-16 flex-shrink-0 flex items-center justify-between px-4 w-full z-40 border-b shadow-sm ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <Link
                            to="/courses"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 flex items-center transition-colors font-medium mb-1 sm:mb-0 sm:mr-6 text-xs sm:text-base order-1 sm:order-2"
                        >
                            <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Back to Courses
                        </Link>

                        <div className="flex items-center order-2 sm:order-1">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 mr-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
                            >
                                {isSidebarOpen ? <FaTimes /> : <FaBars />}
                            </button>

                            {/* Breadcrumbs / Title */}
                            <div className="flex items-center">
                                <FaChevronRight className="w-3 h-3 text-gray-400 mr-2 hidden sm:block" />
                                <span className="font-bold text-base sm:text-lg text-primary-600 dark:text-primary-400 truncate max-w-[150px] sm:max-w-xs">
                                    {courseData.title}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Nav Buttons (Next/Prev) */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => prevTopic && handleTopicClick(prevTopic)}
                        disabled={!prevTopic}
                        className={`hidden sm:flex items-center px-4 py-2 rounded-md font-medium text-sm transition-colors ${!prevTopic
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                    >
                        <FaChevronLeft className="mr-2 w-3 h-3" /> Previous
                    </button>
                    <button
                        onClick={() => nextTopic && handleTopicClick(nextTopic)}
                        disabled={!nextTopic}
                        className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition-colors ${!nextTopic
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                            : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                            }`}
                    >
                        Next <FaChevronRight className="ml-2 w-3 h-3" />
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar */}
                <aside
                    className={`absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-20 w-72 flex-shrink-0 h-full overflow-y-auto border-r bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 pt-0`}
                >
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2 px-2">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Tutorials</h3>
                            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                                {Math.round((completedTopics.size / flattenTopics.length) * 100)}%
                            </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6 mx-2 max-w-[90%]">
                            <div
                                className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(completedTopics.size / flattenTopics.length) * 100}%` }}
                            ></div>
                        </div>

                        <div className="space-y-1">
                            {courseData.modules.map(module => (
                                <div key={module.id} className="mb-2">
                                    <button
                                        onClick={() => handleModuleToggle(module.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-md transition-colors ${activeModule === module.id
                                            ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        <span className="truncate">{module.title}</span>
                                        <FaChevronRight
                                            className={`w-3 h-3 transition-transform duration-200 ${activeModule === module.id ? 'transform rotate-90' : ''}`}
                                        />
                                    </button>

                                    {activeModule === module.id && (
                                        <div className="mt-1 ml-2 space-y-0.5 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                                            {module.topics.map(topic => (
                                                <button
                                                    key={topic.id}
                                                    onClick={() => handleTopicClick(topic)}
                                                    className={`w-full flex items-center px-3 py-2 text-sm text-left rounded-md transition-colors ${currentTopic?.id === topic.id
                                                        ? 'bg-primary-50 text-primary-700 font-medium dark:bg-primary-900/20 dark:text-primary-400'
                                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                                        }`}
                                                >
                                                    {isTopicCompleted(topic.id) && (
                                                        <FaCheckCircle className="text-green-500 w-3 h-3 mr-2 flex-shrink-0" />
                                                    )}
                                                    {!isTopicCompleted(topic.id) && currentTopic?.id === topic.id && (
                                                        <FaCircle className="text-primary-500 w-2 h-2 mr-3 flex-shrink-0" />
                                                    )}
                                                    {!isTopicCompleted(topic.id) && currentTopic?.id !== topic.id && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mr-3.5 flex-shrink-0" />
                                                    )}
                                                    <span className="truncate">{topic.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certificate Section */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <button
                            onClick={handleCertificateClick}
                            className={`w-full flex items-center p-3 rounded-lg transition-all font-bold group
                            ${showCertificate
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 ring-1 ring-yellow-400'
                                    : 'bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-yellow-400 border border-gray-200 dark:border-gray-700 shadow-sm'
                                }`}
                        >
                            <span className="text-xl mr-3 group-hover:scale-110 transition-transform">🏆</span>
                            <span>Certification</span>
                            {completedTopics.size === flattenTopics.length && <FaCheckCircle className="ml-auto text-green-500" />}
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div
                    className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 scroll-smooth"
                    id="main-content"
                >
                    {showCertificate ? (
                        // 🏆 CERTIFICATE DASHBOARD
                        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 text-center">
                            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 border border-gray-100 dark:border-gray-700">
                                <div className="inline-block p-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-6">
                                    <span className="text-6xl">🎓</span>
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Course Certificate</h1>
                                <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
                                    {courseData.title}
                                </p>

                                {/* Progress Card */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 mb-8">
                                    <div className="flex justify-between items-end mb-4">
                                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Course Progress</span>
                                        <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                                            {Math.round((completedTopics.size / flattenTopics.length) * 100)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mb-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-primary-500 to-primary-700 h-4 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${(completedTopics.size / flattenTopics.length) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
                                        {completedTopics.size} of {flattenTopics.length} topics completed
                                    </p>
                                </div>

                                {/* Action Area */}
                                {completedTopics.size === flattenTopics.length ? (
                                    <div className="animate-fade-in-up">
                                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8 text-left">
                                            <h3 className="font-bold text-green-700 dark:text-green-400 text-lg mb-2 flex items-center">
                                                <FaCheckCircle className="mr-2" /> Requirements Met!
                                            </h3>
                                            <p className="text-green-800 dark:text-green-300">
                                                Congratulations! You have mastered all topics in this course. You are now eligible to download your official certificate.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => alert("Generating Certificate PDF... (This is a demo)")}
                                            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center mx-auto"
                                        >
                                            <FaFileAlt className="mr-3" /> Download Certificate
                                        </button>
                                    </div>
                                ) : (
                                    <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-left">
                                        <h3 className="font-bold text-yellow-700 dark:text-yellow-400 text-lg mb-2 flex items-center">
                                            <FaLightbulb className="mr-2" /> Keep Going!
                                        </h3>
                                        <p className="text-yellow-800 dark:text-yellow-300">
                                            You need to complete <strong>100%</strong> of the course topics and quizzes to unlock your certificate.
                                            <br />
                                            Currently: <strong>{flattenTopics.length - completedTopics.size}</strong> topics remaining.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : currentTopic ? (
                        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 text-left">

                            {/* Header Section */}
                            <div className="mb-8 font-sans">
                                <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white" style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}>
                                    {currentTopic.title}
                                </h1>

                                {/* Tab Buttons */}
                                <div className="flex items-center space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
                                    {currentTopic.videoUrl && (
                                        <button
                                            onClick={() => handleTabChange('video')}
                                            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all relative ${activeTab === 'video'
                                                ? 'text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-900 border-x border-t border-gray-200 dark:border-gray-700 -mb-px z-10'
                                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-50 dark:bg-gray-800/50'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <FaPlay className="mr-2 w-3 h-3" />
                                                Video Lesson
                                            </div>
                                            {activeTab === 'video' && (
                                                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-500 rounded-t-lg" />
                                            )}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleTabChange('content')}
                                        className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all relative ${activeTab === 'content'
                                            ? 'text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-900 border-x border-t border-gray-200 dark:border-gray-700 -mb-px z-10'
                                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-50 dark:bg-gray-800/50'
                                            }`}
                                        style={{ fontFamily: 'Verdana, sans-serif' }}
                                    >
                                        <div className="flex items-center">
                                            <MdMenuBook className="mr-2 w-4 h-4" />
                                            Notes & Material
                                        </div>
                                        {activeTab === 'content' && (
                                            <div className="absolute top-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-500 rounded-t-lg" />
                                        )}
                                    </button>
                                </div>

                                <div className="flex items-center space-x-4 mb-6">
                                    <button
                                        onClick={() => prevTopic && handleTopicClick(prevTopic)}
                                        disabled={!prevTopic}
                                        className={`px-4 py-2 rounded border font-medium text-sm transition-colors ${!prevTopic ? 'opacity-50 cursor-not-allowed border-gray-200' : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        &larr; Previous
                                    </button>
                                    <button
                                        onClick={() => nextTopic && handleTopicClick(nextTopic)}
                                        disabled={!nextTopic}
                                        className={`px-4 py-2 rounded border font-medium text-sm transition-colors ${!nextTopic ? 'opacity-50 cursor-not-allowed border-gray-200' : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        Next &rarr;
                                    </button>
                                </div>
                                <hr className="border-gray-200 dark:border-gray-700" />
                            </div>

                            {/* Content Renderer based on Active Tab */}
                            <div className="min-h-[400px]">
                                {activeTab === 'video' && currentTopic.type === 'video' && currentTopic.videoUrl ? (
                                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-8 relative group">
                                        {currentTopic.videoUrl.includes('youtube.com') || currentTopic.videoUrl.includes('youtu.be') ? (
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={(() => {
                                                    try {
                                                        const url = new URL(currentTopic.videoUrl);
                                                        let videoId = '';
                                                        let start = null;

                                                        // Extract Video ID
                                                        if (url.hostname.includes('youtu.be')) {
                                                            videoId = url.pathname.slice(1);
                                                        } else if (url.hostname.includes('youtube.com')) {
                                                            videoId = url.searchParams.get('v');
                                                        }

                                                        // Extract Timestamp (supports t=120s, t=2m, or standard seconds)
                                                        const timeParam = url.searchParams.get('t');
                                                        if (timeParam) {
                                                            // Parse "120s" or "2m30s" to seconds if necessary, usually Google handles raw seconds or "120"
                                                            // Simple int parsing often suffices for "120"
                                                            start = parseInt(timeParam);
                                                        }

                                                        // fallback build
                                                        let embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
                                                        if (start) embedUrl += `&start=${start}`;
                                                        return embedUrl;
                                                    } catch (e) {
                                                        return currentTopic.videoUrl;
                                                    }
                                                })()}
                                                title={currentTopic.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="absolute inset-0 w-full h-full"
                                            ></iframe>
                                        ) : (
                                            // Fallback for local/other videos (using standard video tag)
                                            <video
                                                controls
                                                className="w-full h-full object-contain"
                                                src={currentTopic.videoUrl}
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </div>
                                ) : currentTopic.type === 'quiz' ? (
                                    <div
                                        className="max-w-4xl mx-auto rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden select-none"
                                        style={{ userSelect: 'none', WebkitUserSelect: 'none' }} // Prevent Copying
                                    >
                                        {!quizState.isActive && !quizState.completed && !quizState.isTerminated ? (
                                            // 🏁 1. Start Screen
                                            <div className="p-10 bg-white dark:bg-gray-800 text-center">
                                                <div className="mb-6 inline-flex p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-5xl animate-bounce">
                                                    📝
                                                </div>
                                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{currentTopic.title}</h2>
                                                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
                                                    Test your knowledge! This quiz contains <strong>{currentTopic.questions.length} questions</strong>.
                                                </p>

                                                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-5 sm:p-6 max-w-2xl mx-auto text-left mb-8">
                                                    <h3 className="text-red-700 dark:text-red-400 font-bold text-lg mb-4 flex items-center">
                                                        <FaTimes className="mr-2" /> Strict Exam Rules:
                                                    </h3>
                                                    <ul className="space-y-4 text-sm text-red-800 dark:text-red-300">
                                                        <li className="flex items-start gap-2">
                                                            <span className="mt-1 flex-shrink-0">•</span>
                                                            <div>
                                                                <strong className="block sm:inline mr-1">Fullscreen Mode Only:</strong>
                                                                <span>The quiz will automatically enter fullscreen. Do not exit.</span>
                                                            </div>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="mt-1 flex-shrink-0">•</span>
                                                            <div>
                                                                <strong className="block sm:inline mr-1">No Tab Switching:</strong>
                                                                <span>Leaving the page or switching tabs is monitored.</span>
                                                            </div>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="mt-1 flex-shrink-0">•</span>
                                                            <div>
                                                                <strong className="block sm:inline mr-1">No Cheating:</strong>
                                                                <span>Copy-paste and right-click are disabled.</span>
                                                            </div>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="mt-1 flex-shrink-0">•</span>
                                                            <div>
                                                                <strong className="block sm:inline mr-1">Termination:</strong>
                                                                <span>3 violations will immediately terminate the quiz with a 0 score.</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <button
                                                    onClick={startQuiz}
                                                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                                                >
                                                    Start Quiz Now
                                                </button>
                                            </div>
                                        ) : quizState.isTerminated ? (
                                            // 🚫 2. Terminated Screen
                                            <div className="p-12 bg-red-50 dark:bg-red-900/20 text-center">
                                                <div className="text-6xl mb-4">🚫</div>
                                                <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">Quiz Terminated</h2>
                                                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                                                    We detected multiple violations of the exam rules (tab switching or exiting fullscreen).
                                                    <br />Your session has been cancelled.
                                                </p>
                                                <button
                                                    onClick={resetQuiz}
                                                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                                                >
                                                    Return to Menu
                                                </button>
                                            </div>
                                        ) : quizState.completed ? (
                                            // 🏆 3. Results Screen
                                            <div className="p-10 bg-white dark:bg-gray-800">
                                                {!quizState.showReview ? (
                                                    <div className="text-center">
                                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Quiz Results</h2>

                                                        <div className="flex justify-center items-center gap-12 mb-10 flex-col sm:flex-row">
                                                            {/* Score Graph */}
                                                            <div className="flex flex-col items-center">
                                                                <CircleGraph percentage={(quizState.score / currentTopic.questions.length) * 100} />
                                                                <span className="mt-2 text-sm text-gray-500 font-medium">Final Score</span>
                                                            </div>

                                                            {/* Stats */}
                                                            <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                                                                <div>
                                                                    <p className="text-xs text-gray-500 uppercase font-bold">Total Time</p>
                                                                    <p className="text-xl font-bold text-gray-800 dark:text-white">{Math.floor(quizState.totalTime / 60)}m {Math.floor(quizState.totalTime % 60)}s</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 uppercase font-bold">Accuracy</p>
                                                                    <p className="text-xl font-bold text-gray-800 dark:text-white">{Math.round((quizState.score / currentTopic.questions.length) * 100)}%</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 uppercase font-bold">Correct</p>
                                                                    <p className="text-xl font-bold text-green-500">{quizState.score}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 uppercase font-bold">Wrong</p>
                                                                    <p className="text-xl font-bold text-red-500">{currentTopic.questions.length - quizState.score}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-center gap-4">
                                                            <button
                                                                onClick={() => setQuizState(prev => ({ ...prev, showReview: true }))}
                                                                className="px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 font-bold rounded-lg transition-colors flex items-center"
                                                            >
                                                                <FaList className="mr-2" /> View Detailed Answers
                                                            </button>
                                                            <button
                                                                onClick={resetQuiz}
                                                                className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-lg transition-colors flex items-center"
                                                            >
                                                                Restart Quiz
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // 📝 4. Review Mode (View Answers)
                                                    <div className="review-mode">
                                                        <div className="flex items-center justify-between mb-6">
                                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Detailed Review</h3>
                                                            <button
                                                                onClick={() => setQuizState(prev => ({ ...prev, showReview: false }))}
                                                                className="text-sm text-blue-600 hover:underline"
                                                            >
                                                                &larr; Back to Summary
                                                            </button>
                                                        </div>
                                                        <div className="space-y-6">
                                                            {currentTopic.questions.map((q, idx) => {
                                                                const userAnswer = quizState.answers.find(a => a.questionIndex === idx);
                                                                const isCorrect = userAnswer?.isCorrect;
                                                                const userSelected = userAnswer?.selectedOption;

                                                                return (
                                                                    <div key={idx} className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'bg-green-50 border-green-500 dark:bg-green-900/10' : 'bg-red-50 border-red-500 dark:bg-red-900/10'}`}>
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <h4 className="font-bold text-gray-800 dark:text-gray-200">
                                                                                {idx + 1}. {q.question}
                                                                            </h4>
                                                                            <span className="text-xs font-mono text-gray-500 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                                                                                ⏱️ {userAnswer?.timeTaken.toFixed(1)}s
                                                                            </span>
                                                                        </div>
                                                                        <div className="space-y-1 ml-4 mt-2">
                                                                            {q.options.map((opt, optIdx) => (
                                                                                <div key={optIdx} className={`flex items-center text-sm p-2 rounded ${optIdx === q.correct ? 'bg-green-200 dark:bg-green-800/50 text-green-900 dark:text-green-100 font-bold' :
                                                                                    optIdx === userSelected && !isCorrect ? 'bg-red-200 dark:bg-red-800/50 text-red-900 dark:text-red-100' :
                                                                                        'text-gray-600 dark:text-gray-400'
                                                                                    }`}>
                                                                                    {optIdx === q.correct ? <FaCheckCircle className="mr-2 text-green-600" /> :
                                                                                        optIdx === userSelected ? <FaTimes className="mr-2 text-red-600" /> :
                                                                                            <FaCircle className="mr-2 text-gray-300 text-xs" />}
                                                                                    {opt}
                                                                                    {optIdx === userSelected && <span className="ml-auto text-xs opacity-75">(Your Answer)</span>}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            // ⏳ 5. Active Quiz
                                            <div className="p-8 bg-white dark:bg-gray-800 min-h-[500px] flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-center mb-6">
                                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                                            Question {quizState.currentQuestion + 1} / {currentTopic.questions.length}
                                                        </span>
                                                        <div className="flex items-center gap-4">
                                                            <div className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold flex items-center">
                                                                {quizState.violationCount > 0 && `⚠️ ${quizState.violationCount} Violations`}
                                                            </div>
                                                            <div className="w-12 h-12 rounded-full border-4 border-blue-100 flex items-center justify-center font-mono text-sm font-bold text-blue-600">
                                                                {/* Timer Visual (Optional, just text for now) */}
                                                                Run
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 leading-snug">
                                                        {currentTopic.questions[quizState.currentQuestion].question}
                                                    </h3>

                                                    <div className="grid gap-4 mb-8">
                                                        {currentTopic.questions[quizState.currentQuestion].options.map((option, index) => {
                                                            const currentAnswer = quizState.answers.find(a => a.questionIndex === quizState.currentQuestion);
                                                            const isSelected = currentAnswer?.selectedOption === index;

                                                            return (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => handleQuizOptionClick(index, currentTopic.questions[quizState.currentQuestion].correct)}
                                                                    className={`w-full text-left p-5 rounded-xl border-2 transition-all group duration-200
                                                                    ${isSelected
                                                                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 shadow-md ring-1 ring-blue-500'
                                                                            : 'border-gray-100 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center">
                                                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold transition-colors
                                                                        ${isSelected
                                                                                ? 'bg-blue-600 text-white'
                                                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 group-hover:bg-blue-500 group-hover:text-white'
                                                                            }`}>
                                                                            {String.fromCharCode(65 + index)}
                                                                        </span>
                                                                        <span className={`text-lg font-medium ${isSelected ? 'text-blue-800 dark:text-blue-100' : 'text-gray-700 dark:text-gray-200'}`}>
                                                                            {option}
                                                                        </span>
                                                                        {isSelected && <FaCheckCircle className="ml-auto text-blue-600 w-5 h-5" />}
                                                                    </div>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Navigation Buttons */}
                                                    <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-700">
                                                        <button
                                                            onClick={handlePrevQuestion}
                                                            disabled={quizState.currentQuestion === 0}
                                                            className={`flex items-center px-6 py-3 rounded-lg font-bold text-sm transition-all
                                                            ${quizState.currentQuestion === 0
                                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                                                                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700'
                                                                }`}
                                                        >
                                                            <FaChevronLeft className="mr-2" /> Previous
                                                        </button>

                                                        <button
                                                            onClick={handleNextQuestion}
                                                            className="flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all transform active:scale-95"
                                                        >
                                                            {quizState.currentQuestion === currentTopic.questions.length - 1 ? 'Finish Quiz' : 'Next'}
                                                            {quizState.currentQuestion !== currentTopic.questions.length - 1 && <FaChevronRight className="ml-2" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-8 text-center text-xs text-gray-400">
                                                    Do not maximize/minimize or switch tabs.
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full text-left" style={{ fontFamily: 'Verdana, sans-serif' }}>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                                            {currentTopic.content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Navigation & Completion */}
                            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <button
                                        onClick={() => markAsCompleted(currentTopic.id)}
                                        disabled={isTopicCompleted(currentTopic.id)}
                                        className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold flex items-center justify-center transition-all ${isTopicCompleted(currentTopic.id)
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 opacity-75 cursor-default'
                                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <FaCheckCircle className={`mr-2 ${isTopicCompleted(currentTopic.id) ? 'text-green-500' : 'text-gray-400'}`} />
                                        {isTopicCompleted(currentTopic.id) ? 'Completed' : 'Mark as Completed'}
                                    </button>

                                    {nextTopic && (
                                        <button
                                            onClick={() => handleTopicClick(nextTopic)}
                                            className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
                                        >
                                            Next Lesson <FaChevronRight className="ml-2" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <FaList className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg">Select a topic from the menu to start learning</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseViewer;
