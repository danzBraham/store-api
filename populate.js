import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Product from './models/product.js';
import productsJson from './products.json' assert { type: 'json' };

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(productsJson);
    console.log('Success adding data!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
