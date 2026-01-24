import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const DATA_SCIENCE_ROADMAP = {
  "id": "data-science",
  "title": "🧭 Data Science Roadmap — Big Data & Pipelines",
  "description": "Learn how to work with massive datasets, use distributed computing frameworks, create automated data pipelines, deploy data workflows, and handle real-world data engineering tasks.",
  "short_description": "Master Big Data, PySpark, ETL pipelines, real-time processing, and cloud data engineering",
  "prerequisites": ["Basic Python programming", "Basic SQL knowledge"],
  "estimated_hours": 160,
  "difficulty": "Intermediate to Advanced",
  "category": "Data Science & Engineering",
  "phases": [
    {
      "phase": 1,
      "title": "Big Data Foundations",
      "goal": "Understand how big data systems work",
      "weeks": "Week 12-13",
      "topics": [
        "What is Big Data? (Volume, Velocity, Variety)",
        "Batch vs Real-time processing",
        "Distributed systems",
        "Parallel computing basics",
        "File Formats: CSV, Parquet, ORC, Avro",
        "Compression: Gzip, Snappy"
      ],
      "practice": [
        "Convert large CSV to Parquet using Python",
        "Analyze performance improvements",
        "Explore 1M+ row dataset"
      ]
    },
    {
      "phase": 2,
      "title": "SQL & Databases",
      "goal": "Master SQL for data extraction & transformations",
      "weeks": "Week 13-14",
      "topics": [
        "SELECT, WHERE, GROUP BY, HAVING",
        "ORDER BY, LIMIT",
        "JOINs (inner, left, right, full)",
        "Subqueries",
        "Window Functions",
        "Views",
        "Database Types: Relational vs NoSQL"
      ],
      "practice": [
        "Write 30-50 SQL queries",
        "Create DB schema",
        "Analyze sales dataset using SQL",
        "Practice window functions"
      ]
    },
    {
      "phase": 3,
      "title": "Distributed Computing with PySpark",
      "goal": "Process huge datasets using Spark",
      "weeks": "Week 14-16",
      "topics": [
        "Spark architecture (Driver, Executors)",
        "RDDs vs DataFrames",
        "Transformations vs Actions",
        "Spark SQL",
        "UDFs (User Defined Functions)",
        "Catalyst optimizer",
        "Tungsten engine",
        "Partitioning",
        "Caching"
      ],
      "practice": [
        "Load a 10M+ record dataset",
        "Perform transformations using PySpark",
        "Use Spark SQL for analysis",
        "Cache data & compare performance"
      ]
    },
    {
      "phase": 4,
      "title": "Data Pipelines & ETL",
      "goal": "Build end-to-end automated workflows",
      "weeks": "Week 16-17",
      "topics": [
        "Extract → Transform → Load",
        "Batch vs streaming ETL",
        "Data cleaning pipelines",
        "Data quality checks",
        "Schema validation",
        "Apache Airflow, Luigi, Prefect",
        "DAGs (Directed Acyclic Graphs)",
        "Schedulers, Operators",
        "Retry policies"
      ],
      "practice": [
        "Create Airflow DAG",
        "Schedule daily data cleaning task",
        "Load cleaned data into DB",
        "Build end-to-end ETL pipeline"
      ]
    },
    {
      "phase": 5,
      "title": "Real-Time Data Processing",
      "goal": "Process live streaming data",
      "weeks": "Week 17-19",
      "topics": [
        "Apache Kafka",
        "Spark Streaming",
        "Flink (optional)",
        "Producers & Consumers",
        "Broker & partitions",
        "Consumer groups",
        "Stream processing",
        "Window operations"
      ],
      "practice": [
        "Install Kafka locally",
        "Produce & consume live messages",
        "Build Spark streaming job",
        "Create real-time dashboard"
      ]
    },
    {
      "phase": 6,
      "title": "Cloud Data Engineering",
      "goal": "Learn cloud-based data tools used in enterprises",
      "weeks": "Week 19-20",
      "topics": [
        "AWS: S3, Glue, Redshift, Athena, EMR",
        "GCP: BigQuery, Dataflow, Dataproc",
        "Azure: Data Factory, Synapse Analytics"
      ],
      "practice": [
        "Store data in S3",
        "Query S3 data using Athena",
        "Run PySpark job on EMR",
        "Run query in BigQuery"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "PySpark Data Cleaning",
      "description": "Data cleaning pipeline for 50M records using PySpark",
      "technologies": ["PySpark", "DataFrames", "Distributed Computing"],
      "type": "data-engineering",
      "difficulty": "Intermediate"
    },
    {
      "name": "Airflow ETL Pipeline",
      "description": "Daily automated ETL pipeline with Apache Airflow",
      "technologies": ["Airflow", "Python", "DAGs"],
      "type": "data-engineering",
      "difficulty": "Intermediate"
    },
    {
      "name": "Kafka Real-Time Analytics",
      "description": "Real-time data processing pipeline with Kafka",
      "technologies": ["Kafka", "Streaming", "Real-time"],
      "type": "data-engineering",
      "difficulty": "Advanced"
    },
    {
      "name": "Spark Streaming Dashboard",
      "description": "Real-time dashboard using Spark Streaming",
      "technologies": ["Spark Streaming", "Dashboard", "Real-time"],
      "type": "data-engineering",
      "difficulty": "Advanced"
    },
    {
      "name": "AWS Big Data Project",
      "description": "End-to-end AWS data pipeline: S3 → Glue → Redshift",
      "technologies": ["AWS", "S3", "Glue", "Redshift"],
      "type": "cloud",
      "difficulty": "Advanced"
    },
    {
      "name": "GCP BigQuery Analytics",
      "description": "BigQuery analytics project with large datasets",
      "technologies": ["GCP", "BigQuery", "SQL"],
      "type": "cloud",
      "difficulty": "Intermediate"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn new topic",
      "example": "Big Data / Spark / Airflow videos"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "PySpark, SQL, ETL, Kafka"
    },
    {
      "time": "90-120 mins",
      "task": "Project work",
      "example": "Build pipelines or streaming app"
    }
  ],
  "tools": [
    "Python & PySpark",
    "SQL (PostgreSQL/MySQL)",
    "Apache Airflow",
    "Apache Kafka",
    "Dask",
    "Parquet",
    "AWS / GCP / Azure",
    "Streamlit / Dash"
  ],
  "outcome": "By the end of this roadmap, you'll handle massive datasets (1M – 100M rows), use PySpark for distributed computing, build Airflow ETL pipelines, use Kafka for real-time streaming, work with cloud data tools (S3, BigQuery, Redshift), and build full Data Engineering + Data Science workflows.",
  "career_paths": [
    "Data Engineer",
    "Big Data Engineer",
    "Data Scientist",
    "MLOps Engineer",
    "Cloud Data Engineer",
    "Data Architect",
    "ETL Developer"
  ]
};

const DataScienceRoadmap = () => {
  return <RoadmapLayout data={DATA_SCIENCE_ROADMAP} roadmapId={DATA_SCIENCE_ROADMAP.id} />;
};

export default DataScienceRoadmap;
