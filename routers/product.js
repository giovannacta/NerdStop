import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const productList = await Product.find();

    res.status(200).json(productList);
})

router.post("/", (req, res) => {
    const product = Product.create({
        product_id: req.body.product_id,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        image_urls: req.body.image_urls,
        category_id: req.body.category_id,
        created_at: req.body.created_at
    });
    res.status(201).json(product);
})

export default router;