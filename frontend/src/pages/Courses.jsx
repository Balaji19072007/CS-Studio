// frontend/src/pages/Courses.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import {
    Play,
    BookOpen,
    Clock,
    Star,
    Users,
    ArrowRight,
    Search,
    ArrowDown,
    ArrowUp,
    ChevronRight,
    CheckCircle
} from 'lucide-react';

// Comprehensive Course Data matching the HTML structure
const COURSES_DATA = [
    // Programming Fundamentals
    {
        id: 1,
        category: 'programming',
        title: 'C Language for Beginners',
        lessons: 30,
        instructorInitials: 'BJ',
        instructorName: 'Bob Johnson',
        difficulty: 'Beginner',
        color: 'primary',
        description: 'Learn C language from scratch with hands-on exercises and projects',
        duration: '6 weeks',
        rating: 4.8,
        students: 12500,
        gradient: 'from-primary-500 to-primary-600',
        iconColor: 'text-primary-400',
        route: '/learn/c-programming'
    },
    {
        id: 2,
        category: 'programming',
        title: 'Python for Beginners',
        lessons: 25,
        instructorInitials: 'AJ',
        instructorName: 'Alex Johnson',
        difficulty: 'Beginner',
        color: 'primary',
        description: 'Learn Python from scratch with hands-on exercises and projects',
        duration: '5 weeks',
        rating: 4.9,
        students: 18750,
        gradient: 'from-primary-500 to-primary-600',
        iconColor: 'text-primary-400',
        route: '/learn/python'
    },
    {
        id: 3,
        category: 'programming',
        title: 'Java Fundamentals',
        lessons: 30,
        instructorInitials: 'PP',
        instructorName: 'Priya Patel',
        difficulty: 'Intermediate',
        color: 'primary',
        description: 'Master object-oriented programming with Java',
        duration: '6 weeks',
        rating: 4.7,
        students: 9800,
        gradient: 'from-primary-500 to-primary-600',
        iconColor: 'text-primary-400',
        route: '/learn/java'
    },

    // Web Development
    {
        id: 4,
        category: 'web',
        title: 'Modern Frontend Mastery',
        lessons: 45,
        instructorInitials: 'ER',
        instructorName: 'Emma Rodriguez',
        difficulty: 'Beginner',
        color: 'blue',
        description: 'Master HTML5, CSS3, JavaScript, and modern frameworks like React and Vue.js',
        duration: '8 weeks',
        rating: 4.8,
        students: 15200,
        gradient: 'from-blue-600 to-blue-500',
        iconColor: 'text-blue-400',
        route: '/learn/frontend'
    },
    {
        id: 5,
        category: 'web',
        title: 'Node.js & Express',
        lessons: 38,
        instructorInitials: 'JK',
        instructorName: 'James Kim',
        difficulty: 'Intermediate',
        color: 'blue',
        description: 'Build scalable backend services with Node.js, Express, and MongoDB',
        duration: '7 weeks',
        rating: 4.7,
        students: 11200,
        gradient: 'from-blue-600 to-blue-500',
        iconColor: 'text-blue-400',
        route: '/learn/nodejs'
    },
    {
        id: 6,
        category: 'web',
        title: 'MERN Stack Mastery',
        lessons: 52,
        instructorInitials: 'AM',
        instructorName: 'Aisha Mohammed',
        difficulty: 'Intermediate',
        color: 'blue',
        description: 'Build complete web applications with MongoDB, Express, React, and Node.js',
        duration: '10 weeks',
        rating: 4.9,
        students: 8900,
        gradient: 'from-blue-600 to-blue-500',
        iconColor: 'text-blue-400',
        route: '/learn/mern'
    },

    // Data Science
    {
        id: 7,
        category: 'data',
        title: 'Data Science with Python',
        lessons: 35,
        instructorInitials: 'DR',
        instructorName: 'Dr. Rodriguez',
        difficulty: 'Beginner',
        color: 'purple',
        description: 'Master data analysis, visualization, and manipulation using pandas, NumPy, and Matplotlib',
        duration: '7 weeks',
        rating: 4.7,
        students: 8900,
        gradient: 'from-purple-600 to-purple-500',
        iconColor: 'text-purple-400',
        route: '/learn/data-science'
    },
    {
        id: 8,
        category: 'data',
        title: 'Data Analysis & Visualization',
        lessons: 28,
        instructorInitials: 'SM',
        instructorName: 'Sarah Mitchell',
        difficulty: 'Intermediate',
        color: 'purple',
        description: 'Create compelling data visualizations with Tableau, Power BI, and Python libraries',
        duration: '6 weeks',
        rating: 4.6,
        students: 7600,
        gradient: 'from-purple-600 to-purple-500',
        iconColor: 'text-purple-400',
        route: '/learn/data-visualization'
    },
    {
        id: 9,
        category: 'data',
        title: 'Statistics for Data Science',
        lessons: 32,
        instructorInitials: 'DW',
        instructorName: 'Dr. Wilson',
        difficulty: 'Intermediate',
        color: 'purple',
        description: 'Master statistical concepts, hypothesis testing, and regression analysis for data insights',
        duration: '6 weeks',
        rating: 4.8,
        students: 5400,
        gradient: 'from-purple-600 to-purple-500',
        iconColor: 'text-purple-400',
        route: '/learn/statistics'
    },

    // Algorithms
    {
        id: 10,
        category: 'algorithms',
        title: 'DSA In C',
        lessons: 35,
        instructorInitials: 'DW',
        instructorName: 'Dr. Wong',
        difficulty: 'Intermediate',
        color: 'green',
        description: 'Master Data Structures and Algorithms using C with hands-on coding exercises',
        duration: '7 weeks',
        rating: 4.7,
        students: 6200,
        gradient: 'from-green-600 to-green-500',
        iconColor: 'text-green-400',
        route: '/learn/dsa-c'
    },
    {
        id: 11,
        category: 'algorithms',
        title: 'DSA In Java',
        lessons: 40,
        instructorInitials: 'DR',
        instructorName: 'Dr. Rajesh',
        difficulty: 'Intermediate',
        color: 'green',
        description: 'Master Data Structures and Algorithms using Java with OOP principles',
        duration: '8 weeks',
        rating: 4.8,
        students: 5800,
        gradient: 'from-green-600 to-green-500',
        iconColor: 'text-green-400',
        route: '/learn/dsa-java'
    },
    {
        id: 12,
        category: 'algorithms',
        title: 'DSA In Python',
        lessons: 30,
        instructorInitials: 'DG',
        instructorName: 'Dr. Garcia',
        difficulty: 'Beginner',
        color: 'green',
        description: 'Master Data Structures and Algorithms using Python with clean syntax',
        duration: '6 weeks',
        rating: 4.6,
        students: 7100,
        gradient: 'from-green-600 to-green-500',
        iconColor: 'text-green-400',
        route: '/learn/dsa-python'
    },

    // Mobile Development
    {
        id: 13,
        category: 'mobile',
        title: 'Android with Kotlin',
        lessons: 35,
        instructorInitials: 'DW',
        instructorName: 'Dr. Watson',
        difficulty: 'Beginner',
        color: 'yellow',
        description: 'Build native Android apps with Kotlin, Material Design, and modern architecture',
        duration: '7 weeks',
        rating: 4.5,
        students: 4300,
        gradient: 'from-yellow-600 to-yellow-500',
        iconColor: 'text-yellow-400',
        route: '/learn/android'
    },
    {
        id: 14,
        category: 'mobile',
        title: 'iOS with Swift',
        lessons: 32,
        instructorInitials: 'AS',
        instructorName: 'Anna Smith',
        difficulty: 'Intermediate',
        color: 'yellow',
        description: 'Create beautiful iOS apps with Swift, SwiftUI, and Apple\'s latest frameworks',
        duration: '6 weeks',
        rating: 4.7,
        students: 3800,
        gradient: 'from-yellow-600 to-yellow-500',
        iconColor: 'text-yellow-400',
        route: '/learn/ios'
    },
    {
        id: 15,
        category: 'mobile',
        title: 'React Native',
        lessons: 28,
        instructorInitials: 'MB',
        instructorName: 'Mike Brown',
        difficulty: 'Beginner',
        color: 'yellow',
        description: 'Build cross-platform mobile apps with React Native and JavaScript',
        duration: '6 weeks',
        rating: 4.4,
        students: 5200,
        gradient: 'from-yellow-600 to-yellow-500',
        iconColor: 'text-yellow-400',
        route: '/learn/react-native'
    },

    // AI/ML
    {
        id: 16,
        category: 'ai',
        title: 'Intro to ML',
        lessons: 35,
        instructorInitials: 'LW',
        instructorName: 'Dr. Lisa Wong',
        difficulty: 'Intermediate',
        color: 'red',
        description: 'Learn supervised and unsupervised learning with scikit-learn and real-world projects',
        duration: '7 weeks',
        rating: 4.8,
        students: 6700,
        gradient: 'from-red-600 to-red-500',
        iconColor: 'text-red-400',
        route: '/learn/machine-learning'
    },
    {
        id: 17,
        category: 'ai',
        title: 'Neural Networks',
        lessons: 40,
        instructorInitials: 'RP',
        instructorName: 'Dr. Raj Patel',
        difficulty: 'Advanced',
        color: 'red',
        description: 'Build deep learning models with TensorFlow, Keras, and PyTorch',
        duration: '8 weeks',
        rating: 4.9,
        students: 4900,
        gradient: 'from-red-600 to-red-500',
        iconColor: 'text-red-400',
        route: '/learn/neural-networks'
    },
    {
        id: 18,
        category: 'ai',
        title: 'NLP Fundamentals',
        lessons: 30,
        instructorInitials: 'MG',
        instructorName: 'Dr. Maria Garcia',
        difficulty: 'Intermediate',
        color: 'red',
        description: 'Process and analyze text data with modern NLP techniques and transformers',
        duration: '6 weeks',
        rating: 4.7,
        students: 4100,
        gradient: 'from-red-600 to-red-500',
        iconColor: 'text-red-400',
        route: '/learn/nlp'
    },

    // Security
    {
        id: 19,
        category: 'security',
        title: 'Penetration Testing',
        lessons: 45,
        instructorInitials: 'KW',
        instructorName: 'Kevin White',
        difficulty: 'Intermediate',
        color: 'indigo',
        description: 'Learn ethical hacking techniques and penetration testing methodologies',
        duration: '9 weeks',
        rating: 4.8,
        students: 3200,
        gradient: 'from-indigo-600 to-indigo-500',
        iconColor: 'text-indigo-400',
        route: '/learn/penetration-testing'
    },
    {
        id: 20,
        category: 'security',
        title: 'Network Defense',
        lessons: 38,
        instructorInitials: 'SG',
        instructorName: 'Sarah Green',
        difficulty: 'Intermediate',
        color: 'indigo',
        description: 'Master network security protocols, firewalls, and intrusion detection systems',
        duration: '8 weeks',
        rating: 4.6,
        students: 2800,
        gradient: 'from-indigo-600 to-indigo-500',
        iconColor: 'text-indigo-400',
        route: '/learn/network-security'
    },
    {
        id: 21,
        category: 'security',
        title: 'Applied Cryptography',
        lessons: 32,
        instructorInitials: 'TB',
        instructorName: 'Tom Black',
        difficulty: 'Advanced',
        color: 'indigo',
        description: 'Learn encryption algorithms, digital signatures, and secure communication protocols',
        duration: '6 weeks',
        rating: 4.9,
        students: 2100,
        gradient: 'from-indigo-600 to-indigo-500',
        iconColor: 'text-indigo-400',
        route: '/learn/cryptography'
    },

    // DevOps
    {
        id: 22,
        category: 'devops',
        title: 'Intro to DevOps',
        lessons: 22,
        instructorInitials: 'DG',
        instructorName: 'Dr. Galesles',
        difficulty: 'Beginner',
        color: 'pink',
        description: 'Learn CI/CD, containerization, and infrastructure as code fundamentals',
        duration: '4 weeks',
        rating: 4.5,
        students: 5600,
        gradient: 'from-pink-600 to-pink-500',
        iconColor: 'text-pink-400',
        route: '/learn/devops'
    },
    {
        id: 23,
        category: 'devops',
        title: 'Docker & Kubernetes',
        lessons: 35,
        instructorInitials: 'RL',
        instructorName: 'Rachel Lee',
        difficulty: 'Intermediate',
        color: 'pink',
        description: 'Master container orchestration with Docker, Kubernetes, and cloud deployment',
        duration: '7 weeks',
        rating: 4.7,
        students: 4800,
        gradient: 'from-pink-600 to-pink-500',
        iconColor: 'text-pink-400',
        route: '/learn/docker-kubernetes'
    },
    {
        id: 24,
        category: 'devops',
        title: 'AWS Solutions Architect',
        lessons: 40,
        instructorInitials: 'MT',
        instructorName: 'Mark Taylor',
        difficulty: 'Intermediate',
        color: 'pink',
        description: 'Design and deploy scalable applications on Amazon Web Services',
        duration: '8 weeks',
        rating: 4.8,
        students: 5200,
        gradient: 'from-pink-600 to-pink-500',
        iconColor: 'text-pink-400',
        route: '/learn/aws'
    }
];

const CourseCard = ({ course }) => {
    const { isLoggedIn } = useAuth();

    const difficultyClasses = {
        'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        'Intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200/30 dark:text-yellow-400',
        'Advanced': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };

    const handleStartClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            window.location.href = '/signin';
        }
    };

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 overflow-hidden hover:shadow-2xl relative flex flex-col h-full">

            {/* MOBILE VIEW (Horizontal Compact) */}
            <div className="md:hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${course.gradient} bg-gradient-to-b`}></div>
                <div className="p-4 pl-5 flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <span className={`self-start px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${difficultyClasses[course.difficulty]}`}>
                            {course.difficulty}
                        </span>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight truncate">
                            {course.title}
                        </h3>
                    </div>
                    <div className="flex-shrink-0">
                        <Link
                            to={course.route || '/learn'}
                            onClick={handleStartClick}
                            className={`w-9 h-9 rounded-full bg-gradient-to-r ${course.gradient} flex items-center justify-center text-white shadow-md active:scale-95 transition-all`}
                        >
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* DESKTOP VIEW (Rich Vertical Design) */}
            <div className="hidden md:flex flex-col h-full">
                {/* Header with Background Gradient */}
                <div className={`h-24 bg-gradient-to-br ${course.gradient} relative p-6 flex flex-col justify-end`}>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-lg p-2 border border-white/20">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-[10px] uppercase font-bold tracking-[2px] mb-1">
                        {course.category}
                    </span>
                </div>

                {/* Content Body */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm ${difficultyClasses[course.difficulty]}`}>
                            {course.difficulty}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{course.rating}</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-primary-500 transition-colors">
                        {course.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 flex-1">
                        {course.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-y-3 mb-6 pt-6 border-t border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4 opacity-70" />
                            <span className="text-xs font-medium">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <BookOpen className="w-4 h-4 opacity-70" />
                            <span className="text-xs font-medium">{course.lessons} Lessons</span>
                        </div>
                    </div>

                    {/* Bottom Action */}
                    <Link
                        to={course.route || '/learn'}
                        onClick={handleStartClick}
                        className={`w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm flex items-center justify-center gap-2 group/btn hover:gap-3 transition-all duration-300`}
                    >
                        Start Learning
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Courses = () => {
    const { isLoggedIn } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Back to top visibility
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Group courses by category
    const coursesByCategory = COURSES_DATA.reduce((acc, course) => {
        if (!acc[course.category]) {
            acc[course.category] = [];
        }
        acc[course.category].push(course);
        return acc;
    }, {});

    const categories = [
        { id: 'all', name: 'All Courses', icon: 'grid', count: COURSES_DATA.length, color: 'primary' },
        { id: 'programming', name: 'Programming', icon: 'code', count: coursesByCategory.programming?.length || 0, color: 'primary' },
        { id: 'web', name: 'Web Dev', icon: 'layout', count: coursesByCategory.web?.length || 0, color: 'blue' },
        { id: 'data', name: 'Data Science', icon: 'database', count: coursesByCategory.data?.length || 0, color: 'purple' },
        { id: 'algorithms', name: 'Algorithms', icon: 'cpu', count: coursesByCategory.algorithms?.length || 0, color: 'green' },
        { id: 'mobile', name: 'Mobile Dev', icon: 'smartphone', count: coursesByCategory.mobile?.length || 0, color: 'yellow' },
        { id: 'ai', name: 'AI/ML', icon: 'activity', count: coursesByCategory.ai?.length || 0, color: 'red' },
        { id: 'security', name: 'Security', icon: 'shield', count: coursesByCategory.security?.length || 0, color: 'indigo' },
        { id: 'devops', name: 'DevOps', icon: 'server', count: coursesByCategory.devops?.length || 0, color: 'pink' },
    ];

    const categorySections = [
        { id: 'programming', title: 'Programming Fundamentals', description: 'Core concepts using C, Python, and Java', count: 8, color: 'primary' },
        { id: 'web', title: 'Web Development', description: 'Build modern, responsive web applications', count: 6, color: 'blue' },
        { id: 'data', title: 'Data Science', description: 'Statistical analysis, visualization, and machine learning', count: 5, color: 'purple' },
        { id: 'algorithms', title: 'Data Structures & Algorithms', description: 'Master the fundamentals of efficient problem solving', count: 4, color: 'green' },
        { id: 'mobile', title: 'Mobile App Development', description: 'Build cross-platform and native mobile applications', count: 3, color: 'yellow' },
        { id: 'ai', title: 'Artificial Intelligence & Machine Learning', description: 'Build intelligent systems and predictive models', count: 5, color: 'red' },
        { id: 'security', title: 'Cybersecurity', description: 'Protect systems and networks from digital attacks', count: 3, color: 'indigo' },
        { id: 'devops', title: 'DevOps & Cloud Computing', description: 'Automate workflows and deploy scalable applications', count: 4, color: 'pink' },
    ];

    return (
        <div className="min-h-screen dark-gradient-secondary">
            {/* Hero Section - Minimal */}
            <div className="pt-24 pb-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
                        Explore Our <span className="text-primary-500">Course Catalog</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-400">
                        Master computer science with our comprehensive curriculum covering all key areas.
                    </p>
                </div>
            </div>

            {/* Category Filter Bar - Minimal */}
            <div id="categories" className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Categories */}
                        <div className="flex overflow-x-auto whitespace-nowrap space-x-2 pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${selectedCategory === category.id
                                        ? 'bg-primary-500 text-white border-primary-500'
                                        : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
                                        }`}
                                >
                                    {category.name} <span className="opacity-60 text-xs ml-1">{category.count}</span>
                                </button>
                            ))}
                        </div>

                        {/* Search Box - Minimal Underline */}
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full bg-transparent border-b border-gray-700 px-0 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute right-0 top-2.5 w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>


            {/* Course Sections */}
            <div className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {categorySections
                        .filter(section => selectedCategory === 'all' || section.id === selectedCategory)
                        .map(section => (
                            <div key={section.id} id={section.id} className="mb-16 last:mb-0">
                                {/* Section Header */}
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {section.title}
                                    </h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        {section.description}
                                    </p>
                                </div>

                                {/* Course Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                    {COURSES_DATA.filter(course =>
                                        course.category === section.id && (
                                            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            course.description.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                    ).map(course => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>

                                {/* No Results */}
                                {COURSES_DATA.filter(course =>
                                    course.category === section.id && (
                                        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        course.description.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                ).length === 0 && searchQuery.length > 0 && (
                                        <div className="mt-8 text-center p-8 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                                            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <p className="text-gray-600 dark:text-gray-400">No courses found matching "{searchQuery}"</p>
                                        </div>
                                    )}
                            </div>
                        ))}
                </div>
            </div>


            {/* Final CTA Container - Matches Screenshot */}
            <div className="py-20 dark-gradient-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#0ea5e9] rounded-[2.5rem] shadow-premium-lg relative overflow-hidden py-12 px-6 sm:px-10">
                        <div className="relative">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 text-center md:text-left">
                                <div className="space-y-6">
                                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
                                        Ready to build <br className="hidden sm:block" /> your career?
                                    </h2>
                                    <div className="space-y-2">
                                        <p className="text-white font-bold text-xl md:text-2xl">
                                            Access the full library, free for 7 days.
                                        </p>
                                        <p className="text-white/90 text-sm md:text-base font-medium">
                                            No credit card required. Cancel anytime.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 flex justify-center">
                                    <Link
                                        to={isLoggedIn ? "/problems" : "/signup"}
                                        className="bg-[#10b981] hover:bg-[#0da975] text-white px-10 py-6 md:py-5 rounded-[1.5rem] text-2xl md:text-xl font-bold shadow-2xl transition-all flex flex-col sm:flex-row items-center justify-center gap-3 active:scale-95 w-full max-w-sm"
                                    >
                                        <span className="text-center leading-tight">
                                            {isLoggedIn ? (
                                                <>Continue <br className="sm:hidden" /> Solving <br className="sm:hidden" /> Problems</>
                                            ) : (
                                                <>Start Free <br className="sm:hidden" /> Trial Now</>
                                            )}
                                        </span>
                                        <ArrowRight className="w-6 h-6 md:w-5 md:h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;