// src/pages/Code.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CodeEditor from '../components/problems/CodeEditor.jsx'; 
import * as feather from 'feather-icons';
import socketService from '../services/socketService.js';

const Code = () => {
    const navigate = useNavigate(); 
    const [isDark, setIsDark] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    
    useEffect(() => {
        feather.replace();
        
        const checkTheme = () => {
            setIsDark(document.body.classList.contains('dark-theme'));
        };
        
        checkTheme();
        
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        
        return () => observer.disconnect();
    }, []);
    
    // Initialize socket service when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !socketService.isConnected) {
            console.log('🔌 Initializing socket service for freeform playground...');
            socketService.connect(token);
        }

        // Listen for connection status changes
        const updateStatus = () => {
            setConnectionStatus(socketService.isConnected ? 'connected' : 'disconnected');
        };

        // Initial status
        updateStatus();

        // Check status periodically
        const statusInterval = setInterval(updateStatus, 2000);

        return () => {
            clearInterval(statusInterval);
        };
    }, []);
    
    const handleGoBack = () => {
        navigate(-1);
    };

    const handleRetryConnection = () => {
        const token = localStorage.getItem('token');
        if (token) {
            socketService.manualReconnect();
        }
    };
    
    // Theme-aware classes for button appearance
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const cardBorder = isDark ? 'border-gray-700' : 'border-gray-300';
    const textPrimary = isDark ? 'text-white' : 'text-gray-900';
    const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
    
    // Determine Monaco theme based on current theme
    const monacoTheme = isDark ? 'vs-dark' : 'vs-light';

    return (
        <div className="min-h-screen flex flex-col dark-gradient-secondary p-4 sm:p-6 lg:p-8 relative">
            
            {/* --- GO BACK BUTTON (TOP LEFT) --- */}
            <button 
                onClick={handleGoBack}
                className={`absolute top-10 left-4 sm:left-6 lg:left-8 dark-btn-secondary inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium z-40 border ${cardBorder} ${cardBg} ${textSecondary} hover:${textPrimary}`}
            >
                <i data-feather="arrow-left" className="w-4 h-4 mr-2"></i> Go Back
            </button>
            
            <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col pt-12"> 
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
                    <i data-feather="terminal" className="w-7 h-7 mr-3 text-primary-500"></i>
                    Freeform Code Playground
                </h1>
                <p className="text-gray-400 mb-4">Run quick tests and experiments across supported languages (C, Python, Java...) using our real-time compiler service.</p>
                
                {/* Connection Status Indicator */}
                <div className="mb-4 flex items-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        connectionStatus === 'connected' 
                            ? 'bg-green-600/30 text-green-300' 
                            : connectionStatus === 'connecting'
                            ? 'bg-yellow-600/30 text-yellow-300'
                            : 'bg-red-600/30 text-red-300'
                    }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                            connectionStatus === 'connected' 
                                ? 'bg-green-400 animate-pulse' 
                                : connectionStatus === 'connecting'
                                ? 'bg-yellow-400 animate-pulse'
                                : 'bg-red-400'
                        }`}></div>
                        {connectionStatus === 'connected' 
                            ? 'Compiler Connected' 
                            : connectionStatus === 'connecting'
                            ? 'Connecting to Compiler...'
                            : 'Compiler Disconnected'
                        }
                    </div>
                    {connectionStatus !== 'connected' && (
                        <button 
                            onClick={handleRetryConnection}
                            className="ml-2 inline-flex items-center px-2 py-1 rounded text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            <i data-feather="refresh-cw" className="w-3 h-3 mr-1"></i> Retry
                        </button>
                    )}
                </div>
                
                {/* Editor fills the height of the container */}
                <div className="flex-grow min-h-0 h-[calc(100vh-14rem)] lg:h-[calc(100vh-10rem)]">
                    <CodeEditor theme={monacoTheme} />
                </div>
            </div>
            
            {/* FAB Button to Problems */}
            <Link 
                to="/problems" 
                className="fixed bottom-6 right-6 dark-btn inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium z-50"
            >
                <i data-feather="book" className="w-4 h-4 mr-2"></i> Browse Problems
            </Link>
        </div>
    );
};

export default Code;