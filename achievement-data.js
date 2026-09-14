function topic(id, title, lines) {
  return {
    id,
    title,
    items: lines.trim().split('\n').map((name, index) => ({ id: `${id}-${index + 1}`, name: name.trim(), done: false }))
  };
}

window.MOMENTUM_ACHIEVEMENT_SEED = [
  topic('topic-1', 'Topic 1 — The Linux Operating System · Chapter 1', `
1.1 What Is an Operating System?
1.2 Getting Started: Login and Logout
1.3 Desktop Login
1.4 Starting a Terminal Window
1.5 Remote Login
1.6 Understanding the Shell
1.7 Entering Commands
1.8 Trying a Few Commands
1.9 Correcting Typing Mistakes
1.10 Aborting a Command — Exercise A
1.11 Using Files and Directories
1.12 Current Working Directory and Filenames
1.13 Handling Files and Directories
1.14 Standard Personal Directories
1.15 Protecting Files: Access Control
1.16 The Super User
1.17 Examining the Permission Settings
1.18 Setting Permissions — Exercise B
1.19 Text Editing
1.20 Getting Hard/Saved Copies
1.21 Communicating with Others
1.22 Who's Who on the System: finger
1.23 Email
1.24 Browsing the Web — Exercise C
1.25 Creating and Running Your Own Program
1.26 Compiling — Exercise D
1.27 Consulting Linux Documentation
1.28 Rounding Up Useful Commands — Summary`),
  topic('topic-2', 'Topic 2 — The Desktop Environment · Chapter 2', `
2.1 Desktop Overview
2.2 Desktop Components
2.3 The GNOME 3 Desktop
2.4 Understanding GUI
2.5 Working with the Desktop
2.6 Session Control and System Settings
2.7 Launching Application Programs
2.8 Managing Files
2.9 Multiple Workspaces
2.10 Desktop Appearance
2.11 Windows
2.12 The X Window System
2.13 Window Manager
2.14 Window Information
2.15 The File Browser
2.16 Navigating the File Tree
2.17 Opening a File or Folder
2.18 Finding Files
2.19 Managing Files and Folders
2.20 Access Control for Files and Folders
2.21 Writing CDs or DVDs
2.22 Changing Your Default File Browser
2.23 Terminal Window
2.24 Starting a GNOME Terminal
2.25 Terminal Window and the Shell
2.26 Select, Copy, and Paste
2.27 Web and Email Links
2.28 Accessing Help and Documentation — Summary — Exercises`),
  topic('topic-3', 'Topic 3 — Interacting with the Bash Shell · Chapter 3', `
3.1 Bash
3.2 Interacting with Bash
3.3 Command-Line Editing and Command Completion
3.4 Bash Command Execution
3.5 Bash Input/Output Redirection
3.6 Standard Input and Output
3.7 I/O Redirection
3.8 Pipes
3.9 Bash Job Control
3.10 Bash Shell Expansions
3.11 History Expansion
3.12 Alias Expansion
3.13 Brace and Tilde Expansions
3.14 Variable Expansion
3.15 Command Expansion
3.16 Process Expansion
3.17 Filename Expansion
3.18 Bash Built-in Commands — Exercise E
3.19 Shell Variables
3.20 Environment of a Program
3.21 Command Execution Environment
3.22 Examples of Bash Usage
3.23 Customized Prompt
3.24 Removing Files Safely
3.25 Copy, Paste, and I/O Redirection
3.26 Displaying Manual Pages
3.27 Setting Up Your Personal Web Folder
3.28 Default File Permissions
3.29 Shell Startup and Initialization
3.30 Shell Special Characters and Quoting
3.31 Quoting in Bash
3.32 Simple Functions
For More Information
Summary
Exercises`),
  topic('topic-4', 'Topic 4 — Putting Commands and Applications to Use · Chapter 4', `
4.1 Useful GUI Apps
4.2 Word Processing
4.3 Document Formatting and Typesetting
4.4 Drawing and Diagramming
4.5 Raster Graphics and Image Processing
4.6 File Upload and Download
4.7 Password Manager
4.8 Cloud Storage
4.9 3D Modeling and 3D Printing
4.10 Mathematical Calculations`),
  topic('topic-5', 'Topic 5 — Commands and Filters · Chapter 5', `
5.1 Leading and Trailing Lines: head and tail
5.2 Character Translation: tr
5.3 Tab Expansion
5.4 Folding Text Lines
5.5 Calendar Reminders by Email
5.6 Sorting Text Lines
5.7 The grep Command
5.8 Regular Expressions
5.9 Quoting in Search Patterns
5.10 Patterns for grep
5.11 A Stream Editor: sed
5.12 Building Pipelines
5.13 Address Processing
For More Information
Summary
Exercises`),
  topic('topic-6', 'Topic 6 — Writing Bash Scripts · Chapter 6', `
6.1 Invoking Shell Scripts
6.2 A First Shell Script
6.3 Shell Script Execution
6.4 Positional Parameters
6.5 The for Command
6.6 The if Command
6.7 Test Expressions and Exit Status
6.8 Exit Status
6.9 Test Expressions
6.10 The shift Command
6.11 The case Command
6.12 The while and until Commands
6.13 Numerical Expressions
6.14 The break and continue Commands
6.15 File Queries
6.16 Variables
6.17 Arrays
6.18 Variable Modifiers
6.19 The Here Document
6.20 More on Functions
6.21 Function Arguments
6.22 Return Value of a Function
6.23 Redefining Bash Built-in Functions
6.24 Example Bash Scripts
6.25 Example: Removing Unwanted Files
6.26 Example: Conditional Copy
6.27 Example: Total File Sizes
6.28 Example: Secure File Transfer
6.29 Example: Resizing Pictures
6.30 Debugging Shell Scripts
6.31 Error and Interrupt Handling
6.32 Interrupt Handling
The Perl and PHP Alternatives
For More Information
Summary
Exercises`),
  topic('topic-7', 'Topic 7 — The File System · Chapter 7', `
7.1 A File Location Road Map
7.2 File Types
7.3 Ordinary Files
7.4 Directories
7.5 Special Files
7.6 Links
7.7 Symbolic Links
7.8 More on File Access Control
7.9 Meaning of Permissions for a Directory
7.10 File Status
7.11 File Mode
7.12 File Userid and Groupid
7.13 Access Control Enforcement
7.14 Setuid and Setgid Modes
7.15 Establishing a Group
7.16 DAC and MAC
7.17 File System Implementation
7.18 Filesystem Organization
7.19 Mounted Filesystems
7.20 Filesystem Super Block and Block Groups
7.21 The Filesystem Table
7.22 Creating Special Files
7.23 Network Filesystem
7.24 Searching the File Tree: find
7.25 The locate Command
7.26 Saving, Compressing, and Distributing Files
7.27 Packing Files with shar
7.28 File Sharing with Samba
7.29 More File-Related Commands
For More Information
Summary
Exercises`),
  topic('topic-8', 'Topic 8 — Networking, Internet, and the Web · Chapter 8', `
8.1 Networking Protocols
8.2 The Internet
8.3 Network Addresses
8.4 Packet Switching
8.5 Client and Server
8.6 The Domain Name System
8.7 Networking in Nautilus
8.8 Accessing Samba Shared Files
8.9 Networking Commands
8.10 SSH with X11 Forwarding
8.11 No Password ssh, sftp, and scp
8.12 Remote File Synchronization
8.13 Cryptography
8.14 Symmetric Cryptosystems
8.15 Public-Key Cryptography and Digital Signature
8.16 GNU Privacy Guard
8.17 Setting Up GnuPG Keys
8.18 Encryption/Decryption with GnuPG
8.19 Secure Email
8.20 Secure Email with Thunderbird
8.21 Message Digests
8.22 Software and Message Signing
8.23 The Web
8.24 Hypertext Markup Language
8.25 URLs
8.26 Accessing Information on the Web
8.27 Handling Different Content Types
8.28 Putting Information on the Web
8.29 What Is HTML?
8.30 Web Hosting
8.31 Domain Registration
8.32 Accessing Domain Registration Data
8.33 The DNS
8.34 DNS Servers
8.35 DNS Resolvers
8.36 Dynamic Generation of Web Pages
8.37 Dynamic Server Pages
8.38 HTTP Briefly
8.39 A Real HTTP Experience
For More Information
Summary
Exercises`),
  topic('topic-9', 'Topic 9 — Basic System Administration · Chapter 9', `
9.1 Managing Users
9.2 Sudo
9.3 Package Management
9.4 Software Management Tasks
9.5 Managing Processes
9.6 Network Configuration
9.7 Firewall Settings
9.8 Managing Filesystems and Disks
9.9 Disk Partitions
9.10 Managing Filesystems
9.11 Adding a New Disk
9.12 LVM
9.13 File Storage Quotas
9.14 File and System Backup
9.15 Backup with Déjà Dup
9.16 System Booting
9.17 SELinux
9.18 SELinux Status and Enforcing Modes
9.19 Security Contexts
9.20 Maintaining and Managing File Contexts
For More Information
Summary
Exercises`),
  topic('topic-10', 'Topic 10 — Web Hosting: Apache, MySQL, and PHP · Chapter 10', `
10.1 What Is a Web Server?
10.2 URL and URI
10.3 Request Processing
10.4 Response and Content Types
10.5 The Apache Web Server
10.6 Apache on Linux
10.7 Installing Apache with Package Management
10.8 Running the Apache Web Server
10.9 Controlling the Apache Server
10.10 Apache Run-Time Configuration
10.11 Apache Configuration File Basics
10.12 About Configuration Directives
10.13 Loading Modules
10.14 Global Directives
10.15 Container Directives
10.16 Access Control under Apache
10.17 What Is Access Control?
10.18 Access Control by Host
10.19 Requiring Passwords
10.20 Setting Up User Login under Apache
10.21 How HTTP Basic Authentication Works
10.22 How HTTP Digest Authentication Works
10.23 Basic vs. Digest Authentication
10.24 Password Encryption
10.25 Automatic File Deflation
10.26 HTTPS and SSL/TLS
10.27 HTTPS Support
10.28 Manual Installation of Apache
10.29 Configure and Compile
10.30 What Is PHP?
10.31 The PHP Module for Apache
10.32 Installing the PHP Module
10.33 Testing PHP
10.34 PHP Configuration
10.35 PHP Command Line Scripting
10.36 Database Support for the Web
10.37 MySQL
10.38 Initializing, Starting, and Stopping MySQL
10.39 MySQL Run-Time Configuration
10.40 Administering MySQL
10.41 Resetting the MySQL Root Password
10.42 Installing phpMyAdmin
10.43 Installing MySQL/MariaDB
For More Information
Summary
Exercises`),
  topic('topic-11', 'Topic 11 — C Programming in Linux · Chapter 11', `
11.1 Command-Line Arguments
11.2 Exit Status
11.3 Compile and Execute
11.4 Linux Command Argument Conventions
11.5 The GCC Compiler
11.6 The gcc Command
11.7 Options for gcc
11.8 The C Preprocessor
11.9 Preventing Multiple Loading of Header Files
11.10 Compilation
11.11 Assembly
11.12 Linking and Loading
11.13 The C Library
11.14 I/O to Files
11.15 File Updating
11.16 I/O Redirection
11.17 Creating Libraries and Archives
11.18 Error Handling in C Programs
11.19 Errors from System and Library Calls
11.20 Error Indications from Mathematical Functions
11.21 Error Recovery
Debugging with GDB
Interactive Debugging
Basic gdb Commands
A Sample Debugging Session with gdb
Examining Core Dumps
For More Information
Summary
Exercises`),
  topic('topic-12', 'Topic 12 — I/O and Process Control System Calls · Chapter 12', `
12.1 System-Level I/O
12.2 I/O Descriptors
12.3 Reading and Writing I/O Descriptors
12.4 Moving the Current Position
12.5 Operations on Files
12.6 Creating and Deleting a File
12.7 Linking and Renaming Files
12.8 Accessing File Status
12.9 Determining Allowable File Access
12.10 Operations on Directories
12.11 Creating and Removing a Directory
12.12 Directory Access
12.13 Current Working Directory
12.14 An Example: ccp
12.15 Shell-Level Commands from C Programs
12.16 Process Control
12.17 Virtual Address Space
12.18 Process Life Cycle
12.19 The Process Table
12.20 The ps Command
12.21 Process Creation: fork
12.22 Program Execution: exec Routines
12.23 Example: A Simple Shell
12.24 Synchronization of Parent and Child Processes
12.25 Process Termination
12.26 The User Environment of a Process
12.27 Example: Command Search
12.28 Interrupts and Signals
12.29 Basic Concepts
12.30 Sending Signals
12.31 Signal Delivery and Processing
12.32 Signal Trapping
For More Information
Summary
Exercises`),
  topic('topic-13', 'Topic 13 — Inter-Process and Network Communication · Chapter 13', `
13.1 Opening a Process for I/O
13.2 IPC with pipe
13.3 Pipe between Two Commands
13.4 Connecting a File Descriptor to a File Stream
13.5 Two-Way Pipe Connections
13.6 Network Communication
13.7 Client and Server
13.8 Sockets
13.9 Creating Sockets
13.10 Socket Address
13.11 Local and Internet Socket Addresses
13.12 A TCP Echo Client
13.13 Using Datagram Sockets
13.14 Socket I/O System Calls
13.15 Shutting Down Sockets
13.16 TCP-Based Servers
13.17 Accepting a Connection
13.18 An Example TCP/IP Server
13.19 Network Library Routines
13.20 Daemon Processes
13.21 Programming a Daemon
13.22 Input/Output Multiplexing
13.23 TCP Out-of-Band Data
For More Information
Summary
Exercises`)
];
