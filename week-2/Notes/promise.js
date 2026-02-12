//promise.js
let futureValability = false;
let promise = new Promise(function (fullfil, reject) {

   setTimeout(() => {
      if (futureValability) {
         fullfil("Promise is fullfilled");
      } else {
         reject("Promise is rejected");
      }
   }, 2000);
});

// promise
//    .then((message) => console.log("message of then",message))  //will be called when promise is fullfilled
//    .catch((error) => console.log("error message:", error)); //will be called when promise is rejected
   

//modern way to handle promise using async await
async function consumePromise() {
   let res = await promise;
   console.log("res:", res);
}   

console.log("hello");