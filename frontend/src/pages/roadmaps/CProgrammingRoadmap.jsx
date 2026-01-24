// frontend/src/pages/roadmaps/CProgrammingRoadmap.jsx
import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

// C Language Roadmap Data
const C_LANGUAGE_ROADMAP = {
  "id": "c-lang",
  "title": "C Language Learning Roadmap",
  "description": "Learn C language from scratch — understand programming logic, syntax, memory management, and build small projects confidently.",
  "short_description": "Learn C language from scratch — understand programming logic, syntax, memory management, and build small projects confidently.",
  "prerequisites": ["Basic computer literacy"],
  "estimated_hours": 80,
  "difficulty": "Beginner to Intermediate",
  "category": "Programming Languages",
  "phases": [
    {
      "phase": 1,
      "title": "Basics of Programming",
      "goal": "Understand what programming is & how C works",
      "weeks": "Week 1",
      "topics": [
        "What is Programming?",
        "What is C language & why learn it",
        "Structure of a C program",
        "How C works (compile → link → run)",
        "Installing a compiler (GCC, Code::Blocks, VS Code setup)"
      ],
      "practice": [
        "Write your first program: Hello, World!",
        "Compile & run using terminal or IDE",
        "Try editing text, re-running, fixing typos"
      ]
    },
    {
      "phase": 2,
      "title": "Core Syntax & Data Types",
      "goal": "Learn variables, data types, operators, & I/O",
      "weeks": "Week 2",
      "topics": [
        "Keywords & Identifiers",
        "Variables and Constants",
        "Data types (int, float, char, double)",
        "Input & Output (printf, scanf)",
        "Operators (Arithmetic, Logical, Relational)",
        "Type Casting"
      ],
      "practice": [
        "Simple Calculator Program",
        "Temperature conversion (Celsius ↔ Fahrenheit)"
      ]
    },
    {
      "phase": 3,
      "title": "Control Flow",
      "goal": "Learn how to make decisions and loops in code",
      "weeks": "Week 3",
      "topics": [
        "if, else if, else",
        "switch statements",
        "Loops (for, while, do-while)",
        "break and continue",
        "Nested loops"
      ],
      "practice": [
        "Check even/odd",
        "Find largest of 3 numbers",
        "Multiplication table",
        "Simple pattern printing (stars, triangles)"
      ]
    },
    {
      "phase": 4,
      "title": "Functions & Scope",
      "goal": "Understand modular programming",
      "weeks": "Week 4",
      "topics": [
        "Defining & Calling Functions",
        "Function Arguments & Return Values",
        "Local vs Global Variables",
        "Recursion basics"
      ],
      "practice": [
        "Factorial using recursion",
        "Fibonacci series",
        "Prime number check"
      ]
    },
    {
      "phase": 5,
      "title": "Arrays & Strings",
      "goal": "Work with collections of data",
      "weeks": "Week 5",
      "topics": [
        "1D and 2D Arrays",
        "Array Traversal",
        "Strings (char arrays)",
        "String functions (strlen, strcpy, strcmp)"
      ],
      "practice": [
        "Find largest element in an array",
        "Reverse a string",
        "Count vowels/consonants"
      ]
    },
    {
      "phase": 6,
      "title": "Pointers & Memory",
      "goal": "Master C's most powerful feature — pointers",
      "weeks": "Week 6",
      "topics": [
        "What is a pointer?",
        "Pointer syntax",
        "Pointer arithmetic",
        "* and & operators",
        "Pointers with arrays & functions",
        "malloc, calloc, free"
      ],
      "practice": [
        "Swap two numbers using pointers",
        "Dynamic array creation",
        "Find sum using pointer traversal"
      ]
    },
    {
      "phase": 7,
      "title": "Structures & File Handling",
      "goal": "Learn how to store complex data and work with files",
      "weeks": "Week 7-8",
      "topics": [
        "Structures & Nested Structures",
        "typedef keyword",
        "File Handling (fopen, fprintf, fscanf, fclose)",
        "Read & write data from files"
      ],
      "practice": [
        "Student record system (structure array)",
        "File-based contact manager"
      ]
    },
    {
      "phase": 8,
      "title": "Advanced Concepts",
      "goal": "Deepen your understanding",
      "weeks": "Week 9-10",
      "topics": [
        "Command-line arguments",
        "Preprocessor directives (#define, #include)",
        "Header files & modularization",
        "Memory leak debugging",
        "Time complexity basics"
      ],
      "practice": [
        "Custom header file",
        "Mini-library using functions"
      ]
    }
  ],
  "tools": [
    "Compiler: GCC or TDM-GCC",
    "Editor: VS Code or Code::Blocks",
    "Online Practice: HackerRank, W3Schools"
  ],
  "outcome": "By the end of this roadmap, you'll understand low-level programming & memory, be able to build console applications in C, and have strong foundation for system programming.",
  "career_paths": [
    "System Programmer",
    "Embedded Systems Developer",
    "Game Developer (with additional skills)",
    "Compiler Developer",
    "Operating System Developer"
  ]
};

const CProgrammingRoadmap = () => {
  return <RoadmapLayout data={C_LANGUAGE_ROADMAP} roadmapId="c-roadmap" />;
};

export default CProgrammingRoadmap;