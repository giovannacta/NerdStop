import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.js";
import Category from "../models/category.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const productList = await Product.find();

  res.status(200).json(productList);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
});

router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category_id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    image_urls: req.body.image_urls,
    category_id: req.body.category_id,
    created_at: req.body.created_at,
  });
  res.status(201).json(product);
});

router.put("/:id", async (req, res) => {
  
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image_urls: req.body.image_urls,
      category_id: req.body.category_id,
    },
    { new: true }
  );

  res.status(200).json(updateProduct);
});

router.delete("/:id", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deleteProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(204).send();
});

router.get("/get/count", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.status(200).json({ productCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/", async (req, res) => {
  let filter = {};

  if (req.query.categories) {
    const categoryIds = req.query.categories
      .split(",")
      .map((id) => new mongoose.Types.ObjectId(id.trim()));

    filter = { category_id: { $in: categoryIds } };
  }
  const productList = await Product.find(filter).populate("category_id");
  if (!productList) {
    return res.status(500).json({ success: false });
  }
  res.send(productList);
});

export default router;
