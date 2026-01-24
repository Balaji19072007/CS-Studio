import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as feather from 'feather-icons';
import { useAuth } from '../hooks/useAuth.jsx';
import { fetchUserRank } from '../api/leaderboardApi.js';
import { fetchDailyProblem, fetchRecommendedProblems } from '../api/problemApi.js';
import TopUserStats from '../components/TopUserStats.jsx';

// Inline SVG Activity Graph Component
const ActivityGraph = ({ history }) => {
    // 1. Process data for last 7 days
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - i));
        return {
            date: d.toISOString().split('T')[0],
            dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
            count: 0
        };
    });

    if (history) {
        history.forEach(item => {
            if (item.status === 'solved' && item.lastSubmission) {
                const dateObj = new Date(item.lastSubmission);
                if (!isNaN(dateObj.getTime())) {
                    const itemDate = dateObj.toISOString().split('T')[0];
                    const dayStat = last7Days.find(d => d.date === itemDate);
                    if (dayStat) {
                        dayStat.count++;
                    }
                }
            }
        });
    }

    // 2. Calculate SVG path
    const maxCount = Math.max(...last7Days.map(d => d.count), 5); // Minimum max of 5 for scale
    const height = 100;
    const width = 300; // Viewbox width
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = last7Days.map((d, i) => {
        const x = padding + (i / (last7Days.length - 1)) * chartWidth;
        const y = height - padding - (d.count / maxCount) * chartHeight;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                        <i data-feather="activity" className="w-5 h-5 text-blue-600 dark:text-blue-400"></i>
                    </div>
                    Activity
                </h2>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">Last 7 Days</span>
            </div>

            <div className="relative h-32 w-full z-10">
                {/* SVG Graph */}
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Grid Lines */}
                    <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="stroke-gray-300 dark:stroke-gray-700" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Area Gradient Definition */}
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Filled Area */}
                    <path
                        d={`M${padding},${height - padding} ${points} L${width - padding},${height - padding} Z`}
                        fill="url(#gradient)"
                    />

                    {/* Line Path */}
                    <polyline
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        points={points}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-lg"
                    />

                    {/* Data Points */}
                    {last7Days.map((d, i) => {
                        const x = padding + (i / (last7Days.length - 1)) * chartWidth;
                        const y = height - padding - (d.count / maxCount) * chartHeight;
                        return (
                            <g key={i} className="group/point">
                                <circle cx={x} cy={y} r="4" className="fill-white dark:fill-gray-900 stroke-blue-500 stroke-2 group-hover/point:r-6 transition-all duration-300 cursor-pointer" />
                                {/* Tooltip */}
                                <g className="opacity-0 group-hover/point:opacity-100 transition-opacity duration-300">
                                    <rect x={x - 15} y={y - 35} width="30" height="20" rx="4" className="fill-gray-800 dark:fill-gray-800 stroke-none" />
                                    <text x={x} y={y - 21} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                        {d.count}
                                    </text>
                                </g>
                                {/* X-Axis Labels */}
                                <text x={x} y={height + 20} textAnchor="middle" fontSize="10" fontWeight="500" className="fill-gray-500 dark:fill-gray-400">
                                    {d.dayName}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};


const UserHomePage = () => {
    const { user } = useAuth();
    const [rankData, setRankData] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [difficultyStats, setDifficultyStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // New Data States
    const [dailyProblem, setDailyProblem] = useState(null);
    const [recommendedProblems, setRecommendedProblems] = useState([]);
    const [userHistory, setUserHistory] = useState([]);

    // Mock Data for "Current Course"
    const currentCourse = {
        title: 'Full Stack Web Development',
        progress: 35,
        currentModule: 'React Hooks & Context',
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' // React Image
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

                // 1. Fetch Rank
                try {
                    const rData = await fetchUserRank();
                    setRankData(rData);
                } catch (e) { console.log("Rank fetch failed usually means unranked or error", e); }

                // 2. Fetch User Stats
                if (token) {
                    const pStatsRes = await fetch('/api/progress/user-stats', { headers });
                    if (pStatsRes.ok) {
                        const sData = await pStatsRes.json();
                        if (sData.success) {
                            setUserStats(sData.progressStats); // Contains summary counts
                            setDifficultyStats(sData.difficultyBreakdown);
                            // Merge userStats summary (contains currentStreak)
                            setUserStats(prev => ({ ...prev, ...sData.userStats }));
                        }
                    }
                }

                // 3. Fetch Optimized Data (Daily & Recommended)
                const [daily, recommended, historyRes] = await Promise.all([
                    fetchDailyProblem().catch(e => null),
                    fetchRecommendedProblems().catch(e => []),
                    token ? fetch('/api/progress/history', { headers }) : Promise.resolve(null)
                ]);

                setDailyProblem(daily);
                setRecommendedProblems(recommended);

                // History for Graph
                if (historyRes && historyRes.ok) {
                    const hData = await historyRes.json();
                    if (hData.success) {
                        setUserHistory(hData.history);
                    }
                }

            } catch (error) {
                console.warn("Failed to load dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            loadData();
        }
    }, [user]);

    useEffect(() => {
        if (!loading && typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    });

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f111a] pt-6 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 tracking-tight mb-2">
                            {getGreeting()}, <span className="text-blue-600 dark:text-blue-500">{user.firstName || user.name || 'Developer'}</span>!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Ready to push your limits today?</p>
                    </div>
                    {/* Optional: Add a subtle stat or date here */}
                    <div className="hidden md:block text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-500 font-mono">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* --- LEFT COLUMN (8/12 - 2/3 roughly) --- */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* 1. Daily Challenge Card - ALWAYS RENDER with Loading State if needed */}
                        {loading ? (
                            <div className="h-48 rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                        ) : dailyProblem ? (
                            <Link to={`/solve?problemId=${dailyProblem.problemId}`} className="block relative group overflow-hidden rounded-3xl transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary-900/20">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-purple-700 opacity-90 transition-opacity group-hover:opacity-100"></div>
                                {/* Abstract Shapes */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                                <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-sm border border-white/10">
                                                Daily Challenge
                                            </span>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full bg-black/30 text-white border border-white/10 flex items-center gap-1`}>
                                                {dailyProblem.difficulty === 'Easy' && <span className="w-2 h-2 rounded-full bg-green-400"></span>}
                                                {dailyProblem.difficulty === 'Medium' && <span className="w-2 h-2 rounded-full bg-yellow-400"></span>}
                                                {(dailyProblem.difficulty === 'Hard' || !['Easy', 'Medium'].includes(dailyProblem.difficulty)) && <span className="w-2 h-2 rounded-full bg-red-400"></span>}
                                                {dailyProblem.difficulty || 'Medium'}
                                            </span>
                                            {/* Streak Badge */}
                                            <div className="flex items-center gap-1.5 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
                                                <i data-feather="flame" className="w-3.5 h-3.5 text-orange-400"></i>
                                                <span className="text-orange-100 font-bold text-xs">{userStats?.currentStreak || 0} Day Streak</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                                                {dailyProblem.title}
                                            </h2>
                                            <p className="text-green-50 text-sm opacity-90 line-clamp-2 max-w-xl">
                                                Keep your streak alive! Solve today's challenge to earn bonus points and climb the leaderboard.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <div className="bg-white text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                                            <i data-feather="play" className="w-6 h-6 fill-current"></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            // Fallback if no daily problem found
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 text-center shadow-sm dark:shadow-none">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Daily Challenge Today</h2>
                                <p className="text-gray-500 dark:text-gray-400">Check back tomorrow for a new problem!</p>
                            </div>
                        )}

                        {/* 2. Stats & Actions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Activity Graph */}
                            <ActivityGraph history={userHistory} />

                            {/* Quick Actions */}
                            <div className="grid grid-rows-2 gap-4">
                                <Link to="/my-courses" className="bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 p-6 rounded-3xl transition-all group relative overflow-hidden flex items-center justify-between shadow-sm dark:shadow-none">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-200 dark:border-purple-500/20 group-hover:scale-110 transition-transform">
                                            <i data-feather="book-open" className="text-purple-600 dark:text-purple-400 w-6 h-6"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-gray-900 dark:text-white font-bold text-lg">My Courses</h3>
                                            <p className="text-gray-500 text-xs">Continue learning</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                        <i data-feather="arrow-right" className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-white"></i>
                                    </div>
                                </Link>

                                <Link to="/problem-stats" className="bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 p-6 rounded-3xl transition-all group relative overflow-hidden flex items-center justify-between shadow-sm dark:shadow-none">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20 group-hover:scale-110 transition-transform">
                                            <i data-feather="clock" className="text-emerald-600 dark:text-emerald-400 w-6 h-6"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-gray-900 dark:text-white font-bold text-lg">Detailed History</h3>
                                            <p className="text-gray-500 text-xs">View past solutions</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                        <i data-feather="arrow-right" className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-white"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* 3. Current Course */}
                        <div className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-3xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-colors shadow-sm dark:shadow-none">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <div className="p-1.5 bg-indigo-100 dark:bg-indigo-500/20 rounded-md">
                                        <i data-feather="play-circle" className="w-4 h-4 text-indigo-600 dark:text-indigo-400"></i>
                                    </div>
                                    Jump Back In
                                </h2>
                            </div>
                            <div className="p-6 flex flex-col md:flex-row gap-8">
                                <div className="w-full md:w-64 aspect-video rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg">
                                    <img
                                        src={currentCourse.coverImage}
                                        alt={currentCourse.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                            <i data-feather="play" className="w-5 h-5 text-white ml-1"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col justify-center space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{currentCourse.title}</h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">Full Stack Path</span>
                                            <span>•</span>
                                            <span>{currentCourse.currentModule}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                            <span className="text-gray-500 dark:text-gray-400">{currentCourse.progress}% Complete</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000 relative"
                                                style={{ width: `${currentCourse.progress}%` }}
                                            >
                                                <div className="absolute inset-0 bg-white/20 w-full h-full animate-shimmer"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-max px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-all font-bold text-sm flex items-center gap-2 shadow-lg shadow-gray-900/10 dark:shadow-white/5 active:scale-95">
                                        Resume Learning
                                        <i data-feather="arrow-right" className="w-4 h-4"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* --- RIGHT COLUMN (4/12 - 1/3 roughly) --- */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* 1. Rank Card - Conditional Rendering with Fallback */}
                        {loading ? (
                            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse"></div>
                        ) : (
                            // Render TopUserStats OR a fallback "Unranked" card
                            rankData ? (
                                <TopUserStats rankData={rankData} />
                            ) : (
                                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 text-center shadow-sm dark:shadow-none">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                                        <i data-feather="bar-chart-2" className="w-8 h-8 text-gray-400 dark:text-gray-500"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">No Rank Yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2 mb-4">Solve problems to enter the leaderboard!</p>
                                    <Link to="/problems" className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                                        Start Solving
                                    </Link>
                                </div>
                            )
                        )}

                        {/* 2. Mastery Widget */}
                        <div className="bg-white dark:bg-gray-800/40 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-xl">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="p-1.5 bg-pink-100 dark:bg-pink-500/20 rounded-lg">
                                    <i data-feather="target" className="w-4 h-4 text-pink-600 dark:text-pink-400"></i>
                                </span>
                                Mastery Progress
                            </h2>
                            <div className="space-y-6">
                                {/* Easy */}
                                <div className="space-y-2 group">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600 dark:text-green-400 font-bold group-hover:text-green-500 dark:group-hover:text-green-300 transition-colors">Easy</span>
                                        <span className="text-gray-500 dark:text-gray-400 font-mono">{difficultyStats?.Easy || 0} <span className="text-gray-400 dark:text-gray-600">/ 20</span></span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                                        <div className="bg-green-500 h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.4)]" style={{ width: `${Math.min(((difficultyStats?.Easy || 0) / 20) * 100, 100)}%` }}></div>
                                    </div>
                                </div>
                                {/* Medium */}
                                <div className="space-y-2 group">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-yellow-600 dark:text-yellow-400 font-bold group-hover:text-yellow-500 dark:group-hover:text-yellow-300 transition-colors">Medium</span>
                                        <span className="text-gray-500 dark:text-gray-400 font-mono">{difficultyStats?.Medium || 0} <span className="text-gray-400 dark:text-gray-600">/ 20</span></span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                                        <div className="bg-yellow-500 h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(234,179,8,0.4)]" style={{ width: `${Math.min(((difficultyStats?.Medium || 0) / 20) * 100, 100)}%` }}></div>
                                    </div>
                                </div>
                                {/* Hard */}
                                <div className="space-y-2 group">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-red-600 dark:text-red-400 font-bold group-hover:text-red-500 dark:group-hover:text-red-300 transition-colors">Hard</span>
                                        <span className="text-gray-500 dark:text-gray-400 font-mono">{difficultyStats?.Hard || 0} <span className="text-gray-400 dark:text-gray-600">/ 10</span></span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                                        <div className="bg-red-500 h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]" style={{ width: `${Math.min(((difficultyStats?.Hard || 0) / 10) * 100, 100)}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Recommended Problems */}
                        {recommendedProblems.length > 0 && (
                            <div className="bg-white dark:bg-gray-800/40 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-xl">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                        <span className="p-1.5 bg-cyan-100 dark:bg-cyan-500/20 rounded-lg">
                                            <i data-feather="compass" className="w-4 h-4 text-cyan-600 dark:text-cyan-400"></i>
                                        </span>
                                        For You
                                    </h2>
                                    <Link to="/problems" className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors uppercase tracking-wide">
                                        View All
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {recommendedProblems.map(problem => (
                                        <Link key={problem.problemId} to={`/solve?problemId=${problem.problemId}`} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-2xl transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-inner ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-500' :
                                                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-500' :
                                                        'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-500'
                                                    }`}>
                                                    {problem.difficulty ? problem.difficulty[0] : '?'}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h3 className="text-gray-900 dark:text-white font-bold text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors w-40">{problem.title}</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500">{problem.category || 'General'}</p>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all border border-gray-100 dark:border-transparent">
                                                <i data-feather="chevron-right" className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-white"></i>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserHomePage;
