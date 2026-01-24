import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const NATIVE_ANDROID_DEVELOPMENT_ROADMAP = {
  "id": "native-android-dev",
  "title": "🧭 Native Android Development Roadmap",
  "description": "Learn to build Android apps from scratch using Kotlin and Android Studio, covering UI, navigation, storage, APIs, and modern Android architecture.",
  "short_description": "Learn to build Android apps from scratch using Kotlin and Android Studio, covering UI, navigation, storage, APIs, and modern Android architecture.",
  "prerequisites": ["Basic programming knowledge"],
  "estimated_hours": 160,
  "difficulty": "Beginner to Intermediate",
  "category": "Mobile Development",
  "phases": [
    {
      "phase": 1,
      "title": "Android & Kotlin Fundamentals",
      "goal": "Understand Android development basics and Kotlin syntax",
      "weeks": "Week 1",
      "topics": [
        "What is Android? How apps run",
        "Android Studio installation",
        "Project structure (Manifests, Gradle, Resources)",
        "Kotlin basics: Variables, functions, classes",
        "Conditionals & loops",
        "Collections & null safety",
        "Activities & Activity Lifecycle",
        "Layout XML basics"
      ],
      "practice": [
        "Build your first app: 'Hello Android'",
        "Add button → show toast",
        "Navigate between two screens"
      ]
    },
    {
      "phase": 2,
      "title": "UI Design & Layouts",
      "goal": "Design modern layouts using XML and Material Components",
      "weeks": "Week 2",
      "topics": [
        "LinearLayout, RelativeLayout, ConstraintLayout",
        "ScrollView, NestedScrollView",
        "Buttons, TextViews, ImageViews",
        "Material UI components",
        "RecyclerView (lists)",
        "CardView",
        "Themes, styles, colors"
      ],
      "practice": [
        "Build a profile screen UI",
        "Build a list screen with RecyclerView",
        "Create custom list item layout"
      ]
    },
    {
      "phase": 3,
      "title": "Navigation & App Architecture",
      "goal": "Navigate between screens and implement MVVM architecture",
      "weeks": "Week 3-4",
      "topics": [
        "Explicit & implicit intents",
        "Passing data between screens",
        "Navigation Component",
        "Bottom Navigation Bar",
        "Toolbar & AppBar",
        "MVVM (Model-View-ViewModel)",
        "LiveData / StateFlow",
        "ViewModel",
        "Repository pattern"
      ],
      "practice": [
        "Build multi-page news app (Home, Detail, Settings)",
        "Build a bottom navigation app (Home, Search, Profile)"
      ]
    },
    {
      "phase": 4,
      "title": "Storage & Databases",
      "goal": "Store data locally using Room & SharedPreferences",
      "weeks": "Week 4-5",
      "topics": [
        "SharedPreferences (small storage)",
        "Room Database",
        "Entities",
        "DAO",
        "Queries",
        "CRUD operations",
        "Data persistence & caching"
      ],
      "practice": [
        "Build notes app with Room DB",
        "Add search & sort to notes",
        "Add dark mode toggle using SharedPreferences"
      ]
    },
    {
      "phase": 5,
      "title": "Networking & APIs",
      "goal": "Fetch and display data from the internet",
      "weeks": "Week 5-6",
      "topics": [
        "Retrofit",
        "Coroutines (async tasks)",
        "Handling API responses",
        "JSON parsing with Moshi/Gson",
        "Error handling & loading states",
        "Pagination"
      ],
      "practice": [
        "Build Weather App using API",
        "Build Movies App using TMDB API",
        "Show states: loading, empty, error"
      ]
    },
    {
      "phase": 6,
      "title": "Jetpack Compose & Modern UI",
      "goal": "Build UIs using Jetpack Compose (modern Android toolkit)",
      "weeks": "Week 6-7",
      "topics": [
        "Compose basics: Composable functions",
        "State & recomposition",
        "Lists, cards, images",
        "Navigation with Compose",
        "Material 3 components",
        "Dark mode support"
      ],
      "practice": [
        "Build calculator UI in Compose",
        "Build recipe listing UI",
        "Convert XML app → Compose version"
      ]
    },
    {
      "phase": 7,
      "title": "Advanced Android Concepts",
      "goal": "Add system-level features & real-world functionalities",
      "weeks": "Week 7-8",
      "topics": [
        "Permissions (camera, location, storage)",
        "Background tasks (WorkManager)",
        "Firebase Authentication",
        "Firestore",
        "Notifications (FCM)",
        "App performance optimization",
        "Clean Architecture (optional)"
      ],
      "practice": [
        "Build location-based app",
        "Deliver push notifications with Firebase",
        "Build chat UI using Firestore"
      ]
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "Watch Android/Kotlin tutorial"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Build UI / API / DB feature"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Add feature to final app"
    }
  ],
  "tools": [
    "Android Studio",
    "Kotlin",
    "Jetpack Compose",
    "Retrofit",
    "Room DB",
    "Firebase",
    "Material UI"
  ],
  "outcome": "By the end of Week 8, you will be able to build Android apps with Kotlin & XML/Compose, use navigation, Room DB, and APIs, integrate Firebase authentication, build 5+ Android projects for your resume, and be ready to move into cross-platform or backend integration.",
  "career_paths": [
    "Android Developer",
    "Mobile App Developer",
    "Kotlin Developer",
    "Mobile Engineer",
    "Android Software Engineer",
    "Cross-platform Developer"
  ]
};

const NativeAndroidDevelopmentRoadmap = () => {
  return <RoadmapLayout data={NATIVE_ANDROID_DEVELOPMENT_ROADMAP} roadmapId={NATIVE_ANDROID_DEVELOPMENT_ROADMAP.id} />;
};

export default NativeAndroidDevelopmentRoadmap;
