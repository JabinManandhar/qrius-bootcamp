/* STRETCH TODOS
1) Add a remarks field to some transactions and print "(no remark)" when it is missing. Careful: an empty string is falsy
2) Deduct each approved amount from a running let balance, so later transactions in the batch can fail once earlier ones have drained it
3) Nest a customer: { name, kyc: { level } } object and reject anyone below KYC level 2
4) Collect the rejected transaction IDs into an array and print it at the end with join(", ")
5) Use filter to count approvals instead of a counter variable, then decide which version you would rather debug at 2am
 */

let balancePaisa = 500000; // Rs 5,000
const perTxnLimitPaisa = 2500000; //Rs25000 LIMIT

// NOTE:TXN-02 doesn't have a remark
const batch = [
  {
    id: "TXN-01",
    gateway: "esewa",
    amountPaisa: 15000,
    customer: { name: "Aarav", kyc: { level: 2 } },
    remark: "Salary",
  },
  {
    id: "TXN-02",
    gateway: "khalti",
    amountPaisa: 10000,
    customer: { name: "Sita", kyc: { level: 2 } },
    remark: "",
  },
  {
    id: "TXN-03",
    gateway: "esewa",
    amountPaisa: 2700000,
    customer: { name: "Hari", kyc: { level: 3 } },
  },
  {
    id: "TXN-04",
    gateway: "connectips",
    amountPaisa: 120000,
    customer: { name: "Gita", kyc: { level: 1 } },
    remark: "Rent",
  },
  {
    id: "TXN-05",
    gateway: "paypal",
    amountPaisa: 50000,
    customer: { name: "Ram", kyc: { level: 2 } },
    remark: "Utilities",
  },
  {
    id: "TXN-06",
    gateway: "esewa",
    amountPaisa: 600000,
    customer: { name: "Maya", kyc: { level: 2 } },
  },
];

function feeFor(amountPaisa) {
  if (amountPaisa <= 10000) return 0; //no fee for transaction for upto Rs. 100
  if (amountPaisa <= 100000) return 500; //fee of Rs 5 for transactions above Rs 100 and upto Rs. 1000
  return 1500; ////fee of Rs 15 for valid transactions above Rs 10000
}

const validTransactions = ["esewa", "khalti", "connectips"];
function validate(txn, currentBalance) {
  if (txn.amountPaisa <= 0) return "Invalid amount";
  if (txn.amountPaisa > perTxnLimitPaisa)
    return "Exceeds per-transaction limit";

  // TODO 3: Nest a customer: { name, kyc: { level } } object and reject anyone below KYC level 2
  // Used optional chaining here
  if (!txn.customer?.kyc?.level || txn.customer.kyc.level < 2)
    return "KYC level insufficient";
  if (!validTransactions.includes(txn.gateway)) return "Unsupported gateway";
  if (txn.amountPaisa + feeFor(txn.amountPaisa) > currentBalance)
    return "Insufficient balance";
  return "OK";
}

function route(gateway) {
  switch (gateway) {
    case "esewa":
      return "Redirect to eSewa";
    case "khalti":
      return "Redirect to Khalti";
    case "connectips":
      return "Redirect to connectIPS";
    default:
      return "Unknown Gateway";
  }
}

// NPR currency formatter
const formatter = new Intl.NumberFormat("en-NP", {
  style: "currency",
  currency: "NPR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const rejectedIds = [];
let output = ""; //for final output in single console.log()

// Process transactions and update running state
const processedBatch = batch.map((txn) => {
  //TODO 1: Add a remarks field to some transactions and print "(no remark)" when it is missing.
  const remarkText = (txn.remark ?? "") !== "" ? txn.remark : "(no remark)";

  const status = validate(txn, balancePaisa);
  if (status !== "OK") {
    rejectedIds.push(txn.id);
    console.log(`${txn.id}\tREJECTED\t${status}`); //Q. do we need remarks for the REJECTED transactions; ${remarkText}
    return { ...txn, status };
  }

  const feePaisa = feeFor(txn.amountPaisa);
  const totalDeduction = txn.amountPaisa + feePaisa;

  // TODO 2: Deduct each approved amount from a running let balance, so later transactions in the batch can fail once earlier ones have drained it
  // Deduct total amount (amount + fee) from running balance
  balancePaisa -= totalDeduction;

  const routingMsg = route(txn.gateway);
  console.log(
    `${txn.id}\tOK\t${txn.amountPaisa}\tfee:Rs${feePaisa}\t${routingMsg}\t[${remarkText}]`,
  );

  return { ...txn, status };
});

// TODO 5: Using filter method to calculate total number of approved and reject transactions

const approvedCount = processedBatch.filter(
  (txn) => txn.status === "OK",
).length;

const rejectedCount = processedBatch.filter(
  (txn) => txn.status !== "OK",
).length;

output += `\nApproved:${approvedCount}\tRejected:${rejectedCount}\tValue:${formatter.format(
  processedBatch
    .filter((txn) => txn.status === "OK")
    .reduce((sum, t) => sum + t.amountPaisa, 0) / 100,
)}\n`;

// TODO 4: Collect the rejected transaction IDs into an array and print it at the end with join(", ")
output += `Rejected Txn IDs: ${rejectedIds.join(", ")}`;

console.log(output);

// NOTE: Some advanced concepts used here;  map, reduce, spread operator