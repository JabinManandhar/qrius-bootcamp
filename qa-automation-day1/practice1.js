// let firstName = "Jabin";
// let sport = "football";
// console.log(`My name is ${firstName} and I play ${sport}`);

// let gender="male";
// gender="female";
// console.log(gender);

// Why JavaScript and TypeScript in QA
// Part 1:
/*  
 Playwright, Selenium or Cypress? Which one is better?
 All of them have specific use cases and advantages.
 Playwright: 
-supports multiple browsers; Chromium, Firefox, Safari, WebKit 
-open-source and growing community
-multiple stack: frontend, backend, mobile
-built-in auto-wait and auto-retry for flaky tests 
*/

/* 
A) Variables
used to store and retrieve a value
Case Sensitivity: Variables are case-sensitive in JavaScript. So, Apple and apple are not the same.
Naming conventions: PascalCase, camelCase, kebab-case, UPPER_CASE
camelCase: commonly used while naming variable, functions 
PascalCase: commonly used while naming classes, interface, components
kebab-case: commonly used while naming filenames (login-page.spec.ts)
*/

/* 
B) Operators
Arithmetic (*,**,/,%,+,-), Logical (&&, || and !), Comparison (>,>=, <.<=,==,===)

What's the difference between loose equality(==) and strict equality(===)?
== :only checks and compares the value. for instance, 10 == "10" returns true. 
=== :compares both the value and data type. for instance, 10 === "10" returns false. although, both have the same value, one is a string and another is a number. so, === returns false.
*/

/* 
C) How to debug in VSCode?
For debugging purposes, we can use the breakpoint feature and then execute only the specific piece of code to track the origin of error. */

// console.log(0.1 + 0.2 == 0.3);
// console.log(0.1 + 0.2 === 0.3);

// Part 2: Environment Setup and JavaScript Basics
/* 
✅Install node.js, npm
✅Install necessary extensions: ESLint, Playwright Test for VSCode, Prettier, Code Spell Checker
✅Turn on Autosave
*/

/*
String Concatenation: Using the "+" operator and template literals
"+" operator: console.log("hello"+ " " + "world"); Output: "hello world"
 */
