// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEwk1ABX5-Sm2Bn2jWg3MYr2T_3fOPpzs",
  authDomain: "cs-studio-24649.firebaseapp.com",
  projectId: "cs-studio-24649",
  storageBucket: "cs-studio-24649.firebasestorage.app",
  messagingSenderId: "459930090968",
  appId: "1:459930090968:web:6dd776f9b0f936a249c6ad",
  measurementId: "G-WVE710VWXD"
};

import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
// Only initialize analytics in browser environment and (optional) specific environments
if (typeof window !== 'undefined') {
  // You might want to skip analytics on localhost to avoid pollution
  if (window.location.hostname !== 'localhost') {
    analytics = getAnalytics(app);
  }
}

const db = getFirestore(app);
// Ensure we get the auth instance correctly
const auth = getAuth(app);

export { app, analytics, db, auth };
