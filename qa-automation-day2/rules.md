| Check           | Reject when                     | Message                       |
| --------------- | ------------------------------- | ----------------------------- |
| Amount positive | amountPaisa <= 0                | Invalid amount                |
| KYC             | verified is false               | KYC pending                   |
| Per-txn limit   | above Rs 25,000                 | Exceeds per-transaction limit |
| Balance         | amount above balance            | Insufficient balance          |
| Gateway         | not esewa, khalti or connectips | Unsupported gateway           |
