// frontend/src/pages/Roadmaps.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import * as feather from 'feather-icons';

// --- MOCK HOOKS FOR DEMONSTRATION (REPLACE WITH REAL useTheme) ---
const useTheme = () => {
    const [theme, setTheme] = useState('dark');
    return { 
        theme, 
        toggleTheme: () => setTheme(prev => prev === 'dark' ? 'light' : 'dark'),
        isDark: theme === 'dark'
    };
};
// -----------------------------------------------------------------

// Updated roadmap data with all parts for each roadmap
const ROADMAP_DATA = {
  "roadmaps": [
    {
      "id": "prog-langs",
      "title": "Programming Languages",
      "description": "Core language tracks to build programming fundamentals and problem-solving skills. Pick one to start; learn others later to broaden capability.",
      "children": [
        {
          "id": "c-lang",
          "title": "C Language",
          "short_description": "Low-level procedural language — great for learning memory, pointers, and fundamentals of computing.",
          "prerequisites": ["Basic computer literacy"],
          "estimated_hours": 80
        },
        {
          "id": "java-lang",
          "title": "Java Language",
          "short_description": "Object-oriented language suited for backend, enterprise apps, and Android foundations.",
          "prerequisites": ["Basic programming concepts (recommended)"],
          "estimated_hours": 100
        },
        {
          "id": "python-lang",
          "title": "Python Language",
          "short_description": "High-level, beginner-friendly language used in web, automation, data science, and AI.",
          "prerequisites": ["Basic computer literacy"],
          "estimated_hours": 90
        }
      ]
    },
    {
      "id": "fullstack",
      "title": "Full Stack Web Development",
      "description": "Build complete web applications: frontend UI, backend APIs, databases, and deployment.",
      "children": [
        {
          "id": "frontend-dev",
          "title": "Frontend",
          "short_description": "HTML, CSS, JavaScript, React/Vue.js, responsive design - Weeks 1–6",
          "prerequisites": ["HTML basics", "Basic JavaScript recommended"],
          "estimated_hours": 120
        },
        {
          "id": "backend-dev",
          "title": "Backend", 
          "short_description": "Node.js/Python, Express/Django, REST APIs, authentication - Weeks 6–12",
          "prerequisites": ["Basic programming", "Understanding of web concepts"],
          "estimated_hours": 120
        },
        {
          "id": "database-dev",
          "title": "Database & Data Modeling",
          "short_description": "SQL, MongoDB, database design, ORM/ODM - Weeks 8–14",
          "prerequisites": ["Backend basics"],
          "estimated_hours": 120
        },
        {
          "id": "deployment-dev",
          "title": "Deployment & DevOps Essentials",
          "short_description": "Docker, AWS, CI/CD, performance optimization - Weeks 12–16",
          "prerequisites": ["Frontend & Backend knowledge"],
          "estimated_hours": 80
        },
        {
          "id": "fullstack-dev",
          "title": "Full Stack Putting It Together",
          "short_description": "Capstone project, testing, best practices - Weeks 16–20",
          "prerequisites": ["All previous modules"],
          "estimated_hours": 80
        }
      ]
    },
    {
      "id": "mobile",
      "title": "Mobile App Development",
      "description": "Design and build cross-platform mobile apps (Android & iOS) using modern frameworks.",
      "children": [
        {
          "id": "android-dev",
          "title": "Native Android",
          "short_description": "Kotlin, Android Studio, Material Design, Jetpack - Weeks 1–8",
          "prerequisites": ["Basic programming concepts"],
          "estimated_hours": 160
        },
        {
          "id": "ios-dev",
          "title": "Native iOS",
          "short_description": "Swift, Xcode, UIKit, SwiftUI - Weeks 1–8",
          "prerequisites": ["Basic programming concepts"],
          "estimated_hours": 160
        },
        {
          "id": "crossplatform-dev",
          "title": "Cross-Platform",
          "short_description": "React Native/Flutter, shared codebase, platform APIs - Weeks 6–12",
          "prerequisites": ["JavaScript or Dart knowledge recommended"],
          "estimated_hours": 120
        },
        {
          "id": "backend-mobile",
          "title": "Backend & APIs for Mobile",
          "short_description": "REST APIs, GraphQL, offline sync, push notifications - Weeks 10–14",
          "prerequisites": ["Mobile development basics"],
          "estimated_hours": 80
        },
        {
          "id": "publishing-mobile",
          "title": "Publishing & Maintenance",
          "short_description": "App Store/Play Store, updates, analytics, monitoring - Weeks 14–18",
          "prerequisites": ["Complete mobile app development"],
          "estimated_hours": 80
        }
      ]
    },
    {
      "id": "cybersec",
      "title": "Cyber Security",
      "description": "Learn defensive and offensive security fundamentals for protecting systems and networks.",
      "children": [
        {
          "id": "foundations-sec",
          "title": "Foundations & Networking",
          "short_description": "Security concepts, TCP/IP, network protocols, tools - Weeks 1–6",
          "prerequisites": ["Basic networking knowledge"],
          "estimated_hours": 120
        },
        {
          "id": "defensive-sec",
          "title": "Defensive Security",
          "short_description": "Firewalls, IDS/IPS, access control, security policies - Weeks 6–12",
          "prerequisites": ["Networking fundamentals"],
          "estimated_hours": 120
        },
        {
          "id": "webapp-sec",
          "title": "Web & App Security",
          "short_description": "OWASP Top 10, penetration testing, secure coding - Weeks 8–14",
          "prerequisites": ["System administration basics"],
          "estimated_hours": 120
        },
        {
          "id": "offensive-sec",
          "title": "Offensive Security & Red Teaming",
          "short_description": "Ethical hacking, vulnerability assessment, exploitation - Weeks 12–20",
          "prerequisites": ["Security fundamentals"],
          "estimated_hours": 160
        },
        {
          "id": "forensics-sec",
          "title": "Forensics & Incident Response",
          "short_description": "Digital forensics, malware analysis, incident handling - Weeks 16–22",
          "prerequisites": ["All security modules"],
          "estimated_hours": 120
        }
      ]
    },
    {
      "id": "devops",
      "title": "DevOps",
      "description": "Automation, CI/CD, containerization and cloud operations to deliver software faster and more reliably.",
      "children": [
        {
          "id": "fundamentals-devops",
          "title": "DevOps Fundamentals & CI/CD",
          "short_description": "Version control, Jenkins/GitLab CI, automation basics - Weeks 1–6",
          "prerequisites": ["Comfort with command line"],
          "estimated_hours": 120
        },
        {
          "id": "container-devops",
          "title": "Containerization",
          "short_description": "Docker, container orchestration, best practices - Weeks 4–10",
          "prerequisites": ["Basic system administration"],
          "estimated_hours": 120
        },
        {
          "id": "orchestration-devops",
          "title": "Orchestration & Infrastructure",
          "short_description": "Kubernetes, Terraform, cloud platforms, IaC - Weeks 8–16",
          "prerequisites": ["Networking basics"],
          "estimated_hours": 160
        },
        {
          "id": "observability-devops",
          "title": "Observability & Reliability",
          "short_description": "Monitoring, logging, alerting, SRE practices - Weeks 12–20",
          "prerequisites": ["Infrastructure knowledge"],
          "estimated_hours": 120
        }
      ]
    },
    {
      "id": "ai-ml",
      "title": "AI / Machine Learning", 
      "description": "From math foundations to building ML models and deploying them.",
      "children": [
        {
          "id": "math-ai",
          "title": "Math & Fundamentals",
          "short_description": "Linear algebra, calculus, statistics, Python for ML - Weeks 1–6",
          "prerequisites": ["Python basics", "High-school level math"],
          "estimated_hours": 120
        },
        {
          "id": "coreml-ai",
          "title": "Core ML Algorithms",
          "short_description": "Supervised/unsupervised learning, model evaluation - Weeks 6–12",
          "prerequisites": ["Machine learning fundamentals"],
          "estimated_hours": 120
        },
        {
          "id": "deeplearning-ai",
          "title": "Deep Learning",
          "short_description": "Neural networks, TensorFlow/PyTorch, CNN, RNN - Weeks 10–18",
          "prerequisites": ["ML/DL fundamentals"],
          "estimated_hours": 160
        },
        {
          "id": "production-ai",
          "title": "Production & MLOps",
          "short_description": "Model deployment, monitoring, pipelines, scaling - Weeks 16–24",
          "prerequisites": ["Deep learning knowledge"],
          "estimated_hours": 160
        }
      ]
    },
    {
      "id": "data-science",
      "title": "Data Science",
      "description": "Turn raw data into insights using analysis, visualization, and predictive modeling.",
      "children": [
        {
          "id": "python-ds",
          "title": "Python & Statistics",
          "short_description": "Pandas, NumPy, statistical analysis, probability - Weeks 1–6",
          "prerequisites": ["Python basics", "Basic statistics"],
          "estimated_hours": 120
        },
        {
          "id": "wrangling-ds",
          "title": "Data Wrangling & Visualization",
          "short_description": "Data cleaning, Matplotlib/Seaborn, EDA techniques - Weeks 4–10",
          "prerequisites": ["Data analytics fundamentals"],
          "estimated_hours": 120
        },
        {
          "id": "modeling-ds",
          "title": "Modeling & Evaluation",
          "short_description": "Machine learning models, feature engineering, validation - Weeks 8–14",
          "prerequisites": ["Data modeling experience"],
          "estimated_hours": 120
        },
        {
          "id": "bigdata-ds",
          "title": "Big Data & Pipelines",
          "short_description": "Spark, data pipelines, cloud platforms, deployment - Weeks 12–20",
          "prerequisites": ["Data science fundamentals"],
          "estimated_hours": 160
        }
      ]
    }
  ]
};

// Icon mapping for roadmaps
const ROADMAP_ICONS = {
  'prog-langs': 'code',
  'fullstack': 'layout',
  'mobile': 'smartphone',
  'cybersec': 'shield',
  'devops': 'cloud',
  'ai-ml': 'cpu',
  'data-science': 'bar-chart-2'
};

// Color gradients for roadmaps
const ROADMAP_GRADIENTS = {
  'prog-langs': 'from-blue-700 to-blue-600',
  'fullstack': 'from-purple-700 to-purple-600',
  'mobile': 'from-green-700 to-green-600',
  'cybersec': 'from-red-700 to-red-600',
  'devops': 'from-orange-700 to-orange-600',
  'ai-ml': 'from-pink-700 to-pink-600',
  'data-science': 'from-indigo-700 to-indigo-600'
};

// Footer Component
const Footer = () => {
  const { isDark } = useTheme();
  
  return (
    <footer className={`${isDark ? 'bg-gray-900' : 'bg-gray-800'} text-white py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* LEARN */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">LEARN</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Danks</a></li>
            </ul>
          </div>
          
          {/* PRACTICE */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">PRACTICE</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Problems</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Challenges</a></li>
            </ul>
          </div>
          
          {/* COMMUNITY */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">COMMUNITY</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Forums</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Leaderboard</a></li>
            </ul>
          </div>
          
          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">COMPANY</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Capsers</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 CodingPlatform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Roadmap Category Card ---
const RoadmapCategoryCard = ({ roadmap, isExpanded, onToggleExpand }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  });

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggleExpand(roadmap.id);
  };

  const handleViewRoadmap = (e, roadmap, child = null) => {
    e.stopPropagation();
    
    if (child) {
      switch(child.id) {
        case 'c-lang':
          navigate('/roadmaps/c-programming');
          break;
        case 'python-lang':
          navigate('/roadmaps/python-programming');
          break;
        case 'java-lang':
          navigate('/roadmaps/java-programming'); 
          break;
        case 'frontend-dev':
          navigate('/roadmaps/frontend-development');
          break;
        case 'backend-dev':
          navigate('/roadmaps/backend-development');
          break;
        case 'database-dev':
          navigate('/roadmaps/database-development');
          break;
        case 'deployment-dev':
          navigate('/roadmaps/deployment-development');
          break;
        case 'fullstack-dev':
          navigate('/roadmaps/fullstack-development');
          break;
        case 'android-dev':
          navigate('/roadmaps/android-development');
          break;
        case 'ios-dev':
          navigate('/roadmaps/ios-development');
          break;
        case 'crossplatform-dev':
          navigate('/roadmaps/cross-development');
          break;
        case 'backend-mobile':
          navigate('/roadmaps/backend-apis-mobile-development');
          break;
        case 'publishing-mobile':
          navigate('/roadmaps/publishing-mobile-development');
          break;
        case 'foundations-sec':
          navigate('/roadmaps/cyber-security-foundations');
          break;
        case 'defensive-sec':
          navigate('/roadmaps/cyber-security-defensive');
          break;
        case 'webapp-sec':
          navigate('/roadmaps/cyber-security-webapp');
          break;
        case 'offensive-sec':
          navigate('/roadmaps/cyber-security-offensive');
          break;
        case 'forensics-sec':
          navigate('/roadmaps/cyber-security-forensics');
          break;
        case 'fundamentals-devops':
          navigate('/roadmaps/devops-fundamentals');
          break;
        case 'container-devops':
          navigate('/roadmaps/devops-container');
          break;
        case 'orchestration-devops':
          navigate('/roadmaps/devops-orchestration');
          break;
        case 'observability-devops':
          navigate('/roadmaps/devops-observability');
          break;
        case 'math-ai':
          navigate('/roadmaps/ai-ml-math');
          break;
        case 'coreml-ai':
          navigate('/roadmaps/ai-ml-core');
          break;
        case 'deeplearning-ai':
          navigate('/roadmaps/ai-ml-deeplearning');
          break;
        case 'production-ai':
          navigate('/roadmaps/ai-ml-production');
          break;
        case 'python-ds':
          navigate('/roadmaps/data-science-python');
          break;
        case 'wrangling-ds':
          navigate('/roadmaps/data-science-wrangling');
          break;
        case 'modeling-ds':
          navigate('/roadmaps/data-science-modeling');
          break;
        case 'bigdata-ds':
          navigate('/roadmaps/data-science-bigdata');
          break;
        default:
          const roadmapName = child.title;
          alert(`Viewing roadmap for: ${roadmapName}`);
      }
    } else {
      const roadmapName = roadmap.title;
      alert(`Viewing roadmap for: ${roadmapName}`);
    }
  };

  const handleCardClick = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }
    onToggleExpand(roadmap.id);
  };

  return (
    <div className={`my-4 rounded-xl overflow-hidden border transition-all duration-300 ${
      isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
    } ${isExpanded ? 'shadow-lg' : 'shadow-md'}`}>
      
      {/* Header - Clickable */}
      <div 
        className="cursor-pointer p-6"
        onClick={handleCardClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${ROADMAP_GRADIENTS[roadmap.id]} flex items-center justify-center flex-shrink-0`}>
              <i data-feather={ROADMAP_ICONS[roadmap.id]} className="w-6 h-6 text-white"></i>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {roadmap.title}
              </h3>
              <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {roadmap.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <i data-feather="clock" className="w-4 h-4 mr-1 text-primary-400"></i>
                  <span>NaN weeks + hours</span>
                </div>
                
                {roadmap.children && (
                  <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <i data-feather="layers" className="w-4 h-4 mr-1 text-primary-400"></i>
                    <span>{roadmap.children.length} specializations</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleToggle}
            className={`text-primary-400 hover:text-primary-500 p-2 rounded-full transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            <i data-feather="chevron-down" className="w-6 h-6"></i>
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {/* Children Roadmaps (Specializations) */}
          {roadmap.children && (
            <div className="p-6">
              <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Change Your Specialization
              </h4>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {roadmap.children.map((child) => (
                  <div 
                    key={child.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <h5 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {child.title}
                    </h5>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {child.short_description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {Math.ceil(child.estimated_hours / 20)} weeks
                      </span>
                      <button 
                        onClick={(e) => handleViewRoadmap(e, roadmap, child)}
                        className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
                      >
                        View Roadmap
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Main Roadmaps Component ---
const Roadmaps = () => {
  const { isLoggedIn } = useAuth();
  const { isDark } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedRoadmapId, setExpandedRoadmapId] = useState(null);

  useEffect(() => {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }

    const toggleVisibility = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleToggleExpand = (roadmapId) => {
    setExpandedRoadmapId(prev => prev === roadmapId ? null : roadmapId);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark-gradient-secondary' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="gradient-bg text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hero-floating hidden lg:block">
          <i data-feather="target" className="w-40 h-40 text-primary-500 opacity-20"></i>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              <span className="block text-white">Structured Learning</span>
              <span className="block text-primary-400">Roadmaps</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              Follow expert-designed paths to master in-demand skills. Each roadmap includes step-by-step guidance, projects, and clear outcomes.
            </p>
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => document.getElementById('roadmaps-list').scrollIntoView({ behavior: 'smooth' })}
                className="roadmap-button-primary inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.03]"
              >
                Explore Roadmaps
                <i data-feather="arrow-down" className="w-5 h-5 ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16" id="roadmaps-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-primary-500 font-semibold tracking-wide uppercase">LEARNING PATHS</h2>
            <p className={`mt-2 text-4xl leading-8 font-extrabold tracking-tight sm:text-5xl ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Choose Your Career Path
            </p>
            <p className={`mt-4 max-w-2xl text-xl ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            } mx-auto`}>
              Comprehensive roadmaps designed by industry experts with real-world projects
            </p>
          </div>

          <div className="space-y-6">
            {ROADMAP_DATA.roadmaps.map((roadmap) => (
              <RoadmapCategoryCard
                key={roadmap.id}
                roadmap={roadmap}
                isExpanded={expandedRoadmapId === roadmap.id}
                onToggleExpand={handleToggleExpand}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className={`py-20 ${isDark ? 'dark-gradient-secondary' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-premium-lg relative overflow-hidden py-16 px-8">
            <div className="relative">
              <div className="lg:flex lg:items-center lg:justify-between text-center lg:text-left">
                <div className="flex-1">
                  <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    <span className="block">Ready to start your journey?</span>
                    <span className="block text-primary-100 mt-2 text-xl">
                      Join thousands of learners building their careers
                    </span>
                  </h2>
                </div>
                <div className="mt-8 flex justify-center lg:mt-0 lg:flex-shrink-0">
                  <Link 
                    to={isLoggedIn ? "/problems" : "/signup"}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.03] bg-success-600 hover:bg-success-700 text-white"
                  >
                    {isLoggedIn ? 'Continue Learning' : 'Start Free Trial'}
                    <i data-feather="arrow-right" className="ml-2 w-5 h-5"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Buttons */}
      <Link 
        to="/code" 
        className="fixed bottom-20 sm:bottom-6 right-6 h-14 w-14 rounded-full dark-gradient-accent text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl z-50"
      >
        <i data-feather="edit-3" className="h-6 w-6"></i>
      </Link>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-40 sm:bottom-24 right-6 h-12 w-12 rounded-full dark-gradient-accent text-white flex items-center justify-center transition-all duration-300 shadow-lg z-50 ${
          showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <i data-feather="arrow-up" className="h-5 w-5"></i>
      </button>
    </div>
  );
};

export default Roadmaps;