// frontend/src/pages/Leaderboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as feather from 'feather-icons';
import { useAuth } from '../hooks/useAuth.jsx';
import { fetchLeaderboard, fetchUserRank, fetchTotalUsers } from '../api/leaderboardApi.js';

// --- HELPER FUNCTIONS ---
const generateInitials = (name) => {
    if (typeof name !== 'string' || !name) {
        return 'U'; 
    }
    
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
        return parts.map(n => n[0]).join('').toUpperCase().substring(0, 2);
    } else if (parts.length === 1 && parts[0].length > 0) {
        return parts[0].charAt(0).toUpperCase();
    }
    return 'U';
};

// --- COMPONENTS ---

// Redesigned Podium Card for Top 3
const PodiumCard = ({ user, rank }) => {
    const initials = generateInitials(user.name || user.username);
    
    const getRankClass = (rank) => {
        switch(rank) {
            case 1: return 'rank-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-yellow-500/50 border-4 border-yellow-400';
            case 2: return 'rank-2 bg-gradient-to-r from-gray-300 to-gray-400 text-black shadow-gray-400/50 border-4 border-gray-300';
            case 3: return 'rank-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-amber-700/50 border-4 border-amber-600';
            default: return 'bg-gray-200';
        }
    };

    const getRankOrder = (rank) => {
        switch(rank) {
            case 1: return 'order-2'; // Center
            case 2: return 'order-3'; // Right
            case 3: return 'order-1'; // Left
            default: return '';
        }
    };

    const getSizeClass = (rank) => {
        return rank === 1 ? 'h-16 w-16 text-xl md:h-24 md:w-24 md:text-3xl' : 'h-14 w-14 text-lg md:h-20 md:w-20 md:text-2xl';
    };
    
    const getNameSizeClass = (rank) => {
        return rank === 1 ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base md:text-lg';
    };

    const getPointsColor = (rank) => {
        return rank === 1 ? 'text-yellow-600' : rank === 2 ? 'text-gray-600' : 'text-amber-600';
    };

    const getHeightClass = (rank) => {
        switch(rank) {
            case 1: return 'h-48 md:h-56';
            case 2: return 'h-40 md:h-48';
            case 3: return 'h-36 md:h-44';
            default: return 'h-32';
        }
    };

    return (
        <div className={`podium flex flex-col items-center p-2 md:p-4 ${getRankOrder(rank)}`}>
            {/* Rank Badge */}
            <div className={`mb-2 px-4 py-1 rounded-full text-sm font-bold ${rank === 1 ? 'bg-yellow-100 text-yellow-800' : rank === 2 ? 'bg-gray-100 text-gray-800' : 'bg-amber-100 text-amber-800'}`}>
                #{rank}
            </div>
            
            {/* User Card */}
            <div 
                className={`bg-gray-900 rounded-xl shadow-lg p-4 w-full text-center transition-all duration-300 border border-gray-700/50 ${getHeightClass(rank)} flex flex-col justify-between`}
                style={{ transform: rank === 1 ? 'translateY(-10px)' : 'translateY(0)' }} 
            >
                {/* Avatar Section */}
                <div className="flex justify-center mb-3">
                    {user.photoUrl ? (
                        <div className={`${getSizeClass(rank)} rounded-full overflow-hidden border-2 ${rank === 1 ? 'border-yellow-400' : rank === 2 ? 'border-gray-400' : 'border-amber-500'} shadow-lg relative`}>
                            <img 
                                src={user.photoUrl} 
                                alt={user.name || user.username}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    const fallback = e.target.parentElement.querySelector('.avatar-fallback');
                                    if (fallback) fallback.classList.remove('hidden');
                                }}
                            />
                            <div className={`${getSizeClass(rank)} rounded-full ${getRankClass(rank)} items-center justify-center font-bold shadow-lg avatar-fallback hidden`}>
                                {initials}
                            </div>
                        </div>
                    ) : (
                        <div className={`${getSizeClass(rank)} rounded-full ${getRankClass(rank)} flex items-center justify-center font-bold shadow-lg`}>
                            {initials}
                        </div>
                    )}
                </div>
                
                {/* User Info */}
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className={`font-bold text-white ${getNameSizeClass(rank)} mb-1 truncate px-2`}>
                        {user.name || user.username}
                    </h3>
                    
                    {user.username && (
                        <p className="text-gray-400 text-xs mb-2">@{user.username}</p>
                    )}
                    
                    {/* Stats */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Solved:</span>
                            <span className="text-white font-semibold">{user.problemsSolved || user.solved || 0}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Points:</span>
                            <span className={`font-bold ${getPointsColor(rank)}`}>
                                {user.totalPoints || user.points || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Award Icon for 1st Place */}
            {rank === 1 && (
                <div className="mt-2">
                    <i data-feather="award" className="w-6 h-6 text-yellow-400"></i>
                </div>
            )}
        </div>
    );
};

// Leaderboard Table Row for remaining users
const LeaderboardTableRow = ({ user, index }) => {
    const { user: currentUser } = useAuth();
    const initials = generateInitials(user.name || user.username);
    const isCurrentUser = currentUser && user._id === currentUser.id;
    
    const rowClass = isCurrentUser 
        ? 'bg-primary-500/20 border-l-4 border-primary-400' 
        : 'hover:bg-gray-800/50';
    
    const rank = user.rank || index + 4;

    return (
        <tr className={`bg-gray-900 border-b border-gray-700/50 transition-colors duration-200 ${rowClass}`}>
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    rank <= 3 ? 'bg-yellow-500 text-black font-bold' : 
                    'bg-gray-700 text-gray-300'
                }`}>
                    {rank}
                </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm">
                <div className="flex items-center">
                    {user.photoUrl ? (
                        <div className={`h-10 w-10 rounded-full overflow-hidden flex items-center justify-center mr-3 border ${
                            isCurrentUser ? 'border-primary-500' : 'border-gray-600'
                        } relative`}>
                            <img 
                                src={user.photoUrl} 
                                alt={user.name || user.username}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    const fallback = e.target.parentElement.querySelector('.avatar-fallback');
                                    if (fallback) fallback.classList.remove('hidden');
                                }}
                            />
                            <div className={`h-10 w-10 rounded-full ${
                                isCurrentUser ? 'bg-primary-500/20' : 'bg-gray-700'
                            } items-center justify-center text-sm font-bold avatar-fallback hidden`}>
                                <span className={isCurrentUser ? 'text-primary-400' : 'text-gray-300'}>{initials}</span>
                            </div>
                        </div>
                    ) : (
                        <div className={`h-10 w-10 rounded-full ${
                            isCurrentUser ? 'bg-primary-500/20' : 'bg-gray-700'
                        } flex items-center justify-center text-sm font-bold mr-3`}>
                            <span className={isCurrentUser ? 'text-primary-400' : 'text-gray-300'}>{initials}</span>
                        </div>
                    )}
                    <div>
                        <div className={`font-medium ${isCurrentUser ? 'text-primary-400' : 'text-white'}`}>
                            {user.name || user.username}
                        </div>
                        {user.username && (
                            <div className="text-gray-400 text-xs">@{user.username}</div>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                <span className="font-semibold text-white">{user.problemsSolved || user.solved || 0}</span>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-300">
                {user.averageAccuracy ? `${Math.round(user.averageAccuracy)}%` : 'N/A'}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-300">
                {user.currentStreak || user.streak || 0} days
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-semibold text-primary-400">
                {user.totalPoints || user.points || 0}
            </td>
        </tr>
    );
};

// --- MAIN COMPONENT ---
const Leaderboard = () => {
    const { isLoggedIn, user: currentUser } = useAuth(); 

    const [leaderboardData, setLeaderboardData] = useState([]); 
    const [timeframe, setTimeframe] = useState('all-time');
    const [category, setCategory] = useState('all');
    const [isVisible, setIsVisible] = useState(false); 
    const [isLoading, setIsLoading] = useState(true); 
    const [totalUsers, setTotalUsers] = useState(0);
    const [userRank, setUserRank] = useState(null);
    const [error, setError] = useState(null);
    
    // Function to fetch real data from the backend
    const fetchLeaderboardData = useCallback(async (tf, cat) => {
        setIsLoading(true);
        setError(null);
        try {
            // Fetch leaderboard data
            const data = await fetchLeaderboard(tf, cat);
            setLeaderboardData(data);
            
            // Fetch total users count
            try {
                const totalData = await fetchTotalUsers();
                setTotalUsers(totalData.totalUsers || data.length);
            } catch (error) {
                console.warn('Could not fetch total users, using fallback:', error);
                setTotalUsers(data.length);
            }
            
            // Fetch current user's rank if logged in
            if (isLoggedIn) {
                try {
                    const rankData = await fetchUserRank();
                    setUserRank(rankData);
                } catch (error) {
                    console.warn('Could not fetch user rank:', error);
                }
            }
        } catch (error) {
            console.error('API Error:', error);
            setError('Failed to load leaderboard data. Please try again later.');
            setLeaderboardData([]);
            setTotalUsers(0);
        } finally {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    // Helper function to integrate current user and ensure proper ranking
    const compileLeaderboard = useCallback((apiData) => {
        if (!apiData || apiData.length === 0) return [];

        // Sort by problems solved (descending) and then by points (descending)
        const sortedData = [...apiData].sort((a, b) => {
            const aSolved = a.problemsSolved || a.solved || 0;
            const bSolved = b.problemsSolved || b.solved || 0;
            const aPoints = a.totalPoints || a.points || 0;
            const bPoints = b.totalPoints || b.points || 0;
            
            if (bSolved !== aSolved) return bSolved - aSolved;
            return bPoints - aPoints;
        });

        // Add rank to each user
        return sortedData.map((user, index) => ({
            ...user,
            rank: index + 1,
            name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username
        }));
    }, []);

    // --- EFFECTS ---
    
    // Effect to fetch leaderboard data when filters change
    useEffect(() => {
        const loadData = async () => {
            await fetchLeaderboardData(timeframe, category);
        };
        
        loadData();

        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, [timeframe, category, fetchLeaderboardData]);
    
    // Handle scroll for floating buttons
    const handleScroll = useCallback(() => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // --- RENDER DATA ---
    const allUsers = compileLeaderboard(leaderboardData);
    const topThree = allUsers.slice(0, 3);
    const remainingUsers = allUsers.slice(3);
    
    const currentUserEntry = allUsers.find(user => user._id === currentUser?.id);
    const shouldShowBackToTop = isVisible;

    return (
        <div className="min-h-screen dark-gradient-secondary">
            {/* Hero Section */}
            <div className="gradient-bg text-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 floating opacity-20 lg:block hidden">
                    <i data-feather="award" className="w-40 h-40 text-primary-500"></i>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                            <span className="block">Global</span>
                            <span className="block text-primary-400">Leaderboard</span>
                        </h1>
                        <p className="mt-4 text-xl max-w-3xl mx-auto text-gray-300">
                            Compete with developers worldwide and climb the ranks by solving coding problems!
                        </p>
                        <div className="mt-10 flex justify-center">
                            <div className="inline-flex rounded-md shadow-xl">
                                <Link 
                                    to="/problems" 
                                    className="dark-btn-secondary inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <i data-feather="code" className="w-5 h-5 mr-2"></i>
                                    Start Solving Problems
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-gradient-secondary to-transparent z-0"></div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Controls and Stats */}
                <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-8 border border-gray-700/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-2xl font-bold text-white">Global Rankings</h2>
                            <p className="text-gray-400 mt-1">
                                {totalUsers > 0 ? (
                                    `Showing top ${allUsers.length} users out of ${totalUsers.toLocaleString()}. Ranked by problems solved.`
                                ) : (
                                    "Start solving problems to appear on the leaderboard!"
                                )}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative">
                                <select 
                                    value={timeframe}
                                    onChange={(e) => setTimeframe(e.target.value)}
                                    className="dark-input block w-full pl-3 pr-10 py-2 text-base rounded-md"
                                >
                                    <option value="all-time">All Time</option>
                                    <option value="monthly">This Month</option>
                                    <option value="weekly">This Week</option>
                                    <option value="daily">Today</option>
                                </select>
                            </div>
                            <div className="relative">
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="dark-input block w-full pl-3 pr-10 py-2 text-base rounded-md"
                                >
                                    <option value="all">All Problems</option>
                                    <option value="easy">Easy Problems</option>
                                    <option value="medium">Medium Problems</option>
                                    <option value="hard">Hard Problems</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto"></div>
                        <p className="text-gray-400 mt-4 text-lg">Loading leaderboard...</p>
                    </div>
                )}
                
                {/* Error State */}
                {error && !isLoading && (
                    <div className="text-center py-16">
                        <i data-feather="alert-triangle" className="w-16 h-16 text-red-400 mx-auto mb-4"></i>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Failed to Load Leaderboard</h3>
                        <p className="text-gray-400">{error}</p>
                        <button 
                            onClick={() => fetchLeaderboardData(timeframe, category)}
                            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}
                
                {/* Podium Section - Top 3 */}
                {!isLoading && !error && topThree.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-white text-center mb-8">Top Performers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
                            {topThree.map((user) => (
                                <PodiumCard key={user._id || user.username} user={user} rank={user.rank} />
                            ))}
                        </div>
                    </div>
                )}

                {/* No Data State */}
                {!isLoading && !error && allUsers.length === 0 && (
                    <div className="text-center py-16">
                        <i data-feather="users" className="w-16 h-16 text-gray-600 mx-auto mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No Leaderboard Data Yet</h3>
                        <p className="text-gray-500 mb-6">Be the first to solve problems and appear on the leaderboard!</p>
                        <Link 
                            to="/problems"
                            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            <i data-feather="code" className="w-4 h-4 mr-2"></i>
                            Start Solving Problems
                        </Link>
                    </div>
                )}
                
                {/* Leaderboard Table for remaining users */}
                {!isLoading && !error && remainingUsers.length > 0 && (
                    <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-700/50">
                        <div className="px-6 py-4 border-b border-gray-700/50">
                            <h3 className="text-xl font-bold text-white">Global Rankings</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700/50">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Rank
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Solved
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Accuracy
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Streak
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Points
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700/50">
                                    {remainingUsers.map((user, index) => (
                                        <LeaderboardTableRow 
                                            key={user._id || user.username} 
                                            user={user} 
                                            index={index}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                
                {/* Current User Stats Card */}
                {!isLoading && !error && currentUserEntry && (
                    <div className="mt-8 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-xl shadow-lg p-6 border border-primary-500/30">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0 flex items-center">
                                {currentUserEntry.photoUrl ? (
                                    <div className="h-12 w-12 rounded-full overflow-hidden flex items-center justify-center border-2 border-primary-500/50 mr-4 relative">
                                        <img 
                                            src={currentUserEntry.photoUrl} 
                                            alt={currentUserEntry.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                const fallback = e.target.parentElement.querySelector('.avatar-fallback');
                                                if (fallback) fallback.classList.remove('hidden');
                                            }}
                                        />
                                        <div className="h-12 w-12 rounded-full bg-primary-500 items-center justify-center text-md font-bold text-white avatar-fallback hidden">
                                            {generateInitials(currentUserEntry.name)}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center text-md font-bold text-white mr-4">
                                        {generateInitials(currentUserEntry.name)}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Your Position: <span className="text-primary-400 font-extrabold">#{currentUserEntry.rank}</span>
                                    </h3>
                                    <span className="text-sm text-gray-400">
                                        @{currentUserEntry.username} • {currentUserEntry.problemsSolved || 0} problems solved
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-white">{currentUserEntry.problemsSolved || 0}</div>
                                    <div className="text-sm text-gray-500">Solved</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-white">
                                        {currentUserEntry.averageAccuracy ? `${Math.round(currentUserEntry.averageAccuracy)}%` : 'N/A'}
                                    </div>
                                    <div className="text-sm text-gray-500">Accuracy</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-orange-400">{currentUserEntry.currentStreak || 0}</div>
                                    <div className="text-sm text-gray-500">Day Streak</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-primary-400">{currentUserEntry.totalPoints || 0}</div>
                                    <div className="text-sm text-gray-500">Points</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Final CTA */}
            <div className="py-20 dark-gradient-secondary"> 
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-premium-lg relative overflow-hidden py-16 px-8"> 
                        <div className="absolute inset-0 bg-black opacity-5"></div>
                        
                        <div className="relative"> 
                            <div className="lg:flex lg:items-center lg:justify-between text-center lg:text-left">
                                <div className="flex-1">
                                    <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                                        <span className="block">Ready to climb the ranks?</span>
                                        <span className="block text-primary-100 mt-2 text-xl">Solve problems and track your progress.</span>
                                    </h2>
                                    <p className="mt-4 max-w-3xl text-lg text-primary-100 mx-auto lg:mx-0">
                                        Join thousands of developers improving their skills.
                                    </p>
                                </div>
                                <div className="mt-8 flex justify-center lg:mt-0 lg:flex-shrink-0">
                                    <div className="inline-flex rounded-md shadow-lg">
                                        <Link 
                                            to={isLoggedIn ? "/problems" : "/signup"} 
                                            className="dark-btn inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.03]"
                                        >
                                            {isLoggedIn ? 'Continue Solving Problems' : 'Join Now'}
                                            <i data-feather="arrow-right" className="ml-2 w-5 h-5"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="dark-gradient mt-16 border-t border-gray-700/50">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-base text-gray-400">
                            &copy; 2023 CS Studio. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
            
            {/* Floating Back to Top Button */}
            <button 
                id="back-to-top" 
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 h-12 w-12 rounded-full dark-gradient-accent text-white transition-all duration-300 shadow-lg z-50 ${
                    shouldShowBackToTop ? 'opacity-100 flex items-center justify-center' : 'opacity-0 hidden'
                }`}
            >
                <i data-feather="arrow-up" className="h-5 w-5"></i>
            </button>
        </div>
    );
};

export default Leaderboard;