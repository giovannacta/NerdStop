import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category_id: { type: String, required: true, unique: true },
    name: { type: String, required: true }
})

const Category = mongoose.model("Category", categorySchema);

export default Category;