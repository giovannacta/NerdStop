import express from "express";
import CartItem from "../models/cart_item.js";

const router = express.Router();

router.post("/:cart_id/item", async (req, res) => {
  const addItem = await CartItem.create({
    cart_id: req.params.cart_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  });

  await Cart.findOneAndUpdate(
    { cart_id: req.params.cart_id },
    { $push: { items: addItem._id } },
    { new: true }
  );
  res.status(201).json(addItem);
});

router.put("/:cart_id/item/:product_id", async (req, res) => {
  const updateItem = await CartItem.findOneAndUpdate(
    {
      cart_id: req.params.cart_id,
      product_id: req.params.product_id,
    },
    { quantity },
    { new: true }
  );
  if (!updateItem) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.status(200).json(updateItem);
});

router.delete("/:cart_id/item/:product_id", async (req, res) => {
  const deleteItem = await CartItem.findOneAndDelete({
    cart_id: req.params.cart_id,
    product_id: req.params.product_id,
  });
  res.status(204).send();
});

export default router;
