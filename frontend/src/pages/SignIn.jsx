
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import * as feather from 'feather-icons';
import { auth } from '../config/firebase.js';

import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, signOut } from 'firebase/auth';

const SignIn = () => {
  const { isLoggedIn } = useAuth(); // Auth state handled by Context now
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: null, text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    feather.replace();
  }, [message, showPassword, loading]);

  // --- Utility Functions ---

  const showMessage = (type, text) => {
    setMessage({ type, text });
    if (type === 'success') {
      setTimeout(() => setMessage({ type: null, text: '' }), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // --- Password Reset ---
  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default link behavior
    const { email } = formData;
    if (!email) {
      showMessage('error', 'Please enter your email address to reset password.');
      return;
    }

    setLoading(true);
    setMessage({ type: null, text: '' }); // Clear previous messages

    try {
      await sendPasswordResetEmail(auth, email);
      showMessage('success', 'Password reset email sent! Check your inbox.');
    } catch (error) {
      console.error('[SignIn] Password reset error:', error.code, error.message);
      let msg = 'Failed to send reset email.';
      if (error.code === 'auth/user-not-found') msg = 'No account found with this email.';
      if (error.code === 'auth/invalid-email') msg = 'Invalid email address.';
      showMessage('error', msg);
    } finally {
      setLoading(false);
    }
  };

  // --- Core Authentication Handlers ---

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: null, text: '' });

    const { email, password } = formData;

    if (!email || !password) {
      showMessage('error', 'Please fill in all fields');
      setLoading(false);
      return;
    }

    console.log('[SignIn] Attempting login for:', email);

    try {
      // Use Firebase Client SDK
      console.log('Attempting Firebase Sign In for:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Firebase Sign In Successful:', user.uid);

      if (!user.emailVerified) {
        console.warn('User email not verified. preventing login.');
        await signOut(auth);
        showMessage('error', 'Please verify your email before logging in.');
        return;
      }

      // We rely on AuthContext onAuthStateChanged to pick up the change
      showMessage('success', 'Signed in successfully!');
      // Navigation handled by AuthContext listener or explicit here
      setTimeout(() => navigate('/'), 1000);

    } catch (error) {
      console.error('[SignIn] Login error:', error.code, error.message);
      let errorMsg = 'Invalid credentials';
      if (error.code === 'auth/user-not-found') errorMsg = 'No user found with this email.';
      if (error.code === 'auth/wrong-password') errorMsg = 'Incorrect password.';
      if (error.code === 'auth/invalid-email') errorMsg = 'Invalid email format.';
      if (error.code === 'auth/too-many-requests') errorMsg = 'Too many failed attempts. Try again later.';

      showMessage('error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // --- Google Sign In Handler ---
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage({ type: null, text: '' });
    console.log('[SignIn] Starting Google Auth...');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('[SignIn] Google Auth Success:', user.uid, user.email);
      console.log('[SignIn] User is new?', result._tokenResponse?.isNewUser);

      showMessage('success', 'Signed in with Google! Redirecting...');
      setTimeout(() => navigate('/'), 1000); // AuthContext will also catch this state change

    } catch (error) {
      console.error('[SignIn] Google Auth Error:', error.code, error.message);
      let errorMsg = 'Google authentication failed.';
      if (error.code === 'auth/popup-closed-by-user') errorMsg = 'Sign-in cancelled.';
      if (error.code === 'auth/popup-blocked') errorMsg = 'Popup blocked. Please allow popups.';

      showMessage('error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // --- Component Render ---

  return (
    <div className="min-h-screen dark-gradient-secondary flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT COLUMN: Informational Content */}
        <div className="hidden lg:block">
          <div className="max-w-md space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <i data-feather="code" className="text-white text-xl"></i>
              </div>
              <span className="text-3xl font-bold nav-user-text">CS Studio</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                Continue your coding journey and track your progress
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <i data-feather="book-open" className="text-primary-400 w-6 h-6"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Resume Learning</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Pick up where you left off</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <i data-feather="award" className="text-primary-400 w-6 h-6"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Track Progress</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Monitor your skill growth</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <i data-feather="users" className="text-primary-400 w-6 h-6"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Join Community</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Connect with learners</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sign In Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
                <i data-feather="code" className="text-white"></i>
              </div>
              <span className="text-xl font-bold nav-user-text">CS Studio</span>
            </Link>
          </div>

          <div className="dark-glass rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Sign In</h2>
              <p className="text-sm text-gray-400">Access your dashboard</p>
            </div>

            {/* Message Display */}
            {message.type && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success'
                    ? 'bg-green-500/20 border border-green-500 text-green-100'
                    : 'bg-red-500/20 border border-red-500 text-red-100'
                  }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleEmailSignIn} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400">
                    <i data-feather="mail" className="w-5 h-5"></i>
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input w-full pl-12 pr-4 py-3.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="Email Address"
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400">
                    <i data-feather="lock" className="w-5 h-5"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input w-full pl-12 pr-12 py-3.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="Password"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={loading}
                  >
                    <i
                      data-feather={showPassword ? 'eye-off' : 'eye'}
                      className="w-5 h-5"
                    ></i>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-primary-400 hover:text-primary-300">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i data-feather="loader" className="w-5 h-5 animate-spin"></i>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="text-gray-400 text-sm">Or</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3.5 bg-white text-gray-900 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              <span>Continue with Google</span>
            </button>



            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-6">
            By signing in, you agree to our{' '}
            <a href="#" className="underline hover:text-gray-400">Terms</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-gray-400">Privacy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;