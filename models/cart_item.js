import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    cart_id: { type: String, required: true},
    product_id: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;