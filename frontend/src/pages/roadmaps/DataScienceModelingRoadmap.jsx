import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const DATA_SCIENCE_MODELING_ROADMAP = {
  "id": "data-science-modeling",
  "title": "🧭 Data Science Roadmap — Modeling & Evaluation",
  "description": "Learn to build predictive models, evaluate them with proper metrics, optimize models, perform feature selection, and create full ML pipelines.",
  "short_description": "Master ML modeling, evaluation metrics, hyperparameter tuning, and complete ML pipelines",
  "prerequisites": ["Python programming", "Basic statistics", "Data preprocessing"],
  "estimated_hours": 120,
  "difficulty": "Intermediate to Advanced",
  "category": "Data Science & Machine Learning",
  "phases": [
    {
      "phase": 1,
      "title": "ML Modeling Fundamentals",
      "goal": "Understand supervised & unsupervised modeling workflows",
      "weeks": "Week 8-9",
      "topics": [
        "ML pipeline (prepare → train → evaluate → tune → deploy)",
        "Train-test split",
        "Cross-validation (k-fold, stratified k-fold)",
        "Data leakage",
        "Bias–variance tradeoff",
        "Model complexity vs performance"
      ],
      "practice": [
        "Perform train-test split",
        "Implement k-fold CV",
        "Compare models with cross-val scores"
      ]
    },
    {
      "phase": 2,
      "title": "Regression Models",
      "goal": "Build & evaluate regression models",
      "weeks": "Week 9-10",
      "topics": [
        "Linear Regression",
        "Polynomial Regression",
        "Ridge, Lasso, ElasticNet",
        "Decision Tree Regressor",
        "Random Forest Regressor",
        "XGBoost / LightGBM Regressor",
        "Metrics: MAE, MSE, RMSE, R² Score"
      ],
      "practice": [
        "Fit Linear Regression on real dataset",
        "Tune Ridge/Lasso with GridSearchCV",
        "Plot errors & predictions",
        "Compare Random Forest vs Linear Regression"
      ]
    },
    {
      "phase": 3,
      "title": "Classification Models",
      "goal": "Learn classic classification algorithms",
      "weeks": "Week 10-11",
      "topics": [
        "Logistic Regression",
        "K-Nearest Neighbors (KNN)",
        "Support Vector Machine (SVM)",
        "Decision Tree Classifier",
        "Random Forest Classifier",
        "Gradient Boosting (XGBoost, LightGBM)",
        "Naive Bayes",
        "Metrics: Accuracy, Precision, Recall, F1-score, AUC-ROC, Confusion Matrix"
      ],
      "practice": [
        "Train Logistic Regression on binary dataset",
        "Build Random Forest classifier",
        "Plot confusion matrix",
        "Create ROC curves",
        "Tune hyperparameters with GridSearchCV"
      ]
    },
    {
      "phase": 4,
      "title": "Unsupervised Models",
      "goal": "Learn clustering & dimensionality reduction",
      "weeks": "Week 11-12",
      "topics": [
        "K-Means Clustering",
        "Hierarchical Clustering",
        "DBSCAN",
        "Silhouette Score",
        "PCA (Principal Component Analysis)",
        "t-SNE",
        "UMAP (optional)"
      ],
      "practice": [
        "Perform K-means clustering",
        "Visualize clusters using PCA",
        "Calculate silhouette score",
        "Reduce dimensionality using PCA"
      ]
    },
    {
      "phase": 5,
      "title": "Model Optimization & Tuning",
      "goal": "Maximize performance using tuning, feature selection & pipelines",
      "weeks": "Week 12-13",
      "topics": [
        "GridSearchCV",
        "RandomizedSearchCV",
        "Bayesian Optimization (Optuna/Hyperopt)",
        "Feature Selection: Filter methods, Wrapper methods (RFE), Embedded methods",
        "Scikit-Learn Pipeline",
        "Combine preprocessing + modeling",
        "Save/load models (joblib, pickle)"
      ],
      "practice": [
        "Build pipeline: scaling → model",
        "Tune hyperparameters using RandomizedSearchCV",
        "Perform RFE for feature selection",
        "Save tuned model to file"
      ]
    },
    {
      "phase": 6,
      "title": "Time Series Modeling",
      "goal": "Learn forecasting and temporal data modeling",
      "weeks": "Week 13-14",
      "topics": [
        "Time Series components (trend, seasonality)",
        "Train-test split for time series",
        "Moving averages",
        "ARIMA (AutoRegressive Integrated Moving Average)",
        "SARIMA",
        "Prophet Model (Meta/Facebook)",
        "Feature engineering for time series"
      ],
      "practice": [
        "Forecast stock prices using ARIMA",
        "Build time-series train-test split",
        "Predict using Prophet",
        "Plot forecast & confidence intervals"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "House Price Prediction",
      "description": "Regression project to predict house prices using multiple algorithms",
      "technologies": ["Regression", "Scikit-Learn", "Feature Engineering"],
      "type": "regression",
      "difficulty": "Intermediate"
    },
    {
      "name": "Customer Churn Prediction",
      "description": "Classification project to predict customer churn",
      "technologies": ["Classification", "Logistic Regression", "Random Forest"],
      "type": "classification",
      "difficulty": "Intermediate"
    },
    {
      "name": "Customer Segmentation",
      "description": "Clustering project to segment customers into groups",
      "technologies": ["Clustering", "K-Means", "PCA"],
      "type": "unsupervised",
      "difficulty": "Intermediate"
    },
    {
      "name": "Optimized Pipeline Model",
      "description": "Complete ML pipeline with hyperparameter tuning",
      "technologies": ["Pipeline", "GridSearchCV", "Feature Selection"],
      "type": "optimization",
      "difficulty": "Advanced"
    },
    {
      "name": "Movie Recommendation System",
      "description": "Similarity-based recommendation system",
      "technologies": ["Similarity", "Clustering", "Recommendation"],
      "type": "unsupervised",
      "difficulty": "Advanced"
    },
    {
      "name": "Stock Price Forecasting",
      "description": "Time series forecasting using ARIMA and Prophet",
      "technologies": ["Time Series", "ARIMA", "Prophet"],
      "type": "forecasting",
      "difficulty": "Advanced"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn new topic",
      "example": "Regression/classification videos"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "ML models + tuning"
    },
    {
      "time": "90-120 mins",
      "task": "Project work",
      "example": "End-to-end modeling project"
    }
  ],
  "tools": [
    "Python",
    "Pandas & NumPy",
    "Scikit-Learn",
    "Matplotlib & Seaborn",
    "XGBoost / LightGBM",
    "StatsModels",
    "Prophet",
    "Joblib"
  ],
  "outcome": "By the end of Week 14, you will build regression & classification models, apply tuning, feature selection & pipelines, evaluate models with correct metrics, perform clustering & PCA, forecast time series, and be fully ready for Big Data & Pipelines.",
  "career_paths": [
    "Machine Learning Engineer",
    "Data Scientist",
    "MLOps Engineer",
    "AI Engineer",
    "Research Scientist",
    "Quantitative Analyst",
    "Business Intelligence Analyst"
  ]
};

const DataScienceModelingRoadmap = () => {
  return <RoadmapLayout data={DATA_SCIENCE_MODELING_ROADMAP} roadmapId={DATA_SCIENCE_MODELING_ROADMAP.id} />;
};

export default DataScienceModelingRoadmap;
