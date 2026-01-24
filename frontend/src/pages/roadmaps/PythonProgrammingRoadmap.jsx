import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const PYTHON_LANGUAGE_ROADMAP = {
  "id": "python-lang",
  "title": "🐍 Python Language Learning Roadmap",
  "description": "Learn Python from scratch — understand high-level programming, logic building, automation, and develop real-world applications confidently.",
  "short_description": "Learn Python from scratch — understand high-level programming, logic building, automation, and develop real-world applications confidently.",
  "prerequisites": ["Basic computer literacy"],
  "estimated_hours": 120,
  "difficulty": "Beginner to Advanced",
  "category": "Programming Languages",
  "phases": [
    {
      "phase": 1,
      "title": "Setup & Basics",
      "goal": "Learn what Python is and how to set up your environment",
      "weeks": "Week 1",
      "topics": [
        "What is Python & why it's popular",
        "Installing Python & VS Code / PyCharm",
        "Writing your first program (print('Hello, World!'))",
        "Understanding indentation and syntax",
        "Using the Python shell & VS Code terminal"
      ],
      "practice": [
        "Print your name and age",
        "Simple addition and subtraction program",
        "Experiment with print() and input()"
      ],
      
    },
    {
      "phase": 2,
      "title": "Variables, Data Types & Operators",
      "goal": "Understand Python's basic building blocks",
      "weeks": "Week 2",
      "topics": [
        "Variables and naming conventions",
        "Data types: int, float, str, bool",
        "Type casting",
        "Arithmetic, comparison, logical, and assignment operators",
        "Comments and user input"
      ],
      "practice": [
        "Area and perimeter of a circle",
        "BMI calculator",
        "Simple interest calculator"
      ]
    },
    {
      "phase": 3,
      "title": "Control Flow",
      "goal": "Learn how to make decisions and repeat tasks",
      "weeks": "Week 3",
      "topics": [
        "if, elif, and else statements",
        "Nested conditions",
        "Loops: for, while",
        "break, continue, and pass",
        "range() function"
      ],
      "practice": [
        "Even/Odd number",
        "Multiplication table",
        "Guess the number game",
        "Pattern printing"
      ],
      
    },
    {
      "phase": 4,
      "title": "Data Structures",
      "goal": "Work with collections of data efficiently",
      "weeks": "Week 4-5",
      "topics": [
        "Lists and their methods (append, sort, pop)",
        "Tuples and immutability",
        "Sets and operations",
        "Dictionaries and key-value access",
        "Indexing, slicing, and iteration"
      ],
      "practice": [
        "Manage student marks (list)",
        "Unique elements from a list (set)",
        "Word frequency counter (dictionary)"
      ],
      
    },
    {
      "phase": 5,
      "title": "Functions & Modules",
      "goal": "Learn modular programming and code reuse",
      "weeks": "Week 6",
      "topics": [
        "Defining and calling functions",
        "Parameters and return values",
        "Default arguments & keyword arguments",
        "Lambda (anonymous) functions",
        "Importing modules (math, random)"
      ],
      "practice": [
        "Factorial and Fibonacci using functions",
        "Password generator",
        "Basic calculator with functions"
      ]
    },
    {
      "phase": 6,
      "title": "File Handling & Exception Handling",
      "goal": "Learn to read/write files and handle errors gracefully",
      "weeks": "Week 7",
      "topics": [
        "Open, read, write, and close files",
        "Working with text and CSV files",
        "Using with open() statement",
        "try, except, finally",
        "Raising exceptions manually"
      ],
      "practice": [
        "Write and read student records",
        "File-based to-do list",
        "Error handling in file operations"
      ]
    },
    {
      "phase": 7,
      "title": "Object-Oriented Programming",
      "goal": "Learn how to model real-world problems using OOP",
      "weeks": "Week 8-9",
      "topics": [
        "Classes and Objects",
        "The __init__() constructor",
        "Inheritance and method overriding",
        "Encapsulation and Abstraction",
        "Class vs Instance variables"
      ],
      "practice": [
        "Student class with marks and grade method",
        "Bank account management system",
        "Car class with start/stop functionality"
      ],
      
    },
    {
      "phase": 8,
      "title": "Advanced Concepts",
      "goal": "Explore Python's deeper features",
      "weeks": "Week 10-11",
      "topics": [
        "List comprehensions",
        "Decorators and generators",
        "os, datetime, json modules",
        "Virtual environments",
        "Command-line arguments"
      ],
      "practice": [
        "JSON data parser",
        "Directory file lister",
        "Decorator-based timer"
      ]
    },
    {
      "phase": 9,
      "title": "Real-World Libraries",
      "goal": "Learn to use powerful Python libraries",
      "weeks": "Week 12-14",
      "topics": [
        "pandas, numpy — data handling",
        "matplotlib — visualization",
        "flask — web development basics",
        "tkinter — GUI apps"
      ],
      "practice": [
        "Data visualization mini project",
        "Flask-based basic web app"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Calculator App",
      "description": "Build a functional calculator application",
      "technologies": ["Functions", "Control Structures", "Basic I/O"],
      "type": "python",
      "difficulty": "Beginner"
    },
    {
      "name": "Quiz Game",
      "description": "Interactive quiz game with scoring system",
      "technologies": ["Functions", "Data Structures", "Control Structures"],
      "type": "python",
      "difficulty": "Beginner"
    },
    {
      "name": "Expense Tracker",
      "description": "CSV-based expense tracking system",
      "technologies": ["File Handling", "Data Structures", "CSV"],
      "type": "python",
      "difficulty": "Intermediate"
    },
    {
      "name": "Weather App",
      "description": "API-based weather application",
      "technologies": ["API Integration", "JSON", "Requests"],
      "type": "python",
      "difficulty": "Intermediate"
    },
    {
      "name": "Snake Game",
      "description": "Classic snake game implementation",
      "technologies": ["Pygame", "OOP", "Game Logic"],
      "type": "python",
      "difficulty": "Advanced"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn new topic",
      "example": "Watch tutorials & take notes"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Solve exercises"
    },
    {
      "time": "90-120 mins",
      "task": "Mini project",
      "example": "Apply learned concepts"
    }
  ],
  "tools": [
    "IDE: VS Code / PyCharm",
    "Online Compiler: Replit / Jupyter Notebook / Google Colab",
    "Practice Platforms: HackerRank Python, W3Schools Python"
  ],
  "outcome": "By the end of this roadmap, you'll understand syntax, OOP, and file handling, be able to build real-world apps and automations, and be ready for Full Stack Development or Data Science.",
  "career_paths": [
    "Python Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Automation Engineer",
    "Backend Developer"
  ]
};

const PythonProgrammingRoadmap = () => {
  return <RoadmapLayout data={PYTHON_LANGUAGE_ROADMAP} roadmapId={PYTHON_LANGUAGE_ROADMAP.id} />;
};

export default PythonProgrammingRoadmap;
