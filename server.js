import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";


dotenv.config();
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("tiny"));

//ROUTERS
import productRouter from "./routers/product.js";
import userRouter from "./routers/user.js";
import orderRouter from "./routers/order.js";
import cartRouter from "./routers/cart.js";
import categoryRouter from "./routers/category.js";
import cartItemRouter from "./routers/cart_item.js";
//import paymentRouter from "./routers/payment.js";


app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/cart', cartRouter)
app.use('/category', categoryRouter)
app.use('/cart_item', cartItemRouter)
//app.use('/payment', paymentRouter)




//Connect and Mongoose Schema

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB", err));




app.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});
