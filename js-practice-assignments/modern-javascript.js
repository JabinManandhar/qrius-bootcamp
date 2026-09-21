// Part 2  Modern JavaScript (ES6+)
// Covers: destructuring, spread/rest, template literals, optional chaining, map / filter / reduce / find, and error handling with try/catch/finally & custom error classes.

// =============================================================================================
// Q13. Swap with Destructuring
// Task: Write swap(a, b) that returns [b, a] using array destructuring — without a temporary variable.
// Example:
// swap(1, 2)  // [2, 1]
// Hint: You can destructure in one line: [a, b] = [b, a]. Then return them.

function swap(...[a, b]) {
  return [b, a];
}

console.log(swap(1, 5)); //[5,1]

// =============================================================================================
// Q14. Extract from Object
// Task: Given a user object, write a function that uses object destructuring to pull out name and email and return a template-literal string.
// Example:
// const u = { name: 'Sara', email: 's@x.com', age: 30 };
// describe(u)  // 'Sara can be reached at s@x.com'

const user = { name: "Sarah", email: "sarah123@gmail.com", age: 30 };

function describe({ name, email }) {
  return console.log(`${name} can be reached at ${email}`);
}

describe(user); //Sarah can be reached at sarah123@gmail.com

// =============================================================================================

// Q15. Merge with Spread
// Task: Write merge(obj1, obj2) that returns a new object combining both, where obj2's values win on conflicts. Do not mutate the inputs.
// Example:
// merge({a:1, b:2}, {b:9, c:3})
// // { a:1, b:9, c:3 }

function merge(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

console.log(merge({ a: 1, b: 2 }, { b: 9, c: 3 }));

// =============================================================================================
// Q16. Sum All (rest parameters)
// Task: Write sumAll(...nums) that accepts any number of arguments and returns their sum.
// Example:
// sumAll(1, 2, 3)      // 6
// sumAll(5, 5, 5, 5)   // 20

function sumAll(...nums) {
  return nums.reduce((acc, currentValue) => acc + currentValue, 0);
}

console.log(sumAll(1, 2, 3)); // 6

// =============================================================================================
// Q17. Safe Nested Access (optional chaining)
// Task: Write getCity(user) that returns the user's city from user.address.city, or 'Unknown' if any part is missing.
// Example:
// getCity({ address: { city: 'Delhi' } })  // 'Delhi'
// getCity({})                              // 'Unknown'

function getCity(user) {
  const result = user?.address?.city ?? "Unknown";
  return result;
}

console.log(getCity({ address: { city: "Delhi" } })); //Delhi
console.log(getCity({})); // 'Unknown');

// =============================================================================================
// Q18. Double the Array (map)
// Task: Write doubleAll(arr) that returns a NEW array with every number doubled. Use .map().
// Example:
// doubleAll([1, 2, 3])  // [2, 4, 6]

function doubleAll(arr) {
  return arr.map((item) => item * 2);
}

console.log(doubleAll([1, 2, 3]));

// =============================================================================================
// Q19. Filter Adults (filter)
// Task: Given an array of people objects, write getAdults(people) returning only those with age >= 18. Use .filter().
// Example:
// getAdults([{name:'A',age:15},{name:'B',age:22}])
// // [{name:'B', age:22}]

function getAdults(people) {
  return people.filter((person) => person.age >= 18);
}

console.log(
  getAdults([
    { name: "A", age: 15 },
    { name: "B", age: 22 },
  ]),
);

// =============================================================================================
// Q20. Total Price (reduce)
// Task: Given an array of items each with a price, write totalPrice(items) returning the sum of all prices. Use .reduce().
// Example:

function totalPrice(items) {
  return items.reduce((acc, currentValue) => acc + currentValue.price, 0);
}

console.log(totalPrice([{ price: 10 }, { price: 5 }, { price: 20 }]));

// =============================================================================================
// Q21. Find a User (find)
// Task: Write findById(users, id) that returns the first user object whose id matches, or undefined. Use .find().
// Example:
// findById([{id:1},{id:2}], 2)  // {id:2}

function findById(users, id) {
  const validUser = users.find((user) => user.id === id);
  return validUser;
}

console.log(findById([{ id: 1 }, { id: 2 }], 2));

// =============================================================================================
// Q22. Chained Pipeline (map + filter + reduce)
// Task: Given an array of numbers, return the sum of the squares of only the even numbers.
// Example:

// sumEvenSquares([1, 2, 3, 4])  // 20   (2² + 4²)

function sumEvenSquares(arr) {
  return arr
    .filter((item) => item % 2 === 0)
    .reduce((acc, currentValue) => acc + currentValue * currentValue, 0);
}

console.log(sumEvenSquares([1, 2, 3, 4])); //20

// =============================================================================================
// Q23. Safe JSON Parse (try/catch/finally)
// Task: Write safeParse(str) that returns the parsed object, or null if the string is invalid JSON. Log 'done' in a finally block either way.
// Example:
// safeParse('{"a":1}')  // { a: 1 }
// safeParse('not json')  // null
// Hint: Wrap JSON.parse in try. On error, return null in catch. The finally block runs regardless of success or failure.

function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  } finally {
    console.log("DONE");
  }
}

console.log(safeParse('{"a":1}')); // { a: 1 }
console.log(safeParse("not json")); // null

// =============================================================================================
// Q24. Custom Error Class
// Task: Create a class ValidationError that extends Error. Write validateAge(age) that throws a ValidationError with message 'Age must be positive' when age < 0, otherwise returns age.
// Example:
// validateAge(25)   // 25
// validateAge(-3)   // throws ValidationError

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateAge(age) {
  if (age < 0) {
    throw new ValidationError("Age must be positive");
  }
  return age;
}

try {
  console.log(validateAge(25)); // 25
  console.log(validateAge(-3)); // ValidationError: Age must be positive
} catch (error) {
  console.log(error.message); // Age must be positive
}
