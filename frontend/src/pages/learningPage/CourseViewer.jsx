import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
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

    // Initialize with first topic of first module if available
    useEffect(() => {
        if (courseData && courseData.modules.length > 0) {
            if (!activeModule) setActiveModule(courseData.modules[0].id);

            if (!currentTopic) {
                const firstModule = courseData.modules[0];
                if (firstModule.topics.length > 0) {
                    setCurrentTopic(firstModule.topics[0]);
                }
            }
        }
    }, [courseData, activeModule, currentTopic]);

    // Update active tab when topic changes
    useEffect(() => {
        if (currentTopic) {
            // Default to video if available, else content
            setActiveTab(currentTopic.videoUrl ? 'video' : 'content');
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                                to={`/code?source=${encodeURIComponent(codeString)}&lang=${match[1]}`}
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

    return (
        <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Top Navigation Bar - W3Schools style */}
            <div className={`h-16 flex items-center justify-between px-4 fixed top-16 w-full z-40 border-b shadow-sm ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 mr-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
                    >
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    <Link
                        to="/courses"
                        className="mr-6 text-gray-600 dark:text-gray-300 hover:text-primary-600 flex items-center transition-colors font-medium"
                    >
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Link>

                    {/* Breadcrumbs / Title */}
                    <div className="flex items-center">
                        <FaChevronRight className="w-3 h-3 text-gray-400 mx-2" />
                        <span className="font-bold text-lg text-primary-600 dark:text-primary-400 truncate max-w-[150px] sm:max-w-xs">
                            {courseData.title}
                        </span>
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

            <div className="flex flex-1 pt-16 h-screen overflow-hidden">
                {/* Sidebar - W3Schools Style */}
                <div
                    className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-20 w-72 flex-shrink-0 overflow-y-auto border-r pt-32 lg:pt-0 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                        }`}
                >
                    <div className="p-4">
                        <h3 className="font-bold text-lg mb-4 px-2">Tutorials</h3>
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
                                        <span>{module.title}</span>
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
                                                    <span className="truncate">{topic.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div
                    className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 scroll-smooth"
                    id="main-content"
                >
                    {currentTopic ? (
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
                                        {/* Video Placeholder or Player */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 border border-gray-800">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                                                    <FaPlay className="w-6 h-6 text-white ml-1" />
                                                </div>
                                                <p className="text-gray-400 font-medium">Video Content: {currentTopic.title}</p>
                                            </div>
                                        </div>
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
