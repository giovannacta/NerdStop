import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import productRouter from "./routers/product.js";
import userRouter from "./routers/user.js";


dotenv.config();
const app = express();



app.use(express.json());
app.use(morgan("tiny"));

//ROUTERS
app.use('/product', productRouter)
app.use('/user', userRouter)



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
