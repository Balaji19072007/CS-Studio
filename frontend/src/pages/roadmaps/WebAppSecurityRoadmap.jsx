import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

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

const WebAppSecurityRoadmap = () => {
  return <RoadmapLayout data={WEB_APP_SECURITY_ROADMAP} roadmapId={WEB_APP_SECURITY_ROADMAP.id} />;
};

export default WebAppSecurityRoadmap;
