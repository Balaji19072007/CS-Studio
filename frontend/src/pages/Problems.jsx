// frontend/src/pages/Problems.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as feather from 'feather-icons';
import { fetchAllProblems } from '../api/problemApi.js';
import { ProblemManager } from '../utils/problemManager.js';
import ProblemCard from '../components/problems/ProblemCard.jsx';
import Loader from '../components/common/Loader.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import { useAuth } from '../hooks/useAuth.jsx';



// ---------- Constants ----------
const FILTER_OPTIONS = {
    difficulty: ['All', 'Easy', 'Medium', 'Hard'],
    language: ['All', 'C', 'C++', 'Java', 'Python', 'JavaScript'],
};

// ---------- Component ----------
const Problems = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    const [allProblems, setAllProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(ProblemManager.getGlobalProgress());

    const [filters, setFilters] = useState({
        difficulty: 'All',
        language: 'All',
        search: ''
    });

    // --- Data Fetching ---
    useEffect(() => {
        let isMounted = true;

        const getStatus = (p) => {
            const prog = ProblemManager.getProblemProgress(p.problemId || p.id);
            if (prog.solved) return 'solved';
            // Mark as attempted if there are submissions OR if user has spent time on it
            if (prog.submissions.length > 0 || prog.timeElapsed > 0 || prog.startTime > 0) return 'attempted';
            return 'todo';
        };

        const loadProblems = async () => {
            try {
                const data = await fetchAllProblems();
                if (isMounted) {
                    const problemsWithStatus = data.map(p => ({
                        ...p,
                        status: getStatus(p)
                    }));

                    setAllProblems(problemsWithStatus);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Error fetching problems:', err);
                if (isMounted) {
                    setError('Failed to load coding problems.');
                    setIsLoading(false);
                }
            }
        };

        const updateProgress = () => {
            if (isMounted) {
                setProgress(ProblemManager.getGlobalProgress());
                setAllProblems(prev => prev.map(p => ({
                    ...p,
                    status: getStatus(p)
                })));
            }
        };

        loadProblems();

        // Listener for local storage changes
        window.addEventListener('storage', updateProgress);
        // Custom event listener for internal updates
        window.addEventListener('problem_progress_updated', updateProgress);

        return () => {
            isMounted = false;
            window.removeEventListener('storage', updateProgress);
            window.removeEventListener('problem_progress_updated', updateProgress);
        };
    }, []);

    // --- Filtering Logic ---
    const applyFilters = useCallback((problems, currentFilters) => {
        return problems.filter(problem => {
            const matchesDifficulty = currentFilters.difficulty === 'All' || problem.difficulty === currentFilters.difficulty;
            const matchesLanguage = currentFilters.language === 'All' || problem.language === currentFilters.language;
            const matchesSearch = problem.title.toLowerCase().includes(currentFilters.search.toLowerCase());

            return matchesDifficulty && matchesLanguage && matchesSearch;
        });
    }, []);

    useEffect(() => {
        setFilteredProblems(applyFilters(allProblems, filters));
    }, [allProblems, filters, applyFilters]);

    // --- Scrolling to Solved Problem ---
    useEffect(() => {
        if (location.state?.scrollToId && filteredProblems.length > 0 && !isLoading) {
            const targetId = location.state.scrollToId;
            // Short delay to ensure DOM is ready
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Optional: Highlight the card briefly
                    element.classList.add('ring-2', 'ring-green-500');
                    setTimeout(() => element.classList.remove('ring-2', 'ring-green-500'), 2000);
                }
            }, 500);

            // Clear state to prevent re-scroll on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state, filteredProblems, isLoading]);


    // --- Handlers ---
    const handleFilterChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: value,
            // When filtering by a specific type, usually reset search unless explicitly searching
            search: type === 'search' ? value : prev.search,
        }));
    };

    const handleSearch = (searchTerm) => {
        setFilters(prev => ({ ...prev, search: searchTerm }));
    };

    const handleSolveClick = (problemId, e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            // In a real app, this would trigger a modal or redirection to sign-in
            console.log('Redirecting to sign-in...');
        }
    };

    // --- Progress Display Calculation (Keep logic for filtering/sorting if needed later) ---
    const solvedEasy = progress.problemsByDifficulty.Easy.solved;
    const totalEasy = progress.problemsByDifficulty.Easy.total;
    const solvedMedium = progress.problemsByDifficulty.Medium.solved;
    const totalMedium = progress.problemsByDifficulty.Medium.total;
    const solvedHard = progress.problemsByDifficulty.Hard.solved;
    const totalHard = progress.problemsByDifficulty.Hard.total;
    const totalSolved = solvedEasy + solvedMedium + solvedHard;
    const totalTotal = totalEasy + totalMedium + totalHard;

    // Final feather-icons rendering
    useEffect(() => {
        feather.replace();
    }, [filters]); // Re-run when filters change to ensure icons load if DOM updates

    return (
        <div className="min-h-screen dark-gradient-secondary">
            {/* Hero Section */}
            <div className="gradient-bg text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle at center, #0ea5e940 0%, transparent 70%)',
                }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                            <span className="block">Sharpen Your</span>
                            <span className="block text-primary-400">Coding Skills</span>
                        </h1>
                        <p className="mt-4 text-xl max-w-3xl mx-auto text-gray-300">
                            Tackle our collection of {allProblems.length} language-agnostic coding challenges. Filter by difficulty, topic, or language to find your next goal!
                        </p>
                        <div className="mt-10 flex justify-center">
                            <div className="inline-flex rounded-md shadow-xl">
                                <Link
                                    to="/solve?problemId=1"
                                    onClick={(e) => handleSolveClick(1, e)}
                                    className="dark-btn inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-all duration-300 transform hover:scale-105"
                                >
                                    <i data-feather="terminal" className="w-5 h-5 mr-2"></i>
                                    Try First Problem
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content & Filters - REMOVED Progress Overview Box - ADJUSTED MARGIN */}
            {/* The -mt-16 needs to be removed/adjusted since the large component is gone */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">

                {/* --- REMOVED: Your Progress Overview Box --- */}

                {/* Filters and Search - ADDED mb-6 for spacing */}
                <div className="mb-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                        <SearchBar onSearch={handleSearch} placeholder="Search by problem title..." />
                    </div>

                    {/* Difficulty Filter */}
                    <div className="relative group">
                        <select
                            className="filter-dropdown"
                            value={filters.difficulty}
                            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                        >
                            {FILTER_OPTIONS.difficulty.map(option => (
                                <option key={option} value={option}>{option} Difficulty</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 group-hover:text-primary-400 transition-colors">
                            <i data-feather="chevron-down" className="w-5 h-5"></i>
                        </div>
                    </div>

                    {/* Language Filter */}
                    <div className="relative group">
                        <select
                            className="filter-dropdown"
                            value={filters.language}
                            onChange={(e) => handleFilterChange('language', e.target.value)}
                        >
                            {FILTER_OPTIONS.language.map(option => (
                                <option key={option} value={option}>{option} Language</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 group-hover:text-primary-400 transition-colors">
                            <i data-feather="chevron-down" className="w-5 h-5"></i>
                        </div>
                    </div>
                </div>

                {/* Problem List */}
                {isLoading ? (
                    <div className="mt-10"><Loader message="Loading problems..." size="lg" /></div>
                ) : error ? (
                    <div className="text-center text-red-400 mt-10 p-8 bg-gray-800 rounded-xl border border-red-900/50">{error}</div>
                ) : filteredProblems.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10 p-8 bg-gray-800 rounded-xl border border-gray-700/50">
                        <i data-feather="search" className="w-8 h-8 mx-auto mb-4"></i>
                        <p className="text-lg font-semibold">No problems found matching your criteria.</p>
                        <p className="text-sm">Try resetting your filters or adjusting your search term.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredProblems.map(problem => (
                            <ProblemCard
                                key={problem.problemId || problem.id} // FIX: Ensures unique key using problemId or fallback id
                                problem={problem}
                                isLoggedIn={isLoggedIn}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Final feather-icons rendering */}
        </div>
    );
};

export default Problems;