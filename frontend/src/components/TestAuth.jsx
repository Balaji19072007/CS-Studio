import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const TestAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [user, setUser] = useState(null);

    const log = (msg) => {
        console.log(`[TestAuth] ${msg}`);
        setStatus(prev => prev + '\n' + msg);
    };

    const handleSignup = async () => {
        log('Attempting Signup...');
        try {
            if (!email || !password) throw new Error('Email/Pass required');
            const uc = await createUserWithEmailAndPassword(auth, email, password);
            log('Signup Success: ' + uc.user.uid);
            setUser(uc.user);
        } catch (e) {
            log('Signup Error: ' + e.code + ' - ' + e.message);
            console.error(e);
        }
    };

    const handleLogin = async () => {
        log('Attempting Login...');
        try {
            if (!email || !password) throw new Error('Email/Pass required');
            const uc = await signInWithEmailAndPassword(auth, email, password);
            log('Login Success: ' + uc.user.uid);
            setUser(uc.user);
        } catch (e) {
            log('Login Error: ' + e.code + ' - ' + e.message);
            console.error(e);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            log('Logged out');
            setUser(null);
        } catch (e) {
            log('Logout Error: ' + e.message);
        }
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded m-4 border border-blue-500">
            <h2 className="text-xl font-bold mb-2">Firebase Auth Tester</h2>
            <div className="flex gap-2 mb-2">
                <input
                    className="text-black p-1"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="text-black p-1"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="flex gap-2 mb-2">
                <button className="bg-green-600 px-3 py-1 rounded" onClick={handleSignup}>Sign Up</button>
                <button className="bg-blue-600 px-3 py-1 rounded" onClick={handleLogin}>Log In</button>
                <button className="bg-red-600 px-3 py-1 rounded" onClick={handleLogout}>Log Out</button>
            </div>
            <div className="bg-black p-2 font-mono text-xs whitespace-pre-wrap h-32 overflow-auto">
                {status}
            </div>
            {user && <div className="text-green-400 mt-2">Current User: {user.email} ({user.uid})</div>}
        </div>
    );
};

export default TestAuth;
