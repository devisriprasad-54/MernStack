//filter(callback)
//map(callback)
//forEach(callback)
//reduce(callback)
//find(callback)
//findIndex(callback)
//some(callback)


//callback function is function that can pass as argument

let marks = [10, 20, 30, 40, 50];

//filter
let result=marks.filter(function (element) {
return element>30
})

console.log(result)

//write a function that can extract marks>70,pack them into an array and return that array
// find all marks between 30 and 90
let scores=[10,50,70,80,90,40,30,20]

let results = scores.filter(function (elements) {
   return elements > 30 && elements < 90;
})

console.log(results)

//map (transfer or modification of array)

let salary=[1000,2000,3000,4000]

let newSalary=salary.map(function (element) {
    return element+500;
}) 
console.log(salary)
console.log(newSalary)

//reduce(aggregation)



let total = marks.reduce((accumulator, element) => accumulator + element);
console.log(total)

//find small element of marks

let small=marks.reduce((acc,el)=>acc<el?acc:el);
console.log(small)

//find and findIndex for finding a elmeents

let findElement=marks.find(function (element) {
    return element==20
})
console.log(findElement)

let findIndex=marks.findIndex(function (element) {
    return element==40
})
console.log(findIndex)