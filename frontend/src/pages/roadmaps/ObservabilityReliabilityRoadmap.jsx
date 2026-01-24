import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const OBSERVABILITY_RELIABILITY_ROADMAP = {
  "id": "observability-reliability",
  "title": "🧭 Observability & Reliability Roadmap",
  "description": "Master monitoring, logging, alerting, tracing, SRE principles, reliability engineering, error budgets, dashboards, and production system stability.",
  "short_description": "Master monitoring, logging, alerting, tracing, SRE principles, reliability engineering, error budgets, dashboards, and production system stability.",
  "prerequisites": ["Kubernetes basics", "Containerization knowledge", "Basic understanding of microservices"],
  "estimated_hours": 160,
  "difficulty": "Advanced",
  "category": "DevOps & SRE",
  "phases": [
    {
      "phase": 1,
      "title": "Observability Fundamentals",
      "goal": "Understand the core pillars of observability and why it's critical",
      "weeks": "Week 12-13",
      "topics": [
        "Three Pillars of Observability: Metrics, Logs, Traces",
        "Metrics (CPU, RAM, latency, throughput)",
        "Logs (structured logs, log levels)",
        "Traces (distributed tracing for microservices)",
        "SLIs (Service Level Indicators)",
        "SLOs (Service Level Objectives)",
        "Error Budgets",
        "MTTR, MTTD, MTBF",
        "On-call responsibilities",
        "Production incidents"
      ],
      "practice": [
        "Define SLIs & SLOs for a sample app",
        "Create sample on-call escalation plan",
        "Analyze mock logs for errors"
      ],
      "resources": [
        "Google SRE Official Series",
        "TechWorld With Nana – Observability Intro"
      ]
    },
    {
      "phase": 2,
      "title": "Metrics & Monitoring with Prometheus",
      "goal": "Learn metrics collection, exporters, alerts, and PromQL",
      "weeks": "Week 13-15",
      "topics": [
        "Prometheus Architecture (server, targets, exporters)",
        "Pull model (vs push)",
        "PromQL queries",
        "Recording rules",
        "Alert rules",
        "Node Exporter",
        "cAdvisor",
        "Kube-state-metrics",
        "Application Instrumentation"
      ],
      "practice": [
        "Install Prometheus (Docker or Kubernetes)",
        "Scrape metrics from Node Exporter",
        "Query CPU, Memory, Disk metrics",
        "Write 10 PromQL queries",
        "Create alert on high CPU usage via Alertmanager"
      ],
      "resources": [
        "Nana – Prometheus with Kubernetes"
      ]
    },
    {
      "phase": 3,
      "title": "Visualization with Grafana",
      "goal": "Create professional monitoring dashboards",
      "weeks": "Week 15-16",
      "topics": [
        "Grafana setup",
        "Data sources (Prometheus, Loki, Tempo)",
        "Panels & queries",
        "Templating & variables",
        "Alerting from Grafana",
        "Role-based access control"
      ],
      "practice": [
        "Create dashboard for system metrics",
        "Build dashboard for Kubernetes workloads",
        "Add alerts to dashboards",
        "Build 'Service Health Overview' dashboard"
      ],
      "resources": [
        "Grafana Labs – Beginner Guide"
      ]
    },
    {
      "phase": 4,
      "title": "Log Management with ELK/Loki",
      "goal": "Collect, store, and analyze logs across large systems",
      "weeks": "Week 16-17",
      "topics": [
        "ELK Stack (Elasticsearch, Logstash, Kibana)",
        "Log ingestion & pipelines",
        "Structured logs",
        "Queries & visualizations",
        "Log indexing & retention policies",
        "Loki (for Kubernetes)",
        "Promtail log shipping",
        "Labels & streams",
        "Log queries",
        "JSON logs best practices",
        "Log levels (INFO, ERROR, DEBUG, WARN)",
        "Centralized log storage"
      ],
      "practice": [
        "Install ELK stack locally or in Docker",
        "Send app logs to Logstash",
        "Search logs using Kibana",
        "Install Loki + Promtail",
        "Query logs with filters"
      ],
      "resources": [
        "ELK Stack Tutorials – KodeKloud",
        "Grafana Loki Official"
      ]
    },
    {
      "phase": 5,
      "title": "Distributed Tracing",
      "goal": "Trace requests across microservices for debugging & performance",
      "weeks": "Week 17-18",
      "topics": [
        "What is tracing?",
        "Sampling & spans",
        "OpenTelemetry",
        "Jaeger/Tempo basics",
        "Correlation IDs",
        "Distributed tracing patterns"
      ],
      "practice": [
        "Instrument sample microservice with OpenTelemetry",
        "Visualize traces in Jaeger or Tempo",
        "Detect slow services",
        "Analyze root-cause delays"
      ],
      "resources": [
        "CNCF – OpenTelemetry Deep Dive"
      ]
    },
    {
      "phase": 6,
      "title": "Reliability Engineering & SRE",
      "goal": "Apply Google SRE principles to build reliable systems",
      "weeks": "Week 18-20",
      "topics": [
        "SRE Principles",
        "SLIs/SLOs/Error Budgets",
        "Reliability vs Velocity",
        "Toil reduction",
        "Incident Management",
        "Post-Incident reviews",
        "Change management",
        "Blameless culture",
        "Playbooks & Runbooks",
        "On-call rotations",
        "Alert fatigue prevention",
        "Capacity planning",
        "Chaos engineering (intro)"
      ],
      "practice": [
        "Write a full incident postmortem",
        "Create SLO for a service",
        "Build runbook for API downtime",
        "Simulate small failure (chaos test)"
      ],
      "resources": [
        "Google SRE Book Summaries",
        "Chaos Monkey Tutorials"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Prometheus-Grafana Monitoring Stack",
      "description": "Complete monitoring stack with custom dashboards",
      "technologies": ["Prometheus", "Grafana", "Alertmanager"],
      "type": "sre",
      "difficulty": "Advanced"
    },
    {
      "name": "Custom Dashboards for Microservices",
      "description": "Build comprehensive dashboards for microservices architecture",
      "technologies": ["Grafana", "Prometheus", "Kubernetes"],
      "type": "sre",
      "difficulty": "Advanced"
    },
    {
      "name": "Log Management with ELK",
      "description": "Centralized log management and analysis system",
      "technologies": ["ELK Stack", "Logstash", "Kibana"],
      "type": "sre",
      "difficulty": "Advanced"
    },
    {
      "name": "Tracing Setup Using Jaeger",
      "description": "Distributed tracing implementation for microservices",
      "technologies": ["Jaeger", "OpenTelemetry", "Microservices"],
      "type": "sre",
      "difficulty": "Expert"
    },
    {
      "name": "Incident Response Simulation",
      "description": "Full incident response simulation with postmortem",
      "technologies": ["SRE", "Incident Management", "Runbooks"],
      "type": "sre",
      "difficulty": "Advanced"
    },
    {
      "name": "SLO + Error Budget Calculation",
      "description": "Service Level Objectives and error budget implementation",
      "technologies": ["SRE", "SLIs", "SLOs", "Error Budgets"],
      "type": "sre",
      "difficulty": "Advanced"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "Monitoring, logging, tracing videos"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "PromQL, Grafana, ELK, tracing"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Build dashboards & IR playbooks"
    }
  ],
  "tools": [
    "Prometheus",
    "Grafana",
    "Alertmanager",
    "Loki",
    "ELK Stack",
    "Jaeger / Tempo",
    "OpenTelemetry",
    "Kubernetes",
    "cAdvisor",
    "Kube-state-metrics"
  ],
  "outcome": "By the end of this roadmap, you'll be able to monitor full production systems, build dashboards & alerts, analyze logs across microservices, use distributed tracing, manage incidents & reliability, implement SRE principles, and build world-class observability setups.",
  "career_paths": [
    "Site Reliability Engineer (SRE)",
    "DevOps Engineer",
    "Observability Engineer",
    "Platform Engineer",
    "Infrastructure Engineer",
    "Production Engineer",
    "Reliability Engineer"
  ]
};

const ObservabilityReliabilityRoadmap = () => {
  return <RoadmapLayout data={OBSERVABILITY_RELIABILITY_ROADMAP} roadmapId={OBSERVABILITY_RELIABILITY_ROADMAP.id} />;
};

export default ObservabilityReliabilityRoadmap;
