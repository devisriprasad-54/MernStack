// Create http server
//import express module
   
import exp from 'express'

// create server
const app = exp()
// assign port number
app.listen(3000,()=>{
   console.log("server started at port 3000")
})
app.use(exp.json()) // to parse json body

let users = [];


//create api (req handlers)
//get req handler route
//post req handler route
//put req handler route
//delete req handler route

app.get('/users', (req, res) => { 
   //send users data in response
   res.status(200).json({ "message": "this is response from get users api", payload: users });

})

app.post('/users', (req, res) => { 
   let newuser = req.body;
   users.push(newuser);
   res.status(201).json({ "message": "user created successfully"});
   
})

app.put('/users/:id', (req, res) => { 
  
})

app.delete('/users/:id', (req, res) => { 
   
})