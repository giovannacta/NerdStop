import express from "express";
import Category from "../models/category.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const categoryList = await Category.find();
  res.status(200).json(categoryList);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
});

router.post("/", async (req, res) => {
  const category = await Category.create({
    name: req.body.name,
  });
  res.status(201).json(category);
});

router.put("/:id", async (req, res) => {
  const updateCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!updateCategory) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(updateCategory);
});

router.delete("/:id", async (req, res) => {
  const deleteCategory = await Category.findByIdAndDelete(req.params.id);
  res.status(204).send(deleteCategory);
});

export default router;
