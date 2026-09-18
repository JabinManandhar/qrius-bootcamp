const transactions = [
  { id: 1, symbol: "NABIL", type: "BUY", qty: 10, price: 512 },
  { id: 2, symbol: "ADBL", type: "SELL", qty: 5, price: 240 },
  { id: 3, symbol: "NABIL", type: "BUY", qty: 8, price: 505 },
  { id: 4, symbol: "HDL", type: "SELL", qty: 12, price: 630 },
  { id: 5, symbol: "ADBL", type: "BUY", qty: 20 /* price missing! */ },
];

/* 
target · what your finished program should print
1) BUY count: 3
2) First NABIL trade id: 1
3) Total value of all trades: Rs 17920
4) #5 ADBL: Rs N/A        // ?. and ?? handled the missing price
5) #5 INVALID -> Transaction 5: price is missing
Bonus) Total spent on BUY trades: Rs 9160
*/

// 1) BUY count: 3
const buyTransactionCount = transactions.filter(
  ({ type }) => type === "BUY",
).length;
// console.log(`BUY count: ${buyTransactionCount}`);

// 2) First NABIL trade id: 1
const firstNabilTradeId = transactions.find(
  ({ symbol }) => symbol === "NABIL",
).id;
// console.log(`First NABIL trade id:${firstNabilTradeId}`);

// 3) Total value of all trades: Rs 17920
const totalTradeValue = transactions
  .filter((t) => t.price != null) //here != is enough because it checks for both null and undefined, unlike === which strictly checks the exact thing mentioned
  .reduce((accumulator, { qty, price }) => accumulator + qty * price, 0);
// console.log(`Total value of all trades: Rs ${totalTradeValue}`);

// 4) #5 ADBL: Rs N/A
// const missingPrice = transactions.find(
//   (transaction) => transaction.price == null,
// ); //this only find the first txn with missing price
// console.log(`#${missingPrice?.id ?? "Not found"}:Rs N/A`);
  // 4)#${missingPrice?.id ?? "Not found"}:Rs N/A

const missingPrice = transactions
  .filter((txn) => txn?.price == null)
  .map((txn) => {
    const priceDisplay = txn?.price ?? "N/A"; //safely handle missing price
    return `#${txn.id} ${txn.symbol}:Rs ${priceDisplay}`;
  });


// 5) #5 INVALID -> Transaction 5: price is missing
const allProps = ["id", "symbol", "type", "qty", "price"];

const invalidTransactions = transactions
  .map((txn) => {
    const missing = allProps.filter((prop) => !Object.hasOwn(txn, prop));
    if (missing.length > 0) {
      return `#${txn.id} INVALID -> Transaction ${txn.id}: ${missing.join(", ")} is missing`;
    }
    return null; // valid transactions return null for now so that we can filter it and remove later
  })
  .filter((item) => item !== null); // remove nulls

// Bonus) Total spent on BUY trades: Rs 9160
const totalBuyTradeAmount = transactions
  .filter((transaction) => transaction.price != null)
  .filter((transaction) => transaction.type === "BUY")
  .reduce((accumulator, currentValue) => {
    return accumulator + currentValue.qty * currentValue.price;
  }, 0);
// console.log(`Total spent on BUY trades: ${totalBuyTradeAmount}`);


console.log(`
  1)BUY count: ${buyTransactionCount}
  2)First NABIL trade id: ${firstNabilTradeId}
  3)Total value of all trades: Rs ${totalTradeValue}
  4)${missingPrice}
  5)${invalidTransactions}
  Bonus)Total spent on BUY trades: ${totalBuyTradeAmount}`);

// Concepts covered: map, filter, reduce, find, template literals, destructuring, ?. (Optional Chaining)  and ?? (Nullish Coalescing)
// Optional concepts: Object.hasOwn()
//Reminder: Use custom error handling for invalid transactions
