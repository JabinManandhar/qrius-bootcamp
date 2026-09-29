[Instructions]:
Prove every one with document.querySelectorAll('...').length. Each must return the count printed beside it.
Mark each selector stable or brittle and write one sentence naming the change that would break it. Marked as "Stable" and "Brittle" for each one.

TASK 1: Draw the tree for the send money form only. Parent, children, siblings. Five lines is enough. Do it on paper, not by copying slide 10.

[Tree structure for the send money form.]:
└─ form#send-form
├─ input
├─ input
└─ button.btn.btn-primary.px-4

[Parent]: form "#send-form"
[Children]: input (Recipient number), input (Amount) and button (Send)
[Siblings]: input "Recipient number"

<!-- =================================================================================================================== -->
TASK #2: Write one CSS selector for each of the six targets in the next tab. None of them is copied word for word off a slide.
TARGET #1:The mPIN input, scoped to the login form
[Stable] //Why it's stable? :since the input has an id here which is unique. it's a stable selector. But, could break if we used a CSS class instead as classes often change.
document.querySelectorAll("#mpin").length; // Output: 1
Explanation: here, we can simply use an id (denoted by #), which is unique; #mpin.

<!-- ======================================================= -->
TARGET #2: The amount field in the send money form
[Stable] //could break if another sibling input field was added with same attribute (name) and value (amount).
document.querySelectorAll("#send-form input[name='amount']").length // Output: 1
Explanation: To select the amount field in the send money form, we can explicitly select the send form first (#send-form). Then, we can use the descendant selector (space). We used descendant (space) over direct children (>) since it's common to wrap the input fields inside a div. Anyway, using the direct children would also give the same result in this case.

<!-- ======================================================= -->
TARGET #3: The Send button, which has no id and no test id
[Brittle] //could break if we just have the btn class and no other class for the Send button. Also, it could break if we name the button as "Submit".
document.querySelector('#send-form .btn.btn-primary').length
Explanation: The Send button doesn't have a unique id or test id, so it needs be very specific. And, we used ".btn.btn-primary" to specifically select the Send button with the help of multiple classes.

<!-- ======================================================= -->
TARGET #4: Every transaction row, but not the header row
[Stable] //could break if we used the txn class for the header row (<tr>) as well.
document.querySelectorAll("#txn-table tr.txn").length
Explanation: In the table (#txn-table), every row except the header row contains the txn class.

<!-- ======================================================= -->
TARGET #5: The name cell of the row that failed, so the text reads Ramesh Thapa
[Stable] //could break if we do remove the failed class from each cell (<td>).
document.querySelector('tr:has(td.failed) td').innerText //Output: Ramesh Thapa
document.querySelector('tr:has(td.failed) td').count //Output: 1
Explanation: To display the cell (td) that has the failed status, we first checked a table row that contains td with "failed" class using ":has" and then returned the content of the first cell that satisfied the condition.
Since, Ramesh Thapa fulfils that condition, we got "Ramesh Thapa".

<!-- ======================================================= -->
TARGET #6: Only the statement download links, not the Help link
[stable]: could break if the help link also contains "statement" in its URL.
document.querySelectorAll('a[href\*="statement"]').length //Output:2
Explanation: We selected every link (<a>) with href attribute that contains a text "statement" in the URL.

<!-- =================================================================================================================== -->
TASK 3: Prove every one with document.querySelectorAll('...').length. Each must return the count printed beside it.
We have used "document.querytorAll('...').length for each task and also provided the count output beside it.

<!-- =================================================================================================================== -->
TASK 4: Mark each selector stable or brittle and write one sentence naming the change that would break it.
Marked as "Stable" and "Brittle" for each one above.

<!-- =================================================================================================================== -->
TASK 5:Answer the balance question at the bottom of the targets tab.
Then answer in one line: run document.querySelector('#balance').textContent the instant the page opens, and again five seconds later. Why do the two answers differ, and which one would an automated test have seen?
Answer:
Running document.querySelector('#balance').textContent" gives two answers/output; 0 and 12,450.00 when the page instantly opens (initially set to zero) and after five seconds because of the JavaScript code which contains the setTimeout function (changes it to 12,500.00.)

Since the initial value is set as 0 for #balance, an automated test would have seen 0 first if the assertion is made to immediately read the value, but an automated test that has an assertion made to wait for the update would have seen the final value.

Hand in a single text file: the six selectors, the count each returned, and your one sentence per selector
