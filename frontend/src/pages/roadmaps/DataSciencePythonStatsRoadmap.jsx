import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const DATA_SCIENCE_PYTHON_STATS_ROADMAP = {
  "id": "data-science-python-stats",
  "title": "🧭 Data Science Roadmap — Python & Statistics",
  "description": "Build core Python, data analysis, and statistical foundations essential for all Data Science work.",
  "short_description": "Master Python programming, statistics, probability, and exploratory data analysis",
  "prerequisites": ["Basic computer literacy", "High school mathematics"],
  "estimated_hours": 90,
  "difficulty": "Beginner",
  "category": "Data Science & Analytics",
  "phases": [
    {
      "phase": 1,
      "title": "Python for Data Science",
      "goal": "Learn Python syntax, data structures, and data analysis essentials",
      "weeks": "Week 1-2",
      "topics": [
        "Variables and data types",
        "Lists, tuples, dictionaries, sets",
        "Loops & conditionals",
        "Functions and lambda functions",
        "File handling and error handling",
        "NumPy (arrays, broadcasting)",
        "Pandas (Series, DataFrames)",
        "Matplotlib basics and Seaborn intro"
      ],
      "practice": [
        "Create arrays in NumPy",
        "Load CSV using Pandas",
        "Filter, group, sort data",
        "Plot line/bar/scatter charts"
      ]
    },
    {
      "phase": 2,
      "title": "Descriptive Statistics",
      "goal": "Understand statistics used in understanding & summarizing data",
      "weeks": "Week 2-3",
      "topics": [
        "Measures of central tendency (mean, median, mode)",
        "Measures of spread (variance, std, IQR)",
        "Quartiles and percentiles",
        "Outliers detection using box plots",
        "Skewness & kurtosis",
        "Data distributions and shapes"
      ],
      "practice": [
        "Calculate descriptive stats in Pandas",
        "Create box plots and histograms",
        "Identify outliers using IQR method",
        "Analyze distribution shapes"
      ]
    },
    {
      "phase": 3,
      "title": "Probability for Data Science",
      "goal": "Understand probability foundations for ML & DS",
      "weeks": "Week 3-4",
      "topics": [
        "Basic probability concepts",
        "Conditional probability",
        "Bayes Theorem",
        "Joint & marginal probability",
        "Random variables",
        "Normal distribution",
        "Binomial distribution",
        "Poisson and Exponential distributions"
      ],
      "practice": [
        "Plot distributions using Seaborn",
        "Simulate random data",
        "Apply Bayes theorem on simple datasets",
        "Calculate probabilities for real scenarios"
      ]
    },
    {
      "phase": 4,
      "title": "Inferential Statistics",
      "goal": "Learn hypothesis testing & statistical inference",
      "weeks": "Week 4-5",
      "topics": [
        "Population vs sample",
        "Central Limit Theorem",
        "Confidence intervals",
        "Hypothesis testing fundamentals",
        "Z-test and t-test",
        "Chi-square test",
        "ANOVA (intro)",
        "P-values & statistical significance"
      ],
      "practice": [
        "Perform t-test in Python (scipy)",
        "Calculate confidence intervals",
        "Hypothesis testing on real datasets",
        "Interpret p-values and results"
      ]
    },
    {
      "phase": 5,
      "title": "Exploratory Data Analysis (EDA)",
      "goal": "Analyze, summarize, and visualize datasets",
      "weeks": "Week 5-6",
      "topics": [
        "Missing values analysis",
        "Outliers detection and treatment",
        "Correlation analysis",
        "Heatmaps and correlation matrices",
        "Pair plots and distribution plots",
        "Feature distributions analysis",
        "Summary statistics interpretation",
        "Data quality assessment"
      ],
      "practice": [
        "Perform EDA on Titanic Dataset",
        "Generate correlation matrix & heatmap",
        "Handle missing values appropriately",
        "Visualize categorical vs numerical features"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Titanic Dataset EDA",
      "description": "Comprehensive exploratory data analysis on the famous Titanic dataset",
      "technologies": ["Pandas", "Seaborn", "Matplotlib"],
      "type": "eda",
      "difficulty": "Beginner"
    },
    {
      "name": "Loan Prediction EDA",
      "description": "Analyze loan application data and identify key patterns",
      "technologies": ["Pandas", "Statistics", "Visualization"],
      "type": "eda",
      "difficulty": "Beginner"
    },
    {
      "name": "Sales Dataset Analysis",
      "description": "Analyze sales data and calculate key business metrics",
      "technologies": ["NumPy", "Pandas", "Descriptive Stats"],
      "type": "analysis",
      "difficulty": "Beginner"
    },
    {
      "name": "Distribution Visualization",
      "description": "Visualize 5 different probability distributions",
      "technologies": ["Matplotlib", "Seaborn", "Scipy"],
      "type": "visualization",
      "difficulty": "Beginner"
    },
    {
      "name": "Hypothesis Testing Project",
      "description": "Perform hypothesis testing on real-world dataset",
      "technologies": ["Scipy", "Statistics", "Testing"],
      "type": "statistics",
      "difficulty": "Intermediate"
    },
    {
      "name": "Probability Simulation",
      "description": "Simulate probability scenarios and calculate outcomes",
      "technologies": ["NumPy", "Probability", "Simulation"],
      "type": "probability",
      "difficulty": "Intermediate"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn theory",
      "example": "Stats + Python theory"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Pandas + visualizations"
    },
    {
      "time": "90-120 mins",
      "task": "Project work",
      "example": "EDA or stats project"
    }
  ],
  "tools": [
    "Python",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Seaborn",
    "SciPy",
    "Jupyter Notebook"
  ],
  "outcome": "By the end of Week 6, you will understand Python for Data Science, master probability & statistics, perform EDA confidently, visualize data effectively, and be ready for Data Wrangling & Visualization.",
  "career_paths": [
    "Data Analyst",
    "Business Analyst",
    "Research Analyst",
    "Data Scientist",
    "Statistical Analyst",
    "Business Intelligence Analyst",
    "Market Research Analyst"
  ]
};

const DataSciencePythonStatsRoadmap = () => {
  return <RoadmapLayout data={DATA_SCIENCE_PYTHON_STATS_ROADMAP} roadmapId={DATA_SCIENCE_PYTHON_STATS_ROADMAP.id} />;
};

export default DataSciencePythonStatsRoadmap;
