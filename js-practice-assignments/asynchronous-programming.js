// // Q25. Predict the Output (Event Loop)
// // Task: Without running it, write down the exact order the following logs appear, then run it to confirm. Explain WHY in one sentence.
// // Example:
// // console.log('A');
// // setTimeout(() => console.log('B'), 0);
// // Promise.resolve().then(() => console.log('C'));
// // console.log('D');

// Order: A, D, C, B
// Explanation: The event loop decides the order of the execution in which priority order is: Synchronous code (console.log('A') and console('D') in this case)> Promise (microtask)> Web APIs and timers(macrotasks).

// // ================================================================

// // Q26. Delay Function (Promise)
// // Task: Write delay(ms) that returns a Promise which resolves after ms milliseconds. Then use it to log 'Hi' after 1 second.
// // Example:
// // delay(1000).then(() => console.log('Hi'));

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

delay(10000).then(() => console.log("Hi")); //Output: waits 1 second, then prints Hi

// // ================================================================
// // Q27. Rewrite with async/await
// // Task: Using your delay(ms) from Q26, write an async function run() that logs 'Start', waits 1 second, then logs 'End'.
// // Example:
// // run()
// // Start
// // (1s later) End

async function run() {
  console.log("Start");
  await delay(1000);
  console.log("End");
}

run(); //Output: prints "Start", waits for 1s and then prints "End"

// // ================================================================
// // Q28. Simulated Fetch
// // Task: Write fetchUser(id) that returns a Promise resolving to { id, name: 'User' + id } after a 500ms delay. Consume it with async/await inside a getUser() function that logs the result.
// // Example:
// // getUser()  // (after 500ms) { id: 1, name: 'User1' }

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "User" + id }); //same name for id (object property and parameter variable name), so no need to write id:id
    }, 500);
  });
}

async function getUser() {
  const user = await fetchUser(1);
  console.log(user);
}

getUser(); //Output: waits for 5ms and return the object {id:1,name:'User1'}

// // ================================================================
// // Q29. Run in Parallel (Promise.all)
// // Task: You have three fetchUser calls. Write loadAll() that runs them at the same time and returns an array of all three results. Measure that it takes ~500ms total, not 1500ms.
// // Example:
// // loadAll()  // [user1, user2, user3]

async function loadAll() {
  const users = await Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)]);
  console.log(users);
}

loadAll(); //Output: return an array of objects with id and name for all 3 users
// [
//   { id: 1, name: 'User1' },
//   { id: 2, name: 'User2' },
//   { id: 3, name: 'User3' }
// ]

// // Note: Until now, we only have handled Promises in case of "resolved".

// // ================================================================
// // Q30. Handle a Rejection
// // Task: Write riskyFetch() that returns a Promise which rejects with an Error('Network failed'). Then write a safe() async function that awaits it inside try/catch and logs the error message instead of crashing.
// // Example:
// // safe()  // logs: 'Caught: Network failed'

function riskyFetch() {
  return new Promise((resolve, reject) => reject(new Error("Network failed")));
}

async function safe() {
  try {
    const result = await riskyFetch();
    console.log(result);
  } catch (e) {
    console.log("Caught: " + e.message);
  }
}

safe(); //handles rejected Promise state with error message using try/catch block
// Output: Caught: Network failed

// // ================================================================
// // Q31. Timeout Wrapper
// // Task: Write withTimeout(promise, ms) that returns whichever settles first: the given promise, or a rejection with 'Timed out' after ms.
// // Example:
// // withTimeout(delay(3000), 1000)  // rejects: 'Timed out'

function timeoutPromise(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Timed out");
    }, ms);
  });
}

function withTimeout(promise, ms) {
  return Promise.race([promise, timeoutPromise(ms)]);
}

withTimeout(delay(3000), 1000).catch((result) => console.log(result)); //Output:Timed out
// // In this case, we already know the promise will be rejected so "then" not used  here. But, otherwise use .then to handle the resolve state.

// // ================================================================
// // Q32. Retry with Recovery
// // Task: Write retry(fn, times) that calls the async function fn. If it rejects, try again — up to 'times' total attempts. If all attempts fail, re-throw the last error.
// // Example:
// // retry(flakyFetch, 3)  // resolves if any of 3 tries succeeds

async function retry(fn, times) {
  let error;
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (err) {
      error = err;
      console.log(`Attempt ${i + 1} failed ${err.message}`);
    }
  }
  throw error;
}

let counter = 0;
async function flakyFetch() {
  counter++;
  if (counter < 3) {
    throw new Error("Network issue");
  }
  return `Successful on attempt number: ${counter} `;
}

retry(flakyFetch, 3)
  .then((result) => console.log("Result:", result))
  .catch((error) => console.log(`Error: ${error.message}`));

// Output:
/*  Attempt 1 failed Network issue
Attempt 2 failed Network issue
Result: Successful on attempt number: 3 
 */

// // Hint: Loop 'times' times inside an async function. Use try/catch around await fn(); on success return the result, on failure save the error and continue. After the loop, throw the saved error.
