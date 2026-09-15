function cTopic(id, title, lines) {
  return { id, title, items: lines.trim().split('\n').map((name, index) => ({ id: `${id}-${index + 1}`, name: name.trim(), done: false })) };
}

// The supplied syllabus is C/C99 (not modern C++), so it is labelled C / C++ in the app.
window.MOMENTUM_CPP_ACHIEVEMENT_SEED = [
  cTopic('cpp-topic-1', 'Topic 1 — Introducing C · Chapter 1', `
1.1 History of C
• Origins
• Standardization
• C-Based Languages
1.2 Strengths and Weaknesses of C
• Strengths
• Weaknesses
1.3 Effective Use of C`),
  cTopic('cpp-topic-2', 'Topic 2 — C Fundamentals · Chapter 2', `
2.1 Writing a Simple Program
• Program: Printing a Pun
• Compiling and Linking
• Integrated Development Environments
2.2 The General Form of a Simple Program
• Directives
• Functions
• Statements
• Printing Strings
• Comments
2.3 Variables and Assignment
• Types
• Declarations
• Assignment
• Printing the Value of a Variable
• Program: Computing the Dimensional Weight of a Box
• Initialization
2.4 Printing Expressions
2.5 Reading Input
• Program: Computing the Dimensional Weight of a Box (Revisited)
2.6 Defining Names for Constants
• Program: Converting from Fahrenheit to Celsius
2.7 Identifiers
2.8 Layout of a C Program`),
  cTopic('cpp-topic-3', 'Topic 3 — Formatted Input/Output · Chapter 3', `
3.1 The printf Function
• Conversion Specifications
• Program: Using printf to Format Numbers
• Escape Sequences
3.2 The scanf Function
• How scanf Works
• Ordinary Characters in Format Strings
• Confusing printf with scanf
• Program: Adding Fractions`),
  cTopic('cpp-topic-4', 'Topic 4 — Expressions · Chapter 4', `
4.1 Arithmetic Operators
• Operator Precedence and Associativity
• Program: Computing a UPC Check Digit
4.2 Assignment Operators
• Simple Assignment
• Lvalues
• Compound Assignment
4.3 Increment and Decrement Operators
4.4 Expression Evaluation
• Order of Subexpression Evaluation
4.5 Expression Statements`),
  cTopic('cpp-topic-5', 'Topic 5 — Selection Statements · Chapter 5', `
5.1 Logical Expressions
• Relational Operators
• Equality Operators
• Logical Operators
5.2 The if Statement
• Compound Statements
• The else Clause
• Cascaded if Statements
• Program: Calculating a Broker's Commission
• The "Dangling else" Problem
• Conditional Expressions
• Boolean Values in C89
• Boolean Values in C99
5.3 The switch Statement
• The Role of the break Statement
• Program: Printing a Date in Legal Forms`),
  cTopic('cpp-topic-6', 'Topic 6 — Loops · Chapter 6', `
6.1 The while Statement
• Infinite Loops
• Program: Printing a Table of Squares
• Program: Summing a Series of Numbers
6.2 The do Statement
• Program: Calculating the Number of Digits in an Integer
6.3 The for Statement
• for Statement Idioms
• Omitting Expressions in a for Statement
• for Statements in C99
• The Comma Operator
• Program: Printing a Table of Squares (Revisited)
6.4 Exiting from a Loop
• The break Statement
• The continue Statement
• The goto Statement
• Program: Balancing a Checkbook
6.5 The Null Statement`),
  cTopic('cpp-topic-7', 'Topic 7 — Basic Types · Chapter 7', `
7.1 Integer Types
• Integer Types in C99
• Integer Constants
• Integer Constants in C99
• Integer Overflow
• Reading and Writing Integers
• Program: Summing a Series of Numbers (Revisited)
7.2 Floating Types
• Floating Constants
• Reading and Writing Floating-Point Numbers
7.3 Character Types
• Operations on Characters
• Signed and Unsigned Characters
7.4 Arithmetic Types
• Escape Sequences
7.5 Character-Handling Functions
• Reading and Writing Characters using scanf and printf
• Reading and Writing Characters using getchar and putchar
• Program: Determining the Length of a Message
7.6 Type Conversion
• The Usual Arithmetic Conversions
• Conversion During Assignment
• Implicit Conversions in C99
• Casting
7.7 Type Definitions
• Advantages of Type Definitions
• Type Definitions and Portability
7.8 The sizeof Operator`),
  cTopic('cpp-topic-8', 'Topic 8 — Arrays · Chapter 8', `
8.1 One-Dimensional Arrays
• Array Subscripting
• Program: Reversing a Series of Numbers
• Array Initialization
• Designated Initializers
• Program: Checking a Number for Repeated Digits
• Using the sizeof Operator with Arrays
• Program: Computing Interest
8.2 Multidimensional Arrays
• Initializing a Multidimensional Array
• Constant Arrays
• Program: Dealing a Hand of Cards
• Variable-Length Arrays (C99)`),
  cTopic('cpp-topic-9', 'Topic 9 — Functions · Chapter 9', `
9.1 Defining and Calling Functions
• Program: Computing Averages
• Program: Printing a Countdown
• Program: Printing a Pun (Revisited)
• Function Definitions
• Function Calls
• Program: Testing Whether a Number Is Prime
9.2 Function Declarations
9.3 Arguments
• Argument Conversions
9.4 Array Arguments
• Variable-Length Array Parameters
• Using static in Array Parameter Declarations
• Compound Literals
9.5 Recursion
9.6 The return Statement
• Program Termination
• The exit Function
• The Quicksort Algorithm
• Program: Quicksort`),
  cTopic('cpp-topic-10', 'Topic 10 — Program Organization · Chapter 10', `
10.1 Local Variables
• Static Local Variables
• Parameters
10.2 External Variables
• Example: Using External Variables to Implement a Stack
• Pros and Cons of External Variables
• Program: Guessing a Number
10.3 Blocks
• Scope
10.4 Organizing a C Program
10.5 Program: Classifying a Poker Hand`),
  cTopic('cpp-topic-11', 'Topic 11 — Pointers · Chapter 11', `
11.1 Pointer Variables
• Declaring Pointer Variables
11.2 The Address and Indirection Operators
• The Address Operator
• The Indirection Operator
11.3 Pointer Assignment
11.4 Pointers as Arguments
• Program: Finding the Largest and Smallest Elements in an Array
• Using const to Protect Arguments
11.5 Pointers as Return Values`),
  cTopic('cpp-topic-12', 'Topic 12 — Pointers and Arrays · Chapter 12', `
12.1 Pointer Arithmetic
• Adding an Integer to a Pointer
• Subtracting an Integer from a Pointer
• Subtracting One Pointer from Another
• Comparing Pointers
• Pointers to Compound Literals
12.2 Using Pointers for Array Processing
• Combining the * and ++ Operators
• Using an Array Name as a Pointer
• Program: Reversing a Series of Numbers (Revisited)
12.3 Array Arguments (Revisited)
• Using a Pointer as an Array Name
12.4 Pointers and Multidimensional Arrays
• Processing the Elements of a Multidimensional Array
• Processing the Rows of a Multidimensional Array
• Processing the Columns of a Multidimensional Array
• Using the Name of a Multidimensional Array as a Pointer
12.5 Pointers and Variable-Length Arrays (C99)`),
  cTopic('cpp-topic-13', 'Topic 13 — Strings · Chapter 13', `
13.1 String Literals
• Escape Sequences in String Literals
• Continuing a String Literal
• How String Literals Are Stored
• Operations on String Literals
• String Literals versus Character Constants
13.2 String Variables
• Initializing a String Variable
• Character Arrays versus Character Pointers
13.3 Reading and Writing Strings
• Writing Strings Using printf and puts
• Reading Strings Using scanf and gets
• Reading Strings Character by Character
13.4 Accessing the Characters in a String
13.5 Using the C String Library
• The strcpy (String Copy) Function
• The strlen (String Length) Function
• The strcat (String Concatenation) Function
• The strcmp (String Comparison) Function
• Program: Printing a One-Month Reminder List
13.6 String Idioms
• Searching for the End of a String
• Copying a String
13.7 Arrays of Strings
13.8 Command-Line Arguments
• Program: Checking Planet Names`),
  cTopic('cpp-topic-14', 'Topic 14 — The Preprocessor · Chapter 14', `
14.1 How the Preprocessor Works
14.2 Preprocessing Directives
14.3 Macro Definitions
• Simple Macros
• Parameterized Macros
• The # Operator
• The ## Operator
• General Properties of Macros
• Parentheses in Macro Definitions
• Creating Longer Macros
• Predefined Macros
• Additional Predefined Macros in C99
• Empty Macro Arguments
• Macros with a Variable Number of Arguments
• The __func__ Identifier
14.4 Conditional Compilation
• The #if and #endif Directives
• The defined Operator
• The #ifdef and #ifndef Directives
• The #elif and #else Directives
• Uses of Conditional Compilation
14.5 Miscellaneous Directives
• The #error Directive
• The #line Directive
• The #pragma Directive
• The _Pragma Operator`),
  cTopic('cpp-topic-15', 'Topic 15 — Writing Large Programs · Chapter 15', `
15.1 Source Files
15.2 Header Files
• The #include Directive
• Sharing Macro Definitions and Type Definitions
• Sharing Function Prototypes
• Sharing Variable Declarations
• Nested Includes
• Protecting Header Files
• #error Directives in Header Files
15.3 Dividing a Program into Files
• Program: Text Formatting
15.4 Building a Multiple-File Program
• Makefiles
• Errors During Linking
• Rebuilding a Program
15.5 Defining Macros Outside a Program`),
  cTopic('cpp-topic-16', 'Topic 16 — Structures, Unions, and Enumerations · Chapter 16', `
16.1 Structure Variables
• Declaring Structure Variables
• Initializing Structure Variables
• Designated Initializers
• Operations on Structures
16.2 Structure Types
• Declaring a Structure Tag
• Defining a Structure Type
• Structures as Arguments and Return Values
• Compound Literals
16.3 Nested Arrays and Structures
• Nested Structures
• Arrays of Structures
• Initializing an Array of Structures
• Program: Maintaining a Parts Database
16.4 Unions
• Using Unions to Save Space
• Using Unions to Build Mixed Data Structures
• Adding a "Tag Field" to a Union
16.5 Enumerations
• Enumeration Tags and Type Names
• Enumerations as Integers
• Using Enumerations to Declare "Tag Fields"`),
  cTopic('cpp-topic-17', 'Topic 17 — Advanced Uses of Pointers · Chapter 17', `
17.1 Dynamic Storage Allocation
• Memory Allocation Functions
• Null Pointers
17.2 Dynamically Allocated Strings
• Using malloc to Allocate Memory for a String
• Using Dynamic Storage Allocation in String Functions
• Arrays of Dynamically Allocated Strings
• Program: Printing a One-Month Reminder List (Revisited)
17.3 Dynamically Allocated Arrays
• Using malloc to Allocate Storage for an Array
• The calloc Function
• The realloc Function
17.4 Deallocating Storage
• The free Function
• The "Dangling Pointer" Problem
17.5 Linked Lists
• Declaring a Node Type
• Creating a Node
• The -> Operator
• Inserting a Node at the Beginning of a Linked List
• Searching a Linked List
• Deleting a Node from a Linked List
• Ordered Lists
• Program: Maintaining a Parts Database (Revisited)
17.6 Pointers to Pointers
17.7 Pointers to Functions
• Function Pointers as Arguments
• The qsort Function
17.8 Other Uses of Function Pointers
• Program: Tabulating the Trigonometric Functions
17.9 Restricted Pointers (C99)
17.10 Flexible Array Members (C99)`),
  cTopic('cpp-topic-18', 'Topic 18 — Declarations · Chapter 18', `
18.1 Declaration Syntax
18.2 Storage Classes
• Properties of Variables
• The auto Storage Class
• The static Storage Class
• The extern Storage Class
• The register Storage Class
• The Storage Class of a Function
• Summary
18.3 Type Qualifiers
18.4 Declarators
• Deciphering Complex Declarations
• Using Type Definitions to Simplify Declarations
18.5 Initializers
• Uninitialized Variables
18.6 Inline Functions (C99)
• Inline Definitions
• Restrictions on Inline Functions
• Using Inline Functions with GCC`),
  cTopic('cpp-topic-19', 'Topic 19 — Program Design · Chapter 19', `
19.1 Modules
• Cohesion and Coupling
• Types of Modules
• Information Hiding
19.2 A Stack Module
• Abstract Data Types
• Encapsulation
• Incomplete Types
19.3 A Stack Abstract Data Type
• Defining the Interface for the Stack ADT
• Implementing the Stack ADT Using a Fixed-Length Array
• Changing the Item Type in the Stack ADT
• Implementing the Stack ADT Using a Dynamic Array
• Implementing the Stack ADT Using a Linked List
19.4 Design Issues for Abstract Data Types
• Naming Conventions
• Error Handling
19.5 Generic ADTs
19.6 ADTs in Newer Languages`),
  cTopic('cpp-topic-20', 'Topic 20 — Low-Level Programming · Chapter 20', `
20.1 Bitwise Operators
• Bitwise Shift Operators
• Bitwise Complement, And, Exclusive Or, and Inclusive Or
• Using the Bitwise Operators to Access Bits
• Using the Bitwise Operators to Access Bit-Fields
• Program: XOR Encryption
20.2 Bit-Fields in Structures
• How Bit-Fields Are Stored
20.3 Other Low-Level Techniques
• Defining Machine-Dependent Types
• Using Unions to Provide Multiple Views of Data
• Using Pointers as Addresses
• Program: Viewing Memory Locations
• The volatile Type Qualifier`),
  cTopic('cpp-topic-21', 'Topic 21 — The Standard Library · Chapter 21', `
21.1 Using the Library
• Restrictions on Names Used in the Library
• Functions Hidden by Macros
21.2 C89 Library Overview
21.3 C99 Library Changes
21.4 The <stddef.h> Header: Common Definitions
21.5 The <stdbool.h> Header (C99): Boolean Type and Values`),
  cTopic('cpp-topic-22', 'Topic 22 — Input/Output · Chapter 22', `
22.1 Streams
• File Pointers
• Standard Streams and Redirection
• Text Files versus Binary Files
22.2 File Operations
• Opening a File
• Modes
• Closing a File
• Attaching a File to an Open Stream
• Obtaining File Names from the Command Line
• Program: Checking Whether a File Can Be Opened
• Temporary Files
• File Buffering
• Miscellaneous File Operations
22.3 Formatted I/O
• The ...printf Functions
• ...printf Conversion Specifications
• C99 Changes to ...printf Conversion Specifications
• Examples of ...printf Conversion Specifications
• The ...scanf Functions
• ...scanf Format Strings
• ...scanf Conversion Specifications
• C99 Changes to ...scanf Conversion Specifications
• scanf Examples
• Detecting End-of-File and Error Conditions
22.4 Character I/O
• Output Functions
• Input Functions
• Program: Copying a File
22.5 Line I/O
• Output Functions
• Input Functions
22.6 Block I/O
22.7 File Positioning
• Program: Modifying a File of Part Records
22.8 String I/O
• Output Functions
• Input Functions`),
  cTopic('cpp-topic-23', 'Topic 23 — Library Support for Numbers and Character Data · Chapter 23', `
23.1 The <float.h> Header: Characteristics of Floating Types
23.2 The <limits.h> Header: Sizes of Integer Types
23.3 The <math.h> Header (C89): Mathematics
• Errors
• Trigonometric Functions
• Hyperbolic Functions
• Exponential and Logarithmic Functions
• Power Functions
• Nearest Integer, Absolute Value, and Remainder Functions
23.4 The <math.h> Header (C99): Mathematics
• IEEE Floating-Point Standard
• Types
• Macros
• Errors
• Functions
• Classification Macros
• Trigonometric Functions
• Hyperbolic Functions
• Exponential and Logarithmic Functions
• Power and Absolute Value Functions
• Error and Gamma Functions
• Nearest Integer Functions
• Remainder Functions
• Manipulation Functions
• Maximum, Minimum, and Positive Difference Functions
• Floating Multiply-Add
• Comparison Macros
23.5 The <ctype.h> Header: Character Handling
• Character-Classification Functions
• Program: Testing the Character-Classification Functions
• Character Case-Mapping Functions
• Program: Testing the Case-Mapping Functions
23.6 The <string.h> Header: String Handling
• Copying Functions
• Concatenation Functions
• Comparison Functions
• Search Functions
• Miscellaneous Functions`),
  cTopic('cpp-topic-24', 'Topic 24 — Error Handling · Chapter 24', `
24.1 The <assert.h> Header: Diagnostics
24.2 The <errno.h> Header: Errors
• The perror and strerror Functions
24.3 The <signal.h> Header: Signal Handling
• Signal Macros
• The signal Function
• Predefined Signal Handlers
• The raise Function
• Program: Testing Signals
24.4 The <setjmp.h> Header: Nonlocal Jumps
• Program: Testing setjmp/longjmp`),
  cTopic('cpp-topic-25', 'Topic 25 — International Features · Chapter 25', `
25.1 The <locale.h> Header: Localization
• Categories
• The setlocale Function
• The localeconv Function
25.2 Multibyte Characters and Wide Characters
• Multibyte Characters
• Wide Characters
25.3 Unicode and the Universal Character Set
• Encodings of Unicode
25.4 Multibyte/Wide-Character Conversion Functions
• Multibyte/Wide-Character Conversion Functions
• Multibyte/Wide-String Conversion Functions
25.5 Digraphs and Trigraphs
• Trigraphs
• Digraphs
• The <iso646.h> Header: Alternative Spellings
25.6 Universal Character Names (C99)
25.7 The <wchar.h> Header (C99): Extended Multibyte and Wide-Character Utilities
• Stream Orientation
• Formatted Wide-Character Input/Output Functions
• Wide-Character Input/Output Functions
• General Wide-String Utilities
• Wide-Character Time-Conversion Functions
• Extended Multibyte/Wide-Character Conversion Utilities
25.8 The <wctype.h> Header (C99): Wide-Character Classification and Mapping Utilities
• Wide-Character Classification Functions
• Extensible Wide-Character Classification Functions
• Wide-Character Case-Mapping Functions
• Extensible Wide-Character Case-Mapping Functions`),
  cTopic('cpp-topic-26', 'Topic 26 — Miscellaneous Library Functions · Chapter 26', `
26.1 The <stdarg.h> Header: Variable Arguments
• Calling a Function with a Variable Argument List
• The v...printf Functions
• The v...scanf Functions
26.2 The <stdlib.h> Header: General Utilities
• Numeric Conversion Functions
• Program: Testing the Numeric Conversion Functions
• Pseudo-Random Sequence Generation Functions
• Program: Testing the Pseudo-Random Sequence Generation Functions
• Communication with the Environment
• Searching and Sorting Utilities
• Program: Determining Air Mileage
• Integer Arithmetic Functions
26.3 The <time.h> Header: Date and Time
• Time Manipulation Functions
• Time Conversion Functions
• Program: Displaying the Date and Time`),
  cTopic('cpp-topic-27', 'Topic 27 — Additional C99 Support for Mathematics · Chapter 27', `
27.1 The <stdint.h> Header (C99): Integer Types
• <stdint.h> Types
• Limits of Specified-Width Integer Types
• Limits of Other Integer Types
• Macros for Integer Constants
27.2 The <inttypes.h> Header (C99): Format Conversion of Integer Types
• Macros for Format Specifiers
• Functions for Greatest-Width Integer Types
27.3 Complex Numbers (C99)
• Definition of Complex Numbers
• Complex Arithmetic
• Complex Types in C99
• Operations on Complex Numbers
• Conversion Rules for Complex Types
27.4 The <complex.h> Header (C99): Complex Arithmetic
• <complex.h> Macros
• The CX_LIMITED_RANGE Pragma
• <complex.h> Functions
• Trigonometric Functions
• Hyperbolic Functions
• Exponential and Logarithmic Functions
• Power and Absolute-Value Functions
• Manipulation Functions
• Program: Finding the Roots of a Quadratic Equation
27.5 The <tgmath.h> Header (C99): Type-Generic Math
• Type-Generic Macros
• Invoking a Type-Generic Macro
27.6 The <fenv.h> Header (C99): Floating-Point Environment
• Floating-Point Status Flags and Control Modes
• <fenv.h> Macros`),
  cTopic('cpp-appendices', 'Appendices', `
Appendix A
Appendix B
Appendix C
Appendix D
Appendix E`)
];
