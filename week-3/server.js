import express from 'express'
import {productApp} from './api/productAPI.js'
import {userApp} from './api/userAPI.js'


// create HTTP server
const app = express();
// assign the port number
app.listen(3000,() => console.log('HTTP server listening on port 3000'));

// body parsing middleware
app.use(express.json());

// forward req to userApp when path starts with '/user-api/
app.use('/user-api',userApp);

// forward req to productApp when path starts with '/product-api/
app.use('/product-api',productApp);