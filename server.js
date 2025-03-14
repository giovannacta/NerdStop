import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authJwt from "./auth.js";
import errorHandler from "./error-handler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Import routers
import productRouter from "./routers/product.js";
import userRouter from "./routers/user.js";
import orderRouter from "./routers/order.js";
import cartRouter from "./routers/cart.js";
import categoryRouter from "./routers/category.js";
import cartItemRouter from "./routers/cart_item.js";

// Public Routes (No Token)
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

// Auth Middleware
app.use(authJwt()); 
app.use(errorHandler);

// Protected Routes (Token Required)
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cart_items", cartItemRouter);

// connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB", err));


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
