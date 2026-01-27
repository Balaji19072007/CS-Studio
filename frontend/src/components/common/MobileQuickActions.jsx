import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, Edit2 } from 'lucide-react';

const MobileQuickActions = ({ onOpenChat }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-24 right-0 z-50 md:hidden flex items-center">

            {/* Sliding Menu Items */}
            <div
                className={`flex items-center gap-3 mr-4 transition-all duration-300 transform origin-right ${isOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-0 pointer-events-none'
                    }`}
            >
                {/* Code Editor Button */}
                <Link
                    to="/code"
                    className="w-10 h-10 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors border border-white/10"
                    title="Code Editor"
                >
                    <Edit2 className="w-4 h-4" />
                </Link>

                {/* Chatbot Button */}
                <button
                    onClick={() => {
                        onOpenChat();
                        setIsOpen(false);
                    }}
                    className="w-10 h-10 rounded-full bg-primary-600 text-white shadow-lg flex items-center justify-center hover:bg-primary-700 transition-colors border border-white/10"
                    title="Chatbot"
                >
                    <MessageCircle className="w-4 h-4" />
                </button>
            </div>

            {/* Toggle Trigger (Side Tab) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-8 h-12 bg-gray-900/80 backdrop-blur-md text-white rounded-l-xl shadow-lg border-y border-l border-white/10 active:scale-95 transition-all`}
            >
                {isOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
        </div>
    );
};

export default MobileQuickActions;
