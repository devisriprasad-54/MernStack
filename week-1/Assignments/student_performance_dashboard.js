// Student Performance Dashboard

// You are working on a college result analysis system.

// Test Data:
const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];


// Tasks:
    
// filter() students who passed (marks ≥ 40)
let result1 = students.filter((x) => x.marks >= 40);
console.log(result1);

// map() to add a grade field
//         ≥90 → A
//         ≥75 → B
//         ≥60 → C
//         else → D
let result2 = students.map((x) => {
   if (x.marks >= 90)
   { x.grade = 'A' }
   else if (x.marks >= 75)
   { x.grade = 'B' }
   else if (x.marks >= 60)
   { x.grade = 'C' }
   else
   { x.grade = 'D' }
   return x
});
console.log(result2);

// reduce() to calculate average marks
let results3=students.reduce((x,y)=>x+y.marks,0);
let averageMarks=results3/students.length;
console.log(averageMarks);

// find() the student who scored 92
let result4 = students.find((x) => x.marks == 92);
console.log(result4);   

// findIndex() of student "Kiran"
let result5 = students.findIndex((x) => x.name == "Kiran");
console.log(result5);