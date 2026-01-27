// frontend/src/components/common/CodeEditorFloatingIcon.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as feather from 'feather-icons';

const CodeEditorFloatingIcon = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        feather.replace();
    }, [isMobile]); // Re-run feather when visibility changes

    if (isMobile) return null;

    return (
        <Link
            to="/code"
            className="fixed bottom-24 right-6 h-14 w-14 rounded-full dark-gradient-accent text-white hidden md:flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl z-50"
            title="Code Editor - Freeform Playground"
        >
            <i data-feather="edit-3" className="h-6 w-6"></i>
        </Link>
    );
};

export default CodeEditorFloatingIcon;
