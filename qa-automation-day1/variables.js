// three ways to declare a variable in js

var a = 1;
// var: global variable, not recommended and not used anymore;
// reasons: can be redeclared without warning; so, while there is var a=6, js still allows var a=7 without warning when using var;
// variables can globally accessed, which can leak outside

let b,
  c = 2;
// With "let", can simply declare a value, with option whether to initialize or not
// Can update the value, but can't redeclare or reassign; ✅let b=1; b=3; ❌let b=1; let b; or let b=2;

const d = 3;
// With "const", must declare and initialize a variable; i.e ❌const a; ✅const a=4;

/*
let and const (differences and use cases)

let: allows block-scoped variable (accessible inside only within a block of code and indentation)
const: allows block-scoped variable

USE CASES: let and const
let: use when you know values could change and need to be reassigned; e.g. for(let i=0;i<n;i++)
const: use for variables that won't change or be reassigned, e.g. const = 18;
*/


