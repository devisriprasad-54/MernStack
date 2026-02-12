let totalAmount = 0;

function addTotal(amount) {
   totalAmount += amount;
}
 
function discount(amount) {
   totalAmount -= (totalAmount * (amount / 100));
}

function gst(percentage) {
   totalAmount += (totalAmount * (percentage / 100));
}

function getTotal() {
   return totalAmount;
}

addTotal(500);
addTotal(1200);
discount(200);
gst(18);
y = getTotal;
console.log(totalAmount);


