import express from 'express';
import { productApp } from './APIS/productAPI.js';
import { userApp } from './APIS/userAPI.js';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(cookieParser());
// routes
app.use('/product-API', productApp);
app.use('/users-API', userApp);

async function connection() {
  await connect('mongodb://127.0.0.1:27017/week3DB');
  console.log('Connected to MongoDB');


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}


connection();