import express from "express";
import User from "../models/user.js";
const router = express.Router();

router.get("/", (req, res) => {
  const users = User.find();

  res.status(200).json(users);
});

router.post("/user", (req, res) => {
  const user = User.create({
    user_id: req.body.user_id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created_at: req.body.created_at,
  });

  res.status(201).json(user);
});

export default router;
