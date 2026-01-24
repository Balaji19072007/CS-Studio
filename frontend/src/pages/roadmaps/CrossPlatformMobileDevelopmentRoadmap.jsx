import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const CROSS_PLATFORM_MOBILE_DEVELOPMENT_ROADMAP = {
  "id": "cross-platform-mobile-dev",
  "title": "🧭 Cross-Platform Mobile Development Roadmap",
  "description": "Learn to build apps that run on both Android and iOS using a single codebase with either Flutter (Dart) or React Native (JavaScript) — including UI, navigation, state management, API integration, and deployment.",
  "short_description": "Learn to build apps that run on both Android and iOS using a single codebase with either Flutter (Dart) or React Native (JavaScript).",
  "prerequisites": ["Basic programming knowledge", "Frontend Development basics"],
  "estimated_hours": 140,
  "difficulty": "Intermediate",
  "category": "Mobile Development",
  "phases": [
    {
      "phase": 1,
      "title": "Cross-Platform Foundations",
      "goal": "Understand cross-platform frameworks and choose your stack",
      "weeks": "Week 6",
      "topics": [
        "What is cross-platform development?",
        "Native vs hybrid vs cross-platform",
        "Flutter vs React Native (comparison)",
        "How cross-platform apps render UI",
        "Installing Android Studio + Xcode (for iOS builds)",
        "Install Flutter SDK OR Node.js for React Native",
        "VS Code setup",
        "Emulators: Android Emulator + iOS Simulator",
        "Running first app on emulator"
      ],
      "practice": [
        "Create your first cross-platform project",
        "Run app on Android + iOS",
        "Build simple screen with a button"
      ]
    },
    {
      "phase": 2,
      "title": "Flutter Basics",
      "goal": "Build cross-platform UIs using Flutter & Dart",
      "weeks": "Week 6-8",
      "topics": [
        "Variables, functions, classes",
        "async/await",
        "null safety",
        "Widgets (Stateless, Stateful)",
        "Scaffold, AppBar, Drawer",
        "Column, Row, Container",
        "Text, Image, Icon",
        "ListView, GridView",
        "Styling & themes",
        "Navigator 1.0 / Navigator 2.0",
        "Provider / Riverpod (state management)",
        "HTTP package",
        "JSON parsing",
        "FutureBuilder"
      ],
      "practice": [
        "Build Todo App (Flutter)",
        "Build Weather App using API",
        "Build Login UI + Validation",
        "Build List + Detail screen"
      ]
    },
    {
      "phase": 3,
      "title": "React Native Basics",
      "goal": "Build cross-platform apps using React Native and JavaScript",
      "weeks": "Week 6-8",
      "topics": [
        "JSX basics",
        "Components & props",
        "useState & useEffect",
        "View, Text, Image",
        "ScrollView",
        "TouchableOpacity",
        "StyleSheet",
        "Flexbox (core for RN UI)",
        "SafeAreaView",
        "React Navigation",
        "Stack, Tab, Drawer navigators",
        "Context API",
        "Redux Toolkit (optional)",
        "Axios / Fetch API",
        "FlatList",
        "Error & loading states"
      ],
      "practice": [
        "Build News App",
        "Build Login Page with validation",
        "Build FlatList product UI",
        "Build Settings screen"
      ]
    },
    {
      "phase": 4,
      "title": "Cross-Platform Advanced Concepts",
      "goal": "Learn device-specific features & state management",
      "weeks": "Week 8-10",
      "topics": [
        "Camera access",
        "Image picker",
        "Location & Maps (Google Maps)",
        "Permissions (Android + iOS)",
        "Push notifications (Expo / Firebase)",
        "SharedPreferences, Hive (Flutter)",
        "AsyncStorage, SQLite (React Native)",
        "Gesture handling & animations"
      ],
      "practice": [
        "Build Camera App",
        "Build Location-based Map App",
        "Push notification demo",
        "Store notes in local storage"
      ]
    },
    {
      "phase": 5,
      "title": "API Integration & Backend Features",
      "goal": "Build fully functional apps with real data",
      "weeks": "Week 10-11",
      "topics": [
        "Fetching APIs",
        "Auth APIs (login, signup)",
        "Pagination",
        "Search filters",
        "Uploading images to server",
        "Handling large lists",
        "Error handling patterns",
        "Token storage & session management"
      ],
      "practice": [
        "Build E-commerce App UI + API",
        "Build Chat UI with live updates",
        "Build Social feed using API"
      ]
    },
    {
      "phase": 6,
      "title": "Cross-Platform App Architecture",
      "goal": "Build scalable apps with clean architecture patterns",
      "weeks": "Week 11-12",
      "topics": [
        "MVVM (React Native & Flutter)",
        "Folder structure for large apps",
        "Repository pattern",
        "Constant files & reuse",
        "Theming & dark mode",
        "Error boundary patterns",
        "Performance tuning",
        "Offline mode & caching (Hive / SQLite)"
      ],
      "practice": [
        "Convert existing app to proper MVVM",
        "Implement offline caching for API",
        "Add theme toggle (light/dark mode)",
        "Build a production-level folder structure"
      ]
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn concept",
      "example": "Watch RN/Flutter lesson"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Build UI or feature"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Build full app or add features"
    }
  ],
  "tools": [
    "Flutter SDK",
    "Dart",
    "Android Studio / VS Code",
    "Node.js",
    "Expo or React Native CLI",
    "Firebase",
    "REST APIs",
    "Google Maps API"
  ],
  "outcome": "By the end of Week 12, you will be able to build Android & iOS apps using Flutter/React Native, integrate APIs, storage, navigation, work with camera, location, notifications, and build production-ready cross-platform portfolio apps.",
  "career_paths": [
    "Cross-Platform Developer",
    "Flutter Developer",
    "React Native Developer",
    "Mobile App Developer",
    "Full Stack Mobile Developer",
    "Mobile Engineer"
  ]
};

const CrossPlatformMobileDevelopmentRoadmap = () => {
  return <RoadmapLayout data={CROSS_PLATFORM_MOBILE_DEVELOPMENT_ROADMAP} roadmapId={CROSS_PLATFORM_MOBILE_DEVELOPMENT_ROADMAP.id} />;
};

export default CrossPlatformMobileDevelopmentRoadmap;
