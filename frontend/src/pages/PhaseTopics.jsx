import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopics } from '../api/courseApi';

const PhaseTopics = () => {
    const { courseId, phaseId } = useParams();
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getTopics(phaseId);
                setTopics(data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching topics:', error);
                setLoading(false);
            }
        };

        fetchTopics();
    }, [courseId, phaseId]);

    // Calculate progress (mock for now)
    const completedTopics = 0;
    const totalTopics = topics.length;
    const progressPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading topics...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(`/courses/${courseId}`)}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors group"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back to Course</span>
                    </button>

                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <span className="text-4xl">📚</span>
                        Phase Topics
                    </h1>

                    {/* Progress Card */}
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-sm opacity-90 mb-1">Your Progress</div>
                                <div className="text-3xl font-bold">{completedTopics} / {totalTopics}</div>
                                <div className="text-sm opacity-75 mt-1">Topics Completed</div>
                            </div>
                            <div className="text-5xl">
                                {progressPercentage === 100 ? '🎉' : progressPercentage > 50 ? '🚀' : '📖'}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-500 shadow-lg"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Topics List */}
                {topics.length > 0 ? (
                    <div className="space-y-4">
                        {topics.map((topic, index) => (
                            <div
                                key={topic.id}
                                onClick={() => navigate(`/courses/${courseId}/phases/${phaseId}/topics/${topic.id}`)}
                                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
                            >
                                {/* Gradient Border on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[2px] rounded-xl">
                                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl"></div>
                                </div>

                                {/* Card Content */}
                                <div className="relative flex items-center gap-4 p-5">
                                    {/* Topic Number Badge */}
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all">
                                            <span className="text-xl font-bold text-white">{index + 1}</span>
                                        </div>
                                    </div>

                                    {/* Topic Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                                            {topic.title}
                                        </h3>
                                        {topic.description && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {topic.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Status Icon & Arrow */}
                                    <div className="flex-shrink-0 flex items-center gap-3">
                                        {/* Completion Status (Mock) */}
                                        <div className="text-gray-400 dark:text-gray-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>

                                        {/* Arrow */}
                                        <div className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No topics yet</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Topics for this phase are being prepared. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhaseTopics;
