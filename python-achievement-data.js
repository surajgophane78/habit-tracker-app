function pythonTopic(id, title, lines) {
  return { id, title, items: lines.trim().split('\n').map((name, index) => ({ id: `${id}-${index + 1}`, name: name.trim(), done: false })) };
}

window.MOMENTUM_PYTHON_ACHIEVEMENT_SEED = [
  pythonTopic('python-topic-1', 'Topic 1 — Data Structures and Algorithms · Chapter 1', `
1.1 Unpacking a Sequence into Separate Variables
1.2 Unpacking Elements from Iterables of Arbitrary Length
1.3 Keeping the Last N Items
1.4 Finding the Largest or Smallest N Items
1.5 Implementing a Priority Queue
1.6 Mapping Keys to Multiple Values in a Dictionary
1.7 Keeping Dictionaries in Order
1.8 Calculating with Dictionaries
1.9 Finding Commonalities in Two Dictionaries
1.10 Removing Duplicates from a Sequence while Maintaining Order
1.11 Naming a Slice
1.12 Determining the Most Frequently Occurring Items in a Sequence
1.13 Sorting a List of Dictionaries by a Common Key
1.14 Sorting Objects Without Native Comparison Support
1.15 Grouping Records Together Based on a Field
1.16 Filtering Sequence Elements
1.17 Extracting a Subset of a Dictionary
1.18 Mapping Names to Sequence Elements
1.19 Transforming and Reducing Data at the Same Time
1.20 Combining Multiple Mappings into a Single Mapping`),
  pythonTopic('python-topic-2', 'Topic 2 — Strings and Text · Chapter 2', `
2.1 Splitting Strings on Any of Multiple Delimiters
2.2 Matching Text at the Start or End of a String
2.3 Matching Strings Using Shell Wildcard Patterns
2.4 Matching and Searching for Text Patterns
2.5 Searching and Replacing Text
2.6 Searching and Replacing Case-Insensitive Text
2.7 Specifying a Regular Expression for the Shortest Match
2.8 Writing a Regular Expression for Multiline Patterns
2.9 Normalizing Unicode Text to a Standard Representation
2.10 Working with Unicode Characters in Regular Expressions
2.11 Stripping Unwanted Characters from Strings
2.12 Sanitizing and Cleaning Up Text
2.13 Aligning Text Strings
2.14 Combining and Concatenating Strings
2.15 Interpolating Variables in Strings
2.16 Reformatting Text to a Fixed Number of Columns
2.17 Handling HTML and XML Entities in Text
2.18 Tokenizing Text
2.19 Writing a Simple Recursive Descent Parser
2.20 Performing Text Operations on Byte Strings`),
  pythonTopic('python-topic-3', 'Topic 3 — Numbers, Dates, and Times · Chapter 3', `
3.1 Rounding Numerical Values
3.2 Performing Accurate Decimal Calculations
3.3 Formatting Numbers for Output
3.4 Working with Binary, Octal, and Hexadecimal Integers
3.5 Packing and Unpacking Large Integers from Bytes
3.6 Performing Complex-Valued Math
3.7 Working with Infinity and NaNs
3.8 Calculating with Fractions
3.9 Calculating with Large Numerical Arrays
3.10 Performing Matrix and Linear Algebra Calculations
3.11 Picking Things at Random
3.12 Converting Days to Seconds, and Other Basic Time Conversions
3.13 Determining Last Friday's Date
3.14 Finding the Date Range for the Current Month
3.15 Converting Strings into Datetimes
3.16 Manipulating Dates Involving Time Zones`),
  pythonTopic('python-topic-4', 'Topic 4 — Iterators and Generators · Chapter 4', `
4.1 Manually Consuming an Iterator
4.2 Delegating Iteration
4.3 Creating New Iteration Patterns with Generators
4.4 Implementing the Iterator Protocol
4.5 Iterating in Reverse
4.6 Defining Generator Functions with Extra State
4.7 Taking a Slice of an Iterator
4.8 Skipping the First Part of an Iterable
4.9 Iterating Over All Possible Combinations or Permutations
4.10 Iterating Over the Index-Value Pairs of a Sequence
4.11 Iterating Over Multiple Sequences Simultaneously
4.12 Iterating on Items in Separate Containers
4.13 Creating Data Processing Pipelines
4.14 Flattening a Nested Sequence
4.15 Iterating in Sorted Order Over Merged Sorted Iterables
4.16 Replacing Infinite while Loops with an Iterator`),
  pythonTopic('python-topic-5', 'Topic 5 — Files and I/O · Chapter 5', `
5.1 Reading and Writing Text Data
5.2 Printing to a File
5.3 Printing with a Different Separator or Line Ending
5.4 Reading and Writing Binary Data
5.5 Writing to a File That Doesn't Already Exist
5.6 Performing I/O Operations on a String
5.7 Reading and Writing Compressed Datafiles
5.8 Iterating Over Fixed-Sized Records
5.9 Reading Binary Data into a Mutable Buffer
5.10 Memory Mapping Binary Files
5.11 Manipulating Pathnames
5.12 Testing for the Existence of a File
5.13 Getting a Directory Listing
5.14 Bypassing Filename Encoding
5.15 Printing Bad Filenames
5.16 Adding or Changing the Encoding of an Already Open File
5.17 Writing Bytes to a Text File
5.18 Wrapping an Existing File Descriptor As a File Object
5.19 Making Temporary Files and Directories
5.20 Communicating with Serial Ports
5.21 Serializing Python Objects`),
  pythonTopic('python-topic-6', 'Topic 6 — Data Encoding and Processing · Chapter 6', `
6.1 Reading and Writing CSV Data
6.2 Reading and Writing JSON Data
6.3 Parsing Simple XML Data
6.4 Parsing Huge XML Files Incrementally
6.5 Turning a Dictionary into XML
6.6 Parsing, Modifying, and Rewriting XML
6.7 Parsing XML Documents with Namespaces
6.8 Interacting with a Relational Database
6.9 Decoding and Encoding Hexadecimal Digits
6.10 Decoding and Encoding Base64
6.11 Reading and Writing Binary Arrays of Structures
6.12 Reading Nested and Variable-Sized Binary Structures
6.13 Summarizing Data and Performing Statistics`),
  pythonTopic('python-topic-7', 'Topic 7 — Functions · Chapter 7', `
7.1 Writing Functions That Accept Any Number of Arguments
7.2 Writing Functions That Only Accept Keyword Arguments
7.3 Attaching Informational Metadata to Function Arguments
7.4 Returning Multiple Values from a Function
7.5 Defining Functions with Default Arguments
7.6 Defining Anonymous or Inline Functions
7.7 Capturing Variables in Anonymous Functions
7.8 Making an N-Argument Callable Work As a Callable with Fewer Arguments
7.9 Replacing Single Method Classes with Functions
7.10 Carrying Extra State with Callback Functions
7.11 Inlining Callback Functions
7.12 Accessing Variables Defined Inside a Closure`),
  pythonTopic('python-topic-8', 'Topic 8 — Classes and Objects · Chapter 8', `
8.1 Changing the String Representation of Instances
8.2 Customizing String Formatting
8.3 Making Objects Support the Context-Management Protocol
8.4 Saving Memory When Creating a Large Number of Instances
8.5 Encapsulating Names in a Class
8.6 Creating Managed Attributes
8.7 Calling a Method on a Parent Class
8.8 Extending a Property in a Subclass
8.9 Creating a New Kind of Class or Instance Attribute
8.10 Using Lazily Computed Properties
8.11 Simplifying the Initialization of Data Structures
8.12 Defining an Interface or Abstract Base Class
8.13 Implementing a Data Model or Type System
8.14 Implementing Custom Containers
8.15 Delegating Attribute Access
8.16 Defining More Than One Constructor in a Class
8.17 Creating an Instance Without Invoking init
8.18 Extending Classes with Mixins
8.19 Implementing Stateful Objects or State Machines
8.20 Calling a Method on an Object Given the Name As a String
8.21 Implementing the Visitor Pattern
8.22 Implementing the Visitor Pattern Without Recursion
8.23 Managing Memory in Cyclic Data Structures
8.24 Making Classes Support Comparison Operations
8.25 Creating Cached Instances`),
  pythonTopic('python-topic-9', 'Topic 9 — Metaprogramming · Chapter 9', `
9.1 Putting a Wrapper Around a Function
9.2 Preserving Function Metadata When Writing Decorators
9.3 Unwrapping a Decorator
9.4 Defining a Decorator That Takes Arguments
9.5 Defining a Decorator with User Adjustable Attributes
9.6 Defining a Decorator That Takes an Optional Argument
9.7 Enforcing Type Checking on a Function Using a Decorator
9.8 Defining Decorators As Part of a Class
9.9 Defining Decorators As Classes
9.10 Applying Decorators to Class and Static Methods
9.11 Writing Decorators That Add Arguments to Wrapped Functions
9.12 Using Decorators to Patch Class Definitions
9.13 Using a Metaclass to Control Instance Creation
9.14 Capturing Class Attribute Definition Order
9.15 Defining a Metaclass That Takes Optional Arguments
9.16 Enforcing an Argument Signature on *args and **kwargs
9.17 Enforcing Coding Conventions in Classes
9.18 Defining Classes Programmatically
9.19 Initializing Class Members at Definition Time
9.20 Implementing Multiple Dispatch with Function Annotations
9.21 Avoiding Repetitive Property Methods
9.22 Defining Context Managers the Easy Way
9.23 Executing Code with Local Side Effects
9.24 Parsing and Analyzing Python Source
9.25 Disassembling Python Byte Code`),
  pythonTopic('python-topic-10', 'Topic 10 — Modules and Packages · Chapter 10', `
10.1 Making a Hierarchical Package of Modules
10.2 Controlling the Import of Everything
10.3 Importing Package Submodules Using Relative Names
10.4 Splitting a Module into Multiple Files
10.5 Making Separate Directories of Code Import Under a Common Namespace
10.6 Reloading Modules
10.7 Making a Directory or Zip File Runnable As a Main Script
10.8 Reading Datafiles Within a Package
10.9 Adding Directories to sys.path
10.10 Importing Modules Using a Name Given in a String
10.11 Loading Modules from a Remote Machine Using Import Hooks
10.12 Patching Modules on Import
10.13 Installing Packages Just for Yourself
10.14 Creating a New Python Environment
10.15 Distributing Packages`),
  pythonTopic('python-topic-11', 'Topic 11 — Network and Web Programming · Chapter 11', `
11.1 Interacting with HTTP Services As a Client
11.2 Creating a TCP Server
11.3 Creating a UDP Server
11.4 Generating a Range of IP Addresses from a CIDR Address
11.5 Creating a Simple REST-Based Interface
11.6 Implementing a Simple Remote Procedure Call with XML-RPC
11.7 Communicating Simply Between Interpreters
11.8 Implementing Remote Procedure Calls
11.9 Authenticating Clients Simply
11.10 Adding SSL to Network Services
11.11 Passing a Socket File Descriptor Between Processes
11.12 Understanding Event-Driven I/O
11.13 Sending and Receiving Large Arrays`),
  pythonTopic('python-topic-12', 'Topic 12 — Concurrency · Chapter 12', `
12.1 Starting and Stopping Threads
12.2 Determining If a Thread Has Started
12.3 Communicating Between Threads
12.4 Locking Critical Sections
12.5 Locking with Deadlock Avoidance
12.6 Storing Thread-Specific State
12.7 Creating a Thread Pool
12.8 Performing Simple Parallel Programming
12.9 Dealing with the GIL (and How to Stop Worrying About It)
12.10 Defining an Actor Task
12.11 Implementing Publish/Subscribe Messaging
12.12 Using Generators As an Alternative to Threads
12.13 Polling Multiple Thread Queues
12.14 Launching a Daemon Process on Unix`),
  pythonTopic('python-topic-13', 'Topic 13 — Utility Scripting and System Administration · Chapter 13', `
13.1 Accepting Script Input via Redirection, Pipes, or Input Files
13.2 Terminating a Program with an Error Message
13.3 Parsing Command-Line Options
13.4 Prompting for a Password at Runtime
13.5 Getting the Terminal Size
13.6 Executing an External Command and Getting Its Output
13.7 Copying or Moving Files and Directories
13.8 Creating and Unpacking Archives
13.9 Finding Files by Name
13.10 Reading Configuration Files
13.11 Adding Logging to Simple Scripts
13.12 Adding Logging to Libraries
13.13 Making a Stopwatch Timer
13.14 Putting Limits on Memory and CPU Usage
13.15 Launching a Web Browser`),
  pythonTopic('python-topic-14', 'Topic 14 — Testing, Debugging, and Exceptions · Chapter 14', `
14.1 Testing Output Sent to stdout
14.2 Patching Objects in Unit Tests
14.3 Testing for Exceptional Conditions in Unit Tests
14.4 Logging Test Output to a File
14.5 Skipping or Anticipating Test Failures
14.6 Handling Multiple Exceptions
14.7 Catching All Exceptions
14.8 Creating Custom Exceptions
14.9 Raising an Exception in Response to Another Exception
14.10 Reraising the Last Exception
14.11 Issuing Warning Messages
14.12 Debugging Basic Program Crashes
14.13 Profiling and Timing Your Program
14.14 Making Your Programs Run Faster`),
  pythonTopic('python-topic-15', 'Topic 15 — C Extensions · Chapter 15', `
15.1 Accessing C Code Using ctypes
15.2 Writing a Simple C Extension Module
15.3 Writing an Extension Function That Operates on Arrays
15.4 Managing Opaque Pointers in C Extension Modules
15.5 Defining and Exporting C APIs from Extension Modules
15.6 Calling Python from C
15.7 Releasing the GIL in C Extensions
15.8 Mixing Threads from C and Python
15.9 Wrapping C Code with Swig
15.10 Wrapping Existing C Code with Cython
15.11 Using Cython to Write High-Performance Array Operations
15.12 Turning a Function Pointer into a Callable
15.13 Passing NULL-Terminated Strings to C Libraries
15.14 Passing Unicode Strings to C Libraries
15.15 Converting C Strings to Python
15.16 Working with C Strings of Dubious Encoding
15.17 Passing Filenames to C Extensions
15.18 Passing Open Files to C Extensions
15.19 Reading File-Like Objects from C
15.20 Consuming an Iterable from C
15.21 Diagnosing Segmentation Faults`)
];
