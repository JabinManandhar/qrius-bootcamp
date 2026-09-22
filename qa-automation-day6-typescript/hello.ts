// console.log("hello world");

// interface Box<T> {
//   value: T;
// }

// const stringBox: Box<string> = { value: "hello" };
// const numberBox: Box<number> = { value: 15000 };

interface Payment {
  id: string;
  amount: number;
  method: "eSewa" | "Khalti";
  status: "SUCCESS" | "FAILED";


//   Here, | is union. Sort of like the logical OR operator
}

function validPayment(p: Payment) {
  console.log(`
    ID:${payment.id}:
    Amount:${payment.amount}
    Payment method:${payment.method}
    Payment status:${payment?.status}
    `);
}

let payment: Payment = {
  id: "P101",
  amount: 100000,
  method: "eSewa",
    status: "SUCCESS",
};

validPayment(payment);

// Here, we are simply using an interface here to print a valid payment. If we use any value that's not according to the interface, then TypeScript throws an error before even running the file. 

// For instance, we use any other method like "connectIPS", TypeScript will throw an error like Type connectIPS is not assignable to type '"eSewa"|"Khalti"'.

