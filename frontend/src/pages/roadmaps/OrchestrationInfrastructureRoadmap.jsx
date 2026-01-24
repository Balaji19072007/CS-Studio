import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const ORCHESTRATION_INFRASTRUCTURE_ROADMAP = {
  "id": "orchestration-infrastructure",
  "title": "🧭 Orchestration & Infrastructure Roadmap",
  "description": "Master Kubernetes, infrastructure-as-code, cloud platforms, networking, load balancing, scaling, and deploying production-ready containerized systems.",
  "short_description": "Master Kubernetes, infrastructure-as-code, cloud platforms, networking, load balancing, scaling, and deploying production-ready containerized systems.",
  "prerequisites": ["Docker & Containerization knowledge", "Basic command line skills"],
  "estimated_hours": 180,
  "difficulty": "Advanced",
  "category": "DevOps & Infrastructure",
  "phases": [
    {
      "phase": 1,
      "title": "Cloud & Infrastructure Basics",
      "goal": "Understand how cloud infrastructure works before using Kubernetes",
      "weeks": "Week 8-9",
      "topics": [
        "What is cloud computing?",
        "IaaS, PaaS, SaaS",
        "Virtual machines vs containers",
        "Regions, zones, VPCs",
        "Compute, storage, networking basics",
        "Load balancers (L4 vs L7)",
        "Reverse proxies (Nginx overview)",
        "Cloud Providers: AWS (EC2, S3, IAM), Azure (VMs, Blob storage), GCP (Compute Engine)"
      ],
      "practice": [
        "Create free-tier AWS/GCP/Azure account",
        "Launch a VM",
        "SSH into cloud instance",
        "Install Nginx & expose a webpage"
      ],
      "resources": [
        "TechWorld with Nana – Cloud Computing Basics",
        "FreeCodeCamp – AWS Introduction"
      ]
    },
    {
      "phase": 2,
      "title": "Kubernetes Fundamentals",
      "goal": "Learn core Kubernetes concepts and how clusters work",
      "weeks": "Week 9-11",
      "topics": [
        "What is Kubernetes & why it's needed",
        "Cluster architecture",
        "Master & worker nodes",
        "API server, Controller manager, Scheduler",
        "Kubelet, Kube Proxy",
        "Pods, ReplicaSets, Deployments",
        "Services (ClusterIP, NodePort, LoadBalancer)",
        "ConfigMaps, Secrets, Namespaces",
        "Pod Networking, CNI basics",
        "Ingress vs Service"
      ],
      "practice": [
        "Install Minikube or Kind",
        "Create a Pod",
        "Expose it with NodePort",
        "Create Deployment with 3 replicas",
        "Scale replicas (up/down)",
        "Create ConfigMap and use it in Pod"
      ],
      "resources": [
        "Nana – Kubernetes Zero to Hero",
        "CodeWithMosh – K8s Crash Course"
      ]
    },
    {
      "phase": 3,
      "title": "Kubernetes Workloads & Storage",
      "goal": "Learn persistent storage, scheduling, jobs, and resource limits",
      "weeks": "Week 11-12",
      "topics": [
        "Volumes, Persistent Volumes (PV)",
        "Persistent Volume Claims (PVC)",
        "Storage Classes",
        "StatefulSets, DaemonSets",
        "CronJobs & Jobs",
        "CPU/Memory limits",
        "Resource requests",
        "Horizontal Pod Autoscaler",
        "Pod disruption budgets"
      ],
      "practice": [
        "Bind a PV/PVC to a database container",
        "Configure CPU/memory limits",
        "Run CronJob to test scheduled tasks"
      ],
      "resources": [
        "Nana – Kubernetes Storage Explained"
      ]
    },
    {
      "phase": 4,
      "title": "Services, Ingress & Networking",
      "goal": "Build large-scale networked applications",
      "weeks": "Week 12-13",
      "topics": [
        "Service Types: ClusterIP, NodePort, LoadBalancer",
        "Ingress Controller (NGINX ingress)",
        "Routing rules, TLS termination",
        "Kube-proxy, Services DNS",
        "Pod-to-pod communication"
      ],
      "practice": [
        "Create Ingress for multiple services",
        "Use TLS certificate for HTTPS",
        "Deploy multi-service app with Ingress rules"
      ],
      "resources": [
        "NGINX Ingress Controller Tutorials"
      ]
    },
    {
      "phase": 5,
      "title": "Infrastructure as Code (IaC)",
      "goal": "Provision cloud infrastructure using declarative files",
      "weeks": "Week 13-14",
      "topics": [
        "Terraform Basics: Providers, Resources",
        "Variables & outputs, State file, Modules",
        "Create VPC, VM, Load Balancer",
        "Create Kubernetes cluster (EKS, GKE, AKS)"
      ],
      "practice": [
        "Bootstrap VM on AWS using Terraform",
        "Provision Kubernetes cluster",
        "Manage Terraform state file",
        "Use modules & variables"
      ],
      "resources": [
        "Nana – Terraform Full Course"
      ]
    },
    {
      "phase": 6,
      "title": "Kubernetes Deployments & Production Setup",
      "goal": "Deploy real apps on Kubernetes with best practices",
      "weeks": "Week 14-15",
      "topics": [
        "CI/CD to Kubernetes",
        "Rolling updates, Canary deployments",
        "Blue-green deployments",
        "Resource quotas, Secrets management",
        "Pod health checks (Liveness/Readiness probes)",
        "Logs & monitoring basics"
      ],
      "practice": [
        "Deploy MERN app to K8s",
        "Use ConfigMaps & Secrets",
        "Set liveness probes",
        "Implement rolling updates with zero downtime"
      ],
      "resources": [
        "Kubernetes Deployment Strategies (Nana)"
      ]
    },
    {
      "phase": 7,
      "title": "Cloud Infrastructure Deployment",
      "goal": "Combine everything — deploy production-level infra",
      "weeks": "Week 15-16",
      "topics": [
        "Deploy Kubernetes cluster with Terraform",
        "Manage nodes, autoscaling groups",
        "Cloud networking (subnets, route tables)",
        "Load Balancer + Ingress + DNS",
        "SSL Certificates (LetsEncrypt/Cert-Manager)",
        "Cloud storage integration"
      ],
      "practice": [
        "Deploy a Kubernetes cluster using Terraform",
        "Deploy your full-stack app on cloud K8s",
        "Configure HTTPS + Domain + Ingress",
        "Implement autoscaling"
      ],
      "resources": [
        "Advanced Kubernetes Deployment Patterns"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Full Kubernetes Deployment",
      "description": "Deploy Node app, Frontend, MongoDB with Ingress + TLS",
      "technologies": ["Kubernetes", "Docker", "Ingress", "TLS"],
      "type": "devops",
      "difficulty": "Advanced"
    },
    {
      "name": "Terraform Cloud Infra",
      "description": "Create VPC + Subnets + VM + LB + K8s cluster",
      "technologies": ["Terraform", "AWS/GCP/Azure", "Kubernetes"],
      "type": "devops",
      "difficulty": "Advanced"
    },
    {
      "name": "Autoscaling Setup",
      "description": "Implement Horizontal Pod Autoscaler (HPA)",
      "technologies": ["Kubernetes", "HPA", "Metrics"],
      "type": "devops",
      "difficulty": "Advanced"
    },
    {
      "name": "Multi-Service Microservice Deployment",
      "description": "Deploy complex microservices architecture",
      "technologies": ["Kubernetes", "Microservices", "Service Mesh"],
      "type": "devops",
      "difficulty": "Expert"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learning",
      "example": "K8s/Cloud/Terraform videos"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Deploy pods, services, IaC resources"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Deploy full stack app"
    }
  ],
  "tools": [
    "Kubernetes (K8s)",
    "Minikube / Kind",
    "kubectl",
    "Terraform",
    "AWS/GCP/Azure",
    "NGINX Ingress",
    "Helm (optional advanced)",
    "Docker"
  ],
  "outcome": "By the end of this roadmap, you'll understand Cloud Infrastructure, use Kubernetes professionally, deploy production workloads, build IaC with Terraform, manage services, ingress & storage, and be ready for Observability & Reliability.",
  "career_paths": [
    "DevOps Engineer",
    "Site Reliability Engineer (SRE)",
    "Cloud Engineer",
    "Kubernetes Administrator",
    "Infrastructure Engineer",
    "Platform Engineer",
    "Cloud Architect"
  ]
};

const OrchestrationInfrastructureRoadmap = () => {
  return <RoadmapLayout data={ORCHESTRATION_INFRASTRUCTURE_ROADMAP} roadmapId={ORCHESTRATION_INFRASTRUCTURE_ROADMAP.id} />;
};

export default OrchestrationInfrastructureRoadmap;
