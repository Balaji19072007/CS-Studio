import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const JAVA_LANGUAGE_ROADMAP = {
  "id": "java-lang",
  "title": "☕ Java Language Learning Roadmap",
  "description": "Master Java from scratch — learn OOP, data structures, and build console & real-world applications.",
  "short_description": "Master Java from scratch — learn OOP, data structures, and build console & real-world applications.",
  "prerequisites": ["Basic computer literacy"],
  "estimated_hours": 100,
  "difficulty": "Beginner to Intermediate",
  "category": "Programming Languages",
  "phases": [
    {
      "phase": 1,
      "title": "Setup & Basics",
      "goal": "Learn how Java works and set up your environment",
      "weeks": "Week 1",
      "topics": [
        "Installing JDK and IntelliJ IDEA / VS Code",
        "Writing first Java program (public class Main)",
        "Understanding JVM, JRE, JDK",
        "Syntax, Semicolons, Curly braces",
        "Comments and naming conventions"
      ],
      "practice": [
        "Hello World program",
        "Print your name and age",
        "Add two numbers"
      ],
     
    },
    {
      "phase": 2,
      "title": "Variables, Data Types & Operators",
      "goal": "Learn Java's strong typing system",
      "weeks": "Week 2",
      "topics": [
        "Variables and data types (int, float, double, char, boolean)",
        "Type casting (implicit & explicit)",
        "Operators (Arithmetic, Logical, Relational)",
        "Input using Scanner class",
        "Constants (final keyword)"
      ],
      "practice": [
        "Simple interest calculator",
        "Unit converter",
        "Area of circle"
      ]
    },
    {
      "phase": 3,
      "title": "Control Flow",
      "goal": "Learn decision-making and loops",
      "weeks": "Week 3",
      "topics": [
        "if, else if, else",
        "switch statements",
        "Loops: for, while, do-while",
        "break and continue",
        "Nested loops"
      ],
      "practice": [
        "Even/Odd checker",
        "Factorial of a number",
        "Number pattern generator"
      ],
     
    },
    {
      "phase": 4,
      "title": "Methods & OOP",
      "goal": "Learn object-oriented principles",
      "weeks": "Week 4-5",
      "topics": [
        "Defining and calling methods",
        "Method overloading",
        "Classes and objects",
        "Constructors",
        "this keyword",
        "Access modifiers (public, private, protected)"
      ],
      "practice": [
        "Student class with marks",
        "Bank account class",
        "Calculator class using OOP"
      ]
    },
    {
      "phase": 5,
      "title": "Arrays & Strings",
      "goal": "Work with collections of data",
      "weeks": "Week 6",
      "topics": [
        "Single & multidimensional arrays",
        "Enhanced for loops",
        "Common String methods (length(), charAt(), substring())",
        "StringBuilder and immutability"
      ],
      "practice": [
        "Find largest element in array",
        "Reverse string",
        "Palindrome checker"
      ]
    },
    {
      "phase": 6,
      "title": "Inheritance & Polymorphism",
      "goal": "Deepen your OOP understanding",
      "weeks": "Week 7-8",
      "topics": [
        "Inheritance",
        "Method overriding",
        "Abstract classes",
        "Interfaces",
        "Polymorphism"
      ],
      "practice": [
        "Employee management hierarchy",
        "Shape area calculator using inheritance"
      ]
    },
    {
      "phase": 7,
      "title": "Collections & Exception Handling",
      "goal": "Learn advanced Java utilities",
      "weeks": "Week 9",
      "topics": [
        "ArrayList, HashMap, Set",
        "Enhanced for-each",
        "Exception handling (try, catch, finally, throw)",
        "Custom exceptions"
      ],
      "practice": [
        "Inventory manager",
        "Simple login system with exceptions"
      ]
    },
    {
      "phase": 8,
      "title": "File Handling & Packages",
      "goal": "Learn modular and persistent programming",
      "weeks": "Week 10",
      "topics": [
        "File read/write (FileReader, BufferedReader)",
        "Creating and importing packages",
        "Accessing classes from other files",
        "Command-line arguments"
      ],
      "practice": [
        "Library management system",
        "File-based to-do app"
      ],
      
    }
  ],
  "mini_projects": [
    {
      "name": "Calculator App",
      "description": "Build a functional calculator application using OOP",
      "technologies": ["OOP", "Methods", "Basic I/O"],
      "type": "java",
      "difficulty": "Beginner"
    },
    {
      "name": "Quiz Game",
      "description": "Interactive quiz game with scoring system",
      "technologies": ["Control Structures", "Arrays", "Methods"],
      "type": "java",
      "difficulty": "Beginner"
    },
    {
      "name": "Student Management System",
      "description": "Manage student records with CRUD operations",
      "technologies": ["OOP", "File Handling", "Collections"],
      "type": "java",
      "difficulty": "Intermediate"
    },
    {
      "name": "Banking App",
      "description": "OOP-based banking application with accounts and transactions",
      "technologies": ["OOP", "Inheritance", "File Handling"],
      "type": "java",
      "difficulty": "Intermediate"
    },
    {
      "name": "Number Guessing Game",
      "description": "Interactive game with random number generation",
      "technologies": ["Control Structures", "Methods", "Random Numbers"],
      "type": "java",
      "difficulty": "Beginner"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn a new topic",
      "example": "Watch tutorial + take notes"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Solve coding problems"
    },
    {
      "time": "90-120 mins",
      "task": "Project work",
      "example": "Build mini console apps"
    }
  ],
  "tools": [
    "IDE: IntelliJ IDEA / Eclipse / VS Code",
    "Compiler: Java SE (JDK 17+)",
    "Practice Platforms: HackerRank Java, W3Schools Java"
  ],
  "outcome": "By the end of this roadmap, you'll master Object-Oriented Programming, build console and file-based projects, and be ready for Android Development or Java DSA.",
  "career_paths": [
    "Java Developer",
    "Android Developer",
    "Backend Developer",
    "Enterprise Application Developer",
    "Software Engineer",
    "Full Stack Developer (with additional skills)"
  ]
};

const JavaProgrammingRoadmap = () => {
  return <RoadmapLayout data={JAVA_LANGUAGE_ROADMAP} roadmapId={JAVA_LANGUAGE_ROADMAP.id} />;
};

export default JavaProgrammingRoadmap;
