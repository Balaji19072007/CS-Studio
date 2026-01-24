import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const AI_MATH_FUNDAMENTALS_ROADMAP = {
  "id": "ai-math-fundamentals",
  "title": "🧭 AI / Machine Learning – Math & Fundamentals Roadmap",
  "description": "Build the core mathematical and programming foundations required for machine learning — including Python, statistics, probability, linear algebra, and calculus.",
  "short_description": "Build the core mathematical and programming foundations required for machine learning — including Python, statistics, probability, linear algebra, and calculus.",
  "prerequisites": ["Basic programming knowledge", "High school mathematics"],
  "estimated_hours": 120,
  "difficulty": "Beginner to Intermediate",
  "category": "Data Science & AI",
  "phases": [
    {
      "phase": 1,
      "title": "Python for Machine Learning",
      "goal": "Learn Python essentials needed for data science & ML",
      "weeks": "Week 1",
      "topics": [
        "Python basics (variables, loops, functions)",
        "Lists, tuples, dictionaries",
        "Error handling",
        "File handling",
        "Modules & packages",
        "Virtual environments",
        "Jupyter Notebook basics",
        "NumPy basics",
        "Pandas basics",
        "Matplotlib & Seaborn intro"
      ],
      "practice": [
        "Create Python scripts for simple tasks",
        "Use NumPy arrays for calculations",
        "Create Pandas DataFrame",
        "Plot graphs using Matplotlib"
      ],
      "resources": [
        "FreeCodeCamp – Python for Beginners",
        "Corey Schafer – Python Tutorials"
      ]
    },
    {
      "phase": 2,
      "title": "Statistics & Probability",
      "goal": "Understand the statistics behind ML models",
      "weeks": "Week 1-3",
      "topics": [
        "Descriptive Statistics: Mean, median, mode",
        "Variance, standard deviation",
        "Skewness & kurtosis",
        "Basic probability rules",
        "Conditional probability",
        "Bayes' theorem",
        "Random variables",
        "Normal distribution",
        "Binomial distribution",
        "Poisson distribution",
        "Uniform distribution",
        "t-test",
        "Chi-square test",
        "p-value & significance"
      ],
      "practice": [
        "Calculate statistics using NumPy/Pandas",
        "Perform t-tests on sample data",
        "Plot distributions in Matplotlib"
      ],
      "resources": [
        "StatQuest – Statistics Playlist",
        "Khan Academy – Probability"
      ]
    },
    {
      "phase": 3,
      "title": "Linear Algebra",
      "goal": "Learn math behind vectors, matrices & transformations",
      "weeks": "Week 3-4",
      "topics": [
        "Scalars, vectors, matrices",
        "Matrix operations",
        "Dot product & cross product",
        "Matrix multiplication",
        "Eigenvalues & eigenvectors",
        "Orthogonality",
        "Inverse & transpose",
        "PCA (Principal Component Analysis)",
        "Word embeddings",
        "Neural network weight matrices"
      ],
      "practice": [
        "Perform matrix multiplications using NumPy",
        "Compute eigenvalues using NumPy",
        "Implement PCA manually"
      ],
      "resources": [
        "3Blue1Brown – Linear Algebra",
        "StatQuest – PCA Explained"
      ]
    },
    {
      "phase": 4,
      "title": "Calculus for Machine Learning",
      "goal": "Understand derivatives & optimization — key to training ML models",
      "weeks": "Week 4-5",
      "topics": [
        "Functions & slopes",
        "Partial derivatives",
        "Multivariable calculus",
        "Cost/loss functions",
        "Gradient descent intuition",
        "Learning rate",
        "Convergence",
        "Chain Rule for backpropagation"
      ],
      "practice": [
        "Compute derivatives in Python",
        "Implement gradient descent on a simple function",
        "Visualize cost function reduction"
      ],
      "resources": [
        "3Blue1Brown – Calculus Series",
        "StatQuest – Gradient Descent"
      ]
    },
    {
      "phase": 5,
      "title": "Data Handling & Preprocessing",
      "goal": "Prepare datasets for ML models",
      "weeks": "Week 5-6",
      "topics": [
        "Handling missing data",
        "One-hot encoding",
        "Normalization & standardization",
        "Train-test split",
        "Outlier detection",
        "Feature scaling",
        "Data augmentation basics"
      ],
      "practice": [
        "Clean messy dataset with Pandas",
        "Perform one-hot encoding",
        "Normalize features",
        "Split into train/test sets"
      ],
      "resources": [
        "Kaggle – Pandas Course",
        "Krish Naik – Data Preprocessing"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Exploratory Data Analysis (EDA)",
      "description": "Comprehensive data analysis and visualization",
      "technologies": ["Pandas", "Matplotlib", "Seaborn"],
      "type": "data-science",
      "difficulty": "Beginner"
    },
    {
      "name": "Dataset Preprocessing Pipeline",
      "description": "Build complete data preprocessing workflow",
      "technologies": ["Pandas", "NumPy", "Scikit-learn"],
      "type": "data-science",
      "difficulty": "Intermediate"
    },
    {
      "name": "Manual Gradient Descent Implementation",
      "description": "Implement gradient descent from scratch",
      "technologies": ["NumPy", "Matplotlib"],
      "type": "machine-learning",
      "difficulty": "Intermediate"
    },
    {
      "name": "Statistical Distributions Visualization",
      "description": "Plot and analyze various probability distributions",
      "technologies": ["Matplotlib", "Seaborn", "SciPy"],
      "type": "statistics",
      "difficulty": "Beginner"
    },
    {
      "name": "PCA on Real Dataset",
      "description": "Apply Principal Component Analysis to real data",
      "technologies": ["NumPy", "Scikit-learn", "Matplotlib"],
      "type": "machine-learning",
      "difficulty": "Intermediate"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn",
      "example": "Stats/ML math videos"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "NumPy, Pandas, gradient descent"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "EDA, preprocessing"
    }
  ],
  "tools": [
    "Python",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Seaborn",
    "Jupyter Notebook"
  ],
  "outcome": "By the end of this roadmap, you'll understand stats, probability, algebra & calculus used in ML, use Python, NumPy, Pandas confidently, perform EDA & preprocessing, and be ready for Core ML Algorithms.",
  "career_paths": [
    "Machine Learning Engineer",
    "Data Scientist",
    "AI Researcher",
    "Data Analyst",
    "MLOps Engineer",
    "Quantitative Analyst",
    "Business Intelligence Analyst"
  ]
};

const AIMathFundamentalsRoadmap = () => {
  return <RoadmapLayout data={AI_MATH_FUNDAMENTALS_ROADMAP} roadmapId={AI_MATH_FUNDAMENTALS_ROADMAP.id} />;
};

export default AIMathFundamentalsRoadmap;
