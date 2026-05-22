
// Assignment 2: Online Course Name Processor
// ------------------------------------------
// Scenario : You are preparing a course list for display on a website.

// Test data:
const courses = ["javascript", "react", "node", "mongodb", "express"];

// Tasks:

//     1. filter() courses with name length > 5
let result1 = courses.filter((course)=> course.length > 5);
console.log(result1)
//     2. map() to convert course names to uppercase
let result2 = courses.map((course)=>course.toUpperCase());
console.log(result2)
//     3. reduce() to generate a single string:
//               "JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"
let result3 = courses.reduce((acc, course) =>acc + " | " + course.toUpperCase());
console.log(result3)
//     4. find() the course "react"
let result4 = courses.find((course) => course == "react");
console.log(result4)
//     5. findIndex() of "node"
let result5 = courses.findIndex((course) => course == "node");
console.log(result5)

