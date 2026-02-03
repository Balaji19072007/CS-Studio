import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, getPhases, getTopics } from '../api/courseApi';
import { getQuizzes } from '../api/quizApi';
import { useAuth } from '../contexts/AuthContext';
import { getUserCourseProgress, getPhaseProgress, getUserTopicProgress, getAllUserProgressForCourse } from '../api/progressApi';
import TopicContent from './TopicContent';
import QuizPage from './QuizPage';
import { LearningSkeleton } from '../components/common/SkeletonLoader';

const CourseLearning = () => {
    const { courseId, topicId, quizId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [phases, setPhases] = useState([]);
    const [expandedPhaseId, setExpandedPhaseId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userProgress, setUserProgress] = useState({});

    // Fetch Course & Phases with Topics and Quizzes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch from Supabase (all courses are there now)
                const courseData = await getCourse(courseId);
                setCourse(courseData);

                // Fetch all phases
                const phasesData = await getPhases(courseId);
                console.log('📦 Phases:', phasesData);

                // For each phase, fetch topics AND quizzes, then merge by order_index
                const phasesWithItems = await Promise.all(
                    phasesData.map(async (phase) => {
                        try {
                            const [topics, quizzes] = await Promise.all([
                                getTopics(phase.id),
                                getQuizzes(phase.id)
                            ]);

                            console.log(`Phase ${phase.id} - Topics:`, topics);
                            console.log(`Phase ${phase.id} - Quizzes:`, quizzes);

                            // Merge topics and quizzes, sort by order_index
                            const items = [
                                ...topics.map(t => ({ ...t, type: 'topic' })),
                                ...quizzes.map(q => ({ ...q, type: 'quiz' }))
                            ].sort((a, b) => a.order_index - b.order_index);

                            return {
                                ...phase,
                                items // Combined topics + quizzes
                            };
                        } catch (err) {
                            console.error(`Error fetching items for phase ${phase.id}:`, err);
                            return { ...phase, items: [] };
                        }
                    })
                );

                console.log('✅ Final Phases with Items:', phasesWithItems);
                setPhases(phasesWithItems);

                // Auto-expand first phase
                if (phasesWithItems.length > 0) {
                    setExpandedPhaseId(phasesWithItems[0].id);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching course data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    // Fetch user progress (Optimized: Single Batch Request)
    useEffect(() => {
        const loadProgress = async () => {
            if (!user) return;

            try {
                const userId = user.id;

                // 1. Fetch ALL progress for this course in one query
                // This replaces the 135+ individual API calls
                const allProgress = await getAllUserProgressForCourse(userId, courseId);

                // 2. Convert to lookup map for fast access: { topicId: progressObject }
                const progressMap = {};
                if (allProgress) {
                    allProgress.forEach(p => {
                        progressMap[p.topic_id] = p;
                    });
                }

                // 3. Calculate Phase Progress Locally
                // We have the full phases structure and the full progress map, so we don't need API calls for this
                phases.forEach(phase => {
                    const topics = phase.items.filter(i => i.type === 'topic');
                    const totalTopics = topics.length;

                    if (totalTopics > 0) {
                        const completedTopics = topics.filter(t => progressMap[t.id]?.completed).length;
                        const percentage = Math.round((completedTopics / totalTopics) * 100);

                        progressMap[phase.id] = {
                            total: totalTopics,
                            completed: completedTopics,
                            percentage: percentage
                        };
                    } else {
                        progressMap[phase.id] = { total: 0, completed: 0, percentage: 0 };
                    }
                });

                setUserProgress(progressMap);
                console.log('📊 Batch Progress Loaded:', Object.keys(progressMap).length, 'entries');

            } catch (error) {
                console.error('Error loading progress:', error);
            }
        };

        if (phases.length > 0) {
            loadProgress();
        }
    }, [phases, courseId]);

    const togglePhase = (phaseId) => {
        setExpandedPhaseId(expandedPhaseId === phaseId ? null : phaseId);
    };

    const selectItem = (item, phaseId) => {
        if (item.type === 'topic') {
            navigate(`/courses/${courseId}/learn/topic/${item.id}`);
        } else if (item.type === 'quiz') {
            navigate(`/courses/${courseId}/learn/quiz/${item.id}`);
        }

        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    const allItems = phases.flatMap(p => p.items);
    const currentIndex = allItems.findIndex(item => item.id === (topicId || quizId));
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === allItems.length - 1;

    const goToNext = () => {
        if (!isLast) {
            const nextItem = allItems[currentIndex + 1];
            selectItem(nextItem);
        }
    };

    const goToPrevious = () => {
        if (!isFirst) {
            const prevItem = allItems[currentIndex - 1];
            selectItem(prevItem);
        }
    };

    if (loading) {
        return <LearningSkeleton />;
    }

    return (
        <div className="h-screen flex flex-col bg-[#0F172A] overflow-hidden">
            {/* Header */}
            <header className="bg-[#1E293B] border-b border-gray-700/50 px-4 py-3 flex items-center justify-between shadow-lg relative z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/courses/${courseId}`)}
                        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-all border border-gray-700"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                    </button>
                    <h1 className="text-lg sm:text-xl font-bold text-white truncate max-w-[200px] sm:max-w-none">
                        {course?.title || 'Course Learning'}
                    </h1>
                </div>

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden text-gray-400 hover:text-white p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-80 h-full bg-[#0F172A] border-r border-gray-800 flex flex-col transition-transform duration-300`}>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
                        {phases.map((phase, i) => (
                            <div key={phase.id} className="rounded-xl overflow-hidden bg-[#1E293B] border border-gray-700/50">
                                <button
                                    onClick={() => togglePhase(phase.id)}
                                    className="w-full px-4 py-3 flex items-center justify-between bg-[#1E293B] hover:bg-[#2D3748] transition-colors"
                                >
                                    <span className="text-white font-medium text-sm">Phase {i + 1}: {phase.title}</span>
                                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedPhaseId === phase.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                {expandedPhaseId === phase.id && (
                                    <div className="bg-[#0F172A]/50 border-t border-gray-700/50 py-1">
                                        {phase.items.map((item) => {
                                            const isCompleted = userProgress[item.id]?.completed;
                                            const isQuiz = item.type === 'quiz';
                                            const isActive = item.id === (topicId || quizId);

                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => selectItem(item, phase.id)}
                                                    className={`w-full px-4 py-2.5 flex items-center gap-3 transition-all duration-300 border-l-[3px] group relative overflow-hidden ${isActive
                                                        ? 'bg-blue-600/10 border-blue-500 text-blue-400 translate-x-1 shadow-[inset_4px_0_0_0_rgba(59,130,246,0.5)]'
                                                        : 'border-transparent text-gray-400 hover:bg-[#2D3748] hover:border-gray-600 hover:text-gray-200'
                                                        }`}
                                                >
                                                    {isActive && (
                                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-50" />
                                                    )}

                                                    <div className="flex-shrink-0 relative z-10">
                                                        {isCompleted ? (
                                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white shadow-sm transition-transform ${isActive ? 'scale-110' : ''} ${isActive ? 'bg-blue-500 shadow-blue-500/50' : 'bg-green-500 shadow-green-500/40'}`}>
                                                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                            </div>
                                                        ) : isQuiz ? (
                                                            <span className={`text-lg transition-transform ${isActive ? 'scale-110' : ''}`}>📝</span>
                                                        ) : (
                                                            <div className={`w-2 h-2 rounded-full transition-all ${isActive ? 'bg-blue-400 w-2.5 h-2.5 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-gray-600 group-hover:bg-gray-400'}`}></div>
                                                        )}
                                                    </div>
                                                    <span className={`text-sm text-left truncate relative z-10 transition-colors ${isActive ? 'font-semibold' : ''}`}>{item.title}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Certificate Phase (Frontend Only) */}
                        <div className="rounded-xl overflow-hidden bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border border-amber-500/30">
                            <button
                                className="w-full px-4 py-3 flex items-center justify-between bg-transparent hover:bg-amber-900/10 transition-colors"
                            >
                                <span className="text-amber-400 font-bold text-sm flex items-center gap-2">
                                    <span>🎓</span> Certificate
                                </span>
                            </button>
                            <div className="px-4 py-3 space-y-3">
                                <div className="text-xs text-gray-400">Complete all phases to unlock:</div>
                                <button className="w-full py-2 bg-gray-800 text-gray-500 text-xs font-bold rounded cursor-not-allowed border border-gray-700">
                                    🔒 Download Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay */}
                {isSidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-20" onClick={() => setIsSidebarOpen(false)}></div>}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#0F172A] p-0 relative">
                    {topicId ? (
                        <TopicContent
                            embedded={true}
                            topicId={topicId}
                            onNext={goToNext}
                            onPrevious={goToPrevious}
                            isFirst={isFirst}
                            isLast={isLast}
                        />
                    ) : quizId ? (
                        <QuizPage
                            embedded={true}
                            quizId={quizId}
                            onNext={goToNext}
                            onPrevious={goToPrevious}
                            isFirst={isFirst}
                            isLast={isLast}
                        />
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center animate-bounce">
                                <span className="text-5xl">🎓</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white">Welcome to {course?.title}!</h2>
                            <p className="text-gray-400 max-w-md">Select a topic or quiz from the sidebar to begin your learning journey.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CourseLearning;
