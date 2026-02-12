// Assignment 2: Exam Result Summary
// ---------------------------------
// Scenario : Marks are stored subject-wise for a student.

// Test data:
// const marks = {
//   maths: 78,
//   physics: 65,
//   chemistry: 82,
//   english: 55
// };

// Tasks:
//     1. Calculate total marks
//     2. Calculate average marks
//     3. Find the highest scoring subject
//     4. Add a new subject computer: 90


const marks = {
  maths: 78,
  physics: 65,
  chemistry: 82,
  english: 55
};
let total = 0;
let highestSubject = '';
let highestMarks = marks.maths   ;

for (let i in marks) {
  total  += marks[i];

  if (marks[i] > highestMarks) {
    highestMarks = marks[i];
    highestSubject = i;
  }
}

let averageMarks = total / Object.keys(marks).length;

marks.computer = 90;
console.log("---------------------------------------------------");
console.log("Total Marks: ", total);
console.log("Average Marks: ", averageMarks);
console.log("Highest Scoring Subject: ", highestSubject, "with", highestMarks, "marks");
console.log("Updated Marks Object: ", marks);