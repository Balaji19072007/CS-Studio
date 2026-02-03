import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../api/courseApi';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTrack, setSelectedTrack] = useState(null);
    const navigate = useNavigate();

    const COURSE_CATEGORIES = [
        { id: 'prog-langs', title: 'Programming Languages', keywords: ['programming', 'c programming', 'c++', 'java', 'python', 'c#'] },
        { id: 'web-dev', title: 'Full Stack Web Development', keywords: ['web', 'frontend', 'backend', 'full stack'] },
        { id: 'mobile-dev', title: 'Mobile App Development', keywords: ['mobile', 'android', 'ios', 'flutter', 'react native'] },
        { id: 'data-science', title: 'Data Science', keywords: ['data science', 'pandas', 'numpy'] },
        { id: 'ai-ml', title: 'AI & Machine Learning', keywords: ['machine learning', 'artificial intelligence', 'ai', 'deep learning'] },
        { id: 'devops', title: 'DevOps', keywords: ['devops', 'docker', 'cloud', 'kubernetes'] },
        { id: 'cyber-sec', title: 'Cyber Security', keywords: ['security', 'cyber'] },
        { id: 'other', title: 'Other Courses', keywords: [] }
    ];

    const COURSE_ORDER = {
        'prog-langs': ['C Programming', 'Python Programming', 'Java Programming', 'C++ Programming', 'C# Programming'],
        'web-dev': ['Frontend Development', 'Backend Development', 'Database & Data Modeling', 'Backend & APIs for Mobile', 'Deployment & DevOps Essentials', 'Web & App Security', 'Full Stack Capstone'],
        'mobile-dev': ['Native Android Development', 'Native iOS Development', 'Cross-Platform Mobile Dev'],
        'data-science': ['Python for Data Science', 'Data Wrangling & Visualization', 'Data Modeling', 'Big Data Engineering'],
        'ai-ml': ['AI Mathematics & Fundamentals', 'Core ML Algorithms', 'Deep Learning', 'Containerization', 'Production & MLOps', 'App Publishing & Maintenance'],
        'devops': ['DevOps Fundamentals', 'Orchestration & Infrastructure', 'Observability & Reliability'],
        'cyber-sec': ['Security Foundations', 'Defensive Security', 'Offensive Security', 'Forensics & Incident Response']
    };

    const CATEGORY_OVERRIDES = {
        'Backend & APIs for Mobile': 'web-dev',
        'Web & App Security': 'web-dev',
        'Containerization': 'ai-ml',
        'App Publishing & Maintenance': 'ai-ml',
        'Python for Data Science': 'data-science'
    };

    const COURSE_LEVELS = {
        'C Programming': 'Beginner',
        'Python Programming': 'Beginner',
        'Java Programming': 'Intermediate',
        'C++ Programming': 'Advanced',
        'C# Programming': 'Intermediate'
    };

    const getDifficultyColor = (level) => {
        const l = level?.toLowerCase() || 'beginner';
        if (l.includes('beginner')) return 'bg-green-500/20 text-green-400 border-green-500/50';
        if (l.includes('intermediate')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
        if (l.includes('advanced')) return 'bg-red-500/20 text-red-400 border-red-500/50';
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Fetch ALL courses from Supabase (all 35 courses are there)
                const supabaseCourses = await getAllCourses();
                console.log('📦 Supabase courses:', supabaseCourses);

                // Filter out any unwanted courses
                const filteredCourses = supabaseCourses.filter(c =>
                    !c.title?.toLowerCase().includes(' language') ||
                    c.title?.toLowerCase().includes('programming')
                ).map(c => ({
                    ...c,
                    level: COURSE_LEVELS[c.title] || c.level || 'Beginner' // Default to Beginner if not specified
                }));

                console.log('✅ Filtered courses:', filteredCourses);
                setCourses(filteredCourses);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const getCourseIcon = (title) => {
        const t = title?.toLowerCase() || '';
        if (t.includes('c programming') || t.includes('c language')) return '📘';
        if (t.includes('c++')) return '🚀';
        if (t.includes('c#')) return '#️⃣';
        if (t.includes('python')) return '🐍';
        if (t.includes('java')) return '☕';
        if (t.includes('web') || t.includes('html')) return '🌐';
        if (t.includes('data') || t.includes('sql')) return '📊';
        if (t.includes('ai') || t.includes('machine')) return '🧠';
        if (t.includes('security') || t.includes('cyber')) return '🛡️';
        if (t.includes('docker') || t.includes('devops')) return '🐳';
        if (t.includes('android') || t.includes('ios') || t.includes('mobile')) return '📱';
        return '📚';
    };



    const matchesCategory = (course, category) => {
        if (category.id === 'other') return false;
        if (CATEGORY_OVERRIDES[course.title] === category.id) return true;
        if (CATEGORY_OVERRIDES[course.title] && CATEGORY_OVERRIDES[course.title] !== category.id) return false;
        if (course.category && (course.category === category.title || course.category.includes(category.title))) return true;
        const title = course.title?.toLowerCase() || '';
        return category.keywords.some(keyword => title.includes(keyword));
    };

    const getGroupedData = () => {
        const searchFiltered = courses.filter(course =>
            course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const buckets = {};
        COURSE_CATEGORIES.forEach(cat => buckets[cat.id] = []);

        searchFiltered.forEach(course => {
            const matchingCat = COURSE_CATEGORIES.find(cat => matchesCategory(course, cat));
            if (matchingCat) buckets[matchingCat.id].push(course);
            else buckets['other'].push(course);
        });

        Object.keys(COURSE_ORDER).forEach(catId => {
            if (buckets[catId]) {
                const orderList = COURSE_ORDER[catId];
                buckets[catId].sort((a, b) => {
                    const indexA = orderList.indexOf(a.title);
                    const indexB = orderList.indexOf(b.title);
                    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                    if (indexA !== -1) return -1;
                    if (indexB !== -1) return 1;
                    return a.title.localeCompare(b.title);
                });
            }
        });

        return buckets;
    };

    const buckets = getGroupedData();
    console.log('🗂️ Categorized buckets:', buckets);

    const getMainViewCards = () => {
        let displayCards = [];
        COURSE_CATEGORIES.forEach(cat => {
            if (cat.id === 'other') return;
            const categoryCourses = buckets[cat.id] || [];
            console.log(`📁 Category ${cat.id}:`, categoryCourses);

            if (cat.id === 'prog-langs') {
                displayCards = [...displayCards, ...categoryCourses.map(c => ({ type: 'course', data: c }))];
            } else {
                displayCards.push({
                    type: 'track',
                    id: cat.id,
                    title: cat.title,
                    count: categoryCourses.length,
                    description: `Comprehensive curriculum with ${categoryCourses.length} modules.`,
                    courses: categoryCourses
                });
            }
        });
        console.log('🎴 Display cards:', displayCards);
        return displayCards;
    };

    const mainCards = getMainViewCards();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark-gradient-secondary">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-xl font-semibold text-gray-300">Loading courses...</div>
                </div>
            </div>
        );
    }

    if (selectedTrack) {
        const trackData = COURSE_CATEGORIES.find(c => c.id === selectedTrack);
        const trackCourses = buckets[selectedTrack] || [];

        return (
            <div className="min-h-screen dark-gradient-secondary">
                <div className="pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={() => setSelectedTrack(null)}
                            className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to All Courses
                        </button>

                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
                                {trackData?.title} <span className="text-primary-500">Track</span>
                            </h1>
                            <p className="text-xl text-gray-300">{trackCourses.length} Modules to Master</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trackCourses.map(course => (
                                <div key={course.id} onClick={() => navigate(`/courses/${course.id}`)} className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-primary-500/50 shadow-lg hover:shadow-primary-500/20 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full">
                                    <div className="p-6 flex-1">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="text-4xl md:text-5xl transform group-hover:scale-110 transition-transform duration-300">{getCourseIcon(course.title)}</div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">{course.title}</h3>
                                                {course.level && <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getDifficultyColor(course.level)}`}>{course.level}</span>}
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{course.description || 'Master this module to advance your career.'}</p>
                                    </div>
                                    <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/30">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500 flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
                                                {course.topicsCount || '0'} Topics
                                            </span>
                                            <span className="flex items-center text-primary-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                                Start Module <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen dark-gradient-secondary">
            <div className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
                        Explore Our <span className="text-primary-500">Courses</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">Choose a programming language or an entire career track.</p>

                    <div className="max-w-xl mx-auto mb-8">
                        <div className="relative">
                            <input type="text" placeholder="Search courses or tracks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-5 py-3 pr-12 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-white placeholder-gray-500" />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {mainCards.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
                        <p className="text-gray-400">Try adjusting your search query</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mainCards.map((item, idx) => (
                            <div key={item.type === 'course' ? item.data.id : item.id} onClick={() => { if (item.type === 'course') navigate(`/courses/${item.data.id}`); else setSelectedTrack(item.id); }} className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-primary-500/50 shadow-lg hover:shadow-primary-500/20 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full ${item.type === 'track' ? 'ring-1 ring-primary-500/20' : ''}`}>
                                <div className="p-6 flex-1">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="text-4xl md:text-5xl transform group-hover:scale-110 transition-transform duration-300">
                                            {item.type === 'course' ? getCourseIcon(item.data.title) : '🎓'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                                                {item.type === 'course' ? item.data.title : item.title}
                                            </h3>
                                            {item.type === 'course' ? (
                                                item.data.level && <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getDifficultyColor(item.data.level)}`}>{item.data.level}</span>
                                            ) : (
                                                <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-primary-500/20 text-primary-300 border-primary-500/50">{item.count} Modules</span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{item.type === 'course' ? (item.data.description || 'Master this language.') : item.description}</p>
                                </div>
                                <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/30">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500 flex items-center gap-1.5">
                                            {item.type === 'course' ? (
                                                <>
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
                                                    {item.data.topicsCount || '0'} Topics
                                                </>
                                            ) : (
                                                <span>Career Track</span>
                                            )}
                                        </span>
                                        <span className="flex items-center text-primary-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                            {item.type === 'course' ? 'Start Learning' : 'View Track'} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
