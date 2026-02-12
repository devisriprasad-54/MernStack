// create student object with props rollNo, name, age, city
// create product obj with props productName,brand,price

; let student = {
   rollNo: 101,
   name: "Riyaz",
   age: 24,
   city: "Bangalore"
}

let product = {
   productName: "iPhone 13",
   brand: "Apple",
   price: 79999
}

for (let i in student) {
   console.log(i + ": " + student[i]);
}
console.log("----------------------");
for (let iƒ in product) {
   console.log(i + ": " + product[i]);
}

