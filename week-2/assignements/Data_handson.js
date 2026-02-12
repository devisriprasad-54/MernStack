// Assignment 1: Date Creation & Extraction (Beginner)
// ---------------------------------------------------
// Tasks:
//        1. Create a Date object for current date & time.
//        2. Extract and display:
//                     * Year
//                     * Month (human readable)
//                     * Date
//                     * Day of week
//                     * Hours, minutes, seconds

//       3. Display the date in this format:
//                     DD-MM-YYYY HH:mm:ss

let date1 = new Date();

console.log('year: ' + date1.getFullYear());
console.log('month: ' + (date1.getMonth() + 1)); // Months are zero-based
console.log('date: ' + date1.getDate());
console.log('day of week: ' + date1.getDay());
console.log('hours: ' + date1.getHours());
console.log('minutes: ' + date1.getMinutes());
console.log('seconds: ' + date1.getSeconds());

console.log("Formatted Date: " + String(date1.getDate()) + '-' + String(date1.getMonth() + 1) + '-' + date1.getFullYear() + ' ' + String(date1.getHours()) + ':' + String(date1.getMinutes()) + ':' + String(date1.getSeconds()));


// Assignment 2: Date Comparison & Validation (Beginner → Intermediate)
// --------------------------------------------------------------------

//  Given:
//       let enrollmentDeadline = new Date("2026-01-20");

// Tasks:
//   1.Check if:
//       * Today is before deadline → "Enrollment Open"
//       * Today is after deadline → "Enrollment Closed"

//   2. Validate user input date:
//       * Input: "2026-02-30"
//       * Detect whether the date is valid or invalid
console.log("----------------------------------------");

let enrollmentDeadline = new Date("2026-01-20");
let date = new Date();

if (date < enrollmentDeadline) {
  console.log("enrollment open");
} else {
  console.log("enrollment closed");
}

function isValidDate(dateString) {
   let date = new Date(dateString);
   

}

let userInputDate = "2026-02-30";
if (isValidDate(userInputDate)) {
  console.log(userInputDate + " is a valid date.");
} else {
  console.log(userInputDate + " is an invalid date.");
}


// Assignment 3: Age Calculator (Intermediate)
// -------------------------------------------
// Input:
//     let dob = "2000-05-15";


// Tasks:
//         1. Calculate exact age in years
console.log("----------------------------------------");

let dob = new Date("2000-05-15");

console.log("Exact age: " + (date.getFullYear() - dob.getFullYear()) + " years");


