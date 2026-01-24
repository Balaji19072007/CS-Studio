import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const BACKEND_DEVELOPMENT_ROADMAP = {
  "id": "backend-dev",
  "title": "🧭 Backend Development Roadmap",
  "description": "Learn how to build secure, scalable backend applications and APIs using Node.js, Express, authentication, and proper API architecture.",
  "short_description": "Learn how to build secure, scalable backend applications and APIs using Node.js, Express, authentication, and proper API architecture.",
  "prerequisites": ["Basic computer literacy", "Basic programming knowledge"],
  "estimated_hours": 140,
  "difficulty": "Intermediate",
  "category": "Web Development",
  "phases": [
    {
      "phase": 1,
      "title": "Backend Fundamentals",
      "goal": "Understand how servers work and learn the basics of backend development",
      "weeks": "Week 6-7",
      "topics": [
        "What is backend development?",
        "How servers work (request → response cycle)",
        "Node.js introduction (event loop, single-threaded model)",
        "NPM package management",
        "Creating your first server in Node.js",
        "Understanding CommonJS & ES modules",
        "Environment variables (.env)"
      ],
      "practice": [
        "Create a simple HTTP server",
        "Print 'Hello from backend' via API",
        "Use Postman/ThunderClient to test routes"
      ]
    },
    {
      "phase": 2,
      "title": "Express.js Core",
      "goal": "Build RESTful APIs using Express.js",
      "weeks": "Week 7-8",
      "topics": [
        "Express.js setup & project structure",
        "Routing: GET, POST, PUT, DELETE",
        "Route parameters & query strings",
        "Middleware (global, route-level)",
        "Error handling middleware",
        "JSON & form-data handling",
        "CORS & security basics"
      ],
      "practice": [
        "Build CRUD API for Products",
        "Implement custom middleware (logger)",
        "Create error-handling middleware"
      ]
    },
    {
      "phase": 3,
      "title": "Authentication & Authorization",
      "goal": "Implement secure login, user sessions, and protected routes",
      "weeks": "Week 8-9",
      "topics": [
        "Password hashing (bcrypt)",
        "JWT (JSON Web Tokens) authentication",
        "Access token vs Refresh token",
        "Cookies vs localStorage",
        "Role-based access control (RBAC)",
        "Login, signup, logout implementation",
        "Protected routes middleware"
      ],
      "practice": [
        "Build user registration & login API",
        "Create protected route /profile",
        "Add roles: admin/user",
        "Implement refresh token authentication"
      ]
    },
    {
      "phase": 4,
      "title": "Database Integration",
      "goal": "Learn how to store, retrieve, and modify data using databases",
      "weeks": "Week 9-10",
      "topics": [
        "Connecting Node.js to MongoDB or PostgreSQL",
        "Mongoose models & schemas (MongoDB)",
        "SQL basics if using PostgreSQL",
        "Data validation (Joi / Zod validators)",
        "Relationships & data modeling",
        "Query operations (search, filter, pagination)"
      ],
      "practice": [
        "Connect Express to a database",
        "Create User & Product models",
        "Build CRUD for products using DB",
        "Implement search & filtering"
      ]
    },
    {
      "phase": 5,
      "title": "Advanced Backend Concepts",
      "goal": "Improve security, performance, and code structure",
      "weeks": "Week 10-11",
      "topics": [
        "MVC folder structure",
        "Services & controllers pattern",
        "Async error handling",
        "Rate limiting",
        "Helmet (security headers)",
        "Sanitization (XSS, injection protection)",
        "File uploads (Multer)",
        "Sending emails (Nodemailer, Mailtrap)",
        "Logging: Morgan, Winston"
      ],
      "practice": [
        "Convert API into MVC structure",
        "Add logging & rate limiting",
        "Implement file upload endpoint",
        "Build email verification workflow"
      ]
    },
    {
      "phase": 6,
      "title": "Production-Level APIs",
      "goal": "Create real-world backend systems ready for deployment",
      "weeks": "Week 11-12",
      "topics": [
        "API versioning",
        "Optimization & caching basics (Redis intro)",
        "Handling large datasets (pagination + filtering)",
        "Relationship queries (populate, joins)",
        "Cron jobs (node-cron)",
        "Unit testing (Jest, Supertest)"
      ],
      "practice": [
        "Build complete REST API for Blog App",
        "Add caching layer for product search",
        "Add scheduled tasks (e.g., daily cleanup)",
        "Write tests for 2 critical API routes"
      ]
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "Watch Node.js/Express video"
    },
    {
      "time": "30-90 mins",
      "task": "Practice coding",
      "example": "Build routes, test APIs"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Add features to backend mini-project"
    }
  ],
  "tools": [
    "VS Code",
    "Postman / Thunder Client",
    "Node.js + Express",
    "MongoDB Atlas / PostgreSQL",
    "Mongoose / Prisma / Sequelize",
    "JWT, bcrypt",
    "Nodemailer",
    "Thunder Client"
  ],
  "outcome": "By the end of Week 12, you will be able to build complete backend APIs, implement authentication & authorization, use databases with Node.js, follow MVC folder structure, and build production-ready backend systems.",
  "career_paths": [
    "Backend Developer",
    "API Developer",
    "Full Stack Developer",
    "Node.js Developer",
    "Software Engineer",
    "DevOps Engineer"
  ]
};

const BackendDevelopmentRoadmap = () => {
  return <RoadmapLayout data={BACKEND_DEVELOPMENT_ROADMAP} roadmapId={BACKEND_DEVELOPMENT_ROADMAP.id} />;
};

export default BackendDevelopmentRoadmap;
