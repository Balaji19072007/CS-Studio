import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const CONTAINERIZATION_ROADMAP = {
  "id": "containerization",
  "title": "🧭 Containerization Roadmap",
  "description": "Master Docker and containerization concepts, build containerized applications, manage images, run multi-container setups, and prepare for orchestration (Kubernetes).",
  "short_description": "Master Docker and containerization concepts, build containerized applications, manage images, run multi-container setups, and prepare for orchestration (Kubernetes).",
  "prerequisites": ["Basic command line knowledge", "Understanding of application development"],
  "estimated_hours": 140,
  "difficulty": "Intermediate to Advanced",
  "category": "DevOps & Infrastructure",
  "phases": [
    {
      "phase": 1,
      "title": "Container Fundamentals",
      "goal": "Understand what containers are and how they differ from VMs",
      "weeks": "Week 4-5",
      "topics": [
        "What is a container?",
        "Containers vs Virtual Machines (VMs)",
        "Why DevOps uses containers",
        "Docker architecture (Client, Daemon, Images, Containers)",
        "Docker Engine & Docker Desktop",
        "OCI (Open Container Initiative)"
      ],
      "practice": [
        "Install Docker Desktop",
        "Run first container: docker run hello-world",
        "Explore container lifecycle: start, stop, remove",
        "View running containers using docker ps"
      ],
      "resources": [
        "TechWorld with Nana – Docker Explained"
      ]
    },
    {
      "phase": 2,
      "title": "Docker Images & Containers",
      "goal": "Learn how Docker images are built and managed",
      "weeks": "Week 5",
      "topics": [
        "Docker Hub",
        "Pulling images",
        "Building images (docker build)",
        "Dockerfile basics",
        "Layers & caching",
        "Entrypoint vs CMD",
        "Exposing ports",
        "Volume mounting",
        "Environment variables"
      ],
      "practice": [
        "Build a Dockerfile for a Node.js App",
        "Run the app using Docker",
        "Bind local folder to container",
        "Expose port 3000 to host"
      ],
      "resources": [
        "Fireship – Docker in 100 Seconds"
      ]
    },
    {
      "phase": 3,
      "title": "Docker Networking",
      "goal": "Learn how containers communicate with each other",
      "weeks": "Week 5-6",
      "topics": [
        "Bridge network",
        "Host network",
        "Custom networks",
        "Container-to-container communication",
        "DNS in Docker",
        "Inspecting network details"
      ],
      "practice": [
        "Create custom Docker network",
        "Connect two containers (App + DB)",
        "Ping between containers"
      ],
      "resources": [
        "Nana – Docker Networking Deep Dive"
      ]
    },
    {
      "phase": 4,
      "title": "Multi-Container Apps with Docker Compose",
      "goal": "Run multi-service applications together",
      "weeks": "Week 6-7",
      "topics": [
        "What is Docker Compose?",
        "docker-compose.yml file structure",
        "Services, volumes, networks",
        "Environment variables with Compose",
        "Starting/stopping multi-services",
        "Scaling services"
      ],
      "practice": [
        "Build stack with Node.js API, MongoDB, React frontend",
        "Run full stack using docker-compose up",
        "Persist DB data using volumes"
      ],
      "resources": [
        "Traversy Media – Docker Compose Tutorial"
      ]
    },
    {
      "phase": 5,
      "title": "Docker Registry & Image Management",
      "goal": "Manage and push images to registries",
      "weeks": "Week 7",
      "topics": [
        "Docker Hub accounts",
        "Image tags & versions",
        "Private registries",
        "Pushing images to registry",
        "Pulling from registry in production",
        "Best practices for image size reduction"
      ],
      "practice": [
        "Create Docker Hub repo",
        "Push your custom app image",
        "Pull the image on another machine",
        "Optimize image using multistage builds"
      ],
      "resources": [
        "Nana – Dockerfile Best Practices"
      ]
    },
    {
      "phase": 6,
      "title": "Container Security & Best Practices",
      "goal": "Secure container-based workloads",
      "weeks": "Week 8-9",
      "topics": [
        "Container vulnerabilities",
        "Scanning images (Trivy, Clair)",
        "Least privilege principles",
        "Non-root users in Docker",
        "Secrets management",
        "Securing environment variables",
        "Avoiding vulnerable base images"
      ],
      "practice": [
        "Scan image with Trivy",
        "Fix vulnerabilities",
        "Create non-root user Dockerfile",
        "Implement secrets using Docker Secrets"
      ],
      "resources": [
        "Aqua Security – Docker Security"
      ]
    },
    {
      "phase": 7,
      "title": "Real-World DevOps Projects with Docker",
      "goal": "Containerize full production-ready applications",
      "weeks": "Week 9-10",
      "topics": [
        "MERN Stack in Docker",
        "CI/CD + Docker Deployment",
        "Monitoring Setup with Prometheus + Grafana",
        "Reverse proxy with Nginx",
        "Automated builds with GitHub Actions"
      ],
      "practice": [
        "Dockerize Express App",
        "Dockerize React App",
        "Docker Compose Full Stack",
        "Push Image to Docker Hub",
        "Secure Docker Image (Trivy + Best Practices)",
        "Monitor Containers (Prometheus + Grafana)"
      ],
      "resources": [
        "Project-based learning"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "MERN Stack in Docker",
      "description": "Containerize full MERN stack application",
      "technologies": ["Docker", "Node.js", "React", "MongoDB", "Docker Compose"],
      "type": "devops",
      "difficulty": "Intermediate"
    },
    {
      "name": "CI/CD + Docker Deployment",
      "description": "Automated Docker image builds and deployment",
      "technologies": ["GitHub Actions", "Docker Hub", "CI/CD"],
      "type": "devops",
      "difficulty": "Advanced"
    },
    {
      "name": "Monitoring Setup",
      "description": "Container monitoring with Prometheus and Grafana",
      "technologies": ["Prometheus", "Grafana", "Docker", "Monitoring"],
      "type": "devops",
      "difficulty": "Intermediate"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "Docker/Compose/Security tutorials"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Build images, compose stacks"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Containerize full apps"
    }
  ],
  "tools": [
    "Docker & Docker Desktop",
    "Docker Compose",
    "Docker Hub",
    "Trivy",
    "VS Code",
    "GitHub Actions",
    "Prometheus / Grafana"
  ],
  "outcome": "By the end of this roadmap, you'll understand Docker deeply, build & manage container images, run full stack apps in containers, push/pull private Docker images, secure container builds, and be fully prepared for Kubernetes & Infrastructure.",
  "career_paths": [
    "DevOps Engineer",
    "Site Reliability Engineer (SRE)",
    "Cloud Engineer",
    "Platform Engineer",
    "Containerization Specialist",
    "Infrastructure Engineer"
  ]
};

const ContainerizationRoadmap = () => {
  return <RoadmapLayout data={CONTAINERIZATION_ROADMAP} roadmapId={CONTAINERIZATION_ROADMAP.id} />;
};

export default ContainerizationRoadmap;
