// frontend/src/pages/learningPage/CProgramming.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Simple icon component to replace Feather Icons
const Icon = ({ name, className = "w-4 h-4" }) => {
  const icons = {
    'chevron-right': '>',
    'play-circle': '▶',
    'file-text': '📄',
    'help-circle': '?',
    'code': '</>',
    'clipboard': '📋',
    'award': '🏆',
    'check-circle': '✓',
    'arrow-left': '←',
    'arrow-right': '→',
    'book-open': '📚',
    'edit-3': '✏️',
    'video': '▶️',
    'quiz': '❓',
    'project': '💼',
    'certificate': '🏅'
  };
  
  return <span className={`inline-block ${className}`}>{icons[name] || '○'}</span>;
};

const CProgramming = () => {
    const [activeModule, setActiveModule] = useState(1);
    const [completedTopics, setCompletedTopics] = useState(new Set());
    const [currentVideo, setCurrentVideo] = useState('');
    const [currentTopic, setCurrentTopic] = useState(null);
    const [allTopics, setAllTopics] = useState([]);
    const videoRef = useRef(null);

    // Course modules data
    const modules = [
        {
            id: 1,
            title: "Getting Started With C",
            topics: [
                { 
                    id: 1, 
                    title: "Knowing the Computer (Block Diagram, CPU, Memory)", 
                    type: "video", 
                    duration: "15m",
                    videoUrl: "/videos/c1topic.mp4",
                    content: `🖥️ Knowing the Computer (Block Diagram, CPU, Memory)

1. What is a Computer?
A computer is an electronic machine that accepts input, processes data, and produces output.
Every computer, from a simple calculator to a powerful laptop, works using the same basic structure.

2. Block Diagram of a Computer
A typical computer system is divided into three main units:

1️⃣ Input Unit
Devices that send data to the computer.
Examples:
• Keyboard
• Mouse
• Scanner
• Microphone

2️⃣ Central Processing Unit (CPU)
The "brain" of the computer where all processing happens.
The CPU has two major components:

• ALU (Arithmetic and Logic Unit)
- Performs all mathematical operations
- Handles logical comparisons (like >, <, ==)
- Executes calculations and decisions

• CU (Control Unit)
- Controls all computer operations
- Manages the flow of data
- Tells the CPU, memory, and I/O devices what to do

3️⃣ Output Unit
Devices that display the results.
Examples:
• Monitor
• Printer
• Speakers

3. Memory of a Computer
Memory stores instructions and data required for execution.

🧠 Primary Memory (Main Memory)
• RAM (Random Access Memory)
• Fast, temporary storage
• Data is lost when power is off
• Used by programs while they run

💾 Secondary Memory
• Hard Disk, SSD, Pen Drive
• Permanent storage
• Slower than RAM
• Stores files, documents, software

4. How Data Flows in a Computer
The complete journey of data inside a computer:
• User enters data through an input device
• Data goes to RAM
• CPU reads the data from RAM
• CPU processes it using ALU & CU
• Result is sent back to RAM
• Output unit displays the result
This entire process happens in milliseconds.

5. Why C Programmers Should Know This
C programming interacts closely with hardware:
• C accesses memory directly
• Pointers manipulate memory addresses
• C is used to build operating systems
• Understanding CPU and memory helps write efficient programs
A clear understanding of the computer's architecture makes learning C much easier.

6. Summary
• Input → Process → Output is the basic flow of a computer
• CPU contains ALU (calculations) and CU (control)
• Memory is divided into RAM (temporary) and Storage (permanent)
• C programming works closely with memory and CPU operations`
                },
                { 
                    id: 2, 
                    title: "What is a Programming Language?", 
                    type: "video", 
                    duration: "10m",
                    videoUrl: "/videos/c2topic.mp4",
                    content: `📝 What is a Programming Language?

1. Definition
A programming language is a formal language comprising a set of instructions that produce various kinds of output. Programming languages are used to create programs that implement specific algorithms.

2. Types of Programming Languages
• Low-level Languages
  - Machine Language (Binary: 0s and 1s)
  - Assembly Language (Uses mnemonics)

• High-level Languages
  - C, C++, Java, Python
  - Easier for humans to read and write
  - Must be converted to machine code

3. Why We Need Programming Languages
• To communicate with computers
• To solve complex problems
• To automate tasks
• To build software applications

4. Compiler vs Interpreter
• Compiler: Translates entire program at once
• Interpreter: Translates line by line
• C uses a compiler` 
                },
                { 
                    id: 3, 
                    title: "What is C Programming?", 
                    type: "video", 
                    duration: "12m", 
                    videoUrl: "/videos/c3topic.mp4",
                    content: `🔤 What is C Programming?

1. Introduction to C
C is a general-purpose, procedural programming language developed in 1972 by Dennis Ritchie at Bell Labs.

2. Key Features of C
• Simple and efficient
• Mid-level language
• Structured programming
• Rich library
• Fast execution
• Portable

3. Why Learn C?
• Foundation for other languages
• System programming
• Embedded systems
• High performance
• Understanding computer fundamentals

4. Basic Structure
#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}`
                },
                { 
                    id: 4, 
                    title: "Installation of C on Mobile & PC", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c4topic.mp4",
                    content: `💻 Installation of C on Mobile & PC

1. PC Installation (Windows)
• Download Code::Blocks or Dev C++
• Install the compiler
• Set up the IDE
• Write your first program

2. PC Installation (Mac/Linux)
• Use built-in GCC compiler
• Install Xcode (Mac) or build-essential (Linux)
• Use terminal for compilation

3. Mobile Installation
• C4Droid (Android)
• C Compiler IDE (iOS)
• Online compilers

4. Verification
• Write a simple "Hello World" program
• Compile and run
• Check for errors` 
                },
                { 
                    id: 5, 
                    title: "How C Code Runs (Compilation → Execution)", 
                    type: "video", 
                    duration: "15m",
                    videoUrl: "/videos/c5topic.mp4",
                    content: `⚙️ How C Code Runs (Compilation → Execution)

1. Compilation Process
• Preprocessing
• Compilation
• Assembly
• Linking

2. Steps in Detail
• Preprocessor: Handles #include and #define
• Compiler: Converts to assembly code
• Assembler: Converts to machine code
• Linker: Combines with libraries

3. Execution
• Loader loads the program into memory
• CPU executes instructions
• Program runs and produces output

4. File Extensions
• .c - Source code
• .o - Object file
• .exe - Executable file` 
                },
                { 
                    id: 6, 
                    title: "Writing Your First C Program", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c6topic.mp4",
                    content: `✍️ Writing Your First C Program

1. Basic Structure
#include <stdio.h>
int main() {
    // Your code here
    return 0;
}

2. Hello World Program
#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}

3. Explanation
• #include <stdio.h> - Header file for input/output
• int main() - Main function where execution starts
• printf() - Function to print output
• return 0 - Indicates successful execution

4. Compilation and Execution
• Save file as hello.c
• Compile: gcc hello.c -o hello
• Run: ./hello (Linux/Mac) or hello.exe (Windows)` 
                },
                { 
                    id: 7, 
                    title: "Structure of a C Program", 
                    type: "video", 
                    duration: "18m",
                    videoUrl: "/videos/c7topic.mp4",
                    content: `🏗️ Structure of a C Program

1. Documentation Section
/* Comments about the program */
// Single line comments

2. Link Section
#include <stdio.h>
#include <math.h>

3. Definition Section
#define PI 3.14

4. Global Declaration Section
int global_var;

5. Main Function
int main() {
    // Local declarations
    // Executable statements
    return 0;
}

6. Subprogram Section
void myFunction() {
    // Function body
}` 
                },
                { 
                    id: 101, 
                    title: "Quiz: Introduction to C & Computer Basics", 
                    type: "quiz", 
                    duration: "10m",
                    content: `📝 Quiz: Introduction to C & Computer Basics

This quiz will test your understanding of:
• Computer fundamentals and architecture
• Programming language concepts
• C programming basics
• Program structure and execution

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 2,
            title: "Basics of C",
            topics: [
                { 
                    id: 8, 
                    title: "Variables", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c8topic.mp4",
                    content: `📊 Variables in C

1. What are Variables?
Variables are named memory locations that store data. They can hold different values during program execution.

2. Variable Declaration
Syntax: data_type variable_name;
Example: int age;

3. Variable Initialization
int age = 25;
float salary = 50000.50;
char grade = 'A';

4. Rules for Naming Variables
• Must start with letter or underscore
• Can contain letters, digits, underscores
• Cannot use keywords
• Case sensitive

5. Examples
int count = 10;
float average = 85.5;
char initial = 'M';
double price = 99.99;` 
                },
                { 
                    id: 9, 
                    title: "Data Types", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c9topic.mp4",
                    content: `🔢 Data Types in C

1. Basic Data Types
• int - Integer numbers (4 bytes)
• float - Floating point numbers (4 bytes)
• double - Double precision (8 bytes)
• char - Single character (1 byte)

2. Derived Data Types
• Arrays
• Pointers
• Structures
• Unions

3. Type Modifiers
• signed / unsigned
• short / long

4. Size and Range
• int: -2,147,483,648 to 2,147,483,647
• float: 3.4e-38 to 3.4e+38
• char: -128 to 127
• double: 1.7e-308 to 1.7e+308

5. Examples
int age = 25;
float weight = 68.5;
double distance = 1234.5678;
char letter = 'X';` 
                },
                { 
                    id: 10, 
                    title: "Constants", 
                    type: "video", 
                    duration: "15m",
                    videoUrl: "/videos/c10topic.mp4",
                    content: `🔒 Constants in C

1. What are Constants?
Constants are fixed values that cannot be changed during program execution.

2. Types of Constants
• Integer Constants: 10, -5, 1000
• Floating Constants: 3.14, -2.5, 0.0
• Character Constants: 'A', '1', '$'
• String Constants: "Hello", "C Programming"

3. Using #define
#define PI 3.14159
#define MAX_SIZE 100

4. Using const Keyword
const int days_in_week = 7;
const float tax_rate = 0.18;

5. Benefits of Constants
• Improves readability
• Prevents accidental changes
• Easy maintenance` 
                },
                { 
                    id: 11, 
                    title: "Input & Output (scanf, printf)", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c11topic.mp4",
                    content: `📥📤 Input & Output in C

1. printf() Function
Used to display output on screen.

Examples:
printf("Hello World");
printf("Value: %d", number);
printf("Name: %s, Age: %d", name, age);

2. Format Specifiers
• %d - Integer
• %f - Float
• %c - Character
• %s - String
• %lf - Double

3. scanf() Function
Used to read input from user.

Examples:
scanf("%d", &number);
scanf("%f", &salary);
scanf("%s", name);

4. Escape Sequences
• \\n - New line
• \\t - Tab
• \\\\ - Backslash
• \\" - Double quote

5. Complete Example
#include <stdio.h>
int main() {
    int age;
    printf("Enter your age: ");
    scanf("%d", &age);
    printf("You are %d years old.\\n", age);
    return 0;
}` 
                },
                { 
                    id: 12, 
                    title: "Operators in C", 
                    type: "video", 
                    duration: "35m",
                    videoUrl: "/videos/c12topic.mp4",
                    content: `⚡ Operators in C

1. Arithmetic Operators
• + Addition
• - Subtraction
• * Multiplication
• / Division
• % Modulus

2. Relational Operators
• == Equal to
• != Not equal to
• > Greater than
• < Less than
• >= Greater than or equal
• <= Less than or equal

3. Logical Operators
• && AND
• || OR
• ! NOT

4. Assignment Operators
• = Simple assignment
• += Add and assign
• -= Subtract and assign
• *= Multiply and assign

5. Examples
int a = 10, b = 3;
int sum = a + b;        // 13
int diff = a - b;       // 7
int product = a * b;    // 30
int quotient = a / b;   // 3
int remainder = a % b;  // 1` 
                },
                { 
                    id: 13, 
                    title: "Type Conversion & Casting", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c13topic.mp4",
                    content: `🔄 Type Conversion & Casting

1. Implicit Conversion
Automatic conversion by compiler.

Example:
int a = 10;
float b = 5.5;
float result = a + b; // a converted to float

2. Explicit Conversion (Casting)
Manual conversion by programmer.

Syntax: (type) expression

Example:
float result = (float) a / b;

3. Conversion Rules
• char → int → float → double
• Smaller to larger types
• No data loss in implicit conversion

4. Examples
int x = 10, y = 3;
float div1 = x / y;        // 3.0 (integer division)
float div2 = (float)x / y; // 3.333 (float division)

5. When to Use Casting
• Prevent integer division
• Convert between types
• Ensure correct calculations` 
                },
                { 
                    id: 14, 
                    title: "Comments in C", 
                    type: "video", 
                    duration: "10m",
                    videoUrl: "/videos/c14topic.mp4",
                    content: `💬 Comments in C

1. Single-line Comments
// This is a single-line comment
int age = 25; // Variable for age

2. Multi-line Comments
/* This is a multi-line comment
   that spans across
   multiple lines */

3. Why Use Comments?
• Explain code logic
• Make code readable
• Temporary disable code
• Document functions

4. Best Practices
• Write clear, concise comments
• Avoid obvious comments
• Keep comments updated
• Use comments for complex logic

5. Examples
// Calculate area of circle
float area = PI * radius * radius;

/* 
Function: calculate_salary
Input: base_salary, bonus
Output: total_salary
*/` 
                },
                { 
                    id: 102, 
                    title: "Quiz: Basics of C Fundamentals", 
                    type: "quiz", 
                    duration: "15m",
                    content: `📝 Quiz: Basics of C Fundamentals

This quiz will test your understanding of:
• Variables and data types
• Constants and their usage
• Input/output functions
• Operators and expressions
• Type conversion and casting
• Comments and documentation

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 3,
            title: "Control Flow Statements",
            topics: [
                { 
                    id: 15, 
                    title: "If Statement", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c15topic.mp4",
                    content: `🎯 If Statement in C

1. Basic if Statement
Syntax:
if (condition) {
    // code to execute if condition is true
}

Example:
int age = 18;
if (age >= 18) {
    printf("You are eligible to vote.\\n");
}

2. if-else Statement
if (condition) {
    // true block
} else {
    // false block
}

Example:
int marks = 75;
if (marks >= 40) {
    printf("Passed\\n");
} else {
    printf("Failed\\n");
}

3. Multiple Conditions
Use logical operators:
if (age >= 18 && age <= 60) {
    printf("Working age\\n");
}

4. Common Mistakes
• Using = instead of ==
• Missing braces for multiple statements
• Forgetting semicolons` 
                },
                { 
                    id: 16, 
                    title: "If-Else Statement", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c16topic.mp4",
                    content: `🔀 If-Else Statement

1. if-else Ladder
if (condition1) {
    // code block 1
} else if (condition2) {
    // code block 2
} else {
    // default code block
}

2. Grade Calculation Example
int marks = 85;
if (marks >= 90) {
    printf("Grade: A\\n");
} else if (marks >= 80) {
    printf("Grade: B\\n");
} else if (marks >= 70) {
    printf("Grade: C\\n");
} else {
    printf("Grade: F\\n");
}

3. Multiple Conditions
int age = 25;
char gender = 'M';
if (age >= 21 && gender == 'M') {
    printf("Eligible for marriage\\n");
} else if (age >= 18 && gender == 'F') {
    printf("Eligible for marriage\\n");
} else {
    printf("Not eligible\\n");
}

4. Best Practices
• Keep conditions simple
• Use proper indentation
• Test all possible cases` 
                },
                { 
                    id: 17, 
                    title: "Nested If-Else", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c17topic.mp4",
                    content: `🎭 Nested If-Else Statements

1. Nested if Syntax
if (condition1) {
    if (condition2) {
        // code block
    }
}

2. Example: Loan Eligibility
int age = 25;
int salary = 50000;
int credit_score = 750;

if (age >= 21) {
    if (salary >= 30000) {
        if (credit_score >= 700) {
            printf("Loan Approved\\n");
        } else {
            printf("Low credit score\\n");
        }
    } else {
        printf("Insufficient salary\\n");
    }
} else {
    printf("Age requirement not met\\n");
}

3. Alternative with Logical Operators
if (age >= 21 && salary >= 30000 && credit_score >= 700) {
    printf("Loan Approved\\n");
} else {
    printf("Loan Rejected\\n");
}

4. When to Use Nested If
• Multiple dependent conditions
• Complex decision trees
• Step-by-step validation` 
                },
                { 
                    id: 18, 
                    title: "Switch Case", 
                    type: "video", 
                    duration: "35m",
                    videoUrl: "/videos/c18topic.mp4",
                    content: `🔘 Switch Case Statement

1. Switch Syntax
switch (expression) {
    case value1:
        // code block
        break;
    case value2:
        // code block
        break;
    default:
        // default code
}

2. Calculator Example
char operator;
int a = 10, b = 5;
printf("Enter operator (+, -, *, /): ");
scanf("%c", &operator);

switch (operator) {
    case '+':
        printf("Result: %d\\n", a + b);
        break;
    case '-':
        printf("Result: %d\\n", a - b);
        break;
    case '*':
        printf("Result: %d\\n", a * b);
        break;
    case '/':
        printf("Result: %d\\n", a / b);
        break;
    default:
        printf("Invalid operator\\n");
}

3. Important Points
• Expression must be integer or character
• break is necessary to exit switch
• default case is optional
• Cases must be constant values

4. vs If-Else
• Switch: Multiple equal comparisons
• If-Else: Complex conditions, ranges` 
                },
                { 
                    id: 19, 
                    title: "Ternary Operator", 
                    type: "video", 
                    duration: "15m",
                    videoUrl: "/videos/c19topic.mp4",
                    content: `❓ Ternary Operator

1. Syntax
condition ? expression1 : expression2

2. Simple Example
int a = 10, b = 20;
int max = (a > b) ? a : b;
printf("Maximum: %d\\n", max);

3. Multiple Conditions
int marks = 75;
char *result = (marks >= 40) ? "Pass" : "Fail";
printf("Result: %s\\n", result);

4. Nested Ternary
int age = 25;
char *category = (age < 18) ? "Child" : 
                (age < 60) ? "Adult" : "Senior";
printf("Category: %s\\n", category);

5. Advantages
• Compact code
• Simple conditions
• Inline assignments

6. Limitations
• Can become hard to read
• Not for complex logic
• Limited to two outcomes` 
                },
                { 
                    id: 103, 
                    title: "Quiz: Control Flow & Decision Making", 
                    type: "quiz", 
                    duration: "15m",
                    content: `📝 Quiz: Control Flow & Decision Making

This quiz will test your understanding of:
• If statements and conditional logic
• If-else ladders and nested conditions
• Switch case statements
• Ternary operator usage
• Decision-making in programs

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 4,
            title: "Loops & Iterations",
            topics: [
                { 
                    id: 20, 
                    title: "For Loop", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c20topic.mp4",
                    content: `🔄 For Loop in C

1. For Loop Syntax
for (initialization; condition; increment) {
    // code to repeat
}

2. Print Numbers 1 to 10
for (int i = 1; i <= 10; i++) {
    printf("%d ", i);
}
// Output: 1 2 3 4 5 6 7 8 9 10

3. Sum of First N Numbers
int n = 10, sum = 0;
for (int i = 1; i <= n; i++) {
    sum += i;
}
printf("Sum: %d\\n", sum); // Output: 55

4. Reverse Counting
for (int i = 10; i >= 1; i--) {
    printf("%d ", i);
}
// Output: 10 9 8 7 6 5 4 3 2 1

5. Multiple Variables
for (int i = 0, j = 10; i < j; i++, j--) {
    printf("i=%d, j=%d\\n", i, j);
}` 
                },
                { 
                    id: 21, 
                    title: "While Loop", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c21topic.mp4",
                    content: `⏳ While Loop in C

1. While Loop Syntax
while (condition) {
    // code to repeat
}

2. Print Numbers 1 to 10
int i = 1;
while (i <= 10) {
    printf("%d ", i);
    i++;
}
// Output: 1 2 3 4 5 6 7 8 9 10

3. User Input Validation
int number;
printf("Enter positive number: ");
scanf("%d", &number);

while (number <= 0) {
    printf("Invalid! Enter positive number: ");
    scanf("%d", &number);
}

4. Factorial Calculation
int n = 5, factorial = 1, i = 1;
while (i <= n) {
    factorial *= i;
    i++;
}
printf("Factorial of %d is %d\\n", n, factorial);

5. Infinite Loop
while (1) {
    // runs forever
    // use break to exit
}` 
                },
                { 
                    id: 22, 
                    title: "Do-While Loop", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c22topic.mp4",
                    content: `🔄 Do-While Loop in C

1. Do-While Syntax
do {
    // code to execute
} while (condition);

2. Key Difference
• do-while: Executes at least once
• while: May not execute at all

3. Menu Driven Program
int choice;
do {
    printf("1. Add\\n");
    printf("2. Subtract\\n");
    printf("3. Exit\\n");
    printf("Enter choice: ");
    scanf("%d", &choice);
    
    switch (choice) {
        case 1: printf("Add selected\\n"); break;
        case 2: printf("Subtract selected\\n"); break;
        case 3: printf("Exiting...\\n"); break;
        default: printf("Invalid choice\\n");
    }
} while (choice != 3);

4. Password Validation
char password[20];
do {
    printf("Enter password: ");
    scanf("%s", password);
} while (strcmp(password, "secret") != 0);` 
                },
                { 
                    id: 23, 
                    title: "Break & Continue", 
                    type: "video", 
                    duration: "15m",
                    videoUrl: "/videos/c23topic.mp4",
                    content: `⏹️ Break & Continue Statements

1. Break Statement
• Exits the loop immediately
• Used with switch and loops

Example:
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;
    }
    printf("%d ", i);
}
// Output: 1 2 3 4

2. Continue Statement
• Skips current iteration
• Continues with next iteration

Example:
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;
    }
    printf("%d ", i);
}
// Output: 1 3 5 7 9 (odd numbers)

3. Search Example
int numbers[] = {1, 2, 3, 4, 5};
int search = 3, found = 0;

for (int i = 0; i < 5; i++) {
    if (numbers[i] == search) {
        found = 1;
        break;
    }
}` 
                },
                { 
                    id: 24, 
                    title: "Nested Loops", 
                    type: "video", 
                    duration: "40m",
                    videoUrl: "/videos/c24topic.mp4",
                    content: `🎯 Nested Loops in C

1. Nested For Loop
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        printf("i=%d, j=%d\\n", i, j);
    }
}

2. Multiplication Table
for (int i = 1; i <= 10; i++) {
    for (int j = 1; j <= 10; j++) {
        printf("%d x %d = %d\\n", i, j, i * j);
    }
    printf("\\n");
}

3. Pattern Printing - Right Triangle
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        printf("* ");
    }
    printf("\\n");
}
// Output:
// *
// * *
// * * *
// * * * *
// * * * * *

4. 2D Array Processing
int matrix[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        printf("%d ", matrix[i][j]);
    }
    printf("\\n");
}` 
                },
                { 
                    id: 25, 
                    title: "Pattern Printing Programs", 
                    type: "video", 
                    duration: "45m",
                    videoUrl: "/videos/c25topic.mp4",
                    content: `✨ Pattern Printing Programs

1. Pyramid Pattern
for (int i = 1; i <= 5; i++) {
    for (int space = 1; space <= 5 - i; space++) {
        printf(" ");
    }
    for (int j = 1; j <= 2*i - 1; j++) {
        printf("*");
    }
    printf("\\n");
}

2. Number Pyramid
for (int i = 1; i <= 5; i++) {
    for (int space = 1; space <= 5 - i; space++) {
        printf(" ");
    }
    for (int j = 1; j <= i; j++) {
        printf("%d ", j);
    }
    printf("\\n");
}

3. Diamond Pattern
// Upper half
for (int i = 1; i <= 5; i++) {
    for (int space = 1; space <= 5 - i; space++) {
        printf(" ");
    }
    for (int j = 1; j <= 2*i - 1; j++) {
        printf("*");
    }
    printf("\\n");
}
// Lower half
for (int i = 4; i >= 1; i--) {
    for (int space = 1; space <= 5 - i; space++) {
        printf(" ");
    }
    for (int j = 1; j <= 2*i - 1; j++) {
        printf("*");
    }
    printf("\\n");
}

4. Hollow Square
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        if (i == 1 || i == 5 || j == 1 || j == 5) {
            printf("* ");
        } else {
            printf("  ");
        }
    }
    printf("\\n");
}` 
                },
                { 
                    id: 104, 
                    title: "Quiz: Loops & Pattern Logic", 
                    type: "quiz", 
                    duration: "20m",
                    content: `📝 Quiz: Loops & Pattern Logic

This quiz will test your understanding of:
• For, while, and do-while loops
• Break and continue statements
• Nested loops and their applications
• Pattern printing logic
• Loop optimization and best practices

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 5,
            title: "Functions",
            topics: [
                { 
                    id: 26, 
                    title: "Introduction to Functions", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c26topic.mp4",
                    content: `📞 Introduction to Functions

1. What are Functions?
Functions are blocks of code that perform specific tasks. They help in modular programming.

2. Advantages of Functions
• Code reusability
• Modularity
• Easier debugging
• Better organization

3. Function Components
• Function declaration
• Function definition
• Function call

4. Simple Function Example
#include <stdio.h>

// Function declaration
void greet();

int main() {
    greet(); // Function call
    return 0;
}

// Function definition
void greet() {
    printf("Hello, World!\\n");
}` 
                },
                { 
                    id: 27, 
                    title: "Function Declaration & Definition", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c27topic.mp4",
                    content: `📋 Function Declaration & Definition

1. Function Declaration (Prototype)
• Tells compiler about function
• Includes return type, name, parameters
• Ends with semicolon

Example:
int add(int a, int b);

2. Function Definition
• Contains actual code
• Includes return type, name, parameters, body

Example:
int add(int a, int b) {
    return a + b;
}

3. Function Call
• Executes the function
• Passes arguments

Example:
int result = add(5, 3);

4. Complete Example
#include <stdio.h>

// Declaration
int multiply(int x, int y);

int main() {
    int product = multiply(4, 5);
    printf("Product: %d\\n", product);
    return 0;
}

// Definition
int multiply(int x, int y) {
    return x * y;
}` 
                },
                { 
                    id: 28, 
                    title: "Parameters & Arguments", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c28topic.mp4",
                    content: `🔧 Parameters & Arguments

1. Parameters
• Variables in function declaration
• Placeholders for values

2. Arguments
• Actual values passed to function
• Replace parameters during call

3. Example
// a and b are parameters
int add(int a, int b) {
    return a + b;
}

int main() {
    // 5 and 3 are arguments
    int sum = add(5, 3);
    return 0;
}

4. Types of Parameters
• Formal parameters: In function definition
• Actual parameters: In function call

5. Multiple Parameters
float calculateBMI(float weight, float height) {
    return weight / (height * height);
}

int main() {
    float bmi = calculateBMI(65.5, 1.75);
    printf("BMI: %.2f\\n", bmi);
    return 0;
}` 
                },
                { 
                    id: 29, 
                    title: "Return Values", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c29topic.mp4",
                    content: `🔄 Return Values

1. Return Statement
• Sends value back to caller
• Ends function execution

2. Return Types
• int, float, char, double, void
• void means no return value

3. Examples
int getAge() {
    return 25;
}

float getPI() {
    return 3.14159;
}

char getGrade() {
    return 'A';
}

4. Multiple Return Points
int findMax(int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

5. Void Functions
void displayMessage() {
    printf("Welcome to C Programming!\\n");
    // No return statement needed
}` 
                },
                { 
                    id: 30, 
                    title: "Call By Value", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c30topic.mp4",
                    content: `📥 Call By Value

1. What is Call by Value?
• Copies of arguments are passed
• Original values remain unchanged
• Default in C

2. Example
void increment(int num) {
    num = num + 1;
    printf("Inside function: %d\\n", num);
}

int main() {
    int x = 5;
    increment(x);
    printf("Outside function: %d\\n", x);
    return 0;
}

// Output:
// Inside function: 6
// Outside function: 5

3. Key Points
• Original variable unaffected
• Changes only to copy
• Memory efficient for small data
• Simple and safe

4. When to Use
• Small data types
• When original shouldn't change
• Simple calculations` 
                },
                { 
                    id: 31, 
                    title: "Call By Reference", 
                    type: "video", 
                    duration: "35m",
                    videoUrl: "/videos/c31topic.mp4",
                    content: `📞 Call By Reference

1. What is Call by Reference?
• Addresses of variables are passed
• Original values can be modified
• Uses pointers

2. Example
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(&x, &y);
    printf("x=%d, y=%d\\n", x, y);
    return 0;
}

// Output: x=10, y=5

3. Key Points
• Original variables can be modified
• Uses pointers and addresses
• More memory efficient for large data
• Allows multiple return values

4. When to Use
• Large data structures
• When modification is needed
• Arrays and strings` 
                },
                { 
                    id: 32, 
                    title: "Recursion", 
                    type: "video", 
                    duration: "40m",
                    videoUrl: "/videos/c32topic.mp4",
                    content: `🌀 Recursion in C

1. What is Recursion?
• Function calls itself
• Must have base case to stop

2. Factorial Example
int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1; // Base case
    } else {
        return n * factorial(n - 1); // Recursive call
    }
}

3. Fibonacci Series
int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}

4. Key Points
• Elegant for certain problems
• Can be less efficient
• Requires base case
• Uses stack memory

5. When to Use Recursion
• Tree traversals
• Divide and conquer algorithms
• Problems with recursive nature` 
                },
                { 
                    id: 105, 
                    title: "Quiz: Functions & Recursion", 
                    type: "quiz", 
                    duration: "20m",
                    content: `📝 Quiz: Functions & Recursion

This quiz will test your understanding of:
• Function declaration and definition
• Parameters and arguments
• Return values and types
• Call by value vs call by reference
• Recursion and base cases
• Function scope and lifetime

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 6,
            title: "Arrays",
            topics: [
                { 
                    id: 33, 
                    title: "1D Arrays", 
                    type: "video", 
                    duration: "35m",
                    videoUrl: "/videos/c33topic.mp4",
                    content: `📊 1D Arrays in C

1. What are Arrays?
• Collection of similar elements
• Contiguous memory locations
• Single variable name with index

2. Array Declaration
Syntax: data_type array_name[size];
Example: int marks[5];

3. Array Initialization
int numbers[5] = {1, 2, 3, 4, 5};
int values[] = {10, 20, 30}; // Size = 3

4. Accessing Elements
• Index starts from 0
• marks[0] - first element
• marks[4] - last element (if size=5)

5. Example: Sum of Array
int numbers[] = {1, 2, 3, 4, 5};
int sum = 0;

for (int i = 0; i < 5; i++) {
    sum += numbers[i];
}
printf("Sum: %d\\n", sum); // Output: 15` 
                },
                { 
                    id: 34, 
                    title: "2D Arrays", 
                    type: "video", 
                    duration: "40m",
                    videoUrl: "/videos/c34topic.mp4",
                    content: `📈 2D Arrays in C

1. What are 2D Arrays?
• Array of arrays
• Matrix representation
• Rows and columns

2. Declaration
Syntax: data_type array_name[rows][cols];
Example: int matrix[3][3];

3. Initialization
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};

4. Accessing Elements
• matrix[0][0] = 1
• matrix[0][1] = 2
• matrix[1][2] = 6

5. Example: Matrix Input/Output
int matrix[2][2];
printf("Enter 4 numbers: \\n");
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        scanf("%d", &matrix[i][j]);
    }
}

printf("Matrix: \\n");
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        printf("%d ", matrix[i][j]);
    }
    printf("\\n");
}` 
                },
                { 
                    id: 35, 
                    title: "Array Input & Output", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c35topic.mp4",
                    content: `📥📤 Array Input & Output

1. 1D Array Input
int arr[5];
printf("Enter 5 numbers: ");
for (int i = 0; i < 5; i++) {
    scanf("%d", &arr[i]);
}

2. 1D Array Output
printf("Array elements: ");
for (int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);
}

3. 2D Array Input
int matrix[2][3];
printf("Enter matrix elements: \\n");
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        scanf("%d", &matrix[i][j]);
    }
}

4. 2D Array Output
printf("Matrix: \\n");
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        printf("%d ", matrix[i][j]);
    }
    printf("\\n");
}

5. Complete Example
#include <stdio.h>
int main() {
    int n;
    printf("Enter array size: ");
    scanf("%d", &n);
    
    int arr[n];
    printf("Enter %d elements: ", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    printf("You entered: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    return 0;
}` 
                },
                { 
                    id: 36, 
                    title: "Common Array Operations", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c36topic.mp4",
                    content: `🔧 Common Array Operations

1. Finding Maximum
int findMax(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

2. Finding Minimum
int findMin(int arr[], int size) {
    int min = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

3. Sum of Elements
int arraySum(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return sum;
}

4. Average Calculation
float arrayAverage(int arr[], int size) {
    int sum = arraySum(arr, size);
    return (float)sum / size;
}

5. Search Element
int search(int arr[], int size, int key) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == key) {
            return i; // Return index
        }
    }
    return -1; // Not found
}` 
                },
                { 
                    id: 37, 
                    title: "Matrix Operations", 
                    type: "video", 
                    duration: "45m",
                    videoUrl: "/videos/c37topic.mp4",
                    content: `🧮 Matrix Operations

1. Matrix Addition
void addMatrices(int a[][3], int b[][3], int result[][3], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
}

2. Matrix Multiplication
void multiplyMatrices(int a[][3], int b[][3], int result[][3], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[i][j] = 0;
            for (int k = 0; k < cols; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
}

3. Matrix Transpose
void transpose(int matrix[][3], int trans[][3], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            trans[j][i] = matrix[i][j];
        }
    }
}

4. Display Matrix
void displayMatrix(int matrix[][3], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}` 
                },
                { 
                    id: 106, 
                    title: "Quiz: Arrays & Matrices", 
                    type: "quiz", 
                    duration: "20m",
                    content: `📝 Quiz: Arrays & Matrices

This quiz will test your understanding of:
• 1D and 2D arrays
• Array declaration and initialization
• Array input/output operations
• Common array algorithms
• Matrix operations
• Array memory management

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 7,
            title: "Strings",
            topics: [
                { 
                    id: 38, 
                    title: "String Basics", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c38topic.mp4",
                    content: `🔤 String Basics in C

1. What are Strings?
• Array of characters
• Ends with null character '\\0'
• Stored in character arrays

2. String Declaration
char name[20];
char greeting[] = "Hello";

3. String Initialization
char str1[] = "Hello"; // Automatic null
char str2[6] = {'H','e','l','l','o','\\0'};

4. Input/Output
char name[50];
printf("Enter name: ");
scanf("%s", name); // No & for strings
printf("Hello %s\\n", name);

5. Important Points
• Strings are null-terminated
• Use %s format specifier
• Array name acts as pointer
• Can use gets() and puts()` 
                },
                { 
                    id: 39, 
                    title: "Character Arrays", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c39topic.mp4",
                    content: `📝 Character Arrays

1. Character Array vs String
• Character array may not have '\\0'
• String always ends with '\\0'
• All strings are character arrays

2. Declaration Examples
char arr1[5] = {'A','B','C','D','E'}; // Character array
char arr2[6] = "Hello"; // String

3. Input with Spaces
char sentence[100];
printf("Enter sentence: ");
fgets(sentence, 100, stdin); // Reads with spaces

4. Output
printf("Sentence: %s", sentence);
// OR
puts(sentence); // Automatically adds newline

5. Complete Example
#include <stdio.h>
int main() {
    char fullName[50];
    printf("Enter your full name: ");
    fgets(fullName, 50, stdin);
    
    printf("Welcome ");
    puts(fullName);
    return 0;
}` 
                },
                { 
                    id: 40, 
                    title: "String Functions", 
                    type: "video", 
                    duration: "35m",
                    videoUrl: "/videos/c40topic.mp4",
                    content: `🔧 String Functions

1. strlen() - String Length
#include <string.h>
char str[] = "Hello";
int len = strlen(str); // len = 5

2. strcpy() - String Copy
char source[] = "Hello";
char destination[10];
strcpy(destination, source);

3. strcat() - String Concatenation
char str1[20] = "Hello";
char str2[] = " World";
strcat(str1, str2); // "Hello World"

4. strcmp() - String Compare
char str1[] = "apple";
char str2[] = "banana";
int result = strcmp(str1, str2);
// result < 0: str1 < str2
// result = 0: equal
// result > 0: str1 > str2

5. strrev() - String Reverse
char str[] = "Hello";
strrev(str); // "olleH"` 
                },
                { 
                    id: 41, 
                    title: "Common String Problems", 
                    type: "video", 
                    duration: "40m",
                    videoUrl: "/videos/c41topic.mp4",
                    content: `🎯 Common String Problems

1. String Length (Manual)
int stringLength(char str[]) {
    int length = 0;
    while (str[length] != '\\0') {
        length++;
    }
    return length;
}

2. String Copy (Manual)
void stringCopy(char dest[], char src[]) {
    int i = 0;
    while (src[i] != '\\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\\0';
}

3. String Concatenation (Manual)
void stringConcat(char str1[], char str2[]) {
    int i = 0, j = 0;
    while (str1[i] != '\\0') {
        i++;
    }
    while (str2[j] != '\\0') {
        str1[i] = str2[j];
        i++;
        j++;
    }
    str1[i] = '\\0';
}

4. Palindrome Check
int isPalindrome(char str[]) {
    int left = 0;
    int right = strlen(str) - 1;
    
    while (left < right) {
        if (str[left] != str[right]) {
            return 0; // Not palindrome
        }
        left++;
        right--;
    }
    return 1; // Palindrome
}` 
                },
                { 
                    id: 107, 
                    title: "Quiz: Strings & String Functions", 
                    type: "quiz", 
                    duration: "15m",
                    content: `📝 Quiz: Strings & String Functions

This quiz will test your understanding of:
• String basics and character arrays
• String input/output operations
• Built-in string functions
• Manual string operations
• Common string problems and solutions

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 8,
            title: "Pointers",
            topics: [
                { 
                    id: 42, 
                    title: "Introduction to Pointers", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c42topic.mp4",
                    content: `📍 Introduction to Pointers

1. What are Pointers?
• Variables that store memory addresses
• Points to location of another variable
• Powerful but complex feature

2. Pointer Declaration
Syntax: data_type *pointer_name;
Example: int *ptr;

3. Address Operator (&)
• & gives address of variable
int x = 10;
int *ptr = &x;

4. Dereference Operator (*)
• * gives value at address
printf("Value: %d", *ptr); // 10

5. Complete Example
#include <stdio.h>
int main() {
    int x = 10;
    int *ptr = &x;
    
    printf("Value of x: %d\\n", x);
    printf("Address of x: %p\\n", &x);
    printf("Value via pointer: %d\\n", *ptr);
    
    return 0;
}` 
                },
                { 
                    id: 43, 
                    title: "Pointer Arithmetic", 
                    type: "video", 
                    duration: "35m",
                    videoUrl: "/videos/c43topic.mp4",
                    content: `🧮 Pointer Arithmetic

1. Increment/Decrement
int arr[] = {1, 2, 3, 4, 5};
int *ptr = arr;

printf("%d\\n", *ptr); // 1
ptr++;
printf("%d\\n", *ptr); // 2
ptr--;
printf("%d\\n", *ptr); // 1

2. Addition/Subtraction
ptr = ptr + 2; // Moves 2 elements forward
printf("%d\\n", *ptr); // 3

ptr = ptr - 1; // Moves 1 element back
printf("%d\\n", *ptr); // 2

3. Pointer Comparison
int *ptr1 = &arr[0];
int *ptr2 = &arr[2];

if (ptr1 < ptr2) {
    printf("ptr1 comes before ptr2\\n");
}

4. Important Points
• Pointer arithmetic depends on data type
• int* increments by 4 bytes (typically)
• char* increments by 1 byte` 
                },
                { 
                    id: 44, 
                    title: "Pointers & Arrays", 
                    type: "video", 
                    duration: "40m",
                    videoUrl: "/videos/c44topic.mp4",
                    content: `📊 Pointers & Arrays

1. Array Name as Pointer
• Array name is constant pointer
• Points to first element

int arr[] = {1, 2, 3};
int *ptr = arr; // Same as &arr[0]

2. Accessing Array Elements
printf("%d\\n", arr[0]);    // 1
printf("%d\\n", *arr);      // 1
printf("%d\\n", *(arr+1));  // 2
printf("%d\\n", *(arr+2));  // 3

3. Pointer to Array
int (*ptr)[3] = &arr;

4. Example: Array Sum using Pointers
int sumArray(int *arr, int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += *(arr + i);
    }
    return sum;
}

5. 2D Arrays with Pointers
int matrix[2][2] = {{1,2},{3,4}};
int *ptr = &matrix[0][0];

for (int i = 0; i < 4; i++) {
    printf("%d ", *(ptr + i));
}
// Output: 1 2 3 4` 
                },
                { 
                    id: 45, 
                    title: "Pointers & Functions", 
                    type: "video", 
                    duration: "35m",
                    videoUrl: "/videos/c45topic.mp4",
                    content: `📞 Pointers & Functions

1. Passing Pointers to Functions
void increment(int *num) {
    (*num)++;
}

int main() {
    int x = 5;
    increment(&x);
    printf("%d\\n", x); // 6
    return 0;
}

2. Returning Pointers
int* findMax(int *a, int *b) {
    return (*a > *b) ? a : b;
}

3. Array as Function Argument
void printArray(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", *(arr + i));
    }
}

4. Function Pointers
int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main() {
    int (*operation)(int, int);
    operation = add;
    printf("Sum: %d\\n", operation(5, 3));
    
    operation = multiply;
    printf("Product: %d\\n", operation(5, 3));
    return 0;
}` 
                },
                { 
                    id: 46, 
                    title: "Pointer to Pointer", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c46topic.mp4",
                    content: `🎯 Pointer to Pointer

1. Double Pointers
• Pointer that points to another pointer
• Used for 2D arrays, dynamic arrays

2. Declaration
int x = 10;
int *ptr = &x;
int **pptr = &ptr;

3. Accessing Values
printf("Value of x: %d\\n", x);        // 10
printf("Value via ptr: %d\\n", *ptr);  // 10
printf("Value via pptr: %d\\n", **pptr); // 10

4. Memory Diagram
x = 10 (Address: 1000)
ptr = 1000 (Address: 2000)  
pptr = 2000 (Address: 3000)

5. Practical Use
• Dynamic 2D arrays
• Function arguments that modify pointers
• Complex data structures` 
                },
                { 
                    id: 47, 
                    title: "Dangling Pointers", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c47topic.mp4",
                    content: `⚠️ Dangling Pointers

1. What are Dangling Pointers?
• Pointers pointing to freed memory
• Can cause undefined behavior
• Security risk

2. Common Causes
• Returning local variable address
• Freeing memory but not setting NULL
• Multiple pointers to same memory

3. Example 1: Local Variable
int* getNumber() {
    int num = 10;
    return &num; // Dangling pointer!
}

4. Example 2: After free()
int *ptr = (int*)malloc(sizeof(int));
*ptr = 10;
free(ptr);
// ptr is now dangling

5. Prevention
• Set pointer to NULL after free()
• Avoid returning local variable addresses
• Use static or dynamic allocation when needed

6. Safe Practice
int *ptr = (int*)malloc(sizeof(int));
*ptr = 10;
free(ptr);
ptr = NULL; // Safe` 
                },
                { 
                    id: 108, 
                    title: "Quiz: Pointers & Memory Concepts", 
                    type: "quiz", 
                    duration: "20m",
                    content: `📝 Quiz: Pointers & Memory Concepts

This quiz will test your understanding of:
• Pointer basics and declaration
• Pointer arithmetic operations
• Pointers with arrays and functions
• Double pointers and their usage
• Dangling pointers and prevention
• Memory management concepts

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 9,
            title: "Dynamic Memory Allocation",
            topics: [
                { 
                    id: 48, 
                    title: "malloc()", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c48topic.mp4",
                    content: `💾 malloc() Function

1. What is malloc()?
• Memory Allocation
• Allocates specified bytes
• Returns void pointer

2. Syntax
#include <stdlib.h>
ptr = (cast-type*) malloc(byte-size);

3. Example: Integer Array
int *arr;
int n = 5;
arr = (int*)malloc(n * sizeof(int));

if (arr == NULL) {
    printf("Memory allocation failed\\n");
    exit(1);
}

4. Using Allocated Memory
for (int i = 0; i < n; i++) {
    arr[i] = i + 1;
}

for (int i = 0; i < n; i++) {
    printf("%d ", arr[i]);
}
// Output: 1 2 3 4 5

5. Important Points
• Always check for NULL
• Memory is uninitialized
• Must be freed with free()` 
                },
                { 
                    id: 49, 
                    title: "calloc()", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c49topic.mp4",
                    content: `🔢 calloc() Function

1. What is calloc()?
• Contiguous Allocation
• Allocates and initializes to zero
• Takes number of elements and size

2. Syntax
ptr = (cast-type*)calloc(n, element-size);

3. Example: Integer Array
int *arr;
int n = 5;
arr = (int*)calloc(n, sizeof(int));

if (arr == NULL) {
    printf("Memory allocation failed\\n");
    exit(1);
}

4. Memory is Initialized
for (int i = 0; i < n; i++) {
    printf("%d ", arr[i]); // All zeros
}
// Output: 0 0 0 0 0

5. vs malloc()
• malloc(): Uninitialized memory
• calloc(): Initialized to zero
• calloc() is slower but safer` 
                },
                { 
                    id: 50, 
                    title: "realloc()", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c50topic.mp4",
                    content: `🔄 realloc() Function

1. What is realloc()?
• Re-allocates memory
• Changes size of allocated memory
• Preserves existing data

2. Syntax
ptr = realloc(ptr, new-size);

3. Example: Resize Array
int *arr = (int*)malloc(3 * sizeof(int));
arr[0] = 1; arr[1] = 2; arr[2] = 3;

// Resize to 5 elements
arr = (int*)realloc(arr, 5 * sizeof(int));
arr[3] = 4; arr[4] = 5;

4. Important Points
• May move memory to new location
• Returns new pointer
• Old pointer becomes invalid if moved
• Preserves existing data up to minimum of old and new size

5. Complete Example
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int*)malloc(2 * sizeof(int));
    arr[0] = 10; arr[1] = 20;
    
    arr = (int*)realloc(arr, 4 * sizeof(int));
    arr[2] = 30; arr[3] = 40;
    
    for (int i = 0; i < 4; i++) {
        printf("%d ", arr[i]);
    }
    // Output: 10 20 30 40
    
    free(arr);
    return 0;
}` 
                },
                { 
                    id: 51, 
                    title: "free()", 
                    type: "video", 
                    duration: "15m",
                    videoUrl: "/videos/c51topic.mp4",
                    content: `🗑️ free() Function

1. What is free()?
• Deallocates memory
• Prevents memory leaks
• Essential for dynamic memory

2. Syntax
free(pointer);

3. Example
int *ptr = (int*)malloc(sizeof(int));
*ptr = 100;
printf("Value: %d\\n", *ptr);
free(ptr); // Memory released
ptr = NULL; // Good practice

4. Memory Leak Example
void leakMemory() {
    int *ptr = (int*)malloc(sizeof(int));
    *ptr = 50;
    // Forgot to free - MEMORY LEAK!
}

5. Best Practices
• Always free allocated memory
• Set pointer to NULL after free
• One free for each malloc/calloc
• Don't free unallocated memory

6. Complete Example
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 3;
    
    arr = (int*)malloc(n * sizeof(int));
    if (arr == NULL) return 1;
    
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }
    
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    
    free(arr);
    arr = NULL;
    return 0;
}` 
                },
                { 
                    id: 52, 
                    title: "Memory Leaks", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c52topic.mp4",
                    content: `🚨 Memory Leaks

1. What are Memory Leaks?
• Allocated memory not freed
• Program uses more memory over time
• Can crash system

2. Common Causes
• Forgetting to call free()
• Losing pointer to allocated memory
• Complex control flows

3. Example 1: Simple Leak
void createLeak() {
    int *ptr = (int*)malloc(sizeof(int));
    *ptr = 10;
    // No free() - LEAK!
}

4. Example 2: Lost Pointer
void lostPointer() {
    int *ptr = (int*)malloc(sizeof(int));
    *ptr = 20;
    ptr = NULL; // Lost access - LEAK!
}

5. Prevention
• Always plan memory deallocation
• Use tools like Valgrind
• Code reviews
• Consistent allocation/deallocation patterns

6. Detection Tools
• Valgrind (Linux)
• Dr. Memory (Windows)
• AddressSanitizer` 
                },
                { 
                    id: 53, 
                    title: "Stack vs Heap", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c53topic.mp4",
                    content: `⚖️ Stack vs Heap Memory

1. Stack Memory
• Automatic memory management
• Function calls and local variables
• Fast access
• Limited size

2. Heap Memory
• Manual memory management
• Dynamic allocation (malloc, calloc)
• Larger size
• Slower access

3. Stack Example
void function() {
    int x = 10; // Stack
    char str[50]; // Stack
} // Automatically freed

4. Heap Example
void function() {
    int *arr = (int*)malloc(100 * sizeof(int)); // Heap
    // Must manually free
    free(arr);
}

5. Comparison
• Stack: Automatic, fast, limited
• Heap: Manual, flexible, larger

6. When to Use
• Stack: Local variables, small data
• Heap: Large data, dynamic sizes, persistent data` 
                },
                { 
                    id: 109, 
                    title: "Quiz: Memory Allocation & Heap Concepts", 
                    type: "quiz", 
                    duration: "15m",
                    content: `📝 Quiz: Memory Allocation & Heap Concepts

This quiz will test your understanding of:
• malloc(), calloc(), realloc(), free()
• Dynamic memory allocation
• Memory leak prevention
• Stack vs heap memory
• Memory management best practices

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 10,
            title: "Structures & Unions",
            topics: [
                { 
                    id: 54, 
                    title: "Structures", 
                    type: "video", 
                    duration: "35m",
                    videoUrl: "/videos/c54topic.mp4",
                    content: `🏗️ Structures in C

1. What are Structures?
• User-defined data type
• Groups related variables
• Different data types together

2. Structure Definition
struct Student {
    char name[50];
    int rollno;
    float marks;
};

3. Structure Variable
struct Student s1;

4. Accessing Members
strcpy(s1.name, "John");
s1.rollno = 101;
s1.marks = 85.5;

5. Example
#include <stdio.h>

struct Student {
    char name[50];
    int rollno;
    float marks;
};

int main() {
    struct Student s1;
    printf("Enter name: ");
    scanf("%s", s1.name);
    printf("Enter rollno: ");
    scanf("%d", &s1.rollno);
    printf("Enter marks: ");
    scanf("%f", &s1.marks);
    
    printf("\\nStudent Details:\\n");
    printf("Name: %s\\n", s1.name);
    printf("Roll No: %d\\n", s1.rollno);
    printf("Marks: %.2f\\n", s1.marks);
    
    return 0;
}` 
                },
                { 
                    id: 55, 
                    title: "Structure Arrays", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c55topic.mp4",
                    content: `📊 Structure Arrays

1. Array of Structures
struct Student {
    char name[50];
    int rollno;
    float marks;
};

struct Student class[5];

2. Initialization
struct Student class[3] = {
    {"Alice", 101, 90.5},
    {"Bob", 102, 85.0},
    {"Charlie", 103, 78.5}
};

3. Accessing Elements
for (int i = 0; i < 3; i++) {
    printf("Name: %s\\n", class[i].name);
    printf("Roll No: %d\\n", class[i].rollno);
    printf("Marks: %.2f\\n", class[i].marks);
}

4. Input for Array
for (int i = 0; i < 3; i++) {
    printf("Enter details for student %d:\\n", i+1);
    printf("Name: ");
    scanf("%s", class[i].name);
    printf("Roll No: ");
    scanf("%d", &class[i].rollno);
    printf("Marks: ");
    scanf("%f", &class[i].marks);
}

5. Practical Use
• Student records
• Employee database
• Product inventory
• Contact list` 
                },
                { 
                    id: 56, 
                    title: "Nested Structures", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c56topic.mp4",
                    content: `🎯 Nested Structures

1. What are Nested Structures?
• Structure within another structure
• Complex data organization
• Hierarchical data

2. Example: Address in Student
struct Address {
    char street[50];
    char city[30];
    char state[20];
    int pincode;
};

struct Student {
    char name[50];
    int rollno;
    struct Address addr;
};

3. Accessing Nested Members
struct Student s1;
strcpy(s1.addr.street, "123 Main St");
strcpy(s1.addr.city, "New York");
strcpy(s1.addr.state, "NY");
s1.addr.pincode = 10001;

4. Complete Example
#include <stdio.h>

struct Date {
    int day;
    int month;
    int year;
};

struct Employee {
    char name[50];
    int empid;
    float salary;
    struct Date join_date;
};

int main() {
    struct Employee emp;
    
    printf("Enter employee name: ");
    scanf("%s", emp.name);
    printf("Enter employee ID: ");
    scanf("%d", &emp.empid);
    printf("Enter salary: ");
    scanf("%f", &emp.salary);
    printf("Enter joining date (dd mm yyyy): ");
    scanf("%d %d %d", &emp.join_date.day, 
                       &emp.join_date.month, 
                       &emp.join_date.year);
    
    printf("\\nEmployee Details:\\n");
    printf("Name: %s\\n", emp.name);
    printf("ID: %d\\n", emp.empid);
    printf("Salary: %.2f\\n", emp.salary);
    printf("Join Date: %d/%d/%d\\n", emp.join_date.day,
                                    emp.join_date.month,
                                    emp.join_date.year);
    return 0;
}` 
                },
                { 
                    id: 57, 
                    title: "Unions", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c57topic.mp4",
                    content: `🔀 Unions in C

1. What are Unions?
• Similar to structures
• All members share same memory
• Size = largest member

2. Union Definition
union Data {
    int i;
    float f;
    char str[20];
};

3. Memory Sharing
union Data data;
data.i = 10;
printf("%d\\n", data.i); // 10

data.f = 3.14;
printf("%f\\n", data.f); // 3.14
// data.i is now overwritten

4. vs Structures
• Structure: Each member has own memory
• Union: All members share memory
• Union saves memory

5. Practical Use
• Variant types
• Hardware registers
• Type conversion` 
                },
                { 
                    id: 58, 
                    title: "Structure vs Union", 
                    type: "video", 
                    duration: "15m",
                    videoUrl: "/videos/c58topic.mp4",
                    content: `⚖️ Structure vs Union

1. Memory Allocation
• Structure: Each member has separate memory
• Union: All members share same memory

2. Size Calculation
struct ExampleStruct {
    int a;    // 4 bytes
    float b;  // 4 bytes
    char c;   // 1 byte
}; // Total: 9+ padding = 12 bytes

union ExampleUnion {
    int a;    // 4 bytes
    float b;  // 4 bytes
    char c;   // 1 byte
}; // Total: 4 bytes (largest member)

3. Access
• Structure: All members accessible simultaneously
• Union: Only one member meaningful at a time

4. When to Use
• Structure: Related data that co-exist
• Union: Data that are mutually exclusive

5. Example Use Cases
• Structure: Student record, Employee data
• Union: Network packets, Hardware registers` 
                },
                { 
                    id: 59, 
                    title: "Real-World Examples", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c59topic.mp4",
                    content: `🌍 Real-World Examples

1. Student Management System
struct Student {
    char name[50];
    int rollno;
    float marks[5];
    struct Address addr;
    char grade;
};

2. Library System
struct Book {
    char title[100];
    char author[50];
    char isbn[20];
    int pages;
    float price;
    int available;
};

3. Bank Account
struct Account {
    long acc_number;
    char name[50];
    float balance;
    char acc_type; // S-savings, C-current
    struct Date open_date;
};

4. Employee Payroll
struct Employee {
    int empid;
    char name[50];
    char department[30];
    float basic_salary;
    float allowances;
    float deductions;
    float net_salary;
};

5. Complete Student System
#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int rollno;
    float marks[3];
    float total;
    float percentage;
};

void calculateResult(struct Student *s) {
    s->total = s->marks[0] + s->marks[1] + s->marks[2];
    s->percentage = (s->total / 300) * 100;
}

int main() {
    struct Student s;
    
    printf("Enter student name: ");
    scanf("%s", s.name);
    printf("Enter roll number: ");
    scanf("%d", &s.rollno);
    printf("Enter marks for 3 subjects: ");
    scanf("%f %f %f", &s.marks[0], &s.marks[1], &s.marks[2]);
    
    calculateResult(&s);
    
    printf("\\n--- Student Result ---\\n");
    printf("Name: %s\\n", s.name);
    printf("Roll No: %d\\n", s.rollno);
    printf("Total Marks: %.2f\\n", s.total);
    printf("Percentage: %.2f%%\\n", s.percentage);
    
    return 0;
}` 
                },
                { 
                    id: 110, 
                    title: "Quiz: Structures & Unions", 
                    type: "quiz", 
                    duration: "15m",
                    content: `📝 Quiz: Structures & Unions

This quiz will test your understanding of:
• Structure declaration and usage
• Structure arrays and nested structures
• Union concepts and memory sharing
• Structure vs union differences
• Real-world applications of structures

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 11,
            title: "File Handling",
            topics: [
                { 
                    id: 60, 
                    title: "File Opening & Closing", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c60topic.mp4",
                    content: `📁 File Opening & Closing

1. File Pointer
FILE *fp;

2. fopen() - Open File
fp = fopen("filename", "mode");

3. File Modes
• "r" - Read (file must exist)
• "w" - Write (creates new/overwrites)
• "a" - Append (creates new/appends)
• "r+" - Read/Write (file must exist)
• "w+" - Read/Write (creates new/overwrites)
• "a+" - Read/Append (creates new/appends)

4. fclose() - Close File
fclose(fp);

5. Complete Example
#include <stdio.h>

int main() {
    FILE *fp;
    
    fp = fopen("example.txt", "w");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    
    printf("File opened successfully!\\n");
    fclose(fp);
    printf("File closed successfully!\\n");
    
    return 0;
}` 
                },
                { 
                    id: 61, 
                    title: "File Reading", 
                    type: "video", 
                    duration: "30m",
                    videoUrl: "/videos/c61topic.mp4",
                    content: `📖 File Reading

1. fgetc() - Read Character
int ch = fgetc(fp);

2. fgets() - Read String
char str[100];
fgets(str, 100, fp);

3. fscanf() - Formatted Read
int num;
char name[50];
fscanf(fp, "%d %s", &num, name);

4. Reading Entire File
#include <stdio.h>

int main() {
    FILE *fp;
    char ch;
    
    fp = fopen("example.txt", "r");
    if (fp == NULL) {
        printf("Cannot open file\\n");
        return 1;
    }
    
    printf("File content:\\n");
    while ((ch = fgetc(fp)) != EOF) {
        printf("%c", ch);
    }
    
    fclose(fp);
    return 0;
}

5. Reading Line by Line
char line[256];
while (fgets(line, sizeof(line), fp)) {
    printf("%s", line);
}` 
                },
                { 
                    id: 62, 
                    title: "File Writing", 
                    type: "video", 
                    duration: "35m",
                    videoUrl: "/videos/c62topic.mp4",
                    content: `✍️ File Writing

1. fputc() - Write Character
fputc('A', fp);

2. fputs() - Write String
fputs("Hello World", fp);

3. fprintf() - Formatted Write
fprintf(fp, "Name: %s, Age: %d", name, age);

4. Writing to File
#include <stdio.h>

int main() {
    FILE *fp;
    
    fp = fopen("output.txt", "w");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    
    fprintf(fp, "This is line 1\\n");
    fprintf(fp, "This is line 2\\n");
    fputs("This is line 3\\n", fp);
    
    fclose(fp);
    printf("Data written successfully!\\n");
    return 0;
}

5. Appending to File
fp = fopen("data.txt", "a");
fprintf(fp, "New data appended\\n");
fclose(fp);` 
                },
                { 
                    id: 63, 
                    title: "File Pointer", 
                    type: "video", 
                    duration: "20m",
                    videoUrl: "/videos/c63topic.mp4",
                    content: `📍 File Pointer Operations

1. ftell() - Current Position
long position = ftell(fp);

2. fseek() - Move Pointer
fseek(fp, offset, whence);

3. rewind() - Reset to Start
rewind(fp);

4. SEEK_SET, SEEK_CUR, SEEK_END
• SEEK_SET: Beginning of file
• SEEK_CUR: Current position
• SEEK_END: End of file

5. Example: Random Access
#include <stdio.h>

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) return 1;
    
    // Move to 10th byte from start
    fseek(fp, 10, SEEK_SET);
    printf("Position: %ld\\n", ftell(fp));
    
    // Move 5 bytes forward from current
    fseek(fp, 5, SEEK_CUR);
    printf("Position: %ld\\n", ftell(fp));
    
    // Move to end
    fseek(fp, 0, SEEK_END);
    printf("File size: %ld bytes\\n", ftell(fp));
    
    // Back to start
    rewind(fp);
    printf("Position after rewind: %ld\\n", ftell(fp));
    
    fclose(fp);
    return 0;
}` 
                },
                { 
                    id: 64, 
                    title: "Text vs Binary Files", 
                    type: "video", 
                    duration: "25m",
                    videoUrl: "/videos/c64topic.mp4",
                    content: `📄 Text vs Binary Files

1. Text Files
• Human readable
• Character data
• Platform dependent newlines
• Modes: "r", "w", "a"

2. Binary Files
• Machine readable
• Raw data bytes
• Platform independent
• Modes: "rb", "wb", "ab"

3. Text File Example
FILE *fp = fopen("text.txt", "w");
fprintf(fp, "Hello World\\n");
fclose(fp);

4. Binary File Example
FILE *fp = fopen("data.bin", "wb");
int numbers[] = {1, 2, 3, 4, 5};
fwrite(numbers, sizeof(int), 5, fp);
fclose(fp);

5. When to Use
• Text: Configuration, logs, user data
• Binary: Images, audio, databases, structures

6. Structure to Binary File
struct Student {
    char name[50];
    int rollno;
    float marks;
};

struct Student s = {"John", 101, 85.5};
FILE *fp = fopen("student.bin", "wb");
fwrite(&s, sizeof(struct Student), 1, fp);
fclose(fp);` 
                },
                { 
                    id: 65, 
                    title: "File Handling Examples", 
                    type: "video", 
                    duration: "40m",
                    videoUrl: "/videos/c65topic.mp4",
                    content: `💡 File Handling Examples

1. Copy File
#include <stdio.h>

int main() {
    FILE *source, *target;
    char ch;
    
    source = fopen("source.txt", "r");
    target = fopen("target.txt", "w");
    
    if (source == NULL || target == NULL) {
        printf("Error opening files!\\n");
        return 1;
    }
    
    while ((ch = fgetc(source)) != EOF) {
        fputc(ch, target);
    }
    
    fclose(source);
    fclose(target);
    printf("File copied successfully!\\n");
    return 0;
}

2. Count Lines in File
int countLines(char filename[]) {
    FILE *fp = fopen(filename, "r");
    if (fp == NULL) return -1;
    
    int count = 0;
    char ch;
    while ((ch = fgetc(fp)) != EOF) {
        if (ch == '\\n') count++;
    }
    
    fclose(fp);
    return count + 1; // +1 for last line
}

3. Student Records to File
struct Student {
    char name[50];
    int rollno;
    float marks;
};

void saveStudents() {
    struct Student s;
    FILE *fp = fopen("students.dat", "wb");
    
    printf("Enter student details (0 to stop):\\n");
    while (1) {
        printf("Name: "); scanf("%s", s.name);
        if (strcmp(s.name, "0") == 0) break;
        printf("Roll No: "); scanf("%d", &s.rollno);
        printf("Marks: "); scanf("%f", &s.marks);
        
        fwrite(&s, sizeof(struct Student), 1, fp);
    }
    
    fclose(fp);
}` 
                },
                { 
                    id: 111, 
                    title: "Quiz: File Handling Basics", 
                    type: "quiz", 
                    duration: "15m",
                    content: `📝 Quiz: File Handling Basics

This quiz will test your understanding of:
• File opening and closing
• File reading and writing operations
• File pointer manipulation
• Text vs binary files
• File handling examples and best practices

Complete the quiz to proceed to the next module.`
                }
            ]
        },
        {
            id: 12,
            title: "Projects & Assessment",
            topics: [
                { 
                    id: 66, 
                    title: "Student Management System", 
                    type: "project", 
                    duration: "2h",
                    content: `🎓 Student Management System Project

Project Overview:
Create a complete student management system with file handling.

Features:
1. Add Student
2. View All Students
3. Search Student
4. Update Student
5. Delete Student
6. Save to File
7. Load from File

Data Structure:
struct Student {
    int rollno;
    char name[50];
    char course[30];
    float marks;
    char grade;
};

Required Functions:
• addStudent()
• displayStudents()
• searchStudent()
• updateStudent()
• deleteStudent()
• saveToFile()
• loadFromFile()

Menu Structure:
1. Add Student
2. View All Students
3. Search Student
4. Update Student
5. Delete Student
6. Save Data
7. Load Data
8. Exit

Implementation Tips:
• Use arrays of structures
• Implement file I/O for persistence
• Add input validation
• Create menu-driven interface` 
                },
                { 
                    id: 67, 
                    title: "Contact Book", 
                    type: "project", 
                    duration: "1.5h",
                    content: `📞 Contact Book Project

Project Overview:
Build a contact management system with search and categorization.

Features:
1. Add Contact
2. View Contacts
3. Search Contact
4. Update Contact
5. Delete Contact
6. Sort Contacts
7. Export to File

Data Structure:
struct Contact {
    char name[50];
    char phone[15];
    char email[50];
    char category[20]; // Family, Friends, Work
};

Required Functions:
• addContact()
• displayContacts()
• searchContact()
• updateContact()
• deleteContact()
• sortContacts()
• exportToFile()

Advanced Features:
• Search by name/phone/email
• Sort by name/category
• Duplicate detection
• Phone number validation` 
                },
                { 
                    id: 68, 
                    title: "ATM Simulation", 
                    type: "project", 
                    duration: "2h",
                    content: `🏦 ATM Simulation Project

Project Overview:
Simulate basic ATM operations with user authentication.

Features:
1. User Login
2. Check Balance
3. Deposit Money
4. Withdraw Money
5. Change PIN
6. Transaction History
7. Logout

Data Structure:
struct Account {
    int accountNo;
    char name[50];
    int pin;
    float balance;
    char transactions[100][100];
    int transactionCount;
};

Required Functions:
• login()
• checkBalance()
• deposit()
• withdraw()
• changePin()
• showTransactions()
• logout()

Security Features:
• PIN verification
• Balance validation
• Transaction limits
• Session management

File Handling:
• Store accounts in binary file
• Encrypt sensitive data
• Maintain transaction logs` 
                },
                { 
                    id: 69, 
                    title: "Mini Compiler Simulation", 
                    type: "project", 
                    duration: "3h",
                    content: `⚙️ Mini Compiler Simulation

Project Overview:
Create a simplified compiler for a basic programming language.

Features:
1. Lexical Analysis
2. Syntax Analysis
3. Symbol Table
4. Basic Error Handling
5. Code Generation

Components:
• Tokenizer (Lexer)
• Parser
• Symbol Table Manager
• Code Generator

Supported Constructs:
• Variable declarations
• Arithmetic operations
• Conditional statements
• Simple loops

Example Input:
x = 10
y = 20
if x > y then
    print "x is greater"
else
    print "y is greater"
end

Implementation Steps:
1. Read source code
2. Tokenize into keywords, identifiers, operators
3. Parse for syntax correctness
4. Generate intermediate code
5. Execute or generate target code` 
                },
                { 
                    id: 70, 
                    title: "Final MCQ Assessment", 
                    type: "assessment", 
                    duration: "1h",
                    content: `📝 Final MCQ Assessment

Assessment Structure:
• 50 Multiple Choice Questions
• Time: 60 minutes
• Topics cover all C programming concepts
• Passing score: 70%

Question Categories:
1. Basic Syntax & Data Types (10 questions)
2. Control Structures (8 questions)
3. Functions & Recursion (7 questions)
4. Arrays & Strings (8 questions)
5. Pointers & Memory (7 questions)
6. Structures & Files (5 questions)
7. Dynamic Memory (5 questions)

Sample Questions:
1. What is the output of: printf("%d", 5/2);
2. Which is correct pointer declaration?
3. What does malloc() return on failure?
4. How to properly free allocated memory?

Preparation Tips:
• Review all course topics
• Practice coding exercises
• Understand memory management
• Test with sample programs` 
                },
                { 
                    id: 71, 
                    title: "Final Practical Assignment", 
                    type: "assessment", 
                    duration: "2h",
                    content: `💻 Final Practical Assignment

Assignment Objective:
Demonstrate comprehensive C programming skills through a practical project.

Requirements:
Choose ONE of the following:

Option 1: Library Management System
• Book issue/return
• Member management
• Fine calculation
• Search and reports

Option 2: Bank Account System
• Account creation
• Transactions
• Interest calculation
• Statement generation

Option 3: Quiz Application
• Multiple categories
• Score tracking
• Timer functionality
• Result analysis

Evaluation Criteria:
1. Code Correctness (40%)
2. Code Organization (20%)
3. Functionality (20%)
4. Documentation (10%)
5. Error Handling (10%)

Submission:
• Source code files
• Documentation
• Test cases
• Screen recordings` 
                },
                { 
                    id: 72, 
                    title: "Course Completion Certificate", 
                    type: "certificate", 
                    duration: "5m",
                    content: `🏆 Course Completion Certificate

Congratulations! You have successfully completed the C Programming course.

Certificate Details:
• Course: C Language for Beginners
• Duration: 72 comprehensive lessons
• Skills: Programming fundamentals, problem solving
• Level: Beginner to Intermediate

What You've Achieved:
✓ Mastered C programming fundamentals
✓ Learned data structures and algorithms
✓ Understood memory management
✓ Built real-world projects
✓ Developed problem-solving skills

Next Steps:
1. Continue with C++ or Java
2. Learn data structures deeply
3. Practice competitive programming
4. Build more complex projects
5. Explore system programming

Certificate Available:
Download your certificate from the dashboard after completing all assessments.

Keep Learning! 🚀` 
                },
                { 
                    id: 112, 
                    title: "Quiz: Final Course Evaluation Quiz", 
                    type: "quiz", 
                    duration: "30m",
                    content: `📝 Quiz: Final Course Evaluation Quiz

This comprehensive quiz covers all topics from the C Programming course:
• Computer fundamentals and C basics
• Variables, data types, and operators
• Control flow statements
• Loops and iterations
• Functions and recursion
• Arrays and strings
• Pointers and memory management
• Structures and unions
• File handling
• Dynamic memory allocation

Complete this final quiz to demonstrate your mastery of C programming concepts.`
                }
            ]
        }
    ];

    // Flatten all topics for navigation
    useEffect(() => {
        const topics = modules.flatMap(module => module.topics);
        setAllTopics(topics);
        
        // Auto-select first topic if none selected
        if (!currentTopic && topics.length > 0) {
            setCurrentTopic(topics[0]);
            if (topics[0].type === 'video' && topics[0].videoUrl) {
                setCurrentVideo(topics[0].videoUrl);
            }
        }
    }, []);

    const toggleModule = (moduleId) => {
        setActiveModule(activeModule === moduleId ? null : moduleId);
    };

    const handleTopicClick = (topic) => {
        setCurrentTopic(topic);
        if (topic.type === 'video' && topic.videoUrl) {
            setCurrentVideo(topic.videoUrl);
        } else {
            setCurrentVideo('');
        }
    };

    const handleVideoEnd = () => {
        if (currentTopic && !completedTopics.has(currentTopic.id)) {
            setCompletedTopics(prev => new Set([...prev, currentTopic.id]));
        }
    };

    const getCurrentTopicIndex = () => {
        return allTopics.findIndex(topic => topic.id === currentTopic?.id);
    };

    const handleNext = () => {
        const currentIndex = getCurrentTopicIndex();
        if (currentIndex < allTopics.length - 1) {
            const nextTopic = allTopics[currentIndex + 1];
            handleTopicClick(nextTopic);
            
            // Scroll to top when changing topics
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        const currentIndex = getCurrentTopicIndex();
        if (currentIndex > 0) {
            const prevTopic = allTopics[currentIndex - 1];
            handleTopicClick(prevTopic);
            
            // Scroll to top when changing topics
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getTopicIcon = (topic) => {
        switch (topic.type) {
            case 'video':
                return 'video';
            case 'text':
                return 'file-text';
            case 'quiz':
                return 'quiz';
            case 'project':
                return 'project';
            case 'assessment':
                return 'clipboard';
            case 'certificate':
                return 'certificate';
            default:
                return 'file-text';
        }
    };

    const getProgressPercentage = () => {
        const totalTopics = modules.reduce((acc, module) => acc + module.topics.length, 0);
        return Math.round((completedTopics.size / totalTopics) * 100);
    };

    const formatContent = (content) => {
        return content.split('\n').map((line, index) => (
            <div key={index} className={line.trim() === '' ? 'mb-3' : 'mb-2'}>
                {line}
            </div>
        ));
    };

    const currentIndex = getCurrentTopicIndex();
    const hasNext = currentIndex < allTopics.length - 1;
    const hasPrevious = currentIndex > 0;

    return (
        <div className="min-h-screen dark-gradient-secondary">
            <div className="mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <Link to="/courses" className="inline-flex items-center text-primary-400 hover:text-white mb-3 transition-colors text-sm">
                        <Icon name="arrow-left" className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Link>
                    <h1 className="text-2xl font-bold text-white">C Language for Beginners</h1>
                    <p className="text-gray-400 mt-1 text-sm">Master the fundamentals of C programming with hands-on exercises and projects</p>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-400">Course Progress</span>
                            <span className="text-xs text-primary-400">{getProgressPercentage()}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div 
                                className="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar - Course Content - Fixed */}
                    <div className="lg:w-1/4">
                        <div className="dark-glass rounded-xl p-4 shadow-lg sticky top-6 max-h-[85vh] overflow-y-auto">
                            <h2 className="text-lg font-bold text-white mb-4">Course Content</h2>
                            
                            <div className="space-y-0">
                                {modules.map(module => (
                                    <div key={module.id} className="border-b border-gray-700 last:border-b-0">
                                        {/* Module Header */}
                                        <button
                                            onClick={() => toggleModule(module.id)}
                                            className="w-full flex items-center justify-between p-3 hover:bg-gray-750 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <span className={`transform transition-transform ${
                                                    activeModule === module.id ? 'rotate-90' : ''
                                                }`}>
                                                    <Icon name="chevron-right" className="w-4 h-4 text-gray-400" />
                                                </span>
                                                <span className="ml-2 text-white font-medium text-sm">{module.title}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {module.topics.length}
                                            </span>
                                        </button>

                                        {/* Module Topics */}
                                        <div className={`transition-all duration-300 overflow-hidden ${
                                            activeModule === module.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                            <div className="pb-1">
                                                {module.topics.map(topic => (
                                                    <button
                                                        key={topic.id}
                                                        onClick={() => handleTopicClick(topic)}
                                                        className={`w-full flex items-center p-2 transition-colors text-left ${
                                                            currentTopic?.id === topic.id 
                                                                ? 'bg-primary-500/20 border-r-2 border-primary-500' 
                                                                : 'hover:bg-gray-750'
                                                        } ${
                                                            completedTopics.has(topic.id) ? 'text-green-400' : 'text-gray-300'
                                                        }`}
                                                    >
                                                        <Icon 
                                                            name={getTopicIcon(topic)} 
                                                            className={`w-3 h-3 mr-2 ${
                                                                completedTopics.has(topic.id) ? 'text-green-400' : 'text-gray-400'
                                                            }`}
                                                        />
                                                        <div className="flex-1">
                                                            <span className="text-xs leading-tight">{topic.title}</span>
                                                        </div>
                                                        <span className="text-xs text-gray-500 ml-1 whitespace-nowrap">
                                                            {topic.duration}
                                                        </span>
                                                        {completedTopics.has(topic.id) && (
                                                            <Icon name="check-circle" className="w-3 h-3 text-green-400 ml-1" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="lg:w-3/4">
                        <div className="dark-glass rounded-xl p-6 shadow-lg min-h-[600px]">
                            {currentTopic ? (
                                <div>
                                    {/* Video Player */}
                                    {currentTopic.type === 'video' && currentVideo && (
                                        <div className="mb-6">
                                            <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                                                <video 
                                                    ref={videoRef}
                                                    controls 
                                                    className="w-full h-full rounded-lg"
                                                    onEnded={handleVideoEnd}
                                                    key={currentVideo}
                                                >
                                                    <source src={currentVideo} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </div>
                                    )}

                                    {/* Topic Content */}
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-4">
                                            {currentTopic.title}
                                        </h2>
                                        
                                        <div className="text-gray-300 text-sm leading-relaxed text-left">
                                            {currentTopic.content ? (
                                                <div className="whitespace-pre-line">
                                                    {formatContent(currentTopic.content)}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <Icon name="file-text" className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                                    <p className="text-gray-400">Content for this topic is being prepared.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Navigation Buttons */}
                                        <div className="flex justify-between mt-8 pt-4 border-t border-gray-700">
                                            <button 
                                                onClick={handlePrevious}
                                                disabled={!hasPrevious}
                                                className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                                                    hasPrevious 
                                                        ? 'dark-btn-secondary' 
                                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                }`}
                                            >
                                                <Icon name="arrow-left" className="w-4 h-4 mr-2" />
                                                Previous
                                            </button>
                                            <button 
                                                onClick={handleNext}
                                                disabled={!hasNext}
                                                className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                                                    hasNext 
                                                        ? 'dark-btn' 
                                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                }`}
                                            >
                                                Next
                                                <Icon name="arrow-right" className="w-4 h-4 ml-2" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Welcome/Default State */
                                <div className="text-center py-16">
                                    <Icon name="book-open" className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                                    <h2 className="text-xl font-bold text-white mb-3">Welcome to C Programming Course</h2>
                                    <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                                        Select a topic from the sidebar to start learning. Begin with "Getting Started With C" to build your foundation.
                                    </p>
                                    <button 
                                        onClick={() => handleTopicClick(modules[0].topics[0])}
                                        className="dark-btn inline-flex items-center px-4 py-2 rounded-lg text-sm"
                                    >
                                        <Icon name="play-circle" className="w-4 h-4 mr-2" />
                                        Start First Lesson
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CProgramming;