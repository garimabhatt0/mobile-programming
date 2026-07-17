let balance = 10000;
let currentAction = "";
let balanceVisible = false;

const correctPin = "1234";


// Toggle Eye Icon
$("#toggleEye").click(function () {

  balanceVisible = !balanceVisible;

  if(balanceVisible){

    $("#balance").text("Rs. " + balance);

    $(this)
      .removeClass("fa-eye-slash")
      .addClass("fa-eye");

  }else{

    $("#balance").text("******");

    $(this)
      .removeClass("fa-eye")
      .addClass("fa-eye-slash");
  }

});


// Withdraw Button
$("#withdrawBtn").click(function () {

  currentAction = "withdraw";

  $("#amountSection").slideDown();

});


// Deposit Button
$("#depositBtn").click(function () {

  currentAction = "deposit";

  $("#amountSection").slideDown();

});


// Confirm Button
$("#confirmBtn").click(function () {

  let amount = Number($("#amount").val());

  // Validation
  if(!amount || amount <= 0){

    $("#message").text("Please enter a valid amount.");

    return;
  }

  // Multiple of 100 check
  if(amount % 100 !== 0){

    $("#message").text("Amount must be a multiple of 100.");

    return;
  }

  // PIN Popup
  let pin = prompt("Enter your PIN:");

  if(pin !== correctPin){

    $("#message").text("Incorrect PIN.");

    return;
  }

  // Withdraw
  if(currentAction === "withdraw"){

    if(amount > balance){

      $("#message").text("Insufficient balance.");

      return;
    }

    balance -= amount;

    $("#message").text(
      `Rs. ${amount} withdrawn successfully.`
    );
  }

  // Deposit
  if(currentAction === "deposit"){

    balance += amount;

    $("#message").text(
      `Rs. ${amount} deposited successfully.`
    );
  }

  // Update balance if visible
  if(balanceVisible){

    $("#balance").text("Rs. " + balance);
  }

  $("#amount").val("");

  $("#amountSection").slideUp();

});