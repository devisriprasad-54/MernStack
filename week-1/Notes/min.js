//write a function that recive marks as an argument and return the smallest number in the array

function findSmallest(marks) {
   
   let min = marks[0];
   for (let i = 0; i < marks.length; i++){
      if (marks[i] < min) {
         min = marks[i];
      }
   }
   return min;
}
let marks = [2, 3, 2, 12, 21, 1, 0, 11, 4, 5];
console.log("The smallest number is " + findSmallest(marks));