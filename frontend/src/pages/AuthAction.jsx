import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../config/firebase';
import { verifyPasswordResetCode, confirmPasswordReset, applyActionCode, checkActionCode } from 'firebase/auth';
import * as feather from 'feather-icons';

const AuthAction = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Robust parameter parsing
    const getParam = (name) => {
        // 1. Try React Router params (standard)
        let val = searchParams.get(name);
        if (val) return val;

        // 2. Try parsing window.location.search (query params before hash)
        const urlParams = new URLSearchParams(window.location.search);
        val = urlParams.get(name);
        if (val) return val;

        // 3. Try parsing from the hash string itself if it's mixed (e.g. #/auth?mode=...)
        // This is essentially what useSearchParams does for HashRouter, but being explicit.
        const hash = window.location.hash;
        const hashParams = new URLSearchParams(hash.split('?')[1]);
        val = hashParams.get(name);

        return val;
    };

    const mode = getParam('mode');
    const oobCode = getParam('oobCode');

    // Debugging
    useEffect(() => {
        console.log('Action Page URL:', window.location.href);
        console.log('Detected Mode:', mode);
        console.log('Detected Code:', oobCode);
    }, [mode, oobCode]);

    // State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Password Reset State
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState(''); // To show who we are resetting for
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        feather.replace();
    }, [loading, error, successMessage, showPassword]);

    useEffect(() => {
        if (!oobCode) {
            setError('Invalid link. No code found.');
            setLoading(false);
            return;
        }

        // Handle initial verification based on mode
        const verifyCode = async () => {
            try {
                switch (mode) {
                    case 'resetPassword':
                        // Verify the code and get the email
                        const email = await verifyPasswordResetCode(auth, oobCode);
                        setEmail(email);
                        setLoading(false); // Ready to show password reset form
                        break;

                    case 'verifyEmail':
                        // Auto-verify for email verification
                        await applyActionCode(auth, oobCode);
                        setSuccessMessage('Your email has been verified successfully.');
                        setLoading(false);
                        setTimeout(() => navigate('/signin'), 3000);
                        break;

                    // Add other modes like 'recoverEmail' if needed
                    default:
                        setError('Invalid mode.');
                        setLoading(false);
                }
            } catch (err) {
                console.error('Action code error:', err);
                setError(translateFirebaseError(err.code));
                setLoading(false);
            }
        };

        verifyCode();
    }, [mode, oobCode, navigate]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setSuccessMessage('Password has been reset successfully! Redirecting to login...');
            setTimeout(() => navigate('/signin'), 3000);
        } catch (err) {
            console.error('Reset password error:', err);
            setError(translateFirebaseError(err.code));
        } finally {
            setLoading(false);
        }
    };

    const translateFirebaseError = (code) => {
        switch (code) {
            case 'auth/expired-action-code': return 'The link has expired. Please request a new one.';
            case 'auth/invalid-action-code': return 'The link is invalid or has already been used.';
            case 'auth/user-disabled': return 'The user account has been disabled.';
            case 'auth/user-not-found': return 'User not found.';
            case 'auth/weak-password': return 'Password is too weak.';
            default: return 'An error occurred. Please try again.';
        }
    };

    if (loading && !email && mode === 'resetPassword') {
        // Loading state for initial verification
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Verifying link...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        CS
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {mode === 'resetPassword' ? 'Reset Password' : 'Action Complete'}
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    {error && (
                        <div className="rounded-md bg-red-50 p-4 mb-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <i data-feather="alert-circle" className="h-5 w-5 text-red-400"></i>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <button onClick={() => navigate('/signin')} className="font-medium underline hover:text-red-600">
                                            Go back to Sign In
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {successMessage && (
                        <div className="rounded-md bg-green-50 p-4 mb-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <i data-feather="check-circle" className="h-5 w-5 text-green-400"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">{successMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!error && !successMessage && mode === 'resetPassword' && (
                        <form className="space-y-6" onSubmit={handleResetPassword}>
                            <p className="text-sm text-gray-600 text-center mb-4">
                                Set a new password for <strong>{email}</strong>
                            </p>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md py-3 pl-3"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i data-feather={showPassword ? 'eye-off' : 'eye'} className="h-5 w-5 text-gray-400"></i>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {loading ? 'Reseting...' : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AuthAction;
