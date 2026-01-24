import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as feather from 'feather-icons';
import { useAuth } from '../hooks/useAuth.jsx';

// Enhanced Mock Data
const COURSES = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Master the MERN stack and build production-ready applications.",
    progress: 35,
    totalLessons: 120,
    completedLessons: 42,
    lastAccessed: "2 hours ago",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    pillColor: "blue"
  },
  {
    id: 2,
    title: "Data Structures & Algorithms in Java",
    description: "Ace your coding interviews with optimized solutions.",
    progress: 12,
    totalLessons: 85,
    completedLessons: 10,
    lastAccessed: "Yesterday",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    pillColor: "orange"
  },
  {
    id: 3,
    title: "System Design for Beginners",
    description: "Learn how to design scalable systems like Netflix and Uber.",
    progress: 0,
    totalLessons: 45,
    completedLessons: 0,
    lastAccessed: "Never",
    status: "Not Started",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    pillColor: "purple"
  },
  {
    id: 4,
    title: "Advanced CSS & Animations",
    description: "Create stunning, responsive layouts and animations.",
    progress: 100,
    totalLessons: 60,
    completedLessons: 60,
    lastAccessed: "1 week ago",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    pillColor: "green"
  }
];

const MyCourses = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All'); // All, In Progress, Completed

  useEffect(() => {
    if (typeof feather !== 'undefined' && feather.replace) {
      feather.replace();
    }
  }, [searchQuery, filter]);

  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || course.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Find the most active course (highest progress that isn't completed, or just the first one)
  const activeCourse = COURSES.find(c => c.status === 'In Progress') || COURSES[0];

  return (
    <div className="min-h-screen dark-gradient-secondary pt-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Back Button */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-primary-500 transition-colors">
              <i data-feather="arrow-left" className="w-4 h-4"></i>
            </div>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
        </div>

        {/* --- HERO SECTION: Resume Learning --- */}
        {activeCourse && (
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10"></div>
            <img
              src={activeCourse.image}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            />

            <div className="relative z-20 p-8 md:p-12 flex flex-col items-start max-w-2xl">
              <span className="mb-4 px-3 py-1 rounded-full bg-primary-900/50 text-primary-400 border border-primary-500/30 text-xs font-bold uppercase tracking-wider">
                Ready to Resume
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                {activeCourse.title}
              </h1>
              <p className="text-gray-300 text-lg mb-8 line-clamp-2">
                {activeCourse.description}
              </p>

              <div className="w-full max-w-md mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{activeCourse.progress}% Completed</span>
                  <span>{activeCourse.completedLessons}/{activeCourse.totalLessons} Lessons</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ width: `${activeCourse.progress}%` }}
                  ></div>
                </div>
              </div>

              <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-900/20 flex items-center gap-2 group-hover:translate-x-1">
                Continue Learning
                <i data-feather="arrow-right" className="w-5 h-5"></i>
              </button>
            </div>
          </div>
        )}

        {/* --- MAIN CONTENT --- */}
        <div className="flex flex-col gap-6">

          {/* Header & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-gray-800 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <i data-feather="grid" className="w-6 h-6 text-gray-500"></i>
                All Courses
              </h2>
              <p className="text-gray-400 mt-1">Manage your enrollment and track progress.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative group">
                <i data-feather="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors"></i>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all w-full sm:w-64"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex bg-gray-800 p-1 rounded-lg border border-gray-700">
                {['All', 'In Progress', 'Completed'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === f
                      ? 'bg-gray-700 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all group flex flex-col shadow-lg">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase backdrop-blur-md border ${course.status === 'Completed'
                        ? 'bg-green-500/20 border-green-500/30 text-green-400'
                        : 'bg-black/30 border-white/10 text-white'
                        }`}>
                        {course.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-primary-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-1">
                      {course.description}
                    </p>

                    <div className="space-y-4">
                      {course.progress > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Progress</span>
                            <span className="text-gray-300">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${course.status === 'Completed' ? 'bg-green-500' : 'bg-primary-500'}`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
                        <span className="text-xs text-gray-500 font-mono">
                          Last: {course.lastAccessed}
                        </span>
                        <button className="text-sm font-semibold text-white hover:text-primary-400 transition-colors flex items-center gap-1">
                          {course.status === 'Completed' ? 'Review' : 'Continue'}
                          <i data-feather="chevron-right" className="w-4 h-4"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                <i data-feather="book-open" className="w-8 h-8 text-gray-600"></i>
              </div>
              <h3 className="text-lg font-medium text-white">No courses found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MyCourses;