import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const BACKEND_APIS_MOBILE_DEVELOPMENT_ROADMAP = {
  "id": "backend-apis-mobile-dev",
  "title": "🧭 Backend & APIs for Mobile Development Roadmap",
  "description": "Learn to build and integrate backend services for mobile apps — including authentication, databases, REST APIs, cloud services, and real-time features.",
  "short_description": "Learn to build and integrate backend services for mobile apps — including authentication, databases, REST APIs, cloud services, and real-time features.",
  "prerequisites": ["Mobile Development basics", "Backend Development fundamentals"],
  "estimated_hours": 120,
  "difficulty": "Intermediate to Advanced",
  "category": "Mobile Development",
  "phases": [
    {
      "phase": 1,
      "title": "Backend Fundamentals for Mobile",
      "goal": "Understand backend concepts and how mobile apps communicate with servers",
      "weeks": "Week 10",
      "topics": [
        "What is a backend?",
        "REST API basics",
        "HTTP methods (GET, POST, PUT, DELETE)",
        "JSON format",
        "API endpoints & routing",
        "Client–server architecture",
        "Status codes (200, 400, 500)",
        "API authentication basics"
      ],
      "practice": [
        "Consume a dummy API in mobile app",
        "Build a sample endpoint in Node.js / Firebase Cloud Functions",
        "Create a JSON mock server (json-server)"
      ]
    },
    {
      "phase": 2,
      "title": "Building REST APIs",
      "goal": "Build APIs using Node.js/Express or Firebase Functions",
      "weeks": "Week 10-11",
      "topics": [
        "Project structure (controllers, services)",
        "Routing",
        "Middleware",
        "Environment variables",
        "Error handling",
        "JWT authentication",
        "File uploads (images)",
        "Rate limiting",
        "Validation (Joi/Zod)",
        "Firebase Authentication",
        "Firestore Database",
        "Cloud Functions",
        "Realtime Database"
      ],
      "practice": [
        "Build user signup/login API",
        "Build a CRUD API (notes, tasks, products)",
        "Build image upload API (Cloudinary)",
        "Create JWT-protected routes",
        "Build Firebase Auth login"
      ]
    },
    {
      "phase": 3,
      "title": "Mobile-Friendly Data Modeling",
      "goal": "Structure data for fast mobile response times",
      "weeks": "Week 11-12",
      "topics": [
        "SQL vs NoSQL for mobile apps",
        "Firebase Firestore modeling",
        "MongoDB modeling",
        "User → Posts → Comments relationships",
        "Offline-first design",
        "Caching API responses",
        "Pagination & infinite scroll",
        "Optimizing for slow networks"
      ],
      "practice": [
        "Design schema for Chat App",
        "Build API with search + filter",
        "Create pagination endpoint",
        "Add caching to mobile app (Hive/SQLite/AsyncStorage)"
      ]
    },
    {
      "phase": 4,
      "title": "Integration With Mobile Apps",
      "goal": "Connect your mobile app to backend securely and efficiently",
      "weeks": "Week 12-13",
      "topics": [
        "Axios / Retrofit / URLSession",
        "Securing API keys",
        "Refresh tokens & session management",
        "Error handling patterns",
        "Pull-to-refresh",
        "Loading states / skeleton screens",
        "Background sync",
        "Push notifications (Firebase Cloud Messaging)",
        "HTTP package (Flutter)",
        "Axios/Fetch (React Native)",
        "AsyncStorage / SharedPreferences",
        "Upload images from mobile → backend"
      ],
      "practice": [
        "Build full flow: Login → API → Home Screen",
        "Integrate image upload from mobile → server",
        "Build infinite scrolling list using API",
        "Integrate push notifications"
      ]
    },
    {
      "phase": 5,
      "title": "Real-Time & Cloud Services",
      "goal": "Enable chat, notifications, and real-time interactions",
      "weeks": "Week 13-14",
      "topics": [
        "Socket.IO (real-time communication)",
        "Chats & typing indicators",
        "Firebase Realtime Database",
        "Firestore real-time updates",
        "Notifications (FCM or APNs)",
        "Serverless backend (Firebase Functions)",
        "Cloud Storage (S3, Cloudinary, Firebase Storage)"
      ],
      "practice": [
        "Build Chat App backend",
        "Build Real-time Notification System",
        "Sync local → server data",
        "Create real-time status indicators"
      ]
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn backend topic",
      "example": "Watch API/Server tutorial"
    },
    {
      "time": "30-90 mins",
      "task": "Code backend or mobile integration",
      "example": "Build endpoints, test API"
    },
    {
      "time": "90-120 mins",
      "task": "App project",
      "example": "Add API feature (login/pagination)"
    }
  ],
  "tools": [
    "Node.js + Express",
    "MongoDB / Firestore",
    "Firebase Authentication",
    "Cloud Functions",
    "REST APIs",
    "Socket.IO",
    "Axios / Retrofit / URLSession",
    "Cloudinary / S3"
  ],
  "outcome": "By the end of Week 14, you will be able to build APIs for mobile apps, integrate full backend (auth + CRUD + images), create real-time chat features, use Firebase/Firestore, and build production-level mobile backend systems.",
  "career_paths": [
    "Mobile Backend Developer",
    "Full Stack Mobile Developer",
    "API Developer",
    "Backend Engineer for Mobile",
    "Cloud Solutions Architect",
    "Mobile Infrastructure Engineer"
  ]
};

const BackendAPIsForMobileDevelopmentRoadmap = () => {
  return <RoadmapLayout data={BACKEND_APIS_MOBILE_DEVELOPMENT_ROADMAP} roadmapId={BACKEND_APIS_MOBILE_DEVELOPMENT_ROADMAP.id} />;
};

export default BackendAPIsForMobileDevelopmentRoadmap;
