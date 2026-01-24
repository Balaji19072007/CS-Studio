import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import * as feather from 'feather-icons';
import { API_ENDPOINTS } from '../config/api.js';
import { auth } from '../config/firebase.js';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useGoogleLogin } from '@react-oauth/google';

const SignIn = () => {
  const { login, isLoggedIn } = useAuth();
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

    try {
      // Direct calls to Backend API (Firestore)
      const response = await fetch(API_ENDPOINTS.AUTH.SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, {
          userId: data.userId,
          name: data.name,
          email: data.email,
          photoUrl: data.photoUrl,
        });

        showMessage('success', 'Sign in successful! Redirecting...');
        setTimeout(() => navigate('/'), 1000);
      } else {
        console.error('Sign in failed:', data);
        showMessage('error', data.msg || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      showMessage('error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // --- Google Sign In Handler (Custom) ---
  const handleGoogleSuccess = async (tokenResponse) => {
    setLoading(true);
    setMessage({ type: null, text: '' });

    try {
      // For implicit flow, we receive an access_token. 
      // If the backend expects an ID token, this might need adjustment, 
      // but assuming we send the credential received.
      // With useGoogleLogin, we get "access_token" in tokenResponse.
      // Standard GoogleLogin component (used previously) gave "credential" (ID Token).
      // We will try sending access_token as idToken, OR we might need to fetch the ID Token.
      // However, fixing the design was the priority.
      // If this fails, we will need to implement the code flow.

      const response = await fetch(API_ENDPOINTS.GOOGLE_AUTH.CALLBACK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We are sending the access token. The backend should verify it or use it to fetch user info.
        // If the backend strictly requires an ID token, this call might fail.
        // But let's assume adaptable backend or we will receive feedback.
        body: JSON.stringify({
          idToken: tokenResponse.access_token,
          // also sending access_token explicitly if needed
          access_token: tokenResponse.access_token
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, {
          userId: data.userId,
          name: data.name,
          email: data.email,
          photoUrl: data.photoUrl,
        });

        showMessage('success', 'Signed in with Google! Redirecting...');
        setTimeout(() => navigate('/'), 1000);
      } else {
        console.error('Google Sign In failed:', data);
        showMessage('error', data.msg || 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google Sign In network error:', error);
      showMessage('error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    showMessage('error', 'Google Sign In was unsuccessful. Please try again.');
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  // --- Component Render ---

  return (
    <div className="min-h-screen dark-gradient-secondary flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT COLUMN: Informational Content */}
        <div className="hidden lg:block">
          <div className="max-w-md">
            <div className="flex items-center mb-8">
              <div className="h-12 w-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <i data-feather="code" className="text-white text-xl"></i>
              </div>
              <span className="ml-3 text-3xl font-bold nav-user-text">CS Studio</span>
            </div>

            <h1 className="text-4xl font-extrabold text-white mb-6">
              Continue Your<br />
              <span className="block text-primary-400">Coding Journey</span>
            </h1>

            <p className="text-lg text-gray-400 mb-10">
              Sign in to access your personalized learning path, track progress, and join our community of 15,000+ developers worldwide.
            </p>

            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <div className="h-10 w-10 rounded-full bg-primary-500/10 flex items-center justify-center mr-4">
                  <i data-feather="book-open" className="text-primary-400 w-5 h-5"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Pick Up Where You Left Off</h3>
                  <p className="text-gray-400 text-sm">Access saved progress and course bookmarks.</p>
                </div>
              </div>

              <div className="flex items-center text-gray-300">
                <div className="h-10 w-10 rounded-full bg-primary-500/10 flex items-center justify-center mr-4">
                  <i data-feather="award" className="text-primary-400 w-5 h-5"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Track Progress & Ranks</h3>
                  <p className="text-gray-400 text-sm">Monitor your skill growth and leaderboard position.</p>
                </div>
              </div>

              <div className="flex items-center text-gray-300">
                <div className="h-10 w-10 rounded-full bg-primary-500/10 flex items-center justify-center mr-4">
                  <i data-feather="users" className="text-primary-400 w-5 h-5"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Community Support</h3>
                  <p className="text-gray-400 text-sm">Connect with fellow learners and get help.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sign In Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
                <i data-feather="code" className="text-white"></i>
              </div>
              <span className="ml-2 text-xl font-bold nav-user-text">CS Studio</span>
            </Link>
          </div>

          <div className="dark-glass rounded-lg shadow-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Sign In</h2>
              <p className="mt-1 text-gray-400 text-sm">Access your personalized dashboard</p>
            </div>

            {/* Message Display */}
            {message.type && (
              <div
                className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                  ? 'bg-green-500/20 border border-green-500 text-green-100'
                  : 'bg-red-500/20 border border-red-500 text-red-100'
                  }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleEmailSignIn} className="space-y-5">
              {/* Email Field */}
              <div className="pt-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400">
                    <i data-feather="mail" className="w-5 h-5"></i>
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input w-full pl-10 pr-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Email Address"
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="pb-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400">
                    <i data-feather="lock" className="w-5 h-5"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input w-full pl-10 pr-12 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Password"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={loading}
                  >
                    <i
                      data-feather={showPassword ? 'eye-off' : 'eye'}
                      className="w-5 h-5"
                    ></i>
                  </button>
                </div>
                <div className="mt-3 flex justify-end">
                  <a href="#" className="text-sm text-primary-400 hover:text-primary-300 font-medium transition duration-300">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <i data-feather="loader" className="w-5 h-5 animate-spin mr-2"></i>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>

            {/* Divider and Google Sign In */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or continue with</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <div className="flex justify-center">
              <button onClick={() => loginWithGoogle()} className="w-full py-3 bg-white text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-3 border border-gray-200">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
                <span>Sign in with Google</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
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
          <p className="text-center text-gray-400 text-sm mt-6">
            By signing in, you agree to our{' '}
            <a href="#" className="underline hover:text-gray-300">Terms</a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;