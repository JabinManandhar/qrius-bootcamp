// Create a Payment interface with id, amount, and status. Then create a generic Response<T> interface that has success and data. Create one response containing a Payment object and another response containing a string message. Use <Payment> and <string> to tell TypeScript what type of data each response contains, then print the payment amount and the message.

interface Payment {
  id: string;
  amount: number;
  status: "Success" | "Pending" | "Reject";
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Valid payment
const validPaymentResponse: ApiResponse<Payment> = {
  success: true,
  data: { id: "p101", amount: 10000, status: "Success" },
  message: "Transaction successful",
};

// Invalid payment
const invalidPaymentResponse: ApiResponse<Payment> = {
  success: false,
  data: { id: "p102", amount: 1000, status: "Reject" },
  message: "Transaction failed",
};

console.log(
  `Valid Payment: ${validPaymentResponse.message}, id:${validPaymentResponse.data.id}, amount: ${invalidPaymentResponse.data.amount}`,
);
console.log(
  `Invalid Payment: ${invalidPaymentResponse.message}, id:${invalidPaymentResponse.data.id}`,
);
