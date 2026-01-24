import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const DEVOPS_CICD_ROADMAP = {
  "id": "devops-cicd",
  "title": "🧭 DevOps Fundamentals & CI/CD Roadmap",
  "description": "Understand DevOps culture, Git, automation, pipelines, version control, infrastructure basics, CI/CD pipelines, and how modern software delivery works.",
  "short_description": "Master DevOps culture, Git version control, automation, CI/CD pipelines, and modern software delivery practices.",
  "prerequisites": ["Basic programming knowledge", "Command line basics"],
  "estimated_hours": 120,
  "difficulty": "Beginner to Intermediate",
  "category": "DevOps",
  "phases": [
    {
      "phase": 1,
      "title": "DevOps Foundations",
      "goal": "Learn what DevOps is and how it improves software delivery",
      "weeks": "Week 1",
      "topics": [
        "What is DevOps? Culture and principles",
        "DevOps lifecycle (Plan → Code → Build → Test → Release → Deploy → Monitor → Feedback)",
        "Agile & Scrum basics for DevOps",
        "CI vs CD (Continuous Integration vs Continuous Deployment)",
        "DevOps culture: collaboration, automation, ownership",
        "Infrastructure basics (servers, VMs, cloud concepts)",
        "Benefits and challenges of DevOps adoption",
        "DevOps team structure and roles"
      ],
      "practice": [
        "Map DevOps lifecycle to a real project scenario",
        "Study failure vs success DevOps case studies",
        "Create a simple DevOps flow diagram",
        "Identify DevOps practices in existing projects"
      ]
    },
    {
      "phase": 2,
      "title": "Git & Version Control",
      "goal": "Learn Git thoroughly — core DevOps skill",
      "weeks": "Week 1-2",
      "topics": [
        "What is version control? Benefits and importance",
        "Git installation & setup on different platforms",
        "Git commands: init, clone, add, commit, push, pull, fetch",
        "Branching strategies (Git Flow, Trunk Based Development)",
        "Merge vs Rebase: differences and use cases",
        "Pull requests and code review process",
        "Resolving merge conflicts effectively",
        ".gitignore files and their importance",
        "Git tags and releases management"
      ],
      "practice": [
        "Create Git repo for a sample project",
        "Push code to GitHub/GitLab",
        "Create and manage feature branches",
        "Resolve merge conflict manually",
        "Practice pull request workflow"
      ]
    },
    {
      "phase": 3,
      "title": "Automation Basics",
      "goal": "Learn automation using bash scripting & YAML",
      "weeks": "Week 2-3",
      "topics": [
        "Bash scripting basics and syntax",
        "Variables, loops, conditionals in bash",
        "Writing automated scripts for common tasks",
        "Cron jobs and task scheduling",
        "YAML basics: indentation, keys, lists, dictionaries",
        "Environment variables and configuration",
        "Error handling in scripts",
        "Script debugging techniques"
      ],
      "practice": [
        "Write script to automate file backup",
        "Create script to check server uptime",
        "Write YAML file for sample configuration",
        "Set up cron job for automated tasks",
        "Create deployment script for simple application"
      ]
    },
    {
      "phase": 4,
      "title": "Continuous Integration",
      "goal": "Automate building and testing applications",
      "weeks": "Week 3-4",
      "topics": [
        "What is CI? Core concepts and benefits",
        "CI workflow and pipeline structure",
        "GitHub Actions basics and components",
        "Runners, triggers (push, pull request, schedule)",
        "Jobs & steps in CI pipelines",
        "Testing automation basics",
        "Running scripts inside pipeline",
        "Artifact management in CI",
        "Pipeline status and notifications"
      ],
      "practice": [
        "Create GitHub Action to run tests on push",
        "Add linting step to CI pipeline",
        "Create CI workflow for Node/React/Python project",
        "Set up automated testing with Jest/Pytest",
        "Configure build automation"
      ]
    },
    {
      "phase": 5,
      "title": "Continuous Delivery/Deployment",
      "goal": "Automatically deploy applications after CI",
      "weeks": "Week 4-6",
      "topics": [
        "CD pipelines and deployment automation",
        "Deploying on platforms: Vercel, Netlify, Render, Railway",
        "Secrets management and environment variables",
        "Deployment strategies: Blue-Green Deployment",
        "Canary Deployment techniques",
        "Rolling updates and zero-downtime deployments",
        "Environment management (dev, staging, prod)",
        "Infrastructure as Code basics",
        "Monitoring and rollback strategies"
      ],
      "practice": [
        "Deploy a React/Node app with CI/CD",
        "Automate deployment on GitHub push",
        "Add environment variables securely",
        "Set up multiple environments",
        "Implement basic deployment strategy"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Create Full CI/CD Pipeline",
      "description": "Build complete pipeline from code to deployment with testing and automation",
      "technologies": ["GitHub Actions", "Testing", "Deployment"],
      "type": "pipeline",
      "difficulty": "Intermediate"
    },
    {
      "name": "GitHub Actions Automation",
      "description": "Create comprehensive automation with linting, testing, building, and deployment",
      "technologies": ["GitHub Actions", "Automation", "CI/CD"],
      "type": "automation",
      "difficulty": "Intermediate"
    },
    {
      "name": "Automate Bash Tasks",
      "description": "Develop bash scripts for backup automation and log rotation",
      "technologies": ["Bash Scripting", "Automation", "Cron"],
      "type": "scripting",
      "difficulty": "Beginner"
    },
    {
      "name": "Deploy 2 Apps with CI/CD",
      "description": "Set up CI/CD for both frontend (React/Next.js) and backend (Node/Python) applications",
      "technologies": ["React", "Node.js", "CI/CD", "Deployment"],
      "type": "deployment",
      "difficulty": "Intermediate"
    },
    {
      "name": "Multi-Environment Setup",
      "description": "Configure development, staging, and production environments with proper variables",
      "technologies": ["Environment Management", "Secrets", "Configuration"],
      "type": "configuration",
      "difficulty": "Intermediate"
    },
    {
      "name": "Git Workflow Implementation",
      "description": "Implement and document proper Git branching strategy for team collaboration",
      "technologies": ["Git", "Branching", "Collaboration"],
      "type": "version-control",
      "difficulty": "Beginner"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learning",
      "example": "Git / CI / DevOps video"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "CI pipelines, Git commands"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Set up automation workflows"
    }
  ],
  "tools": [
    "Git & GitHub",
    "GitHub Actions",
    "Bash scripting",
    "YAML",
    "Vercel / Netlify / Render",
    "VS Code",
    "Docker (basics)",
    "Node.js / Python"
  ],
  "platforms": [
    "GitHub",
    "GitLab",
    "Vercel",
    "Netlify",
    "Render",
    "Railway",
    "DigitalOcean Apps"
  ],
  "outcome": "By the end of this roadmap, you'll fully understand DevOps concepts, use Git professionally, build CI/CD pipelines, automate workflows, deploy applications automatically, and be ready for Containerization.",
  "career_paths": [
    "DevOps Engineer",
    "CI/CD Engineer",
    "Automation Engineer",
    "Build and Release Engineer",
    "Platform Engineer",
    "Site Reliability Engineer (SRE)",
    "Cloud Engineer",
    "Infrastructure Engineer"
  ]
};

const DevOpsCICDRoadmap = () => {
  return <RoadmapLayout data={DEVOPS_CICD_ROADMAP} roadmapId={DEVOPS_CICD_ROADMAP.id} />;
};

export default DevOpsCICDRoadmap;
