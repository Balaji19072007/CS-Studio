// frontend/src/pages/roadmaps/WebAppSecurityRoadmap.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

// Web & Application Security Roadmap Data
const WEB_APP_SECURITY_ROADMAP = {
  "id": "web-app-security",
  "title": "🧭 Web & Application Security Roadmap",
  "description": "Learn to secure web applications, understand vulnerabilities (OWASP Top 10), perform penetration testing, secure APIs, and protect modern web architectures.",
  "short_description": "Master web application security, OWASP Top 10 vulnerabilities, penetration testing, and API security.",
  "prerequisites": ["Basic web development knowledge", "Cyber Security Foundations"],
  "estimated_hours": 140,
  "difficulty": "Intermediate to Advanced",
  "category": "Cyber Security",
  "phases": [
    {
      "phase": 1,
      "title": "Web Application Basics",
      "goal": "Understand how web apps work before learning how to secure them",
      "weeks": "Week 8",
      "topics": [
        "How websites work (client → server → DB)",
        "HTML, CSS, JavaScript basics",
        "Cookies, sessions, tokens",
        "HTTP request/response cycle",
        "Same-Origin Policy",
        "CORS basics",
        "Understanding Web Servers (Apache, Nginx)",
        "API basics (REST, JSON)"
      ],
      "practice": [
        "Inspect requests using browser dev tools",
        "Look at cookies, headers, response codes",
        "Create a simple login form with HTML"
      ]
    },
    {
      "phase": 2,
      "title": "OWASP Top 10",
      "goal": "Learn the 10 most critical web vulnerabilities",
      "weeks": "Week 8-10",
      "topics": [
        "A01: Broken Access Control",
        "A02: Cryptographic Failures",
        "A03: Injection (SQLi, NoSQLi, Command Injection)",
        "A04: Insecure Design",
        "A05: Security Misconfiguration",
        "A06: Vulnerable Components",
        "A07: Identification & Authentication Failures",
        "A08: Software Integrity Failures",
        "A09: Logging & Monitoring Failures",
        "A10: Server-Side Request Forgery (SSRF)",
        "XSS (stored, reflected, DOM)",
        "SQL Injection techniques",
        "CSRF (Cross-Site Request Forgery)",
        "File Upload vulnerabilities",
        "Directory Traversal",
        "IDOR (Insecure Direct Object Reference)"
      ],
      "practice": [
        "Exploit XSS in DVWA",
        "Perform SQLi on a test environment",
        "Test CSRF attack using a crafted link",
        "Bypass broken access control (IDOR lab)"
      ]
    },
    {
      "phase": 3,
      "title": "Authentication & Session Security",
      "goal": "Secure login systems, tokens, and user accounts",
      "weeks": "Week 10-11",
      "topics": [
        "Password hashing (bcrypt, Argon2)",
        "MFA / 2FA basics",
        "OAuth 2.0 & OpenID Connect",
        "SSO principles",
        "Cookies (httpOnly, secure, SameSite)",
        "JWT Tokens (access vs refresh)",
        "Session hijacking prevention",
        "Session fixation attacks",
        "Brute-force protection",
        "Rate limiting implementation",
        "CAPTCHAs integration",
        "Strong password policy enforcement"
      ],
      "practice": [
        "Implement JWT auth in test API",
        "Steal a session cookie (in lab)",
        "Fix a vulnerable login flow",
        "Add rate limiting to API"
      ]
    },
    {
      "phase": 4,
      "title": "API Security",
      "goal": "Protect modern APIs and mobile/web backends",
      "weeks": "Week 11-12",
      "topics": [
        "OWASP API Top 10 vulnerabilities",
        "API Key leakage risks",
        "Token-based authentication",
        "Broken Function Level Authorization",
        "Input validation techniques",
        "Rate limiting for APIs",
        "CORS restrictions and security",
        "Secure file uploads implementation",
        "API versioning security",
        "GraphQL security basics"
      ],
      "practice": [
        "Attack vulnerable API in Juice Shop",
        "Secure an API with validation",
        "Build rate-limited login endpoint",
        "Test API with Postman/Burp"
      ]
    },
    {
      "phase": 5,
      "title": "Secure Coding Basics",
      "goal": "Write secure backend & frontend code",
      "weeks": "Week 12-13",
      "topics": [
        "Input validation on server",
        "Prepared statements for SQL",
        "Preventing SQL/NoSQL injection",
        "Password hashing best practices",
        "Logging security events",
        "Protecting cookies in frontend",
        "Avoiding dangerous patterns (innerHTML)",
        "Preventing DOM XSS",
        "Sanitizing input on client",
        "SAST & DAST tools introduction",
        "Dependency scanning",
        "Automated security checks"
      ],
      "practice": [
        "Fix vulnerable code (SQL injection example)",
        "Implement secure login in Node/Python",
        "Enable linting + scanning tools",
        "Perform code review for security"
      ]
    },
    {
      "phase": 6,
      "title": "Web Pentesting Tools",
      "goal": "Learn the primary tools used by web penetration testers",
      "weeks": "Week 13-14",
      "topics": [
        "Burp Suite: Proxy & interception",
        "Burp Repeater and Intruder",
        "Burp Scanner basics",
        "Automating attacks with Burp",
        "Nikto for vulnerability scanning",
        "Gobuster/Dirbuster for directory busting",
        "SQLmap for automated SQL injection",
        "JWT.io for token analysis",
        "ZAP (Zed Attack Proxy)",
        "Web pentesting workflow",
        "Reconnaissance techniques",
        "Enumeration methods",
        "Exploitation strategies",
        "Professional reporting"
      ],
      "practice": [
        "Intercept requests with Burp Suite",
        "Use SQLmap on vulnerable targets",
        "Find hidden directories with Gobuster",
        "Perform XSS + CSRF with Burp Repeater"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Hack OWASP Juice Shop Completely",
      "description": "Complete all challenges in OWASP Juice Shop vulnerable application",
      "technologies": ["OWASP Top 10", "Web Exploitation", "Vulnerability Assessment"],
      "type": "pentesting",
      "difficulty": "Advanced"
    },
    {
      "name": "Create Secure Login & Registration System",
      "description": "Build a secure authentication system with proper session management",
      "technologies": ["JWT", "Session Security", "Password Hashing"],
      "type": "development",
      "difficulty": "Intermediate"
    },
    {
      "name": "Fix OWASP Top 10 Vulnerabilities in Sample App",
      "description": "Identify and remediate all OWASP Top 10 issues in a vulnerable application",
      "technologies": ["Code Review", "Security Patching", "Vulnerability Fixes"],
      "type": "remediation",
      "difficulty": "Advanced"
    },
    {
      "name": "Write a Web Pentest Report",
      "description": "Create professional penetration testing report with findings and recommendations",
      "technologies": ["Reporting", "Vulnerability Analysis", "Client Communication"],
      "type": "documentation",
      "difficulty": "Intermediate"
    },
    {
      "name": "Build a Secure API with JWT + Input Validation",
      "description": "Develop a fully secured REST API with proper authentication and validation",
      "technologies": ["API Security", "JWT", "Input Validation"],
      "type": "development",
      "difficulty": "Intermediate"
    },
    {
      "name": "Create a Custom Burp Suite Automation Script",
      "description": "Develop custom extensions or scripts to automate Burp Suite tasks",
      "technologies": ["Burp Suite", "Automation", "Scripting"],
      "type": "tooling",
      "difficulty": "Advanced"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "OWASP / API / Burp tutorials"
    },
    {
      "time": "30-90 mins",
      "task": "Practice labs",
      "example": "DVWA, Juice Shop, PortSwigger"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Fix vulnerabilities / write reports"
    }
  ],
  "tools": [
    "Burp Suite Community",
    "OWASP ZAP",
    "DVWA (Damn Vulnerable Web App)",
    "Juice Shop",
    "SQLmap",
    "Gobuster / Dirbuster",
    "Postman",
    "Node/Python backend",
    "Browser Dev Tools",
    "Nikto"
  ],
  "labs": [
    "PortSwigger Web Security Academy",
    "DVWA",
    "OWASP Juice Shop",
    "bWAPP",
    "WebGoat",
    "HackTheBox Web Challenges"
  ],
  "outcome": "By the end of this roadmap, you'll understand OWASP Top 10 deeply, perform real web pentesting, secure APIs, sessions, tokens, use Burp Suite professionally, write secure code for backend & frontend, and be ready for advanced security roles.",
  "career_paths": [
    "Web Application Security Analyst",
    "Penetration Tester (Web Focus)",
    "Application Security Engineer",
    "Security Code Reviewer",
    "Web Security Consultant",
    "Bug Bounty Hunter",
    "API Security Specialist",
    "DevSecOps Engineer",
    "Security Software Developer",
    "Vulnerability Researcher"
  ]
};

// Floating Animation Component
const FloatingAnimation = ({ fromPhase, toPhase, isVisible, onComplete }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-float">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
};

// Animated Connecting Line Component
const AnimatedConnectingLine = ({ isCompleted, isAnimating, isDark, isLast }) => {
  if (isLast) return null;

  return (
    <div className="relative">
      {/* Base line */}
      <div className={`w-1 h-full transition-all duration-1000 ${
        isCompleted ? 'bg-green-500' : isDark ? 'bg-gray-600' : 'bg-gray-300'
      }`}>
        {/* Animation overlay */}
        {isAnimating && (
          <div className="absolute top-0 left-0 w-full h-0 bg-green-500 animate-lineFlow"></div>
        )}
      </div>
    </div>
  );
};

// Separated Number Component with Enhanced Animation
const PhaseNumber = ({ number, isCompleted, isActive, isDark, isLast, isAnimating }) => {
  return (
    <div className="flex flex-col items-center mr-4 md:mr-8 relative">
      <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg md:text-xl font-bold border-4 transition-all duration-500 ${
        isCompleted
          ? 'bg-green-500 border-green-500 text-white shadow-lg scale-110'
          : isActive
            ? 'bg-primary-500 border-primary-500 text-white shadow-lg scale-110'
            : isDark
              ? 'bg-gray-800 border-gray-600 text-gray-300'
              : 'bg-white border-gray-300 text-gray-600'
      }`}>
        {number}
        
        {/* Completion Checkmark */}
        {isCompleted && (
          <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white animate-ping">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
              <svg className="w-2 h-2 md:w-3 md:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Active Phase Indicator */}
        {isActive && !isCompleted && (
          <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
            <svg className="w-2 h-2 md:w-3 md:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Animated Connecting Line - Only show if not last phase */}
      {!isLast && (
        <AnimatedConnectingLine 
          isCompleted={isCompleted}
          isAnimating={isAnimating}
          isDark={isDark}
          isLast={isLast}
        />
      )}
    </div>
  );
};

// Progress tracking component
const ProgressTracker = ({ currentStep, totalSteps, isDark }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Your Progress
        </h3>
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {currentStep}/{totalSteps} phases completed
        </span>
      </div>
      <div className={`w-full rounded-full h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div 
          className="bg-primary-500 h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Phase Header Component
const PhaseHeader = ({ phase, isExpanded, onToggle, isCompleted, isActive, isDark, index, isLast, isAnimating }) => {
  return (
    <div className="flex items-start">
      <PhaseNumber 
        number={phase.phase} 
        isCompleted={isCompleted}
        isActive={isActive}
        isDark={isDark}
        isLast={isLast}
        isAnimating={isAnimating}
      />
      
      <div 
        className={`flex-1 p-4 md:p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
          isExpanded 
            ? 'bg-primary-500 text-white shadow-lg border-primary-500 transform -translate-y-1' 
            : isCompleted
              ? 'bg-green-50 border-green-500 hover:border-green-600'
              : isActive
                ? 'bg-primary-50 border-primary-500 hover:border-primary-600'
                : isDark
                  ? 'bg-gray-800 border-gray-600 hover:border-gray-500 hover:bg-gray-750'
                  : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mb-3">
              <h3 className={`text-lg md:text-xl font-bold ${isExpanded ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'}`}>
                {phase.title}
              </h3>
              <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium self-start md:self-auto ${
                isExpanded 
                  ? 'bg-white/20 text-white' 
                  : isCompleted
                    ? 'bg-green-500 text-white'
                    : isActive
                      ? 'bg-primary-500 text-white'
                      : isDark 
                        ? 'bg-gray-700 text-primary-400' 
                        : 'bg-primary-100 text-primary-700'
              }`}>
                {phase.weeks}
              </span>
            </div>
            <p className={`text-sm md:text-base font-medium ${isExpanded ? 'text-white/90' : isCompleted ? 'text-green-700' : isActive ? 'text-primary-700' : isDark ? 'text-primary-400' : 'text-primary-600'}`}>
              🎯 {phase.goal}
            </p>
          </div>

          {/* Arrow Button */}
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ml-2`}>
            <svg 
              className={`w-5 h-5 md:w-6 md:h-6 ${isExpanded ? 'text-white' : isDark ? 'text-gray-400' : 'text-gray-600'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Phase Content Component
const PhaseContent = ({ phase, isCompleted, onToggle, isDark, index, isExpanded, canMarkComplete, onMarkComplete }) => {
  if (!isExpanded) return null;

  const handleMarkComplete = () => {
    if (canMarkComplete && onMarkComplete) {
      onMarkComplete(index);
    }
  };

  return (
    <div className="flex">
      {/* Space for the number and connecting line */}
      <div className="w-16 md:w-24 mr-4 md:mr-8 flex flex-col items-center">
        {/* Reserved space for alignment */}
      </div>
      
      <div className={`flex-1 mt-2 p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
        isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'
      }`}>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Topics */}
          <div>
            <h4 className={`font-semibold mb-4 flex items-center text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="w-2 h-2 md:w-3 md:h-3 bg-primary-500 rounded-full mr-2 md:mr-3"></span>
              Topics Covered
            </h4>
            <ul className={`space-y-2 md:space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {phase.topics.map((topic, topicIndex) => (
                <li key={topicIndex} className="flex items-start group transition-all duration-200 hover:translate-x-1 md:hover:translate-x-2">
                  <div className={`w-1 h-1 md:w-2 md:h-2 rounded-full mt-2 mr-3 md:mr-4 flex-shrink-0 transition-all duration-300 ${
                    isCompleted ? 'bg-primary-500' : isDark ? 'bg-gray-600 group-hover:bg-primary-500' : 'bg-gray-400 group-hover:bg-primary-500'
                  }`}></div>
                  <span className="text-sm md:text-base group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h4 className={`font-semibold mb-4 flex items-center text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mr-2 md:mr-3"></span>
              Hands-on Practice
            </h4>
            <ul className={`space-y-2 md:space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {phase.practice.map((item, practiceIndex) => (
                <li key={practiceIndex} className="flex items-start group transition-all duration-200 hover:translate-x-1 md:hover:translate-x-2">
                  <div className={`w-1 h-1 md:w-2 md:h-2 rounded-full mt-2 mr-3 md:mr-4 flex-shrink-0 transition-all duration-300 ${
                    isCompleted ? 'bg-green-500' : isDark ? 'bg-gray-600 group-hover:bg-green-500' : 'bg-gray-400 group-hover:bg-green-500'
                  }`}></div>
                  <span className="text-sm md:text-base group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-700 flex justify-end">
          <button
            onClick={handleMarkComplete}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-300 transform text-sm md:text-base ${
              canMarkComplete ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-50'
            } ${
              isCompleted
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg animate-pulse'
                : isDark
                  ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg'
                  : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg'
            }`}
            disabled={!canMarkComplete}
          >
            {isCompleted ? '✓ Phase Completed' : canMarkComplete ? 'Mark as Complete' : 'Complete Previous Phase First'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main container with continuous connecting line
const PhaseContainer = ({ children, isDark, completedCount, totalPhases }) => {
  const progressPercent = (completedCount / totalPhases) * 100;
  
  // Calculate the height of the progress line - stop at the last phase
  const progressLineHeight = Math.min(progressPercent, ((totalPhases - 1) / totalPhases) * 100);
  
  return (
    <div className="relative">
      {/* Continuous vertical connecting line that spans only up to the last phase */}
      <div className="absolute left-6 md:left-8 top-0 w-1 z-0" style={{ height: 'calc(100% - 4rem)' }}>
        {/* Base line */}
        <div className={`w-full h-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'} rounded-full`}></div>
        
        {/* Progress line - animated height change, stops before the last phase */}
        <div 
          className="absolute top-0 left-0 w-full bg-green-500 rounded-full transition-all duration-1500 ease-out"
          style={{ height: `${progressLineHeight}%` }}
        ></div>
        
        {/* Pulsing effect at the progress tip */}
        {completedCount > 0 && completedCount < totalPhases && (
          <div 
            className="absolute w-3 h-3 bg-green-500 rounded-full -left-1 transform -translate-y-1/2 animate-pulse"
            style={{ top: `${progressLineHeight}%` }}
          ></div>
        )}
      </div>
      
      <div className="space-y-6 md:space-y-8 relative z-20">
        {children}
      </div>
    </div>
  );
};

// Completion Celebration Component
const CompletionCelebration = ({ isDark, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={`mt-8 p-6 md:p-8 rounded-xl border-2 text-center ${
      isDark ? 'border-green-500 bg-green-900/20' : 'border-green-500 bg-green-50'
    }`}>
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
        🎉 Web Security Mastered!
      </h3>
      <p className={`text-lg md:text-xl mb-6 ${isDark ? 'text-green-200' : 'text-green-800'}`}>
        You've completed the Web & Application Security Roadmap!
      </p>
      <div className={`p-4 rounded-lg ${isDark ? 'bg-green-800/30' : 'bg-green-100'}`}>
        <p className={`font-semibold ${isDark ? 'text-green-300' : 'text-green-700'}`}>
          You can now identify and exploit OWASP Top 10 vulnerabilities, secure web applications, perform professional penetration testing, and protect modern web architectures!
        </p>
      </div>
    </div>
  );
};

// Outcome Section Component
const OutcomeSection = ({ isDark }) => {
  return (
    <div className="mt-12 space-y-8">
      {/* Learning Outcome */}
      <div className={`p-6 rounded-xl border-2 ${isDark ? 'border-primary-500/50 bg-primary-900/30' : 'border-primary-300 bg-primary-50/80'}`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-primary-200' : 'text-primary-800'}`}>
          Learning Outcome
        </h2>
        <p className={`text-lg leading-relaxed ${isDark ? 'text-primary-100' : 'text-primary-700'}`}>
          {WEB_APP_SECURITY_ROADMAP.outcome}
        </p>
      </div>

      {/* Career Paths */}
      <div>
        <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          🚀 Web Security Career Paths
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WEB_APP_SECURITY_ROADMAP.career_paths.map((path, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                isDark ? 'border-gray-600 bg-gray-800 hover:bg-gray-750' : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{path}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Projects */}
      <div>
        <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          🧩 Web Security Projects
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WEB_APP_SECURITY_ROADMAP.mini_projects.map((project, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                isDark ? 'border-gray-600 bg-gray-800 hover:bg-gray-750' : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {project.name}
              </h4>
              <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className={`px-2 py-1 text-xs rounded-full ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className={`mt-2 text-xs font-medium ${
                project.difficulty === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {project.difficulty}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div>
        <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          ⚙️ Web Security Tools
        </h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {WEB_APP_SECURITY_ROADMAP.tools.map((tool, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                isDark ? 'border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30' : 'border-purple-200 bg-purple-50 hover:bg-purple-100'
              }`}
            >
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
                <span className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>{tool}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Labs Section */}
      <div className={`p-6 rounded-xl border-2 ${isDark ? 'border-purple-500/50 bg-purple-900/20' : 'border-purple-300 bg-purple-50/80'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
          🎯 Practice Labs & Resources
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-purple-200' : 'text-purple-700'}`}>Vulnerable Applications</h4>
            <ul className={`space-y-1 text-sm ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
              {WEB_APP_SECURITY_ROADMAP.labs.slice(0, 3).map((lab, index) => (
                <li key={index}>• {lab}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-purple-200' : 'text-purple-700'}`}>Learning Platforms</h4>
            <ul className={`space-y-1 text-sm ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
              {WEB_APP_SECURITY_ROADMAP.labs.slice(3).map((lab, index) => (
                <li key={index}>• {lab}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* OWASP Top 10 Overview */}
      <div className={`p-6 rounded-xl border-2 ${isDark ? 'border-orange-500/50 bg-orange-900/20' : 'border-orange-300 bg-orange-50/80'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-orange-300' : 'text-orange-800'}`}>
          🛡️ OWASP Top 10 You'll Master
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-orange-200' : 'text-orange-700'}`}>Critical Vulnerabilities</h4>
            <ul className={`space-y-1 text-sm ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>
              <li>• A01: Broken Access Control</li>
              <li>• A02: Cryptographic Failures</li>
              <li>• A03: Injection</li>
              <li>• A04: Insecure Design</li>
              <li>• A05: Security Misconfiguration</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-orange-200' : 'text-orange-700'}`}>Additional Risks</h4>
            <ul className={`space-y-1 text-sm ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>
              <li>• A06: Vulnerable Components</li>
              <li>• A07: Authentication Failures</li>
              <li>• A08: Software Integrity</li>
              <li>• A09: Logging & Monitoring</li>
              <li>• A10: Server-Side Request Forgery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Web App Security Roadmap Component
const WebAppSecurityRoadmap = () => {
  const { isLoggedIn } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [completedPhases, setCompletedPhases] = useState([]);
  const [expandedPhases, setExpandedPhases] = useState([0]);
  const [showFloatingAnimation, setShowFloatingAnimation] = useState(false);
  const [animationPhase, setAnimationPhase] = useState({ from: null, to: null });
  const [animatingPhases, setAnimatingPhases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load progress from localStorage
    const loadProgress = () => {
      try {
        const savedProgress = localStorage.getItem('web-app-security-roadmap-progress');
        console.log('Loading progress from localStorage:', savedProgress);
        
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress);
          if (Array.isArray(parsedProgress)) {
            setCompletedPhases(parsedProgress);
            console.log('Progress loaded successfully:', parsedProgress);
          } else {
            console.log('Invalid progress format, setting empty array');
            setCompletedPhases([]);
          }
        } else {
          console.log('No saved progress found, setting empty array');
          setCompletedPhases([]);
        }
      } catch (error) {
        console.error('Error parsing saved progress:', error);
        setCompletedPhases([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, []);

  const handleMarkComplete = (phaseIndex) => {
    const canMarkComplete = phaseIndex === 0 || completedPhases.includes(phaseIndex - 1);
    
    if (!canMarkComplete) {
      return;
    }

    const newCompletedPhases = [...completedPhases];
    if (!newCompletedPhases.includes(phaseIndex)) {
      // Show floating animation
      setAnimationPhase({ from: phaseIndex, to: phaseIndex + 1 });
      setShowFloatingAnimation(true);
      
      // Start line animation for the completed phase
      setAnimatingPhases(prev => [...prev, phaseIndex]);
      
      // Add to completed
      newCompletedPhases.push(phaseIndex);
      setCompletedPhases(newCompletedPhases);

      // Save to localStorage immediately
      localStorage.setItem('web-app-security-roadmap-progress', JSON.stringify(newCompletedPhases));
      console.log('Progress saved to localStorage:', newCompletedPhases);

      // Hide floating animation after delay
      setTimeout(() => {
        setShowFloatingAnimation(false);
      }, 1500);

      // Remove from animating phases after line animation completes
      setTimeout(() => {
        setAnimatingPhases(prev => prev.filter(phase => phase !== phaseIndex));
      }, 2000);
    }
  };

  // Save to localStorage whenever completedPhases changes (additional safety)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('web-app-security-roadmap-progress', JSON.stringify(completedPhases));
      console.log('Progress auto-saved to localStorage:', completedPhases);
    }
  }, [completedPhases, isLoading]);

  const handleExpandToggle = (phaseIndex) => {
    setExpandedPhases(prev => 
      prev.includes(phaseIndex) 
        ? prev.filter(phase => phase !== phaseIndex)
        : [...prev, phaseIndex]
    );
  };

  const isPhaseCompleted = (phaseIndex) => completedPhases.includes(phaseIndex);
  const isPhaseExpanded = (phaseIndex) => expandedPhases.includes(phaseIndex);
  const isPhaseActive = (phaseIndex) => {
    if (isPhaseExpanded(phaseIndex)) return true;
    const firstIncomplete = WEB_APP_SECURITY_ROADMAP.phases.findIndex((_, index) => !isPhaseCompleted(index));
    return phaseIndex === firstIncomplete;
  };

  const canMarkPhaseComplete = (phaseIndex) => {
    return phaseIndex === 0 || completedPhases.includes(phaseIndex - 1);
  };

  const completedCount = completedPhases.length;
  const totalPhases = WEB_APP_SECURITY_ROADMAP.phases.length;
  const isAllCompleted = completedCount === totalPhases;

  // Show loading state while progress is being loaded
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'dark-gradient-secondary' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className={`mt-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Loading your Web Security progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark-gradient-secondary' : 'bg-gray-50'}`}>
      {/* Floating Animation */}
      <FloatingAnimation 
        fromPhase={animationPhase.from}
        toPhase={animationPhase.to}
        isVisible={showFloatingAnimation}
        onComplete={() => setShowFloatingAnimation(false)}
      />

      {/* Header */}
      <div className="gradient-bg text-white py-8 md:py-12 lg:py-16 relative">
        {/* Back Button - Fixed at top left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
          <Link 
            to="/roadmaps" 
            className={`inline-flex items-center px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-all duration-300 border-2 font-semibold text-sm md:text-base ${
              isDark 
                ? 'bg-white/20 hover:bg-white/30 text-white border-white/40 hover:border-white/60 shadow-lg' 
                : 'bg-white/30 hover:bg-white/40 text-gray-800 border-white/50 hover:border-white/70 shadow-lg'
            } hover:scale-105`}
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Roadmaps
          </Link>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{WEB_APP_SECURITY_ROADMAP.title}</h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 max-w-3xl">
                {WEB_APP_SECURITY_ROADMAP.description}
              </p>
              
              <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-6 text-xs md:text-sm">
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mr-2"></span>
                  <span>{Math.ceil(WEB_APP_SECURITY_ROADMAP.estimated_hours / 20)} weeks • {WEB_APP_SECURITY_ROADMAP.estimated_hours} hours</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  <span>{WEB_APP_SECURITY_ROADMAP.difficulty}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  <span>{WEB_APP_SECURITY_ROADMAP.prerequisites.length} prerequisites</span>
                </div>
              </div>
            </div>
            
            <div className={`p-4 md:p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-sm w-full lg:w-auto`}>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-primary-400 mb-2">
                  {completedCount}/{totalPhases}
                </div>
                <div className="text-gray-300 text-xs md:text-sm mb-4">Phases Completed</div>
                <button 
                  onClick={() => document.getElementById('learning-path').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full px-4 py-2 md:px-6 md:py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 text-sm md:text-base"
                >
                  Start Web Security Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div id="learning-path">
          <ProgressTracker 
            currentStep={completedCount} 
            totalSteps={totalPhases}
            isDark={isDark}
          />
          
          <div className="mb-8">
            <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Learning Path - 7 Weeks Journey
            </h2>
            
            {/* Main container with continuous connecting line */}
            <PhaseContainer 
              isDark={isDark}
              completedCount={completedCount}
              totalPhases={totalPhases}
            >
              {WEB_APP_SECURITY_ROADMAP.phases.map((phase, index) => (
                <div key={index}>
                  <PhaseHeader
                    phase={phase}
                    isExpanded={isPhaseExpanded(index)}
                    onToggle={() => handleExpandToggle(index)}
                    isCompleted={isPhaseCompleted(index)}
                    isActive={isPhaseActive(index)}
                    isDark={isDark}
                    index={index}
                    isLast={index === WEB_APP_SECURITY_ROADMAP.phases.length - 1}
                    isAnimating={animatingPhases.includes(index)}
                  />
                  <PhaseContent
                    phase={phase}
                    isCompleted={isPhaseCompleted(index)}
                    onToggle={handleMarkComplete}
                    isDark={isDark}
                    index={index}
                    isExpanded={isPhaseExpanded(index)}
                    canMarkComplete={canMarkPhaseComplete(index)}
                    onMarkComplete={handleMarkComplete}
                  />
                </div>
              ))}
            </PhaseContainer>

            {/* Completion Celebration */}
            <CompletionCelebration 
              isDark={isDark}
              isVisible={isAllCompleted}
            />
          </div>
        </div>

        {/* Outcome Section at the end */}
        <OutcomeSection isDark={isDark} />
      </div>

      {/* Add custom animations to global styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 1; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.8; }
          100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
        }
        @keyframes lineFlow {
          0% { height: 0%; opacity: 0.8; }
          50% { height: 100%; opacity: 1; }
          100% { height: 100%; opacity: 0; }
        }
        .animate-float {
          animation: float 1.5s ease-in-out forwards;
        }
        .animate-lineFlow {
          animation: lineFlow 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WebAppSecurityRoadmap;