let balancePaisa = 500000; // Rs 5,000
const perTxnLimitPaisa = 2500000; // Rs 25,000

const batch = [
  { id: "TXN-01", gateway: "esewa", amountPaisa: 15000, verified: true },
  { id: "TXN-02", gateway: "khalti", amountPaisa: 0, verified: true },
  { id: "TXN-03", gateway: "esewa", amountPaisa: 2700000, verified: true },
  { id: "TXN-04", gateway: "connectips", amountPaisa: 120000, verified: false },
  { id: "TXN-05", gateway: "paypal", amountPaisa: 50000, verified: true },
  { id: "TXN-06", gateway: "esewa", amountPaisa: 600000, verified: true },
];

function feeFor(amountPaisa) {
  if (amountPaisa <= 10000) return 0;
  else if (amountPaisa <= 100000) return 500;
  return 1500;
}

function validate(txn) {
  const validGateway = ["esewa", "khalti", "connectips"];
  if (txn.amountPaisa <= 0) return "Invalid amount";
  if (txn.amountPaisa > perTxnLimitPaisa)
    return "Exceeds per-transaction limit";
  if (!txn.verified) return "KYC pending";
  if (!validGateway.includes(txn.gateway)) return "Unsupported gateway";
  if (txn.amountPaisa + feeFor(txn.amountPaisa) > balancePaisa)
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

let approvedCount = 0;
let rejectedCount = 0;
let totalValuePaisa = 0;
let output = ""; //for final output using single console.log()

for (const txn of batch) {
  const status = validate(txn);

  if (status !== "OK") {
    rejectedCount++;
    output += `${txn.id}\tREJECTED\t${status}\n`;
    continue;
  }

  approvedCount++;
  totalValuePaisa += txn.amountPaisa;

  const feePaisa = feeFor(txn.amountPaisa);
  const routingMsg = route(txn.gateway);

  // deduct balance after approval
  balancePaisa -= txn.amountPaisa + feePaisa;

  output += `${txn.id}\tOK\t${formatter.format(txn.amountPaisa / 100)}\tfee ${formatter.format(feePaisa / 100)}\t${routingMsg}\n`;
}

output += `\nApproved:${approvedCount}\tRejected:${rejectedCount}\tValue:${formatter.format(totalValuePaisa / 100)}`;

console.log(output);
