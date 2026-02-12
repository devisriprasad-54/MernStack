let student = [
   { sno: 1, name: "ajay", age: 23 },
   {sno: 2, name: "vijay", age: 24},
   {sno: 3, name: "sanjay", age: 22},
   {sno: 4, name: "rahul", age: 21}       
];

let result = student.filter((studentObj) => studentObj.age > 20);
console.log(result);

let result2=student.map((studentObj)=>studentObj.name);
console.log(result2);


//find the sum of ages of all students

let result3 = student.reduce((acc, studentObj) => acc + studentObj.age, 0);
console.log(result3);