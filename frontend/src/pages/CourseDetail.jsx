import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, getPhases } from '../api/courseApi';

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [phasesCount, setPhasesCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                // Fetch from Supabase (all courses are there now)
                const courseData = await getCourse(courseId);
                if (courseData) {
                    setCourse(courseData);

                    // Get phases count
                    const phases = await getPhases(courseId);
                    setPhasesCount(phases.length);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching course:', error);
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    // Get course icon
    const getCourseIcon = (title) => {
        const lowerTitle = title?.toLowerCase() || '';
        if (lowerTitle.includes('c programming') || lowerTitle.includes('c language')) return '📘';
        if (lowerTitle.includes('python')) return '🐍';
        if (lowerTitle.includes('java')) return '☕';
        if (lowerTitle.includes('javascript')) return '⚡';
        if (lowerTitle.includes('web')) return '🌐';
        if (lowerTitle.includes('data')) return '📊';
        return '📚';
    };

    // Get course-specific content
    const getCourseContent = (title) => {
        const lowerTitle = title?.toLowerCase() || '';

        if (lowerTitle.includes('c programming') || lowerTitle.includes('c language')) {
            return {
                what: "C is a powerful, general-purpose programming language that provides low-level access to memory and efficient execution. Developed in the early 1970s, it has become one of the most widely used programming languages, forming the foundation for many modern languages and operating systems.",
                why: [
                    "Foundation of modern programming - Understanding C helps you grasp how computers work at a fundamental level",
                    "High performance - C programs are fast and efficient, making them ideal for system programming",
                    "Portability - C code can run on various platforms with minimal modification",
                    "Career opportunities - Widely used in embedded systems, operating systems, and game development",
                    "Learn other languages easily - Once you know C, learning languages like C++, Java, and Python becomes much easier"
                ],
                features: [
                    "Simple and efficient syntax",
                    "Powerful set of built-in operators",
                    "Low-level memory manipulation with pointers",
                    "Rich library of built-in functions",
                    "Modular programming with functions",
                    "Structured programming approach"
                ],
                prerequisites: [
                    "Basic computer knowledge",
                    "Understanding of basic mathematics",
                    "Logical thinking ability",
                    "No prior programming experience required"
                ]
            };
        }

        // Default content
        return {
            what: `${title} is a comprehensive programming course designed to help you master essential concepts and build real-world applications. This course covers everything from basics to advanced topics with hands-on examples and projects.`,
            why: [
                "Build a strong foundation in programming",
                "Learn industry-standard best practices",
                "Work on real-world projects",
                "Enhance your career opportunities",
                "Join a community of learners"
            ],
            features: [
                "Comprehensive curriculum",
                "Interactive examples",
                "Self-paced learning",
                "Practice exercises",
                "Project-based learning"
            ],
            prerequisites: [
                "Basic computer knowledge",
                "Willingness to learn",
                "No prior experience required"
            ]
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark-gradient-secondary">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-xl font-semibold text-gray-300">Loading course...</div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center dark-gradient-secondary">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Course not found</h2>
                    <button
                        onClick={() => navigate('/courses')}
                        className="mt-4 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    const content = getCourseContent(course.title);

    return (
        <div className="min-h-screen dark-gradient-secondary">
            {/* Main Container - Increased width to max-w-7xl */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Top Navigation */}
                <div className="mb-8 flex justify-start">
                    <button
                        onClick={() => navigate('/courses')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg border border-gray-700 hover:border-gray-500 transition-all group font-medium"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Courses</span>
                    </button>
                </div>

                {/* Course Header - Centered with Icon side-by-side */}
                <div className="flex flex-col items-center text-center gap-6 mb-12">
                    {/* Icon & Title Row */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-800/50 rounded-2xl flex items-center justify-center border border-gray-700 shadow-xl">
                                <span className="text-5xl sm:text-6xl">{getCourseIcon(course.title)}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl font-bold text-white">
                            {course.title}
                        </h1>
                    </div>

                    {/* Info (Description & Stats & Button) */}
                    <div className="max-w-4xl w-full">
                        <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                            {course.description}
                        </p>

                        {/* Stats Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
                                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                                <span className="text-white font-medium text-sm">{phasesCount} Phases</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
                                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span className="text-white font-medium text-sm">Self-paced</span>
                            </div>
                            {course.level && (
                                <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
                                    <span className="text-white font-medium text-sm">{course.level}</span>
                                </div>
                            )}
                        </div>

                        {/* Start Course Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => navigate(`/courses/${courseId}/learn`)}
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg shadow-primary-500/30"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                Start Course
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content - Left Aligned & Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* What is Section */}
                        <section className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">📚</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">What is {course.title}?</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {content.what}
                            </p>
                        </section>

                        {/* Why Learn Section */}
                        <section className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">🎯</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Why Learn {course.title}?</h2>
                            </div>
                            <ul className="space-y-4">
                                {content.why.map((reason, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-300 text-lg">{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Right Column - Features & Prereqs */}
                    <div className="space-y-8">
                        {/* Key Features Section */}
                        <section className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">✨</span>
                                </div>
                                <h2 className="text-xl font-bold text-white">Key Features</h2>
                            </div>
                            <ul className="space-y-3">
                                {content.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-700/30">
                                        <div className="w-2 h-2 mt-2 bg-pink-400 rounded-full flex-shrink-0"></div>
                                        <span className="text-gray-300 from-neutral-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Prerequisites Section */}
                        <section className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h2 className="text-xl font-bold text-white">Prerequisites</h2>
                            </div>
                            <ul className="space-y-3">
                                {content.prerequisites.map((prereq, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                                        <span className="text-gray-300">{prereq}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
