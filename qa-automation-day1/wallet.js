/* Wallet transfer snapshot
Create wallet.js in your qa-automation-day1 folder. 
Model one transfer from a digital wallet, using only what we covered today.

A const for the merchant name and a let for the balance in paisa
A boolean for KYC verification
A transfer amount, a 2% cashback calculated with an operator, and the balance after the transfer
A canSend expression combining balance, KYC status and a positive amount
One multi-line template literal that prints the whole receipt
Every value must be printed by the template literal, not by five separate console.log calls. */

/* 
Sample Output: (for valid transactions)
Merchant : Qrius Store
KYC      : verified
Sent     : Rs 1500.00
Cashback : Rs 30.00
Balance  : Rs 1000.00
Approved : true
*/

const merchantName = "Qrius Store";

// Positive Case Scenario (for valid amount transfer):
// 1. KYC Verified
// 2. valid balance and amount (balance>0, amountPaisa>0 and balancePaisa>amountPaisa)
let balancePaisa = 250000; //in paisa; Rs. 2500.00
let isKycVerified = true;

// Negative Case Scenario (for invalid amount transfer):
// 1. KYC NOT Verified,
// 2. invalid balance (balance=0 or balancePaisa<amountPaisa)
// Uncomment and use the two lines below instead to test invalid wallet transfer
// let isKycVerified: boolean = false;
// const amountPaisa: number = 15000000; //Rs 1,50,000.00

const amountPaisa = 150000; //Rs 1,500.00
const cashbackPaisa = (amountPaisa * 2) / 100; //2% cashback

// TODO: canSend, balance covers it, KYC done, amount above zero
let canSend =
  isKycVerified &&
  balancePaisa > 0 &&
  amountPaisa > 0 &&
  balancePaisa > amountPaisa;

// TODO: update balancePaisa after the transfer
if (canSend) {
  balancePaisa = balancePaisa - amountPaisa + cashbackPaisa;
}

const formatter = new Intl.NumberFormat("en-NP", {
  style: "currency",
  currency: "NPR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const notApproved =
  !canSend ||
  (isKycVerified && "Please verify your KYC") ||
  (balancePaisa === 0 && "balance cannot be zero") ||
  (amountPaisa === 0 && "transfer amount cannot be zero") ||
  balancePaisa < amountPaisa ||
  "transfer amount cannot be zero";

// TODO: print the receipt with one template literal
console.log(`
  Merchant:${merchantName}
  KYC:${(isKycVerified && "Verified") || "Not Verified"}
  Sent:${(canSend && formatter.format(amountPaisa / 100)) || "Not transferred"}
  Cashback:${(canSend && formatter.format(cashbackPaisa / 100)) || "no cashback"}
  Balance:${formatter.format(balancePaisa / 100)}
  Approved:${canSend}`);

// Reminder: Add specific reason for failed transactions in later versions using error handling
