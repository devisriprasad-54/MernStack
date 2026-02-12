import express from 'express';
import { connect } from 'mongoose';
import { productAPI } from '../backend-project/API/productAPI.js'
import { userAPI } from '../backend-project/API/userAPI.js'


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/product-API', productAPI);
app.use('/user-API', userAPI);

async function connection() {

   try {
      await connect('mongodb://127.0.0.1:27017/ecom');
      console.log('Connected to MongoDB');
      app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
   } catch (err) {

      console.error('MongoDB connection failed:', err.message);

   }
}

connection()

