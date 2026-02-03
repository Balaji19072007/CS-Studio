import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopic, getTopicContent, getPracticeProblems, getCourseChallenge } from '../api/courseApi';
import { markTopicComplete, updateCourseProgress } from '../api/progressApi';
import { useAuth } from '../hooks/useAuth';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as feather from 'feather-icons';
import confetti from 'canvas-confetti';
import { TopicSkeleton } from '../components/common/SkeletonLoader';

const TopicContent = ({ embedded = false, topicId = null, onNext, onPrevious, isFirst, isLast }) => {
    // Rename topicId from params to avoid conflict with prop
    const { courseId, topicId: paramTopicId } = useParams();
    const { user } = useAuth();
    const resolvedTopicId = topicId || paramTopicId;
    const navigate = useNavigate();
    const [topic, setTopic] = useState(null);
    const [contentBlocks, setContentBlocks] = useState([]);
    const [practiceProblems, setPracticeProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [completing, setCompleting] = useState(false);

    const [courseChallenge, setCourseChallenge] = useState(null);

    useEffect(() => {
        if (!resolvedTopicId) return;

        const fetchTopicData = async () => {
            try {
                const [topicData, content, problems, challenge] = await Promise.all([
                    getTopic(resolvedTopicId),
                    getTopicContent(resolvedTopicId),
                    getPracticeProblems(resolvedTopicId),
                    getCourseChallenge(resolvedTopicId)
                ]);

                setTopic(topicData);
                setContentBlocks(content);
                setPracticeProblems(problems);
                setCourseChallenge(challenge);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching topic content:', error);
                setLoading(false);
            }
        };

        fetchTopicData();
    }, [resolvedTopicId]);

    const handleMarkComplete = async () => {
        if (!user) return alert('Please sign in to track progress');

        try {
            setCompleting(true);
            await markTopicComplete(user.id, resolvedTopicId);
            await updateCourseProgress(user.id, courseId);
            alert('Topic marked as complete!');
        } catch (error) {
            console.error('Error marking topic complete:', error);
            alert('Failed to update progress');
        } finally {
            setCompleting(false);
        }
    };

    const renderContentBlock = (block) => {
        switch (block.content_type) {
            case 'definition':
                return (
                    <div key={block.id} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>
                        <div className="relative bg-[#1E293B]/80 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-blue-500/30 shadow-2xl">
                            <h3 className="text-blue-400 font-bold mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
                                <span className="w-6 h-px bg-blue-500"></span>
                                Definition
                            </h3>
                            <p className="text-gray-200 text-lg sm:text-xl leading-relaxed font-light">{block.content_text}</p>
                        </div>
                    </div>
                );

            case 'explanation':
                return (
                    <div key={block.id} className="text-gray-300 text-lg leading-relaxed">
                        <p>{block.content_text}</p>
                    </div>
                );

            case 'syntax':
                return (
                    <div key={block.id} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>
                        <div className="relative bg-[#0F172A] rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
                            <div className="bg-[#1E293B] px-6 py-3 border-b border-gray-700 flex items-center justify-between">
                                <h3 className="text-purple-400 font-bold text-sm uppercase tracking-wider">Syntax</h3>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                                </div>
                            </div>
                            <div className="p-1">
                                <SyntaxHighlighter
                                    language="c"
                                    style={vscDarkPlus}
                                    customStyle={{ margin: 0, borderRadius: '0.5rem', background: 'transparent' }}
                                    showLineNumbers={true}
                                >
                                    {/* Show only code, remove descriptive text if present */}
                                    {block.content_text.includes('```')
                                        ? block.content_text.match(/```c?([\s\S]*?)```/)?.[1] || block.content_text
                                        : block.content_text
                                    }
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                );

            case 'example':
                return (
                    <div key={block.id} className="space-y-4">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="p-2 bg-blue-500/20 rounded-lg text-blue-400">💻</span>
                            Example
                        </h3>
                        <div className="relative bg-[#0F172A] rounded-xl overflow-hidden shadow-2xl border border-gray-800 group hover:border-blue-500/30 transition-colors">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="text-xs font-mono text-gray-500">main.c</span>
                            </div>
                            <SyntaxHighlighter
                                language="c"
                                style={vscDarkPlus}
                                customStyle={{ margin: 0, padding: '1.5rem', paddingBottom: '3rem', borderRadius: '0.5rem', background: 'transparent' }}
                                showLineNumbers={true}
                            >
                                {/* Show only code */}
                                {block.content_text.includes('```')
                                    ? block.content_text.match(/```c?([\s\S]*?)```/)?.[1] || block.content_text
                                    : block.content_text
                                }
                            </SyntaxHighlighter>
                            <button
                                onClick={() => document.getElementById('try-it-editor')?.scrollIntoView({ behavior: 'smooth' })}
                                className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg transition-all flex items-center gap-2"
                            >
                                <span>⚡</span> Try Yourself
                            </button>
                        </div>
                    </div>
                );

            case 'note':
                return (
                    <div key={block.id} className="bg-emerald-900/10 border-l-4 border-emerald-500 p-6 rounded-r-xl backdrop-blur-sm">
                        <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2 text-lg">
                            <span className="text-2xl">💡</span> Key Point
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed">{block.content_text}</p>
                    </div>
                );

            case 'tip':
                return (
                    <div key={block.id} className="relative overflow-hidden bg-amber-900/10 border border-amber-500/30 p-6 rounded-xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="text-6xl">⚠️</span>
                        </div>
                        <h3 className="relative text-amber-400 font-bold mb-2 flex items-center gap-2 text-lg">
                            <span>⚠️</span> Common Mistake
                        </h3>
                        <p className="relative text-gray-300 text-lg leading-relaxed">{block.content_text}</p>
                    </div>
                );

            default:
                return (
                    <div key={block.id} className="text-gray-300">
                        <p>{block.content_text}</p>
                    </div>
                );
        }
    };

    if (loading) {
        return <TopicSkeleton />;
    }

    return (
        <div className={embedded ? 'h-full overflow-y-auto' : 'min-h-screen bg-[#0F172A]'}>
            {/* Header - Only show if not embedded */}
            {!embedded && (
                <header className="bg-[#1E293B] border-b border-gray-700/50 px-4 py-3 flex items-center justify-between shadow-lg sticky top-0 z-10">
                    <button
                        onClick={() => navigate(`/courses/${courseId}/learn`)}
                        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-all border border-gray-700"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" /></svg>
                    </button>
                    <h1 className="text-lg font-bold text-white">{topic?.title}</h1>
                    <div className="w-10"></div>
                </header>
            )}

            {/* Content */}
            <main className={`max-w-5xl mx-auto py-10 space-y-12 ${embedded ? 'px-8 sm:px-12' : 'px-4 sm:px-6 lg:px-8'} text-left`}>
                {/* 1. Title Section */}
                <div className="text-left space-y-4 pb-8 border-b border-gray-800">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight leading-tight">
                        {topic?.title}
                    </h1>
                    {/* 2. Subtitle */}
                    {topic?.description && (
                        <p className="text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
                            {topic.description}
                        </p>
                    )}
                    <div className="w-24 h-1.5 bg-blue-600 rounded-full mt-6"></div>
                </div>

                {/* 3. Definition */}
                {contentBlocks.filter(b => b.content_type === 'definition').map(renderContentBlock)}

                {/* 4. Explanation */}
                {contentBlocks.filter(b => b.content_type === 'explanation').map(renderContentBlock)}

                {/* 5. Syntax */}
                {contentBlocks.filter(b => b.content_type === 'syntax').map(renderContentBlock)}

                {/* 6. Example */}
                {contentBlocks.filter(b => b.content_type === 'example').map(renderContentBlock)}

                {/* 7. Try It Yourself (New) */}
                {contentBlocks.some(b => b.content_type === 'example') && (
                    <div id="try-it-editor" className="hidden target:block space-y-4 animate-fade-in">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400">⚡</span>
                            Try It Yourself
                        </h3>
                        <div className="bg-[#1E293B] rounded-xl border border-gray-700 p-6 shadow-xl">
                            <p className="text-gray-400 mb-4">Edit the code below to experiment:</p>
                            <textarea
                                className="w-full h-48 bg-[#0F172A] text-gray-300 font-mono p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                defaultValue={contentBlocks.find(b => b.content_type === 'example')?.content_text.replace(/```c?|```/g, '') || '// Write your code here'}
                            />
                            <div className="mt-4 flex justify-end">
                                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium">
                                    Run Code ›
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 8. Key Points */}
                {contentBlocks.some(b => b.content_type === 'note') && (
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white mb-4">Key Points</h3>
                        {contentBlocks.filter(b => b.content_type === 'note').map(renderContentBlock)}
                    </div>
                )}

                {/* 9. Challenge Time */}
                {courseChallenge ? (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                                <span className="text-9xl">🚀</span>
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                                <span className="text-indigo-400">🚀</span> Challenge Time
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <p className="text-indigo-100 text-lg font-medium leading-relaxed bg-indigo-900/20 p-6 rounded-xl border border-indigo-500/10">
                                    {courseChallenge.description}
                                </p>

                                {courseChallenge.solved ? (
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <div className="px-6 py-3 bg-green-600/20 border border-green-500 text-green-400 font-bold rounded-xl flex items-center gap-2">
                                            <span>✅</span> Solved
                                        </div>
                                        <button
                                            onClick={() => navigate(`/course-challenge/${courseChallenge.id}`)}
                                            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
                                        >
                                            <span>↺</span> Try Again
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-start">
                                        <button
                                            onClick={() => navigate(`/course-challenge/${courseChallenge.id}`)}
                                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-1"
                                        >
                                            <span>⚡</span> Solve Challenge
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : practiceProblems.length > 0 && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                                <span className="text-9xl">🚀</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                                <span className="text-indigo-400">🚀</span> Challenge Time
                            </h3>
                            {practiceProblems.map((problem) => (
                                <div key={problem.id} className="space-y-6 relative z-10">
                                    <p className="text-indigo-100 text-lg font-medium leading-relaxed bg-indigo-900/20 p-6 rounded-xl border border-indigo-500/10">
                                        {problem.problem_description}
                                    </p>
                                    <div className="flex justify-start">
                                        <button
                                            onClick={() => navigate(`/challenge/${problem.id}`)}
                                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-1"
                                        >
                                            <span>⚡</span> Solve Challenge
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 10. Common Mistakes */}
                {contentBlocks.some(b => b.content_type === 'tip') && (
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white mb-4">Common Mistakes</h3>
                        {contentBlocks.filter(b => b.content_type === 'tip').map(block => (
                            <div key={block.id} className="relative overflow-hidden bg-rose-900/10 border border-rose-500/30 p-6 rounded-xl">
                                <ul className="space-y-3">
                                    {block.content_text.split('\n').filter(line => line.trim()).map((line, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 text-lg">
                                            <span className="text-rose-500 mt-1.5">•</span>
                                            <span>{line.replace(/^[•-]\s*/, '')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-800 mt-12">
                    <button
                        onClick={onPrevious}
                        disabled={isFirst}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isFirst
                            ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700'
                            }`}
                    >
                        <span>←</span> Previous
                    </button>

                    <button
                        onClick={() => {
                            handleMarkComplete();
                            if (onNext) onNext();
                        }}
                        disabled={isLast}
                        className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isLast
                            ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                            }`}
                    >
                        Next <span>→</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default TopicContent;
