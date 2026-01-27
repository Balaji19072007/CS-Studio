// frontend/src/components/common/CSMentorWidget.jsx
import React, { useState, useEffect, useRef } from 'react';
import * as feather from 'feather-icons';

const CSMentorWidget = ({ isOpen: externalIsOpen, onToggle }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    // Use external state if provided, otherwise internal
    const isControlled = typeof externalIsOpen !== 'undefined';
    const isOpen = isControlled ? externalIsOpen : internalIsOpen;

    const toggleChat = () => {
        if (isControlled && onToggle) {
            onToggle(!isOpen);
        } else {
            setInternalIsOpen(!internalIsOpen);
        }
        setError(null);
    };
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! 👋 I\'m CS Mentor, your AI coding assistant. Ask me anything about programming, algorithms, data structures, or computer science concepts!',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const [error, setError] = useState(null);
    const [conversationHistory, setConversationHistory] = useState([]);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Initialize feather icons
    useEffect(() => {
        feather.replace();
    }, [isOpen, messages, isLoading]);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when popup opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);



    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: inputMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const newHistory = [...conversationHistory, { role: 'user', content: inputMessage }];
        setConversationHistory(newHistory);
        setInputMessage('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat/cs-mentor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputMessage,
                    conversationHistory: newHistory.slice(-10) // Keep last 10 messages for context
                })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to get response');
            }

            const aiResponse = {
                role: 'assistant',
                content: data.reply,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
            setConversationHistory(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to get response. Please try again.');

            const errorMessage = {
                role: 'assistant',
                content: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.',
                timestamp: new Date(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            {/* Floating Icon Button - Hidden on mobile, handled by QuickActions */}
            {!isMobile && (
                <button
                    onClick={toggleChat}
                    className="fixed bottom-24 md:bottom-6 right-6 h-14 w-14 rounded-full bg-white dark:bg-gray-800 shadow-xl text-gray-900 dark:text-white hidden md:flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 hover:shadow-2xl hover:bg-gray-50 dark:hover:bg-gray-700"
                    title="CS Mentor - AI Coding Assistant"
                >
                    {isOpen ? (
                        <i data-feather="x" className="h-6 w-6 text-gray-900 dark:text-white"></i>
                    ) : (
                        <i data-feather="message-circle" className="h-6 w-6 text-gray-900 dark:text-white"></i>
                    )}
                </button>
            )}

            {/* Chat Popup */}
            {isOpen && (
                <div className="fixed bottom-40 md:bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] md:h-[600px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col z-50 animate-slide-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <i data-feather="cpu" className="h-5 w-5"></i>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">CS Mentor</h3>
                                <p className="text-xs text-primary-100">AI Coding Assistant</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
                        >
                            <i data-feather="minimize-2" className="h-4 w-4"></i>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                        ? 'bg-primary-500 text-white'
                                        : message.isError
                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700'
                                            : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    <p className={`text-xs mt-1 ${message.role === 'user'
                                        ? 'text-primary-100'
                                        : 'text-gray-500 dark:text-gray-400'
                                        }`}>
                                        {formatTime(message.timestamp)}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="px-4 py-2 bg-red-50/90 dark:bg-red-900/20 backdrop-blur-sm border-t border-red-200 dark:border-red-800">
                            <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything..."
                                disabled={isLoading}
                                className="flex-1 px-4 py-2.5 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 text-sm"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className="px-4 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                <i data-feather="send" className="h-4 w-4"></i>
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Press Enter to send • Esc to close
                        </p>
                    </div>
                </div>
            )}


            <style>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default CSMentorWidget;
