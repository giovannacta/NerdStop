import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_id: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number},
    image_urls: { type: [String] },
    category_id: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});
const Product = mongoose.model("Product", productSchema);

export default Product;