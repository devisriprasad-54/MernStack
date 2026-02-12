// Hands-On 1: Shallow Copy (Controlled Mutation Use Case)
// -------------------------------------------------------
const user = {
  id: 101,
  name: "Ravi",
  preferences: {
    theme: "dark",   
    language: "en"
  }
};

// 🎯 Task
//     1. Create a shallow copy of user
//     2. Change:
//           i. name in the copied object
//           ii. preferences.theme in the copied object
//           iii .Log both original and copied objects
//           iv. Observe what changes and what doesn’t

const copiedUser = { ...user };
copiedUser.name = "Amit";
copiedUser.preferences.theme = "light";

console.log("Original User:", user);
console.log("Copied User:", copiedUser);

console.log("----------------------------------------------")


//Hands-On 2: Deep Copy (Isolation & Safety Use Case)



const order = {
      orderId: "ORD1001",
      customer: {
        name: "Anita",
        address: {
          city: "Hyderabad",
          pincode: 500085
        }
      },
      items: [
        { product: "Laptop", price: 70000 }
      ]
};

// 1. Create a deep copy of order
let copyOrder=structuredClone(order)

// 2. Modify in copied object:
    // i. customer.address.city
    copyOrder.customer.address.city="Bangalore"
    // ii. items[0].price
    copyOrder.items[0].price=80000

    console.log(order)
    console.log(copyOrder)