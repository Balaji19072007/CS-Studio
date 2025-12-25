// src/App.jsx

import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { useTheme } from './hooks/useTheme.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';

// Page imports
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Problems from './pages/Problems.jsx';
import Courses from './pages/Courses.jsx';
import Roadmaps from './pages/Roadmaps.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Community from './pages/Community.jsx';
import Settings from './pages/Settings.jsx';
import Code from './pages/Code.jsx';
import CodeVerification from './pages/CodeVerification.jsx';
import SolveProblem from './pages/SolveProblem.jsx';
import MyCourses from './pages/MyCourses.jsx';
import MyProgress from './pages/MyProgress.jsx';
import CProgramming from './pages/learningPage/CProgramming.jsx';
import CProgrammingRoadmap from './pages/roadmaps/CProgrammingRoadmap.jsx';
import PythonProgrammingRoadmap from './pages/roadmaps/PythonProgrammingRoadmap.jsx';
import JavaProgrammingRoadmap from './pages/roadmaps/JavaProgrammingRoadmap.jsx';
import FrontendDevelopmentRoadmap from './pages/roadmaps/FrontendDevelopmentRoadmap.jsx';
import BackendDevelopmentRoadmap from './pages/roadmaps/BackendDevelopmentRoadmap.jsx';
import DataModelingRoadmap from './pages/roadmaps/DataModelingRoadmap.jsx';
import DeploymentDevOpsRoadmap from './pages/roadmaps/DeploymentDevOpsRoadmap.jsx';
import FullStackIntegrationRoadmap from './pages/roadmaps/FullStackIntegrationRoadmap.jsx';
import NativeAndroidDevelopmentRoadmap from './pages/roadmaps/NativeAndroidDevelopmentRoadmap.jsx';
import NativeIOSDevelopmentRoadmap from './pages/roadmaps/NativeIOSDevelopmentRoadmap.jsx';
import CrossPlatformMobileDevelopmentRoadmap from "./pages/roadmaps/CrossPlatformMobileDevelopmentRoadmap.jsx";
import BackendAPIsForMobileDevelopmentRoadmap from "./pages/roadmaps/BackendAPIsForMobileDevelopmentRoadmap.jsx";
import MobileAppPublishingMaintenanceRoadmap from "./pages/roadmaps/MobileAppPublishingMaintenanceRoadmap.jsx";
import CyberSecurityFoundationsRoadmap from "./pages/roadmaps/CyberSecurityFoundationsRoadmap.jsx";
import DefensiveSecurityRoadmap from "./pages/roadmaps/DefensiveSecurityRoadmap.jsx";
import WebAppSecurityRoadmap from "./pages/roadmaps/WebAppSecurityRoadmap.jsx";
import OffensiveSecurityRoadmap from "./pages/roadmaps/OffensiveSecurityRoadmap.jsx";
import ForensicsIncidentResponseRoadmap from "./pages/roadmaps/ForensicsIncidentResponseRoadmap.jsx";
import DevOpsCICDRoadmap from "./pages/roadmaps/DevOpsCICDRoadmap.jsx";
import ContainerizationRoadmap from "./pages/roadmaps/ContainerizationRoadmap.jsx";
import OrchestrationInfrastructureRoadmap from "./pages/roadmaps/OrchestrationInfrastructureRoadmap.jsx";
import ObservabilityReliabilityRoadmap from "./pages/roadmaps/ObservabilityReliabilityRoadmap.jsx";
import AIMathFundamentalsRoadmap from "./pages/roadmaps/AIMathFundamentalsRoadmap.jsx";
import CoreMLAlgorithmsRoadmap from "./pages/roadmaps/CoreMLAlgorithmsRoadmap.jsx";
import DeepLearningRoadmap from "./pages/roadmaps/DeepLearningRoadmap.jsx";
import ProductionMLOpsRoadmap from "./pages/roadmaps/ProductionMLOpsRoadmap.jsx";
import DataSciencePythonStatsRoadmap from "./pages/roadmaps/DataSciencePythonStatsRoadmap.jsx";
import DataWranglingRoadmap from "./pages/roadmaps/DataWranglingRoadmap.jsx";
import DataScienceModelingRoadmap from "./pages/roadmaps/DataScienceModelingRoadmap.jsx";
import DataScienceRoadmap from "./pages/roadmaps/DataScienceRoadmap.jsx";
import RatingPopup from './components/common/RatingPopup.jsx';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AuthProvider>
          <ThemeProvider> 
            <AppContent />
          </ThemeProvider> 
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

// Separate component to use hooks
function AppContent() {
  const { isDark } = useTheme();

  // Page refresh handling is now done in index.html for better reliability

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />


      <main className="flex-grow pt-16" style={{ minHeight: '60vh' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/learn/c-programming" element={<CProgramming />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/roadmaps/c-programming" element={<CProgrammingRoadmap />} />
          <Route path="/roadmaps/python-programming" element={<PythonProgrammingRoadmap />} />
          <Route path="/roadmaps/java-programming" element={<JavaProgrammingRoadmap />} />
          <Route path="/roadmaps/frontend-development" element={<FrontendDevelopmentRoadmap />} />
          <Route path="/roadmaps/backend-development" element={<BackendDevelopmentRoadmap />} />
          <Route path="/roadmaps/database-development" element={<DataModelingRoadmap />} />
          <Route path="/roadmaps/deployment-development" element={<DeploymentDevOpsRoadmap />} />
          <Route path="/roadmaps/fullstack-development" element={<FullStackIntegrationRoadmap />} />
          <Route path="/roadmaps/android-development" element={<NativeAndroidDevelopmentRoadmap />} />
          <Route path="/roadmaps/ios-development" element={<NativeIOSDevelopmentRoadmap />} />
          <Route path="/roadmaps/cross-development" element={<CrossPlatformMobileDevelopmentRoadmap />} />
          <Route path="/roadmaps/backend-apis-mobile-development" element={<BackendAPIsForMobileDevelopmentRoadmap />} />
          <Route path="/roadmaps/publishing-mobile-development" element={<MobileAppPublishingMaintenanceRoadmap />} />
          <Route path="/roadmaps/cyber-security-foundations" element={<CyberSecurityFoundationsRoadmap />} />
          <Route path="/roadmaps/cyber-security-defensive" element={<DefensiveSecurityRoadmap />} />
          <Route path="/roadmaps/cyber-security-webapp" element={<WebAppSecurityRoadmap />} />
          <Route path="/roadmaps/cyber-security-offensive" element={<OffensiveSecurityRoadmap />} />
          <Route path="/roadmaps/cyber-security-forensics" element={<ForensicsIncidentResponseRoadmap />} />
          <Route path="/roadmaps/devops-fundamentals" element={<DevOpsCICDRoadmap />} />
          <Route path="/roadmaps/devops-container" element={<ContainerizationRoadmap />} />
          <Route path="/roadmaps/devops-orchestration" element={<OrchestrationInfrastructureRoadmap />} />
          <Route path="/roadmaps/devops-observability" element={<ObservabilityReliabilityRoadmap />} />
          <Route path="/roadmaps/ai-ml-math" element={<AIMathFundamentalsRoadmap />} />
          <Route path="/roadmaps/ai-ml-core" element={<CoreMLAlgorithmsRoadmap />} />
          <Route path="/roadmaps/ai-ml-deeplearning" element={<DeepLearningRoadmap />} />
          <Route path="/roadmaps/ai-ml-production" element={<ProductionMLOpsRoadmap />} />
          <Route path="/roadmaps/data-science-python" element={<DataSciencePythonStatsRoadmap />} />
          <Route path="/roadmaps/data-science-wrangling" element={<DataWranglingRoadmap />} />
          <Route path="/roadmaps/data-science-modeling" element={<DataScienceModelingRoadmap />} />
          <Route path="/roadmaps/data-science-bigdata" element={<DataScienceRoadmap />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/solve" element={<ProtectedRoute><SolveProblem /></ProtectedRoute>} />
          <Route path="/code" element={<ProtectedRoute><Code /></ProtectedRoute>} />
          <Route path="/code-verification" element={<ProtectedRoute><CodeVerification /></ProtectedRoute>} />
          <Route path="/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
          <Route path="/my-progress" element={<ProtectedRoute><MyProgress /></ProtectedRoute>} />

          {/* Catch-all route - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <RatingPopup />

      <Footer />
    </div>
  );
}

// Protected Route Component using useAuth hook
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

export default App;