import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";
import Product from "./models/product.js";
import jsonProducts from "./products.json" assert { type: "json" };

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(jsonProducts);
    console.log("Success Adding Data!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
