// Assignment 3: Student Marks List
// --------------------------------
// Scenario : You receive marks from an exam system.

// Test data:
const marks = [78, 92, 35, 88, 40, 67];


//     1. filter() marks ≥ 40 (pass marks)
let result1 = marks.filter((mark) => mark >= 40);
console.log(result1)
//     2. map() to add 5 grace marks to each student
let result2 = marks.map((mark) => mark + 5);
console.log(result2)
//     3. reduce() to find highest mark
let result3 = marks.reduce((x, y) => x > y ? x : y);
console.log(result3)
//     4. find() first mark below 40
let result4 = marks.find((mark) => mark < 40);
console.log(result4)
//     5. findIndex() of mark 92
let result5 = marks.findIndex((mark) => mark == 92);
console.log(result5)
