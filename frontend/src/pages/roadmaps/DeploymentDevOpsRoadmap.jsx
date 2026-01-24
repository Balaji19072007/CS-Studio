import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const DEPLOYMENT_DEVOPS_ROADMAP = {
  "id": "deployment-devops",
  "title": "🧭 Deployment & DevOps Essentials Roadmap",
  "description": "Learn how to deploy frontend & backend applications, manage servers, use DevOps tools, automate pipelines, and maintain production-ready systems.",
  "short_description": "Learn how to deploy frontend & backend applications, manage servers, use DevOps tools, automate pipelines, and maintain production-ready systems.",
  "prerequisites": ["Frontend Development", "Backend Development", "Basic Git knowledge"],
  "estimated_hours": 120,
  "difficulty": "Intermediate",
  "category": "DevOps & Deployment",
  "phases": [
    {
      "phase": 1,
      "title": "Deployment Fundamentals",
      "goal": "Understand how deployment works and host your first app",
      "weeks": "Week 12",
      "topics": [
        "What is deployment?",
        "Client-side vs server-side deployment",
        "Hosting types: static hosting, cloud hosting, VPS",
        "Domain names & DNS basics",
        "HTTPS certificates (SSL basics)",
        "Environment variables in production",
        "CI/CD introduction"
      ],
      "practice": [
        "Deploy static website (HTML/CSS/JS) to Netlify or Vercel",
        "Set up custom domain with SSL",
        "Add environment variables to app"
      ]
    },
    {
      "phase": 2,
      "title": "Frontend Deployment",
      "goal": "Learn how to deploy modern frontend apps (React, Vue, Next.js)",
      "weeks": "Week 12-13",
      "topics": [
        "Vite/CRA production build",
        "Deploying React to Vercel",
        "Deploying React to Netlify",
        "Environment variables (.env.production)",
        "Build optimization basics (minification, tree-shaking)",
        "Image optimization",
        "SEO basics (meta tags)"
      ],
      "practice": [
        "Deploy React Todo App",
        "Create staging & production builds",
        "Add environment-based API URLs"
      ]
    },
    {
      "phase": 3,
      "title": "Backend Deployment",
      "goal": "Deploy Node.js/Express backend to live servers",
      "weeks": "Week 13-14",
      "topics": [
        "Render, Railway, Cyclic hosting platforms",
        "AWS EC2 (optional advanced)",
        "DigitalOcean Droplets",
        "Serving backend via cloud provider",
        "Environment variables in production",
        "Reverse proxy basics (Nginx introduction)",
        "PM2 process manager",
        "CORS configuration",
        "Logging (basic error logs)",
        "Local uploads vs cloud storage",
        "Cloud storage basics (Cloudinary, AWS S3)"
      ],
      "practice": [
        "Deploy Express API to Render",
        "Add environment variables (JWT_SECRET, DB_URL)",
        "Set up PM2 on a VPS (optional advanced)",
        "Connect file upload API to Cloudinary"
      ]
    },
    {
      "phase": 4,
      "title": "DevOps Essentials",
      "goal": "Learn automation, pipelines, containers, and server management",
      "weeks": "Week 14-15",
      "topics": [
        "Git branching (main/dev/feature branches)",
        "Pull requests",
        "Release tagging & versioning",
        "GitHub Actions (build → test → deploy)",
        "Automatic deploy on push",
        "Workflows for frontend & backend separately",
        "What is Docker?",
        "Dockerfile basics",
        "Creating images & containers",
        "Docker Compose for multi-container apps",
        "Pushing images to Docker Hub"
      ],
      "practice": [
        "Create GitHub Actions pipeline for React build",
        "Create Dockerfile for Node.js API",
        "Run backend + database using Docker Compose"
      ]
    },
    {
      "phase": 5,
      "title": "Monitoring, Scaling & Optimization",
      "goal": "Learn how production apps are monitored and optimized",
      "weeks": "Week 15-16",
      "topics": [
        "Logs (Winston, Morgan)",
        "Error tracking (Sentry introduction)",
        "Basic performance metrics",
        "Vertical vs Horizontal scaling",
        "Load balancers",
        "Rate limiting",
        "Caching (Redis basics – optional)",
        "Minifying & compressing builds",
        "GZIP/Brotli compression",
        "Database connection pooling"
      ],
      "practice": [
        "Add logging to backend",
        "Set up uptime monitoring (UptimeRobot)",
        "Add GZIP compression to backend",
        "Implement rate limiting in Express"
      ]
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn concept",
      "example": "Watch DevOps/Deployment tutorial"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Deploy app / configure cloud service"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Improve full stack project deployment"
    }
  ],
  "tools": [
    "Vercel",
    "Netlify",
    "Render",
    "Railway",
    "PM2",
    "Nginx (optional)",
    "Git & GitHub",
    "GitHub Actions",
    "Docker & Docker Compose",
    "UptimeRobot",
    "Sentry",
    "Winston/Morgan"
  ],
  "outcome": "By the end of Week 16, you will be able to deploy frontend and backend apps, use GitHub Actions (CI/CD), run Node.js apps with Docker, manage cloud hosting & environment variables, monitor and optimize production applications, and deploy complete full-stack apps independently.",
  "career_paths": [
    "DevOps Engineer",
    "Cloud Engineer",
    "Full Stack Developer",
    "Site Reliability Engineer",
    "Platform Engineer",
    "Backend Developer with DevOps skills"
  ]
};

const DeploymentDevOpsRoadmap = () => {
  return <RoadmapLayout data={DEPLOYMENT_DEVOPS_ROADMAP} roadmapId={DEPLOYMENT_DEVOPS_ROADMAP.id} />;
};

export default DeploymentDevOpsRoadmap;
