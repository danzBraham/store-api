import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import connectDB from "./db/connect.js";
import productsRouter from "./routes/products.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Products</a>`);
});

app.use("/api/v1/products", productsRouter);

// middleware
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server Listening on Port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
