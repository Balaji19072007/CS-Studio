import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const FRONTEND_DEVELOPMENT_ROADMAP = {
  "id": "frontend-dev",
  "title": "🧭 Frontend Development Roadmap",
  "description": "Learn how to build responsive, modern, and interactive user interfaces using HTML, CSS, JavaScript, and React.",
  "short_description": "Learn how to build responsive, modern, and interactive user interfaces using HTML, CSS, JavaScript, and React.",
  "prerequisites": ["Basic computer literacy"],
  "estimated_hours": 120,
  "difficulty": "Beginner to Intermediate",
  "category": "Web Development",
  "phases": [
    {
      "phase": 1,
      "title": "HTML & CSS Foundations",
      "goal": "Understand how web pages are structured and styled",
      "weeks": "Week 1-2",
      "topics": [
        "HTML5 document structure",
        "Semantic tags (header, section, footer, nav)",
        "Forms, inputs, tables",
        "CSS basics: selectors, specificity, inheritance",
        "Box model (margin, padding, border)",
        "Display types (block, inline, inline-block)",
        "Flexbox basics (container, alignment, wrapping)",
        "CSS Grid introduction"
      ],
      "practice": [
        "Build a landing page structure",
        "Create a responsive navbar",
        "Build 2-column & 3-column layouts",
        "Create a contact form with CSS styling"
      ]
    },
    {
      "phase": 2,
      "title": "Responsive Design & Modern CSS",
      "goal": "Make websites work on mobile, tablet, and desktop",
      "weeks": "Week 2-3",
      "topics": [
        "Media queries",
        "Mobile-first design",
        "Responsive images (srcset)",
        "CSS units: rem, em, %, vw, vh",
        "CSS Grid advanced (areas, implicit grid)",
        "CSS variables (custom properties)",
        "Animations & transitions",
        "BEM naming convention"
      ],
      "practice": [
        "Build a responsive blog layout",
        "Create animated buttons and cards",
        "Build a responsive pricing section"
      ]
    },
    {
      "phase": 3,
      "title": "JavaScript Fundamentals",
      "goal": "Learn how to add interaction and dynamic features to pages",
      "weeks": "Week 3-4",
      "topics": [
        "Variables (let, const)",
        "Data types, operators",
        "Arrays & objects",
        "Loops, functions, arrow functions",
        "DOM manipulation (querySelector, .innerHTML)",
        "Events (click, submit, input)",
        "LocalStorage basics",
        "Template strings",
        "ES6 modules",
        "Fetch API (GET, POST)"
      ],
      "practice": [
        "Build tabs & accordion UI",
        "Create a modal popup",
        "Build a form validator",
        "Fetch API: display live weather data",
        "Create a localStorage-based todo list"
      ]
    },
    {
      "phase": 4,
      "title": "DOM, Browser APIs & Interactivity",
      "goal": "Work with advanced DOM features and browser APIs",
      "weeks": "Week 4-5",
      "topics": [
        "DOM tree traversal",
        "Creating & removing elements dynamically",
        "Event delegation",
        "Debouncing & throttling",
        "Fetching API data and rendering UI",
        "Async/await & promises",
        "Browser APIs (Clipboard, Storage, History)",
        "JSON handling"
      ],
      "practice": [
        "Build a search filter UI",
        "Weather app using API",
        "Build pagination UI using JS",
        "Image gallery with modal & keyboard controls"
      ]
    },
    {
      "phase": 5,
      "title": "React Fundamentals",
      "goal": "Build apps using component-based UI architecture",
      "weeks": "Week 5-6",
      "topics": [
        "Why React? Virtual DOM, components",
        "Vite/CRA setup",
        "JSX basics",
        "Props & state",
        "useState, useEffect",
        "Conditional rendering",
        "Lists & keys",
        "Controlled components (forms)",
        "Folder structure",
        "Basic component communication",
        "React Router (intro)"
      ],
      "practice": [
        "Build a React Todo App",
        "Build a quote generator with API",
        "Create a multi-page React app with routing",
        "Build a login form with validation"
      ]
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn a topic",
      "example": "Watch YouTube or read docs"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Build small UI component / JS task"
    },
    {
      "time": "90-120 mins",
      "task": "Project work",
      "example": "Add feature to a mini-project"
    }
  ],
  "tools": [
    "VS Code",
    "Live Server",
    "Chrome DevTools",
    "React + React Router",
    "Tailwind / Bootstrap (optional)",
    "Postman (for API testing)"
  ],
  "outcome": "By the end of Week 6 you will be able to build responsive, mobile-friendly UIs, create interactive interfaces using JS, build apps using React, consume APIs, and build 5+ frontend portfolio projects.",
  "career_paths": [
    "Frontend Developer",
    "UI Developer",
    "React Developer",
    "Web Developer",
    "Full Stack Developer",
    "JavaScript Developer"
  ]
};

const FrontendDevelopmentRoadmap = () => {
  return <RoadmapLayout data={FRONTEND_DEVELOPMENT_ROADMAP} roadmapId={FRONTEND_DEVELOPMENT_ROADMAP.id} />;
};

export default FrontendDevelopmentRoadmap;
