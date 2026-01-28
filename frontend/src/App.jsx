
// src/App.jsx

import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { useTheme } from './hooks/useTheme.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';

import MobileTopBar from './components/common/MobileTopBar.jsx';
import MobileBottomNav from './components/common/MobileBottomNav.jsx';

// Page imports
import Home from './pages/Home.jsx';

import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import AuthAction from './pages/AuthAction.jsx';
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
import MyProblemStats from './pages/MyProblemStats.jsx';
import Notifications from './pages/Notifications.jsx';
import CourseViewer from './pages/learningPage/CourseViewer.jsx';
// REMOVED: import CProgramming from './pages/learningPage/CProgramming.jsx';
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
import CodeEditorFloatingIcon from './components/common/CodeEditorFloatingIcon.jsx';
import './App.css';



function App() {
  // Temporary test component - Remove after verification
  // return <TestFirebaseAuth />;

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
  const location = useLocation();
  const { user } = useAuth();
  const isLoggedIn = !!user; // Check if user is logged in

  // Page refresh handling is now done in index.html for better reliability

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>

      {/* Mobile Top Bar - Only visible on mobile when logged in - Hidden on Solve page */}
      {isLoggedIn && !location.pathname.startsWith('/solve') && <MobileTopBar />}

      {/* Main Navbar - Hidden on mobile if logged in (handled via CSS classes in Navbar component) */}
      <Navbar />

      <main
        className={`flex-grow ${location.pathname.startsWith('/solve') ? 'pt-0 lg:pt-16' : 'pt-16'} pb-20 sm:pb-0`}
        style={{ minHeight: '60vh' }}
      >

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/action" element={<AuthAction />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/courses" element={<Courses />} />
          {/* Dynamic Course Route - Replaces individual imports */}
          <Route path="/learn/:courseId" element={<CourseViewer />} />
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
          <Route path="/problem-stats" element={<ProtectedRoute><MyProblemStats /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

          {/* Catch-all route - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <RatingPopup />
      {/* Hide icons on public home (when not logged in), signin, signup, solve, and learn pages */}
      {/* Hide icons on specific pages */}
      {!location.pathname.startsWith('/solve') &&
        !location.pathname.startsWith('/learn') &&
        location.pathname !== '/signin' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/code' &&
        location.pathname !== '/settings' &&
        location.pathname !== '/problems' &&
        location.pathname !== '/my-courses' &&
        location.pathname !== '/my-progress' &&
        location.pathname !== '/problem-stats' &&
        !(location.pathname === '/' && !isLoggedIn) &&
        <CodeEditorFloatingIcon />}

      {!location.pathname.startsWith('/solve') && !location.pathname.startsWith('/learn') && <Footer />}

      {/* Mobile Bottom Navigation - Only visible on mobile when logged in */}
      {isLoggedIn && <MobileBottomNav />}
    </div>

  );
}

// Protected Route Component using useAuth hook
// Protected Route Component using useAuth hook
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    // You can replace this with a proper loading spinner
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default App;