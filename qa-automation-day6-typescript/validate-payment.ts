// describe the exact shape a payment must have
interface Payment {
  // amount must be a number of paisa
  amountPaisa: number;
  // status must be one of these three words
  status: "SUCCESS" | "PENDING" | "FAILED";
}

// validate() checks a payment and returns a message
function validate(payment:Payment):string {
  // reject any amount that is zero or below
  if (payment.amountPaisa <= 0) {
    return "Amount must be positive";
  }
  // reject anything that is not a success
  if (payment.status !== "SUCCESS") {
    return "Not a successful payment";
  }
  // otherwise the payment is valid
  return `Valid: ${payment.amountPaisa} paisa`;
}

console.log(
  validate({
    amountPaisa: 50000,
    status: "SUCCESS",
  }),
);

// OUTPUT (after correcting "50000" and "SUCESS")-> Valid: 50000 paisa
