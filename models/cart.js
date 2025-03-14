import e from "express";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    items: [{type: mongoose.Schema.Types.ObjectId, ref: "CartItem"}]
})

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;