let balance = 10000;
const correctPin = "1234";

function handleTransaction(type) {
  const amountInput = document.getElementById("amount");
  const message = document.getElementById("message");
  const balanceDisplay = document.getElementById("balance");

  const amount = Number(amountInput.value);

  // Validation
  if (!amount || amount <= 0) {
    message.innerText = "Please enter a valid amount.";
    return;
  }

  if (amount % 100 !== 0) {
    message.innerText = "Amount must be a multiple of 100.";
    return;
  }

  // Ask for PIN
  const pin = prompt("Enter your PIN:");

  if (pin !== correctPin) {
    message.innerText = "Incorrect PIN.";
    return;
  }

  if (type === "withdraw") {
    if (amount > balance) {
      message.innerText = "Insufficient balance.";
      return;
    }

    balance -= amount;
    message.innerText = `Rs. ${amount} withdrawn successfully.`;
  }

  if (type === "deposit") {
    balance += amount;
    message.innerText = `Rs. ${amount} deposited successfully.`;
  }

  balanceDisplay.innerText = balance;
  amountInput.value = "";
}