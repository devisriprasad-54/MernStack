// Scenario : You are analyzing daily temperatures recorded by a weather app.

// Test data:
const temperatures = [32, 35, 28, 40, 38, 30, 42];

// Tasks

//     1. filter() temperatures above 35
let result1 = temperatures.filter(function (temp) {
   return temp > 35;
});
console.log(result1)
//     2. map() to convert all temperatures from Celsius → Fahrenheit
let result2 = temperatures.map(function (temp) {
   return (temp * 9/5) + 32;
});
console.log(result2)
//     3. reduce() to calculate average temperature
let result3 = temperatures.reduce(function (acc, temp) {
   return acc + temp;
}, 0);
let averageTemp = result3 / temperatures.length;
console.log(averageTemp)
//     4. find() first temperature above 40
let result4 = temperatures.find(function (temp) {
   return temp > 40;
});      
console.log(result4)
//     5. findIndex() of temperature 28
let result5 = temperatures.findIndex(function (temp) {
   return temp === 28;
});
console.log(result5)