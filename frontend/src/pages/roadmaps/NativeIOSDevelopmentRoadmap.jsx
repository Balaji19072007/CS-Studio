import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const NATIVE_IOS_DEVELOPMENT_ROADMAP = {
  "id": "native-ios-dev",
  "title": "🧭 Native iOS Development Roadmap",
  "description": "Learn to build iOS apps using Swift, SwiftUI, and Xcode, covering UI, navigation, data persistence, APIs, and Apple's app architecture.",
  "short_description": "Learn to build iOS apps using Swift, SwiftUI, and Xcode, covering UI, navigation, data persistence, APIs, and Apple's app architecture.",
  "prerequisites": ["Basic programming knowledge"],
  "estimated_hours": 160,
  "difficulty": "Beginner to Intermediate",
  "category": "Mobile Development",
  "phases": [
    {
      "phase": 1,
      "title": "Swift & Xcode Fundamentals",
      "goal": "Learn Swift basics and understand Xcode interface",
      "weeks": "Week 1",
      "topics": [
        "Install Xcode",
        "Xcode UI overview (storyboard, Swift files, asset catalog)",
        "Swift basics: Variables, constants",
        "Functions & closures",
        "Structs vs Classes",
        "Optionals & unwrap (?, !, guard)",
        "Arrays, dictionaries",
        "SwiftUI vs UIKit – introduction",
        "Create your first SwiftUI app",
        "Preview canvas basics"
      ],
      "practice": [
        "Build Hello iOS App",
        "Create a screen with text + image",
        "Create buttons with actions"
      ]
    },
    {
      "phase": 2,
      "title": "SwiftUI Fundamentals",
      "goal": "Build beautiful UIs using SwiftUI components",
      "weeks": "Week 2",
      "topics": [
        "Text, Image, VStack, HStack, ZStack",
        "Buttons, TextField, Picker",
        "Modifiers (padding, background, shadow, cornerRadius)",
        "Lists & ForEach",
        "NavigationStack / NavigationLink",
        "SF Symbols (Apple's icon set)",
        "Basic animations"
      ],
      "practice": [
        "Build Profile UI screen",
        "Create List with custom row layout",
        "Build Settings page using forms",
        "Build Login UI"
      ]
    },
    {
      "phase": 3,
      "title": "State Management & Data Flow",
      "goal": "Manage app data & communicate between screens",
      "weeks": "Week 3",
      "topics": [
        "@State",
        "@Binding",
        "@StateObject & @ObservedObject",
        "ViewModel (MVVM architecture)",
        "@EnvironmentObject",
        "Passing data between views",
        "Two-way binding"
      ],
      "practice": [
        "Build counter app with ViewModel",
        "Build Todo app UI with list + toggles",
        "Build increment/decrement UI using binding"
      ]
    },
    {
      "phase": 4,
      "title": "Networking & API Integration",
      "goal": "Fetch and display real-time internet data",
      "weeks": "Week 4-5",
      "topics": [
        "URLSession basics",
        "HTTP methods (GET, POST)",
        "JSON decoding using Codable",
        "Async/await in Swift",
        "Loading & error states",
        "Images from URLs",
        "Pagination basics"
      ],
      "practice": [
        "Build Weather App using API",
        "Build Movies App using TMDB API",
        "Build Recipe Finder using free API",
        "Show loading/error UI states"
      ]
    },
    {
      "phase": 5,
      "title": "Data Persistence",
      "goal": "Store data locally on device",
      "weeks": "Week 5-6",
      "topics": [
        "UserDefaults",
        "FileManager",
        "CoreData Basics: Entities",
        "CRUD operations",
        "FetchRequest",
        "Combine (intro)"
      ],
      "practice": [
        "Build Notes App with CoreData",
        "Add search & delete",
        "Add Dark Mode toggle using UserDefaults"
      ]
    },
    {
      "phase": 6,
      "title": "Advanced iOS Features",
      "goal": "Implement real-world mobile app features",
      "weeks": "Week 6-7",
      "topics": [
        "Camera access",
        "Pick images from gallery",
        "Location services (MapKit basics)",
        "Push notifications (APNs)",
        "Background tasks",
        "Swift concurrency (Task {})",
        "App lifecycle & scenes"
      ],
      "practice": [
        "Build Maps App (user location)",
        "Build Photo Picker App",
        "Build Notification reminder app"
      ]
    },
    {
      "phase": 7,
      "title": "App Architecture & Polishing",
      "goal": "Build scalable, clean, production-ready apps",
      "weeks": "Week 7-8",
      "topics": [
        "Clean MVVM Architecture",
        "Dependency Injection (beginner level)",
        "Reusable components",
        "Animations & transitions",
        "Error-handling patterns",
        "Performance improvements"
      ],
      "practice": [
        "Convert your project to proper MVVM",
        "Build multi-screen app with reusable components",
        "Add loading skeleton UI",
        "Build onboarding screens"
      ]
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "Watch Swift/SwiftUI tutorial"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Build screens / lists / API"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Add features to your app"
    }
  ],
  "tools": [
    "Xcode",
    "Swift 5+",
    "SwiftUI",
    "URLSession (networking)",
    "CoreData",
    "MapKit",
    "APNs (notifications)",
    "SF Symbols"
  ],
  "outcome": "By the end of Week 8, you will be able to build polished SwiftUI apps, use badges, lists, animations, forms, integrate APIs & CoreData, work with camera, maps, storage, notifications, and create App Store-ready UI.",
  "career_paths": [
    "iOS Developer",
    "Mobile App Developer",
    "Swift Developer",
    "iOS Software Engineer",
    "Mobile Engineer",
    "Apple Ecosystem Developer"
  ]
};

const NativeIOSDevelopmentRoadmap = () => {
  return <RoadmapLayout data={NATIVE_IOS_DEVELOPMENT_ROADMAP} roadmapId={NATIVE_IOS_DEVELOPMENT_ROADMAP.id} />;
};

export default NativeIOSDevelopmentRoadmap;
