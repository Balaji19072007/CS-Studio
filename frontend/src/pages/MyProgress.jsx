import React, { useState, useEffect } from 'react';
import * as feather from 'feather-icons';
import { useAuth } from '../hooks/useAuth.jsx';
import { Link } from 'react-router-dom';

const MyProgress = () => {
  const { user, isLoggedIn } = useAuth();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState({});

  // Fetch integration
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) return;
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const headers = { 'Authorization': `Bearer ${token}` };

        // 1. Fetch Stats (Summary + Difficulty)
        const statsRes = await fetch('/api/progress/user-stats', { headers });
        const statsData = await statsRes.json();

        // 2. Fetch History (For Heatmap)
        const historyRes = await fetch('/api/progress/history', { headers });
        const historyData = await historyRes.json();

        if (statsData.success) setStats(statsData);
        if (historyData.success) {
          setHistory(historyData.history);
          processHeatmap(historyData.history);
        }

      } catch (error) {
        console.error("Failed to fetch progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!loading && typeof feather !== 'undefined') {
      feather.replace();
    }
  });

  // Process history into date counts for heatmap
  const processHeatmap = (historyItems) => {
    const counts = {};
    historyItems.forEach(item => {
      const date = new Date(item.lastSubmission).toISOString().split('T')[0];
      counts[date] = (counts[date] || 0) + 1;
    });
    setHeatmapData(counts);
  };

  // Helper to generate last 365 days
  const generateYearDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  };

  if (loading) {
    return (
      <div className="min-h-screen dark-gradient-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen dark-gradient-secondary flex flex-col items-center justify-center pt-20">
        <div className="bg-gray-800 p-8 rounded-2xl text-center max-w-md shadow-xl border border-gray-700">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i data-feather="cloud-off" className="w-8 h-8 text-gray-400"></i>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Unable to load progress</h2>
          <p className="text-gray-400 mb-6">We couldn't fetch your latest stats. Please try again later.</p>
          <button onClick={() => window.location.reload()} className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { userStats, progressStats, difficultyBreakdown } = stats;
  const yearDays = generateYearDays();
  const totalSolved = progressStats.solved;

  // Calculate detailed "XP" equivalent or logic based on mock for now if not in DB
  // Level calc: sqrt(points) * constant roughly
  const level = Math.floor(Math.sqrt((userStats.totalPoints || 0) / 10)) || 1;
  const progressToNextLevel = ((userStats.totalPoints || 0) % 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:dark-gradient-secondary pt-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Back Button */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:border-primary-500 transition-colors">
              <i data-feather="arrow-left" className="w-4 h-4 text-gray-700 dark:text-gray-300"></i>
            </div>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
        </div>

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              My Progress
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
              Consistent effort builds mastery. Track your daily contributions and skill growth here.
            </p>
          </div>

          {/* Streak Badge */}
          <div className="bg-[#ffffff] dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700/50 flex items-center gap-4 shadow-sm">
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 dark:text-white leading-none">{userStats.currentStreak || 0}</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Day Streak</div>
            </div>
            <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
              <i data-feather="flame" className="text-orange-500 w-6 h-6"></i>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- LEFT COLUMN (2/3) --- */}
          <div className="lg:col-span-2 space-y-8">

            {/* 1. Contribution Graph */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl relative overflow-hidden">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <i data-feather="grid" className="w-5 h-5 text-green-500 dark:text-green-400"></i>
                Contribution Activity
              </h2>

              {/* Heatmap Grid */}
              <div className="flex flex-wrap gap-1 justify-center sm:justify-start overflow-x-auto pb-2">
                {/* We show simple blocks for mobile/desktop responsiveness */}
                {yearDays.slice(-140).map((date, i) => { // Show last ~5 months to fit
                  const count = heatmapData[date] || 0;
                  let colorClass = 'bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700/50'; // 0
                  if (count > 0) colorClass = 'bg-green-100 border border-green-200 dark:bg-green-900 dark:border-green-800'; // 1
                  if (count > 2) colorClass = 'bg-green-300 border border-green-400 dark:bg-green-700 dark:border-green-600'; // 3+
                  if (count > 5) colorClass = 'bg-green-500 border border-green-600 dark:bg-green-500 dark:border-green-400 shadow-[0_0_5px_rgba(34,197,94,0.4)]'; // 6+

                  return (
                    <div
                      key={date}
                      title={`${date}: ${count} submissions`}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${colorClass} transition-all hover:scale-125`}
                    ></div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-500 font-medium">
                <span>Less</span>
                <div className="w-3 h-3 bg-gray-800 border border-gray-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-900 border border-green-800 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-700 border border-green-600 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 border border-green-400 rounded-sm"></div>
                <span>More</span>
              </div>
            </div>

            {/* 2. Recent History Table (Mini) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <i data-feather="clock" className="w-5 h-5 text-blue-500 dark:text-blue-400"></i>
                  Recent Activity
                </h2>
                <Link to="/problem-stats" className="text-xs font-bold text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
                  View Full History <i data-feather="arrow-right" className="w-3 h-3"></i>
                </Link>
              </div>

              <div className="space-y-4">
                {history.slice(0, 5).map(item => (
                  <div key={item.problemId} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'solved' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="text-xs text-gray-500">{new Date(item.lastSubmission).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-400">
                      {item.bestAccuracy}% Acc
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN (Sidebar) --- */}
          <div className="space-y-8">

            {/* 1. Skill Mastery Bars */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <i data-feather="cpu" className="w-5 h-5 text-purple-500 dark:text-purple-400"></i>
                Skill Mastery
              </h2>
              <div className="space-y-6">
                {[
                  { label: 'Easy Problems', count: difficultyBreakdown?.Easy || 0, total: 50, color: 'bg-green-500' },
                  { label: 'Medium Problems', count: difficultyBreakdown?.Medium || 0, total: 30, color: 'bg-yellow-500' },
                  { label: 'Hard Problems', count: difficultyBreakdown?.Hard || 0, total: 20, color: 'bg-red-500' },
                ].map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-gray-600 dark:text-gray-300">{skill.label}</span>
                      <span className="text-gray-900 dark:text-white">{skill.count} / {skill.total}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${skill.color} shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                        style={{ width: `${Math.min((skill.count / skill.total) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProgress;