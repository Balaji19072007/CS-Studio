// frontend/src/pages/Settings.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import * as feather from 'feather-icons';
import { updateProfile } from '../api/authApi.js';
import { useSimpleImageCropper } from '../hooks/useSimpleImageCropper.js';

const Settings = () => {
    const { user, updateUserProfile, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    // Local form state
    const [firstName, setFirstName] = useState(user?.firstName || user?.name?.split(' ')[0] || '');
    const [lastName, setLastName] = useState(user?.lastName || user?.name?.split(' ').slice(1).join(' ') || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    // Profile picture states
    const [profilePicture, setProfilePicture] = useState(user?.photoUrl || '');
    const [isUploading, setIsUploading] = useState(false);

    // Simple image cropper hook
    const {
        isCropModalOpen,
        originalImage,
        imageDimensions,
        scale,
        fileInputRef,
        handlePhotoChange,
        handleFileInputChange,
        applyCropManually,
        cancelCrop,
        crop,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        isResizing,
        handleResizeMouseDown,
        handleResizeMouseMove,
        handleResizeMouseUp,
        canvasRef,
        imageRef
    } = useSimpleImageCropper();

    // Mobile navigation state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Update local state when user changes
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || user.name?.split(' ')[0] || '');
            setLastName(user.lastName || user.name?.split(' ').slice(1).join(' ') || '');
            setBio(user.bio || '');
            setProfilePicture(user.photoUrl || '');
        }
    }, [user]);

    // Add event listeners for drag and resize
    useEffect(() => {
        if (isCropModalOpen) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isCropModalOpen, handleMouseMove, handleMouseUp]);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleResizeMouseMove);
            document.addEventListener('mouseup', handleResizeMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleResizeMouseMove);
                document.removeEventListener('mouseup', handleResizeMouseUp);
            };
        }
    }, [isResizing, handleResizeMouseMove, handleResizeMouseUp]);

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoggedIn && !loading) {
            navigate('/signin');
        }
    }, [isLoggedIn, loading, navigate]);

    // Sync icons
    useEffect(() => {
        feather.replace();
    }, [user, isCropModalOpen, alertMessage, profilePicture]);

    // --- Utility Functions ---
    const showAlert = (message, type = 'success') => {
        setAlertMessage({ message, type });
        setTimeout(() => setAlertMessage(null), 5000);
    };

    const applyCrop = async () => {
        setIsUploading(true);

        try {
            const imageBlob = await applyCropManually();

            if (!imageBlob) {
                throw new Error('Failed to process image');
            }

            // Convert blob to File object for proper multer handling
            const imageFile = new File([imageBlob], 'profile.jpg', { type: 'image/jpeg' });

            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('bio', bio);
            formData.append('profilePicture', imageFile);

            const apiResponse = await updateProfile(formData);

            // Update user in global state with the new method
            if (apiResponse.user) {
                await updateUserProfile(apiResponse.user);
                setProfilePicture(apiResponse.user.photoUrl);
                showAlert('Profile picture updated successfully!');
            } else {
                // If backend doesn't return user, update locally with temporary URL
                const tempUrl = URL.createObjectURL(imageBlob);
                await updateUserProfile({
                    photoUrl: tempUrl,
                    firstName,
                    lastName,
                    bio,
                    updatedAt: Date.now()
                });
                setProfilePicture(tempUrl);
                showAlert('Profile picture updated!');
            }

            cancelCrop();

        } catch (error) {
            console.error('Crop application error:', error);
            const errorMessage = error.response?.data?.msg || error.message || 'Failed to update profile picture. Please try again.';
            showAlert(errorMessage, 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (!user) return logout();

        setLoading(true);
        setAlertMessage(null);

        if (!firstName || !lastName) {
            showAlert('Full Name cannot be empty.', 'error');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                firstName: firstName,
                lastName: lastName,
                bio: bio,
            };

            const apiResponse = await updateProfile(payload);

            // Update user with response using the new method
            if (apiResponse.user) {
                await updateUserProfile(apiResponse.user);
                setProfilePicture(apiResponse.user.photoUrl);
            } else {
                await updateUserProfile({
                    firstName,
                    lastName,
                    name: `${firstName} ${lastName}`.trim(),
                    bio: bio,
                });
            }

            showAlert('Profile information updated successfully!');
        } catch (error) {
            showAlert(error.message || 'Failed to update profile.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getInitials = useCallback(() => {
        const fullName = user?.name || `${firstName} ${lastName}`.trim() || 'User';
        const parts = fullName.split(' ');
        if (parts.length > 1) {
            return parts.map(n => n[0]).join('').toUpperCase().substring(0, 2);
        }
        return fullName.charAt(0).toUpperCase();
    }, [user, firstName, lastName]);


    const renderProfilePictureSection = () => {
        const initials = getInitials();

        return (
            <div className="flex flex-col items-center space-y-6">
                {/* Profile Picture Preview */}
                <div className="relative group">
                    <div className="relative">
                        {/* Profile Picture Image */}
                        <img
                            src={profilePicture ? `${profilePicture}?${user?.updatedAt || Date.now()}` : ''}
                            alt="Profile"
                            className={`w-40 h-40 rounded-full object-cover border-4 border-primary-500/30 shadow-2xl transition-all duration-300 group-hover:border-primary-500/50 ${profilePicture ? 'block' : 'hidden'
                                }`}
                            onError={(e) => {
                                // Hide image and show fallback initials
                                e.target.style.display = 'none';
                                const fallback = e.target.parentElement?.querySelector('.profile-fallback');
                                if (fallback) {
                                    fallback.classList.remove('hidden');
                                    fallback.classList.add('flex');
                                }
                            }}
                            onLoad={(e) => {
                                // Show image and hide fallback
                                e.target.style.display = 'block';
                                const fallback = e.target.parentElement?.querySelector('.profile-fallback');
                                if (fallback) {
                                    fallback.classList.remove('flex');
                                    fallback.classList.add('hidden');
                                }
                            }}
                            key={profilePicture} // Force re-render when URL changes
                        />

                        {/* Fallback initials */}
                        <div className={`profile-fallback w-40 h-40 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center border-4 border-primary-500/30 shadow-2xl transition-all duration-300 group-hover:border-primary-500/50 ${profilePicture ? 'hidden' : 'flex'
                            }`}>
                            <span className="text-4xl font-bold text-white">
                                {initials}
                            </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <i data-feather="camera" className="w-8 h-8 text-white"></i>
                        </div>
                    </div>

                    {/* Camera Button */}
                    <button
                        type="button"
                        onClick={handlePhotoChange}
                        disabled={isUploading || loading}
                        className="absolute -bottom-2 -right-2 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-2xl transition-all duration-200 disabled:opacity-50 group-hover:scale-110"
                        title="Change profile picture"
                    >
                        <i data-feather="camera" className="w-5 h-5"></i>
                    </button>
                </div>

                {/* Profile Picture Actions */}
                <div className="flex flex-col space-y-3 w-full max-w-xs">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            {profilePicture ? 'Update your profile photo' : 'Add a profile photo'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            JPG, PNG or WebP (max 5MB)
                        </p>
                    </div>

                    {/* Upload Progress */}
                    {(isUploading || loading) && (
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <i data-feather="loader" className="w-4 h-4 animate-spin"></i>
                            <span>{isUploading ? 'Uploading...' : 'Saving...'}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <i data-feather="loader" className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-4"></i>
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                id="file-input"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onChange={handleFileInputChange}
            />

            {/* Mobile Header */}
            <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 mr-3"
                    >
                        <i data-feather="arrow-left" className="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h1>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                >
                    <i data-feather={isMobileMenuOpen ? "x" : "menu"} className="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
                </button>
            </div>

            <main className="flex-grow py-6 md:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-center mb-8">
                        <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                            <i data-feather="arrow-left" className="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
                        </button>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                            <i data-feather="settings" className="w-6 h-6 md:w-8 md:h-8 mr-3 text-primary-500"></i> Account Settings
                        </h1>
                    </div>

                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                        <div className="p-6 lg:p-8">
                            {/* Alert Message */}
                            {alertMessage && (
                                <div className={`p-4 mb-6 rounded-lg border ${alertMessage.type === 'error'
                                        ? 'bg-red-100 dark:bg-red-500/20 border-red-300 dark:border-red-500 text-red-700 dark:text-red-100'
                                        : 'bg-green-100 dark:bg-primary-500/20 border-green-300 dark:border-primary-500 text-green-700 dark:text-primary-100'
                                    }`}>
                                    <div className="flex items-center">
                                        <i data-feather={alertMessage.type === 'error' ? 'alert-triangle' : 'check-circle'} className="w-5 h-5 mr-3"></i>
                                        <p className="text-sm font-medium">{alertMessage.message}</p>
                                    </div>
                                </div>
                            )}

                            {/* Profile Content */}
                            <div>
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>

                                <div className="flex flex-col lg:flex-row lg:space-x-8">
                                    {/* Left Side: Profile Picture Section */}
                                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-xl p-6 border border-indigo-200/50 dark:border-gray-600/50">
                                            {renderProfilePictureSection()}
                                        </div>
                                    </div>

                                    {/* Right Side: Form */}
                                    <div className="lg:w-2/3">
                                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                                            {/* Full Name */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                                                    <input
                                                        type="text"
                                                        id="firstName"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        placeholder="Coder"
                                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                                        disabled={loading}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                                                    <input
                                                        type="text"
                                                        id="lastName"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        placeholder="User"
                                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={user.email}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                                    disabled
                                                />
                                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">Your registered email address (cannot be changed)</p>
                                            </div>

                                            {/* Bio */}
                                            <div>
                                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                                                <textarea
                                                    id="bio"
                                                    value={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                    rows="4"
                                                    placeholder="Tell us about yourself..."
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-colors"
                                                    disabled={loading}
                                                ></textarea>
                                            </div>

                                            {/* Save Button */}
                                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <button
                                                    type="submit"
                                                    disabled={loading || isUploading}
                                                    className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium transition-colors duration-200 disabled:opacity-50 flex items-center"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <i data-feather="loader" className="animate-spin mr-2 w-4 h-4"></i>
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i data-feather="save" className="mr-2 w-4 h-4"></i>
                                                            Save Changes
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Cropper Modal */}
            {isCropModalOpen && originalImage && (
                <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/80">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-300 dark:border-gray-600">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Crop Profile Picture</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Drag the crop area to position or resize using the corner handle, then click Apply
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={cancelCrop}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                                disabled={isUploading}
                            >
                                <i data-feather="x" className="w-5 h-5"></i>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <div className="h-[400px] w-[400px] flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded overflow-hidden relative">
                                    {/* Full image with circular mask */}
                                    <div className="relative w-full h-full overflow-hidden rounded">
                                        <img
                                            ref={imageRef}
                                            src={originalImage}
                                            alt="Crop preview"
                                            className="absolute max-w-none max-h-none"
                                            style={{
                                                left: `${(400 - imageDimensions.width * scale) / 2}px`,
                                                top: `${(400 - imageDimensions.height * scale) / 2}px`,
                                                transform: `scale(${scale})`,
                                                transformOrigin: 'top left'
                                            }}
                                            draggable={false}
                                        />
                                        {/* Circular mask overlay */}
                                        <div className="absolute inset-0 rounded">
                                            <div
                                                className="absolute border-2 border-white shadow-lg rounded-full cursor-move"
                                                style={{
                                                    left: `${(400 - imageDimensions.width * scale) / 2 + crop.x * scale}px`,
                                                    top: `${(400 - imageDimensions.height * scale) / 2 + crop.y * scale}px`,
                                                    width: `${crop.width * scale}px`,
                                                    height: `${crop.width * scale}px`,
                                                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                                                }}
                                                onMouseDown={handleMouseDown}
                                            >
                                            </div>
                                            {/* Resize handle */}
                                            <div
                                                className="absolute w-4 h-4 bg-white border border-gray-400 cursor-se-resize rounded-sm"
                                                style={{
                                                    left: `${(400 - imageDimensions.width * scale) / 2 + crop.x * scale + crop.width * scale - 8}px`,
                                                    top: `${(400 - imageDimensions.height * scale) / 2 + crop.y * scale + crop.width * scale - 8}px`
                                                }}
                                                onMouseDown={handleResizeMouseDown}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hidden canvas for processing */}
                            <canvas ref={canvasRef} className="hidden" />

                            {/* Controls */}
                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center space-x-2">
                                        <i data-feather="move" className="w-4 h-4"></i>
                                        <span>Drag the circle to move or resize</span>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={cancelCrop}
                                        disabled={isUploading}
                                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 flex items-center"
                                    >
                                        <i data-feather="x" className="w-4 h-4 mr-2"></i>
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={applyCrop}
                                        disabled={isUploading}
                                        className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 border border-transparent text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center"
                                    >
                                        {isUploading ? (
                                            <>
                                                <i data-feather="loader" className="animate-spin mr-2 w-4 h-4"></i>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <i data-feather="check" className="w-4 h-4 mr-2"></i>
                                                Apply
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;