import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../hooks/useNotifications';
import { useTheme } from '../hooks/useTheme';
import {
    Bell,
    BellOff,
    Book,
    Award,
    Target,
    Info,
    TrendingUp,
    Users,
    Check,
    Trash2,
    ArrowLeft
} from 'lucide-react';

const Notifications = () => {
    const navigate = useNavigate();
    const {
        notifications,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
        refreshNotifications
    } = useNotifications();
    const { isDark } = useTheme();

    useEffect(() => {
        refreshNotifications();
    }, [refreshNotifications]);

    const formatNotificationTime = (createdAt) => {
        if (!createdAt) return 'Just now';

        const now = new Date();
        const created = new Date(createdAt);

        // Handle invalid dates
        if (isNaN(created.getTime())) return 'Just now';

        const diffInSeconds = Math.floor((now - created) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays < 7) return `${diffInDays}d ago`;

        return created.toLocaleDateString();
    };

    const getNotificationIcon = (type) => {
        const icons = {
            course: Book,
            achievement: Award,
            challenge: Target,
            system: Info,
            progress: TrendingUp,
            community: Users
        };
        const IconComponent = icons[type] || Bell;
        return <IconComponent className="w-6 h-6" />;
    };

    return (
        <div className={`min-h-screen pt-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'dark-gradient text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="sm:hidden p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-3xl font-bold">Notifications</h1>
                    </div>
                    <div className="flex gap-3">
                        {Array.isArray(notifications) && notifications.length > 0 && (
                            <>
                                <button
                                    onClick={markAllAsRead}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark
                                        ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        }`}
                                >
                                    Mark all read
                                </button>
                                <button
                                    onClick={clearAllNotifications}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark
                                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                        }`}
                                >
                                    Clear all
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading notifications...</p>
                    </div>
                ) : (!Array.isArray(notifications) || notifications.length === 0) ? (
                    <div className={`text-center py-20 rounded-2xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                        <div className={`bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                            <BellOff className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No notifications yet</h3>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            We'll notify you when something important happens
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`p-6 rounded-xl border transition-all ${notification.read
                                    ? (isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200')
                                    : (isDark ? 'bg-blue-900/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-blue-50 border-blue-200 shadow-sm')
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-full shrink-0 ${notification.read
                                        ? (isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')
                                        : (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600')
                                        }`}>
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                {notification.title}
                                            </h3>
                                            <span className={`text-sm whitespace-nowrap ${isDark ? 'text-gray-500' : 'text-gray-400'
                                                }`}>
                                                {formatNotificationTime(notification.createdAt)}
                                            </span>
                                        </div>
                                        <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'
                                            }`}>
                                            {notification.message}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            {!notification.read && (
                                                <button
                                                    onClick={() => markAsRead(notification._id)}
                                                    className={`text-sm font-medium flex items-center gap-1 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                                                        }`}
                                                >
                                                    <Check className="w-4 h-4" /> Mark as read
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteNotification(notification._id)}
                                                className={`text-sm font-medium flex items-center gap-1 ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                                                    }`}
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete
                                            </button>
                                        </div>
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

export default Notifications;
