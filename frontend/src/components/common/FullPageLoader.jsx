import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const FullPageLoader = ({ message = 'CS Studio' }) => {
    const { isDark } = useTheme();

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-[#0F172A]' : 'bg-white'
            }`}>

            {/* Morphing Shape Animation */}
            <div className="relative mb-10">
                {/* Visual Glow/Blur */}
                <div className={`absolute inset-0 blur-2xl opacity-50 ${isDark ? 'bg-blue-600' : 'bg-blue-200'
                    } animate-pulse rounded-full`}></div>

                {/* The Shape */}
                <div className={`w-16 h-16 relative z-10 animate-morph-spin ${isDark ? 'bg-gradient-to-tr from-blue-500 to-indigo-500' : 'bg-gradient-to-tr from-blue-600 to-indigo-600'
                    } shadow-2xl`}></div>
            </div>

            {/* Minimalist Professional Text */}
            <div className="text-center">
                <h1 className={`text-sm font-bold tracking-[0.3em] uppercase ${isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                    {message}
                </h1>
                <p className={`mt-2 text-[10px] tracking-widest uppercase opacity-50 ${isDark ? 'text-white' : 'text-black'
                    }`}>
                    Loading Environment
                </p>
            </div>

            {/* Custom Keyframes */}
            <style>{`
                @keyframes morphSpin {
                    0% {
                        transform: rotate(0deg);
                        border-radius: 50%;
                    }
                    25% {
                        transform: rotate(90deg);
                        border-radius: 0%;
                    }
                    50% {
                        transform: rotate(180deg);
                        border-radius: 50%;
                    }
                    75% {
                        transform: rotate(270deg);
                        border-radius: 0%;
                    }
                    100% {
                        transform: rotate(360deg);
                        border-radius: 50%;
                    }
                }
                .animate-morph-spin {
                    animation: morphSpin 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default FullPageLoader;
