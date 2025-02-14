import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const productList = await Product.find();

    res.status(200).json(productList);
})

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
})


router.post('/', async (req, res) => {
    const product = await Product.create({
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

router.put('/:id', async (req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        image_urls: req.body.image_urls,
        category_id: req.body.category_id
    },
    { new: true });

    res.status(200).json(updateProduct);
})

router.delete('/:id', async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
})

export default router;