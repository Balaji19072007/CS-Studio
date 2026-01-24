// frontend/src/data/courseContent.js

export const COURSE_CONTENT = {
    // ==========================================
    // PROGRAMMING FUNDAMENTALS
    // ==========================================
    'c-programming': {
        id: 'c-programming',
        title: "C Language for Beginners",
        description: "Learn C language from scratch with hands-on exercises and projects",
        modules: [
            {
                id: 1,
                title: "Getting Started With C",
                topics: [
                    {
                        id: 'c-1-1',
                        title: "Knowing the Computer",
                        type: "video",
                        duration: "15m",
                        videoUrl: "/videos/c1topic.mp4",
                        content: `
# 🖥️ Knowing the Computer (Block Diagram, CPU, Memory)

### 1. What is a Computer?
A computer is an electronic machine that accepts input, processes data, and produces output.
Every computer, from a simple calculator to a powerful laptop, works using the same basic structure.

### 2. Block Diagram of a Computer
A typical computer system is divided into three main units:

#### 1️⃣ Input Unit
Devices that send data to the computer.
* **Examples:** Keyboard, Mouse, Scanner, Microphone

#### 2️⃣ Central Processing Unit (CPU)
The "brain" of the computer where all processing happens. The CPU has two major components:

* **ALU (Arithmetic and Logic Unit)**
  * Performs all mathematical operations
  * Handles logical comparisons (like >, <, ==)
  * Executes calculations and decisions

* **CU (Control Unit)**
  * Controls all computer operations
  * Manages the flow of data
  * Tells the CPU, memory, and I/O devices what to do

#### 3️⃣ Output Unit
Devices that display the results.
* **Examples:** Monitor, Printer, Speakers

### 3. Memory of a Computer
Memory stores instructions and data required for execution.

* **🧠 Primary Memory (Main Memory)**
  * RAM (Random Access Memory)
  * Fast, temporary storage
  * Data is lost when power is off
  * Used by programs while they run

* **💾 Secondary Memory**
  * Hard Disk, SSD, Pen Drive
  * Permanent storage
  * Slower than RAM
  * Stores files, documents, software

### 4. How Data Flows in a Computer
The complete journey of data inside a computer:
1. User enters data through an input device
2. Data goes to RAM
3. CPU reads the data from RAM
4. CPU processes it using ALU & CU
5. Result is sent back to RAM
6. Output unit displays the result

> **Note:** This entire process happens in milliseconds!

### 5. Why C Programmers Should Know This
C programming interacts closely with hardware:
* C accesses memory directly
* Pointers manipulate memory addresses
* C is used to build operating systems
* Understanding CPU and memory helps write efficient programs

A clear understanding of the computer's architecture makes learning C much easier.
`
                    },
                    {
                        id: 'c-1-2',
                        title: "What is a Programming Language?",
                        type: "video",
                        duration: "10m",
                        videoUrl: "/videos/c2topic.mp4",
                        content: `
# 📝 What is a Programming Language?

### 1. Definition
A programming language is a formal language comprising a set of instructions that produce various kinds of output. Programming languages are used to create programs that implement specific algorithms.

### 2. Types of Programming Languages

#### Low-level Languages
* **Machine Language:** Uses binary code (0s and 1s). Difficult for humans to read but directly understood by hardware.
* **Assembly Language:** Uses mnemonics (like ADD, MOV, SUB). Requires an assembler to translate.

#### High-level Languages
* **Examples:** C, C++, Java, Python
* Easier for humans to read and write (close to English).
* Must be converted to machine code for the computer to understand.

### 3. Why We Need Programming Languages
* To communicate with computers
* To solve complex problems
* To automate tasks
* To build software applications

### 4. Compiler vs Interpreter
| Feature | Compiler | Interpreter |
| :--- | :--- | :--- |
| **Translation** | Translates entire program at once | Translates line by line |
| **Execution Speed** | Faster execution | Slower execution |
| **Error Detection** | Reports all errors after compilation | Stops at the first error |
| **Example Language** | C, C++ | Python, JavaScript |

> **Key Takeaway:** C uses a **Compiler** to translate source code into machine code.
`
                    },
                    {
                        id: 'c-1-3',
                        title: "Writing Your First C Program",
                        type: "video",
                        duration: "25m",
                        videoUrl: "/videos/c6topic.mp4",
                        content: `
# ✍️ Writing Your First C Program

### 1. Basic Structure
Most C programs follow this standard template:

\`\`\`c
#include <stdio.h>

int main() {
    // Your code here
    return 0;
}
\`\`\`

### 2. Hello World Program
Let's analyze the classic "Hello World" program:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

### 3. Code Explanation

* **\`#include <stdio.h>\`**: This is a Preprocessor Directive. It tells the compiler to include the Standard Input Output library, which contains functions like \`printf\`.
* **\`int main()\`**: This is the main function. Every C program execution starts from here.
* **\`printf("...");\`**: A function used to print text to the screen.
* **\`\\n\`**: An escape sequence representing a "New Line".
* **\`return 0;\`**: Indicates that the program finished successfully.

### 4. Compilation and Execution
To run this program:

1. **Save** the file as \`hello.c\`
2. **Compile** using GCC:
   \`\`\`bash
   gcc hello.c -o hello
   \`\`\`
3. **Run** the executable:
   * **Windows:** \`hello.exe\`
   * **Linux/Mac:** \`./hello\`
`
                    }
                ]
            },
            {
                id: 2,
                title: "Basics of C",
                topics: [
                    {
                        id: 'c-2-1',
                        title: "Variables and Data Types",
                        type: "video",
                        duration: "20m",
                        content: `
# 📊 Variables in C

### 1. What are Variables?
Variables are named memory locations that store data. They act as containers for values that can change during program execution.

### 2. Variable Declaration and Initialization
**Syntax:** \`data_type variable_name = value;\`

\`\`\`c
int age = 25;           // Integer variable
float salary = 5000.50; // Floating point variable
char grade = 'A';       // Character variable
\`\`\`

### 3. Rules for Naming Variables
* Must start with a letter or underscore (\`_\`).
* Can contain letters, digits, and underscores.
* **Cannot** contain spaces or special symbols (like @, #, $).
* **Cannot** use C keywords (like \`int\`, \`return\`, \`if\`).
* C is **case sensitive** (\`Age\` and \`age\` are different).

### 4. Basic Data Types
| Type | Description | Size (Typical) | Format Specifier |
| :--- | :--- | :--- | :--- |
| \`int\` | Integer numbers | 4 bytes | \`%d\` |
| \`float\` | Floating point numbers | 4 bytes | \`%f\` |
| \`double\` | Double precision float | 8 bytes | \`%lf\` |
| \`char\` | Single character | 1 byte | \`%c\` |

### 5. Constants
Constants are fixed values that cannot be changed.
\`\`\`c
const float PI = 3.14159;
#define MAX_USERS 100
\`\`\`
`
                    }
                ]
            }
        ]
    },

    'python': {
        id: 'python',
        title: "Python for Beginners",
        description: "Learn Python from scratch with hands-on exercises",
        modules: [
            {
                id: 1,
                title: "Introduction to Python",
                topics: [
                    {
                        id: 'py-1-1',
                        title: "Why Python?",
                        type: "video",
                        duration: "10m",
                        content: `
# 🐍 Why Python?

### 1. Simplicity
Python reads like English. It handles complexity for you, so you can focus on solving problems, not fighting syntax.

### 2. Versatility
Python is used everywhere:
* **Web Development** (Django, Flask)
* **Data Science** (Pandas, NumPy)
* **AI & Machine Learning** (TensorFlow, PyTorch)
* **Automation & Scripting**

### 3. Your First Python Program
\`\`\`python
print("Hello, Python!")
\`\`\`
Compare this to C or Java. No imports, no classes, no main function required for a simple script!
`
                    },
                    {
                        id: 'py-1-2',
                        title: "Variables & Types",
                        type: "video",
                        duration: "15m",
                        content: `
# 📊 Variables in Python

Python is **dynamically typed**, meaning you don't need to declare the type.

\`\`\`python
name = "Alice"      # String
age = 30            # Integer
height = 5.8        # Float
is_student = True   # Boolean
\`\`\`

### Rules
* Variable names are case-sensitive.
* Use \`snake_case\` for variable names (convention).
`
                    }
                ]
            }
        ]
    },

    'java': {
        id: 'java',
        title: "Java Fundamentals",
        description: "Master object-oriented programming with Java",
        modules: [
            {
                id: 1,
                title: "Java Basics",
                topics: [
                    {
                        id: 'java-1-1',
                        title: "JVM, JRE, and JDK",
                        type: "video",
                        duration: "15m",
                        content: `
# ☕ Java Environment (JVM, JRE, JDK)

### 1. Understanding the acronyms
* **JDK (Java Development Kit):** Tools to develop Java apps (compiler, debugger).
* **JRE (Java Runtime Environment):** Libraries and JVM needed to RUN Java apps.
* **JVM (Java Virtual Machine):** The engine that actually runs the code.

### 2. "Write Once, Run Anywhere"
Java compiles to **Bytecode** (\`.class\` files). This bytecode can run on any device that has a JVM, making Java platform-independent.
`
                    }
                ]
            }
        ]
    },

    // ==========================================
    // WEB DEVELOPMENT
    // ==========================================
    'frontend': {
        id: 'frontend',
        title: "Modern Frontend Mastery",
        description: "Master HTML, CSS, JS and React",
        modules: [
            {
                id: 1,
                title: "HTML5 Fundamentals",
                topics: [
                    {
                        id: 'fe-1-1',
                        title: "Semantic HTML",
                        type: "video",
                        duration: "12m",
                        content: `
# 🌐 Semantic HTML

### Why Semantic?
Semantic tags describe their meaning to both the browser and the developer.
* **Better SEO**
* **Improved Accessibility**

### Examples
Instead of using \`<div>\` for everything, use:
* \`<header>\`
* \`<nav>\`
* \`<main>\`
* \`<article>\`
* \`<footer>\`
`
                    }
                ]
            }
        ]
    },

    'nodejs': {
        id: 'nodejs',
        title: "Node.js & Express",
        description: "Build scalable backend services",
        modules: [
            {
                id: 1,
                title: "Node.js Basics",
                topics: [
                    { id: 'node-1-1', title: "Event Loop", type: "video", content: "# The Node.js Event Loop\n\nNode.js is single-threaded but non-blocking..." }
                ]
            }
        ]
    },

    'mern': {
        id: 'mern',
        title: "MERN Stack Mastery",
        description: "Fullstack development with MongoDB, Express, React, Node",
        modules: [
            {
                id: 1,
                title: "Fullstack Architecture",
                topics: [{ id: 'mern-1-1', title: "Client-Server Model", type: "video", content: "# Client-Server Architecture\n\nUnderstanding how React communicates with Express..." }]
            }
        ]
    },


    // ==========================================
    // DATA SCIENCE & AI
    // ==========================================
    'data-science': {
        id: 'data-science',
        title: "Data Science with Python",
        modules: [
            { id: 1, title: "Pandas Basics", topics: [{ id: 'ds-1-1', title: "DataFrames", type: "video", content: "# Pandas DataFrames\n\nThe core data structure of Pandas..." }] }
        ]
    },
    'machine-learning': {
        id: 'machine-learning',
        title: "Intro to ML",
        description: "Learn supervised and unsupervised learning",
        modules: [
            { id: 1, title: "Supervised Learning", topics: [{ id: 'ml-1-1', title: "Linear Regression", type: "video", content: "# Linear Regression\n\nPredicting continuous values..." }] }
        ]
    },

    // ==========================================
    // DATA ANALYSIS & VISUALIZATION
    // ==========================================
    'data-visualization': {
        id: 'data-visualization',
        title: "Data Analysis & Visualization",
        description: "Create compelling data visualizations",
        modules: [
            { id: 1, title: "Introduction to Visualization", topics: [{ id: 'dv-1-1', title: "Why Visualize?", type: "video", content: "# Why Data Visualization Matters\n\nHumans process visual information 60,000 times faster than text..." }] }
        ]
    },
    'statistics': {
        id: 'statistics',
        title: "Statistics for Data Science",
        description: "Master statistical concepts",
        modules: [
            { id: 1, title: "Descriptive Statistics", topics: [{ id: 'stat-1-1', title: "Mean, Median, Mode", type: "video", content: "# Measures of Central Tendency\n\nUnderstanding the center of your data..." }] }
        ]
    },

    // ==========================================
    // ALGORITHMS
    // ==========================================
    'dsa-c': {
        id: 'dsa-c',
        title: "DSA In C",
        description: "Master Data Structures and Algorithms using C",
        modules: [
            { id: 1, title: "Arrays & Linked Lists", topics: [{ id: 'dsac-1-1', title: "Introduction to Arrays", type: "video", content: "# Arrays in Memory\n\nContiguous memory allocation..." }] }
        ]
    },
    'dsa-java': {
        id: 'dsa-java',
        title: "DSA In Java",
        description: "Master Data Structures and Algorithms using Java",
        modules: [
            { id: 1, title: "Collections Framework", topics: [{ id: 'dsaj-1-1', title: "ArrayList vs LinkedList", type: "video", content: "# Java Collections\n\nChoosing the right data structure..." }] }
        ]
    },
    'dsa-python': {
        id: 'dsa-python',
        title: "DSA In Python",
        description: "Master Data Structures and Algorithms using Python",
        modules: [
            { id: 1, title: "List Comprehensions", topics: [{ id: 'dsap-1-1', title: "Python Lists", type: "video", content: "# Python Lists\n\nDynamic arrays in Python..." }] }
        ]
    },

    // ==========================================
    // MOBILE DEVELOPMENT
    // ==========================================
    'android': {
        id: 'android',
        title: "Android with Kotlin",
        description: "Build native Android apps",
        modules: [
            { id: 1, title: "Android Studio Setup", topics: [{ id: 'andr-1-1', title: "Environment Setup", type: "video", content: "# Setting up Android Studio\n\nConfiguring the SDK and Emulator..." }] }
        ]
    },
    'ios': {
        id: 'ios',
        title: "iOS with Swift",
        description: "Create beautiful iOS apps",
        modules: [
            { id: 1, title: "Xcode & Swift", topics: [{ id: 'ios-1-1', title: "Intro to Xcode", type: "video", content: "# Your First iOS App\n\nUnderstanding the Main.storyboard..." }] }
        ]
    },
    'react-native': {
        id: 'react-native',
        title: "React Native",
        description: "Build cross-platform mobile apps",
        modules: [
            { id: 1, title: "React Native Basics", topics: [{ id: 'rn-1-1', title: "Components & State", type: "video", content: "# React Native Components\n\nView, Text, and Image..." }] }
        ]
    },

    // ==========================================
    // ADDITIONAL AI COURSES
    // ==========================================
    'neural-networks': {
        id: 'neural-networks',
        title: "Neural Networks",
        description: "Build deep learning models",
        modules: [
            { id: 1, title: "Perceptrons", topics: [{ id: 'nn-1-1', title: "What is a Perceptron?", type: "video", content: "# The Perceptron\n\nThe building block of Neural Networks..." }] }
        ]
    },
    'nlp': {
        id: 'nlp',
        title: "NLP Fundamentals",
        description: "Process and analyze text data",
        modules: [
            { id: 1, title: "Text Preprocessing", topics: [{ id: 'nlp-1-1', title: "Tokenization", type: "video", content: "# Tokenization\n\nSplitting text into meaningful units..." }] }
        ]
    },

    // ==========================================
    // SECURITY
    // ==========================================
    'penetration-testing': {
        id: 'penetration-testing',
        title: "Penetration Testing",
        description: "Learn ethical hacking techniques",
        modules: [
            { id: 1, title: "Reconnaissance", topics: [{ id: 'pt-1-1', title: "Information Gathering", type: "video", content: "# Passive vs Active Recon\n\nGathering intel on your target..." }] }
        ]
    },
    'network-security': {
        id: 'network-security',
        title: "Network Defense",
        description: "Master network security protocols",
        modules: [
            { id: 1, title: "OSI Model Security", topics: [{ id: 'ns-1-1', title: "Securing Layers", type: "video", content: "# Security across OSI Layers\n\nFrom Physical to Application layer..." }] }
        ]
    },
    'cryptography': {
        id: 'cryptography',
        title: "Applied Cryptography",
        description: "Learn encryption algorithms",
        modules: [
            { id: 1, title: "Symmetric Encryption", topics: [{ id: 'cry-1-1', title: "AES & DES", type: "video", content: "# Symmetric Key Cryptography\n\nSingle key for encryption and decryption..." }] }
        ]
    },

    // ==========================================
    // DEVOPS
    // ==========================================
    'devops': {
        id: 'devops',
        title: "Intro to DevOps",
        description: "Learn CI/CD and infrastructure",
        modules: [
            { id: 1, title: "DevOps Culture", topics: [{ id: 'dops-1-1', title: "What is DevOps?", type: "video", content: "# The DevOps Philosophy\n\nBridging the gap between Dev and Ops..." }] }
        ]
    },
    'docker-kubernetes': {
        id: 'docker-kubernetes',
        title: "Docker & Kubernetes",
        description: "Master container orchestration",
        modules: [
            { id: 1, title: "Containerization", topics: [{ id: 'dk-1-1', title: "Why Docker?", type: "video", content: "# Problems with Virtual Machines\n\nLightweight isolation with containers..." }] }
        ]
    },
    'aws': {
        id: 'aws',
        title: "AWS Solutions Architect",
        description: "Design scalable apps on AWS",
        modules: [
            { id: 1, title: "Cloud Concepts", topics: [{ id: 'aws-1-1', title: "Cloud Computing", type: "video", content: "# Benefits of Cloud Computing\n\nScalability, Elasticity, and Cost-savings..." }] }
        ]
    }
};
