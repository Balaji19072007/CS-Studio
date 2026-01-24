// backend/config/firebase.js
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
require('dotenv').config();

// Use the configuration provided by the user
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "cs-studio-24649.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "cs-studio-24649",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "cs-studio-24649.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "539956380628",
    appId: process.env.FIREBASE_APP_ID || "1:539956380628:web:757041770c6bc230e53a2a",
    measurementId: "G-654321"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

console.log('✅ Firebase Client SDK Initialized');

module.exports = { app, db };
