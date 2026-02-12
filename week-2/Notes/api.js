//api call

// fetch('https://jsonplaceholder.typicode.com/posts')
//    .then(response => response.json())
//    .then(data => console.log("data is:", data))
//   .catch(error => console.error('Error:', error));

// console.log("Fetching data...");

//modern syntax to consume promise

async function getData() {
   //make api call and get response
   let res = await fetch('https://jsonplaceholder.typicode.com/posts')
   //extract json data from response
   let data = await res.json();
   console.log("data using async await is:", data);

}

getData()