import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const CORE_ML_ALGORITHMS_ROADMAP = {
  "id": "core-ml-algorithms",
  "title": "🧭 Core Machine Learning Algorithms Roadmap",
  "description": "Learn all foundational ML algorithms, model workflows, evaluation metrics, and build end-to-end ML projects.",
  "short_description": "Learn all foundational ML algorithms, model workflows, evaluation metrics, and build end-to-end ML projects.",
  "prerequisites": ["Python programming", "Statistics & Linear Algebra", "Data preprocessing basics"],
  "estimated_hours": 140,
  "difficulty": "Intermediate",
  "category": "Data Science & AI",
  "phases": [
    {
      "phase": 1,
      "title": "Machine Learning Foundations",
      "goal": "Understand ML types, workflows, and essential concepts",
      "weeks": "Week 6-7",
      "topics": [
        "What is Machine Learning?",
        "ML workflow (data → model → evaluation → tuning → deploy)",
        "Supervised Learning",
        "Unsupervised Learning",
        "Semi-supervised Learning",
        "Reinforcement Learning (Intro)",
        "Underfitting & Overfitting",
        "Bias-variance tradeoff",
        "Feature engineering",
        "Cross-validation"
      ],
      "practice": [
        "Split dataset into train/test",
        "Perform k-fold cross-validation",
        "Perform feature engineering on a dataset"
      ],
      "resources": [
        "StatQuest – ML Fundamentals",
        "Krish Naik – ML Introduction"
      ]
    },
    {
      "phase": 2,
      "title": "Supervised Learning — Regression",
      "goal": "Understand and implement regression models from scratch",
      "weeks": "Week 7-8",
      "topics": [
        "Linear Regression",
        "Polynomial Regression",
        "Ridge, Lasso, ElasticNet",
        "Logistic Regression (binary classification)",
        "Cost function",
        "Gradient descent",
        "Regularization",
        "One-vs-rest classification"
      ],
      "practice": [
        "Implement linear regression manually",
        "Fit regression with Scikit-Learn",
        "Perform Lasso/Ridge and compare results"
      ],
      "resources": [
        "StatQuest – Linear/Logistic Regression",
        "Andrew Ng – Coursera ML"
      ]
    },
    {
      "phase": 3,
      "title": "Supervised Learning — Classification",
      "goal": "Learn commonly used classification algorithms",
      "weeks": "Week 8-9",
      "topics": [
        "K-Nearest Neighbors (KNN)",
        "Support Vector Machines (SVM)",
        "Decision Trees",
        "Random Forest",
        "Gradient Boosting",
        "XGBoost / LightGBM",
        "Hyperparameters",
        "Decision boundaries",
        "Margin in SVM",
        "Tree impurity (Gini, entropy)"
      ],
      "practice": [
        "Build Random Forest classifier",
        "Tune hyperparameters using GridSearchCV",
        "Compare SVM vs KNN performance"
      ],
      "resources": [
        "StatQuest – SVM, Trees, Random Forest",
        "CodeBasics – ML Algorithms"
      ]
    },
    {
      "phase": 4,
      "title": "Unsupervised Learning",
      "goal": "Learn clustering, dimensionality reduction & anomaly detection",
      "weeks": "Week 9-10",
      "topics": [
        "K-means clustering",
        "Hierarchical clustering",
        "DBSCAN",
        "PCA (deep dive)",
        "t-SNE",
        "UMAP (optional)",
        "Isolation Forest",
        "One-class SVM"
      ],
      "practice": [
        "Perform K-means clustering",
        "Reduce dataset using PCA",
        "Detect anomalies using Isolation Forest"
      ],
      "resources": [
        "StatQuest – PCA, Clustering",
        "Krish Naik – Unsupervised Learning"
      ]
    },
    {
      "phase": 5,
      "title": "Model Evaluation & Metrics",
      "goal": "Evaluate ML models properly using industry-standard metrics",
      "weeks": "Week 10-11",
      "topics": [
        "MAE, MSE, RMSE, R² score",
        "Accuracy, Precision, Recall",
        "F1-score",
        "Confusion matrix",
        "ROC curve, AUC score",
        "K-fold cross-validation",
        "Stratified sampling",
        "Train-test leakage"
      ],
      "practice": [
        "Plot confusion matrix",
        "Calculate MAE/MSE for regression model",
        "Compare models using ROC curves"
      ],
      "resources": [
        "StatQuest – Evaluation Metrics",
        "Data School – Model Validation"
      ]
    },
    {
      "phase": 6,
      "title": "Model Optimization & Tuning",
      "goal": "Improve models using tuning and advanced preprocessing",
      "weeks": "Week 11-12",
      "topics": [
        "GridSearchCV",
        "RandomizedSearch",
        "Bayesian Optimization (intro)",
        "Scikit-Learn Pipelines",
        "Preprocessing + modeling",
        "Handling missing data automatically",
        "Permutation importance",
        "SHAP values (intro)"
      ],
      "practice": [
        "Build ML pipeline with preprocessing",
        "Tune Random Forest using GridSearchCV",
        "Visualize feature importance"
      ],
      "resources": [
        "StatQuest – Hyperparameter Tuning",
        "SHAP Tutorials"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "House Price Prediction",
      "description": "Regression project predicting house prices",
      "technologies": ["Scikit-Learn", "Pandas", "Linear Regression"],
      "type": "regression",
      "difficulty": "Intermediate"
    },
    {
      "name": "Customer Churn Prediction",
      "description": "Classification project predicting customer churn",
      "technologies": ["Random Forest", "Logistic Regression", "Scikit-Learn"],
      "type": "classification",
      "difficulty": "Intermediate"
    },
    {
      "name": "Iris Flower Classification",
      "description": "Multi-class classification with SVM",
      "technologies": ["SVM", "Scikit-Learn", "Matplotlib"],
      "type": "classification",
      "difficulty": "Beginner"
    },
    {
      "name": "Credit Card Fraud Detection",
      "description": "Anomaly detection for fraudulent transactions",
      "technologies": ["Isolation Forest", "Scikit-Learn", "Imbalanced Learning"],
      "type": "anomaly-detection",
      "difficulty": "Advanced"
    },
    {
      "name": "Customer Segmentation",
      "description": "Clustering analysis for customer groups",
      "technologies": ["K-means", "PCA", "Scikit-Learn"],
      "type": "clustering",
      "difficulty": "Intermediate"
    },
    {
      "name": "Full ML Pipeline",
      "description": "End-to-end ML pipeline with hyperparameter tuning",
      "technologies": ["Scikit-Learn Pipelines", "GridSearchCV", "Feature Engineering"],
      "type": "pipeline",
      "difficulty": "Advanced"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn",
      "example": "Regression/classification algorithms"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Implement ML models in scikit-learn"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Build & evaluate ML models"
    }
  ],
  "tools": [
    "Python",
    "NumPy",
    "Pandas",
    "Matplotlib / Seaborn",
    "Scikit-Learn",
    "Jupyter Notebook",
    "XGBoost / LightGBM"
  ],
  "outcome": "By the end of this roadmap, you'll understand all fundamental ML algorithms, use Scikit-Learn confidently, tune & evaluate ML models, build ML pipelines, and be fully ready for Deep Learning.",
  "career_paths": [
    "Machine Learning Engineer",
    "Data Scientist",
    "ML Researcher",
    "AI Engineer",
    "Data Analyst",
    "Business Intelligence Developer",
    "Quantitative Analyst"
  ]
};

const CoreMLAlgorithmsRoadmap = () => {
  return <RoadmapLayout data={CORE_ML_ALGORITHMS_ROADMAP} roadmapId={CORE_ML_ALGORITHMS_ROADMAP.id} />;
};

export default CoreMLAlgorithmsRoadmap;
