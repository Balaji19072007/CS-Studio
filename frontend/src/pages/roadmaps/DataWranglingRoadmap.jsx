import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const DATA_WRANGLING_ROADMAP = {
  "id": "data-wrangling",
  "title": "🧭 Data Wrangling & Visualization Roadmap",
  "description": "Master data cleaning, manipulation, transformation, visualization, handling large datasets, feature engineering, and preparing data for ML models.",
  "short_description": "Master data cleaning, visualization, feature engineering, and large dataset handling",
  "prerequisites": ["Basic Python programming", "Basic statistics"],
  "estimated_hours": 120,
  "difficulty": "Beginner to Intermediate",
  "category": "Data Science & Analytics",
  "phases": [
    {
      "phase": 1,
      "title": "Data Wrangling Foundations",
      "goal": "Learn how to clean and prepare raw data for analysis",
      "weeks": "Week 4-5",
      "topics": [
        "Handle missing values: Drop rows, Mean/median imputation, Forward/backward fill",
        "Duplicates detection and removal",
        "Handling inconsistent data",
        "Parsing dates & timestamps",
        "Converting data types (casting)",
        "String handling: Split/strip/replace",
        "Regex basics for text cleaning"
      ],
      "practice": [
        "Clean missing values in Pandas",
        "Fix incorrect data types",
        "Parse timestamps (YYYY-MM-DD → datetime)",
        "Detect & remove duplicates",
        "Clean messy columns with regex"
      ]
    },
    {
      "phase": 2,
      "title": "Data Manipulation with Pandas",
      "goal": "Master advanced Pandas operations for real-world datasets",
      "weeks": "Week 5-6",
      "topics": [
        "Filtering and conditional selection",
        "Sorting & ranking",
        "GroupBy operations",
        "Aggregation (sum, mean, count)",
        "Pivot tables",
        "Merging & joining DataFrames",
        "Multi-indexing",
        "Melting & reshaping"
      ],
      "practice": [
        "Group sales data by category",
        "Merge multiple CSVs",
        "Create pivot table for monthly sales",
        "Build multi-index DataFrame"
      ]
    },
    {
      "phase": 3,
      "title": "Feature Engineering & Transformation",
      "goal": "Create meaningful features for ML models",
      "weeks": "Week 6-7",
      "topics": [
        "One-hot encoding and Label encoding",
        "Binning / bucketing",
        "Log transformations",
        "Scaling (MinMax, StandardScaler)",
        "Polynomial features",
        "Text vectorization (TF-IDF intro)",
        "Datetime features: year, month, hour extraction",
        "Time-based indexing and rolling windows",
        "Feature selection: Correlation, SelectKBest, RFE"
      ],
      "practice": [
        "Encode categorical columns",
        "Scale numeric features",
        "Create polynomial features",
        "Extract time-based features",
        "Select top features with SelectKBest"
      ]
    },
    {
      "phase": 4,
      "title": "Data Visualization",
      "goal": "Learn to visualize data effectively using Python",
      "weeks": "Week 7-8",
      "topics": [
        "Matplotlib: Line, Bar, Scatter, Pie plots",
        "Customizing colors, titles, labels",
        "Seaborn: Pairplot, Heatmap, Boxplot, Violin plot, KDE plot",
        "Plotly: Interactive line/scatter plots",
        "Dashboard basics"
      ],
      "practice": [
        "Create heatmap for correlation matrix",
        "Plot distribution of numerical features",
        "Build pair plot for full dataset",
        "Create interactive dashboard using Plotly"
      ]
    },
    {
      "phase": 5,
      "title": "Handling Large Datasets",
      "goal": "Learn to manage big datasets efficiently",
      "weeks": "Week 8-9",
      "topics": [
        "Chunking with Pandas",
        "Using Dask DataFrame",
        "Memory optimization techniques",
        "Efficient file formats (Parquet, Feather)",
        "Vectorized operations"
      ],
      "practice": [
        "Process 1M+ rows using chunking",
        "Convert CSV to Parquet",
        "Use Dask to load large dataset"
      ]
    },
    {
      "phase": 6,
      "title": "Real-World Data Wrangling Projects",
      "goal": "Apply everything to real messy datasets",
      "weeks": "Week 9-10",
      "topics": [
        "E-commerce Sales Cleaning: Missing prices, category naming, date features",
        "Financial Data Preparation: Stock market data, time series resampling, feature extraction",
        "Social Media Data: Text cleaning, emoji removal, stopwords, text features",
        "Interactive Dashboard: Plotly Dash or Streamlit, KPIs & graphs"
      ],
      "practice": [
        "Clean 3 messy Kaggle datasets",
        "Build correlation heatmaps",
        "Create automated data cleaning pipeline",
        "Build Plotly dashboard for analysis",
        "Transform data for ML model using pipeline"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "E-commerce Sales Cleaning",
      "description": "Handle missing prices, fix category naming, extract date features",
      "technologies": ["Pandas", "Data Cleaning", "Feature Engineering"],
      "type": "data-cleaning",
      "difficulty": "Beginner"
    },
    {
      "name": "Financial Data Preparation",
      "description": "Download stock market data, resample time series, extract features",
      "technologies": ["Time Series", "Pandas", "Feature Extraction"],
      "type": "finance",
      "difficulty": "Intermediate"
    },
    {
      "name": "Social Media Data Cleaning",
      "description": "Clean text data, remove emojis & stopwords, convert text to features",
      "technologies": ["Text Processing", "Regex", "NLP Basics"],
      "type": "text-data",
      "difficulty": "Intermediate"
    },
    {
      "name": "Interactive Dashboard",
      "description": "Use Plotly Dash or Streamlit to show KPIs & graphs",
      "technologies": ["Plotly", "Streamlit", "Dashboard"],
      "type": "visualization",
      "difficulty": "Intermediate"
    },
    {
      "name": "Automated Data Pipeline",
      "description": "Create automated data cleaning and transformation pipeline",
      "technologies": ["Pandas", "Automation", "Pipeline"],
      "type": "engineering",
      "difficulty": "Advanced"
    },
    {
      "name": "Large Dataset Optimization",
      "description": "Process 1M+ row dataset using Dask and efficient formats",
      "technologies": ["Dask", "Parquet", "Optimization"],
      "type": "big-data",
      "difficulty": "Advanced"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn new topic",
      "example": "Data cleaning + visualization lessons"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Pandas, Seaborn, Dask"
    },
    {
      "time": "90-120 mins",
      "task": "Project work",
      "example": "Clean/visualize full datasets"
    }
  ],
  "tools": [
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Plotly",
    "Dask",
    "Streamlit / Dash"
  ],
  "outcome": "By the end of Week 10, you will clean & transform any dataset, visualize data in charts & dashboards, handle large datasets efficiently, engineer features for ML, and be fully ready for Modeling & Evaluation.",
  "career_paths": [
    "Data Analyst",
    "Business Intelligence Analyst",
    "Data Engineer",
    "Data Scientist",
    "Reporting Analyst",
    "Data Visualization Specialist",
    "ML Engineer"
  ]
};

const DataWranglingRoadmap = () => {
  return <RoadmapLayout data={DATA_WRANGLING_ROADMAP} roadmapId={DATA_WRANGLING_ROADMAP.id} />;
};

export default DataWranglingRoadmap;
