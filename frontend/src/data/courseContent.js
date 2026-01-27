// frontend/src/data/courseContent.js

export const COURSE_CONTENT = {
    // ==========================================
    // PROGRAMMING FUNDAMENTALS
    // ==========================================
    'c-programming': {
        id: 'c-programming',
        title: "C Language Masterclass",
        description: "From Absolute Beginner to Advanced C Programmer (2025 Updated)",
        modules: [
            // ===================================
            // PHASE 1: C BASICS
            // ===================================
            // ===================================
            // PHASE 1: C BASICS
            // ===================================
            {
                id: 1,
                title: "Phase 1: C Basics (Beginner)",
                topics: [
                    // --- BATCH 1: Topics 1-3 ---
                    {
                        id: 'c-1-1', title: "What is Programming?", type: "video", duration: "30m", videoUrl: "/videos/c1topic.mp4",
                        content: `# 🟢 Topic 1: What is Programming?
✅ Definition
**Programming** is the act of instructing a computer to perform specific tasks. It involves writing a sequence of instructions (code) in a language the computer can understand.

---

🧠 Why Do We Need Programming?
Computers are powerful but "dumb" without instructions. Programming allows us to:
*   **Automate Tasks**: Perform repetitive calculations instantly.
*   **Build Software**: Create operating systems, games, websites, and mobile apps.
*   **Process Data**: Handle massive amounts of information (Big Data, AI).
*   **Control Hardware**: Run robots, cars, and medical devices.

---

💻 How Programming Works
1.  **Source Code**: The human-readable code you write (e.g., in C, Python).
2.  **Compiler/Interpreter**: A special program that translates your code into machine language (0s and 1s).
3.  **Execution**: The CPU runs the machine code and produces the output.

---

⭐ Key Takeaway
Programming bridges the gap between human logic and machine execution.
`
                    },
                    {
                        id: 'c-1-2', title: "What is C Language?", type: "video", duration: "45m", videoUrl: "/videos/c2topic.mp4",
                        content: `# 🟢 Topic 2: What is C Language?
✅ Introduction
**C** is a high-level, general-purpose programming language. It is often called the **"Mother of All Languages"** because many modern languages (C++, Java, Python) are based on C syntax.

---

🧠 Key Characteristics
*   **Procedural**: Follows a step-by-step procedure of functions.
*   **Fast & Efficient**: Provides low-level access to memory, making it ideal for system programming.
*   **Portable**: Code written on one machine can be compiled and run on another with little to no changes.
*   **Statically Typed**: Variable types must be declared before use.

---

💻 Applications of C
*   **Operating Systems**: UNIX, Windows, Linux kernels are written in C.
*   **Embedded Systems**: Microwaves, Washing Machines, Car Sensors.
*   **Databases**: MySQL, PostgreSQL core engines.
*   **Compilers**: Many compilers for other languages are written in C.

---

⭐ Key Takeaway
C is powerful, fast, and the foundation of modern computing efficiently.
`
                    },
                    {
                        id: 'c-1-3', title: "History of C", type: "video", duration: "30m", videoUrl: "/videos/c3topic.mp4",
                        content: `# 🟢 Topic 3: History of C
✅ The Origin Story
*   **Year**: 1972
*   **Creator**: **Dennis Ritchie**
*   **Place**: AT&T Bell Laboratories, USA
*   **Purpose**: To re-write the **UNIX Operating System**.

---

🧠 Timeline
1.  **ALGOL (1960)**: The root of structured programming.
2.  **BCPL (1967)**: Martin Richards.
3.  **B Language (1970)**: Ken Thompson (created for UNIX).
4.  **C Language (1972)**: Dennis Ritchie (improved B by adding data types).
5.  **ANSI C (1989)**: Standardized version (C89).

---

⭐ Key Takeaway
C was created to build UNIX, one of the most important operating systems in history.
`
                    },
                    // --- QUIZ 1.1 (Topics 1-3) ---
                    {
                        id: 'c-quiz-1-1',
                        title: "📝 Quiz 1: Intro & History (Topics 1-3)",
                        type: "quiz",
                        questions: [
                            { question: "What is the main role of a compiler?", options: ["Write code", "Convert code to machine language", "Execute code", "Debug code"], correct: 1 },
                            { question: "Who created C Language?", options: ["James Gosling", "Dennis Ritchie", "Ken Thompson", "Bjarne Stroustrup"], correct: 1 },
                            { question: "In which year was C developed?", options: ["1960", "1972", "1980", "1991"], correct: 1 },
                            { question: "Which OS was C originally built for?", options: ["Windows", "UNIX", "Mac OS", "Linux"], correct: 1 },
                            { question: "Which language was the predecessor of C?", options: ["B Language", "Java", "Python", "C++"], correct: 0 },
                            { question: "Where was C developed?", options: ["Microsoft", "IBM", "Bell Labs", "Apple"], correct: 2 },
                            { question: "C is what type of language?", options: ["Low-level", "High-level procedural", "Object-oriented", "Scripting only"], correct: 1 },
                            { question: "Why is C called 'Mother of All Languages'?", options: ["It is the oldest", "It is the hardest", "Many modern languages stem from it", "It is only for mothers"], correct: 2 },
                            { question: "What is 'Source Code'?", options: ["Machine code", "Binary code", "Human-readable code", "Output"], correct: 2 },
                            { question: "Which is NOT an application of C?", options: ["Operating Kernels", "Embedded Systems", "Frontend Web Styling", "Database Engines"], correct: 2 }
                        ]
                    },

                    // --- BATCH 2: Topics 4-6 ---
                    {
                        id: 'c-1-4', title: "Features of C", type: "video", duration: "35m", videoUrl: "https://www.youtube.com/watch?v=ssJY5mdmG48",
                        content: `# 🟢 Topic 4: Features of C
✅ Why C is Popular?
1.  **Simple & Efficient**: Only 32 keywords, easy to learn, and runs very close to hardware speed.
2.  **Portability (Platform Independent)**: Code written in C can be compiled and run on various architectures (Windows, Mac, Linux) with minimal changes.
3.  **Mid-Level Language**: Combines the simplicity of high-level languages with the power of low-level assembly (direct memory manipulation).

---

🧠 More Features
4.  **Structured Programming**: Code is broken into functions, making it easier to debug and maintain.
5.  **Rich Library**: Extensive built-in functions via header files (stdio.h, math.h, string.h).
6.  **Pointers**: Direct memory access allows for dynamic memory allocation and efficient hardware control.

---

⭐ Key Takeaway
C gives you full control over the computer's memory and performance.
`
                    },
                    {
                        id: 'c-1-5', title: "Structure of a C Program", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=0Sg6QHmlFJE",
                        content: `# 🟢 Topic 5: Structure of a C Program
✅ Understanding the Layout
Every C program follows a specific format explicitly.

### Basic Structure
1.  **Documentation Section**: Comments describing the code.
2.  **Link Section**: \`#include <header_files>\`
3.  **Definition Section**: \`#define PI 3.14\`
4.  **Global Declaration**: Variables used everywhere.
5.  **Main Function**: \`int main() { ... }\` (Entry point).
6.  **Subprograms**: User-defined functions.

---

💻 Example Code
\`\`\`c
// 1. Documentation
#include <stdio.h> // 2. Link Section

int count = 0; // 4. Global Declaration

int main() { // 5. Main Function
    printf("Hello C!");
    return 0;
}
\`\`\`

---

⭐ Key Takeaway
Always start with headers, then variables, then the main function.
`
                    },
                    {
                        id: 'c-1-6', title: "Compilation Process", type: "video", duration: "35m", videoUrl: "https://www.youtube.com/watch?v=7j3N5YtF1Rk",
                        content: `# 🟢 Topic 6: Compilation Process
✅ How it Works
How does \`hello.c\` become \`hello.exe\`?

---

🧠 The 4 Stages
1.  **Preprocessing**: 
    *   Removes comments.
    *   Expands macros (\`#define\`).
    *   Includes header files content.
    *   Output: \`.i\` file.

2.  **Compilation**: 
    *   Translates C code into **Assembly Code**.
    *   Output: \`.s\` file.

3.  **Assembly**: 
    *   Converts Assembly into **Machine Code** (Object file).
    *   Output: \`.o\` or \`.obj\` file.

4.  **Linking**: 
    *   Combines object code with System Libraries (e.g., printf implementation).
    *   Generates final **Executable**.
    *   Output: \`.exe\` or \`.out\`.

---

⭐ Key Takeaway
The compiler translates your human-readable C code into machine code that the CPU can execute.
`
                    },
                    // --- QUIZ 1.2 (Topics 4-6) ---
                    {
                        id: 'c-quiz-1-2',
                        title: "📝 Quiz 2: Structure & Process (Topics 4-6)",
                        type: "quiz",
                        questions: [
                            { question: "Which feature allows C to run on different machines?", options: ["Speed", "Portability", "Pointers", "Recursion"], correct: 1 },
                            { question: "What does 'Mid-Level Language' mean?", options: ["Only used for middleware", "Between High-Level and Assembly", "Average difficulty", "None of these"], correct: 1 },
                            { question: "Which is the entry point of every C program?", options: ["start()", "void()", "main()", "begin"], correct: 2 },
                            { question: "Where are library files included?", options: ["Link Section", "Main Function", "Documentation", "End of file"], correct: 0 },
                            { question: "What runs first in the compilation process?", options: ["Linker", "Compiler", "Preprocessor", "Assembler"], correct: 2 },
                            { question: "What does the Preprocessor do?", options: ["Runs code", "Expands macros & removes comments", "Converts to binary", "Checks logic errors"], correct: 1 },
                            { question: "Which file extension is created after Compilation (before matching)?", options: [".exe", ".obj / .o", ".c", ".txt"], correct: 1 },
                            { question: "What combines object code with libraries?", options: ["Linker", "Loader", "Runner", "Compiler"], correct: 0 },
                            { question: "Can a C program run without a main() function?", options: ["Yes", "No", "Only if lucky", "Depends on OS"], correct: 1 },
                            { question: "Which component converts Assembly to Machine Code?", options: ["Compiler", "Interpreter", "Assembler", "Linker"], correct: 2 }
                        ]
                    },

                    // --- BATCH 3: Topics 7-9 ---
                    {
                        id: 'c-1-7', title: "First C Program", type: "video", duration: "10m", videoUrl: "https://www.youtube.com/watch?v=0l8Y4m5qJ2M",
                        content: `# 🟢 Topic 7: First C Program
✅ Writing Your First Code
Here is the classic "Hello World" program in C.

---

💻 Code Example
\`\`\`c
#include <stdio.h> 

int main() {
    printf("Hello World");
    return 0; 
}
\`\`\`

---

🧠 Line-by-Line Explanation
1.  **#include <stdio.h>**: Tells the compiler to include the "Standard Input Output" library. Needed for \`printf\`.
2.  **int main()**: The starting point of execution. \`int\` means it returns an integer.
3.  **printf(...)**: A function to print text to the screen.
4.  **return 0**: Tells the OS that the program finished successfully.

---

⭐ Key Takeaway
Every C program needs a \`main()\` function to start execution.
`
                    },
                    {
                        id: 'c-1-8', title: "Keywords & Identifiers", type: "video", duration: "40m", videoUrl: "https://www.youtube.com/watch?v=4y7w9JZ1KjM",
                        content: `# 🟢 Topic 8: Keywords & Identifiers
✅ Keywords (Reserved Words)
Words that have special meaning to the compiler. They **cannot** be used as variable names.

---

📋 List of all 32 Keywords in C
| Keyword | Purpose | Keyword | Purpose |
| :--- | :--- | :--- | :--- |
| **auto** | Declares automatic variables | **break** | Exits from loop or switch |
| **case** | Used in switch statements | **char** | Declares character variable |
| **const** | Declares read-only variable | **continue** | Skips current iteration |
| **default** | Default block in switch | **do** | looping construct |
| **double** | Double precision floating point | **else** | Alternative branch in if |
| **enum** | Enumerated types | **extern** | Declares global variable |
| **float** | Floating point numbers | **for** | Loop construct |
| **goto** | Jumps to a label | **if** | Conditional statement |
| **int** | Integer variable | **long** | Long integer |
| **register** | Stores variable in CPU register | **return** | Returns value from function |
| **short** | Short integer | **signed** | Signed modifier |
| **sizeof** | Returns size of variable | **static** | Preserves variable value |
| **struct** | Structure | **switch** | Selection statement |
| **typedef** | Creates new type name | **union** | Union |
| **unsigned** | Unsigned modifier | **void** | Empty data type |
| **volatile** | Volatile modifier | **while** | Loop construct |

---

✅ Identifiers (User-Defined Names)
Names given to variables, functions, and arrays.

**Rules for Identifiers:**
1.  Can contain letters (A-Z, a-z), digits (0-9), and underscore (\_\).
2.  **Must start** with a letter or underscore. (Cannot start with a digit).
3.  **Case-sensitive** (\`age\` and \`Age\` are different).
4.  No special symbols (@, $, %) or spaces allowed.

**Valid**: \`myVar\`, \`_score\`, \`player1\`
**Invalid**: \`1player\` (starts with digit), \`my-var\` (hyphen not allowed).

---

💻 Try It Yourself
\`\`\`c
#include <stdio.h>

int main() {
    // using keywords (int, return, sizeof)
    int age = 25;
    printf("Size of int: %zu bytes\\n", sizeof(int));
    return 0;
}
\`\`\`
`
                    },
                    {
                        id: 'c-1-9', title: "Variables", type: "video", duration: "40m", videoUrl: "https://www.youtube.com/watch?v=JY6hceY5t58",
                        content: `# 🟢 Topic 9: Variables
✅ What is a Variable?
A **Variable** is a named storage location in memory used to hold a value that can change during execution.

---

🧩 Syntax
\`datatype variable_name = value;\`

### Declaration vs Initialization
*   **Declaration**: \`int marks;\` (Allocates memory, garbage value).
*   **Initialization**: \`marks = 95;\` (Assigns value).
*   **Both**: \`int marks = 95;\`

---

🧠 Types of Variables (Scope)
1.  **Local Variables**: Inside a function/block. Created when entered, destroyed when exited.
2.  **Global Variables**: Outside all functions. Accessible everywhere. Alive for whole program.

---

💻 Example: Local vs Global Variables
\`\`\`c
#include <stdio.h>

int globalVar = 100; // Global Variable

void function() {
    int localVar = 10; // Local Variable
    printf("Local: %d, Global: %d\\n", localVar, globalVar);
}

int main() {
    function();
    // printf("%d", localVar); // Error! localVar not accessible here
    return 0;
}
\`\`\`

---

⭐ Key Takeaway
Variables store data. Local variables are temporary; global variables last forever (in the program).
`
                    },
                    // --- QUIZ 1.3 (Topics 7-9) ---
                    {
                        id: 'c-quiz-1-3',
                        title: "📝 Quiz 3: Basics & Variables (Topics 7-9)",
                        type: "quiz",
                        questions: [
                            { question: "What does <stdio.h> stand for?", options: ["Studio Header", "Standard Input Output", "System Input Output", "Standard Integer"], correct: 1 },
                            { question: "Which function is used to print output?", options: ["scan()", "print()", "printf()", "write()"], correct: 2 },
                            { question: "What breaks a line in C string?", options: ["/n", "\\n", "\\l", "\\end"], correct: 1 },
                            { question: "How many keywords are in standard C?", options: ["25", "32", "50", "100"], correct: 1 },
                            { question: "Which IS a valid variable name?", options: ["2ndPlayer", "vol-ume", "_total", "float"], correct: 2 },
                            { question: "Can a keyword be used as a variable name?", options: ["Yes", "No", "Sometimes", "Only main"], correct: 1 },
                            { question: "What is a 'Global' variable?", options: ["Accessible only in main", "Accessible everywhere", "Accessible in 2 files", "A const variable"], correct: 1 },
                            { question: "int x = 5; is examples of?", options: ["Declaration", "Initialization", "Both", "None"], correct: 2 },
                            { question: "What is the correct return type of main()?", options: ["void", "int", "float", "char"], correct: 1 },
                            { question: "Are variable names case-sensitive?", options: ["Yes", "No", "Only if global", "Only if valid"], correct: 0 }
                        ]
                    },

                    // --- BATCH 4: Topics 10-12 ---
                    {
                        id: 'c-1-10', title: "Data Types", type: "video", duration: "45m", videoUrl: "https://www.youtube.com/watch?v=KzWzXJ3K2YI",
                        content: `# 🟢 Topic 10: Data Types
✅ What are Data Types?
Data types define the type and size of data associated with variables.

---

📋 Primary Data Types
| Type | Size (Bytes) | Format Specifier | Range |
| :--- | :---: | :---: | :--- |
| **int** | 2 or 4 | %d | -32,768 to 32,767 |
| **float** | 4 | %f | 6 decimal places |
| **double** | 8 | %lf | 15 decimal places |
| **char** | 1 | %c | -128 to 127 |

---

🧠 The Void Type
*   **void**: Represents "nothing". Used for functions that return no value.

---

💻 Example Code
\`\`\`c
#include <stdio.h>

int main() {
    int a = 10;
    float b = 5.5;
    char c = 'A';
    double d = 3.14159;

    printf("Integer: %d\\n", a);
    printf("Float: %f\\n", b);
    printf("Char: %c\\n", c);
    printf("Double: %lf\\n", d);

    return 0;
}
\`\`\`
`
                    },
                    {
                        id: 'c-1-11', title: "Constants", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=0b9Qp9U1X9A",
                        content: `# 🟢 Topic 11: Constants
✅ What is a Constant?
Constants are fixed values that do not change during execution.

---

🧠 Ways to Define
1.  **Using 'const' keyword**:
    \`\`\`c
    const float PI = 3.14;
    // PI = 3.15; // Error!
    \`\`\`

2.  **Using '#define' preprocessor**:
    \`\`\`c
    #define MAX_SCORE 100
    \`\`\`

---

📋 Types of Literals
*   **Integer**: \`10\`, \`-5\`, \`07\` (Octal), \`0xF\` (Hex)
*   **Floating point**: \`10.5\`, \`2.3e5\`
*   **Character**: \`'A'\`, \`'\\n'\`
*   **String**: \`"Hello"\`
`
                    },
                    {
                        id: 'c-1-12', title: "Input & Output", type: "video", duration: "45m", videoUrl: "https://www.youtube.com/watch?v=KJgsSFOSQv0&t=1800s",
                        content: `# 🟢 Topic 12: Input & Output
✅ Standard I/O
C uses the standard library \`stdio.h\` for I/O operations.

---

📤 Output: printf()
Prints formatted output to the console.
\`\`\`c
int age = 20;
printf("I am %d years old", age);
\`\`\`

---

📥 Input: scanf()
Reads formatted input from the keyboard.
**Important**: Use \`&\` (address-of operator) for non-string variables.
\`\`\`c
int x;
printf("Enter number: ");
scanf("%d", &x);
\`\`\`

---

📋 Common Format Specifiers
*   \`%d\`: Integer
*   \`%f\`: Float
*   \`%c\`: Character
*   \`%s\`: String
*   \`%lf\`: Double
`
                    },
                    // --- QUIZ 1.4 (Topics 10-12) ---
                    {
                        id: 'c-quiz-1-4',
                        title: "📝 Quiz 4: Data & I/O (Topics 10-12)",
                        type: "quiz",
                        questions: [
                            { question: "Size of float in bytes?", options: ["2", "4", "8", "1"], correct: 1 },
                            { question: "Format specifier for integer?", options: ["%c", "%f", "%d", "%s"], correct: 2 },
                            { question: "Which is a valid character constant?", options: ["\"A\"", "'A'", "A", "65"], correct: 1 },
                            { question: "Keyword to define constant variable?", options: ["static", "const", "fixed", "final"], correct: 1 },
                            { question: "What does `void` mean?", options: ["Zero", "No value", "Empty space", "Null pointer"], correct: 1 },
                            { question: "Which function takes input?", options: ["printf", "scanf", "input", "cin"], correct: 1 },
                            { question: "Why do we use '&' in scanf?", options: ["Formatting", "Syntax rule", "To pass address", "Not needed"], correct: 2 },
                            { question: "What is 0x1A?", options: ["Decimal", "Octal", "Hexadecimal", "Error"], correct: 2 },
                            { question: "Difference between float and double?", options: ["None", "Double has more precision", "Float is bigger", "Double is integer"], correct: 1 },
                            { question: "Can we change a const value?", options: ["Yes", "No", "Only via pointer", "Only in main"], correct: 1 }
                        ]
                    }
                ]
            },

            // ===================================
            // PHASE 2: LOGIC BUILDING
            // ===================================
            // ===================================
            // PHASE 2: LOGIC BUILDING
            // ===================================
            {
                id: 2,
                title: "Phase 2: Logic Building",
                topics: [
                    // --- BATCH 1: Topics 1-3 ---
                    {
                        id: 'c-2-1', title: "Operators", type: "video", duration: "50m", videoUrl: "https://www.youtube.com/watch?v=HjQ7x1zYj0E",
                        content: `# 🟢 Topic 13: Operators in C
✅ What are Operators?
Operators are symbols that tell the compiler to perform specific mathematical or logical manipulations.

---

1️⃣ Arithmetic Operators
Used for mathematical calculations.
*   \`+\` (Addition), \`-\` (Subtraction), \`*\` (Multiplication), \`/\` (Division)
*   \`%\` (Modulus): Returns the remainder.

💻 Example Code
\`\`\`c
int a = 10, b = 3;
printf("Sum: %d", a + b); // 13
printf("Modulus: %d", a % b); // 1
\`\`\`

---

2️⃣ Relational Operators (Comparison)
Used to compare two values. Returns \`1\` (True) or \`0\` (False).
*   \`==\` (Equal), \`!=\` (Not Equal)
*   \`>\` (Greater), \`<\` (Less), \`>=\`, \`<=\`

💻 Example Code
\`\`\`c
int a = 5, b = 10;
printf("%d", a > b); // 0 (False)
printf("%d", a != b); // 1 (True)
\`\`\`

---

3️⃣ Logical Operators
Used to combine multiple conditions.
*   \`&&\` (**AND**): True if both are true.
*   \`||\` (**OR**): True if at least one is true.
*   \`!\` (**NOT**): Reverses the state.

💻 Example Code
\`\`\`c
int a = 5;
// True because a is > 0 AND a is < 10
printf("%d", (a > 0 && a < 10)); // 1
\`\`\`

---

4️⃣ Increment/Decrement
*   \`++\`: Increases value by 1.
*   \`--\`: Decreases value by 1.

💻 Example Code
\`\`\`c
int x = 10;
x++; // x becomes 11
printf("%d", x);
\`\`\`

---

💻 Try It Yourself
\`\`\`c
#include <stdio.h>
int main() {
    int a = 10, b = 20;
    if (a < b && b > 15) {
        printf("Conditions met!");
    }
    return 0;
}
\`\`\`
`
                    },
                    {
                        id: 'c-2-2', title: "If / Else Statements", type: "video", duration: "55m", videoUrl: "https://www.youtube.com/watch?v=J4lJ8sYzGgE",
                        content: `# 🟢 Topic 14: If-Else Statements
✅ Making Decisions
Conditional statements allow the program to make decisions and execute code based on whether a condition is true or false.

---

1️⃣ Simple If
Executes code only if the condition is true.

💻 Syntax
\`\`\`c
if (condition) {
    // code
}
\`\`\`

💻 Example Code
\`\`\`c
if (age > 18) {
    printf("Can Vote");
}
\`\`\`

---

2️⃣ If-Else
Executes one block if true, another if false.

💻 Syntax
\`\`\`c
if (condition) {
    // true code
} else {
    // false code
}
\`\`\`

💻 Example Code
\`\`\`c
if (number % 2 == 0) {
    printf("Even");
} else {
    printf("Odd");
}
\`\`\`

---

3️⃣ Else-If Ladder
Checks multiple variables/conditions.

💻 Syntax
\`\`\`c
if (cond1) {
    // code
} else if (cond2) {
    // code
} else {
    // default code
}
\`\`\`

💻 Example Code
\`\`\`c
if (marks >= 90) {
    printf("Grade A");
} else if (marks >= 80) {
    printf("Grade B");
} else {
    printf("Grade C");
}
\`\`\`

---

4️⃣ Nested If
**Definition**: An \`if\` statement inside another \`if\` statement.
**Explanation**: Checks secondary conditions only if the primary condition is true.
**Purpose**: For complex logic with dependent conditions.

💻 Syntax
\`\`\`c
if (condition1) {
    if (condition2) {
        // checks cond2 only if cond1 is true
    }
}
\`\`\`

💻 Example Code
\`\`\`c
int age = 20, hasID = 1;

if (age >= 18) {
    if (hasID) {
        printf("Welcome!");
    } else {
        printf("ID Required.");
    }
} else {
    printf("Underage.");
}
\`\`\`
`
                    },
                    {
                        id: 'c-2-3', title: "Switch Case", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=J4lJ8sYzGgE&t=1500s",
                        content: `# 🟡 Topic 15: Switch Statement
✅ What is Switch?
The switch statement is an alternative to long if-else-if ladders. It allows a variable to be tested for equality against a list of values (cases).

---

🧩 Syntax
\`\`\`c
switch(expression) {
    case constant1:
        // code
        break;
    case constant2:
        // code
        break;
    default:
        // default code if no case matches
}
\`\`\`

---

🧠 Important Rules
1.  Expression must calculate to an **integer** or **character**.
2.  **break** is important! Without it, the program continues to the next case (fall-through).
3.  **default** is optional but recommended.

💻 Example Code
\`\`\`c
int day = 3;
switch(day) {
    case 1:
        printf("Monday");
        break;
    case 2:
        printf("Tuesday");
        break;
    case 3:
        printf("Wednesday");
        break;
    default:
        printf("Other Day");
}
\`\`\`
`
                    },
                    // --- QUIZ 2.1 (Topics 13-15) ---
                    {
                        id: 'c-quiz-2-1',
                        title: "📝 Quiz 5: Operators & Decisions (Topics 13-15)",
                        type: "quiz",
                        questions: [
                            { question: "What is the result of 10 % 3?", options: ["3", "1", "3.33", "0"], correct: 1 },
                            { question: "Which operator checks if two values are equal?", options: ["=", "==", "!=", "<>"], correct: 1 },
                            { question: "What happens if a switch case has no break?", options: ["Error", "Exits switch", "Executes next case (fallthrough)", "Nothing"], correct: 2 },
                            { question: "What is `!` operator?", options: ["OR", "AND", "NOT", "XOR"], correct: 2 },
                            { question: "Output of: if(0) printf('A'); else printf('B');?", options: ["A", "B", "AB", "Error"], correct: 1 },
                            { question: "Switch expression must be:", options: ["Float", "Integer or Char", "String", "Double"], correct: 1 },
                            { question: "Logical AND `&&` returns true if:", options: ["One is true", "Both are true", "None are true", "Both false"], correct: 1 },
                            { question: "Operator `a++` is:", options: ["Pre-increment", "Post-increment", "Decrement", "Add 2"], correct: 1 },
                            { question: "Can we switch on a float value?", options: ["Yes", "No", "Sometimes", "Only main"], correct: 1 },
                            { question: "Does `else` require a condition?", options: ["Yes", "No", "Depends", "Always"], correct: 1 }
                        ]
                    },

                    // --- BATCH 2: Topics 4-5 (Topics 16-17) ---
                    {
                        id: 'c-2-4', title: "Loops (For, While, Do-While)", type: "video", duration: "45m", videoUrl: "https://www.youtube.com/watch?v=0ZB2w4xW6iI",
                        content: `# 🟢 Topic 16: Loops
✅ Iteration Basics
Loops are used to repeat a block of code multiple times.

---

1️⃣ For Loop
Best when you know exactly how many times to loop.

🧩 Syntax
\`\`\`c
for (initialization; condition; update) {
    // code
}
\`\`\`

💻 Example Code
\`\`\`c
// Print 0 to 4
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
\`\`\`

---

2️⃣ While Loop
Best when you don't know the iterations, only the condition.

🧩 Syntax
\`\`\`c
while (condition) {
    // code
}
\`\`\`

💻 Example Code
\`\`\`c
int i = 0;
while (i < 5) {
    printf("%d ", i);
    i++;
}
\`\`\`

---

3️⃣ Do-While Loop
Guaranteed to run **at least once**, even if false.

🧩 Syntax
\`\`\`c
do {
    // code
} while (condition);
\`\`\`

💻 Example Code
\`\`\`c
int i = 10;
do {
    printf("Runs once");
} while (i < 5);
\`\`\`

---

4️⃣ Nested Loops
**Definition**: A loop inside another loop.
**Explanation**: The inner loop runs typically for every iteration of the outer loop.
**Purpose**: Used for multi-dimensional data (matrices) or patterns.

🧩 Syntax
\`\`\`c
for (init; cond; inc) {
    for (init; cond; inc) {
        // Inner Loop
    }
}
\`\`\`

💻 Example Code
\`\`\`c
// Prints matrix 2x3
for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 3; j++) {
        printf("* ");
    }
    printf("\\n");
}
\`\`\`
`
                    },
                    {
                        id: 'c-2-5', title: "Break & Continue", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=0ZB2w4xW6iI&t=1200s",
                        content: `# 🟡 Topic 17: Control Flow
✅ Break & Continue

---

1️⃣ Break
Terminates the loop (or switch) immediately.
\`\`\`c
for(int i=0; i<10; i++) {
    if (i == 5) break; // Stops loop when i is 5
    printf("%d", i);
}
// Output: 01234
\`\`\`

---

2️⃣ Continue
Skips the **current iteration** and jumps to the next one.
\`\`\`c
for(int i=0; i<5; i++) {
    if (i == 2) continue; // Skips 2
    printf("%d", i);
}
// Output: 0134
\`\`\`
`
                    },
                    // --- QUIZ 2.2 (Topics 16-17) ---
                    {
                        id: 'c-quiz-2-2',
                        title: "📝 Quiz 6: Loops & Control (Topics 16-17)",
                        type: "quiz",
                        questions: [
                            { question: "Which loop guarantees at least one execution?", options: ["for", "while", "do-while", "foreach"], correct: 2 },
                            { question: "Which statement skips the current iteration?", options: ["break", "exit", "continue", "pass"], correct: 2 },
                            { question: "What happens if loop condition is always true?", options: ["Syntax Error", "Infinite Loop", "Stops automatically", "Runs once"], correct: 1 },
                            { question: "Syntax for `for` loop?", options: ["(init; cond; inc)", "(cond; init; inc)", "(inc; cond; init)", "None"], correct: 0 },
                            { question: "Difference between `break` and `exit`?", options: ["None", "Break exits loop, Exit ends program", "Exit exits loop", "Break ends program"], correct: 1 },
                            { question: "Can we nest loops?", options: ["Yes", "No", "Only 2 levels", "Only while"], correct: 0 },
                            { question: "What is `i++` equivalent to?", options: ["i = i + 1", "i = i + 2", "i = 1", "i--"], correct: 0 },
                            { question: "When to use `while` vs `for`?", options: ["Always while", "Always for", "For when iterations known, While when unknown", "Reverse"], correct: 2 },
                            { question: "Output of for(;;)?", options: ["Error", "Infinite Loop", "Runs once", "Nothing"], correct: 1 },
                            { question: "Does `continue` work in switch?", options: ["Yes", "No", "Sometimes", "Only main"], correct: 1 }
                        ]
                    }
                ]
            },

            // ===================================
            // PHASE 3: CORE C
            // ===================================
            {
                id: 3,
                title: "Phase 3: Core C",
                topics: [
                    // --- BATCH 1: Topics 1-3 ---
                    {
                        id: 'c-3-1', title: "Functions", type: "video", duration: "55m", videoUrl: "https://www.youtube.com/watch?v=7WjC0V7RZ5A",
                        content: `# 🟢 Topic 24: Functions
✅ What are Functions?
Functions are blocks of code that perform specific tasks and can be reused.

---

🧩 Syntax
\`\`\`c
return_type function_name(parameters) {
    // code
    return value;
}
\`\`\`

---

📋 Types of Functions
1.  **Library Functions**: Pre-defined in C (e.g., \`printf\`, \`scanf\`).
2.  **User-Defined Functions**: Created by you.

💻 Example Code
\`\`\`c
int add(int a, int b) {
    return a + b;
}

int main() {
    int sum = add(5, 10);
    printf("Sum: %d", sum);
    return 0;
}
\`\`\`
`
                    },
                    {
                        id: 'c-3-2', title: "Recursion", type: "video", duration: "40m", videoUrl: "https://www.youtube.com/watch?v=kepBg1d6sO0",
                        content: `# 🟢 Recursion
✅ What is Recursion?
A process where a function calls itself directly or indirectly.

---

🧩 Syntax
\`\`\`c
void recursiveFunction() {
    if (base_condition) return;
    recursiveFunction(); // Calls itself
}
\`\`\`

---

💻 Example: Factorial
\`\`\`c
int fact(int n) {
    if (n == 0) return 1;
    return n * fact(n-1);
}
\`\`\`

🧠 Base Case
Essential to stop infinite recursion (stack overflow).
`
                    },
                    {
                        id: 'c-3-3', title: "Arrays (1D, 2D)", type: "video", duration: "50m", videoUrl: "https://www.youtube.com/watch?v=9WkKpXJ7YxE",
                        content: `# 🟢 Topic 25: Arrays
✅ What is an Array?
An array is a collection of items stored at contiguous memory locations.

---

🧩 Syntax
\`\`\`c
type arrayName[arraySize];
\`\`\`

---

📋 Declaration
\`\`\`c
int arr[5]; // Stores 5 integers
int matrix[3][3]; // 2D Array
\`\`\`

💻 Initializing
\`\`\`c
int nums[] = {1, 2, 3, 4, 5};
\`\`\`
`
                    },
                    // --- QUIZ 3.1 (Topics 24-25) ---
                    {
                        id: 'c-quiz-3-1',
                        title: "📝 Quiz 7: Functions & Arrays (Topics 24-25)",
                        type: "quiz",
                        questions: [
                            { question: "What is a function in C?", options: ["Variable", "Loop", "Block of reusable code", "Library"], correct: 2 },
                            { question: "Recursion is:", options: ["Loop inside loop", "Function calling itself", "Function calling main", "Error"], correct: 1 },
                            { question: "Array index starts at?", options: ["1", "0", "-1", "Depends"], correct: 1 },
                            { question: "Correct array declaration?", options: ["arr{5}", "arr[5]", "arr(5)", "arr<5>"], correct: 1 },
                            { question: "What is a Base Case?", options: ["Starting point", "Stopping condition for recursion", "Main function", "Error case"], correct: 1 },
                            { question: "Can we return multiple values from C function?", options: ["Yes", "No", "Only via pointers", "Only via structs"], correct: 2 },
                            { question: "void function returns?", options: ["int", "char", "Nothing", "0"], correct: 2 },
                            { question: "2D array is like a?", options: ["Line", "Matrix/Table", "Tree", "Graph"], correct: 1 },
                            { question: "Elements in array are stored...", options: ["Randomly", "Sequentially", "In reverse", "Linked"], correct: 1 },
                            { question: "Max index of int arr[5]?", options: ["5", "4", "6", "0"], correct: 1 }
                        ]
                    },

                    // --- BATCH 2: Topics 4-6 ---
                    {
                        id: 'c-3-4', title: "Strings", type: "video", duration: "45m", videoUrl: "https://www.youtube.com/watch?v=Yl7y8tF0p4Y",
                        content: `# 🟢 Topic 26: Strings
✅ What is a String?
In C, a string is a 1D array of characters terminated by a **Null Character** (\`\\0\`).
\`\`\`c
char name[] = "Hello";
\`\`\`

---

🧩 Syntax
\`\`\`c
char stringName[] = "string content";
// OR
char stringName[size];
\`\`\`

---

📋 String Functions (<string.h>)
*   \`strlen(s)\`: Length of string.
*   \`strcpy(d, s)\`: Copy string.
*   \`strcat(d, s)\`: Concatenate strings.
*   \`strcmp(s1, s2)\`: Compare strings.
`
                    },
                    {
                        id: 'c-3-5', title: "Pointers (Basic)", type: "video", duration: "60m", videoUrl: "https://www.youtube.com/watch?v=zuegQmMdy8M",
                        content: `# 🟢 Topic 27: Pointers
✅ What is a Pointer?
A pointer is a variable that stores the memory address of another variable.

---

🧩 Syntax
\`\`\`c
int x = 10;
int *p = &x; // p holds address of x
\`\`\`

---

🧠 Operators
*   \`&\` (Address of): Returns memory address.
*   \`*\` (Value at): De-references pointer to get value.

💻 Example Code
\`\`\`c
int x = 10;
int *p = &x;
printf("Value: %d", *p); // 10
printf("Address: %p", p);
\`\`\`
`
                    },
                    {
                        id: 'c-3-6', title: "Pointer + Array/Function", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=RT-2D11cWAE",
                        content: `# 🟢 Advanced Pointers

---

🧠 Pointers & Arrays
Array name acts as a pointer to the first element.

🧩 Syntax
\`\`\`c
int *ptr = arrayName;
\`\`\`

💻 Example Code
\`\`\`c
int arr[] = {10, 20};
int *p = arr;
printf("%d", *p); // 10
\`\`\`

---

🧠 Call by Reference (Pointers & Functions)
Passing addresses to functions allows modifying original variables.

🧩 Syntax
\`\`\`c
void function(int *ptr) {
    *ptr = value;
}
\`\`\`

💻 Example Code
\`\`\`c
void increment(int *n) {
    (*n)++;
}
int main() {
    int val = 5;
    increment(&val);
    printf("%d", val); // 6
    return 0;
}
\`\`\`
`
                    },
                    // --- QUIZ 3.2 (Topics 26-27 Advanced) ---
                    {
                        id: 'c-quiz-3-2',
                        title: "📝 Quiz 8: Pointers & Strings (Topics 26-27)",
                        type: "quiz",
                        questions: [
                            { question: "String ends with which character?", options: ["\\n", "\\t", "\\0", "EOF"], correct: 2 },
                            { question: "What does `strlen` return?", options: ["String content", "String length", "String size in bytes", "Address"], correct: 1 },
                            { question: "Symbol for pointer declaration?", options: ["&", "*", "#", "@"], correct: 1 },
                            { question: "What does `&` operator do?", options: ["Get value", "Get address", "Multiply", "Divide"], correct: 1 },
                            { question: "Can pointers store address of void?", options: ["Yes (void*)", "No", "Only int", "Only char"], correct: 0 },
                            { question: "If int* p, what is p+1?", options: ["Adds 1 to value", "Next integer address (4 bytes away)", "Random address", "Error"], correct: 1 },
                            { question: "Array name matches pointer to?", options: ["Last element", "First element", "Middle element", "Null"], correct: 1 },
                            { question: "Result of dereferencing NULL pointer?", options: ["0", "Crash (Segfault)", "Nothing", "1"], correct: 1 },
                            { question: "Why pass by reference?", options: ["Modify original", "Save memory", "Both", "None"], correct: 2 },
                            { question: "`strcmp` returns 0 if strings are?", options: ["Different", "Equal", "Null", "Empty"], correct: 1 }
                        ]
                    }
                ]
            },

            // ===================================
            // PHASE 4: ADVANCED C
            // ===================================
            {
                id: 4,
                title: "Phase 4: Advanced C",
                topics: [
                    // --- BATCH 1: Topics 1-3 ---
                    {
                        id: 'c-4-1', title: "Structures", type: "video", duration: "45m", videoUrl: "https://www.youtube.com/watch?v=3Yy7J0ZC6G4",
                        content: `# 🟢 Topic 28: Structures in C
✅ What is a Structure? (Very Simple)

A structure is a user-defined data type that allows us to store different types of data together.

👉 Unlike arrays, structures can store different data types.

🧠 Simple Meaning

Think of a structure like:

A student record

Student has:
* Roll number (int)
* Name (string)
* Marks (float)

All belong to one student.

🧩 Why Do We Need Structures?

Structures help us:
* Group related data
* Represent real-world entities
* Write clean and organized code

🧠 Declaring a Structure
### Syntax:
\`\`\`c
struct Student {
    int roll;
    char name[20];
    float marks;
};
\`\`\`

🧠 Creating Structure Variables
\`\`\`c
struct Student s1;
\`\`\`

🧠 Initializing a Structure
\`\`\`c
struct Student s1 = {1, "Balaji", 85.5};
\`\`\`

🧠 Accessing Structure Members

Use dot ( . ) operator.
* s1.roll
* s1.name
* s1.marks

🧠 Example Program
\`\`\`c
#include <stdio.h>

struct Student {
    int roll;
    char name[20];
    float marks;
};

int main() {
    struct Student s1 = {1, "Balaji", 90.5};
    printf("%d %s %.2f", s1.roll, s1.name, s1.marks);
    return 0;
}
\`\`\`

🟢 Array of Structures

Used to store multiple records.
\`\`\`c
struct Student s[3];
\`\`\`

🟢 Nested Structures

Structure inside another structure.

🟢 Passing Structure to Function
* Pass by value
* Pass by reference (using pointers)

🧠 Structure vs Array
| Structure | Array |
| :--- | :--- |
| Different data types | Same data type |
| Uses dot operator | Uses index |
| Real-world data | List of values |

🧠 Real-Life Example

Think of a structure like:
* Aadhaar card data
* Employee record
* Book details

❌ Common Beginner Mistakes
* Forgetting struct keyword
* Wrong member access
* Not allocating enough space for strings

⭐ Key Points to Remember
* Structure groups different data types
* User-defined data type
* Access members using dot operator
* Useful for real-world data
* Better than arrays for records
`
                    },
                    {
                        id: 'c-4-2', title: "Unions", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=6pZC8r3Yg7k",
                        content: `# 🟢 Topic 29: Unions in C
✅ What is a Union? (Very Simple)

A union is a user-defined data type that allows different data types to share the same memory location.

👉 Only one member can store a value at a time.

🧠 Simple Meaning

Think of a union like one box that can hold:
* a book or
* a pen or
* a phone

But only one item at a time.

🧩 Why Do We Need Unions?

Unions are used to:
* Save memory
* Handle multiple data types efficiently
* Work with low-level programming

🧠 Declaring a Union
### Syntax:
\`\`\`c
union Data {
    int i;
    float f;
    char c;
};
\`\`\`

🧠 Creating a Union Variable
\`\`\`c
union Data d1;
\`\`\`

🧠 Assigning Values to Union Members
\`\`\`c
d1.i = 10;
\`\`\`

⚠️ If you now assign another member:
\`\`\`c
d1.f = 3.14;
\`\`\`

👉 The previous value (i) is lost.

🧠 Example Program
\`\`\`c
#include <stdio.h>

union Data {
    int i;
    float f;
};

int main() {
    union Data d;
    d.i = 10;
    printf("i = %d\\n", d.i);

    d.f = 3.5;
    printf("f = %.2f\\n", d.f);

    return 0;
}
\`\`\`

🧠 Memory Allocation in Union

Union uses memory equal to the largest member.

Example:
\`\`\`c
union Data {
    int i;      // 4 bytes
    double d;   // 8 bytes
};
\`\`\`

👉 Union size = 8 bytes

🧩 Difference Between Structure & Union
| Structure | Union |
| :--- | :--- |
| Each member has separate memory | Members share memory |
| All values stored at once | Only one value at a time |
| Uses more memory | Uses less memory |
| Safer | Risky if misused |

🧠 Real-Life Example

Think of:
* Structure → suitcase with many compartments
* Union → single compartment suitcase

❌ Common Beginner Mistakes
* Trying to use multiple members at once
* Forgetting that data gets overwritten
* Confusing union with structure

⭐ Key Points to Remember
* Union shares memory
* Only one member active at a time
* Saves memory
* Size = largest data member
* Useful in system programming
`
                    },
                    {
                        id: 'c-4-3', title: "Enum & Typedef", type: "video", duration: "35m", videoUrl: "https://www.youtube.com/watch?v=R4xJmZp5nFQ",
                        content: `# 🟢 Topic 30: Enumerations (enum) in C
✅ What is an Enumeration (enum)? (Very Simple)

An enumeration is a user-defined data type used to create a list of named integer constants.

👉 Instead of using numbers directly, we use meaningful names.

🧠 Simple Meaning

Think of enum like giving names to numbers.

Instead of:
\`day = 1;\`

We write:
\`day = MONDAY;\`

This makes the program easy to read and understand.

🧩 Why Do We Need enum?

We use enum to:
* Improve code readability
* Avoid using magic numbers
* Reduce errors
* Represent fixed choices

🧠 Declaring an Enum
### Syntax:
\`\`\`c
enum Day {
    MONDAY,
    TUESDAY,
    WEDNESDAY
};
\`\`\`

By default:
* MONDAY = 0
* TUESDAY = 1
* WEDNESDAY = 2

🧠 Creating an Enum Variable
\`\`\`c
enum Day today;
\`\`\`

🧠 Assigning Enum Values
\`\`\`c
today = MONDAY;
\`\`\`

🧠 Example Program
\`\`\`c
#include <stdio.h>

enum Day {MONDAY, TUESDAY, WEDNESDAY};

int main() {
    enum Day today = TUESDAY;

    if (today == TUESDAY) {
        printf("Today is Tuesday");
    }

    return 0;
}
\`\`\`

🟢 Assigning Custom Values

You can assign values manually.
\`\`\`c
enum Level {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
};
\`\`\`

🧠 Enum with Switch Statement

Enums work very well with switch.
\`\`\`c
switch(level) {
    case LOW:
        printf("Low level");
        break;
}
\`\`\`

🧠 Difference: enum vs #define
| enum | #define |
| :--- | :--- |
| Has type | No type |
| Debug-friendly | Not debug-friendly |
| Safer | Less safe |

🧠 Real-Life Example

Think of enum like:
Traffic light colors
* RED
* YELLOW
* GREEN

Each has a fixed meaning.

❌ Common Beginner Mistakes
* Thinking enum stores text
* Using duplicate values unknowingly
* Confusing enum with array

⭐ Key Points to Remember
* enum creates named constants
* Values are integers
* Improves readability
* Useful with switch
* Safer than #define
`
                    },

                    // --- QUIZ 4.1 ---
                    {
                        id: 'c-quiz-4-1',
                        title: "📝 Quiz 9: Structs & Unions (Topics 1-3)",
                        type: "quiz",
                        questions: [
                            { question: "Keyword for structure?", options: ["struct", "structure", "class", "obj"], correct: 0 },
                            { question: "Size of union is?", options: ["Sum of members", "Largest member", "Smallest member", "Zero"], correct: 1 },
                            { question: "Access struct member using?", options: [".", "->", "Both", "None"], correct: 2 },
                            { question: "What is enum used for?", options: ["String constants", "Named Integers", "Float constants", "Loops"], correct: 1 },
                            { question: "Can structs be nested?", options: ["Yes", "No", "Only if same type", "Never"], correct: 0 },
                            { question: "Difference between struct and union?", options: ["None", "Memory allocation", "Name only", "Syntax only"], correct: 1 },
                            { question: "typedef is used to...", options: ["Create new types", "Alias existing types", "Define macros", "None"], correct: 1 },
                            { question: "Can we have an array of structs?", options: ["Yes", "No", "Only in C++", "Only pointers"], correct: 0 },
                            { question: "Default visibility of members?", options: ["Public", "Private", "Protected", "None"], correct: 0 },
                            { question: "Size of empty struct (GCC)?", options: ["0", "1 byte", "Error", "4 bytes"], correct: 0 }
                        ]
                    },

                    // --- BATCH 2: Topics 31-34 ---
                    {
                        id: 'c-4-5', title: "File Handling", type: "video", duration: "60m", videoUrl: "https://www.youtube.com/watch?v=9d8vYc7y7hA",
                        content: `# 🟢 Topic 31: File Handling in C
✅ What is File Handling? (Very Simple)

File handling is used to:
👉 store data permanently in files

Normally:
* Variables store data temporarily (RAM)
* Files store data permanently (hard disk)

🧠 Simple Meaning

Think of:
* Variables → writing on a whiteboard
* Files → writing in a notebook

Whiteboard data is lost, notebook data stays.

🧩 Why Do We Need File Handling?

We need file handling to:
* Save data permanently
* Read stored data later
* Store large data
* Work with databases

🧠 What is a File?

A file is a collection of data stored on disk.
Examples:
* .txt file
* .dat file

🧩 File Pointer

In C, files are handled using FILE pointer.
\`FILE *fp;\`

This pointer points to the file.

🧠 Opening a File – fopen()
Syntax:
\`fp = fopen("file.txt", "mode");\`

File Opening Modes
| Mode | Meaning |
| :--- | :--- |
| r | Read |
| w | Write |
| a | Append |
| r+ | Read & Write |
| w+ | Write & Read |

🧠 Closing a File – fclose()
\`fclose(fp);\`

Always close the file after use.

🧠 Writing to a File – fprintf()
\`fprintf(fp, "Hello File");\`

🧠 Reading from a File – fscanf()
\`fscanf(fp, "%s", str);\`

🧠 Character File Functions
* fgetc() → read one character
* fputc() → write one character

🧠 String File Functions
* fgets() → read string
* fputs() → write string

🧠 Example Program (Write to File)
\`\`\`c
#include <stdio.h>

int main() {
    FILE *fp;
    fp = fopen("data.txt", "w");
    fprintf(fp, "Hello C File");
    fclose(fp);
    return 0;
}
\`\`\`

🧠 Random Access Files

Used to move file pointer.
* fseek() → move pointer
* ftell() → current position
* rewind() → go to beginning

🧠 Real-Life Example

Think of file handling like:
* Saving contacts in phone
* Opening notebook and writing

❌ Common Beginner Mistakes
* Forgetting to close file
* Wrong file mode
* File not found errors

⭐ Key Points to Remember
* Files store data permanently
* FILE pointer is required
* fopen opens file
* fclose closes file
* Many functions for read/write
`
                    },
                    {
                        id: 'c-4-pre', title: "Preprocessor Directives", type: "video", duration: "40m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 32: Preprocessor Directives in C
✅ What are Preprocessor Directives? (Very Simple)

Preprocessor directives are instructions given to the compiler before actual compilation starts.

👉 They begin with the symbol #.

🧠 Simple Meaning

Think of preprocessor directives like:
* Instructions to the compiler
* Given before cooking starts

🧩 Why Do We Need Preprocessor Directives?

They are used to:
* Include header files
* Define constants
* Control compilation
* Improve code reusability

🧠 Common Preprocessor Directives
🟢 1. #include
Used to include header files.
\`#include <stdio.h>\`

🟢 2. #define
Used to define macros or constants.
\`#define PI 3.14\`

🟢 3. Macros with Arguments
Macros can accept parameters.
\`#define SQUARE(x) (x*x)\`

🟢 4. Conditional Compilation
Used to compile code only if a condition is true.

🧠 #ifdef
\`\`\`c
#ifdef DEBUG
    printf("Debug mode");
#endif
\`\`\`

🧠 #ifndef
\`\`\`c
#ifndef PI
#define PI 3.14
#endif
\`\`\`

🧠 #if, #else, #endif
\`\`\`c
#if x > 0
    printf("Positive");
#else
    printf("Negative");
#endif
\`\`\`

🟢 5. #undef
Used to undefine a macro.
\`#undef PI\`

🧠 Example Program
\`\`\`c
#include <stdio.h>
#define MAX 10

int main() {
    printf("%d", MAX);
    return 0;
}
\`\`\`

🧠 Real-Life Example

Think of preprocessor like:
* Teacher giving instructions before exam starts

❌ Common Beginner Mistakes
* Forgetting #
* Misusing macros
* Overusing #define

⭐ Key Points to Remember
* Preprocessor runs before compilation
* Starts with #
* Used to include files and define macros
* Helps control compilation
* Makes code flexible
`
                    },
                    {
                        id: 'c-4-4', title: "Dynamic Memory (malloc)", type: "video", duration: "55m", videoUrl: "https://www.youtube.com/watch?v=8xZ8a2pKJvE",
                        content: `# 🟢 Topic 33: Dynamic Memory Allocation in C
✅ What is Dynamic Memory Allocation? (Very Simple)

Dynamic Memory Allocation means:
👉 allocating memory during program execution (runtime)

Memory is taken from heap, not from stack.

🧠 Simple Meaning

Think of memory like renting a room:
* Static memory → fixed room
* Dynamic memory → rent only when needed

🧩 Why Do We Need Dynamic Memory?

We need it to:
* Allocate memory at runtime
* Handle unknown data size
* Use memory efficiently
* Create flexible programs

🧠 Functions Used for Dynamic Memory

C provides 4 main functions (from stdlib.h):

🟢 1. malloc()
Allocates memory without initialization.

Syntax:
\`ptr = (type*) malloc(size);\`

Example:
\`int *p = (int*) malloc(5 * sizeof(int));\`

🟢 2. calloc()
Allocates memory and initializes to zero.

Example:
\`int *p = (int*) calloc(5, sizeof(int));\`

🟢 3. realloc()
Changes previously allocated memory size.

Example:
\`p = realloc(p, 10 * sizeof(int));\`

🟢 4. free()
Frees allocated memory.

\`free(p);\`

🧠 Example Program
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p;
    p = (int*) malloc(3 * sizeof(int));

    p[0] = 10;
    p[1] = 20;
    p[2] = 30;

    for(int i = 0; i < 3; i++)
        printf("%d ", p[i]);

    free(p);
    return 0;
}
\`\`\`

🧠 Heap vs Stack (Basic Idea)
| Heap | Stack |
| :--- | :--- |
| Dynamic memory | Static memory |
| Manual free | Auto free |
| Larger size | Smaller |

🧠 Memory Leaks

Occurs when:
* Memory allocated
* Memory not freed

👉 Leads to waste of memory.

🧠 Real-Life Example

Think of dynamic memory like:
* Renting extra chairs when guests come
* Returning chairs after party

❌ Common Beginner Mistakes
* Forgetting free()
* Accessing memory after free
* Allocating wrong size

⭐ Key Points to Remember
* Memory allocated at runtime
* Uses heap memory
* malloc, calloc, realloc, free
* Always free memory
* Avoid memory leaks
`
                    },
                    {
                        id: 'c-4-6', title: "Command Line Arguments", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=7YFZ9qK8gJ4",
                        content: `# 🟢 Topic 34: Command Line Arguments in C
✅ What are Command Line Arguments? (Very Simple)

Command line arguments are values passed to a program when the program starts running.

👉 Instead of entering input during program execution, we give input from the command line.

🧠 Simple Meaning

Think of:
* Ordering food online
* You give details before order starts

Same way:
* Program gets data before it starts

🧩 Why Do We Need Command Line Arguments?

They are used to:
* Pass input quickly
* Automate programs
* Run programs with different values
* Avoid repeated input

🧠 argc and argv

Command line arguments use two parameters in main():
\`int main(int argc, char *argv[])\`

🧠 argc
* Argument count
* Tells how many arguments are passed

🧠 argv
* Argument vector
* Array of strings
* Stores actual arguments

🧠 Example Program
\`\`\`c
#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("Total arguments: %d\\n", argc);

    for(int i = 0; i < argc; i++) {
        printf("%s\\n", argv[i]);
    }
    return 0;
}
\`\`\`

🧠 How to Run Program
\`program.exe Hello World\`

Output:
\`\`\`
Total arguments: 3
program.exe
Hello
World
\`\`\`

🧠 Important Points
* argv[0] → program name
* Arguments are strings
* Convert to int using atoi() if needed

🧠 Real-Life Example

Think of command line arguments like:
* Ticket details given before boarding

❌ Common Beginner Mistakes
* Forgetting arguments in main
* Assuming arguments are integers
* Accessing invalid index

⭐ Key Points to Remember
* Arguments passed at program start
* Uses argc and argv
* Arguments are strings
* Useful for automation
`
                    },
                    {
                        id: 'c-4-7', title: "Error Handling", type: "video", duration: "40m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 35: Error Handling in C
✅ What is Error Handling? (Very Simple)

Error handling means:
👉 finding, understanding, and fixing errors in a program

Errors stop the program from working correctly.

🧠 Simple Meaning

Think of errors like:
* Spelling mistakes in an exam
* Wrong calculation in maths

If errors are not fixed, result will be wrong.

🧩 Types of Errors in C

There are 3 main types of errors:
* Compile-time Errors
* Run-time Errors
* Logical Errors

🟢 1. Compile-time Errors
✅ What are Compile-time Errors?

Errors found while compiling the program.

🧠 Examples
* Missing semicolon ;
* Wrong syntax
* Undeclared variable

\`printf("Hello")   // ❌ missing ;\`

🧠 How to Fix?
* Read compiler error messages
* Fix syntax mistakes

🟢 2. Run-time Errors
✅ What are Run-time Errors?

Errors that occur while the program is running.

🧠 Examples
* Division by zero
* Accessing invalid memory
* File not found

\`int x = 10 / 0;   // ❌ runtime error\`

🧠 How to Fix?
* Check conditions
* Validate input
* Use proper logic

🟢 3. Logical Errors
✅ What are Logical Errors?

* Program runs
* No error shown
* Output is wrong

🧠 Example
\`printf("%d", 10 + 5 * 2);   // Expected 30 ❌, actual 20\`

🧩 errno and perror()

Used to display system error messages.

🧠 Example
\`perror("Error");\`

Displays reason for error.

🧠 Real-Life Example

Think of:
* Compile-time error → wrong grammar
* Run-time error → accident while driving
* Logical error → wrong route chosen

❌ Common Beginner Mistakes
* Ignoring compiler warnings
* Assuming program is correct
* Not testing output

⭐ Key Points to Remember
* Errors are common
* Fix compile-time errors first
* Run-time errors crash program
* Logical errors give wrong output
* Debugging is important
`
                    },
                    {
                        id: 'c-4-8', title: "Bit Manipulation", type: "video", duration: "45m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 36: Bit Manipulation in C
✅ What is Bit Manipulation? (Very Simple)

Bit manipulation means:
👉 working directly with bits (0 and 1) of a number.

Computers store all data in binary (0s and 1s).

🧠 Simple Meaning

Think of a number like a row of switches:
* ON → 1
* OFF → 0

Bit manipulation turns these switches ON or OFF.

🧩 Why Do We Use Bit Manipulation?

Bit manipulation is used to:
* Make programs faster
* Save memory
* Work with hardware
* Build embedded systems

🧠 Bitwise Operators in C
| Operator | Name |
| :--- | :--- |
| & | AND |
| | | OR |
| ^ | XOR |
| ~ | NOT |
| << | Left Shift |
| >> | Right Shift |

🟢 Bitwise AND (&)
Returns 1 only if both bits are 1.

### Syntax
\`result = a & b;\`

### Example
\`\`\`c
int a = 5, b = 3;
int result = a & b; // 1
\`\`\`

🟢 Bitwise OR (|)
Returns 1 if any bit is 1.

### Syntax
\`result = a | b;\`

### Example
\`\`\`c
int a = 5, b = 3;
int result = a | b; // 7
\`\`\`

🟢 Bitwise XOR (^)
Returns 1 if bits are different.

### Syntax
\`result = a ^ b;\`

### Example
\`\`\`c
int a = 5, b = 3;
int result = a ^ b; // 6
\`\`\`

🟢 Bitwise NOT (~)
Inverts all bits (0s become 1s, 1s become 0s).

### Syntax
\`result = ~a;\`

### Example
\`\`\`c
int a = 5;
int result = ~a; // -6
\`\`\`

🟢 Left Shift (<<)
Shifts bits to the left. Each shift multiplies by 2.

### Syntax
\`result = a << n;\`

### Example
\`\`\`c
int a = 5;
int result = a << 1; // 10
\`\`\`

🟢 Right Shift (>>)
Shifts bits to the right. Each shift divides by 2.

### Syntax
\`result = a >> n;\`

### Example
\`\`\`c
int a = 5;
int result = a >> 1; // 2
\`\`\`

🧠 Setting, Clearing, Toggling Bits
* Set bit → |
* Clear bit → &
* Toggle bit → ^

🧠 Real-Life Example

Think of bit manipulation like:
* Turning switches ON/OFF in an electrical board

❌ Common Beginner Mistakes
* Confusing logical and bitwise operators
* Not understanding binary numbers

⭐ Key Points to Remember
* Bit manipulation works on bits
* Uses bitwise operators
* Very fast and memory-efficient
* Used in embedded systems
`
                    },
                    {
                        id: 'c-4-9', title: "Advanced C Concepts", type: "video", duration: "60m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 37: Advanced C Concepts
✅ What are Advanced C Concepts? (Very Simple)

Advanced C concepts are features that give:
👉 more control over memory, performance, and program behavior

These are mostly used in:
* System programming
* Embedded systems
* Large projects
* Interviews

🧩 Topics Covered in Advanced C

We will understand these one by one:
* typedef
* volatile keyword
* const keyword (deep usage)
* Function Pointers
* Callback Functions
* Memory Alignment
* Segmentation Faults

🟢 1. typedef
✅ What is typedef?

typedef is used to:
👉 create a new name for an existing data type

🧠 Example
\`\`\`c
typedef int number;
number a = 10;
\`\`\`

Here:
number is another name for int

🧠 Why Use typedef?
* Makes code readable
* Shortens complex names

🟢 2. volatile Keyword
✅ What is volatile?

Tells the compiler:
👉 value of variable can change anytime

Used in:
* Embedded systems
* Hardware registers

🧠 Example
\`volatile int flag;\`

Compiler will not optimize this variable.

🟢 3. const Keyword (Deep Usage)
✅ What is const?

Makes a variable read-only.
\`const int x = 10;\`

🧠 const with Pointers
\`\`\`c
const int *p;   // value constant
int *const p;   // pointer constant
\`\`\`

🟢 4. Function Pointers
✅ What is a Function Pointer?

A pointer that stores the address of a function.

🧠 Example
\`\`\`c
int add(int a, int b) {
    return a + b;
}

int (*fp)(int, int) = add;
\`\`\`

Call function using pointer:
\`fp(2, 3);\`

🟢 5. Callback Functions
✅ What is a Callback Function?

A function passed as an argument to another function.

🧠 Example
\`\`\`c
void process(int (*func)(int, int)) {
    func(2, 3);
}
\`\`\`

🟢 6. Memory Alignment
✅ What is Memory Alignment?

How data is arranged in memory for faster access.

Improper alignment:
* Wastes memory
* Slows execution

🟢 7. Segmentation Faults
✅ What is a Segmentation Fault?

Occurs when:
* Program accesses invalid memory
* Pointer is used incorrectly

🧠 Example Cause
\`\`\`c
int *p;
*p = 10;   // ❌ segmentation fault
\`\`\`

🧠 Real-Life Example

Think of advanced C like:
* Driving a racing bike
* Fast but needs skill and control.

❌ Common Beginner Mistakes
* Using pointers carelessly
* Ignoring memory rules
* Misusing const and volatile

⭐ Key Points to Remember
* Advanced C gives more control
* typedef improves readability
* volatile avoids optimization
* Function pointers are powerful
* Wrong memory access causes crash
`
                    },
                    {
                        id: 'c-4-10', title: "C Standard Libraries", type: "video", duration: "45m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 38: C Standard Libraries
✅ What are C Standard Libraries? (Very Simple)

C standard libraries are collections of ready-made functions provided by C.

👉 Instead of writing everything from scratch, we use these libraries.

🧠 Simple Meaning

Think of standard libraries like:
* Toolkits
* Each toolkit has tools for a specific job

Example:
* Calculator tools
* Text tools
* Time tools

🧩 Why Do We Need Standard Libraries?

They help us:
* Save time
* Write less code
* Avoid errors
* Use tested and reliable functions

🧠 How to Use a Library?

We include it using:
\`#include <library_name.h>\`

🟢 Important C Standard Libraries
🧠 1. stdio.h (Standard Input Output)

Used for input and output operations.

Common functions:
* printf()
* scanf()
* getchar()
* putchar()

🧠 2. stdlib.h (Standard Library)

Used for:
* Dynamic memory
* Conversions
* Program control

Functions:
* malloc()
* calloc()
* free()
* exit()

🧠 3. string.h

Used for string operations.

Functions:
* strlen()
* strcpy()
* strcat()
* strcmp()

🧠 4. math.h

Used for mathematical calculations.

Functions:
* sqrt()
* pow()
* sin()
* cos()

⚠️ Compile with -lm in some compilers.

🧠 5. ctype.h

Used for character handling.

Functions:
* isalpha()
* isdigit()
* islower()
* toupper()

🧠 6. time.h

Used for date and time.

Functions:
* time()
* ctime()
* clock()

🧠 7. limits.h

Gives limits of data types.

Examples:
* INT_MAX
* CHAR_MIN

🧠 8. float.h

Gives limits of float types.

Examples:
* FLT_MAX
* DBL_MIN

🧠 Example Program
\`\`\`c
#include <stdio.h>
#include <math.h>

int main() {
    printf("%.2f", sqrt(25));
    return 0;
}
\`\`\`

Output:
\`5.00\`

🧠 Real-Life Example

Think of libraries like:
* Apps on your phone
* You install only what you need.

❌ Common Beginner Mistakes
* Forgetting to include library
* Using wrong function name
* Ignoring compiler errors

⭐ Key Points to Remember
* Libraries provide ready-made functions
* Use #include to add them
* stdio.h is most common
* Saves time and effort
* Makes code reliable
`
                    },

                    // --- QUIZ 4.2 ---
                    {
                        id: 'c-quiz-4-2',
                        title: "📝 Quiz 10: Advanced Concepts (Topics 4-7)",
                        type: "quiz",
                        questions: [
                            { question: "Function to allocate memory?", options: ["alloc()", "malloc()", "new", "create()"], correct: 1 },
                            { question: "Function to free memory?", options: ["delete", "remove", "free()", "dealloc"], correct: 2 },
                            { question: "Difference malloc vs calloc?", options: ["Syntax only", "calloc initializes to 0", "malloc is slower", "None"], correct: 1 },
                            { question: "File mode 'r' stands for?", options: ["Read", "Write", "Run", "Remove"], correct: 0 },
                            { question: "FILE pointer type is?", options: ["file", "FILE*", "void", "char*"], correct: 1 },
                            { question: "Main function arguments for CLI?", options: ["void", "int argc, char *argv[]", "int main", "char args"], correct: 1 },
                            { question: "Bitwise AND operator?", options: ["&&", "&", "||", "|"], correct: 1 },
                            { question: "What if malloc fails?", options: ["Returns NULL", "Crashes", "Returns 0", "Writes error"], correct: 0 },
                            { question: "Can we reallocate memory?", options: ["No", "Yes (realloc)", "Only free", "Only new"], correct: 1 },
                            { question: "What is Memory Leak?", options: ["RAM full", "Not freeing allocated memory", "Bad hardware", "Virus"], correct: 1 }
                        ]
                    }
                ]
            },

            // ===================================
            // PHASE 5: PRACTICAL
            // ===================================
            {
                id: 5,
                title: "Phase 5: Practical & Projects",
                topics: [
                    { id: 'c-5-1', title: "Pattern Printing", type: "video", duration: "40m", videoUrl: "https://www.youtube.com/watch?v=fX5X9rR9E8s", content: "# 🔴 Pattern Problems\nLearn nested loops by printing stars and pyramids." },
                    { id: 'c-5-2', title: "Sorting & Searching", type: "video", duration: "50m", videoUrl: "https://www.youtube.com/watch?v=7jl91klFhKQ", content: "# 🔴 Algorithms\nBubble Sort, Binary Search." },
                    { id: 'c-5-3', title: "Mini Projects", type: "video", duration: "60m", videoUrl: "https://www.youtube.com/watch?v=VgDgWzBL7s4", content: "# 🔴 Projects\n1. Student Management System\n2. Bank System\n3. Library Helper" },
                    {
                        id: 'c-quiz-5',
                        title: "📝 Final Project Quiz",
                        type: "quiz",
                        questions: [
                            { question: "Best loop for array traversal?", options: ["if", "for", "switch", "while"], correct: 1 },
                            { question: "Time complexity of Binary Search?", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], correct: 1 },
                            { question: "Bubble sort uses?", options: ["Swapping", "Merging", "Splitting", "Hashing"], correct: 0 },
                            { question: "Which project uses File Handling?", options: ["Calculator", "Student Management", "Pattern Print", "Matrix Add"], correct: 1 },
                            { question: "Is C good for Game Dev?", options: ["No", "Yes", "Only 2D", "Never"], correct: 1 },
                            { question: "Can we use C for AI?", options: ["Impossible", "Yes, but Python preferred", "Best choice", "No libraries"], correct: 1 },
                            { question: "Output of 5/2 in int?", options: ["2.5", "2", "3", "Error"], correct: 1 },
                            { question: "Output of 5%2?", options: ["2", "1", "2.5", "0"], correct: 1 },
                            { question: "Best practice for variable names?", options: ["x, y, z", "a1, a2", "meaningful_names", "1var"], correct: 2 },
                            { question: "Main function returns?", options: ["void", "int", "char", "float"], correct: 1 }
                        ]
                    }
                ]
            },
            {
                id: 99,
                title: "🚀 One Shot Video",
                topics: [
                    { id: 'c-99-1', title: "Full C Course (One Video)", type: "video", duration: "4h", videoUrl: "https://www.youtube.com/watch?v=87SHz2FHf9M", content: "# Complete Course\nWatch the entire journey in one go." }
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
    // PYTHON PROGRAMMING
    // ==========================================
    'python': {
        id: 'python',
        title: "Python Masterclass",
        description: "Zero to Hero in Python Programming",
        modules: [
            // --- MODULE 1: Python Basics ---
            {
                id: 1,
                title: "Module 1: Python Basics",
                topics: [
                    {
                        id: 'py-1-1', title: "What is Python?", type: "video", duration: "15m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 1: What is Python?
✅ What is Python? (Very Simple)

Python is a programming language that is:
* **Easy to learn**
* **Easy to read**
* **Easy to write**

👉 Python allows humans to write instructions in a simple English-like style, which the computer can understand.

---

🧠 Real-Life Example

Think of two ways to give instructions:

❌ **Difficult way (machine-like)**:
\`DO_TASK_A_WITH_PARAMETER_X\`

✅ **Easy way (Python-like)**:
\`print("Hello")\`

💡 Python is designed so humans feel comfortable writing code.

---

💻 Why Do We Need Python?

Python is used because:
* It saves time
* It needs fewer lines of code
* It is beginner-friendly
* It is very powerful

Python is used in:
* **Web development**
* **Data science**
* **Artificial Intelligence**
* **Automation**
* **Games**

Examples:
* YouTube
* Instagram
* Google
* Netflix
👉 All use Python in some way.

---

🔤 What Kind of Language is Python?

Python is:
1. **High-level language** (Easy for humans)
2. **Interpreted language** (Runs line by line)
3. **Object-Oriented language** (Uses classes and objects)

---

⚙️ How Python Works?

1. You write Python code
2. Python interpreter reads code line by line
3. Computer executes it
4. Output is shown

**Flow**:
Human → Python Code → Python Interpreter → Computer → Output

---

🧾 Syntax (Basic Idea)

Python syntax is simple and clean.

**Example**:
\`print("Python is easy")\`

**No**:
* Semicolons \`;\`
* Curly braces \`{}\`

---

💻 Example Code (Python)

\`\`\`python
# This program prints a message
print("Welcome to Python Programming")
\`\`\`

📤 Output
\`Welcome to Python Programming\`

---

❌ Common Beginner Mistakes
* Writing unnecessary symbols ❌
* Forgetting quotes ❌
* Wrong spelling of print ❌
* Mixing tabs and spaces ❌

---

⭐ Key Points to Remember
* Python is a programming language
* Python is easy to learn and use
* Python code looks like English
* Python runs line by line

---

📝 Practice Questions
1. Write a program to print "I love Python"
2. Change the message to your favorite subject
3. Try printing two lines
`
                    },

                    {
                        id: 'py-1-2', title: "Features of Python", type: "video", duration: "10m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 2: Features of Python
✅ What are Features of Python? (Very Simple)

Features are the special qualities or advantages of Python that make it popular and easy to use.

👉 Python has many powerful features that help programmers write code faster and easier.

---

🧠 Real-Life Example

Think of a smartphone 📱:

Why do people like it?
* **Easy to use**
* **Fast**
* **Many apps**
* **Saves time**

💡 Python is like a smartphone among programming languages — simple but powerful.

---

💻 Why Do We Need Python Features?

Python features help us:
* **Write less code**
* **Understand code easily**
* **Fix errors quickly**
* **Build applications faster**

👉 That's why beginners and professionals both use Python.

---

🔑 Main Features of Python

1️⃣ **Easy to Learn & Easy to Use**
* Python looks like English
* Simple syntax

**Example**:
\`print("Hello Python")\`

---

2️⃣ **High-Level Language**
* No need to manage memory
* Focus on logic, not machine details
👉 Python handles complex things internally.

---

3️⃣ **Interpreted Language**
* Code runs line by line
* No separate compilation step
* If error occurs → stops immediately and shows error.

---

4️⃣ **Free & Open Source**
* Python is free to download
* Anyone can use and modify it
👉 No license cost.

---

5️⃣ **Portable (Platform Independent)**

Same code runs on:
* Windows
* Linux
* macOS
👉 Write once, run anywhere.

---

6️⃣ **Object-Oriented Language**
* Supports classes and objects
* Helps in real-world programming
*(We'll learn this later in detail)*

---

7️⃣ **Large Standard Library**

Python has built-in libraries for:
* Math
* File handling
* Date & time
* Networking
👉 No need to write everything from scratch.

---

🧾 Syntax (Basic Idea)

Python syntax is clean and readable.

**Example**:
\`\`\`python
a = 10
b = 20
print(a + b)
\`\`\`

---

💻 Example Code (Python)

\`\`\`python
# Simple Python program
x = 5
y = 10
print("Sum is:", x + y)
\`\`\`

📤 Output
\`Sum is: 15\`

---

❌ Common Beginner Mistakes
* Thinking Python is slow ❌
* Writing unnecessary symbols ❌
* Ignoring indentation ❌

⚠️ Python depends heavily on proper indentation.

---

⭐ Key Points to Remember
* Python is easy and powerful
* Python saves time and effort
* Python is free and portable
* Python has huge libraries

---

📝 Practice Questions
1. Write a program to print any message
2. Create two variables and add them
3. Try running the same code twice
`
                    },
                    {
                        id: 'py-1-3', title: "Installing Python & Environment", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 3: Installing Python & Setting Up Environment
✅ What is Installing Python? (Very Simple)

Installing Python means putting the Python software on your computer so you can:
* **Write Python code**
* **Run Python programs**
* **See output**

👉 Without installing Python, your computer cannot understand Python code.

---

🧠 Real-Life Example

Think of installing Python like installing WhatsApp on your phone 📱:
* Without WhatsApp → you can’t chat
* Without Python → you can’t run Python programs

💡 Python is the “app” your computer needs to understand Python language.

💻 Why Do We Need to Install Python?

We install Python to:
* **Run Python programs**
* **Practice coding**
* **Build applications**
* **Learn programming**

👉 Python code needs the Python Interpreter to work.

---

🧩 What is Python Interpreter?

The Python Interpreter is a program that:
* Reads Python code
* Executes it line by line
* Shows output

**Flow**:
Python Code → Python Interpreter → Output

---

🖥️ Steps to Install Python (Windows / Mac / Linux)
🔹 **Step 1: Download Python**
* Go to official website: 👉 [https://www.python.org](https://www.python.org)
* Click **Download Python**
* Choose latest stable version (example: Python 3.x)

🔹 **Step 2: Install Python (IMPORTANT)**
While installing:
✅ **Check the box: Add Python to PATH**
❌ **Do NOT skip this step**

Then click: **Install Now**

🔹 **Step 3: Verify Installation**
Open Command Prompt / Terminal and type:
\`python --version\`

OR

\`python3 --version\`

If installed correctly, output will be like:
\`Python 3.x.x\`

---

🧠 What is PATH?

PATH tells the computer where Python is installed.
If PATH is not set:
* Python command won’t work ❌

👉 That’s why checking **Add Python to PATH** is important.

🧰 Python Development Environments

You can write Python code using:

1️⃣ **IDLE (Default Python Editor)**
* Comes with Python
* Simple and beginner-friendly
**How to open**: Search IDLE → Open

2️⃣ **Text Editor (Notepad)**
* Write code in .py file
* Run using terminal
**Example file**: \`hello.py\`

3️⃣ **Code Editors (Recommended)**
* VS Code
* PyCharm
* Sublime Text
👉 Best for learning and projects.

---

🧾 Syntax (Basic Idea)

Python file extension:
\`
.py
\`

**Example**:
\`print("Python Installed Successfully")\`

---

💻 Example Code (Python)
\`\`\`python
# First program after installation
print("Python is ready to use")
\`\`\`

📤 Output
\`Python is ready to use\`

---

❌ Common Beginner Mistakes
* Forgetting to add Python to PATH ❌
* Installing Python 2 instead of Python 3 ❌
* Typing wrong command ❌

---

⭐ Key Points to Remember
* Python must be installed to run programs
* Python Interpreter executes code
* Always install Python 3
* Add Python to PATH

---

📝 Practice Questions
1. Check Python version on your system
2. Open IDLE and write a print statement
3. Create a .py file and run it
`
                    },
                    {
                        id: 'py-1-4', title: "First Python Program", type: "video", duration: "10m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 4: First Python Program
✅ What is a First Python Program? (Very Simple)

A first Python program is usually a very simple program written to check:
* **Python is installed correctly**
* **Python is working properly**
* **You can run Python code successfully**

👉 Traditionally, the first program prints “Hello World”.

🧠 Real-Life Example

Think of saying “Hello” when you meet someone for the first time 🤝.

Similarly:
* When learning a new language
* The first thing we do is say Hello

💡 In programming, “Hello World” is our first greeting to the computer.

💻 Why Do We Write the First Program?

We write the first program to:
* **Test Python installation**
* **Understand basic syntax**
* **Learn how output works**
* **Gain confidence** 😊

---

🧩 Steps to Write First Python Program
🔹 **Step 1: Open Editor**
Use any one:
* IDLE
* VS Code
* Notepad

🔹 **Step 2: Write Code**
\`print("Hello World")\`

🔹 **Step 3: Run the Program**
* Save file as: \`hello.py\`
* Run using:
\`python hello.py\`

---

🧾 Syntax Explanation
\`print("Hello World")\`

* \`print\` → function to display output
* \`"Hello World"\` → message (string)
* Quotes \`"\` are mandatory

---

💻 Example Code (Python)
\`\`\`python
# My first Python program
print("Hello World")
print("Welcome to Python Programming")
\`\`\`

📤 Output
\`Hello World\`
\`Welcome to Python Programming\`

---

❌ Common Beginner Mistakes
* Forgetting quotes ❌
* Writing Print instead of print ❌
* Missing brackets () ❌
* File not saved as .py ❌

⚠️ Python is case-sensitive.

---

⭐ Key Points to Remember
* First program checks Python setup
* \`print()\` is used for output
* Python is case-sensitive
* Save file with .py extension

---

📝 Practice Questions
1. Write a program to print your name
2. Print two messages in two lines
3. Change “Hello World” to any message
`
                    },
                    {
                        id: 'py-1-5', title: "Syntax & Indentation", type: "video", duration: "15m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 5: Python Syntax & Indentation
✅ What is Python Syntax? (Very Simple)

Syntax means the rules of writing Python code.

👉 Python has very simple syntax, but it is also very strict.
* If syntax rules are broken → program gives an error.

🧠 Real-Life Example

Think of English grammar 📖:
* “I am going school” ❌
* “I am going to school” ✅

💡 Python also has grammar (syntax).
If grammar is wrong → Python does not understand.

💻 Why is Syntax Important?

Syntax is important because:
* **Computer cannot guess**
* **Instructions must be exact**
* **Small mistake = error**

👉 Correct syntax = correct output.

🔑 Important Python Syntax Rules
1️⃣ **No Semicolon Needed**
❌ Wrong:
\`print("Hello");\`

✅ Correct:
\`print("Hello")\`

2️⃣ **Case-Sensitive Language**
* \`print\` ✅
* \`Print\` ❌

3️⃣ **Proper Brackets**
* \`()\` for functions
* \`""\` or \`''\` for strings

**Example**:
\`print("Python")\`

🧩 What is Indentation?

Indentation means spaces at the beginning of a line.
👉 Python uses indentation to define blocks of code.
Other languages use \`{ }\`, but Python uses spaces.

🧠 Real-Life Example (Indentation)

Think of a paragraph:
* Lines that belong together are aligned
* Same idea in Python

💻 Why is Indentation Important?

Indentation is used for:
* **if statements**
* **Loops**
* **Functions**

Without proper indentation → \`IndentationError\` ❌

🧾 Syntax Example (Indentation)
\`\`\`python
if 10 > 5:
    print("10 is greater")
    print("This is inside if block")
\`\`\`

💻 Example Code (Python)
\`\`\`python
# Demonstrating indentation
if 5 > 2:
    print("Five is greater than two")
\`\`\`

📤 Output
\`Five is greater than two\`

❌ Common Beginner Mistakes
* Missing indentation ❌
* Mixing tabs and spaces ❌
* Writing code without colon \`:\` ❌

**Example ❌**:
\`\`\`python
if 5 > 2
print("Hello")
\`\`\`

⭐ Key Points to Remember
* Syntax = rules of writing code
* Python does not use \`{ }\`
* Indentation is mandatory
* Use 4 spaces for indentation

📝 Practice Questions
1. Write a program using if statement
2. Try removing indentation and see the error
3. Correct a wrongly indented program
`
                    },
                    {
                        id: 'py-1-6', title: "Comments in Python", type: "video", duration: "10m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 6: Comments in Python
✅ What are Comments? (Very Simple)

Comments are notes written inside a program to explain the code.

👉 Comments are ignored by Python.
They are written for humans, not for the computer.

🧠 Real-Life Example

Think of comments like notes in a textbook 📘:
* Notes help you understand
* Notes are not part of the exam

💡 Similarly, comments help programmers understand code but are not executed.

💻 Why Do We Need Comments?

Comments are used to:
* **Explain code**
* **Make code readable**
* **Help others understand**
* **Remember logic later**

👉 Very useful for big programs.

🔑 Types of Comments in Python

Python has two types of comments:

1️⃣ **Single-Line Comment**
* Starts with \`#\`

**Example**:
\`\`\`python
# This is a single-line comment
print("Hello Python")
\`\`\`

2️⃣ **Multi-Line Comment (Using Triple Quotes)**
* Uses: \`'''\` or \`"""\`

**Example**:
\`\`\`python
"""
This is a multi-line comment
Used to explain large code
"""
print("Learning Python")
\`\`\`

🧾 Syntax (Basic Idea)
\`# This is a comment\`

Anything after \`#\` is ignored by Python.

💻 Example Code (Python)
\`\`\`python
# Program to print message
print("Python comments example")

# Printing another message
print("Comments make code easy")
\`\`\`

📤 Output
\`Python comments example\`
\`Comments make code easy\`

❌ Common Beginner Mistakes
* Forgetting \`#\` ❌
* Thinking comments affect output ❌
* Writing too many unnecessary comments ❌

⭐ Key Points to Remember
* Comments are not executed
* \`#\` is used for single-line comments
* Comments improve readability
* Python ignores comments

📝 Practice Questions
1. Write a program with two comments
2. Comment out one line and run the program
3. Write a multi-line comment
`
                    },
                    {
                        id: 'py-1-7', title: "Variables", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 7: Variables in Python
✅ What are Variables? (Very Simple)

Variables are used to **store data (values)** in a program.

👉 A variable acts like a **container** that holds information which can be used later.

---

🧠 Real-Life Example

Think of a **box with a label** 📦:
* Box name: age  
* Value inside: 20  

💡 In Python:
* Variable name → box label  
* Variable value → item inside the box  

---

💻 Why Do We Need Variables?

We use variables to:
* Store data
* Reuse values
* Perform calculations
* Make programs dynamic

👉 Without variables, programs would be very limited.

---

🧩 How to Create a Variable in Python

Python creates a variable **automatically** when you assign a value.

**Example**:
\`age = 20\`

Here:
* \`age\` → variable name
* \`=\` → assignment operator
* \`20\` → value

---

🧾 Syntax (Basic Idea)

\`variable_name = value\`

**Example**:
\`name = "Rahul"\`

---

💻 Example Code (Python)
\`\`\`python
# Variable examples
name = "Python"
age = 25
print(name)
print(age)
\`\`\`

📤 Output
\`Python\`
\`25\`

---

🔑 Variable Naming Rules

1️⃣ **Must start with a letter or underscore**
* ✅ \`name\`, \`_age\`
* ❌ \`1name\`

2️⃣ **Can contain letters, numbers, and underscores**
* ✅ \`student_1\`
* ❌ \`student-1\`

3️⃣ **Case-sensitive**
* \`Name\` and \`name\` are different

4️⃣ **Cannot use Python keywords**
* ❌ \`if\`, \`for\`, \`while\`

---

❌ Common Beginner Mistakes
* Using spaces in variable names ❌
* Starting with a number ❌
* Using special characters like \`@\`, \`#\` ❌

---

⭐ Key Points to Remember
* Variables store data
* No need to declare type
* Use meaningful names
* Follow naming rules

---

📝 Practice Questions
1. Create a variable to store your name
2. Create two variables and add them
3. Print a variable value
`
                    },
                    {
                        id: 'py-1-8', title: "Data Types", type: "video", duration: "25m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 8: Data Types in Python
✅ What are Data Types? (Very Simple)

Data types tell Python **what type of value** a variable is storing.

👉 Python needs data types to understand **how to use the data**.

---

🧠 Real-Life Example

Think of different items in daily life 🧺:
* Milk → liquid
* Book → object
* Number → quantity

💡 Similarly, Python classifies data into different types.

---

💻 Why Do We Need Data Types?

Data types help Python to:
* Perform correct operations
* Store data efficiently
* Avoid errors

👉 Different data types behave differently.

---

🧩 Common Data Types in Python

---

🔹 **1. int (Integer)**

Used for **whole numbers**.

**Example**:
\`a = 10\`

---

🔹 **2. float (Decimal Number)**

Used for **decimal values**.

**Example**:
\`price = 99.5\`

---

🔹 **3. str (String)**

Used for **text**.

**Example**:
\`name = "Python"\`

---

🔹 **4. bool (Boolean)**

Used for **True or False**.

**Example**:
\`is_active = True\`

---

🧾 Syntax (Basic Idea)

\`variable_name = value\`

---

💻 Example Code (Python)
\`\`\`python
# Data type examples
age = 25
price = 99.5
name = "Python"
is_student = True

print(age)
print(price)
print(name)
print(is_student)
\`\`\`

📤 Output
\`25\`
\`99.5\`
\`Python\`
\`True\`

---

🔍 How to Check Data Type?

Use \`type()\` function:

\`\`\`python
x = 10
print(type(x))
\`\`\`

**Output**: \`<class 'int'>\`

---

❌ Common Beginner Mistakes
* Mixing quotes in strings ❌
* Forgetting decimal point in float ❌
* Using \`true\` instead of \`True\` ❌

---

⭐ Key Points to Remember
* Python has multiple data types
* \`int\` for whole numbers
* \`float\` for decimals
* \`str\` for text
* \`bool\` for True/False

---

📝 Practice Questions
1. Create variables of each data type
2. Use \`type()\` to check variable types
3. Print different data types
`
                    },
                    {
                        id: 'py-1-9', title: "Type Conversion", type: "video", duration: "15m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 9: Type Conversion
✅ What is Type Conversion? (Very Simple)

Type conversion means **changing one data type into another**.

👉 Python allows us to convert data from one type to another when needed.

---

🧠 Real-Life Example

Think of money 💵:
* 1 rupee → coin
* 1 rupee → note

💡 Value is same, but **form changes**.  
Similarly, Python changes the **form (type)** of data.

---

💻 Why Do We Need Type Conversion?

We need type conversion to:
* Perform calculations correctly
* Take user input
* Avoid type errors
* Convert data as required

👉 Python input is always taken as **string**, so conversion is important.

---

🧩 Types of Type Conversion

---

🔹 **1. Implicit Type Conversion**

Python converts data **automatically**.

**Example**:
\`\`\`python
a = 5
b = 2.5
c = a + b
\`\`\`

Python converts \`a\` into float automatically.

---

🔹 **2. Explicit Type Conversion**

User converts data **manually** using functions.

**Common functions**:
* \`int()\`
* \`float()\`
* \`str()\`
* \`bool()\`

---

🧾 Syntax (Basic Idea)

\`new_value = type(value)\`

**Example**:
\`x = int("10")\`

---

💻 Example Code (Python)
\`\`\`python
# Explicit type conversion
a = "10"
b = 5

a = int(a)
sum = a + b

print(sum)
\`\`\`

📤 Output
\`15\`

---

🔍 More Examples

**String to Integer**:
\`\`\`python
x = int("100")
print(x)
\`\`\`

**Integer to String**:
\`\`\`python
y = str(50)
print(y)
\`\`\`

**Integer to Float**:
\`\`\`python
z = float(10)
print(z)
\`\`\`

---

❌ Common Beginner Mistakes
* Converting invalid strings ❌ \`int("hello")\`
* Forgetting to convert user input ❌
* Mixing incompatible types ❌

---

⭐ Key Points to Remember
* Type conversion changes data type
* \`int()\`, \`float()\`, \`str()\` are common functions
* Python input is always string
* Implicit conversion is automatic

---

📝 Practice Questions
1. Convert a string to integer
2. Convert a float to string
3. Take user input and convert to integer
`
                    },
                    {
                        id: 'py-1-10', title: "Input and Output", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 10: Input and Output in Python
✅ What is Input and Output? (Very Simple)

Input means **taking data from the user**.  
Output means **showing data to the user**.

👉 Python uses input and output to **interact with users**.

---

🧠 Real-Life Example

Think of a conversation 🗣️:
* You ask a question → input
* Friend replies → output

💡 Programs work the same way.

---

💻 Why Do We Need Input and Output?

We need input and output to:
* Make programs interactive
* Take user data
* Display results
* Build real applications

👉 Without input/output, programs are useless.

---

🧩 Output in Python (print)

Python uses \`print()\` to show output.

**Example**:
\`print("Hello User")\`

**Multiple values**:
\`\`\`python
print("Name:", "Python")
print("Age:", 25)
\`\`\`

---

🧩 Input in Python (input)

Python uses \`input()\` to take input.

**Example**:
\`name = input("Enter your name: ")\`

👉 Input taken is **always a string**.

---

🧾 Syntax (Basic Idea)

**Output**:
\`print(value)\`

**Input**:
\`variable = input("message")\`

---

💻 Example Code (Python)
\`\`\`python
# Input and Output example
name = input("Enter your name: ")
age = input("Enter your age: ")

print("Name:", name)
print("Age:", age)
\`\`\`

📤 Output
\`Enter your name: Rahul\`
\`Enter your age: 20\`
\`Name: Rahul\`
\`Age: 20\`

---

🔍 Converting Input

Since input is always string, convert when needed:

\`\`\`python
age = input("Enter age: ")
age = int(age)
print("Next year:", age + 1)
\`\`\`

---

💡 Print with Separator

\`\`\`python
print("Python", "is", "easy", sep="-")
\`\`\`

**Output**: \`Python-is-easy\`

---

❌ Common Beginner Mistakes
* Forgetting to convert input ❌
* Missing quotes in print ❌
* Not storing input in variable ❌

---

⭐ Key Points to Remember
* \`print()\` shows output
* \`input()\` takes input
* Input is always string
* Convert input when needed

---

📝 Practice Questions
1. Take user name and print it
2. Take two numbers and print their sum
3. Use \`sep\` parameter in print
`
                    },
                ]
            },

            // --- MODULE 2: Operators & Control Flow ---
            {
                id: 2,
                title: "Module 2: Operators & Control Flow",
                topics: [
                    {
                        id: 'py-2-1', title: "Operators", type: "video", duration: "25m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 11: Operators in Python
✅ What are Operators? (Very Simple)

Operators are **symbols** used to **perform operations** on values and variables.

👉 Operators help us calculate, compare, and make decisions in programs.

---

🧠 Real-Life Example

Think of basic math ➕➖✖️➗:
* + to add
* - to subtract
* * to multiply
* / to divide

💡 Python uses similar symbols called operators.

---

💻 Why Do We Need Operators?

We need operators to:
* Perform calculations
* Compare values
* Make decisions
* Manipulate data

👉 Without operators, programs cannot do useful work.

---

🧩 Types of Operators in Python

---

🔹 **1. Arithmetic Operators**

Used for mathematical operations.

| Operator | Meaning |
|----------|---------|
| \`+\` | Addition |
| \`-\` | Subtraction |
| \`*\` | Multiplication |
| \`/\` | Division |
| \`%\` | Modulus (Remainder) |
| \`**\` | Power |
| \`//\` | Floor Division |

---

🔹 **2. Comparison Operators**

Used to compare values.

| Operator | Meaning |
|----------|---------|
| \`==\` | Equal to |
| \`!=\` | Not equal to |
| \`>\` | Greater than |
| \`<\` | Less than |
| \`>=\` | Greater than or equal |
| \`<=\` | Less than or equal |

---

🔹 **3. Logical Operators**

Used for logical operations.

| Operator | Meaning |
|----------|---------|
| \`and\` | Both conditions true |
| \`or\` | At least one true |
| \`not\` | Reverse the result |

---

🧾 Syntax (Basic Idea)

\`result = value1 operator value2\`

**Example**:
\`sum = 10 + 5\`

---

💻 Example Code (Python)
\`\`\`python
# Arithmetic operators example
a = 10
b = 3

print(a + b)   # 13
print(a - b)   # 7
print(a * b)   # 30
print(a / b)   # 3.333...
print(a % b)   # 1
print(a ** b)  # 1000
print(a // b)  # 3
\`\`\`

---

💻 Comparison Example
\`\`\`python
x = 5
y = 10

print(x == y)  # False
print(x != y)  # True
print(x < y)   # True
\`\`\`

---

💻 Logical Example
\`\`\`python
a = True
b = False

print(a and b)  # False
print(a or b)   # True
print(not a)    # False
\`\`\`

---

❌ Common Beginner Mistakes
* Using \`=\` instead of \`==\` for comparison ❌
* Confusing \`/\` and \`//\` ❌
* Wrong logical operator usage ❌

---

⭐ Key Points to Remember
* \`+, -, *, /\` are arithmetic operators
* \`==, !=, >, <\` are comparison operators
* \`and, or, not\` are logical operators
* Comparison returns True/False

---

📝 Practice Questions
1. Calculate sum of two numbers
2. Check if a number is greater than 10
3. Use logical operators with conditions
`
                    },
                    {
                        id: 'py-2-2', title: "If, If-Else Statements", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 12: If and If-Else Statements
✅ What is If Statement? (Very Simple)

The \`if\` statement is used to **make decisions** in a program.

👉 It allows the program to execute code **only when a condition is true**.

---

🧠 Real-Life Example

Think of traffic signal 🚦:
* If light is green → go
* Else → stop

💡 Programs also work based on conditions.

---

💻 Why Do We Need If and If-Else?

We need them to:
* Make decisions
* Control program flow
* Execute code conditionally

👉 Without conditions, programs always run the same way.

---

🧩 If Statement Syntax

\`\`\`python
if condition:
    statement
\`\`\`

---

🧩 If Statement Example

\`\`\`python
age = 18

if age >= 18:
    print("You are eligible to vote")
\`\`\`

📤 Output
\`You are eligible to vote\`

---

🧩 If-Else Statement Syntax

\`\`\`python
if condition:
    statement
else:
    statement
\`\`\`

---

💻 Example Code (Python)

\`\`\`python
number = 5

if number % 2 == 0:
    print("Even number")
else:
    print("Odd number")
\`\`\`

📤 Output
\`Odd number\`

---

🔍 Multiple Conditions (elif)

\`\`\`python
marks = 85

if marks >= 90:
    print("Grade A")
elif marks >= 75:
    print("Grade B")
else:
    print("Grade C")
\`\`\`

📤 Output
\`Grade B\`

---

💡 Nested If Example

\`\`\`python
age = 20

if age >= 18:
    if age >= 21:
        print("Adult - Can drive and vote")
    else:
        print("Adult - Can vote only")
\`\`\`

---

❌ Common Beginner Mistakes
* Missing colon \`:\` ❌
* Wrong indentation ❌
* Using \`=\` instead of \`==\` ❌
* Forgetting \`elif\` keyword ❌

---

⭐ Key Points to Remember
* \`if\` checks a condition
* \`else\` runs when condition is false
* \`elif\` checks additional conditions
* Indentation is mandatory
* Conditions must be logical

---

📝 Practice Questions
1. Check if a number is positive
2. Check if age is above 18
3. Print even or odd number
4. Use elif to check grades
`
                    },
                    {
                        id: 'py-2-3', title: "Nested If", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 13: Nested If Statements
✅ What is Nested If? (Very Simple)

A nested if statement means an **if statement inside another if statement**.

👉 It is used when we need to check **multiple conditions step by step**.

---

🧠 Real-Life Example

Think of an exam result 🎓:
* If student passed
  * If marks ≥ 90 → Grade A
  * Else → Grade B
* Else → Fail

💡 One decision depends on another decision — this is nesting.

---

💻 Why Do We Need Nested If?

We use nested if to:
* Check multiple related conditions
* Make complex decisions
* Control program flow properly

👉 Useful when one condition depends on another.

---

🧩 Syntax of Nested If

\`\`\`python
if condition1:
    if condition2:
        statement
    else:
        statement
else:
    statement
\`\`\`

---

💻 Example Code (Python)

\`\`\`python
marks = 85

if marks >= 40:
    if marks >= 75:
        print("Distinction")
    else:
        print("Pass")
else:
    print("Fail")
\`\`\`

📤 Output
\`Distinction\`

---

🧠 Another Example

\`\`\`python
num = 10

if num > 0:
    if num % 2 == 0:
        print("Positive Even Number")
    else:
        print("Positive Odd Number")
else:
    print("Negative Number")
\`\`\`

📤 Output
\`Positive Even Number\`

---

🔍 Age and License Example

\`\`\`python
age = 20
has_license = True

if age >= 18:
    if has_license:
        print("Can drive")
    else:
        print("Need license")
else:
    print("Too young to drive")
\`\`\`

---

💡 Nested If vs elif

**Nested If**: Checks conditions inside conditions
**elif**: Checks alternative conditions at same level

\`\`\`python
# Using nested if
if x > 0:
    if x > 10:
        print("Greater than 10")

# Using elif
if x > 10:
    print("Greater than 10")
elif x > 0:
    print("Greater than 0")
\`\`\`

---

❌ Common Beginner Mistakes
* Forgetting indentation ❌
* Writing complex nested logic ❌
* Missing colons \`:\` ❌
* Too many nested levels (hard to read) ❌

---

⭐ Key Points to Remember
* Nested if = if inside if
* Used for multiple conditions
* Indentation is very important
* Keep logic simple and clear
* Avoid too many levels of nesting

---

📝 Practice Questions
1. Check if a number is positive and even
2. Check student pass/fail and grade
3. Find largest of two numbers using nested if
4. Check age and license eligibility
`
                    },
                    {
                        id: 'py-2-4', title: "Loops (for, while)", type: "video", duration: "35m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 14: Loops (for and while)
✅ What are Loops? (Very Simple)

Loops are used to **repeat a block of code multiple times**.

👉 Instead of writing the same code again and again, we use loops.

---

🧠 Real-Life Example

Think of a fan 🪭:
* Fan rotates again and again
* Until you switch it off

💡 Loops work the same way — repeat until a condition stops them.

---

💻 Why Do We Need Loops?

We use loops to:
* Save time
* Reduce code length
* Automate repetitive tasks
* Work with large data

👉 Loops make programs efficient.

---

🔁 Types of Loops in Python

Python mainly has two loops:
1. **for loop**
2. **while loop**

---

🔹 **for Loop**

The \`for\` loop is used when we know **how many times** we want to repeat something.

---

🧩 Syntax of for Loop

\`\`\`python
for variable in range(start, stop):
    statement
\`\`\`

---

💻 Example Code (for loop)

\`\`\`python
for i in range(1, 6):
    print(i)
\`\`\`

📤 Output
\`1\`
\`2\`
\`3\`
\`4\`
\`5\`

---

🔍 for Loop with List

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

📤 Output
\`apple\`
\`banana\`
\`cherry\`

---

🔹 **while Loop**

The \`while\` loop is used when we **do not know** how many times the loop will run.

---

🧩 Syntax of while Loop

\`\`\`python
while condition:
    statement
\`\`\`

---

💻 Example Code (while loop)

\`\`\`python
i = 1
while i <= 5:
    print(i)
    i = i + 1
\`\`\`

📤 Output
\`1\`
\`2\`
\`3\`
\`4\`
\`5\`

---

🔍 while Loop Example (User Input)

\`\`\`python
password = ""
while password != "python":
    password = input("Enter password: ")
print("Access granted!")
\`\`\`

---

💡 for vs while

| Feature | for loop | while loop |
|---------|----------|------------|
| **Use** | Fixed iterations | Condition-based |
| **Syntax** | \`for i in range()\` | \`while condition:\` |
| **Example** | Print 1 to 10 | Run until user quits |

---

🔢 range() Function

\`range()\` is used with for loops:

\`\`\`python
# range(stop)
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# range(start, stop)
for i in range(2, 6):
    print(i)  # 2, 3, 4, 5

# range(start, stop, step)
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8
\`\`\`

---

❌ Common Beginner Mistakes
* Infinite loop (condition never false) ❌
* Forgetting to update loop variable ❌
* Wrong indentation ❌
* Using wrong range values ❌

---

⭐ Key Points to Remember
* Loops repeat code
* \`for\` loop → fixed number of times
* \`while\` loop → condition-based
* Always ensure loop stops
* Use \`range()\` with for loops

---

📝 Practice Questions
1. Print numbers from 1 to 10 using for loop
2. Print numbers from 10 to 1 using while loop
3. Print even numbers using loop
4. Print multiplication table using for loop
`
                    },
                    {
                        id: 'py-2-5', title: "Loop Control Statements", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 15: Loop Control Statements (break, continue, pass)
✅ What are Loop Control Statements? (Very Simple)

Loop control statements are used to **change the normal flow of a loop**.

👉 They help us stop, skip, or do nothing inside loops when needed.

---

🧠 Real-Life Example

Think of walking 🚶♂️:
* **break** → stop walking
* **continue** → skip a step and keep walking
* **pass** → stand still (do nothing)

💡 Loop control works the same way.

---

💻 Why Do We Need Loop Control Statements?

We use them to:
* Stop a loop early
* Skip unwanted values
* Write empty blocks safely

👉 They give more control over loops.

---

🔹 **1. break Statement**

The \`break\` statement **terminates the loop immediately**.

---

🧩 Syntax

\`break\`

---

💻 Example Code (break)

\`\`\`python
for i in range(1, 6):
    if i == 4:
        break
    print(i)
\`\`\`

📤 Output
\`1\`
\`2\`
\`3\`

👉 Loop stops when \`i\` becomes 4.

---

🔍 break in while Loop

\`\`\`python
count = 0
while True:
    count += 1
    if count == 5:
        break
    print(count)
\`\`\`

📤 Output
\`1\`
\`2\`
\`3\`
\`4\`

---

🔹 **2. continue Statement**

The \`continue\` statement **skips the current iteration** and moves to the next one.

---

🧩 Syntax

\`continue\`

---

💻 Example Code (continue)

\`\`\`python
for i in range(1, 6):
    if i == 3:
        continue
    print(i)
\`\`\`

📤 Output
\`1\`
\`2\`
\`4\`
\`5\`

👉 Number 3 is skipped.

---

🔍 continue Example (Skip Even Numbers)

\`\`\`python
for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i)
\`\`\`

📤 Output
\`1\`
\`3\`
\`5\`
\`7\`
\`9\`

---

🔹 **3. pass Statement**

The \`pass\` statement **does nothing**.

👉 It is used when a statement is required syntactically but no action is needed.

---

🧩 Syntax

\`pass\`

---

💻 Example Code (pass)

\`\`\`python
for i in range(1, 4):
    if i == 2:
        pass
    print(i)
\`\`\`

📤 Output
\`1\`
\`2\`
\`3\`

👉 \`pass\` does nothing, so all numbers are printed.

---

🔍 pass as Placeholder

\`\`\`python
# Function to be implemented later
def my_function():
    pass

# Empty class
class MyClass:
    pass
\`\`\`

---

💡 Comparison Table

| Statement | Action | Use Case |
|-----------|--------|----------|
| \`break\` | Exits loop | Stop when condition met |
| \`continue\` | Skips iteration | Skip specific values |
| \`pass\` | Does nothing | Placeholder for code |

---

❌ Common Beginner Mistakes
* Confusing \`break\` and \`continue\` ❌
* Using \`pass\` thinking it stops loop ❌
* Creating infinite loops with wrong conditions ❌
* Forgetting to update loop variable before \`continue\` ❌

---

⭐ Key Points to Remember
* \`break\` → stops the loop completely
* \`continue\` → skips current iteration only
* \`pass\` → does nothing (placeholder)
* Use carefully to control flow
* \`pass\` is useful for empty code blocks

---

📝 Practice Questions
1. Stop loop when number reaches 5
2. Skip printing number 3 in a loop
3. Use pass inside a loop
4. Print only odd numbers using continue
`
                    },
                ]
            },

            // --- MODULE 3: Data Structures ---
            {
                id: 3,
                title: "Module 3: Data Structures",
                topics: [
                    {
                        id: 'py-3-1', title: "Strings", type: "video", duration: "25m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 16: Strings in Python
✅ What are Strings? (Very Simple)

A string is a **sequence of characters** enclosed in quotes.

👉 Strings are used to store and manipulate text in Python.

---

🧠 Real-Life Example

Think of a sentence 📝:
* "Hello World" is a string
* "Python" is a string
* "123" is also a string (not a number!)

💡 Anything inside quotes is a string.

---

💻 Why Do We Need Strings?

We use strings to:
* Store text data
* Display messages
* Process user input
* Work with files

👉 Strings are everywhere in programming.

---

🧩 Creating Strings

You can create strings using:
* Single quotes: \`'Hello'\`
* Double quotes: \`"Hello"\`
* Triple quotes: \`'''Hello'''\` or \`"""Hello"""\`

\`\`\`python
name = "Python"
message = 'Learning is fun'
multiline = """This is
a multiline
string"""
\`\`\`

---

🔍 String Operations

---

🔹 **1. Concatenation (Joining)**

\`\`\`python
first = "Hello"
second = "World"
result = first + " " + second
print(result)
\`\`\`

📤 Output: \`Hello World\`

---

🔹 **2. String Repetition**

\`\`\`python
text = "Python "
print(text * 3)
\`\`\`

📤 Output: \`Python Python Python\`

---

🔹 **3. String Indexing**

\`\`\`python
word = "Python"
print(word[0])  # First character
print(word[-1]) # Last character
\`\`\`

📤 Output:
\`P\`
\`n\`

---

🔹 **4. String Slicing**

\`\`\`python
text = "Python Programming"
print(text[0:6])   # Python
print(text[7:])    # Programming
print(text[:6])    # Python
\`\`\`

---

🔧 Common String Methods

---

🔹 **upper() and lower()**

\`\`\`python
text = "Python"
print(text.upper())  # PYTHON
print(text.lower())  # python
\`\`\`

---

🔹 **strip()**

Removes whitespace from beginning and end.

\`\`\`python
text = "  Hello  "
print(text.strip())  # Hello
\`\`\`

---

🔹 **replace()**

\`\`\`python
text = "I love Java"
print(text.replace("Java", "Python"))
\`\`\`

📤 Output: \`I love Python\`

---

🔹 **split()**

\`\`\`python
text = "apple,banana,cherry"
fruits = text.split(",")
print(fruits)
\`\`\`

📤 Output: \`['apple', 'banana', 'cherry']\`

---

🔹 **find()**

\`\`\`python
text = "Python Programming"
print(text.find("Pro"))  # 7
\`\`\`

---

🔹 **len()**

\`\`\`python
text = "Python"
print(len(text))  # 6
\`\`\`

---

💡 String Formatting

---

🔹 **f-strings (Recommended)**

\`\`\`python
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old")
\`\`\`

📤 Output: \`My name is Alice and I am 25 years old\`

---

🔹 **format() method**

\`\`\`python
text = "Hello, {}!".format("Python")
print(text)
\`\`\`

📤 Output: \`Hello, Python!\`

---

❌ Common Beginner Mistakes
* Forgetting quotes around strings ❌
* Mixing single and double quotes ❌
* Trying to modify strings (they're immutable!) ❌
* Confusing string "123" with number 123 ❌

---

⭐ Key Points to Remember
* Strings are enclosed in quotes
* Strings are immutable (cannot be changed)
* Use \`+\` to concatenate strings
* Many useful methods: \`upper()\`, \`lower()\`, \`strip()\`, etc.
* Use f-strings for formatting

---

📝 Practice Questions
1. Create a string and print its length
2. Convert a string to uppercase
3. Slice a string to get first 5 characters
4. Replace a word in a string
5. Use f-string to format output
`
                    },
                    {
                        id: 'py-3-2', title: "Lists", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 17: Lists in Python
✅ What are Lists? (Very Simple)

A list is a **collection of items** stored in a single variable.

👉 Lists are **ordered** and **mutable** (can be changed).

---

🧠 Real-Life Example

Think of a shopping list 🛒:
* Milk
* Bread
* Eggs

💡 Python lists work the same way — store multiple items together.

---

💻 Why Do We Need Lists?

We use lists to:
* Store multiple values
* Organize data
* Perform operations on collections
* Iterate through items

👉 Lists are one of the most used data structures.

---

🧩 Creating Lists

\`\`\`python
# Empty list
my_list = []

# List with items
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]
mixed = [1, "Hello", 3.14, True]
\`\`\`

---

🔍 Accessing List Elements

---

🔹 **Indexing**

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])   # apple
print(fruits[-1])  # cherry (last item)
\`\`\`

---

🔹 **Slicing**

\`\`\`python
numbers = [1, 2, 3, 4, 5]
print(numbers[1:4])  # [2, 3, 4]
print(numbers[:3])   # [1, 2, 3]
print(numbers[2:])   # [3, 4, 5]
\`\`\`

---

🔧 Common List Methods

---

🔹 **append()** - Add item at end

\`\`\`python
fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits)
\`\`\`

📤 Output: \`['apple', 'banana', 'cherry']\`

---

🔹 **insert()** - Add item at specific position

\`\`\`python
fruits = ["apple", "cherry"]
fruits.insert(1, "banana")
print(fruits)
\`\`\`

📤 Output: \`['apple', 'banana', 'cherry']\`

---

🔹 **remove()** - Remove specific item

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.remove("banana")
print(fruits)
\`\`\`

📤 Output: \`['apple', 'cherry']\`

---

🔹 **pop()** - Remove item by index

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.pop(1)
print(fruits)
\`\`\`

📤 Output: \`['apple', 'cherry']\`

---

🔹 **sort()** - Sort the list

\`\`\`python
numbers = [3, 1, 4, 2]
numbers.sort()
print(numbers)
\`\`\`

📤 Output: \`[1, 2, 3, 4]\`

---

🔹 **reverse()** - Reverse the list

\`\`\`python
numbers = [1, 2, 3]
numbers.reverse()
print(numbers)
\`\`\`

📤 Output: \`[3, 2, 1]\`

---

🔹 **len()** - Get list length

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(len(fruits))  # 3
\`\`\`

---

🔹 **count()** - Count occurrences

\`\`\`python
numbers = [1, 2, 2, 3, 2]
print(numbers.count(2))  # 3
\`\`\`

---

🔹 **extend()** - Add multiple items

\`\`\`python
fruits = ["apple", "banana"]
more_fruits = ["cherry", "mango"]
fruits.extend(more_fruits)
print(fruits)
\`\`\`

📤 Output: \`['apple', 'banana', 'cherry', 'mango']\`

---

💡 List Operations

---

🔹 **Concatenation**

\`\`\`python
list1 = [1, 2, 3]
list2 = [4, 5, 6]
result = list1 + list2
print(result)
\`\`\`

📤 Output: \`[1, 2, 3, 4, 5, 6]\`

---

🔹 **Repetition**

\`\`\`python
numbers = [1, 2]
print(numbers * 3)
\`\`\`

📤 Output: \`[1, 2, 1, 2, 1, 2]\`

---

🔹 **Membership**

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print("apple" in fruits)  # True
print("mango" in fruits)  # False
\`\`\`

---

🔁 Looping Through Lists

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Method 1
for fruit in fruits:
    print(fruit)

# Method 2 (with index)
for i in range(len(fruits)):
    print(i, fruits[i])
\`\`\`

---

❌ Common Beginner Mistakes
* Confusing index 0 as first element ❌
* Trying to access index out of range ❌
* Forgetting lists are mutable ❌
* Using \`append()\` with multiple items ❌

---

⭐ Key Points to Remember
* Lists are ordered and mutable
* Use \`[]\` to create lists
* Index starts at 0
* Many useful methods: \`append()\`, \`remove()\`, \`sort()\`, etc.
* Lists can contain different data types

---

📝 Practice Questions
1. Create a list of 5 numbers
2. Add an item to the list using append
3. Remove an item from the list
4. Sort a list in ascending order
5. Loop through a list and print each item
`
                    },
                    {
                        id: 'py-3-3', title: "Tuples", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 18: Tuples in Python
✅ What are Tuples? (Very Simple)

A tuple is a **collection of items** that **cannot be changed** after creation.

👉 Tuples are **ordered** and **immutable** (cannot be modified).

---

🧠 Real-Life Example

Think of a date of birth 📅:
* Once you're born, your birth date never changes
* (Day, Month, Year) = (15, 8, 2000)

💡 Tuples store data that should not change.

---

💻 Why Do We Need Tuples?

We use tuples to:
* Store fixed data
* Protect data from modification
* Use as dictionary keys
* Return multiple values from functions

👉 Tuples are faster than lists.

---

🧩 Creating Tuples

\`\`\`python
# Empty tuple
empty_tuple = ()

# Tuple with items
coordinates = (10, 20)
colors = ("red", "green", "blue")
mixed = (1, "Hello", 3.14, True)

# Single item tuple (note the comma!)
single = (5,)
\`\`\`

---

🔍 Accessing Tuple Elements

---

🔹 **Indexing**

\`\`\`python
colors = ("red", "green", "blue")
print(colors[0])   # red
print(colors[-1])  # blue
\`\`\`

---

🔹 **Slicing**

\`\`\`python
numbers = (1, 2, 3, 4, 5)
print(numbers[1:4])  # (2, 3, 4)
print(numbers[:3])   # (1, 2, 3)
\`\`\`

---

🔧 Tuple Methods

Tuples have only 2 methods (because they're immutable):

---

🔹 **count()** - Count occurrences

\`\`\`python
numbers = (1, 2, 2, 3, 2)
print(numbers.count(2))  # 3
\`\`\`

---

🔹 **index()** - Find index of item

\`\`\`python
colors = ("red", "green", "blue")
print(colors.index("green"))  # 1
\`\`\`

---

💡 Tuple Operations

---

🔹 **Concatenation**

\`\`\`python
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)
result = tuple1 + tuple2
print(result)
\`\`\`

📤 Output: \`(1, 2, 3, 4, 5, 6)\`

---

🔹 **Repetition**

\`\`\`python
numbers = (1, 2)
print(numbers * 3)
\`\`\`

📤 Output: \`(1, 2, 1, 2, 1, 2)\`

---

🔹 **Membership**

\`\`\`python
colors = ("red", "green", "blue")
print("red" in colors)    # True
print("yellow" in colors) # False
\`\`\`

---

🔹 **len()** - Get tuple length

\`\`\`python
colors = ("red", "green", "blue")
print(len(colors))  # 3
\`\`\`

---

🔁 Looping Through Tuples

\`\`\`python
colors = ("red", "green", "blue")

for color in colors:
    print(color)
\`\`\`

---

🆚 Tuple vs List

| Feature | Tuple | List |
|---------|-------|------|
| **Syntax** | \`()\` | \`[]\` |
| **Mutable** | No (Immutable) | Yes (Mutable) |
| **Speed** | Faster | Slower |
| **Methods** | 2 methods | Many methods |
| **Use Case** | Fixed data | Changing data |

---

💡 Tuple Unpacking

\`\`\`python
# Assign tuple values to variables
coordinates = (10, 20)
x, y = coordinates
print(x)  # 10
print(y)  # 20

# Swap values
a = 5
b = 10
a, b = b, a
print(a, b)  # 10 5
\`\`\`

---

🔍 Returning Multiple Values

\`\`\`python
def get_user():
    name = "Alice"
    age = 25
    return name, age  # Returns a tuple

user_name, user_age = get_user()
print(user_name)  # Alice
print(user_age)   # 25
\`\`\`

---

❌ Common Beginner Mistakes
* Trying to modify tuple items ❌
* Forgetting comma in single-item tuple ❌
* Confusing tuples with lists ❌
* Using wrong brackets \`[]\` instead of \`()\` ❌

---

⭐ Key Points to Remember
* Tuples are immutable (cannot change)
* Use \`()\` to create tuples
* Tuples are faster than lists
* Only 2 methods: \`count()\` and \`index()\`
* Great for fixed data

---

📝 Practice Questions
1. Create a tuple with 5 elements
2. Access the first and last element
3. Count occurrences of an item
4. Use tuple unpacking
5. Return multiple values from a function using tuple
`
                    },
                    {
                        id: 'py-3-4', title: "Sets", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 19: Sets in Python
✅ What are Sets? (Very Simple)

A set is a **collection of unique items** with **no duplicates**.

👉 Sets are **unordered** and **mutable**.

---

🧠 Real-Life Example

Think of a group of unique students 👥:
* No two students have the same ID
* Order doesn't matter

💡 Sets automatically remove duplicates.

---

💻 Why Do We Need Sets?

We use sets to:
* Remove duplicates
* Perform mathematical operations (union, intersection)
* Check membership quickly
* Store unique values

👉 Sets are very fast for membership testing.

---

🧩 Creating Sets

\`\`\`python
# Empty set (use set(), not {})
empty_set = set()

# Set with items
numbers = {1, 2, 3, 4, 5}
fruits = {"apple", "banana", "cherry"}

# Duplicates are automatically removed
numbers = {1, 2, 2, 3, 3}
print(numbers)  # {1, 2, 3}
\`\`\`

---

🔧 Common Set Methods

---

🔹 **add()** - Add single item

\`\`\`python
fruits = {"apple", "banana"}
fruits.add("cherry")
print(fruits)
\`\`\`

📤 Output: \`{'apple', 'banana', 'cherry'}\`

---

🔹 **remove()** - Remove item (error if not found)

\`\`\`python
fruits = {"apple", "banana", "cherry"}
fruits.remove("banana")
print(fruits)
\`\`\`

---

🔹 **discard()** - Remove item (no error if not found)

\`\`\`python
fruits = {"apple", "cherry"}
fruits.discard("banana")  # No error
print(fruits)
\`\`\`

---

🔹 **clear()** - Remove all items

\`\`\`python
fruits = {"apple", "banana"}
fruits.clear()
print(fruits)  # set()
\`\`\`

---

💡 Set Operations

---

🔹 **Union** - Combine sets

\`\`\`python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
result = set1 | set2
print(result)  # {1, 2, 3, 4, 5}
\`\`\`

---

🔹 **Intersection** - Common elements

\`\`\`python
set1 = {1, 2, 3}
set2 = {2, 3, 4}
result = set1 & set2
print(result)  # {2, 3}
\`\`\`

---

🔹 **Difference** - Elements in first set only

\`\`\`python
set1 = {1, 2, 3}
set2 = {2, 3, 4}
result = set1 - set2
print(result)  # {1}
\`\`\`

---

🔹 **Symmetric Difference** - Elements in either set, but not both

\`\`\`python
set1 = {1, 2, 3}
set2 = {2, 3, 4}
result = set1 ^ set2
print(result)  # {1, 4}
\`\`\`

---

🔍 Set Methods (Alternative)

\`\`\`python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

print(set1.union(set2))         # {1, 2, 3, 4, 5}
print(set1.intersection(set2))  # {3}
print(set1.difference(set2))    # {1, 2}
\`\`\`

---

🔹 **len()** - Get set size

\`\`\`python
fruits = {"apple", "banana", "cherry"}
print(len(fruits))  # 3
\`\`\`

---

🔹 **Membership**

\`\`\`python
fruits = {"apple", "banana"}
print("apple" in fruits)  # True
\`\`\`

---

❌ Common Beginner Mistakes
* Using \`{}\` to create empty set (creates dict!) ❌
* Expecting sets to be ordered ❌
* Trying to access by index ❌
* Adding duplicate items manually ❌

---

⭐ Key Points to Remember
* Sets store unique values only
* Sets are unordered
* Use \`set()\` for empty set
* Great for removing duplicates
* Fast membership testing

---

📝 Practice Questions
1. Create a set and add items
2. Remove duplicates from a list using set
3. Find union of two sets
4. Find intersection of two sets
5. Check if item exists in set
`
                    },
                    {
                        id: 'py-3-5', title: "Dictionaries", type: "video", duration: "35m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 20: Dictionaries in Python
✅ What are Dictionaries? (Very Simple)

A dictionary is a collection of **key-value pairs**.

👉 Each key is unique and maps to a value.

---

🧠 Real-Life Example

Think of a real dictionary 📖:
* Word (key) → Meaning (value)
* "Python" → "A programming language"

💡 Dictionaries store data in pairs.

---

💻 Why Do We Need Dictionaries?

We use dictionaries to:
* Store related data together
* Access data quickly by key
* Represent real-world objects
* Create structured data

👉 Dictionaries are very powerful and flexible.

---

🧩 Creating Dictionaries

\`\`\`python
# Empty dictionary
empty_dict = {}

# Dictionary with items
user = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# Using dict() constructor
person = dict(name="Bob", age=30)
\`\`\`

---

🔍 Accessing Dictionary Values

---

🔹 **Using Keys**

\`\`\`python
user = {"name": "Alice", "age": 25}
print(user["name"])  # Alice
print(user["age"])   # 25
\`\`\`

---

🔹 **Using get()**

\`\`\`python
user = {"name": "Alice"}
print(user.get("name"))     # Alice
print(user.get("city", "Unknown"))  # Unknown (default)
\`\`\`

---

🔧 Modifying Dictionaries

---

🔹 **Adding/Updating Items**

\`\`\`python
user = {"name": "Alice"}
user["age"] = 25      # Add new key
user["name"] = "Bob"  # Update existing key
print(user)
\`\`\`

📤 Output: \`{'name': 'Bob', 'age': 25}\`

---

🔹 **Removing Items**

\`\`\`python
user = {"name": "Alice", "age": 25}

# Remove specific key
del user["age"]

# Remove and return value
name = user.pop("name")

# Remove all items
user.clear()
\`\`\`

---

🔧 Common Dictionary Methods

---

🔹 **keys()** - Get all keys

\`\`\`python
user = {"name": "Alice", "age": 25}
print(user.keys())
\`\`\`

📤 Output: \`dict_keys(['name', 'age'])\`

---

🔹 **values()** - Get all values

\`\`\`python
user = {"name": "Alice", "age": 25}
print(user.values())
\`\`\`

📤 Output: \`dict_values(['Alice', 25])\`

---

🔹 **items()** - Get all key-value pairs

\`\`\`python
user = {"name": "Alice", "age": 25}
print(user.items())
\`\`\`

📤 Output: \`dict_items([('name', 'Alice'), ('age', 25)])\`

---

🔹 **update()** - Merge dictionaries

\`\`\`python
user = {"name": "Alice"}
user.update({"age": 25, "city": "NYC"})
print(user)
\`\`\`

📤 Output: \`{'name': 'Alice', 'age': 25, 'city': 'NYC'}\`

---

🔁 Looping Through Dictionaries

---

🔹 **Loop through keys**

\`\`\`python
user = {"name": "Alice", "age": 25}
for key in user:
    print(key)
\`\`\`

---

🔹 **Loop through values**

\`\`\`python
for value in user.values():
    print(value)
\`\`\`

---

🔹 **Loop through key-value pairs**

\`\`\`python
for key, value in user.items():
    print(f"{key}: {value}")
\`\`\`

📤 Output:
\`name: Alice\`
\`age: 25\`

---

💡 Nested Dictionaries

\`\`\`python
users = {
    "user1": {"name": "Alice", "age": 25},
    "user2": {"name": "Bob", "age": 30}
}

print(users["user1"]["name"])  # Alice
\`\`\`

---

🔹 **len()** - Get dictionary size

\`\`\`python
user = {"name": "Alice", "age": 25}
print(len(user))  # 2
\`\`\`

---

🔹 **Membership** (checks keys only)

\`\`\`python
user = {"name": "Alice"}
print("name" in user)  # True
print("age" in user)   # False
\`\`\`

---

❌ Common Beginner Mistakes
* Using non-unique keys ❌
* Accessing non-existent keys without \`get()\` ❌
* Forgetting quotes around string keys ❌
* Trying to use mutable types as keys ❌

---

⭐ Key Points to Remember
* Dictionaries store key-value pairs
* Keys must be unique
* Use \`{}\` or \`dict()\` to create
* Access values using keys
* Many useful methods: \`keys()\`, \`values()\`, \`items()\`

---

📝 Practice Questions
1. Create a dictionary with 3 key-value pairs
2. Access a value using a key
3. Add a new key-value pair
4. Loop through dictionary and print all keys
5. Use \`get()\` method with default value
`
                    },
                ]
            },

            // --- MODULE 4: Functions & Modules ---
            {
                id: 4,
                title: "Module 4: Functions & Modules",
                topics: [
                    {
                        id: 'py-4-1', title: "Functions", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 21: Functions in Python
✅ What are Functions? (Very Simple)

A function is a **block of reusable code** that performs a specific task.

👉 Instead of writing the same code again and again, we create a function and call it whenever needed.

---

🧠 Real-Life Example

Think of a calculator 🧮:
* You press a button (call function)
* Calculator performs calculation (function executes)
* Shows result (function returns value)

💡 Functions work the same way in programming.

---

💻 Why Do We Need Functions?

We use functions to:
* **Avoid code repetition**
* **Organize code better**
* **Make code reusable**
* **Easy to debug and maintain**

👉 Functions make programs modular and clean.

---

🧩 Creating a Function

Use the \`def\` keyword to create a function:

\`\`\`python
def function_name():
    # code block
    statement
\`\`\`

---

💻 Example Code (Python)

\`\`\`python
# Define a function
def greet():
    print("Hello, Welcome to Python!")

# Call the function
greet()
\`\`\`

📤 Output
\`Hello, Welcome to Python!\`

---

🔹 **Function with Parameters**

Functions can accept inputs called **parameters**:

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
greet("Bob")
\`\`\`

📤 Output
\`Hello, Alice!\`
\`Hello, Bob!\`

---

🔹 **Function with Return Value**

Functions can return values using \`return\`:

\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)
\`\`\`

📤 Output
\`8\`

---

🔹 **Function with Multiple Parameters**

\`\`\`python
def calculate(x, y, z):
    return x + y + z

total = calculate(10, 20, 30)
print(total)
\`\`\`

📤 Output
\`60\`

---

🧾 Syntax (Basic Idea)

\`\`\`python
def function_name(parameters):
    # function body
    return value
\`\`\`

---

💡 Function Call vs Function Definition

**Definition**: Creating the function
\`\`\`python
def say_hello():
    print("Hello")
\`\`\`

**Call**: Using the function
\`\`\`python
say_hello()
\`\`\`

---

🔍 Function with Default Parameters

\`\`\`python
def greet(name="Guest"):
    print(f"Hello, {name}!")

greet()           # Uses default
greet("Alice")    # Uses provided value
\`\`\`

📤 Output
\`Hello, Guest!\`
\`Hello, Alice!\`

---

❌ Common Beginner Mistakes
* Forgetting parentheses \`()\` when calling function ❌
* Not using \`def\` keyword ❌
* Wrong indentation ❌
* Calling function before defining it ❌

---

⭐ Key Points to Remember
* Functions are reusable code blocks
* Use \`def\` to define functions
* Use \`()\` to call functions
* Functions can take parameters
* Functions can return values

---

📝 Practice Questions
1. Create a function to print your name
2. Create a function that adds two numbers
3. Create a function with default parameter
4. Create a function that returns a value
`
                    },
                    {
                        id: 'py-4-2', title: "Function Arguments", type: "video", duration: "25m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 22: Function Arguments in Python
✅ What are Function Arguments? (Very Simple)

Arguments are **values passed to a function** when calling it.

👉 Arguments allow functions to work with different data each time they're called.

---

🧠 Real-Life Example

Think of a vending machine 🥤:
* You select a drink (pass argument)
* Machine gives you that specific drink (function uses argument)

💡 Functions use arguments to customize their behavior.

---

💻 Why Do We Need Arguments?

We use arguments to:
* **Make functions flexible**
* **Pass data to functions**
* **Reuse same function with different values**
* **Create dynamic programs**

👉 Arguments make functions powerful and versatile.

---

🔹 **1. Positional Arguments**

Arguments passed in order:

\`\`\`python
def greet(name, age):
    print(f"Hello {name}, you are {age} years old")

greet("Alice", 25)
\`\`\`

📤 Output
\`Hello Alice, you are 25 years old\`

---

🔹 **2. Keyword Arguments**

Arguments passed by name:

\`\`\`python
def greet(name, age):
    print(f"Hello {name}, you are {age} years old")

greet(age=25, name="Alice")  # Order doesn't matter
\`\`\`

📤 Output
\`Hello Alice, you are 25 years old\`

---

🔹 **3. Default Arguments**

Arguments with default values:

\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Uses default
greet("Bob", "Hi")          # Uses provided value
\`\`\`

📤 Output
\`Hello, Alice!\`
\`Hi, Bob!\`

---

🔹 **4. Variable-Length Arguments (*args)**

Accept any number of positional arguments:

\`\`\`python
def add_all(*numbers):
    total = sum(numbers)
    return total

print(add_all(1, 2, 3))
print(add_all(10, 20, 30, 40))
\`\`\`

📤 Output
\`6\`
\`100\`

---

🔹 **5. Keyword Variable-Length Arguments (**kwargs)**

Accept any number of keyword arguments:

\`\`\`python
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="NYC")
\`\`\`

📤 Output
\`name: Alice\`
\`age: 25\`
\`city: NYC\`

---

💡 Combining Different Argument Types

\`\`\`python
def func(a, b=10, *args, **kwargs):
    print(f"a: {a}")
    print(f"b: {b}")
    print(f"args: {args}")
    print(f"kwargs: {kwargs}")

func(1, 2, 3, 4, x=5, y=6)
\`\`\`

📤 Output
\`a: 1\`
\`b: 2\`
\`args: (3, 4)\`
\`kwargs: {'x': 5, 'y': 6}\`

---

🧾 Syntax (Basic Idea)

\`\`\`python
def function(pos_arg, default_arg=value, *args, **kwargs):
    # function body
\`\`\`

---

❌ Common Beginner Mistakes
* Mixing positional and keyword arguments incorrectly ❌
* Putting default arguments before non-default ❌
* Confusing \`*args\` and \`**kwargs\` ❌
* Wrong order of argument types ❌

---

⭐ Key Points to Remember
* Positional arguments: passed by position
* Keyword arguments: passed by name
* Default arguments: have default values
* \`*args\`: variable positional arguments
* \`**kwargs\`: variable keyword arguments

---

📝 Practice Questions
1. Create function with positional arguments
2. Create function with default arguments
3. Use \`*args\` to accept multiple values
4. Use \`**kwargs\` to accept multiple key-value pairs
`
                    },
                    {
                        id: 'py-4-3', title: "Return Statement", type: "video", duration: "10m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 23: Return Statement in Python
✅ What is Return Statement? (Very Simple)

The \`return\` statement **sends a value back** from a function to the caller.

👉 Without return, a function performs actions but doesn't give back any result.

---

🧠 Real-Life Example

Think of an ATM 🏧:
* You request money (call function)
* ATM processes (function executes)
* ATM gives you cash (function returns value)

💡 Return statement is like getting the result back.

---

💻 Why Do We Need Return?

We use return to:
* **Get results from functions**
* **Use function output in other operations**
* **Make functions more useful**
* **Chain function calls**

👉 Return makes functions interactive.

---

💻 Example Code (Python)

**Without Return**:
\`\`\`python
def add(a, b):
    print(a + b)  # Just prints, doesn't return

result = add(5, 3)
print(result)  # None
\`\`\`

📤 Output
\`8\`
\`None\`

---

**With Return**:
\`\`\`python
def add(a, b):
    return a + b  # Returns the value

result = add(5, 3)
print(result)
\`\`\`

📤 Output
\`8\`

---

🔹 **Returning Multiple Values**

\`\`\`python
def get_user():
    name = "Alice"
    age = 25
    return name, age  # Returns tuple

user_name, user_age = get_user()
print(user_name)
print(user_age)
\`\`\`

📤 Output
\`Alice\`
\`25\`

---

🔹 **Early Return**

\`\`\`python
def check_age(age):
    if age < 18:
        return "Too young"
    return "Eligible"

print(check_age(15))
print(check_age(20))
\`\`\`

📤 Output
\`Too young\`
\`Eligible\`

---

❌ Common Beginner Mistakes
* Forgetting to use returned value ❌
* Code after return (unreachable code) ❌
* Confusing print and return ❌
* Not returning anything when needed ❌

---

⭐ Key Points to Remember
* \`return\` sends value back to caller
* Function stops executing after return
* Can return multiple values as tuple
* Functions without return give \`None\`
* \`return\` ≠ \`print\`

---

📝 Practice Questions
1. Create function that returns sum of two numbers
2. Create function that returns multiple values
3. Use returned value in another calculation
4. Create function with conditional return
`
                    },
                    {
                        id: 'py-4-4', title: "Lambda Functions", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 24: Lambda Functions in Python
✅ What are Lambda Functions? (Very Simple)

Lambda functions are **small anonymous functions** defined in one line.

👉 They are used for simple operations that don't need a full function definition.

---

🧠 Real-Life Example

Think of a quick calculator 🧮:
* Instead of building a full calculator app
* You use a simple handheld calculator for quick math

💡 Lambda is like a quick, throwaway function.

---

💻 Why Do We Need Lambda?

We use lambda for:
* **Quick, simple operations**
* **One-time use functions**
* **Functional programming**
* **Cleaner code for simple tasks**

👉 Lambda makes code concise.

---

🧾 Syntax (Basic Idea)

\`lambda arguments: expression\`

**Regular Function**:
\`\`\`python
def add(x, y):
    return x + y
\`\`\`

**Lambda Function**:
\`\`\`python
add = lambda x, y: x + y
\`\`\`

---

💻 Example Code (Python)

**Simple Lambda**:
\`\`\`python
# Lambda to double a number
double = lambda x: x * 2

print(double(5))
print(double(10))
\`\`\`

📤 Output
\`10\`
\`20\`

---

🔹 **Lambda with Multiple Arguments**

\`\`\`python
add = lambda x, y: x + y
print(add(3, 5))

multiply = lambda x, y, z: x * y * z
print(multiply(2, 3, 4))
\`\`\`

📤 Output
\`8\`
\`24\`

---

🔹 **Lambda with map()**

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)
\`\`\`

📤 Output
\`[1, 4, 9, 16, 25]\`

---

🔹 **Lambda with filter()**

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]
even = list(filter(lambda x: x % 2 == 0, numbers))
print(even)
\`\`\`

📤 Output
\`[2, 4, 6]\`

---

🔹 **Lambda with sorted()**

\`\`\`python
students = [('Alice', 25), ('Bob', 20), ('Charlie', 23)]
sorted_students = sorted(students, key=lambda x: x[1])
print(sorted_students)
\`\`\`

📤 Output
\`[('Bob', 20), ('Charlie', 23), ('Alice', 25)]\`

---

🆚 Lambda vs Regular Function

| Feature | Lambda | Regular Function |
|---------|--------|------------------|
| **Syntax** | One line | Multiple lines |
| **Name** | Anonymous | Has name |
| **Use** | Simple operations | Complex logic |
| **Return** | Implicit | Explicit \`return\` |

---

❌ Common Beginner Mistakes
* Using lambda for complex logic ❌
* Forgetting lambda is an expression ❌
* Not understanding when to use lambda ❌
* Trying to add multiple statements ❌

---

⭐ Key Points to Remember
* Lambda creates anonymous functions
* Lambda is one-line function
* Use for simple operations only
* Great with \`map()\`, \`filter()\`, \`sorted()\`
* Can't contain multiple statements

---

📝 Practice Questions
1. Create lambda to square a number
2. Use lambda with map() to double all numbers
3. Use lambda with filter() to get odd numbers
4. Sort list of tuples using lambda
`
                    },
                    {
                        id: 'py-4-5', title: "Modules", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 25: Modules in Python
✅ What are Modules? (Very Simple)

A module is a **file containing Python code** (functions, variables, classes) that can be reused in other programs.

👉 Modules help organize code and avoid rewriting the same code.

---

🧠 Real-Life Example

Think of a toolbox 🧰:
* Instead of carrying all tools everywhere
* You have a toolbox with organized tools
* You take out only what you need

💡 Modules are like toolboxes of code.

---

💻 Why Do We Need Modules?

We use modules to:
* **Organize code better**
* **Reuse code across projects**
* **Use built-in Python features**
* **Share code with others**

👉 Modules make programming efficient.

---

🔹 **Types of Modules**

1️⃣ **Built-in Modules** (come with Python)
* \`math\`, \`random\`, \`datetime\`, \`os\`

2️⃣ **Custom Modules** (you create)
* Your own .py files

3️⃣ **Third-party Modules** (install via pip)
* \`numpy\`, \`pandas\`, \`requests\`

---

🧩 Importing Modules

**Method 1: Import entire module**
\`\`\`python
import math
print(math.sqrt(16))
print(math.pi)
\`\`\`

📤 Output
\`4.0\`
\`3.141592653589793\`

---

**Method 2: Import specific items**
\`\`\`python
from math import sqrt, pi
print(sqrt(25))
print(pi)
\`\`\`

📤 Output
\`5.0\`
\`3.141592653589793\`

---

**Method 3: Import with alias**
\`\`\`python
import math as m
print(m.sqrt(9))
\`\`\`

📤 Output
\`3.0\`

---

🔹 **Common Built-in Modules**

**math module**:
\`\`\`python
import math
print(math.ceil(4.3))   # 5
print(math.floor(4.7))  # 4
print(math.pow(2, 3))   # 8.0
\`\`\`

---

**random module**:
\`\`\`python
import random
print(random.randint(1, 10))  # Random number 1-10
print(random.choice(['a', 'b', 'c']))  # Random choice
\`\`\`

---

**datetime module**:
\`\`\`python
import datetime
now = datetime.datetime.now()
print(now)
\`\`\`

---

🔹 **Creating Custom Module**

**mymodule.py**:
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159
\`\`\`

**main.py**:
\`\`\`python
import mymodule

print(mymodule.greet("Alice"))
print(mymodule.PI)
\`\`\`

---

❌ Common Beginner Mistakes
* Circular imports ❌
* Using \`from module import *\` ❌
* Not understanding module path ❌
* Naming file same as built-in module ❌

---

⭐ Key Points to Remember
* Modules are reusable code files
* Use \`import\` to use modules
* Python has many built-in modules
* Can create custom modules
* Modules help organize code

---

📝 Practice Questions
1. Import math module and use sqrt()
2. Import random and generate random number
3. Create your own module with functions
4. Import specific function from module
`
                    },
                    {
                        id: 'py-4-6', title: "Packages", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 26: Packages in Python
✅ What are Packages? (Very Simple)

A package is a **folder containing multiple modules** organized together.

👉 Packages help organize related modules into a directory structure.

---

🧠 Real-Life Example

Think of a library 📚:
* Library has different sections (Science, History, Fiction)
* Each section has multiple books
* Books are organized by category

💡 Packages organize modules the same way.

---

💻 Why Do We Need Packages?

We use packages to:
* **Organize large projects**
* **Group related modules**
* **Avoid naming conflicts**
* **Create distributable libraries**

👉 Packages make large projects manageable.

---

🧩 Package Structure

\`\`\`
mypackage/
    __init__.py
    module1.py
    module2.py
    subpackage/
        __init__.py
        module3.py
\`\`\`

---

🔹 **Creating a Package**

**Step 1: Create folder structure**
\`\`\`
mypackage/
    __init__.py
    math_ops.py
    string_ops.py
\`\`\`

**Step 2: Create __init__.py**
\`\`\`python
# mypackage/__init__.py
# Can be empty or contain initialization code
\`\`\`

**Step 3: Create modules**
\`\`\`python
# mypackage/math_ops.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b
\`\`\`

---

🔹 **Using a Package**

**Method 1: Import module from package**
\`\`\`python
from mypackage import math_ops

result = math_ops.add(5, 3)
print(result)
\`\`\`

📤 Output
\`8\`

---

**Method 2: Import specific function**
\`\`\`python
from mypackage.math_ops import add

result = add(10, 20)
print(result)
\`\`\`

📤 Output
\`30\`

---

🔹 **The __init__.py File**

The \`__init__.py\` file:
* Makes Python treat directory as package
* Can be empty
* Can contain initialization code
* Can define \`__all__\` for package exports

**Example __init__.py**:
\`\`\`python
# mypackage/__init__.py
from .math_ops import add, multiply
from .string_ops import uppercase

__all__ = ['add', 'multiply', 'uppercase']
\`\`\`

---

🔹 **Subpackages**

\`\`\`
mypackage/
    __init__.py
    math/
        __init__.py
        basic.py
        advanced.py
    string/
        __init__.py
        operations.py
\`\`\`

**Usage**:
\`\`\`python
from mypackage.math.basic import add
from mypackage.string.operations import uppercase
\`\`\`

---

🔹 **Popular Python Packages**

* **numpy**: Numerical computing
* **pandas**: Data analysis
* **requests**: HTTP requests
* **flask**: Web framework
* **django**: Web framework
* **matplotlib**: Data visualization

---

🆚 Module vs Package

| Feature | Module | Package |
|---------|--------|----------|
| **Definition** | Single .py file | Folder with modules |
| **Contains** | Functions, classes | Multiple modules |
| **Structure** | Flat | Hierarchical |
| **Example** | \`math.py\` | \`numpy/\` |

---

❌ Common Beginner Mistakes
* Forgetting \`__init__.py\` file ❌
* Wrong import paths ❌
* Circular imports in packages ❌
* Not understanding relative imports ❌

---

⭐ Key Points to Remember
* Package = folder with modules
* \`__init__.py\` makes folder a package
* Packages organize related modules
* Can have subpackages
* Use dot notation to import

---

📝 Practice Questions
1. Create a simple package with 2 modules
2. Import function from your package
3. Create package with subpackages
4. Understand \`__init__.py\` purpose
`
                    },
                ]
            },

            // --- MODULE 5: File Handling & Errors ---
            {
                id: 5,
                title: "Module 5: File Handling & Errors",
                topics: [
                    {
                        id: 'py-5-1', title: "File Handling", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 27: File Handling in Python
✅ What is File Handling? (Very Simple)

File handling is the process of **reading from** and **writing to** files on your computer.

👉 Files allow programs to store and retrieve data permanently.

---

🧠 Real-Life Example

Think of a notebook 📓:
* You write notes (write to file)
* You read notes later (read from file)
* You can add more notes (append to file)

💡 File handling works the same way in programming.

---

💻 Why Do We Need File Handling?

We use file handling to:
* **Save data permanently**
* **Read configuration files**
* **Process large datasets**
* **Create logs**

👉 Without files, data is lost when program ends.

---

🔹 **File Modes**

| Mode | Description |
|------|-------------|
| \`'r'\` | Read (default) |
| \`'w'\` | Write (overwrites) |
| \`'a'\` | Append (adds to end) |
| \`'r+'\` | Read and Write |
| \`'b'\` | Binary mode |

---

🧩 Opening and Closing Files

**Method 1: Manual close**
\`\`\`python
file = open("example.txt", "r")
content = file.read()
file.close()  # Must close manually
\`\`\`

**Method 2: Using \`with\` (Recommended)**
\`\`\`python
with open("example.txt", "r") as file:
    content = file.read()
# File closes automatically
\`\`\`

---

💻 Reading Files

**Read entire file**:
\`\`\`python
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
\`\`\`

---

**Read line by line**:
\`\`\`python
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())
\`\`\`

---

**Read all lines into list**:
\`\`\`python
with open("example.txt", "r") as file:
    lines = file.readlines()
    print(lines)
\`\`\`

---

💻 Writing to Files

**Write to file (overwrites)**:
\`\`\`python
with open("output.txt", "w") as file:
    file.write("Hello, World!\\n")
    file.write("Python is awesome!")
\`\`\`

📤 Creates/overwrites \`output.txt\` with:
\`Hello, World!\`
\`Python is awesome!\`

---

**Append to file**:
\`\`\`python
with open("output.txt", "a") as file:
    file.write("\\nNew line added!")
\`\`\`

---

🔹 **Complete Example**

\`\`\`python
# Writing to file
with open("students.txt", "w") as file:
    file.write("Alice\\n")
    file.write("Bob\\n")
    file.write("Charlie\\n")

# Reading from file
with open("students.txt", "r") as file:
    students = file.read()
    print(students)
\`\`\`

📤 Output
\`Alice\`
\`Bob\`
\`Charlie\`

---

🔹 **Checking if File Exists**

\`\`\`python
import os

if os.path.exists("example.txt"):
    print("File exists")
else:
    print("File not found")
\`\`\`

---

🔹 **Working with File Paths**

\`\`\`python
import os

# Get current directory
print(os.getcwd())

# Join paths
path = os.path.join("folder", "file.txt")
print(path)
\`\`\`

---

🔹 **Binary Files**

\`\`\`python
# Read binary file
with open("image.png", "rb") as file:
    data = file.read()

# Write binary file
with open("copy.png", "wb") as file:
    file.write(data)
\`\`\`

---

❌ Common Beginner Mistakes
* Forgetting to close file ❌
* Using wrong file mode ❌
* Not checking if file exists ❌
* Not handling file errors ❌

---

⭐ Key Points to Remember
* Always use \`with\` statement
* \`'r'\` for reading, \`'w'\` for writing
* \`'w'\` overwrites, \`'a'\` appends
* Files close automatically with \`with\`
* Check if file exists before reading

---

📝 Practice Questions
1. Create a file and write your name
2. Read a file and print its contents
3. Append text to existing file
4. Read file line by line
`
                    },
                    {
                        id: 'py-5-2', title: "Exception Handling", type: "video", duration: "25m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 28: Exception Handling in Python
✅ What is Exception Handling? (Very Simple)

Exception handling is a way to **handle errors gracefully** without crashing the program.

👉 When an error occurs, we can catch it and decide what to do instead of letting the program crash.

---

🧠 Real-Life Example

Think of a safety net 🎪:
* Acrobat performs (code runs)
* If they fall (error occurs)
* Safety net catches them (exception handling)
* Show continues (program keeps running)

💡 Exception handling prevents program crashes.

---

💻 Why Do We Need Exception Handling?

We use exception handling to:
* **Prevent program crashes**
* **Handle unexpected errors**
* **Provide user-friendly error messages**
* **Clean up resources properly**

👉 Makes programs robust and reliable.

---

🧩 Try-Except Syntax

\`\`\`python
try:
    # Code that might cause error
    risky_code()
except:
    # Code to run if error occurs
    handle_error()
\`\`\`

---

💻 Example Code (Python)

**Without Exception Handling**:
\`\`\`python
number = int(input("Enter a number: "))
print(10 / number)
# Crashes if user enters 0 or non-number
\`\`\`

---

**With Exception Handling**:
\`\`\`python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(result)
except:
    print("Error occurred!")
\`\`\`

📤 Output (if user enters 0)
\`Error occurred!\`

---

🔹 **Catching Specific Exceptions**

\`\`\`python
try:
    number = int(input("Enter number: "))
    result = 10 / number
    print(result)
except ValueError:
    print("Please enter a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
\`\`\`

---

🔹 **Try-Except-Else**

\`\`\`python
try:
    number = int(input("Enter number: "))
    result = 10 / number
except ZeroDivisionError:
    print("Cannot divide by zero!")
else:
    print(f"Result: {result}")
\`\`\`

👉 \`else\` runs only if no exception occurs.

---

🔹 **Try-Except-Finally**

\`\`\`python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found!")
finally:
    print("This always executes")
\`\`\`

👉 \`finally\` always runs, even if exception occurs.

---

🔹 **Getting Exception Details**

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
\`\`\`

📤 Output
\`Error: division by zero\`

---

🔹 **Common Built-in Exceptions**

| Exception | Description |
|-----------|-------------|
| \`ValueError\` | Invalid value |
| \`TypeError\` | Wrong type |
| \`ZeroDivisionError\` | Division by zero |
| \`FileNotFoundError\` | File doesn't exist |
| \`KeyError\` | Key not in dictionary |
| \`IndexError\` | Index out of range |

---

💻 Complete Example

\`\`\`python
def divide_numbers():
    try:
        a = int(input("Enter first number: "))
        b = int(input("Enter second number: "))
        result = a / b
    except ValueError:
        print("Please enter valid numbers!")
    except ZeroDivisionError:
        print("Cannot divide by zero!")
    else:
        print(f"Result: {result}")
    finally:
        print("Operation completed")

divide_numbers()
\`\`\`

---

🔹 **Multiple Exceptions in One Block**

\`\`\`python
try:
    # Some code
    pass
except (ValueError, TypeError, KeyError):
    print("One of these errors occurred")
\`\`\`

---

❌ Common Beginner Mistakes
* Using bare \`except\` (catches everything) ❌
* Not specifying exception type ❌
* Ignoring exceptions silently ❌
* Not cleaning up resources ❌

---

⭐ Key Points to Remember
* Use \`try-except\` to handle errors
* Catch specific exceptions when possible
* \`else\` runs if no exception
* \`finally\` always runs
* Don't use bare \`except\`

---

📝 Practice Questions
1. Handle division by zero error
2. Handle file not found error
3. Use try-except-else-finally
4. Catch multiple exception types
`
                    },
                    {
                        id: 'py-5-3', title: "Custom Exceptions", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 29: Custom Exceptions in Python
✅ What are Custom Exceptions? (Very Simple)

Custom exceptions are **user-defined error types** that you create for specific situations in your program.

👉 They help make error handling more specific and meaningful.

---

🧠 Real-Life Example

Think of traffic signs 🚦:
* Standard signs (built-in exceptions)
* Custom signs for specific locations (custom exceptions)
* "School Zone - Slow Down" is more specific than just "Slow"

💡 Custom exceptions provide specific error messages.

---

💻 Why Do We Need Custom Exceptions?

We use custom exceptions to:
* **Create domain-specific errors**
* **Make code more readable**
* **Provide better error messages**
* **Handle business logic errors**

👉 Makes error handling more meaningful.

---

🧩 Raising Exceptions

**Basic raise**:
\`\`\`python
age = -5
if age < 0:
    raise ValueError("Age cannot be negative")
\`\`\`

📤 Output
\`ValueError: Age cannot be negative\`

---

💻 Creating Custom Exception

**Simple custom exception**:
\`\`\`python
class NegativeAgeError(Exception):
    pass

age = -5
if age < 0:
    raise NegativeAgeError("Age cannot be negative!")
\`\`\`

---

🔹 **Custom Exception with Message**

\`\`\`python
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        message = f"Insufficient funds! Balance: {balance}, Needed: {amount}"
        super().__init__(message)

# Using the custom exception
balance = 100
withdraw = 150

if withdraw > balance:
    raise InsufficientFundsError(balance, withdraw)
\`\`\`

---

💻 Complete Example

\`\`\`python
class AgeValidationError(Exception):
    """Custom exception for age validation"""
    pass

def check_age(age):
    if age < 0:
        raise AgeValidationError("Age cannot be negative")
    elif age > 150:
        raise AgeValidationError("Age seems unrealistic")
    else:
        print(f"Age {age} is valid")

try:
    check_age(-5)
except AgeValidationError as e:
    print(f"Error: {e}")
\`\`\`

📤 Output
\`Error: Age cannot be negative\`

---

🔹 **Multiple Custom Exceptions**

\`\`\`python
class InvalidEmailError(Exception):
    pass

class InvalidPasswordError(Exception):
    pass

def validate_user(email, password):
    if "@" not in email:
        raise InvalidEmailError("Email must contain @")
    if len(password) < 8:
        raise InvalidPasswordError("Password too short")
    print("User validated successfully")

try:
    validate_user("test", "123")
except InvalidEmailError as e:
    print(f"Email Error: {e}")
except InvalidPasswordError as e:
    print(f"Password Error: {e}")
\`\`\`

---

🔹 **Custom Exception Hierarchy**

\`\`\`python
class PaymentError(Exception):
    """Base exception for payment errors"""
    pass

class InsufficientFundsError(PaymentError):
    """Raised when balance is low"""
    pass

class InvalidCardError(PaymentError):
    """Raised when card is invalid"""
    pass

# Using them
try:
    raise InsufficientFundsError("Not enough money")
except PaymentError as e:
    print(f"Payment failed: {e}")
\`\`\`

---

🔹 **Re-raising Exceptions**

\`\`\`python
try:
    # Some operation
    raise ValueError("Something went wrong")
except ValueError as e:
    print(f"Caught: {e}")
    raise  # Re-raise the same exception
\`\`\`

---

🔹 **Assert Statement**

\`\`\`python
def calculate_percentage(score, total):
    assert total > 0, "Total cannot be zero"
    return (score / total) * 100

try:
    result = calculate_percentage(50, 0)
except AssertionError as e:
    print(f"Assertion failed: {e}")
\`\`\`

---

💡 Best Practices

1. **Inherit from Exception**
\`\`\`python
class MyError(Exception):  # Good
    pass
\`\`\`

2. **Use descriptive names**
\`\`\`python
class InvalidUserInputError(Exception):  # Clear
    pass
\`\`\`

3. **Add docstrings**
\`\`\`python
class CustomError(Exception):
    """Raised when custom condition fails"""
    pass
\`\`\`

---

❌ Common Beginner Mistakes
* Not inheriting from Exception ❌
* Raising generic exceptions ❌
* Not providing error messages ❌
* Overusing custom exceptions ❌

---

⭐ Key Points to Remember
* Custom exceptions inherit from \`Exception\`
* Use \`raise\` to throw exceptions
* Provide meaningful error messages
* Create exception hierarchy when needed
* Use \`assert\` for debugging

---

📝 Practice Questions
1. Create a custom exception for invalid age
2. Raise a custom exception with message
3. Create multiple related custom exceptions
4. Use try-except with custom exceptions
`
                    },
                ]
            },

            // --- MODULE 6: OOP ---
            {
                id: 6,
                title: "Module 6: OOP",
                topics: [
                    {
                        id: 'py-6-1', title: "OOP Concepts", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 30: OOP Concepts in Python
✅ What is OOP? (Very Simple)

OOP (Object-Oriented Programming) is a programming style that uses **objects** and **classes** to organize code.

👉 Instead of writing functions separately, we group related data and functions together.

---

🧠 Real-Life Example

Think of a car 🚗:
* **Class**: Blueprint/design of a car
* **Object**: Actual car built from blueprint
* **Attributes**: Color, model, speed
* **Methods**: Start, stop, accelerate

💡 OOP models real-world things in code.

---

💻 Why Do We Need OOP?

We use OOP to:
* **Organize code better**
* **Reuse code easily**
* **Model real-world objects**
* **Make code maintainable**

👉 OOP makes large projects manageable.

---

🔑 Four Pillars of OOP

1️⃣ **Encapsulation** - Bundling data and methods
2️⃣ **Inheritance** - Reusing code from parent class
3️⃣ **Polymorphism** - Same method, different behavior
4️⃣ **Abstraction** - Hiding complex details

---

🧩 Class vs Object

**Class**: Blueprint or template
**Object**: Instance created from class

\`\`\`python
# Class (blueprint)
class Car:
    pass

# Objects (instances)
car1 = Car()
car2 = Car()
\`\`\`

---

💻 Simple Example

\`\`\`python
class Dog:
    # Class attribute
    species = "Canine"
    
    # Method
    def bark(self):
        print("Woof!")

# Create object
my_dog = Dog()
print(my_dog.species)
my_dog.bark()
\`\`\`

📤 Output
\`Canine\`
\`Woof!\`

---

🔹 **1. Encapsulation**

Bundling data and methods together:

\`\`\`python
class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    
    def deposit(self, amount):
        self.balance += amount
    
    def get_balance(self):
        return self.balance

account = BankAccount(1000)
account.deposit(500)
print(account.get_balance())
\`\`\`

📤 Output
\`1500\`

---

🔹 **2. Inheritance**

Child class inherits from parent:

\`\`\`python
class Animal:
    def speak(self):
        print("Some sound")

class Dog(Animal):
    def speak(self):
        print("Woof!")

dog = Dog()
dog.speak()
\`\`\`

📤 Output
\`Woof!\`

---

🔹 **3. Polymorphism**

Same method name, different behavior:

\`\`\`python
class Cat:
    def speak(self):
        print("Meow")

class Dog:
    def speak(self):
        print("Woof")

animals = [Cat(), Dog()]
for animal in animals:
    animal.speak()
\`\`\`

📤 Output
\`Meow\`
\`Woof\`

---

🔹 **4. Abstraction**

Hiding implementation details:

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

circle = Circle(5)
print(circle.area())
\`\`\`

---

💡 Benefits of OOP

✅ **Modularity**: Code is organized in classes
✅ **Reusability**: Inherit from existing classes
✅ **Maintainability**: Easy to update and fix
✅ **Flexibility**: Polymorphism allows flexibility

---

❌ Common Beginner Mistakes
* Confusing class and object ❌
* Not using \`self\` in methods ❌
* Overusing OOP for simple tasks ❌
* Not understanding inheritance ❌

---

⭐ Key Points to Remember
* Class = blueprint, Object = instance
* Four pillars: Encapsulation, Inheritance, Polymorphism, Abstraction
* Use \`self\` to access instance variables
* OOP helps organize complex code
* Not everything needs to be a class

---

📝 Practice Questions
1. Explain the difference between class and object
2. Name the four pillars of OOP
3. Create a simple class with attributes and methods
4. Give a real-life example of inheritance
`
                    },
                    {
                        id: 'py-6-2', title: "Classes & Objects", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 31: Classes & Objects in Python
✅ What are Classes & Objects? (Very Simple)

A **class** is a blueprint for creating objects.
An **object** is an instance created from a class.

👉 Class defines structure, objects are actual instances.

---

🧠 Real-Life Example

Think of a cookie cutter 🍪:
* **Class**: Cookie cutter (blueprint)
* **Objects**: Actual cookies made from it

💡 One class can create many objects.

---

💻 Why Do We Need Classes?

We use classes to:
* **Group related data and functions**
* **Create multiple similar objects**
* **Organize code logically**
* **Implement OOP principles**

👉 Classes make code reusable and organized.

---

🧩 Creating a Class

\`\`\`python
class Dog:
    # Class attribute
    species = "Canine"
    
    # Method
    def bark(self):
        print("Woof!")
\`\`\`

---

💻 Creating Objects

\`\`\`python
# Create objects from class
dog1 = Dog()
dog2 = Dog()

# Access attributes
print(dog1.species)

# Call methods
dog1.bark()
\`\`\`

📤 Output
\`Canine\`
\`Woof!\`

---

🔹 **Instance Attributes**

\`\`\`python
class Dog:
    def __init__(self, name, age):
        self.name = name  # Instance attribute
        self.age = age
    
    def info(self):
        print(f"{self.name} is {self.age} years old")

dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)

dog1.info()
dog2.info()
\`\`\`

📤 Output
\`Buddy is 3 years old\`
\`Max is 5 years old\`

---

🔹 **Class vs Instance Attributes**

\`\`\`python
class Dog:
    species = "Canine"  # Class attribute (shared)
    
    def __init__(self, name):
        self.name = name  # Instance attribute (unique)

dog1 = Dog("Buddy")
dog2 = Dog("Max")

print(dog1.species)  # Canine
print(dog2.species)  # Canine
print(dog1.name)     # Buddy
print(dog2.name)     # Max
\`\`\`

---

🔹 **Methods**

\`\`\`python
class Calculator:
    def add(self, a, b):
        return a + b
    
    def multiply(self, a, b):
        return a * b

calc = Calculator()
print(calc.add(5, 3))
print(calc.multiply(4, 2))
\`\`\`

📤 Output
\`8\`
\`8\`

---

🔹 **The self Parameter**

\`self\` refers to the current instance:

\`\`\`python
class Person:
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        print(f"Hello, I'm {self.name}")

person = Person("Alice")
person.greet()
\`\`\`

📤 Output
\`Hello, I'm Alice\`

---

🔹 **Modifying Attributes**

\`\`\`python
class Car:
    def __init__(self, speed):
        self.speed = speed
    
    def accelerate(self):
        self.speed += 10

car = Car(50)
print(car.speed)  # 50
car.accelerate()
print(car.speed)  # 60
\`\`\`

---

💡 Complete Example

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited {amount}")
    
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew {amount}")
        else:
            print("Insufficient funds")
    
    def show_balance(self):
        print(f"{self.owner}'s balance: {self.balance}")

# Create account
account = BankAccount("Alice", 1000)
account.show_balance()
account.deposit(500)
account.withdraw(200)
account.show_balance()
\`\`\`

---

❌ Common Beginner Mistakes
* Forgetting \`self\` parameter ❌
* Calling class instead of object ❌
* Confusing class and instance attributes ❌
* Not using \`__init__\` properly ❌

---

⭐ Key Points to Remember
* Class = blueprint, Object = instance
* Use \`self\` to access instance variables
* \`__init__\` initializes objects
* Class attributes are shared
* Instance attributes are unique

---

📝 Practice Questions
1. Create a class with attributes and methods
2. Create multiple objects from one class
3. Understand difference between class and instance attributes
4. Modify object attributes using methods
`
                    },
                    {
                        id: 'py-6-3', title: "Constructors", type: "video", duration: "25m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 32: Constructors in Python
✅ What is a Constructor? (Very Simple)

A constructor is a special method that **automatically runs when an object is created**.

👉 In Python, the constructor is the \`__init__()\` method.

---

🧠 Real-Life Example

Think of setting up a new phone 📱:
* When you first turn it on (create object)
* Setup wizard runs automatically (constructor)
* Sets language, time, etc. (initializes attributes)

💡 Constructors initialize objects automatically.

---

💻 Why Do We Need Constructors?

We use constructors to:
* **Initialize object attributes**
* **Set default values**
* **Run setup code automatically**
* **Ensure objects start in valid state**

👉 Constructors save repetitive initialization code.

---

🧩 Basic Constructor

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print("Person object created!")

person = Person("Alice", 25)
\`\`\`

📤 Output
\`Person object created!\`

---

🔹 **Constructor with Default Parameters**

\`\`\`python
class Car:
    def __init__(self, brand, model="Unknown"):
        self.brand = brand
        self.model = model

car1 = Car("Toyota", "Camry")
car2 = Car("Honda")  # Uses default

print(car1.model)  # Camry
print(car2.model)  # Unknown
\`\`\`

---

🔹 **Constructor with Validation**

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        if balance < 0:
            print("Balance cannot be negative!")
            self.balance = 0
        else:
            self.balance = balance

account = BankAccount("Alice", -100)
print(account.balance)  # 0
\`\`\`

---

💡 Complete Example

\`\`\`python
class Student:
    def __init__(self, name, roll_no, marks=0):
        self.name = name
        self.roll_no = roll_no
        self.marks = marks
        print(f"Student {name} enrolled!")
    
    def display(self):
        print(f"Name: {self.name}")
        print(f"Roll No: {self.roll_no}")
        print(f"Marks: {self.marks}")

student = Student("Bob", 101, 85)
student.display()
\`\`\`

📤 Output
\`Student Bob enrolled!\`
\`Name: Bob\`
\`Roll No: 101\`
\`Marks: 85\`

---

❌ Common Beginner Mistakes
* Forgetting \`self\` parameter ❌
* Misspelling \`__init__\` ❌
* Not calling parent constructor in inheritance ❌
* Returning value from constructor ❌

---

⭐ Key Points to Remember
* \`__init__()\` is the constructor
* Runs automatically when object is created
* First parameter must be \`self\`
* Can have default parameters
* Used to initialize attributes

---

📝 Practice Questions
1. Create class with constructor
2. Use default parameters in constructor
3. Add validation in constructor
4. Initialize multiple attributes
`
                    },
                    {
                        id: 'py-6-4', title: "Inheritance", type: "video", duration: "25m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 33: Inheritance in Python
✅ What is Inheritance? (Very Simple)

Inheritance allows a class to **inherit attributes and methods from another class**.

👉 Child class gets all features of parent class plus can add its own.

---

🧠 Real-Life Example

Think of family traits 👨‍👩‍👧:
* Parents have certain features (parent class)
* Children inherit those features (child class)
* Children can also have unique features

💡 Inheritance promotes code reuse.

---

💻 Why Do We Need Inheritance?

We use inheritance to:
* **Reuse existing code**
* **Create hierarchies**
* **Extend functionality**
* **Implement "is-a" relationships**

👉 Inheritance reduces code duplication.

---

🧩 Basic Inheritance

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print("Some sound")

class Dog(Animal):  # Dog inherits from Animal
    def speak(self):
        print("Woof!")

dog = Dog("Buddy")
print(dog.name)  # Inherited attribute
dog.speak()      # Overridden method
\`\`\`

📤 Output
\`Buddy\`
\`Woof!\`

---

🔹 **Accessing Parent Methods**

\`\`\`python
class Animal:
    def eat(self):
        print("Eating...")

class Dog(Animal):
    def bark(self):
        print("Woof!")

dog = Dog()
dog.eat()   # From parent
dog.bark()  # From child
\`\`\`

📤 Output
\`Eating...\`
\`Woof!\`

---

🔹 **Using super()**

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent constructor
        self.breed = breed

dog = Dog("Buddy", "Labrador")
print(dog.name)   # Buddy
print(dog.breed)  # Labrador
\`\`\`

---

🔹 **Method Overriding**

\`\`\`python
class Animal:
    def sound(self):
        print("Some sound")

class Cat(Animal):
    def sound(self):  # Override parent method
        print("Meow")

cat = Cat()
cat.sound()  # Calls child's method
\`\`\`

📤 Output
\`Meow\`

---

🔹 **Multiple Inheritance**

\`\`\`python
class Father:
    def skills(self):
        print("Gardening")

class Mother:
    def skills(self):
        print("Cooking")

class Child(Father, Mother):
    pass

child = Child()
child.skills()  # Calls Father's method (MRO)
\`\`\`

---

💡 Complete Example

\`\`\`python
class Vehicle:
    def __init__(self, brand):
        self.brand = brand
    
    def start(self):
        print(f"{self.brand} starting...")

class Car(Vehicle):
    def __init__(self, brand, model):
        super().__init__(brand)
        self.model = model
    
    def drive(self):
        print(f"Driving {self.brand} {self.model}")

class ElectricCar(Car):
    def __init__(self, brand, model, battery):
        super().__init__(brand, model)
        self.battery = battery
    
    def charge(self):
        print(f"Charging {self.battery}kWh battery")

tesla = ElectricCar("Tesla", "Model 3", 75)
tesla.start()   # From Vehicle
tesla.drive()   # From Car
tesla.charge()  # From ElectricCar
\`\`\`

---

❌ Common Beginner Mistakes
* Not calling parent constructor ❌
* Circular inheritance ❌
* Overusing multiple inheritance ❌
* Not understanding MRO ❌

---

⭐ Key Points to Remember
* Child class inherits from parent
* Use \`super()\` to access parent
* Can override parent methods
* Multiple inheritance possible
* Promotes code reuse

---

📝 Practice Questions
1. Create parent and child classes
2. Override a parent method
3. Use super() in constructor
4. Create multi-level inheritance
`
                    },
                    {
                        id: 'py-6-5', title: "Polymorphism", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 34: Polymorphism in Python
✅ What is Polymorphism? (Very Simple)

Polymorphism means "**many forms**" - same method name behaves differently in different classes.

👉 One interface, multiple implementations.

---

🧠 Real-Life Example

Think of a remote control 🎮:
* Same "Play" button
* Works differently for TV, DVD, Music Player
* Same action, different results

💡 Polymorphism allows flexibility in code.

---

💻 Why Do We Need Polymorphism?

We use polymorphism to:
* **Write flexible code**
* **Use same interface for different types**
* **Implement method overriding**
* **Make code extensible**

👉 Polymorphism makes code adaptable.

---

🧩 Method Overriding

\`\`\`python
class Animal:
    def speak(self):
        print("Some sound")

class Dog(Animal):
    def speak(self):
        print("Woof!")

class Cat(Animal):
    def speak(self):
        print("Meow!")

# Polymorphism in action
animals = [Dog(), Cat(), Animal()]
for animal in animals:
    animal.speak()
\`\`\`

📤 Output
\`Woof!\`
\`Meow!\`
\`Some sound\`

---

🔹 **Polymorphism with Functions**

\`\`\`python
def make_sound(animal):
    animal.speak()

dog = Dog()
cat = Cat()

make_sound(dog)  # Woof!
make_sound(cat)  # Meow!
\`\`\`

---

🔹 **Duck Typing**

\`\`\`python
class Dog:
    def speak(self):
        print("Woof")

class Cat:
    def speak(self):
        print("Meow")

class Robot:
    def speak(self):
        print("Beep")

# All have speak() method
def make_it_speak(obj):
    obj.speak()

make_it_speak(Dog())
make_it_speak(Cat())
make_it_speak(Robot())
\`\`\`

📤 Output
\`Woof\`
\`Meow\`
\`Beep\`

---

💡 Complete Example

\`\`\`python
class Shape:
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

# Polymorphism
shapes = [Rectangle(5, 10), Circle(7)]
for shape in shapes:
    print(f"Area: {shape.area()}")
\`\`\`

📤 Output
\`Area: 50\`
\`Area: 153.86\`

---

❌ Common Beginner Mistakes
* Confusing polymorphism with inheritance ❌
* Not implementing required methods ❌
* Overcomplicating simple code ❌

---

⭐ Key Points to Remember
* Same method, different behavior
* Achieved through method overriding
* Duck typing in Python
* Makes code flexible
* One interface, many implementations

---

📝 Practice Questions
1. Create classes with same method name
2. Use polymorphism with list of objects
3. Implement duck typing
4. Override methods in child classes
`
                    },
                    {
                        id: 'py-6-6', title: "Encapsulation", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 35: Encapsulation in Python
✅ What is Encapsulation? (Very Simple)

Encapsulation means **bundling data and methods together** and **hiding internal details**.

👉 Protects data from direct access and modification.

---

🧠 Real-Life Example

Think of a capsule pill 💊:
* Medicine is inside (data)
* Outer coating protects it (encapsulation)
* You can't directly access medicine

💡 Encapsulation protects data integrity.

---

💻 Why Do We Need Encapsulation?

We use encapsulation to:
* **Protect data from unauthorized access**
* **Hide implementation details**
* **Control how data is accessed**
* **Make code maintainable**

👉 Encapsulation ensures data security.

---

🧩 Public, Protected, Private

\`\`\`python
class BankAccount:
    def __init__(self):
        self.public = "Everyone can access"
        self._protected = "Hint: Don't access directly"
        self.__private = "Cannot access directly"

account = BankAccount()
print(account.public)      # Works
print(account._protected)  # Works but not recommended
# print(account.__private) # Error!
\`\`\`

---

🔹 **Private Variables**

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.__age = age  # Private variable
    
    def get_age(self):
        return self.__age
    
    def set_age(self, age):
        if age > 0:
            self.__age = age

person = Person("Alice", 25)
print(person.get_age())  # 25
person.set_age(30)
print(person.get_age())  # 30
\`\`\`

---

🔹 **Getters and Setters**

\`\`\`python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance
    
    def get_balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
    
    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount

account = BankAccount(1000)
account.deposit(500)
print(account.get_balance())
\`\`\`

📤 Output
\`1500\`

---

🔹 **Using @property**

\`\`\`python
class Circle:
    def __init__(self, radius):
        self.__radius = radius
    
    @property
    def radius(self):
        return self.__radius
    
    @radius.setter
    def radius(self, value):
        if value > 0:
            self.__radius = value
    
    @property
    def area(self):
        return 3.14 * self.__radius ** 2

circle = Circle(5)
print(circle.radius)  # 5
print(circle.area)    # 78.5
circle.radius = 10
print(circle.area)    # 314.0
\`\`\`

---

💡 Complete Example

\`\`\`python
class Student:
    def __init__(self, name, marks):
        self.__name = name
        self.__marks = marks
    
    @property
    def name(self):
        return self.__name
    
    @property
    def marks(self):
        return self.__marks
    
    @marks.setter
    def marks(self, value):
        if 0 <= value <= 100:
            self.__marks = value
        else:
            print("Invalid marks!")
    
    def display(self):
        print(f"{self.__name}: {self.__marks}")

student = Student("Bob", 85)
student.display()
student.marks = 95
student.display()
student.marks = 150  # Invalid
\`\`\`

---

❌ Common Beginner Mistakes
* Not using private variables when needed ❌
* Direct access to private variables ❌
* Overusing encapsulation ❌
* Not validating in setters ❌

---

⭐ Key Points to Remember
* Use \`__\` for private variables
* Use getters/setters for controlled access
* \`@property\` makes code cleaner
* Protects data integrity
* Hides implementation details

---

📝 Practice Questions
1. Create class with private variables
2. Implement getters and setters
3. Use @property decorator
4. Add validation in setters
`
                    },
                    {
                        id: 'py-6-7', title: "Abstraction", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 36: Abstraction in Python
✅ What is Abstraction? (Very Simple)

Abstraction means **hiding complex implementation details** and showing only essential features.

👉 Users interact with simple interface, complexity is hidden.

---

🧠 Real-Life Example

Think of driving a car 🚗:
* You use steering wheel, pedals (simple interface)
* Engine details are hidden (abstraction)
* You don't need to know how engine works

💡 Abstraction simplifies complexity.

---

💻 Why Do We Need Abstraction?

We use abstraction to:
* **Hide complex details**
* **Provide simple interface**
* **Focus on what, not how**
* **Make code maintainable**

👉 Abstraction reduces complexity.

---

🧩 Abstract Base Class

\`\`\`python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def sound(self):
        pass
    
    @abstractmethod
    def move(self):
        pass

class Dog(Animal):
    def sound(self):
        print("Woof!")
    
    def move(self):
        print("Running")

dog = Dog()
dog.sound()
dog.move()
\`\`\`

📤 Output
\`Woof!\`
\`Running\`

---

🔹 **Cannot Instantiate Abstract Class**

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

# shape = Shape()  # Error! Cannot create instance
\`\`\`

---

🔹 **Complete Example**

\`\`\`python
from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

class CreditCard(PaymentMethod):
    def pay(self, amount):
        print(f"Paid {amount} using Credit Card")

class PayPal(PaymentMethod):
    def pay(self, amount):
        print(f"Paid {amount} using PayPal")

class Cash(PaymentMethod):
    def pay(self, amount):
        print(f"Paid {amount} in Cash")

# Using abstraction
payments = [CreditCard(), PayPal(), Cash()]
for payment in payments:
    payment.pay(100)
\`\`\`

📤 Output
\`Paid 100 using Credit Card\`
\`Paid 100 using PayPal\`
\`Paid 100 in Cash\`

---

🔹 **Abstract Class with Concrete Methods**

\`\`\`python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, brand):
        self.brand = brand
    
    @abstractmethod
    def start(self):
        pass
    
    def stop(self):  # Concrete method
        print(f"{self.brand} stopped")

class Car(Vehicle):
    def start(self):
        print(f"{self.brand} car started")

car = Car("Toyota")
car.start()
car.stop()
\`\`\`

---

💡 Abstraction vs Encapsulation

| Abstraction | Encapsulation |
|-------------|---------------|
| Hides complexity | Hides data |
| Focus on what | Focus on how |
| Uses abstract classes | Uses private variables |
| Design level | Implementation level |

---

❌ Common Beginner Mistakes
* Not implementing all abstract methods ❌
* Trying to instantiate abstract class ❌
* Confusing abstraction with encapsulation ❌
* Overusing abstract classes ❌

---

⭐ Key Points to Remember
* Use ABC for abstract classes
* \`@abstractmethod\` for abstract methods
* Cannot instantiate abstract class
* Child must implement all abstract methods
* Hides implementation details

---

📝 Practice Questions
1. Create abstract class with abstract methods
2. Implement child classes
3. Understand difference from encapsulation
4. Use abstraction for payment system
`
                    },
                ]
            },

            // --- MODULE 7: Advanced Python ---
            {
                id: 7,
                title: "Module 7: Advanced Python",
                topics: [
                    {
                        id: 'py-7-1', title: "Iterators & Generators", type: "video", duration: "25m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 37: Iterators & Generators in Python
✅ What are Iterators & Generators? (Very Simple)

**Iterator**: Object that can be iterated (looped) over.
**Generator**: Special function that produces items one at a time using \`yield\`.

👉 Generators are memory-efficient iterators.

---

🧠 Real-Life Example

Think of a streaming service 📺:
* Doesn't load all episodes at once (generator)
* Loads one episode at a time (yield)
* Saves memory and bandwidth

💡 Generators produce values on-demand.

---

💻 Why Do We Need Generators?

We use generators to:
* **Save memory**
* **Handle large datasets**
* **Create infinite sequences**
* **Lazy evaluation**

👉 Generators are memory-efficient.

---

🧩 Iterator Basics

\`\`\`python
# List is iterable
numbers = [1, 2, 3, 4, 5]

# Get iterator
iterator = iter(numbers)

# Get items one by one
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
\`\`\`

---

🔹 **Creating Custom Iterator**

\`\`\`python
class Counter:
    def __init__(self, max):
        self.max = max
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current < self.max:
            self.current += 1
            return self.current
        raise StopIteration

counter = Counter(5)
for num in counter:
    print(num)
\`\`\`

📤 Output
\`1\`
\`2\`
\`3\`
\`4\`
\`5\`

---

🔹 **Generator Function**

\`\`\`python
def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1

# Using generator
for num in count_up_to(5):
    print(num)
\`\`\`

📤 Output
\`1\`
\`2\`
\`3\`
\`4\`
\`5\`

---

🔹 **Generator vs Regular Function**

\`\`\`python
# Regular function - returns all at once
def get_numbers():
    return [1, 2, 3, 4, 5]

# Generator - yields one at a time
def generate_numbers():
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5

# Memory efficient
gen = generate_numbers()
print(next(gen))  # 1
print(next(gen))  # 2
\`\`\`

---

🔹 **Generator Expression**

\`\`\`python
# List comprehension (loads all in memory)
squares_list = [x**2 for x in range(10)]

# Generator expression (memory efficient)
squares_gen = (x**2 for x in range(10))

for square in squares_gen:
    print(square)
\`\`\`

---

💡 Complete Example

\`\`\`python
def fibonacci(n):
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# Generate Fibonacci numbers
for num in fibonacci(10):
    print(num, end=" ")
\`\`\`

📤 Output
\`0 1 1 2 3 5 8 13 21 34\`

---

🔹 **Infinite Generator**

\`\`\`python
def infinite_sequence():
    num = 0
    while True:
        yield num
        num += 1

# Use with caution!
gen = infinite_sequence()
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 2
\`\`\`

---

❌ Common Beginner Mistakes
* Trying to reuse exhausted generator ❌
* Not understanding yield vs return ❌
* Using list when generator is better ❌
* Forgetting StopIteration ❌

---

⭐ Key Points to Remember
* Generators use \`yield\` keyword
* Memory efficient for large data
* Can only iterate once
* Generator expressions use \`()\`
* Lazy evaluation

---

📝 Practice Questions
1. Create generator for even numbers
2. Implement Fibonacci generator
3. Use generator expression
4. Understand yield vs return
`
                    },
                    {
                        id: 'py-7-2', title: "Decorators", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 38: Decorators in Python
✅ What are Decorators? (Very Simple)

Decorators are functions that **modify the behavior of other functions** without changing their code.

👉 They "wrap" functions to add extra functionality.

---

🧠 Real-Life Example

Think of gift wrapping 🎁:
* Original gift (function)
* Wrapping paper adds presentation (decorator)
* Gift stays same, looks better

💡 Decorators enhance functions.

---

💻 Why Do We Need Decorators?

We use decorators to:
* **Add functionality without modifying code**
* **Reuse common logic**
* **Keep code DRY (Don't Repeat Yourself)**
* **Implement cross-cutting concerns**

👉 Decorators make code cleaner.

---

🧩 Basic Decorator

\`\`\`python
def my_decorator(func):
    def wrapper():
        print("Before function")
        func()
        print("After function")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
\`\`\`

📤 Output
\`Before function\`
\`Hello!\`
\`After function\`

---

🔹 **Decorator with Arguments**

\`\`\`python
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
\`\`\`

📤 Output
\`Hello, Alice!\`
\`Hello, Alice!\`
\`Hello, Alice!\`

---

🔹 **Timing Decorator**

\`\`\`python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Time taken: {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    print("Function completed")

slow_function()
\`\`\`

---

🔹 **Multiple Decorators**

\`\`\`python
def bold(func):
    def wrapper():
        return "<b>" + func() + "</b>"
    return wrapper

def italic(func):
    def wrapper():
        return "<i>" + func() + "</i>"
    return wrapper

@bold
@italic
def greet():
    return "Hello"

print(greet())
\`\`\`

📤 Output
\`<b><i>Hello</i></b>\`

---

💡 Complete Example

\`\`\`python
def login_required(func):
    def wrapper(user):
        if user.get("logged_in"):
            return func(user)
        else:
            return "Please login first!"
    return wrapper

@login_required
def view_dashboard(user):
    return f"Welcome {user['name']} to dashboard"

user1 = {"name": "Alice", "logged_in": True}
user2 = {"name": "Bob", "logged_in": False}

print(view_dashboard(user1))
print(view_dashboard(user2))
\`\`\`

📤 Output
\`Welcome Alice to dashboard\`
\`Please login first!\`

---

❌ Common Beginner Mistakes
* Not using \`*args, **kwargs\` ❌
* Forgetting to return wrapper ❌
* Not preserving function metadata ❌
* Overusing decorators ❌

---

⭐ Key Points to Remember
* Decorators modify function behavior
* Use \`@decorator_name\` syntax
* Can stack multiple decorators
* Useful for logging, timing, authentication
* Keep decorators simple

---

📝 Practice Questions
1. Create a simple decorator
2. Build a logging decorator
3. Use decorator with arguments
4. Stack multiple decorators
`
                    },
                    {
                        id: 'py-7-3', title: "Regular Expressions", type: "video", duration: "35m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 39: Regular Expressions in Python
✅ What are Regular Expressions? (Very Simple)

Regular expressions (regex) are **patterns used to match text**.

👉 Powerful tool for searching and manipulating strings.

---

🧠 Real-Life Example

Think of a search filter 🔍:
* Find all emails in a document
* Match phone numbers in specific format
* Validate passwords

💡 Regex finds patterns in text.

---

💻 Why Do We Need Regex?

We use regex to:
* **Validate input (email, phone)**
* **Search and replace text**
* **Extract specific patterns**
* **Parse data**

👉 Regex saves time on text processing.

---

🧩 Basic Regex

\`\`\`python
import re

text = "My email is test@example.com"
pattern = r"\\w+@\\w+\\.\\w+"

match = re.search(pattern, text)
if match:
    print(match.group())
\`\`\`

📤 Output
\`test@example.com\`

---

🔹 **Common Patterns**

| Pattern | Meaning |
|---------|---------|
| \`.\` | Any character |
| \`\\d\` | Digit (0-9) |
| \`\\w\` | Word character |
| \`\\s\` | Whitespace |
| \`*\` | 0 or more |
| \`+\` | 1 or more |
| \`?\` | 0 or 1 |
| \`[]\` | Character set |

---

🔹 **Finding All Matches**

\`\`\`python
import re

text = "Call me at 123-456-7890 or 987-654-3210"
pattern = r"\\d{3}-\\d{3}-\\d{4}"

matches = re.findall(pattern, text)
print(matches)
\`\`\`

📤 Output
\`['123-456-7890', '987-654-3210']\`

---

🔹 **Replacing Text**

\`\`\`python
import re

text = "Hello World! Hello Python!"
new_text = re.sub(r"Hello", "Hi", text)
print(new_text)
\`\`\`

📤 Output
\`Hi World! Hi Python!\`

---

💡 Complete Example

\`\`\`python
import re

def validate_email(email):
    pattern = r"^[\\w.-]+@[\\w.-]+\\.\\w+$"
    if re.match(pattern, email):
        return "Valid email"
    return "Invalid email"

print(validate_email("test@example.com"))
print(validate_email("invalid.email"))
\`\`\`

📤 Output
\`Valid email\`
\`Invalid email\`

---

❌ Common Beginner Mistakes
* Not using raw strings \`r""\` ❌
* Overcomplicating patterns ❌
* Not escaping special characters ❌

---

⭐ Key Points to Remember
* Use \`re\` module
* \`r""\` for raw strings
* \`search()\`, \`findall()\`, \`sub()\`
* Test patterns online first
* Keep patterns simple

---

📝 Practice Questions
1. Match phone numbers
2. Validate email addresses
3. Extract URLs from text
4. Replace patterns in strings
`
                    },
                    {
                        id: 'py-7-4', title: "Date & Time", type: "video", duration: "20m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 40: Date & Time in Python
✅ What is Date & Time Module? (Very Simple)

The \`datetime\` module helps work with **dates and times** in Python.

👉 Essential for time-based operations.

---

🧠 Real-Life Example

Think of a calendar app 📅:
* Show current date/time
* Schedule events
* Calculate time differences

💡 datetime module handles all time operations.

---

💻 Why Do We Need It?

We use datetime to:
* **Get current date/time**
* **Format dates**
* **Calculate time differences**
* **Work with timezones**

---

🧩 Basic Usage

\`\`\`python
import datetime

# Current date and time
now = datetime.datetime.now()
print(now)

# Current date only
today = datetime.date.today()
print(today)
\`\`\`

---

🔹 **Formatting Dates**

\`\`\`python
import datetime

now = datetime.datetime.now()
formatted = now.strftime("%Y-%m-%d %H:%M:%S")
print(formatted)
\`\`\`

📤 Output
\`2024-01-26 12:30:45\`

---

🔹 **Creating Specific Dates**

\`\`\`python
import datetime

birthday = datetime.date(2000, 5, 15)
print(birthday)

event = datetime.datetime(2024, 12, 31, 23, 59, 59)
print(event)
\`\`\`

---

💡 Complete Example

\`\`\`python
import datetime

# Calculate age
birth_date = datetime.date(2000, 1, 1)
today = datetime.date.today()
age = today.year - birth_date.year
print(f"Age: {age} years")

# Time difference
start = datetime.datetime.now()
# ... some operation ...
end = datetime.datetime.now()
duration = end - start
print(f"Duration: {duration}")
\`\`\`

---

⭐ Key Points to Remember
* Use \`datetime\` module
* \`strftime()\` for formatting
* Can calculate time differences
* Supports timezones

---

📝 Practice Questions
1. Get current date and time
2. Format date in different ways
3. Calculate days until birthday
4. Find time difference
`
                    },
                    {
                        id: 'py-7-5', title: "Virtual Environments", type: "video", duration: "25m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 41: Virtual Environments in Python
✅ What are Virtual Environments? (Very Simple)

Virtual environments create **isolated Python spaces** for each project.

👉 Keeps project dependencies separate.

---

🧠 Real-Life Example

Think of separate toolboxes 🧰:
* Each project has its own toolbox
* Tools don't mix between projects
* No conflicts

💡 Virtual environments prevent dependency conflicts.

---

💻 Why Do We Need Them?

We use virtual environments to:
* **Isolate project dependencies**
* **Avoid version conflicts**
* **Keep system Python clean**
* **Easy deployment**

---

🧩 Creating Virtual Environment

\`\`\`bash
# Create venv
python -m venv myenv

# Activate (Windows)
myenv\\Scripts\\activate

# Activate (Mac/Linux)
source myenv/bin/activate

# Deactivate
deactivate
\`\`\`

---

🔹 **Installing Packages**

\`\`\`bash
# After activating venv
pip install requests
pip install pandas numpy

# Save dependencies
pip freeze > requirements.txt

# Install from requirements
pip install -r requirements.txt
\`\`\`

---

💡 Best Practices

✅ Create venv for each project
✅ Add venv folder to .gitignore
✅ Use requirements.txt
✅ Activate before working

---

⭐ Key Points to Remember
* Use \`python -m venv\`
* Activate before installing packages
* Keep dependencies isolated
* Use requirements.txt

---

📝 Practice Questions
1. Create a virtual environment
2. Install packages in venv
3. Generate requirements.txt
4. Understand why isolation matters
`
                    },
                    {
                        id: 'py-7-6', title: "Python Libraries Overview", type: "video", duration: "30m", videoUrl: "https://www.youtube.com/watch?v=SomeURL",
                        content: `# 🟢 Topic 42: Python Libraries Overview
✅ What are Python Libraries? (Very Simple)

Libraries are **pre-written code packages** that add functionality to Python.

👉 Extend Python's capabilities without writing everything from scratch.

---

🧠 Real-Life Example

Think of a smartphone app store 📱:
* Apps add features to your phone
* Libraries add features to Python
* Download and use instantly

💡 Libraries save development time.

---

💻 Why Do We Need Libraries?

We use libraries to:
* **Save time**
* **Use tested code**
* **Add specialized functionality**
* **Build complex applications faster**

---

🔹 **Popular Python Libraries**

**1️⃣ NumPy** - Numerical Computing
\`\`\`python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr.mean())  # 3.0
\`\`\`

**2️⃣ Pandas** - Data Analysis
\`\`\`python
import pandas as pd

data = {'Name': ['Alice', 'Bob'], 'Age': [25, 30]}
df = pd.DataFrame(data)
print(df)
\`\`\`

**3️⃣ Requests** - HTTP Requests
\`\`\`python
import requests

response = requests.get('https://api.github.com')
print(response.status_code)
\`\`\`

**4️⃣ Flask** - Web Framework
\`\`\`python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World!"
\`\`\`

**5️⃣ Matplotlib** - Data Visualization
\`\`\`python
import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [1, 4, 9])
plt.show()
\`\`\`

---

🔹 **Installing Libraries**

\`\`\`bash
# Install single library
pip install numpy

# Install multiple
pip install pandas matplotlib requests

# Install specific version
pip install flask==2.0.1
\`\`\`

---

💡 Library Categories

📊 **Data Science**: NumPy, Pandas, Matplotlib, Seaborn
🌐 **Web Development**: Flask, Django, FastAPI
🤖 **Machine Learning**: Scikit-learn, TensorFlow, PyTorch
🧪 **Testing**: Pytest, Unittest
🔧 **Utilities**: Requests, BeautifulSoup, Pillow

---

⭐ Key Points to Remember
* Use \`pip install\` to install libraries
* Import before using
* Read documentation
* Choose right library for task
* Popular libraries are well-tested

---

📝 Practice Questions
1. Install and use NumPy
2. Make HTTP request with Requests
3. Create DataFrame with Pandas
4. Explore library documentation

---

🎉 **Congratulations!**

You've completed the Python course! You now know:
✅ Python Basics
✅ Data Structures
✅ Functions & Modules
✅ OOP Concepts
✅ File Handling & Errors
✅ Advanced Topics

**Next Steps:**
1. Build projects
2. Explore specialized libraries
3. Contribute to open source
4. Keep practicing!

Happy Coding! 🐍💻
`
                    },
                ]
            },
        ]
    },

    // ==========================================
    // JAVA PROGRAMMING
    // ==========================================
    'java-programming': {
        id: 'java-programming',
        title: "Java Programming Masterclass",
        description: "Complete Java Development from Beginner to Advanced (2025 Updated)",
        modules: [
            {
                id: 1,
                title: "Module 1: Introduction to Programming & Java",
                topics: [
                    { id: 'java-1-1', title: "What is Programming?", type: "video", duration: "25m", content: `# 🟢 Topic 1\nContent in progress...` },
                    { id: 'java-1-2', title: "What is a Programming Language?", type: "video", duration: "30m", content: `# 🟢 Topic 2\nContent in progress...` },
                    { id: 'java-1-3', title: "Types of Programming Languages", type: "video", duration: "35m", content: `# 🟢 Topic 3\nContent in progress...` },
                    {
                        id: 'java-quiz-1-1', title: "📝 Quiz 1 (Topics 1-3)", type: "quiz", questions: [
                            { question: "What is programming?", options: ["Writing stories", "Creating instructions for computers", "Drawing", "Gaming"], correct: 1 }
                        ]
                    },
                    { id: 'java-1-4', title: "What is Java?", type: "video", duration: "30m", content: `# 🟢 Topic 4\nContent in progress...` },
                    { id: 'java-1-5', title: "History of Java", type: "video", duration: "25m", content: `# 🟢 Topic 5\nContent in progress...` },
                    { id: 'java-1-6', title: "Features of Java", type: "video", duration: "40m", content: `# 🟢 Topic 6\nContent in progress...` },
                    {
                        id: 'java-quiz-1-2', title: "📝 Quiz 2 (Topics 4-6)", type: "quiz", questions: [
                            { question: "Who created Java?", options: ["Dennis Ritchie", "James Gosling", "Guido van Rossum", "Bjarne Stroustrup"], correct: 1 }
                        ]
                    },
                    { id: 'java-1-7', title: "Java Editions (JSE, JEE, JME)", type: "video", duration: "35m", content: `# 🟢 Topic 7\nContent in progress...` },
                    { id: 'java-1-8', title: "Java vs Other Languages", type: "video", duration: "30m", content: `# 🟢 Topic 8\nContent in progress...` },
                    { id: 'java-1-9', title: "Applications of Java", type: "video", duration: "25m", content: `# 🟢 Topic 9\nContent in progress...` },
                    {
                        id: 'java-quiz-1-3', title: "📝 Quiz 3 (Topics 7-9)", type: "quiz", questions: [
                            { question: "Java is used for?", options: ["Mobile apps", "Web apps", "Enterprise software", "All of these"], correct: 3 }
                        ]
                    },
                    { id: 'java-1-10', title: "Java Development Kit (JDK)", type: "video", duration: "35m", content: `# 🟢 Topic 10\nContent in progress...` },
                    { id: 'java-1-11', title: "Java Virtual Machine (JVM)", type: "video", duration: "40m", content: `# 🟢 Topic 11\nContent in progress...` },
                    { id: 'java-1-12', title: "Java Runtime Environment (JRE)", type: "video", duration: "30m", content: `# 🟢 Topic 12\nContent in progress...` },
                    {
                        id: 'java-quiz-1-4', title: "📝 Quiz 4 (Topics 10-12)", type: "quiz", questions: [
                            { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Video Manager", "Java Version Manager", "None"], correct: 0 }
                        ]
                    }
                ]
            },
            {
                id: 2,
                title: "Module 2: Java Basics",
                topics: [
                    { id: 'java-2-1', title: "Structure of a Java Program", type: "video", duration: "30m", content: `# 🟢 Topic 13\nContent in progress...` },
                    { id: 'java-2-2', title: "First Java Program", type: "video", duration: "35m", content: `# 🟢 Topic 14\nContent in progress...` },
                    { id: 'java-2-3', title: "How Java Program Works", type: "video", duration: "40m", content: `# 🟢 Topic 15\nContent in progress...` },
                    {
                        id: 'java-quiz-2-1', title: "📝 Quiz 5 (Topics 13-15)", type: "quiz", questions: [
                            { question: "Java program starts from?", options: ["start()", "main()", "begin()", "init()"], correct: 1 }
                        ]
                    },
                    { id: 'java-2-4', title: "Java Tokens", type: "video", duration: "25m", content: `# 🟢 Topic 16\nContent in progress...` },
                    { id: 'java-2-5', title: "Keywords", type: "video", duration: "30m", content: `# 🟢 Topic 17\nContent in progress...` },
                    { id: 'java-2-6', title: "Identifiers", type: "video", duration: "25m", content: `# 🟢 Topic 18\nContent in progress...` },
                    {
                        id: 'java-quiz-2-2', title: "📝 Quiz 6 (Topics 16-18)", type: "quiz", questions: [
                            { question: "Which is a keyword?", options: ["myVar", "public", "hello", "x"], correct: 1 }
                        ]
                    },
                    { id: 'java-2-7', title: "Literals", type: "video", duration: "30m", content: `# 🟢 Topic 19\nContent in progress...` },
                    { id: 'java-2-8', title: "Comments in Java", type: "video", duration: "20m", content: `# 🟢 Topic 20\nContent in progress...` },
                    { id: 'java-2-9', title: "Data Types", type: "video", duration: "45m", content: `# 🟢 Topic 21\nContent in progress...` },
                    {
                        id: 'java-quiz-2-3', title: "📝 Quiz 7 (Topics 19-21)", type: "quiz", questions: [
                            { question: "int is a?", options: ["Primitive type", "Object", "Class", "Interface"], correct: 0 }
                        ]
                    },
                    { id: 'java-2-10', title: "Variables", type: "video", duration: "35m", content: `# 🟢 Topic 22\nContent in progress...` },
                    { id: 'java-2-11', title: "Type Casting", type: "video", duration: "40m", content: `# 🟢 Topic 23\nContent in progress...` },
                    { id: 'java-2-12', title: "Operators", type: "video", duration: "50m", content: `# 🟢 Topic 24\nContent in progress...` },
                    {
                        id: 'java-quiz-2-4', title: "📝 Quiz 8 (Topics 22-24)", type: "quiz", questions: [
                            { question: "++ is?", options: ["Addition", "Increment", "Concatenation", "None"], correct: 1 }
                        ]
                    },
                    { id: 'java-2-13', title: "Operator Precedence", type: "video", duration: "30m", content: `# 🟢 Topic 25\nContent in progress...` }
                ]
            },
            {
                id: 3,
                title: "Module 3: Control Statements",
                topics: [
                    { id: 'java-3-1', title: "Conditional Statements", type: "video", duration: "25m", content: `# 🟢 Topic 26\nContent in progress...` },
                    { id: 'java-3-2', title: "if Statement", type: "video", duration: "30m", content: `# 🟢 Topic 27\nContent in progress...` },
                    { id: 'java-3-3', title: "if-else Statement", type: "video", duration: "35m", content: `# 🟢 Topic 28\nContent in progress...` },
                    {
                        id: 'java-quiz-3-1', title: "📝 Quiz 9 (Topics 26-28)", type: "quiz", questions: [
                            { question: "if statement checks?", options: ["Type", "Condition", "Value", "Class"], correct: 1 }
                        ]
                    },
                    { id: 'java-3-4', title: "nested if", type: "video", duration: "30m", content: `# 🟢 Topic 29\nContent in progress...` },
                    { id: 'java-3-5', title: "switch Statement", type: "video", duration: "40m", content: `# 🟢 Topic 30\nContent in progress...` },
                    { id: 'java-3-6', title: "for Loop", type: "video", duration: "35m", content: `# 🟢 Topic 31\nContent in progress...` },
                    {
                        id: 'java-quiz-3-2', title: "📝 Quiz 10 (Topics 29-31)", type: "quiz", questions: [
                            { question: "Loop repeats?", options: ["Once", "Multiple times", "Never", "Randomly"], correct: 1 }
                        ]
                    },
                    { id: 'java-3-7', title: "while Loop", type: "video", duration: "30m", content: `# 🟢 Topic 32\nContent in progress...` },
                    { id: 'java-3-8', title: "do-while Loop", type: "video", duration: "30m", content: `# 🟢 Topic 33\nContent in progress...` },
                    { id: 'java-3-9', title: "Nested Loops", type: "video", duration: "35m", content: `# 🟢 Topic 34\nContent in progress...` },
                    {
                        id: 'java-quiz-3-3', title: "📝 Quiz 11 (Topics 32-34)", type: "quiz", questions: [
                            { question: "do-while runs minimum?", options: ["0 times", "1 time", "2 times", "Infinite"], correct: 1 }
                        ]
                    },
                    { id: 'java-3-10', title: "break", type: "video", duration: "25m", content: `# 🟢 Topic 35\nContent in progress...` },
                    { id: 'java-3-11', title: "continue", type: "video", duration: "25m", content: `# 🟢 Topic 36\nContent in progress...` },
                    { id: 'java-3-12', title: "return", type: "video", duration: "25m", content: `# 🟢 Topic 37\nContent in progress...` },
                    {
                        id: 'java-quiz-3-4', title: "📝 Quiz 12 (Topics 35-37)", type: "quiz", questions: [
                            { question: "break exits?", options: ["Function", "Loop", "Program", "Class"], correct: 1 }
                        ]
                    }
                ]
            },
            {
                id: 4,
                title: "Module 4: Arrays & Strings",
                topics: [
                    { id: 'java-4-1', title: "Arrays Introduction", type: "video", duration: "30m", content: `# 🟢 Topic 38\nContent in progress...` },
                    { id: 'java-4-2', title: "Single Dimensional Array", type: "video", duration: "40m", content: `# 🟢 Topic 39\nContent in progress...` },
                    { id: 'java-4-3', title: "Multi-Dimensional Array", type: "video", duration: "45m", content: `# 🟢 Topic 40\nContent in progress...` },
                    {
                        id: 'java-quiz-4-1', title: "📝 Quiz 13 (Topics 38-40)", type: "quiz", questions: [
                            { question: "Array index starts from?", options: ["1", "0", "-1", "10"], correct: 1 }
                        ]
                    },
                    { id: 'java-4-4', title: "Array Operations", type: "video", duration: "35m", content: `# 🟢 Topic 41\nContent in progress...` },
                    { id: 'java-4-5', title: "Array of Objects", type: "video", duration: "40m", content: `# 🟢 Topic 42\nContent in progress...` },
                    { id: 'java-4-6', title: "String Class", type: "video", duration: "50m", content: `# 🟢 Topic 43\nContent in progress...` },
                    {
                        id: 'java-quiz-4-2', title: "📝 Quiz 14 (Topics 41-43)", type: "quiz", questions: [
                            { question: "String is?", options: ["Primitive", "Class", "Interface", "Package"], correct: 1 }
                        ]
                    },
                    { id: 'java-4-7', title: "String Methods", type: "video", duration: "45m", content: `# 🟢 Topic 44\nContent in progress...` },
                    { id: 'java-4-8', title: "StringBuffer", type: "video", duration: "35m", content: `# 🟢 Topic 45\nContent in progress...` },
                    { id: 'java-4-9', title: "StringBuilder", type: "video", duration: "35m", content: `# 🟢 Topic 46\nContent in progress...` },
                    {
                        id: 'java-quiz-4-3', title: "📝 Quiz 15 (Topics 44-46)", type: "quiz", questions: [
                            { question: "String is?", options: ["Mutable", "Immutable", "Both", "None"], correct: 1 }
                        ]
                    },
                    { id: 'java-4-10', title: "String vs StringBuffer vs StringBuilder", type: "video", duration: "30m", content: `# 🟢 Topic 47\nContent in progress...` }
                ]
            },
            {
                id: 5,
                title: "Module 5: Methods & Constructors",
                topics: [
                    { id: 'java-5-1', title: "Methods in Java", type: "video", duration: "40m", content: `# 🟢 Topic 48\nContent in progress...` },
                    { id: 'java-5-2', title: "Method Declaration", type: "video", duration: "30m", content: `# 🟢 Topic 49\nContent in progress...` },
                    { id: 'java-5-3', title: "Method Calling", type: "video", duration: "30m", content: `# 🟢 Topic 50\nContent in progress...` },
                    {
                        id: 'java-quiz-5-1', title: "📝 Quiz 16 (Topics 48-50)", type: "quiz", questions: [
                            { question: "Method is?", options: ["Variable", "Function", "Class", "Package"], correct: 1 }
                        ]
                    },
                    { id: 'java-5-4', title: "Method Parameters", type: "video", duration: "35m", content: `# 🟢 Topic 51\nContent in progress...` },
                    { id: 'java-5-5', title: "Return Types", type: "video", duration: "30m", content: `# 🟢 Topic 52\nContent in progress...` },
                    { id: 'java-5-6', title: "Method Overloading", type: "video", duration: "40m", content: `# 🟢 Topic 53\nContent in progress...` },
                    {
                        id: 'java-quiz-5-2', title: "📝 Quiz 17 (Topics 51-53)", type: "quiz", questions: [
                            { question: "Overloading means?", options: ["Same name, different parameters", "Different name", "Same everything", "None"], correct: 0 }
                        ]
                    },
                    { id: 'java-5-7', title: "Constructors", type: "video", duration: "45m", content: `# 🟢 Topic 54\nContent in progress...` },
                    { id: 'java-5-8', title: "Default Constructor", type: "video", duration: "30m", content: `# 🟢 Topic 55\nContent in progress...` },
                    { id: 'java-5-9', title: "Parameterized Constructor", type: "video", duration: "35m", content: `# 🟢 Topic 56\nContent in progress...` },
                    {
                        id: 'java-quiz-5-3', title: "📝 Quiz 18 (Topics 54-56)", type: "quiz", questions: [
                            { question: "Constructor has?", options: ["Return type", "No return type", "void", "int"], correct: 1 }
                        ]
                    },
                    { id: 'java-5-10', title: "Constructor Overloading", type: "video", duration: "35m", content: `# 🟢 Topic 57\nContent in progress...` },
                    { id: 'java-5-11', title: "this Keyword", type: "video", duration: "40m", content: `# 🟢 Topic 58\nContent in progress...` }
                ]
            },
            {
                id: 6,
                title: "Module 6: Object-Oriented Programming",
                topics: [
                    { id: 'java-6-1', title: "OOP Concepts", type: "video", duration: "35m", content: `# 🟢 Topic 59\nContent in progress...` },
                    { id: 'java-6-2', title: "Class and Object", type: "video", duration: "50m", content: `# 🟢 Topic 60\nContent in progress...` },
                    { id: 'java-6-3', title: "Encapsulation", type: "video", duration: "40m", content: `# 🟢 Topic 61\nContent in progress...` },
                    {
                        id: 'java-quiz-6-1', title: "📝 Quiz 19 (Topics 59-61)", type: "quiz", questions: [
                            { question: "OOP stands for?", options: ["Object Oriented Programming", "Operator", "Output", "None"], correct: 0 }
                        ]
                    },
                    { id: 'java-6-4', title: "Abstraction", type: "video", duration: "40m", content: `# 🟢 Topic 62\nContent in progress...` },
                    { id: 'java-6-5', title: "Inheritance", type: "video", duration: "50m", content: `# 🟢 Topic 63\nContent in progress...` },
                    { id: 'java-6-6', title: "Types of Inheritance", type: "video", duration: "45m", content: `# 🟢 Topic 64\nContent in progress...` },
                    {
                        id: 'java-quiz-6-2', title: "📝 Quiz 20 (Topics 62-64)", type: "quiz", questions: [
                            { question: "Inheritance uses?", options: ["extends", "implements", "inherits", "uses"], correct: 0 }
                        ]
                    },
                    { id: 'java-6-7', title: "Polymorphism", type: "video", duration: "45m", content: `# 🟢 Topic 65\nContent in progress...` },
                    { id: 'java-6-8', title: "Compile-Time Polymorphism", type: "video", duration: "40m", content: `# 🟢 Topic 66\nContent in progress...` },
                    { id: 'java-6-9', title: "Run-Time Polymorphism", type: "video", duration: "40m", content: `# 🟢 Topic 67\nContent in progress...` },
                    {
                        id: 'java-quiz-6-3', title: "📝 Quiz 21 (Topics 65-67)", type: "quiz", questions: [
                            { question: "Runtime polymorphism?", options: ["Overloading", "Overriding", "Both", "None"], correct: 1 }
                        ]
                    },
                    { id: 'java-6-10', title: "super Keyword", type: "video", duration: "35m", content: `# 🟢 Topic 68\nContent in progress...` },
                    { id: 'java-6-11', title: "instanceof Operator", type: "video", duration: "30m", content: `# 🟢 Topic 69\nContent in progress...` }
                ]
            },
            {
                id: 7,
                title: "Module 7: Access Control & Keywords",
                topics: [
                    { id: 'java-7-1', title: "Access Modifiers", type: "video", duration: "35m", content: `# 🟢 Topic 70\nContent in progress...` },
                    { id: 'java-7-2', title: "public", type: "video", duration: "25m", content: `# 🟢 Topic 71\nContent in progress...` },
                    { id: 'java-7-3', title: "private", type: "video", duration: "25m", content: `# 🟢 Topic 72\nContent in progress...` },
                    {
                        id: 'java-quiz-7-1', title: "📝 Quiz 22 (Topics 70-72)", type: "quiz", questions: [
                            { question: "private means?", options: ["Anywhere", "Same class only", "Package", "All"], correct: 1 }
                        ]
                    },
                    { id: 'java-7-4', title: "protected", type: "video", duration: "30m", content: `# 🟢 Topic 73\nContent in progress...` },
                    { id: 'java-7-5', title: "default", type: "video", duration: "25m", content: `# 🟢 Topic 74\nContent in progress...` },
                    { id: 'java-7-6', title: "Non-Access Modifiers", type: "video", duration: "30m", content: `# 🟢 Topic 75\nContent in progress...` },
                    {
                        id: 'java-quiz-7-2', title: "📝 Quiz 23 (Topics 73-75)", type: "quiz", questions: [
                            { question: "protected allows?", options: ["Class", "Package + child", "All", "None"], correct: 1 }
                        ]
                    },
                    { id: 'java-7-7', title: "static", type: "video", duration: "40m", content: `# 🟢 Topic 76\nContent in progress...` },
                    { id: 'java-7-8', title: "final", type: "video", duration: "35m", content: `# 🟢 Topic 77\nContent in progress...` },
                    { id: 'java-7-9', title: "abstract", type: "video", duration: "40m", content: `# 🟢 Topic 78\nContent in progress...` },
                    {
                        id: 'java-quiz-7-3', title: "📝 Quiz 24 (Topics 76-78)", type: "quiz", questions: [
                            { question: "static belongs to?", options: ["Object", "Class", "Method", "None"], correct: 1 }
                        ]
                    },
                    { id: 'java-7-10', title: "transient", type: "video", duration: "25m", content: `# 🟢 Topic 79\nContent in progress...` },
                    { id: 'java-7-11', title: "volatile", type: "video", duration: "30m", content: `# 🟢 Topic 80\nContent in progress...` }
                ]
            },
            {
                id: 8,
                title: "Module 8: Packages & Interfaces",
                topics: [
                    { id: 'java-8-1', title: "Packages in Java", type: "video", duration: "35m", content: `# 🟢 Topic 81\nContent in progress...` },
                    { id: 'java-8-2', title: "Built-in Packages", type: "video", duration: "30m", content: `# 🟢 Topic 82\nContent in progress...` },
                    { id: 'java-8-3', title: "User-Defined Packages", type: "video", duration: "35m", content: `# 🟢 Topic 83\nContent in progress...` },
                    {
                        id: 'java-quiz-8-1', title: "📝 Quiz 25 (Topics 81-83)", type: "quiz", questions: [
                            { question: "Package groups?", options: ["Classes", "Methods", "Variables", "Objects"], correct: 0 }
                        ]
                    },
                    { id: 'java-8-4', title: "Interface", type: "video", duration: "45m", content: `# 🟢 Topic 84\nContent in progress...` },
                    { id: 'java-8-5', title: "Implementing Interface", type: "video", duration: "40m", content: `# 🟢 Topic 85\nContent in progress...` },
                    { id: 'java-8-6', title: "Multiple Inheritance using Interface", type: "video", duration: "40m", content: `# 🟢 Topic 86\nContent in progress...` },
                    {
                        id: 'java-quiz-8-2', title: "📝 Quiz 26 (Topics 84-86)", type: "quiz", questions: [
                            { question: "Interface has?", options: ["Abstract methods", "Concrete methods", "Variables", "A only"], correct: 3 }
                        ]
                    },
                    { id: 'java-8-7', title: "Marker Interface", type: "video", duration: "30m", content: `# 🟢 Topic 87\nContent in progress...` }
                ]
            },
            {
                id: 9,
                title: "Module 9: Exception Handling",
                topics: [
                    { id: 'java-9-1', title: "What is an Exception?", type: "video", duration: "30m", content: `# 🟢 Topic 88\nContent in progress...` },
                    { id: 'java-9-2', title: "Types of Exceptions", type: "video", duration: "35m", content: `# 🟢 Topic 89\nContent in progress...` },
                    { id: 'java-9-3', title: "try and catch", type: "video", duration: "40m", content: `# 🟢 Topic 90\nContent in progress...` },
                    {
                        id: 'java-quiz-9-1', title: "📝 Quiz 27 (Topics 88-90)", type: "quiz", questions: [
                            { question: "Exception means?", options: ["Error", "Runtime problem", "Both", "None"], correct: 2 }
                        ]
                    },
                    { id: 'java-9-4', title: "multiple catch", type: "video", duration: "35m", content: `# 🟢 Topic 91\nContent in progress...` },
                    { id: 'java-9-5', title: "finally Block", type: "video", duration: "30m", content: `# 🟢 Topic 92\nContent in progress...` },
                    { id: 'java-9-6', title: "throw Keyword", type: "video", duration: "30m", content: `# 🟢 Topic 93\nContent in progress...` },
                    {
                        id: 'java-quiz-9-2', title: "📝 Quiz 28 (Topics 91-93)", type: "quiz", questions: [
                            { question: "finally runs?", options: ["Always", "On error", "Sometimes", "Never"], correct: 0 }
                        ]
                    },
                    { id: 'java-9-7', title: "throws Keyword", type: "video", duration: "30m", content: `# 🟢 Topic 94\nContent in progress...` },
                    { id: 'java-9-8', title: "Custom Exceptions", type: "video", duration: "35m", content: `# 🟢 Topic 95\nContent in progress...` }
                ]
            },
            {
                id: 10,
                title: "Module 10: Multithreading",
                topics: [
                    { id: 'java-10-1', title: "What is Multithreading?", type: "video", duration: "35m", content: `# 🟢 Topic 96\nContent in progress...` },
                    { id: 'java-10-2', title: "Thread Class", type: "video", duration: "40m", content: `# 🟢 Topic 97\nContent in progress...` },
                    { id: 'java-10-3', title: "Runnable Interface", type: "video", duration: "40m", content: `# 🟢 Topic 98\nContent in progress...` },
                    {
                        id: 'java-quiz-10-1', title: "📝 Quiz 29 (Topics 96-98)", type: "quiz", questions: [
                            { question: "Thread is?", options: ["Process", "Lightweight process", "Program", "Class"], correct: 1 }
                        ]
                    },
                    { id: 'java-10-4', title: "Thread Life Cycle", type: "video", duration: "35m", content: `# 🟢 Topic 99\nContent in progress...` },
                    { id: 'java-10-5', title: "Thread Priority", type: "video", duration: "30m", content: `# 🟢 Topic 100\nContent in progress...` },
                    { id: 'java-10-6', title: "Synchronization", type: "video", duration: "45m", content: `# 🟢 Topic 101\nContent in progress...` },
                    {
                        id: 'java-quiz-10-2', title: "📝 Quiz 30 (Topics 99-101)", type: "quiz", questions: [
                            { question: "Synchronization prevents?", options: ["Errors", "Race condition", "Compilation", "None"], correct: 1 }
                        ]
                    },
                    { id: 'java-10-7', title: "Inter-thread Communication", type: "video", duration: "40m", content: `# 🟢 Topic 102\nContent in progress...` },
                    { id: 'java-10-8', title: "Deadlock", type: "video", duration: "35m", content: `# 🟢 Topic 103\nContent in progress...` }
                ]
            },
            {
                id: 11,
                title: "Module 11: File Handling & I/O",
                topics: [
                    { id: 'java-11-1', title: "File Class", type: "video", duration: "35m", content: `# 🟢 Topic 104\nContent in progress...` },
                    { id: 'java-11-2', title: "File Input Stream", type: "video", duration: "40m", content: `# 🟢 Topic 105\nContent in progress...` },
                    { id: 'java-11-3', title: "File Output Stream", type: "video", duration: "40m", content: `# 🟢 Topic 106\nContent in progress...` },
                    {
                        id: 'java-quiz-11-1', title: "📝 Quiz 31 (Topics 104-106)", type: "quiz", questions: [
                            { question: "File class in?", options: ["java.io", "java.util", "java.lang", "java.file"], correct: 0 }
                        ]
                    },
                    { id: 'java-11-4', title: "BufferedReader", type: "video", duration: "35m", content: `# 🟢 Topic 107\nContent in progress...` },
                    { id: 'java-11-5', title: "BufferedWriter", type: "video", duration: "35m", content: `# 🟢 Topic 108\nContent in progress...` },
                    { id: 'java-11-6', title: "Scanner Class", type: "video", duration: "30m", content: `# 🟢 Topic 109\nContent in progress...` },
                    {
                        id: 'java-quiz-11-2', title: "📝 Quiz 32 (Topics 107-109)", type: "quiz", questions: [
                            { question: "Scanner reads?", options: ["Output", "Input", "Both", "None"], correct: 1 }
                        ]
                    },
                    { id: 'java-11-7', title: "Serialization", type: "video", duration: "40m", content: `# 🟢 Topic 110\nContent in progress...` },
                    { id: 'java-11-8', title: "Deserialization", type: "video", duration: "35m", content: `# 🟢 Topic 111\nContent in progress...` }
                ]
            },
            {
                id: 12,
                title: "Module 12: Collections Framework",
                topics: [
                    { id: 'java-12-1', title: "Collections Framework Introduction", type: "video", duration: "40m", content: `# 🟢 Topic 112\nContent in progress...` },
                    { id: 'java-12-2', title: "List Interface", type: "video", duration: "35m", content: `# 🟢 Topic 113\nContent in progress...` },
                    { id: 'java-12-3', title: "ArrayList", type: "video", duration: "45m", content: `# 🟢 Topic 114\nContent in progress...` },
                    {
                        id: 'java-quiz-12-1', title: "📝 Quiz 33 (Topics 112-114)", type: "quiz", questions: [
                            { question: "ArrayList is?", options: ["Fixed size", "Dynamic size", "No size", "Infinite"], correct: 1 }
                        ]
                    },
                    { id: 'java-12-4', title: "LinkedList", type: "video", duration: "40m", content: `# 🟢 Topic 115\nContent in progress...` },
                    { id: 'java-12-5', title: "Vector", type: "video", duration: "35m", content: `# 🟢 Topic 116\nContent in progress...` },
                    { id: 'java-12-6', title: "Stack", type: "video", duration: "35m", content: `# 🟢 Topic 117\nContent in progress...` },
                    {
                        id: 'java-quiz-12-2', title: "📝 Quiz 34 (Topics 115-117)", type: "quiz", questions: [
                            { question: "Stack follows?", options: ["FIFO", "LIFO", "Random", "None"], correct: 1 }
                        ]
                    },
                    { id: 'java-12-7', title: "Set Interface", type: "video", duration: "35m", content: `# 🟢 Topic 118\nContent in progress...` },
                    { id: 'java-12-8', title: "HashSet", type: "video", duration: "40m", content: `# 🟢 Topic 119\nContent in progress...` },
                    { id: 'java-12-9', title: "LinkedHashSet", type: "video", duration: "35m", content: `# 🟢 Topic 120\nContent in progress...` },
                    {
                        id: 'java-quiz-12-3', title: "📝 Quiz 35 (Topics 118-120)", type: "quiz", questions: [
                            { question: "Set allows?", options: ["Duplicates", "No duplicates", "Both", "None"], correct: 1 }
                        ]
                    },
                    { id: 'java-12-10', title: "TreeSet", type: "video", duration: "40m", content: `# 🟢 Topic 121\nContent in progress...` },
                    { id: 'java-12-11', title: "Map Interface", type: "video", duration: "35m", content: `# 🟢 Topic 122\nContent in progress...` },
                    { id: 'java-12-12', title: "HashMap", type: "video", duration: "45m", content: `# 🟢 Topic 123\nContent in progress...` },
                    {
                        id: 'java-quiz-12-4', title: "📝 Quiz 36 (Topics 121-123)", type: "quiz", questions: [
                            { question: "Map stores?", options: ["Key-Value", "Only Key", "Only Value", "Arrays"], correct: 0 }
                        ]
                    },
                    { id: 'java-12-13', title: "LinkedHashMap", type: "video", duration: "35m", content: `# 🟢 Topic 124\nContent in progress...` },
                    { id: 'java-12-14', title: "TreeMap", type: "video", duration: "40m", content: `# 🟢 Topic 125\nContent in progress...` },
                    { id: 'java-12-15', title: "Iterator", type: "video", duration: "35m", content: `# 🟢 Topic 126\nContent in progress...` },
                    {
                        id: 'java-quiz-12-5', title: "📝 Quiz 37 (Topics 124-126)", type: "quiz", questions: [
                            { question: "Iterator traverses?", options: ["Collections", "Arrays", "Strings", "All"], correct: 0 }
                        ]
                    },
                    { id: 'java-12-16', title: "Comparable & Comparator", type: "video", duration: "40m", content: `# 🟢 Topic 127\nContent in progress...` }
                ]
            },
            {
                id: 13,
                title: "Module 13: Advanced Java Concepts",
                topics: [
                    { id: 'java-13-1', title: "Wrapper Classes", type: "video", duration: "35m", content: `# 🟢 Topic 128\nContent in progress...` },
                    { id: 'java-13-2', title: "Autoboxing & Unboxing", type: "video", duration: "30m", content: `# 🟢 Topic 129\nContent in progress...` },
                    { id: 'java-13-3', title: "Enum", type: "video", duration: "35m", content: `# 🟢 Topic 130\nContent in progress...` },
                    {
                        id: 'java-quiz-13-1', title: "📝 Quiz 38 (Topics 128-130)", type: "quiz", questions: [
                            { question: "Wrapper class converts?", options: ["Primitive to Object", "Object to Primitive", "Both", "None"], correct: 2 }
                        ]
                    },
                    { id: 'java-13-4', title: "Annotations", type: "video", duration: "40m", content: `# 🟢 Topic 131\nContent in progress...` },
                    { id: 'java-13-5', title: "Lambda Expressions", type: "video", duration: "45m", content: `# 🟢 Topic 132\nContent in progress...` },
                    { id: 'java-13-6', title: "Functional Interface", type: "video", duration: "40m", content: `# 🟢 Topic 133\nContent in progress...` },
                    {
                        id: 'java-quiz-13-2', title: "📝 Quiz 39 (Topics 131-133)", type: "quiz", questions: [
                            { question: "Lambda is?", options: ["Anonymous function", "Class", "Interface", "Package"], correct: 0 }
                        ]
                    },
                    { id: 'java-13-7', title: "Stream API", type: "video", duration: "50m", content: `# 🟢 Topic 134\nContent in progress...` },
                    { id: 'java-13-8', title: "Optional Class", type: "video", duration: "35m", content: `# 🟢 Topic 135\nContent in progress...` },
                    { id: 'java-13-9', title: "Date & Time API", type: "video", duration: "40m", content: `# 🟢 Topic 136\nContent in progress...` },
                    {
                        id: 'java-quiz-13-3', title: "📝 Quiz 40 (Topics 134-136)", type: "quiz", questions: [
                            { question: "Stream processes?", options: ["Collections", "Arrays", "Data", "All"], correct: 3 }
                        ]
                    }
                ]
            },
            {
                id: 14,
                title: "Module 14: JDBC",
                topics: [
                    { id: 'java-14-1', title: "Introduction to JDBC", type: "video", duration: "35m", content: `# 🟢 Topic 137\nContent in progress...` },
                    { id: 'java-14-2', title: "JDBC Architecture", type: "video", duration: "40m", content: `# 🟢 Topic 138\nContent in progress...` },
                    { id: 'java-14-3', title: "JDBC Drivers", type: "video", duration: "35m", content: `# 🟢 Topic 139\nContent in progress...` },
                    {
                        id: 'java-quiz-14-1', title: "📝 Quiz 41 (Topics 137-139)", type: "quiz", questions: [
                            { question: "JDBC connects Java with?", options: ["Database", "Network", "File", "Browser"], correct: 0 }
                        ]
                    },
                    { id: 'java-14-4', title: "Connecting Java with Database", type: "video", duration: "45m", content: `# 🟢 Topic 140\nContent in progress...` },
                    { id: 'java-14-5', title: "Statement", type: "video", duration: "40m", content: `# 🟢 Topic 141\nContent in progress...` },
                    { id: 'java-14-6', title: "PreparedStatement", type: "video", duration: "45m", content: `# 🟢 Topic 142\nContent in progress...` },
                    {
                        id: 'java-quiz-14-2', title: "📝 Quiz 42 (Topics 140-142)", type: "quiz", questions: [
                            { question: "PreparedStatement is?", options: ["Faster", "Slower", "Same as Statement", "None"], correct: 0 }
                        ]
                    },
                    { id: 'java-14-7', title: "ResultSet", type: "video", duration: "40m", content: `# 🟢 Topic 143\nContent in progress...` },
                    { id: 'java-14-8', title: "CRUD Operations", type: "video", duration: "50m", content: `# 🟢 Topic 144\nContent in progress...` }
                ]
            },
            {
                id: 15,
                title: "Module 15: Mini Projects",
                topics: [
                    { id: 'java-15-1', title: "Student Management System", type: "video", duration: "60m", content: `# 🟢 Project 1\nContent in progress...` },
                    { id: 'java-15-2', title: "Banking Application", type: "video", duration: "60m", content: `# 🟢 Project 2\nContent in progress...` },
                    { id: 'java-15-3', title: "Library Management System", type: "video", duration: "60m", content: `# 🟢 Project 3\nContent in progress...` },
                    {
                        id: 'java-quiz-15-1', title: "📝 Quiz 43 (Projects 1-3)", type: "quiz", questions: [
                            { question: "Project uses?", options: ["All concepts", "Only basics", "Only OOP", "None"], correct: 0 }
                        ]
                    },
                    { id: 'java-15-4', title: "Quiz Application", type: "video", duration: "50m", content: `# 🟢 Project 4\nContent in progress...` },
                    { id: 'java-15-5', title: "File-Based Project", type: "video", duration: "55m", content: `# 🟢 Project 5\nContent in progress...` },
                    { id: 'java-15-6', title: "Database-Based Project", type: "video", duration: "60m", content: `# 🟢 Project 6\nContent in progress...` },
                    {
                        id: 'java-quiz-15-2', title: "📝 Quiz 44 (Projects 4-6)", type: "quiz", questions: [
                            { question: "Real projects need?", options: ["Theory", "Practice", "Both", "None"], correct: 2 }
                        ]
                    }
                ]
            }
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
