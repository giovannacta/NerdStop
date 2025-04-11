import express from "express";
import Product from "../models/product.js";
import Category from "../models/category.js";
import isAdmin from "../middlewares/isAdmin.js";
import authJwt from "../auth.js";
import upload from "../middlewares/upload.js"; 
import cloudinary from "../config/cloudinary.js"; 

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    let filter = {};

    if (req.query.category) {
      filter = { category_id: req.query.category };
    }

    const productList = await Product.find(filter).populate("category_id");
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ message: "Error to find products", error });
  }
});

// Get a product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category_id"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error to find products", error });
  }
});

// Create a product (Admin only)
router.post(
  "/",
  authJwt(),
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const category = await Category.findById(req.body.category_id);
      if (!category)
        return res.status(404).json({ message: "Category not found" });

      let imageUrl = "";
      if (req.file) {
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${req.file.buffer.toString("base64")}`,
          {
            folder: "nerdstop/products",
          }
        );
        imageUrl = result.secure_url;
      }

      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        image_urls: imageUrl ? [imageUrl] : [],
        category_id: req.body.category_id,
      });

      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error to find products", error });
    }
  }
);


router.put(
  "/:id",
  authJwt(),
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      let imageUrl = req.body.image_url;

      if (req.file) {
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${req.file.buffer.toString("base64")}`,
          {
            folder: "nerdstop/products",
          }
        );
        imageUrl = result.secure_url;
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          image_urls: imageUrl ? [imageUrl] : [],
          category_id: req.body.category_id,
        },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error to update product", error });
    }
  }
);

export default router;
