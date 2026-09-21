// Rules: Do NOT use built-in shortcuts that skip the concept being tested (e.g. don't use Array.reverse() when the task is to reverse manually). Write a function for each problem and call it with the sample inputs.
// ===========================================================================================================

// Part 1 Programming Logic & Control Flow
// Covers: if/else, switch, for / while / for…of loops, functions (declarations & arrow), parameters, return values, scope, arrays, and objects.
// ===========================================================================================================

// Q1. FizzBuzz
// Task: Write a function fizzBuzz(n) that prints numbers 1 to n. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz".
// Example:
// fizzBuzz(5)
// // 1
// // 2
// // Fizz
// // 4
// // Buzz

function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

fizzBuzz(5);

// ===========================================================================================================

// Q2. Grade Classifier
// Task: Write getGrade(score) that returns a letter grade: 90+ = 'A', 80-89 = 'B', 70-79 = 'C', 60-69 = 'D', below 60 = 'F'.
// Example:
// getGrade(95)  // 'A'
// getGrade(72)  // 'C'
// getGrade(40)  // 'F'

function getGrade(score) {
  switch (true) {
    case score > 90:
      console.log("A");
      break;
    case score > 79:
      console.log("B");
      break;
    case score > 69:
      console.log("C");
      break;
    case score > 59:
      console.log("D");
      break;
    default:
      console.log("F");
      break;
  }
}

getGrade(95); // 'A'
getGrade(72); // 'C'
getGrade(40); // 'F'

// ===========================================================================================================

// Q3. Day Type (switch)
// Task: Write dayType(day) that takes a day name string and returns 'Weekend' for Saturday/Sunday and 'Weekday' for the rest. Use a switch statement.
// Example:
// dayType('Sunday')   // 'Weekend'
// dayType('Tuesday')  // 'Weekday'

function dayType(day) {
  switch (day) {
    case "Sunday":
    case "Saturday":
      console.log("Weekend");
      break;

    default:
      console.log("Weekday");
  }
}

dayType("Sunday"); // 'Weekend'
dayType("Tuesday"); // 'Weekday'

// ===========================================================================================================

// Q4. Sum of Even Numbers
// Task: Write sumEven(n) that returns the sum of all even numbers from 1 to n (inclusive).
// Example:
// sumEven(10)  // 30   (2+4+6+8+10)
// Hint: Loop from 1 to n, keep a running total, and only add the number when i % 2 === 0.

function sumEven(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      sum += i;
    }
  }
  return sum;
}

console.log(sumEven(10)); //30

// Alternative solution: We only want even numbers. So, we could start with 0 and increment with 2 each time so that it only gives even number
// function sumEvenAlternative(n) {
//   let sum = 0;
//   for (let i = 0; i <= n; i = i + 2) {
//     sum += i;
//   }
//   console.log(`Sum of all the even numbers= ${sum}`);
// }

// sumEvenAlternative(5);

// ===========================================================================================================

// Q5. Factorial
// Task: Write factorial(n) that returns n! (n × (n-1) × … × 1). factorial(0) should return 1.
// Example:
// factorial(5)  // 120
// factorial(0)  // 1
// Hint: Start a result variable at 1 and multiply it by each number from 2 up to n using a loop.
// Q5:Using normal loop
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result = result * i;
  }
  return `The factorial of ${5}= ${result}`;
}
console.log(factorial(5)); // 120

// Q5: Using recursion
// function factorialUsingRecursion(n) {
//   if (n === 0 || n === 1) return 1;
//   return n * factorialUsingRecursion(n - 1);
// }

// console.log(factorialUsingRecursion(5));

// ===========================================================================================================

// Q6. Count Vowels
// Task: Write countVowels(str) that returns how many vowels (a, e, i, o, u) are in the string. Case-insensitive.
// Example:
// countVowels('JavaScript')  // 3

function countVowels(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  const stringArray = str.toLowerCase().split(""); 
  const vowelsArray = [];

  for (const letter of stringArray) {
    if (vowels.includes(letter)) {
      vowelsArray.push(letter);
    }
  }
  return `The number of vowels in the given string "${str}" is:${vowelsArray.length}`;
}
console.log(countVowels("JavaScript")); // 3

// ===========================================================================================================

// Q7. Reverse a Number
// Task: Write reverseNumber(n) that returns the digits of n reversed, as a number. Do not convert to a string.
// Example:
// reverseNumber(1234)  // 4321
// Hint: Use a while loop. Get the last digit with n % 10, build the reversed number, then remove the last digit with Math.floor(n / 10).

function reverseNumber(n) {
  let reverseNumber = 0;
  while (n > 0) {
    const remainder = n % 10;
    reverseNumber = reverseNumber * 10 + remainder;
    n = Math.floor(n / 10);
  }
  return reverseNumber;
}

console.log(reverseNumber(1234)); //4321

// ===========================================================================================================

// Q8. Find the Maximum
// Task: Write findMax(arr) that returns the largest number in the array. Do not use Math.max.
// Example:
// findMax([3, 9, 1, 7])  // 9

function findMax(arr) {
  // let max = -Number.MIN_VALUE; //minimum value possible in js
  let max = -999999999;
  for (item of arr)
    if (item > max) {
      max = item;
    }
  return max;
}
console.log(findMax([3, 9, 1, 7])); // 9
console.log(findMax([3, 3, 3, 3])); //3

// ===========================================================================================================

// Q9. Is Prime
// Task: Write isPrime(n) that returns true if n is a prime number, otherwise false.
// Example:
// isPrime(7)   // true
// isPrime(10)  // false
// isPrime(1)   // false

// Prime Number: has exactly two factors; can only be divisible by itself (and not any other number) and 1
// To find prime, we can also use the square root method. if n not divisible by any number below the  its square root value, then it's a prime number. Otherwise, not prime.

function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i < Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrime(7)); // true
console.log(isPrime(10)); //false
console.log(isPrime(1)); //false

// ===========================================================================================================

// Q10. Temperature Converter (arrow function)
// Task: Write an arrow function cToF that converts Celsius to Fahrenheit using the formula (C × 9/5) + 32. Return the result.
// Example:
// cToF(0)    // 32
// cToF(100)  // 212

const cToF = (c) => (c * 9) / 5 + 32;

console.log(cToF(0)); //32
console.log(cToF(100)); //212

// ===========================================================================================================

// Q11. Counter with Scope
// Task: Write a function makeCounter() that returns another function. Each time the returned function is called, it returns the next number starting from 1.
// Example:
// const next = makeCounter();
// next()  // 1
// next()  // 2
// next()  // 3
// Hint: Declare a count variable inside makeCounter. The inner function 'remembers' it (this is closure / scope). Increment and return it.

function makeCounter() {
  let counter = 0;

  return function () {
    counter++;
    return console.log(counter);
  };
}
const next = makeCounter();
next(); //1
next(); //2
next(); //3
next(); //4

// ===========================================================================================================

// Q12. Word Frequency Object
// Task: Write wordCount(sentence) that returns an object mapping each word to how many times it appears.
// Example:
// wordCount('a b a c b a')
// // { a: 3, b: 2, c: 1 }

function wordCount(sentence) {
  const wordsArray = sentence.split(" "); //use a single space to separate words in a sentence. if used multiple spaces between words, filter out the empty string first
  const wordCountObject = {};

  for (const word of wordsArray) {
    wordCountObject[word] = (wordCountObject[word] || 0) + 1;
  }
  return wordCountObject;
}

console.log(wordCount("a b a c b a"));

// Hint: Split the sentence into an array, loop with for…of, and for each word do obj[word] = (obj[word] || 0) + 1.
// ===========================================================================================================
