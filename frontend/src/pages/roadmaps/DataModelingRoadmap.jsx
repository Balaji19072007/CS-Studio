import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const DATABASE_DATA_MODELING_ROADMAP = {
  "id": "database-modeling",
  "title": "🧭 Database & Data Modeling Roadmap",
  "description": "Learn SQL & NoSQL databases, design efficient data models, write real queries, integrate databases with backend APIs, and build production-ready data layers.",
  "short_description": "Learn SQL & NoSQL databases, design efficient data models, write real queries, integrate databases with backend APIs, and build production-ready data layers.",
  "prerequisites": ["Basic programming knowledge", "Backend fundamentals"],
  "estimated_hours": 140,
  "difficulty": "Intermediate",
  "category": "Database Development",
  "phases": [
    {
      "phase": 1,
      "title": "Database Fundamentals",
      "goal": "Understand how databases work and learn foundational concepts",
      "weeks": "Week 8-9",
      "topics": [
        "What is a database? (SQL vs NoSQL)",
        "Relational vs Non-relational data",
        "Tables, rows, columns",
        "Primary & foreign keys",
        "ACID vs BASE concepts",
        "What is a schema?",
        "SQL editors (pgAdmin, MySQL Workbench)",
        "NoSQL tools (MongoDB Compass)"
      ],
      "practice": [
        "Create your first table",
        "Insert sample data",
        "Write basic SELECT queries",
        "Create simple JSON document in MongoDB"
      ]
    },
    {
      "phase": 2,
      "title": "SQL — PostgreSQL / MySQL",
      "goal": "Learn to write SQL queries and design relational data models",
      "weeks": "Week 9-11",
      "topics": [
        "CREATE, INSERT, UPDATE, DELETE",
        "SELECT with WHERE",
        "Sorting & filtering",
        "Aggregate functions (COUNT, AVG, MAX, MIN)",
        "Aliases & subqueries",
        "Joins (INNER, LEFT, RIGHT, FULL)",
        "Relationships (one-to-one, one-to-many, many-to-many)",
        "Constraints (UNIQUE, NOT NULL, CHECK)",
        "Indexing & performance",
        "Transactions & COMMIT/ROLLBACK",
        "Views & stored procedures",
        "Normalization (1NF, 2NF, 3NF)",
        "ER diagrams",
        "Mapping relationships"
      ],
      "practice": [
        "Build SQL schema for e-commerce app",
        "Write complex JOIN queries",
        "Create indexes for faster queries",
        "Build stored procedure for daily reporting"
      ]
    },
    {
      "phase": 3,
      "title": "NoSQL — MongoDB",
      "goal": "Learn document-based data modeling and modern NoSQL patterns",
      "weeks": "Week 11-12",
      "topics": [
        "Collections & documents",
        "BSON vs JSON",
        "CRUD operations",
        "Filters, projections, sorting, pagination",
        "Mongoose (for Node.js)",
        "Schemas & validation",
        "Pre/post middleware (hooks)",
        "Virtual fields",
        "Population (relationships)",
        "Embedding vs Referencing",
        "When to choose NoSQL over SQL",
        "Handling large collections"
      ],
      "practice": [
        "Create MongoDB schemas for: Users, Products, Orders",
        "Build CRUD using Mongoose",
        "Use populate() to fetch related data",
        "Build aggregation pipeline for sales data"
      ]
    },
    {
      "phase": 4,
      "title": "Integrating DB with Backend",
      "goal": "Connect databases with Express/Node and build data-driven APIs",
      "weeks": "Week 12-13",
      "topics": [
        "Connecting Express to MongoDB/PostgreSQL",
        "Writing model → controller → service flows",
        "Query optimization",
        "API filtering, sorting, pagination",
        "Handling database errors",
        "Transactions in MongoDB/Postgres",
        "Using ORM/ODM (Prisma, Sequelize, Mongoose)"
      ],
      "practice": [
        "Build routes for user authentication using DB",
        "Implement pagination in API",
        "Implement search filter",
        "Build relationship endpoints (User → Posts → Comments)"
      ]
    },
    {
      "phase": 5,
      "title": "Advanced Data Modeling",
      "goal": "Solve real-world data modeling challenges",
      "weeks": "Week 13-14",
      "topics": [
        "E-commerce modeling (cart, products, orders, payments)",
        "Social media modeling (followers, likes, posts)",
        "Chat app modeling (messages, rooms, participants)",
        "Optimizing models for performance",
        "Caching basics (Redis introduction)",
        "Replication & sharding (high-level)"
      ],
      "practice": [
        "Build ER diagram for social media app",
        "Create Redis-based caching for product search",
        "Create SQL triggers for activity logs"
      ]
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn concept",
      "example": "Watch SQL/Mongo tutorial"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Write queries / create models"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Build schemas or connect DB to API"
    }
  ],
  "tools": [
    "PostgreSQL",
    "MySQL",
    "pgAdmin / MySQL Workbench",
    "MongoDB Atlas",
    "Compass",
    "Prisma (SQL)",
    "Sequelize",
    "Mongoose",
    "Draw.io",
    "LucidChart"
  ],
  "outcome": "By the end of Week 14, you will be able to write SQL & NoSQL queries confidently, design production-ready data models, build scalable database schemas, connect DBs to your backend, and optimize and analyze data structures.",
  "career_paths": [
    "Database Administrator",
    "Data Engineer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Architect",
    "Database Developer"
  ]
};

const DatabaseDataModelingRoadmap = () => {
  return <RoadmapLayout data={DATABASE_DATA_MODELING_ROADMAP} roadmapId={DATABASE_DATA_MODELING_ROADMAP.id} />;
};

export default DatabaseDataModelingRoadmap;
