import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const PRODUCTION_MLOPS_ROADMAP = {
  "id": "production-mlops",
  "title": "🧭 Production & MLOps Roadmap",
  "description": "Learn how to deploy ML/DL models, build scalable ML pipelines, monitor models, manage data/versioning, and apply DevOps practices to machine learning (MLOps).",
  "short_description": "Master ML model deployment, MLOps pipelines, monitoring, and production systems",
  "prerequisites": ["Machine Learning fundamentals", "Python programming", "Basic Docker knowledge"],
  "estimated_hours": 160,
  "difficulty": "Advanced",
  "category": "MLOps & Engineering",
  "phases": [
    {
      "phase": 1,
      "title": "Model Deployment Foundations",
      "goal": "Understand how ML models go from notebooks to production",
      "weeks": "Week 16-17",
      "topics": [
        "Batch vs real-time inference",
        "CI/CD for ML",
        "Model packaging and serialization",
        "REST API basics",
        "Microservices architecture for ML",
        "CPU vs GPU deployment considerations",
        "ML model latency vs throughput",
        "FastAPI and Flask frameworks",
        "TensorFlow Serving and TorchServe"
      ],
      "practice": [
        "Export trained ML model (pickle/pt/h5)",
        "Build REST API using FastAPI",
        "Deploy model locally & test predictions",
        "Serve PyTorch model using TorchServe"
      ]
    },
    {
      "phase": 2,
      "title": "Dockerizing & Cloud Deployments",
      "goal": "Deploy ML models in real cloud environments",
      "weeks": "Week 17-18",
      "topics": [
        "Containerizing ML applications",
        "Building Dockerfile for ML API",
        "Environment management and dependencies",
        "GPU Docker images and optimization",
        "AWS EC2 deployment",
        "AWS Lambda for serverless ML",
        "Google Cloud Run",
        "Azure App Services"
      ],
      "practice": [
        "Create Dockerfile for FastAPI model",
        "Deploy the model to Render/Cloud Run",
        "Use GPU on Colab/AWS EC2 for inference",
        "Configure environment variables and secrets"
      ]
    },
    {
      "phase": 3,
      "title": "Data Versioning & ML Workflow Automation",
      "goal": "Manage datasets, experiments, model versions, and pipelines",
      "weeks": "Week 18-20",
      "topics": [
        "DVC (Data Version Control)",
        "Git + DVC workflow integration",
        "Versioning datasets & models",
        "MLflow tracking for experiments",
        "Parameters, metrics, and artifacts tracking",
        "MLflow Model Registry",
        "Scikit-Learn Pipelines",
        "TFX pipelines introduction",
        "Kubeflow Pipelines basics"
      ],
      "practice": [
        "Create DVC repo for dataset versioning",
        "Track experiments in MLflow",
        "Compare model metrics visually",
        "Build simple ML pipeline in sklearn",
        "Register models in MLflow Model Registry"
      ]
    },
    {
      "phase": 4,
      "title": "Scalable Model Serving & APIs",
      "goal": "Deploy ML models at scale for thousands of users",
      "weeks": "Week 20-21",
      "topics": [
        "Load balancing strategies",
        "Autoscaling ML services",
        "Producer–consumer pattern",
        "Message queues (RabbitMQ, Kafka intro)",
        "Model caching techniques",
        "GPU/CPU scheduling optimization",
        "Seldon Core for model serving",
        "MLflow Model Serving",
        "Kubernetes deployments",
        "Horizontal Pod Autoscaler"
      ],
      "practice": [
        "Deploy model to Kubernetes cluster",
        "Test autoscaling with HPA",
        "Deploy model using MLflow serving",
        "Use Redis cache to speed up inference",
        "Configure load balancer for ML API"
      ]
    },
    {
      "phase": 5,
      "title": "Monitoring, Alerts & Drift Detection",
      "goal": "Monitor production ML models and detect issues",
      "weeks": "Week 21-22",
      "topics": [
        "Input drift detection",
        "Prediction drift detection",
        "Data quality metrics monitoring",
        "Performance monitoring and logging",
        "Prometheus + Grafana setup",
        "Evidently AI for drift detection",
        "Seldon Alibi Detect",
        "Alerting systems configuration",
        "Anomaly detection in production",
        "Response playbooks for model issues"
      ],
      "practice": [
        "Create dashboard for ML predictions monitoring",
        "Detect drift using Evidently AI",
        "Send alert when drift exceeds threshold",
        "Log inference results to database",
        "Set up monitoring with Prometheus"
      ]
    },
    {
      "phase": 6,
      "title": "Advanced MLOps & Production Architecture",
      "goal": "Build complete end-to-end ML systems with automation and reliability",
      "weeks": "Week 22-24",
      "topics": [
        "Full MLOps Architecture design",
        "Data ingestion pipelines",
        "Feature stores (Feast)",
        "Automated retraining workflows",
        "Model validation techniques",
        "Canary deployments for ML models",
        "Continuous Training (CT)",
        "Shadow deployment strategies",
        "API security best practices",
        "Model poisoning attacks prevention",
        "Adversarial robustness",
        "Protecting model files and IP"
      ],
      "practice": [
        "Build real-time inference pipeline",
        "Implement automated retraining workflow",
        "Deploy A/B testing for ML model",
        "Create full MLOps pipeline with MLflow + DVC",
        "Set up feature store with Feast"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Iris Classifier Deployment",
      "description": "Deploy Iris classifier with FastAPI + Docker",
      "technologies": ["FastAPI", "Docker", "Scikit-learn"],
      "type": "deployment",
      "difficulty": "Intermediate"
    },
    {
      "name": "CNN Cloud Deployment",
      "description": "Deploy CNN on Cloud Run using GPU acceleration",
      "technologies": ["TensorFlow", "Google Cloud Run", "GPU"],
      "type": "cloud-deployment",
      "difficulty": "Advanced"
    },
    {
      "name": "MLflow Tracking System",
      "description": "Create MLflow Tracking + Model Registry implementation",
      "technologies": ["MLflow", "Model Registry", "Experiment Tracking"],
      "type": "mlops",
      "difficulty": "Intermediate"
    },
    {
      "name": "DVC Data Pipeline",
      "description": "Build DVC dataset versioning pipeline",
      "technologies": ["DVC", "Git", "Data Versioning"],
      "type": "versioning",
      "difficulty": "Intermediate"
    },
    {
      "name": "Drift Detection Dashboard",
      "description": "Create drift detection dashboard using Evidently AI",
      "technologies": ["Evidently AI", "Monitoring", "Dash"],
      "type": "monitoring",
      "difficulty": "Advanced"
    },
    {
      "name": "Full MLOps Pipeline",
      "description": "End-to-end MLOps pipeline: Train → Track → Serve → Monitor",
      "technologies": ["MLflow", "DVC", "FastAPI", "Evidently AI"],
      "type": "end-to-end",
      "difficulty": "Advanced"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn concepts",
      "example": "Deployment / MLOps videos"
    },
    {
      "time": "30-90 mins",
      "task": "Practice tools",
      "example": "MLflow, Docker, FastAPI"
    },
    {
      "time": "90-120 mins",
      "task": "Project work",
      "example": "Deploy models & monitor"
    }
  ],
  "tools": [
    "FastAPI & Flask",
    "Docker & Kubernetes",
    "MLflow & DVC",
    "Evidently AI",
    "Seldon Core",
    "TensorFlow Serving / TorchServe",
    "Prometheus & Grafana",
    "AWS/GCP/Azure Cloud",
    "Git & GitHub Actions"
  ],
  "outcome": "By the end of Week 24, you will be able to deploy ML & deep learning models, build scalable inference APIs, track experiments & version ML assets, detect model drift, build full MLOps pipelines, and deploy production-ready AI systems.",
  "career_paths": [
    "MLOps Engineer",
    "Machine Learning Engineer",
    "ML Infrastructure Engineer",
    "AI Platform Engineer",
    "DevOps Engineer (ML Focus)",
    "Cloud ML Engineer",
    "ML Systems Architect"
  ]
};

const ProductionMLOpsRoadmap = () => {
  return <RoadmapLayout data={PRODUCTION_MLOPS_ROADMAP} roadmapId={PRODUCTION_MLOPS_ROADMAP.id} />;
};

export default ProductionMLOpsRoadmap;
