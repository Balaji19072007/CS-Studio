import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const MOBILE_APP_PUBLISHING_ROADMAP = {
  "id": "mobile-app-publishing",
  "title": "🧭 Mobile App Publishing & Maintenance Roadmap",
  "description": "Learn how to prepare, publish, update, and maintain apps on Google Play Store and Apple App Store, including testing, performance optimization, crash analytics, and release pipelines.",
  "short_description": "Learn how to prepare, publish, update, and maintain apps on Google Play Store and Apple App Store.",
  "prerequisites": ["Basic mobile app development knowledge"],
  "estimated_hours": 100,
  "difficulty": "Intermediate to Advanced",
  "category": "Mobile Development",
  "phases": [
    {
      "phase": 1,
      "title": "App Testing & QA",
      "goal": "Ensure your mobile app is stable, bug-free, and optimized before publishing",
      "weeks": "Week 14-15",
      "topics": [
        "Testing Types: Manual, Unit, Integration, UI testing",
        "Device compatibility testing",
        "Android Studio Logcat & Xcode Debugger",
        "Breakpoints and inspecting variables",
        "Memory leak detection",
        "Performance testing: CPU, Memory, Battery, Network",
        "Security testing: API key protection, SSL security",
        "Input validation on backend"
      ],
      "practice": [
        "Debug crashes & warnings",
        "Test the app on multiple devices/emulators",
        "Run performance tests",
        "Write unit tests for 2 critical functions",
        "Fix memory leaks"
      ]
    },
    {
      "phase": 2,
      "title": "Play Store Publishing (Android)",
      "goal": "Prepare, upload, and publish Android apps",
      "weeks": "Week 15-16",
      "topics": [
        "App preparation: name, package ID, icons, splash screen",
        "Versioning: versionCode + versionName",
        "Build signed APK/AAB",
        "ProGuard / R8 optimization",
        "Privacy policy setup",
        "Play Console developer account",
        "Upload App Bundle (AAB)",
        "Content rating and metadata",
        "Screenshots and feature graphics",
        "Privacy & data safety form",
        "Internal testing rollout",
        "Production rollout"
      ],
      "practice": [
        "Generate signed AAB",
        "Write Play Store description",
        "Upload test version to Internal Testing track",
        "Get testers to test the build"
      ]
    },
    {
      "phase": 3,
      "title": "App Store Publishing (iOS)",
      "goal": "Prepare and publish iOS apps using Xcode & App Store Connect",
      "weeks": "Week 16-17",
      "topics": [
        "App preparation: icons, LaunchScreen.storyboard",
        "App versioning (build vs version)",
        "Certificates & Provisioning Profiles",
        "App Sandbox rules",
        "TestFlight builds",
        "iOS privacy descriptions",
        "App Store Connect setup",
        "Upload iOS build via Xcode",
        "App Store metadata",
        "Screenshot requirements (iPhone & iPad)",
        "App Review Guidelines",
        "Common rejection reasons and solutions"
      ],
      "practice": [
        "Create & upload a TestFlight build",
        "Write App Store listing",
        "Fix a rejection using logs"
      ]
    },
    {
      "phase": 4,
      "title": "Maintenance, Monitoring & Updates",
      "goal": "Maintain production apps, track crashes, and release new versions",
      "weeks": "Week 17-18",
      "topics": [
        "Crash & Error Monitoring: Firebase Crashlytics, Sentry",
        "ANR (App Not Responding) detection",
        "Analytics: Firebase Analytics, user behavior tracking",
        "Retention metrics and screens analysis",
        "Versioning strategy (Semantic Versioning)",
        "User feedback loops",
        "Incremental rollout and hotfix releases",
        "Feature flags implementation",
        "Performance optimization techniques",
        "API usage optimization",
        "Reducing over-rendering",
        "Lazy loading images",
        "Caching & offline storage",
        "Minimizing app size"
      ],
      "practice": [
        "Integrate Firebase Crashlytics",
        "Track user events (login, click, purchase)",
        "Release minor update to fix errors",
        "Reduce app size by 10–20%"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Publish Your First Android App",
      "description": "Complete Play Store publishing process from start to finish",
      "technologies": ["Play Console", "AAB", "ProGuard"],
      "type": "android",
      "difficulty": "Intermediate"
    },
    {
      "name": "Publish Your First iOS TestFlight Build",
      "description": "Prepare and distribute iOS app via TestFlight",
      "technologies": ["App Store Connect", "TestFlight", "Xcode"],
      "type": "ios",
      "difficulty": "Intermediate"
    },
    {
      "name": "Crash-Free Version Update",
      "description": "Identify and fix crashes in production app",
      "technologies": ["Crashlytics", "Sentry", "Debugging"],
      "type": "both",
      "difficulty": "Advanced"
    },
    {
      "name": "Analytics Dashboard Setup",
      "description": "Implement comprehensive analytics tracking",
      "technologies": ["Firebase Analytics", "Custom Events", "Dashboards"],
      "type": "both",
      "difficulty": "Intermediate"
    },
    {
      "name": "Performance Optimization Update",
      "description": "Optimize app performance and reduce size",
      "technologies": ["Performance", "App Size", "Optimization"],
      "type": "both",
      "difficulty": "Advanced"
    },
    {
      "name": "App Maintenance SOP Document",
      "description": "Create standard operating procedures for app maintenance",
      "technologies": ["Documentation", "Process", "Maintenance"],
      "type": "both",
      "difficulty": "Intermediate"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "Watch publishing tutorials"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Prepare app icons, screenshots, builds"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Publish or update your live app"
    }
  ],
  "tools": [
    "Android Studio",
    "Xcode",
    "Firebase Crashlytics / Analytics",
    "App Store Connect",
    "Google Play Console",
    "Sentry",
    "Figma (screenshots, graphics)",
    "Firebase Cloud Messaging"
  ],
  "outcome": "By the end of this roadmap, you'll be able to publish apps on Play Store & App Store, manage TestFlight/Internal Testing, track crashes & improve app stability, release updates & monitor analytics, and maintain production-ready mobile applications.",
  "career_paths": [
    "Mobile App Developer",
    "App Release Manager",
    "Mobile DevOps Engineer",
    "App Store Optimization Specialist",
    "Mobile Product Manager",
    "QA Engineer (Mobile)",
    "Mobile Technical Lead"
  ]
};

const MobileAppPublishingRoadmap = () => {
  return <RoadmapLayout data={MOBILE_APP_PUBLISHING_ROADMAP} roadmapId={MOBILE_APP_PUBLISHING_ROADMAP.id} />;
};

export default MobileAppPublishingRoadmap;
