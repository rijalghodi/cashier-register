/*
Created by Rijal Ghodi on August 25, 2022
email : rijalghodi10@gmail.com
github : https://github.com/rijalghodi

The instruction of this code can be read at
https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register

*/

// currency unit in dollar value
const CURRENCY_UNIT = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];

// Define checkCashRegister function  checkCashRegister() that accepts
// purchase price as the first argument (price), payment as the second argument (cash),
// and cash-in-drawer (cid) as the third argument.
function checkCashRegister(price, cash, cid) {
  //
  // Define default decision as an object
  // default value of status property is "CLOSED"
  // default value of change property is []
  //
  let decision = {
    status: "INSUFFICIENT_FUNDS",
    change: [],
  };

  // Calculate the change (difference between cash and price)
  let change = cash - price;

  // calculate total cid
  let totalCid = 0.0;
  for (let i in cid) {
    totalCid += cid[i][1];
  }

  totalCid = totalCid.toFixed(2); // Round to 2 Decimal Places

  // Check is total cid equal to, more than, or less than the change

  // If total cid is equal to the change, return {status: "CLOSE", change: cid}
  if (totalCid == change) {
    decision.status = "CLOSED";
    decision.change = cid;
  }

  // If total cid is more than the change, return {status: "OPEN", change: [...]}, with the change due
  //       in coins and bills, sorted in highest to lowest order, as the value of the change key.
  else if (totalCid > change) {
    for (let i = cid.length - 1; i >= 0; i--) {
      //
      // define unitValue (currency unit in dollar * number of that currency unit)
      let unitValue = cid[i][1];

      // if unitValue is more than change, then
      if (unitValue > change) {
        unitValue = Math.floor(change / CURRENCY_UNIT[i][1]) * CURRENCY_UNIT[i][1];
      }

      // the rest of change
      change -= unitValue;
      change = change.toFixed(2); // // Round to 2 Decimal Places

      // write the unitValue in the change property of decision object
      if (unitValue > 0) {
        decision.change.push([CURRENCY_UNIT[i][0], unitValue]);
      }

      // check wheather the cid can return the exact change
      if (i == 0 && change == 0) {
        decision.status = "OPEN";
      }
      // if cid cannot return the exact change
      else if (i == 0) {
        decision.change = [];
      }
    }
  }

  // If total cid is equal to the change, return just return change default

  return decision;
}

// Do the checkCashRegister !
let result = checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);

console.log(result);
