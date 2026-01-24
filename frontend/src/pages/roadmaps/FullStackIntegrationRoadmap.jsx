import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const FULL_STACK_INTEGRATION_ROADMAP = {
  "id": "full-stack-integration",
  "title": "🧭 Full Stack Integration Roadmap",
  "description": "Combine frontend + backend + database + deployment into complete, real-world full stack applications ready for your portfolio.",
  "short_description": "Combine frontend + backend + database + deployment into complete, real-world full stack applications ready for your portfolio.",
  "prerequisites": ["Frontend Development", "Backend Development", "Database & Data Modeling", "Deployment & DevOps"],
  "estimated_hours": 120,
  "difficulty": "Advanced",
  "category": "Full Stack Development",
  "phases": [
    {
      "phase": 1,
      "title": "Full Stack Architecture",
      "goal": "Learn how all parts of a web application fit together",
      "weeks": "Week 16",
      "topics": [
        "What is a full stack application?",
        "How frontend, backend, and database communicate",
        "REST API architecture",
        "Folder structure for full stack apps",
        "Authentication flow from frontend to backend",
        "Environment variables in full stack apps",
        "Working with API clients (Axios vs Fetch)"
      ],
      "practice": [
        "Create React project + Node.js API in same workspace",
        "Connect frontend to backend using Axios",
        "Test full flow: form → API → database",
        "Create a reusable API client file"
      ]
    },
    {
      "phase": 2,
      "title": "Authentication & Authorization",
      "goal": "Build secure and usable login, signup, and protected routes",
      "weeks": "Week 16-17",
      "topics": [
        "Login form validation",
        "Saving JWT tokens (localStorage or httpOnly cookies)",
        "Protected routes in React",
        "Logout functionality",
        "Handling session expiration",
        "Login, signup, forgot password",
        "Refresh token flow",
        "Role-based access control (admin/user)",
        "Authorization middleware"
      ],
      "practice": [
        "Build full login system",
        "Create dashboard page (protected)",
        "Set up admin panel visible only to admins"
      ]
    },
    {
      "phase": 3,
      "title": "Full Stack CRUD Operations",
      "goal": "Build end-to-end features with UI, API, and DB working together",
      "weeks": "Week 17-18",
      "topics": [
        "Creating forms in React",
        "Sending data to backend API",
        "Validating requests on backend",
        "Inserting & retrieving data from database",
        "Pagination & search in full stack apps",
        "Optimistic UI updates",
        "Handling errors gracefully"
      ],
      "practice": [
        "Build CRUD for posts (Create, Read, Update, Delete)",
        "Implement search + category filters",
        "Add pagination",
        "Add loading & error states"
      ]
    },
    {
      "phase": 4,
      "title": "File Uploads & User Profiles",
      "goal": "Add image uploads, profiles, and media handling across the stack",
      "weeks": "Week 18-19",
      "topics": [
        "Image preview before upload",
        "Multi-file uploads",
        "FormData basics",
        "Multer (file uploads)",
        "Cloudinary / S3 integration",
        "Linking image URLs to database records",
        "Profile update endpoints",
        "Store image URL & metadata",
        "Update user profile document/record"
      ],
      "practice": [
        "Build user profile edit form",
        "Add profile image upload",
        "Store image URL in DB and show on frontend"
      ]
    },
    {
      "phase": 5,
      "title": "Admin Panel & Dashboards",
      "goal": "Create admin workflows for managing users, items, and analytics",
      "weeks": "Week 19",
      "topics": [
        "Admin login",
        "Role-based filtering",
        "CRUD operations for admin",
        "Dashboard UI & tables",
        "Charts using Chart.js / Recharts",
        "Activity logs (basic)"
      ],
      "practice": [
        "Build an admin dashboard",
        "Manage products/users",
        "Add tables, filters, and analytics charts"
      ]
    },
    {
      "phase": 6,
      "title": "Full Stack Deployment & Production",
      "goal": "Deploy complete full stack project to cloud with CI/CD",
      "weeks": "Week 19-20",
      "topics": [
        "Build & deploy React frontend (Vercel)",
        "Deploy backend API (Render/Railway)",
        "Connect environment variables",
        "Store DB on MongoDB Atlas / Railway Postgres",
        "CI/CD pipeline using GitHub Actions",
        "Error logging & monitoring",
        "Backup strategies"
      ],
      "practice": [
        "Deploy full stack app (frontend + backend)",
        "Use CI/CD to auto-deploy on git push",
        "Add uptime monitoring (UptimeRobot)"
      ]
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "Watch tutorial / read docs"
    },
    {
      "time": "30-90 mins",
      "task": "Build feature",
      "example": "CRUD, auth, filters, uploads"
    },
    {
      "time": "90-120 mins",
      "task": "Improve project",
      "example": "UI polish, deploy, fix bugs"
    }
  ],
  "tools": [
    "React, React Router",
    "Axios",
    "Tailwind CSS / Bootstrap",
    "Node.js + Express",
    "JWT, bcrypt",
    "Multer / Cloudinary",
    "MongoDB Atlas",
    "PostgreSQL",
    "Vercel",
    "Render / Railway",
    "GitHub Actions",
    "Socket.io",
    "Chart.js / Recharts",
    "PM2 (optional)"
  ],
  "outcome": "By the end of Week 20, you will be able to build complete full stack applications, handle authentication, CRUD, dashboards, uploads, integrate frontend, backend, database seamlessly, deploy apps professionally, and build portfolio projects that impress recruiters.",
  "career_paths": [
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "Full Stack Engineer",
    "Product Engineer",
    "Technical Lead",
    "Startup Founder"
  ]
};

const FullStackIntegrationRoadmap = () => {
  return <RoadmapLayout data={FULL_STACK_INTEGRATION_ROADMAP} roadmapId={FULL_STACK_INTEGRATION_ROADMAP.id} />;
};

export default FullStackIntegrationRoadmap;
