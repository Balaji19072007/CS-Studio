// frontend/src/pages/Community.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as feather from 'feather-icons';
import { communityAPI } from '../api/communityApi';
import { useAuth } from '../hooks/useAuth';


// Helper to get display name
const getUserDisplayName = (userObj) => {
    if (!userObj) return 'Unknown User';
    if (userObj.firstName && userObj.lastName) {
        return `${userObj.firstName} ${userObj.lastName}`;
    }
    return userObj.username || 'Unknown User';
};

// Helper to get initials
const getUserInitials = (userObj) => {
    if (!userObj) return 'U';
    if (userObj.firstName && userObj.lastName) {
        return `${userObj.firstName.charAt(0)}${userObj.lastName.charAt(0)}`.toUpperCase();
    }
    return (userObj.username || 'U').charAt(0).toUpperCase();
};

// User Avatar Component
const UserAvatar = ({ user, size = 'md' }) => {
    const [imgError, setImgError] = React.useState(false);

    const sizeClasses = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg'
    };
    const currentSize = sizeClasses[size] || sizeClasses.md;

    if (user && user.photoUrl && !imgError) {
        return (
            <img
                src={user.photoUrl}
                alt={getUserDisplayName(user)}
                className={`${currentSize} rounded-full object-cover border border-primary-500/30`}
                onError={() => setImgError(true)}
            />
        );
    }

    return (
        <div className={`${currentSize} rounded-full bg-primary-900/50 flex items-center justify-center text-primary-400 font-bold border border-primary-500/30 shrink-0`}>
            {getUserInitials(user)}
        </div>
    );
};

const Community = () => {
    const { isLoggedIn, user } = useAuth();
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // Create Modal State
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
    const [creating, setCreating] = useState(false);

    // View Modal State
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [commenting, setCommenting] = useState(false);

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [discussionToDelete, setDiscussionToDelete] = useState(null);

    // Fetch Discussions
    const fetchDiscussions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await communityAPI.getAllDiscussions();
            setDiscussions(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load discussions.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDiscussions();
    }, [fetchDiscussions]);

    useEffect(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, [discussions, selectedDiscussion]);

    // Handle Scroll for back to top
    const handleScroll = useCallback(() => {
        if (window.pageYOffset > 300) setIsVisible(true);
        else setIsVisible(false);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle Create Post
    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) return alert('Please login to post.');

        try {
            setCreating(true);
            const tagsArray = newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            await communityAPI.createDiscussion({ ...newPost, tags: tagsArray });

            setShowCreateModal(false);
            setNewPost({ title: '', content: '', tags: '' });
            fetchDiscussions(); // Refresh list
        } catch (err) {
            alert('Failed to create post. Please try again.');
        } finally {
            setCreating(false);
        }
    };

    // Handle View Discussion
    const openDiscussion = async (id) => {
        try {
            const response = await communityAPI.getDiscussionById(id);
            setSelectedDiscussion(response.data);
            // Update view count in list locally if needed, but fetchDiscussions refreshes it
        } catch (err) {
            console.error(err);
        }
    };

    // Handle Comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) return alert('Please login to comment.');
        if (!commentContent.trim()) return;

        try {
            setCommenting(true);
            const response = await communityAPI.addComment(selectedDiscussion.id, commentContent);

            // Allow immediate UI update
            const updatedDiscussion = await communityAPI.getDiscussionById(selectedDiscussion.id);
            setSelectedDiscussion(updatedDiscussion.data);
            setCommentContent('');
        } catch (err) {
            alert('Failed to post comment.');
        } finally {
            setCommenting(false);
        }
    };

    // Handle Like
    const handleLike = async (e, id) => {
        e.stopPropagation();
        if (!isLoggedIn) return alert('Please login to like.');

        try {
            await communityAPI.toggleLike(id);
            // Refresh specific discussion in list or view
            if (selectedDiscussion && selectedDiscussion.id === id) {
                const updated = await communityAPI.getDiscussionById(id);
                setSelectedDiscussion(updated.data);
            }
            fetchDiscussions();
        } catch (err) {
            console.error(err);
        }
    };

    // Request Delete (Open Modal)
    const requestDelete = (e, id) => {
        e.stopPropagation();
        setDiscussionToDelete(id);
        setShowDeleteModal(true);
    };

    // Confirm Delete
    const confirmDelete = async () => {
        if (!discussionToDelete) return;

        try {
            await communityAPI.deleteDiscussion(discussionToDelete);
            setDiscussions(prev => prev.filter(d => d.id !== discussionToDelete));
            if (selectedDiscussion?.id === discussionToDelete) {
                setSelectedDiscussion(null);
            }
            setShowDeleteModal(false);
            setDiscussionToDelete(null);
        } catch (err) {
            console.error(err);
            alert("Failed to delete discussion.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] dark:dark-gradient-secondary font-sans text-gray-900 dark:text-gray-100">
            {/* Hero Section - Minimal */}
            <div className="pt-24 pb-10 relative z-10 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6">
                        Join Our <span className="text-primary-500">Community</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                        Connect, share, and grow with fellow developers. Discuss problems, share solutions, and get help.
                    </p>

                    <button
                        onClick={() => isLoggedIn ? setShowCreateModal(true) : alert('Please login to start a discussion')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/10"
                    >
                        <i data-feather="plus-circle" className="w-5 h-5 text-gray-900"></i>
                        Start Discussion
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading discussions...</div>
                ) : error ? (
                    <div className="text-center py-20 text-red-400">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {discussions.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">No discussions yet. Be the first to post!</div>
                        ) : (
                            discussions.map(discussion => (
                                <div
                                    key={discussion.id}
                                    onClick={() => openDiscussion(discussion.id)}
                                    className="bg-[#ffffff] dark:!bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-xl p-4 sm:p-6 hover:shadow-lg dark:hover:bg-gray-800/60 transition-all cursor-pointer group hover:border-primary-500/30"
                                >
                                    {/* User Info Header */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <UserAvatar user={discussion.author} size="md" />
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 dark:text-white text-sm">{getUserDisplayName(discussion.author)}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(discussion.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs">
                                                <i data-feather="eye" className="w-3 h-3"></i>
                                                <span>{discussion.views}</span>
                                            </div>
                                            {user && discussion.author && user.id === discussion.author._id && (
                                                <button
                                                    onClick={(e) => requestDelete(e, discussion.id)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                                    title="Delete Discussion"
                                                >
                                                    <i data-feather="trash-2" className="w-4 h-4"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-left">
                                        {discussion.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm text-left">
                                        {discussion.content}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/30">
                                        <div className="flex gap-2">
                                            {discussion.tags.map((tag, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-700">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-6 text-gray-400">
                                            <button
                                                className="flex items-center gap-2 hover:text-red-400 transition-colors"
                                                onClick={(e) => handleLike(e, discussion.id)}
                                            >
                                                <i data-feather="heart" className={`w-4 h-4 ${discussion.likes.includes(user?.id) ? 'fill-red-500 text-red-500' : ''}`}></i>
                                                {discussion.likes.length}
                                            </button>
                                            <div className="flex items-center gap-2">
                                                <i data-feather="message-square" className="w-4 h-4"></i>
                                                {discussion.comments.length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* CREATE POST MODAL */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#ffffff] dark:bg-gray-900 rounded-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
                        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Create Discussion</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <i data-feather="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        <form onSubmit={handleCreatePost} className="p-4 md:p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none"
                                    placeholder="What's on your mind?"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Content</label>
                                <textarea
                                    required
                                    rows="6"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none resize-none"
                                    placeholder="Describe your question or topic in detail..."
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none"
                                    placeholder="java, algorithms, web-dev"
                                    value={newPost.tags}
                                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-6 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="dark-btn px-6 py-2 rounded-lg font-bold disabled:opacity-50"
                                >
                                    {creating ? 'Publishing...' : 'Publish Discussion'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW DISCUSSION MODAL */}
            {selectedDiscussion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-gray-900 rounded-2xl w-full max-w-4xl border border-gray-700 shadow-2xl my-8 flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="p-4 md:p-6 border-b border-gray-800 flex justify-between items-start sticky top-0 bg-gray-900 z-10 rounded-t-2xl">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <UserAvatar user={selectedDiscussion.author} size="md" />
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-base">{getUserDisplayName(selectedDiscussion.author)}</span>
                                        <span className="text-sm text-gray-400">{new Date(selectedDiscussion.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <h2 className="text-xl md:text-3xl font-bold text-white mb-2 text-left">{selectedDiscussion.title}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                {user && selectedDiscussion.author && user.id === selectedDiscussion.author._id && (
                                    <button
                                        onClick={(e) => requestDelete(e, selectedDiscussion.id)}
                                        className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                                        title="Delete Discussion"
                                    >
                                        <i data-feather="trash-2" className="w-6 h-6"></i>
                                    </button>
                                )}
                                <button onClick={() => setSelectedDiscussion(null)} className="text-gray-400 hover:text-white p-2">
                                    <i data-feather="x" className="w-6 h-6"></i>
                                </button>
                            </div>
                        </div>

                        {/* Content Scrollable Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6">
                            <div className="prose prose-invert max-w-none mb-8 text-gray-300 whitespace-pre-wrap leading-relaxed text-left">
                                {selectedDiscussion.content}
                            </div>

                            <div className="flex gap-2 mb-8">
                                {selectedDiscussion.tags.map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-gray-800 text-sm text-primary-400 rounded-full border border-gray-700">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 py-4 border-y border-gray-800 mb-8">
                                <button
                                    onClick={(e) => handleLike(e, selectedDiscussion.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${selectedDiscussion.likes.includes(user?.id) ? 'text-red-500' : 'text-gray-400'}`}
                                >
                                    <i data-feather="heart" className={`w-5 h-5 ${selectedDiscussion.likes.includes(user?.id) ? 'fill-current' : ''}`}></i>
                                    {selectedDiscussion.likes.length} Likes
                                </button>
                                <div className="flex items-center gap-2 text-gray-400 px-4 py-2">
                                    <i data-feather="message-circle" className="w-5 h-5"></i>
                                    {selectedDiscussion.comments.length} Comments
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white">Comments</h3>

                                {selectedDiscussion.comments.map((comment, idx) => (
                                    <div key={idx} className="bg-gray-800/30 rounded-xl p-4 border border-gray-800">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <UserAvatar user={comment.author} size="sm" />
                                                <span className="font-bold text-white">{getUserDisplayName(comment.author)}</span>
                                                <span className="text-xs text-gray-500">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 pl-8">{comment.content}</p>
                                    </div>
                                ))}

                                {/* Add Comment Form */}
                                <form onSubmit={handleAddComment} className="mt-8">
                                    <textarea
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:border-primary-500 focus:outline-none resize-none"
                                        rows="3"
                                        placeholder="Add to the discussion..."
                                        value={commentContent}
                                        onChange={(e) => setCommentContent(e.target.value)}
                                    ></textarea>
                                    <div className="mt-2 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={commenting || !commentContent.trim()}
                                            className="dark-btn px-6 py-2 rounded-lg font-bold text-sm disabled:opacity-50"
                                        >
                                            {commenting ? 'Posting...' : 'Post Comment'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-gray-900 rounded-2xl w-full max-w-sm border border-gray-700 shadow-2xl p-6 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mb-4 border border-red-500/30">
                            <i data-feather="alert-triangle" className="w-6 h-6 text-red-500"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Delete Discussion?</h3>
                        <p className="text-gray-400 mb-6 text-sm">
                            Are you sure you want to delete this discussion? <br /> This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => { setShowDeleteModal(false); setDiscussionToDelete(null); }}
                                className="px-5 py-2 rounded-lg text-gray-300 hover:bg-gray-800 border border-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-5 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Back to Top */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary-600 text-white shadow-lg transition-all duration-300 z-40 hidden md:block ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <i data-feather="arrow-up" className="w-6 h-6"></i>
            </button>
        </div>
    );
};

export default Community;